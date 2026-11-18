'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { CityOption, AreaOption } from '@/src/lib/data/reference'
import {
  PAKISTAN_CITIES,
  ExtendedCityOption,
  getCatalogAreasForCity,
  createCustomAreaOption,
} from '@/src/lib/data/locations-catalog'
import { createClient } from '@/src/lib/supabase/client'
import { CONTACT_PREF_LABELS } from '@/src/lib/constants/ad-options'
import {
  MapPin,
  Check,
  Search,
  Building2,
  X,
  PlusCircle,
  PhoneCall,
  MessageSquare,
  Sparkles,
  ChevronDown,
} from 'lucide-react'

interface Step5Props {
  form: UseFormReturn<FullAdFormData>
  cities: CityOption[]
}

export function Step5Location({ form, cities: propCities }: Step5Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form

  const selectedCityId = watch('city_id')
  const selectedAreaId = watch('area_id')
  const contactPref = watch('contact_preference')

  // Merge server props with master Pakistan cities list (80 cities)
  const allCities: ExtendedCityOption[] = useMemo(() => {
    const list: ExtendedCityOption[] = [...PAKISTAN_CITIES]
    if (propCities && propCities.length > 0) {
      const slugMap = new Map(list.map((c) => [c.slug.toLowerCase(), c]))
      for (const pc of propCities) {
        const existing = slugMap.get(pc.slug.toLowerCase())
        if (existing) {
          existing.id = pc.id
        } else {
          list.push(pc)
        }
      }
    }
    return list
  }, [propCities])

  // City Search State
  const [citySearch, setCitySearch] = useState('')
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false)
  const cityDropdownRef = useRef<HTMLDivElement>(null)

  // Area Search State
  const [areaSearch, setAreaSearch] = useState('')
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false)
  const areaDropdownRef = useRef<HTMLDivElement>(null)
  const [customAreaMode, setCustomAreaMode] = useState(false)
  const [customAreaName, setCustomAreaName] = useState('')

  // Selected City object
  const selectedCity = useMemo(() => {
    return allCities.find((c) => c.id === selectedCityId) || null
  }, [allCities, selectedCityId])

  // Areas state
  const [areas, setAreas] = useState<AreaOption[]>(() => {
    if (!selectedCityId) return []
    return getCatalogAreasForCity(selectedCityId)
  })

  // Selected Area object
  const selectedArea = useMemo(() => {
    return areas.find((a) => a.id === selectedAreaId) || null
  }, [areas, selectedAreaId])

  // Popular cities for quick selection
  const popularCities = useMemo(() => {
    return allCities.filter((c) => c.popular).slice(0, 8)
  }, [allCities])

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false)
      }
      if (areaDropdownRef.current && !areaDropdownRef.current.contains(event.target as Node)) {
        setIsAreaDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // When city changes, load areas
  useEffect(() => {
    if (!selectedCityId) {
      setAreas([])
      return
    }

    // 1. Instantly populate catalog areas
    const instantAreas = getCatalogAreasForCity(selectedCity?.slug || selectedCityId)
    setAreas(instantAreas)

    // 2. Concurrently check Supabase
    let isMounted = true
    async function loadDbAreas() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('areas')
          .select('id, city_id, name, slug')
          .eq('city_id', selectedCityId)
          .eq('is_active', true)
          .order('name')

        if (!isMounted) return
        if (!error && data && data.length > 0) {
          const dbAreas = data as AreaOption[]
          const existingSlugs = new Set(dbAreas.map((a) => a.slug))
          const remaining = instantAreas.filter((a: AreaOption) => !existingSlugs.has(a.slug))
          setAreas([...dbAreas, ...remaining])
        }
      } catch {
        // ignore
      }
    }

    loadDbAreas()

    return () => {
      isMounted = false
    }
  }, [selectedCityId, selectedCity])

  // Select a City
  const handleSelectCity = (city: ExtendedCityOption) => {
    setValue('city_id', city.id, { shouldValidate: true })
    setValue('area_id', null, { shouldValidate: true })
    setCitySearch(city.name)
    setIsCityDropdownOpen(false)
    setAreaSearch('')
    setCustomAreaMode(false)
    setCustomAreaName('')
  }

  // Select an Area
  const handleSelectArea = (area: AreaOption) => {
    setValue('area_id', area.id, { shouldValidate: true })
    setAreaSearch(area.name)
    setIsAreaDropdownOpen(false)
    setCustomAreaMode(false)
  }

  // Apply Custom Area
  const handleApplyCustomArea = (nameToUse?: string) => {
    const name = (nameToUse || customAreaName || areaSearch).trim()
    if (!name || !selectedCityId) return
    const customOption = createCustomAreaOption(selectedCityId, name)
    setAreas((prev) => [customOption, ...prev.filter((a) => a.id !== customOption.id)])
    setValue('area_id', customOption.id, { shouldValidate: true })
    setAreaSearch(customOption.name)
    setIsAreaDropdownOpen(false)
    setCustomAreaMode(false)
    setCustomAreaName('')
  }

  // Filtered Cities list based on typed search
  const filteredCities = useMemo(() => {
    if (!citySearch.trim()) return allCities
    const q = citySearch.toLowerCase().trim()
    return allCities.filter(
      (c) => c.name.toLowerCase().includes(q) || (c.province && c.province.toLowerCase().includes(q))
    )
  }, [allCities, citySearch])

  // Filtered Areas list based on typed search
  const filteredAreas = useMemo(() => {
    if (!areaSearch.trim()) return areas
    const q = areaSearch.toLowerCase().trim()
    return areas.filter((a) => a.name.toLowerCase().includes(q))
  }, [areas, areaSearch])

  return (
    <div className="space-y-8">
      {/* Hidden inputs registered with react-hook-form */}
      <input type="hidden" {...register('city_id')} />
      <input type="hidden" {...register('area_id')} />

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7657FF]/10 text-[#7657FF] dark:text-[#9B82FF] text-xs font-bold mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>Step 5 of 6</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-[#F7F6F2] flex items-center gap-2">
          <span>Location & Contact Method</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Select or type your city and neighborhood in Pakistan, and choose how buyers can reach you.
        </p>
      </div>

      {/* =========================================================================
          SECTION 1: CITY SEARCH & SELECTION (Typeable Combobox + Popular Pills)
          ========================================================================= */}
      <div className="space-y-3" ref={cityDropdownRef}>
        <div className="flex items-center justify-between">
          <label
            htmlFor="city-input"
            className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-[#7657FF]" />
            <span>Select or Type City</span>
            <span className="text-red-500 font-bold">*</span>
          </label>
          {selectedCity && (
            <span className="text-xs font-semibold text-[#7657FF] dark:text-[#9B82FF] flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>{selectedCity.name}</span>
            </span>
          )}
        </div>

        {/* Quick Popular City Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mr-1 shrink-0">
            Popular:
          </span>
          {popularCities.map((pc) => {
            const isSelected = selectedCityId === pc.id
            return (
              <button
                type="button"
                key={pc.id}
                onClick={() => handleSelectCity(pc)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 active:scale-95 flex items-center gap-1 ${
                  isSelected
                    ? 'bg-[#7657FF] text-white shadow-xs ring-2 ring-[#7657FF]/40'
                    : 'bg-slate-100 dark:bg-[#1E1B38] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#28244B]'
                }`}
              >
                <span>{pc.name}</span>
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            )
          })}
        </div>

        {/* Searchable City Input Field */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="city-input"
            type="text"
            value={citySearch}
            onChange={(e) => {
              setCitySearch(e.target.value)
              setIsCityDropdownOpen(true)
            }}
            onFocus={() => setIsCityDropdownOpen(true)}
            placeholder="Type city name (e.g. Karachi, Lahore, Islamabad, Multan, Skardu)..."
            className={`w-full pl-10 pr-9 py-3 rounded-2xl border bg-white dark:bg-[#17152B] text-slate-900 dark:text-[#F7F6F2] placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF] transition-all ${
              errors.city_id
                ? 'border-red-500 ring-1 ring-red-500/30'
                : 'border-slate-200 dark:border-[#2D2947]'
            }`}
          />
          {citySearch ? (
            <button
              type="button"
              onClick={() => {
                setCitySearch('')
                setValue('city_id', '', { shouldValidate: true })
                setValue('area_id', null, { shouldValidate: true })
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          )}

          {/* Autocomplete Dropdown List */}
          {isCityDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 max-h-60 overflow-y-auto rounded-2xl border border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1A182F] shadow-xl z-50 p-1.5 scrollbar-thin">
              {filteredCities.map((city) => {
                const isSelected = selectedCityId === city.id
                return (
                  <button
                    type="button"
                    key={city.id}
                    onClick={() => handleSelectCity(city)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#7657FF]/15 text-[#7657FF] dark:text-white font-bold'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#252147]'
                    }`}
                  >
                    <div>
                      <span className="font-bold">{city.name}</span>
                      {city.province && (
                        <span className="text-[11px] text-slate-400 ml-2">
                          ({city.province})
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#7657FF] shrink-0" />}
                  </button>
                )
              })}

              {filteredCities.length === 0 && (
                <div className="p-3 text-center text-xs text-slate-500">
                  No city found matching &ldquo;{citySearch}&rdquo;.
                </div>
              )}
            </div>
          )}
        </div>

        {errors.city_id && (
          <p className="text-xs text-red-500 font-semibold mt-1">
            {errors.city_id.message || 'Please select your city'}
          </p>
        )}
      </div>

      {/* =========================================================================
          SECTION 2: AREA / LOCALITY (Searchable Typeahead + Custom Area Support)
          ========================================================================= */}
      <div className="space-y-3" ref={areaDropdownRef}>
        <div className="flex items-center justify-between">
          <label
            htmlFor="area-input"
            className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-[#7657FF]" />
            <span>Locality / Area</span>
            <span className="text-[11px] text-slate-400 font-normal">(Optional)</span>
          </label>

          {selectedCity && (
            <button
              type="button"
              onClick={() => setCustomAreaMode(!customAreaMode)}
              className="text-xs font-semibold text-[#7657FF] dark:text-[#9B82FF] hover:underline flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{customAreaMode ? 'Browse Areas List' : 'Type Custom Neighborhood'}</span>
            </button>
          )}
        </div>

        {/* Custom Area Manual Input Form */}
        {customAreaMode && selectedCity && (
          <div className="p-4 rounded-2xl bg-[#7657FF]/10 dark:bg-[#7657FF]/15 border border-[#7657FF]/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#7657FF] dark:text-[#9B82FF]">
              <Sparkles className="w-4 h-4" />
              <span>Enter Exact Area / Society in {selectedCity.name}</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customAreaName}
                onChange={(e) => setCustomAreaName(e.target.value)}
                placeholder="e.g. Model Colony, Gulberg 3, Sector G-14, Phase 8..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#17152B] text-slate-900 dark:text-[#F7F6F2] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF]"
              />
              <button
                type="button"
                onClick={() => handleApplyCustomArea()}
                disabled={!customAreaName.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white text-xs font-bold transition-all disabled:opacity-50"
              >
                Set Area
              </button>
            </div>
          </div>
        )}

        {/* Searchable Area Input Field */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="area-input"
            type="text"
            disabled={!selectedCityId}
            value={areaSearch}
            onChange={(e) => {
              setAreaSearch(e.target.value)
              setIsAreaDropdownOpen(true)
            }}
            onFocus={() => {
              if (selectedCityId) setIsAreaDropdownOpen(true)
            }}
            placeholder={
              !selectedCityId
                ? 'Select a city above first...'
                : `Type or select area in ${selectedCity?.name || 'city'} (e.g. DHA, Gulberg, Saddar)...`
            }
            className="w-full pl-10 pr-9 py-3 rounded-2xl border border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#17152B] text-slate-900 dark:text-[#F7F6F2] placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7657FF] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
          {areaSearch ? (
            <button
              type="button"
              onClick={() => {
                setAreaSearch('')
                setValue('area_id', null, { shouldValidate: true })
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          )}

          {/* Autocomplete Dropdown List for Areas */}
          {isAreaDropdownOpen && selectedCityId && (
            <div className="absolute left-0 right-0 top-full mt-1.5 max-h-60 overflow-y-auto rounded-2xl border border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1A182F] shadow-xl z-50 p-1.5 scrollbar-thin">
              {filteredAreas.map((area) => {
                const isSelected = selectedAreaId === area.id
                return (
                  <button
                    type="button"
                    key={area.id}
                    onClick={() => handleSelectArea(area)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#7657FF]/15 text-[#7657FF] dark:text-white font-bold'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#252147]'
                    }`}
                  >
                    <span>{area.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#7657FF] shrink-0" />}
                  </button>
                )
              })}

              {/* Option to create custom typed area if no direct match or as alternative */}
              {areaSearch.trim() && (
                <button
                  type="button"
                  onClick={() => handleApplyCustomArea(areaSearch)}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl text-left text-xs font-bold text-[#7657FF] dark:text-[#9B82FF] bg-[#7657FF]/10 dark:bg-[#7657FF]/20 hover:bg-[#7657FF]/20 flex items-center gap-2 border border-dashed border-[#7657FF]/40"
                >
                  <PlusCircle className="w-4 h-4 shrink-0" />
                  <span className="truncate">
                    Use &ldquo;{areaSearch.trim()}&rdquo; as your specific area
                  </span>
                </button>
              )}

              {filteredAreas.length === 0 && !areaSearch.trim() && (
                <div className="p-3 text-center text-xs text-slate-500">
                  No areas found. You can type any custom area above.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: CONTACT PREFERENCE
          ========================================================================= */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#2D2947]/80">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Buyer Contact Preference <span className="text-red-500 font-bold">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(
            [
              { id: 'both', icon: Sparkles, desc: 'Receive both calls & messages' },
              { id: 'phone', icon: PhoneCall, desc: 'Buyers contact you via phone' },
              { id: 'whatsapp', icon: MessageSquare, desc: 'Buyers message on WhatsApp' },
            ] as const
          ).map((item) => {
            const isSelected = contactPref === item.id
            const Icon = item.icon
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setValue('contact_preference', item.id, { shouldValidate: true })}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 active:scale-95 ${
                  isSelected
                    ? 'border-[#7657FF] bg-[#7657FF]/15 dark:bg-[#7657FF]/20 text-[#7657FF] dark:text-white ring-2 ring-[#7657FF]/40 shadow-sm font-bold'
                    : 'border-slate-200 dark:border-[#2D2947] bg-white dark:bg-[#1E1B38]/60 text-slate-700 dark:text-slate-200 hover:border-[#7657FF]/40 hover:bg-slate-50 dark:hover:bg-[#252147]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#7657FF]" />
                    <span className="text-sm font-bold">{CONTACT_PREF_LABELS[item.id]}</span>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-[#7657FF] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 font-normal">{item.desc}</p>
              </button>
            )
          })}
        </div>
        {errors.contact_preference && (
          <p className="text-xs text-red-500 font-semibold mt-1">
            {errors.contact_preference.message}
          </p>
        )}
      </div>
    </div>
  )
}
