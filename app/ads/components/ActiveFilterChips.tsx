'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'

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
  const ram = searchParams.get('ram')
  const battery = searchParams.get('battery')
  const storageNum = storage ? Number(storage) : 0

  const chips: { key: string; label: string; removeKey: string }[] = []

  if (q) chips.push({ key: 'q', label: `Search: "${q}"`, removeKey: 'q' })
  if (brand) chips.push({ key: 'brand', label: `Brand: ${brandName || brand}`, removeKey: 'brand' })
  if (model) chips.push({ key: 'model', label: `Model: ${modelName || model}`, removeKey: 'model' })
  if (city) chips.push({ key: 'city', label: `City: ${cityName || city}`, removeKey: 'city' })
  if (area) chips.push({ key: 'area', label: `Area: ${areaName || area}`, removeKey: 'area' })
  if (minPrice) chips.push({ key: 'min_price', label: `Min: Rs ${Number(minPrice).toLocaleString()}`, removeKey: 'min_price' })
  if (maxPrice) chips.push({ key: 'max_price', label: `Max: Rs ${Number(maxPrice).toLocaleString()}`, removeKey: 'max_price' })
  if (pta) chips.push({ key: 'pta', label: `PTA: ${pta === 'pta_approved' ? 'Approved' : pta}`, removeKey: 'pta' })
  if (condition) chips.push({ key: 'condition', label: `Condition: ${condition === 'new' ? 'New' : 'Used'}`, removeKey: 'condition' })
  if (storageNum > 0) chips.push({ key: 'storage', label: `Storage: ${storageNum >= 1024 ? `${storageNum / 1024}TB` : `${storageNum}GB`}`, removeKey: 'storage' })
  if (ram) chips.push({ key: 'ram', label: `RAM: ${ram}GB`, removeKey: 'ram' })
  if (battery) chips.push({ key: 'battery', label: `Battery: ${battery}%+`, removeKey: 'battery' })

  if (chips.length === 0) return null

  const removeParam = (key: string) => {
    const next = new URLSearchParams(searchParams.toString())
    next.delete(key)
    if (key === 'brand') next.delete('model')
    if (key === 'city') next.delete('area')
    next.delete('cursor')
    router.push(`/ads?${next.toString()}`)
  }

  const clearAll = () => {
    router.push('/ads')
  }

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 pb-4">
      <span className="text-xs font-bold text-slate-400">Active:</span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => removeParam(chip.removeKey)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer"
        >
          <span>{chip.label}</span>
          <X className="w-3 h-3 text-blue-600 dark:text-blue-400" />
        </button>
      ))}

      <button
        type="button"
        onClick={clearAll}
        className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline ml-1 cursor-pointer"
      >
        Clear All
      </button>
    </div>
  )
}
