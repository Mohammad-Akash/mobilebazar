import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SignupForm, SignupFormSkeleton } from './SignupForm'

export const metadata: Metadata = {
  title: 'Create Your MobileBazar Account',
  description: 'Join MobileBazar to buy and sell verified smartphones in Pakistan. 100% free listings and direct buyer chat.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SignupPage() {
  return (
    <div className="min-h-[75dvh] flex items-center justify-center px-4 py-8 sm:py-12">
      <Suspense fallback={<SignupFormSkeleton />}>
        <SignupForm />
      </Suspense>
    </div>
  )
}
