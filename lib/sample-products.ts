// Sample catalogue used by the storefront until products are loaded from Supabase.
// `image` is left empty on purpose: <ProductImage> shows a branded placeholder
// until real product photos are added.

export type SampleProduct = {
  id: string
  name: string
  category: string
  price: number
  image?: string
  isTrending?: boolean
  isSignature?: boolean
}

export const categories = [
  { slug: 'daily-essentials', name: 'Daily Essentials', description: 'Smart, useful pieces for your desk and everyday routine' },
  { slug: 'home-decor', name: 'Home Decor', description: 'Planters, lamps and shelves that give a room character' },
  { slug: 'toys', name: 'Toys', description: 'Articulated, fidget-friendly and fun for every age' },
  { slug: 'custom', name: 'Custom Creations', description: 'Nameplates, gifts and personalised pieces made for you' },
]

export const sampleProducts: SampleProduct[] = [
  { id: '1', name: 'Modular Desk Organizer', category: 'Daily Essentials', price: 1299, isTrending: true },
  { id: '2', name: 'Phone Stand Pro', category: 'Daily Essentials', price: 799, isTrending: true },
  { id: '3', name: 'Geometric Planter', category: 'Home Decor', price: 1599, isTrending: true },
  { id: '4', name: 'Articulated Dragon', category: 'Toys', price: 4999, isTrending: true, isSignature: true },
  { id: '5', name: 'Headphone Holder', category: 'Daily Essentials', price: 549 },
  { id: '6', name: 'Custom Nameplate', category: 'Custom', price: 2299, isSignature: true },
  { id: '7', name: 'Cable Organizer Pro', category: 'Daily Essentials', price: 899, isTrending: true },
  { id: '8', name: 'Decorative Lamp Base', category: 'Home Decor', price: 2899, isSignature: true },
  { id: '9', name: 'Wall Shelf Bracket', category: 'Home Decor', price: 1199 },
  { id: '10', name: 'Fidget Toy Spinner', category: 'Toys', price: 499, isTrending: true },
  { id: '11', name: 'Articulated Keychain', category: 'Toys', price: 399 },
  { id: '12', name: 'Designer Pen Holder', category: 'Daily Essentials', price: 1099, isTrending: true },
]

export function formatPrice(price: number) {
  return `₹${price.toLocaleString('en-IN')}`
}
