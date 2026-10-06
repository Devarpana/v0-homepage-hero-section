'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import type { Session } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { AdminSidebar } from '@/components/admin-sidebar'
import { NOT_CONFIGURED_MESSAGE, supabase } from '@/lib/supabase'

type AuthState =
  | { status: 'loading' }
  | { status: 'unconfigured' }
  | { status: 'signed-out' }
  | { status: 'forbidden'; email: string }
  | { status: 'ready'; email: string }

/**
 * Gate for everything under /admin. This only decides what to *show*: the real protection is
 * row level security in the database, which refuses non-admins no matter what the browser does.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLogin = pathname === '/admin/login'
  const [auth, setAuth] = useState<AuthState>({ status: 'loading' })

  useEffect(() => {
    if (!supabase) {
      setAuth({ status: 'unconfigured' })
      return
    }
    const client = supabase
    let cancelled = false

    const evaluate = async (session: Session | null) => {
      if (!session) {
        if (!cancelled) setAuth({ status: 'signed-out' })
        return
      }
      // Being signed in is not enough: the user must be listed in the admins table.
      const { data, error } = await client.from('admins').select('user_id').eq('user_id', session.user.id).maybeSingle()
      if (cancelled) return
      const email = session.user.email ?? ''
      setAuth(data && !error ? { status: 'ready', email } : { status: 'forbidden', email })
    }

    // Fires immediately with the stored session, then on every sign-in/out. The callback must
    // not await supabase calls itself (it can deadlock auth), hence the deferral.
    const { data } = client.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => evaluate(session), 0)
    })
    return () => {
      cancelled = true
      data.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (auth.status === 'signed-out' && !isLogin) router.replace('/admin/login')
    if (auth.status === 'ready' && isLogin) router.replace('/admin')
  }, [auth.status, isLogin, router])

  const signOut = async () => {
    await supabase?.auth.signOut()
  }

  if (auth.status === 'unconfigured') {
    return <Notice title="Admin unavailable" message={NOT_CONFIGURED_MESSAGE} />
  }

  // Checked before the login branch: someone who signs in with a valid account that is not an
  // admin must be told why they got nowhere, not left staring at the login form.
  if (auth.status === 'forbidden') {
    return (
      <Notice
        title="No admin access"
        message={`${auth.email} is signed in but is not an admin. Add this account to the admins table in Supabase (see the end of supabase/migrations/0001_storefront.sql), or sign in with a different account.`}
        action={<Button onClick={signOut}>Sign out</Button>}
      />
    )
  }

  if (isLogin) {
    // The login form sits outside the signed-in layout (no sidebar).
    return auth.status === 'loading' || auth.status === 'ready' ? <Spinner /> : <>{children}</>
  }

  if (auth.status === 'loading' || auth.status === 'signed-out') return <Spinner />

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar email={auth.email} onSignOut={signOut} />
      <main className="flex-1 overflow-auto min-w-0">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading">
      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
    </div>
  )
}

function Notice({ title, message, action }: { title: string; message: string; action?: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-poppins)]">{title}</h1>
        <p className="text-muted-foreground">{message}</p>
        {action}
      </div>
    </div>
  )
}
