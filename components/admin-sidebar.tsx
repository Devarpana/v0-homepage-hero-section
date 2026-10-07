'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, FileText, ShoppingCart, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Custom Requests', href: '/admin/custom-requests', icon: FileText },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-0 flex flex-col"
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/admin" className="flex items-center gap-2">
          <img src="/logo-mark.png" alt="" className="h-9 w-auto" />
          <span className="font-bold text-sidebar-foreground font-[var(--font-poppins)]">XYZ Admin</span>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href + '/'))
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className={`font-medium font-[var(--font-inter)] text-sm ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-sidebar-border">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-all cursor-pointer font-[var(--font-inter)] text-sm"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  )
}
