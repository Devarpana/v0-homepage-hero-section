'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User } from 'lucide-react'
import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Placeholder */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold font-[var(--font-poppins)]">XL</span>
          </div>
          <span className="text-sm font-semibold text-gray-900 font-[var(--font-poppins)]">XYZ Layers</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm text-gray-700 hover:text-primary transition-colors font-[var(--font-inter)]">
            Shop
          </Link>
          <Link href="#" className="text-sm text-gray-700 hover:text-primary transition-colors font-[var(--font-inter)]">
            Collections
          </Link>
          <Link href="#" className="text-sm text-gray-700 hover:text-primary transition-colors font-[var(--font-inter)]">
            Custom Orders
          </Link>
          <Link href="#" className="text-sm text-gray-700 hover:text-primary transition-colors font-[var(--font-inter)]">
            About
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <User className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
