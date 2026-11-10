'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/src/lib/supabase/client'

interface FactorItem {
  id: string
  friendlyName: string
  status: 'verified' | 'unverified'
  createdAt: string
}

interface SecurityClientProps {
  currentAal: 'aal1' | 'aal2'
  factors: FactorItem[]
}

export function SecurityClient({ currentAal, factors }: SecurityClientProps) {
  const router = useRouter()
  const supabase = createClient()

  const [enrolling, setEnrolling] = useState(false)
  const [factorId, setFactorId] = useState<string | null>(null)
  const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [verifyCode, setVerifyCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // ── Step 1: Start Enrollment ────────────────────────────────────────────────
  async function handleStartEnroll() {
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: `MobileBazar Staff (${new Date().toLocaleDateString()})`,
      })

      if (error) throw error

      setFactorId(data.id)
      setQrCodeSvg(data.totp.qr_code)
      setSecret(data.totp.secret)
      setEnrolling(true)
    } catch (err) {
      setError((err as Error).message || 'Enrollment failed')
    } finally {
      setLoading(false)
    }
  }

  // ── Step 2: Verify Code (Enrollment or Existing Challenge) ───────────────────
  async function handleVerify(targetFactorId?: string) {
    const fId = targetFactorId || factorId || factors[0]?.id
    if (!fId) {
      setError('No factor found to verify')
      return
    }

    if (!/^\d{6}$/.test(verifyCode.trim())) {
      setError('Please enter a 6-digit verification code')
      return
    }

    setError('')
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.mfa.challengeAndVerify({
        factorId: fId,
        code: verifyCode.trim(),
      })

      if (error) throw error

      setSuccess('MFA Verification Successful! Session elevated to AAL2.')
      setEnrolling(false)
      setVerifyCode('')
      setTimeout(() => {
        router.push('/admin')
        router.refresh()
      }, 1200)
    } catch (err) {
      setError((err as Error).message || 'Invalid 6-digit code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Unenroll Factor ─────────────────────────────────────────────────────────
  async function handleUnenroll(fId: string) {
    if (!confirm('Are you sure you want to remove this authenticator factor?')) return
    setLoading(true)
    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId: fId })
      if (error) throw error
      router.refresh()
    } catch (err) {
      setError((err as Error).message || 'Failed to remove factor')
    } finally {
      setLoading(false)
    }
  }

  const hasVerifiedFactor = factors.some((f) => f.status === 'verified')

  return (
    <div className="space-y-6">
      {/* ── Status Card ──────────────────────────────────────────────────────── */}
      <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-zinc-500 uppercase">Current Session Level</p>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full ${
                currentAal === 'aal2' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            <span className="font-mono font-bold text-sm">
              {currentAal === 'aal2' ? 'AAL2 (Authenticator Verified)' : 'AAL1 (Password / Email Only)'}
            </span>
          </div>
        </div>

        {currentAal === 'aal2' ? (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            ✅ Fully Protected
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            ⚠️ Elevation Needed
          </span>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl text-xs text-emerald-700 dark:text-emerald-300">
          {success}
        </div>
      )}

      {/* ── Verification Form for Existing Factors ───────────────────────────── */}
      {hasVerifiedFactor && currentAal !== 'aal2' && !enrolling && (
        <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Enter Authenticator Code
          </h2>
          <p className="text-xs text-zinc-500">
            Open Google Authenticator, Microsoft Authenticator, or Authy and enter your 6-digit code:
          </p>
          <div className="flex gap-2 max-w-xs">
            <input
              type="text"
              maxLength={6}
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="w-full text-center tracking-widest font-mono text-lg font-bold h-11 px-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleVerify()}
              disabled={loading || verifyCode.length !== 6}
              className="px-5 h-11 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all disabled:opacity-40"
            >
              Verify
            </button>
          </div>
        </div>
      )}

      {/* ── New Factor Enrollment Modal / Card ───────────────────────────────── */}
      {enrolling ? (
        <div className="p-6 bg-white dark:bg-zinc-900 border-2 border-emerald-500/30 rounded-2xl space-y-6">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span>📷</span>
            <span>Scan QR Code with Authenticator App</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {qrCodeSvg && (
              <div className="w-52 h-52 bg-white p-3 rounded-2xl border border-zinc-200 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                {qrCodeSvg.startsWith('<svg') ? (
                  <div
                    className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                  />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={qrCodeSvg}
                    alt="Authenticator QR Code"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            )}

            <div className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                1. Open your Authenticator app (Google Authenticator, Microsoft Authenticator, Authy).
              </p>
              <p>2. Scan this QR code with your phone camera.</p>
              <div className="pt-2">
                <p className="mb-1 text-zinc-500">Or enter this secret key manually:</p>
                <div className="flex items-center gap-2">
                  <code className="block flex-1 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-mono text-zinc-900 dark:text-zinc-100 select-all font-bold text-xs break-all">
                    {secret}
                  </code>
                  <button
                    type="button"
                    onClick={() => {
                      if (secret) {
                        navigator.clipboard.writeText(secret)
                        alert('Secret copied to clipboard!')
                      }
                    }}
                    className="px-3 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 rounded-lg text-xs font-semibold shrink-0"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Enter the 6-digit confirmation code shown in the app:
            </label>
            <div className="flex gap-2 max-w-xs">
              <input
                type="text"
                maxLength={6}
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-full text-center tracking-widest font-mono text-lg font-bold h-11 px-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={() => handleVerify()}
                disabled={loading || verifyCode.length !== 6}
                className="px-5 h-11 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all disabled:opacity-40"
              >
                {loading ? 'Confirming...' : 'Activate'}
              </button>
            </div>
            <button
              onClick={() => setEnrolling(false)}
              className="text-xs text-zinc-500 hover:underline"
            >
              Cancel enrollment
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Enrolled Factors
            </h2>
            <button
              onClick={handleStartEnroll}
              disabled={loading}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all disabled:opacity-40"
            >
              + Add New Authenticator
            </button>
          </div>

          {factors.length === 0 ? (
            <p className="text-xs text-zinc-500 py-4 text-center">
              No authenticator factors enrolled yet. Click &quot;Add New Authenticator&quot; to begin.
            </p>
          ) : (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {factors.map((f) => (
                <div key={f.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200">{f.friendlyName}</p>
                    <p className="text-[11px] text-zinc-400">
                      Enrolled: {new Date(f.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleUnenroll(f.id)}
                    disabled={loading}
                    className="text-red-600 hover:text-red-700 font-semibold text-xs px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
