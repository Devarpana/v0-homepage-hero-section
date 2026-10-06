'use client'

import { useEffect, useState } from 'react'
import { Paperclip } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'
import { requireSupabase } from '@/lib/supabase'
import { REQUEST_PRIORITIES, REQUEST_STATUSES, formatDate, type AdminCustomRequest, type RequestPriority, type RequestStatus } from '@/lib/admin'
import { CUSTOM_REQUEST_BUCKET, budgetLabel } from '@/lib/custom-requests'

export interface CustomRequestPatch {
  status: RequestStatus
  priority: RequestPriority
  quotation_amount: number | null
  internal_notes: string | null
}

interface CustomRequestDetailProps {
  request: AdminCustomRequest
  isOpen: boolean
  onClose: () => void
  /** Resolves true when the change was saved. */
  onSave: (id: string, patch: CustomRequestPatch) => Promise<boolean>
}

const labelClass = 'block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2'
const selectClass = 'w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground capitalize'

export function CustomRequestDetail({ request, isOpen, onClose, onSave }: CustomRequestDetailProps) {
  const [status, setStatus] = useState<RequestStatus>(request.status)
  const [priority, setPriority] = useState<RequestPriority>(request.priority)
  const [quotation, setQuotation] = useState(request.quotation_amount != null ? String(request.quotation_amount) : '')
  const [notes, setNotes] = useState(request.internal_notes ?? '')
  const [saving, setSaving] = useState(false)
  const [files, setFiles] = useState<{ name: string; url: string }[]>([])

  // Customer uploads live in a private bucket: ask for short-lived links to view them.
  useEffect(() => {
    if (!isOpen || request.file_paths.length === 0) return
    let cancelled = false
    requireSupabase()
      .storage.from(CUSTOM_REQUEST_BUCKET)
      .createSignedUrls(request.file_paths, 60 * 60)
      .then(({ data }) => {
        if (cancelled || !data) return
        setFiles(
          data.flatMap((entry) =>
            entry.signedUrl ? [{ name: (entry.path ?? '').split('/').pop() ?? 'file', url: entry.signedUrl }] : [],
          ),
        )
      })
    return () => {
      cancelled = true
    }
  }, [isOpen, request.file_paths])

  const quotationValue = quotation.trim() === '' ? null : Number(quotation)
  const quotationInvalid = quotationValue !== null && (!Number.isFinite(quotationValue) || quotationValue < 0)

  const handleSave = async () => {
    if (quotationInvalid) return
    setSaving(true)
    const ok = await onSave(request.id, {
      status,
      priority,
      quotation_amount: quotationValue,
      internal_notes: notes.trim() || null,
    })
    setSaving(false)
    if (ok) onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-poppins)]">Request #{request.request_number}</DialogTitle>
          <DialogDescription>{request.project_title}</DialogDescription>
        </DialogHeader>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
          {/* Customer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className={labelClass}>Customer</p>
              <p className="text-sm font-medium text-foreground font-[family-name:var(--font-poppins)]">{request.name}</p>
              <a href={`mailto:${request.email}`} className="block text-sm text-primary hover:underline">
                {request.email}
              </a>
              <a href={`tel:${request.phone.replace(/[^+\d]/g, '')}`} className="block text-sm text-primary hover:underline">
                {request.phone}
              </a>
            </div>
            <div>
              <p className={labelClass}>Submitted</p>
              <p className="text-sm font-medium text-foreground font-[family-name:var(--font-poppins)]">{formatDate(request.created_at)}</p>
              <p className="text-sm text-muted-foreground mt-1">Budget: {budgetLabel(request.budget)}</p>
              <p className="text-sm text-muted-foreground">Deadline: {request.deadline ? formatDate(request.deadline) : 'None'}</p>
            </div>
          </div>

          {/* Project */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-3 font-[family-name:var(--font-poppins)]">Project Details</h3>
            <p className="text-sm text-foreground whitespace-pre-wrap bg-muted/50 p-3 rounded-lg">{request.description}</p>

            {request.file_paths.length > 0 && (
              <div className="mt-4">
                <p className={labelClass}>Attachments</p>
                {files.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Loading attachments…</p>
                ) : (
                  <ul className="space-y-1">
                    {files.map((file) => (
                      <li key={file.url}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                          <Paperclip className="w-4 h-4" />
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Admin controls */}
          <div className="border-t border-border pt-6 space-y-4">
            <h3 className="font-semibold text-foreground font-[family-name:var(--font-poppins)]">Manage</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="request-status" className={labelClass}>Status</label>
                <select id="request-status" value={status} onChange={(e) => setStatus(e.target.value as RequestStatus)} className={selectClass}>
                  {REQUEST_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="request-priority" className={labelClass}>Priority</label>
                <select id="request-priority" value={priority} onChange={(e) => setPriority(e.target.value as RequestPriority)} className={selectClass}>
                  {REQUEST_PRIORITIES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="request-quotation" className={labelClass}>Quotation Amount (₹)</label>
              <Input id="request-quotation" type="number" min={0} step="0.01" value={quotation} onChange={(e) => setQuotation(e.target.value)} placeholder="Not quoted yet" aria-invalid={quotationInvalid} />
              {quotationInvalid && <p className="text-xs text-destructive mt-1">Enter a valid amount</p>}
            </div>

            <div>
              <label htmlFor="request-notes" className={labelClass}>Internal Notes</label>
              <Textarea id="request-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Only visible to you" />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-border">
            <Button onClick={handleSave} disabled={saving || quotationInvalid} className="bg-primary hover:bg-primary/90 text-primary-foreground font-[family-name:var(--font-poppins)]">
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
            <Button variant="ghost" onClick={onClose} className="ml-auto font-[family-name:var(--font-poppins)]">
              Close
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
