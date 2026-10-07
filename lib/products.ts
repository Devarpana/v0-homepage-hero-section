import { supabase } from '@/lib/supabase'

// A colour the product is sold in, set in admin. `image` shows the product in that colour.
export type ProductColor = { name: string; hex: string; image?: string | null }

// A product as the storefront sees it. Everything here comes from the admin panel (Supabase).
export type Product = {
  id: string
  name: string
  category: string
  description: string | null
  price: number
  stock: number | null
  image?: string // main image, used on product cards
  featuredImage?: string // used for the homepage hero, falls back to the main image
  images: string[] // main image first, then the gallery
  colors: ProductColor[] // empty when the admin hasn't added any colours
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

export function parseColors(value: unknown): ProductColor[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((c) => c && typeof c.name === 'string' && c.name.trim() && typeof c.hex === 'string')
    .map((c) => ({ name: c.name.trim(), hex: c.hex, image: typeof c.image === 'string' ? c.image : null }))
}

type ImageRow = { image_url: string; image_type: string; created_at?: string | null }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(row: any): Product {
  const rows: ImageRow[] = [...(row.product_images ?? [])].sort((a: ImageRow, b: ImageRow) =>
    String(a.created_at ?? '').localeCompare(String(b.created_at ?? ''))
  )
  const urls = (type: string) => rows.filter((r) => r.image_type === type).map((r) => r.image_url)
  const main = urls('main').at(-1) ?? urls('gallery')[0] ?? urls('featured').at(-1)
  const images = [main, ...urls('gallery')].filter((url, i, all): url is string => Boolean(url) && all.indexOf(url) === i)

  return {
    id: String(row.id),
    name: row.name,
    category: row.category,
    description: row.description ?? null,
    price: Number(row.price ?? 0),
    stock: row.stock ?? null,
    image: main,
    featuredImage: urls('featured').at(-1) ?? main,
    images,
    colors: parseColors(row.colors),
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

const PRODUCT_COLUMNS = '*, product_images(image_url, image_type, created_at)'

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_COLUMNS)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to load products', error.message)
    return []
  }
  return (data ?? []).filter(isVisible).map(toProduct)
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase.from('products').select(PRODUCT_COLUMNS).eq('id', id).maybeSingle()
  if (error || !data || !isVisible(data)) return null
  return toProduct(data)
}
