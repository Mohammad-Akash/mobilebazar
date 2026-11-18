'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Tag, Image as ImageIcon, Smile, Camera, X, Plus } from 'lucide-react'
import { ChatEmojiPicker } from './ChatEmojiPicker'
import { CameraCaptureModal } from './CameraCaptureModal'
import { createClient } from '@/src/lib/supabase/client'
import imageCompression from 'browser-image-compression'

interface ThreadInputProps {
  onSend: (text: string, kind?: 'text' | 'offer', offerAmount?: number) => Promise<boolean>
  onOpenOfferModal?: () => void
  onOpenPhoneModal?: () => void
  currentUserId?: string
  disabled?: boolean
  disabledReason?: string
  conversationId: string
}

const MAX_IMAGES = 8

export function ThreadInput({
  onSend,
  onOpenOfferModal,
  onOpenPhoneModal,
  currentUserId,
  disabled = false,
  disabledReason,
  conversationId,
}: ThreadInputProps) {
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showCameraModal, setShowCameraModal] = useState(false)

  // Multiple Image attachments state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState<string | null>(null)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const draft = localStorage.getItem(`chat_draft_${conversationId}`)
      if (draft) setText(draft)
    } catch {
      // ignore
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
      // ignore
    }
  }

  // Handle Emoji Selection
  const handleSelectEmoji = (emoji: string) => {
    if (!textareaRef.current) {
      setText((prev) => prev + emoji)
      return
    }

    const input = textareaRef.current
    const start = input.selectionStart || 0
    const end = input.selectionEnd || 0
    const newText = text.substring(0, start) + emoji + text.substring(end)
    setText(newText)

    setTimeout(() => {
      input.focus()
      input.setSelectionRange(start + emoji.length, start + emoji.length)
    }, 10)
  }

  // Handle Multiple Photos Selection
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const validImages = files.filter((f) => f.type.startsWith('image/'))
    if (validImages.length === 0) {
      alert('Please select only image files.')
      return
    }

    // Cap at MAX_IMAGES
    const availableSlots = MAX_IMAGES - selectedFiles.length
    if (availableSlots <= 0) {
      alert(`You can attach up to ${MAX_IMAGES} photos at a time.`)
      return
    }

    const incoming = validImages.slice(0, availableSlots)
    const newPreviews = incoming.map((f) => URL.createObjectURL(f))

    setSelectedFiles((prev) => [...prev, ...incoming])
    setPreviewUrls((prev) => [...prev, ...newPreviews])

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveOneImage = (indexToRemove: number) => {
    if (previewUrls[indexToRemove]) {
      URL.revokeObjectURL(previewUrls[indexToRemove])
    }
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove))
    setPreviewUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove))
  }

  const handleClearAllImages = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url))
    setSelectedFiles([])
    setPreviewUrls([])
  }

  // Handle Photo Captured via Camera
  const handleCapturedPhoto = (file: File) => {
    const availableSlots = MAX_IMAGES - selectedFiles.length
    if (availableSlots <= 0) {
      alert(`You can attach up to ${MAX_IMAGES} photos at a time.`)
      return
    }
    const newPreview = URL.createObjectURL(file)
    setSelectedFiles((prev) => [...prev, file])
    setPreviewUrls((prev) => [...prev, newPreview])
  }

  // Handle Submission (Text and/or Multiple Photos)
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const trimmed = text.trim()

    // Needs either text or at least one image
    if ((!trimmed && selectedFiles.length === 0) || isSending || disabled) return

    setIsSending(true)

    try {
      let messagePayload = trimmed

      // If multiple images are attached, compress & upload in parallel
      if (selectedFiles.length > 0) {
        setUploadProgress(`Uploading ${selectedFiles.length} photo(s)...`)
        const supabase = createClient()
        const userFolder = currentUserId || 'guest'
        const baseUuid =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : Math.random().toString(36).substring(2, 15)

        // Parallel compression & upload
        const uploadPromises = selectedFiles.map(async (file, idx) => {
          let fileToUpload = file
          try {
            fileToUpload = await imageCompression(file, {
              maxSizeMB: 0.5,
              maxWidthOrHeight: 1200,
              useWebWorker: true,
              fileType: 'image/webp',
            })
          } catch (compErr) {
            console.warn('Compression fallback to original:', compErr)
          }

          const storagePath = `${userFolder}/chat/${conversationId}_${baseUuid}_${idx}.webp`
          const { error: uploadError } = await supabase.storage
            .from('ad-images')
            .upload(storagePath, fileToUpload, {
              contentType: 'image/webp',
              cacheControl: '31536000',
              upsert: true,
            })

          if (uploadError) {
            throw new Error(`Photo ${idx + 1} upload failed: ` + uploadError.message)
          }

          return storagePath
        })

        const uploadedPaths = await Promise.all(uploadPromises)

        // Store internal storage paths without https:// so SQL spam filters don't flag as links
        if (uploadedPaths.length === 1) {
          messagePayload = trimmed
            ? `[IMAGE]:${uploadedPaths[0]}\n${trimmed}`
            : `[IMAGE]:${uploadedPaths[0]}`
        } else {
          messagePayload = trimmed
            ? `[IMAGES]:${uploadedPaths.join(',')}\n${trimmed}`
            : `[IMAGES]:${uploadedPaths.join(',')}`
        }
      }

      const success = await onSend(messagePayload)

      if (success) {
        setText('')
        handleClearAllImages()
        setShowEmojiPicker(false)

        try {
          localStorage.removeItem(`chat_draft_${conversationId}`)
        } catch {
          // ignore
        }

        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'
        }
      }
    } catch (err: unknown) {
      console.error('Send error:', err)
      alert(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsSending(false)
      setUploadProgress(null)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [text])

  if (disabled) {
    return (
      <div className="p-3 bg-[#F7F6F2] dark:bg-[#211E38] rounded-2xl border border-[#E9E7EF] dark:border-[#2D2947] text-center text-xs text-[#77758A] dark:text-[#9B98B2]">
        {disabledReason || 'Chat is currently inactive.'}
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Live Camera Capture Modal */}
      <CameraCaptureModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onCapture={handleCapturedPhoto}
      />

      {/* Rich Categorized Emoji Picker Popover */}
      <ChatEmojiPicker
        isOpen={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        onSelectEmoji={handleSelectEmoji}
      />

      {/* Multiple Photos Preview Strip */}
      {previewUrls.length > 0 && (
        <div className="mb-2 p-3 bg-[#F7F6F2] dark:bg-[#211E38] rounded-3xl border border-[#E9E7EF] dark:border-[#2D2947] space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-[#17152B] dark:text-[#F7F6F2] flex items-center gap-1.5">
              <span>{previewUrls.length} photo(s) selected</span>
              <span className="text-[10px] text-[#77758A] dark:text-[#9B98B2] font-semibold">
                (Max {MAX_IMAGES})
              </span>
            </span>
            <button
              type="button"
              onClick={handleClearAllImages}
              className="text-[11px] text-red-500 hover:underline font-bold cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {previewUrls.map((url, idx) => (
              <div
                key={idx}
                className="relative w-16 h-16 rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shrink-0 group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Selected ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOneImage(idx)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  title="Remove photo"
                >
                  <X className="w-3 h-3" />
                </button>
                <span className="absolute bottom-1 left-1 px-1.5 py-0.2 bg-black/60 rounded-md text-[9px] font-bold text-white tabular-nums">
                  {idx + 1}
                </span>
              </div>
            ))}

            {/* Add More Button */}
            {selectedFiles.length < MAX_IMAGES && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-16 h-16 rounded-2xl border-2 border-dashed border-[#7657FF]/40 hover:border-[#7657FF] bg-[#7657FF]/5 hover:bg-[#7657FF]/10 text-[#7657FF] flex flex-col items-center justify-center gap-0.5 shrink-0 transition-colors cursor-pointer"
                title="Add more photos"
              >
                <Plus className="w-5 h-5" />
                <span className="text-[9px] font-bold">Add</span>
              </button>
            )}
          </div>

          {uploadProgress && (
            <div className="flex items-center gap-2 text-xs font-bold text-[#7657FF] dark:text-[#8A6FFF]">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{uploadProgress}</span>
            </div>
          )}
        </div>
      )}

      {/* Hidden File Input supporting multiple files */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
        className="hidden"
      />

      {/* Main Input Form */}
      <form
        onSubmit={handleSubmit}
        className="relative flex items-end gap-1.5 bg-[#FFFFFF] dark:bg-[#17152B] p-2 rounded-2xl border border-[#E9E7EF] dark:border-[#2D2947] shadow-lg"
      >
        {/* Attachment Buttons Toolbar */}
        <div className="flex items-center gap-1 pb-1">
          {/* Multiple Photos Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSending}
            className="w-8 h-8 rounded-xl text-[#77758A] dark:text-[#9B98B2] hover:text-[#7657FF] hover:bg-[#7657FF]/10 active:scale-95 flex items-center justify-center transition-all cursor-pointer relative"
            title="Attach multiple photos from your phone"
          >
            <ImageIcon className="w-4 h-4 stroke-[2]" />
            {selectedFiles.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#7657FF] text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                {selectedFiles.length}
              </span>
            )}
          </button>

          {/* Emoji Picker Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            disabled={isSending}
            className={`w-8 h-8 rounded-xl active:scale-95 flex items-center justify-center transition-all cursor-pointer ${
              showEmojiPicker
                ? 'text-[#7657FF] bg-[#7657FF]/10'
                : 'text-[#77758A] dark:text-[#9B98B2] hover:text-[#7657FF] hover:bg-[#7657FF]/10'
            }`}
            title="Insert emojis"
          >
            <Smile className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Capture Photo Button (Replaces Call) */}
          <button
            type="button"
            onClick={() => setShowCameraModal(true)}
            disabled={isSending || selectedFiles.length >= MAX_IMAGES}
            className="w-8 h-8 rounded-xl text-[#77758A] dark:text-[#9B98B2] hover:text-[#7657FF] hover:bg-[#7657FF]/10 active:scale-95 flex items-center justify-center transition-all cursor-pointer disabled:opacity-40"
            title="Capture photo from camera"
          >
            <Camera className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Make Offer Button */}
          {onOpenOfferModal && (
            <button
              type="button"
              onClick={onOpenOfferModal}
              disabled={isSending}
              className="h-8 px-2.5 rounded-xl bg-[#7657FF]/10 hover:bg-[#7657FF]/20 active:scale-95 text-[#7657FF] dark:text-[#8A6FFF] text-xs font-bold flex items-center gap-1 transition-all shrink-0 cursor-pointer"
              title="Make or counter an offer"
            >
              <Tag className="w-3.5 h-3.5 stroke-[2.2]" />
              <span className="hidden sm:inline">Offer</span>
            </button>
          )}
        </div>

        {/* Message Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            previewUrls.length > 0
              ? `Add a caption for ${previewUrls.length} photo(s)...`
              : 'Type a message... (Press Enter to send)'
          }
          maxLength={1000}
          className="flex-1 max-h-28 p-2 text-xs sm:text-sm bg-transparent text-[#17152B] dark:text-[#F7F6F2] placeholder:text-[#77758A] resize-none outline-none leading-relaxed"
        />

        {/* Send Action */}
        <div className="flex items-center gap-2 pb-1 pr-1">
          <button
            type="submit"
            disabled={(!text.trim() && selectedFiles.length === 0) || isSending}
            className="w-9 h-9 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 shadow-sm active:scale-95"
            title="Send message"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4 stroke-[2]" />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
