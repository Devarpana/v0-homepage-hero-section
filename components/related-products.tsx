'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function RelatedProducts() {
  const products = [
    {
      id: 1,
      name: 'Cable Organizer',
      category: 'Daily Essentials',
      price: 899,
      image: '🔌'
    },
    {
      id: 2,
      name: 'Phone Stand',
      category: 'Tech Accessories',
      price: 599,
      image: '📱'
    },
    {
      id: 3,
      name: 'Headphone Holder',
      category: 'Tech Accessories',
      price: 449,
      image: '🎧'
    },
    {
      id: 4,
      name: 'Custom Nameplate',
      category: 'Personalized',
      price: 349,
      image: '🏷️'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

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
          <p className="text-lg text-gray-600 mt-4 font-[family-name:var(--font-inter)]">
            You might also like these items.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-primary hover:shadow-lg transition-all group"
            >
              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                {product.image}
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs font-medium text-primary uppercase tracking-wider font-[family-name:var(--font-inter)] mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 font-[family-name:var(--font-poppins)] line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">
                    ₹{product.price}
                  </span>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg text-sm font-[family-name:var(--font-poppins)]"
                  >
                    Quick View
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
