'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/custom-orders', label: 'Custom Orders' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled || menuOpen
          ? 'border-border bg-white/90 backdrop-blur-md'
          : 'border-transparent bg-white/60 backdrop-blur-sm'
      )}
    >
      <div className="container-site flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="XYZ Layers home">
          <Image src="/logo-mark.png" alt="" width={36} height={43} priority className="h-10 w-auto" />
          <span className="font-heading text-lg font-bold tracking-wide text-primary">
            XYZ <span className="font-semibold">LAYERS</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                isActive(link.href) ? 'text-primary' : 'text-foreground/70 hover:text-primary'
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button className="rounded-full p-2.5 text-foreground/80 transition-colors hover:bg-muted" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2.5 text-foreground/80 transition-colors hover:bg-muted" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
          </button>
          <Link
            href="/admin"
            className="hidden rounded-full p-2.5 text-foreground/80 transition-colors hover:bg-muted md:inline-flex"
            title="Admin Dashboard"
            aria-label="Admin"
          >
            <User className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-full p-2.5 text-foreground/80 transition-colors hover:bg-muted md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="container-site flex flex-col py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'rounded-xl px-4 py-3 text-base font-medium',
                    isActive(link.href) ? 'bg-primary/5 text-primary' : 'text-foreground/80'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
