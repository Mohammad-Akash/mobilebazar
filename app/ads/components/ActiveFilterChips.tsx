'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface ActiveFilterChipsProps {
  brandName?: string
  modelName?: string
  cityName?: string
  areaName?: string
}

export function ActiveFilterChips({
  brandName,
  modelName,
  cityName,
  areaName,
}: ActiveFilterChipsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const q = searchParams.get('q')
  const brand = searchParams.get('brand')
  const model = searchParams.get('model')
  const city = searchParams.get('city')
  const area = searchParams.get('area')
  const minPrice = searchParams.get('min_price')
  const maxPrice = searchParams.get('max_price')
  const pta = searchParams.get('pta')
  const condition = searchParams.get('condition')
  const storage = searchParams.get('storage')
  const storageNum = storage ? Number(storage) : 0

  const chips: { key: string; label: string; removeKey: string }[] = []

  if (q) chips.push({ key: 'q', label: `Search: "${q}"`, removeKey: 'q' })
  if (brand) chips.push({ key: 'brand', label: `Brand: ${brandName || brand}`, removeKey: 'brand' })
  if (model) chips.push({ key: 'model', label: `Model: ${modelName || model}`, removeKey: 'model' })
  if (city) chips.push({ key: 'city', label: `City: ${cityName || city}`, removeKey: 'city' })
  if (area) chips.push({ key: 'area', label: `Area: ${areaName || area}`, removeKey: 'area' })
  if (minPrice) chips.push({ key: 'min_price', label: `Min: Rs ${Number(minPrice).toLocaleString()}`, removeKey: 'min_price' })
  if (maxPrice) chips.push({ key: 'max_price', label: `Max: Rs ${Number(maxPrice).toLocaleString()}`, removeKey: 'max_price' })
  if (pta) chips.push({ key: 'pta', label: `PTA: ${pta.replace('_', ' ')}`, removeKey: 'pta' })
  if (condition) chips.push({ key: 'condition', label: `Condition: ${condition}`, removeKey: 'condition' })
  if (storageNum > 0) chips.push({ key: 'storage', label: `Storage: ${storageNum >= 1024 ? `${storageNum/1024}TB` : `${storageNum}GB`}`, removeKey: 'storage' })

  if (chips.length === 0) return null

  const removeParam = (key: string) => {
    const next = new URLSearchParams(searchParams.toString())
    next.delete(key)
    if (key === 'brand') next.delete('model')
    if (key === 'city') next.delete('area')
    next.delete('cursor') // reset cursor
    router.push(`/ads?${next.toString()}`)
  }

  const clearAll = () => {
    router.push('/ads')
  }

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 pb-3">
      <span className="text-xs font-semibold text-zinc-400">Filters:</span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => removeParam(chip.removeKey)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 transition-colors"
        >
          <span>{chip.label}</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">×</span>
        </button>
      ))}

      <button
        type="button"
        onClick={clearAll}
        className="text-xs font-semibold text-red-600 hover:underline ml-1"
      >
        Clear All
      </button>
    </div>
  )
}
