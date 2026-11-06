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

interface PostAdWizardProps {
  brands: BrandOption[]
  cities: CityOption[]
  userId: string
  onSubmitAction?: (data: FullAdFormData) => Promise<{ success?: boolean; adId?: string; error?: string }>
}

const STEP_TITLES = [
  'Phone',
  'Specs',
  'Price',
  'Photos',
  'Location',
  'Review',
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
    <div className="max-w-2xl mx-auto pb-28 sm:pb-12">
      {/* Progress Header */}
      <div className="mb-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Step {currentStep} of {STEP_TITLES.length}: {STEP_TITLES[currentStep - 1]}
          </span>
          <span className="text-xs font-medium text-zinc-500">{progressPercentage}% Mukammal</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Step dots for desktop */}
        <div className="hidden sm:flex justify-between items-center mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          {STEP_TITLES.map((title, idx) => {
            const stepNum = idx + 1
            const isCompleted = stepNum < currentStep
            const isCurrent = stepNum === currentStep
            return (
              <div
                key={title}
                className={`flex items-center gap-1.5 text-xs font-medium ${
                  isCurrent
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : isCompleted
                    ? 'text-zinc-700 dark:text-zinc-300'
                    : 'text-zinc-400'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isCurrent
                      ? 'bg-emerald-600 text-white'
                      : isCompleted
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {isCompleted ? '✓' : stepNum}
                </span>
                <span>{title}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Server error alert */}
      {serverError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-sm text-red-700 dark:text-red-300 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-semibold">Ad Post Karne Mein Masla Aaya</p>
            <p className="text-xs mt-0.5">{serverError}</p>
          </div>
        </div>
      )}

      {/* Step Form Body */}
      <form onSubmit={handleFormSubmit}>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
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

        {/* Sticky Mobile & Desktop Navigation Bar */}
        <div className="fixed sm:static bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t sm:border-t-0 border-zinc-200 dark:border-zinc-800 z-30 sm:mt-6 sm:p-0">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isPending}
                className="px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold text-zinc-700 dark:text-zinc-300 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                ← Peeche (Back)
              </button>
            ) : (
              <div />
            )}

            {currentStep < STEP_TITLES.length ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={isPending}
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] font-bold text-white text-base shadow-sm transition-all text-center"
              >
                Aage Barhein (Next) →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] font-bold text-white text-base shadow-lg shadow-emerald-600/20 transition-all text-center disabled:opacity-50"
              >
                {isPending ? 'Ad Post Ho Raha Hai...' : '🚀 Ad Post Karein (Submit)'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
