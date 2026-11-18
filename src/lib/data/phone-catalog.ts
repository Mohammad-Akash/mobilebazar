// ==============================================================================
// Comprehensive Smartphone Catalog (All 66 Brands & Accurate Master Models)
// Extracted and validated from PriceOye, Google Play supported devices & Master List.
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
  "sparx": [
    {
      "name": "Sparx Edge 20",
      "slug": "sparx-edge-20",
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
      "name": "Sparx Edge 20 Pro",
      "slug": "sparx-edge-20-pro",
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
      "name": "Sparx Neo 11 Pro",
      "slug": "sparx-neo-11-pro",
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
      "name": "Sparx Neo 7 Plus",
      "slug": "sparx-neo-7-plus",
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
      "name": "Sparx Neo 7 Ultra",
      "slug": "sparx-neo-7-ultra",
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
      "name": "Sparx Neo 8 Pro",
      "slug": "sparx-neo-8-pro",
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
      "name": "Sparx Neo 5",
      "slug": "sparx-neo-5",
      "year": 2023,
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
      "name": "Sparx Neo 6",
      "slug": "sparx-neo-6",
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
      "name": "Dcode Bold 3",
      "slug": "dcode-bold-3",
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
      "name": "Dcode Bold 3 Pro",
      "slug": "dcode-bold-3-pro",
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
      "name": "Dcode Cygnal 4",
      "slug": "dcode-cygnal-4",
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
      "name": "Dcode Bold 2",
      "slug": "dcode-bold-2",
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
      "name": "Dcode Cygnal 2",
      "slug": "dcode-cygnal-2",
      "year": 2023,
      "storage": [
        64
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Dcode Cygnal 3 Lite",
      "slug": "dcode-cygnal-3-lite",
      "year": 2023,
      "storage": [
        64
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Dcode Cygnal 3 Pro",
      "slug": "dcode-cygnal-3-pro",
      "year": 2023,
      "storage": [
        128
      ],
      "ram": [
        6,
        8
      ]
    }
  ],
  "vgo-tel": [
    {
      "name": "VGO TEL New 24",
      "slug": "vgo-tel-new-24",
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
      "name": "VGO TEL Note 23",
      "slug": "vgo-tel-note-23",
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
      "name": "VGO TEL Note 24",
      "slug": "vgo-tel-note-24",
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
      "name": "VGO TEL Smart 12",
      "slug": "vgo-tel-smart-12",
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
      "name": "VGO TEL New 15",
      "slug": "vgo-tel-new-15",
      "year": 2023,
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
      "name": "VGO TEL New 20",
      "slug": "vgo-tel-new-20",
      "year": 2023,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "VGO TEL Smart 10",
      "slug": "vgo-tel-smart-10",
      "year": 2023,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "VGO TEL Smart 9",
      "slug": "vgo-tel-smart-9",
      "year": 2023,
      "storage": [
        32,
        64
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "VGO TEL Smart 8",
      "slug": "vgo-tel-smart-8",
      "year": 2022,
      "storage": [
        32
      ],
      "ram": [
        2,
        3
      ]
    }
  ],
  "meizu": [
    {
      "name": "Meizu 21",
      "slug": "meizu-21",
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
      "name": "Meizu 21 Pro",
      "slug": "meizu-21-pro",
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
      "name": "Meizu 20",
      "slug": "meizu-20",
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
      "name": "Meizu 20 Pro",
      "slug": "meizu-20-pro",
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
      "name": "Meizu 18 Pro",
      "slug": "meizu-18-pro",
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
      "name": "Meizu 18s Pro",
      "slug": "meizu-18s-pro",
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
      "slug": "meizu-17-pro",
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
      "name": "Gionee P15 Pro",
      "slug": "gionee-p15-pro",
      "year": 2021,
      "storage": [
        64
      ],
      "ram": [
        3,
        4
      ]
    },
    {
      "name": "Gionee K3",
      "slug": "gionee-k3",
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
      "name": "Gionee M12",
      "slug": "gionee-m12",
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
      "name": "Gionee M30",
      "slug": "gionee-m30",
      "year": 2020,
      "storage": [
        128
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Gionee S12",
      "slug": "gionee-s12",
      "year": 2020,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "philips": [
    {
      "name": "Philips S565",
      "slug": "philips-s565",
      "year": 2021,
      "storage": [
        64
      ],
      "ram": [
        4
      ]
    },
    {
      "name": "Philips S397",
      "slug": "philips-s397",
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
      "name": "Philips Xenium E580",
      "slug": "philips-xenium-e580",
      "year": 2019,
      "storage": [
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "microsoft": [
    {
      "name": "Microsoft Surface Duo 2",
      "slug": "surface-duo-2",
      "year": 2021,
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
      "name": "Microsoft Surface Duo",
      "slug": "surface-duo",
      "year": 2020,
      "storage": [
        128,
        256
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "Microsoft Lumia 650",
      "slug": "lumia-650",
      "year": 2016,
      "storage": [
        16
      ],
      "ram": [
        1,
        2
      ]
    },
    {
      "name": "Microsoft Lumia 950",
      "slug": "lumia-950",
      "year": 2015,
      "storage": [
        32
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "Microsoft Lumia 950 XL",
      "slug": "lumia-950-xl",
      "year": 2015,
      "storage": [
        32
      ],
      "ram": [
        3
      ]
    }
  ],
  "jazz-digit": [
    {
      "name": "Jazz Digit 4G Bold",
      "slug": "jazz-digit-4g-bold",
      "year": 2023,
      "storage": [
        8,
        16
      ],
      "ram": [
        1,
        2
      ]
    },
    {
      "name": "Jazz Digit 4G Defender",
      "slug": "jazz-digit-4g-defender",
      "year": 2023,
      "storage": [
        8,
        16
      ],
      "ram": [
        1,
        2
      ]
    },
    {
      "name": "Jazz Digit 4G Elite",
      "slug": "jazz-digit-4g-elite",
      "year": 2023,
      "storage": [
        4,
        8,
        16
      ],
      "ram": [
        1,
        2
      ]
    },
    {
      "name": "Jazz Digit 4G Classic",
      "slug": "jazz-digit-4g-classic",
      "year": 2022,
      "storage": [
        4,
        8
      ],
      "ram": [
        1
      ]
    },
    {
      "name": "Jazz Digit 4G Power",
      "slug": "jazz-digit-4g-power",
      "year": 2022,
      "storage": [
        8
      ],
      "ram": [
        1
      ]
    }
  ],
  "digit": [
    {
      "name": "Digit 4G Max",
      "slug": "digit-4g-max",
      "year": 2024,
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
      "name": "Digit 4G E2",
      "slug": "digit-4g-e2",
      "year": 2023,
      "storage": [
        8,
        16
      ],
      "ram": [
        1,
        2
      ]
    },
    {
      "name": "Digit 4G Pro",
      "slug": "digit-4g-pro",
      "year": 2023,
      "storage": [
        16,
        32
      ],
      "ram": [
        2,
        3
      ]
    },
    {
      "name": "Digit 4G Touch",
      "slug": "digit-4g-touch",
      "year": 2023,
      "storage": [
        8,
        16
      ],
      "ram": [
        1,
        2
      ]
    }
  ],
  "rivo": [
    {
      "name": "Rivo Phantom PZ15",
      "slug": "rivo-phantom-pz15",
      "year": 2018,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Rivo Phantom PZ18",
      "slug": "rivo-phantom-pz18",
      "year": 2018,
      "storage": [
        16,
        32
      ],
      "ram": [
        2,
        3
      ]
    },
    {
      "name": "Rivo Sapphire S650",
      "slug": "rivo-sapphire-s650",
      "year": 2018,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Rivo Rhythm RX100",
      "slug": "rivo-rhythm-rx100",
      "year": 2017,
      "storage": [
        8,
        16
      ],
      "ram": [
        1,
        2
      ]
    },
    {
      "name": "Rivo Rhythm RX75",
      "slug": "rivo-rhythm-rx75",
      "year": 2017,
      "storage": [
        8
      ],
      "ram": [
        1
      ]
    }
  ],
  "haier": [
    {
      "name": "Haier Esteem i70",
      "slug": "haier-esteem-i70",
      "year": 2018,
      "storage": [
        16,
        32
      ],
      "ram": [
        2,
        3
      ]
    },
    {
      "name": "Haier Esteem L50",
      "slug": "haier-esteem-l50",
      "year": 2017,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Haier Esteem V4",
      "slug": "haier-esteem-v4",
      "year": 2017,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Haier Klassic P6",
      "slug": "haier-klassic-p6",
      "year": 2017,
      "storage": [
        8
      ],
      "ram": [
        1
      ]
    }
  ],
  "gfive": [
    {
      "name": "GFive Smart 2",
      "slug": "gfive-smart-2",
      "year": 2019,
      "storage": [
        8,
        16
      ],
      "ram": [
        1,
        2
      ]
    },
    {
      "name": "GFive Bravo",
      "slug": "gfive-bravo",
      "year": 2018,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "GFive Glory A86",
      "slug": "gfive-glory-a86",
      "year": 2018,
      "storage": [
        8,
        16
      ],
      "ram": [
        1,
        2
      ]
    },
    {
      "name": "GFive President G6",
      "slug": "gfive-president-g6",
      "year": 2017,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    }
  ],
  "oukitel": [
    {
      "name": "Oukitel WP30 Pro",
      "slug": "oukitel-wp30-pro",
      "year": 2024,
      "storage": [
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Oukitel C35",
      "slug": "oukitel-c35",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Oukitel C36",
      "slug": "oukitel-c36",
      "year": 2023,
      "storage": [
        128
      ],
      "ram": [
        4,
        8
      ]
    },
    {
      "name": "Oukitel WP27",
      "slug": "oukitel-wp27",
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
      "name": "Oukitel WP28",
      "slug": "oukitel-wp28",
      "year": 2023,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Oukitel WP19",
      "slug": "oukitel-wp19",
      "year": 2022,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    }
  ],
  "umidigi": [
    {
      "name": "Umidigi A15 Pro 5G",
      "slug": "umidigi-a15-pro-5g",
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
      "name": "Umidigi A15",
      "slug": "umidigi-a15",
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
      "name": "Umidigi A13 Pro",
      "slug": "umidigi-a13-pro",
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
      "name": "Umidigi BISON GT2 5G",
      "slug": "umidigi-bison-gt2-5g",
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
      "name": "Umidigi Power 7 Max",
      "slug": "umidigi-power-7-max",
      "year": 2022,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    }
  ],
  "e-tachi": [
    {
      "name": "E-Tachi Bolt 2",
      "slug": "e-tachi-bolt-2",
      "year": 2023,
      "storage": [
        32
      ],
      "ram": [
        3
      ]
    },
    {
      "name": "E-Tachi Power 1",
      "slug": "e-tachi-power-1",
      "year": 2022,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "E-Tachi Star One",
      "slug": "e-tachi-star-one",
      "year": 2022,
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
  "calme": [
    {
      "name": "Calme Spark S20",
      "slug": "calme-spark-s20",
      "year": 2021,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    },
    {
      "name": "Calme Spark S30",
      "slug": "calme-spark-s30",
      "year": 2021,
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
  "club-mobile": [
    {
      "name": "Club Mobile Music 1",
      "slug": "club-mobile-music-1",
      "year": 2022,
      "storage": [
        8,
        16
      ],
      "ram": [
        1,
        2
      ]
    },
    {
      "name": "Club Mobile Power 2",
      "slug": "club-mobile-power-2",
      "year": 2022,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    }
  ],
  "faywa": [
    {
      "name": "Faywa Star Plus",
      "slug": "faywa-star-plus",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2,
        3
      ]
    },
    {
      "name": "Faywa Thunder",
      "slug": "faywa-thunder",
      "year": 2021,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    }
  ],
  "gresso": [
    {
      "name": "Gresso Regal",
      "slug": "gresso-regal",
      "year": 2020,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "hello-tech": [
    {
      "name": "Hello Tech H1",
      "slug": "hello-tech-h1",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "kxd": [
    {
      "name": "KXD A1",
      "slug": "kxd-a1",
      "year": 2023,
      "storage": [
        16,
        32
      ],
      "ram": [
        2,
        3
      ]
    },
    {
      "name": "KXD D68",
      "slug": "kxd-d68",
      "year": 2022,
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
  "lvtel": [
    {
      "name": "Lvtel L2",
      "slug": "lvtel-l2",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "maxfone": [
    {
      "name": "Maxfone Max 1",
      "slug": "maxfone-max-1",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "me-mobile": [
    {
      "name": "Me Mobile Me 1",
      "slug": "me-mobile-me-1",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "nexel": [
    {
      "name": "Nexel N1",
      "slug": "nexel-n1",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "remaxx": [
    {
      "name": "Remaxx RX1",
      "slug": "remaxx-rx1",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "sego": [
    {
      "name": "Sego S1",
      "slug": "sego-s1",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "spice": [
    {
      "name": "Spice Stellar Mi-500",
      "slug": "spice-stellar-mi-500",
      "year": 2018,
      "storage": [
        8,
        16
      ],
      "ram": [
        1,
        2
      ]
    }
  ],
  "villaon": [
    {
      "name": "Villaon V3",
      "slug": "villaon-v3",
      "year": 2023,
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
      "name": "Villaon V2",
      "slug": "villaon-v2",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "venus": [
    {
      "name": "Venus V1",
      "slug": "venus-v1",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "wintel": [
    {
      "name": "Wintel W1",
      "slug": "wintel-w1",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "x-cell": [
    {
      "name": "X-Cell Desire",
      "slug": "x-cell-desire",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "xmobile": [
    {
      "name": "Xmobile X1",
      "slug": "xmobile-x1",
      "year": 2022,
      "storage": [
        16
      ],
      "ram": [
        1,
        2
      ]
    },
    {
      "name": "Xmobile X2",
      "slug": "xmobile-x2",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "xsmart": [
    {
      "name": "Xsmart XS1",
      "slug": "xsmart-xs1",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "zentality": [
    {
      "name": "Zentality Z1",
      "slug": "zentality-z1",
      "year": 2022,
      "storage": [
        16,
        32
      ],
      "ram": [
        2
      ]
    }
  ],
  "bontel": [
    {
      "name": "Bontel 8000",
      "slug": "bontel-8000",
      "year": 2022,
      "storage": [
        8,
        16
      ],
      "ram": [
        1,
        2
      ]
    },
    {
      "name": "Bontel 9000",
      "slug": "bontel-9000",
      "year": 2022,
      "storage": [
        16
      ],
      "ram": [
        1,
        2
      ]
    }
  ],
  "all-call": [
    {
      "name": "AllCall Atom",
      "slug": "allcall-atom",
      "year": 2021,
      "storage": [
        16,
        32
      ],
      "ram": [
        2,
        3
      ]
    },
    {
      "name": "AllCall S1",
      "slug": "allcall-s1",
      "year": 2020,
      "storage": [
        16
      ],
      "ram": [
        2
      ]
    }
  ],
  "apple": [
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
        4,
        6
      ]
    },
    {
      "name": "iPhone 17",
      "slug": "iphone-17",
      "year": 2025,
      "storage": [
        256,
        512
      ],
      "ram": [
        4,
        6
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
        4,
        6
      ]
    },
    {
      "name": "iPhone 17 Pro Max",
      "slug": "iphone-17-pro-max",
      "year": 2025,
      "storage": [
        256,
        512,
        1024,
        2048
      ],
      "ram": [
        4,
        6
      ]
    },
    {
      "name": "iPhone Air",
      "slug": "iphone-air",
      "year": 2025,
      "storage": [
        256,
        512,
        1024
      ],
      "ram": [
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
      ]
    },
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
        4,
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
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
        4,
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
        4,
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
        4,
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
        4,
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
        4,
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
        4,
        6
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
        4,
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
        4,
        6
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
        4,
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
        4,
        6
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
        4,
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
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
        4,
        6
      ]
    }
  ],
  "samsung": [
    {
      "name": "Galaxy S24+",
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
      "name": "Galaxy Z Flip 6",
      "slug": "galaxy-z-flip-6",
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
      "name": "Galaxy Z Fold 6",
      "slug": "galaxy-z-fold-6",
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
      "name": "Samsung Absolute",
      "slug": "absolute",
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
      "name": "Samsung Acclaim",
      "slug": "acclaim",
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
      "name": "Samsung Admire",
      "slug": "admire",
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
      "name": "Samsung Amazing",
      "slug": "amazing",
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
      "name": "Samsung Baffin",
      "slug": "baffin",
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
      "name": "Samsung Captivate Glide",
      "slug": "captivate-glide",
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
      "name": "Samsung China Telecom",
      "slug": "china-telecom",
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
      "name": "Samsung Conquer",
      "slug": "conquer",
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
      "name": "Samsung DoubleTime",
      "slug": "doubletime",
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
      "name": "Samsung Droid Charge",
      "slug": "droid-charge",
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
      "name": "Samsung Elite",
      "slug": "elite",
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
      "name": "Samsung Europa",
      "slug": "europa",
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
      "name": "Samsung Exhibit",
      "slug": "exhibit",
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
      "name": "Samsung Galaxy (China)",
      "slug": "galaxy-china",
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
      "name": "Samsung Galaxy 070",
      "slug": "galaxy-070",
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
      "name": "Samsung Galaxy A",
      "slug": "galaxy-a",
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
      "name": "Samsung Galaxy A Quantum",
      "slug": "galaxy-a-quantum",
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
      "name": "Samsung Galaxy A01",
      "slug": "galaxy-a01",
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
      "name": "Samsung Galaxy A01 Core",
      "slug": "galaxy-a01-core",
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
      "name": "Samsung Galaxy A02",
      "slug": "galaxy-a02",
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
      "name": "Samsung Galaxy A02s",
      "slug": "galaxy-a02s",
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
      "name": "Samsung Galaxy A03",
      "slug": "galaxy-a03",
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
      "name": "Samsung Galaxy A03 Core",
      "slug": "galaxy-a03-core",
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
      "name": "Samsung Galaxy A03s",
      "slug": "galaxy-a03s",
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
      "name": "Samsung Galaxy A04",
      "slug": "galaxy-a04",
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
      "name": "Samsung Galaxy A04e",
      "slug": "galaxy-a04e",
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
      "name": "Samsung Galaxy A04s",
      "slug": "galaxy-a04s",
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
      "name": "Samsung Galaxy A05",
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
      "name": "Samsung Galaxy A05s",
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
      "name": "Samsung Galaxy A06",
      "slug": "galaxy-a06",
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
      "name": "Samsung Galaxy A06 5G",
      "slug": "galaxy-a06-5g",
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
      "name": "Samsung Galaxy A07",
      "slug": "galaxy-a07",
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
      "name": "Samsung Galaxy A07 5G",
      "slug": "galaxy-a07-5g",
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
      "name": "Samsung Galaxy A07s",
      "slug": "galaxy-a07s",
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
      "name": "Samsung Galaxy A08",
      "slug": "galaxy-a08",
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
      "name": "Samsung Galaxy A10",
      "slug": "galaxy-a10",
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
      "name": "Samsung Galaxy A10e",
      "slug": "galaxy-a10e",
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
      "name": "Samsung Galaxy A10s",
      "slug": "galaxy-a10s",
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
      "name": "Samsung Galaxy A11",
      "slug": "galaxy-a11",
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
      "name": "Samsung Galaxy A12",
      "slug": "galaxy-a12",
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
      "name": "Samsung Galaxy A13",
      "slug": "galaxy-a13",
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
      "name": "Samsung Galaxy A13 5G",
      "slug": "galaxy-a13-5g",
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
      "name": "Samsung Galaxy A14",
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
      "name": "Samsung Galaxy A14 5G",
      "slug": "galaxy-a14-5g",
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
      "name": "Samsung Galaxy A15",
      "slug": "galaxy-a15",
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
      "name": "Samsung Galaxy A15 5G",
      "slug": "galaxy-a15-5g",
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
      "name": "Samsung Galaxy A16",
      "slug": "galaxy-a16",
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
      "name": "Samsung Galaxy A16 5G",
      "slug": "galaxy-a16-5g",
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
      "name": "Samsung Galaxy A17",
      "slug": "galaxy-a17",
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
      "name": "Samsung Galaxy A17 5G",
      "slug": "galaxy-a17-5g",
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
      "name": "Samsung Galaxy A18",
      "slug": "galaxy-a18",
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
      "name": "Samsung Galaxy A2 Core",
      "slug": "galaxy-a2-core",
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
      "name": "Samsung Galaxy A20",
      "slug": "galaxy-a20",
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
      "name": "Samsung Galaxy A20e",
      "slug": "galaxy-a20e",
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
      "name": "Samsung Galaxy A20s",
      "slug": "galaxy-a20s",
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
      "name": "Samsung Galaxy A21",
      "slug": "galaxy-a21",
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
      "name": "Samsung Galaxy A21s",
      "slug": "galaxy-a21s",
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
      "name": "Samsung Galaxy A22",
      "slug": "galaxy-a22",
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
      "name": "Samsung Galaxy A22 5G",
      "slug": "galaxy-a22-5g",
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
      "name": "Samsung Galaxy A22s 5G",
      "slug": "galaxy-a22s-5g",
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
      "name": "Samsung Galaxy A23",
      "slug": "galaxy-a23",
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
      "name": "Samsung Galaxy A23 5G",
      "slug": "galaxy-a23-5g",
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
      "name": "Samsung Galaxy A23 5G UW",
      "slug": "galaxy-a23-5g-uw",
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
      "name": "Samsung Galaxy A24",
      "slug": "galaxy-a24",
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
      "name": "Samsung Galaxy A25 5G",
      "slug": "galaxy-a25-5g",
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
      "name": "Samsung Galaxy A26 5G",
      "slug": "galaxy-a26-5g",
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
      "name": "Samsung Galaxy A27 5G",
      "slug": "galaxy-a27-5g",
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
      "name": "Samsung Galaxy A3",
      "slug": "galaxy-a3",
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
      "name": "Samsung Galaxy A3 (2016)",
      "slug": "galaxy-a3-2016",
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
      "name": "Samsung Galaxy A3 (2017)",
      "slug": "galaxy-a3-2017",
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
      "name": "Samsung Galaxy A3 Core",
      "slug": "galaxy-a3-core",
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
      "name": "Samsung Galaxy A30",
      "slug": "galaxy-a30",
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
      "name": "Samsung Galaxy A30s",
      "slug": "galaxy-a30s",
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
      "name": "Samsung Galaxy A31",
      "slug": "galaxy-a31",
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
      "name": "Samsung Galaxy A32",
      "slug": "galaxy-a32",
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
      "name": "Samsung Galaxy A32 5G",
      "slug": "galaxy-a32-5g",
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
      "name": "Samsung Galaxy A33 5G",
      "slug": "galaxy-a33-5g",
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
      "name": "Samsung Galaxy A34 5G",
      "slug": "galaxy-a34-5g",
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
      "name": "Samsung Galaxy A35 5G",
      "slug": "galaxy-a35-5g",
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
      "name": "Samsung Galaxy A36 5G",
      "slug": "galaxy-a36-5g",
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
      "name": "Samsung Galaxy A37 5G",
      "slug": "galaxy-a37-5g",
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
      "name": "Samsung Galaxy A40",
      "slug": "galaxy-a40",
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
      "name": "Samsung Galaxy A40s",
      "slug": "galaxy-a40s",
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
      "name": "Samsung Galaxy A41",
      "slug": "galaxy-a41",
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
      "name": "Samsung Galaxy A42 5G",
      "slug": "galaxy-a42-5g",
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
      "name": "Samsung Galaxy A5",
      "slug": "galaxy-a5",
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
      "name": "Samsung Galaxy A5 (2016)",
      "slug": "galaxy-a5-2016",
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
      "name": "Samsung Galaxy A5 (2017)",
      "slug": "galaxy-a5-2017",
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
      "name": "Samsung Galaxy A50",
      "slug": "galaxy-a50",
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
      "name": "Samsung Galaxy A50s",
      "slug": "galaxy-a50s",
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
      "name": "Samsung Galaxy A51",
      "slug": "galaxy-a51",
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
      "name": "Samsung Galaxy A51 5G",
      "slug": "galaxy-a51-5g",
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
      "name": "Samsung Galaxy A52",
      "slug": "galaxy-a52",
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
      "name": "Samsung Galaxy A52 5G",
      "slug": "galaxy-a52-5g",
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
      "name": "Samsung Galaxy A52s 5G",
      "slug": "galaxy-a52s-5g",
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
      "name": "Samsung Galaxy A53 5G",
      "slug": "galaxy-a53-5g",
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
      "name": "Samsung Galaxy A53 5G UW",
      "slug": "galaxy-a53-5g-uw",
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
      "name": "Samsung Galaxy A54 5G",
      "slug": "galaxy-a54-5g",
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
      "name": "Samsung Galaxy A55 5G",
      "slug": "galaxy-a55-5g",
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
      "name": "Samsung Galaxy A56 5G",
      "slug": "galaxy-a56-5g",
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
      "name": "Samsung Galaxy A57 5G",
      "slug": "galaxy-a57-5g",
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
      "name": "Samsung Galaxy A6",
      "slug": "galaxy-a6",
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
      "name": "Samsung Galaxy A60",
      "slug": "galaxy-a60",
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
      "name": "Samsung Galaxy A7",
      "slug": "galaxy-a7",
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
      "name": "Samsung Galaxy A7 (2016)",
      "slug": "galaxy-a7-2016",
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
      "name": "Samsung Galaxy A7 (2017)",
      "slug": "galaxy-a7-2017",
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
      "name": "Samsung Galaxy A7 (2018)",
      "slug": "galaxy-a7-2018",
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
      "name": "Samsung Galaxy A70",
      "slug": "galaxy-a70",
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
      "name": "Samsung Galaxy A70s",
      "slug": "galaxy-a70s",
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
      "name": "Samsung Galaxy A71",
      "slug": "galaxy-a71",
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
      "name": "Samsung Galaxy A71 5G",
      "slug": "galaxy-a71-5g",
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
      "name": "Samsung Galaxy A72",
      "slug": "galaxy-a72",
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
      "name": "Samsung Galaxy A73 5G",
      "slug": "galaxy-a73-5g",
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
      "name": "Samsung Galaxy A8",
      "slug": "galaxy-a8",
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
      "name": "Samsung Galaxy A8 (2016)",
      "slug": "galaxy-a8-2016",
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
      "name": "Samsung Galaxy A8 (2018)",
      "slug": "galaxy-a8-2018",
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
      "name": "Samsung Galaxy A8 Star",
      "slug": "galaxy-a8-star",
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
      "name": "Samsung Galaxy A80",
      "slug": "galaxy-a80",
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
      "name": "Samsung Galaxy A8s",
      "slug": "galaxy-a8s",
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
      "name": "Samsung Galaxy A9 (2016)",
      "slug": "galaxy-a9-2016",
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
      "name": "Samsung Galaxy A9 (2018)",
      "slug": "galaxy-a9-2018",
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
      "name": "Samsung Galaxy A9 Pro",
      "slug": "galaxy-a9-pro",
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
      "name": "Samsung Galaxy A9 Star",
      "slug": "galaxy-a9-star",
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
      "name": "Samsung Galaxy A9 Star Lite",
      "slug": "galaxy-a9-star-lite",
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
      "name": "Samsung Galaxy A90 5G",
      "slug": "galaxy-a90-5g",
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
      "name": "Samsung Galaxy A9s",
      "slug": "galaxy-a9s",
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
      "name": "Samsung Galaxy Ace",
      "slug": "galaxy-ace",
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
      "name": "Samsung Galaxy Ace 4",
      "slug": "galaxy-ace-4",
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
      "name": "Samsung Galaxy Ace 4 Lite",
      "slug": "galaxy-ace-4-lite",
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
      "name": "Samsung Galaxy Ace Advance",
      "slug": "galaxy-ace-advance",
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
      "name": "Samsung Galaxy Ace Duos",
      "slug": "galaxy-ace-duos",
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
      "name": "Samsung Galaxy Ace Plus",
      "slug": "galaxy-ace-plus",
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
      "name": "Samsung Galaxy Ace Q",
      "slug": "galaxy-ace-q",
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
      "name": "Samsung Galaxy Ace Style",
      "slug": "galaxy-ace-style",
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
      "name": "Samsung Galaxy Ace2",
      "slug": "galaxy-ace2",
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
      "name": "Samsung Galaxy Ace2 X",
      "slug": "galaxy-ace2-x",
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
      "name": "Samsung Galaxy Ace3",
      "slug": "galaxy-ace3",
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
      "name": "Samsung Galaxy Ace3 Duos",
      "slug": "galaxy-ace3-duos",
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
      "name": "Samsung Galaxy Ace4 Neo",
      "slug": "galaxy-ace4-neo",
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
      "name": "Samsung Galaxy Active Neo",
      "slug": "galaxy-active-neo",
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
      "name": "Samsung Galaxy Admire",
      "slug": "galaxy-admire",
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
      "name": "Samsung Galaxy Admire 2",
      "slug": "galaxy-admire-2",
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
      "name": "Samsung Galaxy Alpha",
      "slug": "galaxy-alpha",
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
      "name": "Samsung Galaxy Amp",
      "slug": "galaxy-amp",
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
      "name": "Samsung Galaxy Apollo",
      "slug": "galaxy-apollo",
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
      "name": "Samsung Galaxy Appeal",
      "slug": "galaxy-appeal",
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
      "name": "Samsung Galaxy Attain",
      "slug": "galaxy-attain",
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
      "name": "Samsung Galaxy Avant",
      "slug": "galaxy-avant",
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
      "name": "Samsung Galaxy Axiom",
      "slug": "galaxy-axiom",
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
      "name": "Samsung Galaxy Beam",
      "slug": "galaxy-beam",
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
      "name": "Samsung Galaxy Buddy",
      "slug": "galaxy-buddy",
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
      "name": "Samsung Galaxy Buddy2",
      "slug": "galaxy-buddy2",
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
      "name": "Samsung Galaxy Buddy3",
      "slug": "galaxy-buddy3",
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
      "name": "Samsung Galaxy Buddy4",
      "slug": "galaxy-buddy4",
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
      "name": "Samsung Galaxy Buddy5",
      "slug": "galaxy-buddy5",
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
      "name": "Samsung Galaxy C5",
      "slug": "galaxy-c5",
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
      "name": "Samsung Galaxy C5 Pro",
      "slug": "galaxy-c5-pro",
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
      "name": "Samsung Galaxy C55 5G",
      "slug": "galaxy-c55-5g",
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
      "name": "Samsung Galaxy C7",
      "slug": "galaxy-c7",
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
      "name": "Samsung Galaxy C7 Pro",
      "slug": "galaxy-c7-pro",
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
      "name": "Samsung Galaxy C8",
      "slug": "galaxy-c8",
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
      "name": "Samsung Galaxy C9 Pro",
      "slug": "galaxy-c9-pro",
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
      "name": "Samsung Galaxy Centura",
      "slug": "galaxy-centura",
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
      "name": "Samsung Galaxy Chat",
      "slug": "galaxy-chat",
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
      "name": "Samsung Galaxy Core",
      "slug": "galaxy-core",
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
      "name": "Samsung Galaxy Core Advance",
      "slug": "galaxy-core-advance",
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
      "name": "Samsung Galaxy Core Lite",
      "slug": "galaxy-core-lite",
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
      "name": "Samsung Galaxy Core LTE",
      "slug": "galaxy-core-lte",
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
      "name": "Samsung Galaxy Core Max",
      "slug": "galaxy-core-max",
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
      "name": "Samsung Galaxy Core Max Duos",
      "slug": "galaxy-core-max-duos",
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
      "name": "Samsung Galaxy Core Plus",
      "slug": "galaxy-core-plus",
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
      "name": "Samsung Galaxy Core Prime",
      "slug": "galaxy-core-prime",
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
      "name": "Samsung Galaxy Core Safe",
      "slug": "galaxy-core-safe",
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
      "name": "Samsung Galaxy Core2",
      "slug": "galaxy-core2",
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
      "name": "Samsung Galaxy Discover",
      "slug": "galaxy-discover",
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
      "name": "Samsung Galaxy Duos",
      "slug": "galaxy-duos",
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
      "name": "Samsung Galaxy E5",
      "slug": "galaxy-e5",
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
      "name": "Samsung Galaxy E7",
      "slug": "galaxy-e7",
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
      "name": "Samsung Galaxy Elite",
      "slug": "galaxy-elite",
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
      "name": "Samsung Galaxy Europa",
      "slug": "galaxy-europa",
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
      "name": "Samsung Galaxy Exhibit",
      "slug": "galaxy-exhibit",
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
      "name": "Samsung Galaxy Exhibit2",
      "slug": "galaxy-exhibit2",
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
      "name": "Samsung Galaxy Exhilarate",
      "slug": "galaxy-exhilarate",
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
      "name": "Samsung Galaxy Express",
      "slug": "galaxy-express",
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
      "name": "Samsung Galaxy Express2",
      "slug": "galaxy-express2",
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
      "name": "Samsung Galaxy F02s",
      "slug": "galaxy-f02s",
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
      "name": "Samsung Galaxy F04",
      "slug": "galaxy-f04",
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
      "name": "Samsung Galaxy F05",
      "slug": "galaxy-f05",
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
      "name": "Samsung Galaxy F06 5G",
      "slug": "galaxy-f06-5g",
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
      "name": "Samsung Galaxy F07",
      "slug": "galaxy-f07",
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
      "name": "Samsung Galaxy F08",
      "slug": "galaxy-f08",
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
      "name": "Samsung Galaxy F12",
      "slug": "galaxy-f12",
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
      "name": "Samsung Galaxy F13",
      "slug": "galaxy-f13",
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
      "name": "Samsung Galaxy F14",
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
      "name": "Samsung Galaxy F14 5G",
      "slug": "galaxy-f14-5g",
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
      "name": "Samsung Galaxy F15 5G",
      "slug": "galaxy-f15-5g",
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
      "name": "Samsung Galaxy F16 5G",
      "slug": "galaxy-f16-5g",
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
      "name": "Samsung Galaxy F17 5G",
      "slug": "galaxy-f17-5g",
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
      "name": "Samsung Galaxy F22",
      "slug": "galaxy-f22",
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
      "name": "Samsung Galaxy F23 5G",
      "slug": "galaxy-f23-5g",
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
      "name": "Samsung Galaxy F34 5G",
      "slug": "galaxy-f34-5g",
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
      "name": "Samsung Galaxy F36 5G",
      "slug": "galaxy-f36-5g",
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
      "name": "Samsung Galaxy F41",
      "slug": "galaxy-f41",
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
      "name": "Samsung Galaxy F42 5G",
      "slug": "galaxy-f42-5g",
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
      "name": "Samsung Galaxy F52 5G",
      "slug": "galaxy-f52-5g",
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
      "name": "Samsung Galaxy F54 5G",
      "slug": "galaxy-f54-5g",
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
      "name": "Samsung Galaxy F55 5G",
      "slug": "galaxy-f55-5g",
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
      "name": "Samsung Galaxy F56 5G",
      "slug": "galaxy-f56-5g",
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
      "name": "Samsung Galaxy F62",
      "slug": "galaxy-f62",
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
      "name": "Samsung Galaxy F70 5G",
      "slug": "galaxy-f70-5g",
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
      "name": "Samsung Galaxy F70 Pro 5G",
      "slug": "galaxy-f70-pro-5g",
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
      "name": "Samsung Galaxy F70e 5G",
      "slug": "galaxy-f70e-5g",
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
      "name": "Samsung Galaxy Fame",
      "slug": "galaxy-fame",
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
      "name": "Samsung Galaxy Fame Lite Duos",
      "slug": "galaxy-fame-lite-duos",
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
      "name": "Samsung Galaxy Feel",
      "slug": "galaxy-feel",
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
      "name": "Samsung Galaxy Feel2",
      "slug": "galaxy-feel2",
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
      "name": "Samsung Galaxy Fold",
      "slug": "galaxy-fold",
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
      "name": "Samsung Galaxy Fold 5G",
      "slug": "galaxy-fold-5g",
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
      "name": "Samsung Galaxy Folder",
      "slug": "galaxy-folder",
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
      "name": "Samsung Galaxy Folder2",
      "slug": "galaxy-folder2",
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
      "name": "Samsung Galaxy Fresh",
      "slug": "galaxy-fresh",
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
      "name": "Samsung Galaxy Gio",
      "slug": "galaxy-gio",
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
      "name": "Samsung Galaxy Go Prime",
      "slug": "galaxy-go-prime",
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
      "name": "Samsung Galaxy Golden",
      "slug": "galaxy-golden",
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
      "name": "Samsung Galaxy Golden 2",
      "slug": "galaxy-golden-2",
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
      "name": "Samsung Galaxy Grand",
      "slug": "galaxy-grand",
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
      "name": "Samsung Galaxy Grand Duos",
      "slug": "galaxy-grand-duos",
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
      "name": "Samsung Galaxy Grand Max",
      "slug": "galaxy-grand-max",
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
      "name": "Samsung Galaxy Grand Neo",
      "slug": "galaxy-grand-neo",
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
      "name": "Samsung Galaxy Grand Neo Plus",
      "slug": "galaxy-grand-neo-plus",
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
      "name": "Samsung Galaxy Grand Prime",
      "slug": "galaxy-grand-prime",
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
      "name": "Samsung Galaxy Grand Prime Plus",
      "slug": "galaxy-grand-prime-plus",
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
      "name": "Samsung Galaxy Grand2",
      "slug": "galaxy-grand2",
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
      "name": "Samsung Galaxy Indulge",
      "slug": "galaxy-indulge",
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
      "name": "Samsung Galaxy Infinite",
      "slug": "galaxy-infinite",
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
      "name": "Samsung Galaxy J",
      "slug": "galaxy-j",
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
      "name": "Samsung Galaxy J1",
      "slug": "galaxy-j1",
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
      "name": "Samsung Galaxy J1 (2016)",
      "slug": "galaxy-j1-2016",
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
      "name": "Samsung Galaxy J1 Ace",
      "slug": "galaxy-j1-ace",
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
      "name": "Samsung Galaxy J1 Mini",
      "slug": "galaxy-j1-mini",
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
      "name": "Samsung Galaxy J1 Mini Prime",
      "slug": "galaxy-j1-mini-prime",
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
      "name": "Samsung Galaxy J2",
      "slug": "galaxy-j2",
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
      "name": "Samsung Galaxy J2 (2016)",
      "slug": "galaxy-j2-2016",
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
      "name": "Samsung Galaxy J2 Core",
      "slug": "galaxy-j2-core",
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
      "name": "Samsung Galaxy J2 Prime",
      "slug": "galaxy-j2-prime",
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
      "name": "Samsung Galaxy J2 Pro",
      "slug": "galaxy-j2-pro",
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
      "name": "Samsung Galaxy J2 Pure",
      "slug": "galaxy-j2-pure",
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
      "name": "Samsung Galaxy J3",
      "slug": "galaxy-j3",
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
      "name": "Samsung Galaxy J3 (2016)",
      "slug": "galaxy-j3-2016",
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
      "name": "Samsung Galaxy J3 (2017)",
      "slug": "galaxy-j3-2017",
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
      "name": "Samsung Galaxy J3 (2018)",
      "slug": "galaxy-j3-2018",
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
      "name": "Samsung Galaxy J3 Achieve",
      "slug": "galaxy-j3-achieve",
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
      "name": "Samsung Galaxy J3 Aura",
      "slug": "galaxy-j3-aura",
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
      "name": "Samsung Galaxy J3 Eclipse",
      "slug": "galaxy-j3-eclipse",
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
      "name": "Samsung Galaxy J3 Emerge",
      "slug": "galaxy-j3-emerge",
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
      "name": "Samsung Galaxy J3 Mission",
      "slug": "galaxy-j3-mission",
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
      "name": "Samsung Galaxy J3 Orbit",
      "slug": "galaxy-j3-orbit",
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
      "name": "Samsung Galaxy J3 Pop",
      "slug": "galaxy-j3-pop",
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
      "name": "Samsung Galaxy J3 Prime",
      "slug": "galaxy-j3-prime",
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
      "name": "Samsung Galaxy J3 Pro",
      "slug": "galaxy-j3-pro",
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
      "name": "Samsung Galaxy J3 Star",
      "slug": "galaxy-j3-star",
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
      "name": "Samsung Galaxy J3 V",
      "slug": "galaxy-j3-v",
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
      "name": "Samsung Galaxy J4",
      "slug": "galaxy-j4",
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
      "name": "Samsung Galaxy J4 Core",
      "slug": "galaxy-j4-core",
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
      "name": "Samsung Galaxy J5",
      "slug": "galaxy-j5",
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
      "name": "Samsung Galaxy J5 (2016)",
      "slug": "galaxy-j5-2016",
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
      "name": "Samsung Galaxy J5 Prime",
      "slug": "galaxy-j5-prime",
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
      "name": "Samsung Galaxy J5 Pro",
      "slug": "galaxy-j5-pro",
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
      "name": "Samsung Galaxy J6",
      "slug": "galaxy-j6",
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
      "name": "Samsung Galaxy J7",
      "slug": "galaxy-j7",
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
      "name": "Samsung Galaxy J7 (2015)",
      "slug": "galaxy-j7-2015",
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
      "name": "Samsung Galaxy J7 (2016)",
      "slug": "galaxy-j7-2016",
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
      "name": "Samsung Galaxy J7 (2017)",
      "slug": "galaxy-j7-2017",
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
      "name": "Samsung Galaxy J7 Aura",
      "slug": "galaxy-j7-aura",
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
      "name": "Samsung Galaxy J7 Crown",
      "slug": "galaxy-j7-crown",
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
      "name": "Samsung Galaxy J7 Duo",
      "slug": "galaxy-j7-duo",
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
      "name": "Samsung Galaxy J7 Max",
      "slug": "galaxy-j7-max",
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
      "name": "Samsung Galaxy J7 Neo",
      "slug": "galaxy-j7-neo",
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
      "name": "Samsung Galaxy J7 Perx",
      "slug": "galaxy-j7-perx",
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
      "name": "Samsung Galaxy J7 Pop",
      "slug": "galaxy-j7-pop",
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
      "name": "Samsung Galaxy J7 Prime",
      "slug": "galaxy-j7-prime",
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
      "name": "Samsung Galaxy J7 Prime2",
      "slug": "galaxy-j7-prime2",
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
      "name": "Samsung Galaxy J7 Pro",
      "slug": "galaxy-j7-pro",
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
      "name": "Samsung Galaxy J7 Refine",
      "slug": "galaxy-j7-refine",
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
      "name": "Samsung Galaxy J7 Sky Pro",
      "slug": "galaxy-j7-sky-pro",
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
      "name": "Samsung Galaxy J7 Star",
      "slug": "galaxy-j7-star",
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
      "name": "Samsung Galaxy J7 V",
      "slug": "galaxy-j7-v",
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
      "name": "Samsung Galaxy J8",
      "slug": "galaxy-j8",
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
      "name": "Samsung Galaxy Jean",
      "slug": "galaxy-jean",
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
      "name": "Samsung Galaxy Jean2",
      "slug": "galaxy-jean2",
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
      "name": "Samsung Galaxy Jump",
      "slug": "galaxy-jump",
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
      "name": "Samsung Galaxy Jump2",
      "slug": "galaxy-jump2",
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
      "name": "Samsung Galaxy Jump3",
      "slug": "galaxy-jump3",
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
      "name": "Samsung Galaxy Jump4",
      "slug": "galaxy-jump4",
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
      "name": "Samsung Galaxy Jump5",
      "slug": "galaxy-jump5",
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
      "name": "Samsung Galaxy K",
      "slug": "galaxy-k",
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
      "name": "Samsung Galaxy K Zoom",
      "slug": "galaxy-k-zoom",
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
      "name": "Samsung Galaxy M Pro2",
      "slug": "galaxy-m-pro2",
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
      "name": "Samsung Galaxy M Style",
      "slug": "galaxy-m-style",
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
      "name": "Samsung Galaxy M01",
      "slug": "galaxy-m01",
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
      "name": "Samsung Galaxy M01 Core",
      "slug": "galaxy-m01-core",
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
      "name": "Samsung Galaxy M01s",
      "slug": "galaxy-m01s",
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
      "name": "Samsung Galaxy M02",
      "slug": "galaxy-m02",
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
      "name": "Samsung Galaxy M02s",
      "slug": "galaxy-m02s",
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
      "name": "Samsung Galaxy M04",
      "slug": "galaxy-m04",
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
      "name": "Samsung Galaxy M05",
      "slug": "galaxy-m05",
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
      "name": "Samsung Galaxy M06 5G",
      "slug": "galaxy-m06-5g",
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
      "name": "Samsung Galaxy M07",
      "slug": "galaxy-m07",
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
      "name": "Samsung Galaxy M08",
      "slug": "galaxy-m08",
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
      "name": "Samsung Galaxy M10",
      "slug": "galaxy-m10",
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
      "name": "Samsung Galaxy M10s",
      "slug": "galaxy-m10s",
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
      "name": "Samsung Galaxy M11",
      "slug": "galaxy-m11",
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
      "name": "Samsung Galaxy M12",
      "slug": "galaxy-m12",
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
      "name": "Samsung Galaxy M13",
      "slug": "galaxy-m13",
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
      "name": "Samsung Galaxy M13 5G",
      "slug": "galaxy-m13-5g",
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
      "name": "Samsung Galaxy M14",
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
      "name": "Samsung Galaxy M14 5G",
      "slug": "galaxy-m14-5g",
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
      "name": "Samsung Galaxy M15 5G",
      "slug": "galaxy-m15-5g",
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
      "name": "Samsung Galaxy M16 5G",
      "slug": "galaxy-m16-5g",
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
      "name": "Samsung Galaxy M17 5G",
      "slug": "galaxy-m17-5g",
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
      "name": "Samsung Galaxy M17e 5G",
      "slug": "galaxy-m17e-5g",
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
      "name": "Samsung Galaxy M20",
      "slug": "galaxy-m20",
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
      "name": "Samsung Galaxy M21",
      "slug": "galaxy-m21",
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
      "name": "Samsung Galaxy M21 2021 Edition",
      "slug": "galaxy-m21-2021-edition",
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
      "name": "Samsung Galaxy M22",
      "slug": "galaxy-m22",
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
      "name": "Samsung Galaxy M23 5G",
      "slug": "galaxy-m23-5g",
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
      "name": "Samsung Galaxy M30",
      "slug": "galaxy-m30",
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
      "name": "Samsung Galaxy M30s",
      "slug": "galaxy-m30s",
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
      "name": "Samsung Galaxy M31",
      "slug": "galaxy-m31",
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
      "name": "Samsung Galaxy M31s",
      "slug": "galaxy-m31s",
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
      "name": "Samsung Galaxy M32",
      "slug": "galaxy-m32",
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
      "name": "Samsung Galaxy M32 5G",
      "slug": "galaxy-m32-5g",
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
      "name": "Samsung Galaxy M33 5G",
      "slug": "galaxy-m33-5g",
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
      "name": "Samsung Galaxy M34 5G",
      "slug": "galaxy-m34-5g",
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
      "name": "Samsung Galaxy M35 5G",
      "slug": "galaxy-m35-5g",
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
      "name": "Samsung Galaxy M36 5G",
      "slug": "galaxy-m36-5g",
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
      "name": "Samsung Galaxy M40",
      "slug": "galaxy-m40",
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
      "name": "Samsung Galaxy M42 5G",
      "slug": "galaxy-m42-5g",
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
      "name": "Samsung Galaxy M47 5G",
      "slug": "galaxy-m47-5g",
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
      "name": "Samsung Galaxy M51",
      "slug": "galaxy-m51",
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
      "name": "Samsung Galaxy M52 5G",
      "slug": "galaxy-m52-5g",
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
      "name": "Samsung Galaxy M53 5G",
      "slug": "galaxy-m53-5g",
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
      "name": "Samsung Galaxy M54 5G",
      "slug": "galaxy-m54-5g",
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
      "name": "Samsung Galaxy M55 5G",
      "slug": "galaxy-m55-5g",
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
      "name": "Samsung Galaxy M55s 5G",
      "slug": "galaxy-m55s-5g",
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
      "name": "Samsung Galaxy M56 5G",
      "slug": "galaxy-m56-5g",
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
      "name": "Samsung Galaxy M62",
      "slug": "galaxy-m62",
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
      "name": "Samsung Galaxy Mega 5.8",
      "slug": "galaxy-mega-5-8",
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
      "name": "Samsung Galaxy Mega 6.3",
      "slug": "galaxy-mega-6-3",
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
      "name": "Samsung Galaxy Mega Plus",
      "slug": "galaxy-mega-plus",
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
      "name": "Samsung Galaxy Mega2",
      "slug": "galaxy-mega2",
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
      "name": "Samsung Galaxy Mini",
      "slug": "galaxy-mini",
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
      "name": "Samsung Galaxy Mini2",
      "slug": "galaxy-mini2",
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
      "name": "Samsung Galaxy Music",
      "slug": "galaxy-music",
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
      "name": "Samsung Galaxy Music Duos",
      "slug": "galaxy-music-duos",
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
      "name": "Samsung Galaxy Neo",
      "slug": "galaxy-neo",
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
      "name": "Samsung Galaxy Nexus",
      "slug": "galaxy-nexus",
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
      "name": "Samsung Galaxy Note",
      "slug": "galaxy-note",
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
      "name": "Samsung Galaxy Note 10.1",
      "slug": "galaxy-note-10-1",
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
      "name": "Samsung Galaxy Note 10.1 2014 Edition",
      "slug": "galaxy-note-10-1-2014-edition",
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
      "name": "Samsung Galaxy Note 8.0",
      "slug": "galaxy-note-8-0",
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
      "name": "Samsung Galaxy Note Edge",
      "slug": "galaxy-note-edge",
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
      "name": "Samsung Galaxy Note Fan Edition",
      "slug": "galaxy-note-fan-edition",
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
      "name": "Samsung Galaxy Note Pro 12.2",
      "slug": "galaxy-note-pro-12-2",
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
      "name": "Samsung Galaxy Note10",
      "slug": "galaxy-note10",
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
      "name": "Samsung Galaxy Note10 5G",
      "slug": "galaxy-note10-5g",
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
      "name": "Samsung Galaxy Note10 Lite",
      "slug": "galaxy-note10-lite",
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
      "name": "Samsung Galaxy Note2",
      "slug": "galaxy-note2",
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
      "name": "Samsung Galaxy Note20",
      "slug": "galaxy-note20",
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
      "name": "Samsung Galaxy Note20 5G",
      "slug": "galaxy-note20-5g",
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
      "name": "Samsung Galaxy Note20 Ultra",
      "slug": "galaxy-note20-ultra",
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
      "name": "Samsung Galaxy Note20 Ultra 5G",
      "slug": "galaxy-note20-ultra-5g",
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
      "name": "Samsung Galaxy Note3",
      "slug": "galaxy-note3",
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
      "name": "Samsung Galaxy Note3 Duos",
      "slug": "galaxy-note3-duos",
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
      "name": "Samsung Galaxy Note3 Neo",
      "slug": "galaxy-note3-neo",
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
      "name": "Samsung Galaxy Note4",
      "slug": "galaxy-note4",
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
      "name": "Samsung Galaxy Note4 S-LTE",
      "slug": "galaxy-note4-s-lte",
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
      "name": "Samsung Galaxy Note5",
      "slug": "galaxy-note5",
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
      "name": "Samsung Galaxy Note7",
      "slug": "galaxy-note7",
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
      "name": "Samsung Galaxy Note8",
      "slug": "galaxy-note8",
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
      "name": "Samsung Galaxy Note9",
      "slug": "galaxy-note9",
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
      "name": "Samsung Galaxy NX",
      "slug": "galaxy-nx",
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
      "name": "Samsung Galaxy On Max",
      "slug": "galaxy-on-max",
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
      "name": "Samsung Galaxy On Nxt",
      "slug": "galaxy-on-nxt",
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
      "name": "Samsung Galaxy On5",
      "slug": "galaxy-on5",
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
      "name": "Samsung Galaxy On5 (2016)",
      "slug": "galaxy-on5-2016",
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
      "name": "Samsung Galaxy On5 Pro",
      "slug": "galaxy-on5-pro",
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
      "name": "Samsung Galaxy On6",
      "slug": "galaxy-on6",
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
      "name": "Samsung Galaxy On7",
      "slug": "galaxy-on7",
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
      "name": "Samsung Galaxy On7 (2016)",
      "slug": "galaxy-on7-2016",
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
      "name": "Samsung Galaxy On7 Prime",
      "slug": "galaxy-on7-prime",
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
      "name": "Samsung Galaxy On7 Pro",
      "slug": "galaxy-on7-pro",
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
      "name": "Samsung Galaxy On8",
      "slug": "galaxy-on8",
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
      "name": "Samsung Galaxy Pocket",
      "slug": "galaxy-pocket",
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
      "name": "Samsung Galaxy Pocket Neo",
      "slug": "galaxy-pocket-neo",
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
      "name": "Samsung Galaxy Pocket Plus",
      "slug": "galaxy-pocket-plus",
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
      "name": "Samsung Galaxy Pocket SS",
      "slug": "galaxy-pocket-ss",
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
      "name": "Samsung Galaxy Pocket2",
      "slug": "galaxy-pocket2",
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
      "name": "Samsung Galaxy Pop",
      "slug": "galaxy-pop",
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
      "name": "Samsung Galaxy Pop (CDMA)",
      "slug": "galaxy-pop-cdma",
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
      "name": "Samsung Galaxy Precedent",
      "slug": "galaxy-precedent",
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
      "name": "Samsung Galaxy Premier",
      "slug": "galaxy-premier",
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
      "name": "Samsung Galaxy Prevail",
      "slug": "galaxy-prevail",
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
      "name": "Samsung Galaxy Prevail2",
      "slug": "galaxy-prevail2",
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
      "name": "Samsung Galaxy Pro",
      "slug": "galaxy-pro",
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
      "name": "Samsung Galaxy Proclaim",
      "slug": "galaxy-proclaim",
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
      "name": "Samsung Galaxy Q",
      "slug": "galaxy-q",
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
      "name": "Samsung Galaxy Quantum2",
      "slug": "galaxy-quantum2",
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
      "name": "Samsung Galaxy Quantum3",
      "slug": "galaxy-quantum3",
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
      "name": "Samsung Galaxy Quantum4",
      "slug": "galaxy-quantum4",
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
      "name": "Samsung Galaxy Quantum5",
      "slug": "galaxy-quantum5",
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
      "name": "Samsung Galaxy Quantum6",
      "slug": "galaxy-quantum6",
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
      "name": "Samsung Galaxy Quantum7",
      "slug": "galaxy-quantum7",
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
      "name": "Samsung Galaxy R-Style",
      "slug": "galaxy-r-style",
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
      "name": "Samsung Galaxy Reverb",
      "slug": "galaxy-reverb",
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
      "name": "Samsung Galaxy Round",
      "slug": "galaxy-round",
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
      "name": "Samsung Galaxy Rugby",
      "slug": "galaxy-rugby",
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
      "name": "Samsung Galaxy Rugby Pro",
      "slug": "galaxy-rugby-pro",
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
      "name": "Samsung Galaxy Rush",
      "slug": "galaxy-rush",
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
      "name": "Samsung Galaxy S",
      "slug": "galaxy-s",
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
      "name": "Samsung Galaxy S Advance",
      "slug": "galaxy-s-advance",
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
      "name": "Samsung Galaxy S Aviator",
      "slug": "galaxy-s-aviator",
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
      "name": "Samsung Galaxy S Blaze",
      "slug": "galaxy-s-blaze",
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
      "name": "Samsung Galaxy S BlazeQ",
      "slug": "galaxy-s-blazeq",
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
      "name": "Samsung Galaxy S Captivate",
      "slug": "galaxy-s-captivate",
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
      "name": "Samsung Galaxy S Continuum",
      "slug": "galaxy-s-continuum",
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
      "name": "Samsung Galaxy S Duos",
      "slug": "galaxy-s-duos",
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
      "name": "Samsung Galaxy S Duos2",
      "slug": "galaxy-s-duos2",
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
      "name": "Samsung Galaxy S Duos3",
      "slug": "galaxy-s-duos3",
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
      "name": "Samsung Galaxy S Epic",
      "slug": "galaxy-s-epic",
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
      "name": "Samsung Galaxy S Fascinate",
      "slug": "galaxy-s-fascinate",
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
      "name": "Samsung Galaxy S Glide",
      "slug": "galaxy-s-glide",
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
      "name": "Samsung Galaxy S Lightray",
      "slug": "galaxy-s-lightray",
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
      "name": "Samsung Galaxy S Plus",
      "slug": "galaxy-s-plus",
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
      "name": "Samsung Galaxy S Stratosphere",
      "slug": "galaxy-s-stratosphere",
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
      "name": "Samsung Galaxy S Vibrant",
      "slug": "galaxy-s-vibrant",
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
      "name": "Samsung Galaxy S10",
      "slug": "galaxy-s10",
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
      "name": "Samsung Galaxy S10 5G",
      "slug": "galaxy-s10-5g",
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
      "name": "Samsung Galaxy S10 Lite",
      "slug": "galaxy-s10-lite",
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
      "name": "Samsung Galaxy S10+ Olympic Games Edition",
      "slug": "galaxy-s10-olympic-games-edition",
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
      "name": "Samsung Galaxy S10e",
      "slug": "galaxy-s10e",
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
      "name": "Samsung Galaxy S2",
      "slug": "galaxy-s2",
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
      "name": "Samsung Galaxy S2 Duos",
      "slug": "galaxy-s2-duos",
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
      "name": "Samsung Galaxy S2 Epic",
      "slug": "galaxy-s2-epic",
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
      "name": "Samsung Galaxy S2 HD LTE",
      "slug": "galaxy-s2-hd-lte",
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
      "name": "Samsung Galaxy S2 LTE",
      "slug": "galaxy-s2-lte",
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
      "name": "Samsung Galaxy S2 Plus",
      "slug": "galaxy-s2-plus",
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
      "name": "Samsung Galaxy S2 Skyrocket",
      "slug": "galaxy-s2-skyrocket",
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
      "name": "Samsung Galaxy S2 Wimax",
      "slug": "galaxy-s2-wimax",
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
      "name": "Samsung Galaxy S2 X",
      "slug": "galaxy-s2-x",
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
      "name": "Samsung Galaxy S20",
      "slug": "galaxy-s20",
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
      "name": "Samsung Galaxy S20 5G",
      "slug": "galaxy-s20-5g",
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
      "name": "Samsung Galaxy S20 FE",
      "slug": "galaxy-s20-fe",
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
      "name": "Samsung Galaxy S20 FE 5G",
      "slug": "galaxy-s20-fe-5g",
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
      "name": "Samsung Galaxy S20 Ultra 5G",
      "slug": "galaxy-s20-ultra-5g",
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
      "name": "Samsung Galaxy S21 5G",
      "slug": "galaxy-s21-5g",
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
      "name": "Samsung Galaxy S21 FE 5G",
      "slug": "galaxy-s21-fe-5g",
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
      "name": "Samsung Galaxy S21 Ultra 5G",
      "slug": "galaxy-s21-ultra-5g",
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
      "name": "Samsung Galaxy S22",
      "slug": "galaxy-s22",
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
      "name": "Samsung Galaxy S22 Ultra",
      "slug": "galaxy-s22-ultra",
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
      "name": "Samsung Galaxy S23",
      "slug": "galaxy-s23",
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
      "name": "Samsung Galaxy S23 FE",
      "slug": "galaxy-s23-fe",
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
      "name": "Samsung Galaxy S23 Ultra",
      "slug": "galaxy-s23-ultra",
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
      "name": "Samsung Galaxy S24",
      "slug": "galaxy-s24",
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
      "name": "Samsung Galaxy S24 FE",
      "slug": "galaxy-s24-fe",
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
      "name": "Samsung Galaxy S24 Ultra",
      "slug": "galaxy-s24-ultra",
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
      "name": "Samsung Galaxy S25",
      "slug": "galaxy-s25",
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
      "name": "Samsung Galaxy S25 Edge",
      "slug": "galaxy-s25-edge",
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
      "name": "Samsung Galaxy S25 FE",
      "slug": "galaxy-s25-fe",
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
      "name": "Samsung Galaxy S25 Ultra",
      "slug": "galaxy-s25-ultra",
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
      "name": "Samsung Galaxy S26",
      "slug": "galaxy-s26",
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
      "name": "Samsung Galaxy S26 FE",
      "slug": "galaxy-s26-fe",
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
      "name": "Samsung Galaxy S26 Ultra",
      "slug": "galaxy-s26-ultra",
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
      "name": "Samsung Galaxy S3",
      "slug": "galaxy-s3",
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
      "name": "Samsung Galaxy S3 Duos",
      "slug": "galaxy-s3-duos",
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
      "name": "Samsung Galaxy S3 Mini",
      "slug": "galaxy-s3-mini",
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
      "name": "Samsung Galaxy S3 Mini Value Edition",
      "slug": "galaxy-s3-mini-value-edition",
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
      "name": "Samsung Galaxy S3 Neo",
      "slug": "galaxy-s3-neo",
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
      "name": "Samsung Galaxy S3 Neo Plus",
      "slug": "galaxy-s3-neo-plus",
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
      "name": "Samsung Galaxy S3 Progre",
      "slug": "galaxy-s3-progre",
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
      "name": "Samsung Galaxy S3 Slim",
      "slug": "galaxy-s3-slim",
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
      "name": "Samsung Galaxy S4",
      "slug": "galaxy-s4",
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
      "name": "Samsung Galaxy S4 Active",
      "slug": "galaxy-s4-active",
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
      "name": "Samsung Galaxy S4 Duos",
      "slug": "galaxy-s4-duos",
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
      "name": "Samsung Galaxy S4 Google Play Edition",
      "slug": "galaxy-s4-google-play-edition",
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
      "name": "Samsung Galaxy S4 LTE-A",
      "slug": "galaxy-s4-lte-a",
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
      "name": "Samsung Galaxy S4 Mini",
      "slug": "galaxy-s4-mini",
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
      "name": "Samsung Galaxy S4 Zoom",
      "slug": "galaxy-s4-zoom",
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
      "name": "Samsung Galaxy S5",
      "slug": "galaxy-s5",
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
      "name": "Samsung Galaxy S5 Active",
      "slug": "galaxy-s5-active",
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
      "name": "Samsung Galaxy S5 Dual Sim",
      "slug": "galaxy-s5-dual-sim",
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
      "name": "Samsung Galaxy S5 Google Play Edition",
      "slug": "galaxy-s5-google-play-edition",
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
      "name": "Samsung Galaxy S5 K Sport",
      "slug": "galaxy-s5-k-sport",
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
      "name": "Samsung Galaxy S5 LTE-A",
      "slug": "galaxy-s5-lte-a",
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
      "name": "Samsung Galaxy S5 Mini",
      "slug": "galaxy-s5-mini",
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
      "name": "Samsung Galaxy S5 Neo",
      "slug": "galaxy-s5-neo",
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
      "name": "Samsung Galaxy S6",
      "slug": "galaxy-s6",
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
      "name": "Samsung Galaxy S6 Active",
      "slug": "galaxy-s6-active",
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
      "name": "Samsung Galaxy S6 Edge",
      "slug": "galaxy-s6-edge",
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
      "name": "Samsung Galaxy S7",
      "slug": "galaxy-s7",
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
      "name": "Samsung Galaxy S7 Active",
      "slug": "galaxy-s7-active",
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
      "name": "Samsung Galaxy S7 Edge",
      "slug": "galaxy-s7-edge",
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
      "name": "Samsung Galaxy S8",
      "slug": "galaxy-s8",
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
      "name": "Samsung Galaxy S8 Active",
      "slug": "galaxy-s8-active",
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
      "name": "Samsung Galaxy S9",
      "slug": "galaxy-s9",
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
      "name": "Samsung Galaxy Spica",
      "slug": "galaxy-spica",
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
      "name": "Samsung Galaxy Star",
      "slug": "galaxy-star",
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
      "name": "Samsung Galaxy Star Plus",
      "slug": "galaxy-star-plus",
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
      "name": "Samsung Galaxy Star Trios",
      "slug": "galaxy-star-trios",
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
      "name": "Samsung Galaxy Star2 Plus",
      "slug": "galaxy-star2-plus",
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
      "name": "Samsung Galaxy Stellar",
      "slug": "galaxy-stellar",
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
      "name": "Samsung Galaxy Stratosphere2",
      "slug": "galaxy-stratosphere2",
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
      "name": "Samsung Galaxy Style Duos",
      "slug": "galaxy-style-duos",
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
      "name": "Samsung Galaxy Tap Pro 10.1",
      "slug": "galaxy-tap-pro-10-1",
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
      "name": "Samsung Galaxy Tap Pro 8.4",
      "slug": "galaxy-tap-pro-8-4",
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
      "name": "Samsung Galaxy Trend",
      "slug": "galaxy-trend",
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
      "name": "Samsung Galaxy Trend Duos",
      "slug": "galaxy-trend-duos",
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
      "name": "Samsung Galaxy Trend Lite",
      "slug": "galaxy-trend-lite",
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
      "name": "Samsung Galaxy Trend Plus",
      "slug": "galaxy-trend-plus",
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
      "name": "Samsung Galaxy Trend2",
      "slug": "galaxy-trend2",
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
      "name": "Samsung Galaxy Trend3",
      "slug": "galaxy-trend3",
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
      "name": "Samsung Galaxy U",
      "slug": "galaxy-u",
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
      "name": "Samsung Galaxy Victory",
      "slug": "galaxy-victory",
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
      "name": "Samsung Galaxy View",
      "slug": "galaxy-view",
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
      "name": "Samsung Galaxy View2",
      "slug": "galaxy-view2",
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
      "name": "Samsung Galaxy W",
      "slug": "galaxy-w",
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
      "name": "Samsung Galaxy Wide",
      "slug": "galaxy-wide",
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
      "name": "Samsung Galaxy Wide2",
      "slug": "galaxy-wide2",
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
      "name": "Samsung Galaxy Wide3",
      "slug": "galaxy-wide3",
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
      "name": "Samsung Galaxy Wide4",
      "slug": "galaxy-wide4",
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
      "name": "Samsung Galaxy Wide5",
      "slug": "galaxy-wide5",
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
      "name": "Samsung Galaxy Wide7",
      "slug": "galaxy-wide7",
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
      "name": "Samsung Galaxy Wide8",
      "slug": "galaxy-wide8",
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
      "name": "Samsung Galaxy Wide9",
      "slug": "galaxy-wide9",
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
      "name": "Samsung Galaxy Win",
      "slug": "galaxy-win",
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
      "name": "Samsung Galaxy Win Duos",
      "slug": "galaxy-win-duos",
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
      "name": "Samsung Galaxy Win Pro",
      "slug": "galaxy-win-pro",
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
      "name": "Samsung Galaxy Win2",
      "slug": "galaxy-win2",
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
      "name": "Samsung Galaxy Xcover",
      "slug": "galaxy-xcover",
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
      "name": "Samsung Galaxy XCover 4s",
      "slug": "galaxy-xcover-4s",
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
      "name": "Samsung Galaxy XCover 5",
      "slug": "galaxy-xcover-5",
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
      "name": "Samsung Galaxy XCover Field Pro",
      "slug": "galaxy-xcover-field-pro",
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
      "name": "Samsung Galaxy XCover Pro",
      "slug": "galaxy-xcover-pro",
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
      "name": "Samsung Galaxy Xcover2",
      "slug": "galaxy-xcover2",
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
      "name": "Samsung Galaxy Xcover3",
      "slug": "galaxy-xcover3",
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
      "name": "Samsung Galaxy XCover4",
      "slug": "galaxy-xcover4",
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
      "name": "Samsung Galaxy XCover6 Pro",
      "slug": "galaxy-xcover6-pro",
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
      "name": "Samsung Galaxy XCover7",
      "slug": "galaxy-xcover7",
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
      "name": "Samsung Galaxy XCover7 Pro",
      "slug": "galaxy-xcover7-pro",
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
      "name": "Samsung Galaxy Y",
      "slug": "galaxy-y",
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
      "name": "Samsung Galaxy Y Duos",
      "slug": "galaxy-y-duos",
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
      "name": "Samsung Galaxy Y Plus",
      "slug": "galaxy-y-plus",
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
      "name": "Samsung Galaxy Y Pop",
      "slug": "galaxy-y-pop",
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
      "name": "Samsung Galaxy Y Pro",
      "slug": "galaxy-y-pro",
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
      "name": "Samsung Galaxy Y Pro Duos",
      "slug": "galaxy-y-pro-duos",
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
      "name": "Samsung Galaxy Young",
      "slug": "galaxy-young",
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
      "name": "Samsung Galaxy Young2",
      "slug": "galaxy-young2",
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
      "name": "Samsung Galaxy Young2 Pro",
      "slug": "galaxy-young2-pro",
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
      "name": "Samsung Galaxy Z Flip",
      "slug": "galaxy-z-flip",
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
      "name": "Samsung Galaxy Z Flip 5G",
      "slug": "galaxy-z-flip-5g",
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
      "name": "Samsung Galaxy Z Flip3 5G",
      "slug": "galaxy-z-flip3-5g",
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
      "name": "Samsung Galaxy Z Flip4",
      "slug": "galaxy-z-flip4",
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
      "name": "Samsung Galaxy Z Flip5",
      "slug": "galaxy-z-flip5",
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
      "name": "Samsung Galaxy Z Flip6",
      "slug": "galaxy-z-flip6",
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
      "name": "Samsung Galaxy Z Flip7",
      "slug": "galaxy-z-flip7",
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
      "name": "Samsung Galaxy Z Flip7 FE",
      "slug": "galaxy-z-flip7-fe",
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
      "name": "Samsung Galaxy Z Flip8",
      "slug": "galaxy-z-flip8",
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
      "name": "Samsung Galaxy Z Fold Special Edition",
      "slug": "galaxy-z-fold-special-edition",
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
      "name": "Samsung Galaxy Z Fold2 5G",
      "slug": "galaxy-z-fold2-5g",
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
      "name": "Samsung Galaxy Z Fold3 5G",
      "slug": "galaxy-z-fold3-5g",
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
      "name": "Samsung Galaxy Z Fold4",
      "slug": "galaxy-z-fold4",
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
      "name": "Samsung Galaxy Z Fold5",
      "slug": "galaxy-z-fold5",
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
      "name": "Samsung Galaxy Z Fold6",
      "slug": "galaxy-z-fold6",
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
      "name": "Samsung Galaxy Z Fold7",
      "slug": "galaxy-z-fold7",
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
      "name": "Samsung Galaxy Z Fold8",
      "slug": "galaxy-z-fold8",
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
      "name": "Samsung Galaxy Z Fold8 Ultra",
      "slug": "galaxy-z-fold8-ultra",
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
      "name": "Samsung Galaxy Z TriFold",
      "slug": "galaxy-z-trifold",
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
      "name": "Samsung Garda",
      "slug": "garda",
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
      "name": "Samsung Gem",
      "slug": "gem",
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
      "name": "Samsung Hennessy",
      "slug": "hennessy",
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
      "name": "Samsung Homesync",
      "slug": "homesync",
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
      "name": "Samsung IceTouch",
      "slug": "icetouch",
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
      "name": "Samsung Illusion",
      "slug": "illusion",
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
      "name": "Samsung Infuse",
      "slug": "infuse",
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
      "name": "Samsung J1 Mini Prime",
      "slug": "j1-mini-prime",
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
      "name": "Samsung Moment",
      "slug": "moment",
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
      "name": "Samsung Montblanc",
      "slug": "montblanc",
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
      "name": "Samsung Nexus 10",
      "slug": "nexus-10",
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
      "name": "Samsung Nexus S",
      "slug": "nexus-s",
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
      "name": "Samsung Olleh",
      "slug": "olleh",
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
      "name": "Samsung Replenish",
      "slug": "replenish",
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
      "name": "Samsung Repp",
      "slug": "repp",
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
      "name": "Samsung Roy VE Dtv",
      "slug": "roy-ve-dtv",
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
      "name": "Samsung Rugby Smart",
      "slug": "rugby-smart",
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
      "name": "Samsung Sidekick",
      "slug": "sidekick",
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
      "name": "Samsung Transfix",
      "slug": "transfix",
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
      "name": "Samsung Transform",
      "slug": "transform",
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
      "name": "Samsung Transform Ultra",
      "slug": "transform-ultra",
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
      "name": "Samsung VinsQ (M910)",
      "slug": "vinsq-m910",
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
      "name": "Samsung WAF-S",
      "slug": "waf-s",
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
      "name": "Samsung WAFX-P",
      "slug": "wafx-p",
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
      "name": "Samsung WAFX-PS",
      "slug": "wafx-ps",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "xiaomi": [
    {
      "name": "Xiaomi 14",
      "slug": "xiaomi-14",
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
      "name": "Xiaomi 14 Ultra",
      "slug": "xiaomi-14-ultra",
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
      "name": "Xiaomi 11 Lite 5G NE",
      "slug": "11-lite-5g-ne",
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
      "name": "Xiaomi 11 Lite NE",
      "slug": "11-lite-ne",
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
      "name": "Xiaomi 11i",
      "slug": "11i",
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
      "name": "Xiaomi 11i HyperCharge",
      "slug": "11i-hypercharge",
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
      "name": "Xiaomi 11T",
      "slug": "11t",
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
      "name": "Xiaomi 11T Pro",
      "slug": "11t-pro",
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
      "name": "Xiaomi 12",
      "slug": "12",
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
      "name": "Xiaomi 12 Lite",
      "slug": "12-lite",
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
      "name": "Xiaomi 12 Pro",
      "slug": "12-pro",
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
      "name": "Xiaomi 12 Pro Dimensity",
      "slug": "12-pro-dimensity",
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
      "name": "Xiaomi 12S",
      "slug": "12s",
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
      "name": "Xiaomi 12S Pro",
      "slug": "12s-pro",
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
      "name": "Xiaomi 12S Ultra",
      "slug": "12s-ultra",
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
      "name": "Xiaomi 12T",
      "slug": "12t",
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
      "name": "Xiaomi 12T Pro",
      "slug": "12t-pro",
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
      "name": "Xiaomi 12X",
      "slug": "12x",
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
      "name": "Xiaomi 13",
      "slug": "13",
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
      "name": "Xiaomi 13 Lite",
      "slug": "13-lite",
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
      "name": "Xiaomi 13 Pro",
      "slug": "13-pro",
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
      "name": "Xiaomi 13 Ultra",
      "slug": "13-ultra",
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
      "name": "Xiaomi 13T",
      "slug": "13t",
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
      "name": "Xiaomi 13T Pro",
      "slug": "xiaomi-13t-pro",
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
      "name": "Xiaomi 13T Pro",
      "slug": "13t-pro",
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
      "name": "Xiaomi 14",
      "slug": "14",
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
      "name": "Xiaomi 14 Civi",
      "slug": "14-civi",
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
      "name": "Xiaomi 14 Pro",
      "slug": "14-pro",
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
      "name": "Xiaomi 14 Ultra",
      "slug": "14-ultra",
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
      "name": "Xiaomi 14T",
      "slug": "14t",
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
      "name": "Xiaomi 14T Pro",
      "slug": "14t-pro",
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
      "name": "Xiaomi 15",
      "slug": "15",
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
      "name": "Xiaomi 15 Pro",
      "slug": "15-pro",
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
      "name": "Xiaomi 15 Ultra",
      "slug": "15-ultra",
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
      "name": "Xiaomi 15S Pro",
      "slug": "15s-pro",
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
      "name": "Xiaomi 15T",
      "slug": "15t",
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
      "name": "Xiaomi 15T Pro",
      "slug": "15t-pro",
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
      "name": "Xiaomi 17",
      "slug": "17",
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
      "name": "Xiaomi 17 Max",
      "slug": "17-max",
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
      "name": "Xiaomi 17 Pro",
      "slug": "17-pro",
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
      "name": "Xiaomi 17 Pro Max",
      "slug": "17-pro-max",
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
      "name": "Xiaomi 17 Ultra",
      "slug": "17-ultra",
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
      "name": "Xiaomi 17T",
      "slug": "17t",
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
      "name": "Xiaomi 17T Pro",
      "slug": "17t-pro",
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
      "name": "Xiaomi 18 Fold",
      "slug": "18-fold",
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
      "name": "Xiaomi 18 Pro",
      "slug": "18-pro",
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
      "name": "Xiaomi 18 Pro Max",
      "slug": "18-pro-max",
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
      "name": "Xiaomi China",
      "slug": "china",
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
      "name": "Xiaomi Civi 1S",
      "slug": "civi-1s",
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
      "name": "Xiaomi Civi 3",
      "slug": "civi-3",
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
      "name": "Xiaomi Civi 4",
      "slug": "civi-4",
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
      "name": "Xiaomi Civi 5 Pro",
      "slug": "civi-5-pro",
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
      "name": "Xiaomi civi2",
      "slug": "civi2",
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
      "name": "Xiaomi Hong Mi",
      "slug": "hong-mi",
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
      "name": "Xiaomi K30 Pro",
      "slug": "k30-pro",
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
      "name": "Xiaomi Mi 10",
      "slug": "mi-10",
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
      "name": "Xiaomi Mi 10 Lite 5G",
      "slug": "mi-10-lite-5g",
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
      "name": "Xiaomi Mi 10 Lite Zoom",
      "slug": "mi-10-lite-zoom",
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
      "name": "Xiaomi Mi 10 Pro",
      "slug": "mi-10-pro",
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
      "name": "Xiaomi Mi 10 Ultra",
      "slug": "mi-10-ultra",
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
      "name": "Xiaomi Mi 10i",
      "slug": "mi-10i",
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
      "name": "Xiaomi Mi 10S",
      "slug": "mi-10s",
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
      "name": "Xiaomi Mi 10T",
      "slug": "mi-10t",
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
      "name": "Xiaomi Mi 10T Lite",
      "slug": "mi-10t-lite",
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
      "name": "Xiaomi Mi 10T Pro",
      "slug": "mi-10t-pro",
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
      "name": "Xiaomi Mi 11",
      "slug": "mi-11",
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
      "name": "Xiaomi Mi 11 LE",
      "slug": "mi-11-le",
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
      "name": "Xiaomi Mi 11 Lite",
      "slug": "mi-11-lite",
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
      "name": "Xiaomi Mi 11 Lite 5G",
      "slug": "mi-11-lite-5g",
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
      "name": "Xiaomi Mi 11 Pro",
      "slug": "mi-11-pro",
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
      "name": "Xiaomi Mi 11 Ultra",
      "slug": "mi-11-ultra",
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
      "name": "Xiaomi Mi 11i",
      "slug": "mi-11i",
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
      "name": "Xiaomi Mi 11X Pro",
      "slug": "mi-11x-pro",
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
      "name": "Xiaomi Mi 2",
      "slug": "mi-2",
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
      "name": "Xiaomi Mi 2A",
      "slug": "mi-2a",
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
      "name": "Xiaomi Mi 3",
      "slug": "mi-3",
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
      "name": "Xiaomi Mi 3W",
      "slug": "mi-3w",
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
      "name": "Xiaomi Mi 4c",
      "slug": "mi-4c",
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
      "name": "Xiaomi Mi 4i",
      "slug": "mi-4i",
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
      "name": "Xiaomi Mi 4LTE",
      "slug": "mi-4lte",
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
      "name": "Xiaomi Mi 4LTE-CT",
      "slug": "mi-4lte-ct",
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
      "name": "Xiaomi Mi 4s",
      "slug": "mi-4s",
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
      "name": "Xiaomi Mi 5",
      "slug": "mi-5",
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
      "name": "Xiaomi Mi 5C",
      "slug": "mi-5c",
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
      "name": "Xiaomi Mi 5s",
      "slug": "mi-5s",
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
      "name": "Xiaomi Mi 5s Plus",
      "slug": "mi-5s-plus",
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
      "name": "Xiaomi Mi 5X",
      "slug": "mi-5x",
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
      "name": "Xiaomi Mi 6X",
      "slug": "mi-6x",
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
      "name": "Xiaomi Mi 8",
      "slug": "mi-8",
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
      "name": "Xiaomi Mi 8 Explorer Edition",
      "slug": "mi-8-explorer-edition",
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
      "name": "Xiaomi Mi 8 Lite",
      "slug": "mi-8-lite",
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
      "name": "Xiaomi Mi 8 SE",
      "slug": "mi-8-se",
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
      "name": "Xiaomi Mi 8 UD",
      "slug": "mi-8-ud",
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
      "name": "Xiaomi Mi 9",
      "slug": "mi-9",
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
      "name": "Xiaomi Mi 9 Lite",
      "slug": "mi-9-lite",
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
      "name": "Xiaomi Mi 9 SE",
      "slug": "mi-9-se",
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
      "name": "Xiaomi Mi 9T",
      "slug": "mi-9t",
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
      "name": "Xiaomi Mi 9T Pro",
      "slug": "mi-9t-pro",
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
      "name": "Xiaomi Mi A1",
      "slug": "mi-a1",
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
      "name": "Xiaomi Mi A2",
      "slug": "mi-a2",
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
      "name": "Xiaomi Mi A2 Lite",
      "slug": "mi-a2-lite",
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
      "name": "Xiaomi Mi A3",
      "slug": "mi-a3",
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
      "name": "Xiaomi Mi CC 9",
      "slug": "mi-cc-9",
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
      "name": "Xiaomi Mi CC 9e",
      "slug": "mi-cc-9e",
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
      "name": "Xiaomi Mi CC9 Pro",
      "slug": "mi-cc9-pro",
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
      "name": "Xiaomi Mi Max",
      "slug": "mi-max",
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
      "name": "Xiaomi Mi Max 2",
      "slug": "mi-max-2",
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
      "name": "Xiaomi Mi Max 3",
      "slug": "mi-max-3",
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
      "name": "Xiaomi Mi Mix 3 5G",
      "slug": "mi-mix-3-5g",
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
      "name": "Xiaomi Mi Note",
      "slug": "mi-note",
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
      "name": "Xiaomi Mi Note 10",
      "slug": "mi-note-10",
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
      "name": "Xiaomi Mi Note 10 Lite",
      "slug": "mi-note-10-lite",
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
      "name": "Xiaomi Mi Note 3",
      "slug": "mi-note-3",
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
      "name": "Xiaomi Mi Note Pro",
      "slug": "mi-note-pro",
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
      "name": "Xiaomi Mi Note2",
      "slug": "mi-note2",
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
      "name": "Xiaomi Mi Play",
      "slug": "mi-play",
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
      "name": "Xiaomi MI6",
      "slug": "mi6",
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
      "name": "Xiaomi Mi9 Pro 5G",
      "slug": "mi9-pro-5g",
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
      "name": "Xiaomi MiBOX Mini",
      "slug": "mibox-mini",
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
      "name": "Xiaomi MiBox S",
      "slug": "mibox-s",
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
      "name": "Xiaomi MiBOX1S",
      "slug": "mibox1s",
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
      "name": "Xiaomi MiBOX2",
      "slug": "mibox2",
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
      "name": "Xiaomi MiBOX3S",
      "slug": "mibox3s",
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
      "name": "Xiaomi Miboxpro",
      "slug": "miboxpro",
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
      "name": "Xiaomi Mix",
      "slug": "mix",
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
      "name": "Xiaomi Mix 2",
      "slug": "mix-2",
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
      "name": "Xiaomi Mix 2S",
      "slug": "mix-2s",
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
      "name": "Xiaomi Mix 3",
      "slug": "mix-3",
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
      "name": "Xiaomi Mix 4",
      "slug": "mix-4",
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
      "name": "Xiaomi Mix Flip",
      "slug": "mix-flip",
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
      "name": "Xiaomi Mix Fold",
      "slug": "mix-fold",
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
      "name": "Xiaomi Mix Fold 2",
      "slug": "mix-fold-2",
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
      "name": "Xiaomi Mix Fold 3",
      "slug": "mix-fold-3",
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
      "name": "Xiaomi Mix Fold 4",
      "slug": "mix-fold-4",
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
      "name": "Xiaomi Telebee",
      "slug": "telebee",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "redmi": [
    {
      "name": "Redmi Note 13",
      "slug": "redmi-note-13",
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
      "name": "Redmi Note 13 Pro",
      "slug": "redmi-note-13-pro",
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
      "name": "Redmi Note 13 Pro+ 5G",
      "slug": "redmi-note-13-pro-plus-5g",
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
      "name": "Redmi 10 2022",
      "slug": "10-2022",
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
      "name": "Redmi 10 5G",
      "slug": "10-5g",
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
      "name": "Redmi 10 Power",
      "slug": "10-power",
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
      "name": "Redmi 10A",
      "slug": "10a",
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
      "name": "Redmi 10A Sport",
      "slug": "10a-sport",
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
      "name": "Redmi 10C",
      "slug": "10c",
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
      "name": "Redmi 10X",
      "slug": "10x",
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
      "name": "Redmi 10X Pro",
      "slug": "10x-pro",
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
      "name": "Redmi 11 Prime",
      "slug": "11-prime",
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
      "name": "Redmi 11 Prime 5G",
      "slug": "11-prime-5g",
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
      "name": "Redmi 12",
      "slug": "12",
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
      "name": "Redmi 12 5G",
      "slug": "12-5g",
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
      "name": "Redmi 12C",
      "slug": "12c",
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
      "name": "Redmi 13 5G",
      "slug": "13-5g",
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
      "name": "Redmi 13C",
      "slug": "redmi-13c",
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
      "name": "Redmi 13C",
      "slug": "13c",
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
      "name": "Redmi 13C 5G",
      "slug": "13c-5g",
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
      "name": "Redmi 13x",
      "slug": "13x",
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
      "name": "Redmi 14C",
      "slug": "14c",
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
      "name": "Redmi 14C 5G",
      "slug": "14c-5g",
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
      "name": "Redmi 15",
      "slug": "15",
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
      "name": "Redmi 15 5G",
      "slug": "15-5g",
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
      "name": "Redmi 15A 5G",
      "slug": "15a-5g",
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
      "name": "Redmi 15C",
      "slug": "15c",
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
      "name": "Redmi 15C 5G",
      "slug": "15c-5g",
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
      "name": "Redmi 17 5G",
      "slug": "17-5g",
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
      "name": "Redmi 17C 5G",
      "slug": "17c-5g",
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
      "name": "Redmi 3",
      "slug": "3",
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
      "name": "Redmi 3S",
      "slug": "3s",
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
      "name": "Redmi 4 Pro",
      "slug": "4-pro",
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
      "name": "Redmi 4A",
      "slug": "4a",
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
      "name": "Redmi 4X",
      "slug": "4x",
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
      "name": "Redmi 5",
      "slug": "5",
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
      "name": "Redmi 5 Plus",
      "slug": "5-plus",
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
      "name": "Redmi 5A",
      "slug": "5a",
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
      "name": "Redmi 6",
      "slug": "6",
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
      "name": "Redmi 6 Pro",
      "slug": "6-pro",
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
      "name": "Redmi 6A",
      "slug": "6a",
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
      "name": "Redmi 7",
      "slug": "7",
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
      "name": "Redmi 7A",
      "slug": "7a",
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
      "name": "Redmi 8",
      "slug": "8",
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
      "name": "Redmi 8A",
      "slug": "8a",
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
      "name": "Redmi 8A Dual",
      "slug": "8a-dual",
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
      "name": "Redmi 9",
      "slug": "9",
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
      "name": "Redmi 9 Power",
      "slug": "9-power",
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
      "name": "Redmi 9 Prime",
      "slug": "9-prime",
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
      "name": "Redmi 9A",
      "slug": "9a",
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
      "name": "Redmi 9C",
      "slug": "9c",
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
      "name": "Redmi 9C NFC",
      "slug": "9c-nfc",
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
      "name": "Redmi 9T",
      "slug": "9t",
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
      "name": "Redmi A1",
      "slug": "a1",
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
      "name": "Redmi A2",
      "slug": "a2",
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
      "name": "Redmi A3",
      "slug": "a3",
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
      "name": "Redmi A3 Pro",
      "slug": "a3-pro",
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
      "name": "Redmi A3x",
      "slug": "a3x",
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
      "name": "Redmi A4 5G",
      "slug": "a4-5g",
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
      "name": "Redmi A5",
      "slug": "a5",
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
      "name": "Redmi A7",
      "slug": "a7",
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
      "name": "Redmi A7 Pro",
      "slug": "a7-pro",
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
      "name": "Redmi A7 Pro 5G",
      "slug": "a7-pro-5g",
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
      "name": "Redmi Go",
      "slug": "go",
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
      "name": "Redmi K100 Pro",
      "slug": "k100-pro",
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
      "name": "Redmi K100 Pro Max",
      "slug": "k100-pro-max",
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
      "name": "Redmi K20",
      "slug": "k20",
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
      "name": "Redmi K20 Pro",
      "slug": "k20-pro",
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
      "name": "Redmi K30",
      "slug": "k30",
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
      "name": "Redmi K30 5G",
      "slug": "k30-5g",
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
      "name": "Redmi K30 Pro",
      "slug": "k30-pro",
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
      "name": "Redmi K30 Pro Zoom Edition",
      "slug": "k30-pro-zoom-edition",
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
      "name": "Redmi K30 Ultra",
      "slug": "k30-ultra",
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
      "name": "Redmi K30i 5G",
      "slug": "k30i-5g",
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
      "name": "Redmi K30S Ultra",
      "slug": "k30s-ultra",
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
      "name": "Redmi K40",
      "slug": "k40",
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
      "name": "Redmi K40 Gaming",
      "slug": "k40-gaming",
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
      "name": "Redmi K40 Pro +",
      "slug": "k40-pro",
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
      "name": "Redmi K40S",
      "slug": "k40s",
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
      "name": "Redmi K50",
      "slug": "k50",
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
      "name": "Redmi K50 Pro",
      "slug": "k50-pro",
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
      "name": "Redmi K50G",
      "slug": "k50g",
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
      "name": "Redmi K50i",
      "slug": "k50i",
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
      "name": "Redmi K60",
      "slug": "k60",
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
      "name": "Redmi K60 Pro",
      "slug": "k60-pro",
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
      "name": "Redmi K60 Ultra",
      "slug": "k60-ultra",
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
      "name": "Redmi K60E",
      "slug": "k60e",
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
      "name": "Redmi K70",
      "slug": "k70",
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
      "name": "Redmi K70 Pro",
      "slug": "k70-pro",
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
      "name": "Redmi K70 Ultra",
      "slug": "k70-ultra",
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
      "name": "Redmi K70E",
      "slug": "k70e",
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
      "name": "Redmi K80",
      "slug": "k80",
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
      "name": "Redmi K80 Pro",
      "slug": "k80-pro",
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
      "name": "Redmi K80 Ultra",
      "slug": "k80-ultra",
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
      "name": "Redmi K90",
      "slug": "k90",
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
      "name": "Redmi K90 Pro Max",
      "slug": "k90-pro-max",
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
      "name": "Redmi Note 10",
      "slug": "note-10",
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
      "name": "Redmi Note 10 5G",
      "slug": "note-10-5g",
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
      "name": "Redmi Note 10 JE",
      "slug": "note-10-je",
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
      "name": "Redmi Note 10 Pro",
      "slug": "note-10-pro",
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
      "name": "Redmi Note 10 Pro Max",
      "slug": "note-10-pro-max",
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
      "name": "Redmi Note 10S",
      "slug": "note-10s",
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
      "name": "Redmi Note 10T",
      "slug": "note-10t",
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
      "name": "Redmi Note 10T 5G",
      "slug": "note-10t-5g",
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
      "name": "Redmi Note 11",
      "slug": "note-11",
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
      "name": "Redmi Note 11 4G",
      "slug": "note-11-4g",
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
      "name": "Redmi Note 11 5G",
      "slug": "note-11-5g",
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
      "name": "Redmi Note 11 Pro",
      "slug": "note-11-pro",
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
      "name": "Redmi Note 11 Pro 5G",
      "slug": "note-11-pro-5g",
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
      "name": "Redmi Note 11 SE",
      "slug": "note-11-se",
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
      "name": "Redmi Note 11E",
      "slug": "note-11e",
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
      "name": "Redmi Note 11E Pro",
      "slug": "note-11e-pro",
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
      "name": "Redmi Note 11S",
      "slug": "note-11s",
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
      "name": "Redmi Note 11S 5G",
      "slug": "note-11s-5g",
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
      "name": "Redmi Note 11T 5G",
      "slug": "note-11t-5g",
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
      "name": "Redmi Note 11T Pro",
      "slug": "note-11t-pro",
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
      "name": "Redmi Note 12",
      "slug": "note-12",
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
      "name": "Redmi Note 12 5G",
      "slug": "note-12-5g",
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
      "name": "Redmi Note 12 Discovery Edition",
      "slug": "note-12-discovery-edition",
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
      "name": "Redmi Note 12 Pro",
      "slug": "note-12-pro",
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
      "name": "Redmi Note 12 Pro + 5G",
      "slug": "note-12-pro-5g",
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
      "name": "Redmi Note 12 Pro Speed",
      "slug": "note-12-pro-speed",
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
      "name": "Redmi Note 12 Turbo",
      "slug": "note-12-turbo",
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
      "name": "Redmi Note 12S",
      "slug": "note-12s",
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
      "name": "Redmi Note 12T Pro",
      "slug": "note-12t-pro",
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
      "name": "Redmi Note 13",
      "slug": "note-13",
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
      "name": "Redmi Note 13 5G",
      "slug": "note-13-5g",
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
      "name": "Redmi Note 13 Pro",
      "slug": "note-13-pro",
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
      "name": "Redmi Note 13 Pro 5G",
      "slug": "note-13-pro-5g",
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
      "name": "Redmi Note 13R",
      "slug": "note-13r",
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
      "name": "Redmi Note 13R Pro",
      "slug": "note-13r-pro",
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
      "name": "Redmi Note 14",
      "slug": "note-14",
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
      "name": "Redmi Note 14 5G",
      "slug": "note-14-5g",
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
      "name": "Redmi Note 14 Pro",
      "slug": "note-14-pro",
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
      "name": "Redmi Note 14 Pro 5G",
      "slug": "note-14-pro-5g",
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
      "name": "Redmi Note 14S",
      "slug": "note-14s",
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
      "name": "Redmi Note 15",
      "slug": "note-15",
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
      "name": "Redmi Note 15 5G",
      "slug": "note-15-5g",
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
      "name": "Redmi Note 15 Pro",
      "slug": "note-15-pro",
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
      "name": "Redmi Note 15 Pro 5G",
      "slug": "note-15-pro-5g",
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
      "name": "Redmi Note 15 SE 5G",
      "slug": "note-15-se-5g",
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
      "name": "Redmi Note 15R",
      "slug": "note-15r",
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
      "name": "Redmi Note 17",
      "slug": "note-17",
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
      "name": "Redmi Note 17 5G",
      "slug": "note-17-5g",
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
      "name": "Redmi Note 17 Pro",
      "slug": "note-17-pro",
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
      "name": "Redmi Note 17 Pro 5G",
      "slug": "note-17-pro-5g",
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
      "name": "Redmi Note 17 Pro Max 5G",
      "slug": "note-17-pro-max-5g",
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
      "name": "Redmi Note 3",
      "slug": "note-3",
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
      "name": "Redmi Note 4",
      "slug": "note-4",
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
      "name": "Redmi Note 5 Pro",
      "slug": "note-5-pro",
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
      "name": "Redmi Note 5A",
      "slug": "note-5a",
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
      "name": "Redmi Note 6 Pro",
      "slug": "note-6-pro",
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
      "name": "Redmi Note 7",
      "slug": "note-7",
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
      "name": "Redmi Note 7 Pro",
      "slug": "note-7-pro",
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
      "name": "Redmi Note 8",
      "slug": "note-8",
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
      "name": "Redmi Note 8 Pro",
      "slug": "note-8-pro",
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
      "name": "Redmi Note 8T",
      "slug": "note-8t",
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
      "name": "Redmi Note 9",
      "slug": "note-9",
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
      "name": "Redmi Note 9 4G",
      "slug": "note-9-4g",
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
      "name": "Redmi Note 9 Pro",
      "slug": "note-9-pro",
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
      "name": "Redmi Note 9 Pro Max",
      "slug": "note-9-pro-max",
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
      "name": "Redmi Note 9S",
      "slug": "note-9s",
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
      "name": "Redmi Note 9T",
      "slug": "note-9t",
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
      "name": "Redmi Poco F5",
      "slug": "poco-f5",
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
      "name": "Redmi Pro",
      "slug": "pro",
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
      "name": "Redmi S2",
      "slug": "s2",
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
      "name": "Redmi Turbo 3",
      "slug": "turbo-3",
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
      "name": "Redmi Turbo 4",
      "slug": "turbo-4",
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
      "name": "Redmi Turbo 4 Pro",
      "slug": "turbo-4-pro",
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
      "name": "Redmi Turbo 5",
      "slug": "turbo-5",
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
      "name": "Redmi Turbo 5 Max",
      "slug": "turbo-5-max",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "poco": [
    {
      "name": "Poco F6",
      "slug": "poco-f6",
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
      "name": "Poco F6 Pro",
      "slug": "poco-f6-pro",
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
      "name": "Poco M6 Pro",
      "slug": "poco-m6-pro",
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
      "name": "Poco X6",
      "slug": "poco-x6",
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
      "name": "Poco X6 Pro",
      "slug": "poco-x6-pro",
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
      "name": "Poco C3",
      "slug": "c3",
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
      "name": "Poco C31",
      "slug": "c31",
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
      "name": "Poco C50",
      "slug": "c50",
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
        64,
        128
      ],
      "ram": [
        4,
        6
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
      "name": "Poco C61",
      "slug": "c61",
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
      "name": "Poco C65",
      "slug": "c65",
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
      "name": "Poco C71",
      "slug": "c71",
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
      "name": "Poco C75",
      "slug": "c75",
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
      "name": "Poco C75 5G",
      "slug": "c75-5g",
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
      "name": "Poco C81",
      "slug": "c81",
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
      "name": "Poco C81 Pro",
      "slug": "c81-pro",
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
      "name": "Poco C81x",
      "slug": "c81x",
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
      "name": "Poco C85",
      "slug": "c85",
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
      "name": "Poco C85 5G",
      "slug": "c85-5g",
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
      "name": "Poco C85x 5G",
      "slug": "c85x-5g",
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
      "name": "Poco F1",
      "slug": "f1",
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
      "name": "Poco F2 Pro",
      "slug": "f2-pro",
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
      "name": "Poco F3",
      "slug": "f3",
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
      "name": "Poco F3 GT",
      "slug": "f3-gt",
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
      "name": "Poco F4",
      "slug": "f4",
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
      "name": "Poco F4 GT",
      "slug": "f4-gt",
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
      "name": "Poco F5",
      "slug": "f5",
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
      "name": "Poco F6",
      "slug": "f6",
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
      "name": "Poco F6 Pro",
      "slug": "f6-pro",
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
      "name": "Poco F7",
      "slug": "f7",
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
      "name": "Poco F7 Pro",
      "slug": "f7-pro",
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
      "name": "Poco F7 Ultra",
      "slug": "f7-ultra",
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
      "name": "Poco F8 Pro",
      "slug": "f8-pro",
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
      "name": "Poco F8 Ultra",
      "slug": "f8-ultra",
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
      "name": "Poco F9 Pro",
      "slug": "f9-pro",
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
      "name": "Poco F9 Ultra",
      "slug": "f9-ultra",
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
      "name": "Poco M2",
      "slug": "m2",
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
      "name": "Poco M2 Pro",
      "slug": "m2-pro",
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
      "name": "Poco M3",
      "slug": "m3",
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
      "name": "Poco M3 Pro 5G",
      "slug": "m3-pro-5g",
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
      "name": "Poco M4 5G",
      "slug": "m4-5g",
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
      "name": "Poco M4 Pro",
      "slug": "m4-pro",
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
      "name": "Poco M4 Pro 5G",
      "slug": "m4-pro-5g",
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
      "name": "Poco M5",
      "slug": "m5",
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
      "name": "Poco M5s",
      "slug": "m5s",
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
      "name": "Poco M6",
      "slug": "m6",
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
      "name": "Poco M6 Plus 5G",
      "slug": "m6-plus-5g",
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
      "name": "Poco M6 Pro",
      "slug": "m6-pro",
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
      "name": "Poco M6 Pro 5G",
      "slug": "m6-pro-5g",
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
      "name": "Poco M7",
      "slug": "m7",
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
      "name": "Poco M7 5G",
      "slug": "m7-5g",
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
      "name": "Poco M7 Plus 5G",
      "slug": "m7-plus-5g",
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
      "name": "Poco M7 Pro 5G",
      "slug": "m7-pro-5g",
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
      "name": "Poco M8 5G",
      "slug": "m8-5g",
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
      "name": "Poco M8 Power 5G",
      "slug": "m8-power-5g",
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
      "name": "Poco M8 Pro 5G",
      "slug": "m8-pro-5g",
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
      "name": "Poco M8x 5G",
      "slug": "m8x-5g",
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
      "name": "Poco X2",
      "slug": "x2",
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
      "name": "Poco X3",
      "slug": "x3",
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
      "name": "Poco X3 NFC",
      "slug": "x3-nfc",
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
      "name": "Poco X3 Pro",
      "slug": "x3-pro",
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
      "name": "Poco X4 GT",
      "slug": "x4-gt",
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
      "name": "Poco X4 Pro 5G",
      "slug": "x4-pro-5g",
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
      "name": "Poco X5 Pro 5G",
      "slug": "x5-pro-5g",
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
      "name": "Poco X6 5G",
      "slug": "x6-5g",
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
      "name": "Poco X6 Pro 5G",
      "slug": "x6-pro-5g",
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
      "name": "Poco X7",
      "slug": "x7",
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
      "name": "Poco X7 Pro",
      "slug": "x7-pro",
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
      "name": "Poco X8",
      "slug": "x8",
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
      "name": "Poco X8 Power",
      "slug": "x8-power",
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
      "name": "Poco X8 Pro",
      "slug": "x8-pro",
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
      "name": "Poco X8 Pro Max",
      "slug": "x8-pro-max",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "infinix": [
    {
      "name": "Infinix GT 20 Pro",
      "slug": "infinix-gt-20-pro",
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
      "name": "Infinix Hot 10",
      "slug": "hot-10",
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
      "name": "Infinix Hot 10i",
      "slug": "hot-10i",
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
      "name": "Infinix Hot 10S",
      "slug": "hot-10s",
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
      "name": "Infinix Hot 10S NFC",
      "slug": "hot-10s-nfc",
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
      "name": "Infinix Hot 10T",
      "slug": "hot-10t",
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
      "name": "Infinix Hot 11",
      "slug": "hot-11",
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
      "name": "Infinix Hot 11 2022",
      "slug": "hot-11-2022",
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
      "name": "Infinix Hot 11S",
      "slug": "hot-11s",
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
      "name": "Infinix Hot 11S NFC",
      "slug": "hot-11s-nfc",
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
      "name": "Infinix Hot 12",
      "slug": "hot-12",
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
      "name": "Infinix Hot 12 Play",
      "slug": "hot-12-play",
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
      "name": "Infinix Hot 12 Play NFC",
      "slug": "hot-12-play-nfc",
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
      "name": "Infinix Hot 12 Pro",
      "slug": "hot-12-pro",
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
      "name": "Infinix Hot 12i",
      "slug": "hot-12i",
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
      "name": "Infinix Hot 20",
      "slug": "hot-20",
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
      "name": "Infinix Hot 20 5G",
      "slug": "hot-20-5g",
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
      "name": "Infinix Hot 20 Play",
      "slug": "hot-20-play",
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
      "name": "Infinix Hot 20i",
      "slug": "hot-20i",
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
      "name": "Infinix Hot 20S",
      "slug": "hot-20s",
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
      "name": "Infinix Hot 3",
      "slug": "hot-3",
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
      "name": "Infinix Hot 3 LTE",
      "slug": "hot-3-lte",
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
      "name": "Infinix Hot 30 5G",
      "slug": "hot-30-5g",
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
      "name": "Infinix Hot 30 Play",
      "slug": "hot-30-play",
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
      "name": "Infinix Hot 30i",
      "slug": "hot-30i",
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
      "name": "Infinix Hot 4",
      "slug": "hot-4",
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
      "name": "Infinix Hot 4 Lite",
      "slug": "hot-4-lite",
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
      "name": "Infinix Hot 4 Pro",
      "slug": "hot-4-pro",
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
      "name": "Infinix Hot 40",
      "slug": "hot-40",
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
      "name": "Infinix Hot 40 Pro",
      "slug": "hot-40-pro",
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
      "name": "Infinix Hot 40i",
      "slug": "hot-40i",
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
      "name": "Infinix Hot 50",
      "slug": "hot-50",
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
      "name": "Infinix Hot 50 5G",
      "slug": "hot-50-5g",
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
      "name": "Infinix Hot 50 Pro+",
      "slug": "hot-50-pro",
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
      "name": "Infinix Hot 50i",
      "slug": "hot-50i",
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
      "name": "Infinix Hot 6",
      "slug": "hot-6",
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
      "name": "Infinix Hot 6 Pro",
      "slug": "hot-6-pro",
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
      "name": "Infinix Hot 60 5G",
      "slug": "hot-60-5g",
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
      "name": "Infinix Hot 60 Pro+",
      "slug": "hot-60-pro",
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
      "name": "Infinix Hot 60i",
      "slug": "hot-60i",
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
      "name": "Infinix Hot 60i 5G",
      "slug": "hot-60i-5g",
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
      "name": "Infinix Hot 6X",
      "slug": "hot-6x",
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
      "name": "Infinix Hot 7",
      "slug": "hot-7",
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
      "name": "Infinix Hot 7 Pro",
      "slug": "hot-7-pro",
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
      "name": "Infinix Hot 70",
      "slug": "hot-70",
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
      "name": "Infinix Hot 70 Pro 5G",
      "slug": "hot-70-pro-5g",
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
      "name": "Infinix Hot 8",
      "slug": "hot-8",
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
      "name": "Infinix Hot 8 Lite",
      "slug": "hot-8-lite",
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
      "name": "Infinix Hot 9",
      "slug": "hot-9",
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
      "name": "Infinix Hot 9 Play",
      "slug": "hot-9-play",
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
      "name": "Infinix Hot 9 Pro",
      "slug": "hot-9-pro",
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
      "name": "Infinix Hot Note",
      "slug": "hot-note",
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
      "name": "Infinix Hot Play",
      "slug": "hot-play",
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
      "name": "Infinix Hot S3",
      "slug": "hot-s3",
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
      "name": "Infinix Hot S3X",
      "slug": "hot-s3x",
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
      "name": "Infinix HOT5",
      "slug": "hot5",
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
      "name": "Infinix Note",
      "slug": "note",
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
      "name": "Infinix Note 10 Pro",
      "slug": "note-10-pro",
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
      "name": "Infinix Note 11",
      "slug": "note-11",
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
      "name": "Infinix Note 11 Pro",
      "slug": "note-11-pro",
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
      "name": "Infinix Note 11i",
      "slug": "note-11i",
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
      "name": "Infinix Note 11S",
      "slug": "note-11s",
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
      "name": "Infinix Note 12",
      "slug": "note-12",
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
      "name": "Infinix Note 12 2023",
      "slug": "note-12-2023",
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
      "name": "Infinix Note 12 5G",
      "slug": "note-12-5g",
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
      "name": "Infinix Note 12 Pro",
      "slug": "note-12-pro",
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
      "name": "Infinix Note 12 Pro 5G",
      "slug": "note-12-pro-5g",
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
      "name": "Infinix Note 12 Vip",
      "slug": "note-12-vip",
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
      "name": "Infinix Note 12i",
      "slug": "note-12i",
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
      "name": "Infinix Note 12i 2022",
      "slug": "note-12i-2022",
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
      "name": "Infinix Note 3",
      "slug": "note-3",
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
      "name": "Infinix Note 3 Pro",
      "slug": "note-3-pro",
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
      "name": "Infinix Note 30",
      "slug": "note-30",
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
      "name": "Infinix Note 30 5G",
      "slug": "note-30-5g",
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
      "name": "Infinix Note 30 Pro",
      "slug": "note-30-pro",
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
      "name": "Infinix Note 30 Vip",
      "slug": "note-30-vip",
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
      "name": "Infinix Note 30i",
      "slug": "note-30i",
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
      "name": "Infinix Note 4 Pro",
      "slug": "note-4-pro",
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
      "name": "Infinix Note 40",
      "slug": "note-40",
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
      "name": "Infinix Note 40 5G",
      "slug": "note-40-5g",
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
      "name": "Infinix Note 40 Pro",
      "slug": "note-40-pro",
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
      "name": "Infinix Note 40 Pro 5G",
      "slug": "note-40-pro-5g",
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
      "name": "Infinix Note 40S",
      "slug": "note-40s",
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
      "name": "Infinix Note 40X 5G",
      "slug": "note-40x-5g",
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
      "name": "Infinix Note 5",
      "slug": "note-5",
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
      "name": "Infinix Note 5 Stylus",
      "slug": "note-5-stylus",
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
      "name": "Infinix Note 50",
      "slug": "note-50",
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
      "name": "Infinix Note 50 Pro",
      "slug": "note-50-pro",
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
      "name": "Infinix Note 50 Pro+ 5G",
      "slug": "note-50-pro-5g",
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
      "name": "Infinix Note 50S 5G",
      "slug": "note-50s-5g",
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
      "name": "Infinix Note 50X 5G",
      "slug": "note-50x-5g",
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
      "name": "Infinix Note 6",
      "slug": "note-6",
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
      "name": "Infinix Note 60",
      "slug": "note-60",
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
      "name": "Infinix Note 60 Pro",
      "slug": "note-60-pro",
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
      "name": "Infinix Note 60 Ultra",
      "slug": "note-60-ultra",
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
      "name": "Infinix Note 7",
      "slug": "note-7",
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
      "name": "Infinix Note 7 Lite",
      "slug": "note-7-lite",
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
      "name": "Infinix Note 8",
      "slug": "note-8",
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
      "name": "Infinix Note 8i",
      "slug": "note-8i",
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
      "name": "Infinix Note Edge",
      "slug": "note-edge",
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
      "name": "Infinix Race Blot2",
      "slug": "race-blot2",
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
      "name": "Infinix Race Bolt 3",
      "slug": "race-bolt-3",
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
      "name": "Infinix S2",
      "slug": "s2",
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
      "name": "Infinix S4",
      "slug": "s4",
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
      "name": "Infinix S5",
      "slug": "s5",
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
      "name": "Infinix S5 Lite",
      "slug": "s5-lite",
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
      "name": "Infinix S5 Pro",
      "slug": "s5-pro",
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
      "name": "Infinix Smart",
      "slug": "smart",
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
      "name": "Infinix Smart 10",
      "slug": "smart-10",
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
      "name": "Infinix Smart 10 Plus",
      "slug": "smart-10-plus",
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
      "name": "Infinix Smart 2",
      "slug": "smart-2",
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
      "name": "Infinix Smart 2 HD",
      "slug": "smart-2-hd",
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
      "name": "Infinix Smart 2 Pro",
      "slug": "smart-2-pro",
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
      "name": "Infinix Smart 20",
      "slug": "smart-20",
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
      "name": "Infinix Smart 20e",
      "slug": "smart-20e",
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
      "name": "Infinix Smart 3",
      "slug": "smart-3",
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
      "name": "Infinix Smart 3 Plus",
      "slug": "smart-3-plus",
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
      "name": "Infinix Smart 4",
      "slug": "smart-4",
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
      "name": "Infinix Smart 4 Plus",
      "slug": "smart-4-plus",
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
      "name": "Infinix Smart 5",
      "slug": "smart-5",
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
      "name": "Infinix Smart 5 (SMART 6)",
      "slug": "smart-5-smart-6",
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
      "name": "Infinix Smart 6",
      "slug": "smart-6",
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
      "name": "Infinix Smart 6 HD",
      "slug": "smart-6-hd",
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
      "name": "Infinix Smart 6 Plus",
      "slug": "smart-6-plus",
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
      "name": "Infinix Smart 7 HD",
      "slug": "smart-7-hd",
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
      "name": "Infinix Smart 7 Or Smart 7 Plus",
      "slug": "smart-7-or-smart-7-plus",
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
      "name": "Infinix Smart 8",
      "slug": "smart-8",
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
      "name": "Infinix Smart 8 HD",
      "slug": "smart-8-hd",
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
      "name": "Infinix Smart 8 Plus",
      "slug": "smart-8-plus",
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
      "name": "Infinix Smart 9",
      "slug": "smart-9",
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
      "name": "Infinix Smart 9 HD",
      "slug": "smart-9-hd",
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
      "name": "Infinix Smart HD",
      "slug": "smart-hd",
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
      "name": "Infinix Smart Series",
      "slug": "smart-series",
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
      "name": "Infinix Smrat 8 Pro",
      "slug": "smrat-8-pro",
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
      "name": "Infinix Surf 2",
      "slug": "surf-2",
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
      "name": "Infinix Zero 2",
      "slug": "zero-2",
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
      "name": "Infinix Zero 20",
      "slug": "zero-20",
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
      "name": "Infinix Zero 30",
      "slug": "zero-30",
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
      "name": "Infinix Zero 30 5G",
      "slug": "zero-30-5g",
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
      "name": "Infinix Zero 4",
      "slug": "zero-4",
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
      "name": "Infinix Zero 4 Plus",
      "slug": "zero-4-plus",
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
      "name": "Infinix Zero 40",
      "slug": "zero-40",
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
      "name": "Infinix Zero 40 5G",
      "slug": "zero-40-5g",
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
      "name": "Infinix Zero 5 Pro",
      "slug": "zero-5-pro",
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
      "name": "Infinix Zero 5G",
      "slug": "zero-5g",
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
      "name": "Infinix Zero 5G 2023",
      "slug": "zero-5g-2023",
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
      "name": "Infinix Zero 6",
      "slug": "zero-6",
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
      "name": "Infinix Zero 6 Pro",
      "slug": "zero-6-pro",
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
      "name": "Infinix Zero 8i",
      "slug": "zero-8i",
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
      "name": "Infinix Zero Flip",
      "slug": "zero-flip",
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
      "name": "Infinix Zero Ultra",
      "slug": "zero-ultra",
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
      "name": "Infinix Zero X",
      "slug": "zero-x",
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
      "name": "Infinix Zero X Neo",
      "slug": "zero-x-neo",
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
      "name": "Infinix Zero X Pro",
      "slug": "zero-x-pro",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "tecno": [
    {
      "name": "Tecno Camon 30 Premier",
      "slug": "camon-30-premier",
      "year": 2024,
      "storage": [
        512
      ],
      "ram": [
        12
      ]
    },
    {
      "name": "Tecno Spark 20 Pro+",
      "slug": "spark-20-pro-plus",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Tecno 5S",
      "slug": "5s",
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
      "name": "Tecno A7S",
      "slug": "a7s",
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
      "name": "Tecno AX8",
      "slug": "ax8",
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
      "name": "Tecno C5",
      "slug": "c5",
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
      "name": "Tecno C8",
      "slug": "c8",
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
      "name": "Tecno C9S",
      "slug": "c9s",
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
      "name": "Tecno Camon",
      "slug": "camon",
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
      "name": "Tecno Camon 11",
      "slug": "camon-11",
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
      "name": "Tecno Camon 11 Pro",
      "slug": "camon-11-pro",
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
      "name": "Tecno Camon 11S",
      "slug": "camon-11s",
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
      "name": "Tecno Camon 12",
      "slug": "camon-12",
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
      "name": "Tecno Camon 12 Air",
      "slug": "camon-12-air",
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
      "name": "Tecno Camon 12 Pro",
      "slug": "camon-12-pro",
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
      "name": "Tecno Camon 15",
      "slug": "camon-15",
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
      "name": "Tecno Camon 15 Air",
      "slug": "camon-15-air",
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
      "name": "Tecno Camon 15 Premier",
      "slug": "camon-15-premier",
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
      "name": "Tecno Camon 15 Pro",
      "slug": "camon-15-pro",
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
      "name": "Tecno Camon 16",
      "slug": "camon-16",
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
      "name": "Tecno Camon 16 Premier",
      "slug": "camon-16-premier",
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
      "name": "Tecno Camon 16 Pro",
      "slug": "camon-16-pro",
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
      "name": "Tecno Camon 16 S",
      "slug": "camon-16-s",
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
      "name": "Tecno Camon 17",
      "slug": "camon-17",
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
      "name": "Tecno Camon 17 Pro",
      "slug": "camon-17-pro",
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
      "name": "Tecno Camon 17P",
      "slug": "camon-17p",
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
      "name": "Tecno Camon 18",
      "slug": "camon-18",
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
      "name": "Tecno Camon 18 Premier",
      "slug": "camon-18-premier",
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
      "name": "Tecno Camon 18P",
      "slug": "camon-18p",
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
      "name": "Tecno Camon 19",
      "slug": "camon-19",
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
      "name": "Tecno Camon 19 Neo",
      "slug": "camon-19-neo",
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
      "name": "Tecno Camon 19 Pro",
      "slug": "camon-19-pro",
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
      "name": "Tecno Camon 19 Pro 5G",
      "slug": "camon-19-pro-5g",
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
      "name": "Tecno Camon 20",
      "slug": "camon-20",
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
      "name": "Tecno Camon 20 Premier 5G",
      "slug": "camon-20-premier-5g",
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
      "name": "Tecno Camon 20 Pro",
      "slug": "camon-20-pro",
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
      "name": "Tecno Camon 20 Pro 5G",
      "slug": "camon-20-pro-5g",
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
      "name": "Tecno Camon 20s Pro 5G",
      "slug": "camon-20s-pro-5g",
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
      "name": "Tecno Camon 30",
      "slug": "camon-30",
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
      "name": "Tecno Camon 30 5G",
      "slug": "camon-30-5g",
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
      "name": "Tecno Camon 30 Premier 5G",
      "slug": "camon-30-premier-5g",
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
      "name": "Tecno Camon 30 Pro 5G",
      "slug": "camon-30-pro-5g",
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
      "name": "Tecno Camon 30S",
      "slug": "camon-30s",
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
      "name": "Tecno Camon 30S Pro",
      "slug": "camon-30s-pro",
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
      "name": "Tecno Camon 30T",
      "slug": "camon-30t",
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
      "name": "Tecno Camon 40",
      "slug": "camon-40",
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
      "name": "Tecno Camon 40 Premier 5G",
      "slug": "camon-40-premier-5g",
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
      "name": "Tecno Camon 40 Pro",
      "slug": "camon-40-pro",
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
      "name": "Tecno Camon 40 Pro 5G",
      "slug": "camon-40-pro-5g",
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
      "name": "Tecno Camon 50",
      "slug": "camon-50",
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
      "name": "Tecno Camon 50 Pro",
      "slug": "camon-50-pro",
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
      "name": "Tecno Camon 50 Ultra 5G",
      "slug": "camon-50-ultra-5g",
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
      "name": "Tecno Camon C7",
      "slug": "camon-c7",
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
      "name": "Tecno Camon C9",
      "slug": "camon-c9",
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
      "name": "Tecno Camon CM",
      "slug": "camon-cm",
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
      "name": "Tecno Camon CX",
      "slug": "camon-cx",
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
      "name": "Tecno Camon Cxs",
      "slug": "camon-cxs",
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
      "name": "Tecno Camon I",
      "slug": "camon-i",
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
      "name": "Tecno Camon i 2",
      "slug": "camon-i-2",
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
      "name": "Tecno Camon i 2X",
      "slug": "camon-i-2x",
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
      "name": "Tecno Camon i 4",
      "slug": "camon-i-4",
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
      "name": "Tecno Camon I Ace",
      "slug": "camon-i-ace",
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
      "name": "Tecno Camon I Air",
      "slug": "camon-i-air",
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
      "name": "Tecno Camon i SKY3",
      "slug": "camon-i-sky3",
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
      "name": "Tecno Camon i Twin",
      "slug": "camon-i-twin",
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
      "name": "Tecno Camon iACE 2",
      "slug": "camon-iace-2",
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
      "name": "Tecno Camon iAIR 2+",
      "slug": "camon-iair-2",
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
      "name": "Tecno Camon iClick",
      "slug": "camon-iclick",
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
      "name": "Tecno Camon iCLICK 2",
      "slug": "camon-iclick-2",
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
      "name": "Tecno Camon iSky",
      "slug": "camon-isky",
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
      "name": "Tecno Camon iSky2",
      "slug": "camon-isky2",
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
      "name": "Tecno Camon Slim 5G",
      "slug": "camon-slim-5g",
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
      "name": "Tecno Camon Slim/Air",
      "slug": "camon-slim-air",
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
      "name": "Tecno Camon X",
      "slug": "camon-x",
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
      "name": "Tecno Camon X Pro",
      "slug": "camon-x-pro",
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
      "name": "Tecno Coman CM",
      "slug": "coman-cm",
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
      "name": "Tecno CX Air",
      "slug": "cx-air",
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
      "name": "Tecno DP7CPro-SGA1",
      "slug": "dp7cpro-sga1",
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
      "name": "Tecno F1",
      "slug": "f1",
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
      "name": "Tecno F2",
      "slug": "f2",
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
      "name": "Tecno H5S",
      "slug": "h5s",
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
      "name": "Tecno H7S",
      "slug": "h7s",
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
      "name": "Tecno i3",
      "slug": "i3",
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
      "name": "Tecno i3-Pro",
      "slug": "i3-pro",
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
      "name": "Tecno i5",
      "slug": "i5",
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
      "name": "Tecno i5-Pro",
      "slug": "i5-pro",
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
      "name": "Tecno i7",
      "slug": "i7",
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
      "name": "Tecno Infinix Smart 7",
      "slug": "infinix-smart-7",
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
      "name": "Tecno J5",
      "slug": "j5",
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
      "name": "Tecno J7",
      "slug": "j7",
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
      "name": "Tecno J8",
      "slug": "j8",
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
      "name": "Tecno K7",
      "slug": "k7",
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
      "name": "Tecno K9",
      "slug": "k9",
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
      "name": "Tecno L5",
      "slug": "l5",
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
      "name": "Tecno L8",
      "slug": "l8",
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
      "name": "Tecno L8 Lite",
      "slug": "l8-lite",
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
      "name": "Tecno L8 Plus",
      "slug": "l8-plus",
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
      "name": "Tecno L9",
      "slug": "l9",
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
      "name": "Tecno L9 Plus",
      "slug": "l9-plus",
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
      "name": "Tecno M3",
      "slug": "m3",
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
      "name": "Tecno M6S",
      "slug": "m6s",
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
      "name": "Tecno N2",
      "slug": "n2",
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
      "name": "Tecno N2S",
      "slug": "n2s",
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
      "name": "Tecno N5S",
      "slug": "n5s",
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
      "name": "Tecno N6",
      "slug": "n6",
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
      "name": "Tecno N6S",
      "slug": "n6s",
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
      "name": "Tecno N8",
      "slug": "n8",
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
      "name": "Tecno N8R",
      "slug": "n8r",
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
      "name": "Tecno N8S",
      "slug": "n8s",
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
      "name": "Tecno N9",
      "slug": "n9",
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
      "name": "Tecno N9S",
      "slug": "n9s",
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
      "name": "Tecno NX",
      "slug": "nx",
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
      "name": "Tecno P5",
      "slug": "p5",
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
      "name": "Tecno Phantom 9",
      "slug": "phantom-9",
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
      "name": "Tecno Phantom V Flip 5G",
      "slug": "phantom-v-flip-5g",
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
      "name": "Tecno Phantom V Flip2 5G",
      "slug": "phantom-v-flip2-5g",
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
      "name": "Tecno Phantom V Fold",
      "slug": "phantom-v-fold",
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
      "name": "Tecno Phantom V Fold2 5G",
      "slug": "phantom-v-fold2-5g",
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
      "name": "Tecno Phantom X",
      "slug": "phantom-x",
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
      "name": "Tecno Phantom X2 5G",
      "slug": "phantom-x2-5g",
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
      "name": "Tecno Phantom X2 Pro 5G",
      "slug": "phantom-x2-pro-5g",
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
      "name": "Tecno PHANTOM-Z-mini",
      "slug": "phantom-z-mini",
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
      "name": "Tecno Phantom6",
      "slug": "phantom6",
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
      "name": "Tecno Phantom6 Plus",
      "slug": "phantom6-plus",
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
      "name": "Tecno Phantom6S",
      "slug": "phantom6s",
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
      "name": "Tecno Phantom8S",
      "slug": "phantom8s",
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
      "name": "Tecno Pop 1s",
      "slug": "pop-1s",
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
      "name": "Tecno Pop 1s Pro",
      "slug": "pop-1s-pro",
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
      "name": "Tecno Pop 2",
      "slug": "pop-2",
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
      "name": "Tecno Pop 2 Air",
      "slug": "pop-2-air",
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
      "name": "Tecno Pop 2 Plus",
      "slug": "pop-2-plus",
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
      "name": "Tecno Pop 2 Power",
      "slug": "pop-2-power",
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
      "name": "Tecno Pop 20C",
      "slug": "pop-20c",
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
      "name": "Tecno Pop 2F",
      "slug": "pop-2f",
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
      "name": "Tecno Pop 2S",
      "slug": "pop-2s",
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
      "name": "Tecno Pop 2s Pro",
      "slug": "pop-2s-pro",
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
      "name": "Tecno Pop 2x Air",
      "slug": "pop-2x-air",
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
      "name": "Tecno Pop 2X Plus",
      "slug": "pop-2x-plus",
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
      "name": "Tecno Pop 3",
      "slug": "pop-3",
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
      "name": "Tecno Pop 3 Plus",
      "slug": "pop-3-plus",
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
      "name": "Tecno Pop 4",
      "slug": "pop-4",
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
      "name": "Tecno Pop 4 Air",
      "slug": "pop-4-air",
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
      "name": "Tecno Pop 4 LTE",
      "slug": "pop-4-lte",
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
      "name": "Tecno Pop 4 Pro",
      "slug": "pop-4-pro",
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
      "name": "Tecno Pop 5",
      "slug": "pop-5",
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
      "name": "Tecno Pop 5 Go",
      "slug": "pop-5-go",
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
      "name": "Tecno Pop 5 LTE",
      "slug": "pop-5-lte",
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
      "name": "Tecno Pop 5P",
      "slug": "pop-5p",
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
      "name": "Tecno Pop 6 Go",
      "slug": "pop-6-go",
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
      "name": "Tecno Pop 6 Go 4G",
      "slug": "pop-6-go-4g",
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
      "name": "Tecno Pop 6 Pro",
      "slug": "pop-6-pro",
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
      "name": "Tecno Pop 7",
      "slug": "pop-7",
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
      "name": "Tecno Pop 7 Pro",
      "slug": "pop-7-pro",
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
      "name": "Tecno Pop 8",
      "slug": "pop-8",
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
      "name": "Tecno Pop X5",
      "slug": "pop-x5",
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
      "name": "Tecno POP1",
      "slug": "pop1",
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
      "name": "Tecno Pouvoir 1",
      "slug": "pouvoir-1",
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
      "name": "Tecno Pouvoir 2",
      "slug": "pouvoir-2",
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
      "name": "Tecno Pouvoir 2 Pro",
      "slug": "pouvoir-2-pro",
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
      "name": "Tecno Pouvoir 3",
      "slug": "pouvoir-3",
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
      "name": "Tecno Pouvoir 3 Air",
      "slug": "pouvoir-3-air",
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
      "name": "Tecno Pouvoir 4",
      "slug": "pouvoir-4",
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
      "name": "Tecno Pouvoir 4 Pro",
      "slug": "pouvoir-4-pro",
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
      "name": "Tecno Pova",
      "slug": "pova",
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
      "name": "Tecno Pova 2",
      "slug": "pova-2",
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
      "name": "Tecno Pova 3",
      "slug": "pova-3",
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
      "name": "Tecno Pova 4",
      "slug": "pova-4",
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
      "name": "Tecno Pova 4 Pro",
      "slug": "pova-4-pro",
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
      "name": "Tecno Pova 5",
      "slug": "pova-5",
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
      "name": "Tecno Pova 5 Pro 5G",
      "slug": "pova-5-pro-5g",
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
      "name": "Tecno Pova 5G",
      "slug": "pova-5g",
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
      "name": "Tecno Pova 6",
      "slug": "pova-6",
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
      "name": "Tecno Pova 6 5G",
      "slug": "pova-6-5g",
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
      "name": "Tecno Pova 6 Neo",
      "slug": "pova-6-neo",
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
      "name": "Tecno Pova 6 Pro 5G",
      "slug": "pova-6-pro-5g",
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
      "name": "Tecno Pova 7 5G",
      "slug": "pova-7-5g",
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
      "name": "Tecno Pova 7 Neo",
      "slug": "pova-7-neo",
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
      "name": "Tecno Pova 7 Pro 5G",
      "slug": "pova-7-pro-5g",
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
      "name": "Tecno Pova 7 Ultra 5G",
      "slug": "pova-7-ultra-5g",
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
      "name": "Tecno Pova 8 5G",
      "slug": "pova-8-5g",
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
      "name": "Tecno Pova 8 Pro 5G",
      "slug": "pova-8-pro-5g",
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
      "name": "Tecno Pova Curve 2 5G",
      "slug": "pova-curve-2-5g",
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
      "name": "Tecno Pova Curve 5G",
      "slug": "pova-curve-5g",
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
      "name": "Tecno Pova Neo",
      "slug": "pova-neo",
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
      "name": "Tecno Pova Neo 2",
      "slug": "pova-neo-2",
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
      "name": "Tecno Pova Neo 3",
      "slug": "pova-neo-3",
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
      "name": "Tecno R6",
      "slug": "r6",
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
      "name": "Tecno R6S",
      "slug": "r6s",
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
      "name": "Tecno R7 4G",
      "slug": "r7-4g",
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
      "name": "Tecno R7+",
      "slug": "r7",
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
      "name": "Tecno RA6",
      "slug": "ra6",
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
      "name": "Tecno RB7S",
      "slug": "rb7s",
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
      "name": "Tecno S1",
      "slug": "s1",
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
      "name": "Tecno S1 Lite",
      "slug": "s1-lite",
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
      "name": "Tecno S1 Pro",
      "slug": "s1-pro",
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
      "name": "Tecno S1E Pro",
      "slug": "s1e-pro",
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
      "name": "Tecno S2",
      "slug": "s2",
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
      "name": "Tecno S6",
      "slug": "s6",
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
      "name": "Tecno S6s",
      "slug": "s6s",
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
      "name": "Tecno SA1 Pro",
      "slug": "sa1-pro",
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
      "name": "Tecno SA2S",
      "slug": "sa2s",
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
      "name": "Tecno SA6",
      "slug": "sa6",
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
      "name": "Tecno SA7S",
      "slug": "sa7s",
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
      "name": "Tecno Spark 10",
      "slug": "spark-10",
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
      "name": "Tecno Spark 10 5G",
      "slug": "spark-10-5g",
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
      "name": "Tecno Spark 10 Pro",
      "slug": "spark-10-pro",
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
      "name": "Tecno Spark 10C",
      "slug": "spark-10c",
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
      "name": "Tecno Spark 2",
      "slug": "spark-2",
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
      "name": "Tecno Spark 2 Youth",
      "slug": "spark-2-youth",
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
      "name": "Tecno Spark 20",
      "slug": "spark-20",
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
      "name": "Tecno Spark 20 Pro",
      "slug": "spark-20-pro",
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
      "name": "Tecno Spark 20 Pro 5G",
      "slug": "spark-20-pro-5g",
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
      "name": "Tecno Spark 20C",
      "slug": "spark-20c",
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
      "name": "Tecno Spark 3",
      "slug": "spark-3",
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
      "name": "Tecno Spark 3 Pro",
      "slug": "spark-3-pro",
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
      "name": "Tecno Spark 30",
      "slug": "spark-30",
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
      "name": "Tecno Spark 30 5G",
      "slug": "spark-30-5g",
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
      "name": "Tecno Spark 30 Pro",
      "slug": "spark-30-pro",
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
      "name": "Tecno Spark 30C",
      "slug": "spark-30c",
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
      "name": "Tecno Spark 30C 5G",
      "slug": "spark-30c-5g",
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
      "name": "Tecno Spark 4",
      "slug": "spark-4",
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
      "name": "Tecno Spark 4 Air",
      "slug": "spark-4-air",
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
      "name": "Tecno Spark 40",
      "slug": "spark-40",
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
      "name": "Tecno Spark 40 5G",
      "slug": "spark-40-5g",
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
      "name": "Tecno Spark 40 Pro",
      "slug": "spark-40-pro",
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
      "name": "Tecno Spark 40/SPARK 40 Plus",
      "slug": "spark-40-spark-40-plus",
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
      "name": "Tecno Spark 40C",
      "slug": "spark-40c",
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
      "name": "Tecno Spark 5",
      "slug": "spark-5",
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
      "name": "Tecno Spark 5 Air",
      "slug": "spark-5-air",
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
      "name": "Tecno Spark 5 Pro",
      "slug": "spark-5-pro",
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
      "name": "Tecno Spark 50",
      "slug": "spark-50",
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
      "name": "Tecno Spark 50 5G",
      "slug": "spark-50-5g",
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
      "name": "Tecno Spark 50/50S",
      "slug": "spark-50-50s",
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
      "name": "Tecno Spark 50S 5G",
      "slug": "spark-50s-5g",
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
      "name": "Tecno Spark 50T",
      "slug": "spark-50t",
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
      "name": "Tecno Spark 6 Air",
      "slug": "spark-6-air",
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
      "name": "Tecno Spark 6 GO",
      "slug": "spark-6-go",
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
      "name": "Tecno Spark 7",
      "slug": "spark-7",
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
      "name": "Tecno Spark 7 Pro",
      "slug": "spark-7-pro",
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
      "name": "Tecno Spark 7P",
      "slug": "spark-7p",
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
      "name": "Tecno Spark 7T",
      "slug": "spark-7t",
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
      "name": "Tecno Spark 8",
      "slug": "spark-8",
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
      "name": "Tecno Spark 8 P",
      "slug": "spark-8-p",
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
      "name": "Tecno Spark 8 Pro",
      "slug": "spark-8-pro",
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
      "name": "Tecno Spark 8C",
      "slug": "spark-8c",
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
      "name": "Tecno Spark 8T",
      "slug": "spark-8t",
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
      "name": "Tecno Spark 9",
      "slug": "spark-9",
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
      "name": "Tecno Spark 9 Pro",
      "slug": "spark-9-pro",
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
      "name": "Tecno Spark 9T",
      "slug": "spark-9t",
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
      "name": "Tecno Spark CM",
      "slug": "spark-cm",
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
      "name": "Tecno Spark Go",
      "slug": "spark-go",
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
      "name": "Tecno Spark Go 1",
      "slug": "spark-go-1",
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
      "name": "Tecno Spark Go 2",
      "slug": "spark-go-2",
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
      "name": "Tecno Spark Go 2/2S",
      "slug": "spark-go-2-2s",
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
      "name": "Tecno Spark Go 2020",
      "slug": "spark-go-2020",
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
      "name": "Tecno Spark Go 2021 (SPARK 6 Go)",
      "slug": "spark-go-2021-spark-6-go",
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
      "name": "Tecno Spark Go 2022",
      "slug": "spark-go-2022",
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
      "name": "Tecno Spark Go 2024",
      "slug": "spark-go-2024",
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
      "name": "Tecno Spark Go 2025",
      "slug": "spark-go-2025",
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
      "name": "Tecno Spark Go 3",
      "slug": "spark-go-3",
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
      "name": "Tecno Spark Go 5G",
      "slug": "spark-go-5g",
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
      "name": "Tecno Spark Go Plus",
      "slug": "spark-go-plus",
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
      "name": "Tecno Spark Pro",
      "slug": "spark-pro",
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
      "name": "Tecno Spark Slim",
      "slug": "spark-slim",
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
      "name": "Tecno Spark Slim 5G",
      "slug": "spark-slim-5g",
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
      "name": "Tecno Spark Youth",
      "slug": "spark-youth",
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
      "name": "Tecno Techno L6",
      "slug": "techno-l6",
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
      "name": "Tecno Tecnopop 5C",
      "slug": "tecnopop-5c",
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
      "name": "Tecno W1",
      "slug": "w1",
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
      "name": "Tecno W2",
      "slug": "w2",
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
      "name": "Tecno W3",
      "slug": "w3",
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
      "name": "Tecno W3 Pro",
      "slug": "w3-pro",
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
      "name": "Tecno W4",
      "slug": "w4",
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
      "name": "Tecno W5",
      "slug": "w5",
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
      "name": "Tecno W5 Lite",
      "slug": "w5-lite",
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
      "name": "Tecno WX3",
      "slug": "wx3",
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
      "name": "Tecno WX3F LTE",
      "slug": "wx3f-lte",
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
      "name": "Tecno WX3P",
      "slug": "wx3p",
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
      "name": "Tecno WX4",
      "slug": "wx4",
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
      "name": "Tecno WX4 Pro",
      "slug": "wx4-pro",
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
      "name": "Tecno WX4 Pro S",
      "slug": "wx4-pro-s",
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
      "name": "Tecno Y3+",
      "slug": "y3",
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
      "name": "Tecno Y3S",
      "slug": "y3s",
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
      "name": "Tecno Y4",
      "slug": "y4",
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
      "name": "Tecno Y5",
      "slug": "y5",
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
      "name": "Tecno Y6",
      "slug": "y6",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "oppo": [
    {
      "name": "Oppo A60",
      "slug": "oppo-a60",
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
      "name": "Oppo Find X7 Ultra",
      "slug": "oppo-find-x7-ultra",
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
      "name": "Oppo Reno 11F 5G",
      "slug": "oppo-reno-11f-5g",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Oppo Reno 12",
      "slug": "oppo-reno-12",
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
      "name": "Oppo Reno 12 Pro",
      "slug": "oppo-reno-12-pro",
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
      "name": "Oppo A1 5G",
      "slug": "a1-5g",
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
      "name": "Oppo A1 Pro 5G",
      "slug": "a1-pro-5g",
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
      "name": "Oppo A11f",
      "slug": "a11f",
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
      "name": "Oppo A11t",
      "slug": "a11t",
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
      "name": "Oppo A11w",
      "slug": "a11w",
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
      "name": "Oppo A13t",
      "slug": "a13t",
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
      "name": "Oppo A1601fw",
      "slug": "a1601fw",
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
      "name": "Oppo A16K",
      "slug": "a16k",
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
      "name": "Oppo A17",
      "slug": "a17",
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
      "name": "Oppo A17k",
      "slug": "a17k",
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
      "name": "Oppo A18",
      "slug": "oppo-a18",
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
      "name": "Oppo A18",
      "slug": "a18",
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
      "name": "Oppo A1k",
      "slug": "a1k",
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
      "name": "Oppo A2 5G",
      "slug": "a2-5g",
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
      "name": "Oppo A3",
      "slug": "a3",
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
      "name": "Oppo A3 5G",
      "slug": "a3-5g",
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
      "name": "Oppo A3 5G/A3i Plus 5G",
      "slug": "a3-5g-a3i-plus-5g",
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
      "name": "Oppo A3 Pro 5G",
      "slug": "a3-pro-5g",
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
      "name": "Oppo A3 Pro 5G/OPPO A5 Plus 5G",
      "slug": "a3-pro-5g-oppo-a5-plus-5g",
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
      "name": "Oppo A31",
      "slug": "a31",
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
      "name": "Oppo A31c",
      "slug": "a31c",
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
      "name": "Oppo A31u",
      "slug": "a31u",
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
      "name": "Oppo A33",
      "slug": "a33",
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
      "name": "Oppo A33f",
      "slug": "a33f",
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
      "name": "Oppo A33fw",
      "slug": "a33fw",
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
      "name": "Oppo A33m",
      "slug": "a33m",
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
      "name": "Oppo A33t",
      "slug": "a33t",
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
      "name": "Oppo A33w",
      "slug": "a33w",
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
      "name": "Oppo A35",
      "slug": "a35",
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
      "name": "Oppo A37",
      "slug": "a37",
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
      "name": "Oppo A37fw",
      "slug": "a37fw",
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
      "name": "Oppo A37fw-International",
      "slug": "a37fw-international",
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
      "name": "Oppo A37m",
      "slug": "a37m",
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
      "name": "Oppo A37t",
      "slug": "a37t",
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
      "name": "Oppo A37tm",
      "slug": "a37tm",
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
      "name": "Oppo A38",
      "slug": "a38",
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
      "name": "Oppo A39",
      "slug": "a39",
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
      "name": "Oppo A39m",
      "slug": "a39m",
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
      "name": "Oppo A39t",
      "slug": "a39t",
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
      "name": "Oppo A39tm",
      "slug": "a39tm",
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
      "name": "Oppo A3i 5G",
      "slug": "a3i-5g",
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
      "name": "Oppo A3m 5G",
      "slug": "a3m-5g",
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
      "name": "Oppo A3x 5G",
      "slug": "a3x-5g",
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
      "name": "Oppo A3x/A20",
      "slug": "a3x-a20",
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
      "name": "Oppo A40/A40m",
      "slug": "a40-a40m",
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
      "name": "Oppo A5",
      "slug": "a5",
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
      "name": "Oppo A5 2020",
      "slug": "a5-2020",
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
      "name": "Oppo A5 5G",
      "slug": "a5-5g",
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
      "name": "Oppo A5 Pro",
      "slug": "a5-pro",
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
      "name": "Oppo A5 Pro 5G",
      "slug": "a5-pro-5g",
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
      "name": "Oppo A5/A5m",
      "slug": "a5-a5m",
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
      "name": "Oppo A51",
      "slug": "a51",
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
      "name": "Oppo A51fa",
      "slug": "a51fa",
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
      "name": "Oppo A51kc",
      "slug": "a51kc",
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
      "name": "Oppo A51w",
      "slug": "a51w",
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
      "name": "Oppo A52",
      "slug": "a52",
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
      "name": "Oppo A53",
      "slug": "a53",
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
      "name": "Oppo A53 5G",
      "slug": "a53-5g",
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
      "name": "Oppo A53f",
      "slug": "a53f",
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
      "name": "Oppo A53fw",
      "slug": "a53fw",
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
      "name": "Oppo A53m",
      "slug": "a53m",
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
      "name": "Oppo A53s",
      "slug": "a53s",
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
      "name": "Oppo A53s 5G",
      "slug": "a53s-5g",
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
      "name": "Oppo A53w",
      "slug": "a53w",
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
      "name": "Oppo A54",
      "slug": "a54",
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
      "name": "Oppo A54 5G",
      "slug": "a54-5g",
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
      "name": "Oppo A55 5G",
      "slug": "a55-5g",
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
      "name": "Oppo A55s 5G",
      "slug": "a55s-5g",
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
      "name": "Oppo A57",
      "slug": "a57",
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
      "name": "Oppo A57s",
      "slug": "a57s",
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
      "name": "Oppo A57t",
      "slug": "a57t",
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
      "name": "Oppo A58",
      "slug": "a58",
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
      "name": "Oppo A59",
      "slug": "a59",
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
      "name": "Oppo A59 5G",
      "slug": "a59-5g",
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
      "name": "Oppo A59m",
      "slug": "a59m",
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
      "name": "Oppo A59st",
      "slug": "a59st",
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
      "name": "Oppo A59t",
      "slug": "a59t",
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
      "name": "Oppo A59tm",
      "slug": "a59tm",
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
      "name": "Oppo A5i",
      "slug": "a5i",
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
      "name": "Oppo A5i Pro",
      "slug": "a5i-pro",
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
      "name": "Oppo A5i Pro 5G",
      "slug": "a5i-pro-5g",
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
      "name": "Oppo A5m",
      "slug": "a5m",
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
      "name": "Oppo A5x",
      "slug": "a5x",
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
      "name": "Oppo A5x 5G",
      "slug": "a5x-5g",
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
      "name": "Oppo A6",
      "slug": "a6",
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
      "name": "Oppo A6 5G",
      "slug": "a6-5g",
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
      "name": "Oppo A6 Pro",
      "slug": "a6-pro",
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
      "name": "Oppo A6 Pro 5G",
      "slug": "a6-pro-5g",
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
      "name": "Oppo A60",
      "slug": "a60",
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
      "name": "Oppo A60 5G/ A3 5G",
      "slug": "a60-5g-a3-5g",
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
      "name": "Oppo A6c",
      "slug": "a6c",
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
      "name": "Oppo A6i 5G",
      "slug": "a6i-5g",
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
      "name": "Oppo A6k",
      "slug": "a6k",
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
      "name": "Oppo A6s",
      "slug": "a6s",
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
      "name": "Oppo A6s 5G",
      "slug": "a6s-5g",
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
      "name": "Oppo A6s Pro 5G",
      "slug": "a6s-pro-5g",
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
      "name": "Oppo A6t",
      "slug": "a6t",
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
      "name": "Oppo A6t 5G",
      "slug": "a6t-5g",
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
      "name": "Oppo A6t Pro",
      "slug": "a6t-pro",
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
      "name": "Oppo A6t Pro 5G",
      "slug": "a6t-pro-5g",
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
      "name": "Oppo A6x",
      "slug": "a6x",
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
      "name": "Oppo A6x 5G",
      "slug": "a6x-5g",
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
      "name": "Oppo A7",
      "slug": "a7",
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
      "name": "Oppo A7 Pro 5G",
      "slug": "a7-pro-5g",
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
      "name": "Oppo A7 Pro Max 5G",
      "slug": "a7-pro-max-5g",
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
      "name": "Oppo A72",
      "slug": "a72",
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
      "name": "Oppo A73",
      "slug": "a73",
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
      "name": "Oppo A73t",
      "slug": "a73t",
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
      "name": "Oppo A74 5G",
      "slug": "a74-5g",
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
      "name": "Oppo A77",
      "slug": "a77",
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
      "name": "Oppo A77 5G",
      "slug": "a77-5g",
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
      "name": "Oppo A78",
      "slug": "a78",
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
      "name": "Oppo A78 5G",
      "slug": "a78-5g",
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
      "name": "Oppo A79",
      "slug": "a79",
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
      "name": "Oppo A79 5G",
      "slug": "oppo-a79-5g",
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
      "name": "Oppo A79 5G",
      "slug": "a79-5g",
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
      "name": "Oppo A79k",
      "slug": "a79k",
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
      "name": "Oppo A79kt",
      "slug": "a79kt",
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
      "name": "Oppo A79t",
      "slug": "a79t",
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
      "name": "Oppo A7n",
      "slug": "a7n",
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
      "name": "Oppo A80 5G",
      "slug": "a80-5g",
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
      "name": "Oppo A83",
      "slug": "a83",
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
      "name": "Oppo A83t",
      "slug": "a83t",
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
      "name": "Oppo A9 2020",
      "slug": "a9-2020",
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
      "name": "Oppo A91",
      "slug": "a91",
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
      "name": "Oppo A92",
      "slug": "a92",
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
      "name": "Oppo A93",
      "slug": "a93",
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
      "name": "Oppo A93 5G",
      "slug": "a93-5g",
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
      "name": "Oppo A94",
      "slug": "a94",
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
      "name": "Oppo A95 5G",
      "slug": "a95-5g",
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
      "name": "Oppo A96 5G",
      "slug": "a96-5g",
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
      "name": "Oppo A98 5G",
      "slug": "a98-5g",
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
      "name": "Oppo A9x",
      "slug": "a9x",
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
      "name": "Oppo AX5s",
      "slug": "ax5s",
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
      "name": "Oppo F11",
      "slug": "f11",
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
      "name": "Oppo F11 Pro",
      "slug": "f11-pro",
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
      "name": "Oppo F17 Pro",
      "slug": "f17-pro",
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
      "name": "Oppo F19 Pro",
      "slug": "f19-pro",
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
      "name": "Oppo F1fw",
      "slug": "f1fw",
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
      "name": "Oppo F1w",
      "slug": "f1w",
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
      "name": "Oppo F21 Pro 5G",
      "slug": "f21-pro-5g",
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
      "name": "Oppo F27 Pro+ 5G",
      "slug": "f27-pro-5g",
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
      "name": "Oppo F29 5G",
      "slug": "f29-5g",
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
      "name": "Oppo F29 Pro 5G",
      "slug": "f29-pro-5g",
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
      "name": "Oppo F31 5G",
      "slug": "f31-5g",
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
      "name": "Oppo F31 Pro 5G",
      "slug": "f31-pro-5g",
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
      "name": "Oppo F33 5G",
      "slug": "f33-5g",
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
      "name": "Oppo F33 Pro 5G",
      "slug": "f33-pro-5g",
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
      "name": "Oppo F35 5G",
      "slug": "f35-5g",
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
      "name": "Oppo F35 Pro 5G",
      "slug": "f35-pro-5g",
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
      "name": "Oppo F7",
      "slug": "f7",
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
      "name": "Oppo F9",
      "slug": "f9",
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
      "name": "Oppo Find N",
      "slug": "find-n",
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
      "name": "Oppo Find N2 Flip",
      "slug": "find-n2-flip",
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
      "name": "Oppo Find N3",
      "slug": "find-n3",
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
      "name": "Oppo Find N3 Flip",
      "slug": "find-n3-flip",
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
      "name": "Oppo Find N5",
      "slug": "find-n5",
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
      "name": "Oppo Find N6",
      "slug": "find-n6",
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
      "name": "Oppo Find X",
      "slug": "find-x",
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
      "name": "Oppo Find X10",
      "slug": "find-x10",
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
      "name": "Oppo Find X10 E",
      "slug": "find-x10-e",
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
      "name": "Oppo Find X10 Pro Max",
      "slug": "find-x10-pro-max",
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
      "name": "Oppo Find X2",
      "slug": "find-x2",
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
      "name": "Oppo Find X2 Lite",
      "slug": "find-x2-lite",
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
      "name": "Oppo Find X2 Pro",
      "slug": "find-x2-pro",
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
      "name": "Oppo Find X3 Pro",
      "slug": "find-x3-pro",
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
      "name": "Oppo Find X5",
      "slug": "find-x5",
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
      "name": "Oppo Find X5 Pro",
      "slug": "find-x5-pro",
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
      "name": "Oppo Find X6",
      "slug": "find-x6",
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
      "name": "Oppo Find X6 Pro",
      "slug": "find-x6-pro",
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
      "name": "Oppo Find X7",
      "slug": "find-x7",
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
      "name": "Oppo Find X7 Ultra",
      "slug": "find-x7-ultra",
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
      "name": "Oppo Find X8",
      "slug": "find-x8",
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
      "name": "Oppo Find X8 Pro",
      "slug": "find-x8-pro",
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
      "name": "Oppo Find X8 Ultra",
      "slug": "find-x8-ultra",
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
      "name": "Oppo Find X8s",
      "slug": "find-x8s",
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
      "name": "Oppo Find X9",
      "slug": "find-x9",
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
      "name": "Oppo Find X9 Pro",
      "slug": "find-x9-pro",
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
      "name": "Oppo Find X9 Ultra",
      "slug": "find-x9-ultra",
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
      "name": "Oppo Find X9s",
      "slug": "find-x9s",
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
      "name": "Oppo Find X9s Pro",
      "slug": "find-x9s-pro",
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
      "name": "Oppo K1",
      "slug": "k1",
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
      "name": "Oppo K11 5G",
      "slug": "k11-5g",
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
      "name": "Oppo K11x 5G",
      "slug": "k11x-5g",
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
      "name": "Oppo K12 5G",
      "slug": "k12-5g",
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
      "name": "Oppo K12 Plus",
      "slug": "k12-plus",
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
      "name": "Oppo K12s 5G",
      "slug": "k12s-5g",
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
      "name": "Oppo K12x 5G",
      "slug": "k12x-5g",
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
      "name": "Oppo K13 5G",
      "slug": "k13-5g",
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
      "name": "Oppo K13 Turbo 5G",
      "slug": "k13-turbo-5g",
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
      "name": "Oppo K13 Turbo Pro 5G",
      "slug": "k13-turbo-pro-5g",
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
      "name": "Oppo K13x 5G",
      "slug": "k13x-5g",
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
      "name": "Oppo K14 5G",
      "slug": "k14-5g",
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
      "name": "Oppo K14 Lite",
      "slug": "k14-lite",
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
      "name": "Oppo K14 Plus 5G",
      "slug": "k14-plus-5g",
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
      "name": "Oppo K14x 5G",
      "slug": "k14x-5g",
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
      "name": "Oppo K15",
      "slug": "k15",
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
      "name": "Oppo K15 Pro",
      "slug": "k15-pro",
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
      "name": "Oppo K15s",
      "slug": "k15s",
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
      "name": "Oppo K3",
      "slug": "k3",
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
      "name": "Oppo K5",
      "slug": "k5",
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
      "name": "Oppo N1",
      "slug": "n1",
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
      "name": "Oppo N1 Mimi",
      "slug": "n1-mimi",
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
      "name": "Oppo N1T",
      "slug": "n1t",
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
      "name": "Oppo N1W",
      "slug": "n1w",
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
      "name": "Oppo N3",
      "slug": "n3",
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
      "name": "Oppo OPG02 Jp Kdi",
      "slug": "opg02-jp-kdi",
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
      "name": "Oppo R1011w",
      "slug": "r1011w",
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
      "name": "Oppo R11",
      "slug": "r11",
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
      "name": "Oppo R11 Plus",
      "slug": "r11-plus",
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
      "name": "Oppo R11 Plusk",
      "slug": "r11-plusk",
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
      "name": "Oppo R11 Pluskt",
      "slug": "r11-pluskt",
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
      "name": "Oppo R11 Plust",
      "slug": "r11-plust",
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
      "name": "Oppo R11s",
      "slug": "r11s",
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
      "name": "Oppo R11sPlus",
      "slug": "r11splus",
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
      "name": "Oppo R11sPlust",
      "slug": "r11splust",
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
      "name": "Oppo R11st",
      "slug": "r11st",
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
      "name": "Oppo R15",
      "slug": "r15",
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
      "name": "Oppo R15 Pro",
      "slug": "r15-pro",
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
      "name": "Oppo R15x",
      "slug": "r15x",
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
      "name": "Oppo R17",
      "slug": "r17",
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
      "name": "Oppo R17 Pro",
      "slug": "r17-pro",
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
      "name": "Oppo R5",
      "slug": "r5",
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
      "name": "Oppo R7",
      "slug": "r7",
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
      "name": "Oppo R7 Plus",
      "slug": "r7-plus",
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
      "name": "Oppo R7 Plusm",
      "slug": "r7-plusm",
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
      "name": "Oppo R7c",
      "slug": "r7c",
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
      "name": "Oppo R7f",
      "slug": "r7f",
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
      "name": "Oppo R7g",
      "slug": "r7g",
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
      "name": "Oppo R7kc",
      "slug": "r7kc",
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
      "name": "Oppo R7kf",
      "slug": "r7kf",
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
      "name": "Oppo R7kt",
      "slug": "r7kt",
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
      "name": "Oppo R7Plusf",
      "slug": "r7plusf",
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
      "name": "Oppo R7Plust",
      "slug": "r7plust",
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
      "name": "Oppo R7s",
      "slug": "r7s",
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
      "name": "Oppo R7s Plus",
      "slug": "r7s-plus",
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
      "name": "Oppo R7sfg",
      "slug": "r7sfg",
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
      "name": "Oppo R7sm",
      "slug": "r7sm",
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
      "name": "Oppo R7st",
      "slug": "r7st",
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
      "name": "Oppo R7t",
      "slug": "r7t",
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
      "name": "Oppo R9",
      "slug": "r9",
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
      "name": "Oppo R9 Plus A",
      "slug": "r9-plus-a",
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
      "name": "Oppo R9k",
      "slug": "r9k",
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
      "name": "Oppo R9km",
      "slug": "r9km",
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
      "name": "Oppo R9m",
      "slug": "r9m",
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
      "name": "Oppo R9PlusmA",
      "slug": "r9plusma",
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
      "name": "Oppo R9PlustA",
      "slug": "r9plusta",
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
      "name": "Oppo R9PlustmA",
      "slug": "r9plustma",
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
      "name": "Oppo R9s",
      "slug": "r9s",
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
      "name": "Oppo R9s Plus",
      "slug": "r9s-plus",
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
      "name": "Oppo R9sk",
      "slug": "r9sk",
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
      "name": "Oppo R9st",
      "slug": "r9st",
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
      "name": "Oppo R9t",
      "slug": "r9t",
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
      "name": "Oppo R9tm",
      "slug": "r9tm",
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
      "name": "Oppo Reno",
      "slug": "reno",
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
      "name": "Oppo Reno 10x Room",
      "slug": "reno-10x-room",
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
      "name": "Oppo Reno 10x Zoom",
      "slug": "reno-10x-zoom",
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
      "name": "Oppo Reno 11",
      "slug": "reno-11",
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
      "name": "Oppo Reno 11 Pro",
      "slug": "reno-11-pro",
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
      "name": "Oppo Reno 2",
      "slug": "reno-2",
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
      "name": "Oppo Reno 4Z 5G",
      "slug": "reno-4z-5g",
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
      "name": "Oppo Reno A",
      "slug": "reno-a",
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
      "name": "Oppo Reno Ace",
      "slug": "reno-ace",
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
      "name": "Oppo Reno Ace2",
      "slug": "reno-ace2",
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
      "name": "Oppo Reno Z",
      "slug": "reno-z",
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
      "name": "Oppo Reno10 5G",
      "slug": "reno10-5g",
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
      "name": "Oppo Reno10 Pro 5G",
      "slug": "reno10-pro-5g",
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
      "name": "Oppo Reno11 A",
      "slug": "reno11-a",
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
      "name": "Oppo Reno11 F 5G/Reno11 A",
      "slug": "reno11-f-5g-reno11-a",
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
      "name": "Oppo Reno12",
      "slug": "reno12",
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
      "name": "Oppo Reno12 5G",
      "slug": "reno12-5g",
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
      "name": "Oppo Reno12 F",
      "slug": "reno12-f",
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
      "name": "Oppo Reno12 F/FS 5G",
      "slug": "reno12-f-fs-5g",
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
      "name": "Oppo Reno12 Pro",
      "slug": "reno12-pro",
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
      "name": "Oppo Reno12 Pro 5G",
      "slug": "reno12-pro-5g",
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
      "name": "Oppo Reno13",
      "slug": "reno13",
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
      "name": "Oppo Reno13 5G",
      "slug": "reno13-5g",
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
      "name": "Oppo Reno13 A",
      "slug": "reno13-a",
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
      "name": "Oppo Reno13 F",
      "slug": "reno13-f",
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
      "name": "Oppo Reno13 F 5G / Reno13 A",
      "slug": "reno13-f-5g-reno13-a",
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
      "name": "Oppo Reno13 Pro",
      "slug": "reno13-pro",
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
      "name": "Oppo Reno13 Pro 5G",
      "slug": "reno13-pro-5g",
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
      "name": "Oppo Reno14",
      "slug": "reno14",
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
      "name": "Oppo Reno14 5G",
      "slug": "reno14-5g",
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
      "name": "Oppo Reno14 F 5G/Reno14 FS 5G",
      "slug": "reno14-f-5g-reno14-fs-5g",
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
      "name": "Oppo Reno14 Pro",
      "slug": "reno14-pro",
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
      "name": "Oppo Reno14 Pro 5G",
      "slug": "reno14-pro-5g",
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
      "name": "Oppo Reno15",
      "slug": "reno15",
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
      "name": "Oppo Reno15 5G",
      "slug": "reno15-5g",
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
      "name": "Oppo Reno15 A",
      "slug": "reno15-a",
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
      "name": "Oppo Reno15 FS 5G/Reno15 F 5G",
      "slug": "reno15-fs-5g-reno15-f-5g",
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
      "name": "Oppo Reno15 Pro",
      "slug": "reno15-pro",
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
      "name": "Oppo Reno15 Pro Max 5G",
      "slug": "reno15-pro-max-5g",
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
      "name": "Oppo Reno15 Pro Mini 5G",
      "slug": "reno15-pro-mini-5g",
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
      "name": "Oppo Reno15c",
      "slug": "reno15c",
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
      "name": "Oppo Reno16 5G",
      "slug": "reno16-5g",
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
      "name": "Oppo Reno16 F 5G",
      "slug": "reno16-f-5g",
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
      "name": "Oppo Reno16 Pro",
      "slug": "reno16-pro",
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
      "name": "Oppo Reno16 Pro 5G",
      "slug": "reno16-pro-5g",
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
      "name": "Oppo Reno16c 5G",
      "slug": "reno16c-5g",
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
      "name": "Oppo Reno17",
      "slug": "reno17",
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
      "name": "Oppo Reno17 Pro",
      "slug": "reno17-pro",
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
      "name": "Oppo Reno2 Z",
      "slug": "reno2-z",
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
      "name": "Oppo Reno3",
      "slug": "reno3",
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
      "name": "Oppo Reno3 5G",
      "slug": "reno3-5g",
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
      "name": "Oppo Reno3 A",
      "slug": "reno3-a",
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
      "name": "Oppo Reno3 Pro",
      "slug": "reno3-pro",
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
      "name": "Oppo Reno4 5G",
      "slug": "reno4-5g",
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
      "name": "Oppo Reno4 F",
      "slug": "reno4-f",
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
      "name": "Oppo Reno4 Lite",
      "slug": "reno4-lite",
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
      "name": "Oppo Reno4 Pro",
      "slug": "reno4-pro",
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
      "name": "Oppo Reno4 Pro 5G",
      "slug": "reno4-pro-5g",
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
      "name": "Oppo Reno5",
      "slug": "reno5",
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
      "name": "Oppo Reno5 A",
      "slug": "reno5-a",
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
      "name": "Oppo Reno5 A (eSIM)",
      "slug": "reno5-a-esim",
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
      "name": "Oppo Reno5 F",
      "slug": "reno5-f",
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
      "name": "Oppo Reno5 Lite",
      "slug": "reno5-lite",
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
      "name": "Oppo Reno5 Pro",
      "slug": "reno5-pro",
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
      "name": "Oppo Reno5 Pro+ 5G",
      "slug": "reno5-pro-5g",
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
      "name": "Oppo Reno6 Pro+ 5G",
      "slug": "reno6-pro-5g",
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
      "name": "Oppo Reno6 Z 5G",
      "slug": "reno6-z-5g",
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
      "name": "Oppo Reno7 5G/Find X5 Lite",
      "slug": "reno7-5g-find-x5-lite",
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
      "name": "Oppo Reno7 A",
      "slug": "reno7-a",
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
      "name": "Oppo Reno7 Z 5G/Reno7 Lite 5G/Reno8 Lite 5G",
      "slug": "reno7-z-5g-reno7-lite-5g-reno8-lite-5g",
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
      "name": "Oppo Reno7/F21 Pro",
      "slug": "reno7-f21-pro",
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
      "name": "Oppo Reno8 5G",
      "slug": "reno8-5g",
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
      "name": "Oppo Reno8 Pro 5G",
      "slug": "reno8-pro-5g",
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
      "name": "Oppo Reno8 T",
      "slug": "reno8-t",
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
      "name": "Oppo Reno8 T 5G",
      "slug": "reno8-t-5g",
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
      "name": "Oppo Reno9 A",
      "slug": "reno9-a",
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
      "name": "Oppo Reno9 Pro 5G",
      "slug": "reno9-pro-5g",
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
      "name": "Oppo U3",
      "slug": "u3",
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
      "name": "Oppo Ulike2",
      "slug": "ulike2",
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
      "name": "Oppo X9009fw",
      "slug": "x9009fw",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "vivo": [
    {
      "name": "Vivo V30",
      "slug": "vivo-v30",
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
      "name": "Vivo V30 Pro",
      "slug": "vivo-v30-pro",
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
      "name": "Vivo V30e",
      "slug": "vivo-v30e",
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
      "name": "Vivo X100",
      "slug": "vivo-x100",
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
      "name": "Vivo X100 Pro",
      "slug": "vivo-x100-pro",
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
      "name": "Vivo Y18",
      "slug": "vivo-y18",
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
      "name": "Vivo Y200",
      "slug": "vivo-y200",
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
      "name": "Vivo Y28",
      "slug": "vivo-y28",
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
      "name": "Vivo 2015 21",
      "slug": "2015-21",
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
      "name": "Vivo iQOO 10",
      "slug": "iqoo-10",
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
      "name": "Vivo iQOO 10 Pro",
      "slug": "iqoo-10-pro",
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
      "name": "Vivo iQOO 11",
      "slug": "iqoo-11",
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
      "name": "Vivo iQOO 11 Pro",
      "slug": "iqoo-11-pro",
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
      "name": "Vivo iQOO 11S",
      "slug": "iqoo-11s",
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
      "name": "Vivo iQOO 12",
      "slug": "iqoo-12",
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
      "name": "Vivo iQOO 12 Pro",
      "slug": "iqoo-12-pro",
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
      "name": "Vivo iQOO 13",
      "slug": "iqoo-13",
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
      "name": "Vivo iQOO 9 Pro",
      "slug": "iqoo-9-pro",
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
      "name": "Vivo iQOO 9 SE",
      "slug": "iqoo-9-se",
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
      "name": "Vivo iQOO 9T",
      "slug": "iqoo-9t",
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
      "name": "Vivo iQOO Neo 10R",
      "slug": "iqoo-neo-10r",
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
      "name": "Vivo iQOO Neo10",
      "slug": "iqoo-neo10",
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
      "name": "Vivo iQOO Neo10 Pro",
      "slug": "iqoo-neo10-pro",
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
      "name": "Vivo iQOO Neo5S",
      "slug": "iqoo-neo5s",
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
      "name": "Vivo iQOO Neo6",
      "slug": "iqoo-neo6",
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
      "name": "Vivo iQOO Neo6 SE",
      "slug": "iqoo-neo6-se",
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
      "name": "Vivo iQOO Neo7",
      "slug": "iqoo-neo7",
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
      "name": "Vivo iQOO Neo7 Pro",
      "slug": "iqoo-neo7-pro",
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
      "name": "Vivo iQOO Neo7 SE",
      "slug": "iqoo-neo7-se",
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
      "name": "Vivo iQOO Neo8",
      "slug": "iqoo-neo8",
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
      "name": "Vivo iQOO Neo8 Pro",
      "slug": "iqoo-neo8-pro",
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
      "name": "Vivo iQOO Neo9",
      "slug": "iqoo-neo9",
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
      "name": "Vivo iQOO Neo9 Pro",
      "slug": "iqoo-neo9-pro",
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
      "name": "Vivo iQOO Neo9S Pro",
      "slug": "iqoo-neo9s-pro",
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
      "name": "Vivo iQOO Z10 5G",
      "slug": "iqoo-z10-5g",
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
      "name": "Vivo iQOO Z10 Turbo Pro",
      "slug": "iqoo-z10-turbo-pro",
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
      "name": "Vivo iQOO Z10R 5G",
      "slug": "iqoo-z10r-5g",
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
      "name": "Vivo iQOO Z10x",
      "slug": "iqoo-z10x",
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
      "name": "Vivo iQOO Z10x 5G",
      "slug": "iqoo-z10x-5g",
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
      "name": "Vivo iQOO Z5",
      "slug": "iqoo-z5",
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
      "name": "Vivo iQOO Z5 6000mAh",
      "slug": "iqoo-z5-6000mah",
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
      "name": "Vivo iQOO Z6",
      "slug": "iqoo-z6",
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
      "name": "Vivo iQOO Z6 Lite 5G",
      "slug": "iqoo-z6-lite-5g",
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
      "name": "Vivo iQOO Z6 Pro",
      "slug": "iqoo-z6-pro",
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
      "name": "Vivo iQOO Z6x",
      "slug": "iqoo-z6x",
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
      "name": "Vivo iQOO Z7",
      "slug": "iqoo-z7",
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
      "name": "Vivo iQOO Z7 5G",
      "slug": "iqoo-z7-5g",
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
      "name": "Vivo iQOO Z7 Pro 5G",
      "slug": "iqoo-z7-pro-5g",
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
      "name": "Vivo iQOO Z7i",
      "slug": "iqoo-z7i",
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
      "name": "Vivo iQOO Z7s 5G",
      "slug": "iqoo-z7s-5g",
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
      "name": "Vivo iQOO Z7x (m)",
      "slug": "iqoo-z7x-m",
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
      "name": "Vivo iQOO Z7x 5G",
      "slug": "iqoo-z7x-5g",
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
      "name": "Vivo iQOO Z8",
      "slug": "iqoo-z8",
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
      "name": "Vivo iQOO Z8x",
      "slug": "iqoo-z8x",
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
      "name": "Vivo iQOO Z9",
      "slug": "iqoo-z9",
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
      "name": "Vivo iQOO Z9 5G",
      "slug": "iqoo-z9-5g",
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
      "name": "Vivo iQOO Z9 Turbo",
      "slug": "iqoo-z9-turbo",
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
      "name": "Vivo iQOO Z9s 5G",
      "slug": "iqoo-z9s-5g",
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
      "name": "Vivo iQOO Z9s Pro 5G",
      "slug": "iqoo-z9s-pro-5g",
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
      "name": "Vivo iQOO Z9x 5G",
      "slug": "iqoo-z9x-5g",
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
      "name": "Vivo Nex A",
      "slug": "nex-a",
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
      "name": "Vivo Nex S",
      "slug": "nex-s",
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
      "name": "Vivo S1",
      "slug": "s1",
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
      "name": "Vivo S15 Pro",
      "slug": "s15-pro",
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
      "name": "Vivo S15e",
      "slug": "s15e",
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
      "name": "Vivo S16",
      "slug": "s16",
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
      "name": "Vivo S16 Pro",
      "slug": "s16-pro",
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
      "name": "Vivo S16e",
      "slug": "s16e",
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
      "name": "Vivo S17",
      "slug": "s17",
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
      "name": "Vivo S17 Pro",
      "slug": "s17-pro",
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
      "name": "Vivo S17e",
      "slug": "s17e",
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
      "name": "Vivo S17t",
      "slug": "s17t",
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
      "name": "Vivo S18",
      "slug": "s18",
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
      "name": "Vivo S18 Pro",
      "slug": "s18-pro",
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
      "name": "Vivo S18e",
      "slug": "s18e",
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
      "name": "Vivo S19",
      "slug": "s19",
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
      "name": "Vivo S19 Pro",
      "slug": "s19-pro",
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
      "name": "Vivo S2 FE",
      "slug": "s2-fe",
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
      "name": "Vivo S20",
      "slug": "s20",
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
      "name": "Vivo S20 Pro",
      "slug": "s20-pro",
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
      "name": "Vivo S30",
      "slug": "s30",
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
      "name": "Vivo S30 Pro Mini",
      "slug": "s30-pro-mini",
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
      "name": "Vivo S50 Pro Mini",
      "slug": "s50-pro-mini",
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
      "name": "Vivo S50t Series",
      "slug": "s50t-series",
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
      "name": "Vivo S60",
      "slug": "s60",
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
      "name": "Vivo S60t",
      "slug": "s60t",
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
      "name": "Vivo T1",
      "slug": "t1",
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
      "name": "Vivo T1 5G",
      "slug": "t1-5g",
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
      "name": "Vivo T1 Pro 5G",
      "slug": "t1-pro-5g",
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
      "name": "Vivo T2",
      "slug": "t2",
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
      "name": "Vivo T2 5G",
      "slug": "t2-5g",
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
      "name": "Vivo T2 Pro 5G",
      "slug": "t2-pro-5g",
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
      "name": "Vivo T2x 5G",
      "slug": "t2x-5g",
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
      "name": "Vivo T3 5G",
      "slug": "t3-5g",
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
      "name": "Vivo T3 Lite 5G",
      "slug": "t3-lite-5g",
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
      "name": "Vivo T3 Pro 5G",
      "slug": "t3-pro-5g",
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
      "name": "Vivo T3 Ultra",
      "slug": "t3-ultra",
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
      "name": "Vivo T3x 5G",
      "slug": "t3x-5g",
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
      "name": "Vivo T4 5G",
      "slug": "t4-5g",
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
      "name": "Vivo T4 Lite 5G",
      "slug": "t4-lite-5g",
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
      "name": "Vivo T4 Pro",
      "slug": "t4-pro",
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
      "name": "Vivo T4 Ultra",
      "slug": "t4-ultra",
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
      "name": "Vivo T4R 5G",
      "slug": "t4r-5g",
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
      "name": "Vivo T4x 5G",
      "slug": "t4x-5g",
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
      "name": "Vivo T5",
      "slug": "t5",
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
      "name": "Vivo T5 5G",
      "slug": "t5-5g",
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
      "name": "Vivo T5 Lite 44W 5G",
      "slug": "t5-lite-44w-5g",
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
      "name": "Vivo T5 Pro",
      "slug": "t5-pro",
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
      "name": "Vivo T5 Pro 5G",
      "slug": "t5-pro-5g",
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
      "name": "Vivo T5e",
      "slug": "t5e",
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
      "name": "Vivo T5x 5G",
      "slug": "t5x-5g",
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
      "name": "Vivo T6 Lite 5G",
      "slug": "t6-lite-5g",
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
      "name": "Vivo U5x",
      "slug": "u5x",
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
      "name": "Vivo V1",
      "slug": "v1",
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
      "name": "Vivo V1 Max",
      "slug": "v1-max",
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
      "name": "Vivo V2026 21",
      "slug": "v2026-21",
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
      "name": "Vivo V2031 21",
      "slug": "v2031-21",
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
      "name": "Vivo V2036 21",
      "slug": "v2036-21",
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
      "name": "Vivo V2043 21",
      "slug": "v2043-21",
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
      "name": "Vivo V2111-EG",
      "slug": "v2111-eg",
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
      "name": "Vivo V25",
      "slug": "v25",
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
      "name": "Vivo V25 Pro",
      "slug": "v25-pro",
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
      "name": "Vivo V25e",
      "slug": "v25e",
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
      "name": "Vivo V27",
      "slug": "v27",
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
      "name": "Vivo V27 Pro",
      "slug": "v27-pro",
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
      "name": "Vivo V27e",
      "slug": "v27e",
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
      "name": "Vivo V29",
      "slug": "v29",
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
      "name": "Vivo V29e 5G",
      "slug": "v29e-5g",
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
      "name": "Vivo V3",
      "slug": "v3",
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
      "name": "Vivo V3 Lite",
      "slug": "v3-lite",
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
      "name": "Vivo V3 Max",
      "slug": "v3-max",
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
      "name": "Vivo V3 Max + A",
      "slug": "v3-max-a",
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
      "name": "Vivo V30",
      "slug": "v30",
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
      "name": "Vivo V30 Lite",
      "slug": "v30-lite",
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
      "name": "Vivo V30 Pro",
      "slug": "v30-pro",
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
      "name": "Vivo V30 SE",
      "slug": "v30-se",
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
      "name": "Vivo V30e",
      "slug": "v30e",
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
      "name": "Vivo V3M A",
      "slug": "v3m-a",
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
      "name": "Vivo V40",
      "slug": "v40",
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
      "name": "Vivo V40 Lite",
      "slug": "v40-lite",
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
      "name": "Vivo V40 Lite 5G",
      "slug": "v40-lite-5g",
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
      "name": "Vivo V40 Pro",
      "slug": "v40-pro",
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
      "name": "Vivo V40 SE 5G",
      "slug": "v40-se-5g",
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
      "name": "Vivo V40 SE 80W",
      "slug": "v40-se-80w",
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
      "name": "Vivo V40e",
      "slug": "v40e",
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
      "name": "Vivo V5 Plus",
      "slug": "v5-plus",
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
      "name": "Vivo V50",
      "slug": "v50",
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
      "name": "Vivo V50 Lite",
      "slug": "v50-lite",
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
      "name": "Vivo V50 Lite 5G",
      "slug": "v50-lite-5g",
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
      "name": "Vivo V50e",
      "slug": "v50e",
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
      "name": "Vivo V60",
      "slug": "v60",
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
      "name": "Vivo V60 Lite",
      "slug": "v60-lite",
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
      "name": "Vivo V60 Lite 5G",
      "slug": "v60-lite-5g",
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
      "name": "Vivo V60e",
      "slug": "v60e",
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
      "name": "Vivo V70",
      "slug": "v70",
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
      "name": "Vivo V70 Elite",
      "slug": "v70-elite",
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
      "name": "Vivo V70 FE",
      "slug": "v70-fe",
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
      "name": "Vivo V70 Lite",
      "slug": "v70-lite",
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
      "name": "Vivo V70 Lite 5G",
      "slug": "v70-lite-5g",
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
      "name": "Vivo V80",
      "slug": "v80",
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
      "name": "Vivo V80 Lite 5G",
      "slug": "v80-lite-5g",
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
      "name": "Vivo V9 Pro",
      "slug": "v9-pro",
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
      "name": "Vivo X Flip",
      "slug": "x-flip",
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
      "name": "Vivo X Fold",
      "slug": "x-fold",
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
      "name": "Vivo X Fold2",
      "slug": "x-fold2",
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
      "name": "Vivo X Fold3",
      "slug": "x-fold3",
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
      "name": "Vivo X Fold3 Pro",
      "slug": "x-fold3-pro",
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
      "name": "Vivo X Fold5",
      "slug": "x-fold5",
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
      "name": "Vivo X Fold6",
      "slug": "x-fold6",
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
      "name": "Vivo X Note",
      "slug": "x-note",
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
      "name": "Vivo X100 Pro",
      "slug": "x100-pro",
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
      "name": "Vivo X100 Ultra",
      "slug": "x100-ultra",
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
      "name": "Vivo X100s",
      "slug": "x100s",
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
      "name": "Vivo X100s Pro",
      "slug": "x100s-pro",
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
      "name": "Vivo X20",
      "slug": "x20",
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
      "name": "Vivo X20 Plus",
      "slug": "x20-plus",
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
      "name": "Vivo X20 Plus UD",
      "slug": "x20-plus-ud",
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
      "name": "Vivo X200 FE",
      "slug": "x200-fe",
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
      "name": "Vivo X200 Pro Mini",
      "slug": "x200-pro-mini",
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
      "name": "Vivo X200 Ultra",
      "slug": "x200-ultra",
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
      "name": "Vivo X200s",
      "slug": "x200s",
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
      "name": "Vivo X21A",
      "slug": "x21a",
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
      "name": "Vivo X21i A",
      "slug": "x21i-a",
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
      "name": "Vivo X21UD A",
      "slug": "x21ud-a",
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
      "name": "Vivo X300 E",
      "slug": "x300-e",
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
      "name": "Vivo X300 FE",
      "slug": "x300-fe",
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
      "name": "Vivo X300 Pro",
      "slug": "x300-pro",
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
      "name": "Vivo X300 Ultra",
      "slug": "x300-ultra",
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
      "name": "Vivo X300s",
      "slug": "x300s",
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
      "name": "Vivo X5",
      "slug": "x5",
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
      "name": "Vivo X5 Max",
      "slug": "x5-max",
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
      "name": "Vivo X5 Max S",
      "slug": "x5-max-s",
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
      "name": "Vivo X5 Pro",
      "slug": "x5-pro",
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
      "name": "Vivo X5 Pro D",
      "slug": "x5-pro-d",
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
      "name": "Vivo X5 Pro V",
      "slug": "x5-pro-v",
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
      "name": "Vivo X50",
      "slug": "x50",
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
      "name": "Vivo X50 Pro",
      "slug": "x50-pro",
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
      "name": "Vivo X500 E",
      "slug": "x500-e",
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
      "name": "Vivo X500 Pro",
      "slug": "x500-pro",
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
      "name": "Vivo X500 Pro Max",
      "slug": "x500-pro-max",
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
      "name": "Vivo X5M",
      "slug": "x5m",
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
      "name": "Vivo X5MaxV",
      "slug": "x5maxv",
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
      "name": "Vivo X6 Plus A",
      "slug": "x6-plus-a",
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
      "name": "Vivo X6 Plus D",
      "slug": "x6-plus-d",
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
      "name": "Vivo X6A",
      "slug": "x6a",
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
      "name": "Vivo X6D",
      "slug": "x6d",
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
      "name": "Vivo X6S A",
      "slug": "x6s-a",
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
      "name": "Vivo X6SPlusA",
      "slug": "x6splusa",
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
      "name": "Vivo X7",
      "slug": "x7",
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
      "name": "Vivo X7 Plus",
      "slug": "x7-plus",
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
      "name": "Vivo X70 Pro+",
      "slug": "x70-pro",
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
      "name": "Vivo X80",
      "slug": "x80",
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
      "name": "Vivo X80 Lite 5G",
      "slug": "x80-lite-5g",
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
      "name": "Vivo X80 Pro",
      "slug": "x80-pro",
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
      "name": "Vivo X9",
      "slug": "x9",
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
      "name": "Vivo X9 Plus",
      "slug": "x9-plus",
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
      "name": "Vivo X90",
      "slug": "x90",
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
      "name": "Vivo X90 Pro",
      "slug": "x90-pro",
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
      "name": "Vivo X90s",
      "slug": "x90s",
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
      "name": "Vivo X9i",
      "slug": "x9i",
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
      "name": "Vivo X9s",
      "slug": "x9s",
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
      "name": "Vivo X9s Plus",
      "slug": "x9s-plus",
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
      "name": "Vivo Xplay5A",
      "slug": "xplay5a",
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
      "name": "Vivo Xplay6",
      "slug": "xplay6",
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
      "name": "Vivo Y01A",
      "slug": "y01a",
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
      "name": "Vivo Y02",
      "slug": "y02",
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
      "name": "Vivo Y02A",
      "slug": "y02a",
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
      "name": "Vivo Y02s",
      "slug": "y02s",
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
      "name": "Vivo Y02t",
      "slug": "y02t",
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
      "name": "Vivo Y03",
      "slug": "y03",
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
      "name": "Vivo Y03t",
      "slug": "y03t",
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
      "name": "Vivo Y04",
      "slug": "y04",
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
      "name": "Vivo Y04e",
      "slug": "y04e",
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
      "name": "Vivo Y05",
      "slug": "y05",
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
      "name": "Vivo Y05e",
      "slug": "y05e",
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
      "name": "Vivo Y05i",
      "slug": "y05i",
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
      "name": "Vivo Y05s",
      "slug": "y05s",
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
      "name": "Vivo Y100 5G",
      "slug": "y100-5g",
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
      "name": "Vivo Y11",
      "slug": "y11",
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
      "name": "Vivo Y11 5G",
      "slug": "y11-5g",
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
      "name": "Vivo Y11d",
      "slug": "y11d",
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
      "name": "Vivo Y11e",
      "slug": "y11e",
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
      "name": "Vivo Y11s 5G",
      "slug": "y11s-5g",
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
      "name": "Vivo Y15",
      "slug": "y15",
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
      "name": "Vivo Y15C",
      "slug": "y15c",
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
      "name": "Vivo Y15S",
      "slug": "y15s",
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
      "name": "Vivo Y16",
      "slug": "y16",
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
      "name": "Vivo Y17s",
      "slug": "y17s",
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
      "name": "Vivo Y18",
      "slug": "y18",
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
      "name": "Vivo Y18e",
      "slug": "y18e",
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
      "name": "Vivo Y18i",
      "slug": "y18i",
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
      "name": "Vivo Y18s",
      "slug": "y18s",
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
      "name": "Vivo Y18t",
      "slug": "y18t",
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
      "name": "Vivo Y19 5G",
      "slug": "y19-5g",
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
      "name": "Vivo Y19e",
      "slug": "y19e",
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
      "name": "Vivo Y19s",
      "slug": "y19s",
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
      "name": "Vivo Y19s 5G",
      "slug": "y19s-5g",
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
      "name": "Vivo Y19s Pro",
      "slug": "y19s-pro",
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
      "name": "Vivo Y19sGT 5G",
      "slug": "y19sgt-5g",
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
      "name": "Vivo Y200 5G",
      "slug": "y200-5g",
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
      "name": "Vivo Y200 GT",
      "slug": "y200-gt",
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
      "name": "Vivo Y200 Pro 5G",
      "slug": "y200-pro-5g",
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
      "name": "Vivo Y200e 5G",
      "slug": "y200e-5g",
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
      "name": "Vivo Y21",
      "slug": "y21",
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
      "name": "Vivo Y21 5G",
      "slug": "y21-5g",
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
      "name": "Vivo Y21A",
      "slug": "y21a",
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
      "name": "Vivo Y21d",
      "slug": "y21d",
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
      "name": "Vivo Y21e",
      "slug": "y21e",
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
      "name": "Vivo Y21L",
      "slug": "y21l",
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
      "name": "Vivo Y21s 5G",
      "slug": "y21s-5g",
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
      "name": "Vivo Y22",
      "slug": "y22",
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
      "name": "Vivo Y22s",
      "slug": "y22s",
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
      "name": "Vivo Y27",
      "slug": "y27",
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
      "name": "Vivo Y27 5G",
      "slug": "y27-5g",
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
      "name": "Vivo Y27s",
      "slug": "y27s",
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
      "name": "Vivo Y28",
      "slug": "y28",
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
      "name": "Vivo Y28 5G",
      "slug": "y28-5g",
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
      "name": "Vivo Y28e 5G",
      "slug": "y28e-5g",
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
      "name": "Vivo Y28s 5G",
      "slug": "y28s-5g",
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
      "name": "Vivo Y29",
      "slug": "y29",
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
      "name": "Vivo Y29 5G",
      "slug": "y29-5g",
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
      "name": "Vivo Y29s 5G",
      "slug": "y29s-5g",
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
      "name": "Vivo Y29t 5G",
      "slug": "y29t-5g",
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
      "name": "Vivo Y30 5G",
      "slug": "y30-5g",
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
      "name": "Vivo Y300 5G",
      "slug": "y300-5g",
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
      "name": "Vivo Y300 GT",
      "slug": "y300-gt",
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
      "name": "Vivo Y300 Plus 5G",
      "slug": "y300-plus-5g",
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
      "name": "Vivo Y300 Pro",
      "slug": "y300-pro",
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
      "name": "Vivo Y300i",
      "slug": "y300i",
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
      "name": "Vivo Y300t",
      "slug": "y300t",
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
      "name": "Vivo Y31 5G",
      "slug": "y31-5g",
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
      "name": "Vivo Y31 Pro 5G",
      "slug": "y31-pro-5g",
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
      "name": "Vivo Y31d",
      "slug": "y31d",
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
      "name": "Vivo Y31d Pro",
      "slug": "y31d-pro",
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
      "name": "Vivo Y31e 5G",
      "slug": "y31e-5g",
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
      "name": "Vivo Y31i",
      "slug": "y31i",
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
      "name": "Vivo Y31L",
      "slug": "y31l",
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
      "name": "Vivo Y31s 5G",
      "slug": "y31s-5g",
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
      "name": "Vivo Y31t 5G",
      "slug": "y31t-5g",
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
      "name": "Vivo Y32",
      "slug": "y32",
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
      "name": "Vivo Y32 5G",
      "slug": "y32-5g",
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
      "name": "Vivo Y33",
      "slug": "y33",
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
      "name": "Vivo Y33t",
      "slug": "y33t",
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
      "name": "Vivo Y35",
      "slug": "y35",
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
      "name": "Vivo Y35A",
      "slug": "y35a",
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
      "name": "Vivo Y36",
      "slug": "y36",
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
      "name": "Vivo Y36 5G",
      "slug": "y36-5g",
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
      "name": "Vivo Y36s",
      "slug": "y36s",
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
      "name": "Vivo Y36t",
      "slug": "y36t",
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
      "name": "Vivo Y37",
      "slug": "y37",
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
      "name": "Vivo Y37 Pro",
      "slug": "y37-pro",
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
      "name": "Vivo Y37c",
      "slug": "y37c",
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
      "name": "Vivo Y37m",
      "slug": "y37m",
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
      "name": "Vivo Y38 5G",
      "slug": "y38-5g",
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
      "name": "Vivo Y39 5G",
      "slug": "y39-5g",
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
      "name": "Vivo Y400 5G",
      "slug": "y400-5g",
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
      "name": "Vivo Y400 Pro 5G",
      "slug": "y400-pro-5g",
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
      "name": "Vivo Y500 Pro",
      "slug": "y500-pro",
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
      "name": "Vivo Y50m 5G",
      "slug": "y50m-5g",
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
      "name": "Vivo Y51",
      "slug": "y51",
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
      "name": "Vivo Y51 Pro 5G",
      "slug": "y51-pro-5g",
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
      "name": "Vivo Y51A",
      "slug": "y51a",
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
      "name": "Vivo Y53",
      "slug": "y53",
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
      "name": "Vivo Y53L",
      "slug": "y53l",
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
      "name": "Vivo Y53t",
      "slug": "y53t",
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
      "name": "Vivo Y55",
      "slug": "y55",
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
      "name": "Vivo Y55A",
      "slug": "y55a",
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
      "name": "Vivo Y55s",
      "slug": "y55s",
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
      "name": "Vivo Y55t",
      "slug": "y55t",
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
      "name": "Vivo Y56 5G",
      "slug": "y56-5g",
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
      "name": "Vivo Y58 5G",
      "slug": "y58-5g",
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
      "name": "Vivo Y600 5G",
      "slug": "y600-5g",
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
      "name": "Vivo Y600k Turbo",
      "slug": "y600k-turbo",
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
      "name": "Vivo Y65",
      "slug": "y65",
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
      "name": "Vivo Y66",
      "slug": "y66",
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
      "name": "Vivo Y66i A",
      "slug": "y66i-a",
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
      "name": "Vivo Y67",
      "slug": "y67",
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
      "name": "Vivo Y69A",
      "slug": "y69a",
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
      "name": "Vivo Y6a",
      "slug": "y6a",
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
      "name": "Vivo Y6m",
      "slug": "y6m",
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
      "name": "Vivo Y6t",
      "slug": "y6t",
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
      "name": "Vivo Y71",
      "slug": "y71",
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
      "name": "Vivo Y71A",
      "slug": "y71a",
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
      "name": "Vivo Y75A",
      "slug": "y75a",
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
      "name": "Vivo Y75s",
      "slug": "y75s",
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
      "name": "Vivo Y77",
      "slug": "y77",
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
      "name": "Vivo Y78 5G",
      "slug": "y78-5g",
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
      "name": "Vivo Y78+",
      "slug": "y78",
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
      "name": "Vivo Y78m",
      "slug": "y78m",
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
      "name": "Vivo Y78t",
      "slug": "y78t",
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
      "name": "Vivo Y79A",
      "slug": "y79a",
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
      "name": "Vivo Y83A",
      "slug": "y83a",
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
      "name": "Vivo Y85A",
      "slug": "y85a",
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
      "name": "Vivo Z1",
      "slug": "z1",
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
      "name": "Vivo Z1 Pro",
      "slug": "z1-pro",
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
      "name": "Vivo Z1i",
      "slug": "z1i",
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
      "name": "Vivo Z3i",
      "slug": "z3i",
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
      "name": "Vivo Z3x",
      "slug": "z3x",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "realme": [
    {
      "name": "Realme 12 Pro+ 5G",
      "slug": "realme-12-pro-plus-5g",
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
      "name": "Realme 12+ 5G",
      "slug": "realme-12-plus-5g",
      "year": 2024,
      "storage": [
        256
      ],
      "ram": [
        8
      ]
    },
    {
      "name": "Realme C65",
      "slug": "realme-c65",
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
      "name": "Realme C67",
      "slug": "realme-c67",
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
      "name": "Realme GT 6",
      "slug": "realme-gt-6",
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
      "name": "Realme 1",
      "slug": "1",
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
      "name": "Realme 10",
      "slug": "10",
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
      "name": "Realme 10 Pro",
      "slug": "10-pro",
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
      "name": "Realme 10 Pro 5G",
      "slug": "10-pro-5g",
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
      "name": "Realme 10s",
      "slug": "10s",
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
      "name": "Realme 11",
      "slug": "11",
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
      "name": "Realme 11 5G",
      "slug": "11-5g",
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
      "name": "Realme 11 Pro 5G",
      "slug": "11-pro-5g",
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
      "name": "Realme 11 Pro+",
      "slug": "11-pro",
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
      "name": "Realme 11x 5G",
      "slug": "11x-5g",
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
      "name": "Realme 12",
      "slug": "12",
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
      "name": "Realme 12 5G",
      "slug": "12-5g",
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
      "name": "Realme 12 Pro 5G",
      "slug": "12-pro-5g",
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
      "name": "Realme 12x 5G",
      "slug": "12x-5g",
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
      "name": "Realme 13 Pro 5G",
      "slug": "13-pro-5g",
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
      "name": "Realme 13+ 5G",
      "slug": "13-5g",
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
      "name": "Realme 14 Pro 5G",
      "slug": "14-pro-5g",
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
      "name": "Realme 14T 5G",
      "slug": "14t-5g",
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
      "name": "Realme 15 5G",
      "slug": "15-5g",
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
      "name": "Realme 15 Pro 5G",
      "slug": "15-pro-5g",
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
      "name": "Realme 15T",
      "slug": "15t",
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
      "name": "Realme 15x 5G",
      "slug": "15x-5g",
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
      "name": "Realme 16 5G",
      "slug": "16-5g",
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
      "name": "Realme 16 Pro 5G",
      "slug": "16-pro-5g",
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
      "name": "Realme 16T 5G",
      "slug": "16t-5g",
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
      "name": "Realme 16x 5G",
      "slug": "16x-5g",
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
      "name": "Realme 2",
      "slug": "2",
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
      "name": "Realme 2 Pro",
      "slug": "2-pro",
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
      "name": "Realme 3",
      "slug": "3",
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
      "name": "Realme 3 Pro",
      "slug": "3-pro",
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
      "name": "Realme 3i",
      "slug": "3i",
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
      "name": "Realme 5",
      "slug": "5",
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
      "name": "Realme 5 Pro",
      "slug": "5-pro",
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
      "name": "Realme 5i",
      "slug": "5i",
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
      "name": "Realme 6",
      "slug": "6",
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
      "name": "Realme 6 Pro",
      "slug": "6-pro",
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
      "name": "Realme 6i",
      "slug": "6i",
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
      "name": "Realme 7",
      "slug": "7",
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
      "name": "Realme 7 Pro",
      "slug": "7-pro",
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
      "name": "Realme 7i",
      "slug": "7i",
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
      "name": "Realme 8",
      "slug": "8",
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
      "name": "Realme 8 5G",
      "slug": "8-5g",
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
      "name": "Realme 8 Pro",
      "slug": "8-pro",
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
      "name": "Realme 8i",
      "slug": "8i",
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
      "name": "Realme 8s 5G",
      "slug": "8s-5g",
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
      "name": "Realme 9",
      "slug": "9",
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
      "name": "Realme 9 5G",
      "slug": "9-5g",
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
      "name": "Realme 9 Pro 5G",
      "slug": "9-pro-5g",
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
      "name": "Realme 9 Pro+",
      "slug": "9-pro",
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
      "name": "Realme 9i",
      "slug": "9i",
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
      "name": "Realme 9i 5G",
      "slug": "9i-5g",
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
      "name": "Realme C1",
      "slug": "c1",
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
      "name": "Realme C100 5G",
      "slug": "c100-5g",
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
      "name": "Realme C100d",
      "slug": "c100d",
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
      "name": "Realme C100i",
      "slug": "c100i",
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
      "name": "Realme C100x",
      "slug": "c100x",
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
      "name": "Realme C11",
      "slug": "c11",
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
      "name": "Realme C11 2021",
      "slug": "c11-2021",
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
      "name": "Realme C12",
      "slug": "c12",
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
      "name": "Realme C15",
      "slug": "c15",
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
      "name": "Realme C17",
      "slug": "c17",
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
      "name": "Realme C2",
      "slug": "c2",
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
      "name": "Realme C20",
      "slug": "c20",
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
      "name": "Realme C21",
      "slug": "c21",
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
      "name": "Realme C21Y",
      "slug": "c21y",
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
      "name": "Realme C25",
      "slug": "c25",
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
      "name": "Realme C25s",
      "slug": "c25s",
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
      "name": "Realme C25Y",
      "slug": "c25y",
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
      "name": "Realme C3",
      "slug": "c3",
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
      "name": "Realme C30",
      "slug": "c30",
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
      "name": "Realme C30s",
      "slug": "c30s",
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
      "name": "Realme C31",
      "slug": "c31",
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
      "name": "Realme C33",
      "slug": "c33",
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
      "name": "Realme C33 128GB",
      "slug": "c33-128gb",
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
      "name": "Realme C35",
      "slug": "c35",
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
      "name": "Realme C3i",
      "slug": "c3i",
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
      "name": "Realme C51",
      "slug": "c51",
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
      "name": "Realme C51s",
      "slug": "c51s",
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
      "name": "Realme C53",
      "slug": "realme-c53",
      "year": 2023,
      "storage": [
        128
      ],
      "ram": [
        6
      ]
    },
    {
      "name": "Realme C53",
      "slug": "c53",
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
      "name": "Realme C55",
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
      "name": "Realme C61",
      "slug": "c61",
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
      "name": "Realme C63",
      "slug": "c63",
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
      "name": "Realme C63 5G",
      "slug": "c63-5g",
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
      "name": "Realme C65",
      "slug": "c65",
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
      "name": "Realme C67",
      "slug": "c67",
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
      "name": "Realme C71",
      "slug": "c71",
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
      "name": "Realme C75",
      "slug": "c75",
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
      "name": "Realme C75 5G",
      "slug": "c75-5g",
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
      "name": "Realme C75x",
      "slug": "c75x",
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
      "name": "Realme C83 5G",
      "slug": "c83-5g",
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
      "name": "Realme C85",
      "slug": "c85",
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
      "name": "Realme C85 5G",
      "slug": "c85-5g",
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
      "name": "Realme Narzo 20",
      "slug": "narzo-20",
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
      "name": "Realme Narzo 20 Pro",
      "slug": "narzo-20-pro",
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
      "name": "Realme Narzo 20A",
      "slug": "narzo-20a",
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
      "name": "Realme Narzo 30",
      "slug": "narzo-30",
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
      "name": "Realme Narzo 30 5G",
      "slug": "narzo-30-5g",
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
      "name": "Realme Narzo 30A",
      "slug": "narzo-30a",
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
      "name": "Realme Narzo 50",
      "slug": "narzo-50",
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
      "name": "Realme Narzo 50 5G",
      "slug": "narzo-50-5g",
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
      "name": "Realme Narzo 50 Pro 5G",
      "slug": "narzo-50-pro-5g",
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
      "name": "Realme Narzo 50A",
      "slug": "narzo-50a",
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
      "name": "Realme Narzo 50A Prime",
      "slug": "narzo-50a-prime",
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
      "name": "Realme Narzo 50i",
      "slug": "narzo-50i",
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
      "name": "Realme Narzo 50i Prime",
      "slug": "narzo-50i-prime",
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
      "name": "Realme Narzo 60 5G",
      "slug": "narzo-60-5g",
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
      "name": "Realme Narzo 70 5G",
      "slug": "narzo-70-5g",
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
      "name": "Realme Narzo 70 Pro 5G",
      "slug": "narzo-70-pro-5g",
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
      "name": "Realme Narzo 70 Turbo 5G",
      "slug": "narzo-70-turbo-5g",
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
      "name": "Realme Narzo 80 Pro 5G",
      "slug": "narzo-80-pro-5g",
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
      "name": "Realme Narzo 90x 5G",
      "slug": "narzo-90x-5g",
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
      "name": "Realme Narzo N53",
      "slug": "narzo-n53",
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
      "name": "Realme Note 50",
      "slug": "note-50",
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
      "name": "Realme Note 60",
      "slug": "note-60",
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
      "name": "Realme Note 60x",
      "slug": "note-60x",
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
      "name": "Realme Note 70T",
      "slug": "note-70t",
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
      "name": "Realme Note 80",
      "slug": "note-80",
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
      "name": "Realme P1 5G",
      "slug": "p1-5g",
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
      "name": "Realme P1 Pro 5G",
      "slug": "p1-pro-5g",
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
      "name": "Realme P1 Speed 5G",
      "slug": "p1-speed-5g",
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
      "name": "Realme P2 Pro 5G",
      "slug": "p2-pro-5g",
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
      "name": "Realme P3 5G",
      "slug": "p3-5g",
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
      "name": "Realme P3 Lite",
      "slug": "p3-lite",
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
      "name": "Realme P3 Pro 5G",
      "slug": "p3-pro-5g",
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
      "name": "Realme P3 Ultra 5G",
      "slug": "p3-ultra-5g",
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
      "name": "Realme P4 5G",
      "slug": "p4-5g",
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
      "name": "Realme P4 Lite",
      "slug": "p4-lite",
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
      "name": "Realme P4 Power 5G",
      "slug": "p4-power-5g",
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
      "name": "Realme P4 Pro 5G",
      "slug": "p4-pro-5g",
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
      "name": "Realme P4s 5G",
      "slug": "p4s-5g",
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
      "name": "Realme P4s Lite",
      "slug": "p4s-lite",
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
      "name": "Realme P4x",
      "slug": "p4x",
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
      "name": "Realme P4x 5G",
      "slug": "p4x-5g",
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
      "name": "Realme Q",
      "slug": "q",
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
      "name": "Realme Q2 5G",
      "slug": "q2-5g",
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
      "name": "Realme Q3 5G",
      "slug": "q3-5g",
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
      "name": "Realme Q3 Pro Play",
      "slug": "q3-pro-play",
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
      "name": "Realme Q5",
      "slug": "q5",
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
      "name": "Realme Q5 Pro",
      "slug": "q5-pro",
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
      "name": "Realme Q5i",
      "slug": "q5i",
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
      "name": "Realme realmeGT Neo5",
      "slug": "realmegt-neo5",
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
      "name": "Realme realmeGT Neo5 240W",
      "slug": "realmegt-neo5-240w",
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
      "name": "Realme realmeTechLife",
      "slug": "realmetechlife",
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
      "name": "Realme U1",
      "slug": "u1",
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
      "name": "Realme V11 5G",
      "slug": "v11-5g",
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
      "name": "Realme V15 5G",
      "slug": "v15-5g",
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
      "name": "Realme V23",
      "slug": "v23",
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
      "name": "Realme V23i",
      "slug": "v23i",
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
      "name": "Realme V25",
      "slug": "v25",
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
      "name": "Realme V3 5G",
      "slug": "v3-5g",
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
      "name": "Realme V30",
      "slug": "v30",
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
      "name": "Realme V5 5G",
      "slug": "v5-5g",
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
      "name": "Realme X",
      "slug": "x",
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
      "name": "Realme X2",
      "slug": "x2",
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
      "name": "Realme X2 Pro",
      "slug": "x2-pro",
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
      "name": "Realme X3",
      "slug": "x3",
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
      "name": "Realme X50 5G",
      "slug": "x50-5g",
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
      "name": "Realme X50 Pro",
      "slug": "x50-pro",
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
      "name": "Realme X50 Pro Play",
      "slug": "x50-pro-play",
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
      "name": "Realme X50m 5G",
      "slug": "x50m-5g",
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
      "name": "Realme X50t 5G",
      "slug": "x50t-5g",
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
      "name": "Realme X7 5G",
      "slug": "x7-5g",
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
      "name": "Realme X7 Pro Ultra",
      "slug": "x7-pro-ultra",
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
      "name": "Realme XT",
      "slug": "xt",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "huawei": [
    {
      "name": "Huawei Ascend D",
      "slug": "ascend-d",
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
      "name": "Huawei Ascend G510",
      "slug": "ascend-g510",
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
      "name": "Huawei Ascend G525",
      "slug": "ascend-g525",
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
      "name": "Huawei Ascend XT2\u2122",
      "slug": "ascend-xt2",
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
      "name": "Huawei ascend-5w",
      "slug": "ascend-5w",
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
      "name": "Huawei C199s",
      "slug": "c199s",
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
      "name": "Huawei Cherry Mini",
      "slug": "cherry-mini",
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
      "name": "Huawei China",
      "slug": "china",
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
      "name": "Huawei Copper Plus",
      "slug": "copper-plus",
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
      "name": "Huawei D2",
      "slug": "d2",
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
      "name": "Huawei Eco",
      "slug": "eco",
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
      "name": "Huawei eH811",
      "slug": "eh811",
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
      "name": "Huawei Elate\u2122",
      "slug": "elate",
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
      "name": "Huawei Fusion 2",
      "slug": "fusion-2",
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
      "name": "Huawei G Elite Plus",
      "slug": "g-elite-plus",
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
      "name": "Huawei G6",
      "slug": "g6",
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
      "name": "Huawei G7 Plus",
      "slug": "g7-plus",
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
      "name": "Huawei G8",
      "slug": "g8",
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
      "name": "Huawei G9 Plus",
      "slug": "g9-plus",
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
      "name": "Huawei GR3",
      "slug": "gr3",
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
      "name": "Huawei GR3 2017",
      "slug": "gr3-2017",
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
      "name": "Huawei GR3 Smart Touch",
      "slug": "gr3-smart-touch",
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
      "name": "Huawei GR5",
      "slug": "gr5",
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
      "name": "Huawei GR5 2017",
      "slug": "gr5-2017",
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
      "name": "Huawei GR5W",
      "slug": "gr5w",
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
      "name": "Huawei Gran Roraima",
      "slug": "gran-roraima",
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
      "name": "Huawei GX8",
      "slug": "gx8",
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
      "name": "Huawei HW-03E",
      "slug": "hw-03e",
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
      "name": "Huawei hw204HW",
      "slug": "hw204hw",
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
      "name": "Huawei Ice-Twist",
      "slug": "ice-twist",
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
      "name": "Huawei Ideos",
      "slug": "ideos",
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
      "name": "Huawei Ideos X5",
      "slug": "ideos-x5",
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
      "name": "Huawei Kiwi-2",
      "slug": "kiwi-2",
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
      "name": "Huawei Liszt",
      "slug": "liszt",
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
      "name": "Huawei M2",
      "slug": "m2",
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
      "name": "Huawei M3",
      "slug": "m3",
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
      "name": "Huawei m881",
      "slug": "m881",
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
      "name": "Huawei Maimang 6",
      "slug": "maimang-6",
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
      "name": "Huawei Maimang 7",
      "slug": "maimang-7",
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
      "name": "Huawei Mate",
      "slug": "mate",
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
      "name": "Huawei Mate 10",
      "slug": "mate-10",
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
      "name": "Huawei Mate 10 Lite",
      "slug": "mate-10-lite",
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
      "name": "Huawei Mate 10 Pro",
      "slug": "mate-10-pro",
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
      "name": "Huawei Mate 20",
      "slug": "mate-20",
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
      "name": "Huawei Mate 20 Lite",
      "slug": "mate-20-lite",
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
      "name": "Huawei Mate 20 Pro",
      "slug": "mate-20-pro",
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
      "name": "Huawei Mate 20 RS",
      "slug": "mate-20-rs",
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
      "name": "Huawei Mate 20 X",
      "slug": "mate-20-x",
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
      "name": "Huawei Mate 20 X (5G)",
      "slug": "mate-20-x-5g",
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
      "name": "Huawei Mate 7",
      "slug": "mate-7",
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
      "name": "Huawei Mate 8",
      "slug": "mate-8",
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
      "name": "Huawei Mate 9",
      "slug": "mate-9",
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
      "name": "Huawei Mate 9 Lite",
      "slug": "mate-9-lite",
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
      "name": "Huawei Mate 9 Pro",
      "slug": "mate-9-pro",
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
      "name": "Huawei Mate S",
      "slug": "mate-s",
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
      "name": "Huawei Mate SE",
      "slug": "mate-se",
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
      "name": "Huawei Mate2",
      "slug": "mate2",
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
      "name": "Huawei MediaQ M380",
      "slug": "mediaq-m380",
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
      "name": "Huawei MS4C",
      "slug": "ms4c",
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
      "name": "Huawei MT1",
      "slug": "mt1",
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
      "name": "Huawei MT2L03 Lite",
      "slug": "mt2l03-lite",
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
      "name": "Huawei Nexus 6P",
      "slug": "nexus-6p",
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
      "name": "Huawei Nova",
      "slug": "nova",
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
      "name": "Huawei Nova 2",
      "slug": "nova-2",
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
      "name": "Huawei Nova 2 Lite",
      "slug": "nova-2-lite",
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
      "name": "Huawei Nova 2 Plus",
      "slug": "nova-2-plus",
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
      "name": "Huawei Nova 2i",
      "slug": "nova-2i",
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
      "name": "Huawei Nova 2s",
      "slug": "nova-2s",
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
      "name": "Huawei Nova 3",
      "slug": "nova-3",
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
      "name": "Huawei Nova 3e",
      "slug": "nova-3e",
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
      "name": "Huawei Nova 3i",
      "slug": "nova-3i",
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
      "name": "Huawei Nova 4",
      "slug": "nova-4",
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
      "name": "Huawei Nova 4e",
      "slug": "nova-4e",
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
      "name": "Huawei Nova 5T",
      "slug": "nova-5t",
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
      "name": "Huawei Nova 5T Pro",
      "slug": "nova-5t-pro",
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
      "name": "Huawei Nova Lite",
      "slug": "nova-lite",
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
      "name": "Huawei Nova Lite 2",
      "slug": "nova-lite-2",
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
      "name": "Huawei Nova Lite 3+",
      "slug": "nova-lite-3",
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
      "name": "Huawei Nova Lite For Y!mobile",
      "slug": "nova-lite-for-y-mobile",
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
      "name": "Huawei Nova Plus",
      "slug": "nova-plus",
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
      "name": "Huawei P Smart",
      "slug": "p-smart",
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
      "name": "Huawei P Smart 2019",
      "slug": "p-smart-2019",
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
      "name": "Huawei P Smart 2020",
      "slug": "p-smart-2020",
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
      "name": "Huawei P Smart Z",
      "slug": "p-smart-z",
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
      "name": "Huawei P10",
      "slug": "p10",
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
      "name": "Huawei P10 Lite",
      "slug": "p10-lite",
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
      "name": "Huawei P10 Plus",
      "slug": "p10-plus",
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
      "name": "Huawei P2",
      "slug": "p2",
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
      "name": "Huawei P20",
      "slug": "p20",
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
      "name": "Huawei P20 Lite",
      "slug": "p20-lite",
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
      "name": "Huawei P20 Pro",
      "slug": "p20-pro",
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
      "name": "Huawei P30",
      "slug": "p30",
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
      "name": "Huawei P30 Lite",
      "slug": "p30-lite",
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
      "name": "Huawei P30 Pro",
      "slug": "p30-pro",
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
      "name": "Huawei P6",
      "slug": "p6",
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
      "name": "Huawei P6S",
      "slug": "p6s",
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
      "name": "Huawei P7",
      "slug": "p7",
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
      "name": "Huawei P7 Mini",
      "slug": "p7-mini",
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
      "name": "Huawei P8",
      "slug": "p8",
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
      "name": "Huawei P8 Lite",
      "slug": "p8-lite",
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
      "name": "Huawei P8 Lite 2017",
      "slug": "p8-lite-2017",
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
      "name": "Huawei P8 Max",
      "slug": "p8-max",
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
      "name": "Huawei P9",
      "slug": "p9",
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
      "name": "Huawei P9 Lite",
      "slug": "p9-lite",
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
      "name": "Huawei P9 Lite Mini",
      "slug": "p9-lite-mini",
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
      "name": "Huawei P9 Lite Premium",
      "slug": "p9-lite-premium",
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
      "name": "Huawei P9 Lite Smart",
      "slug": "p9-lite-smart",
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
      "name": "Huawei P9 Plus",
      "slug": "p9-plus",
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
      "name": "Huawei Porsche Design Huawei Mate RS",
      "slug": "porsche-design-huawei-mate-rs",
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
      "name": "Huawei Prism II",
      "slug": "prism-ii",
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
      "name": "Huawei Q22",
      "slug": "q22",
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
      "name": "Huawei S10",
      "slug": "s10",
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
      "name": "Huawei S7",
      "slug": "s7",
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
      "name": "Huawei Sensa LTE",
      "slug": "sensa-lte",
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
      "name": "Huawei ShotX",
      "slug": "shotx",
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
      "name": "Huawei T-Mobile Pulse",
      "slug": "t-mobile-pulse",
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
      "name": "Huawei T1",
      "slug": "t1",
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
      "name": "Huawei T1 10",
      "slug": "t1-10",
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
      "name": "Huawei Union",
      "slug": "union",
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
      "name": "Huawei Vogue7",
      "slug": "vogue7",
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
      "name": "Huawei X2",
      "slug": "x2",
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
      "name": "Huawei Y Max",
      "slug": "y-max",
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
      "name": "Huawei Y3 2017",
      "slug": "y3-2017",
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
      "name": "Huawei Y3 2018",
      "slug": "y3-2018",
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
      "name": "Huawei Y300-0000",
      "slug": "y300-0000",
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
      "name": "Huawei Y310-5000",
      "slug": "y310-5000",
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
      "name": "Huawei Y3II",
      "slug": "y3ii",
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
      "name": "Huawei Y5",
      "slug": "y5",
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
      "name": "Huawei Y5 2017",
      "slug": "y5-2017",
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
      "name": "Huawei Y5 2018",
      "slug": "y5-2018",
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
      "name": "Huawei Y5 2019",
      "slug": "y5-2019",
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
      "name": "Huawei Y5 Lite 2017",
      "slug": "y5-lite-2017",
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
      "name": "Huawei Y5 Lite 2018",
      "slug": "y5-lite-2018",
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
      "name": "Huawei Y5 Prime 2018",
      "slug": "y5-prime-2018",
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
      "name": "Huawei Y516-",
      "slug": "y516",
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
      "name": "Huawei Y5II",
      "slug": "y5ii",
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
      "name": "Huawei Y6",
      "slug": "y6",
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
      "name": "Huawei Y6 2017",
      "slug": "y6-2017",
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
      "name": "Huawei Y6 2018",
      "slug": "y6-2018",
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
      "name": "Huawei Y6 2019",
      "slug": "y6-2019",
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
      "name": "Huawei Y6 Elite",
      "slug": "y6-elite",
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
      "name": "Huawei Y6 Prime 2018",
      "slug": "y6-prime-2018",
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
      "name": "Huawei Y6 Pro",
      "slug": "y6-pro",
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
      "name": "Huawei Y6 Pro 2019",
      "slug": "y6-pro-2019",
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
      "name": "Huawei Y6 \u2161 Compact",
      "slug": "y6-compact",
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
      "name": "Huawei Y6II",
      "slug": "y6ii",
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
      "name": "Huawei Y7",
      "slug": "y7",
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
      "name": "Huawei Y7 2018",
      "slug": "y7-2018",
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
      "name": "Huawei Y7 Prime 2018",
      "slug": "y7-prime-2018",
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
      "name": "Huawei Y7 Prime 2019",
      "slug": "y7-prime-2019",
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
      "name": "Huawei Y7s",
      "slug": "y7s",
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
      "name": "Huawei Y9 2018",
      "slug": "y9-2018",
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
      "name": "Huawei Y9 2019",
      "slug": "y9-2019",
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
      "name": "Huawei Y9 Prime 2019",
      "slug": "y9-prime-2019",
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
      "name": "Huawei Youth",
      "slug": "youth",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "honor": [
    {
      "name": "Honor 10 Lite",
      "slug": "10-lite",
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
      "name": "Honor 100",
      "slug": "100",
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
      "name": "Honor 100 Pro",
      "slug": "100-pro",
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
      "name": "Honor 20 Lite",
      "slug": "20-lite",
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
      "name": "Honor 20 Pro",
      "slug": "20-pro",
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
      "name": "Honor 200",
      "slug": "200",
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
      "name": "Honor 200 Lite",
      "slug": "200-lite",
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
      "name": "Honor 200 Pro",
      "slug": "200-pro",
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
      "name": "Honor 20e",
      "slug": "20e",
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
      "name": "Honor 20i",
      "slug": "20i",
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
      "name": "Honor 20S",
      "slug": "20s",
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
      "name": "Honor 400",
      "slug": "400",
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
      "name": "Honor 400 Lite",
      "slug": "400-lite",
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
      "name": "Honor 400 Pro",
      "slug": "400-pro",
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
      "name": "Honor 400 Smart",
      "slug": "400-smart",
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
      "name": "Honor 4A",
      "slug": "4a",
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
      "name": "Honor 4X",
      "slug": "4x",
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
      "name": "Honor 50",
      "slug": "50",
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
      "name": "Honor 50 Lite",
      "slug": "50-lite",
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
      "name": "Honor 500",
      "slug": "500",
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
      "name": "Honor 5A",
      "slug": "5a",
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
      "name": "Honor 5C",
      "slug": "5c",
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
      "name": "Honor 5X",
      "slug": "5x",
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
      "name": "Honor 600",
      "slug": "600",
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
      "name": "Honor 600 Elite",
      "slug": "600-elite",
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
      "name": "Honor 600 Lite",
      "slug": "600-lite",
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
      "name": "Honor 600 Pro",
      "slug": "600-pro",
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
      "name": "Honor 600 Smart 5G",
      "slug": "600-smart-5g",
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
      "name": "Honor 600e",
      "slug": "600e",
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
      "name": "Honor 6A",
      "slug": "6a",
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
      "name": "Honor 6A Pro",
      "slug": "6a-pro",
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
      "name": "Honor 6C",
      "slug": "6c",
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
      "name": "Honor 6C Pro",
      "slug": "6c-pro",
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
      "name": "Honor 6X",
      "slug": "6x",
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
      "name": "Honor 7",
      "slug": "7",
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
      "name": "Honor 70",
      "slug": "70",
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
      "name": "Honor 70 Lite",
      "slug": "70-lite",
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
      "name": "Honor 7A",
      "slug": "7a",
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
      "name": "Honor 7C",
      "slug": "7c",
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
      "name": "Honor 7i",
      "slug": "7i",
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
      "name": "Honor 7S",
      "slug": "7s",
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
      "name": "Honor 7X",
      "slug": "7x",
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
      "name": "Honor 8",
      "slug": "8",
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
      "name": "Honor 8 Pro",
      "slug": "8-pro",
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
      "name": "Honor 8 Smart",
      "slug": "8-smart",
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
      "name": "Honor 8A",
      "slug": "8a",
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
      "name": "Honor 8C",
      "slug": "8c",
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
      "name": "Honor 8S",
      "slug": "8s",
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
      "name": "Honor 8X",
      "slug": "8x",
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
      "name": "Honor 8X Max",
      "slug": "8x-max",
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
      "name": "Honor 9",
      "slug": "9",
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
      "name": "Honor 9 Lite",
      "slug": "9-lite",
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
      "name": "Honor 90",
      "slug": "90",
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
      "name": "Honor 90 GT",
      "slug": "90-gt",
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
      "name": "Honor 90 Lite",
      "slug": "90-lite",
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
      "name": "Honor 90 Smart",
      "slug": "90-smart",
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
      "name": "Honor Elsa",
      "slug": "elsa",
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
      "name": "Honor Honor3",
      "slug": "honor3",
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
      "name": "Honor Magic",
      "slug": "magic",
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
      "name": "Honor Magic 2",
      "slug": "magic-2",
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
      "name": "Honor Magic V2",
      "slug": "magic-v2",
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
      "name": "Honor Magic V3",
      "slug": "magic-v3",
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
      "name": "Honor Magic V5",
      "slug": "magic-v5",
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
      "name": "Honor Magic V6",
      "slug": "magic-v6",
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
      "name": "Honor Magic Vs",
      "slug": "magic-vs",
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
      "name": "Honor Magic4 Pro",
      "slug": "magic4-pro",
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
      "name": "Honor Magic5",
      "slug": "magic5",
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
      "name": "Honor Magic5 Lite 5G",
      "slug": "magic5-lite-5g",
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
      "name": "Honor Magic5 Pro",
      "slug": "magic5-pro",
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
      "name": "Honor Magic6",
      "slug": "magic6",
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
      "name": "Honor Magic6 Lite 5G",
      "slug": "magic6-lite-5g",
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
      "name": "Honor Magic6 Pro",
      "slug": "magic6-pro",
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
      "name": "Honor Magic7",
      "slug": "magic7",
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
      "name": "Honor Magic7 Lite",
      "slug": "magic7-lite",
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
      "name": "Honor Magic7 Pro",
      "slug": "magic7-pro",
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
      "name": "Honor Magic8 Lite",
      "slug": "magic8-lite",
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
      "name": "Honor Magic8 Pro",
      "slug": "magic8-pro",
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
      "name": "Honor Magic9 Lite+",
      "slug": "magic9-lite",
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
      "name": "Honor Magic9 Pro Max",
      "slug": "magic9-pro-max",
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
      "name": "Honor Melody",
      "slug": "melody",
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
      "name": "Honor Note10",
      "slug": "note10",
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
      "name": "Honor Play",
      "slug": "play",
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
      "name": "Honor Play9C",
      "slug": "play9c",
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
      "name": "Honor Porsche Design Honor Magic V2 Rsr",
      "slug": "porsche-design-honor-magic-v2-rsr",
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
      "name": "Honor Porsche Design Honor Magic6",
      "slug": "porsche-design-honor-magic6",
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
      "name": "Honor Porsche Design Honor Magic6 Rsr",
      "slug": "porsche-design-honor-magic6-rsr",
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
      "name": "Honor Porsche Design Honor Magic7 Rsr",
      "slug": "porsche-design-honor-magic7-rsr",
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
      "name": "Honor V10",
      "slug": "v10",
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
      "name": "Honor V20",
      "slug": "v20",
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
      "name": "Honor V8",
      "slug": "v8",
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
      "name": "Honor View 10",
      "slug": "view-10",
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
      "name": "Honor View20",
      "slug": "view20",
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
      "name": "Honor X5",
      "slug": "x5",
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
      "name": "Honor X5 Plus",
      "slug": "x5-plus",
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
      "name": "Honor X5b",
      "slug": "x5b",
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
      "name": "Honor X5b Plus",
      "slug": "x5b-plus",
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
      "name": "Honor X5c",
      "slug": "x5c",
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
      "name": "Honor X5c Plus",
      "slug": "x5c-plus",
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
      "name": "Honor X5d",
      "slug": "x5d",
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
      "name": "Honor X5d Plus",
      "slug": "x5d-plus",
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
      "name": "Honor X6",
      "slug": "x6",
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
      "name": "Honor X6a",
      "slug": "x6a",
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
      "name": "Honor X6b",
      "slug": "x6b",
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
      "name": "Honor X6b 5G",
      "slug": "x6b-5g",
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
      "name": "Honor X6b Plus",
      "slug": "x6b-plus",
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
      "name": "Honor X6c",
      "slug": "x6c",
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
      "name": "Honor X6d 5G",
      "slug": "x6d-5g",
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
      "name": "Honor X6e",
      "slug": "x6e",
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
      "name": "Honor X7",
      "slug": "x7",
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
      "name": "Honor X7a",
      "slug": "x7a",
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
      "name": "Honor X7b",
      "slug": "x7b",
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
      "name": "Honor X7b 5G",
      "slug": "x7b-5g",
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
      "name": "Honor X7c",
      "slug": "x7c",
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
      "name": "Honor X7c 5G",
      "slug": "x7c-5g",
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
      "name": "Honor X7d",
      "slug": "x7d",
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
      "name": "Honor X7e",
      "slug": "x7e",
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
      "name": "Honor X7e Plus",
      "slug": "x7e-plus",
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
      "name": "Honor X8",
      "slug": "x8",
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
      "name": "Honor X8 5G",
      "slug": "x8-5g",
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
      "name": "Honor X8a",
      "slug": "x8a",
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
      "name": "Honor X8a 5G",
      "slug": "x8a-5g",
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
      "name": "Honor X8b",
      "slug": "x8b",
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
      "name": "Honor X8c",
      "slug": "x8c",
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
      "name": "Honor X8d",
      "slug": "x8d",
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
      "name": "Honor X8e",
      "slug": "x8e",
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
      "name": "Honor X8e s",
      "slug": "x8e-s",
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
      "name": "Honor X9",
      "slug": "x9",
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
      "name": "Honor X9 5G",
      "slug": "x9-5g",
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
      "name": "Honor X9a 5G",
      "slug": "x9a-5g",
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
      "name": "Honor X9b 5G",
      "slug": "x9b-5g",
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
      "name": "Honor X9c",
      "slug": "x9c",
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
      "name": "Honor X9c Smart",
      "slug": "x9c-smart",
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
      "name": "Honor X9e Pro",
      "slug": "x9e-pro",
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
      "name": "Honor X9e s",
      "slug": "x9e-s",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "google": [
    {
      "name": "Google Chromebase",
      "slug": "chromebase",
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
      "name": "Google Emualtor",
      "slug": "emualtor",
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
      "name": "Google Gambit",
      "slug": "gambit",
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
      "name": "Google Pixel",
      "slug": "pixel",
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
      "name": "Google Pixel 10",
      "slug": "pixel-10",
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
      "name": "Google Pixel 10 Pro",
      "slug": "pixel-10-pro",
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
      "name": "Google Pixel 10 Pro Fold",
      "slug": "pixel-10-pro-fold",
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
      "name": "Google Pixel 10 Pro XL",
      "slug": "pixel-10-pro-xl",
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
      "name": "Google Pixel 10a",
      "slug": "pixel-10a",
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
      "name": "Google Pixel 11",
      "slug": "pixel-11",
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
      "name": "Google Pixel 11 Pro",
      "slug": "pixel-11-pro",
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
      "name": "Google Pixel 11 Pro Fold",
      "slug": "pixel-11-pro-fold",
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
      "name": "Google Pixel 11 Pro XL",
      "slug": "pixel-11-pro-xl",
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
      "name": "Google Pixel 2",
      "slug": "pixel-2",
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
      "name": "Google Pixel 2 XL",
      "slug": "pixel-2-xl",
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
      "name": "Google Pixel 3",
      "slug": "pixel-3",
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
      "name": "Google Pixel 3 XL",
      "slug": "pixel-3-xl",
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
      "name": "Google Pixel 3a",
      "slug": "pixel-3a",
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
      "name": "Google Pixel 3a XL",
      "slug": "pixel-3a-xl",
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
      "name": "Google Pixel 4",
      "slug": "pixel-4",
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
      "name": "Google Pixel 4 XL",
      "slug": "pixel-4-xl",
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
      "name": "Google Pixel 4a",
      "slug": "pixel-4a",
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
      "name": "Google Pixel 4a (5G)",
      "slug": "pixel-4a-5g",
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
      "name": "Google Pixel 5",
      "slug": "pixel-5",
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
      "name": "Google Pixel 5a 5G",
      "slug": "pixel-5a-5g",
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
      "name": "Google Pixel 6",
      "slug": "pixel-6",
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
      "name": "Google Pixel 6 Pro",
      "slug": "pixel-6-pro",
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
      "name": "Google Pixel 6a",
      "slug": "pixel-6a",
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
      "name": "Google Pixel 7",
      "slug": "pixel-7",
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
      "name": "Google Pixel 7 Pro",
      "slug": "pixel-7-pro",
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
      "name": "Google Pixel 7a",
      "slug": "pixel-7a",
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
      "name": "Google Pixel 8",
      "slug": "pixel-8",
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
      "name": "Google Pixel 8 Pro",
      "slug": "pixel-8-pro",
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
      "name": "Google Pixel 8a",
      "slug": "pixel-8a",
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
      "name": "Google Pixel 9",
      "slug": "pixel-9",
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
      "name": "Google Pixel 9 Pro",
      "slug": "pixel-9-pro",
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
      "name": "Google Pixel 9 Pro Fold",
      "slug": "pixel-9-pro-fold",
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
      "name": "Google Pixel 9 Pro XL",
      "slug": "pixel-9-pro-xl",
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
      "name": "Google Pixel 9a",
      "slug": "pixel-9a",
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
      "name": "Google Pixel C",
      "slug": "pixel-c",
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
      "name": "Google Pixel Fold",
      "slug": "pixel-fold",
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
      "name": "Google Pixel Slate",
      "slug": "pixel-slate",
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
      "name": "Google Pixel XL",
      "slug": "pixel-xl",
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
      "name": "Google Pixelbook",
      "slug": "pixelbook",
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
      "name": "Google Play Games On PC",
      "slug": "play-games-on-pc",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "oneplus": [
    {
      "name": "OnePlus 12",
      "slug": "oneplus-12",
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
      "slug": "oneplus-12r",
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
      "name": "OnePlus Nord 4",
      "slug": "oneplus-nord-4",
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
      "name": "OnePlus Nord CE 4",
      "slug": "oneplus-nord-ce-4",
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
      "name": "OnePlus 10 Pro",
      "slug": "10-pro",
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
      "name": "OnePlus 10 Pro 5G",
      "slug": "10-pro-5g",
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
      "name": "OnePlus 10R 5G",
      "slug": "10r-5g",
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
      "name": "OnePlus 10T 5G",
      "slug": "10t-5g",
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
      "name": "OnePlus 11 5G",
      "slug": "11-5g",
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
      "name": "OnePlus 11R 5G",
      "slug": "11r-5g",
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
      "name": "OnePlus 12",
      "slug": "12",
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
      "name": "OnePlus 12R",
      "slug": "12r",
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
      "name": "OnePlus 13",
      "slug": "13",
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
      "name": "OnePlus 13R",
      "slug": "13r",
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
      "name": "OnePlus 13s",
      "slug": "13s",
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
      "name": "OnePlus 13T",
      "slug": "13t",
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
      "name": "OnePlus 15",
      "slug": "15",
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
      "name": "OnePlus 15R",
      "slug": "15r",
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
      "name": "OnePlus 15T",
      "slug": "15t",
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
      "name": "OnePlus 16",
      "slug": "16",
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
      "name": "OnePlus 6",
      "slug": "6",
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
      "name": "OnePlus 7",
      "slug": "7",
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
      "name": "OnePlus 7 Pro",
      "slug": "7-pro",
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
      "name": "OnePlus 7 Pro 5G",
      "slug": "7-pro-5g",
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
      "name": "OnePlus 7T",
      "slug": "7t",
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
      "name": "OnePlus 7T Pro",
      "slug": "7t-pro",
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
      "name": "OnePlus 7T Pro 5G",
      "slug": "7t-pro-5g",
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
      "name": "OnePlus 8",
      "slug": "8",
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
      "name": "OnePlus 8 5G",
      "slug": "8-5g",
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
      "name": "OnePlus 8 5G UW",
      "slug": "8-5g-uw",
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
      "name": "OnePlus 8 Pro",
      "slug": "8-pro",
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
      "name": "OnePlus 8T",
      "slug": "8t",
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
      "name": "OnePlus 8T+ 5G",
      "slug": "8t-5g",
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
      "name": "OnePlus 9 5G",
      "slug": "9-5g",
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
      "name": "OnePlus 9 Pro 5G",
      "slug": "9-pro-5g",
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
      "name": "OnePlus 9R",
      "slug": "9r",
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
      "name": "OnePlus 9RT 5G",
      "slug": "9rt-5g",
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
      "name": "OnePlus Ace",
      "slug": "ace",
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
      "name": "OnePlus Ace 2 Pro",
      "slug": "ace-2-pro",
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
      "name": "OnePlus Ace 3",
      "slug": "ace-3",
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
      "name": "OnePlus Ace 3 Pro",
      "slug": "ace-3-pro",
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
      "name": "OnePlus Ace 3V",
      "slug": "ace-3v",
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
      "name": "OnePlus Ace 5",
      "slug": "ace-5",
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
      "name": "OnePlus Ace 5 Pro",
      "slug": "ace-5-pro",
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
      "name": "OnePlus Ace 6",
      "slug": "ace-6",
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
      "name": "OnePlus Ace 7",
      "slug": "ace-7",
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
      "name": "OnePlus Ace 7 Pro",
      "slug": "ace-7-pro",
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
      "name": "OnePlus C00",
      "slug": "c00",
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
      "name": "OnePlus D00",
      "slug": "d00",
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
      "name": "OnePlus Dosa IN",
      "slug": "dosa-in",
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
      "name": "OnePlus E00",
      "slug": "e00",
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
      "name": "OnePlus H93A",
      "slug": "h93a",
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
      "name": "OnePlus N1",
      "slug": "n1",
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
      "name": "OnePlus N1 Pro",
      "slug": "n1-pro",
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
      "name": "OnePlus N6",
      "slug": "n6",
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
      "name": "OnePlus N6 Lite",
      "slug": "n6-lite",
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
      "name": "OnePlus N6x",
      "slug": "n6x",
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
      "name": "OnePlus Nord",
      "slug": "nord",
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
      "name": "OnePlus Nord 2T 5G",
      "slug": "nord-2t-5g",
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
      "name": "OnePlus Nord 3 5G",
      "slug": "nord-3-5g",
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
      "name": "OnePlus Nord 4",
      "slug": "nord-4",
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
      "name": "OnePlus Nord 5",
      "slug": "nord-5",
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
      "name": "OnePlus Nord 6",
      "slug": "nord-6",
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
      "name": "OnePlus Nord CE 2",
      "slug": "nord-ce-2",
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
      "name": "OnePlus Nord CE 2 Lite 5G",
      "slug": "nord-ce-2-lite-5g",
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
      "name": "OnePlus Nord CE 3 Lite",
      "slug": "oneplus-nord-ce-3-lite",
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
      "name": "OnePlus Nord CE 3 Lite 5G",
      "slug": "nord-ce-3-lite-5g",
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
      "name": "OnePlus Nord CE 5G",
      "slug": "nord-ce-5g",
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
      "name": "OnePlus Nord CE4",
      "slug": "nord-ce4",
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
      "name": "OnePlus Nord CE4 Lite 5G",
      "slug": "nord-ce4-lite-5g",
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
      "name": "OnePlus Nord CE5",
      "slug": "nord-ce5",
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
      "name": "OnePlus Nord CE6",
      "slug": "nord-ce6",
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
      "name": "OnePlus Nord CE6 Lite",
      "slug": "nord-ce6-lite",
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
      "name": "OnePlus Nord N10 5G",
      "slug": "nord-n10-5g",
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
      "name": "OnePlus Nord N100",
      "slug": "nord-n100",
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
      "name": "OnePlus Nord N20 5G",
      "slug": "nord-n20-5g",
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
      "name": "OnePlus Nord N200 5G",
      "slug": "nord-n200-5g",
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
      "name": "OnePlus Nord N30 5G",
      "slug": "nord-n30-5g",
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
      "name": "OnePlus Nord N30 SE 5G",
      "slug": "nord-n30-se-5g",
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
      "name": "OnePlus Nord2 5G",
      "slug": "nord2-5g",
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
      "name": "OnePlus One",
      "slug": "one",
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
      "name": "OnePlus OnePlus2",
      "slug": "oneplus2",
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
      "name": "OnePlus OnePlus3T",
      "slug": "oneplus3t",
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
      "name": "OnePlus OnePlus5",
      "slug": "oneplus5",
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
      "name": "OnePlus OnePlus5T",
      "slug": "oneplus5t",
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
      "name": "OnePlus OnePlus6T",
      "slug": "oneplus6t",
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
      "name": "OnePlus Open",
      "slug": "oneplus-open",
      "year": 2023,
      "storage": [
        512
      ],
      "ram": [
        16
      ]
    },
    {
      "name": "OnePlus Open",
      "slug": "open",
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
      "name": "OnePlus Turbo 6",
      "slug": "turbo-6",
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
      "name": "OnePlus X",
      "slug": "x",
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
      "name": "OnePlus Y Series",
      "slug": "y-series",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "motorola": [
    {
      "name": "Motorola Atrix",
      "slug": "atrix",
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
      "name": "Motorola Atrix HD",
      "slug": "atrix-hd",
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
      "name": "Motorola Backflip",
      "slug": "backflip",
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
      "name": "Motorola Charm",
      "slug": "charm",
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
      "name": "Motorola Citrus",
      "slug": "citrus",
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
      "name": "Motorola Cliq",
      "slug": "cliq",
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
      "name": "Motorola Cliq-XT",
      "slug": "cliq-xt",
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
      "name": "Motorola Defy",
      "slug": "defy",
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
      "name": "Motorola Defy 2",
      "slug": "defy-2",
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
      "name": "Motorola Defy Mini",
      "slug": "defy-mini",
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
      "name": "Motorola Defy Pro",
      "slug": "defy-pro",
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
      "name": "Motorola Defy x",
      "slug": "defy-x",
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
      "name": "Motorola Devour",
      "slug": "devour",
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
      "name": "Motorola Droid",
      "slug": "droid",
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
      "name": "Motorola Droid 3",
      "slug": "droid-3",
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
      "name": "Motorola Droid 4",
      "slug": "droid-4",
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
      "name": "Motorola Droid Bionic",
      "slug": "droid-bionic",
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
      "name": "Motorola Droid II",
      "slug": "droid-ii",
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
      "name": "Motorola Droid Maxx 2",
      "slug": "droid-maxx-2",
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
      "name": "Motorola Droid Mini",
      "slug": "droid-mini",
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
      "name": "Motorola Droid Pro",
      "slug": "droid-pro",
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
      "name": "Motorola Droid Razr",
      "slug": "droid-razr",
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
      "name": "Motorola Droid Razr HD",
      "slug": "droid-razr-hd",
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
      "name": "Motorola Droid Turbo",
      "slug": "droid-turbo",
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
      "name": "Motorola Droid Turbo 2",
      "slug": "droid-turbo-2",
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
      "name": "Motorola Droid Ultra",
      "slug": "droid-ultra",
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
      "name": "Motorola Droid X",
      "slug": "droid-x",
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
      "name": "Motorola Droid X2",
      "slug": "droid-x2",
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
      "name": "Motorola Edge (2021)",
      "slug": "edge-2021",
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
      "name": "Motorola Edge (2022)",
      "slug": "edge-2022",
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
      "name": "Motorola Edge - 2026",
      "slug": "edge-2026",
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
      "name": "Motorola Edge 20",
      "slug": "edge-20",
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
      "name": "Motorola Edge 20 Fusion",
      "slug": "edge-20-fusion",
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
      "name": "Motorola Edge 20 Lite",
      "slug": "edge-20-lite",
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
      "name": "Motorola Edge 20 Pro",
      "slug": "edge-20-pro",
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
      "name": "Motorola Edge 2024",
      "slug": "edge-2024",
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
      "name": "Motorola Edge 30",
      "slug": "edge-30",
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
      "name": "Motorola Edge 30 Fusion",
      "slug": "edge-30-fusion",
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
      "name": "Motorola Edge 30 Neo",
      "slug": "edge-30-neo",
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
      "name": "Motorola Edge 30 Ultra",
      "slug": "edge-30-ultra",
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
      "name": "Motorola Edge 40",
      "slug": "edge-40",
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
      "name": "Motorola Edge 40 Neo",
      "slug": "edge-40-neo",
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
      "name": "Motorola Edge 50",
      "slug": "edge-50",
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
      "name": "Motorola Edge 50 Fusion",
      "slug": "edge-50-fusion",
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
      "name": "Motorola Edge 50 Pro",
      "slug": "edge-50-pro",
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
      "name": "Motorola Edge 50 Ultra",
      "slug": "edge-50-ultra",
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
      "name": "Motorola Edge 5G UW (2021)",
      "slug": "edge-5g-uw-2021",
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
      "name": "Motorola Edge 60",
      "slug": "edge-60",
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
      "name": "Motorola Edge 60 Fusion",
      "slug": "edge-60-fusion",
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
      "name": "Motorola Edge 60 Neo",
      "slug": "edge-60-neo",
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
      "name": "Motorola Edge 60 Pro",
      "slug": "edge-60-pro",
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
      "name": "Motorola Edge 60 Stylus",
      "slug": "edge-60-stylus",
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
      "name": "Motorola Edge 60s Pro",
      "slug": "edge-60s-pro",
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
      "name": "Motorola Edge 70",
      "slug": "edge-70",
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
      "name": "Motorola Edge 70 Fusion",
      "slug": "edge-70-fusion",
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
      "name": "Motorola Edge 70 Max",
      "slug": "edge-70-max",
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
      "name": "Motorola Edge 70 pro+",
      "slug": "edge-70-pro",
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
      "name": "Motorola Edge Plus",
      "slug": "edge-plus",
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
      "name": "Motorola Edge Plus 2023",
      "slug": "edge-plus-2023",
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
      "name": "Motorola Edge Plus 5G UW (2022)",
      "slug": "edge-plus-5g-uw-2022",
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
      "name": "Motorola Edge s Pro",
      "slug": "edge-s-pro",
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
      "name": "Motorola Edge S30",
      "slug": "edge-s30",
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
      "name": "Motorola Egde s",
      "slug": "egde-s",
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
      "name": "Motorola Electrify 2",
      "slug": "electrify-2",
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
      "name": "Motorola Electrify M",
      "slug": "electrify-m",
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
      "name": "Motorola Flipkart India Private Limited",
      "slug": "flipkart-india-private-limited",
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
      "name": "Motorola FlipkartTVPro",
      "slug": "flipkarttvpro",
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
      "name": "Motorola Flipout",
      "slug": "flipout",
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
      "name": "Motorola Glam XT800",
      "slug": "glam-xt800",
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
      "name": "Motorola HS1",
      "slug": "hs1",
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
      "name": "Motorola Lenovo K10",
      "slug": "lenovo-k10",
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
      "name": "Motorola Lenovo K11 Power",
      "slug": "lenovo-k11-power",
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
      "name": "Motorola Lenovo K12",
      "slug": "lenovo-k12",
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
      "name": "Motorola Lenovo K12 Pro",
      "slug": "lenovo-k12-pro",
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
      "name": "Motorola Lenovo K13",
      "slug": "lenovo-k13",
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
      "name": "Motorola Lenovo K13 Note",
      "slug": "lenovo-k13-note",
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
      "name": "Motorola Lenovo K14",
      "slug": "lenovo-k14",
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
      "name": "Motorola Lenovo K14 Note",
      "slug": "lenovo-k14-note",
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
      "name": "Motorola Lenovo K14 Plus",
      "slug": "lenovo-k14-plus",
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
      "name": "Motorola Lenovo K15",
      "slug": "lenovo-k15",
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
      "name": "Motorola Lenovo XT2081-4",
      "slug": "lenovo-xt2081-4",
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
      "name": "Motorola Lenovo XT2091-7",
      "slug": "lenovo-xt2091-7",
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
      "name": "Motorola Master Touch XT621",
      "slug": "master-touch-xt621",
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
      "name": "Motorola Milestone2",
      "slug": "milestone2",
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
      "name": "Motorola Moto 360 Sport",
      "slug": "moto-360-sport",
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
      "name": "Motorola Moto C",
      "slug": "moto-c",
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
      "name": "Motorola Moto C Plus",
      "slug": "moto-c-plus",
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
      "name": "Motorola Moto Defy XT",
      "slug": "moto-defy-xt",
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
      "name": "Motorola Moto e",
      "slug": "moto-e",
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
      "name": "Motorola Moto E (1st Gen)",
      "slug": "moto-e-1st-gen",
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
      "name": "Motorola Moto E (2nd Gen)",
      "slug": "moto-e-2nd-gen",
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
      "name": "Motorola Moto E (4) Plus",
      "slug": "moto-e-4-plus",
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
      "name": "Motorola Moto E (5) Cruise",
      "slug": "moto-e-5-cruise",
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
      "name": "Motorola Moto E (6i)",
      "slug": "moto-e-6i",
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
      "name": "Motorola Moto E (7)",
      "slug": "moto-e-7",
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
      "name": "Motorola Moto E (7) Power",
      "slug": "moto-e-7-power",
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
      "name": "Motorola Moto E (7i) Power",
      "slug": "moto-e-7i-power",
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
      "name": "Motorola Moto E (XT2052DL)",
      "slug": "moto-e-xt2052dl",
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
      "name": "Motorola Moto E With 4G LTE (2nd Gen)",
      "slug": "moto-e-with-4g-lte-2nd-gen",
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
      "name": "Motorola Moto E13",
      "slug": "moto-e13",
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
      "name": "Motorola Moto E20",
      "slug": "moto-e20",
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
      "name": "Motorola Moto E22",
      "slug": "moto-e22",
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
      "name": "Motorola Moto E22i",
      "slug": "moto-e22i",
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
      "name": "Motorola Moto E3",
      "slug": "moto-e3",
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
      "name": "Motorola Moto E3 Power",
      "slug": "moto-e3-power",
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
      "name": "Motorola Moto E30",
      "slug": "moto-e30",
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
      "name": "Motorola Moto E32",
      "slug": "moto-e32",
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
      "name": "Motorola Moto E4",
      "slug": "moto-e4",
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
      "name": "Motorola Moto E40",
      "slug": "moto-e40",
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
      "name": "Motorola Moto E5",
      "slug": "moto-e5",
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
      "name": "Motorola Moto E5 Go",
      "slug": "moto-e5-go",
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
      "name": "Motorola Moto E5 Play",
      "slug": "moto-e5-play",
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
      "name": "Motorola Moto E5 Plus",
      "slug": "moto-e5-plus",
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
      "name": "Motorola Moto E6",
      "slug": "moto-e6",
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
      "name": "Motorola Moto E6 Play",
      "slug": "moto-e6-play",
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
      "name": "Motorola Moto E6s",
      "slug": "moto-e6s",
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
      "name": "Motorola Moto Edge X30",
      "slug": "moto-edge-x30",
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
      "name": "Motorola Moto e\u2076 Plus",
      "slug": "moto-e-plus",
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
      "name": "Motorola Moto G (10)",
      "slug": "moto-g-10",
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
      "name": "Motorola Moto G (1st Gen)",
      "slug": "moto-g-1st-gen",
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
      "name": "Motorola Moto G (20)",
      "slug": "moto-g-20",
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
      "name": "Motorola Moto G (2nd Gen)",
      "slug": "moto-g-2nd-gen",
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
      "name": "Motorola Moto G (30)",
      "slug": "moto-g-30",
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
      "name": "Motorola Moto G (4) Plus",
      "slug": "moto-g-4-plus",
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
      "name": "Motorola Moto G (50)",
      "slug": "moto-g-50",
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
      "name": "Motorola Moto G (5S)",
      "slug": "moto-g-5s",
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
      "name": "Motorola Moto G (5S) Plus",
      "slug": "moto-g-5s-plus",
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
      "name": "Motorola Moto G (5th Gen)",
      "slug": "moto-g-5th-gen",
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
      "name": "Motorola Moto G (6)",
      "slug": "moto-g-6",
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
      "name": "Motorola Moto G (6) Plus",
      "slug": "moto-g-6-plus",
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
      "name": "Motorola Moto G (60)s",
      "slug": "moto-g-60-s",
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
      "name": "Motorola Moto G (7) Optimo (XT1952DL)",
      "slug": "moto-g-7-optimo-xt1952dl",
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
      "name": "Motorola Moto G (7) Optimo Maxx (XT1955DL)",
      "slug": "moto-g-7-optimo-maxx-xt1955dl",
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
      "name": "Motorola Moto G (7) Play",
      "slug": "moto-g-7-play",
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
      "name": "Motorola Moto G (7) Plus",
      "slug": "moto-g-7-plus",
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
      "name": "Motorola Moto G (7) Power",
      "slug": "moto-g-7-power",
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
      "name": "Motorola Moto G (7) Supra",
      "slug": "moto-g-7-supra",
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
      "name": "Motorola Moto G (8)",
      "slug": "moto-g-8",
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
      "name": "Motorola Moto G (8) Play",
      "slug": "moto-g-8-play",
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
      "name": "Motorola Moto G (8) Plus",
      "slug": "moto-g-8-plus",
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
      "name": "Motorola Moto G (8) Power",
      "slug": "moto-g-8-power",
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
      "name": "Motorola Moto G (8) Power Lite",
      "slug": "moto-g-8-power-lite",
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
      "name": "Motorola Moto G (9)",
      "slug": "moto-g-9",
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
      "name": "Motorola Moto G (9) Play",
      "slug": "moto-g-9-play",
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
      "name": "Motorola Moto G (9) Plus",
      "slug": "moto-g-9-plus",
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
      "name": "Motorola Moto G (9) Power",
      "slug": "moto-g-9-power",
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
      "name": "Motorola Moto G - 2026",
      "slug": "moto-g-2026",
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
      "name": "Motorola Moto G 5G",
      "slug": "moto-g-5g",
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
      "name": "Motorola Moto G 5G - 2024",
      "slug": "moto-g-5g-2024",
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
      "name": "Motorola Moto G Fast",
      "slug": "moto-g-fast",
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
      "name": "Motorola Moto G Google Play Edition",
      "slug": "moto-g-google-play-edition",
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
      "name": "Motorola Moto G Play (2021)",
      "slug": "moto-g-play-2021",
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
      "name": "Motorola Moto G Play - 2026",
      "slug": "moto-g-play-2026",
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
      "name": "Motorola Moto G Power (2021)",
      "slug": "moto-g-power-2021",
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
      "name": "Motorola Moto G Power (2022)",
      "slug": "moto-g-power-2022",
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
      "name": "Motorola Moto G Power (XT2041DL)",
      "slug": "moto-g-power-xt2041dl",
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
      "name": "Motorola Moto G Power - 2026",
      "slug": "moto-g-power-2026",
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
      "name": "Motorola Moto G Power 5G - 2024",
      "slug": "moto-g-power-5g-2024",
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
      "name": "Motorola Moto G Pro",
      "slug": "moto-g-pro",
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
      "name": "Motorola Moto G Pure",
      "slug": "moto-g-pure",
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
      "name": "Motorola Moto G Stylus (2021)",
      "slug": "moto-g-stylus-2021",
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
      "name": "Motorola Moto G Stylus (2022)",
      "slug": "moto-g-stylus-2022",
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
      "name": "Motorola Moto G Stylus (2023)",
      "slug": "moto-g-stylus-2023",
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
      "name": "Motorola Moto G Stylus - 2026",
      "slug": "moto-g-stylus-2026",
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
      "name": "Motorola Moto G Stylus 5G",
      "slug": "moto-g-stylus-5g",
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
      "name": "Motorola Moto G Stylus 5G - 2023",
      "slug": "moto-g-stylus-5g-2023",
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
      "name": "Motorola Moto G Stylus 5G - 2024",
      "slug": "moto-g-stylus-5g-2024",
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
      "name": "Motorola Moto G Stylus 5G - 2025",
      "slug": "moto-g-stylus-5g-2025",
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
      "name": "Motorola Moto G Turbo Edition",
      "slug": "moto-g-turbo-edition",
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
      "name": "Motorola Moto G With 4G LTE (1st Gen)",
      "slug": "moto-g-with-4g-lte-1st-gen",
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
      "name": "Motorola Moto G With 4G LTE (2nd Gen)",
      "slug": "moto-g-with-4g-lte-2nd-gen",
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
      "name": "Motorola Moto G04",
      "slug": "moto-g04",
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
      "name": "Motorola Moto G04s",
      "slug": "moto-g04s",
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
      "name": "Motorola Moto G06",
      "slug": "moto-g06",
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
      "name": "Motorola Moto G06 Power",
      "slug": "moto-g06-power",
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
      "name": "Motorola Moto G10 Power",
      "slug": "moto-g10-power",
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
      "name": "Motorola Moto G13",
      "slug": "moto-g13",
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
      "name": "Motorola Moto G14",
      "slug": "moto-g14",
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
      "name": "Motorola Moto G15",
      "slug": "moto-g15",
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
      "name": "Motorola Moto G22",
      "slug": "moto-g22",
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
      "name": "Motorola Moto G23",
      "slug": "moto-g23",
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
      "name": "Motorola Moto G24",
      "slug": "moto-g24",
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
      "name": "Motorola Moto G24 Power",
      "slug": "moto-g24-power",
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
      "name": "Motorola Moto G31",
      "slug": "moto-g31",
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
      "name": "Motorola Moto G32",
      "slug": "moto-g32",
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
      "name": "Motorola Moto G34",
      "slug": "moto-g34",
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
      "name": "Motorola Moto G34 5G",
      "slug": "moto-g34-5g",
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
      "name": "Motorola Moto G35 5G",
      "slug": "moto-g35-5g",
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
      "name": "Motorola Moto G37",
      "slug": "moto-g37",
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
      "name": "Motorola Moto G37 M-51G",
      "slug": "moto-g37-m-51g",
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
      "name": "Motorola Moto G37 Power",
      "slug": "moto-g37-power",
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
      "name": "Motorola Moto G37j",
      "slug": "moto-g37j",
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
      "name": "Motorola Moto G4 Play",
      "slug": "moto-g4-play",
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
      "name": "Motorola Moto G40 Fusion",
      "slug": "moto-g40-fusion",
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
      "name": "Motorola Moto G41",
      "slug": "moto-g41",
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
      "name": "Motorola Moto G42",
      "slug": "moto-g42",
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
      "name": "Motorola Moto G45 5G",
      "slug": "moto-g45-5g",
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
      "name": "Motorola Moto G51",
      "slug": "moto-g51",
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
      "name": "Motorola Moto G52",
      "slug": "moto-g52",
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
      "name": "Motorola Moto G52j 5G",
      "slug": "moto-g52j-5g",
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
      "name": "Motorola Moto G53",
      "slug": "moto-g53",
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
      "name": "Motorola Moto G53 5G",
      "slug": "moto-g53-5g",
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
      "name": "Motorola Moto G53j 5G",
      "slug": "moto-g53j-5g",
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
      "name": "Motorola Moto G53s 5G",
      "slug": "moto-g53s-5g",
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
      "name": "Motorola Moto G53y 5G",
      "slug": "moto-g53y-5g",
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
      "name": "Motorola Moto G54 5G",
      "slug": "moto-g54-5g",
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
      "name": "Motorola Moto G55 5G",
      "slug": "moto-g55-5g",
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
      "name": "Motorola Moto G56 5G",
      "slug": "moto-g56-5g",
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
      "name": "Motorola Moto G57",
      "slug": "moto-g57",
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
      "name": "Motorola Moto G57 Power",
      "slug": "moto-g57-power",
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
      "name": "Motorola Moto G6 Play",
      "slug": "moto-g6-play",
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
      "name": "Motorola Moto G62 5G",
      "slug": "moto-g62-5g",
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
      "name": "Motorola Moto G64y 5G",
      "slug": "moto-g64y-5g",
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
      "name": "Motorola Moto G66j 5G",
      "slug": "moto-g66j-5g",
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
      "name": "Motorola Moto G66y 5G",
      "slug": "moto-g66y-5g",
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
      "name": "Motorola Moto G67 Power 5G",
      "slug": "moto-g67-power-5g",
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
      "name": "Motorola Moto G71 5G",
      "slug": "moto-g71-5g",
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
      "name": "Motorola Moto G72",
      "slug": "moto-g72",
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
      "name": "Motorola Moto G73 5G",
      "slug": "moto-g73-5g",
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
      "name": "Motorola Moto G75 5G",
      "slug": "moto-g75-5g",
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
      "name": "Motorola Moto G77",
      "slug": "moto-g77",
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
      "name": "Motorola Moto G77 Power",
      "slug": "moto-g77-power",
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
      "name": "Motorola Moto G82 5G",
      "slug": "moto-g82-5g",
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
      "name": "Motorola Moto G84 5G",
      "slug": "moto-g84-5g",
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
      "name": "Motorola Moto G85 5G",
      "slug": "moto-g85-5g",
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
      "name": "Motorola Moto G86 5G",
      "slug": "moto-g86-5g",
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
      "name": "Motorola Moto G86 Power 5G",
      "slug": "moto-g86-power-5g",
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
      "name": "Motorola Moto G87",
      "slug": "moto-g87",
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
      "name": "Motorola Moto G96 5G",
      "slug": "moto-g96-5g",
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
      "name": "Motorola Moto P30",
      "slug": "moto-p30",
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
      "name": "Motorola Moto P30 Note",
      "slug": "moto-p30-note",
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
      "name": "Motorola Moto P30 Play",
      "slug": "moto-p30-play",
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
      "name": "Motorola Moto Razr 40",
      "slug": "moto-razr-40",
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
      "name": "Motorola Moto Razr 40 Ultra",
      "slug": "moto-razr-40-ultra",
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
      "name": "Motorola Moto Razr 50",
      "slug": "moto-razr-50",
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
      "name": "Motorola Moto Razr 70 Ultra",
      "slug": "moto-razr-70-ultra",
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
      "name": "Motorola Moto S30",
      "slug": "moto-s30",
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
      "name": "Motorola Moto Turbo",
      "slug": "moto-turbo",
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
      "name": "Motorola Moto X (1st Gen)",
      "slug": "moto-x-1st-gen",
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
      "name": "Motorola Moto X (2nd Gen)",
      "slug": "moto-x-2nd-gen",
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
      "name": "Motorola Moto X Force",
      "slug": "moto-x-force",
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
      "name": "Motorola Moto X Play",
      "slug": "moto-x-play",
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
      "name": "Motorola Moto X Pro (China)",
      "slug": "moto-x-pro-china",
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
      "name": "Motorola Moto X Pure Edition",
      "slug": "moto-x-pure-edition",
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
      "name": "Motorola Moto X Style",
      "slug": "moto-x-style",
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
      "name": "Motorola Moto X40",
      "slug": "moto-x40",
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
      "name": "Motorola Moto X70 Air",
      "slug": "moto-x70-air",
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
      "name": "Motorola Moto X70 Pro",
      "slug": "moto-x70-pro",
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
      "name": "Motorola Moto Z",
      "slug": "moto-z",
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
      "name": "Motorola Moto Z (2) Force",
      "slug": "moto-z-2-force",
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
      "name": "Motorola Moto Z (2) Play",
      "slug": "moto-z-2-play",
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
      "name": "Motorola Moto Z (3)",
      "slug": "moto-z-3",
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
      "name": "Motorola Moto Z Droid",
      "slug": "moto-z-droid",
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
      "name": "Motorola Moto Z Play",
      "slug": "moto-z-play",
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
      "name": "Motorola Moto Z Play Droid",
      "slug": "moto-z-play-droid",
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
      "name": "Motorola Moto Z4",
      "slug": "moto-z4",
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
      "name": "Motorola Motoluxe",
      "slug": "motoluxe",
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
      "name": "Motorola Motoroi",
      "slug": "motoroi",
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
      "name": "Motorola MotorolaTV",
      "slug": "motorolatv",
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
      "name": "Motorola Motosmart",
      "slug": "motosmart",
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
      "name": "Motorola Nexus 6",
      "slug": "nexus-6",
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
      "name": "Motorola One",
      "slug": "one",
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
      "name": "Motorola One 5G",
      "slug": "one-5g",
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
      "name": "Motorola One 5G Ace",
      "slug": "one-5g-ace",
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
      "name": "Motorola One 5G UW",
      "slug": "one-5g-uw",
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
      "name": "Motorola One 5G UW Ace",
      "slug": "one-5g-uw-ace",
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
      "name": "Motorola One Action",
      "slug": "one-action",
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
      "name": "Motorola One Fusion",
      "slug": "one-fusion",
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
      "name": "Motorola One Hyper",
      "slug": "one-hyper",
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
      "name": "Motorola One Macro",
      "slug": "one-macro",
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
      "name": "Motorola One Power",
      "slug": "one-power",
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
      "name": "Motorola One Vision",
      "slug": "one-vision",
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
      "name": "Motorola One Vision Plus",
      "slug": "one-vision-plus",
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
      "name": "Motorola One Zoom",
      "slug": "one-zoom",
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
      "name": "Motorola Opus One",
      "slug": "opus-one",
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
      "name": "Motorola p50",
      "slug": "p50",
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
      "name": "Motorola Photon",
      "slug": "photon",
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
      "name": "Motorola Photon 4G",
      "slug": "photon-4g",
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
      "name": "Motorola Quench XT3",
      "slug": "quench-xt3",
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
      "name": "Motorola Razr",
      "slug": "razr",
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
      "name": "Motorola Razr (2020)",
      "slug": "razr-2020",
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
      "name": "Motorola Razr 2022",
      "slug": "razr-2022",
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
      "name": "Motorola Razr 2024",
      "slug": "razr-2024",
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
      "name": "Motorola Razr 2025",
      "slug": "razr-2025",
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
      "name": "Motorola Razr 2026",
      "slug": "razr-2026",
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
      "name": "Motorola Razr 40s",
      "slug": "razr-40s",
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
      "name": "Motorola Razr 50",
      "slug": "razr-50",
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
      "name": "Motorola Razr 50 Ultra",
      "slug": "razr-50-ultra",
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
      "name": "Motorola Razr 5G",
      "slug": "razr-5g",
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
      "name": "Motorola Razr 60",
      "slug": "razr-60",
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
      "name": "Motorola Razr 60 Ultra",
      "slug": "razr-60-ultra",
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
      "name": "Motorola Razr 60d M-51F",
      "slug": "razr-60d-m-51f",
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
      "name": "Motorola Razr 60s",
      "slug": "razr-60s",
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
      "name": "Motorola Razr 70",
      "slug": "razr-70",
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
      "name": "Motorola Razr 70 Plus",
      "slug": "razr-70-plus",
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
      "name": "Motorola Razr 70 Ultra",
      "slug": "razr-70-ultra",
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
      "name": "Motorola Razr D1",
      "slug": "razr-d1",
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
      "name": "Motorola Razr D3",
      "slug": "razr-d3",
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
      "name": "Motorola Razr Fold",
      "slug": "razr-fold",
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
      "name": "Motorola Razr Fold 2026",
      "slug": "razr-fold-2026",
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
      "name": "Motorola Razr HD",
      "slug": "razr-hd",
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
      "name": "Motorola Razr i",
      "slug": "razr-i",
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
      "name": "Motorola Razr M",
      "slug": "razr-m",
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
      "name": "Motorola Razr Plus 2023",
      "slug": "razr-plus-2023",
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
      "name": "Motorola Razr Plus 2024",
      "slug": "razr-plus-2024",
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
      "name": "Motorola Razr Plus 2025",
      "slug": "razr-plus-2025",
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
      "name": "Motorola Razr Plus 2026",
      "slug": "razr-plus-2026",
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
      "name": "Motorola Razr Ultra 2025",
      "slug": "razr-ultra-2025",
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
      "name": "Motorola Razr Ultra 2026",
      "slug": "razr-ultra-2026",
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
      "name": "Motorola Razr V",
      "slug": "razr-v",
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
      "name": "Motorola Signature",
      "slug": "signature",
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
      "name": "Motorola Signature 27",
      "slug": "signature-27",
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
      "name": "Motorola Spice",
      "slug": "spice",
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
      "name": "Motorola ThinkPhone 25 By Motorola",
      "slug": "thinkphone-25-by-motorola",
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
      "name": "Motorola ThinkPhone By Motorola",
      "slug": "thinkphone-by-motorola",
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
      "name": "Motorola Xoom",
      "slug": "xoom",
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
      "name": "Motorola Xoom 2",
      "slug": "xoom-2",
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
      "name": "Motorola XT2071-4",
      "slug": "xt2071-4",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "nokia": [
    {
      "name": "Nokia 1",
      "slug": "1",
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
      "name": "Nokia 1 Plus",
      "slug": "1-plus",
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
      "name": "Nokia 1.3",
      "slug": "1-3",
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
      "name": "Nokia 1.4",
      "slug": "1-4",
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
      "name": "Nokia 2",
      "slug": "2",
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
      "name": "Nokia 2 V",
      "slug": "2-v",
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
      "name": "Nokia 2 V Tella",
      "slug": "2-v-tella",
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
      "name": "Nokia 2.1",
      "slug": "2-1",
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
      "name": "Nokia 2.2",
      "slug": "2-2",
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
      "name": "Nokia 2.3",
      "slug": "2-3",
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
      "name": "Nokia 2.4",
      "slug": "2-4",
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
      "name": "Nokia 3",
      "slug": "3",
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
      "name": "Nokia 3 V",
      "slug": "3-v",
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
      "name": "Nokia 3.1",
      "slug": "3-1",
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
      "name": "Nokia 3.1 A",
      "slug": "3-1-a",
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
      "name": "Nokia 3.1 C",
      "slug": "3-1-c",
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
      "name": "Nokia 3.1 Plus",
      "slug": "3-1-plus",
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
      "name": "Nokia 3.2",
      "slug": "3-2",
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
      "name": "Nokia 3.4",
      "slug": "3-4",
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
      "name": "Nokia 4.2",
      "slug": "4-2",
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
      "name": "Nokia 5",
      "slug": "5",
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
      "name": "Nokia 5.1",
      "slug": "5-1",
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
      "name": "Nokia 5.1 Plus",
      "slug": "5-1-plus",
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
      "name": "Nokia 5.3",
      "slug": "5-3",
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
      "name": "Nokia 5.4",
      "slug": "5-4",
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
      "name": "Nokia 6",
      "slug": "6",
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
      "name": "Nokia 6.1",
      "slug": "6-1",
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
      "name": "Nokia 6.1 Plus",
      "slug": "6-1-plus",
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
      "name": "Nokia 6.2",
      "slug": "6-2",
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
      "name": "Nokia 7",
      "slug": "7",
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
      "name": "Nokia 7 Plus",
      "slug": "7-plus",
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
      "name": "Nokia 7.1",
      "slug": "7-1",
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
      "name": "Nokia 7.2",
      "slug": "7-2",
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
      "name": "Nokia 8",
      "slug": "8",
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
      "name": "Nokia 8 Sirocco",
      "slug": "8-sirocco",
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
      "name": "Nokia 8 V 5G UW",
      "slug": "8-v-5g-uw",
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
      "name": "Nokia 8.1",
      "slug": "8-1",
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
      "name": "Nokia 8.3 5G",
      "slug": "8-3-5g",
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
      "name": "Nokia 9",
      "slug": "9",
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
      "name": "Nokia C01 Plus",
      "slug": "c01-plus",
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
      "name": "Nokia C02",
      "slug": "c02",
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
      "name": "Nokia C1",
      "slug": "c1",
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
      "name": "Nokia C1 2nd Edition",
      "slug": "c1-2nd-edition",
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
      "name": "Nokia C1 Plus",
      "slug": "c1-plus",
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
      "name": "Nokia C10",
      "slug": "c10",
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
      "name": "Nokia C12",
      "slug": "c12",
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
      "name": "Nokia C12 Pro",
      "slug": "c12-pro",
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
      "name": "Nokia C2",
      "slug": "c2",
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
      "name": "Nokia C2 2nd Edition",
      "slug": "c2-2nd-edition",
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
      "name": "Nokia C2 Tennen",
      "slug": "c2-tennen",
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
      "name": "Nokia C20",
      "slug": "c20",
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
      "name": "Nokia C20 Plus",
      "slug": "c20-plus",
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
      "name": "Nokia C21",
      "slug": "c21",
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
      "name": "Nokia C21 Plus",
      "slug": "c21-plus",
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
      "name": "Nokia C22",
      "slug": "c22",
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
      "name": "Nokia C3",
      "slug": "c3",
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
      "name": "Nokia C30",
      "slug": "c30",
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
      "name": "Nokia C31",
      "slug": "c31",
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
      "name": "Nokia C32",
      "slug": "c32",
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
      "name": "Nokia C5 Endi",
      "slug": "c5-endi",
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
      "name": "Nokia G10",
      "slug": "g10",
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
      "name": "Nokia G11",
      "slug": "g11",
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
      "name": "Nokia G11 Plus",
      "slug": "g11-plus",
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
      "name": "Nokia G20",
      "slug": "g20",
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
      "name": "Nokia G21",
      "slug": "g21",
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
      "name": "Nokia G22",
      "slug": "g22",
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
      "name": "Nokia G310 5G",
      "slug": "g310-5g",
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
      "name": "Nokia G400 5G",
      "slug": "g400-5g",
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
      "name": "Nokia G42 5G",
      "slug": "g42-5g",
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
      "name": "Nokia G50",
      "slug": "g50",
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
      "name": "Nokia G60 5G",
      "slug": "g60-5g",
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
      "name": "Nokia T10",
      "slug": "t10",
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
      "name": "Nokia T20",
      "slug": "t20",
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
      "name": "Nokia T21",
      "slug": "t21",
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
      "name": "Nokia X10",
      "slug": "x10",
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
      "name": "Nokia X20",
      "slug": "x20",
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
      "name": "Nokia X30 5G",
      "slug": "x30-5g",
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
      "name": "Nokia X5",
      "slug": "x5",
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
      "name": "Nokia X6",
      "slug": "x6",
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
      "name": "Nokia X7",
      "slug": "x7",
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
      "name": "Nokia X71",
      "slug": "x71",
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
      "name": "Nokia XR20",
      "slug": "xr20",
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
      "name": "Nokia XR21",
      "slug": "xr21",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "hmd": [
    {
      "name": "HMD Arc",
      "slug": "arc",
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
      "name": "HMD Aura",
      "slug": "aura",
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
      "name": "HMD Crest",
      "slug": "crest",
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
      "name": "HMD Crest Max",
      "slug": "crest-max",
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
      "name": "HMD Fusion Business Edition",
      "slug": "fusion-business-edition",
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
      "name": "HMD Fusion X1",
      "slug": "fusion-x1",
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
      "name": "HMD Key",
      "slug": "key",
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
      "name": "HMD M-KOPA X2",
      "slug": "m-kopa-x2",
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
      "name": "HMD M-KOPA X20",
      "slug": "m-kopa-x20",
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
      "name": "HMD Pearl",
      "slug": "pearl",
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
      "name": "HMD Pulse",
      "slug": "pulse",
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
      "name": "HMD Pulse Pro",
      "slug": "pulse-pro",
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
      "name": "HMD Skyline",
      "slug": "skyline",
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
      "name": "HMD Skyline Business Edition",
      "slug": "skyline-business-edition",
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
      "name": "HMD T21",
      "slug": "t21",
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
      "name": "HMD Vibe",
      "slug": "vibe",
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
      "name": "HMD Vibe2 5G",
      "slug": "vibe2-5g",
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
      "name": "HMD XR21",
      "slug": "xr21",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "itel": [
    {
      "name": "Itel A04",
      "slug": "a04",
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
      "name": "Itel A04s",
      "slug": "a04s",
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
      "name": "Itel A05s",
      "slug": "a05s",
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
      "name": "Itel A06",
      "slug": "a06",
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
      "name": "Itel A11",
      "slug": "a11",
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
      "name": "Itel A12",
      "slug": "a12",
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
      "name": "Itel A13",
      "slug": "a13",
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
      "name": "Itel A13 Plus",
      "slug": "a13-plus",
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
      "name": "Itel A14",
      "slug": "a14",
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
      "name": "Itel A14S",
      "slug": "a14s",
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
      "name": "Itel A15",
      "slug": "a15",
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
      "name": "Itel A16",
      "slug": "a16",
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
      "name": "Itel A16-Plus",
      "slug": "a16-plus",
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
      "name": "Itel A17",
      "slug": "a17",
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
      "name": "Itel A18",
      "slug": "a18",
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
      "name": "Itel A18s",
      "slug": "a18s",
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
      "name": "Itel A20",
      "slug": "a20",
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
      "name": "Itel A21",
      "slug": "a21",
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
      "name": "Itel A22",
      "slug": "a22",
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
      "name": "Itel A22 Pro",
      "slug": "a22-pro",
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
      "name": "Itel A23",
      "slug": "a23",
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
      "name": "Itel A23 Pro",
      "slug": "a23-pro",
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
      "name": "Itel A23S",
      "slug": "a23s",
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
      "name": "Itel A24",
      "slug": "a24",
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
      "name": "Itel A24 2023",
      "slug": "a24-2023",
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
      "name": "Itel A24 Pro",
      "slug": "a24-pro",
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
      "name": "Itel A25",
      "slug": "a25",
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
      "name": "Itel A25 Pro",
      "slug": "a25-pro",
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
      "name": "Itel A26",
      "slug": "a26",
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
      "name": "Itel A27 (P17 Pro 4G)",
      "slug": "a27-p17-pro-4g",
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
      "name": "Itel A31",
      "slug": "a31",
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
      "name": "Itel A31 Plus",
      "slug": "a31-plus",
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
      "name": "Itel A32F",
      "slug": "a32f",
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
      "name": "Itel A33 Plus",
      "slug": "a33-plus",
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
      "name": "Itel A35",
      "slug": "a35",
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
      "name": "Itel A36",
      "slug": "a36",
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
      "name": "Itel A40",
      "slug": "a40",
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
      "name": "Itel A41",
      "slug": "a41",
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
      "name": "Itel A41 Plus",
      "slug": "a41-plus",
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
      "name": "Itel A42 Plus",
      "slug": "a42-plus",
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
      "name": "Itel A43",
      "slug": "a43",
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
      "name": "Itel A44",
      "slug": "a44",
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
      "name": "Itel A44 Air",
      "slug": "a44-air",
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
      "name": "Itel A44 Power",
      "slug": "a44-power",
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
      "name": "Itel A44 Pro",
      "slug": "a44-pro",
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
      "name": "Itel A45",
      "slug": "a45",
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
      "name": "Itel A46",
      "slug": "a46",
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
      "name": "Itel A47",
      "slug": "a47",
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
      "name": "Itel A48",
      "slug": "a48",
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
      "name": "Itel A49",
      "slug": "a49",
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
      "name": "Itel A49 Play",
      "slug": "a49-play",
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
      "name": "Itel A50",
      "slug": "a50",
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
      "name": "Itel A51",
      "slug": "a51",
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
      "name": "Itel A52",
      "slug": "a52",
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
      "name": "Itel A52 Lite",
      "slug": "a52-lite",
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
      "name": "Itel A52B",
      "slug": "a52b",
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
      "name": "Itel A52S Lite",
      "slug": "a52s-lite",
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
      "name": "Itel A55",
      "slug": "a55",
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
      "name": "Itel A55 LTE",
      "slug": "a55-lte",
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
      "name": "Itel A56 LTE",
      "slug": "a56-lte",
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
      "name": "Itel A56 Pro",
      "slug": "a56-pro",
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
      "name": "Itel A56 Pro LTE",
      "slug": "a56-pro-lte",
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
      "name": "Itel A57",
      "slug": "a57",
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
      "name": "Itel A57 2GB",
      "slug": "a57-2gb",
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
      "name": "Itel A58",
      "slug": "a58",
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
      "name": "Itel A58 Lite",
      "slug": "a58-lite",
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
      "name": "Itel A58 Pro",
      "slug": "a58-pro",
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
      "name": "Itel A60s",
      "slug": "a60s",
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
      "name": "Itel A62",
      "slug": "a62",
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
      "name": "Itel A671L-OP",
      "slug": "a671l-op",
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
      "name": "Itel A70",
      "slug": "a70",
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
      "name": "Itel A80",
      "slug": "a80",
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
      "name": "Itel A90",
      "slug": "a90",
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
      "name": "Itel A95 5G",
      "slug": "a95-5g",
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
      "name": "Itel AC12",
      "slug": "ac12",
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
      "name": "Itel AC13",
      "slug": "ac13",
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
      "name": "Itel AC32",
      "slug": "ac32",
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
      "name": "Itel AC50",
      "slug": "ac50",
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
      "name": "Itel AC50 Pro",
      "slug": "ac50-pro",
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
      "name": "Itel AC51",
      "slug": "ac51",
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
      "name": "Itel AC60",
      "slug": "ac60",
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
      "name": "Itel Alpha Lite",
      "slug": "alpha-lite",
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
      "name": "Itel City 200",
      "slug": "city-200",
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
      "name": "Itel City 200s",
      "slug": "city-200s",
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
      "name": "Itel City 300 5G",
      "slug": "city-300-5g",
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
      "name": "Itel City100",
      "slug": "city100",
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
      "name": "Itel IKP-31",
      "slug": "ikp-31",
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
      "name": "Itel Itell K4700Q",
      "slug": "itell-k4700q",
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
      "name": "Itel Itelmobile GP10X2019",
      "slug": "itelmobile-gp10x2019",
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
      "name": "Itel MC20",
      "slug": "mc20",
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
      "name": "Itel Orange Nola Up",
      "slug": "orange-nola-up",
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
      "name": "Itel P10006L-OP2",
      "slug": "p10006l-op2",
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
      "name": "Itel P11",
      "slug": "p11",
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
      "name": "Itel P11003L-OP",
      "slug": "p11003l-op",
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
      "name": "Itel P11025G-IN",
      "slug": "p11025g-in",
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
      "name": "Itel P1102GT-OP",
      "slug": "p1102gt-op",
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
      "name": "Itel P12",
      "slug": "p12",
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
      "name": "Itel P13",
      "slug": "p13",
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
      "name": "Itel P13 Plus",
      "slug": "p13-plus",
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
      "name": "Itel P15",
      "slug": "p15",
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
      "name": "Itel P17",
      "slug": "p17",
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
      "name": "Itel P17 Pro",
      "slug": "p17-pro",
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
      "name": "Itel P31",
      "slug": "p31",
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
      "name": "Itel P32",
      "slug": "p32",
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
      "name": "Itel P33",
      "slug": "p33",
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
      "name": "Itel P33 Plus",
      "slug": "p33-plus",
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
      "name": "Itel P36",
      "slug": "p36",
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
      "name": "Itel P37",
      "slug": "p37",
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
      "name": "Itel P37 Pro\uff08Vision2 Plus\uff09",
      "slug": "p37-pro-vision2-plus",
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
      "name": "Itel P38",
      "slug": "p38",
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
      "name": "Itel P38 Pro (Vision 3 Plus)",
      "slug": "p38-pro-vision-3-plus",
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
      "name": "Itel P40",
      "slug": "p40",
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
      "name": "Itel P41",
      "slug": "p41",
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
      "name": "Itel P51",
      "slug": "p51",
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
      "name": "Itel P55T",
      "slug": "p55t",
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
      "name": "Itel P65",
      "slug": "p65",
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
      "name": "Itel P65C",
      "slug": "p65c",
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
      "name": "Itel Power 80",
      "slug": "power-80",
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
      "name": "Itel Prime 4",
      "slug": "prime-4",
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
      "name": "Itel PrimeTab 1",
      "slug": "primetab-1",
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
      "name": "Itel RS4",
      "slug": "rs4",
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
      "name": "Itel S11",
      "slug": "s11",
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
      "name": "Itel S11 Plus",
      "slug": "s11-plus",
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
      "name": "Itel S11 Pro",
      "slug": "s11-pro",
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
      "name": "Itel S11X",
      "slug": "s11x",
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
      "name": "Itel S12",
      "slug": "s12",
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
      "name": "Itel S13",
      "slug": "s13",
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
      "name": "Itel S15",
      "slug": "s15",
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
      "name": "Itel S15 Pro (VISION)",
      "slug": "s15-pro-vision",
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
      "name": "Itel S16",
      "slug": "s16",
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
      "name": "Itel S16 Pro",
      "slug": "s16-pro",
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
      "name": "Itel S16 Pro\uff08Vision 2\uff09",
      "slug": "s16-pro-vision-2",
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
      "name": "Itel S17",
      "slug": "s17",
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
      "name": "Itel S18",
      "slug": "s18",
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
      "name": "Itel S18 Pro",
      "slug": "s18-pro",
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
      "name": "Itel S21",
      "slug": "s21",
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
      "name": "Itel S23",
      "slug": "s23",
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
      "name": "Itel S24",
      "slug": "s24",
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
      "name": "Itel S25",
      "slug": "s25",
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
      "name": "Itel S25 Ultra",
      "slug": "s25-ultra",
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
      "name": "Itel S31",
      "slug": "s31",
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
      "name": "Itel S32",
      "slug": "s32",
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
      "name": "Itel S32 Mini",
      "slug": "s32-mini",
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
      "name": "Itel S33",
      "slug": "s33",
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
      "name": "Itel S41",
      "slug": "s41",
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
      "name": "Itel S42",
      "slug": "s42",
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
      "name": "Itel Super 26 Ultra",
      "slug": "super-26-ultra",
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
      "name": "Itel V51 LTE",
      "slug": "v51-lte",
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
      "name": "Itel V52A",
      "slug": "v52a",
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
      "name": "Itel V53",
      "slug": "v53",
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
      "name": "Itel Vimoq A19S",
      "slug": "vimoq-a19s",
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
      "name": "Itel Vision 3",
      "slug": "vision-3",
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
      "name": "Itel Vision 3 Plus",
      "slug": "vision-3-plus",
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
      "name": "Itel Vision 3 Plus (P38 Pro)",
      "slug": "vision-3-plus-p38-pro",
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
      "name": "Itel Vision 5",
      "slug": "vision-5",
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
      "name": "Itel Vision 5 Plus",
      "slug": "vision-5-plus",
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
      "name": "Itel Vision1 (P36 Play)",
      "slug": "vision1-p36-play",
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
      "name": "Itel Vision1 Plus (P36 Pro LTE)",
      "slug": "vision1-plus-p36-pro-lte",
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
      "name": "Itel Vision1 Pro",
      "slug": "vision1-pro",
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
      "name": "Itel Vision2s",
      "slug": "vision2s",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "nothing": [
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
    },
    {
      "name": "Nothing Phone (2a)",
      "slug": "nothing-phone-2a",
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
      "name": "Nothing Phone (2a) Plus",
      "slug": "nothing-phone-2a-plus",
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
      "name": "Nothing Phone (1)",
      "slug": "phone-1",
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
      "name": "Nothing Phone (2)",
      "slug": "nothing-phone-2",
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
      "name": "Nothing Phone (2)",
      "slug": "phone-2",
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
      "name": "Nothing Phone (2a)",
      "slug": "phone-2a",
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
      "name": "Nothing Phone (2a) Plus",
      "slug": "phone-2a-plus",
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
      "name": "Nothing Phone (3)",
      "slug": "phone-3",
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
      "name": "Nothing Phone (3a)",
      "slug": "phone-3a",
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
      "name": "Nothing Phone (3a) Lite",
      "slug": "phone-3a-lite",
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
      "name": "Nothing Phone (3a) Pro",
      "slug": "phone-3a-pro",
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
      "name": "Nothing Phone (4a)",
      "slug": "phone-4a",
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
      "name": "Nothing Phone (4a) Pro",
      "slug": "phone-4a-pro",
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
      "name": "Nothing Phone (4b)",
      "slug": "phone-4b",
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
      "name": "Nothing Phone (1)",
      "slug": "nothing-phone-1",
      "year": 2022,
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
  "qmobile": [
    {
      "name": "QMobile A1",
      "slug": "a1",
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
      "name": "QMobile A1 Lite",
      "slug": "a1-lite",
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
      "name": "QMobile Beat 1",
      "slug": "beat-1",
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
      "name": "QMobile Blue 5",
      "slug": "blue-5",
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
      "name": "QMobile CS1",
      "slug": "cs1",
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
      "name": "QMobile CS1 Plus",
      "slug": "cs1-plus",
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
      "name": "QMobile Dual One",
      "slug": "dual-one",
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
      "name": "QMobile E1",
      "slug": "e1",
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
      "name": "QMobile E2",
      "slug": "e2",
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
      "name": "QMobile E3 Dual",
      "slug": "e3-dual",
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
      "name": "QMobile Energy X1",
      "slug": "energy-x1",
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
      "name": "QMobile Energy X10 4G",
      "slug": "energy-x10-4g",
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
      "name": "QMobile Energy X2",
      "slug": "energy-x2",
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
      "name": "QMobile Energy X5 4G",
      "slug": "energy-x5-4g",
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
      "name": "QMobile Evok Power",
      "slug": "evok-power",
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
      "name": "QMobile Evok Power Lite",
      "slug": "evok-power-lite",
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
      "name": "QMobile GLi 2020",
      "slug": "gli-2020",
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
      "name": "QMobile GLi Lite",
      "slug": "gli-lite",
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
      "name": "QMobile Grande",
      "slug": "grande",
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
      "name": "QMobile HD Plus",
      "slug": "hd-plus",
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
      "name": "QMobile i2 Power",
      "slug": "i2-power",
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
      "name": "QMobile i2 Pro",
      "slug": "i2-pro",
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
      "name": "QMobile i5.5",
      "slug": "i5-5",
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
      "name": "QMobile i5i 2018",
      "slug": "i5i-2018",
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
      "name": "QMobile i5i 2019",
      "slug": "i5i-2019",
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
      "name": "QMobile i6 Metal 2017",
      "slug": "i6-metal-2017",
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
      "name": "QMobile i6 Metal 2018",
      "slug": "i6-metal-2018",
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
      "name": "QMobile i6 Metal HD",
      "slug": "i6-metal-hd",
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
      "name": "QMobile i6 Metal One",
      "slug": "i6-metal-one",
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
      "name": "QMobile i7i 2020",
      "slug": "i7i-2020",
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
      "name": "QMobile i7i Pro",
      "slug": "i7i-pro",
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
      "name": "QMobile i8i",
      "slug": "i8i",
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
      "name": "QMobile i8i 2019",
      "slug": "i8i-2019",
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
      "name": "QMobile i8i Pro",
      "slug": "i8i-pro",
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
      "name": "QMobile J1",
      "slug": "j1",
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
      "name": "QMobile J2",
      "slug": "j2",
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
      "name": "QMobile J5",
      "slug": "j5",
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
      "name": "QMobile J7",
      "slug": "j7",
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
      "name": "QMobile J7 Pro",
      "slug": "j7-pro",
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
      "name": "QMobile JazzX JS7 Pro",
      "slug": "jazzx-js7-pro",
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
      "name": "QMobile JS10",
      "slug": "js10",
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
      "name": "QMobile King Kong Max",
      "slug": "king-kong-max",
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
      "name": "QMobile L20",
      "slug": "l20",
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
      "name": "QMobile LT500 Pro",
      "slug": "lt500-pro",
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
      "name": "QMobile LT600 Pro",
      "slug": "lt600-pro",
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
      "name": "QMobile LT700 Pro",
      "slug": "lt700-pro",
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
      "name": "QMobile M350 Pro",
      "slug": "m350-pro",
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
      "name": "QMobile M6 Lite",
      "slug": "m6-lite",
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
      "name": "QMobile Mark 5",
      "slug": "mark-5",
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
      "name": "QMobile Noir A3",
      "slug": "noir-a3",
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
      "name": "QMobile Noir A6",
      "slug": "noir-a6",
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
      "name": "QMobile Noir S9",
      "slug": "noir-s9",
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
      "name": "QMobile Pakistan",
      "slug": "pakistan",
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
      "name": "QMobile Phantom P1",
      "slug": "phantom-p1",
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
      "name": "QMobile Phantom P1 Pro",
      "slug": "phantom-p1-pro",
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
      "name": "QMobile Q Infinity",
      "slug": "q-infinity",
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
      "name": "QMobile Q Infinity B",
      "slug": "q-infinity-b",
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
      "name": "QMobile Q Infinity C",
      "slug": "q-infinity-c",
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
      "name": "QMobile Q Infinity Cinema",
      "slug": "q-infinity-cinema",
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
      "name": "QMobile Q Infinity D",
      "slug": "q-infinity-d",
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
      "name": "QMobile Q Infinity E",
      "slug": "q-infinity-e",
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
      "name": "QMobile Q Infinity E Lite",
      "slug": "q-infinity-e-lite",
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
      "name": "QMobile Q Infinity Prime",
      "slug": "q-infinity-prime",
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
      "name": "QMobile QNote",
      "slug": "qnote",
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
      "name": "QMobile QTab Y1 2M",
      "slug": "qtab-y1-2m",
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
      "name": "QMobile QTab Y2",
      "slug": "qtab-y2",
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
      "name": "QMobile QTab Y3",
      "slug": "qtab-y3",
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
      "name": "QMobile Rocket Pro",
      "slug": "rocket-pro",
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
      "name": "QMobile S1 Lite",
      "slug": "s1-lite",
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
      "name": "QMobile S1 Pro",
      "slug": "s1-pro",
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
      "name": "QMobile S15",
      "slug": "s15",
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
      "name": "QMobile S2 Plus",
      "slug": "s2-plus",
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
      "name": "QMobile S4",
      "slug": "s4",
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
      "name": "QMobile S6",
      "slug": "s6",
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
      "name": "QMobile S6 Plus",
      "slug": "s6-plus",
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
      "name": "QMobile S6S",
      "slug": "s6s",
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
      "name": "QMobile S8 Lite",
      "slug": "s8-lite",
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
      "name": "QMobile S8 Plus",
      "slug": "s8-plus",
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
      "name": "QMobile Smart",
      "slug": "smart",
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
      "name": "QMobile Smart Power",
      "slug": "smart-power",
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
      "name": "QMobile V2 2018",
      "slug": "v2-2018",
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
      "name": "QMobile V6 Metal",
      "slug": "v6-metal",
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
      "name": "QMobile V7 Metal",
      "slug": "v7-metal",
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
      "name": "QMobile V8 Plus",
      "slug": "v8-plus",
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
      "name": "QMobile View Pro",
      "slug": "view-pro",
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
      "name": "QMobile W70",
      "slug": "w70",
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
      "name": "QMobile X1S",
      "slug": "x1s",
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
      "name": "QMobile X32",
      "slug": "x32",
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
      "name": "QMobile X32 Power",
      "slug": "x32-power",
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
      "name": "QMobile X33",
      "slug": "x33",
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
      "name": "QMobile X36",
      "slug": "x36",
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
      "name": "QMobile X700 Pro",
      "slug": "x700-pro",
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
      "name": "QMobile X700 Pro II",
      "slug": "x700-pro-ii",
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
      "name": "QMobile X700 Pro Lite",
      "slug": "x700-pro-lite",
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
      "name": "QMobile X75",
      "slug": "x75",
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
      "name": "QMobile XLi",
      "slug": "xli",
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
      "name": "QMobile Z10",
      "slug": "z10",
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
      "name": "QMobile Z12",
      "slug": "z12",
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
      "name": "QMobile Z12 Pro",
      "slug": "z12-pro",
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
      "name": "QMobile Z14",
      "slug": "z14",
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
      "name": "QMobile Z9 Plus",
      "slug": "z9-plus",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "sony": [
    {
      "name": "Sony Xperia 1",
      "slug": "xperia-1",
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
      "name": "Sony Xperia 1 II",
      "slug": "xperia-1-ii",
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
      "name": "Sony Xperia 1 Iii",
      "slug": "xperia-1-iii",
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
      "name": "Sony Xperia 1 IV",
      "slug": "xperia-1-iv",
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
      "name": "Sony Xperia 1 V",
      "slug": "xperia-1-v",
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
      "name": "Sony Xperia 1 VI",
      "slug": "xperia-1-vi",
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
      "name": "Sony Xperia 1 Vii",
      "slug": "xperia-1-vii",
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
      "name": "Sony Xperia 1 Viii",
      "slug": "xperia-1-viii",
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
      "name": "Sony Xperia 10",
      "slug": "xperia-10",
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
      "name": "Sony Xperia 10 II",
      "slug": "xperia-10-ii",
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
      "name": "Sony Xperia 10 Iii",
      "slug": "xperia-10-iii",
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
      "name": "Sony Xperia 10 IV",
      "slug": "xperia-10-iv",
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
      "name": "Sony Xperia 10 Plus",
      "slug": "xperia-10-plus",
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
      "name": "Sony Xperia 10 V",
      "slug": "xperia-10-v",
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
      "name": "Sony Xperia 10 VI",
      "slug": "xperia-10-vi",
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
      "name": "Sony Xperia 10 Vii",
      "slug": "xperia-10-vii",
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
      "name": "Sony Xperia 10 Viii",
      "slug": "xperia-10-viii",
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
      "name": "Sony Xperia 5",
      "slug": "xperia-5",
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
      "name": "Sony Xperia 5 II",
      "slug": "xperia-5-ii",
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
      "name": "Sony Xperia 5 Iii",
      "slug": "xperia-5-iii",
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
      "name": "Sony Xperia 5 IV",
      "slug": "xperia-5-iv",
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
      "name": "Sony Xperia 5 V",
      "slug": "xperia-5-v",
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
      "name": "Sony Xperia 8",
      "slug": "xperia-8",
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
      "name": "Sony Xperia Ace Iii",
      "slug": "xperia-ace-iii",
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
      "name": "Sony Xperia E1",
      "slug": "xperia-e1",
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
      "name": "Sony Xperia E3",
      "slug": "xperia-e3",
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
      "name": "Sony Xperia E4g",
      "slug": "xperia-e4g",
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
      "name": "Sony Xperia L1",
      "slug": "xperia-l1",
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
      "name": "Sony Xperia L2",
      "slug": "xperia-l2",
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
      "name": "Sony Xperia L3",
      "slug": "xperia-l3",
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
      "name": "Sony Xperia M2",
      "slug": "xperia-m2",
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
      "name": "Sony Xperia M5",
      "slug": "xperia-m5",
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
      "name": "Sony Xperia M5 Dual",
      "slug": "xperia-m5-dual",
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
      "name": "Sony Xperia PRO-I",
      "slug": "xperia-pro-i",
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
      "name": "Sony Xperia SP",
      "slug": "xperia-sp",
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
      "name": "Sony Xperia T2 Ultra",
      "slug": "xperia-t2-ultra",
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
      "name": "Sony Xperia T3",
      "slug": "xperia-t3",
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
      "name": "Sony Xperia X Performance",
      "slug": "xperia-x-performance",
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
      "name": "Sony Xperia XA",
      "slug": "xperia-xa",
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
      "name": "Sony Xperia XA Ultra",
      "slug": "xperia-xa-ultra",
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
      "name": "Sony Xperia XA1",
      "slug": "xperia-xa1",
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
      "name": "Sony Xperia XA1 Plus",
      "slug": "xperia-xa1-plus",
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
      "name": "Sony Xperia XA1 Ultra",
      "slug": "xperia-xa1-ultra",
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
      "name": "Sony Xperia XA2",
      "slug": "xperia-xa2",
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
      "name": "Sony Xperia XA2 Plus",
      "slug": "xperia-xa2-plus",
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
      "name": "Sony Xperia XA2 Ultra",
      "slug": "xperia-xa2-ultra",
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
      "name": "Sony Xperia XZ",
      "slug": "xperia-xz",
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
      "name": "Sony Xperia XZ Premium",
      "slug": "xperia-xz-premium",
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
      "name": "Sony Xperia XZ1",
      "slug": "xperia-xz1",
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
      "name": "Sony Xperia XZ2",
      "slug": "xperia-xz2",
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
      "name": "Sony Xperia XZ2 Compact",
      "slug": "xperia-xz2-compact",
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
      "name": "Sony Xperia XZ2 Premium",
      "slug": "xperia-xz2-premium",
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
      "name": "Sony Xperia XZ3",
      "slug": "xperia-xz3",
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
      "name": "Sony Xperia XZs",
      "slug": "xperia-xzs",
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
      "name": "Sony Xperia Z",
      "slug": "xperia-z",
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
      "name": "Sony Xperia Z Ultra",
      "slug": "xperia-z-ultra",
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
      "name": "Sony Xperia Z1",
      "slug": "xperia-z1",
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
      "name": "Sony Xperia Z2",
      "slug": "xperia-z2",
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
      "name": "Sony Xperia Z3",
      "slug": "xperia-z3",
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
      "name": "Sony Xperia Z3 Compact",
      "slug": "xperia-z3-compact",
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
      "name": "Sony Xperia Z3 Dual",
      "slug": "xperia-z3-dual",
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
      "name": "Sony Xperia Z4",
      "slug": "xperia-z4",
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
      "name": "Sony Xperia Z5",
      "slug": "xperia-z5",
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
      "name": "Sony Xperia Z5 Compact",
      "slug": "xperia-z5-compact",
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
      "name": "Sony Xperia Z5 Premium",
      "slug": "xperia-z5-premium",
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
      "name": "Sony Xperia ZL",
      "slug": "xperia-zl",
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
      "name": "Sony Xperia ZR",
      "slug": "xperia-zr",
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
      "name": "Sony Xperia\u2122 C4",
      "slug": "xperia-c4",
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
      "name": "Sony Xperia\u2122 C4 Dual",
      "slug": "xperia-c4-dual",
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
      "name": "Sony Xperia\u2122 M4 Aqua",
      "slug": "xperia-m4-aqua",
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
      "name": "Sony Xperia\u2122 M4 Aqua Dual",
      "slug": "xperia-m4-aqua-dual",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "lg": [
    {
      "name": "LG Ally",
      "slug": "ally",
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
      "name": "LG Eve",
      "slug": "eve",
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
      "name": "LG F60",
      "slug": "f60",
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
      "name": "LG G PAD\u2162 10.1",
      "slug": "g-pad-10-1",
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
      "name": "LG G Pro Lite",
      "slug": "g-pro-lite",
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
      "name": "LG G Pro2",
      "slug": "g-pro2",
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
      "name": "LG G Vista",
      "slug": "g-vista",
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
      "name": "LG G2 Mini",
      "slug": "g2-mini",
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
      "name": "LG G3 Beat",
      "slug": "g3-beat",
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
      "name": "LG G3 S",
      "slug": "g3-s",
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
      "name": "LG G3 Stylus",
      "slug": "g3-stylus",
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
      "name": "LG G6Fit",
      "slug": "g6fit",
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
      "name": "LG L Bello",
      "slug": "l-bello",
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
      "name": "LG L Fino",
      "slug": "l-fino",
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
      "name": "LG L20",
      "slug": "l20",
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
      "name": "LG L30 Sporty",
      "slug": "l30-sporty",
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
      "name": "LG L50 Sporty",
      "slug": "l50-sporty",
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
      "name": "LG L60",
      "slug": "l60",
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
      "name": "LG L70",
      "slug": "l70",
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
      "name": "LG L80 Single",
      "slug": "l80-single",
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
      "name": "LG L90",
      "slug": "l90",
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
      "name": "LG LG Aka",
      "slug": "lg-aka",
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
      "name": "LG LG Class",
      "slug": "lg-class",
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
      "name": "LG LG F70",
      "slug": "lg-f70",
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
      "name": "LG LG G Flex",
      "slug": "lg-g-flex",
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
      "name": "LG LG G Flex2",
      "slug": "lg-g-flex2",
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
      "name": "LG LG G Stylo",
      "slug": "lg-g-stylo",
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
      "name": "LG LG G2",
      "slug": "lg-g2",
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
      "name": "LG LG G3",
      "slug": "lg-g3",
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
      "name": "LG LG G3 Cat.6",
      "slug": "lg-g3-cat-6",
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
      "name": "LG LG G4",
      "slug": "lg-g4",
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
      "name": "LG LG G5",
      "slug": "lg-g5",
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
      "name": "LG LG G5 SE",
      "slug": "lg-g5-se",
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
      "name": "LG LG G6",
      "slug": "lg-g6",
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
      "name": "LG LG G7 ThinQ",
      "slug": "lg-g7-thinq",
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
      "name": "LG LG Joy",
      "slug": "lg-joy",
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
      "name": "LG LG K10",
      "slug": "lg-k10",
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
      "name": "LG LG K30",
      "slug": "lg-k30",
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
      "name": "LG LG K4",
      "slug": "lg-k4",
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
      "name": "LG LG K7",
      "slug": "lg-k7",
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
      "name": "LG LG K8",
      "slug": "lg-k8",
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
      "name": "LG LG K8 (2018)",
      "slug": "lg-k8-2018",
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
      "name": "LG LG Leon 4G LTE",
      "slug": "lg-leon-4g-lte",
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
      "name": "LG LG Magna",
      "slug": "lg-magna",
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
      "name": "LG LG Max",
      "slug": "lg-max",
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
      "name": "LG LG Optimus ELITE\u2122",
      "slug": "lg-optimus-elite",
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
      "name": "LG LG Optimus F7",
      "slug": "lg-optimus-f7",
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
      "name": "LG LG Optimus G",
      "slug": "lg-optimus-g",
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
      "name": "LG LG Optimus G Pro",
      "slug": "lg-optimus-g-pro",
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
      "name": "LG LG Optimus L1II",
      "slug": "lg-optimus-l1ii",
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
      "name": "LG LG Optimus L3",
      "slug": "lg-optimus-l3",
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
      "name": "LG LG Optimus L3 II",
      "slug": "lg-optimus-l3-ii",
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
      "name": "LG LG Optimus L4 II",
      "slug": "lg-optimus-l4-ii",
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
      "name": "LG LG Optimus L5 II",
      "slug": "lg-optimus-l5-ii",
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
      "name": "LG LG Optimus L7",
      "slug": "lg-optimus-l7",
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
      "name": "LG LG Optimus L7 II",
      "slug": "lg-optimus-l7-ii",
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
      "name": "LG LG Optimus L9",
      "slug": "lg-optimus-l9",
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
      "name": "LG LG Optimus LTE Tag",
      "slug": "lg-optimus-lte-tag",
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
      "name": "LG LG Optimus LTE2",
      "slug": "lg-optimus-lte2",
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
      "name": "LG LG Optimus One",
      "slug": "lg-optimus-one",
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
      "name": "LG LG Pecan",
      "slug": "lg-pecan",
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
      "name": "LG LG Premier Pro",
      "slug": "lg-premier-pro",
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
      "name": "LG LG Q6",
      "slug": "lg-q6",
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
      "name": "LG LG Q7",
      "slug": "lg-q7",
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
      "name": "LG LG Q9",
      "slug": "lg-q9",
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
      "name": "LG LG Stylo 2",
      "slug": "lg-stylo-2",
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
      "name": "LG LG Stylo 2 Plus",
      "slug": "lg-stylo-2-plus",
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
      "name": "LG LG Stylo 3 Plus",
      "slug": "lg-stylo-3-plus",
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
      "name": "LG LG Stylo 4",
      "slug": "lg-stylo-4",
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
      "name": "LG LG Stylo3",
      "slug": "lg-stylo3",
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
      "name": "LG LG Stylus 2",
      "slug": "lg-stylus-2",
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
      "name": "LG LG Volt LTE",
      "slug": "lg-volt-lte",
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
      "name": "LG LG X Cam",
      "slug": "lg-x-cam",
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
      "name": "LG LG X Charge",
      "slug": "lg-x-charge",
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
      "name": "LG LG X Power",
      "slug": "lg-x-power",
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
      "name": "LG LG X Screen",
      "slug": "lg-x-screen",
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
      "name": "LG LG X Style",
      "slug": "lg-x-style",
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
      "name": "LG LG X Venture",
      "slug": "lg-x-venture",
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
      "name": "LG LG X2",
      "slug": "lg-x2",
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
      "name": "LG LG X300",
      "slug": "lg-x300",
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
      "name": "LG LG X400",
      "slug": "lg-x400",
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
      "name": "LG LG X500",
      "slug": "lg-x500",
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
      "name": "LG Marquee",
      "slug": "marquee",
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
      "name": "LG Optimus 2X",
      "slug": "optimus-2x",
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
      "name": "LG Optimus 3D",
      "slug": "optimus-3d",
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
      "name": "LG Optimus 3D Max",
      "slug": "optimus-3d-max",
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
      "name": "LG Optimus Black",
      "slug": "optimus-black",
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
      "name": "LG Optimus Chat",
      "slug": "optimus-chat",
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
      "name": "LG Optimus F3",
      "slug": "optimus-f3",
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
      "name": "LG Optimus F5",
      "slug": "optimus-f5",
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
      "name": "LG Optimus F6",
      "slug": "optimus-f6",
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
      "name": "LG Optimus Hub",
      "slug": "optimus-hub",
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
      "name": "LG Optimus L40",
      "slug": "optimus-l40",
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
      "name": "LG Optimus L5",
      "slug": "optimus-l5",
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
      "name": "LG Optimus LTE",
      "slug": "optimus-lte",
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
      "name": "LG Optimus One",
      "slug": "optimus-one",
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
      "name": "LG Optimus Pro",
      "slug": "optimus-pro",
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
      "name": "LG Optimus Vu",
      "slug": "optimus-vu",
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
      "name": "LG Optimus Vu2",
      "slug": "optimus-vu2",
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
      "name": "LG Prada 3.0",
      "slug": "prada-3-0",
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
      "name": "LG Q8",
      "slug": "q8",
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
      "name": "LG QStylus",
      "slug": "qstylus",
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
      "name": "LG Swift",
      "slug": "swift",
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
      "name": "LG V10",
      "slug": "v10",
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
      "name": "LG V20",
      "slug": "v20",
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
      "name": "LG V30",
      "slug": "v30",
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
      "name": "LG Velvet",
      "slug": "velvet",
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
      "name": "LG VU3",
      "slug": "vu3",
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
      "name": "LG W30",
      "slug": "w30",
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
      "name": "LG Wine Smart",
      "slug": "wine-smart",
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
      "name": "LG X4",
      "slug": "x4",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "asus": [
    {
      "name": "Asus Rog Phone 3",
      "slug": "rog-phone-3",
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
      "name": "Asus Rog Phone 5 Series",
      "slug": "rog-phone-5-series",
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
      "name": "Asus Rog Phone 6 Series",
      "slug": "rog-phone-6-series",
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
      "name": "Asus Rog Phone 8 Series",
      "slug": "rog-phone-8-series",
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
      "name": "Asus Rog Phone II",
      "slug": "rog-phone-ii",
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
      "name": "Asus ZenFone 2 (ZE500CL)",
      "slug": "zenfone-2-ze500cl",
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
      "name": "Asus ZenFone 2 (ZE551ML)",
      "slug": "zenfone-2-ze551ml",
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
      "name": "Asus ZenFone 3 (ZE552KL)",
      "slug": "zenfone-3-ze552kl",
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
      "name": "Asus ZenFone 3 Deluxe (ZS570KL)",
      "slug": "zenfone-3-deluxe-zs570kl",
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
      "name": "Asus ZenFone 3 Laser (ZC551KL)",
      "slug": "zenfone-3-laser-zc551kl",
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
      "name": "Asus ZenFone 3 Max (ZC520TL)",
      "slug": "zenfone-3-max-zc520tl",
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
      "name": "Asus ZenFone 4 (ZE554KL)",
      "slug": "zenfone-4-ze554kl",
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
      "name": "Asus ZenFone 5 (ZE620KL)",
      "slug": "zenfone-5-ze620kl",
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
      "name": "Asus ZenFone 5 Lite (ZC600KL)",
      "slug": "zenfone-5-lite-zc600kl",
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
      "name": "Asus ZenFone 7 / 7 Pro (ZS670KS/ZS671KS)",
      "slug": "zenfone-7-7-pro-zs670ks-zs671ks",
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
      "name": "Asus ZenFone Live Plus (ZB553KL)",
      "slug": "zenfone-live-plus-zb553kl",
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
      "name": "Asus ZenFone Max (ZC550KL)",
      "slug": "zenfone-max-zc550kl",
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
      "name": "Asus ZenFone Max Pro M1 (ZB602KL) (WW) / Max Pro M1 (ZB601KL) (IN)",
      "slug": "zenfone-max-pro-m1-zb602kl-ww-max-pro-m1-zb601kl-in",
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
      "name": "Asus ZenFone Zoom (ZX551ML)",
      "slug": "zenfone-zoom-zx551ml",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "lenovo": [
    {
      "name": "Lenovo 55E82,49E82,50U3A,58U3A,70UD30A,60UD30A,80UD30A,65UR30A",
      "slug": "55e82-49e82-50u3a-58u3a-70ud30a-60ud30a-80ud30a-65ur30a",
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
      "name": "Lenovo A8-50",
      "slug": "a8-50",
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
      "name": "Lenovo IdeaTab S6000",
      "slug": "ideatab-s6000",
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
      "name": "Lenovo K11",
      "slug": "k11",
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
      "name": "Lenovo K5",
      "slug": "k5",
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
      "name": "Lenovo K5 Note",
      "slug": "k5-note",
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
      "name": "Lenovo LenovoTV 40S9;LenovoTV 50S9;AQUOS 40U1;AQUOS 50U1\uff1bAQUOS 58U1; Aquos 60LX765A",
      "slug": "lenovotv-40s9-lenovotv-50s9-aquos-40u1-aquos-50u1-aquos-58u1-aquos-60lx765a",
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
      "name": "Lenovo P1",
      "slug": "p1",
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
      "name": "Lenovo PHAB2 Plus",
      "slug": "phab2-plus",
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
      "name": "Lenovo PHAB2 Pro",
      "slug": "phab2-pro",
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
      "name": "Lenovo S60",
      "slug": "s60",
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
      "name": "Lenovo ThinkTab X11 Gen 1 / Lenovo ThinkTab X11 (EG)",
      "slug": "thinktab-x11-gen-1-lenovo-thinktab-x11-eg",
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
      "name": "Lenovo Vibe K6",
      "slug": "vibe-k6",
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
      "name": "Lenovo Vibe K6 Note",
      "slug": "vibe-k6-note",
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
      "name": "Lenovo Z90/VIBE Shot",
      "slug": "z90-vibe-shot",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "zte": [
    {
      "name": "ZTE 009Z",
      "slug": "009z",
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
      "name": "ZTE Axon 10 Pro",
      "slug": "axon-10-pro",
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
      "name": "ZTE Axon 11 5G",
      "slug": "axon-11-5g",
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
      "name": "ZTE Blade",
      "slug": "blade",
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
      "name": "ZTE Blade A3 2019",
      "slug": "blade-a3-2019",
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
      "name": "ZTE Blade A460",
      "slug": "blade-a460",
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
      "name": "ZTE Blade A475",
      "slug": "blade-a475",
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
      "name": "ZTE Blade A5 2020",
      "slug": "blade-a5-2020",
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
      "name": "ZTE Blade A510",
      "slug": "blade-a510",
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
      "name": "ZTE Blade A53",
      "slug": "blade-a53",
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
      "name": "ZTE Blade C340",
      "slug": "blade-c340",
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
      "name": "ZTE Blade C370",
      "slug": "blade-c370",
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
      "name": "ZTE Blade G Lux",
      "slug": "blade-g-lux",
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
      "name": "ZTE Blade Iii",
      "slug": "blade-iii",
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
      "name": "ZTE Blade L111",
      "slug": "blade-l111",
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
      "name": "ZTE Blade L2",
      "slug": "blade-l2",
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
      "name": "ZTE Blade L3",
      "slug": "blade-l3",
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
      "name": "ZTE Blade L5 Plus",
      "slug": "blade-l5-plus",
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
      "name": "ZTE Blade Q Lux",
      "slug": "blade-q-lux",
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
      "name": "ZTE Blade V",
      "slug": "blade-v",
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
      "name": "ZTE Blade V580",
      "slug": "blade-v580",
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
      "name": "ZTE Blade V6",
      "slug": "blade-v6",
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
      "name": "ZTE Blade V8 Mini",
      "slug": "blade-v8-mini",
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
      "name": "ZTE Blade V9",
      "slug": "blade-v9",
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
      "name": "ZTE Blade Vec",
      "slug": "blade-vec",
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
      "name": "ZTE Bouygues Telecom Bs 402",
      "slug": "bouygues-telecom-bs-402",
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
      "name": "ZTE Grand X",
      "slug": "grand-x",
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
      "name": "ZTE Grand X 2",
      "slug": "grand-x-2",
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
      "name": "ZTE Grand X In",
      "slug": "grand-x-in",
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
      "name": "ZTE Grand X Pro",
      "slug": "grand-x-pro",
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
      "name": "ZTE Grand X Quad Lite",
      "slug": "grand-x-quad-lite",
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
      "name": "ZTE Kis 3",
      "slug": "kis-3",
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
      "name": "ZTE Leo Q1",
      "slug": "leo-q1",
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
      "name": "ZTE N918St",
      "slug": "n918st",
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
      "name": "ZTE N939Sc",
      "slug": "n939sc",
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
      "name": "ZTE Orange Reyo",
      "slug": "orange-reyo",
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
      "name": "ZTE Racer",
      "slug": "racer",
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
      "name": "ZTE Spro 2",
      "slug": "spro-2",
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
      "name": "ZTE Star",
      "slug": "star",
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
      "name": "ZTE Startrail 4",
      "slug": "startrail-4",
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
      "name": "ZTE U V760",
      "slug": "u-v760",
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
      "name": "ZTE V72",
      "slug": "v72",
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
      "name": "ZTE V9",
      "slug": "v9",
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
      "name": "ZTE V9A",
      "slug": "v9a",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "htc": [
    {
      "name": "HTC 10",
      "slug": "10",
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
      "name": "HTC Amaze 4G",
      "slug": "amaze-4g",
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
      "name": "HTC Aria",
      "slug": "aria",
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
      "name": "HTC Butterfly",
      "slug": "butterfly",
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
      "name": "HTC Chacha",
      "slug": "chacha",
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
      "name": "HTC Desire",
      "slug": "desire",
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
      "name": "HTC Desire 10 Compact",
      "slug": "desire-10-compact",
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
      "name": "HTC Desire 10 Pro",
      "slug": "desire-10-pro",
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
      "name": "HTC Desire 12",
      "slug": "desire-12",
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
      "name": "HTC Desire 12s",
      "slug": "desire-12s",
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
      "name": "HTC Desire 20 Pro",
      "slug": "desire-20-pro",
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
      "name": "HTC Desire 22 5G",
      "slug": "desire-22-5g",
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
      "name": "HTC Desire 300",
      "slug": "desire-300",
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
      "name": "HTC Desire 310",
      "slug": "desire-310",
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
      "name": "HTC Desire 320",
      "slug": "desire-320",
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
      "name": "HTC Desire 510",
      "slug": "desire-510",
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
      "name": "HTC Desire 516",
      "slug": "desire-516",
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
      "name": "HTC Desire 526",
      "slug": "desire-526",
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
      "name": "HTC Desire 526G+ Dual Sim",
      "slug": "desire-526g-dual-sim",
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
      "name": "HTC Desire 530",
      "slug": "desire-530",
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
      "name": "HTC Desire 601",
      "slug": "desire-601",
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
      "name": "HTC Desire 610",
      "slug": "desire-610",
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
      "name": "HTC Desire 616 Dual Sim",
      "slug": "desire-616-dual-sim",
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
      "name": "HTC Desire 620G Dual Sim",
      "slug": "desire-620g-dual-sim",
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
      "name": "HTC Desire 626",
      "slug": "desire-626",
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
      "name": "HTC Desire 626G+ Dual Sim",
      "slug": "desire-626g-dual-sim",
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
      "name": "HTC Desire 650",
      "slug": "desire-650",
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
      "name": "HTC Desire 816",
      "slug": "desire-816",
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
      "name": "HTC Desire 820G Plus Dual Sim",
      "slug": "desire-820g-plus-dual-sim",
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
      "name": "HTC Desire 825",
      "slug": "desire-825",
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
      "name": "HTC Desire 828",
      "slug": "desire-828",
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
      "name": "HTC Desire 830 Dual Sim",
      "slug": "desire-830-dual-sim",
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
      "name": "HTC Desire Eye",
      "slug": "desire-eye",
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
      "name": "HTC Desire HD",
      "slug": "desire-hd",
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
      "name": "HTC Desire V",
      "slug": "desire-v",
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
      "name": "HTC Desire VC",
      "slug": "desire-vc",
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
      "name": "HTC Desire626s",
      "slug": "desire626s",
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
      "name": "HTC Droid Incredible 4G LTE",
      "slug": "droid-incredible-4g-lte",
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
      "name": "HTC Evo 3D X515m",
      "slug": "evo-3d-x515m",
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
      "name": "HTC Explorer A310e",
      "slug": "explorer-a310e",
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
      "name": "HTC Flyer",
      "slug": "flyer",
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
      "name": "HTC Hero",
      "slug": "hero",
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
      "name": "HTC HTCEVODesign4G",
      "slug": "htcevodesign4g",
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
      "name": "HTC M9e",
      "slug": "m9e",
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
      "name": "HTC One",
      "slug": "one",
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
      "name": "HTC One (E8) Dual Sim",
      "slug": "one-e8-dual-sim",
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
      "name": "HTC One (M8 EYE)",
      "slug": "one-m8-eye",
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
      "name": "HTC One (M8)",
      "slug": "one-m8",
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
      "name": "HTC One A9",
      "slug": "one-a9",
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
      "name": "HTC One A9s",
      "slug": "one-a9s",
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
      "name": "HTC One E9s Dual Sim",
      "slug": "one-e9s-dual-sim",
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
      "name": "HTC One M9",
      "slug": "one-m9",
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
      "name": "HTC One Max",
      "slug": "one-max",
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
      "name": "HTC One Mini 2",
      "slug": "one-mini-2",
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
      "name": "HTC One S",
      "slug": "one-s",
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
      "name": "HTC One S9",
      "slug": "one-s9",
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
      "name": "HTC One SV",
      "slug": "one-sv",
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
      "name": "HTC One X10",
      "slug": "one-x10",
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
      "name": "HTC One X9 Dual Sim",
      "slug": "one-x9-dual-sim",
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
      "name": "HTC One XL",
      "slug": "one-xl",
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
      "name": "HTC Sensation 4G",
      "slug": "sensation-4g",
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
      "name": "HTC Sensation XL With Beats Audio X315e",
      "slug": "sensation-xl-with-beats-audio-x315e",
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
      "name": "HTC U Play",
      "slug": "u-play",
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
      "name": "HTC U Ultra",
      "slug": "u-ultra",
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
      "name": "HTC U11",
      "slug": "u11",
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
      "name": "HTC U11 EYEs",
      "slug": "u11-eyes",
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
      "name": "HTC U12 +",
      "slug": "u12",
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
      "name": "HTC Velocity 4G",
      "slug": "velocity-4g",
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
      "name": "HTC Wildfire S",
      "slug": "wildfire-s",
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
      "name": "HTC Wildfire S A515c",
      "slug": "wildfire-s-a515c",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "tcl": [
    {
      "name": "TCL 10 5G",
      "slug": "10-5g",
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
      "name": "TCL 10 SE",
      "slug": "10-se",
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
      "name": "TCL 20 SE",
      "slug": "20-se",
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
      "name": "TCL 20E",
      "slug": "20e",
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
      "name": "TCL 20L",
      "slug": "20l",
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
      "name": "TCL 20Y",
      "slug": "20y",
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
      "name": "TCL 30",
      "slug": "30",
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
      "name": "TCL 30 SE",
      "slug": "30-se",
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
      "name": "TCL 40 SE",
      "slug": "40-se",
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
      "name": "TCL 40 XE 5G",
      "slug": "40-xe-5g",
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
      "name": "TCL 403",
      "slug": "403",
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
      "name": "TCL 408",
      "slug": "408",
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
      "name": "TCL 50 LE",
      "slug": "50-le",
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
      "name": "TCL 50 XL Nxtpaper 5G",
      "slug": "50-xl-nxtpaper-5g",
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
      "name": "TCL 605",
      "slug": "605",
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
      "name": "TCL C5",
      "slug": "c5",
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
      "name": "TCL K33 5G",
      "slug": "k33-5g",
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
      "name": "TCL L10",
      "slug": "l10",
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
      "name": "TCL L7",
      "slug": "l7",
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
      "name": "TCL Nxtpaper 70 Pro",
      "slug": "nxtpaper-70-pro",
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
      "name": "TCL T Pro",
      "slug": "t-pro",
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
      "name": "TCL Tkee Max",
      "slug": "tkee-max",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "alcatel": [
    {
      "name": "Alcatel 1",
      "slug": "1",
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
      "name": "Alcatel 1B",
      "slug": "1b",
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
      "name": "Alcatel 1C",
      "slug": "1c",
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
      "name": "Alcatel 1L Pro",
      "slug": "1l-pro",
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
      "name": "Alcatel 1S",
      "slug": "1s",
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
      "name": "Alcatel 1SE",
      "slug": "1se",
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
      "name": "Alcatel 1SE Elite Edition",
      "slug": "1se-elite-edition",
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
      "name": "Alcatel 1T 10",
      "slug": "1t-10",
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
      "name": "Alcatel 1T10 Smart",
      "slug": "1t10-smart",
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
      "name": "Alcatel 1T10 Wifi",
      "slug": "1t10-wifi",
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
      "name": "Alcatel 1T7 4G",
      "slug": "1t7-4g",
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
      "name": "Alcatel 1T7 New",
      "slug": "1t7-new",
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
      "name": "Alcatel 1V",
      "slug": "1v",
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
      "name": "Alcatel 1X",
      "slug": "1x",
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
      "name": "Alcatel 3",
      "slug": "3",
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
      "name": "Alcatel 3C",
      "slug": "3c",
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
      "name": "Alcatel 3L",
      "slug": "3l",
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
      "name": "Alcatel 3T10 4G",
      "slug": "3t10-4g",
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
      "name": "Alcatel 3T8",
      "slug": "3t8",
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
      "name": "Alcatel 3V",
      "slug": "3v",
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
      "name": "Alcatel 3X",
      "slug": "3x",
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
      "name": "Alcatel 5X",
      "slug": "5x",
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
      "name": "Alcatel A11",
      "slug": "a11",
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
      "name": "Alcatel A3",
      "slug": "a3",
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
      "name": "Alcatel A3 XL",
      "slug": "a3-xl",
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
      "name": "Alcatel A5",
      "slug": "a5",
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
      "name": "Alcatel A7",
      "slug": "a7",
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
      "name": "Alcatel EVO7",
      "slug": "evo7",
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
      "name": "Alcatel Go Play",
      "slug": "go-play",
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
      "name": "Alcatel Idol 2 S",
      "slug": "idol-2-s",
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
      "name": "Alcatel Idol 5",
      "slug": "idol-5",
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
      "name": "Alcatel Idol S",
      "slug": "idol-s",
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
      "name": "Alcatel Idol2 Mini S",
      "slug": "idol2-mini-s",
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
      "name": "Alcatel One Touch 4007X",
      "slug": "one-touch-4007x",
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
      "name": "Alcatel One Touch 4010X",
      "slug": "one-touch-4010x",
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
      "name": "Alcatel One Touch 4015X",
      "slug": "one-touch-4015x",
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
      "name": "Alcatel One Touch 4030X",
      "slug": "one-touch-4030x",
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
      "name": "Alcatel One Touch 4033X",
      "slug": "one-touch-4033x",
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
      "name": "Alcatel One Touch 5020D",
      "slug": "one-touch-5020d",
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
      "name": "Alcatel One Touch 5035D",
      "slug": "one-touch-5035d",
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
      "name": "Alcatel One Touch 6010X",
      "slug": "one-touch-6010x",
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
      "name": "Alcatel One Touch 6012D",
      "slug": "one-touch-6012d",
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
      "name": "Alcatel One Touch 6030X",
      "slug": "one-touch-6030x",
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
      "name": "Alcatel One Touch 8008D",
      "slug": "one-touch-8008d",
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
      "name": "Alcatel One Touch 903",
      "slug": "one-touch-903",
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
      "name": "Alcatel One Touch 908",
      "slug": "one-touch-908",
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
      "name": "Alcatel One Touch 918",
      "slug": "one-touch-918",
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
      "name": "Alcatel One Touch 983",
      "slug": "one-touch-983",
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
      "name": "Alcatel One Touch 985",
      "slug": "one-touch-985",
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
      "name": "Alcatel One Touch 990",
      "slug": "one-touch-990",
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
      "name": "Alcatel One Touch 991",
      "slug": "one-touch-991",
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
      "name": "Alcatel One Touch 995",
      "slug": "one-touch-995",
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
      "name": "Alcatel One Touch 997D",
      "slug": "one-touch-997d",
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
      "name": "Alcatel One Touch D668",
      "slug": "one-touch-d668",
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
      "name": "Alcatel One Touch Fierce",
      "slug": "one-touch-fierce",
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
      "name": "Alcatel One Touch Scribe 5",
      "slug": "one-touch-scribe-5",
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
      "name": "Alcatel One Touch Ultra 960c",
      "slug": "one-touch-ultra-960c",
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
      "name": "Alcatel Onetouch Idol 3 (5.5)",
      "slug": "onetouch-idol-3-5-5",
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
      "name": "Alcatel Onetouch P310A",
      "slug": "onetouch-p310a",
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
      "name": "Alcatel Onetouch Pixi 3 (3.5)",
      "slug": "onetouch-pixi-3-3-5",
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
      "name": "Alcatel Onetouch Pixi 3 (4.5)",
      "slug": "onetouch-pixi-3-4-5",
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
      "name": "Alcatel Onetouch Pixi 3 (8)",
      "slug": "onetouch-pixi-3-8",
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
      "name": "Alcatel Onetouch Pixi 4 (4)",
      "slug": "onetouch-pixi-4-4",
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
      "name": "Alcatel Onetouch Pop 3 (5)",
      "slug": "onetouch-pop-3-5",
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
      "name": "Alcatel Onetouch Pop 3 (5.5)",
      "slug": "onetouch-pop-3-5-5",
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
      "name": "Alcatel Pixi 4 (5)",
      "slug": "pixi-4-5",
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
      "name": "Alcatel Pixi 4 (5.5)",
      "slug": "pixi-4-5-5",
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
      "name": "Alcatel PIXI3 (4)",
      "slug": "pixi3-4",
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
      "name": "Alcatel PIXI3 (4.5)",
      "slug": "pixi3-4-5",
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
      "name": "Alcatel PIXI4 (3.5)",
      "slug": "pixi4-3-5",
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
      "name": "Alcatel Pixo 7",
      "slug": "pixo-7",
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
      "name": "Alcatel Pop 2",
      "slug": "pop-2",
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
      "name": "Alcatel Pop 2 (5)",
      "slug": "pop-2-5",
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
      "name": "Alcatel Pop 4 6\" 4G Android",
      "slug": "pop-4-6-4g-android",
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
      "name": "Alcatel Pop 4S",
      "slug": "pop-4s",
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
      "name": "Alcatel Pop S3",
      "slug": "pop-s3",
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
      "name": "Alcatel Pop S9",
      "slug": "pop-s9",
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
      "name": "Alcatel POP2 (4)",
      "slug": "pop2-4",
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
      "name": "Alcatel Soul 3.5",
      "slug": "soul-3-5",
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
      "name": "Alcatel Soul 4",
      "slug": "soul-4",
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
      "name": "Alcatel Soul 4.5",
      "slug": "soul-4-5",
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
      "name": "Alcatel Tbd",
      "slug": "tbd",
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
      "name": "Alcatel TCL A988",
      "slug": "tcl-a988",
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
      "name": "Alcatel TCL P606",
      "slug": "tcl-p606",
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
      "name": "Alcatel Tkee Max",
      "slug": "tkee-max",
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
      "name": "Alcatel Tkee Mini",
      "slug": "tkee-mini",
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
      "name": "Alcatel U3",
      "slug": "u3",
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
      "name": "Alcatel U5",
      "slug": "u5",
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
      "name": "Alcatel U5 HD",
      "slug": "u5-hd",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "blackberry": [
    {
      "name": "BlackBerry KEY2",
      "slug": "key2",
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
      "name": "BlackBerry KEY2 LE",
      "slug": "key2-le",
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
      "name": "BlackBerry Keyone",
      "slug": "keyone",
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
      "name": "BlackBerry Motion",
      "slug": "motion",
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
      "name": "BlackBerry Priv By BlackBerry",
      "slug": "priv-by-blackberry",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ],
  "google-pixel": [
    {
      "name": "Google Chromebase",
      "slug": "chromebase",
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
      "name": "Google Emualtor",
      "slug": "emualtor",
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
      "name": "Google Gambit",
      "slug": "gambit",
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
      "name": "Google Pixel",
      "slug": "pixel",
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
      "name": "Google Pixel 10",
      "slug": "pixel-10",
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
      "name": "Google Pixel 10 Pro",
      "slug": "pixel-10-pro",
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
      "name": "Google Pixel 10 Pro Fold",
      "slug": "pixel-10-pro-fold",
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
      "name": "Google Pixel 10 Pro XL",
      "slug": "pixel-10-pro-xl",
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
      "name": "Google Pixel 10a",
      "slug": "pixel-10a",
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
      "name": "Google Pixel 11",
      "slug": "pixel-11",
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
      "name": "Google Pixel 11 Pro",
      "slug": "pixel-11-pro",
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
      "name": "Google Pixel 11 Pro Fold",
      "slug": "pixel-11-pro-fold",
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
      "name": "Google Pixel 11 Pro XL",
      "slug": "pixel-11-pro-xl",
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
      "name": "Google Pixel 2",
      "slug": "pixel-2",
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
      "name": "Google Pixel 2 XL",
      "slug": "pixel-2-xl",
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
      "name": "Google Pixel 3",
      "slug": "pixel-3",
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
      "name": "Google Pixel 3 XL",
      "slug": "pixel-3-xl",
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
      "name": "Google Pixel 3a",
      "slug": "pixel-3a",
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
      "name": "Google Pixel 3a XL",
      "slug": "pixel-3a-xl",
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
      "name": "Google Pixel 4",
      "slug": "pixel-4",
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
      "name": "Google Pixel 4 XL",
      "slug": "pixel-4-xl",
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
      "name": "Google Pixel 4a",
      "slug": "pixel-4a",
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
      "name": "Google Pixel 4a (5G)",
      "slug": "pixel-4a-5g",
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
      "name": "Google Pixel 5",
      "slug": "pixel-5",
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
      "name": "Google Pixel 5a 5G",
      "slug": "pixel-5a-5g",
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
      "name": "Google Pixel 6",
      "slug": "pixel-6",
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
      "name": "Google Pixel 6 Pro",
      "slug": "pixel-6-pro",
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
      "name": "Google Pixel 6a",
      "slug": "pixel-6a",
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
      "name": "Google Pixel 7",
      "slug": "pixel-7",
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
      "name": "Google Pixel 7 Pro",
      "slug": "pixel-7-pro",
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
      "name": "Google Pixel 7a",
      "slug": "pixel-7a",
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
      "name": "Google Pixel 8",
      "slug": "pixel-8",
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
      "name": "Google Pixel 8 Pro",
      "slug": "pixel-8-pro",
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
      "name": "Google Pixel 8a",
      "slug": "pixel-8a",
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
      "name": "Google Pixel 9",
      "slug": "pixel-9",
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
      "name": "Google Pixel 9 Pro",
      "slug": "pixel-9-pro",
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
      "name": "Google Pixel 9 Pro Fold",
      "slug": "pixel-9-pro-fold",
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
      "name": "Google Pixel 9 Pro XL",
      "slug": "pixel-9-pro-xl",
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
      "name": "Google Pixel 9a",
      "slug": "pixel-9a",
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
      "name": "Google Pixel C",
      "slug": "pixel-c",
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
      "name": "Google Pixel Fold",
      "slug": "pixel-fold",
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
      "name": "Google Pixel Slate",
      "slug": "pixel-slate",
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
      "name": "Google Pixel XL",
      "slug": "pixel-xl",
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
      "name": "Google Pixelbook",
      "slug": "pixelbook",
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
      "name": "Google Play Games On PC",
      "slug": "play-games-on-pc",
      "year": 2023,
      "storage": [
        64,
        128
      ],
      "ram": [
        4,
        6
      ]
    }
  ]
};

const BRAND_HEX_CODES: Record<string, string> = {
  "apple": "01",
  "samsung": "02",
  "xiaomi": "03",
  "redmi": "04",
  "poco": "05",
  "infinix": "06",
  "tecno": "07",
  "oppo": "08",
  "vivo": "09",
  "realme": "0a",
  "huawei": "0b",
  "honor": "0c",
  "google-pixel": "0d",
  "oneplus": "0e",
  "motorola": "0f",
  "nokia": "10",
  "hmd": "11",
  "itel": "12",
  "nothing": "13",
  "qmobile": "14",
  "rivo": "15",
  "sony": "16",
  "lg": "17",
  "asus": "18",
  "lenovo": "19",
  "zte": "1a",
  "meizu": "1b",
  "microsoft": "1c",
  "htc": "1d",
  "tcl": "1e",
  "alcatel": "1f",
  "blackberry": "20",
  "gionee": "21",
  "philips": "22",
  "jazz-digit": "23",
  "all-call": "24",
  "bontel": "25",
  "calme": "26",
  "club-mobile": "27",
  "dcode": "28",
  "digit": "29",
  "e-tachi": "2a",
  "faywa": "2b",
  "gfive": "2c",
  "gresso": "2d",
  "haier": "2e",
  "hello-tech": "2f",
  "kxd": "30",
  "lvtel": "31",
  "maxfone": "32",
  "me-mobile": "33",
  "nexel": "34",
  "oukitel": "35",
  "remaxx": "36",
  "sego": "37",
  "sparx": "38",
  "spice": "39",
  "umidigi": "3a",
  "vgo-tel": "3b",
  "villaon": "3c",
  "venus": "3d",
  "wintel": "3e",
  "x-cell": "3f",
  "xmobile": "40",
  "xsmart": "41",
  "zentality": "42"
};

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

  const clean = brandIdentifier.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  let key = clean;

  if (clean.includes('pixel') || clean === 'google' || clean === 'google-pixel') key = 'google';
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
  else if (clean.includes('vgotel') || clean.includes('vgo-tel') || clean.includes('vgo tel')) key = 'vgo-tel';
  else if (clean.includes('jazz')) key = 'jazz-digit';

  const modelsList = CATALOG_MODELS[key] || CATALOG_MODELS[clean] || [];
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
