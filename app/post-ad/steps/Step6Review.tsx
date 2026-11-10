'use client'

import { UseFormReturn } from 'react-hook-form'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { BrandOption, CityOption, ModelOption } from '@/src/lib/data/reference'
import {
  CONDITION_LABELS,
  PTA_STATUS_LABELS,
  WARRANTY_LABELS,
  CONTACT_PREF_LABELS,
} from '@/src/lib/constants/ad-options'

interface Step6Props {
  form: UseFormReturn<FullAdFormData>
  brands: BrandOption[]
  cities: CityOption[]
  selectedModel: ModelOption | null
  onJumpToStep: (step: number) => void
}

export function Step6Review({
  form,
  brands,
  cities,
  selectedModel,
  onJumpToStep,
}: Step6Props) {
  const values = form.getValues()

  const brand = brands.find((b) => b.id === values.brand_id)
  const city = cities.find((c) => c.id === values.city_id)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Review Your Ad
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Please review all details before publishing your ad
        </p>
      </div>

      {/* 1. Phone & Specs Card */}
      <div className="bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-700">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            📱 Phone & Specifications
          </span>
          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Edit
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-sm">
          <div>
            <span className="text-xs text-zinc-400 block">Brand:</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {brand?.name || '—'}
            </span>
          </div>
          <div>
            <span className="text-xs text-zinc-400 block">Model:</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {selectedModel?.name || '—'}
            </span>
          </div>
          <div>
            <span className="text-xs text-zinc-400 block">Condition:</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {CONDITION_LABELS[values.condition] || values.condition}
            </span>
          </div>
          <div>
            <span className="text-xs text-zinc-400 block">PTA Status:</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {PTA_STATUS_LABELS[values.pta_status] || values.pta_status}
            </span>
          </div>
          <div>
            <span className="text-xs text-zinc-400 block">Storage:</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {values.storage_gb >= 1024
                ? `${values.storage_gb / 1024}TB`
                : `${values.storage_gb}GB`}
            </span>
          </div>
          <div>
            <span className="text-xs text-zinc-400 block">RAM:</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {values.ram_gb ? `${values.ram_gb}GB` : 'N/A'}
            </span>
          </div>
          {values.color && (
            <div>
              <span className="text-xs text-zinc-400 block">Color:</span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {values.color}
              </span>
            </div>
          )}
          {values.condition === 'used' && values.battery_health != null && (
            <div>
              <span className="text-xs text-zinc-400 block">Battery Health:</span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {values.battery_health}%
              </span>
            </div>
          )}
          <div>
            <span className="text-xs text-zinc-400 block">Warranty:</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {values.warranty_type === 'in_warranty'
                ? `${values.warranty_months_remaining} Month(s) Remaining`
                : 'No Warranty'}
            </span>
          </div>
          <div>
            <span className="text-xs text-zinc-400 block">Box & Accessories:</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {values.has_box ? 'Box ✓' : 'No Box'} | {values.has_accessories ? 'Accessories ✓' : 'No Accessories'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Price & Title Card */}
      <div className="bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-700">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            🏷️ Price & Details
          </span>
          <button
            type="button"
            onClick={() => onJumpToStep(3)}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Edit
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-zinc-400">Price:</span>
            <div className="text-right">
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                Rs {Number(values.price || 0).toLocaleString('en-PK')}
              </span>
              <span className="text-xs text-zinc-400 block">
                {values.is_negotiable ? '(Negotiable)' : '(Fixed Price)'}
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs text-zinc-400 block">Ad Title:</span>
            <p className="font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
              {values.title}
            </p>
          </div>
          <div>
            <span className="text-xs text-zinc-400 block">Description:</span>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 whitespace-pre-line mt-1 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
              {values.description}
            </p>
          </div>
          {values.imei && (
            <div>
              <span className="text-xs text-zinc-400 block">IMEI:</span>
              <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
                {values.imei.slice(0, 8)}******* (Private)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Photos Card */}
      <div className="bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-700">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            📸 Photos
          </span>
          <button
            type="button"
            onClick={() => onJumpToStep(4)}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Edit
          </button>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {values.images?.length || 0} photo(s) uploaded (First photo is cover).
          </p>
          {values.images && values.images.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {values.images.map((path, idx) => {
                const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zzcxgqtbmrdbaouegphx.supabase.co'
                const publicUrl = `${supabaseUrl}/storage/v1/object/public/ad-images/${path}`

                return (
                  <div
                    key={path}
                    className="relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={publicUrl}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && (
                      <span className="absolute bottom-0 inset-x-0 bg-emerald-600 text-white text-[9px] font-bold text-center">
                        Cover
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* 4. Location & Contact Card */}
      <div className="bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-700">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            📍 Location & Contact
          </span>
          <button
            type="button"
            onClick={() => onJumpToStep(5)}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-zinc-400 block">City:</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {city?.name || '—'}
            </span>
          </div>
          <div>
            <span className="text-xs text-zinc-400 block">Contact Preference:</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {CONTACT_PREF_LABELS[values.contact_preference] || values.contact_preference}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

