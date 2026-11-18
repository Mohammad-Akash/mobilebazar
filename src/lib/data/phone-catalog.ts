// ==============================================================================
// Comprehensive Smartphone Catalog (All 66 Brands & Accurate Models from Master List)
// Extracted and validated from PriceOye, Google Play supported devices, and master sheet.
// ==============================================================================

import { BrandOption, ModelOption } from './reference'

export interface ExtendedBrandOption extends BrandOption {
  tier?: 1 | 2 | 3
}

export const CATALOG_BRANDS: ExtendedBrandOption[] = [
  {
    "id": "89ef2b03-0aea-4b7c-ae2a-1301cf370dd7",
    "name": "Apple",
    "slug": "apple",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "2abb2ec7-c3ae-4a0f-9cb7-0f08f790829f",
    "name": "Samsung",
    "slug": "samsung",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "8a84f385-71b3-4cf6-84a8-8c7615394ef4",
    "name": "Xiaomi",
    "slug": "xiaomi",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "5fcb1c16-f5d4-48c1-b6bb-026519fff71c",
    "name": "Redmi",
    "slug": "redmi",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "11fa418e-efaa-41cb-befe-3297781ea839",
    "name": "Poco",
    "slug": "poco",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "84611d19-7c00-43bc-93b6-5f3a43f45802",
    "name": "Infinix",
    "slug": "infinix",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "299b7d5f-b004-4107-b12e-94e7229dad1a",
    "name": "Tecno",
    "slug": "tecno",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "7f29a504-fb6f-4b51-bfa3-4e7ff591b45f",
    "name": "Oppo",
    "slug": "oppo",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "f3589e55-3989-4a17-af11-c3d0dafbe1a9",
    "name": "Vivo",
    "slug": "vivo",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "a4f542ff-f5ea-4f92-88e3-04683a6f0826",
    "name": "Realme",
    "slug": "realme",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "401fab0b-85de-42e0-afff-f1c43287c336",
    "name": "Huawei",
    "slug": "huawei",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "227b66ea-def5-4e58-85ee-1604d97dbf8f",
    "name": "Honor",
    "slug": "honor",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "d4a8a33a-b8a8-4d17-b207-8613b906e132",
    "name": "Google Pixel",
    "slug": "google-pixel",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "7bd86084-3520-4085-88d8-34832adc16c6",
    "name": "OnePlus",
    "slug": "oneplus",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "d0719159-403e-4954-a910-955e0eec5b85",
    "name": "Motorola",
    "slug": "motorola",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "98f30eac-8a5f-453c-96d6-b134b6a4e11e",
    "name": "Nokia",
    "slug": "nokia",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000011",
    "name": "HMD",
    "slug": "hmd",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "53d50a13-6775-4037-acb4-e2b6446b6c02",
    "name": "Itel",
    "slug": "itel",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "7d55f673-5b6c-4e36-80cf-a127b182bd16",
    "name": "Nothing",
    "slug": "nothing",
    "tier": 1,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000014",
    "name": "QMobile",
    "slug": "qmobile",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000015",
    "name": "Rivo",
    "slug": "rivo",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000016",
    "name": "Sony",
    "slug": "sony",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000017",
    "name": "LG",
    "slug": "lg",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000018",
    "name": "Asus",
    "slug": "asus",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000019",
    "name": "Lenovo",
    "slug": "lenovo",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000001a",
    "name": "ZTE",
    "slug": "zte",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000001b",
    "name": "Meizu",
    "slug": "meizu",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000001c",
    "name": "Microsoft",
    "slug": "microsoft",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000001d",
    "name": "HTC",
    "slug": "htc",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000001e",
    "name": "TCL",
    "slug": "tcl",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000001f",
    "name": "Alcatel",
    "slug": "alcatel",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000020",
    "name": "BlackBerry",
    "slug": "blackberry",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000021",
    "name": "Gionee",
    "slug": "gionee",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000022",
    "name": "Philips",
    "slug": "philips",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000023",
    "name": "Jazz Digit",
    "slug": "jazz-digit",
    "tier": 2,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000024",
    "name": "All Call",
    "slug": "all-call",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000025",
    "name": "Bontel",
    "slug": "bontel",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000026",
    "name": "Calme",
    "slug": "calme",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000027",
    "name": "Club Mobile",
    "slug": "club-mobile",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000028",
    "name": "Dcode",
    "slug": "dcode",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000029",
    "name": "Digit",
    "slug": "digit",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000002a",
    "name": "E Tachi",
    "slug": "e-tachi",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000002b",
    "name": "Faywa",
    "slug": "faywa",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000002c",
    "name": "Gfive",
    "slug": "gfive",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000002d",
    "name": "Gresso",
    "slug": "gresso",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000002e",
    "name": "Haier",
    "slug": "haier",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000002f",
    "name": "Hello Tech",
    "slug": "hello-tech",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000030",
    "name": "Kxd",
    "slug": "kxd",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000031",
    "name": "Lvtel",
    "slug": "lvtel",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000032",
    "name": "Maxfone",
    "slug": "maxfone",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000033",
    "name": "Me Mobile",
    "slug": "me-mobile",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000034",
    "name": "Nexel",
    "slug": "nexel",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000035",
    "name": "Oukitel",
    "slug": "oukitel",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000036",
    "name": "Remaxx",
    "slug": "remaxx",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000037",
    "name": "Sego",
    "slug": "sego",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000038",
    "name": "Sparx",
    "slug": "sparx",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000039",
    "name": "Spice",
    "slug": "spice",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000003a",
    "name": "Umidigi",
    "slug": "umidigi",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000003b",
    "name": "Vgo Tel",
    "slug": "vgo-tel",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000003c",
    "name": "Villaon",
    "slug": "villaon",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000003d",
    "name": "Venus",
    "slug": "venus",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000003e",
    "name": "Wintel",
    "slug": "wintel",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-00000000003f",
    "name": "X Cell",
    "slug": "x-cell",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000040",
    "name": "Xmobile",
    "slug": "xmobile",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000041",
    "name": "Xsmart",
    "slug": "xsmart",
    "tier": 3,
    "logo_url": null
  },
  {
    "id": "b1010000-0000-4000-8000-000000000042",
    "name": "Zentality",
    "slug": "zentality",
    "tier": 3,
    "logo_url": null
  }
];

export const CATALOG_MODELS: Record<string, Array<{ name: string; slug: string; year: number; storage: number[]; ram?: number[] }>> = {
  "apple": [
    {
      "name": "iPhone 16 Pro Max",
      "slug": "iphone-16-pro-max",
      "year": 2024,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "iPhone 16 Pro",
      "slug": "iphone-16-pro",
      "year": 2024,
      "storage": [
        128,
        256,
        512,
        1024
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "iPhone 16 Plus",
      "slug": "iphone-16-plus",
      "year": 2024,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "iPhone 16",
      "slug": "iphone-16",
      "year": 2024,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "iPhone 16e",
      "slug": "iphone-16e",
      "year": 2025,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "iPhone 15 Pro Max",
      "slug": "iphone-15-pro-max",
      "year": 2023,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "iPhone 15 Pro",
      "slug": "iphone-15-pro",
      "year": 2023,
      "storage": [
        128,
        256,
        512,
        1024
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "iPhone 15 Plus",
      "slug": "iphone-15-plus",
      "year": 2023,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "iPhone 15",
      "slug": "iphone-15",
      "year": 2023,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "iPhone 14 Pro Max",
      "slug": "iphone-14-pro-max",
      "year": 2022,
      "storage": [
        128,
        256,
        512,
        1024
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "iPhone 14 Pro",
      "slug": "iphone-14-pro",
      "year": 2022,
      "storage": [
        128,
        256,
        512,
        1024
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "iPhone 14 Plus",
      "slug": "iphone-14-plus",
      "year": 2022,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "iPhone 14",
      "slug": "iphone-14",
      "year": 2022,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "iPhone SE (3rd gen)",
      "slug": "iphone-se-3rd-gen",
      "year": 2022,
      "storage": [
        64,
        128,
        256
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "iPhone 13 Pro Max",
      "slug": "iphone-13-pro-max",
      "year": 2021,
      "storage": [
        128,
        256,
        512,
        1024
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "iPhone 13 Pro",
      "slug": "iphone-13-pro",
      "year": 2021,
      "storage": [
        128,
        256,
        512,
        1024
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "iPhone 13",
      "slug": "iphone-13",
      "year": 2021,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "iPhone 13 mini",
      "slug": "iphone-13-mini",
      "year": 2021,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "iPhone 12 Pro Max",
      "slug": "iphone-12-pro-max",
      "year": 2020,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "iPhone 12 Pro",
      "slug": "iphone-12-pro",
      "year": 2020,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "iPhone 12",
      "slug": "iphone-12",
      "year": 2020,
      "storage": [
        64,
        128,
        256
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "iPhone 12 mini",
      "slug": "iphone-12-mini",
      "year": 2020,
      "storage": [
        64,
        128,
        256
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "iPhone SE (2nd gen)",
      "slug": "iphone-se-2nd-gen",
      "year": 2020,
      "storage": [
        64,
        128,
        256
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "iPhone 11 Pro Max",
      "slug": "iphone-11-pro-max",
      "year": 2019,
      "storage": [
        64,
        256,
        512
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "iPhone 11 Pro",
      "slug": "iphone-11-pro",
      "year": 2019,
      "storage": [
        64,
        256,
        512
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "iPhone 11",
      "slug": "iphone-11",
      "year": 2019,
      "storage": [
        64,
        128,
        256
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "iPhone XS Max",
      "slug": "iphone-xs-max",
      "year": 2018,
      "storage": [
        64,
        256,
        512
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "iPhone XS",
      "slug": "iphone-xs",
      "year": 2018,
      "storage": [
        64,
        256,
        512
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "iPhone XR",
      "slug": "iphone-xr",
      "year": 2018,
      "storage": [
        64,
        128,
        256
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "iPhone X",
      "slug": "iphone-x",
      "year": 2017,
      "storage": [
        64,
        256
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "iPhone 8 Plus",
      "slug": "iphone-8-plus",
      "year": 2017,
      "storage": [
        64,
        128,
        256
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "iPhone 8",
      "slug": "iphone-8",
      "year": 2017,
      "storage": [
        64,
        128,
        256
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "iPhone 7 Plus",
      "slug": "iphone-7-plus",
      "year": 2016,
      "storage": [
        32,
        128,
        256
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "iPhone 7",
      "slug": "iphone-7",
      "year": 2016,
      "storage": [
        32,
        128,
        256
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "iPhone SE (1st gen)",
      "slug": "iphone-se-1st-gen",
      "year": 2016,
      "storage": [
        16,
        32,
        64,
        128
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "iPhone 6s Plus",
      "slug": "iphone-6s-plus",
      "year": 2015,
      "storage": [
        16,
        32,
        64,
        128
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "iPhone 6s",
      "slug": "iphone-6s",
      "year": 2015,
      "storage": [
        16,
        32,
        64,
        128
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "iPhone 6 Plus",
      "slug": "iphone-6-plus",
      "year": 2014,
      "storage": [
        16,
        64,
        128
      ],
      "ram": [
        1
      ]
    },
    {
      "name": "iPhone 6",
      "slug": "iphone-6",
      "year": 2014,
      "storage": [
        16,
        64,
        128
      ],
      "ram": [
        1
      ]
    },
    {
      "name": "iPhone 17 Pro Max",
      "slug": "iphone-17-pro-max",
      "year": 2025,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "year": 2025,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "iPhone 17",
      "slug": "iphone-17",
      "year": 2025,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "iPhone Air",
      "slug": "iphone-air",
      "year": 2025,
      "storage": [
        256,
        512
      ],
      "ram": [
        8
      ]
    }
  ],
  "samsung": [
    {
      "name": "Galaxy S24 Ultra",
      "slug": "galaxy-s24-ultra",
      "year": 2024,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Galaxy S24 Plus",
      "slug": "galaxy-s24-plus",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Galaxy S24",
      "slug": "galaxy-s24",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy S24 FE",
      "slug": "galaxy-s24-fe",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy S23 Ultra",
      "slug": "galaxy-s23-ultra",
      "year": 2023,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Galaxy S23 Plus",
      "slug": "galaxy-s23-plus",
      "year": 2023,
      "storage": [
        256,
        512
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy S23",
      "slug": "galaxy-s23",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy S23 FE",
      "slug": "galaxy-s23-fe",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy S22 Ultra",
      "slug": "galaxy-s22-ultra",
      "year": 2022,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Galaxy S22 Plus",
      "slug": "galaxy-s22-plus",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy S22",
      "slug": "galaxy-s22",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy S21 Ultra 5G",
      "slug": "galaxy-s21-ultra-5g",
      "year": 2021,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Galaxy S21 5G",
      "slug": "galaxy-s21-5g",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy S21 FE 5G",
      "slug": "galaxy-s21-fe-5g",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy S20 Ultra 5G",
      "slug": "galaxy-s20-ultra-5g",
      "year": 2020,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Galaxy S20 FE 5G",
      "slug": "galaxy-s20-fe-5g",
      "year": 2020,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy S20 5G",
      "slug": "galaxy-s20-5g",
      "year": 2020,
      "storage": [
        128
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Galaxy S10 5G",
      "slug": "galaxy-s10-5g",
      "year": 2019,
      "storage": [
        256,
        512
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy S10",
      "slug": "galaxy-s10",
      "year": 2019,
      "storage": [
        128,
        512
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy S10e",
      "slug": "galaxy-s10e",
      "year": 2019,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy S9",
      "slug": "galaxy-s9",
      "year": 2018,
      "storage": [
        64,
        128,
        256
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Galaxy S8",
      "slug": "galaxy-s8",
      "year": 2017,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Galaxy S7 Edge",
      "slug": "galaxy-s7-edge",
      "year": 2016,
      "storage": [
        32,
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Galaxy S7",
      "slug": "galaxy-s7",
      "year": 2016,
      "storage": [
        32,
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Galaxy S6 Edge",
      "slug": "galaxy-s6-edge",
      "year": 2015,
      "storage": [
        32,
        64,
        128
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Galaxy S6",
      "slug": "galaxy-s6",
      "year": 2015,
      "storage": [
        32,
        64,
        128
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Galaxy Note20 Ultra 5G",
      "slug": "galaxy-note20-ultra-5g",
      "year": 2020,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Galaxy Note20 5G",
      "slug": "galaxy-note20-5g",
      "year": 2020,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy Note10 5G",
      "slug": "galaxy-note10-5g",
      "year": 2019,
      "storage": [
        256
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Galaxy Note10",
      "slug": "galaxy-note10",
      "year": 2019,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy Note10 Lite",
      "slug": "galaxy-note10-lite",
      "year": 2020,
      "storage": [
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy Note9",
      "slug": "galaxy-note9",
      "year": 2018,
      "storage": [
        128,
        512
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy Note8",
      "slug": "galaxy-note8",
      "year": 2017,
      "storage": [
        64,
        128,
        256
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "Galaxy Note5",
      "slug": "galaxy-note5",
      "year": 2015,
      "storage": [
        32,
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Galaxy Note4",
      "slug": "galaxy-note4",
      "year": 2014,
      "storage": [
        32
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Galaxy Note3",
      "slug": "galaxy-note3",
      "year": 2013,
      "storage": [
        16,
        32,
        64
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Galaxy Z Fold6",
      "slug": "galaxy-z-fold6",
      "year": 2024,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Galaxy Z Flip6",
      "slug": "galaxy-z-flip6",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Galaxy Z Fold5",
      "slug": "galaxy-z-fold5",
      "year": 2023,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Galaxy Z Flip5",
      "slug": "galaxy-z-flip5",
      "year": 2023,
      "storage": [
        256,
        512
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy Z Fold4",
      "slug": "galaxy-z-fold4",
      "year": 2022,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Galaxy Z Flip4",
      "slug": "galaxy-z-flip4",
      "year": 2022,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy Z Fold3 5G",
      "slug": "galaxy-z-fold3-5g",
      "year": 2021,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Galaxy Z Flip3 5G",
      "slug": "galaxy-z-flip3-5g",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy Z Fold2 5G",
      "slug": "galaxy-z-fold2-5g",
      "year": 2020,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Galaxy Z Flip",
      "slug": "galaxy-z-flip",
      "year": 2020,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy Fold",
      "slug": "galaxy-fold",
      "year": 2019,
      "storage": [
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Galaxy A55 5G",
      "slug": "galaxy-a55-5g",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Galaxy A54 5G",
      "slug": "galaxy-a54-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy A53 5G",
      "slug": "galaxy-a53-5g",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy A52s 5G",
      "slug": "galaxy-a52s-5g",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy A52",
      "slug": "galaxy-a52",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "Galaxy A51",
      "slug": "galaxy-a51",
      "year": 2019,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "Galaxy A50",
      "slug": "galaxy-a50",
      "year": 2019,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Galaxy A35 5G",
      "slug": "galaxy-a35-5g",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy A34 5G",
      "slug": "galaxy-a34-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy A33 5G",
      "slug": "galaxy-a33-5g",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy A32",
      "slug": "galaxy-a32",
      "year": 2021,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "Galaxy A25 5G",
      "slug": "galaxy-a25-5g",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy A24",
      "slug": "galaxy-a24",
      "year": 2023,
      "storage": [
        128
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "Galaxy A23",
      "slug": "galaxy-a23",
      "year": 2022,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "Galaxy A16 5G",
      "slug": "galaxy-a16-5g",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "Galaxy A15",
      "slug": "galaxy-a15",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "Galaxy A14",
      "slug": "galaxy-a14",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Galaxy A13",
      "slug": "galaxy-a13",
      "year": 2022,
      "storage": [
        32,
        64,
        128
      ],
      "ram": [
        3,
        4,
        6
      ]
    },
    {
      "name": "Galaxy A12",
      "slug": "galaxy-a12",
      "year": 2020,
      "storage": [
        32,
        64,
        128
      ],
      "ram": [
        3,
        4,
        6
      ]
    },
    {
      "name": "Galaxy A10s",
      "slug": "galaxy-a10s",
      "year": 2019,
      "storage": [
        32
      ],
      "ram": [
        2,
        3
      ]
    },
    {
      "name": "Galaxy A06",
      "slug": "galaxy-a06",
      "year": 2024,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Galaxy A05s",
      "slug": "galaxy-a05s",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Galaxy A05",
      "slug": "galaxy-a05",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Galaxy A04s",
      "slug": "galaxy-a04s",
      "year": 2022,
      "storage": [
        32,
        64,
        128
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Galaxy A04",
      "slug": "galaxy-a04",
      "year": 2022,
      "storage": [
        32,
        64
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Galaxy A03s",
      "slug": "galaxy-a03s",
      "year": 2021,
      "storage": [
        32,
        64
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Galaxy A73 5G",
      "slug": "galaxy-a73-5g",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy A72",
      "slug": "galaxy-a72",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy A71",
      "slug": "galaxy-a71",
      "year": 2020,
      "storage": [
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy M55 5G",
      "slug": "galaxy-m55-5g",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Galaxy M54 5G",
      "slug": "galaxy-m54-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy M35 5G",
      "slug": "galaxy-m35-5g",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy M34 5G",
      "slug": "galaxy-m34-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Galaxy M15 5G",
      "slug": "galaxy-m15-5g",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "Galaxy M14",
      "slug": "galaxy-m14",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Galaxy F55 5G",
      "slug": "galaxy-f55-5g",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Galaxy F54 5G",
      "slug": "galaxy-f54-5g",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Galaxy F15 5G",
      "slug": "galaxy-f15-5g",
      "year": 2024,
      "storage": [
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Galaxy F14",
      "slug": "galaxy-f14",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Galaxy Grand Prime",
      "slug": "galaxy-grand-prime",
      "year": 2014,
      "storage": [
        8
      ],
      "ram": [
        1
      ]
    },
    {
      "name": "Galaxy Core Prime",
      "slug": "galaxy-core-prime",
      "year": 2014,
      "storage": [
        8
      ],
      "ram": [
        1
      ]
    },
    {
      "name": "Galaxy J7 Prime",
      "slug": "galaxy-j7-prime",
      "year": 2016,
      "storage": [
        16,
        32
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Galaxy J7 Pro",
      "slug": "galaxy-j7-pro",
      "year": 2017,
      "storage": [
        32,
        64
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Galaxy J7",
      "slug": "galaxy-j7",
      "year": 2015,
      "storage": [
        16
      ],
      "ram": [
        1.5
      ]
    },
    {
      "name": "Galaxy J5 Prime",
      "slug": "galaxy-j5-prime",
      "year": 2016,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Galaxy J5",
      "slug": "galaxy-j5",
      "year": 2015,
      "storage": [
        8,
        16
      ],
      "ram": [
        1.5
      ]
    },
    {
      "name": "Galaxy J3",
      "slug": "galaxy-j3",
      "year": 2016,
      "storage": [
        8,
        16
      ],
      "ram": [
        1.5,
        2
      ]
    },
    {
      "name": "Galaxy J2 Prime",
      "slug": "galaxy-j2-prime",
      "year": 2016,
      "storage": [
        8
      ],
      "ram": [
        1.5
      ]
    },
    {
      "name": "Galaxy J1 Ace",
      "slug": "galaxy-j1-ace",
      "year": 2015,
      "storage": [
        4,
        8
      ],
      "ram": [
        1
      ]
    }
  ],
  "google": [
    {
      "name": "Pixel 9 Pro Fold",
      "slug": "pixel-9-pro-fold",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        16
      ]
    },
    {
      "name": "Pixel 9 Pro XL",
      "slug": "pixel-9-pro-xl",
      "year": 2024,
      "storage": [
        128,
        256,
        512,
        1024
      ],
      "ram": [
        16
      ]
    },
    {
      "name": "Pixel 9 Pro",
      "slug": "pixel-9-pro",
      "year": 2024,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        16
      ]
    },
    {
      "name": "Pixel 9",
      "slug": "pixel-9",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Pixel 8a",
      "slug": "pixel-8a",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Pixel 8 Pro",
      "slug": "pixel-8-pro",
      "year": 2023,
      "storage": [
        128,
        256,
        512,
        1024
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Pixel 8",
      "slug": "pixel-8",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Pixel Fold",
      "slug": "pixel-fold",
      "year": 2023,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Pixel 7a",
      "slug": "pixel-7a",
      "year": 2023,
      "storage": [
        128
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Pixel 7 Pro",
      "slug": "pixel-7-pro",
      "year": 2022,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Pixel 7",
      "slug": "pixel-7",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Pixel 6a",
      "slug": "pixel-6a",
      "year": 2022,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "Pixel 6 Pro",
      "slug": "pixel-6-pro",
      "year": 2021,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Pixel 6",
      "slug": "pixel-6",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Pixel 5a 5G",
      "slug": "pixel-5a-5g",
      "year": 2021,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "Pixel 5",
      "slug": "pixel-5",
      "year": 2020,
      "storage": [
        128
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Pixel 4a (5G)",
      "slug": "pixel-4a-5g",
      "year": 2020,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "Pixel 4a",
      "slug": "pixel-4a",
      "year": 2020,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "Pixel 4 XL",
      "slug": "pixel-4-xl",
      "year": 2019,
      "storage": [
        64,
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "Pixel 4",
      "slug": "pixel-4",
      "year": 2019,
      "storage": [
        64,
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "Pixel 3a XL",
      "slug": "pixel-3a-xl",
      "year": 2019,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Pixel 3a",
      "slug": "pixel-3a",
      "year": 2019,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Pixel 3 XL",
      "slug": "pixel-3-xl",
      "year": 2018,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Pixel 3",
      "slug": "pixel-3",
      "year": 2018,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Pixel 2 XL",
      "slug": "pixel-2-xl",
      "year": 2017,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Pixel 2",
      "slug": "pixel-2",
      "year": 2017,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Pixel XL",
      "slug": "pixel-xl",
      "year": 2016,
      "storage": [
        32,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Pixel",
      "slug": "pixel",
      "year": 2016,
      "storage": [
        32,
        128
      ],
      "ram": [
        4
      ]
    }
  ],
  "xiaomi": [
    {
      "name": "Xiaomi 14 Ultra",
      "slug": "14-ultra",
      "year": 2024,
      "storage": [
        512,
        1024
      ],
      "ram": [
        16
      ]
    },
    {
      "name": "Xiaomi 14 Pro",
      "slug": "14-pro",
      "year": 2024,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Xiaomi 14",
      "slug": "14",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Xiaomi 14T Pro",
      "slug": "14t-pro",
      "year": 2024,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Xiaomi 14T",
      "slug": "14t",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Xiaomi 13 Ultra",
      "slug": "13-ultra",
      "year": 2023,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Xiaomi 13 Pro",
      "slug": "13-pro",
      "year": 2023,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Xiaomi 13",
      "slug": "13",
      "year": 2023,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Xiaomi 13T Pro",
      "slug": "13t-pro",
      "year": 2023,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Xiaomi 13T",
      "slug": "13t",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Xiaomi 13 Lite",
      "slug": "13-lite",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Xiaomi 12T Pro",
      "slug": "12t-pro",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Xiaomi 12T",
      "slug": "12t",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Xiaomi 12 Pro",
      "slug": "12-pro",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Xiaomi 12",
      "slug": "12",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Xiaomi 12 Lite",
      "slug": "12-lite",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Xiaomi 11T Pro",
      "slug": "11t-pro",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Xiaomi 11T",
      "slug": "11t",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Mi 11 Ultra",
      "slug": "mi-11-ultra",
      "year": 2021,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Mi 11 Lite 5G",
      "slug": "mi-11-lite-5g",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Mi 11",
      "slug": "mi-11",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Mi 10T Pro",
      "slug": "mi-10t-pro",
      "year": 2020,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Mi 10T",
      "slug": "mi-10t",
      "year": 2020,
      "storage": [
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Mi 10",
      "slug": "mi-10",
      "year": 2020,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Mi 9T Pro",
      "slug": "mi-9t-pro",
      "year": 2019,
      "storage": [
        64,
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Mi 9",
      "slug": "mi-9",
      "year": 2019,
      "storage": [
        64,
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Mix Fold 4",
      "slug": "mix-fold-4",
      "year": 2024,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Mix Flip",
      "slug": "mix-flip",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Mix Fold 3",
      "slug": "mix-fold-3",
      "year": 2023,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Mix 4",
      "slug": "mix-4",
      "year": 2021,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Civi 4",
      "slug": "civi-4",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Civi 3",
      "slug": "civi-3",
      "year": 2023,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    }
  ],
  "redmi": [
    {
      "name": "Note 14 Pro 5G",
      "slug": "note-14-pro-5g",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Note 14 5G",
      "slug": "note-14-5g",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Note 14",
      "slug": "note-14",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Note 13 Pro+ 5G",
      "slug": "note-13-pro-5g",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Note 13 Pro",
      "slug": "note-13-pro",
      "year": 2024,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Note 13 5G",
      "slug": "note-13-5g",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Note 13",
      "slug": "note-13",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Note 12 Pro+ 5G",
      "slug": "note-12-pro-5g",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Note 12 Pro",
      "slug": "note-12-pro",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Note 12 5G",
      "slug": "note-12-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "Note 12",
      "slug": "note-12",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "Note 12S",
      "slug": "note-12s",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Note 11 Pro 5G",
      "slug": "note-11-pro-5g",
      "year": 2022,
      "storage": [
        64,
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Note 11 Pro",
      "slug": "note-11-pro",
      "year": 2022,
      "storage": [
        64,
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Note 11S",
      "slug": "note-11s",
      "year": 2022,
      "storage": [
        64,
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Note 11",
      "slug": "note-11",
      "year": 2022,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Note 10 Pro Max",
      "slug": "note-10-pro-max",
      "year": 2021,
      "storage": [
        64,
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Note 10 Pro",
      "slug": "note-10-pro",
      "year": 2021,
      "storage": [
        64,
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Note 10S",
      "slug": "note-10s",
      "year": 2021,
      "storage": [
        64,
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Note 10",
      "slug": "note-10",
      "year": 2021,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Note 9 Pro",
      "slug": "note-9-pro",
      "year": 2020,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Note 9S",
      "slug": "note-9s",
      "year": 2020,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Note 9",
      "slug": "note-9",
      "year": 2020,
      "storage": [
        64,
        128
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Note 8 Pro",
      "slug": "note-8-pro",
      "year": 2019,
      "storage": [
        64,
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Note 8",
      "slug": "note-8",
      "year": 2019,
      "storage": [
        32,
        64,
        128
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Note 7 Pro",
      "slug": "note-7-pro",
      "year": 2019,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Note 7",
      "slug": "note-7",
      "year": 2019,
      "storage": [
        32,
        64
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "14C 5G",
      "slug": "14c-5g",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "14C",
      "slug": "14c",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "13C 5G",
      "slug": "13c-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "13C",
      "slug": "13c",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "13 5G",
      "slug": "13-5g",
      "year": 2024,
      "storage": [
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "12 5G",
      "slug": "12-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "12",
      "slug": "12",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        8
      ]
    },
    {
      "name": "12C",
      "slug": "12c",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        3,
        4,
        6
      ]
    },
    {
      "name": "10C",
      "slug": "10c",
      "year": 2022,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "10A",
      "slug": "10a",
      "year": 2022,
      "storage": [
        32,
        64
      ],
      "ram": [
        2,
        3,
        4
      ]
    },
    {
      "name": "9C",
      "slug": "9c",
      "year": 2020,
      "storage": [
        32,
        64
      ],
      "ram": [
        2,
        3,
        4
      ]
    },
    {
      "name": "9A",
      "slug": "9a",
      "year": 2020,
      "storage": [
        32
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "A3x",
      "slug": "a3x",
      "year": 2024,
      "storage": [
        64,
        128
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "A3",
      "slug": "a3",
      "year": 2024,
      "storage": [
        64,
        128
      ],
      "ram": [
        3,
        4,
        6
      ]
    },
    {
      "name": "A2",
      "slug": "a2",
      "year": 2023,
      "storage": [
        32,
        64
      ],
      "ram": [
        2,
        3
      ]
    },
    {
      "name": "A1",
      "slug": "a1",
      "year": 2022,
      "storage": [
        32
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "K70 Ultra",
      "slug": "k70-ultra",
      "year": 2024,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "K70 Pro",
      "slug": "k70-pro",
      "year": 2023,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "K70",
      "slug": "k70",
      "year": 2023,
      "storage": [
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "K60 Pro",
      "slug": "k60-pro",
      "year": 2022,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Turbo 3",
      "slug": "turbo-3",
      "year": 2024,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    }
  ],
  "poco": [
    {
      "name": "Poco F6 Pro",
      "slug": "f6-pro",
      "year": 2024,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Poco F6",
      "slug": "f6",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Poco F5 Pro",
      "slug": "f5-pro",
      "year": 2023,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Poco F5",
      "slug": "f5",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Poco F4 GT",
      "slug": "f4-gt",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Poco F4",
      "slug": "f4",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Poco F3",
      "slug": "f3",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Poco F2 Pro",
      "slug": "f2-pro",
      "year": 2020,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Poco F1",
      "slug": "f1",
      "year": 2018,
      "storage": [
        64,
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Poco X6 Pro 5G",
      "slug": "x6-pro-5g",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Poco X6 5G",
      "slug": "x6-5g",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Poco X5 Pro 5G",
      "slug": "x5-pro-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Poco X4 Pro 5G",
      "slug": "x4-pro-5g",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Poco X3 Pro",
      "slug": "x3-pro",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Poco X3 NFC",
      "slug": "x3-nfc",
      "year": 2020,
      "storage": [
        64,
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "Poco M6 Pro 5G",
      "slug": "m6-pro-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "Poco M6 Pro",
      "slug": "m6-pro",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Poco M5",
      "slug": "m5",
      "year": 2022,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Poco M4 Pro 5G",
      "slug": "m4-pro-5g",
      "year": 2021,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Poco C65",
      "slug": "c65",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Poco C55",
      "slug": "c55",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Poco C51",
      "slug": "c51",
      "year": 2023,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    }
  ],
  "infinix": [
    {
      "name": "Zero 40 5G",
      "slug": "zero-40-5g",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Zero 40",
      "slug": "zero-40",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Zero Flip",
      "slug": "zero-flip",
      "year": 2024,
      "storage": [
        512
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Zero 30 5G",
      "slug": "zero-30-5g",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Zero 30",
      "slug": "zero-30",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Zero 20",
      "slug": "zero-20",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Zero Ultra",
      "slug": "zero-ultra",
      "year": 2022,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "GT 20 Pro",
      "slug": "gt-20-pro",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "GT 10 Pro",
      "slug": "gt-10-pro",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Note 40 Pro+ 5G",
      "slug": "note-40-pro-5g",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Note 40 Pro",
      "slug": "note-40-pro",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Note 40",
      "slug": "note-40",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Note 30 Pro",
      "slug": "note-30-pro",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Note 30 5G",
      "slug": "note-30-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        8
      ]
    },
    {
      "name": "Note 30",
      "slug": "note-30",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Note 12 Pro 5G",
      "slug": "note-12-pro-5g",
      "year": 2022,
      "storage": [
        128
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Note 12",
      "slug": "note-12",
      "year": 2022,
      "storage": [
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Hot 50 Pro+",
      "slug": "hot-50-pro",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Hot 50 5G",
      "slug": "hot-50-5g",
      "year": 2024,
      "storage": [
        128
      ],
      "ram": [
        4,
        8
      ]
    },
    {
      "name": "Hot 50",
      "slug": "hot-50",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Hot 50i",
      "slug": "hot-50i",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Hot 40 Pro",
      "slug": "hot-40-pro",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Hot 40",
      "slug": "hot-40",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Hot 40i",
      "slug": "hot-40i",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        8
      ]
    },
    {
      "name": "Hot 30",
      "slug": "hot-30",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Hot 30i",
      "slug": "hot-30i",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        8
      ]
    },
    {
      "name": "Hot 20",
      "slug": "hot-20",
      "year": 2022,
      "storage": [
        128
      ],
      "ram": [
        4,
        6,
        8
      ]
    },
    {
      "name": "Hot 12",
      "slug": "hot-12",
      "year": 2022,
      "storage": [
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Hot 11S",
      "slug": "hot-11s",
      "year": 2021,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Hot 10",
      "slug": "hot-10",
      "year": 2020,
      "storage": [
        64,
        128
      ],
      "ram": [
        3,
        4,
        6
      ]
    },
    {
      "name": "Smart 8 Pro",
      "slug": "smart-8-pro",
      "year": 2024,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        8
      ]
    },
    {
      "name": "Smart 8",
      "slug": "smart-8",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Smart 7",
      "slug": "smart-7",
      "year": 2023,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Smart 6",
      "slug": "smart-6",
      "year": 2021,
      "storage": [
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "tecno": [
    {
      "name": "Phantom V Fold 2 5G",
      "slug": "phantom-v-fold2-5g",
      "year": 2024,
      "storage": [
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Phantom V Flip 2 5G",
      "slug": "phantom-v-flip2-5g",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Phantom V Fold",
      "slug": "phantom-v-fold",
      "year": 2023,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Phantom V Flip 5G",
      "slug": "phantom-v-flip-5g",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Phantom X2 Pro 5G",
      "slug": "phantom-x2-pro-5g",
      "year": 2022,
      "storage": [
        256
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Phantom X2 5G",
      "slug": "phantom-x2-5g",
      "year": 2022,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Camon 30 Premier 5G",
      "slug": "camon-30-premier-5g",
      "year": 2024,
      "storage": [
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Camon 30 Pro 5G",
      "slug": "camon-30-pro-5g",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Camon 30 5G",
      "slug": "camon-30-5g",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Camon 30",
      "slug": "camon-30",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Camon 20 Premier 5G",
      "slug": "camon-20-premier-5g",
      "year": 2023,
      "storage": [
        512
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Camon 20 Pro 5G",
      "slug": "camon-20-pro-5g",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Camon 20",
      "slug": "camon-20",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Camon 19 Pro",
      "slug": "camon-19-pro",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Camon 18",
      "slug": "camon-18",
      "year": 2021,
      "storage": [
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Spark 30 Pro",
      "slug": "spark-30-pro",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Spark 30",
      "slug": "spark-30",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Spark 20 Pro",
      "slug": "spark-20-pro",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Spark 20",
      "slug": "spark-20",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Spark 10 Pro",
      "slug": "spark-10-pro",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Spark 10C",
      "slug": "spark-10c",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        8
      ]
    },
    {
      "name": "Spark Go 1",
      "slug": "spark-go-1",
      "year": 2024,
      "storage": [
        64,
        128
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Spark Go 2024",
      "slug": "spark-go-2024",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Pova 6 Pro 5G",
      "slug": "pova-6-pro-5g",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Pova 6",
      "slug": "pova-6",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Pova 5 Pro 5G",
      "slug": "pova-5-pro-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Pova 5",
      "slug": "pova-5",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Pop 8",
      "slug": "pop-8",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Pop 7 Pro",
      "slug": "pop-7-pro",
      "year": 2023,
      "storage": [
        64
      ],
      "ram": [
        3
      ]
    }
  ],
  "oppo": [
    {
      "name": "Find N3",
      "slug": "find-n3",
      "year": 2023,
      "storage": [
        512
      ],
      "ram": [
        16
      ]
    },
    {
      "name": "Find N3 Flip",
      "slug": "find-n3-flip",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Find X7 Ultra",
      "slug": "find-x7-ultra",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Find X6 Pro",
      "slug": "find-x6-pro",
      "year": 2023,
      "storage": [
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Find X5 Pro",
      "slug": "find-x5-pro",
      "year": 2022,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Reno12 Pro 5G",
      "slug": "reno12-pro-5g",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Reno12 5G",
      "slug": "reno12-5g",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Reno11 Pro",
      "slug": "reno-11-pro",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Reno11",
      "slug": "reno-11",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Reno10 Pro 5G",
      "slug": "reno10-pro-5g",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Reno10 5G",
      "slug": "reno10-5g",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Reno8 Pro 5G",
      "slug": "reno8-pro-5g",
      "year": 2022,
      "storage": [
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Reno8 5G",
      "slug": "reno8-5g",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Reno8 T",
      "slug": "reno8-t",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Reno7 Pro 5G",
      "slug": "reno7-pro-5g",
      "year": 2021,
      "storage": [
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "F27 Pro+ 5G",
      "slug": "f27-pro-5g",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "F21 Pro 5G",
      "slug": "f21-pro-5g",
      "year": 2022,
      "storage": [
        128
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "F19 Pro",
      "slug": "f19-pro",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "F17 Pro",
      "slug": "f17-pro",
      "year": 2020,
      "storage": [
        128
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "F11 Pro",
      "slug": "f11-pro",
      "year": 2019,
      "storage": [
        64,
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "A60",
      "slug": "a60",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "A79 5G",
      "slug": "a79-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "A78",
      "slug": "a78",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "A58",
      "slug": "a58",
      "year": 2023,
      "storage": [
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "A38",
      "slug": "a38",
      "year": 2023,
      "storage": [
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "A18",
      "slug": "a18",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "A17",
      "slug": "a17",
      "year": 2022,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    }
  ],
  "vivo": [
    {
      "name": "X100 Pro",
      "slug": "x100-pro",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        16
      ]
    },
    {
      "name": "X100 Ultra",
      "slug": "x100-ultra",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "X90 Pro",
      "slug": "x90-pro",
      "year": 2023,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "X80 Pro",
      "slug": "x80-pro",
      "year": 2022,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "X Fold3 Pro",
      "slug": "x-fold3-pro",
      "year": 2024,
      "storage": [
        512,
        1024
      ],
      "ram": [
        16
      ]
    },
    {
      "name": "V40 Pro",
      "slug": "v40-pro",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "V40",
      "slug": "v40",
      "year": 2024,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "V40e",
      "slug": "v40e",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "V30 Pro",
      "slug": "v30-pro",
      "year": 2024,
      "storage": [
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "V30",
      "slug": "v30",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "V30e",
      "slug": "v30e",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "V29",
      "slug": "v29",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "V27",
      "slug": "v27",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Y200",
      "slug": "y200",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Y100",
      "slug": "y100",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Y28",
      "slug": "y28",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Y18",
      "slug": "y18",
      "year": 2024,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Y03",
      "slug": "y03",
      "year": 2024,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "iQOO 12",
      "slug": "iqoo-12",
      "year": 2023,
      "storage": [
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "iQOO Neo9 Pro",
      "slug": "iqoo-neo9-pro",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    }
  ],
  "realme": [
    {
      "name": "Realme GT 6",
      "slug": "gt-6",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12,
        16
      ]
    },
    {
      "name": "Realme GT 6T",
      "slug": "gt-6t",
      "year": 2024,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Realme 13 Pro 5G",
      "slug": "13-pro-5g",
      "year": 2024,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Realme 12 Pro 5G",
      "slug": "12-pro-5g",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Realme 12",
      "slug": "12",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Realme 11 Pro 5G",
      "slug": "11-pro-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Realme 10",
      "slug": "10",
      "year": 2022,
      "storage": [
        64,
        128,
        256
      ],
      "ram": [
        4,
        8
      ]
    },
    {
      "name": "Realme C67",
      "slug": "c67",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Realme C65",
      "slug": "c65",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Realme C53",
      "slug": "c53",
      "year": 2023,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "Realme Note 50",
      "slug": "note-50",
      "year": 2024,
      "storage": [
        64,
        128
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Realme Narzo 70 5G",
      "slug": "narzo-70-5g",
      "year": 2024,
      "storage": [
        128
      ],
      "ram": [
        6,
        8
      ]
    }
  ],
  "oneplus": [
    {
      "name": "OnePlus 12",
      "slug": "12",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "OnePlus 12R",
      "slug": "12r",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        16
      ]
    },
    {
      "name": "OnePlus 11 5G",
      "slug": "11-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        16
      ]
    },
    {
      "name": "OnePlus Open",
      "slug": "open",
      "year": 2023,
      "storage": [
        512
      ],
      "ram": [
        16
      ]
    },
    {
      "name": "OnePlus 10 Pro 5G",
      "slug": "10-pro-5g",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "OnePlus 9 Pro 5G",
      "slug": "9-pro-5g",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "OnePlus 8 Pro",
      "slug": "8-pro",
      "year": 2020,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "OnePlus Nord 4",
      "slug": "nord-4",
      "year": 2024,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12,
        16
      ]
    },
    {
      "name": "OnePlus Nord CE4",
      "slug": "nord-ce4",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "OnePlus Nord 3 5G",
      "slug": "nord-3-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        16
      ]
    }
  ],
  "motorola": [
    {
      "name": "Razr 50 Ultra",
      "slug": "razr-50-ultra",
      "year": 2024,
      "storage": [
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Razr 50",
      "slug": "razr-50",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Edge 50 Ultra",
      "slug": "edge-50-ultra",
      "year": 2024,
      "storage": [
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Edge 50 Pro",
      "slug": "edge-50-pro",
      "year": 2024,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Edge 50 Fusion",
      "slug": "edge-50-fusion",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Moto G85 5G",
      "slug": "moto-g85-5g",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Moto G84 5G",
      "slug": "moto-g84-5g",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Moto G54 5G",
      "slug": "moto-g54-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Moto G24 Power",
      "slug": "moto-g24-power",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        8
      ]
    },
    {
      "name": "Moto G04s",
      "slug": "moto-g04s",
      "year": 2024,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        8
      ]
    }
  ],
  "huawei": [
    {
      "name": "Mate 20 Pro",
      "slug": "mate-20-pro",
      "year": 2018,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Mate 20 Lite",
      "slug": "mate-20-lite",
      "year": 2018,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Mate 10 Pro",
      "slug": "mate-10-pro",
      "year": 2017,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "Mate 10 Lite",
      "slug": "mate-10-lite",
      "year": 2017,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "P30 Pro",
      "slug": "p30-pro",
      "year": 2019,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "P30 Lite",
      "slug": "p30-lite",
      "year": 2019,
      "storage": [
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "P20 Pro",
      "slug": "p20-pro",
      "year": 2018,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "P20 Lite",
      "slug": "p20-lite",
      "year": 2018,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Nova 5T",
      "slug": "nova-5t",
      "year": 2019,
      "storage": [
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Nova 3i",
      "slug": "nova-3i",
      "year": 2018,
      "storage": [
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Y9 Prime 2019",
      "slug": "y9-prime-2019",
      "year": 2019,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Y7 Prime 2019",
      "slug": "y7-prime-2019",
      "year": 2019,
      "storage": [
        32,
        64
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Y6 Prime 2018",
      "slug": "y6-prime-2018",
      "year": 2018,
      "storage": [
        16,
        32
      ],
      "ram": [
        2,
        3
      ]
    }
  ],
  "honor": [
    {
      "name": "Magic6 Pro",
      "slug": "magic6-pro",
      "year": 2024,
      "storage": [
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Magic V3",
      "slug": "magic-v3",
      "year": 2024,
      "storage": [
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Honor 200 Pro",
      "slug": "200-pro",
      "year": 2024,
      "storage": [
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Honor 200",
      "slug": "200",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Honor 200 Lite",
      "slug": "200-lite",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Honor 90",
      "slug": "90",
      "year": 2023,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12,
        16
      ]
    },
    {
      "name": "Honor X9b 5G",
      "slug": "x9b-5g",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Honor X8b",
      "slug": "x8b",
      "year": 2023,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Honor X7b",
      "slug": "x7b",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Honor X6b",
      "slug": "x6b",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "nokia": [
    {
      "name": "Nokia G42 5G",
      "slug": "g42-5g",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Nokia G22",
      "slug": "g22",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Nokia G21",
      "slug": "g21",
      "year": 2022,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Nokia C32",
      "slug": "c32",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Nokia C22",
      "slug": "c22",
      "year": 2023,
      "storage": [
        64
      ],
      "ram": [
        2,
        3
      ]
    },
    {
      "name": "Nokia C12 Pro",
      "slug": "c12-pro",
      "year": 2023,
      "storage": [
        64
      ],
      "ram": [
        2,
        3
      ]
    },
    {
      "name": "Nokia X30 5G",
      "slug": "x30-5g",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Nokia 8.3 5G",
      "slug": "8-3-5g",
      "year": 2020,
      "storage": [
        64,
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Nokia 7.2",
      "slug": "7-2",
      "year": 2019,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Nokia 6",
      "slug": "6",
      "year": 2017,
      "storage": [
        32,
        64
      ],
      "ram": [
        3,
        4
      ]
    }
  ],
  "hmd": [
    {
      "name": "HMD Skyline",
      "slug": "skyline",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "HMD Crest Max",
      "slug": "crest-max",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "HMD Crest",
      "slug": "crest",
      "year": 2024,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "HMD Pulse Pro",
      "slug": "pulse-pro",
      "year": 2024,
      "storage": [
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "HMD Pulse",
      "slug": "pulse",
      "year": 2024,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    }
  ],
  "itel": [
    {
      "name": "Itel S24",
      "slug": "s24",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        8
      ]
    },
    {
      "name": "Itel S23+",
      "slug": "s23-plus",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Itel S23",
      "slug": "s23",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        8
      ]
    },
    {
      "name": "Itel P65",
      "slug": "p65",
      "year": 2024,
      "storage": [
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Itel P55 5G",
      "slug": "p55-5g",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Itel P55",
      "slug": "p55",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        8
      ]
    },
    {
      "name": "Itel P40",
      "slug": "p40",
      "year": 2023,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Itel A70",
      "slug": "a70",
      "year": 2023,
      "storage": [
        64,
        128,
        256
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Itel A60s",
      "slug": "a60s",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Itel A50",
      "slug": "a50",
      "year": 2024,
      "storage": [
        64,
        128
      ],
      "ram": [
        2,
        3,
        4
      ]
    },
    {
      "name": "Itel A05s",
      "slug": "a05s",
      "year": 2023,
      "storage": [
        32,
        64
      ],
      "ram": [
        2,
        4
      ]
    },
    {
      "name": "Itel Vision 3",
      "slug": "vision-3",
      "year": 2022,
      "storage": [
        32,
        64
      ],
      "ram": [
        2,
        3
      ]
    }
  ],
  "nothing": [
    {
      "name": "Phone (1)",
      "slug": "phone-1",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Phone (2)",
      "slug": "phone-2",
      "year": 2023,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Phone (2a)",
      "slug": "phone-2a",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Phone (2a) Plus",
      "slug": "phone-2a-plus",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "CMF Phone 1",
      "slug": "cmf-phone-1",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    }
  ],
  "qmobile": [
    {
      "name": "Noir A6",
      "slug": "noir-a6",
      "year": 2016,
      "storage": [
        32
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Noir A3",
      "slug": "noir-a3",
      "year": 2016,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Noir S9",
      "slug": "noir-s9",
      "year": 2016,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Z14",
      "slug": "z14",
      "year": 2016,
      "storage": [
        32
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Z12 Pro",
      "slug": "z12-pro",
      "year": 2016,
      "storage": [
        32
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Z12",
      "slug": "z12",
      "year": 2016,
      "storage": [
        32
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Z10",
      "slug": "z10",
      "year": 2015,
      "storage": [
        16
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Z9 Plus",
      "slug": "z9-plus",
      "year": 2015,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Q Infinity Prime",
      "slug": "q-infinity-prime",
      "year": 2018,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Q Infinity Cinema",
      "slug": "q-infinity-cinema",
      "year": 2018,
      "storage": [
        32
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Q Infinity",
      "slug": "q-infinity",
      "year": 2018,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Evok Power",
      "slug": "evok-power",
      "year": 2017,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Energy X2",
      "slug": "energy-x2",
      "year": 2017,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "CS1 Plus",
      "slug": "cs1-plus",
      "year": 2017,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "CS1",
      "slug": "cs1",
      "year": 2017,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "S6 Plus",
      "slug": "s6-plus",
      "year": 2016,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "J7 Pro",
      "slug": "j7-pro",
      "year": 2017,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "J7",
      "slug": "j7",
      "year": 2016,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "i6 Metal 2018",
      "slug": "i6-metal-2018",
      "year": 2018,
      "storage": [
        8
      ],
      "ram": [
        1
      ]
    },
    {
      "name": "LT700 Pro",
      "slug": "lt700-pro",
      "year": 2016,
      "storage": [
        16
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "LT600 Pro",
      "slug": "lt600-pro",
      "year": 2016,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    }
  ],
  "sony": [
    {
      "name": "Xperia 1 VI",
      "slug": "xperia-1-vi",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Xperia 1 V",
      "slug": "xperia-1-v",
      "year": 2023,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Xperia 1 IV",
      "slug": "xperia-1-iv",
      "year": 2022,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Xperia 1 III",
      "slug": "xperia-1-iii",
      "year": 2021,
      "storage": [
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Xperia 1 II",
      "slug": "xperia-1-ii",
      "year": 2020,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Xperia 1",
      "slug": "xperia-1",
      "year": 2019,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "Xperia 5 V",
      "slug": "xperia-5-v",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Xperia 5 IV",
      "slug": "xperia-5-iv",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Xperia 10 VI",
      "slug": "xperia-10-vi",
      "year": 2024,
      "storage": [
        128
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Xperia 10 V",
      "slug": "xperia-10-v",
      "year": 2023,
      "storage": [
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Xperia PRO-I",
      "slug": "xperia-pro-i",
      "year": 2021,
      "storage": [
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Xperia XZ3",
      "slug": "xperia-xz3",
      "year": 2018,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Xperia XZ Premium",
      "slug": "xperia-xz-premium",
      "year": 2017,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    }
  ],
  "lg": [
    {
      "name": "LG Wing",
      "slug": "wing",
      "year": 2020,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "LG Velvet",
      "slug": "velvet",
      "year": 2020,
      "storage": [
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "LG V60 ThinQ",
      "slug": "v60-thinq",
      "year": 2020,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "LG V50 ThinQ",
      "slug": "v50-thinq",
      "year": 2019,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "LG V40 ThinQ",
      "slug": "v40-thinq",
      "year": 2018,
      "storage": [
        64,
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "LG V30",
      "slug": "v30",
      "year": 2017,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "LG V20",
      "slug": "v20",
      "year": 2016,
      "storage": [
        32,
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "LG G8X ThinQ",
      "slug": "g8x-thinq",
      "year": 2019,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "LG G7 ThinQ",
      "slug": "lg-g7-thinq",
      "year": 2018,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "LG G6",
      "slug": "lg-g6",
      "year": 2017,
      "storage": [
        32,
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "LG G5",
      "slug": "lg-g5",
      "year": 2016,
      "storage": [
        32
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "LG Stylo 6",
      "slug": "stylo-6",
      "year": 2020,
      "storage": [
        64
      ],
      "ram": [
        3
      ]
    }
  ],
  "asus": [
    {
      "name": "ROG Phone 8 Series",
      "slug": "rog-phone-8-series",
      "year": 2024,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12,
        16,
        24
      ]
    },
    {
      "name": "ROG Phone 7 Series",
      "slug": "rog-phone-7-series",
      "year": 2023,
      "storage": [
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "ROG Phone 6 Series",
      "slug": "rog-phone-6-series",
      "year": 2022,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12,
        16
      ]
    },
    {
      "name": "ROG Phone 5 Series",
      "slug": "rog-phone-5-series",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12,
        16
      ]
    },
    {
      "name": "ROG Phone 3",
      "slug": "rog-phone-3",
      "year": 2020,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12,
        16
      ]
    },
    {
      "name": "Zenfone 11 Ultra",
      "slug": "zenfone-11-ultra",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Zenfone 10",
      "slug": "zenfone-10",
      "year": 2023,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        16
      ]
    },
    {
      "name": "Zenfone 9",
      "slug": "zenfone-9",
      "year": 2022,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        16
      ]
    },
    {
      "name": "Zenfone 8",
      "slug": "zenfone-8",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8,
        16
      ]
    },
    {
      "name": "ZenFone Max Pro M1",
      "slug": "zenfone-max-pro-m1",
      "year": 2018,
      "storage": [
        32,
        64
      ],
      "ram": [
        3,
        4,
        6
      ]
    }
  ],
  "lenovo": [
    {
      "name": "Legion Y70",
      "slug": "legion-y70",
      "year": 2022,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        8,
        12,
        16
      ]
    },
    {
      "name": "K14 Note",
      "slug": "k14-note",
      "year": 2022,
      "storage": [
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "K13 Note",
      "slug": "k13-note",
      "year": 2021,
      "storage": [
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "K12 Pro",
      "slug": "k12-pro",
      "year": 2020,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "K10 Note",
      "slug": "k10-note",
      "year": 2019,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "K8 Note",
      "slug": "k8-note",
      "year": 2017,
      "storage": [
        32,
        64
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "K6 Note",
      "slug": "k6-note",
      "year": 2016,
      "storage": [
        32
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "K5 Note",
      "slug": "k5-note",
      "year": 2016,
      "storage": [
        16,
        32
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "K3 Note",
      "slug": "k3-note",
      "year": 2015,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Vibe Shot",
      "slug": "vibe-shot",
      "year": 2015,
      "storage": [
        32
      ],
      "ram": [
        3
      ]
    }
  ],
  "zte": [
    {
      "name": "Nubia Z70 Ultra",
      "slug": "nubia-z70-ultra",
      "year": 2024,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Nubia Z60 Ultra",
      "slug": "nubia-z60-ultra",
      "year": 2023,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Nubia Z50S Pro",
      "slug": "nubia-z50s-pro",
      "year": 2023,
      "storage": [
        256,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Redmagic 9 Pro",
      "slug": "redmagic-9-pro",
      "year": 2023,
      "storage": [
        256,
        512
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Nubia Flip 5G",
      "slug": "nubia-flip-5g",
      "year": 2024,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Nubia Focus 5G",
      "slug": "nubia-focus-5g",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "Nubia Neo 2 5G",
      "slug": "nubia-neo-2-5g",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Blade V50 Design",
      "slug": "blade-v50-design",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Blade A72",
      "slug": "blade-a72",
      "year": 2022,
      "storage": [
        64,
        128
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Blade A53",
      "slug": "blade-a53",
      "year": 2023,
      "storage": [
        32,
        64
      ],
      "ram": [
        2
      ]
    }
  ],
  "htc": [
    {
      "name": "U23 Pro",
      "slug": "u23-pro",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "U23",
      "slug": "u23",
      "year": 2023,
      "storage": [
        128
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Desire 22 5G",
      "slug": "desire-22-5g",
      "year": 2022,
      "storage": [
        128
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "U20 5G",
      "slug": "u20-5g",
      "year": 2020,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Desire 20 Pro",
      "slug": "desire-20-pro",
      "year": 2020,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "U12 +",
      "slug": "u12",
      "year": 2018,
      "storage": [
        64,
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "U11",
      "slug": "u11",
      "year": 2017,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "U Ultra",
      "slug": "u-ultra",
      "year": 2017,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "HTC 10",
      "slug": "10",
      "year": 2016,
      "storage": [
        32,
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "One M9",
      "slug": "one-m9",
      "year": 2015,
      "storage": [
        32
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "One (M8)",
      "slug": "one-m8",
      "year": 2014,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "One",
      "slug": "one",
      "year": 2013,
      "storage": [
        32,
        64
      ],
      "ram": [
        2
      ]
    }
  ],
  "tcl": [
    {
      "name": "TCL 50 XL Nxtpaper 5G",
      "slug": "50-xl-nxtpaper-5g",
      "year": 2024,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "TCL 50 SE",
      "slug": "50-se",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "TCL 40 XE 5G",
      "slug": "40-xe-5g",
      "year": 2023,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "TCL 40 SE",
      "slug": "40-se",
      "year": 2023,
      "storage": [
        128,
        256
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "TCL 30 SE",
      "slug": "30-se",
      "year": 2022,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "TCL 20 SE",
      "slug": "20-se",
      "year": 2021,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "TCL 10 5G",
      "slug": "10-5g",
      "year": 2020,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "TCL 10 SE",
      "slug": "10-se",
      "year": 2020,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    }
  ],
  "alcatel": [
    {
      "name": "Alcatel 1S",
      "slug": "1s",
      "year": 2021,
      "storage": [
        32,
        64
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Alcatel 1SE",
      "slug": "1se",
      "year": 2020,
      "storage": [
        32,
        64
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Alcatel 1V",
      "slug": "1v",
      "year": 2020,
      "storage": [
        32
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Alcatel 1B",
      "slug": "1b",
      "year": 2022,
      "storage": [
        32
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Alcatel 3X",
      "slug": "3x",
      "year": 2020,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "Alcatel 3L",
      "slug": "3l",
      "year": 2021,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    }
  ],
  "blackberry": [
    {
      "name": "KEY2",
      "slug": "key2",
      "year": 2018,
      "storage": [
        64,
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "KEY2 LE",
      "slug": "key2-le",
      "year": 2018,
      "storage": [
        32,
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Keyone",
      "slug": "keyone",
      "year": 2017,
      "storage": [
        32,
        64
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Motion",
      "slug": "motion",
      "year": 2017,
      "storage": [
        32
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Priv By BlackBerry",
      "slug": "priv-by-blackberry",
      "year": 2015,
      "storage": [
        32
      ],
      "ram": [
        3
      ]
    }
  ],
  "meizu": [
    {
      "name": "Meizu 21 Pro",
      "slug": "21-pro",
      "year": 2024,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        12,
        16
      ]
    },
    {
      "name": "Meizu 21",
      "slug": "21",
      "year": 2023,
      "storage": [
        256,
        512
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Meizu 20 Pro",
      "slug": "20-pro",
      "year": 2023,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Meizu 20",
      "slug": "20",
      "year": 2023,
      "storage": [
        128,
        256,
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Meizu 18s Pro",
      "slug": "18s-pro",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Meizu 18",
      "slug": "18",
      "year": 2021,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    },
    {
      "name": "Meizu 17 Pro",
      "slug": "17-pro",
      "year": 2020,
      "storage": [
        128,
        256
      ],
      "ram": [
        8,
        12
      ]
    }
  ],
  "gionee": [
    {
      "name": "Gionee M15",
      "slug": "m15",
      "year": 2021,
      "storage": [
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Gionee Max Pro",
      "slug": "max-pro",
      "year": 2021,
      "storage": [
        32
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Gionee Max",
      "slug": "max",
      "year": 2020,
      "storage": [
        32
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Gionee M7 Power",
      "slug": "m7-power",
      "year": 2017,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Gionee A1",
      "slug": "a1",
      "year": 2017,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    }
  ],
  "philips": [
    {
      "name": "Philips S561",
      "slug": "s561",
      "year": 2020,
      "storage": [
        32
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Philips S397",
      "slug": "s397",
      "year": 2019,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Philips Xenium S566",
      "slug": "xenium-s566",
      "year": 2020,
      "storage": [
        32,
        64
      ],
      "ram": [
        3
      ]
    }
  ],
  "sparx": [
    {
      "name": "Sparx Edge 20 Pro",
      "slug": "sparx-edge-20-pro",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Sparx Note 20",
      "slug": "sparx-note-20",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Sparx Neo 7 Ultra",
      "slug": "sparx-neo-7-ultra",
      "year": 2023,
      "storage": [
        128
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Sparx Neo 7 Plus",
      "slug": "sparx-neo-7-plus",
      "year": 2023,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    }
  ],
  "dcode": [
    {
      "name": "Dcode Bold 3 Pro",
      "slug": "dcode-bold-3-pro",
      "year": 2024,
      "storage": [
        128,
        256
      ],
      "ram": [
        6,
        8
      ]
    },
    {
      "name": "Dcode Cygnal 3 Pro",
      "slug": "dcode-cygnal-3-pro",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Dcode Bold 2",
      "slug": "dcode-bold-2",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    }
  ],
  "vgo-tel": [
    {
      "name": "VGOTEL Venture V12",
      "slug": "vgotel-venture-v12",
      "year": 2024,
      "storage": [
        64,
        128
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "VGOTEL New 24",
      "slug": "vgotel-new-24",
      "year": 2023,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    }
  ]
};

const BRAND_HEX_CODES: Record<string, string> = {
  apple: '01',
  samsung: '02',
  xiaomi: '03',
  redmi: '04',
  poco: '05',
  infinix: '06',
  tecno: '07',
  oppo: '08',
  vivo: '09',
  realme: '0a',
  huawei: '0b',
  honor: '0c',
  google: '0d',
  oneplus: '0e',
  motorola: '0f',
  nokia: '10',
  hmd: '11',
  itel: '12',
  nothing: '13',
  qmobile: '14',
  rivo: '15',
  sony: '16',
  lg: '17',
  asus: '18',
  lenovo: '19',
  zte: '1a',
  meizu: '1b',
  microsoft: '1c',
  htc: '1d',
  tcl: '1e',
  alcatel: '1f',
  blackberry: '20',
  gionee: '21',
  philips: '22',
  'jazz-digit': '23',
  sparx: '24',
  dcode: '25',
  'vgo-tel': '26',
};

// Exact Supabase Database UUIDs for the 54 initial models
export const KNOWN_DB_MODELS: Record<string, string> = {
  // Apple (89ef2b03-0aea-4b7c-ae2a-1301cf370dd7)
  'iphone-16-pro-max': 'd80fcc51-82a4-42ed-93f7-23592b963cea',
  'iphone-16-pro': 'aa65bf21-d78b-49e9-8e47-c41c2c20ce54',
  'iphone-16': 'eff9ef1d-03ab-4d0d-8d7f-d975467ccd11',
  'iphone-15-pro-max': '1bdf8815-3024-4e7b-b022-1a62e2a924ce',
  'iphone-15-pro': 'dde09ecf-139f-461d-bf63-d60688a8299a',
  'iphone-15': 'e1bdf0b6-427e-48da-b6b7-3b92dccaf6de',
  'iphone-14-pro-max': '4cc441ca-cb9a-4145-930b-c44003c4b746',
  'iphone-14-pro': 'f5aca1e7-450a-4211-82cf-e89ba97b64dc',
  'iphone-14': 'c6096eb2-9366-4910-818b-c0a3bd2ba6cb',
  'iphone-13-pro-max': '49a61894-d270-49c2-bd94-4fbc135a3051',
  'iphone-13': '21014574-2b89-4a06-a32b-452cbe05b39d',
  'iphone-12': 'f7db0a48-c3dc-4467-8288-c6b52bbe9c3d',
  'iphone-11': '43dd552c-301c-4681-876f-cde6c0ae263f',

  // Samsung (2abb2ec7-c3ae-4a0f-9cb7-0f08f790829f)
  'galaxy-s24-ultra': '891f25b4-8cd8-47df-a524-c32d840bec1a',
  'galaxy-s24-plus': 'c876be6a-e401-415f-8b29-a6d11c7e13b0',
  'galaxy-s24': '1f5686b3-d195-4689-9c8b-c34c82f8630a',
  'galaxy-s23-ultra': 'f1100fcc-c15f-44cb-9559-4a9bb103d100',
  'galaxy-s23-fe': '6e02dd1e-77ff-4d75-bced-b4f60f02a621',
  'galaxy-s22-ultra': '8fedb391-30a0-4623-9588-83c1cea7f6da',
  'galaxy-a55-5g': '08c3867f-fdfc-48b8-88b5-c7d19b0fc719',
  'galaxy-a54-5g': '6c68f9a9-2145-4f18-b525-c28a5b78c156',
  'galaxy-a35-5g': '55c76e12-6d4f-4c14-872a-823231d7dd9a',
  'galaxy-a15': '54f26579-7b4a-4ff1-b55b-3f7616c4c1ca',
  'galaxy-z-fold-6': '6df9b4f3-b5cd-48a8-a8fd-d2b5845e77a7',
  'galaxy-z-flip-6': 'c6b4886b-398c-4e66-8d67-3b448ac4ddb3',

  // Xiaomi & Redmi (8a84f385-71b3-4cf6-84a8-8c7615394ef4)
  'xiaomi-14-ultra': 'bcddbcad-9bcc-4f40-ab86-3c302aca0599',
  'xiaomi-14': '67e9cb20-2219-49b3-9178-10a6ed4fd010',
  'xiaomi-13t-pro': 'dd80d12f-dd17-4129-a7d5-b3997a787a06',
  'redmi-note-13-pro-plus': '3c3e0b6f-8173-4cb2-9434-a156e2b45176',
  'redmi-note-13-pro': 'cfebca88-1bb8-4653-abd3-431d15abe54a',
  'redmi-note-13': '09df5541-e158-4ce7-a24e-17fbd110d32d',
  'redmi-13c': 'd8e9d3bb-d8a6-4379-b87a-b6b759c509c7',

  // Infinix (84611d19-7c00-43bc-93b6-5f3a43f45802)
  'zero-30-5g': '089eba67-88f0-46e7-a2c7-2f4a6b429f90',
  'note-40-pro': '24bb62b5-4ce4-4b78-a398-9753fbad2a56',
  'note-40': '10882c41-86fd-4355-8a1e-b65f985265b4',
  'note-30-pro': '2774aa36-381e-4f8e-90d7-f662599f8b79',
  'hot-40-pro': 'c7967467-1723-4f4e-aee9-6c9109898188',
  'hot-30': '44754563-253e-4fa6-a813-1f641be94a12',
  'smart-8': '751bea11-9f7b-422d-8d66-9ebc727e99d5',

  // Tecno (299b7d5f-b004-4107-b12e-94e7229dad1a)
  'camon-30-premier': '075f2f05-5d80-4b9b-8b1e-3ae26e415879',
  'camon-30-pro-5g': '137d5a3d-47df-456d-9b2f-2192580ef2a7',
  'camon-30': '7714099f-052e-4105-b694-32175430bc77',
  'spark-20-pro-plus': '80916793-e049-4389-a301-34ff85657646',
  'spark-20': '6652b41a-94b3-40cc-9b1d-009b15cb2a60',
  'pova-6-pro-5g': '9dae2e4d-a94f-4b37-ba7c-326621b89de7',

  // Google Pixel (d4a8a33a-b8a8-4d17-b207-8613b906e132)
  'pixel-9-pro-xl': '69322d56-2e03-449d-b39d-beb6799ffa0c',
  'pixel-9-pro': '65da67d3-8bf5-4aee-9716-ae2b5fb7ef0a',
  'pixel-9': 'f00b17a8-e13a-45a6-bc46-9655f86c3552',
  'pixel-8-pro': '81a40f2e-2822-4699-9db4-d2f966b530e9',
  'pixel-8': '3decdc95-ddd3-4474-aad3-60350a024a6c',
  'pixel-7-pro': '2765656c-a9fd-4969-a900-e6da54703440',
  'pixel-7': '095853bd-7673-40f8-bfe8-00e1408f72b2',
  'pixel-6-pro': 'c89e7a93-d658-4dd2-8910-e8c60c42e182',
  'pixel-6': 'f5a600ee-7279-4f62-a8e5-4769f8212cf0',
};

/**
 * Standard deterministic RFC 4122 v4 UUID helper for catalog models
 */
function makeCatalogModelId(brandKey: string, modelIndex: number): string {
  const code = BRAND_HEX_CODES[brandKey] || '99';
  const indexHex = modelIndex.toString(16).padStart(12, '0');
  return `a10100${code}-0000-4000-8000-${indexHex}`;
}

/**
 * Get all models for a brand (by brand slug or brand name or brand ID)
 */
export function getCatalogModelsForBrand(
  brandIdentifier: string,
  actualBrandId?: string
): ModelOption[] {
  if (!brandIdentifier) return [];

  const clean = brandIdentifier.toLowerCase().trim();
  let key = clean;

  if (clean.includes('pixel') || clean === 'google') key = 'google';
  else if (clean.includes('apple') || clean.includes('iphone')) key = 'apple';
  else if (clean.includes('samsung')) key = 'samsung';
  else if (clean === 'redmi') key = 'redmi';
  else if (clean === 'poco') key = 'poco';
  else if (clean.includes('xiaomi')) key = 'xiaomi';
  else if (clean.includes('oneplus')) key = 'oneplus';
  else if (clean.includes('vivo')) key = 'vivo';
  else if (clean.includes('oppo')) key = 'oppo';
  else if (clean.includes('realme')) key = 'realme';
  else if (clean.includes('infinix')) key = 'infinix';
  else if (clean.includes('tecno')) key = 'tecno';
  else if (clean.includes('motorola') || clean === 'moto') key = 'motorola';
  else if (clean.includes('honor')) key = 'honor';
  else if (clean.includes('huawei')) key = 'huawei';
  else if (clean.includes('nothing')) key = 'nothing';
  else if (clean.includes('itel')) key = 'itel';
  else if (clean.includes('nokia')) key = 'nokia';
  else if (clean === 'hmd') key = 'hmd';
  else if (clean.includes('qmobile') || clean === 'q-mobile') key = 'qmobile';
  else if (clean.includes('sony')) key = 'sony';
  else if (clean === 'lg') key = 'lg';
  else if (clean.includes('asus')) key = 'asus';
  else if (clean.includes('lenovo')) key = 'lenovo';
  else if (clean.includes('zte')) key = 'zte';
  else if (clean.includes('meizu')) key = 'meizu';
  else if (clean.includes('htc')) key = 'htc';
  else if (clean.includes('tcl')) key = 'tcl';
  else if (clean.includes('alcatel')) key = 'alcatel';
  else if (clean.includes('blackberry')) key = 'blackberry';
  else if (clean.includes('gionee')) key = 'gionee';
  else if (clean.includes('philips')) key = 'philips';
  else if (clean.includes('sparx')) key = 'sparx';
  else if (clean.includes('dcode')) key = 'dcode';
  else if (clean.includes('vgotel') || clean.includes('vgo tel')) key = 'vgo-tel';

  const modelsList = CATALOG_MODELS[key] || [];
  const resolvedBrandId = actualBrandId || 'b1010000-0000-4000-8000-000000000001';

  return modelsList.map((m, idx) => ({
    id: KNOWN_DB_MODELS[m.slug] || makeCatalogModelId(key, idx + 1),
    brand_id: resolvedBrandId,
    name: m.name,
    slug: m.slug,
    release_year: m.year,
    storage_options: m.storage,
    ram_options: m.ram || null,
  }));
}
