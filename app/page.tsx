import Link from 'next/link'
import Image from 'next/image'
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
  ArrowRight,
  Lock,
  Sparkles,
  Plus,
} from 'lucide-react'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export const instant = false

export default async function HomePage() {
  const [latestAds, , cities] = await Promise.all([
    getLatestAds(12),
    getPopularBrands(14),
    getActiveCitiesWithCounts(20),
  ])

  // Curate collections
  const flagshipPhones = latestAds.filter((ad) => (ad.price || 0) >= 150000)

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      <JsonLd data={buildOrganizationJsonLd()} />

      {/* ── 1. Editorial Hero Section (Asymmetric Bento Architecture) ──────── */}
      <section className="pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Left Column (7 cols): Editorial Typography & Unified Search */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-7">
            <div className="space-y-4">
              {/* Unboxed Kicker */}
              <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-widest uppercase text-[#7657FF] dark:text-[#8A6FFF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7657FF] dark:bg-[#C7F36B] animate-pulse" />
                <span>01 / The Smartphone Exchange of Pakistan</span>
                <span aria-hidden="true" className="text-[#77758A]/40">·</span>
                <span className="text-[#77758A] dark:text-[#9B98B2] font-semibold tracking-normal normal-case">Direct Peer-to-Peer Trade</span>
              </div>

              {/* Expressive Editorial Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#17152B] dark:text-[#F7F6F2] tracking-[-0.035em] leading-[1.04] text-balance">
                The Dedicated Exchange for <span className="text-[#7657FF] dark:text-[#8A6FFF]">Certified Smartphones</span>.
              </h1>

              {/* Editorial Subtitle */}
              <p className="text-sm sm:text-base text-[#77758A] dark:text-[#9B98B2] max-w-xl font-normal leading-relaxed text-balance">
                Zero unrelated classifieds, zero clutter. Buy and sell authentic iPhones, Galaxies, and flagship smartphones with certified PTA status, transparent battery health, and verified local sellers.
              </p>
            </div>

            {/* Refined Minimal Search Experience */}
            <div className="bg-[#FFFFFF] dark:bg-[#17152B] p-2.5 sm:p-3 rounded-2xl border border-[#E9E7EF] dark:border-[#2D2947] shadow-[0_8px_30px_rgba(23,21,43,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all focus-within:border-[#7657FF] dark:focus-within:border-[#8A6FFF]">
              <form
                action="/ads"
                method="GET"
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              >
                {/* Minimal City Selector */}
                <div className="relative flex items-center sm:w-48 shrink-0 sm:pl-2 sm:border-r border-[#E9E7EF] dark:border-[#2D2947]">
                  <MapPin className="w-4 h-4 text-[#7657FF] dark:text-[#8A6FFF] absolute left-3 pointer-events-none shrink-0" />
                  <select
                    name="city"
                    defaultValue=""
                    aria-label="Filter by City"
                    className="w-full h-12 sm:h-11 pl-9 pr-6 bg-[#F7F6F2] sm:bg-transparent dark:bg-[#211E38] sm:dark:bg-transparent rounded-xl sm:rounded-none text-base sm:text-sm text-[#17152B] dark:text-[#F7F6F2] border-0 focus:ring-0 font-semibold cursor-pointer outline-none appearance-none truncate min-h-[44px]"
                  >
                    <option value="">All Pakistan</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name} {c.ads_count > 0 ? `(${c.ads_count})` : ''}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 pointer-events-none text-[#77758A] text-[10px]">▼</div>
                </div>

                {/* Minimal Query Input */}
                <div className="flex-1 relative flex items-center min-w-0">
                  <Search className="w-4 h-4 text-[#77758A] ml-3 absolute pointer-events-none shrink-0" />
                  <input
                    type="text"
                    name="q"
                    placeholder="Search iPhone 16 Pro, S24 Ultra, Pixel..."
                    className="w-full h-12 sm:h-11 pl-9 pr-4 bg-transparent text-base sm:text-sm text-[#17152B] dark:text-[#F7F6F2] placeholder:text-[#77758A] focus:outline-none truncate font-medium min-h-[44px]"
                  />
                </div>

                {/* Primary CTA */}
                <button
                  type="submit"
                  className="h-12 sm:h-11 px-5 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0 min-h-[44px]"
                >
                  <span>Explore Market</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>

              {/* Minimal Quick Queries */}
              <div className="flex items-center gap-2 px-2 pt-2.5 text-xs text-[#77758A] dark:text-[#9B98B2] overflow-x-auto whitespace-nowrap scrollbar-none py-1">
                <span className="font-bold text-[#17152B] dark:text-[#F7F6F2] tracking-wide uppercase text-[11px] shrink-0">Curated:</span>
                <Link href="/ads?q=iPhone+16" className="hover:text-[#7657FF] dark:hover:text-[#8A6FFF] transition-colors py-1 px-1.5 min-h-[32px] inline-flex items-center">iPhone 16</Link>
                <span aria-hidden="true" className="text-[#77758A]/40">·</span>
                <Link href="/ads?q=Galaxy+S24" className="hover:text-[#7657FF] dark:hover:text-[#8A6FFF] transition-colors py-1 px-1.5 min-h-[32px] inline-flex items-center">Galaxy S24 Ultra</Link>
                <span aria-hidden="true" className="text-[#77758A]/40">·</span>
                <Link href="/ads?q=Pixel+9" className="hover:text-[#7657FF] dark:hover:text-[#8A6FFF] transition-colors py-1 px-1.5 min-h-[32px] inline-flex items-center">Pixel 9 Pro</Link>
                <span aria-hidden="true" className="text-[#77758A]/40">·</span>
                <Link href="/ads?pta=pta_approved" className="text-[#159B72] font-semibold hover:underline transition-colors py-1 px-1.5 min-h-[32px] inline-flex items-center">Official PTA Approved</Link>
              </div>
            </div>

            {/* 3 Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947]">
                <div className="flex items-center justify-between mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#159B72]" />
                  <span className="text-[10px] font-mono text-[#77758A]">01</span>
                </div>
                <p className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">PTA Certified</p>
                <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2] mt-0.5">Every handset displays official tax registration</p>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947]">
                <div className="flex items-center justify-between mb-1.5">
                  <Smartphone className="w-4 h-4 text-[#7657FF] dark:text-[#8A6FFF]" />
                  <span className="text-[10px] font-mono text-[#77758A]">02</span>
                </div>
                <p className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">100% Smartphone Focus</p>
                <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2] mt-0.5">Zero cars, zero appliances, zero spam</p>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947]">
                <div className="flex items-center justify-between mb-1.5">
                  <Lock className="w-4 h-4 text-[#7657FF] dark:text-[#8A6FFF]" />
                  <span className="text-[10px] font-mono text-[#77758A]">03</span>
                </div>
                <p className="text-xs font-bold text-[#17152B] dark:text-[#F7F6F2]">In-Hand Inspection</p>
                <p className="text-[11px] text-[#77758A] dark:text-[#9B98B2] mt-0.5">Inspect physical hardware before paying</p>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Verified Smartphone Marketplace Spotlight */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 rounded-3xl bg-gradient-to-br from-[#17152B] via-[#1E1B38] to-[#121024] border border-[#2D2947] p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-[0_16px_45px_rgba(23,21,43,0.14)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.55)] group">
              {/* Subtle Ambient Radial Lighting */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#7657FF]/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#C7F36B]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Kicker & Live Status */}
              <div className="flex items-center justify-between z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7657FF]/20 border border-[#7657FF]/40 text-[#C7F36B] text-[11px] font-bold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant Peer-to-Peer</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#9B98B2]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Live Marketplace</span>
                </div>
              </div>

              {/* Title & Subheading */}
              <div className="mt-4 z-10 space-y-1.5">
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#8A6FFF]">
                  Verified Handsets · 0% Commission
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                  Sell Your Mobile Today. Get Instant Cash.
                </h3>
                <p className="text-xs text-[#B5B3C7] leading-relaxed">
                  Connect directly with verified buyers across Pakistan. No middleman cuts, in-person cash inspection.
                </p>
              </div>

              {/* Real Smartphone Showcase Container */}
              <div className="my-4 relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#0E0D1A] group-hover:border-[#7657FF]/50 transition-colors shadow-inner">
                <Image
                  src="/hero-smartphones.jpg"
                  alt="Pakistan Verified Smartphones - Apple iPhone, Samsung Galaxy, Google Pixel"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121024]/90 via-[#121024]/20 to-transparent pointer-events-none" />

                {/* Floating Trust Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#17152B]/90 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>PTA Certified</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-xl bg-[#17152B]/95 backdrop-blur-md border border-white/15 text-[11px] text-[#F7F6F2] shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-[#7657FF]" />
                    <span className="font-semibold text-white">Direct Chat & Offers</span>
                  </div>
                  <span className="font-bold text-[#C7F36B]">Free Listing</span>
                </div>
              </div>

              {/* Value Metrics Grid */}
              <div className="z-10 grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center">
                <div className="px-1">
                  <div className="text-[10px] text-[#9B98B2] font-medium uppercase tracking-wider">List In</div>
                  <div className="text-xs font-bold text-white mt-0.5">&lt; 2 Minutes</div>
                </div>
                <div className="px-1 border-x border-white/10">
                  <div className="text-[10px] text-[#9B98B2] font-medium uppercase tracking-wider">Commission</div>
                  <div className="text-xs font-bold text-[#C7F36B] mt-0.5">Rs 0 Free</div>
                </div>
                <div className="px-1">
                  <div className="text-[10px] text-[#9B98B2] font-medium uppercase tracking-wider">Deal Safety</div>
                  <div className="text-xs font-bold text-white mt-0.5">In-Hand Cash</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="z-10 pt-4 flex flex-col sm:flex-row items-center gap-2.5">
                <Link
                  href="/post-ad"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#7657FF] hover:bg-[#6444E6] text-white text-xs font-bold shadow-md transition-all active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Smartphone Ad</span>
                </Link>
                <Link
                  href="/ads"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition-colors"
                >
                  <span>Browse Handsets</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24">
        {/* ── 2. Curated Smartphone Manufacturers ───────────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[#E9E7EF] dark:border-[#2D2947]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7657FF] dark:text-[#8A6FFF]">
                Manufacturers Directory
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#17152B] dark:text-[#F7F6F2] tracking-tight mt-0.5">
                Browse by Smartphone Brand
              </h2>
            </div>
            <Link
              href="/ads"
              className="text-xs font-bold text-[#7657FF] dark:text-[#8A6FFF] hover:underline flex items-center gap-1"
            >
              <span>View All Brands</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <BrandCards />
        </section>

        {/* ── 3. Flagship Tier Spotlight (High-End Smartphones) ─────────────── */}
        {flagshipPhones.length > 0 && (
          <section className="rounded-3xl bg-[#17152B] text-[#F7F6F2] p-8 sm:p-12 border border-[#2D2947] relative overflow-hidden shadow-xl">
            <div className="relative z-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#C7F36B]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Executive Hardware Collection</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-balance">
                    Flagship Smartphones (150K+ PKR)
                  </h2>
                  <p className="text-xs sm:text-sm text-[#9B98B2] max-w-xl">
                    High-performance iPhone Pro, Galaxy Ultra, and Foldable series with verified battery health and official PTA clearance.
                  </p>
                </div>
                <Link
                  href="/ads?min_price=150000"
                  className="px-5 py-2.5 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white text-xs font-bold transition-all shrink-0 self-start sm:self-auto"
                >
                  Explore All Flagships
                </Link>
              </div>

              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {flagshipPhones.slice(0, 3).map((phone) => (
                  <AdCard key={phone.id} ad={phone} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 4. Latest Market Arrivals ────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[#E9E7EF] dark:border-[#2D2947]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7657FF] dark:text-[#8A6FFF]">
                Live Feed
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#17152B] dark:text-[#F7F6F2] tracking-tight mt-0.5">
                Latest Smartphone Arrivals
              </h2>
            </div>
            <Link
              href="/ads"
              className="text-xs font-bold text-[#7657FF] dark:text-[#8A6FFF] hover:underline flex items-center gap-1"
            >
              <span>Explore All {latestAds.length}+ Phones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {latestAds.length === 0 ? (
            <div className="bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] rounded-3xl p-12 text-center space-y-4">
              <Smartphone className="w-12 h-12 text-[#7657FF] mx-auto" />
              <h3 className="text-base font-bold text-[#17152B] dark:text-[#F7F6F2]">
                No phone listings published yet
              </h3>
              <p className="text-xs text-[#77758A] dark:text-[#9B98B2] max-w-sm mx-auto">
                Be the first to list your smartphone on Pakistan&apos;s exclusive mobile marketplace.
              </p>
              <Link
                href="/post-ad"
                className="inline-block mt-2 px-6 py-2.5 rounded-xl bg-[#7657FF] text-white font-bold text-xs shadow-sm"
              >
                + Post Free Phone Ad
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {latestAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          )}
        </section>


        {/* ── 6. The MobileBazar Verification Manifesto ─────────────────────── */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#FFFFFF] dark:bg-[#17152B] border border-[#E9E7EF] dark:border-[#2D2947] space-y-8 shadow-sm">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7657FF] dark:text-[#8A6FFF]">
              The Marketplace Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17152B] dark:text-[#F7F6F2] tracking-tight">
              Why MobileBazar is Built Differently.
            </h2>
            <p className="text-xs sm:text-sm text-[#77758A] dark:text-[#9B98B2] leading-relaxed">
              Traditional classified platforms are cluttered with fake ads, hidden faults, and confusing tax status. MobileBazar enforces smartphone-native transparency from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E9E7EF] dark:border-[#2D2947]">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#7657FF]/10 text-[#7657FF] dark:text-[#8A6FFF] flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="font-bold text-sm text-[#17152B] dark:text-[#F7F6F2]">PTA Status Clarity</h3>
              <p className="text-xs text-[#77758A] dark:text-[#9B98B2] leading-relaxed">
                Clear distinction between PTA Approved, Non-PTA, JV, or Gevey SIM configurations so you never face unexpected cellular blocking.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#7657FF]/10 text-[#7657FF] dark:text-[#8A6FFF] flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="font-bold text-sm text-[#17152B] dark:text-[#F7F6F2]">Battery & Spec Honesty</h3>
              <p className="text-xs text-[#77758A] dark:text-[#9B98B2] leading-relaxed">
                Every listing reports genuine battery health percentage, storage capacity, RAM, and repair status without marketing exaggeration.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#7657FF]/10 text-[#7657FF] dark:text-[#8A6FFF] flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="font-bold text-sm text-[#17152B] dark:text-[#F7F6F2]">Verified Seller Verification</h3>
              <p className="text-xs text-[#77758A] dark:text-[#9B98B2] leading-relaxed">
                Seller contact details require SMS phone verification. Connect directly via call or WhatsApp without middleman commission.
              </p>
            </div>
          </div>
        </section>

        {/* ── 7. Editorial CTA Banner ───────────────────────────────────────── */}
        <section className="bg-[#17152B] rounded-3xl p-8 sm:p-12 text-[#F7F6F2] flex flex-col md:flex-row items-center justify-between gap-8 border border-[#2D2947] relative overflow-hidden shadow-xl">
          <div className="space-y-3 text-center md:text-left z-10">
            <span className="text-xs font-bold text-[#C7F36B] tracking-wider uppercase">
              Free Seller Publishing
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ready to Upgrade or Sell Your Handset?
            </h2>
            <p className="text-xs sm:text-sm text-[#9B98B2] max-w-lg leading-relaxed">
              Publish your device on Pakistan&apos;s verified smartphone exchange in under 2 minutes. Receive direct offers on WhatsApp or call from buyers in your neighborhood.
            </p>
          </div>
          <Link
            href="/post-ad"
            className="z-10 px-8 py-3.5 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap active:scale-[0.98] cursor-pointer min-h-[44px] inline-flex items-center justify-center"
          >
            Post Your Smartphone Free
          </Link>
        </section>
      </div>
    </div>
  )
}
