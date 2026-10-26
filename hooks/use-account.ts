'use client'

import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export type Account =
  | { status: 'loading' }
  | { status: 'signed-out' }
  | { status: 'signed-in'; email: string; name: string; isAdmin: boolean }

/**
 * The visitor's account, kept in sync with sign-in and sign-out. `isAdmin` only decides what to
 * show; the database rules (supabase/006_admin_login.sql) are what actually protect admin data.
 */
export function useAccount(): Account {
  const [account, setAccount] = useState<Account>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    const evaluate = async (session: Session | null) => {
      if (!session) {
        if (!cancelled) setAccount({ status: 'signed-out' })
        return
      }
      // Being signed in is not enough: the account must be listed in the admins table.
      const { data, error } = await supabase.from('admins').select('user_id').eq('user_id', session.user.id).maybeSingle()
      if (cancelled) return
      const email = session.user.email ?? ''
      const name = (session.user.user_metadata?.full_name as string | undefined) || email.split('@')[0]
      setAccount({ status: 'signed-in', email, name, isAdmin: Boolean(data && !error) })
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

  return account
}

export async function signOut() {
  await supabase.auth.signOut()
}

/** Only same-site paths, so a crafted ?next= link can't send people to another website. */
export function safeNext(next: string | null | undefined, fallback = '/') {
  return next && next.startsWith('/') && !next.startsWith('//') ? next : fallback
}
