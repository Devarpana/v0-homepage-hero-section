'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { AccountMenu } from '@/components/account-menu'
import { cn } from '@/lib/utils'

const links = [
  { href: '/#services', label: 'Services' },
  { href: '/#materials', label: 'Materials' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const darkHeaderPages = ['/', '/custom-orders', '/about', '/contact', '/login', '/reset-password']

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

  // Section links (/#...) are never marked active; page links are active on their page.
  const isActive = (href: string) => href.startsWith('/') && !href.includes('#') && pathname.startsWith(href)
  // Over a dark page header (homepage, quote page) the bar is transparent with light text.
  const onDark = darkHeaderPages.includes(pathname) && !scrolled && !menuOpen
  const iconButton = cn(
    'rounded-full p-2.5 transition-colors',
    onDark ? 'text-white/85 hover:bg-white/10' : 'text-foreground/80 hover:bg-muted'
  )

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        onDark
          ? 'border-transparent bg-transparent'
          : scrolled || menuOpen
            ? 'border-border bg-white/90 backdrop-blur-md'
            : 'border-transparent bg-white/60 backdrop-blur-sm'
      )}
    >
      <div className="container-site flex h-[72px] items-center justify-between">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="XYZ Layers home">
          <Image src="/logo-mark.png" alt="" width={36} height={43} priority className="h-10 w-auto" />
          <span className={cn('whitespace-nowrap font-heading text-lg font-bold tracking-wide', onDark ? 'text-white' : 'text-primary')}>
            XYZ <span className="font-semibold">LAYERS</span>
          </span>
        </Link>

        <div className="hidden items-center gap-0 lg:flex xl:gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors xl:px-4',
                isActive(link.href)
                  ? onDark
                    ? 'text-white'
                    : 'text-primary'
                  : onDark
                    ? 'text-white/75 hover:text-white'
                    : 'text-foreground/70 hover:text-primary'
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-0.5 xl:inset-x-4 h-0.5 rounded-full bg-accent"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <AccountMenu className={iconButton} />
          <Link
            href="/custom-orders#custom-form"
            className="ml-2 hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-5 py-2.5 font-heading text-sm font-semibold text-white shadow-soft transition-colors hover:bg-accent/90 sm:inline-flex"
          >
            Get a quote
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(iconButton, 'lg:hidden')}
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
            className="overflow-hidden border-t border-border lg:hidden"
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
              <Link
                href="/custom-orders#custom-form"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-accent px-4 py-3 text-center font-heading font-semibold text-white"
              >
                Get a quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
