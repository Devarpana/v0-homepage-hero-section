import { supabase } from '@/lib/supabase'
import { QUOTE_FILES_BUCKET } from '@/lib/quote-requests'

export const REQUEST_STATUSES = ['new', 'reviewing', 'quoted', 'approved', 'printing', 'completed', 'cancelled'] as const
export type RequestStatus = (typeof REQUEST_STATUSES)[number]

export interface QuoteRequest {
  id: string
  customer_name: string
  email: string
  phone: string | null
  contact_preference: string | null
  project_title: string | null
  service: string | null
  description: string | null
  material: string | null
  quantity: number | null
  deadline: string | null
  budget: string | null
  status: RequestStatus
  quotation_amount: number | null
  internal_notes: string | null
  file_paths: string[]
  created_at: string
}

/** Every quote request, newest first. Only admins can read these (database rules in 006). */
export async function getQuoteRequests() {
  const { data, error } = await supabase.from('custom_requests').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as QuoteRequest[]
}

export async function updateQuoteRequest(id: string, fields: Partial<Pick<QuoteRequest, 'status' | 'quotation_amount' | 'internal_notes'>>) {
  const { error } = await supabase.from('custom_requests').update(fields).eq('id', id)
  if (error) throw error
}

/** Files are private, so each download gets a link that works for one hour. */
export async function getFileLink(path: string) {
  const { data, error } = await supabase.storage.from(QUOTE_FILES_BUCKET).createSignedUrl(path, 3600)
  if (error) throw error
  return data.signedUrl
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
