'use client'

import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { CityOption, AreaOption } from '@/src/lib/data/reference'
import { createClient } from '@/src/lib/supabase/client'
import { CONTACT_PREF_LABELS } from '@/src/lib/constants/ad-options'
import { MapPin, Check, Loader2 } from 'lucide-react'

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
    setValue('area_id', null, { shouldValidate: true })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span>Location & Contact Method</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Specify your city and how you prefer buyers in Pakistan to reach out to you.
        </p>
      </div>

      {/* City Select */}
      <div className="space-y-2">
        <label
          htmlFor="city_id"
          className="block text-sm font-bold text-slate-700 dark:text-slate-300"
        >
          City <span className="text-red-500">*</span>
        </label>
        <select
          id="city_id"
          {...register('city_id')}
          onChange={handleCityChange}
          className={`w-full px-4 py-3.5 rounded-2xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            errors.city_id ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
          }`}
        >
          <option value="">-- Choose City --</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.city_id && (
          <p className="text-xs text-red-600 mt-1 font-semibold">{errors.city_id.message}</p>
        )}
      </div>

      {/* Area Select */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="area_id"
            className="block text-sm font-bold text-slate-700 dark:text-slate-300"
          >
            Locality / Area <span className="text-xs text-slate-400 font-normal">(Optional)</span>
          </label>
          {loadingAreas && (
            <span className="text-xs text-blue-600 flex items-center gap-1 font-medium">
              <Loader2 className="w-3 h-3 animate-spin" />
              Loading areas...
            </span>
          )}
        </div>
        <select
          id="area_id"
          {...register('area_id')}
          disabled={!selectedCityId || loadingAreas}
          className="w-full px-4 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">
            {!selectedCityId
              ? '-- Select City First --'
              : loadingAreas
              ? 'Loading areas...'
              : areas.length === 0
              ? 'No specific areas listed for this city'
              : '-- Select Locality / Area --'}
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
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
          Buyer Contact Preference <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['both', 'phone', 'whatsapp'] as const).map((pref) => {
            const isSelected = contactPref === pref
            return (
              <button
                type="button"
                key={pref}
                onClick={() => setValue('contact_preference', pref, { shouldValidate: true })}
                className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all flex items-center justify-center gap-2 active:scale-95 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span>{CONTACT_PREF_LABELS[pref]}</span>
                {isSelected && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            )
          })}
        </div>
        {errors.contact_preference && (
          <p className="text-xs text-red-600 mt-1 font-semibold">{errors.contact_preference.message}</p>
        )}
      </div>
    </div>
  )
}
