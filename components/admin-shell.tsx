'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import type { Session } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { AdminSidebar } from '@/components/admin-sidebar'
import { supabase } from '@/lib/supabase'

type AuthState =
  | { status: 'loading' }
  | { status: 'signed-out' }
  | { status: 'forbidden'; email: string }
  | { status: 'ready'; email: string }

/**
 * Gate for everything under /admin. This only decides what to show: the real protection is the
 * database rules in supabase/006_admin_login.sql, which refuse non-admins whatever the browser does.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLogin = pathname === '/admin/login'
  const [auth, setAuth] = useState<AuthState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    const evaluate = async (session: Session | null) => {
      if (!session) {
        if (!cancelled) setAuth({ status: 'signed-out' })
        return
      }
      // Being signed in is not enough: the account must be listed in the admins table.
      const { data, error } = await supabase.from('admins').select('user_id').eq('user_id', session.user.id).maybeSingle()
      if (cancelled) return
      const email = session.user.email ?? ''
      setAuth(data && !error ? { status: 'ready', email } : { status: 'forbidden', email })
    }

    // Fires at once with the stored session, then on every sign-in and sign-out. The callback must
    // not await Supabase calls itself (that can deadlock auth), hence the deferral.
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
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
    await supabase.auth.signOut()
  }

  // Checked before the login form: someone who signs in with an account that is not an admin
  // must be told why, not left looking at the form again.
  if (auth.status === 'forbidden') {
    return (
      <Notice
        title="No admin access"
        message={`${auth.email} is signed in, but this account is not an admin.`}
        action={<Button onClick={signOut}>Sign out</Button>}
      />
    )
  }

  if (isLogin) {
    return auth.status === 'signed-out' ? <>{children}</> : <Spinner />
  }

  if (auth.status !== 'ready') return <Spinner />

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar email={auth.email} onSignOut={signOut} />
      <main className="min-w-0 flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}

function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center" role="status" aria-label="Loading">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )
}

function Notice({ title, message, action }: { title: string; message: string; action?: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="font-heading text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{message}</p>
        {action}
      </div>
    </div>
  )
}
