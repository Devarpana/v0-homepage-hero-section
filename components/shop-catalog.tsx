'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { PackageOpen, Search } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { categoryNameBySlug, type Product } from '@/lib/products'
import { cn } from '@/lib/utils'

const filters = [{ id: 'all', label: 'All' }].concat(
  Object.entries(categoryNameBySlug).map(([id, label]) => ({ id, label }))
)

interface ShopCatalogProps {
  products: Product[]
  initialCategory?: string
}

export function ShopCatalog({ products, initialCategory = 'all' }: ShopCatalogProps) {
  const [activeFilter, setActiveFilter] = useState(
    filters.some((f) => f.id === initialCategory) ? initialCategory : 'all'
  )
  const [searchQuery, setSearchQuery] = useState('')

  const visible = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return products.filter((product) => {
      if (activeFilter !== 'all' && product.category !== categoryNameBySlug[activeFilter]) return false
      if (!query) return true
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.description ?? '').toLowerCase().includes(query)
      )
    })
  }, [products, activeFilter, searchQuery])

  const selectFilter = (id: string) => {
    setActiveFilter(id)
    const url = new URL(window.location.href)
    if (id === 'all') url.searchParams.delete('category')
    else url.searchParams.set('category', id)
    window.history.replaceState(null, '', url)
  }

  return (
    <>
      <section className="w-full border-b border-border bg-white py-8">
        <div className="container-site">
          <div className="relative mb-8">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-border bg-white py-4 pl-14 pr-6 text-foreground placeholder:text-muted-foreground transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => selectFilter(filter.id)}
                className={cn(
                  'rounded-full px-6 py-3 font-heading text-sm font-medium transition-all duration-300',
                  activeFilter === filter.id
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-muted text-foreground/80 hover:bg-primary/10 hover:text-primary'
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white pb-24 pt-12">
        <div className="container-site">
          {visible.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {visible.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  image={product.image}
                  isTrending={product.isTrending}
                />
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center py-24 text-center">
              <PackageOpen className="h-12 w-12 text-primary/40" />
              <p className="mt-4 font-heading text-xl font-semibold text-foreground">
                {products.length === 0 ? 'New products are on their way' : 'No products match your search'}
              </p>
              <p className="mt-2 text-muted-foreground">
                {products.length === 0
                  ? 'Check back soon to see what we have been printing.'
                  : 'Try another category or a different word.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
