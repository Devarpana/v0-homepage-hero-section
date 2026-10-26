'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, LogIn, LogOut, User, UserPlus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut, useAccount } from '@/hooks/use-account'
import { cn } from '@/lib/utils'

/** The person icon in the navbar: sign in / create account, or the signed-in account's options. */
export function AccountMenu({ className }: { className?: string }) {
  const account = useAccount()
  const pathname = usePathname()
  const signedIn = account.status === 'signed-in'
  // Come back to this page after signing in (but not to the login page itself).
  const next = pathname === '/login' ? '' : `&next=${encodeURIComponent(pathname)}`

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={cn('relative outline-none', className)} aria-label={signedIn ? 'Your account' : 'Sign in'}>
        <User className="h-5 w-5" />
        {signedIn && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-white" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 rounded-2xl p-2">
        {signedIn ? (
          <>
            <DropdownMenuLabel className="px-3 py-2">
              <span className="block truncate font-heading text-sm font-semibold">{account.name}</span>
              <span className="block truncate text-xs font-normal text-muted-foreground">{account.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {account.isAdmin && (
              <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5">
                <Link href="/admin">
                  <LayoutDashboard className="h-4 w-4" />
                  Admin portal
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onSelect={() => signOut()} className="rounded-xl px-3 py-2.5">
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5">
              <Link href={`/login?mode=signin${next}`}>
                <LogIn className="h-4 w-4" />
                Sign in
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5">
              <Link href={`/login?mode=signup${next}`}>
                <UserPlus className="h-4 w-4" />
                Create account
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
