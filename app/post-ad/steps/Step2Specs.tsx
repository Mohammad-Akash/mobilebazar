'use client'

import { UseFormReturn } from 'react-hook-form'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { ModelOption } from '@/src/lib/data/reference'
import {
  STORAGE_OPTIONS,
  RAM_OPTIONS,
  COLOR_OPTIONS,
  PTA_STATUS_LABELS,
  WARRANTY_LABELS,
} from '@/src/lib/constants/ad-options'
import {
  Cpu,
  Battery,
  Package,
  Wrench,
  Check,
} from 'lucide-react'

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
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-600" />
          <span>Handset Specifications</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Specify the condition, PTA compliance status, internal storage, and battery.
        </p>
      </div>

      {/* 1. Condition */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
          Condition <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(['used', 'new'] as const).map((c) => {
            const isSelected = condition === c
            return (
              <button
                type="button"
                key={c}
                onClick={() => {
                  setValue('condition', c, { shouldValidate: true })
                  if (c === 'new') {
                    setValue('battery_health', null)
                  }
                }}
                className={`py-3.5 px-4 rounded-2xl border text-sm font-bold text-center transition-all flex items-center justify-center gap-2 active:scale-95 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span>{c === 'new' ? '✨ Brand New / Box Pack' : '📱 Used Handset'}</span>
                {isSelected && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            )
          })}
        </div>
        {errors.condition && (
          <p className="text-xs text-red-600 mt-1 font-semibold">{errors.condition.message}</p>
        )}
      </div>

      {/* 2. PTA Status */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
          PTA Status <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {(['pta_approved', 'non_pta', 'jv', 'unknown'] as const).map((status) => {
            const isSelected = ptaStatus === status
            return (
              <button
                type="button"
                key={status}
                onClick={() => setValue('pta_status', status, { shouldValidate: true })}
                className={`p-3 rounded-2xl border text-xs sm:text-sm font-bold text-center transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span>{PTA_STATUS_LABELS[status]}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
              </button>
            )
          })}
        </div>
        {errors.pta_status && (
          <p className="text-xs text-red-600 mt-1 font-semibold">{errors.pta_status.message}</p>
        )}
      </div>

      {/* 3. Storage & RAM */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Storage */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
            Internal Storage <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {availableStorage.map((gb) => {
              const label = gb >= 1024 ? `${gb / 1024} TB` : `${gb} GB`
              const isSelected = storageGb === gb
              return (
                <button
                  type="button"
                  key={gb}
                  onClick={() => setValue('storage_gb', gb, { shouldValidate: true })}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all active:scale-95 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
          {errors.storage_gb && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{errors.storage_gb.message}</p>
          )}
        </div>

        {/* RAM */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
            RAM Capacity <span className="text-xs text-slate-400 font-normal">(Optional)</span>
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
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all active:scale-95 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  {gb} GB
                </button>
              )
            })}
          </div>
          {errors.ram_gb && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{errors.ram_gb.message}</p>
          )}
        </div>
      </div>

      {/* 4. Color Selection */}
      <div className="space-y-2">
        <label
          htmlFor="color"
          className="block text-sm font-bold text-slate-700 dark:text-slate-300"
        >
          Phone Color <span className="text-xs text-slate-400 font-normal">(Optional)</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {COLOR_OPTIONS.slice(0, 10).map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setValue('color', c, { shouldValidate: true })}
              className="px-3 py-1 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500 active:scale-95 transition-all"
            >
              {c}
            </button>
          ))}
        </div>
        <input
          id="color"
          type="text"
          placeholder="Or type custom color (e.g. Natural Titanium, Midnight, Phantom Black)"
          {...register('color')}
          className="w-full mt-2 px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.color && <p className="text-xs text-red-600 mt-1">{errors.color.message}</p>}
      </div>

      {/* 5. Battery Health (Only visible if condition === 'used') */}
      {condition === 'used' && (
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="battery_health"
              className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
            >
              <Battery className="w-4 h-4 text-emerald-600" />
              <span>Battery Health %</span>
            </label>
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
              {watch('battery_health') ? `${watch('battery_health')}%` : 'Not specified'}
            </span>
          </div>
          <input
            id="battery_health"
            type="number"
            min={0}
            max={100}
            placeholder="e.g. 88 (Especially relevant for iPhones)"
            {...register('battery_health', {
              setValueAs: (v) => (v === '' || isNaN(v) ? null : Number(v)),
            })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.battery_health && (
            <p className="text-xs text-red-600 mt-1 font-semibold">{errors.battery_health.message}</p>
          )}
        </div>
      )}

      {/* 6. Box & Accessories Toggles */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setValue('has_box', !hasBox)}
          className={`p-4 rounded-2xl border text-sm font-bold flex items-center justify-between transition-all active:scale-95 ${
            hasBox
              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20'
              : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300'
          }`}
        >
          <span className="flex items-center gap-2">
            <Package className="w-4 h-4 text-slate-500" />
            <span>Original Box</span>
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700">
            {hasBox ? 'Yes ✓' : 'No'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setValue('has_accessories', !hasAccessories)}
          className={`p-4 rounded-2xl border text-sm font-bold flex items-center justify-between transition-all active:scale-95 ${
            hasAccessories
              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20'
              : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300'
          }`}
        >
          <span className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-slate-500" />
            <span>Accessories</span>
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700">
            {hasAccessories ? 'Yes ✓' : 'No'}
          </span>
        </button>
      </div>

      {/* 7. Warranty Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
          Warranty Status <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(['none', 'in_warranty'] as const).map((w) => {
            const isSelected = warrantyType === w
            return (
              <button
                type="button"
                key={w}
                onClick={() => {
                  setValue('warranty_type', w, { shouldValidate: true })
                  if (w === 'none') {
                    setValue('warranty_months_remaining', 0, { shouldValidate: true })
                  }
                }}
                className={`py-3 px-4 rounded-2xl border text-sm font-bold text-center transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{WARRANTY_LABELS[w]}</span>
                {isSelected && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            )
          })}
        </div>

        {warrantyType === 'in_warranty' && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <label
              htmlFor="warranty_months"
              className="block text-sm font-bold text-slate-700 dark:text-slate-300"
            >
              Remaining Warranty (Months) <span className="text-red-500">*</span>
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
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.warranty_months_remaining && (
              <p className="text-xs text-red-600 mt-1 font-semibold">
                {errors.warranty_months_remaining.message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
