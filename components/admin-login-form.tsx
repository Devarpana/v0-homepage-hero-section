'use client'

import { useState } from 'react'
import { Loader2, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { errorMessage, requireSupabase } from '@/lib/supabase'

export function AdminLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const { error: signInError } = await requireSupabase().auth.signInWithPassword({ email: email.trim(), password })
      if (signInError) throw signInError
      // AdminShell notices the new session and moves on to the dashboard.
    } catch (err) {
      setError(errorMessage(err, 'Could not sign in.'))
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Card className="w-full max-w-sm p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold font-[family-name:var(--font-poppins)]">XYZ Admin</span>
        </div>

        <h1 className="text-2xl font-bold mb-1 font-[family-name:var(--font-poppins)]">Sign in</h1>
        <p className="text-sm text-muted-foreground mb-6">Use the admin account created in Supabase.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="admin-email" className="text-sm font-medium">Email</label>
            <Input id="admin-email" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label htmlFor="admin-password" className="text-sm font-medium">Password</label>
            <Input id="admin-password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
              {error}
            </p>
          )}

          <Button type="submit" disabled={submitting} className="w-full font-[family-name:var(--font-poppins)]">
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Signing in…
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
      </Card>
    </div>
  )
}
