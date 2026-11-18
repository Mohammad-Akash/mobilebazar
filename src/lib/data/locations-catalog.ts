// ==============================================================================
// Comprehensive Pakistan Cities & Localities Catalog (80 Cities & 500+ Areas)
// Includes popular metros, major towns, and searchable localities across all provinces.
// ==============================================================================

import { CityOption, AreaOption } from './reference'

export interface ExtendedCityOption extends CityOption {
  province?: string
  popular?: boolean
}

export const PAKISTAN_CITIES: ExtendedCityOption[] = [
  {
    "name": "Karachi",
    "slug": "karachi",
    "province": "Sindh",
    "popular": true,
    "id": "c1010000-0000-4000-8000-000000000001"
  },
  {
    "name": "Lahore",
    "slug": "lahore",
    "province": "Punjab",
    "popular": true,
    "id": "c1010000-0000-4000-8000-000000000002"
  },
  {
    "name": "Islamabad",
    "slug": "islamabad",
    "province": "Islamabad Capital Territory",
    "popular": true,
    "id": "c1010000-0000-4000-8000-000000000003"
  },
  {
    "name": "Rawalpindi",
    "slug": "rawalpindi",
    "province": "Punjab",
    "popular": true,
    "id": "c1010000-0000-4000-8000-000000000004"
  },
  {
    "name": "Faisalabad",
    "slug": "faisalabad",
    "province": "Punjab",
    "popular": true,
    "id": "c1010000-0000-4000-8000-000000000005"
  },
  {
    "name": "Multan",
    "slug": "multan",
    "province": "Punjab",
    "popular": true,
    "id": "c1010000-0000-4000-8000-000000000006"
  },
  {
    "name": "Peshawar",
    "slug": "peshawar",
    "province": "Khyber Pakhtunkhwa",
    "popular": true,
    "id": "c1010000-0000-4000-8000-000000000007"
  },
  {
    "name": "Quetta",
    "slug": "quetta",
    "province": "Balochistan",
    "popular": true,
    "id": "c1010000-0000-4000-8000-000000000008"
  },
  {
    "name": "Sialkot",
    "slug": "sialkot",
    "province": "Punjab",
    "popular": true,
    "id": "c1010000-0000-4000-8000-000000000009"
  },
  {
    "name": "Gujranwala",
    "slug": "gujranwala",
    "province": "Punjab",
    "popular": true,
    "id": "c1010000-0000-4000-8000-000000000010"
  },
  {
    "name": "Hyderabad",
    "slug": "hyderabad",
    "province": "Sindh",
    "popular": true,
    "id": "c1010000-0000-4000-8000-000000000011"
  },
  {
    "name": "Abbottabad",
    "slug": "abbottabad",
    "province": "Khyber Pakhtunkhwa",
    "popular": false,
    "id": "c1010000-0000-4000-8000-000000000012"
  },
  {
    "name": "Bahawalpur",
    "slug": "bahawalpur",
    "province": "Punjab",
    "popular": false,
    "id": "c1010000-0000-4000-8000-000000000013"
  },
  {
    "name": "Sargodha",
    "slug": "sargodha",
    "province": "Punjab",
    "popular": false,
    "id": "c1010000-0000-4000-8000-000000000014"
  },
  {
    "name": "Sukkur",
    "slug": "sukkur",
    "province": "Sindh",
    "popular": false,
    "id": "c1010000-0000-4000-8000-000000000015"
  },
  {
    "id": "c1010000-0000-4000-8000-000000000010",
    "name": "Gujrat",
    "slug": "gujrat",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000011",
    "name": "Sheikhupura",
    "slug": "sheikhupura",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000012",
    "name": "Sahiwal",
    "slug": "sahiwal",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000013",
    "name": "Rahim Yar Khan",
    "slug": "rahim-yar-khan",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000014",
    "name": "Jhang",
    "slug": "jhang",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000015",
    "name": "Kasur",
    "slug": "kasur",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000016",
    "name": "Dera Ghazi Khan",
    "slug": "dera-ghazi-khan",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000017",
    "name": "Okara",
    "slug": "okara",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000018",
    "name": "Chiniot",
    "slug": "chiniot",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000019",
    "name": "Kamoke",
    "slug": "kamoke",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000001a",
    "name": "Mandi Bahauddin",
    "slug": "mandi-bahauddin",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000001b",
    "name": "Jhelum",
    "slug": "jhelum",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000001c",
    "name": "Khanewal",
    "slug": "khanewal",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000001d",
    "name": "Vehari",
    "slug": "vehari",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000001e",
    "name": "Murree",
    "slug": "murree",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000001f",
    "name": "Attock",
    "slug": "attock",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000020",
    "name": "Chakwal",
    "slug": "chakwal",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000021",
    "name": "Hafizabad",
    "slug": "hafizabad",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000022",
    "name": "Muzaffargarh",
    "slug": "muzaffargarh",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000023",
    "name": "Burewala",
    "slug": "burewala",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000024",
    "name": "Bahawalnagar",
    "slug": "bahawalnagar",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000025",
    "name": "Pakpattan",
    "slug": "pakpattan",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000026",
    "name": "Mianwali",
    "slug": "mianwali",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000027",
    "name": "Taxila",
    "slug": "taxila",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000028",
    "name": "Wazirabad",
    "slug": "wazirabad",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000029",
    "name": "Khushab",
    "slug": "khushab",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000002a",
    "name": "Bhakkar",
    "slug": "bhakkar",
    "province": "Punjab",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000002b",
    "name": "Larkana",
    "slug": "larkana",
    "province": "Sindh",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000002c",
    "name": "Nawabshah",
    "slug": "nawabshah",
    "province": "Sindh",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000002d",
    "name": "Mirpur Khas",
    "slug": "mirpur-khas",
    "province": "Sindh",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000002e",
    "name": "Jacobabad",
    "slug": "jacobabad",
    "province": "Sindh",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000002f",
    "name": "Shikarpur",
    "slug": "shikarpur",
    "province": "Sindh",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000030",
    "name": "Khairpur",
    "slug": "khairpur",
    "province": "Sindh",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000031",
    "name": "Dadu",
    "slug": "dadu",
    "province": "Sindh",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000032",
    "name": "Tando Adam",
    "slug": "tando-adam",
    "province": "Sindh",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000033",
    "name": "Tando Allahyar",
    "slug": "tando-allahyar",
    "province": "Sindh",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000034",
    "name": "Thatta",
    "slug": "thatta",
    "province": "Sindh",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000035",
    "name": "Badin",
    "slug": "badin",
    "province": "Sindh",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000036",
    "name": "Ghotki",
    "slug": "ghotki",
    "province": "Sindh",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000037",
    "name": "Mardan",
    "slug": "mardan",
    "province": "Khyber Pakhtunkhwa",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000038",
    "name": "Swat (Mingora)",
    "slug": "swat",
    "province": "Khyber Pakhtunkhwa",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000039",
    "name": "Kohat",
    "slug": "kohat",
    "province": "Khyber Pakhtunkhwa",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000003a",
    "name": "Bannu",
    "slug": "bannu",
    "province": "Khyber Pakhtunkhwa",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000003b",
    "name": "Dera Ismail Khan",
    "slug": "dera-ismail-khan",
    "province": "Khyber Pakhtunkhwa",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000003c",
    "name": "Mansehra",
    "slug": "mansehra",
    "province": "Khyber Pakhtunkhwa",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000003d",
    "name": "Charsadda",
    "slug": "charsadda",
    "province": "Khyber Pakhtunkhwa",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000003e",
    "name": "Nowshera",
    "slug": "nowshera",
    "province": "Khyber Pakhtunkhwa",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000003f",
    "name": "Haripur",
    "slug": "haripur",
    "province": "Khyber Pakhtunkhwa",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000040",
    "name": "Swabi",
    "slug": "swabi",
    "province": "Khyber Pakhtunkhwa",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000041",
    "name": "Batkhela",
    "slug": "batkhela",
    "province": "Khyber Pakhtunkhwa",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000042",
    "name": "Gwadar",
    "slug": "gwadar",
    "province": "Balochistan",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000043",
    "name": "Turbat",
    "slug": "turbat",
    "province": "Balochistan",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000044",
    "name": "Khuzdar",
    "slug": "khuzdar",
    "province": "Balochistan",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000045",
    "name": "Hub",
    "slug": "hub",
    "province": "Balochistan",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000046",
    "name": "Sibi",
    "slug": "sibi",
    "province": "Balochistan",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000047",
    "name": "Zhob",
    "slug": "zhob",
    "province": "Balochistan",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000048",
    "name": "Chaman",
    "slug": "chaman",
    "province": "Balochistan",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000049",
    "name": "Muzaffarabad",
    "slug": "muzaffarabad",
    "province": "Azad Kashmir",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000004a",
    "name": "Mirpur AJK",
    "slug": "mirpur-ajk",
    "province": "Azad Kashmir",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000004b",
    "name": "Rawalakot",
    "slug": "rawalakot",
    "province": "Azad Kashmir",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000004c",
    "name": "Kotli",
    "slug": "kotli",
    "province": "Azad Kashmir",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000004d",
    "name": "Bhimber",
    "slug": "bhimber",
    "province": "Azad Kashmir",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000004e",
    "name": "Gilgit",
    "slug": "gilgit",
    "province": "Gilgit-Baltistan",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-00000000004f",
    "name": "Skardu",
    "slug": "skardu",
    "province": "Gilgit-Baltistan",
    "popular": false
  },
  {
    "id": "c1010000-0000-4000-8000-000000000050",
    "name": "Hunza",
    "slug": "hunza",
    "province": "Gilgit-Baltistan",
    "popular": false
  }
];

export const PAKISTAN_AREAS: AreaOption[] = [
  {
    "id": "a1010000-0000-4000-8000-000000000001",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "DHA Defence",
    "slug": "dha-defence"
  },
  {
    "id": "a1010000-0000-4000-8000-000000000002",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Clifton",
    "slug": "clifton"
  },
  {
    "id": "a1010000-0000-4000-8000-000000000003",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Gulshan-e-Iqbal",
    "slug": "gulshan-e-iqbal"
  },
  {
    "id": "a1010000-0000-4000-8000-000000000004",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "North Nazimabad",
    "slug": "north-nazimabad"
  },
  {
    "id": "a1010000-0000-4000-8000-000000000005",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "DHA Phase 5 & 6",
    "slug": "dha-lahore"
  },
  {
    "id": "a1010000-0000-4000-8000-000000000006",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Gulberg (Hafeez Centre)",
    "slug": "gulberg-hafeez-centre"
  },
  {
    "id": "a1010000-0000-4000-8000-000000000007",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Johar Town",
    "slug": "johar-town"
  },
  {
    "id": "a1010000-0000-4000-8000-000000000003",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "Blue Area",
    "slug": "blue-area"
  },
  {
    "id": "a1010000-0000-4000-8000-000000000009",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "F-7 / F-6 Markaz",
    "slug": "f-7-markaz"
  },
  {
    "id": "a1010000-0000-4000-8000-000000000010",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Saddar (Singapore Plaza)",
    "slug": "saddar-singapore-plaza"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Saddar (Mobile Market / Star City)",
    "slug": "saddar-mobile-market-star-city"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "PECHS (Block 1-6)",
    "slug": "pechs-block-1-6"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Gulistan-e-Johar",
    "slug": "gulistan-e-johar"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Tariq Road & Bahadurabad",
    "slug": "tariq-road-bahadurabad"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Scheme 33",
    "slug": "scheme-33"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Malir & Malir Cantt",
    "slug": "malir-malir-cantt"
  },
  {
    "id": "a1010001-0000-4000-8000-00000000001a",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Korangi",
    "slug": "korangi"
  },
  {
    "id": "a1010001-0000-4000-8000-00000000001b",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Federal B Area (F.B Area)",
    "slug": "federal-b-area-f-b-area"
  },
  {
    "id": "a1010001-0000-4000-8000-00000000001c",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Nazimabad",
    "slug": "nazimabad"
  },
  {
    "id": "a1010001-0000-4000-8000-00000000001d",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Zamzama Commercial",
    "slug": "zamzama-commercial"
  },
  {
    "id": "a1010001-0000-4000-8000-00000000001e",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Shahrah-e-Faisal",
    "slug": "shahrah-e-faisal"
  },
  {
    "id": "a1010001-0000-4000-8000-00000000001f",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Buffer Zone",
    "slug": "buffer-zone"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000020",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Garden West & East",
    "slug": "garden-west-east"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000021",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Jamshed Road",
    "slug": "jamshed-road"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000022",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Gulshan-e-Maymar",
    "slug": "gulshan-e-maymar"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000023",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Landhi",
    "slug": "landhi"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000024",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Liaquatabad",
    "slug": "liaquatabad"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000025",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "North Karachi",
    "slug": "north-karachi"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000026",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Orangi Town",
    "slug": "orangi-town"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000027",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Defence View",
    "slug": "defence-view"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000028",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Bath Island",
    "slug": "bath-island"
  },
  {
    "id": "a1010001-0000-4000-8000-000000000029",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Soldier Bazar",
    "slug": "soldier-bazar"
  },
  {
    "id": "a1010001-0000-4000-8000-00000000002a",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Shah Faisal Colony",
    "slug": "shah-faisal-colony"
  },
  {
    "id": "a1010001-0000-4000-8000-00000000002b",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Surjani Town",
    "slug": "surjani-town"
  },
  {
    "id": "a1010001-0000-4000-8000-00000000002c",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Gulshan-e-Hadeed",
    "slug": "gulshan-e-hadeed"
  },
  {
    "id": "a1010001-0000-4000-8000-00000000002d",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Steel Town",
    "slug": "steel-town"
  },
  {
    "id": "a1010001-0000-4000-8000-00000000002e",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "KDA Scheme 1",
    "slug": "kda-scheme-1"
  },
  {
    "id": "a1010001-0000-4000-8000-00000000002f",
    "city_id": "c1010000-0000-4000-8000-000000000001",
    "name": "Askari 4 & 5",
    "slug": "askari-4-5"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Bahria Town",
    "slug": "bahria-town"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Model Town",
    "slug": "model-town"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Lahore Cantt",
    "slug": "lahore-cantt"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Allama Iqbal Town",
    "slug": "allama-iqbal-town"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Wapda Town",
    "slug": "wapda-town"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Garden Town",
    "slug": "garden-town"
  },
  {
    "id": "a1010002-0000-4000-8000-00000000001a",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Faisal Town",
    "slug": "faisal-town"
  },
  {
    "id": "a1010002-0000-4000-8000-00000000001b",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Samanabad",
    "slug": "samanabad"
  },
  {
    "id": "a1010002-0000-4000-8000-00000000001c",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Shadman",
    "slug": "shadman"
  },
  {
    "id": "a1010002-0000-4000-8000-00000000001d",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Cavalry Ground",
    "slug": "cavalry-ground"
  },
  {
    "id": "a1010002-0000-4000-8000-00000000001e",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Township",
    "slug": "township"
  },
  {
    "id": "a1010002-0000-4000-8000-00000000001f",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Valencia Town",
    "slug": "valencia-town"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000020",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Lake City",
    "slug": "lake-city"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000021",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Askari (1-11)",
    "slug": "askari-1-11"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000022",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Sabzazar",
    "slug": "sabzazar"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000023",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Paragon City",
    "slug": "paragon-city"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000024",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Mall Road & Anarkali",
    "slug": "mall-road-anarkali"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000025",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Ichhra",
    "slug": "ichhra"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000026",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Gulshan-e-Ravi",
    "slug": "gulshan-e-ravi"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000027",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Mughalpura",
    "slug": "mughalpura"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000028",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Harbanspura",
    "slug": "harbanspura"
  },
  {
    "id": "a1010002-0000-4000-8000-000000000029",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "DHA Rahbar",
    "slug": "dha-rahbar"
  },
  {
    "id": "a1010002-0000-4000-8000-00000000002a",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "State Life Housing Society",
    "slug": "state-life-housing-society"
  },
  {
    "id": "a1010002-0000-4000-8000-00000000002b",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Bedian Road",
    "slug": "bedian-road"
  },
  {
    "id": "a1010002-0000-4000-8000-00000000002c",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Raiwind Road",
    "slug": "raiwind-road"
  },
  {
    "id": "a1010002-0000-4000-8000-00000000002d",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Shadbagh",
    "slug": "shadbagh"
  },
  {
    "id": "a1010002-0000-4000-8000-00000000002e",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Baghbanpura",
    "slug": "baghbanpura"
  },
  {
    "id": "a1010002-0000-4000-8000-00000000002f",
    "city_id": "c1010000-0000-4000-8000-000000000002",
    "name": "Chung & Multan Road",
    "slug": "chung-multan-road"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "F-8",
    "slug": "f-8"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "F-10 (Markaz)",
    "slug": "f-10-markaz"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "F-11 (Markaz)",
    "slug": "f-11-markaz"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "G-9 (Karachi Company)",
    "slug": "g-9-karachi-company"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "G-10 (Markaz)",
    "slug": "g-10-markaz"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "G-11 (Markaz)",
    "slug": "g-11-markaz"
  },
  {
    "id": "a1010003-0000-4000-8000-00000000001a",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "G-13",
    "slug": "g-13"
  },
  {
    "id": "a1010003-0000-4000-8000-00000000001b",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "E-11",
    "slug": "e-11"
  },
  {
    "id": "a1010003-0000-4000-8000-00000000001c",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "I-8 (Markaz)",
    "slug": "i-8-markaz"
  },
  {
    "id": "a1010003-0000-4000-8000-00000000001d",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "I-9",
    "slug": "i-9"
  },
  {
    "id": "a1010003-0000-4000-8000-00000000001e",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "I-10",
    "slug": "i-10"
  },
  {
    "id": "a1010003-0000-4000-8000-00000000001f",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "DHA Phase 1 & 2",
    "slug": "dha-phase-1-2"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000020",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "Bahria Town Phase 1-8",
    "slug": "bahria-town-phase-1-8"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000021",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "Gulberg Greens",
    "slug": "gulberg-greens"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000022",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "B-17 Multi Gardens",
    "slug": "b-17-multi-gardens"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000023",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "D-12",
    "slug": "d-12"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000024",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "G-6 & G-7 (Aabpara)",
    "slug": "g-6-g-7-aabpara"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000025",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "H-13",
    "slug": "h-13"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000026",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "Soan Gardens",
    "slug": "soan-gardens"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000027",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "PWD Housing Society",
    "slug": "pwd-housing-society"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000028",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "Zaraj Housing Society",
    "slug": "zaraj-housing-society"
  },
  {
    "id": "a1010003-0000-4000-8000-000000000029",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "Naval Anchorage",
    "slug": "naval-anchorage"
  },
  {
    "id": "a1010003-0000-4000-8000-00000000002a",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "Police Foundation",
    "slug": "police-foundation"
  },
  {
    "id": "a1010003-0000-4000-8000-00000000002b",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "Chak Shahzad",
    "slug": "chak-shahzad"
  },
  {
    "id": "a1010003-0000-4000-8000-00000000002c",
    "city_id": "c1010000-0000-4000-8000-000000000003",
    "name": "Bani Gala",
    "slug": "bani-gala"
  },
  {
    "id": "a1010004-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Satellite Town",
    "slug": "satellite-town"
  },
  {
    "id": "a1010004-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Bahria Town Rawalpindi",
    "slug": "bahria-town-rawalpindi"
  },
  {
    "id": "a1010004-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "DHA Rawalpindi",
    "slug": "dha-rawalpindi"
  },
  {
    "id": "a1010004-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Commercial Market",
    "slug": "commercial-market"
  },
  {
    "id": "a1010004-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Westridge",
    "slug": "westridge"
  },
  {
    "id": "a1010004-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Chaklala Scheme 3",
    "slug": "chaklala-scheme-3"
  },
  {
    "id": "a1010004-0000-4000-8000-00000000001a",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Peshawar Road",
    "slug": "peshawar-road"
  },
  {
    "id": "a1010004-0000-4000-8000-00000000001b",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Gulraiz Housing Scheme",
    "slug": "gulraiz-housing-scheme"
  },
  {
    "id": "a1010004-0000-4000-8000-00000000001c",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Adyala Road",
    "slug": "adyala-road"
  },
  {
    "id": "a1010004-0000-4000-8000-00000000001d",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Murree Road",
    "slug": "murree-road"
  },
  {
    "id": "a1010004-0000-4000-8000-00000000001e",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Rawal Town",
    "slug": "rawal-town"
  },
  {
    "id": "a1010004-0000-4000-8000-00000000001f",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Tench Bhatta",
    "slug": "tench-bhatta"
  },
  {
    "id": "a1010004-0000-4000-8000-000000000020",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Shamsabad",
    "slug": "shamsabad"
  },
  {
    "id": "a1010004-0000-4000-8000-000000000021",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Raja Bazar",
    "slug": "raja-bazar"
  },
  {
    "id": "a1010004-0000-4000-8000-000000000022",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Askari 14",
    "slug": "askari-14"
  },
  {
    "id": "a1010004-0000-4000-8000-000000000023",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Tulsa Road",
    "slug": "tulsa-road"
  },
  {
    "id": "a1010004-0000-4000-8000-000000000024",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Airport Housing Society",
    "slug": "airport-housing-society"
  },
  {
    "id": "a1010004-0000-4000-8000-000000000025",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Chaklala Scheme 1 & 2",
    "slug": "chaklala-scheme-1-2"
  },
  {
    "id": "a1010004-0000-4000-8000-000000000026",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Chur Harpal",
    "slug": "chur-harpal"
  },
  {
    "id": "a1010004-0000-4000-8000-000000000027",
    "city_id": "c1010000-0000-4000-8000-000000000004",
    "name": "Morgah",
    "slug": "morgah"
  },
  {
    "id": "a1010005-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "D Ground",
    "slug": "d-ground"
  },
  {
    "id": "a1010005-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "Madina Town",
    "slug": "madina-town"
  },
  {
    "id": "a1010005-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "Peoples Colony 1 & 2",
    "slug": "peoples-colony-1-2"
  },
  {
    "id": "a1010005-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "Kohinoor City & Plaza",
    "slug": "kohinoor-city-plaza"
  },
  {
    "id": "a1010005-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "Canal Road",
    "slug": "canal-road"
  },
  {
    "id": "a1010005-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "Gulberg",
    "slug": "gulberg"
  },
  {
    "id": "a1010005-0000-4000-8000-00000000001a",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "Jinnah Colony",
    "slug": "jinnah-colony"
  },
  {
    "id": "a1010005-0000-4000-8000-00000000001b",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "Samanabad",
    "slug": "samanabad"
  },
  {
    "id": "a1010005-0000-4000-8000-00000000001c",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "Ghulam Muhammad Abad",
    "slug": "ghulam-muhammad-abad"
  },
  {
    "id": "a1010005-0000-4000-8000-00000000001d",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "Millat Town",
    "slug": "millat-town"
  },
  {
    "id": "a1010005-0000-4000-8000-00000000001e",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "Susan Road",
    "slug": "susan-road"
  },
  {
    "id": "a1010005-0000-4000-8000-00000000001f",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "Satiana Road",
    "slug": "satiana-road"
  },
  {
    "id": "a1010005-0000-4000-8000-000000000020",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "Civil Lines",
    "slug": "civil-lines"
  },
  {
    "id": "a1010005-0000-4000-8000-000000000021",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "Mansoorabad",
    "slug": "mansoorabad"
  },
  {
    "id": "a1010005-0000-4000-8000-000000000022",
    "city_id": "c1010000-0000-4000-8000-000000000005",
    "name": "Eden Valley",
    "slug": "eden-valley"
  },
  {
    "id": "a1010006-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000006",
    "name": "Gulgasht Colony",
    "slug": "gulgasht-colony"
  },
  {
    "id": "a1010006-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000006",
    "name": "Multan Cantt",
    "slug": "multan-cantt"
  },
  {
    "id": "a1010006-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000006",
    "name": "Bosan Road",
    "slug": "bosan-road"
  },
  {
    "id": "a1010006-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000006",
    "name": "New Multan",
    "slug": "new-multan"
  },
  {
    "id": "a1010006-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000006",
    "name": "Shah Rukn-e-Alam Colony",
    "slug": "shah-rukn-e-alam-colony"
  },
  {
    "id": "a1010006-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000006",
    "name": "MDA Officers Colony",
    "slug": "mda-officers-colony"
  },
  {
    "id": "a1010006-0000-4000-8000-00000000001a",
    "city_id": "c1010000-0000-4000-8000-000000000006",
    "name": "Model Town",
    "slug": "model-town"
  },
  {
    "id": "a1010006-0000-4000-8000-00000000001b",
    "city_id": "c1010000-0000-4000-8000-000000000006",
    "name": "Shershah Road",
    "slug": "shershah-road"
  },
  {
    "id": "a1010006-0000-4000-8000-00000000001c",
    "city_id": "c1010000-0000-4000-8000-000000000006",
    "name": "Wapda Town",
    "slug": "wapda-town"
  },
  {
    "id": "a1010006-0000-4000-8000-00000000001d",
    "city_id": "c1010000-0000-4000-8000-000000000006",
    "name": "DHA Multan",
    "slug": "dha-multan"
  },
  {
    "id": "a1010006-0000-4000-8000-00000000001e",
    "city_id": "c1010000-0000-4000-8000-000000000006",
    "name": "Buch Villas",
    "slug": "buch-villas"
  },
  {
    "id": "a1010006-0000-4000-8000-00000000001f",
    "city_id": "c1010000-0000-4000-8000-000000000006",
    "name": "Garden Town",
    "slug": "garden-town"
  },
  {
    "id": "a1010006-0000-4000-8000-000000000020",
    "city_id": "c1010000-0000-4000-8000-000000000006",
    "name": "Chungi No. 9",
    "slug": "chungi-no-9"
  },
  {
    "id": "a1010007-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000007",
    "name": "Hayatabad (Phase 1-7)",
    "slug": "hayatabad-phase-1-7"
  },
  {
    "id": "a1010007-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000007",
    "name": "University Town",
    "slug": "university-town"
  },
  {
    "id": "a1010007-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000007",
    "name": "Peshawar Cantt",
    "slug": "peshawar-cantt"
  },
  {
    "id": "a1010007-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000007",
    "name": "Saddar (Fakhr-e-Alam Road)",
    "slug": "saddar-fakhr-e-alam-road"
  },
  {
    "id": "a1010007-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000007",
    "name": "Ring Road",
    "slug": "ring-road"
  },
  {
    "id": "a1010007-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000007",
    "name": "Gulbahar",
    "slug": "gulbahar"
  },
  {
    "id": "a1010007-0000-4000-8000-00000000001a",
    "city_id": "c1010000-0000-4000-8000-000000000007",
    "name": "Warsak Road",
    "slug": "warsak-road"
  },
  {
    "id": "a1010007-0000-4000-8000-00000000001b",
    "city_id": "c1010000-0000-4000-8000-000000000007",
    "name": "Kohat Road",
    "slug": "kohat-road"
  },
  {
    "id": "a1010007-0000-4000-8000-00000000001c",
    "city_id": "c1010000-0000-4000-8000-000000000007",
    "name": "Dalazak Road",
    "slug": "dalazak-road"
  },
  {
    "id": "a1010007-0000-4000-8000-00000000001d",
    "city_id": "c1010000-0000-4000-8000-000000000007",
    "name": "Karkhano Market",
    "slug": "karkhano-market"
  },
  {
    "id": "a1010007-0000-4000-8000-00000000001e",
    "city_id": "c1010000-0000-4000-8000-000000000007",
    "name": "Charsadda Road",
    "slug": "charsadda-road"
  },
  {
    "id": "a1010007-0000-4000-8000-00000000001f",
    "city_id": "c1010000-0000-4000-8000-000000000007",
    "name": "DHA Peshawar",
    "slug": "dha-peshawar"
  },
  {
    "id": "a1010007-0000-4000-8000-000000000020",
    "city_id": "c1010000-0000-4000-8000-000000000007",
    "name": "Regi Model Town",
    "slug": "regi-model-town"
  },
  {
    "id": "a1010008-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000008",
    "name": "Quetta Cantt",
    "slug": "quetta-cantt"
  },
  {
    "id": "a1010008-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000008",
    "name": "Zarghoon Road",
    "slug": "zarghoon-road"
  },
  {
    "id": "a1010008-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000008",
    "name": "Jinnah Road",
    "slug": "jinnah-road"
  },
  {
    "id": "a1010008-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000008",
    "name": "Samungli Road",
    "slug": "samungli-road"
  },
  {
    "id": "a1010008-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000008",
    "name": "Satellite Town",
    "slug": "satellite-town"
  },
  {
    "id": "a1010008-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000008",
    "name": "Airport Road",
    "slug": "airport-road"
  },
  {
    "id": "a1010008-0000-4000-8000-00000000001a",
    "city_id": "c1010000-0000-4000-8000-000000000008",
    "name": "Shahrah-e-Iqbal",
    "slug": "shahrah-e-iqbal"
  },
  {
    "id": "a1010008-0000-4000-8000-00000000001b",
    "city_id": "c1010000-0000-4000-8000-000000000008",
    "name": "Model Town",
    "slug": "model-town"
  },
  {
    "id": "a1010008-0000-4000-8000-00000000001c",
    "city_id": "c1010000-0000-4000-8000-000000000008",
    "name": "Nawan Killi",
    "slug": "nawan-killi"
  },
  {
    "id": "a1010008-0000-4000-8000-00000000001d",
    "city_id": "c1010000-0000-4000-8000-000000000008",
    "name": "Brewery Road",
    "slug": "brewery-road"
  },
  {
    "id": "a1010009-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000009",
    "name": "Sialkot Cantt",
    "slug": "sialkot-cantt"
  },
  {
    "id": "a1010009-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000009",
    "name": "Model Town",
    "slug": "model-town"
  },
  {
    "id": "a1010009-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000009",
    "name": "Kashmir Road",
    "slug": "kashmir-road"
  },
  {
    "id": "a1010009-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000009",
    "name": "Paris Road",
    "slug": "paris-road"
  },
  {
    "id": "a1010009-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000009",
    "name": "Defense Road",
    "slug": "defense-road"
  },
  {
    "id": "a1010009-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000009",
    "name": "Daska Road",
    "slug": "daska-road"
  },
  {
    "id": "a1010009-0000-4000-8000-00000000001a",
    "city_id": "c1010000-0000-4000-8000-000000000009",
    "name": "Rangpura",
    "slug": "rangpura"
  },
  {
    "id": "a1010009-0000-4000-8000-00000000001b",
    "city_id": "c1010000-0000-4000-8000-000000000009",
    "name": "Ugoki",
    "slug": "ugoki"
  },
  {
    "id": "a1010009-0000-4000-8000-00000000001c",
    "city_id": "c1010000-0000-4000-8000-000000000009",
    "name": "Commissioner Road",
    "slug": "commissioner-road"
  },
  {
    "id": "a101000a-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "DC Colony",
    "slug": "dc-colony"
  },
  {
    "id": "a101000a-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "Model Town",
    "slug": "model-town"
  },
  {
    "id": "a101000a-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "Wapda Town",
    "slug": "wapda-town"
  },
  {
    "id": "a101000a-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "Gujranwala Cantt",
    "slug": "gujranwala-cantt"
  },
  {
    "id": "a101000a-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "Satellite Town",
    "slug": "satellite-town"
  },
  {
    "id": "a101000a-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "G.T. Road (Mobile Market)",
    "slug": "g-t-road-mobile-market"
  },
  {
    "id": "a101000a-0000-4000-8000-00000000001a",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "Rahwali Cantt",
    "slug": "rahwali-cantt"
  },
  {
    "id": "a101000a-0000-4000-8000-00000000001b",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "Peoples Colony",
    "slug": "peoples-colony"
  },
  {
    "id": "a101000a-0000-4000-8000-00000000001c",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "Master City",
    "slug": "master-city"
  },
  {
    "id": "a101000a-0000-4000-8000-00000000001d",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "Garden Town",
    "slug": "garden-town"
  },
  {
    "id": "a101000b-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000011",
    "name": "Qasimabad",
    "slug": "qasimabad"
  },
  {
    "id": "a101000b-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000011",
    "name": "Latifabad (Unit 1-12)",
    "slug": "latifabad-unit-1-12"
  },
  {
    "id": "a101000b-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000011",
    "name": "Auto Bhan Road",
    "slug": "auto-bhan-road"
  },
  {
    "id": "a101000b-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000011",
    "name": "Saddar",
    "slug": "saddar"
  },
  {
    "id": "a101000b-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000011",
    "name": "Hyderabad Cantt",
    "slug": "hyderabad-cantt"
  },
  {
    "id": "a101000b-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000011",
    "name": "Citizen Colony",
    "slug": "citizen-colony"
  },
  {
    "id": "a101000b-0000-4000-8000-00000000001a",
    "city_id": "c1010000-0000-4000-8000-000000000011",
    "name": "Kohsar Agency",
    "slug": "kohsar-agency"
  },
  {
    "id": "a101000b-0000-4000-8000-00000000001b",
    "city_id": "c1010000-0000-4000-8000-000000000011",
    "name": "Wadhu Wah Road",
    "slug": "wadhu-wah-road"
  },
  {
    "id": "a101000c-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000012",
    "name": "Mandian",
    "slug": "mandian"
  },
  {
    "id": "a101000c-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000012",
    "name": "Supply Bazar",
    "slug": "supply-bazar"
  },
  {
    "id": "a101000c-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000012",
    "name": "PMA Kakul Road",
    "slug": "pma-kakul-road"
  },
  {
    "id": "a101000c-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000012",
    "name": "Jadoon Plaza / Phase 1 & 2",
    "slug": "jadoon-plaza-phase-1-2"
  },
  {
    "id": "a101000c-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000012",
    "name": "Abbottabad Cantt",
    "slug": "abbottabad-cantt"
  },
  {
    "id": "a101000c-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000012",
    "name": "Mansehra Road",
    "slug": "mansehra-road"
  },
  {
    "id": "a101000c-0000-4000-8000-00000000001a",
    "city_id": "c1010000-0000-4000-8000-000000000012",
    "name": "Link Road",
    "slug": "link-road"
  },
  {
    "id": "a101000d-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000013",
    "name": "Model Town A & B",
    "slug": "model-town-a-b"
  },
  {
    "id": "a101000d-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000013",
    "name": "Bahawalpur Cantt",
    "slug": "bahawalpur-cantt"
  },
  {
    "id": "a101000d-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000013",
    "name": "Circular Road",
    "slug": "circular-road"
  },
  {
    "id": "a101000d-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000013",
    "name": "Satellite Town",
    "slug": "satellite-town"
  },
  {
    "id": "a101000d-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000013",
    "name": "Noor Mahal Road",
    "slug": "noor-mahal-road"
  },
  {
    "id": "a101000d-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000013",
    "name": "One Unit Staff Colony",
    "slug": "one-unit-staff-colony"
  },
  {
    "id": "a101000d-0000-4000-8000-00000000001a",
    "city_id": "c1010000-0000-4000-8000-000000000013",
    "name": "Cheema Town",
    "slug": "cheema-town"
  },
  {
    "id": "a101000e-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000014",
    "name": "Satellite Town",
    "slug": "satellite-town"
  },
  {
    "id": "a101000e-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000014",
    "name": "University Road",
    "slug": "university-road"
  },
  {
    "id": "a101000e-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000014",
    "name": "Fatima Jinnah Colony",
    "slug": "fatima-jinnah-colony"
  },
  {
    "id": "a101000e-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000014",
    "name": "Sargodha Cantt",
    "slug": "sargodha-cantt"
  },
  {
    "id": "a101000e-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000014",
    "name": "Club Road",
    "slug": "club-road"
  },
  {
    "id": "a101000e-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000014",
    "name": "Trust Plaza",
    "slug": "trust-plaza"
  },
  {
    "id": "a101000f-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000015",
    "name": "Military Road",
    "slug": "military-road"
  },
  {
    "id": "a101000f-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000015",
    "name": "Minara Road",
    "slug": "minara-road"
  },
  {
    "id": "a101000f-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000015",
    "name": "Barrage Colony",
    "slug": "barrage-colony"
  },
  {
    "id": "a101000f-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000015",
    "name": "New Pind",
    "slug": "new-pind"
  },
  {
    "id": "a101000f-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000015",
    "name": "Bunder Road",
    "slug": "bunder-road"
  },
  {
    "id": "a101000f-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000015",
    "name": "Sukkur Town",
    "slug": "sukkur-town"
  },
  {
    "id": "a1010010-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "Court Road",
    "slug": "court-road"
  },
  {
    "id": "a1010010-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "Jalalpur Jattan Road",
    "slug": "jalalpur-jattan-road"
  },
  {
    "id": "a1010010-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "Rehman Shaheed Road",
    "slug": "rehman-shaheed-road"
  },
  {
    "id": "a1010010-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "Servis Mor",
    "slug": "servis-mor"
  },
  {
    "id": "a1010010-0000-4000-8000-000000000019",
    "city_id": "c1010000-0000-4000-8000-000000000010",
    "name": "G.T. Road Gujrat",
    "slug": "g-t-road-gujrat"
  },
  {
    "id": "a1010011-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000011",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010011-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000011",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010011-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000011",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010011-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000011",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010011-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000011",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010012-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000012",
    "name": "Fateh Sher Colony",
    "slug": "fateh-sher-colony"
  },
  {
    "id": "a1010012-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000012",
    "name": "Farid Town",
    "slug": "farid-town"
  },
  {
    "id": "a1010012-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000012",
    "name": "College Road",
    "slug": "college-road"
  },
  {
    "id": "a1010012-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000012",
    "name": "Civil Lines",
    "slug": "civil-lines"
  },
  {
    "id": "a1010012-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000012",
    "name": "Girls College Road",
    "slug": "girls-college-road"
  },
  {
    "id": "a1010013-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000013",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010013-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000013",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010013-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000013",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010013-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000013",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010013-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000013",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010014-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000014",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010014-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000014",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010014-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000014",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010014-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000014",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010014-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000014",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010015-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000015",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010015-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000015",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010015-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000015",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010015-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000015",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010015-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000015",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010016-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000016",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010016-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000016",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010016-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000016",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010016-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000016",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010016-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000016",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010017-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000017",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010017-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000017",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010017-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000017",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010017-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000017",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010017-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000017",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010018-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000018",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010018-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000018",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010018-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000018",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010018-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000018",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010018-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000018",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010019-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000019",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010019-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000019",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010019-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000019",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010019-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000019",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010019-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000019",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101001a-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000001a",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101001a-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000001a",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101001a-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000001a",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101001a-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000001a",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101001a-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000001a",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101001b-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000001b",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101001b-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000001b",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101001b-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000001b",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101001b-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000001b",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101001b-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000001b",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101001c-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000001c",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101001c-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000001c",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101001c-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000001c",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101001c-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000001c",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101001c-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000001c",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101001d-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000001d",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101001d-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000001d",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101001d-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000001d",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101001d-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000001d",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101001d-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000001d",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101001e-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000001e",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101001e-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000001e",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101001e-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000001e",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101001e-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000001e",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101001e-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000001e",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101001f-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000001f",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101001f-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000001f",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101001f-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000001f",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101001f-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000001f",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101001f-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000001f",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010020-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000020",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010020-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000020",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010020-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000020",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010020-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000020",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010020-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000020",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010021-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000021",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010021-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000021",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010021-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000021",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010021-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000021",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010021-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000021",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010022-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000022",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010022-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000022",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010022-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000022",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010022-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000022",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010022-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000022",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010023-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000023",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010023-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000023",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010023-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000023",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010023-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000023",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010023-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000023",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010024-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000024",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010024-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000024",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010024-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000024",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010024-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000024",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010024-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000024",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010025-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000025",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010025-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000025",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010025-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000025",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010025-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000025",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010025-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000025",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010026-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000026",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010026-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000026",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010026-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000026",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010026-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000026",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010026-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000026",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010027-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000027",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010027-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000027",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010027-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000027",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010027-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000027",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010027-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000027",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010028-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000028",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010028-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000028",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010028-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000028",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010028-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000028",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010028-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000028",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010029-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000029",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010029-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000029",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010029-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000029",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010029-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000029",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010029-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000029",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101002a-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000002a",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101002a-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000002a",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101002a-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000002a",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101002a-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000002a",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101002a-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000002a",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101002b-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000002b",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101002b-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000002b",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101002b-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000002b",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101002b-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000002b",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101002b-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000002b",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101002c-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000002c",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101002c-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000002c",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101002c-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000002c",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101002c-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000002c",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101002c-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000002c",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101002d-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000002d",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101002d-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000002d",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101002d-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000002d",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101002d-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000002d",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101002d-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000002d",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101002e-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000002e",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101002e-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000002e",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101002e-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000002e",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101002e-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000002e",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101002e-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000002e",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101002f-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000002f",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101002f-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000002f",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101002f-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000002f",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101002f-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000002f",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101002f-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000002f",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010030-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000030",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010030-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000030",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010030-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000030",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010030-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000030",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010030-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000030",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010031-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000031",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010031-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000031",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010031-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000031",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010031-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000031",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010031-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000031",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010032-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000032",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010032-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000032",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010032-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000032",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010032-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000032",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010032-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000032",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010033-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000033",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010033-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000033",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010033-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000033",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010033-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000033",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010033-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000033",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010034-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000034",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010034-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000034",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010034-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000034",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010034-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000034",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010034-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000034",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010035-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000035",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010035-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000035",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010035-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000035",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010035-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000035",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010035-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000035",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010036-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000036",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010036-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000036",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010036-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000036",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010036-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000036",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010036-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000036",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010037-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000037",
    "name": "Bank Road",
    "slug": "bank-road"
  },
  {
    "id": "a1010037-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000037",
    "name": "Mardan Cantt",
    "slug": "mardan-cantt"
  },
  {
    "id": "a1010037-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000037",
    "name": "Sheikh Maltoon Town",
    "slug": "sheikh-maltoon-town"
  },
  {
    "id": "a1010037-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000037",
    "name": "Nowshera Road",
    "slug": "nowshera-road"
  },
  {
    "id": "a1010037-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000037",
    "name": "Baghdada",
    "slug": "baghdada"
  },
  {
    "id": "a1010038-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000038",
    "name": "Mingora Bazar",
    "slug": "mingora-bazar"
  },
  {
    "id": "a1010038-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000038",
    "name": "Saidu Sharif",
    "slug": "saidu-sharif"
  },
  {
    "id": "a1010038-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000038",
    "name": "Fizagat",
    "slug": "fizagat"
  },
  {
    "id": "a1010038-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000038",
    "name": "Gulkada",
    "slug": "gulkada"
  },
  {
    "id": "a1010038-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000038",
    "name": "Airport Road Mingora",
    "slug": "airport-road-mingora"
  },
  {
    "id": "a1010039-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000039",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010039-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000039",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010039-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000039",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010039-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000039",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010039-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000039",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101003a-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000003a",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101003a-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000003a",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101003a-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000003a",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101003a-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000003a",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101003a-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000003a",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101003b-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000003b",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101003b-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000003b",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101003b-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000003b",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101003b-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000003b",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101003b-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000003b",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101003c-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000003c",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101003c-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000003c",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101003c-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000003c",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101003c-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000003c",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101003c-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000003c",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101003d-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000003d",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101003d-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000003d",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101003d-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000003d",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101003d-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000003d",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101003d-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000003d",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101003e-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000003e",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101003e-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000003e",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101003e-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000003e",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101003e-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000003e",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101003e-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000003e",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101003f-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000003f",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101003f-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000003f",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101003f-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000003f",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101003f-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000003f",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101003f-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000003f",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010040-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000040",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010040-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000040",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010040-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000040",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010040-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000040",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010040-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000040",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010041-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000041",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010041-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000041",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010041-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000041",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010041-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000041",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010041-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000041",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010042-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000042",
    "name": "Jinnah Avenue",
    "slug": "jinnah-avenue"
  },
  {
    "id": "a1010042-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000042",
    "name": "Marine Drive",
    "slug": "marine-drive"
  },
  {
    "id": "a1010042-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000042",
    "name": "New Town",
    "slug": "new-town"
  },
  {
    "id": "a1010042-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000042",
    "name": "Port Road",
    "slug": "port-road"
  },
  {
    "id": "a1010043-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000043",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010043-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000043",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010043-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000043",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010043-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000043",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010043-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000043",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010044-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000044",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010044-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000044",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010044-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000044",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010044-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000044",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010044-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000044",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010045-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000045",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010045-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000045",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010045-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000045",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010045-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000045",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010045-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000045",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010046-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000046",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010046-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000046",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010046-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000046",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010046-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000046",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010046-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000046",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010047-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000047",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010047-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000047",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010047-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000047",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010047-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000047",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010047-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000047",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010048-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000048",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010048-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000048",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010048-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000048",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010048-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000048",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010048-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000048",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a1010049-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000049",
    "name": "Domel",
    "slug": "domel"
  },
  {
    "id": "a1010049-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000049",
    "name": "Plate",
    "slug": "plate"
  },
  {
    "id": "a1010049-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000049",
    "name": "CMH Road",
    "slug": "cmh-road"
  },
  {
    "id": "a1010049-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000049",
    "name": "Madina Market",
    "slug": "madina-market"
  },
  {
    "id": "a1010049-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000049",
    "name": "Upper Adda",
    "slug": "upper-adda"
  },
  {
    "id": "a101004a-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000004a",
    "name": "Sector F-1 & F-2",
    "slug": "sector-f-1-f-2"
  },
  {
    "id": "a101004a-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000004a",
    "name": "Sector C-1 to C-4",
    "slug": "sector-c-1-to-c-4"
  },
  {
    "id": "a101004a-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000004a",
    "name": "Allama Iqbal Road",
    "slug": "allama-iqbal-road"
  },
  {
    "id": "a101004a-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000004a",
    "name": "Kalyal Mor",
    "slug": "kalyal-mor"
  },
  {
    "id": "a101004a-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000004a",
    "name": "Chowk Shaheedan",
    "slug": "chowk-shaheedan"
  },
  {
    "id": "a101004b-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000004b",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101004b-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000004b",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101004b-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000004b",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101004b-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000004b",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101004b-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000004b",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101004c-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000004c",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101004c-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000004c",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101004c-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000004c",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101004c-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000004c",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101004c-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000004c",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101004d-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000004d",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a101004d-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000004d",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a101004d-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000004d",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a101004d-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000004d",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a101004d-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000004d",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  },
  {
    "id": "a101004e-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000004e",
    "name": "Jutial",
    "slug": "jutial"
  },
  {
    "id": "a101004e-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000004e",
    "name": "Airport Road",
    "slug": "airport-road"
  },
  {
    "id": "a101004e-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000004e",
    "name": "Nagaral",
    "slug": "nagaral"
  },
  {
    "id": "a101004e-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000004e",
    "name": "Kashrote",
    "slug": "kashrote"
  },
  {
    "id": "a101004e-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-00000000004e",
    "name": "City Market",
    "slug": "city-market"
  },
  {
    "id": "a101004f-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-00000000004f",
    "name": "Skardu Main Bazar",
    "slug": "skardu-main-bazar"
  },
  {
    "id": "a101004f-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-00000000004f",
    "name": "College Road",
    "slug": "college-road"
  },
  {
    "id": "a101004f-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-00000000004f",
    "name": "Yadgar Chowk",
    "slug": "yadgar-chowk"
  },
  {
    "id": "a101004f-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-00000000004f",
    "name": "Hussainabad",
    "slug": "hussainabad"
  },
  {
    "id": "a1010050-0000-4000-8000-000000000014",
    "city_id": "c1010000-0000-4000-8000-000000000050",
    "name": "Main City Bazar / Mobile Market",
    "slug": "main-city-bazar-mobile-market"
  },
  {
    "id": "a1010050-0000-4000-8000-000000000015",
    "city_id": "c1010000-0000-4000-8000-000000000050",
    "name": "Model Town / Civil Lines",
    "slug": "model-town-civil-lines"
  },
  {
    "id": "a1010050-0000-4000-8000-000000000016",
    "city_id": "c1010000-0000-4000-8000-000000000050",
    "name": "Cantt Area",
    "slug": "cantt-area"
  },
  {
    "id": "a1010050-0000-4000-8000-000000000017",
    "city_id": "c1010000-0000-4000-8000-000000000050",
    "name": "College / University Road",
    "slug": "college-university-road"
  },
  {
    "id": "a1010050-0000-4000-8000-000000000018",
    "city_id": "c1010000-0000-4000-8000-000000000050",
    "name": "G.T. Road / Highway Bypass",
    "slug": "g-t-road-highway-bypass"
  }
];

/**
 * Get all areas for a specific city ID or slug
 */
export function getCatalogAreasForCity(cityIdOrSlug: string): AreaOption[] {
  if (!cityIdOrSlug) return [];
  const clean = cityIdOrSlug.toLowerCase().trim();
  const city = PAKISTAN_CITIES.find(
    (c) => c.id === cityIdOrSlug || c.slug === clean || c.name.toLowerCase() === clean
  );
  if (!city) {
    return PAKISTAN_AREAS.filter((a) => a.city_id === cityIdOrSlug);
  }
  return PAKISTAN_AREAS.filter((a) => a.city_id === city.id);
}

/**
 * Filter cities by search term
 */
export function searchCatalogCities(query: string): ExtendedCityOption[] {
  if (!query || !query.trim()) return PAKISTAN_CITIES;
  const q = query.toLowerCase().trim();
  return PAKISTAN_CITIES.filter(
    (c) => c.name.toLowerCase().includes(q) || (c.province && c.province.toLowerCase().includes(q))
  );
}

/**
 * Create a deterministic custom area option when user types an unlisted neighborhood
 */
export function createCustomAreaOption(cityId: string, areaName: string): AreaOption {
  const cleanName = areaName.trim();
  const hex = Math.abs(
    cleanName.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
  )
    .toString(16)
    .padStart(12, '0')
    .slice(-12);

  return {
    id: `a101ffff-0000-4000-8000-${hex}`,
    city_id: cityId,
    name: cleanName,
    slug: cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  };
}
