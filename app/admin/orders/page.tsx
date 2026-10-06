'use client'

import { useState } from 'react'
import { AdminOrdersTable } from '@/components/admin-orders-table'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const mockOrders = [
  { id: '1', orderId: '1234', customer: 'Ravi Kumar', amount: 4599, status: 'delivered' as const, date: '2024-01-08' },
  { id: '2', orderId: '1235', customer: 'Priya Singh', amount: 2299, status: 'shipped' as const, date: '2024-01-09' },
  { id: '3', orderId: '1236', customer: 'Amit Patel', amount: 5899, status: 'processing' as const, date: '2024-01-10' },
  { id: '4', orderId: '1237', customer: 'Neha Verma', amount: 1899, status: 'pending' as const, date: '2024-01-11' },
  { id: '5', orderId: '1238', customer: 'Vikram Reddy', amount: 3499, status: 'delivered' as const, date: '2024-01-07' },
  { id: '6', orderId: '1239', customer: 'Anjali Desai', amount: 7299, status: 'shipped' as const, date: '2024-01-06' },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOrders = orders.filter((o) =>
    o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.orderId.includes(searchQuery)
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-[family-name:var(--font-poppins)]">Orders</h1>
        <p className="text-muted-foreground mt-2">View and manage all orders</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search orders by customer or order ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <AdminOrdersTable orders={filteredOrders} />
    </div>
  )
}
