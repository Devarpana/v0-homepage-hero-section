'use client'

import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { CustomRequestDetail } from '@/components/custom-request-detail'

interface CustomRequest {
  id: string
  customer: string
  project: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'new' | 'reviewing' | 'quoted' | 'approved' | 'printing' | 'completed'
  quotationAmount?: number
  internalNotes?: string
  date: string
}

interface AdminCustomRequestsTableProps {
  requests: CustomRequest[]
}

const priorityColors = {
  low: 'bg-blue-500/10 text-blue-700',
  medium: 'bg-yellow-500/10 text-yellow-700',
  high: 'bg-orange-500/10 text-orange-700',
  urgent: 'bg-red-500/10 text-red-700',
}

const statusColors = {
  new: 'bg-gray-500/10 text-gray-700',
  reviewing: 'bg-blue-500/10 text-blue-700',
  quoted: 'bg-purple-500/10 text-purple-700',
  approved: 'bg-green-500/10 text-green-700',
  printing: 'bg-orange-500/10 text-orange-700',
  completed: 'bg-green-600/10 text-green-700',
}

export function AdminCustomRequestsTable({ requests }: AdminCustomRequestsTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<CustomRequest | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleViewDetails = (request: CustomRequest) => {
    setSelectedRequest(request)
    setIsDetailOpen(true)
  }

  return (
    <>
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[family-name:var(--font-poppins)]">ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[family-name:var(--font-poppins)]">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[family-name:var(--font-poppins)]">Project</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[family-name:var(--font-poppins)]">Priority</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[family-name:var(--font-poppins)]">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[family-name:var(--font-poppins)]">Quotation</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[family-name:var(--font-poppins)]">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground font-[family-name:var(--font-poppins)]">#{request.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground">{request.customer}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground truncate max-w-xs">{request.project}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium capitalize ${priorityColors[request.priority]}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium capitalize ${statusColors[request.status]}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground font-[family-name:var(--font-poppins)]">
                      {request.quotationAmount ? `₹${request.quotationAmount.toLocaleString()}` : '—'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewDetails(request)}
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

      {/* Detail Modal */}
      {selectedRequest && (
        <CustomRequestDetail
          request={selectedRequest}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </>
  )
}
