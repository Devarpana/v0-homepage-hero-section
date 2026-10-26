'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'

export function AdminLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (signInError) {
      setError(
        signInError.message === 'Invalid login credentials'
          ? 'That email and password do not match. Please try again.'
          : signInError.message
      )
      setSubmitting(false)
    }
    // On success AdminShell sees the new session and opens the dashboard.
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#121417] p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(224,142,60,0.25),transparent_60%)]" />
      <div className="relative w-full max-w-sm rounded-[28px] bg-white p-8 shadow-soft-lg">
        <div className="flex items-center gap-3">
          <Image src="/logo-mark.png" alt="" width={40} height={48} className="h-10 w-auto" />
          <span className="font-heading text-lg font-bold text-foreground">XYZ Layers Admin</span>
        </div>

        <h1 className="mt-8 font-heading text-2xl font-bold text-foreground">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Only for the XYZ Layers team.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="admin-email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="admin-password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </p>
          )}

          <Button type="submit" disabled={submitting} className="h-11 w-full rounded-full font-heading font-semibold">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" /> Sign in
              </>
            )}
          </Button>
        </form>

        <Link href="/" className="mt-6 block text-center text-sm text-muted-foreground hover:text-primary">
          ← Back to the website
        </Link>
      </div>
    </div>
  )
}
