'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { errorMessage, isSupabaseConfigured, requireSupabase } from '@/lib/supabase'

const label = 'block text-sm font-semibold text-gray-900 font-[family-name:var(--font-poppins)]'

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' })
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return

    // Honeypot: bots fill the hidden field. Pretend it worked and send nothing.
    if (form.website) {
      setSent(true)
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      const { error: insertError } = await requireSupabase().from('contact_messages').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      })
      if (insertError) throw insertError
      setSent(true)
      setForm({ name: '', email: '', message: '', website: '' })
    } catch (err) {
      setError(errorMessage(err, "We couldn't send your message. Please try again."))
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div role="status" className="text-center py-12 border border-green-200 bg-green-50 rounded-2xl px-6">
        <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">Message sent</h2>
        <p className="mt-2 text-gray-600 font-[family-name:var(--font-inter)]">Thanks for reaching out. We&apos;ll reply within 24 hours.</p>
        <Button variant="outline" className="mt-6 rounded-full" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="contact-name" className={label}>Name</label>
          <Input id="contact-name" required maxLength={200} autoComplete="name" value={form.name} onChange={update('name')} />
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className={label}>Email</label>
          <Input id="contact-email" type="email" required maxLength={320} autoComplete="email" value={form.email} onChange={update('email')} />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className={label}>Message</label>
        <Textarea id="contact-message" required rows={6} maxLength={5000} value={form.message} onChange={update('message')} />
      </div>

      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
        </label>
      </div>

      {!isSupabaseConfigured && (
        <p role="alert" className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
          Messages can&apos;t be sent yet because the store database isn&apos;t connected.
        </p>
      )}
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={submitting || !isSupabaseConfigured}
        className="rounded-full px-8 h-12 font-[family-name:var(--font-poppins)]"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Sending…
          </>
        ) : (
          'Send message'
        )}
      </Button>
    </form>
  )
}
