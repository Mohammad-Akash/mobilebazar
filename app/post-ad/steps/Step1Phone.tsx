'use client'

import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { BrandOption, ModelOption } from '@/src/lib/data/reference'
import { createClient } from '@/src/lib/supabase/client'

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

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBrandId = e.target.value
    setValue('brand_id', newBrandId, { shouldValidate: true })
    // Reset dependent model field
    setValue('model_id', '', { shouldValidate: true })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Select Phone
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Select the brand and model of your phone
        </p>
      </div>

      {/* Brand Select */}
      <div className="space-y-2">
        <label
          htmlFor="brand_id"
          className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
        >
          Brand <span className="text-red-500">*</span>
        </label>
        <select
          id="brand_id"
          {...register('brand_id')}
          onChange={handleBrandChange}
          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
            errors.brand_id ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'
          }`}
        >
          <option value="">-- Select Brand --</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        {errors.brand_id && (
          <p className="text-sm text-red-600 mt-1">{errors.brand_id.message}</p>
        )}
      </div>

      {/* Model Select */}
      <div className="space-y-2">
        <label
          htmlFor="model_id"
          className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
        >
          Model <span className="text-red-500">*</span>
        </label>
        <select
          id="model_id"
          {...register('model_id')}
          disabled={!selectedBrandId || loadingModels}
          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.model_id ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'
          }`}
        >
          <option value="">
            {!selectedBrandId
              ? '-- Select Brand First --'
              : loadingModels
              ? 'Loading models...'
              : '-- Select Model --'}
          </option>
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} {m.release_year ? `(${m.release_year})` : ''}
            </option>
          ))}
        </select>
        {errors.model_id && (
          <p className="text-sm text-red-600 mt-1">{errors.model_id.message}</p>
        )}
      </div>
    </div>
  )
}

