'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { upsertTermAction, disableTermAction, testSpamRulesAction } from '@/src/lib/admin/actions'
import { ConfirmWithReasonModal } from '@/src/lib/admin/components/ConfirmWithReasonModal'

interface TermItem {
  id: string
  term: string
  kind: string
  is_active: boolean
  created_at: string
}

interface TermsClientProps {
  initialTerms: TermItem[]
}

export function TermsClient({ initialTerms }: TermsClientProps) {
  const router = useRouter()
  const [terms, setTerms] = useState(initialTerms)
  const [filterKind, setFilterKind] = useState<'all' | 'block' | 'flag'>('all')

  // New Term Form State
  const [newTerm, setNewTerm] = useState('')
  const [newKind, setNewKind] = useState<'block' | 'flag'>('flag')
  const [termReasonModal, setTermReasonModal] = useState(false)

  // Disable Term State
  const [disableTarget, setDisableTarget] = useState<TermItem | null>(null)

  // Test Sandbox State
  const [testTitle, setTestTitle] = useState('iPhone 13 PTA Approved')
  const [testDescription, setTestDescription] = useState('Pehle advance payment easy paisa bhej do phr courier karonga 03001234567')
  const [testResults, setTestResults] = useState<any[] | null>(null)
  const [testingLoading, setTestingLoading] = useState(false)
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // ── 1. Create New Term ──────────────────────────────────────────────────────
  async function handleAddTermConfirm(reason: string) {
    const res = await upsertTermAction({
      term: newTerm,
      kind: newKind,
      reason,
    })

    if (!res.success) {
      throw new Error(res.error || 'Failed to add term')
    }

    setNotice({ type: 'success', message: `Term "${newTerm}" added successfully.` })
    setNewTerm('')
    router.refresh()
  }

  // ── 2. Disable Term ─────────────────────────────────────────────────────────
  async function handleDisableConfirm(reason: string) {
    if (!disableTarget) return
    const res = await disableTermAction({
      id: disableTarget.id,
      reason,
    })

    if (!res.success) {
      throw new Error(res.error || 'Failed to disable term')
    }

    setNotice({ type: 'success', message: `Term "${disableTarget.term}" disabled.` })
    setTerms((prev) =>
      prev.map((t) => (t.id === disableTarget.id ? { ...t, is_active: false } : t))
    )
    router.refresh()
  }

  // ── 3. Test Sandbox ─────────────────────────────────────────────────────────
  async function handleRunTest() {
    setTestingLoading(true)
    setTestResults(null)
    try {
      const res = await testSpamRulesAction({
        title: testTitle,
        description: testDescription,
      })
      if (res.success && res.data) {
        setTestResults(res.data)
      } else {
        alert(res.error || 'Test failed')
      }
    } finally {
      setTestingLoading(false)
    }
  }

  const filteredTerms = terms.filter(
    (t) => filterKind === 'all' || t.kind === filterKind
  )

  return (
    <div className="space-y-8">
      {notice && (
        <div
          className={`p-3.5 rounded-xl text-xs font-medium border ${
            notice.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800'
          }`}
        >
          {notice.message}
        </div>
      )}

      {/* ── Section A: Live Spam Rules Test Sandbox ──────────────────────────── */}
      <div className="p-6 bg-white dark:bg-zinc-900 border-2 border-purple-500/20 rounded-2xl shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span>🧪</span>
            <span>Spam Engine Dry-Run Sandbox</span>
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Test simulated ad copy in real-time to preview which phone, link, or dictionary triggers will fire.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Test Ad Title:
            </label>
            <input
              type="text"
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
              className="w-full h-10 px-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs border border-zinc-200 dark:border-zinc-700"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Test Ad Description:
            </label>
            <input
              type="text"
              value={testDescription}
              onChange={(e) => setTestDescription(e.target.value)}
              className="w-full h-10 px-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs border border-zinc-200 dark:border-zinc-700"
            />
          </div>
        </div>

        <button
          onClick={handleRunTest}
          disabled={testingLoading}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs disabled:opacity-40"
        >
          {testingLoading ? 'Testing engine...' : 'Run Spam Engine Test'}
        </button>

        {testResults && (
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Evaluation Result: {testResults.length} Rule(s) Triggered
            </h4>

            {testResults.length === 0 ? (
              <p className="text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-900">
                ✅ Clean copy: No spam rules or blocked keywords matched!
              </p>
            ) : (
              <div className="space-y-2">
                {testResults.map((res, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                      res.kind === 'block'
                        ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-900 dark:text-red-200'
                        : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200'
                    }`}
                  >
                    <div>
                      <span className="font-mono font-bold uppercase">{res.rule_type}:</span>{' '}
                      <span className="font-bold underline">&quot;{res.matched_term}&quot;</span>
                      <p className="text-[11px] opacity-80 mt-0.5">{res.detail}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold uppercase px-2 py-0.5 rounded-full text-[10px] bg-white/60 dark:bg-black/40">
                        {res.kind} (+{res.score})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Section B: Blocked Terms Dictionary Management ───────────────────── */}
      <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Blocked Terms Dictionary ({terms.length} terms)
            </h2>
            <p className="text-xs text-zinc-500">
              Exact keywords monitored across ad titles, descriptions, and colors.
            </p>
          </div>

          <div className="flex gap-1.5">
            {(['all', 'block', 'flag'] as const).map((k) => (
              <button
                key={k}
                onClick={() => setFilterKind(k)}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                  filterKind === k
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {/* Add New Term Form */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/60 flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Add Keyword or Phrase:
            </label>
            <input
              type="text"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
              placeholder="e.g. easypaisa advance"
              className="w-full h-9 px-3 bg-white dark:bg-zinc-900 rounded-lg text-xs border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="w-full sm:w-36">
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Action Kind:
            </label>
            <select
              value={newKind}
              onChange={(e) => setNewKind(e.target.value as 'block' | 'flag')}
              className="w-full h-9 px-3 bg-white dark:bg-zinc-900 rounded-lg text-xs border border-zinc-300 dark:border-zinc-700 font-semibold"
            >
              <option value="flag">Flag (Shadow review)</option>
              <option value="block">Block (Hard reject)</option>
            </select>
          </div>

          <button
            onClick={() => {
              if (newTerm.trim().length >= 2) {
                setTermReasonModal(true)
              } else {
                alert('Term must be at least 2 characters')
              }
            }}
            disabled={newTerm.trim().length < 2}
            className="w-full sm:w-auto px-5 h-9 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all disabled:opacity-40 shrink-0"
          >
            Add Term
          </button>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          {filteredTerms.map((t) => (
            <div
              key={t.id}
              className={`p-2.5 rounded-xl border flex items-center justify-between ${
                t.is_active
                  ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
                  : 'bg-zinc-100 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 opacity-50'
              }`}
            >
              <div className="space-y-0.5 truncate pr-2">
                <span className="font-bold text-zinc-900 dark:text-zinc-100 truncate block">
                  {t.term}
                </span>
                <span
                  className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-sm ${
                    t.kind === 'block'
                      ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                      : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                  }`}
                >
                  {t.kind}
                </span>
              </div>

              {t.is_active && (
                <button
                  onClick={() => setDisableTarget(t)}
                  className="text-red-500 hover:text-red-700 text-[11px] font-bold px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                  Disable
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Term Confirm Modal */}
      {termReasonModal && (
        <ConfirmWithReasonModal
          isOpen={true}
          title={`Add Blocked Term: "${newTerm}"`}
          description={`Action kind: ${newKind.toUpperCase()}. All dictionary modifications are recorded in the immutable audit log.`}
          confirmLabel="Confirm & Add to Dictionary"
          confirmVariant="primary"
          placeholder="e.g. Emerging courier advance fee scam phrase reported by users."
          onClose={() => setTermReasonModal(false)}
          onConfirm={handleAddTermConfirm}
        />
      )}

      {/* Disable Term Confirm Modal */}
      {disableTarget && (
        <ConfirmWithReasonModal
          isOpen={true}
          title={`Disable Term: "${disableTarget.term}"`}
          description="This keyword will no longer trigger flags or hard blocks. Please provide a mandatory reason:"
          confirmLabel="Disable Keyword"
          confirmVariant="warning"
          placeholder="e.g. Too many false positives on legitimate phone accessories."
          onClose={() => setDisableTarget(null)}
          onConfirm={handleDisableConfirm}
        />
      )}
    </div>
  )
}
