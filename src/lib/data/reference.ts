// ==============================================================================
// Reference Data Fetching (Cities, Areas, Brands, Models)
// Server-side functions for Post Ad form and filters
// ==============================================================================

import { createPublicClient } from '@/src/lib/supabase/public'
import {
  MOCK_CITIES,
  MOCK_AREAS,
  MOCK_BRANDS,
  MOCK_MODELS,
} from './mock-seed'
import { CATALOG_BRANDS, getCatalogModelsForBrand } from './phone-catalog'
import { PAKISTAN_CITIES, PAKISTAN_AREAS, getCatalogAreasForCity } from './locations-catalog'

export interface CityOption {
  id: string
  name: string
  slug: string
}

export interface AreaOption {
  id: string
  city_id: string
  name: string
  slug: string
}

export interface BrandOption {
  id: string
  name: string
  slug: string
  logo_url: string | null
}

export interface ModelOption {
  id: string
  brand_id: string
  name: string
  slug: string
  release_year: number | null
  storage_options: number[] | null
  ram_options: number[] | null
}

/**
 * Fetch all active cities ordered by name
 */
export async function getActiveCities(): Promise<CityOption[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('cities')
      .select('id, name, slug')
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (error || !data || data.length === 0) {
      return MOCK_CITIES
    }

    return data
  } catch {
    return MOCK_CITIES
  }
}

/**
 * Fetch active areas for a specific city
 */
export async function getAreasByCity(cityId: string, citySlugOrName?: string): Promise<AreaOption[]> {
  if (!cityId) return []

  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('areas')
      .select('id, city_id, name, slug')
      .eq('city_id', cityId)
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (!error && data && data.length > 0) {
      return data
    }
  } catch {
    // fallback
  }

  const catalog = getCatalogAreasForCity(citySlugOrName || cityId)
  if (catalog.length > 0) return catalog

  return MOCK_AREAS.filter((a) => a.city_id === cityId)
}

/**
 * Fetch all active phone brands
 */
export async function getActiveBrands(): Promise<BrandOption[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('brands')
      .select('id, name, slug, logo_url')
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (error || !data || data.length === 0) {
      return MOCK_BRANDS
    }

    if (data.length < CATALOG_BRANDS.length) {
      const existingSlugs = new Set(data.map((b) => b.slug.toLowerCase()))
      const missing = CATALOG_BRANDS.filter((b: BrandOption) => !existingSlugs.has(b.slug.toLowerCase()))
      return [...data, ...missing].sort((a, b) => a.name.localeCompare(b.name))
    }

    return data
  } catch {
    return MOCK_BRANDS
  }
}

/**
 * Fetch active phone models for a specific brand
 */
export async function getModelsByBrand(
  brandId: string,
  brandSlugOrName?: string
): Promise<ModelOption[]> {
  if (!brandId) return []

  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('models')
      .select('id, brand_id, name, slug, release_year, storage_options, ram_options')
      .eq('brand_id', brandId)
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (!error && data && data.length > 0) {
      return data
    }
  } catch {
    // fallback
  }

  const catalog = getCatalogModelsForBrand(brandSlugOrName || brandId, brandId)
  if (catalog.length > 0) return catalog

  return MOCK_MODELS.filter((m) => m.brand_id === brandId)
}

