'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { useAccount } from '@/hooks/use-account'

// The reset email links here; Supabase signs the person in from the link so they can set a new password.
export default function ResetPasswordPage() {
  const router = useRouter()
  const account = useAccount()
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError(error.message)
      setSubmitting(false)
      return
    }
    router.replace('/')
  }

  return (
    <>
      <Navbar />
      <main className="relative flex min-h-screen items-center justify-center bg-[#121417] px-4 py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(224,142,60,0.25),transparent_60%)]" />
        <div className="relative w-full max-w-md rounded-[28px] bg-white p-7 shadow-soft-lg sm:p-9">
          <h1 className="font-heading text-2xl font-bold text-foreground">Choose a new password</h1>
          {account.status === 'loading' ? (
            <Loader2 className="mt-6 h-6 w-6 animate-spin text-muted-foreground" />
          ) : account.status === 'signed-out' ? (
            <p className="mt-3 text-sm text-muted-foreground">
              This reset link has expired or was already used.{' '}
              <Link href="/login" className="font-semibold text-primary hover:text-accent">
                Ask for a new one
              </Link>
              .
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">
                  New password for {account.email}
                </label>
                <Input
                  id="new-password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">At least 8 characters.</p>
              </div>
              {error && (
                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  {error}
                </p>
              )}
              <Button type="submit" disabled={submitting} className="h-12 w-full rounded-full bg-accent font-heading text-base font-semibold hover:bg-accent/90">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Save new password
              </Button>
            </form>
          )}
        </div>
      </main>
    </>
  )
}
