import type { Product } from '@/lib/products'

/**
 * Demo catalogue shown only when Supabase is not configured (local dev, previews).
 * Mirrors supabase/seed.sql. Never used when a database is connected.
 */
const base = {
  compareAtPrice: null,
  specs: [],
  stock: 25,
  image: null,
  gallery: [],
  featuredImage: null,
  featured: false,
  trending: false,
}

export const SEED_PRODUCTS: Product[] = [
  { ...base, id: '1', name: 'Modular Desk Organizer', category: 'Daily Essentials', price: 1299, trending: true,
    specs: [
      { label: 'Dimensions', value: '15 × 8 × 4 cm' },
      { label: 'Weight', value: '220g' },
      { label: 'Print Time', value: '8 Hours' },
    ],
    description: 'Keep your workspace organized and stylish with a precision 3D-printed modular organizer. Customizable to your needs and built to last.' },
  { ...base, id: '2', name: 'Phone Stand Pro', category: 'Daily Essentials', price: 799,
    description: 'A sturdy, adjustable phone stand printed in durable PLA+.' },
  { ...base, id: '3', name: 'Geometric Planter', category: 'Home Decor', price: 1599,
    description: 'A faceted planter that turns any shelf into a statement piece.' },
  { ...base, id: '4', name: 'Articulated Dragon', category: 'Toys', price: 4999, trending: true, featured: true,
    description: 'A fully articulated dragon, printed in one piece with flexible joints. Each segment moves fluidly and is finished with meticulous care.' },
  { ...base, id: '5', name: 'Headphone Holder', category: 'Daily Essentials', price: 549,
    description: 'Free up your desk with a clean, minimal headphone holder.' },
  { ...base, id: '6', name: 'Custom Nameplate', category: 'Custom', price: 2299,
    description: 'A personalised nameplate for your desk or door. Tell us the text and colours.' },
  { ...base, id: '7', name: 'Cable Organizer Pro', category: 'Daily Essentials', price: 899, trending: true,
    description: 'Tame desk cable clutter with snap-in channels for up to six cables.' },
  { ...base, id: '8', name: 'Decorative Lamp Base', category: 'Home Decor', price: 2899,
    description: 'A translucent lamp base that diffuses light into warm patterns.' },
  { ...base, id: '9', name: 'Wall Shelf Bracket', category: 'Home Decor', price: 1199,
    description: 'Minimal floating shelf brackets, sold as a pair.' },
  { ...base, id: '10', name: 'Fidget Toy Spinner', category: 'Toys', price: 499, trending: true,
    description: 'A smooth, quiet spinner with a long spin time.' },
  { ...base, id: '11', name: 'Articulated Keychain', category: 'Toys', price: 399,
    description: 'A tiny articulated keychain companion.' },
  { ...base, id: '12', name: 'Designer Pen Holder', category: 'Daily Essentials', price: 1099,
    description: 'A sculptural pen holder for the tidy desk.' },
]
