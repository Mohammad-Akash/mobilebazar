// ==============================================================================
// Comprehensive Smartphone Catalog (Brands & Realistic Models in Pakistan)
// Complete models catalog covering Apple, Samsung, Google Pixel, Xiaomi, OnePlus,
// Vivo, Oppo, Realme, Infinix, Tecno, Motorola, Honor, Huawei, Nothing, Itel, Nokia.
// ==============================================================================

import { BrandOption, ModelOption } from './reference'

export const CATALOG_BRANDS: BrandOption[] = [
  { id: 'b1010000-0000-4000-8000-000000000001', name: 'Apple', slug: 'apple', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000002', name: 'Samsung', slug: 'samsung', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000004', name: 'Google Pixel', slug: 'google-pixel', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000003', name: 'Xiaomi', slug: 'xiaomi', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000005', name: 'OnePlus', slug: 'oneplus', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000006', name: 'Vivo', slug: 'vivo', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000007', name: 'Oppo', slug: 'oppo', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000008', name: 'Realme', slug: 'realme', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000009', name: 'Infinix', slug: 'infinix', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000010', name: 'Tecno', slug: 'tecno', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000011', name: 'Motorola', slug: 'motorola', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000012', name: 'Honor', slug: 'honor', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000013', name: 'Huawei', slug: 'huawei', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000014', name: 'Nothing', slug: 'nothing', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000015', name: 'Itel', slug: 'itel', logo_url: null },
  { id: 'b1010000-0000-4000-8000-000000000016', name: 'Nokia', slug: 'nokia', logo_url: null },
]

export const CATALOG_MODELS: Record<string, Array<{ name: string; slug: string; year: number; storage: number[]; ram?: number[] }>> = {
  // Apple
  apple: [
    { name: 'iPhone 16 Pro Max', slug: 'iphone-16-pro-max', year: 2024, storage: [256, 512, 1024], ram: [8] },
    { name: 'iPhone 16 Pro', slug: 'iphone-16-pro', year: 2024, storage: [128, 256, 512, 1024], ram: [8] },
    { name: 'iPhone 16 Plus', slug: 'iphone-16-plus', year: 2024, storage: [128, 256, 512], ram: [8] },
    { name: 'iPhone 16', slug: 'iphone-16', year: 2024, storage: [128, 256, 512], ram: [8] },
    { name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max', year: 2023, storage: [256, 512, 1024], ram: [8] },
    { name: 'iPhone 15 Pro', slug: 'iphone-15-pro', year: 2023, storage: [128, 256, 512, 1024], ram: [8] },
    { name: 'iPhone 15 Plus', slug: 'iphone-15-plus', year: 2023, storage: [128, 256, 512], ram: [6] },
    { name: 'iPhone 15', slug: 'iphone-15', year: 2023, storage: [128, 256, 512], ram: [6] },
    { name: 'iPhone 14 Pro Max', slug: 'iphone-14-pro-max', year: 2022, storage: [128, 256, 512, 1024], ram: [6] },
    { name: 'iPhone 14 Pro', slug: 'iphone-14-pro', year: 2022, storage: [128, 256, 512, 1024], ram: [6] },
    { name: 'iPhone 14 Plus', slug: 'iphone-14-plus', year: 2022, storage: [128, 256, 512], ram: [6] },
    { name: 'iPhone 14', slug: 'iphone-14', year: 2022, storage: [128, 256, 512], ram: [6] },
    { name: 'iPhone 13 Pro Max', slug: 'iphone-13-pro-max', year: 2021, storage: [128, 256, 512, 1024], ram: [6] },
    { name: 'iPhone 13 Pro', slug: 'iphone-13-pro', year: 2021, storage: [128, 256, 512, 1024], ram: [6] },
    { name: 'iPhone 13', slug: 'iphone-13', year: 2021, storage: [128, 256, 512], ram: [4] },
    { name: 'iPhone 13 Mini', slug: 'iphone-13-mini', year: 2021, storage: [128, 256, 512], ram: [4] },
    { name: 'iPhone 12 Pro Max', slug: 'iphone-12-pro-max', year: 2020, storage: [128, 256, 512], ram: [6] },
    { name: 'iPhone 12 Pro', slug: 'iphone-12-pro', year: 2020, storage: [128, 256, 512], ram: [6] },
    { name: 'iPhone 12', slug: 'iphone-12', year: 2020, storage: [64, 128, 256], ram: [4] },
    { name: 'iPhone 12 Mini', slug: 'iphone-12-mini', year: 2020, storage: [64, 128, 256], ram: [4] },
    { name: 'iPhone 11 Pro Max', slug: 'iphone-11-pro-max', year: 2019, storage: [64, 256, 512], ram: [4] },
    { name: 'iPhone 11 Pro', slug: 'iphone-11-pro', year: 2019, storage: [64, 256, 512], ram: [4] },
    { name: 'iPhone 11', slug: 'iphone-11', year: 2019, storage: [64, 128, 256], ram: [4] },
    { name: 'iPhone XS Max', slug: 'iphone-xs-max', year: 2018, storage: [64, 256, 512], ram: [4] },
    { name: 'iPhone XS', slug: 'iphone-xs', year: 2018, storage: [64, 256, 512], ram: [4] },
    { name: 'iPhone XR', slug: 'iphone-xr', year: 2018, storage: [64, 128, 256], ram: [3] },
    { name: 'iPhone X', slug: 'iphone-x', year: 2017, storage: [64, 256], ram: [3] },
    { name: 'iPhone SE (2022)', slug: 'iphone-se-2022', year: 2022, storage: [64, 128, 256], ram: [4] },
    { name: 'iPhone 8 Plus', slug: 'iphone-8-plus', year: 2017, storage: [64, 128, 256], ram: [3] },
    { name: 'iPhone 8', slug: 'iphone-8', year: 2017, storage: [64, 128, 256], ram: [2] },
  ],

  // Samsung
  samsung: [
    { name: 'Galaxy S24 Ultra', slug: 'galaxy-s24-ultra', year: 2024, storage: [256, 512, 1024], ram: [12] },
    { name: 'Galaxy S24 Plus', slug: 'galaxy-s24-plus', year: 2024, storage: [256, 512], ram: [12] },
    { name: 'Galaxy S24', slug: 'galaxy-s24', year: 2024, storage: [128, 256], ram: [8] },
    { name: 'Galaxy S24 FE', slug: 'galaxy-s24-fe', year: 2024, storage: [128, 256], ram: [8] },
    { name: 'Galaxy S23 Ultra', slug: 'galaxy-s23-ultra', year: 2023, storage: [256, 512, 1024], ram: [8, 12] },
    { name: 'Galaxy S23 Plus', slug: 'galaxy-s23-plus', year: 2023, storage: [256, 512], ram: [8] },
    { name: 'Galaxy S23', slug: 'galaxy-s23', year: 2023, storage: [128, 256], ram: [8] },
    { name: 'Galaxy S23 FE', slug: 'galaxy-s23-fe', year: 2023, storage: [128, 256], ram: [8] },
    { name: 'Galaxy S22 Ultra', slug: 'galaxy-s22-ultra', year: 2022, storage: [128, 256, 512], ram: [8, 12] },
    { name: 'Galaxy S22 Plus', slug: 'galaxy-s22-plus', year: 2022, storage: [128, 256], ram: [8] },
    { name: 'Galaxy S22', slug: 'galaxy-s22', year: 2022, storage: [128, 256], ram: [8] },
    { name: 'Galaxy S21 Ultra', slug: 'galaxy-s21-ultra', year: 2021, storage: [128, 256, 512], ram: [12, 16] },
    { name: 'Galaxy S21 Plus', slug: 'galaxy-s21-plus', year: 2021, storage: [128, 256], ram: [8] },
    { name: 'Galaxy S21', slug: 'galaxy-s21', year: 2021, storage: [128, 256], ram: [8] },
    { name: 'Galaxy S21 FE', slug: 'galaxy-s21-fe', year: 2022, storage: [128, 256], ram: [6, 8] },
    { name: 'Galaxy Note 20 Ultra', slug: 'galaxy-note-20-ultra', year: 2020, storage: [128, 256, 512], ram: [12] },
    { name: 'Galaxy Note 20', slug: 'galaxy-note-20', year: 2020, storage: [128, 256], ram: [8] },
    { name: 'Galaxy Note 10 Plus', slug: 'galaxy-note-10-plus', year: 2019, storage: [256, 512], ram: [12] },
    { name: 'Galaxy Z Fold 6', slug: 'galaxy-z-fold-6', year: 2024, storage: [256, 512, 1024], ram: [12] },
    { name: 'Galaxy Z Flip 6', slug: 'galaxy-z-flip-6', year: 2024, storage: [256, 512], ram: [12] },
    { name: 'Galaxy Z Fold 5', slug: 'galaxy-z-fold-5', year: 2023, storage: [256, 512, 1024], ram: [12] },
    { name: 'Galaxy Z Flip 5', slug: 'galaxy-z-flip-5', year: 2023, storage: [256, 512], ram: [8] },
    { name: 'Galaxy Z Fold 4', slug: 'galaxy-z-fold-4', year: 2022, storage: [256, 512, 1024], ram: [12] },
    { name: 'Galaxy A55 5G', slug: 'galaxy-a55-5g', year: 2024, storage: [128, 256], ram: [8, 12] },
    { name: 'Galaxy A54 5G', slug: 'galaxy-a54-5g', year: 2023, storage: [128, 256], ram: [6, 8] },
    { name: 'Galaxy A53 5G', slug: 'galaxy-a53-5g', year: 2022, storage: [128, 256], ram: [6, 8] },
    { name: 'Galaxy A35 5G', slug: 'galaxy-a35-5g', year: 2024, storage: [128, 256], ram: [6, 8] },
    { name: 'Galaxy A34 5G', slug: 'galaxy-a34-5g', year: 2023, storage: [128, 256], ram: [6, 8] },
    { name: 'Galaxy A25 5G', slug: 'galaxy-a25-5g', year: 2024, storage: [128, 256], ram: [6, 8] },
    { name: 'Galaxy A15', slug: 'galaxy-a15', year: 2024, storage: [128, 256], ram: [4, 6, 8] },
    { name: 'Galaxy A14', slug: 'galaxy-a14', year: 2023, storage: [64, 128], ram: [4, 6] },
    { name: 'Galaxy A05s', slug: 'galaxy-a05s', year: 2023, storage: [64, 128], ram: [4, 6] },
  ],

  // Google Pixel
  'google-pixel': [
    { name: 'Pixel 9 Pro Fold', slug: 'pixel-9-pro-fold', year: 2024, storage: [256, 512], ram: [16] },
    { name: 'Pixel 9 Pro XL', slug: 'pixel-9-pro-xl', year: 2024, storage: [128, 256, 512, 1024], ram: [16] },
    { name: 'Pixel 9 Pro', slug: 'pixel-9-pro', year: 2024, storage: [128, 256, 512], ram: [16] },
    { name: 'Pixel 9', slug: 'pixel-9', year: 2024, storage: [128, 256], ram: [12] },
    { name: 'Pixel 8a', slug: 'pixel-8a', year: 2024, storage: [128, 256], ram: [8] },
    { name: 'Pixel 8 Pro', slug: 'pixel-8-pro', year: 2023, storage: [128, 256, 512, 1024], ram: [12] },
    { name: 'Pixel 8', slug: 'pixel-8', year: 2023, storage: [128, 256], ram: [8] },
    { name: 'Pixel 7a', slug: 'pixel-7a', year: 2023, storage: [128], ram: [8] },
    { name: 'Pixel 7 Pro', slug: 'pixel-7-pro', year: 2022, storage: [128, 256, 512], ram: [12] },
    { name: 'Pixel 7', slug: 'pixel-7', year: 2022, storage: [128, 256], ram: [8] },
    { name: 'Pixel 6a', slug: 'pixel-6a', year: 2022, storage: [128], ram: [6] },
    { name: 'Pixel 6 Pro', slug: 'pixel-6-pro', year: 2021, storage: [128, 256, 512], ram: [12] },
    { name: 'Pixel 6', slug: 'pixel-6', year: 2021, storage: [128, 256], ram: [8] },
    { name: 'Pixel 5', slug: 'pixel-5', year: 2020, storage: [128], ram: [8] },
    { name: 'Pixel 5a 5G', slug: 'pixel-5a-5g', year: 2021, storage: [128], ram: [6] },
    { name: 'Pixel 4a 5G', slug: 'pixel-4a-5g', year: 2020, storage: [128], ram: [6] },
    { name: 'Pixel 4a', slug: 'pixel-4a', year: 2020, storage: [128], ram: [6] },
    { name: 'Pixel 4 XL', slug: 'pixel-4-xl', year: 2019, storage: [64, 128], ram: [6] },
    { name: 'Pixel 4', slug: 'pixel-4', year: 2019, storage: [64, 128], ram: [6] },
  ],

  // Xiaomi / Redmi / Poco
  xiaomi: [
    { name: 'Xiaomi 14 Ultra', slug: 'xiaomi-14-ultra', year: 2024, storage: [512, 1024], ram: [16] },
    { name: 'Xiaomi 14', slug: 'xiaomi-14', year: 2024, storage: [256, 512], ram: [12] },
    { name: 'Xiaomi 13T Pro', slug: 'xiaomi-13t-pro', year: 2023, storage: [256, 512, 1024], ram: [12, 16] },
    { name: 'Xiaomi 13T', slug: 'xiaomi-13t', year: 2023, storage: [256], ram: [8, 12] },
    { name: 'Redmi Note 13 Pro+ 5G', slug: 'redmi-note-13-pro-plus-5g', year: 2024, storage: [256, 512], ram: [8, 12] },
    { name: 'Redmi Note 13 Pro', slug: 'redmi-note-13-pro', year: 2024, storage: [128, 256, 512], ram: [8, 12] },
    { name: 'Redmi Note 13', slug: 'redmi-note-13', year: 2024, storage: [128, 256], ram: [6, 8] },
    { name: 'Redmi Note 12 Pro 5G', slug: 'redmi-note-12-pro-5g', year: 2023, storage: [128, 256], ram: [6, 8] },
    { name: 'Redmi Note 12', slug: 'redmi-note-12', year: 2023, storage: [128], ram: [4, 6, 8] },
    { name: 'Redmi 13C', slug: 'redmi-13c', year: 2023, storage: [128, 256], ram: [4, 6, 8] },
    { name: 'Redmi 13', slug: 'redmi-13', year: 2024, storage: [128, 256], ram: [6, 8] },
    { name: 'Redmi 12', slug: 'redmi-12', year: 2023, storage: [128, 256], ram: [4, 8] },
    { name: 'Redmi A3', slug: 'redmi-a3', year: 2024, storage: [64, 128], ram: [3, 4, 6] },
    { name: 'Poco F6 Pro', slug: 'poco-f6-pro', year: 2024, storage: [256, 512, 1024], ram: [12, 16] },
    { name: 'Poco F6', slug: 'poco-f6', year: 2024, storage: [256, 512], ram: [8, 12] },
    { name: 'Poco X6 Pro', slug: 'poco-x6-pro', year: 2024, storage: [256, 512], ram: [8, 12] },
    { name: 'Poco X6', slug: 'poco-x6', year: 2024, storage: [256], ram: [8, 12] },
    { name: 'Poco M6 Pro', slug: 'poco-m6-pro', year: 2024, storage: [256, 512], ram: [8, 12] },
  ],

  // OnePlus
  oneplus: [
    { name: 'OnePlus 12', slug: 'oneplus-12', year: 2024, storage: [256, 512], ram: [12, 16] },
    { name: 'OnePlus 12R', slug: 'oneplus-12r', year: 2024, storage: [128, 256], ram: [8, 16] },
    { name: 'OnePlus 11', slug: 'oneplus-11', year: 2023, storage: [128, 256], ram: [8, 16] },
    { name: 'OnePlus 11R', slug: 'oneplus-11r', year: 2023, storage: [128, 256], ram: [8, 16] },
    { name: 'OnePlus Open', slug: 'oneplus-open', year: 2023, storage: [512], ram: [16] },
    { name: 'OnePlus 10 Pro', slug: 'oneplus-10-pro', year: 2022, storage: [128, 256], ram: [8, 12] },
    { name: 'OnePlus 10T', slug: 'oneplus-10t', year: 2022, storage: [128, 256], ram: [8, 16] },
    { name: 'OnePlus 9 Pro', slug: 'oneplus-9-pro', year: 2021, storage: [128, 256], ram: [8, 12] },
    { name: 'OnePlus 9', slug: 'oneplus-9', year: 2021, storage: [128, 256], ram: [8, 12] },
    { name: 'OnePlus 8 Pro', slug: 'oneplus-8-pro', year: 2020, storage: [128, 256], ram: [8, 12] },
    { name: 'OnePlus 8T', slug: 'oneplus-8t', year: 2020, storage: [128, 256], ram: [8, 12] },
    { name: 'OnePlus Nord 4', slug: 'oneplus-nord-4', year: 2024, storage: [128, 256, 512], ram: [8, 12, 16] },
    { name: 'OnePlus Nord CE 4', slug: 'oneplus-nord-ce-4', year: 2024, storage: [128, 256], ram: [8] },
    { name: 'OnePlus Nord 3', slug: 'oneplus-nord-3', year: 2023, storage: [128, 256], ram: [8, 16] },
  ],

  // Vivo
  vivo: [
    { name: 'Vivo X100 Pro', slug: 'vivo-x100-pro', year: 2024, storage: [256, 512], ram: [16] },
    { name: 'Vivo X100', slug: 'vivo-x100', year: 2024, storage: [256, 512], ram: [12, 16] },
    { name: 'Vivo V40 Pro', slug: 'vivo-v40-pro', year: 2024, storage: [256, 512], ram: [8, 12] },
    { name: 'Vivo V40', slug: 'vivo-v40', year: 2024, storage: [128, 256, 512], ram: [8, 12] },
    { name: 'Vivo V40e', slug: 'vivo-v40e', year: 2024, storage: [128, 256], ram: [8] },
    { name: 'Vivo V30 Pro', slug: 'vivo-v30-pro', year: 2024, storage: [512], ram: [12] },
    { name: 'Vivo V30', slug: 'vivo-v30', year: 2024, storage: [128, 256], ram: [8, 12] },
    { name: 'Vivo V30e', slug: 'vivo-v30e', year: 2024, storage: [128, 256], ram: [8] },
    { name: 'Vivo V29', slug: 'vivo-v29', year: 2023, storage: [128, 256], ram: [8, 12] },
    { name: 'Vivo V29e', slug: 'vivo-v29e', year: 2023, storage: [128, 256], ram: [8] },
    { name: 'Vivo Y200', slug: 'vivo-y200', year: 2024, storage: [128, 256], ram: [8] },
    { name: 'Vivo Y100', slug: 'vivo-y100', year: 2024, storage: [128, 256], ram: [8] },
    { name: 'Vivo Y28', slug: 'vivo-y28', year: 2024, storage: [128, 256], ram: [6, 8] },
    { name: 'Vivo Y18', slug: 'vivo-y18', year: 2024, storage: [64, 128], ram: [4] },
    { name: 'Vivo Y03', slug: 'vivo-y03', year: 2024, storage: [64], ram: [4] },
  ],

  // Oppo
  oppo: [
    { name: 'Oppo Find X7 Ultra', slug: 'oppo-find-x7-ultra', year: 2024, storage: [256, 512], ram: [12, 16] },
    { name: 'Oppo Find N3', slug: 'oppo-find-n3', year: 2023, storage: [512], ram: [16] },
    { name: 'Oppo Reno 12 Pro', slug: 'oppo-reno-12-pro', year: 2024, storage: [256, 512], ram: [12] },
    { name: 'Oppo Reno 12', slug: 'oppo-reno-12', year: 2024, storage: [256, 512], ram: [8, 12] },
    { name: 'Oppo Reno 12F', slug: 'oppo-reno-12f', year: 2024, storage: [256], ram: [8] },
    { name: 'Oppo Reno 11 Pro', slug: 'oppo-reno-11-pro', year: 2024, storage: [256, 512], ram: [12] },
    { name: 'Oppo Reno 11', slug: 'oppo-reno-11', year: 2024, storage: [128, 256], ram: [8, 12] },
    { name: 'Oppo Reno 11F', slug: 'oppo-reno-11f', year: 2024, storage: [256], ram: [8] },
    { name: 'Oppo A60', slug: 'oppo-a60', year: 2024, storage: [128, 256], ram: [8] },
    { name: 'Oppo A79 5G', slug: 'oppo-a79-5g', year: 2023, storage: [128, 256], ram: [8] },
    { name: 'Oppo A58', slug: 'oppo-a58', year: 2023, storage: [128], ram: [6, 8] },
    { name: 'Oppo A38', slug: 'oppo-a38', year: 2023, storage: [128], ram: [4] },
    { name: 'Oppo A18', slug: 'oppo-a18', year: 2023, storage: [64, 128], ram: [4] },
  ],

  // Realme
  realme: [
    { name: 'Realme GT 6', slug: 'realme-gt-6', year: 2024, storage: [256, 512], ram: [8, 12, 16] },
    { name: 'Realme GT 6T', slug: 'realme-gt-6t', year: 2024, storage: [128, 256, 512], ram: [8, 12] },
    { name: 'Realme 12 Pro+ 5G', slug: 'realme-12-pro-plus-5g', year: 2024, storage: [256, 512], ram: [8, 12] },
    { name: 'Realme 12 Pro 5G', slug: 'realme-12-pro-5g', year: 2024, storage: [128, 256], ram: [8] },
    { name: 'Realme 12+ 5G', slug: 'realme-12-plus-5g', year: 2024, storage: [128, 256], ram: [8] },
    { name: 'Realme 12', slug: 'realme-12', year: 2024, storage: [128, 256], ram: [6, 8] },
    { name: 'Realme 11 Pro+', slug: 'realme-11-pro-plus', year: 2023, storage: [256, 512], ram: [8, 12] },
    { name: 'Realme C67', slug: 'realme-c67', year: 2024, storage: [128, 256], ram: [6, 8] },
    { name: 'Realme C65', slug: 'realme-c65', year: 2024, storage: [128, 256], ram: [6, 8] },
    { name: 'Realme C53', slug: 'realme-c53', year: 2023, storage: [128], ram: [6] },
    { name: 'Realme Note 50', slug: 'realme-note-50', year: 2024, storage: [64, 128], ram: [3, 4] },
  ],

  // Infinix
  infinix: [
    { name: 'Zero 40 5G', slug: 'zero-40-5g', year: 2024, storage: [256, 512], ram: [12] },
    { name: 'Zero 30 5G', slug: 'zero-30-5g', year: 2023, storage: [256], ram: [8, 12] },
    { name: 'GT 20 Pro', slug: 'gt-20-pro', year: 2024, storage: [256], ram: [8, 12] },
    { name: 'GT 10 Pro', slug: 'gt-10-pro', year: 2023, storage: [256], ram: [8] },
    { name: 'Note 40 Pro+ 5G', slug: 'note-40-pro-plus-5g', year: 2024, storage: [256], ram: [12] },
    { name: 'Note 40 Pro', slug: 'note-40-pro', year: 2024, storage: [256], ram: [8, 12] },
    { name: 'Note 40', slug: 'note-40', year: 2024, storage: [256], ram: [8] },
    { name: 'Note 30 Pro', slug: 'note-30-pro', year: 2023, storage: [256], ram: [8] },
    { name: 'Note 30', slug: 'note-30', year: 2023, storage: [128, 256], ram: [8] },
    { name: 'Hot 50 Pro+', slug: 'hot-50-pro-plus', year: 2024, storage: [128, 256], ram: [8] },
    { name: 'Hot 50', slug: 'hot-50', year: 2024, storage: [128, 256], ram: [6, 8] },
    { name: 'Hot 40 Pro', slug: 'hot-40-pro', year: 2024, storage: [128, 256], ram: [8] },
    { name: 'Hot 40', slug: 'hot-40', year: 2023, storage: [128, 256], ram: [8] },
    { name: 'Hot 30', slug: 'hot-30', year: 2023, storage: [128], ram: [8] },
    { name: 'Smart 8 Pro', slug: 'smart-8-pro', year: 2024, storage: [64, 128], ram: [4, 8] },
    { name: 'Smart 8', slug: 'smart-8', year: 2023, storage: [64, 128], ram: [3, 4] },
  ],

  // Tecno
  tecno: [
    { name: 'Phantom V Fold 2', slug: 'phantom-v-fold-2', year: 2024, storage: [512], ram: [12] },
    { name: 'Phantom V Flip 2', slug: 'phantom-v-flip-2', year: 2024, storage: [256], ram: [8] },
    { name: 'Camon 30 Premier', slug: 'camon-30-premier', year: 2024, storage: [512], ram: [12] },
    { name: 'Camon 30 Pro 5G', slug: 'camon-30-pro-5g', year: 2024, storage: [256, 512], ram: [12] },
    { name: 'Camon 30', slug: 'camon-30', year: 2024, storage: [256], ram: [8, 12] },
    { name: 'Camon 20 Pro', slug: 'camon-20-pro', year: 2023, storage: [256], ram: [8] },
    { name: 'Spark 20 Pro Plus', slug: 'spark-20-pro-plus', year: 2024, storage: [256], ram: [8] },
    { name: 'Spark 20 Pro', slug: 'spark-20-pro', year: 2023, storage: [256], ram: [8] },
    { name: 'Spark 20', slug: 'spark-20', year: 2023, storage: [128, 256], ram: [8] },
    { name: 'Spark 10 Pro', slug: 'spark-10-pro', year: 2023, storage: [128, 256], ram: [8] },
    { name: 'Pova 6 Pro 5G', slug: 'pova-6-pro-5g', year: 2024, storage: [256], ram: [8, 12] },
    { name: 'Pova 6', slug: 'pova-6', year: 2024, storage: [256], ram: [8, 12] },
    { name: 'Pop 8', slug: 'pop-8', year: 2023, storage: [64, 128], ram: [3, 4] },
  ],

  // Motorola
  motorola: [
    { name: 'Razr 50 Ultra', slug: 'razr-50-ultra', year: 2024, storage: [512], ram: [12] },
    { name: 'Razr 40 Ultra', slug: 'razr-40-ultra', year: 2023, storage: [256, 512], ram: [8, 12] },
    { name: 'Edge 50 Ultra', slug: 'edge-50-ultra', year: 2024, storage: [512, 1024], ram: [12, 16] },
    { name: 'Edge 50 Pro', slug: 'edge-50-pro', year: 2024, storage: [128, 256, 512], ram: [8, 12] },
    { name: 'Edge 50 Fusion', slug: 'edge-50-fusion', year: 2024, storage: [128, 256], ram: [8, 12] },
    { name: 'Edge 40 Pro', slug: 'edge-40-pro', year: 2023, storage: [256], ram: [12] },
    { name: 'Edge 40', slug: 'edge-40', year: 2023, storage: [128, 256], ram: [8] },
    { name: 'Moto G84 5G', slug: 'moto-g84-5g', year: 2023, storage: [256], ram: [12] },
    { name: 'Moto G54 5G', slug: 'moto-g54-5g', year: 2023, storage: [128, 256], ram: [8, 12] },
    { name: 'Moto G24 Power', slug: 'moto-g24-power', year: 2024, storage: [128, 256], ram: [4, 8] },
  ],

  // Honor
  honor: [
    { name: 'Honor Magic 6 Pro', slug: 'honor-magic-6-pro', year: 2024, storage: [512, 1024], ram: [12, 16] },
    { name: 'Honor Magic V3', slug: 'honor-magic-v3', year: 2024, storage: [512, 1024], ram: [12, 16] },
    { name: 'Honor 200 Pro', slug: 'honor-200-pro', year: 2024, storage: [512], ram: [12, 16] },
    { name: 'Honor 200', slug: 'honor-200', year: 2024, storage: [256, 512], ram: [8, 12] },
    { name: 'Honor 200 Lite', slug: 'honor-200-lite', year: 2024, storage: [256], ram: [8] },
    { name: 'Honor 90', slug: 'honor-90', year: 2023, storage: [256, 512], ram: [8, 12, 16] },
    { name: 'Honor X9b', slug: 'honor-x9b', year: 2023, storage: [256], ram: [8, 12] },
    { name: 'Honor X8b', slug: 'honor-x8b', year: 2023, storage: [128, 256, 512], ram: [8] },
    { name: 'Honor X7b', slug: 'honor-x7b', year: 2023, storage: [128, 256], ram: [6, 8] },
    { name: 'Honor X6b', slug: 'honor-x6b', year: 2024, storage: [128, 256], ram: [4, 6] },
  ],

  // Huawei
  huawei: [
    { name: 'Huawei Pura 70 Ultra', slug: 'huawei-pura-70-ultra', year: 2024, storage: [512, 1024], ram: [16] },
    { name: 'Huawei Pura 70 Pro', slug: 'huawei-pura-70-pro', year: 2024, storage: [256, 512], ram: [12] },
    { name: 'Huawei Pura 70', slug: 'huawei-pura-70', year: 2024, storage: [256, 512], ram: [12] },
    { name: 'Huawei Mate 60 Pro', slug: 'huawei-mate-60-pro', year: 2023, storage: [256, 512, 1024], ram: [12] },
    { name: 'Huawei Mate 50 Pro', slug: 'huawei-mate-50-pro', year: 2022, storage: [256, 512], ram: [8] },
    { name: 'Huawei Nova 12', slug: 'huawei-nova-12', year: 2024, storage: [256, 512], ram: [8] },
    { name: 'Huawei Nova 11 Pro', slug: 'huawei-nova-11-pro', year: 2023, storage: [256, 512], ram: [8] },
  ],

  // Nothing
  nothing: [
    { name: 'Nothing Phone (2a) Plus', slug: 'nothing-phone-2a-plus', year: 2024, storage: [256], ram: [12] },
    { name: 'Nothing Phone (2a)', slug: 'nothing-phone-2a', year: 2024, storage: [128, 256], ram: [8, 12] },
    { name: 'Nothing Phone (2)', slug: 'nothing-phone-2', year: 2023, storage: [128, 256, 512], ram: [8, 12] },
    { name: 'Nothing Phone (1)', slug: 'nothing-phone-1', year: 2022, storage: [128, 256], ram: [8, 12] },
    { name: 'CMF Phone 1', slug: 'cmf-phone-1', year: 2024, storage: [128, 256], ram: [6, 8] },
  ],

  // Itel
  itel: [
    { name: 'Itel S24', slug: 'itel-s24', year: 2024, storage: [128, 256], ram: [4, 8] },
    { name: 'Itel S23+', slug: 'itel-s23-plus', year: 2023, storage: [128, 256], ram: [8] },
    { name: 'Itel Color Pro 5G', slug: 'itel-color-pro-5g', year: 2024, storage: [128], ram: [6] },
    { name: 'Itel P55+', slug: 'itel-p55-plus', year: 2024, storage: [128, 256], ram: [8] },
    { name: 'Itel P55 5G', slug: 'itel-p55-5g', year: 2023, storage: [64, 128], ram: [4, 6] },
    { name: 'Itel A70', slug: 'itel-a70', year: 2023, storage: [64, 128, 256], ram: [3, 4] },
    { name: 'Itel A05s', slug: 'itel-a05s', year: 2023, storage: [32, 64], ram: [2, 4] },
  ],

  // Nokia
  nokia: [
    { name: 'Nokia G42 5G', slug: 'nokia-g42-5g', year: 2023, storage: [128, 256], ram: [6, 8] },
    { name: 'Nokia G22', slug: 'nokia-g22', year: 2023, storage: [64, 128], ram: [4] },
    { name: 'Nokia C32', slug: 'nokia-c32', year: 2023, storage: [64, 128], ram: [3, 4] },
    { name: 'Nokia C22', slug: 'nokia-c22', year: 2023, storage: [64], ram: [2, 3] },
  ],
}

const BRAND_HEX_CODES: Record<string, string> = {
  apple: '01',
  samsung: '02',
  xiaomi: '03',
  'google-pixel': '04',
  oneplus: '05',
  vivo: '06',
  oppo: '07',
  realme: '08',
  infinix: '09',
  tecno: '0a',
  motorola: '0b',
  honor: '0c',
  huawei: '0d',
  nothing: '0e',
  itel: '0f',
  nokia: '10',
}

/**
 * Standard deterministic RFC 4122 v4 UUID helper for catalog models
 */
function makeCatalogModelId(brandKey: string, modelIndex: number): string {
  const code = BRAND_HEX_CODES[brandKey] || '99'
  const indexHex = modelIndex.toString(16).padStart(12, '0')
  return `a10100${code}-0000-4000-8000-${indexHex}`
}

/**
 * Get all models for a brand (by brand slug or brand name or brand ID)
 */
export function getCatalogModelsForBrand(
  brandIdentifier: string,
  actualBrandId?: string
): ModelOption[] {
  if (!brandIdentifier) return []

  const clean = brandIdentifier.toLowerCase().trim()
  let key = clean

  if (clean.includes('pixel') || clean === 'google') key = 'google-pixel'
  else if (clean.includes('apple') || clean.includes('iphone')) key = 'apple'
  else if (clean.includes('samsung')) key = 'samsung'
  else if (clean.includes('xiaomi') || clean.includes('redmi') || clean.includes('poco')) key = 'xiaomi'
  else if (clean.includes('oneplus')) key = 'oneplus'
  else if (clean.includes('vivo')) key = 'vivo'
  else if (clean.includes('oppo')) key = 'oppo'
  else if (clean.includes('realme')) key = 'realme'
  else if (clean.includes('infinix')) key = 'infinix'
  else if (clean.includes('tecno')) key = 'tecno'
  else if (clean.includes('motorola') || clean === 'moto') key = 'motorola'
  else if (clean.includes('honor')) key = 'honor'
  else if (clean.includes('huawei')) key = 'huawei'
  else if (clean.includes('nothing')) key = 'nothing'
  else if (clean.includes('itel')) key = 'itel'
  else if (clean.includes('nokia')) key = 'nokia'

  const modelsList = CATALOG_MODELS[key] || []
  const resolvedBrandId = actualBrandId || 'b1010000-0000-4000-8000-000000000001'

  return modelsList.map((m, idx) => ({
    id: makeCatalogModelId(key, idx + 1),
    brand_id: resolvedBrandId,
    name: m.name,
    slug: m.slug,
    release_year: m.year,
    storage_options: m.storage,
    ram_options: m.ram || null,
  }))
}
