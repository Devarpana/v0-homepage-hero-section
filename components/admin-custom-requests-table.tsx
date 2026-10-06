'use client'

import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { CustomRequestDetail, type CustomRequestPatch } from '@/components/custom-request-detail'
import { formatDate, type AdminCustomRequest, type RequestPriority, type RequestStatus } from '@/lib/admin'
import { formatPrice } from '@/lib/products'

interface AdminCustomRequestsTableProps {
  requests: AdminCustomRequest[]
  onSave: (id: string, patch: CustomRequestPatch) => Promise<boolean>
}

const priorityColors: Record<RequestPriority, string> = {
  low: 'bg-blue-500/10 text-blue-700',
  medium: 'bg-yellow-500/10 text-yellow-700',
  high: 'bg-orange-500/10 text-orange-700',
  urgent: 'bg-red-500/10 text-red-700',
}

const statusColors: Record<RequestStatus, string> = {
  new: 'bg-gray-500/10 text-gray-700',
  reviewing: 'bg-blue-500/10 text-blue-700',
  quoted: 'bg-purple-500/10 text-purple-700',
  approved: 'bg-green-500/10 text-green-700',
  printing: 'bg-orange-500/10 text-orange-700',
  completed: 'bg-green-600/10 text-green-700',
}

const th = 'text-left px-6 py-4 text-sm font-semibold text-foreground font-[family-name:var(--font-poppins)]'

export function AdminCustomRequestsTable({ requests, onSave }: AdminCustomRequestsTableProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  // Look the request up by id so the dialog always shows the latest saved values.
  const selectedRequest = requests.find((r) => r.id === selectedId) ?? null

  return (
    <>
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className={th}>ID</th>
                <th className={th}>Customer</th>
                <th className={th}>Project</th>
                <th className={th}>Priority</th>
                <th className={th}>Status</th>
                <th className={th}>Quotation</th>
                <th className={th}>Received</th>
                <th className={th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: Math.min(index, 10) * 0.05 }}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground font-[family-name:var(--font-poppins)]">#{request.request_number}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground">{request.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground truncate max-w-xs">{request.project_title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium capitalize ${priorityColors[request.priority]}`}>{request.priority}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium capitalize ${statusColors[request.status]}`}>{request.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground font-[family-name:var(--font-poppins)]">
                      {request.quotation_amount != null ? formatPrice(Number(request.quotation_amount)) : '—'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{formatDate(request.created_at)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <motion.button
                      type="button"
                      aria-label={`View request ${request.request_number}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedId(request.id)}
                      className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {selectedRequest && (
        <CustomRequestDetail
          key={selectedRequest.id}
          request={selectedRequest}
          isOpen
          onClose={() => setSelectedId(null)}
          onSave={onSave}
        />
      )}
    </>
  )
}
