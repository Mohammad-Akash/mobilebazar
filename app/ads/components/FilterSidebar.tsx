'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BrandOption, CityOption, ModelOption, AreaOption } from '@/src/lib/data/reference'
import { createClient } from '@/src/lib/supabase/client'
import { STORAGE_OPTIONS } from '@/src/lib/constants/ad-options'

interface FilterSidebarProps {
  brands: BrandOption[]
  cities: CityOption[]
}

export function FilterSidebar({ brands, cities }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isOpenMobile, setIsOpenMobile] = useState(false)

  // Local filter form state synced from URL
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '')
  const [selectedModel, setSelectedModel] = useState(searchParams.get('model') || '')
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '')
  const [selectedArea, setSelectedArea] = useState(searchParams.get('area') || '')
  const [minPrice, setMinPrice] = useState(searchParams.get('min_price') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('max_price') || '')
  const [ptaStatus, setPtaStatus] = useState(searchParams.get('pta') || '')
  const [condition, setCondition] = useState(searchParams.get('condition') || '')
  const [storage, setStorage] = useState(searchParams.get('storage') || '')

  const [models, setModels] = useState<ModelOption[]>([])
  const [areas, setAreas] = useState<AreaOption[]>([])
  const [loadingModels, setLoadingModels] = useState(false)
  const [loadingAreas, setLoadingAreas] = useState(false)

  // Keep state synced if URL params change externally
  useEffect(() => {
    setSelectedBrand(searchParams.get('brand') || '')
    setSelectedModel(searchParams.get('model') || '')
    setSelectedCity(searchParams.get('city') || '')
    setSelectedArea(searchParams.get('area') || '')
    setMinPrice(searchParams.get('min_price') || '')
    setMaxPrice(searchParams.get('max_price') || '')
    setPtaStatus(searchParams.get('pta') || '')
    setCondition(searchParams.get('condition') || '')
    setStorage(searchParams.get('storage') || '')
  }, [searchParams])

  // Fetch models when selectedBrand changes
  useEffect(() => {
    if (!selectedBrand) {
      setModels([])
      return
    }
    const brandObj = brands.find((b) => b.slug === selectedBrand)
    if (!brandObj) return

    setLoadingModels(true)
    const supabase = createClient()
    supabase
      .from('models')
      .select('id, brand_id, name, slug, release_year, storage_options, ram_options')
      .eq('brand_id', brandObj.id)
      .eq('is_active', true)
      .order('name')
      .then(({ data }) => {
        setLoadingModels(false)
        setModels((data as ModelOption[]) || [])
      })
  }, [selectedBrand, brands])

  // Fetch areas when selectedCity changes
  useEffect(() => {
    if (!selectedCity) {
      setAreas([])
      return
    }
    const cityObj = cities.find((c) => c.slug === selectedCity)
    if (!cityObj) return

    setLoadingAreas(true)
    const supabase = createClient()
    supabase
      .from('areas')
      .select('id, city_id, name, slug')
      .eq('city_id', cityObj.id)
      .eq('is_active', true)
      .order('name')
      .then(({ data }) => {
        setLoadingAreas(false)
        setAreas((data as AreaOption[]) || [])
      })
  }, [selectedCity, cities])

  // Apply filters by building query string
  const handleApply = (e?: React.FormEvent) => {
    e?.preventDefault()
    const next = new URLSearchParams()

    const q = searchParams.get('q')
    const sort = searchParams.get('sort')
    if (q) next.set('q', q)
    if (sort) next.set('sort', sort)

    if (selectedBrand) next.set('brand', selectedBrand)
    if (selectedModel) next.set('model', selectedModel)
    if (selectedCity) next.set('city', selectedCity)
    if (selectedArea) next.set('area', selectedArea)
    if (minPrice) next.set('min_price', minPrice)
    if (maxPrice) next.set('max_price', maxPrice)
    if (ptaStatus) next.set('pta', ptaStatus)
    if (condition) next.set('condition', condition)
    if (storage) next.set('storage', storage)

    setIsOpenMobile(false)
    router.push(`/ads?${next.toString()}`)
  }

  // Count active filter fields
  const activeCount = [
    selectedBrand,
    selectedModel,
    selectedCity,
    selectedArea,
    minPrice,
    maxPrice,
    ptaStatus,
    condition,
    storage,
  ].filter(Boolean).length

  const filterFormContent = (
    <form onSubmit={handleApply} className="space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm uppercase tracking-wider">
          Filters
        </h3>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={() => {
              setSelectedBrand('')
              setSelectedModel('')
              setSelectedCity('')
              setSelectedArea('')
              setMinPrice('')
              setMaxPrice('')
              setPtaStatus('')
              setCondition('')
              setStorage('')
              router.push('/ads')
              setIsOpenMobile(false)
            }}
            className="text-xs font-semibold text-red-600 hover:underline"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Brand */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Brand</label>
        <select
          value={selectedBrand}
          onChange={(e) => {
            setSelectedBrand(e.target.value)
            setSelectedModel('')
          }}
          className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b.id} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Model (Dependent) */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Model</label>
        <select
          value={selectedModel}
          disabled={!selectedBrand || loadingModels}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
        >
          <option value="">
            {!selectedBrand
              ? '-- Pehle Brand Chunein --'
              : loadingModels
              ? 'Loading models...'
              : 'All Models'}
          </option>
          {models.map((m) => (
            <option key={m.id} value={m.slug}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">City</label>
        <select
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value)
            setSelectedArea('')
          }}
          className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Poora Pakistan (All Cities)</option>
          {cities.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Area (Dependent) */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Area</label>
        <select
          value={selectedArea}
          disabled={!selectedCity || loadingAreas}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
        >
          <option value="">
            {!selectedCity
              ? '-- Pehle City Chunein --'
              : loadingAreas
              ? 'Loading areas...'
              : 'All Areas'}
          </option>
          {areas.map((a) => (
            <option key={a.id} value={a.slug}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Price (PKR)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min (Rs)"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="number"
            placeholder="Max (Rs)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* PTA Status */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">PTA Status</label>
        <select
          value={ptaStatus}
          onChange={(e) => setPtaStatus(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">All PTA Status</option>
          <option value="pta_approved">PTA Approved ✅</option>
          <option value="non_pta">Non-PTA</option>
          <option value="jv">JV Patched</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* Condition */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Condition</label>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">All Conditions</option>
          <option value="used">Used (Istemal Shuda)</option>
          <option value="new">Brand New (Naya)</option>
        </select>
      </div>

      {/* Storage */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Storage</label>
        <select
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">All Storage</option>
          {STORAGE_OPTIONS.map((gb) => (
            <option key={gb} value={gb}>
              {gb >= 1024 ? `${gb / 1024}TB` : `${gb}GB`}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-md transition-all text-center"
      >
        Apply Filters
      </button>
    </form>
  )

  return (
    <>
      {/* 1. Mobile Filter Button Bar */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setIsOpenMobile(true)}
          className="w-full py-3 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-bold text-xs text-zinc-800 dark:text-zinc-200 flex items-center justify-between shadow-sm"
        >
          <span className="flex items-center gap-2">
            <span>⚙️</span>
            <span>Filters & Categories</span>
          </span>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
              {activeCount} active
            </span>
          )}
        </button>
      </div>

      {/* 2. Mobile Bottom Sheet / Modal */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpenMobile(false)}
          />
          <div className="relative bg-white dark:bg-zinc-900 rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto z-10 shadow-2xl border-t border-zinc-200 dark:border-zinc-800">
            <div className="w-12 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-auto mb-4" />
            {filterFormContent}
          </div>
        </div>
      )}

      {/* 3. Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm sticky top-20">
          {filterFormContent}
        </div>
      </aside>
    </>
  )
}

