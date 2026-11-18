'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Camera, X, RefreshCw, Check, AlertCircle, Image as ImageIcon } from 'lucide-react'

interface CameraCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  onCapture: (file: File) => void
}

export function CameraCaptureModal({
  isOpen,
  onClose,
  onCapture,
}: CameraCaptureModalProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment')
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fallbackInputRef = useRef<HTMLInputElement>(null)

  // Stop camera tracks cleanly
  const stopTracks = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }, [stream])

  // Check available camera devices
  useEffect(() => {
    if (!isOpen) return

    async function checkDevices() {
      try {
        if (navigator?.mediaDevices?.enumerateDevices) {
          const devices = await navigator.mediaDevices.enumerateDevices()
          const videoInputs = devices.filter((d) => d.kind === 'videoinput')
          setHasMultipleCameras(videoInputs.length > 1)
        }
      } catch {
        // ignore
      }
    }
    checkDevices()
  }, [isOpen])

  // Start video stream
  const startCamera = useCallback(async (mode: 'environment' | 'user') => {
    setIsInitializing(true)
    setCameraError(null)

    // Stop existing stream first
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }

    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error('Camera stream is not supported in this browser.')
      }

      let newStream: MediaStream
      try {
        newStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: mode,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        })
      } catch {
        // Fallback to basic video constraint if ideal constraints fail
        newStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })
      }

      setStream(newStream)
      if (videoRef.current) {
        videoRef.current.srcObject = newStream
        await videoRef.current.play().catch(() => {})
      }
    } catch (err: unknown) {
      console.warn('getUserMedia error:', err)
      const errName = err instanceof Error ? err.name : ''
      if (errName === 'NotAllowedError' || errName === 'PermissionDeniedError') {
        setCameraError('Camera permission denied. Please allow camera access in browser settings.')
      } else {
        setCameraError('Camera could not be started. You can use your device camera directly below.')
      }
    } finally {
      setIsInitializing(false)
    }
  }, [stream])

  // Initialize or teardown when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCapturedBlob(null)
      setPreviewUrl(null)
      startCamera(facingMode)
    } else {
      stopTracks()
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
    }
    return () => {
      stopTracks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  // Switch between front & rear cameras
  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment'
    setFacingMode(nextMode)
    startCamera(nextMode)
  }

  // Snap photo from live video feed
  const handleSnap = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current

    canvas.width = video.videoWidth || 1280
    canvas.height = video.videoHeight || 720

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // If using user/front camera, flip horizontally for natural mirror look
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    canvas.toBlob(
      (blob) => {
        if (!blob) return
        setCapturedBlob(blob)
        const url = URL.createObjectURL(blob)
        setPreviewUrl(url)
        stopTracks()
      },
      'image/jpeg',
      0.92
    )
  }

  // Retake photo
  const handleRetake = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    setCapturedBlob(null)
    startCamera(facingMode)
  }

  // Confirm photo and pass File back
  const handleConfirm = () => {
    if (!capturedBlob) return

    const file = new File([capturedBlob], `camera_${Date.now()}.jpg`, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    })

    onCapture(file)
    handleClose()
  }

  // Fallback file input change
  const handleFallbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onCapture(file)
      handleClose()
    }
  }

  const handleClose = () => {
    stopTracks()
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    setCapturedBlob(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Hidden canvas for taking snapshot */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Hidden native camera capture input as fallback */}
      <input
        ref={fallbackInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFallbackChange}
        className="hidden"
      />

      <div className="relative w-full max-w-lg bg-[#17152B] border border-[#2D2947] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2D2947] bg-[#17152B]/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#7657FF]/20 text-[#8A6FFF] flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Capture Photo</h3>
              <p className="text-[11px] text-[#9B98B2]">Take a photo and attach it to chat</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-xl text-[#9B98B2] hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder / Captured Preview Area */}
        <div className="relative flex-1 min-h-[320px] sm:min-h-[380px] bg-black flex items-center justify-center overflow-hidden">
          {previewUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={previewUrl}
              alt="Captured"
              className="w-full h-full object-contain max-h-[60vh]"
            />
          ) : cameraError ? (
            <div className="p-6 text-center space-y-3 max-w-xs">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <p className="text-xs text-zinc-300 font-medium">{cameraError}</p>
              <button
                type="button"
                onClick={() => fallbackInputRef.current?.click()}
                className="w-full py-2.5 px-4 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Open Device Camera</span>
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-contain max-h-[60vh] ${
                  facingMode === 'user' ? 'scale-x-[-1]' : ''
                }`}
              />

              {/* Viewfinder corner guidelines */}
              <div className="absolute inset-8 pointer-events-none border-2 border-dashed border-white/20 rounded-2xl" />

              {/* Camera Switch Button (if multiple cameras or on phone) */}
              {hasMultipleCameras && (
                <button
                  type="button"
                  onClick={toggleFacingMode}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
                  title="Switch Camera (Front/Rear)"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Bottom Controls Bar */}
        <div className="p-4 bg-[#17152B] border-t border-[#2D2947] flex items-center justify-between gap-3">
          {previewUrl ? (
            /* Review Actions */
            <div className="w-full flex items-center gap-3">
              <button
                type="button"
                onClick={handleRetake}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Attach Photo</span>
              </button>
            </div>
          ) : !cameraError ? (
            /* Live Capture Actions */
            <div className="w-full flex items-center justify-between">
              {/* Native Camera Fallback */}
              <button
                type="button"
                onClick={() => fallbackInputRef.current?.click()}
                className="text-[11px] font-semibold text-[#9B98B2] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Use phone native camera app"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Native App</span>
              </button>

              {/* Center Shutter Button */}
              <button
                type="button"
                onClick={handleSnap}
                disabled={isInitializing}
                className="w-16 h-16 rounded-full border-4 border-white/80 p-1 flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg"
                title="Take Photo"
              >
                <span className="w-full h-full rounded-full bg-white hover:bg-zinc-100 transition-colors shadow-inner flex items-center justify-center">
                  <Camera className="w-6 h-6 text-[#17152B]" />
                </span>
              </button>

              {/* Placeholder to balance layout */}
              <div className="w-16" />
            </div>
          ) : (
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="py-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
