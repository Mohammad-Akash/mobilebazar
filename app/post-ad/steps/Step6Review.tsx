'use client'

import { UseFormReturn } from 'react-hook-form'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { BrandOption, CityOption, ModelOption } from '@/src/lib/data/reference'
import {
  CONDITION_LABELS,
  PTA_STATUS_LABELS,
  CONTACT_PREF_LABELS,
} from '@/src/lib/constants/ad-options'
import { Smartphone, BadgeDollarSign, Camera, MapPin, Edit3 } from 'lucide-react'

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
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>Review Smartphone Listing</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Double-check your phone details before publishing to thousands of verified buyers.
        </p>
      </div>

      {/* 1. Phone & Specs Card */}
      <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
            <Smartphone className="w-4 h-4 text-blue-600" />
            <span>Phone & Specifications</span>
          </span>
          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs sm:text-sm">
          <div>
            <span className="text-xs text-slate-400 block">Brand:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {brand?.name || '—'}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Model:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {selectedModel?.name || '—'}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Condition:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {CONDITION_LABELS[values.condition] || values.condition}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">PTA Status:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {PTA_STATUS_LABELS[values.pta_status] || values.pta_status}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Storage:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {values.storage_gb >= 1024
                ? `${values.storage_gb / 1024}TB`
                : `${values.storage_gb}GB`}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">RAM:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {values.ram_gb ? `${values.ram_gb} GB` : 'N/A'}
            </span>
          </div>
          {values.color && (
            <div>
              <span className="text-xs text-slate-400 block">Color:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {values.color}
              </span>
            </div>
          )}
          {values.condition === 'used' && values.battery_health != null && (
            <div>
              <span className="text-xs text-slate-400 block">Battery Health:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {values.battery_health}%
              </span>
            </div>
          )}
          <div>
            <span className="text-xs text-slate-400 block">Warranty:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {values.warranty_type === 'in_warranty'
                ? `${values.warranty_months_remaining} Month(s)`
                : 'No Warranty'}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Box & Accessories:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {values.has_box ? 'Box ✓' : 'No Box'} • {values.has_accessories ? 'Accessories ✓' : 'No Accessories'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Price & Title Card */}
      <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
            <BadgeDollarSign className="w-4 h-4 text-blue-600" />
            <span>Price & Title</span>
          </span>
          <button
            type="button"
            onClick={() => onJumpToStep(3)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-400">Price:</span>
            <div className="text-right">
              <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                Rs {Number(values.price || 0).toLocaleString('en-PK')}
              </span>
              <span className="text-xs text-slate-400 block">
                {values.is_negotiable ? '(Negotiable)' : '(Fixed Price)'}
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Ad Title:</span>
            <p className="font-bold text-slate-900 dark:text-white mt-0.5">
              {values.title}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Description:</span>
            <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-line mt-1 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              {values.description}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Photos Card */}
      <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
            <Camera className="w-4 h-4 text-blue-600" />
            <span>Photos ({values.images?.length || 0})</span>
          </span>
          <button
            type="button"
            onClick={() => onJumpToStep(4)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>
        <div>
          {values.images && values.images.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {values.images.map((path, idx) => {
                const supabaseUrl =
                  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zzcxgqtbmrdbaouegphx.supabase.co'
                const publicUrl = `${supabaseUrl}/storage/v1/object/public/ad-images/${path}`

                return (
                  <div
                    key={path}
                    className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={publicUrl}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && (
                      <span className="absolute bottom-0 inset-x-0 bg-blue-600 text-white text-[9px] font-bold text-center py-0.5">
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
      <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Location & Contact</span>
          </span>
          <button
            type="button"
            onClick={() => onJumpToStep(5)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-slate-400 block">City:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {city?.name || '—'}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Contact Preference:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {CONTACT_PREF_LABELS[values.contact_preference] || values.contact_preference}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
