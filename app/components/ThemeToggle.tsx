'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (stored === 'dark' || (!stored && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl border border-[#E9E7EF] dark:border-[#2D2947] flex items-center justify-center text-[#77758A] ${className}`}>
        <span className="w-4 h-4" />
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
      className={`min-h-[36px] min-w-[36px] rounded-xl border border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF] dark:bg-[#17152B] text-[#17152B] dark:text-[#F7F6F2] hover:border-[#7657FF] dark:hover:border-[#8A6FFF] transition-all flex items-center justify-center cursor-pointer ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#C7F36B] transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[#17152B] transition-transform hover:-rotate-12" />
      )}
    </button>
  )
}
