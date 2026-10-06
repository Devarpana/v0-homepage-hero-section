'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { FeaturedProductShowcase } from '@/components/featured-product-showcase'
import { EmptyState } from '@/components/empty-state'
import { CATEGORIES, type Product } from '@/lib/products'

type Sort = 'newest' | 'price-asc' | 'price-desc'

const SORTS: { value: Sort; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

interface ShopCatalogProps {
  products: Product[]
  /** The database is configured but the product request failed. */
  failed: boolean
}

export function ShopCatalog({ products, failed }: ShopCatalogProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [category, setCategory] = useState(searchParams.get('category') ?? 'All')
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [sort, setSort] = useState<Sort>('newest')
  const searchRef = useRef<HTMLInputElement>(null)

  // The navbar's search icon links to /shop#shop-search.
  useEffect(() => {
    if (window.location.hash === '#shop-search') searchRef.current?.focus()
  }, [])

  // Keep the URL shareable (/shop?category=Toys&q=dragon) without adding history entries.
  useEffect(() => {
    const params = new URLSearchParams()
    if (category !== 'All') params.set('category', category)
    if (query.trim()) params.set('q', query.trim())
    const qs = params.toString()
    if (qs === searchParams.toString()) return
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- searchParams is only read to skip no-op replaces
  }, [category, query, pathname, router])

  // Fixed categories first, then any others that exist in the data.
  const categories = useMemo(() => {
    const known = new Set<string>(CATEGORIES)
    const extra = [...new Set(products.map((p) => p.category))].filter((c) => !known.has(c))
    return ['All', ...CATEGORIES, ...extra]
  }, [products])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = products.filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        (!q || [p.name, p.category, p.description].some((field) => field.toLowerCase().includes(q))),
    )
    if (sort === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price)
    return filtered // already newest-first from the database
  }, [products, category, query, sort])

  const isFiltering = category !== 'All' || query.trim() !== '' || sort !== 'newest'
  const featured = useMemo(() => products.find((p) => p.featured) ?? null, [products])
  const reset = () => {
    setCategory('All')
    setQuery('')
    setSort('newest')
  }

  const grid = (items: Product[], className = 'py-12') => (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ${className}`}>
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )

  return (
    <>
      <section className="w-full bg-white py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="shop-search"
              ref={searchRef}
              type="search"
              placeholder="Search products..."
              aria-label="Search products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-full border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-[family-name:var(--font-inter)] [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-3" role="group" aria-label="Filter by category">
              {categories.map((name) => (
                <motion.button
                  key={name}
                  type="button"
                  onClick={() => setCategory(name)}
                  aria-pressed={category === name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 font-[family-name:var(--font-poppins)] ${
                    category === name ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {name}
                </motion.button>
              ))}
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600 font-[family-name:var(--font-inter)]">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {failed ? (
            <EmptyState
              icon="⚠️"
              title="We couldn't load products"
              message="Something went wrong while loading the catalogue. Please refresh the page or try again in a moment."
              actionLabel="Refresh"
              onAction={() => router.refresh()}
            />
          ) : products.length === 0 ? (
            <EmptyState icon="🛍️" title="No products yet" message="New products are on their way. Please check back soon." />
          ) : visible.length === 0 ? (
            <EmptyState actionLabel="Clear filters" onAction={reset} />
          ) : (
            <>
              <p className="pt-8 text-sm text-gray-500 font-[family-name:var(--font-inter)]" aria-live="polite">
                {visible.length} {visible.length === 1 ? 'product' : 'products'}
              </p>
              {/* Unfiltered: keep the original editorial layout with the featured product mid-page. */}
              {!isFiltering && featured && visible.length > 4 ? (
                <>
                  {grid(visible.slice(0, 4))}
                  <FeaturedProductShowcase product={featured} />
                  {grid(visible.slice(4), 'py-12 pb-20')}
                </>
              ) : (
                grid(visible, 'py-12 pb-20')
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
