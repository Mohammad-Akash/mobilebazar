'use client'

import { useState, useEffect, useRef, useTransition, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { fullAdSchema, type FullAdFormData } from '@/src/lib/validations/ad'
import { BrandOption, CityOption, ModelOption } from '@/src/lib/data/reference'
import { createAd } from '@/src/lib/actions/post-ad'
import { Step1Phone } from './steps/Step1Phone'
import { Step2Specs } from './steps/Step2Specs'
import { Step3Price } from './steps/Step3Price'
import { Step4Photos } from './steps/Step4Photos'
import { Step5Location } from './steps/Step5Location'
import { Step6Review } from './steps/Step6Review'
import {
  Smartphone,
  Cpu,
  BadgeDollarSign,
  Camera,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Loader2,
  BookmarkCheck,
  Save,
  Trash2,
  Clock,
  RotateCcw,
  X,
} from 'lucide-react'

interface PostAdWizardProps {
  brands: BrandOption[]
  cities: CityOption[]
  userId: string
  onSubmitAction?: (data: FullAdFormData) => Promise<{ success?: boolean; adId?: string; error?: string }>
}

interface SavedDraft {
  formData: FullAdFormData
  currentStep: number
  selectedModel: ModelOption | null
  savedAt: number
}

const STEP_TITLES = [
  { title: 'Brand & Model', icon: Smartphone },
  { title: 'Specifications', icon: Cpu },
  { title: 'Price & Notes', icon: BadgeDollarSign },
  { title: 'Photos', icon: Camera },
  { title: 'Location', icon: MapPin },
  { title: 'Review & Publish', icon: CheckCircle2 },
] as const

export function PostAdWizard({ brands, cities, userId, onSubmitAction }: PostAdWizardProps) {
  const router = useRouter()
  const draftKey = `mb_ad_draft_${userId || 'user'}`

  const [currentStep, setCurrentStep] = useState(1)
  const [returnToReview, setReturnToReview] = useState(false)
  const [selectedModel, setSelectedModel] = useState<ModelOption | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false)
  const isSubmittedRef = useRef(false)

  // Draft Management State
  const [savedDraft, setSavedDraft] = useState<SavedDraft | null>(null)
  const [showDraftBanner, setShowDraftBanner] = useState(false)
  const [draftToast, setDraftToast] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const defaultFormValues: FullAdFormData = {
    brand_id: '',
    model_id: '',
    condition: 'used',
    pta_status: 'pta_approved',
    storage_gb: 128,
    ram_gb: null,
    color: '',
    battery_health: null,
    has_box: false,
    has_accessories: false,
    warranty_type: 'none',
    warranty_months_remaining: 0,
    price: 0,
    is_negotiable: true,
    title: '',
    description: '',
    imei: '',
    images: [],
    city_id: cities.length > 0 ? cities[0].id : '',
    area_id: null,
    contact_preference: 'both',
  }

  const form = useForm<FullAdFormData>({
    resolver: zodResolver(fullAdSchema) as unknown as Resolver<FullAdFormData>,
    mode: 'onTouched',
    defaultValues: defaultFormValues,
  })

  const {
    trigger,
    watch,
    reset,
    getValues,
    formState: { isDirty },
  } = form

  // 1. Check for existing draft on initial mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey)
      if (raw) {
        const parsed = JSON.parse(raw) as SavedDraft
        // Validate draft age (keep for 14 days max)
        const isRecent = parsed.savedAt && Date.now() - parsed.savedAt < 14 * 24 * 60 * 60 * 1000
        const hasData = parsed.formData?.brand_id || parsed.formData?.title || parsed.formData?.price > 0

        if (isRecent && hasData) {
          setSavedDraft(parsed)
          setShowDraftBanner(true)
        }
      }
    } catch {
      // LocalStorage access restricted or unavailable
    }
  }, [draftKey])

  // 2. Debounced Auto-Save Draft on Form Value / Step Changes
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const persistDraft = useCallback(
    (stepOverride?: number) => {
      try {
        if (isSubmittedRef.current || isSubmittedSuccessfully) return

        const currentVals = getValues()
        const hasAnyContent =
          currentVals.brand_id || currentVals.model_id || currentVals.title || currentVals.price > 0

        if (!hasAnyContent) return

        const draftData: SavedDraft = {
          formData: currentVals,
          currentStep: stepOverride || currentStep,
          selectedModel,
          savedAt: Date.now(),
        }

        localStorage.setItem(draftKey, JSON.stringify(draftData))
      } catch {}
    },
    [draftKey, getValues, currentStep, selectedModel, isSubmittedSuccessfully]
  )

  useEffect(() => {
    const subscription = watch(() => {
      if (isSubmittedRef.current || isSubmittedSuccessfully) return
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
      saveTimeoutRef.current = setTimeout(() => {
        persistDraft()
      }, 800)
    })

    return () => {
      subscription.unsubscribe()
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    }
  }, [watch, persistDraft, isSubmittedSuccessfully])

  // Manual "Save Draft" trigger
  const handleManualSaveDraft = () => {
    persistDraft()
    setDraftToast('Draft saved successfully! You can resume anytime.')
    setTimeout(() => setDraftToast(null), 3500)
  }

  // Restore Draft Action
  const handleResumeDraft = () => {
    if (!savedDraft) return
    reset(savedDraft.formData)
    if (savedDraft.selectedModel) {
      setSelectedModel(savedDraft.selectedModel)
    }
    if (savedDraft.currentStep && savedDraft.currentStep >= 1 && savedDraft.currentStep <= 6) {
      setCurrentStep(savedDraft.currentStep)
    }
    setShowDraftBanner(false)
    setDraftToast('Draft restored! Continuing where you left off.')
    setTimeout(() => setDraftToast(null), 3500)
  }

  // Permanent Delete Draft Action
  const handleDeleteDraft = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
      saveTimeoutRef.current = null
    }

    try {
      localStorage.removeItem(draftKey)
      localStorage.removeItem('mb_ad_draft')
      localStorage.removeItem('mb_ad_draft_user')
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i)
        if (k && k.startsWith('mb_ad_draft')) {
          localStorage.removeItem(k)
        }
      }
    } catch {}

    reset(defaultFormValues)
    setSelectedModel(null)
    setCurrentStep(1)
    setReturnToReview(false)
    setSavedDraft(null)
    setShowDraftBanner(false)
    setShowDeleteModal(false)
    setServerError(null)

    setDraftToast('Draft permanently deleted. Form has been reset.')
    setTimeout(() => setDraftToast(null), 3500)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Unsaved changes warning beforeunload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSubmittedRef.current && !isSubmittedSuccessfully) {
        persistDraft()
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isDirty, isSubmittedSuccessfully, persistDraft])

  // Navigate to step with optional return-to-review flag
  const goToStep = (step: number, fromReview = false) => {
    setServerError(null)
    setCurrentStep(step)
    setReturnToReview(fromReview)
    persistDraft(step)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Validate only the current step fields
  const validateCurrentStep = async (): Promise<boolean> => {
    setServerError(null)
    if (currentStep === 1) {
      return await trigger(['brand_id', 'model_id'])
    } else if (currentStep === 2) {
      return await trigger([
        'condition',
        'pta_status',
        'storage_gb',
        'ram_gb',
        'color',
        'battery_health',
        'has_box',
        'has_accessories',
        'warranty_type',
        'warranty_months_remaining',
      ])
    } else if (currentStep === 3) {
      return await trigger(['price', 'is_negotiable', 'title', 'description', 'imei'])
    } else if (currentStep === 4) {
      return await trigger(['images'])
    } else if (currentStep === 5) {
      return await trigger(['city_id', 'area_id', 'contact_preference'])
    }
    return true
  }

  // Next / Save & Continue
  const handleNext = async () => {
    const valid = await validateCurrentStep()
    if (valid) {
      goToStep(currentStep + 1, returnToReview && currentStep + 1 < 6)
    }
  }

  // Save changes & jump straight back to Step 6 Review
  const handleSaveAndReturnToReview = async () => {
    const valid = await validateCurrentStep()
    if (valid) {
      persistDraft(6)
      setCurrentStep(6)
      setReturnToReview(false)
      setDraftToast('Changes saved! Returned to Review.')
      setTimeout(() => setDraftToast(null), 3000)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Direct step jump from desktop stepper pills
  const handleJumpToStep = async (targetStep: number) => {
    if (targetStep === currentStep) return
    if (targetStep > currentStep) {
      const valid = await validateCurrentStep()
      if (!valid) return
    }
    const fromReview = currentStep === 6 || returnToReview
    goToStep(targetStep, fromReview && targetStep < 6)
  }

  const handleBack = () => {
    setServerError(null)
    if (returnToReview) {
      // If editing from review, back takes user straight to review
      goToStep(6, false)
    } else if (currentStep > 1) {
      goToStep(currentStep - 1, false)
    }
  }

  // Final Form Submit handler
  const handleFormSubmit = form.handleSubmit(async (data) => {
    setServerError(null)
    startTransition(async () => {
      const submitFn = onSubmitAction || createAd
      const res = await submitFn(data)

      if (res?.error) {
        setServerError(res.error)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (res?.success && res.adId) {
        isSubmittedRef.current = true
        setIsSubmittedSuccessfully(true)

        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current)
          saveTimeoutRef.current = null
        }

        // Clean all draft storage upon successful publish
        try {
          localStorage.removeItem(draftKey)
          localStorage.removeItem('mb_ad_draft')
          localStorage.removeItem('mb_ad_draft_user')
          for (let i = localStorage.length - 1; i >= 0; i--) {
            const k = localStorage.key(i)
            if (k && k.startsWith('mb_ad_draft')) {
              localStorage.removeItem(k)
            }
          }
        } catch {}

        router.push(`/post-ad/success?ad=${res.adId}`)
      }
    })
  })

  const progressPercentage = Math.round((currentStep / STEP_TITLES.length) * 100)

  // Format draft time helper
  const formatTimeAgo = (timestamp: number) => {
    const mins = Math.round((Date.now() - timestamp) / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hours = Math.round(mins / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.round(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-32 sm:pb-16">
      {/* Toast Notification */}
      {draftToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#17152B] dark:bg-[#211E38] text-white px-5 py-2.5 rounded-2xl shadow-xl border border-[#7657FF]/40 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <BookmarkCheck className="w-4 h-4 text-[#7657FF]" />
          <span>{draftToast}</span>
        </div>
      )}

      {/* Delete Draft Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1E1B38] border border-slate-200 dark:border-[#2D2947] rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-[#F7F6F2]">
                    Delete Ad Draft?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ڈرافٹ ڈیلیٹ کریں؟
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#252147] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#17152B] p-3.5 rounded-2xl border border-slate-200 dark:border-[#2D2947]">
              Are you sure you want to delete this draft? All entered phone details, photos, and specs will be completely reset.
              <br />
              <span className="text-[11px] text-slate-400 mt-1 block">
                کیا آپ واقعی یہ ڈرافٹ ختم کرنا چاہتے ہیں؟ تمام داخل کردہ معلومات صاف ہو جائیں گی۔
              </span>
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#2D2947] text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#252147] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteDraft}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                <span>Yes, Delete Draft</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Headline */}
      <div className="text-center mb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7657FF]/10 border border-[#7657FF]/30 text-[#7657FF] dark:text-[#9B82FF] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Post Your Smartphone</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-[#F7F6F2] tracking-tight">
          Sell Your Mobile in Pakistan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Reach thousands of genuine verified smartphone buyers with zero listing fees.
        </p>
      </div>

      {/* Draft Restoration Banner */}
      {showDraftBanner && savedDraft && (
        <div className="mb-6 p-4 rounded-3xl bg-[#7657FF]/10 dark:bg-[#7657FF]/15 border border-[#7657FF]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs animate-in fade-in-50 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7657FF] text-white flex items-center justify-center shrink-0 shadow-xs">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-[#F7F6F2]">
                Unsaved Draft Found
              </p>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3 h-3 text-[#7657FF]" />
                <span>Saved {formatTimeAgo(savedDraft.savedAt)} (Step {savedDraft.currentStep} of 6)</span>
                {savedDraft.selectedModel?.name && (
                  <strong className="text-slate-700 dark:text-slate-200 font-bold">
                    • {savedDraft.selectedModel.name}
                  </strong>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="px-3.5 py-2 text-xs font-semibold text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Draft</span>
            </button>
            <button
              type="button"
              onClick={handleResumeDraft}
              className="px-4 py-2 text-xs font-bold text-white bg-[#7657FF] hover:bg-[#6343ED] rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>Resume Draft</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Progress Card */}
      <div className="mb-6 bg-white dark:bg-[#1E1B38] border border-slate-200 dark:border-[#2D2947] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#7657FF] text-white text-xs font-bold flex items-center justify-center">
              {currentStep}
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-[#F7F6F2]">
              {STEP_TITLES[currentStep - 1].title}
            </span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={handleManualSaveDraft}
              title="Save current progress as draft"
              className="text-xs font-semibold text-[#7657FF] dark:text-[#9B82FF] hover:underline flex items-center gap-1"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>
            <span className="text-slate-300 dark:text-[#2D2947]">|</span>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              title="Delete draft and start over"
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Draft</span>
            </button>
            <span className="text-xs font-bold text-[#7657FF] dark:text-[#9B82FF] font-mono ml-1 hidden sm:inline">
              {progressPercentage}% Completed
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 dark:bg-[#17152B] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#7657FF] transition-all duration-300 ease-out rounded-full shadow-xs"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Step dots for desktop - Interactive Step Buttons */}
        <div className="hidden sm:grid grid-cols-6 gap-2 pt-2 border-t border-slate-100 dark:border-[#2D2947]/80">
          {STEP_TITLES.map((step, idx) => {
            const stepNum = idx + 1
            const isCompleted = stepNum < currentStep
            const isCurrent = stepNum === currentStep
            const Icon = step.icon

            return (
              <button
                type="button"
                key={step.title}
                onClick={() => handleJumpToStep(stepNum)}
                className={`flex flex-col items-center gap-1 text-center cursor-pointer group transition-all p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#252147] ${
                  isCurrent
                    ? 'text-[#7657FF] dark:text-[#9B82FF]'
                    : isCompleted
                    ? 'text-slate-800 dark:text-slate-200'
                    : 'text-slate-400 dark:text-slate-600'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-[#7657FF] text-white shadow-xs scale-105'
                      : isCompleted
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:bg-[#7657FF]/20'
                      : 'bg-slate-100 dark:bg-[#17152B] text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <span className="text-[11px] font-semibold truncate max-w-full">
                  {step.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Server error alert */}
      {serverError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-3xl text-xs sm:text-sm text-red-700 dark:text-red-300 flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          <div className="min-w-0">
            <p className="font-bold">Failed to Post Ad</p>
            <p className="text-xs mt-0.5 break-words">{serverError}</p>
          </div>
        </div>
      )}

      {/* Step Form Body */}
      <form onSubmit={handleFormSubmit}>
        <div className="bg-white dark:bg-[#1E1B38] border border-slate-200 dark:border-[#2D2947] rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* Quick Return to Review Banner when editing from Review */}
          {returnToReview && currentStep < 6 && (
            <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-[#7657FF]/10 dark:bg-[#7657FF]/15 border border-[#7657FF]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm shadow-xs animate-in fade-in-50 duration-150">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-[#F7F6F2]">
                <div className="w-7 h-7 rounded-lg bg-[#7657FF] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>
                  Editing <strong>Step {currentStep}: {STEP_TITLES[currentStep - 1].title}</strong>. When you are done, jump directly back to review.
                </span>
              </div>
              <button
                type="button"
                onClick={handleSaveAndReturnToReview}
                className="px-4 py-2 rounded-xl bg-[#7657FF] hover:bg-[#6343ED] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 self-stretch sm:self-auto shrink-0 active:scale-95"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Save & Back to Review</span>
              </button>
            </div>
          )}

          {currentStep === 1 && (
            <Step1Phone
              form={form}
              brands={brands}
              onModelSelected={(m) => {
                setSelectedModel(m)
              }}
            />
          )}

          {currentStep === 2 && (
            <Step2Specs form={form} selectedModel={selectedModel} />
          )}

          {currentStep === 3 && (
            <Step3Price
              form={form}
              brands={brands}
              selectedModel={selectedModel}
            />
          )}

          {currentStep === 4 && <Step4Photos form={form} userId={userId} />}

          {currentStep === 5 && <Step5Location form={form} cities={cities} />}

          {currentStep === 6 && (
            <Step6Review
              form={form}
              brands={brands}
              cities={cities}
              selectedModel={selectedModel}
              onJumpToStep={(step) => goToStep(step, true)}
            />
          )}
        </div>

        {/* Navigation Footer */}
        <div className="fixed sm:static bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-[#17152B]/95 backdrop-blur-md border-t sm:border-t-0 border-slate-200 dark:border-[#2D2947] z-30 sm:mt-6 sm:p-0">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
            {/* Left buttons: Back, Save Draft & Delete Draft */}
            <div className="flex items-center gap-2">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isPending}
                  className="px-4 sm:px-5 py-3 rounded-2xl border border-slate-300 dark:border-[#2D2947] font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-[#252147] transition-colors disabled:opacity-50 flex items-center gap-1.5 active:scale-95"
                >
                  {returnToReview ? (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      <span>Review</span>
                    </>
                  ) : (
                    <>
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </>
                  )}
                </button>
              )}
              <button
                type="button"
                onClick={handleManualSaveDraft}
                disabled={isPending}
                className="px-3 sm:px-4 py-3 rounded-2xl border border-dashed border-[#7657FF]/40 font-bold text-[#7657FF] dark:text-[#9B82FF] text-xs hover:bg-[#7657FF]/10 transition-colors flex items-center gap-1.5 active:scale-95"
              >
                <Save className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Save Draft</span>
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                disabled={isPending}
                title="Delete draft and reset form"
                className="px-3 sm:px-3.5 py-3 rounded-2xl border border-rose-200 dark:border-rose-900/60 font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center gap-1.5 active:scale-95 text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Delete Draft</span>
              </button>
            </div>

            {/* Right Action buttons */}
            {currentStep < STEP_TITLES.length ? (
              <div className="flex items-center gap-2 flex-1 sm:flex-none justify-end">
                {/* If editing from review, show Save & Back to Review button */}
                {returnToReview && (
                  <button
                    type="button"
                    onClick={handleSaveAndReturnToReview}
                    disabled={isPending}
                    className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] font-bold text-white text-xs sm:text-sm shadow-md shadow-[#7657FF]/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save & Back to Review</span>
                  </button>
                )}

                {/* Save & Continue Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isPending}
                  className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                    returnToReview
                      ? 'border border-slate-300 dark:border-[#2D2947] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#252147]'
                      : 'bg-[#7657FF] hover:bg-[#6343ED] text-white shadow-md shadow-[#7657FF]/30'
                  }`}
                >
                  <span>Save & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-[#7657FF] hover:bg-[#6343ED] active:scale-[0.98] font-bold text-white text-xs sm:text-sm shadow-lg shadow-[#7657FF]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing Phone...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Publish Smartphone Ad</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
