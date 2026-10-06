'use client'

import { Card } from '@/components/ui/card'
import { Package, FileText, ShoppingCart, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Total Products', value: '24', icon: Package, color: 'bg-blue-500/10 text-blue-600' },
  { label: 'Custom Requests', value: '12', icon: FileText, color: 'bg-purple-500/10 text-purple-600' },
  { label: 'Orders This Month', value: '48', icon: ShoppingCart, color: 'bg-green-500/10 text-green-600' },
  { label: 'Revenue', value: '₹1.2M', icon: TrendingUp, color: 'bg-orange-500/10 text-orange-600' },
]

export function AdminOverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-foreground font-[family-name:var(--font-poppins)]">{stat.value}</p>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
