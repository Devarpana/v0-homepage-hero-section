import { errorMessage, requireSupabase } from '@/lib/supabase'

export const PRODUCT_IMAGE_BUCKET = 'product-images'

export const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const
export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const REQUEST_STATUSES = ['new', 'reviewing', 'quoted', 'approved', 'printing', 'completed'] as const
export type RequestStatus = (typeof REQUEST_STATUSES)[number]

export const REQUEST_PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const
export type RequestPriority = (typeof REQUEST_PRIORITIES)[number]

/** A raw `products` row as the admin sees it (all columns, including hidden/inactive products). */
export interface AdminProduct {
  id: string | number
  name: string
  category: string | null
  price: number | string | null
  compare_at_price: number | string | null
  stock: number | null
  description: string | null
  specs: string | null
  status: string | null
  visibility: string | null
  featured: boolean | null
  trending: boolean | null
  image_url: string | null
  gallery_urls: string[] | null
  featured_image_url: string | null
  created_at: string
}

export interface AdminOrderItem {
  id: string
  product_name: string
  unit_price: number | string
  quantity: number
  color: string | null
}

export interface AdminOrder {
  id: string
  order_number: number
  customer_name: string
  email: string
  phone: string
  address_line: string
  city: string
  state: string
  pincode: string
  notes: string | null
  total: number | string
  status: OrderStatus
  created_at: string
  order_items: AdminOrderItem[]
}

export interface AdminCustomRequest {
  id: string
  request_number: number
  name: string
  email: string
  phone: string
  project_title: string
  description: string
  budget: string | null
  deadline: string | null
  file_paths: string[]
  priority: RequestPriority
  status: RequestStatus
  quotation_amount: number | string | null
  internal_notes: string | null
  created_at: string
}

export interface AdminMessage {
  id: string
  name: string
  email: string
  message: string
  handled: boolean
  created_at: string
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

/**
 * Admin screens read columns the 0001 migration adds. If it has not been run, Postgres reports a
 * missing column or table; say what to do about it instead of showing a raw database error.
 */
export function adminError(error: unknown): string {
  const message = errorMessage(error)
  if (/column|schema cache|does not exist|relation/i.test(message)) {
    return `${message} The database looks out of date: run supabase/migrations/0001_storefront.sql in the Supabase SQL editor.`
  }
  if (/row-level security|permission denied/i.test(message)) {
    return `${message} Make sure your account is in the admins table (see the end of supabase/migrations/0001_storefront.sql).`
  }
  return message
}

const publicUrlMarker = `/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}/`

/** Uploads one product photo and returns its public URL. */
export async function uploadProductImage(file: File): Promise<string> {
  const supabase = requireSupabase()
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/^\.+/, '').slice(-80) || 'image'
  const path = `${crypto.randomUUID()}-${safeName}`

  const { error } = await supabase.storage.from(PRODUCT_IMAGE_BUCKET).upload(path, file, { contentType: file.type })
  if (error) throw new Error(`Could not upload ${file.name}: ${error.message}`)

  return supabase.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(path).data.publicUrl
}

/** Best-effort cleanup of replaced or deleted product photos. Never throws. */
export async function removeProductImages(urls: (string | null | undefined)[]): Promise<void> {
  const paths = urls
    .filter((url): url is string => Boolean(url))
    .map((url) => {
      const i = url.indexOf(publicUrlMarker)
      return i === -1 ? null : decodeURIComponent(url.slice(i + publicUrlMarker.length))
    })
    .filter((path): path is string => Boolean(path))

  if (paths.length === 0) return
  try {
    await requireSupabase().storage.from(PRODUCT_IMAGE_BUCKET).remove(paths)
  } catch {
    // An orphaned file costs nothing; failing the user's action over it would.
  }
}
