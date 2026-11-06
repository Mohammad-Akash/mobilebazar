'use client'

import { UseFormReturn } from 'react-hook-form'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { ModelOption } from '@/src/lib/data/reference'
import {
  STORAGE_OPTIONS,
  RAM_OPTIONS,
  COLOR_OPTIONS,
  CONDITION_LABELS,
  PTA_STATUS_LABELS,
  WARRANTY_LABELS,
} from '@/src/lib/constants/ad-options'

interface Step2Props {
  form: UseFormReturn<FullAdFormData>
  selectedModel: ModelOption | null
}

export function Step2Specs({ form, selectedModel }: Step2Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form

  const condition = watch('condition')
  const ptaStatus = watch('pta_status')
  const storageGb = watch('storage_gb')
  const ramGb = watch('ram_gb')
  const warrantyType = watch('warranty_type')
  const hasBox = watch('has_box')
  const hasAccessories = watch('has_accessories')

  // Storage and RAM lists: use model's defined options or fallback
  const availableStorage =
    selectedModel?.storage_options && selectedModel.storage_options.length > 0
      ? selectedModel.storage_options
      : STORAGE_OPTIONS

  const availableRam =
    selectedModel?.ram_options && selectedModel.ram_options.length > 0
      ? selectedModel.ram_options
      : RAM_OPTIONS

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Phone ki Tafseelat (Specifications)
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Phone ki halat, storage aur PTA status darj karein
        </p>
      </div>

      {/* 1. Condition (Large touch buttons) */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Condition (Halat) <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(['used', 'new'] as const).map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => {
                setValue('condition', c, { shouldValidate: true })
                if (c === 'new') {
                  setValue('battery_health', null)
                }
              }}
              className={`py-3.5 px-4 rounded-xl border text-sm font-medium text-center transition-all ${
                condition === c
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500'
                  : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
              }`}
            >
              {CONDITION_LABELS[c]}
            </button>
          ))}
        </div>
        {errors.condition && (
          <p className="text-sm text-red-600 mt-1">{errors.condition.message}</p>
        )}
      </div>

      {/* 2. PTA Status */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          PTA Status <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {(['pta_approved', 'non_pta', 'jv', 'unknown'] as const).map((status) => (
            <button
              type="button"
              key={status}
              onClick={() => setValue('pta_status', status, { shouldValidate: true })}
              className={`p-3 rounded-xl border text-xs sm:text-sm font-medium text-center transition-all ${
                ptaStatus === status
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500'
                  : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
              }`}
            >
              {PTA_STATUS_LABELS[status]}
            </button>
          ))}
        </div>
        {errors.pta_status && (
          <p className="text-sm text-red-600 mt-1">{errors.pta_status.message}</p>
        )}
      </div>

      {/* 3. Storage (GB) & RAM (GB) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Storage */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Storage (GB / TB) <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {availableStorage.map((gb) => {
              const label = gb >= 1024 ? `${gb / 1024}TB` : `${gb}GB`
              const isSelected = storageGb === gb
              return (
                <button
                  type="button"
                  key={gb}
                  onClick={() => setValue('storage_gb', gb, { shouldValidate: true })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-600 text-white font-semibold'
                      : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
          {errors.storage_gb && (
            <p className="text-sm text-red-600 mt-1">{errors.storage_gb.message}</p>
          )}
        </div>

        {/* RAM */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            RAM (GB) <span className="text-xs text-zinc-400">(Optional)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {availableRam.map((gb) => {
              const isSelected = ramGb === gb
              return (
                <button
                  type="button"
                  key={gb}
                  onClick={() =>
                    setValue('ram_gb', isSelected ? null : gb, { shouldValidate: true })
                  }
                  className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-600 text-white font-semibold'
                      : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  {gb}GB
                </button>
              )
            })}
          </div>
          {errors.ram_gb && (
            <p className="text-sm text-red-600 mt-1">{errors.ram_gb.message}</p>
          )}
        </div>
      </div>

      {/* 4. Color Selection */}
      <div className="space-y-2">
        <label
          htmlFor="color"
          className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
        >
          Rang (Color) <span className="text-xs text-zinc-400">(Optional)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.slice(0, 10).map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setValue('color', c, { shouldValidate: true })}
              className="px-2.5 py-1 text-xs rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500"
            >
              {c}
            </button>
          ))}
        </div>
        <input
          id="color"
          type="text"
          placeholder="Ya apna color likhein (e.g. Deep Purple, Space Grey)"
          {...register('color')}
          className="w-full mt-2 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {errors.color && <p className="text-sm text-red-600 mt-1">{errors.color.message}</p>}
      </div>

      {/* 5. Battery Health (Only visible if condition === 'used') */}
      {condition === 'used' && (
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="battery_health"
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Battery Health (%): <span className="text-xs text-zinc-400">(Used phones ke liye)</span>
            </label>
            <span className="text-xs font-mono text-zinc-500">
              {watch('battery_health') ? `${watch('battery_health')}%` : 'Not specified'}
            </span>
          </div>
          <input
            id="battery_health"
            type="number"
            min={0}
            max={100}
            placeholder="e.g. 87"
            {...register('battery_health', {
              setValueAs: (v) => (v === '' || isNaN(v) ? null : Number(v)),
            })}
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {errors.battery_health && (
            <p className="text-sm text-red-600 mt-1">{errors.battery_health.message}</p>
          )}
        </div>
      )}

      {/* 6. Box & Accessories (Toggles) */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setValue('has_box', !hasBox)}
          className={`p-3.5 rounded-xl border text-sm font-medium flex items-center justify-between transition-all ${
            hasBox
              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
              : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
          }`}
        >
          <span>📦 Dabba (Original Box)</span>
          <span>{hasBox ? '✅' : '⚪'}</span>
        </button>

        <button
          type="button"
          onClick={() => setValue('has_accessories', !hasAccessories)}
          className={`p-3.5 rounded-xl border text-sm font-medium flex items-center justify-between transition-all ${
            hasAccessories
              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
              : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
          }`}
        >
          <span>🔌 Saman (Accessories)</span>
          <span>{hasAccessories ? '✅' : '⚪'}</span>
        </button>
      </div>

      {/* 7. Warranty Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Warranty Status <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(['none', 'in_warranty'] as const).map((w) => (
            <button
              type="button"
              key={w}
              onClick={() => {
                setValue('warranty_type', w, { shouldValidate: true })
                if (w === 'none') {
                  setValue('warranty_months_remaining', 0, { shouldValidate: true })
                }
              }}
              className={`py-3 px-4 rounded-xl border text-sm font-medium text-center transition-all ${
                warrantyType === w
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500'
                  : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {WARRANTY_LABELS[w]}
            </button>
          ))}
        </div>

        {warrantyType === 'in_warranty' && (
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-2">
            <label
              htmlFor="warranty_months"
              className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Baqi Warranty (Maah / Months) <span className="text-red-500">*</span>
            </label>
            <input
              id="warranty_months"
              type="number"
              min={1}
              max={36}
              placeholder="e.g. 6"
              {...register('warranty_months_remaining', {
                valueAsNumber: true,
              })}
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.warranty_months_remaining && (
              <p className="text-sm text-red-600 mt-1">
                {errors.warranty_months_remaining.message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
