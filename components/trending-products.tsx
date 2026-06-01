'use client'

import { motion } from 'framer-motion'

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
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const products = [
  { id: 1, name: 'Modular Organizer', category: 'Home' },
  { id: 2, name: 'Geometric Planter', category: 'Garden' },
  { id: 3, name: 'Precision Organizer', category: 'Office' },
  { id: 4, name: 'Designer Phone Stand', category: 'Accessories' },
]

export function TrendingProducts() {
  return (
    <section className="relative w-full py-24 bg-gray-50">
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
            className="text-5xl lg:text-6xl font-black text-gray-900 font-[var(--font-poppins)] text-balance tracking-tight"
          >
            Trending Now
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-gray-600 font-[var(--font-inter)] max-w-2xl"
          >
            What our community is loving this month
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl bg-white border border-gray-200">
                {/* Product image area */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <span className="text-xs font-semibold text-primary font-[var(--font-poppins)]">
                      Trending
                    </span>
                  </div>
                </div>

                {/* Product info */}
                <div className="p-4">
                  <p className="text-xs text-gray-500 font-[var(--font-inter)] uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-sm font-bold text-gray-900 font-[var(--font-poppins)]">
                    {product.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
