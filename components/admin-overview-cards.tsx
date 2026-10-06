'use client'

import { Card } from '@/components/ui/card'
import { Package, FileText, ShoppingCart, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/products'

export interface DashboardStats {
  products: number
  customRequests: number
  newCustomRequests: number
  ordersThisMonth: number
  revenueThisMonth: number
}

export function AdminOverviewCards({ stats }: { stats: DashboardStats | null }) {
  const cards = [
    { label: 'Total Products', value: stats?.products, hint: null, icon: Package, color: 'bg-blue-500/10 text-blue-600' },
    {
      label: 'Custom Requests',
      value: stats?.customRequests,
      hint: stats && stats.newCustomRequests > 0 ? `${stats.newCustomRequests} new` : null,
      icon: FileText,
      color: 'bg-purple-500/10 text-purple-600',
    },
    { label: 'Orders This Month', value: stats?.ordersThisMonth, hint: null, icon: ShoppingCart, color: 'bg-green-500/10 text-green-600' },
    {
      label: 'Revenue This Month',
      value: stats ? formatPrice(stats.revenueThisMonth) : undefined,
      hint: 'Excludes cancelled orders',
      icon: TrendingUp,
      color: 'bg-orange-500/10 text-orange-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon

        return (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{card.label}</h3>
              <p className="text-2xl font-bold text-foreground font-[family-name:var(--font-poppins)]">{card.value ?? '—'}</p>
              {card.hint && <p className="mt-1 text-xs text-muted-foreground">{card.hint}</p>}
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
