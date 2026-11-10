'use client'

import { useState } from 'react'

interface ConfirmWithReasonModalProps {
  isOpen: boolean
  title: string
  description: string
  confirmLabel: string
  confirmVariant?: 'danger' | 'warning' | 'primary'
  requireNameMatch?: string
  placeholder?: string
  onClose: () => void
  onConfirm: (reason: string) => Promise<void>
}

export function ConfirmWithReasonModal({
  isOpen,
  title,
  description,
  confirmLabel,
  confirmVariant = 'danger',
  requireNameMatch,
  placeholder = 'Enter the mandatory reason (minimum 5 characters)...',
  onClose,
  onConfirm,
}: ConfirmWithReasonModalProps) {
  const [reason, setReason] = useState('')
  const [nameConfirm, setNameConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const isNameMatchValid = !requireNameMatch || nameConfirm.trim().toLowerCase() === requireNameMatch.trim().toLowerCase()
  const isReasonValid = reason.trim().length >= 5
  const canSubmit = isNameMatchValid && isReasonValid && !loading

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return

    setError('')
    setLoading(true)
    try {
      await onConfirm(reason.trim())
      setReason('')
      setNameConfirm('')
      onClose()
    } catch (err) {
      setError((err as Error).message || 'Action failed')
    } finally {
      setLoading(false)
    }
  }

  const btnColors = {
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-amber-600 hover:bg-amber-700 text-white',
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  }[confirmVariant]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>

        {requireNameMatch && (
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Type <span className="text-red-500 font-bold">{requireNameMatch}</span> to confirm:
            </label>
            <input
              type="text"
              value={nameConfirm}
              onChange={(e) => setNameConfirm(e.target.value)}
              placeholder={requireNameMatch}
              className="w-full h-10 px-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Reason (Minimum 5 characters):
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {reason.length > 0 && reason.trim().length < 5 && (
            <p className="text-xs text-amber-600">Need at least {5 - reason.trim().length} more characters</p>
          )}
        </div>

        {error && (
          <div className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg text-xs text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-40 disabled:pointer-events-none ${btnColors}`}
          >
            {loading ? 'Processing...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
