'use client'

import { useEffect, useState } from 'react'
import { FileText, Loader2, Mail, MessageCircle, Paperclip, Phone, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  REQUEST_STATUSES,
  formatDate,
  getFileLink,
  getQuoteRequests,
  updateQuoteRequest,
  type QuoteRequest,
  type RequestStatus,
} from '@/lib/admin-requests'
import { cn } from '@/lib/utils'

const statusStyle: Record<RequestStatus, string> = {
  new: 'bg-orange-100 text-orange-800',
  reviewing: 'bg-blue-100 text-blue-800',
  quoted: 'bg-purple-100 text-purple-800',
  approved: 'bg-teal-100 text-teal-800',
  printing: 'bg-indigo-100 text-indigo-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-200 text-gray-700',
}

export default function CustomRequestsPage() {
  const [requests, setRequests] = useState<QuoteRequest[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    getQuoteRequests()
      .then(setRequests)
      .catch((e) => setError(e.message))
  }, [])

  const save = (updated: QuoteRequest) => setRequests((list) => list?.map((r) => (r.id === updated.id ? updated : r)) ?? null)

  const q = search.toLowerCase()
  const shown = (requests ?? []).filter(
    (r) =>
      (statusFilter === 'all' || r.status === statusFilter) &&
      [r.customer_name, r.email, r.phone, r.service, r.description].some((v) => v?.toLowerCase().includes(q))
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Quote requests</h1>
        <p className="mt-2 text-muted-foreground">Everything customers sent from the “Get a quote” page.</p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, phone, email or service…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'all')}
          className="h-10 rounded-md border border-input bg-white px-3 text-sm capitalize"
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          {REQUEST_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">Could not load requests: {error}</p>
      ) : !requests ? (
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      ) : shown.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-muted-foreground">
          <FileText className="mx-auto mb-3 h-8 w-8" />
          {requests.length === 0 ? 'No quote requests yet.' : 'No requests match your search.'}
        </div>
      ) : (
        <ul className="space-y-3">
          {shown.map((r) => (
            <RequestCard key={r.id} request={r} open={openId === r.id} onToggle={() => setOpenId(openId === r.id ? null : r.id)} onSaved={save} />
          ))}
        </ul>
      )}
    </div>
  )
}

function RequestCard({
  request: r,
  open,
  onToggle,
  onSaved,
}: {
  request: QuoteRequest
  open: boolean
  onToggle: () => void
  onSaved: (r: QuoteRequest) => void
}) {
  const [status, setStatus] = useState<RequestStatus>(r.status)
  const [amount, setAmount] = useState(r.quotation_amount?.toString() ?? '')
  const [notes, setNotes] = useState(r.internal_notes ?? '')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const digits = r.phone?.replace(/\D/g, '') ?? ''
  const whatsapp = digits ? `https://wa.me/${digits.length === 10 ? '91' + digits : digits}` : null

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    const fields = { status, quotation_amount: amount ? Number(amount) : null, internal_notes: notes || null }
    try {
      await updateQuoteRequest(r.id, fields)
      onSaved({ ...r, ...fields })
      setMessage('Saved')
    } catch (e) {
      setMessage(`Could not save: ${(e as Error).message}`)
    }
    setSaving(false)
  }

  const openFile = async (path: string) => {
    try {
      window.open(await getFileLink(path), '_blank', 'noopener')
    } catch (e) {
      alert(`Could not open the file: ${(e as Error).message}`)
    }
  }

  return (
    <li className="rounded-2xl border border-border bg-white">
      <button type="button" onClick={onToggle} className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 p-5 text-left">
        <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold capitalize', statusStyle[r.status] ?? statusStyle.new)}>{r.status}</span>
        <span className="font-semibold text-foreground">{r.customer_name}</span>
        <span className="text-sm text-muted-foreground">{r.service || r.project_title}</span>
        <span className="ml-auto text-sm text-muted-foreground">{formatDate(r.created_at)}</span>
      </button>

      {open && (
        <div className="grid gap-6 border-t border-border p-5 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-4 text-sm">
            <div className="flex flex-wrap gap-2">
              {whatsapp && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 font-medium text-green-800 hover:bg-green-100">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              )}
              {r.phone && (
                <a href={`tel:${r.phone}`} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 font-medium hover:bg-gray-200">
                  <Phone className="h-4 w-4" /> {r.phone}
                </a>
              )}
              <a href={`mailto:${r.email}`} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 font-medium hover:bg-gray-200">
                <Mail className="h-4 w-4" /> {r.email}
              </a>
            </div>
            {r.contact_preference && <p className="text-muted-foreground">Prefers: {r.contact_preference}</p>}
            {r.description && <p className="whitespace-pre-wrap leading-relaxed text-foreground">{r.description}</p>}
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
              {[
                ['Material', r.material],
                ['Quantity', r.quantity],
                ['Needed by', r.deadline && formatDate(r.deadline)],
                ['Budget', r.budget],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
                  <dd className="font-medium">{value || '—'}</dd>
                </div>
              ))}
            </dl>
            {r.file_paths.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Files</p>
                {r.file_paths.map((path) => (
                  <button key={path} type="button" onClick={() => openFile(path)} className="flex items-center gap-1.5 font-medium text-primary hover:text-accent">
                    <Paperclip className="h-4 w-4" /> {path.split('/').pop()?.replace(/^\d+-/, '')}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3 rounded-xl bg-muted/60 p-4">
            <label className="block text-sm font-medium">
              Status
              <select value={status} onChange={(e) => setStatus(e.target.value as RequestStatus)} className="mt-1 h-10 w-full rounded-md border border-input bg-white px-3 capitalize">
                {REQUEST_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium">
              Quoted price (₹)
              <Input type="number" min={0} value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 bg-white" />
            </label>
            <label className="block text-sm font-medium">
              Private notes
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1 bg-white" />
            </label>
            <div className="flex items-center gap-3">
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save
              </Button>
              {message && <span className="text-sm text-muted-foreground">{message}</span>}
            </div>
          </div>
        </div>
      )}
    </li>
  )
}
