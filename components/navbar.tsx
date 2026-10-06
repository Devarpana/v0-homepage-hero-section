'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { useCart } from '@/components/cart-provider'

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/custom-orders', label: 'Custom Orders' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const { itemCount, hydrated, openCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  // Already on the shop page: Link would only scroll, so focus the search box directly.
  const handleSearchClick = (event: React.MouseEvent) => {
    if (pathname !== '/shop') return
    event.preventDefault()
    const input = document.getElementById('shop-search') as HTMLInputElement | null
    input?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    input?.focus()
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold font-[family-name:var(--font-poppins)]">XL</span>
          </div>
          <span className="text-sm font-semibold text-gray-900 font-[family-name:var(--font-poppins)]">XYZ Layers</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`text-sm hover:text-primary transition-colors font-[family-name:var(--font-inter)] ${
                  active ? 'text-primary font-medium' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/shop#shop-search"
            onClick={handleSearchClick}
            aria-label="Go to product search"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5 text-gray-700" />
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label={hydrated && itemCount > 0 ? `Open cart, ${itemCount} items` : 'Open cart'}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {hydrated && itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-72">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
          <nav className="flex flex-col gap-1 pt-12 px-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-gray-800 font-medium font-[family-name:var(--font-poppins)] hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </motion.nav>
  )
}
