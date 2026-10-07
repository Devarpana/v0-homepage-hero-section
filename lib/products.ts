import { supabase } from '@/lib/supabase'

// A product as the storefront sees it. Everything here comes from the admin panel (Supabase).
export type Product = {
  id: string
  name: string
  category: string
  description: string | null
  price: number
  stock: number | null
  image?: string
  images: string[]
  isFeatured: boolean
  isTrending: boolean
  isSignature: boolean
  isCustomizable: boolean
}

export const categories = [
  { slug: 'daily-essentials', name: 'Daily Essentials', description: 'Smart, useful pieces for your desk and everyday routine' },
  { slug: 'home-decor', name: 'Home Decor', description: 'Planters, lamps and shelves that give a room character' },
  { slug: 'toys', name: 'Toys', description: 'Articulated, fidget-friendly and fun for every age' },
  { slug: 'custom', name: 'Custom Creations', description: 'Nameplates, gifts and personalised pieces made for you' },
]

// Category names as stored by the admin form, keyed by URL slug.
export const categoryNameBySlug: Record<string, string> = {
  'daily-essentials': 'Daily Essentials',
  'home-decor': 'Home Decor',
  toys: 'Toys',
  custom: 'Custom',
}

export function categorySlug(name: string) {
  return Object.keys(categoryNameBySlug).find((slug) => categoryNameBySlug[slug] === name) ?? 'all'
}

export function formatPrice(price: number) {
  return `₹${price.toLocaleString('en-IN')}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(row: any): Product {
  return {
    id: String(row.id),
    name: row.name,
    category: row.category,
    description: row.description ?? null,
    price: Number(row.price ?? 0),
    stock: row.stock ?? null,
    images: [],
    isFeatured: Boolean(row.is_featured),
    isTrending: Boolean(row.is_trending),
    isSignature: Boolean(row.is_signature),
    isCustomizable: Boolean(row.is_customizable),
  }
}

// Products hidden in admin (status "hidden") never reach the storefront.
function isVisible(row: { status?: string | null }) {
  return row.status !== 'hidden'
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to load products', error.message)
    return []
  }
  return (data ?? []).filter(isVisible).map(toProduct)
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).maybeSingle()
  if (error || !data || !isVisible(data)) return null
  return toProduct(data)
}
