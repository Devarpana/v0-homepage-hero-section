'use client'

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'

interface Order {
  id: string
  orderId: string
  customer: string
  amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
}

interface AdminOrdersTableProps {
  orders: Order[]
}

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-700',
  processing: 'bg-blue-500/10 text-blue-700',
  shipped: 'bg-purple-500/10 text-purple-700',
  delivered: 'bg-green-500/10 text-green-700',
  cancelled: 'bg-red-500/10 text-red-700',
}

export function AdminOrdersTable({ orders }: AdminOrdersTableProps) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[family-name:var(--font-poppins)]">Order ID</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[family-name:var(--font-poppins)]">Customer</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[family-name:var(--font-poppins)]">Amount</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[family-name:var(--font-poppins)]">Status</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[family-name:var(--font-poppins)]">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground font-[family-name:var(--font-poppins)]">#{order.orderId}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground font-[family-name:var(--font-poppins)]">₹{order.amount.toLocaleString()}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
