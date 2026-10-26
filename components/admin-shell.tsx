'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AdminSidebar } from '@/components/admin-sidebar'
import { signOut, useAccount } from '@/hooks/use-account'

/**
 * Gate for everything under /admin. This only decides what to show: the real protection is the
 * database rules in supabase/006_admin_login.sql, which refuse non-admins whatever the browser does.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const account = useAccount()

  useEffect(() => {
    if (account.status === 'signed-out') router.replace(`/login?next=${encodeURIComponent(pathname)}`)
  }, [account.status, pathname, router])

  if (account.status !== 'signed-in') return <Spinner />

  if (!account.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="font-heading text-2xl font-bold">No admin access</h1>
          <p className="text-muted-foreground">
            You are signed in as {account.email}. Only admin accounts can open the admin portal.
          </p>
          <div className="flex justify-center gap-3">
            <Button asChild variant="outline">
              <Link href="/">Back to the website</Link>
            </Button>
            <Button onClick={signOut}>Sign out</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar email={account.email} onSignOut={signOut} />
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
