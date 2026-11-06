'use client'

import { UseFormReturn } from 'react-hook-form'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { generateAdTitle } from '@/src/lib/utils/ad-title'
import { BrandOption, ModelOption } from '@/src/lib/data/reference'
import { AD_LIMITS } from '@/src/lib/constants/ad-options'

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
  const isNegotiable = watch('is_negotiable')
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
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Qeemat aur Tafseel (Price & Description)
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Qeemat tay karein aur phone ki munasib tafseel darj karein
        </p>
      </div>

      {/* 1. Price in PKR */}
      <div className="space-y-2">
        <label
          htmlFor="price"
          className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
        >
          Qeemat / Price (PKR) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-zinc-400">
            Rs
          </span>
          <input
            id="price"
            type="number"
            min={AD_LIMITS.MIN_PRICE}
            max={AD_LIMITS.MAX_PRICE}
            step={500}
            placeholder="e.g. 85000"
            {...register('price', { valueAsNumber: true })}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
              errors.price ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'
            }`}
          />
        </div>
        {price > 0 && (
          <p className="text-xs text-zinc-500">
            Rs {Number(price).toLocaleString('en-PK')}
          </p>
        )}
        {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>}

        {/* Negotiable Toggle */}
        <div className="pt-2">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('is_negotiable')}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-zinc-300"
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              Qeemat mein kami peshi mumkin hai (Negotiable)
            </span>
          </label>
        </div>
      </div>

      {/* 2. Ad Title */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
          >
            Ad Title <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={handleAutoGenerateTitle}
            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
          >
            ⚡ Auto-generate Title
          </button>
        </div>
        <input
          id="title"
          type="text"
          placeholder="e.g. Apple iPhone 13 128GB PTA Approved"
          {...register('title')}
          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
            errors.title ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'
          }`}
        />
        <div className="flex justify-between text-xs text-zinc-400">
          <span>{AD_LIMITS.MIN_TITLE_LENGTH} se {AD_LIMITS.MAX_TITLE_LENGTH} characters</span>
          <span>{title.length}/{AD_LIMITS.MAX_TITLE_LENGTH}</span>
        </div>
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
      </div>

      {/* 3. Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
        >
          Phone ki Mukammal Tafseel (Description) <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={5}
          placeholder="Phone ki condition, koi scratch ya issue, sath kya samaan hai, waghaira wazahat se likhein..."
          {...register('description')}
          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
            errors.description ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'
          }`}
        />
        <div className="flex justify-between text-xs text-zinc-400">
          <span>Kam az kam {AD_LIMITS.MIN_DESC_LENGTH} characters</span>
          <span>{description.length}/{AD_LIMITS.MAX_DESC_LENGTH}</span>
        </div>
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* 4. IMEI (Optional & Private) */}
      <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔒</span>
          <div>
            <label
              htmlFor="imei"
              className="text-sm font-semibold text-zinc-800 dark:text-zinc-200"
            >
              IMEI Number (15 Digits) <span className="text-xs text-zinc-400">(Ikhtiyari / Optional)</span>
            </label>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Yeh number public ko kabhi nazar nahi aayega, sirf PTA verification aur safety ke liye Mehfooz rehta hai.
            </p>
          </div>
        </div>
        <input
          id="imei"
          type="text"
          maxLength={18}
          placeholder="e.g. 356938035643803"
          {...register('imei')}
          className={`w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
            errors.imei ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'
          }`}
        />
        {errors.imei && <p className="text-sm text-red-600 mt-1">{errors.imei.message}</p>}
      </div>
    </div>
  )
}
