import Link from 'next/link'

export default function AdminNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-black text-zinc-300 dark:text-zinc-700 tracking-tight">404</h1>
      <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-2">
        Page Not Found
      </h2>
      <p className="text-sm text-zinc-500 max-w-sm mt-1">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
      >
        Return to Home
      </Link>
    </div>
  )
}
