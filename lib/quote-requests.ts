import { supabase } from '@/lib/supabase'

// Uploaded files go to a private bucket: visitors can add files but never read or list them.
export const QUOTE_FILES_BUCKET = 'custom-orders'

export const MAX_FILES = 5
export const MAX_FILE_MB = 20
export const ACCEPTED_FILES = '.stl,.step,.stp,.obj,.3mf,.pdf,image/*'

export type QuoteRequest = {
  service: string | null // service slug, or null for "Not sure yet"
  serviceName: string
  description: string
  material: string
  quantity: number
  deadline: string
  budget: string
  name: string
  email: string
  phone: string
  contactPreference: string
}

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, '-').slice(-80)
}

// Uploads the files, then saves the request. Returns a short reference to show the customer.
export async function submitQuoteRequest(request: QuoteRequest, files: File[]) {
  const id = crypto.randomUUID()

  const filePaths: string[] = []
  for (const [index, file] of files.entries()) {
    const path = `requests/${id}/${index + 1}-${safeFileName(file.name)}`
    const { error } = await supabase.storage.from(QUOTE_FILES_BUCKET).upload(path, file, { upsert: false })
    if (error) throw new Error(`Could not upload ${file.name}. Please try again or send it to us later.`)
    filePaths.push(path)
  }

  const { error } = await supabase.from('custom_requests').insert({
    id,
    customer_name: request.name,
    email: request.email,
    phone: request.phone,
    contact_preference: request.contactPreference,
    project_title: `${request.serviceName} request`,
    service: request.service,
    description: request.description,
    material: request.material,
    quantity: request.quantity,
    deadline: request.deadline || null,
    budget: request.budget || null,
    file_paths: filePaths,
  })
  if (error) throw new Error('Something went wrong while sending your request. Please try again.')

  return id.slice(0, 8).toUpperCase()
}
