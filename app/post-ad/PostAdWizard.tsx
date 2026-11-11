'use client'

import { useState, useEffect, useTransition } from 'react'
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
} from 'lucide-react'

interface PostAdWizardProps {
  brands: BrandOption[]
  cities: CityOption[]
  userId: string
  onSubmitAction?: (data: FullAdFormData) => Promise<{ success?: boolean; adId?: string; error?: string }>
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
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedModel, setSelectedModel] = useState<ModelOption | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false)

  const form = useForm<FullAdFormData>({
    resolver: zodResolver(fullAdSchema) as unknown as Resolver<FullAdFormData>,
    mode: 'onTouched',
    defaultValues: {
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
    },
  })

  const {
    trigger,
    formState: { isDirty },
  } = form

  // Unsaved changes warning beforeunload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSubmittedSuccessfully) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isDirty, isSubmittedSuccessfully])

  // Scroll to top on step change
  const goToStep = (step: number) => {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Validate only the current step fields before proceeding
  const handleNext = async () => {
    setServerError(null)
    let valid = false

    if (currentStep === 1) {
      valid = await trigger(['brand_id', 'model_id'])
    } else if (currentStep === 2) {
      valid = await trigger([
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
      valid = await trigger(['price', 'is_negotiable', 'title', 'description', 'imei'])
    } else if (currentStep === 4) {
      valid = await trigger(['images'])
    } else if (currentStep === 5) {
      valid = await trigger(['city_id', 'area_id', 'contact_preference'])
    } else {
      valid = true
    }

    if (valid) {
      goToStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    setServerError(null)
    if (currentStep > 1) {
      goToStep(currentStep - 1)
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
        setIsSubmittedSuccessfully(true)
        router.push(`/post-ad/success?ad=${res.adId}`)
      }
    })
  })

  const progressPercentage = Math.round((currentStep / STEP_TITLES.length) * 100)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-32 sm:pb-16">
      {/* Header Headline */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Post Your Smartphone</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Sell Your Mobile in Pakistan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Reach thousands of genuine verified smartphone buyers with zero listing fees.
        </p>
      </div>

      {/* Progress Card */}
      <div className="mb-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              {currentStep}
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {STEP_TITLES[currentStep - 1].title}
            </span>
          </div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
            {progressPercentage}% Completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Step dots for desktop */}
        <div className="hidden sm:grid grid-cols-6 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {STEP_TITLES.map((step, idx) => {
            const stepNum = idx + 1
            const isCompleted = stepNum < currentStep
            const isCurrent = stepNum === currentStep
            const Icon = step.icon

            return (
              <div
                key={step.title}
                className={`flex flex-col items-center gap-1 text-center ${
                  isCurrent
                    ? 'text-blue-600 dark:text-blue-400'
                    : isCompleted
                    ? 'text-slate-800 dark:text-slate-200'
                    : 'text-slate-400 dark:text-slate-600'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <span className="text-[11px] font-semibold truncate max-w-full">
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Server error alert */}
      {serverError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-xs sm:text-sm text-red-700 dark:text-red-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          <div>
            <p className="font-bold">Failed to Post Ad</p>
            <p className="text-xs mt-0.5">{serverError}</p>
          </div>
        </div>
      )}

      {/* Step Form Body */}
      <form onSubmit={handleFormSubmit}>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          {currentStep === 1 && (
            <Step1Phone
              form={form}
              brands={brands}
              onModelSelected={(m) => {
                setSelectedModel(m)
                if (m?.storage_options && m.storage_options.length > 0) {
                  form.setValue('storage_gb', m.storage_options[0])
                }
                if (m?.ram_options && m.ram_options.length > 0) {
                  form.setValue('ram_gb', m.ram_options[0])
                }
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
              onJumpToStep={(step) => goToStep(step)}
            />
          )}
        </div>

        {/* Navigation Footer */}
        <div className="fixed sm:static bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t sm:border-t-0 border-slate-200 dark:border-slate-800 z-30 sm:mt-6 sm:p-0">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isPending}
                className="px-5 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-1.5 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < STEP_TITLES.length ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={isPending}
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] font-bold text-white text-sm sm:text-base shadow-sm shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] font-bold text-white text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
