import Link from 'next/link'
import { connection } from 'next/server'
import { requireStaff } from '@/src/lib/admin/guard'
import { createClient } from '@/src/lib/supabase/server'
import type { AdminStatsData } from '@/src/types/admin'

export default async function AdminDashboardPage() {
  await connection()
  await requireStaff()
  const supabase = await createClient()

  // Fetch telemetry & stats
  const { data, error } = await (supabase.rpc as any)('admin_dashboard_stats', { p_days: 30 })
  const stats = (data as unknown as AdminStatsData) || {
    current_counts: { active_ads: 0, under_review_ads: 0, pending_reports: 0, unresolved_flags: 0, banned_users: 0 },
    trend: [],
    top_cities: [],
    top_brands: [],
    flag_precision: [],
  }

  const { current_counts, trend, top_cities, top_brands, flag_precision } = stats

  // Max daily new ads for bar chart scaling
  const maxDaily = Math.max(...(trend?.map((t) => t.new_ads) || [1]), 1)

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          Moderation & Telemetry Dashboard
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Real-time metrics, queue bottlenecks, and 30-day activity trends.
        </p>
      </div>

      {/* ── 1. Hero KPI Cards ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          href="/admin/ads?status=under_review"
          className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs hover:border-amber-400 transition-all space-y-1"
        >
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">⏳ Under Review</p>
          <p className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{current_counts.under_review_ads}</p>
          <p className="text-[11px] text-zinc-400">Needs staff approval</p>
        </Link>

        <Link
          href="/admin/reports"
          className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs hover:border-red-400 transition-all space-y-1"
        >
          <p className="text-xs font-semibold text-red-600 dark:text-red-400">🚩 Pending Reports</p>
          <p className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{current_counts.pending_reports}</p>
          <p className="text-[11px] text-zinc-400">User fraud alerts</p>
        </Link>

        <Link
          href="/admin/flags"
          className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs hover:border-purple-400 transition-all space-y-1"
        >
          <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">🛡️ Unresolved Flags</p>
          <p className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{current_counts.unresolved_flags}</p>
          <p className="text-[11px] text-zinc-400">Spam rule signals</p>
        </Link>

        <Link
          href="/admin/ads?status=active"
          className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs hover:border-emerald-400 transition-all space-y-1"
        >
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">✅ Live Active Ads</p>
          <p className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{current_counts.active_ads}</p>
          <p className="text-[11px] text-zinc-400">Public marketplace</p>
        </Link>
      </div>

      {/* ── 2. 30-Day Trend Chart (CSS Bars - No External Libraries) ───────── */}
      <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Activity Trends (Last 30 Days)
          </h2>
          <div className="flex items-center gap-4 text-[11px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> New Ads
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" /> New Users
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-red-400 inline-block" /> Removed Ads
            </span>
          </div>
        </div>

        <div className="h-44 flex items-end gap-1.5 pt-8 overflow-x-auto pb-2 border-b border-zinc-100 dark:border-zinc-800">
          {trend?.map((t) => {
            const heightPct = Math.round((t.new_ads / maxDaily) * 100)
            return (
              <div
                key={t.stat_date}
                className="flex-1 min-w-[14px] flex flex-col items-center gap-1 group relative"
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-14 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                  <div className="bg-zinc-900 text-white text-[10px] py-1 px-2 rounded-md shadow-lg whitespace-nowrap">
                    <p className="font-bold">{t.stat_date}</p>
                    <p>New Ads: {t.new_ads}</p>
                    <p>New Users: {t.new_users}</p>
                    <p>Removed: {t.removed_ads}</p>
                  </div>
                  <div className="w-1.5 h-1.5 bg-zinc-900 rotate-45 -mt-1" />
                </div>

                <div
                  style={{ height: `${Math.max(heightPct, 4)}%` }}
                  className="w-full bg-emerald-500/80 rounded-t-xs hover:bg-emerald-600 transition-all"
                />
                <span className="text-[9px] text-zinc-400 rotate-45 origin-left pt-1">
                  {t.stat_date.slice(5)}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 3. Spam Flag Precision Tuning Matrix ─────────────────────────────── */}
      <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Spam Rule Precision Matrix (Shadow Mode Feedback)
            </h2>
            <p className="text-xs text-zinc-500">
              Measured from staff approval vs removal actions.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
            Rule of thumb: Only turn on enforcement if precision &gt; 80%
          </span>
        </div>

        {flag_precision.length === 0 ? (
          <p className="text-xs text-zinc-500 py-4 text-center">
            No spam flag data recorded yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500">
                <tr>
                  <th className="py-2.5 font-semibold">Flag Type</th>
                  <th className="py-2.5 font-semibold text-emerald-600">Confirmed (True Spam)</th>
                  <th className="py-2.5 font-semibold text-zinc-400">False Positive</th>
                  <th className="py-2.5 font-semibold text-amber-500">Unresolved</th>
                  <th className="py-2.5 font-semibold">Precision</th>
                  <th className="py-2.5 font-semibold text-right">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {flag_precision.map((fp) => {
                  const prec = fp.precision_pct
                  const isHigh = prec !== null && prec >= 80
                  return (
                    <tr key={fp.flag_type} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                      <td className="py-3 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        {fp.flag_type}
                      </td>
                      <td className="py-3 font-semibold text-emerald-600">
                        {fp.confirmed_count}
                      </td>
                      <td className="py-3 text-zinc-500">
                        {fp.false_positive_count}
                      </td>
                      <td className="py-3 text-amber-500">
                        {fp.unresolved_count}
                      </td>
                      <td className="py-3 font-bold">
                        {prec !== null ? `${prec}%` : 'N/A'}
                      </td>
                      <td className="py-3 text-right">
                        {prec === null ? (
                          <span className="text-[11px] text-zinc-400">Needs more samples</span>
                        ) : isHigh ? (
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                            Ready for auto-enforcement
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                            Keep in shadow mode
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── 4. Top Cities & Brands Breakdown ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Top 10 Cities by Live Ads
          </h2>
          <div className="space-y-2">
            {top_cities.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">{c.name}</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                  {c.active_ads_count} ads
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Top 10 Brands by Live Ads
          </h2>
          <div className="space-y-2">
            {top_brands.map((b) => (
              <div key={b.name} className="flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">{b.name}</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                  {b.active_ads_count} ads
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
