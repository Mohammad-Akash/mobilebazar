'use client'

import { useState, useRef, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import imageCompression from 'browser-image-compression'
import { FullAdFormData } from '@/src/lib/validations/ad'
import { createClient } from '@/src/lib/supabase/client'
import { AD_LIMITS } from '@/src/lib/constants/ad-options'
import {
  Camera,
  UploadCloud,
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Star,
} from 'lucide-react'

interface Step4Props {
  form: UseFormReturn<FullAdFormData>
  userId: string
}

interface PhotoItem {
  id: string
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

  const draftIdRef = useRef<string>('')
  if (!draftIdRef.current) {
    draftIdRef.current =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 15)
  }

  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [generalError, setGeneralError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const uploadedPaths = photos
      .filter((p) => p.status === 'done' && p.storagePath)
      .map((p) => p.storagePath as string)

    setValue('images', uploadedPaths, { shouldValidate: true })
  }, [photos, setValue])

  const processAndUploadPhoto = async (item: PhotoItem): Promise<void> => {
    if (!item.file || !userId) return

    const supabase = createClient()

    try {
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

      setPhotos((prev) =>
        prev.map((p) =>
          p.id === item.id ? { ...p, status: 'uploading', progress: 60 } : p
        )
      )

      const fileUuid =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).substring(2, 15)
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

      setPhotos((prev) =>
        prev.map((p) =>
          p.id === item.id
            ? { ...p, status: 'done', progress: 100, storagePath }
            : p
        )
      )
    } catch (err: unknown) {
      console.error('Photo upload failed:', err)
      const msg = err instanceof Error ? err.message : 'Upload failed'
      setPhotos((prev) =>
        prev.map((p) =>
          p.id === item.id
            ? { ...p, status: 'error', progress: 0, errorMessage: msg }
            : p
        )
      )
    }
  }

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralError(null)
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    const remainingSlots = AD_LIMITS.MAX_PHOTOS - photos.length
    if (remainingSlots <= 0) {
      setGeneralError(`You can upload up to ${AD_LIMITS.MAX_PHOTOS} photos.`)
      return
    }

    const validFiles: File[] = []
    for (const file of files.slice(0, remainingSlots)) {
      if (file.size > 15 * 1024 * 1024) {
        setGeneralError(`"${file.name}" exceeds 15 MB. Please select a smaller file.`)
        continue
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setGeneralError(`"${file.name}" has an invalid format. Only JPG, PNG, and WebP are supported.`)
        continue
      }
      validFiles.push(file)
    }

    if (!validFiles.length) {
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    const newItems: PhotoItem[] = validFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      previewUrl: URL.createObjectURL(file),
      status: 'idle',
      progress: 0,
    }))

    setPhotos((prev) => [...prev, ...newItems])
    if (fileInputRef.current) fileInputRef.current.value = ''

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

  const handleRemovePhoto = async (index: number) => {
    const item = photos[index]
    if (!item) return

    try {
      URL.revokeObjectURL(item.previewUrl)
    } catch {
      // ignore
    }

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

  const handleMakeCover = (index: number) => {
    if (index === 0) return
    setPhotos((prev) => {
      const copy = [...prev]
      const [item] = copy.splice(index, 1)
      copy.unshift(item)
      return copy
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Camera className="w-5 h-5 text-blue-600" />
          <span>Upload Phone Photos</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Upload 1 to 8 clear photos of your phone (front, back, edges, and screen on).
        </p>
      </div>

      {generalError && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{generalError}</span>
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
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 rounded-3xl p-8 text-center bg-slate-50 dark:bg-slate-800/40 cursor-pointer block transition-colors group"
          >
            <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-7 h-7" />
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Choose Phone Photos (Camera or Gallery)
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Supports JPG, PNG, WebP (up to 15 MB). {AD_LIMITS.MAX_PHOTOS - photos.length} slots remaining.
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
                className={`relative rounded-2xl overflow-hidden border bg-slate-100 dark:bg-slate-800 aspect-square flex flex-col justify-between ${
                  isCover
                    ? 'border-blue-600 ring-2 ring-blue-500/40'
                    : 'border-slate-200 dark:border-slate-700'
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
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold shadow-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Cover Photo</span>
                  </div>
                )}

                {/* Status Overlay */}
                {item.status !== 'done' && (
                  <div className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center p-2 text-center text-white backdrop-blur-xs">
                    {item.status === 'compressing' && (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mb-1 text-blue-400" />
                        <span className="text-[11px] font-bold">Optimizing...</span>
                      </>
                    )}
                    {item.status === 'uploading' && (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mb-1 text-blue-400" />
                        <span className="text-[11px] font-bold">Uploading {item.progress}%</span>
                      </>
                    )}
                    {item.status === 'error' && (
                      <>
                        <AlertCircle className="w-5 h-5 text-red-400 mb-1" />
                        <span className="text-[10px] text-red-200 line-clamp-2">
                          {item.errorMessage || 'Failed'}
                        </span>
                        <button
                          type="button"
                          onClick={() => processAndUploadPhoto(item)}
                          className="mt-1 px-2 py-0.5 rounded bg-white text-slate-900 text-[10px] font-bold"
                        >
                          Retry
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Bottom Bar */}
                <div className="absolute bottom-0 inset-x-0 p-1.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleMoveLeft(index)}
                        title="Move left"
                        className="w-6 h-6 rounded bg-white/20 hover:bg-white/40 flex items-center justify-center active:scale-90"
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                    )}
                    {index < photos.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleMoveRight(index)}
                        title="Move right"
                        className="w-6 h-6 rounded bg-white/20 hover:bg-white/40 flex items-center justify-center active:scale-90"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                    {!isCover && item.status === 'done' && (
                      <button
                        type="button"
                        onClick={() => handleMakeCover(index)}
                        title="Set as cover"
                        className="px-1.5 h-6 rounded bg-blue-600/80 hover:bg-blue-600 text-[10px] font-bold active:scale-90"
                      >
                        Cover
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    title="Delete photo"
                    className="w-6 h-6 rounded bg-red-600/80 hover:bg-red-600 flex items-center justify-center font-bold active:scale-90"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {errors.images && (
        <p className="text-xs text-red-600 mt-1 font-semibold">{errors.images.message}</p>
      )}

      {formImages.length > 0 && (
        <div className="p-3.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-2xl text-xs text-blue-800 dark:text-blue-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>{formImages.length} photo(s) attached</span>
          </span>
          <span className="text-[11px] text-slate-500">First photo is your listing cover</span>
        </div>
      )}
    </div>
  )
}
