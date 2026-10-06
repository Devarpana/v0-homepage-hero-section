'use client'

import { useState } from 'react'
import { Loader2, Search } from 'lucide-react'
import { toast } from 'sonner'
import { AdminCustomRequestsTable } from '@/components/admin-custom-requests-table'
import type { CustomRequestPatch } from '@/components/custom-request-detail'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { requireSupabase } from '@/lib/supabase'
import { adminError, type AdminCustomRequest } from '@/lib/admin'
import { useAdminQuery } from '@/hooks/use-admin-query'

export default function CustomRequestsPage() {
  const { data, setData, loading, error, reload } = useAdminQuery<AdminCustomRequest[]>(() =>
    requireSupabase().from('custom_requests').select('*').order('created_at', { ascending: false }),
  )
  const [searchQuery, setSearchQuery] = useState('')

  const requests = data ?? []
  const q = searchQuery.trim().toLowerCase()
  const filteredRequests = requests.filter(
    (r) =>
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.project_title.toLowerCase().includes(q) ||
      String(r.request_number).includes(q.replace(/^#/, '')),
  )

  const handleSave = async (id: string, patch: CustomRequestPatch): Promise<boolean> => {
    const { error: updateError } = await requireSupabase().from('custom_requests').update(patch).eq('id', id)
    if (updateError) {
      toast.error('Could not save changes', { description: adminError(updateError) })
      return false
    }
    setData((current) => (current ?? []).map((r) => (r.id === id ? { ...r, ...patch } : r)))
    toast.success('Request updated')
    return true
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-[family-name:var(--font-poppins)]">Custom Requests</h1>
        <p className="text-muted-foreground mt-2">Manage and track custom order inquiries</p>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by customer, email, project, or number..."
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
        <div className="flex justify-center py-12" role="status" aria-label="Loading requests">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : filteredRequests.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">{requests.length === 0 ? 'No custom requests yet' : 'No requests match your search'}</p>
      ) : (
        <AdminCustomRequestsTable requests={filteredRequests} onSave={handleSave} />
      )}
    </div>
  )
}
