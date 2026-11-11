'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { updateProfileAction, type AuthState } from '@/app/auth/actions'
import { User, MapPin, Phone, MessageSquare, ShieldCheck, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'

type City = {
  id: string
  name: string
}

type ProfileData = {
  fullName: string
  cityId: string | null
  phone: string | null
  whatsappNumber: string | null
  isPhoneVerified: boolean
  adsCount: number
}

export function ProfileForm({
  initialData,
  cities,
  warning,
}: {
  initialData: ProfileData
  cities: City[]
  warning?: string
}) {
  const [state, formAction, isPending] = useActionState<AuthState | null, FormData>(
    updateProfileAction,
    null
  )

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
      {warning === 'phone_required' && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Phone Verification Required</p>
            <p className="text-xs mt-0.5 text-amber-700 dark:text-amber-300">
              Please verify your phone number via SMS OTP before posting smartphone ads so genuine buyers can reach you.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Seller Profile & Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Update your public seller name, city, and verified contact number.
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Total Ads
          </span>
          <p className="text-xl font-black text-blue-600 dark:text-blue-400">{initialData.adsCount}</p>
        </div>
      </div>

      {state?.success && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {state?.error && (
        <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-xs sm:text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-600" />
            <span>Full Name</span>
          </label>
          <input
            type="text"
            name="fullName"
            defaultValue={initialData.fullName}
            required
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.fieldErrors?.fullName && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{state.fieldErrors.fullName[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Home City</span>
          </label>
          <select
            name="cityId"
            defaultValue={initialData.cityId || ''}
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Mobile Phone Number</span>
            </label>
            {initialData.isPhoneVerified ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                <span>⚠ Not Verified</span>
              </span>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="tel"
              value={initialData.phone || ''}
              readOnly
              placeholder="Phone not verified"
              className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-mono text-sm cursor-not-allowed focus:outline-none"
            />
            <Link
              href="/dashboard/profile/verify?return_to=/profile"
              className="px-4 py-3 text-xs font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap transition-colors active:scale-95 shadow-sm shadow-blue-600/30"
            >
              {initialData.isPhoneVerified ? 'Change Number' : 'Verify via SMS'}
            </Link>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Phone numbers are verified via SMS to maintain buyer trust and prevent fraud.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Number (Optional)</span>
          </label>
          <input
            type="tel"
            name="whatsappNumber"
            defaultValue={initialData.whatsappNumber || ''}
            placeholder="03001234567"
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.fieldErrors?.whatsappNumber && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{state.fieldErrors.whatsappNumber[0]}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm rounded-2xl transition duration-150 shadow-sm shadow-blue-600/30 flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Profile...</span>
              </>
            ) : (
              <span>Save Profile</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
