'use client'

import { useEffect, useState, useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { BrandOption, ModelOption } from '@/src/lib/data/reference'
import { getCatalogModelsForBrand, CATALOG_BRANDS, ExtendedBrandOption } from '@/src/lib/data/phone-catalog'
import { createClient } from '@/src/lib/supabase/client'
import {
  Smartphone,
  Check,
  Search,
  Sparkles,
  PlusCircle,
  X,
  Layers,
  Calendar,
  HardDrive,
  Flame,
  Globe,
} from 'lucide-react'

interface Step1Props {
  form: UseFormReturn<FullAdFormData>
  brands: BrandOption[]
  onModelSelected?: (model: ModelOption | null) => void
}

export function Step1Phone({ form, brands: propBrands, onModelSelected }: Step1Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form

  const selectedBrandId = watch('brand_id')
  const selectedModelId = watch('model_id')

  // Merge server prop brands with our master catalog brands (66 brands)
  const allBrands: ExtendedBrandOption[] = useMemo(() => {
    const list: ExtendedBrandOption[] = [...CATALOG_BRANDS]
    if (propBrands && propBrands.length > 0) {
      const slugMap = new Map(list.map((b) => [b.slug.toLowerCase(), b]))
      for (const pb of propBrands) {
        const existing = slugMap.get(pb.slug.toLowerCase())
        if (existing) {
          existing.id = pb.id // prioritize Supabase DB id if available
        } else {
          list.push({ ...pb, tier: 2 })
        }
      }
    }
    return list
  }, [propBrands])

  const [brandSearch, setBrandSearch] = useState('')
  const [brandTierFilter, setBrandTierFilter] = useState<'all' | '1' | '2' | '3'>('1')
  const [modelSearch, setModelSearch] = useState('')
  const [yearFilter, setYearFilter] = useState<string>('all')
  const [customModelMode, setCustomModelMode] = useState(false)
  const [customModelName, setCustomModelName] = useState('')

  const selectedBrand = useMemo(() => {
    return allBrands.find((b) => b.id === selectedBrandId) || null
  }, [allBrands, selectedBrandId])

  const [models, setModels] = useState<ModelOption[]>(() => {
    if (!selectedBrandId) return []
    const b = allBrands.find((brand) => brand.id === selectedBrandId)
    return getCatalogModelsForBrand(b?.slug || b?.name || selectedBrandId, selectedBrandId)
  })
  const [loadingModels, setLoadingModels] = useState(false)

  // Fetch or initialize models when brand changes
  useEffect(() => {
    if (!selectedBrandId) {
      setModels([])
      return
    }

    const b = allBrands.find((brand) => brand.id === selectedBrandId)
    const brandSlugOrName = b?.slug || b?.name || selectedBrandId

    // 1. Instantly provide models from master catalog so there is zero delay
    const instantModels = getCatalogModelsForBrand(brandSlugOrName, selectedBrandId)
    setModels(instantModels)

    // 2. Query Supabase in background to merge any custom/new models from DB
    let isMounted = true
    setLoadingModels(true)

    async function loadDbModels() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('models')
          .select('id, brand_id, name, slug, release_year, storage_options, ram_options')
          .eq('brand_id', selectedBrandId)
          .eq('is_active', true)
          .order('name')

        if (!isMounted) return
        setLoadingModels(false)

        if (!error && data && data.length > 0) {
          const dbModels = data as ModelOption[]
          const existingSlugs = new Set(dbModels.map((m) => m.slug))
          const remainingCatalog = instantModels.filter((m: ModelOption) => !existingSlugs.has(m.slug))
          setModels([...dbModels, ...remainingCatalog])
        }
      } catch {
        if (isMounted) setLoadingModels(false)
      }
    }

    loadDbModels()

    return () => {
      isMounted = false
    }
  }, [selectedBrandId, allBrands])

  // Inform parent when selected model changes
  useEffect(() => {
    if (!selectedModelId) {
      onModelSelected?.(null)
      return
    }
    const found = models.find((m) => m.id === selectedModelId)
    onModelSelected?.(found || null)
  }, [selectedModelId, models, onModelSelected])

  // Handle Brand selection
  const handleBrandSelect = (brandId: string) => {
    setValue('brand_id', brandId, { shouldValidate: true })
    setValue('model_id', '', { shouldValidate: true })
    setModelSearch('')
    setYearFilter('all')
    setCustomModelMode(false)
    setCustomModelName('')
  }

  // Handle Model selection
  const handleModelSelect = (model: ModelOption) => {
    setValue('model_id', model.id, { shouldValidate: true })
    setCustomModelMode(false)
  }

  // Handle Custom Model submission
  const handleApplyCustomModel = () => {
    if (!customModelName.trim() || !selectedBrandId) return
    const customId = `a10100ff-0000-4000-8000-${Date.now().toString(16).padStart(12, '0').slice(-12)}`
    const customOption: ModelOption = {
      id: customId,
      brand_id: selectedBrandId,
      name: customModelName.trim(),
      slug: customModelName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      release_year: new Date().getFullYear(),
      storage_options: [64, 128, 256, 512],
      ram_options: [4, 6, 8, 12],
    }
    setModels((prev) => [customOption, ...prev])
    setValue('model_id', customId, { shouldValidate: true })
    onModelSelected?.(customOption)
  }

  // Filtered brands based on search query & tier tab
  const filteredBrands = useMemo(() => {
    let list = allBrands

    if (brandSearch.trim()) {
      const q = brandSearch.toLowerCase().trim()
      return list.filter((b) => b.name.toLowerCase().includes(q))
    }

    if (brandTierFilter !== 'all') {
      const targetTier = parseInt(brandTierFilter, 10)
      list = list.filter((b) => b.tier === targetTier)
    }

    return list
  }, [allBrands, brandSearch, brandTierFilter])

  // Extract unique release years for quick filters
  const availableYears = useMemo(() => {
    const years = new Set<number>()
    models.forEach((m) => {
      if (m.release_year) years.add(m.release_year)
    })
    return Array.from(years).sort((a, b) => b - a)
  }, [models])

  // Filtered models based on text search and year filter
  const filteredModels = useMemo(() => {
    let list = models

    if (yearFilter !== 'all') {
      const targetYear = parseInt(yearFilter, 10)
      list = list.filter((m) => m.release_year === targetYear)
    }

    if (modelSearch.trim()) {
      const q = modelSearch.toLowerCase().trim()
      list = list.filter((m) => m.name.toLowerCase().includes(q))
    }

    return list
  }, [models, yearFilter, modelSearch])

  return (
    <div className="space-y-8">
      {/* Hidden inputs registered with react-hook-form */}
      <input type="hidden" {...register('brand_id')} />
      <input type="hidden" {...register('model_id')} />

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7657FF]/10 text-[#7657FF] dark:text-[#9B82FF] text-xs font-bold mb-2">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Step 1 of 6</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-[#F7F6F2] flex items-center gap-2">
          <span>Choose Phone Brand & Model</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Select your smartphone manufacturer and model from Pakistan&apos;s master phone catalog.
        </p>
      </div>

      {/* =========================================================================
          SECTION 1: BRAND SELECTION (Single, Clean, Searchable Grid)
          ========================================================================= */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#7657FF]" />
            <span>Select Brand ({allBrands.length} Brands Available)</span>
            <span className="text-red-500 font-bold">*</span>
          </label>
          {selectedBrand && (
            <span className="text-xs font-semibold text-[#7657FF] dark:text-[#9B82FF] flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Selected: <strong className="font-bold underline">{selectedBrand.name}</strong>
            </span>
          )}
        </div>

        {/* Brand Search Bar & Tier Tabs */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              placeholder="Search any brand (e.g. Apple, Samsung, Xiaomi, Redmi, Poco, Infinix, Vivo, QMobile)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#17152B] text-slate-900 dark:text-[#F7F6F2] placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF] focus:border-transparent transition-all"
            />
            {brandSearch && (
              <button
                type="button"
                onClick={() => setBrandSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Category Filters when not searching */}
          {!brandSearch && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <button
                type="button"
                onClick={() => setBrandTierFilter('1')}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition-all shrink-0 ${
                  brandTierFilter === '1'
                    ? 'bg-[#7657FF] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#1E1B38] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#28244B]'
                }`}
              >
                <Flame className="w-3 h-3" />
                <span>Popular Brands (Top 19)</span>
              </button>
              <button
                type="button"
                onClick={() => setBrandTierFilter('2')}
                className={`px-3 py-1 rounded-lg font-bold transition-all shrink-0 ${
                  brandTierFilter === '2'
                    ? 'bg-[#7657FF] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#1E1B38] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#28244B]'
                }`}
              >
                <span>Secondary Brands</span>
              </button>
              <button
                type="button"
                onClick={() => setBrandTierFilter('3')}
                className={`px-3 py-1 rounded-lg font-bold transition-all shrink-0 ${
                  brandTierFilter === '3'
                    ? 'bg-[#7657FF] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#1E1B38] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#28244B]'
                }`}
              >
                <span>Local & Budget</span>
              </button>
              <button
                type="button"
                onClick={() => setBrandTierFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition-all shrink-0 ${
                  brandTierFilter === 'all'
                    ? 'bg-[#7657FF] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#1E1B38] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#28244B]'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>All 66 Brands</span>
              </button>
            </div>
          )}
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2.5 max-h-[220px] overflow-y-auto pr-1 select-none scrollbar-thin">
          {filteredBrands.map((b) => {
            const isSelected = selectedBrandId === b.id
            return (
              <button
                type="button"
                key={b.id}
                onClick={() => handleBrandSelect(b.id)}
                className={`group relative p-3 rounded-xl border text-left transition-all flex items-center justify-between active:scale-[0.98] ${
                  isSelected
                    ? 'border-[#7657FF] bg-[#7657FF]/15 dark:bg-[#7657FF]/25 text-[#7657FF] dark:text-white ring-2 ring-[#7657FF]/50 shadow-sm font-bold'
                    : 'border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1E1B38]/70 text-slate-700 dark:text-slate-200 hover:border-[#7657FF]/40 hover:bg-slate-50 dark:hover:bg-[#252147]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#7657FF] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-[#2A264F] text-slate-600 dark:text-slate-300 group-hover:text-[#7657FF]'
                    }`}
                  >
                    {b.name.charAt(0)}
                  </div>
                  <span className="text-xs sm:text-sm truncate">{b.name}</span>
                </div>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-[#7657FF] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {filteredBrands.length === 0 && (
          <div className="p-4 rounded-xl text-center bg-slate-50 dark:bg-[#17152B] border border-dashed border-slate-300 dark:border-[#2D2947] text-xs text-slate-500">
            No brand found matching &ldquo;{brandSearch}&rdquo;.
          </div>
        )}

        {errors.brand_id && (
          <p className="text-xs text-red-500 font-semibold mt-1">
            {errors.brand_id.message || 'Please select a smartphone brand'}
          </p>
        )}
      </div>

      {/* =========================================================================
          SECTION 2: MODEL SELECTION (Theme-matching list, search, year pills)
          ========================================================================= */}
      {selectedBrand ? (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#2D2947]/80 animate-in fade-in-50 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#7657FF]" />
                <span>
                  Select {selectedBrand.name} Model ({models.length} Models)
                </span>
                <span className="text-red-500 font-bold">*</span>
              </label>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Choose the exact model or variant below.
              </p>
            </div>

            {/* Custom Model Toggle */}
            <button
              type="button"
              onClick={() => setCustomModelMode(!customModelMode)}
              className="text-xs font-semibold text-[#7657FF] dark:text-[#9B82FF] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{customModelMode ? 'Browse Catalog Models' : 'Not in list? Enter Custom'}</span>
            </button>
          </div>

          {/* Custom Model Input (If user selects custom) */}
          {customModelMode && (
            <div className="p-4 rounded-2xl bg-[#7657FF]/10 dark:bg-[#7657FF]/15 border border-[#7657FF]/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#7657FF] dark:text-[#9B82FF]">
                <Sparkles className="w-4 h-4" />
                <span>Enter Custom {selectedBrand.name} Model</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customModelName}
                  onChange={(e) => setCustomModelName(e.target.value)}
                  placeholder={`e.g. ${selectedBrand.name} Special Edition`}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#17152B] text-slate-900 dark:text-[#F7F6F2] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
                />
                <button
                  type="button"
                  onClick={handleApplyCustomModel}
                  disabled={!customModelName.trim()}
                  className="px-4 py-2 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white text-xs font-bold transition-all disabled:opacity-50"
                >
                  Use Model
                </button>
              </div>
            </div>
          )}

          {/* Search & Year Filters */}
          <div className="space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={modelSearch}
                onChange={(e) => setModelSearch(e.target.value)}
                placeholder={`Search ${selectedBrand.name} models (e.g. Pro, Ultra, 5G, Max)...`}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#17152B] text-slate-900 dark:text-[#F7F6F2] placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF] focus:border-transparent transition-all"
              />
              {modelSearch && (
                <button
                  type="button"
                  onClick={() => setModelSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Year Quick Filters */}
            {availableYears.length > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 mr-1">
                  <Calendar className="w-3 h-3" />
                  Year:
                </span>
                <button
                  type="button"
                  onClick={() => setYearFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 ${
                    yearFilter === 'all'
                      ? 'bg-[#7657FF] text-white'
                      : 'bg-slate-100 dark:bg-[#1E1B38] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#28244B]'
                  }`}
                >
                  All Years
                </button>
                {availableYears.map((yr) => (
                  <button
                    type="button"
                    key={yr}
                    onClick={() => setYearFilter(yr.toString())}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 ${
                      yearFilter === yr.toString()
                        ? 'bg-[#7657FF] text-white'
                        : 'bg-slate-100 dark:bg-[#1E1B38] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#28244B]'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Model Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredModels.map((m) => {
              const isSelected = selectedModelId === m.id
              return (
                <div
                  key={m.id}
                  onClick={() => handleModelSelect(m)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 select-none active:scale-[0.99] ${
                    isSelected
                      ? 'border-[#7657FF] bg-[#7657FF]/15 dark:bg-[#7657FF]/20 text-[#7657FF] dark:text-white ring-2 ring-[#7657FF]/40 shadow-sm'
                      : 'border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1E1B38]/60 text-slate-800 dark:text-slate-200 hover:border-[#7657FF]/50 hover:bg-slate-50 dark:hover:bg-[#242044]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-slate-900 dark:text-[#F7F6F2] truncate">
                        {m.name}
                      </div>
                      {m.release_year && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-slate-400 mt-0.5">
                          Released {m.release_year}
                        </span>
                      )}
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#7657FF] text-white'
                          : 'border border-slate-300 dark:border-[#3D3761] bg-transparent'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Storage Options Pills Preview */}
                  {m.storage_options && m.storage_options.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-100 dark:border-[#2D2947]/60">
                      <HardDrive className="w-3 h-3 text-slate-400 shrink-0" />
                      {m.storage_options.map((gb) => (
                        <span
                          key={gb}
                          className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-[#17152B] text-slate-600 dark:text-slate-300"
                        >
                          {gb >= 1024 ? `${gb / 1024}TB` : `${gb}GB`}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {filteredModels.length === 0 && (
            <div className="p-6 rounded-2xl text-center bg-slate-50 dark:bg-[#17152B] border border-dashed border-slate-300 dark:border-[#2D2947] space-y-2">
              <p className="text-xs text-slate-500">
                No model found matching &ldquo;{modelSearch}&rdquo; for {selectedBrand.name}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCustomModelName(modelSearch)
                  setCustomModelMode(true)
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7657FF] dark:text-[#9B82FF] hover:underline"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add &ldquo;{modelSearch || 'Custom Model'}&rdquo; as Custom Model</span>
              </button>
            </div>
          )}

          {errors.model_id && (
            <p className="text-xs text-red-500 font-semibold mt-1">
              {errors.model_id.message || 'Please select a smartphone model'}
            </p>
          )}
        </div>
      ) : (
        <div className="p-8 rounded-3xl text-center bg-slate-50 dark:bg-[#17152B]/60 border border-dashed border-slate-200 dark:border-[#2D2947] space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-[#7657FF]/10 text-[#7657FF] flex items-center justify-center mx-auto">
            <Smartphone className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
            Please choose a brand above first
          </p>
          <p className="text-[11px] text-slate-400">
            All models with release dates, storage, and specs for your selected brand will appear here.
          </p>
        </div>
      )}
    </div>
  )
}
