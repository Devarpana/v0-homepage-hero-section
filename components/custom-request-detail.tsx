'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

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

interface CustomRequestDetailProps {
  request: CustomRequest
  isOpen: boolean
  onClose: () => void
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

export function CustomRequestDetail({
  request,
  isOpen,
  onClose,
}: CustomRequestDetailProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-poppins)]">Request #{request.id}</DialogTitle>
          <DialogDescription>{request.project}</DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Customer</p>
              <p className="text-sm font-medium text-foreground font-[family-name:var(--font-poppins)]">{request.customer}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Submitted</p>
              <p className="text-sm font-medium text-foreground font-[family-name:var(--font-poppins)]">{request.date}</p>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4 font-[family-name:var(--font-poppins)]">Project Details</h3>
            <p className="text-sm text-muted-foreground mb-6">{request.project}</p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Priority</p>
                <span className={`inline-block px-3 py-1 rounded text-xs font-medium capitalize ${priorityColors[request.priority]}`}>
                  {request.priority}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Status</p>
                <span className={`inline-block px-3 py-1 rounded text-xs font-medium capitalize ${statusColors[request.status]}`}>
                  {request.status}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4 font-[family-name:var(--font-poppins)]">Quotation & Notes</h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Quotation Amount</p>
                {request.quotationAmount ? (
                  <p className="text-lg font-bold text-primary font-[family-name:var(--font-poppins)]">₹{request.quotationAmount.toLocaleString()}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No quotation provided yet</p>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Internal Notes</p>
                {request.internalNotes ? (
                  <p className="text-sm text-foreground bg-muted/50 p-3 rounded-lg">{request.internalNotes}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No internal notes</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-border">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-[family-name:var(--font-poppins)]">
                Update Status
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="font-[family-name:var(--font-poppins)]">
                Edit Notes
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="ml-auto">
              <Button variant="ghost" onClick={onClose} className="font-[family-name:var(--font-poppins)]">
                Close
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
