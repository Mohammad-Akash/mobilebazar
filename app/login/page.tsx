import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm, LoginFormSkeleton } from './LoginForm'

export const metadata: Metadata = {
  title: 'Sign In to Your Account',
  description: 'Sign in to MobileBazar to buy, sell, or manage your smartphone listings in Pakistan.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return (
    <div className="min-h-[75dvh] flex items-center justify-center px-4 py-8 sm:py-12">
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
