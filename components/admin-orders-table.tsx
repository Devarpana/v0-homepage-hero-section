'use client'

import { Fragment, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ORDER_STATUSES, formatDate, type AdminOrder, type OrderStatus } from '@/lib/admin'
import { formatPrice } from '@/lib/products'

interface AdminOrdersTableProps {
  orders: AdminOrder[]
  onStatusChange: (id: string, status: OrderStatus) => void
}

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500/10 text-yellow-700',
  processing: 'bg-blue-500/10 text-blue-700',
  shipped: 'bg-purple-500/10 text-purple-700',
  delivered: 'bg-green-500/10 text-green-700',
  cancelled: 'bg-red-500/10 text-red-700',
}

const th = 'text-left px-6 py-4 text-sm font-semibold text-foreground font-[family-name:var(--font-poppins)]'

export function AdminOrdersTable({ orders, onStatusChange }: AdminOrdersTableProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <Card className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className={`${th} w-12`}>
                <span className="sr-only">Details</span>
              </th>
              <th className={th}>Order ID</th>
              <th className={th}>Customer</th>
              <th className={th}>Amount</th>
              <th className={th}>Status</th>
              <th className={th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const isOpen = expanded === order.id
              return (
                <Fragment key={order.id}>
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: Math.min(index, 10) * 0.05 }}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="pl-6 py-4">
                      <button
                        type="button"
                        aria-label={`${isOpen ? 'Hide' : 'Show'} details for order ${order.order_number}`}
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : order.id)}
                        className="p-1 rounded hover:bg-muted"
                      >
                        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground font-[family-name:var(--font-poppins)]">#{order.order_number}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-foreground">{order.customer_name}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground font-[family-name:var(--font-poppins)]">{formatPrice(Number(order.total))}</p>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        aria-label={`Status of order ${order.order_number}`}
                        value={order.status}
                        onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize border-0 cursor-pointer ${statusColors[order.status]}`}
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status} className="capitalize">
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
                    </td>
                  </motion.tr>

                  {isOpen && (
                    <tr className="border-b border-border bg-muted/20">
                      <td />
                      <td colSpan={5} className="px-6 py-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                          <div>
                            <h3 className="font-semibold mb-2 font-[family-name:var(--font-poppins)]">Items</h3>
                            <ul className="space-y-1">
                              {order.order_items.map((item) => (
                                <li key={item.id} className="flex justify-between gap-4">
                                  <span>
                                    {item.product_name}
                                    {item.color && <span className="text-muted-foreground capitalize"> · {item.color}</span>}
                                    <span className="text-muted-foreground"> × {item.quantity}</span>
                                  </span>
                                  <span>{formatPrice(Number(item.unit_price) * item.quantity)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2 font-[family-name:var(--font-poppins)]">Deliver to</h3>
                            <address className="not-italic text-muted-foreground leading-relaxed">
                              {order.customer_name}
                              <br />
                              {order.address_line}
                              <br />
                              {order.city}, {order.state} {order.pincode}
                              <br />
                              <a href={`tel:${order.phone.replace(/[^+\d]/g, '')}`} className="text-primary hover:underline">
                                {order.phone}
                              </a>{' '}
                              ·{' '}
                              <a href={`mailto:${order.email}`} className="text-primary hover:underline">
                                {order.email}
                              </a>
                            </address>
                            {order.notes && (
                              <p className="mt-3">
                                <span className="font-semibold">Notes: </span>
                                {order.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
