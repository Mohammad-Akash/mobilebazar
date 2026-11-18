'use client'

import { useState } from 'react'
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
  HardDrive,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

interface Step2Props {
  form: UseFormReturn<FullAdFormData>
  selectedModel?: ModelOption | null
}

export function Step2Specs({ form }: Step2Props) {
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

  const [customStorageMode, setCustomStorageMode] = useState(false)
  const [customRamMode, setCustomRamMode] = useState(false)

  return (
    <div className="space-y-7">
      {/* Step Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7657FF]/10 text-[#7657FF] dark:text-[#9B82FF] text-xs font-bold mb-2">
          <Cpu className="w-3.5 h-3.5" />
          <span>Step 2 of 6</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-[#F7F6F2] flex items-center gap-2">
          <span>Handset Specifications</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Select phone condition, PTA approval status, storage, RAM, and warranty.
        </p>
      </div>

      {/* 1. Condition */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#7657FF]" />
          <span>Condition</span>
          <span className="text-red-500 font-bold">*</span>
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
                className={`py-3.5 px-4 rounded-2xl border text-xs sm:text-sm font-bold text-center transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                  isSelected
                    ? 'border-[#7657FF] bg-[#7657FF]/15 dark:bg-[#7657FF]/25 text-[#7657FF] dark:text-white ring-2 ring-[#7657FF]/40 shadow-xs'
                    : 'border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1E1B38] text-slate-700 dark:text-slate-300 hover:border-[#7657FF]/40 hover:bg-slate-50 dark:hover:bg-[#252147]'
                }`}
              >
                <span>{c === 'new' ? '✨ Brand New / Box Pack' : '📱 Used Handset'}</span>
                {isSelected && <Check className="w-4 h-4 text-[#7657FF] dark:text-[#9B82FF]" />}
              </button>
            )
          })}
        </div>
        {errors.condition && (
          <p className="text-xs text-red-500 mt-1 font-semibold">{errors.condition.message}</p>
        )}
      </div>

      {/* 2. PTA Status */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#7657FF]" />
          <span>PTA Status</span>
          <span className="text-red-500 font-bold">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {(['pta_approved', 'cpid_approved', 'non_pta', 'jv', 'unknown'] as const).map((status) => {
            const isSelected = ptaStatus === status
            return (
              <button
                type="button"
                key={status}
                onClick={() => setValue('pta_status', status, { shouldValidate: true })}
                className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                  isSelected
                    ? 'border-[#7657FF] bg-[#7657FF]/15 dark:bg-[#7657FF]/25 text-[#7657FF] dark:text-white ring-2 ring-[#7657FF]/40 shadow-xs'
                    : 'border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1E1B38] text-slate-700 dark:text-slate-300 hover:border-[#7657FF]/40 hover:bg-slate-50 dark:hover:bg-[#252147]'
                }`}
              >
                <span>{PTA_STATUS_LABELS[status]}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#7657FF] dark:text-[#9B82FF]" />}
              </button>
            )
          })}
        </div>
        {errors.pta_status && (
          <p className="text-xs text-red-500 mt-1 font-semibold">{errors.pta_status.message}</p>
        )}
      </div>

      {/* 3. Storage & RAM (Complete Unrestricted Selection) */}
      <div className="space-y-6 pt-2">
        {/* Storage Selection */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-[#7657FF]" />
              <span>Internal Storage</span>
              <span className="text-red-500 font-bold">*</span>
            </label>
            <button
              type="button"
              onClick={() => setCustomStorageMode(!customStorageMode)}
              className="text-xs font-semibold text-[#7657FF] dark:text-[#9B82FF] hover:underline"
            >
              {customStorageMode ? 'Choose from list' : 'Other storage?'}
            </button>
          </div>

          {/* Standard Storage Options: 16, 32, 64, 128, 256, 512, 1024, 2048 */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {STORAGE_OPTIONS.map((gb) => {
              const label = gb >= 1024 ? `${gb / 1024} TB` : `${gb} GB`
              const isSelected = storageGb === gb
              return (
                <button
                  type="button"
                  key={gb}
                  onClick={() => {
                    setValue('storage_gb', gb, { shouldValidate: true })
                    setCustomStorageMode(false)
                  }}
                  className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center active:scale-[0.98] ${
                    isSelected
                      ? 'border-[#7657FF] bg-[#7657FF] text-white shadow-md ring-2 ring-[#7657FF]/40'
                      : 'border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1E1B38] text-slate-700 dark:text-slate-300 hover:border-[#7657FF]/40 hover:bg-slate-50 dark:hover:bg-[#252147]'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Custom Storage Input */}
          {customStorageMode && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#17152B] border border-slate-200 dark:border-[#2D2947] flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={4096}
                value={storageGb || ''}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10)
                  if (!isNaN(val) && val > 0) {
                    setValue('storage_gb', val, { shouldValidate: true })
                  }
                }}
                placeholder="Enter custom storage (in GB, e.g. 8, 48, 2048)"
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1E1B38] text-xs sm:text-sm text-slate-900 dark:text-[#F7F6F2] focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
              />
              <span className="text-xs font-bold text-slate-500">GB</span>
            </div>
          )}

          {errors.storage_gb && (
            <p className="text-xs text-red-500 mt-1 font-semibold">{errors.storage_gb.message}</p>
          )}
        </div>

        {/* RAM Selection */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#7657FF]" />
              <span>RAM Capacity</span>
              <span className="text-xs text-slate-400 font-normal">(Optional)</span>
            </label>
            <button
              type="button"
              onClick={() => setCustomRamMode(!customRamMode)}
              className="text-xs font-semibold text-[#7657FF] dark:text-[#9B82FF] hover:underline"
            >
              {customRamMode ? 'Choose from list' : 'Other RAM?'}
            </button>
          </div>

          {/* Standard RAM Options: 1, 2, 3, 4, 6, 8, 12, 16, 24 */}
          <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
            {RAM_OPTIONS.map((gb) => {
              const isSelected = ramGb === gb
              return (
                <button
                  type="button"
                  key={gb}
                  onClick={() => {
                    setValue('ram_gb', isSelected ? null : gb, { shouldValidate: true })
                    setCustomRamMode(false)
                  }}
                  className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center active:scale-[0.98] ${
                    isSelected
                      ? 'border-[#7657FF] bg-[#7657FF] text-white shadow-md ring-2 ring-[#7657FF]/40'
                      : 'border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1E1B38] text-slate-700 dark:text-slate-300 hover:border-[#7657FF]/40 hover:bg-slate-50 dark:hover:bg-[#252147]'
                  }`}
                >
                  {gb} GB
                </button>
              )
            })}
          </div>

          {/* Custom RAM Input */}
          {customRamMode && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#17152B] border border-slate-200 dark:border-[#2D2947] flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={64}
                value={ramGb || ''}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10)
                  if (!isNaN(val) && val > 0) {
                    setValue('ram_gb', val, { shouldValidate: true })
                  } else {
                    setValue('ram_gb', null, { shouldValidate: true })
                  }
                }}
                placeholder="Enter custom RAM (in GB, e.g. 5, 10, 18, 32)"
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1E1B38] text-xs sm:text-sm text-slate-900 dark:text-[#F7F6F2] focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
              />
              <span className="text-xs font-bold text-slate-500">GB</span>
            </div>
          )}

          {errors.ram_gb && (
            <p className="text-xs text-red-500 mt-1 font-semibold">{errors.ram_gb.message}</p>
          )}
        </div>
      </div>

      {/* 4. Color Selection */}
      <div className="space-y-2.5">
        <label
          htmlFor="color"
          className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block"
        >
          Phone Color <span className="text-xs text-slate-400 font-normal lowercase">(optional)</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {COLOR_OPTIONS.slice(0, 12).map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setValue('color', c, { shouldValidate: true })}
              className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all active:scale-95 ${
                watch('color') === c
                  ? 'border-[#7657FF] bg-[#7657FF] text-white shadow-xs'
                  : 'border-slate-200 dark:border-[#2D2947] bg-slate-50 dark:bg-[#1E1B38] text-slate-700 dark:text-slate-300 hover:border-[#7657FF]/40'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          id="color"
          type="text"
          placeholder="Or type custom color (e.g. Natural Titanium, Midnight, Phantom Black, Desert Titanium)"
          {...register('color')}
          className="w-full mt-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#17152B] text-slate-900 dark:text-[#F7F6F2] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
        />
        {errors.color && <p className="text-xs text-red-500 mt-1">{errors.color.message}</p>}
      </div>

      {/* 5. Battery Health (Only visible if condition === 'used') */}
      {condition === 'used' && (
        <div className="p-4 bg-slate-50 dark:bg-[#17152B] border border-slate-200 dark:border-[#2D2947] rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="battery_health"
              className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
            >
              <Battery className="w-4 h-4 text-emerald-500" />
              <span>Battery Health %</span>
            </label>
            <span className="text-xs font-mono font-bold text-[#7657FF] dark:text-[#9B82FF]">
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
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1E1B38] text-slate-900 dark:text-[#F7F6F2] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
          />
          {errors.battery_health && (
            <p className="text-xs text-red-500 mt-1 font-semibold">{errors.battery_health.message}</p>
          )}
        </div>
      )}

      {/* 6. Box & Accessories Toggles */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setValue('has_box', !hasBox)}
          className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-between transition-all active:scale-[0.98] ${
            hasBox
              ? 'border-[#7657FF] bg-[#7657FF]/15 dark:bg-[#7657FF]/25 text-[#7657FF] dark:text-white ring-2 ring-[#7657FF]/30 shadow-xs'
              : 'border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1E1B38] text-slate-700 dark:text-slate-300 hover:border-[#7657FF]/40'
          }`}
        >
          <span className="flex items-center gap-2">
            <Package className="w-4 h-4 text-slate-400" />
            <span>Original Box</span>
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              hasBox
                ? 'bg-[#7657FF] text-white'
                : 'bg-slate-100 dark:bg-[#28244B] text-slate-500 dark:text-slate-400'
            }`}
          >
            {hasBox ? 'Yes ✓' : 'No'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setValue('has_accessories', !hasAccessories)}
          className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-between transition-all active:scale-[0.98] ${
            hasAccessories
              ? 'border-[#7657FF] bg-[#7657FF]/15 dark:bg-[#7657FF]/25 text-[#7657FF] dark:text-white ring-2 ring-[#7657FF]/30 shadow-xs'
              : 'border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1E1B38] text-slate-700 dark:text-slate-300 hover:border-[#7657FF]/40'
          }`}
        >
          <span className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-slate-400" />
            <span>Accessories</span>
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              hasAccessories
                ? 'bg-[#7657FF] text-white'
                : 'bg-slate-100 dark:bg-[#28244B] text-slate-500 dark:text-slate-400'
            }`}
          >
            {hasAccessories ? 'Yes ✓' : 'No'}
          </span>
        </button>
      </div>

      {/* 7. Warranty Selection */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
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
                className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-bold text-center transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                  isSelected
                    ? 'border-[#7657FF] bg-[#7657FF]/15 dark:bg-[#7657FF]/25 text-[#7657FF] dark:text-white ring-2 ring-[#7657FF]/40 shadow-xs'
                    : 'border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1E1B38] text-slate-700 dark:text-slate-300 hover:border-[#7657FF]/40'
                }`}
              >
                <span>{WARRANTY_LABELS[w]}</span>
                {isSelected && <Check className="w-4 h-4 text-[#7657FF] dark:text-[#9B82FF]" />}
              </button>
            )
          })}
        </div>

        {warrantyType === 'in_warranty' && (
          <div className="p-4 bg-slate-50 dark:bg-[#17152B] border border-slate-200 dark:border-[#2D2947] rounded-2xl space-y-2">
            <label
              htmlFor="warranty_months"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
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
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1E1B38] text-slate-900 dark:text-[#F7F6F2] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
            />
            {errors.warranty_months_remaining && (
              <p className="text-xs text-red-500 mt-1 font-semibold">
                {errors.warranty_months_remaining.message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
