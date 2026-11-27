'use client'

import { Check, X } from 'lucide-react'

interface PasswordStrengthMeterProps {
  password: string
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const rules = [
    { label: '8+ chars', met: password.length >= 8 },
    { label: 'Uppercase (A-Z)', met: /[A-Z]/.test(password) },
    { label: 'Lowercase (a-z)', met: /[a-z]/.test(password) },
    { label: 'Number (0-9)', met: /[0-9]/.test(password) },
    { label: 'Symbol (!@#$)', met: /[^A-Za-z0-9]/.test(password) },
  ]

  const score = rules.filter((r) => r.met).length

  const strengthMeta =
    score <= 2
      ? { label: 'Weak', color: 'bg-red-500', text: 'text-red-500' }
      : score === 3
        ? { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-500' }
        : score === 4
          ? { label: 'Good', color: 'bg-[#7657FF]', text: 'text-[#7657FF]' }
          : { label: 'Strong', color: 'bg-[#159B72]', text: 'text-[#159B72]' }

  if (!password) return null

  return (
    <div className="mt-2 p-3 rounded-2xl bg-[#F7F6F2] dark:bg-[#211E38]/70 border border-[#E9E7EF] dark:border-[#2D2947] space-y-2.5 transition-all duration-200">
      <div className="flex items-center justify-between text-[11px] font-bold">
        <span className="text-[#77758A] dark:text-[#9B98B2]">Password Strength</span>
        <span className={strengthMeta.text}>{strengthMeta.label}</span>
      </div>

      {/* Animated 5-segment progress bar */}
      <div className="grid grid-cols-5 gap-1.5">
        {[1, 2, 3, 4, 5].map((segment) => (
          <div
            key={segment}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              score >= segment ? strengthMeta.color : 'bg-[#E9E7EF] dark:bg-[#2D2947]'
            }`}
          />
        ))}
      </div>

      {/* Rule checklist */}
      <div className="grid grid-cols-2 gap-1.5 pt-0.5">
        {rules.map((rule) => (
          <div key={rule.label} className="flex items-center gap-1.5 text-[11px]">
            {rule.met ? (
              <Check className="w-3 h-3 text-[#159B72] shrink-0" />
            ) : (
              <X className="w-3 h-3 text-[#77758A]/60 shrink-0" />
            )}
            <span
              className={
                rule.met
                  ? 'text-[#17152B] dark:text-[#F7F6F2] font-semibold'
                  : 'text-[#77758A] dark:text-[#9B98B2]'
              }
            >
              {rule.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
