import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { AuthForm } from '@/components/account/auth-form'

export const metadata: Metadata = {
  title: 'Sign in | XYZ Layers',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <Suspense>
          <AuthForm />
        </Suspense>
      </main>
    </>
  )
}
