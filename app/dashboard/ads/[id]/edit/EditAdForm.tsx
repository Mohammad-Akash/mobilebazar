'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { fullAdSchema, type FullAdFormData } from '@/src/lib/validations/ad'
import { BrandOption, CityOption, ModelOption } from '@/src/lib/data/reference'
import { updateAdAction } from '@/src/lib/actions/dashboard-ads'
import { Step1Phone } from '@/app/post-ad/steps/Step1Phone'
import { Step2Specs } from '@/app/post-ad/steps/Step2Specs'
import { Step3Price } from '@/app/post-ad/steps/Step3Price'
import { Step4Photos } from '@/app/post-ad/steps/Step4Photos'
import { Step5Location } from '@/app/post-ad/steps/Step5Location'

interface EditAdFormProps {
  adId: string
  initialData: FullAdFormData
  brands: BrandOption[]
  cities: CityOption[]
  userId: string
}

export function EditAdForm({
  adId,
  initialData,
  brands,
  cities,
  userId,
}: EditAdFormProps) {
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState<ModelOption | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isSavedSuccessfully, setIsSavedSuccessfully] = useState(false)

  const form = useForm<FullAdFormData>({
    resolver: zodResolver(fullAdSchema) as unknown as Resolver<FullAdFormData>,
    mode: 'onTouched',
    defaultValues: initialData,
  })

  const {
    formState: { isDirty },
  } = form

  // Unsaved changes warning before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSavedSuccessfully) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty, isSavedSuccessfully])

  const handleFormSubmit = form.handleSubmit(async (data) => {
    setServerError(null)
    startTransition(async () => {
      const res = await updateAdAction(adId, data)
      if (res.error) {
        setServerError(res.error)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setIsSavedSuccessfully(true)
        router.push('/dashboard/ads?message=ad_updated')
      }
    })
  })

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
            Edit Ad
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Update your phone price, details, and photos
          </p>
        </div>
        <Link
          href="/dashboard/ads"
          className="text-xs font-semibold text-zinc-500 hover:underline"
        >
          Cancel
        </Link>
      </div>

      {serverError && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-xs text-red-700 dark:text-red-300">
          ⚠️ {serverError}
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-8">
        {/* Section 1: Phone */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
          <Step1Phone
            form={form}
            brands={brands}
            onModelSelected={(m) => setSelectedModel(m)}
          />
        </div>

        {/* Section 2: Specs */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
          <Step2Specs form={form} selectedModel={selectedModel} />
        </div>

        {/* Section 3: Pricing & Title */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
          <Step3Price form={form} brands={brands} selectedModel={selectedModel} />
        </div>

        {/* Section 4: Photos Management */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
          <Step4Photos form={form} userId={userId} />
        </div>

        {/* Section 5: Location */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
          <Step5Location form={form} cities={cities} />
        </div>

        {/* Sticky Actions Footer */}
        <div className="sticky bottom-4 z-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center justify-between gap-4">
          <Link
            href="/dashboard/ads"
            className="px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-blue-600/30 transition-all disabled:opacity-50"
          >
            {isPending ? 'Saving changes...' : '💾 Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

