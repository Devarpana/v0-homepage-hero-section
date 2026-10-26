'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Loader2, MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { safeNext, useAccount } from '@/hooks/use-account'
import { cn } from '@/lib/utils'

type Mode = 'signin' | 'signup' | 'forgot'

const titles: Record<Mode, { title: string; text: string }> = {
  signin: { title: 'Welcome back', text: 'Sign in to your XYZ Layers account.' },
  signup: { title: 'Create your account', text: 'It takes less than a minute.' },
  forgot: { title: 'Reset your password', text: 'We will email you a link to choose a new password.' },
}

// Supabase gives the same answer for "no such account" and "wrong password", so one message covers both.
const NO_MATCH = 'We couldn’t sign you in. Check your email and password, or create an account if you are new here.'

function friendlyError(message: string) {
  if (message === 'Invalid login credentials') return NO_MATCH
  if (/email not confirmed/i.test(message)) return 'Please confirm your email first. Check your inbox for our link.'
  if (/already registered/i.test(message)) return 'An account with this email already exists. Try signing in instead.'
  if (/rate limit/i.test(message)) return 'Too many attempts. Please wait a few minutes and try again.'
  return message
}

export function AuthForm() {
  const router = useRouter()
  const params = useSearchParams()
  const next = safeNext(params.get('next'))
  const account = useAccount()

  const [mode, setMode] = useState<Mode>(params.get('mode') === 'signup' ? 'signup' : 'signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sentTo, setSentTo] = useState<string | null>(null)

  // The navbar menu can switch between sign in and create account while this page is open.
  const modeParam = params.get('mode')
  useEffect(() => {
    if (modeParam === 'signup' || modeParam === 'signin') switchMode(modeParam)
  }, [modeParam])

  // Already signed in (or just signed in): go where the person was heading.
  useEffect(() => {
    if (account.status === 'signed-in') router.replace(next)
  }, [account.status, next, router])

  const switchMode = (m: Mode) => {
    setMode(m)
    setError(null)
    setSentTo(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const cleanEmail = email.trim()
    const origin = window.location.origin

    let failure: string | null = null
    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password })
      failure = error?.message ?? null
    } else if (mode === 'signup') {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: { data: { full_name: name.trim() }, emailRedirectTo: `${origin}/login?next=${encodeURIComponent(next)}` },
      })
      failure = error?.message ?? null
      // With email confirmation on, there is no session until the link in the email is clicked.
      if (!error && !data.session) setSentTo(cleanEmail)
    } else {
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, { redirectTo: `${origin}/reset-password` })
      failure = error?.message ?? null
      if (!error) setSentTo(cleanEmail)
    }

    if (failure) setError(friendlyError(failure))
    setSubmitting(false)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#121417] px-4 py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(224,142,60,0.25),transparent_60%)]" />
      <div className="relative w-full max-w-md rounded-[28px] bg-white p-7 shadow-soft-lg sm:p-9">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-mark.png" alt="" width={36} height={43} className="h-10 w-auto" />
          <span className="font-heading text-lg font-bold tracking-wide text-primary">
            XYZ <span className="font-semibold">LAYERS</span>
          </span>
        </Link>

        {mode !== 'forgot' && (
          <div className="mt-8 grid grid-cols-2 rounded-full bg-muted p-1" role="tablist">
            {(['signin', 'signup'] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => switchMode(m)}
                className={cn(
                  'rounded-full py-2.5 font-heading text-sm font-semibold transition-colors',
                  mode === m ? 'bg-white text-primary shadow-soft' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {m === 'signin' ? 'Sign in' : 'Create account'}
              </button>
            ))}
          </div>
        )}

        <h1 className="mt-8 font-heading text-2xl font-bold text-foreground">{titles[mode].title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{titles[mode].text}</p>

        {sentTo ? (
          <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/[0.04] p-5" role="status">
            <MailCheck className="h-6 w-6 text-primary" />
            <p className="mt-3 font-heading font-semibold text-foreground">Check your email</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === 'signup'
                ? `We sent a confirmation link to ${sentTo}. Click it to finish creating your account.`
                : `If ${sentTo} has an account, we sent a link to reset the password.`}
            </p>
            <button type="button" onClick={() => switchMode('signin')} className="mt-4 text-sm font-semibold text-primary hover:text-accent">
              Back to sign in
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === 'signup' && (
              <Field id="account-name" label="Your name">
                <Input id="account-name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="h-11" />
              </Field>
            )}
            <Field id="account-email" label="Email">
              <Input
                id="account-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </Field>
            {mode !== 'forgot' && (
              <Field
                id="account-password"
                label="Password"
                aside={
                  mode === 'signin' && (
                    <button type="button" onClick={() => switchMode('forgot')} className="text-xs font-medium text-primary hover:text-accent">
                      Forgot password?
                    </button>
                  )
                }
              >
                <div className="relative">
                  <Input
                    id="account-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={mode === 'signup' ? 8 : undefined}
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
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
                {mode === 'signup' && <p className="text-xs text-muted-foreground">At least 8 characters.</p>}
              </Field>
            )}

            {error && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {error}
                {error === NO_MATCH && (
                  <button type="button" onClick={() => switchMode('signup')} className="mt-2 block font-semibold text-primary hover:text-accent">
                    Create an account →
                  </button>
                )}
              </div>
            )}

            <Button type="submit" disabled={submitting} className="h-12 w-full rounded-full bg-accent font-heading text-base font-semibold hover:bg-accent/90">
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send reset link'}
            </Button>

            {mode === 'forgot' && (
              <button type="button" onClick={() => switchMode('signin')} className="block w-full text-center text-sm text-muted-foreground hover:text-primary">
                Back to sign in
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

function Field({ id, label, aside, children }: { id: string; label: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {aside}
      </div>
      {children}
    </div>
  )
}
