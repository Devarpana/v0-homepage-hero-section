'use client'

import { useState } from 'react'
import { Loader2, Search } from 'lucide-react'
import { toast } from 'sonner'
import { AdminOrdersTable } from '@/components/admin-orders-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { requireSupabase } from '@/lib/supabase'
import { adminError, type AdminOrder, type OrderStatus } from '@/lib/admin'
import { useAdminQuery } from '@/hooks/use-admin-query'

export default function OrdersPage() {
  const { data, setData, loading, error, reload } = useAdminQuery<AdminOrder[]>(() =>
    requireSupabase().from('orders').select('*, order_items(*)').order('created_at', { ascending: false }),
  )
  const [searchQuery, setSearchQuery] = useState('')

  const orders = data ?? []
  const q = searchQuery.trim().toLowerCase()
  const filteredOrders = orders.filter(
    (o) =>
      !q ||
      o.customer_name.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q) ||
      String(o.order_number).includes(q.replace(/^#/, '')),
  )

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    const previous = orders.find((o) => o.id === id)?.status
    // Update the screen first, then confirm with the database; roll back if it refuses.
    setData((current) => (current ?? []).map((o) => (o.id === id ? { ...o, status } : o)))

    const { error: updateError } = await requireSupabase().from('orders').update({ status }).eq('id', id)
    if (updateError) {
      if (previous) setData((current) => (current ?? []).map((o) => (o.id === id ? { ...o, status: previous } : o)))
      toast.error('Could not update the order', { description: adminError(updateError) })
      return
    }
    toast.success(`Order marked ${status}`)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-[family-name:var(--font-poppins)]">Orders</h1>
        <p className="text-muted-foreground mt-2">View and manage all orders</p>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search orders by customer, email or order number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {error ? (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          <p>{error}</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={reload}>
            Try again
          </Button>
        </div>
      ) : loading && !data ? (
        <div className="flex justify-center py-12" role="status" aria-label="Loading orders">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">{orders.length === 0 ? 'No orders yet' : 'No orders match your search'}</p>
      ) : (
        <AdminOrdersTable orders={filteredOrders} onStatusChange={handleStatusChange} />
      )}
    </div>
  )
}
