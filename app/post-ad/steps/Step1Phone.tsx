'use client'

import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { BrandOption, ModelOption } from '@/src/lib/data/reference'
import { createClient } from '@/src/lib/supabase/client'
import { Smartphone, Check, Loader2 } from 'lucide-react'

interface Step1Props {
  form: UseFormReturn<FullAdFormData>
  brands: BrandOption[]
  onModelSelected?: (model: ModelOption | null) => void
}

export function Step1Phone({ form, brands, onModelSelected }: Step1Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form

  const selectedBrandId = watch('brand_id')
  const selectedModelId = watch('model_id')

  const [models, setModels] = useState<ModelOption[]>([])
  const [loadingModels, setLoadingModels] = useState(false)

  // Fetch models whenever brand changes
  useEffect(() => {
    if (!selectedBrandId) {
      setModels([])
      return
    }

    let isMounted = true
    setLoadingModels(true)

    const supabase = createClient()
    supabase
      .from('models')
      .select('id, brand_id, name, slug, release_year, storage_options, ram_options')
      .eq('brand_id', selectedBrandId)
      .eq('is_active', true)
      .order('name')
      .then(({ data, error }) => {
        if (!isMounted) return
        setLoadingModels(false)
        if (error) {
          console.error('Error fetching models:', error)
          setModels([])
        } else {
          setModels((data as ModelOption[]) || [])
        }
      })

    return () => {
      isMounted = false
    }
  }, [selectedBrandId])

  // Inform parent when selected model changes
  useEffect(() => {
    if (!selectedModelId) {
      onModelSelected?.(null)
      return
    }
    const found = models.find((m) => m.id === selectedModelId)
    onModelSelected?.(found || null)
  }, [selectedModelId, models, onModelSelected])

  const handleBrandSelect = (brandId: string) => {
    setValue('brand_id', brandId, { shouldValidate: true })
    setValue('model_id', '', { shouldValidate: true })
  }

  // Popular brands for quick tap
  const popularBrands = brands.slice(0, 8)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-blue-600" />
          <span>Choose Phone Brand & Model</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Select the manufacturer and exact model of the smartphone you are selling.
        </p>
      </div>

      {/* Quick Brand Tap Grid */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Popular Brands
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {popularBrands.map((b) => {
            const isSelected = selectedBrandId === b.id
            return (
              <button
                type="button"
                key={b.id}
                onClick={() => handleBrandSelect(b.id)}
                className={`py-3 px-3.5 rounded-2xl border text-sm font-bold text-center transition-all flex items-center justify-between active:scale-95 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className="truncate">{b.name}</span>
                {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Full Brand Select Dropdown */}
      <div className="space-y-2">
        <label
          htmlFor="brand_id"
          className="block text-sm font-bold text-slate-700 dark:text-slate-300"
        >
          All Smartphone Brands <span className="text-red-500">*</span>
        </label>
        <select
          id="brand_id"
          {...register('brand_id')}
          onChange={(e) => handleBrandSelect(e.target.value)}
          className={`w-full px-4 py-3.5 rounded-2xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            errors.brand_id ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
          }`}
        >
          <option value="">-- Choose Brand --</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        {errors.brand_id && (
          <p className="text-xs text-red-600 mt-1 font-semibold">{errors.brand_id.message}</p>
        )}
      </div>

      {/* Model Select */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="model_id"
            className="block text-sm font-bold text-slate-700 dark:text-slate-300"
          >
            Smartphone Model <span className="text-red-500">*</span>
          </label>
          {loadingModels && (
            <span className="text-xs text-blue-600 flex items-center gap-1 font-medium">
              <Loader2 className="w-3 h-3 animate-spin" />
              Loading models...
            </span>
          )}
        </div>
        <select
          id="model_id"
          {...register('model_id')}
          disabled={!selectedBrandId || loadingModels}
          className={`w-full px-4 py-3.5 rounded-2xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.model_id ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
          }`}
        >
          <option value="">
            {!selectedBrandId
              ? '-- Select Brand First --'
              : loadingModels
              ? 'Loading models...'
              : '-- Select Smartphone Model --'}
          </option>
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} {m.release_year ? `(${m.release_year})` : ''}
            </option>
          ))}
        </select>
        {errors.model_id && (
          <p className="text-xs text-red-600 mt-1 font-semibold">{errors.model_id.message}</p>
        )}
      </div>
    </div>
  )
}
