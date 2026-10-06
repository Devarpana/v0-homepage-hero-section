'use client'

import { Loader2, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { requireSupabase } from '@/lib/supabase'
import { adminError, formatDate, type AdminMessage } from '@/lib/admin'
import { useAdminQuery } from '@/hooks/use-admin-query'

export default function MessagesPage() {
  const { data, setData, loading, error, reload } = useAdminQuery<AdminMessage[]>(() =>
    requireSupabase().from('contact_messages').select('*').order('created_at', { ascending: false }),
  )
  const messages = data ?? []

  const setHandled = async (id: string, handled: boolean) => {
    const { error: updateError } = await requireSupabase().from('contact_messages').update({ handled }).eq('id', id)
    if (updateError) {
      toast.error('Could not update the message', { description: adminError(updateError) })
      return
    }
    setData((current) => (current ?? []).map((m) => (m.id === id ? { ...m, handled } : m)))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-[family-name:var(--font-poppins)]">Messages</h1>
        <p className="text-muted-foreground mt-2">Messages sent from the contact page</p>
      </div>

      {error ? (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          <p>{error}</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={reload}>
            Try again
          </Button>
        </div>
      ) : loading && !data ? (
        <div className="flex justify-center py-12" role="status" aria-label="Loading messages">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : messages.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No messages yet</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={`p-6 ${message.handled ? 'opacity-60' : ''}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground font-[family-name:var(--font-poppins)]">{message.name}</p>
                  <a href={`mailto:${message.email}`} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                    <Mail className="w-3.5 h-3.5" />
                    {message.email}
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(message.created_at)}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setHandled(message.id, !message.handled)}>
                  {message.handled ? 'Mark as unhandled' : 'Mark as handled'}
                </Button>
              </div>
              <p className="mt-4 text-sm text-foreground whitespace-pre-wrap">{message.message}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
