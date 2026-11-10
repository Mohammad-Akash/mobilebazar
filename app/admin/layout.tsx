import type { Metadata } from 'next'
import Link from 'next/link'
import { connection } from 'next/server'
import { requireStaff } from '@/src/lib/admin/guard'

export const metadata: Metadata = {
  title: 'Admin & Moderation Panel — MobileBazar',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export const instant = false

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await connection()
  const staff = await requireStaff({ allowSecurityPage: true })
  const isAdmin = staff.role === 'admin'

  const navLinks = [
    { label: '📊 Dashboard', href: '/admin' },
    { label: '📱 Ads Queue', href: '/admin/ads' },
    { label: '🚩 Reports', href: '/admin/reports' },
    { label: '🛡️ Spam Flags', href: '/admin/flags' },
    { label: '👥 Users', href: '/admin/users' },
    ...(isAdmin
      ? [
          { label: '⚙️ Settings', href: '/admin/settings' },
          { label: '🚫 Blocked Terms', href: '/admin/terms' },
          { label: '📜 Audit Trail', href: '/admin/audit' },
        ]
      : []),
    { label: '🔐 2-Step Login (MFA)', href: '/admin/security' },
  ]

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col md:flex-row">
      {/* ── Desktop Sidebar ────────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 space-y-6 shrink-0">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="font-black text-lg tracking-tight flex items-center gap-2">
            <span className="text-emerald-600">🛡️</span>
            <span>MobileBazar</span>
          </Link>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
              isAdmin
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
            }`}
          >
            {staff.role}
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 space-y-2">
          <p className="truncate font-medium">{staff.user.email}</p>
          <div className="flex items-center justify-between text-[11px]">
            <span>Session:</span>
            <span className="font-bold text-emerald-600">{staff.aal.toUpperCase()}</span>
          </div>
          <Link
            href="/"
            className="block text-center py-1.5 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 font-semibold transition-colors"
          >
            ← Public Marketplace
          </Link>
        </div>
      </aside>

      {/* ── Mobile Top Header ──────────────────────────────────────────── */}
      <header className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex items-center justify-between">
        <Link href="/admin" className="font-bold text-sm flex items-center gap-1.5">
          <span>🛡️</span>
          <span>Staff Panel</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase">
            {staff.role}
          </span>
          <Link href="/admin/security" className="text-xs p-1">
            🔐
          </Link>
        </div>
      </header>

      {/* ── Mobile Navigation Bar (Scrollable) ─────────────────────────── */}
      <div className="md:hidden flex items-center gap-2 overflow-x-auto p-2 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-xs whitespace-nowrap">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-medium"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* ── Main Content Area ──────────────────────────────────────────── */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}
