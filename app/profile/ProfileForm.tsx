'use client'

import { useActionState } from 'react'
import { updateProfileAction, type AuthState } from '@/app/auth/actions'

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
}: {
  initialData: ProfileData
  cities: City[]
}) {
  const [state, formAction, isPending] = useActionState<AuthState | null, FormData>(
    updateProfileAction,
    null
  )

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Mera Profile / My Profile
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Apni contact details aur shehar update karein
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase font-semibold text-zinc-400">Total Ads</span>
          <p className="text-xl font-bold text-emerald-600">{initialData.adsCount}</p>
        </div>
      </div>

      {state?.success && (
        <div className="my-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-lg text-sm text-emerald-700 dark:text-emerald-300">
          Profile kamyabi se update ho gaya hai! (Profile saved successfully)
        </div>
      )}

      {state?.error && (
        <div className="my-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg text-sm text-red-700 dark:text-red-300">
          {state.error}
        </div>
      )}

      <form action={formAction} className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Poora Naam / Full Name
          </label>
          <input
            type="text"
            name="fullName"
            defaultValue={initialData.fullName}
            required
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {state?.fieldErrors?.fullName && (
            <p className="text-xs text-red-600 mt-1">{state.fieldErrors.fullName[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Shehar / City
          </label>
          <select
            name="cityId"
            defaultValue={initialData.cityId || ''}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Shehar muntakhib karein (Select City)</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Mobile Number
            </label>
            {initialData.isPhoneVerified ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                ✓ Verified
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                ⚠ Not Verified
              </span>
            )}
          </div>
          <input
            type="tel"
            name="phone"
            defaultValue={initialData.phone || ''}
            placeholder="03001234567 ya +923001234567"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <p className="text-xs text-zinc-500 mt-1">
            Pakistani format zaroori hai. Number badalne par verified badge reset ho jayega.
          </p>
          {state?.fieldErrors?.phone && (
            <p className="text-xs text-red-600 mt-1">{state.fieldErrors.phone[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            WhatsApp Number (Optional)
          </label>
          <input
            type="tel"
            name="whatsappNumber"
            defaultValue={initialData.whatsappNumber || ''}
            placeholder="03001234567"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {state?.fieldErrors?.whatsappNumber && (
            <p className="text-xs text-red-600 mt-1">{state.fieldErrors.whatsappNumber[0]}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium rounded-lg transition duration-150 shadow-sm"
          >
            {isPending ? 'Saving changes...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}
