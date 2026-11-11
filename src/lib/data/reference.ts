// ==============================================================================
// Reference Data Fetching (Cities, Areas, Brands, Models)
// Server-side functions for Post Ad form and filters
// ==============================================================================

import { createClient } from '@/src/lib/supabase/server'
import {
  MOCK_CITIES,
  MOCK_AREAS,
  MOCK_BRANDS,
  MOCK_MODELS,
} from './mock-seed'

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
    const supabase = await createClient()
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
export async function getAreasByCity(cityId: string): Promise<AreaOption[]> {
  if (!cityId) return []

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('areas')
      .select('id, city_id, name, slug')
      .eq('city_id', cityId)
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (error || !data || data.length === 0) {
      return MOCK_AREAS.filter((a) => a.city_id === cityId)
    }

    return data
  } catch {
    return MOCK_AREAS.filter((a) => a.city_id === cityId)
  }
}

/**
 * Fetch all active phone brands
 */
export async function getActiveBrands(): Promise<BrandOption[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('brands')
      .select('id, name, slug, logo_url')
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (error || !data || data.length === 0) {
      return MOCK_BRANDS
    }

    return data
  } catch {
    return MOCK_BRANDS
  }
}

/**
 * Fetch active phone models for a specific brand
 */
export async function getModelsByBrand(brandId: string): Promise<ModelOption[]> {
  if (!brandId) return []

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('models')
      .select('id, brand_id, name, slug, release_year, storage_options, ram_options')
      .eq('brand_id', brandId)
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (error || !data || data.length === 0) {
      return MOCK_MODELS.filter((m) => m.brand_id === brandId)
    }

    return data
  } catch {
    return MOCK_MODELS.filter((m) => m.brand_id === brandId)
  }
}

