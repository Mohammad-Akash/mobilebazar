'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface ThreadInputProps {
  onSend: (text: string) => Promise<boolean>
  disabled?: boolean
  disabledReason?: string
  conversationId: string
}

export function ThreadInput({
  onSend,
  disabled = false,
  disabledReason,
  conversationId,
}: ThreadInputProps) {
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const draft = localStorage.getItem(`chat_draft_${conversationId}`)
      if (draft) setText(draft)
    } catch {
      // ignore storage error
    }
  }, [conversationId])

  // Save draft on change
  const handleChange = (val: string) => {
    setText(val)
    try {
      if (val.trim()) {
        localStorage.setItem(`chat_draft_${conversationId}`, val)
      } else {
        localStorage.removeItem(`chat_draft_${conversationId}`)
      }
    } catch {
      // ignore storage error
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || isSending || disabled) return

    setIsSending(true)
    const success = await onSend(trimmed)
    setIsSending(false)

    if (success) {
      setText('')
      try {
        localStorage.removeItem(`chat_draft_${conversationId}`)
      } catch {
        // ignore storage error
      }
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [text])

  if (disabled) {
    return (
      <div className="p-3 bg-[#F7F6F2] dark:bg-[#211E38] rounded-2xl border border-[#E9E7EF] dark:border-[#2D2947] text-center text-xs text-[#77758A] dark:text-[#9B98B2]">
        {disabledReason || 'Chat abhi active nahi hai.'}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-[#FFFFFF] dark:bg-[#17152B] p-2 rounded-2xl border border-[#E9E7EF] dark:border-[#2D2947] shadow-lg">
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message... (Press Enter to send)"
        maxLength={1000}
        className="flex-1 max-h-28 p-2 text-xs sm:text-sm bg-transparent text-[#17152B] dark:text-[#F7F6F2] placeholder:text-[#77758A] resize-none outline-none leading-relaxed"
      />

      <div className="flex items-center gap-2 pb-1 pr-1">
        <span className="text-[10px] text-[#77758A] tabular-nums hidden sm:inline">
          {text.length}/1000
        </span>
        <button
          type="submit"
          disabled={!text.trim() || isSending}
          className="w-9 h-9 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4 stroke-[2]" />
          )}
        </button>
      </div>
    </form>
  )
}
