'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { formatPrice, gradientFor, type Product } from '@/lib/products'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

/** Products flagged "trending" in the admin; if none are, the newest ones stand in. */
function pickTrending(products: Product[], limit = 4): { items: Product[]; flagged: boolean } {
  const flagged = products.filter((p) => p.trending)
  return flagged.length > 0
    ? { items: flagged.slice(0, limit), flagged: true }
    : { items: products.slice(0, limit), flagged: false }
}

export function TrendingProducts({ products }: { products: Product[] }) {
  const { items, flagged } = pickTrending(products)
  if (items.length === 0) return null

  return (
    <section id="trending" className="relative w-full py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl lg:text-6xl font-black text-gray-900 font-[family-name:var(--font-poppins)] text-balance tracking-tight"
          >
            {flagged ? 'Trending Now' : 'New Arrivals'}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-gray-600 font-[family-name:var(--font-inter)] max-w-2xl"
          >
            {flagged ? 'What our community is loving this month' : 'The latest pieces from our print farm'}
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((product) => (
            <motion.div key={product.id} variants={itemVariants} whileHover={{ y: -4 }} className="group">
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative overflow-hidden rounded-xl bg-white border border-gray-200">
                  {/* Product image area */}
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center relative overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <motion.div
                        className={`w-24 h-24 rounded-lg opacity-60 group-hover:opacity-80 transition-all duration-300 ${gradientFor(product.id)}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      />
                    )}
                    {flagged && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 rounded-full border border-primary/20">
                        <span className="text-xs font-semibold text-primary font-[family-name:var(--font-poppins)]">Trending</span>
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="p-4">
                    <p className="text-xs text-gray-500 font-[family-name:var(--font-inter)] uppercase tracking-wider mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-sm font-bold text-gray-900 font-[family-name:var(--font-poppins)]">{product.name}</h3>
                    <p className="text-sm font-semibold text-primary mt-1 font-[family-name:var(--font-poppins)]">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-block px-8 py-3 rounded-full border border-gray-300 text-gray-900 font-semibold font-[family-name:var(--font-poppins)] hover:bg-white transition-colors"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  )
}
