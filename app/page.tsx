import Link from 'next/link'
import { connection } from 'next/server'
import type { Metadata } from 'next'
import { getLatestAds, getPopularBrands, getActiveCitiesWithCounts } from '@/src/lib/data/ads'
import { AdCard } from '@/app/components/AdCard'
import { BrandCards } from '@/app/components/BrandCards'
import { JsonLd, buildOrganizationJsonLd } from '@/src/lib/seo/jsonld'
import {
  Search,
  MapPin,
  ShieldCheck,
  Smartphone,
  Sparkles,
  ArrowRight,
  Lock,
} from 'lucide-react'

export const instant = false

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default async function HomePage() {
  await connection()
  const [latestAds, , cities] = await Promise.all([
    getLatestAds(12),
    getPopularBrands(14),
    getActiveCitiesWithCounts(20),
  ])

  // Curate collections
  const flagshipPhones = latestAds.filter((ad) => (ad.price || 0) >= 200000)
  const budgetPhones = latestAds.filter((ad) => (ad.price || 0) < 100000)

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      <JsonLd data={buildOrganizationJsonLd()} />

      {/* ── 1. Hero Section: Apple Store & Back Market Inspired ────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-600/10 via-slate-50/50 to-transparent dark:from-blue-950/20 dark:via-slate-900/40 dark:to-transparent pt-8 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Eyebrow Pill */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>100% Dedicated Smartphone Marketplace · Pakistan</span>
            </span>
          </div>

          {/* Main Headline */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight text-balance">
              Buy & Sell <span className="text-blue-600 dark:text-blue-500">Smartphones</span> With Full Confidence
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Exclusively for mobile phones. Compare verified PTA status, authentic specs, transparent battery health, and connect directly with trusted local sellers.
            </p>
          </div>

          {/* Unified Smart Search & City Selector Bar */}
          <div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-900 p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
            <form
              action="/ads"
              method="GET"
              className="flex flex-col sm:flex-row items-stretch gap-2"
            >
              {/* Location Picker */}
              <div className="sm:w-1/3 relative border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 pb-2 sm:pb-0 sm:pr-2 flex items-center">
                <MapPin className="w-4 h-4 text-blue-600 ml-2.5 absolute pointer-events-none" />
                <select
                  name="city"
                  defaultValue=""
                  className="w-full h-11 pl-9 pr-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 border-0 focus:ring-2 focus:ring-blue-600 font-semibold cursor-pointer"
                >
                  <option value="">All Pakistan (All Cities)</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name} {c.ads_count > 0 ? `(${c.ads_count})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Keyword Input */}
              <div className="flex-1 relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 ml-3 absolute pointer-events-none" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search iPhone, Samsung, Xiaomi..."
                  className="w-full h-11 pl-9 pr-4 bg-transparent text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              {/* Search CTA */}
              <button
                type="submit"
                className="h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Find Phones</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Filter Tags */}
            <div className="flex items-center gap-2 px-3 pt-2 text-[11px] text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap">
              <span className="font-semibold text-slate-400">Popular:</span>
              <Link href="/ads?q=iPhone+15+Pro" className="hover:text-blue-600 dark:hover:text-blue-400 underline decoration-slate-300">iPhone 15 Pro</Link>
              <span>·</span>
              <Link href="/ads?q=Galaxy+S24" className="hover:text-blue-600 dark:hover:text-blue-400 underline decoration-slate-300">Galaxy S24 Ultra</Link>
              <span>·</span>
              <Link href="/ads?q=Pixel+8" className="hover:text-blue-600 dark:hover:text-blue-400 underline decoration-slate-300">Pixel 8</Link>
              <span>·</span>
              <Link href="/ads?pta=pta_approved" className="hover:text-blue-600 dark:hover:text-blue-400 text-emerald-600 dark:text-emerald-400 font-semibold">Official PTA Approved</Link>
            </div>
          </div>

          {/* 3 Trust Markers Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 max-w-4xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">PTA Verification</h4>
                <p className="text-[11px] text-slate-500">Every ad displays certified PTA status</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Smartphones Only</h4>
                <p className="text-[11px] text-slate-500">Zero spam, zero unrelated clutter</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Direct Local Deals</h4>
                <p className="text-[11px] text-slate-500">Inspect the phone before you pay</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* ── 2. Popular Smartphone Brands Section ─────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
                <span>Browse by Smartphone Brand</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Explore dedicated catalogs for all major smartphone manufacturers
              </p>
            </div>
            <Link
              href="/ads"
              className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All Brands</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <BrandCards />
        </section>

        {/* ── 3. Featured Flagship Deals Spotlight (Apple / Back Market style) ── */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Flagship Showcase
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Looking for iPhone 15 Pro or Galaxy S24 Ultra?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                Find authentic flagship devices with verified PTA status, clean IMEI history, and battery health reports from genuine owners across Lahore, Karachi, and Islamabad.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/ads?min_price=150000"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95"
                >
                  Explore Flagships
                </Link>
                <Link
                  href="/post-ad"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/20"
                >
                  List Your Phone Free
                </Link>
              </div>
            </div>

            {/* Quick mini-cards of flagships */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {flagshipPhones.slice(0, 2).map((phone) => (
                <div
                  key={phone.id}
                  className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-2 hover:bg-white/15 transition-all"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                    {phone.brand_name}
                  </span>
                  <h4 className="font-bold text-sm text-white line-clamp-1">{phone.title}</h4>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-base font-black text-amber-400">
                      Rs {phone.price?.toLocaleString()}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      {phone.pta_status === 'pta_approved' ? 'PTA Approved' : 'Non-PTA'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Latest Phone Listings Grid ────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  Latest Smartphone Listings
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Recently posted smartphones by verified buyers and sellers across Pakistan
              </p>
            </div>
            <Link
              href="/ads"
              className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Explore All {latestAds.length}+ Phones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {latestAds.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <Smartphone className="w-12 h-12 text-blue-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                No phone listings found yet
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Be the first to list your smartphone on Pakistan&apos;s exclusive mobile marketplace.
              </p>
              <Link
                href="/post-ad"
                className="inline-block mt-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md"
              >
                + Post Free Phone Ad
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {latestAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          )}
        </section>

        {/* ── 5. Budget-Friendly Smartphones (Under 100K PKR) ───────────── */}
        {budgetPhones.length > 0 && (
          <section className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  Budget-Friendly Phones (Under 100K)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  High value phones offering great cameras, battery and performance
                </p>
              </div>
              <Link
                href="/ads?max_price=100000"
                className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>View All Budget Phones</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {budgetPhones.slice(0, 4).map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </section>
        )}

        {/* ── 6. Sell Your Smartphone Banner ───────────────────────────── */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 uppercase tracking-wider">
              Zero Fees · 100% Free
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Ready to Upgrade or Sell Your Smartphone?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              List your phone on MobileBazar in 2 minutes. Get genuine offers directly on your phone or WhatsApp from verified buyers in your city.
            </p>
          </div>
          <Link
            href="/post-ad"
            className="px-8 py-3.5 rounded-2xl bg-white text-blue-700 font-extrabold text-sm sm:text-base hover:bg-slate-100 active:scale-95 shadow-lg transition-all whitespace-nowrap cursor-pointer"
          >
            + Post a Free Phone Ad
          </Link>
        </section>
      </div>
    </div>
  )
}
