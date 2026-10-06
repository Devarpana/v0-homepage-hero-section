'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAddToCart } from '@/components/add-to-cart'
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
    transition: { duration: 0.5 },
  },
}

export function RelatedProducts({ products }: { products: Product[] }) {
  const addToCart = useAddToCart()
  if (products.length === 0) return null

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 font-[family-name:var(--font-poppins)]">
            Related Products
          </h2>
          <p className="text-lg text-gray-600 mt-4 font-[family-name:var(--font-inter)]">You might also like these items.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => {
            const soldOut = product.stock < 1
            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-primary hover:shadow-lg transition-all group"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div
                    className={`relative aspect-square overflow-hidden flex items-center justify-center ${
                      product.image ? 'bg-gray-50' : `${gradientFor(product.id)} bg-opacity-40`
                    }`}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-white/60 rounded-xl flex items-center justify-center text-2xl font-bold text-gray-400">
                        3D
                      </div>
                    )}
                  </div>

                  <div className="px-6 pt-6">
                    <p className="text-xs font-medium text-primary uppercase tracking-wider font-[family-name:var(--font-inter)] mb-2">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 font-[family-name:var(--font-poppins)] line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="mt-4 text-2xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>

                <div className="p-6 pt-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="sm"
                      disabled={soldOut}
                      onClick={() => addToCart(product)}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg text-sm font-[family-name:var(--font-poppins)]"
                    >
                      {soldOut ? 'Sold out' : 'Add to Cart'}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
