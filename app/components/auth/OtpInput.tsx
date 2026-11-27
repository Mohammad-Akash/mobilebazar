'use client'

import React, { useRef } from 'react'

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
  disabled?: boolean
  name?: string
  autoFocus?: boolean
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  name = 'token',
  autoFocus = true,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Ensure digits array is always `length` elements
  const digits = Array.from({ length }, (_, i) => value[i] || '')

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawChar = e.target.value.replace(/\D/g, '')
    if (!rawChar) {
      // User erased
      const newDigits = [...digits]
      newDigits[index] = ''
      onChange(newDigits.join(''))
      return
    }

    // If single or multiple digits entered
    const lastChar = rawChar.slice(-1)
    const newDigits = [...digits]
    newDigits[index] = lastChar
    const newVal = newDigits.join('')
    onChange(newVal)

    // Focus next box if available
    if (index < length - 1 && lastChar) {
      inputRefs.current[index + 1]?.focus()
      inputRefs.current[index + 1]?.select()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault()
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    onChange(pasted)
    const targetIndex = Math.min(pasted.length, length - 1)
    inputRefs.current[targetIndex]?.focus()
  }

  return (
    <div className="space-y-2">
      {/* Hidden input to pass value in FormData for Server Actions */}
      {name && <input type="hidden" name={name} value={value} />}

      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            autoFocus={autoFocus && idx === 0}
            disabled={disabled}
            onChange={(e) => handleChange(idx, e)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-black rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38] border-2 border-[#E9E7EF] dark:border-[#2D2947] text-[#17152B] dark:text-[#F7F6F2] focus:outline-none focus:border-[#7657FF] dark:focus:border-[#8A6FFF] focus:ring-4 focus:ring-[#7657FF]/15 transition-all disabled:opacity-50 select-all shadow-xs"
            aria-label={`Digit ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
