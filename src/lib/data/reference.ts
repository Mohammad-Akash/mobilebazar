// ==============================================================================
// Reference Data Fetching (Cities, Areas, Brands, Models)
// Server-side functions for Post Ad form and filters
// ==============================================================================

import { createClient } from '@/src/lib/supabase/server'

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
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cities')
    .select('id, name, slug')
    .eq('is_active', true)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching cities:', error)
    return []
  }

  return data ?? []
}

/**
 * Fetch active areas for a specific city
 */
export async function getAreasByCity(cityId: string): Promise<AreaOption[]> {
  if (!cityId) return []

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('areas')
    .select('id, city_id, name, slug')
    .eq('city_id', cityId)
    .eq('is_active', true)
    .order('name', { ascending: true })

  if (error) {
    console.error(`Error fetching areas for city ${cityId}:`, error)
    return []
  }

  return data ?? []
}

/**
 * Fetch all active phone brands
 */
export async function getActiveBrands(): Promise<BrandOption[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('brands')
    .select('id, name, slug, logo_url')
    .eq('is_active', true)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching brands:', error)
    return []
  }

  return data ?? []
}

/**
 * Fetch active phone models for a specific brand
 */
export async function getModelsByBrand(brandId: string): Promise<ModelOption[]> {
  if (!brandId) return []

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('models')
    .select('id, brand_id, name, slug, release_year, storage_options, ram_options')
    .eq('brand_id', brandId)
    .eq('is_active', true)
    .order('name', { ascending: true })

  if (error) {
    console.error(`Error fetching models for brand ${brandId}:`, error)
    return []
  }

  return data ?? []
}

