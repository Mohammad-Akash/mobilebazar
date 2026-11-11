'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BrandOption, CityOption, ModelOption, AreaOption } from '@/src/lib/data/reference'
import { createClient } from '@/src/lib/supabase/client'
import { STORAGE_OPTIONS } from '@/src/lib/constants/ad-options'
import { SlidersHorizontal, RotateCcw, X, ShieldCheck, Battery, Cpu, HardDrive } from 'lucide-react'

interface FilterSidebarProps {
  brands: BrandOption[]
  cities: CityOption[]
}

const RAM_OPTIONS = [4, 6, 8, 12, 16]
const BATTERY_HEALTH_OPTIONS = [80, 85, 90, 95]

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
  const [ram, setRam] = useState(searchParams.get('ram') || '')
  const [minBattery, setMinBattery] = useState(searchParams.get('battery') || '')

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
    setRam(searchParams.get('ram') || '')
    setMinBattery(searchParams.get('battery') || '')
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
      .then(
        ({ data }) => {
          setLoadingModels(false)
          setModels((data as ModelOption[]) || [])
        },
        () => {
          setLoadingModels(false)
        }
      )
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
      .then(
        ({ data }) => {
          setLoadingAreas(false)
          setAreas((data as AreaOption[]) || [])
        },
        () => {
          setLoadingAreas(false)
        }
      )
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
    if (ram) next.set('ram', ram)
    if (minBattery) next.set('battery', minBattery)

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
    ram,
    minBattery,
  ].filter(Boolean).length

  const resetAll = () => {
    setSelectedBrand('')
    setSelectedModel('')
    setSelectedCity('')
    setSelectedArea('')
    setMinPrice('')
    setMaxPrice('')
    setPtaStatus('')
    setCondition('')
    setStorage('')
    setRam('')
    setMinBattery('')
    router.push('/ads')
    setIsOpenMobile(false)
  }

  const filterFormContent = (
    <form onSubmit={handleApply} className="space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E7EF] dark:border-[#2D2947]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#7657FF]" />
          <h3 className="font-bold text-[#17152B] dark:text-[#F7F6F2] text-sm tracking-tight">
            Filters
          </h3>
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={resetAll}
            className="text-xs font-semibold text-[#E45858] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset ({activeCount})</span>
          </button>
        )}
      </div>

      {/* Brand */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">Brand</label>
        <select
          value={selectedBrand}
          onChange={(e) => {
            setSelectedBrand(e.target.value)
            setSelectedModel('')
          }}
          className="w-full px-3 py-2 bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] rounded-xl text-xs font-medium text-[#17152B] dark:text-[#F7F6F2] focus:outline-none focus:ring-2 focus:ring-[#7657FF] cursor-pointer"
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
        <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">Model</label>
        <select
          value={selectedModel}
          disabled={!selectedBrand || loadingModels}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full px-3 py-2 bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] rounded-xl text-xs font-medium text-[#17152B] dark:text-[#F7F6F2] focus:outline-none focus:ring-2 focus:ring-[#7657FF] disabled:opacity-50 cursor-pointer"
        >
          <option value="">
            {!selectedBrand
              ? '-- Select Brand First --'
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
        <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">Location (City)</label>
        <select
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value)
            setSelectedArea('')
          }}
          className="w-full px-3 py-2 bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] rounded-xl text-xs font-medium text-[#17152B] dark:text-[#F7F6F2] focus:outline-none focus:ring-2 focus:ring-[#7657FF] cursor-pointer"
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Area (Dependent) */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">Area</label>
        <select
          value={selectedArea}
          disabled={!selectedCity || loadingAreas}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="w-full px-3 py-2 bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] rounded-xl text-xs font-medium text-[#17152B] dark:text-[#F7F6F2] focus:outline-none focus:ring-2 focus:ring-[#7657FF] disabled:opacity-50 cursor-pointer"
        >
          <option value="">
            {!selectedCity
              ? '-- Select City First --'
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
        <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">Price (PKR)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] rounded-xl text-xs font-medium text-[#17152B] dark:text-[#F7F6F2] focus:outline-none focus:ring-2 focus:ring-[#7657FF] tabular-nums"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] rounded-xl text-xs font-medium text-[#17152B] dark:text-[#F7F6F2] focus:outline-none focus:ring-2 focus:ring-[#7657FF] tabular-nums"
          />
        </div>
      </div>

      {/* PTA Status */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#159B72]" />
          <span>PTA Status</span>
        </label>
        <select
          value={ptaStatus}
          onChange={(e) => setPtaStatus(e.target.value)}
          className="w-full px-3 py-2 bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] rounded-xl text-xs font-medium text-[#17152B] dark:text-[#F7F6F2] focus:outline-none focus:ring-2 focus:ring-[#7657FF] cursor-pointer"
        >
          <option value="">All PTA Status</option>
          <option value="pta_approved">Official PTA Approved</option>
          <option value="non_pta">Non-PTA (SIM Lock)</option>
          <option value="jv">JV / Gevey</option>
        </select>
      </div>

      {/* RAM (Smartphone specific) */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] flex items-center gap-1">
          <Cpu className="w-3.5 h-3.5 text-[#7657FF]" />
          <span>RAM</span>
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {RAM_OPTIONS.map((r) => {
            const isSelected = ram === String(r)
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRam(isSelected ? '' : String(r))}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#7657FF] text-white border-[#7657FF] shadow-2xs'
                    : 'bg-[#F7F6F2] dark:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] border-[#E9E7EF] dark:border-[#2D2947] hover:border-[#7657FF]/60'
                }`}
              >
                {r}GB
              </button>
            )
          })}
        </div>
      </div>

      {/* Internal Storage */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] flex items-center gap-1">
          <HardDrive className="w-3.5 h-3.5 text-[#7657FF]" />
          <span>Internal Storage</span>
        </label>
        <select
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
          className="w-full px-3 py-2 bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] rounded-xl text-xs font-medium text-[#17152B] dark:text-[#F7F6F2] focus:outline-none focus:ring-2 focus:ring-[#7657FF] cursor-pointer"
        >
          <option value="">All Storage Sizes</option>
          {STORAGE_OPTIONS.map((gb) => (
            <option key={gb} value={gb}>
              {gb >= 1024 ? `${gb / 1024}TB` : `${gb}GB`}
            </option>
          ))}
        </select>
      </div>

      {/* Battery Health */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2] flex items-center gap-1">
          <Battery className="w-3.5 h-3.5 text-[#159B72]" />
          <span>Min. Battery Health</span>
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {BATTERY_HEALTH_OPTIONS.map((b) => {
            const isSelected = minBattery === String(b)
            return (
              <button
                key={b}
                type="button"
                onClick={() => setMinBattery(isSelected ? '' : String(b))}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#159B72] text-white border-[#159B72] shadow-2xs'
                    : 'bg-[#F7F6F2] dark:bg-[#211E38] text-[#17152B] dark:text-[#F7F6F2] border-[#E9E7EF] dark:border-[#2D2947] hover:border-[#159B72]/60'
                }`}
              >
                {b}%+
              </button>
            )
          })}
        </div>
      </div>

      {/* Condition */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">Condition</label>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full px-3 py-2 bg-[#F7F6F2] dark:bg-[#211E38] border border-[#E9E7EF] dark:border-[#2D2947] rounded-xl text-xs font-medium text-[#17152B] dark:text-[#F7F6F2] focus:outline-none focus:ring-2 focus:ring-[#7657FF] cursor-pointer"
        >
          <option value="">All Conditions</option>
          <option value="used">Used / Pre-Owned</option>
          <option value="new">Brand New Sealed</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-sm transition-all text-center cursor-pointer"
      >
        Apply Filters
      </button>
    </form>
  )

  return (
    <>
      {/* 1. Mobile Filter Button Bar */}
      <div className="lg:hidden mb-4 w-full">
        <button
          type="button"
          onClick={() => setIsOpenMobile(true)}
          className="w-full py-3 px-4 rounded-xl bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] font-bold text-xs text-[#17152B] dark:text-[#F7F6F2] flex items-center justify-between shadow-xs cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#7657FF]" />
            <span>Refine Search</span>
          </span>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#7657FF] text-white text-[10px] font-bold">
              {activeCount} active
            </span>
          )}
        </button>
      </div>

      {/* 2. Mobile Bottom Sheet */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsOpenMobile(false)}
          />
          <div className="relative bg-[#FFFFFF] dark:bg-[#17152B] rounded-t-3xl p-6 max-h-[88vh] overflow-y-auto z-10 shadow-2xl border-t border-[#E9E7EF] dark:border-[#2D2947]">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E9E7EF] dark:border-[#2D2947]">
              <span className="font-extrabold text-sm text-[#17152B] dark:text-[#F7F6F2]">
                Refine Smartphone Search
              </span>
              <button
                type="button"
                onClick={() => setIsOpenMobile(false)}
                className="p-1 rounded-lg text-[#77758A] hover:text-[#17152B] dark:hover:text-[#F7F6F2]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterFormContent}
          </div>
        </div>
      )}

      {/* 3. Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-2xl p-5 shadow-xs sticky top-20">
          {filterFormContent}
        </div>
      </aside>
    </>
  )
}
