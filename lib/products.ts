import { supabase } from '@/lib/supabase'
import { SEED_PRODUCTS } from '@/lib/seed-products'

export const CATEGORIES = ['Daily Essentials', 'Home Decor', 'Toys', 'Custom'] as const

/** Filament colours offered on every product page. Stored on the cart line and the order. */
export const PRODUCT_COLORS = [
  { name: 'Blue', value: 'blue', swatch: 'bg-blue-500' },
  { name: 'Black', value: 'black', swatch: 'bg-gray-900' },
  { name: 'White', value: 'white', swatch: 'bg-gray-100 border border-gray-300' },
  { name: 'Orange', value: 'orange', swatch: 'bg-orange-400' },
] as const

export interface Spec {
  label: string
  value: string
}

export interface Product {
  id: string
  name: string
  category: string
  price: number
  compareAtPrice: number | null
  stock: number
  description: string
  specs: Spec[]
  image: string | null
  gallery: string[]
  featuredImage: string | null
  featured: boolean
  trending: boolean
}

/** Claims already made in the FAQ that hold for everything we print. Per-product facts live in `specs`. */
export const STORE_WIDE_SPECS: Spec[] = [
  { label: 'Material', value: 'Premium PLA+' },
  { label: 'Layer Height', value: '0.2mm' },
  { label: 'Color Options', value: '4 Colors + Custom' },
  { label: 'Warranty', value: '1 Year' },
]

export interface Catalog {
  products: Product[]
  /** True when the database is configured but the request failed. */
  failed: boolean
}

// Only the columns we read; any of the newer ones may be missing if the migration has not run.
interface ProductRow {
  id: string | number
  name: string
  category?: string | null
  price?: number | string | null
  compare_at_price?: number | string | null
  stock?: number | null
  description?: string | null
  specs?: string | null
  status?: string | null
  visibility?: string | null
  image_url?: string | null
  gallery_urls?: string[] | null
  featured_image_url?: string | null
  featured?: boolean | null
  trending?: boolean | null
}

export function formatPrice(amount: number): string {
  // Fixed locale so server and client render identical strings (no hydration mismatch).
  return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
}

/** "Label: value" per line, as typed into the admin form. Lines without a colon are ignored. */
export function parseSpecs(text: string | null | undefined): Spec[] {
  const specs: Spec[] = []
  for (const line of (text ?? '').split('\n')) {
    const i = line.indexOf(':')
    if (i <= 0) continue
    const label = line.slice(0, i).trim()
    const value = line.slice(i + 1).trim()
    if (label && value) specs.push({ label, value })
  }
  return specs
}

function toNumber(value: unknown): number {
  const n = typeof value === 'string' ? parseFloat(value) : typeof value === 'number' ? value : 0
  return Number.isFinite(n) ? n : 0
}

export function rowToProduct(row: ProductRow): Product {
  const compareAt = row.compare_at_price == null ? null : toNumber(row.compare_at_price)
  const price = toNumber(row.price)
  return {
    id: String(row.id),
    name: row.name,
    category: row.category || 'Daily Essentials',
    price,
    compareAtPrice: compareAt && compareAt > price ? compareAt : null,
    stock: Math.max(0, row.stock ?? 0),
    description: row.description ?? '',
    specs: parseSpecs(row.specs),
    image: row.image_url || null,
    gallery: row.gallery_urls ?? [],
    featuredImage: row.featured_image_url || null,
    featured: Boolean(row.featured),
    trending: Boolean(row.trending),
  }
}

/** Mirrors the RLS rule, so the storefront also behaves for a signed-in admin. */
function isStorefrontVisible(row: ProductRow): boolean {
  return (row.visibility ?? 'public') === 'public' && (row.status ?? 'active') === 'active'
}

export async function getCatalog(): Promise<Catalog> {
  if (!supabase) return { products: SEED_PRODUCTS, failed: false }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to load products:', error.message)
    return { products: [], failed: true }
  }

  return {
    products: ((data ?? []) as ProductRow[]).filter(isStorefrontVisible).map(rowToProduct),
    failed: false,
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!supabase) return SEED_PRODUCTS.find((p) => p.id === id) ?? null

  const { data, error } = await supabase.from('products').select('*').eq('id', id).maybeSingle()

  // An id that is not valid for the column type (e.g. "abc" for a uuid) is just "not found".
  if (error || !data || !isStorefrontVisible(data as ProductRow)) return null
  return rowToProduct(data as ProductRow)
}

/** Same-category products first, topped up with others, never including `product` itself. */
export function pickRelated(product: Product, all: Product[], limit = 4): Product[] {
  const others = all.filter((p) => p.id !== product.id)
  const sameCategory = others.filter((p) => p.category === product.category)
  const rest = others.filter((p) => p.category !== product.category)
  return [...sameCategory, ...rest].slice(0, limit)
}

// Placeholder artwork for products that have no photo yet. Deterministic, so the server and
// client render the same gradient for the same product.
const GRADIENTS = [
  'bg-gradient-to-br from-blue-300 to-blue-100',
  'bg-gradient-to-br from-purple-300 to-purple-100',
  'bg-gradient-to-br from-green-300 to-green-100',
  'bg-gradient-to-br from-orange-300 to-orange-100',
  'bg-gradient-to-br from-pink-300 to-pink-100',
  'bg-gradient-to-br from-indigo-300 to-indigo-100',
  'bg-gradient-to-br from-teal-300 to-teal-100',
  'bg-gradient-to-br from-yellow-300 to-yellow-100',
  'bg-gradient-to-br from-rose-300 to-rose-100',
  'bg-gradient-to-br from-cyan-300 to-cyan-100',
]

export function gradientFor(id: string): string {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  return GRADIENTS[hash % GRADIENTS.length]
}
