'use client'

import { useState, useRef, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import imageCompression from 'browser-image-compression'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { createClient } from '@/src/lib/supabase/client'
import { AD_LIMITS } from '@/src/lib/constants/ad-options'

interface Step4Props {
  form: UseFormReturn<FullAdFormData>
  userId: string
}

interface PhotoItem {
  id: string // unique local ID for keys
  file?: File
  previewUrl: string
  storagePath?: string
  status: 'idle' | 'compressing' | 'uploading' | 'done' | 'error'
  progress: number
  errorMessage?: string
}

export function Step4Photos({ form, userId }: Step4Props) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form

  const formImages = watch('images') || []

  // Generate a draft UUID once for this wizard session
  const draftIdRef = useRef<string>('')
  if (!draftIdRef.current) {
    draftIdRef.current = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)
  }

  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [generalError, setGeneralError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sync form 'images' field whenever photos change
  useEffect(() => {
    const uploadedPaths = photos
      .filter((p) => p.status === 'done' && p.storagePath)
      .map((p) => p.storagePath as string)

    setValue('images', uploadedPaths, { shouldValidate: true })
  }, [photos, setValue])

  // Process & Upload a single photo item
  const processAndUploadPhoto = async (item: PhotoItem): Promise<void> => {
    if (!item.file || !userId) return

    const supabase = createClient()

    try {
      // 1. Compression phase: generate 3 variants (1600px base, 800px _md, 400px _sm)
      setPhotos((prev) =>
        prev.map((p) =>
          p.id === item.id
            ? { ...p, status: 'compressing', progress: 20, errorMessage: undefined }
            : p
        )
      )

      const basePromise = imageCompression(item.file, {
        maxSizeMB: 0.35,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: 'image/webp',
      })

      const mdPromise = imageCompression(item.file, {
        maxSizeMB: 0.15,
        maxWidthOrHeight: 800,
        useWebWorker: true,
        fileType: 'image/webp',
      })

      const smPromise = imageCompression(item.file, {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 400,
        useWebWorker: true,
        fileType: 'image/webp',
      })

      const [baseFile, mdFile, smFile] = await Promise.all([
        basePromise,
        mdPromise,
        smPromise,
      ])

      // 2. Uploading phase: upload all 3 variants with 1-year immutable cacheControl
      setPhotos((prev) =>
        prev.map((p) =>
          p.id === item.id ? { ...p, status: 'uploading', progress: 60 } : p
        )
      )

      const fileUuid = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)
      const storagePath = `${userId}/${draftIdRef.current}/${fileUuid}.webp`
      const mdPath = `${userId}/${draftIdRef.current}/${fileUuid}_md.webp`
      const smPath = `${userId}/${draftIdRef.current}/${fileUuid}_sm.webp`

      const uploadOptions = {
        contentType: 'image/webp',
        cacheControl: '31536000',
        upsert: false,
      }

      const [resBase, resMd, resSm] = await Promise.all([
        supabase.storage.from('ad-images').upload(storagePath, baseFile, uploadOptions),
        supabase.storage.from('ad-images').upload(mdPath, mdFile, uploadOptions),
        supabase.storage.from('ad-images').upload(smPath, smFile, uploadOptions),
      ])

      if (resBase.error) throw new Error(resBase.error.message || 'Base image upload failed')
      if (resMd.error) console.warn('Warning: _md variant upload failed:', resMd.error.message)
      if (resSm.error) console.warn('Warning: _sm variant upload failed:', resSm.error.message)

      // 3. Done
      setPhotos((prev) =>
        prev.map((p) =>
          p.id === item.id
            ? { ...p, status: 'done', progress: 100, storagePath }
            : p
        )
      )
    } catch (err: unknown) {
      console.error('Photo upload failed:', err)
      const msg = err instanceof Error ? err.message : 'Upload nakam raha'
      setPhotos((prev) =>
        prev.map((p) =>
          p.id === item.id
            ? { ...p, status: 'error', progress: 0, errorMessage: msg }
            : p
        )
      )
    }
  }

  // Handle file selection
  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralError(null)
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    const remainingSlots = AD_LIMITS.MAX_PHOTOS - photos.length
    if (remainingSlots <= 0) {
      setGeneralError(`Aap ziyada se ziyada ${AD_LIMITS.MAX_PHOTOS} tasweerein shamil kar sakte hain.`)
      return
    }

    const validFiles: File[] = []
    for (const file of files.slice(0, remainingSlots)) {
      // Validate file size (15 MB max before compression)
      if (file.size > 15 * 1024 * 1024) {
        setGeneralError(`"${file.name}" ka size 15 MB se ziyada hai. Baraye meharbani choti file chunein.`)
        continue
      }
      // Validate MIME type
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setGeneralError(`"${file.name}" tasweer format theek nahi hai. Sirf JPG, PNG, aur WebP chalengi.`)
        continue
      }
      validFiles.push(file)
    }

    if (!validFiles.length) {
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    // Create PhotoItem entries
    const newItems: PhotoItem[] = validFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      previewUrl: URL.createObjectURL(file),
      status: 'idle',
      progress: 0,
    }))

    setPhotos((prev) => [...prev, ...newItems])
    if (fileInputRef.current) fileInputRef.current.value = ''

    // Upload with concurrency limit (up to 3 parallel uploads)
    const queue = [...newItems]
    const activeWorkers: Promise<void>[] = []
    const concurrency = 3

    while (queue.length > 0) {
      const item = queue.shift()
      if (!item) break
      const p = processAndUploadPhoto(item).then(() => {
        activeWorkers.splice(activeWorkers.indexOf(p), 1)
      })
      activeWorkers.push(p)
      if (activeWorkers.length >= concurrency) {
        await Promise.race(activeWorkers)
      }
    }
    await Promise.all(activeWorkers)
  }

  // Remove photo (and delete from storage if already uploaded)
  const handleRemovePhoto = async (index: number) => {
    const item = photos[index]
    if (!item) return

    // Revoke object URL
    try {
      URL.revokeObjectURL(item.previewUrl)
    } catch {
      // ignore
    }

    // If uploaded, delete base + variants from bucket in background
    if (item.storagePath) {
      const supabase = createClient()
      const p = item.storagePath
      const allVariants = [
        p,
        p.endsWith('.webp') ? p.replace(/\.webp$/, '_md.webp') : `${p}_md`,
        p.endsWith('.webp') ? p.replace(/\.webp$/, '_sm.webp') : `${p}_sm`,
      ]
      supabase.storage
        .from('ad-images')
        .remove(allVariants)
        .then(({ error }) => {
          if (error) console.error('Failed to remove image variants from storage:', error)
        })
    }

    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  // Move photo left
  const handleMoveLeft = (index: number) => {
    if (index === 0) return
    setPhotos((prev) => {
      const copy = [...prev]
      const temp = copy[index - 1]
      copy[index - 1] = copy[index]
      copy[index] = temp
      return copy
    })
  }

  // Move photo right
  const handleMoveRight = (index: number) => {
    if (index === photos.length - 1) return
    setPhotos((prev) => {
      const copy = [...prev]
      const temp = copy[index + 1]
      copy[index + 1] = copy[index]
      copy[index] = temp
      return copy
    })
  }

  // Make Cover (move to index 0)
  const handleMakeCover = (index: number) => {
    if (index === 0) return
    setPhotos((prev) => {
      const copy = [...prev]
      const [item] = copy.splice(index, 1)
      copy.unshift(item)
      return copy
    })
  }

  // Retry upload for a failed photo
  const handleRetry = (item: PhotoItem) => {
    processAndUploadPhoto(item)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Phone ki Tasweerein (Photos)
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          1 se 8 tasweerein shamil karein. Tasweerein khud ba khud compress ho kar fast load hongi.
        </p>
      </div>

      {generalError && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-sm text-red-700 dark:text-red-300">
          {generalError}
        </div>
      )}

      {/* Upload Zone */}
      {photos.length < AD_LIMITS.MAX_PHOTOS && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFilesSelected}
            className="hidden"
            id="photo-upload-input"
          />
          <label
            htmlFor="photo-upload-input"
            className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl p-6 sm:p-8 text-center bg-zinc-50 dark:bg-zinc-800/40 cursor-pointer block transition-colors"
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-2xl text-emerald-600 mb-2">
              📸
            </div>
            <p className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200">
              Tasweerein chunein (Camera ya Gallery)
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              JPG, PNG, WebP (Har tasweer 15 MB se kam). {AD_LIMITS.MAX_PHOTOS - photos.length} baqi hain.
            </p>
          </label>
        </div>
      )}

      {/* Photos Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {photos.map((item, index) => {
            const isCover = index === 0

            return (
              <div
                key={item.id}
                className={`relative rounded-xl overflow-hidden border bg-zinc-100 dark:bg-zinc-800 aspect-square flex flex-col justify-between ${
                  isCover
                    ? 'border-emerald-500 ring-2 ring-emerald-500/50'
                    : 'border-zinc-200 dark:border-zinc-700'
                }`}
              >
                {/* Image Preview */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.previewUrl}
                  alt={`Upload preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Cover Badge */}
                {isCover && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[11px] font-bold shadow-md">
                    Cover Photo ★
                  </div>
                )}

                {/* Upload Status Overlay */}
                {item.status !== 'done' && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-2 text-center text-white">
                    {item.status === 'compressing' && (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mb-1" />
                        <span className="text-[11px] font-medium">Compressing...</span>
                      </>
                    )}
                    {item.status === 'uploading' && (
                      <>
                        <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mb-1" />
                        <span className="text-[11px] font-medium">Uploading {item.progress}%</span>
                      </>
                    )}
                    {item.status === 'error' && (
                      <>
                        <span className="text-base text-red-400">⚠️</span>
                        <span className="text-[10px] text-red-200 mt-0.5 leading-tight line-clamp-2">
                          {item.errorMessage || 'Nakam raha'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRetry(item)}
                          className="mt-1.5 px-2 py-0.5 rounded bg-white text-zinc-900 text-[10px] font-bold"
                        >
                          Retry
                        </button>
                      </>
                    )}
                    {item.status === 'idle' && (
                      <span className="text-[11px] font-medium">Tayar...</span>
                    )}
                  </div>
                )}

                {/* Action Toolbar on Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-1.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleMoveLeft(index)}
                        title="Peeche karein"
                        className="w-6 h-6 rounded bg-white/20 hover:bg-white/40 flex items-center justify-center"
                      >
                        ←
                      </button>
                    )}
                    {index < photos.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleMoveRight(index)}
                        title="Aage karein"
                        className="w-6 h-6 rounded bg-white/20 hover:bg-white/40 flex items-center justify-center"
                      >
                        →
                      </button>
                    )}
                    {!isCover && item.status === 'done' && (
                      <button
                        type="button"
                        onClick={() => handleMakeCover(index)}
                        title="Cover banayein"
                        className="px-1.5 h-6 rounded bg-emerald-600/80 hover:bg-emerald-600 text-[10px] font-semibold"
                      >
                        Cover
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    title="Delete photo"
                    className="w-6 h-6 rounded bg-red-600/80 hover:bg-red-600 flex items-center justify-center font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {errors.images && (
        <p className="text-sm text-red-600 mt-1">{errors.images.message}</p>
      )}

      {formImages.length > 0 && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
          <span>✓ {formImages.length} photo(s) tayar hain</span>
          <span className="text-[11px] text-zinc-500">Pehli photo cover ke taur par dikhayi jayegi</span>
        </div>
      )}
    </div>
  )
}
