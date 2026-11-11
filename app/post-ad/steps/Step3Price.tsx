'use client'

import { UseFormReturn } from 'react-hook-form'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { generateAdTitle } from '@/src/lib/utils/ad-title'
import { BrandOption, ModelOption } from '@/src/lib/data/reference'
import { AD_LIMITS } from '@/src/lib/constants/ad-options'
import { BadgeDollarSign, Sparkles, Lock } from 'lucide-react'

interface Step3Props {
  form: UseFormReturn<FullAdFormData>
  brands: BrandOption[]
  selectedModel: ModelOption | null
}

export function Step3Price({ form, brands, selectedModel }: Step3Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form

  const price = watch('price')
  const title = watch('title') || ''
  const description = watch('description') || ''
  const brandId = watch('brand_id')
  const storageGb = watch('storage_gb')
  const ptaStatus = watch('pta_status')

  const brand = brands.find((b) => b.id === brandId)

  const handleAutoGenerateTitle = () => {
    const generated = generateAdTitle({
      brandName: brand?.name,
      modelName: selectedModel?.name,
      storageGb: storageGb,
      ptaStatus: ptaStatus,
    })
    if (generated) {
      setValue('title', generated, { shouldValidate: true })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <BadgeDollarSign className="w-5 h-5 text-blue-600" />
          <span>Price & Description</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Set a realistic price in PKR and write honest description notes to attract quick buyers.
        </p>
      </div>

      {/* 1. Price in PKR */}
      <div className="space-y-2">
        <label
          htmlFor="price"
          className="block text-sm font-bold text-slate-700 dark:text-slate-300"
        >
          Asking Price (PKR) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400 text-base">
            PKR
          </span>
          <input
            id="price"
            type="number"
            min={AD_LIMITS.MIN_PRICE}
            max={AD_LIMITS.MAX_PRICE}
            step={500}
            placeholder="e.g. 185000"
            {...register('price', { valueAsNumber: true })}
            className={`w-full pl-16 pr-4 py-3.5 rounded-2xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-lg font-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.price ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
            }`}
          />
        </div>
        {price > 0 && (
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
            Rs {Number(price).toLocaleString('en-PK')}
          </p>
        )}
        {errors.price && <p className="text-xs text-red-600 mt-1 font-semibold">{errors.price.message}</p>}

        {/* Negotiable Toggle */}
        <div className="pt-2">
          <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register('is_negotiable')}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Price is slightly negotiable
            </span>
          </label>
        </div>
      </div>

      {/* 2. Ad Title */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="title"
            className="block text-sm font-bold text-slate-700 dark:text-slate-300"
          >
            Smartphone Ad Title <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={handleAutoGenerateTitle}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-bold flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auto-generate Standard Title</span>
          </button>
        </div>
        <input
          id="title"
          type="text"
          placeholder="e.g. Apple iPhone 15 Pro Max 256GB PTA Approved"
          {...register('title')}
          className={`w-full px-4 py-3.5 rounded-2xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            errors.title ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
          }`}
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>{AD_LIMITS.MIN_TITLE_LENGTH} to {AD_LIMITS.MAX_TITLE_LENGTH} characters</span>
          <span>{title.length}/{AD_LIMITS.MAX_TITLE_LENGTH}</span>
        </div>
        {errors.title && <p className="text-xs text-red-600 mt-1 font-semibold">{errors.title.message}</p>}
      </div>

      {/* 3. Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-bold text-slate-700 dark:text-slate-300"
        >
          Detailed Phone Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={5}
          placeholder="Mention cosmetic condition, scratches, screen status, original accessories, face ID/fingerprint status..."
          {...register('description')}
          className={`w-full px-4 py-3.5 rounded-2xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            errors.description ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
          }`}
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>Minimum {AD_LIMITS.MIN_DESC_LENGTH} characters</span>
          <span>{description.length}/{AD_LIMITS.MAX_DESC_LENGTH}</span>
        </div>
        {errors.description && (
          <p className="text-xs text-red-600 mt-1 font-semibold">{errors.description.message}</p>
        )}
      </div>

      {/* 4. IMEI (Optional & Private) */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-slate-500 shrink-0" />
          <div>
            <label
              htmlFor="imei"
              className="text-sm font-bold text-slate-800 dark:text-slate-200"
            >
              15-Digit IMEI Number <span className="text-xs text-slate-400 font-normal">(Optional)</span>
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Never shared publicly. Used internally to guarantee safety and anti-theft protection.
            </p>
          </div>
        </div>
        <input
          id="imei"
          type="text"
          maxLength={18}
          placeholder="e.g. 356938035643803"
          {...register('imei')}
          className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            errors.imei ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
          }`}
        />
        {errors.imei && <p className="text-xs text-red-600 mt-1 font-semibold">{errors.imei.message}</p>}
      </div>
    </div>
  )
}
