'use client'

import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { CityOption, AreaOption } from '@/src/lib/data/reference'
import { createClient } from '@/src/lib/supabase/client'
import { CONTACT_PREF_LABELS } from '@/src/lib/constants/ad-options'

interface Step5Props {
  form: UseFormReturn<FullAdFormData>
  cities: CityOption[]
}

export function Step5Location({ form, cities }: Step5Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form

  const selectedCityId = watch('city_id')
  const contactPref = watch('contact_preference')

  const [areas, setAreas] = useState<AreaOption[]>([])
  const [loadingAreas, setLoadingAreas] = useState(false)

  // Fetch areas when city changes
  useEffect(() => {
    if (!selectedCityId) {
      setAreas([])
      return
    }

    let isMounted = true
    setLoadingAreas(true)

    const supabase = createClient()
    supabase
      .from('areas')
      .select('id, city_id, name, slug')
      .eq('city_id', selectedCityId)
      .eq('is_active', true)
      .order('name')
      .then(({ data, error }) => {
        if (!isMounted) return
        setLoadingAreas(false)
        if (error) {
          console.error('Error fetching areas:', error)
          setAreas([])
        } else {
          setAreas((data as AreaOption[]) || [])
        }
      })

    return () => {
      isMounted = false
    }
  }, [selectedCityId])

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCityId = e.target.value
    setValue('city_id', newCityId, { shouldValidate: true })
    // Reset dependent area
    setValue('area_id', null, { shouldValidate: true })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Location & Contact
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Select your city, area, and preferred contact method
        </p>
      </div>

      {/* City Select */}
      <div className="space-y-2">
        <label
          htmlFor="city_id"
          className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
        >
          City <span className="text-red-500">*</span>
        </label>
        <select
          id="city_id"
          {...register('city_id')}
          onChange={handleCityChange}
          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
            errors.city_id ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'
          }`}
        >
          <option value="">-- Select City --</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.city_id && (
          <p className="text-sm text-red-600 mt-1">{errors.city_id.message}</p>
        )}
      </div>

      {/* Area Select (Dependent) */}
      <div className="space-y-2">
        <label
          htmlFor="area_id"
          className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
        >
          Area <span className="text-xs text-zinc-400">(Optional)</span>
        </label>
        <select
          id="area_id"
          {...register('area_id')}
          disabled={!selectedCityId || loadingAreas}
          className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">
            {!selectedCityId
              ? '-- Select City First --'
              : loadingAreas
              ? 'Loading areas...'
              : areas.length === 0
              ? 'No specific areas listed for this city (Optional)'
              : '-- Select Area (Optional) --'}
          </option>
          {areas.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      {/* Contact Preference */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Contact Preference <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['both', 'phone', 'whatsapp'] as const).map((pref) => (
            <button
              type="button"
              key={pref}
              onClick={() => setValue('contact_preference', pref, { shouldValidate: true })}
              className={`p-3.5 rounded-xl border text-sm font-medium text-center transition-all ${
                contactPref === pref
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500'
                  : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
              }`}
            >
              {CONTACT_PREF_LABELS[pref]}
            </button>
          ))}
        </div>
        {errors.contact_preference && (
          <p className="text-sm text-red-600 mt-1">{errors.contact_preference.message}</p>
        )}
      </div>
    </div>
  )
}

