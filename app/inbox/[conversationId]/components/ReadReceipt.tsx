'use client'

interface ReadReceiptProps {
  status: 'sending' | 'sent' | 'delivered' | 'seen'
  className?: string
}

export function ReadReceipt({ status, className = '' }: ReadReceiptProps) {
  if (status === 'sending') {
    return (
      <span className={`inline-flex items-center text-white/50 ${className}`} title="Sending...">
        <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </span>
    )
  }

  if (status === 'seen') {
    // Professional WhatsApp-style double blue checks (#53bdeb)
    return (
      <span
        className={`inline-flex items-center text-[#53bdeb] ${className}`}
        title="Seen / Read"
      >
        <svg
          viewBox="0 0 16 11"
          className="w-3.5 h-2.5 fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round"
        >
          {/* First Checkmark */}
          <path d="M1 5.5L4.5 9L11 1.5" />
          {/* Second overlapping Checkmark */}
          <path d="M5.5 5.5L9 9L15.5 1.5" />
        </svg>
      </span>
    )
  }

  if (status === 'delivered') {
    // Double gray checks
    return (
      <span
        className={`inline-flex items-center text-white/70 dark:text-zinc-400 ${className}`}
        title="Delivered"
      >
        <svg
          viewBox="0 0 16 11"
          className="w-3.5 h-2.5 fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round"
        >
          <path d="M1 5.5L4.5 9L11 1.5" />
          <path d="M5.5 5.5L9 9L15.5 1.5" />
        </svg>
      </span>
    )
  }

  // Single Checkmark (Sent)
  return (
    <span
      className={`inline-flex items-center text-white/60 dark:text-zinc-400 ${className}`}
      title="Sent"
    >
      <svg
        viewBox="0 0 11 11"
        className="w-3 h-2.5 fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round"
      >
        <path d="M1 5.5L4.5 9L10 1.5" />
      </svg>
    </span>
  )
}
