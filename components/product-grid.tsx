'use client'

import { motion } from 'framer-motion'
import { ProductCard } from '@/components/product-card'
import { FeaturedProductShowcase } from '@/components/featured-product-showcase'
import { sampleProducts } from '@/lib/sample-products'

const products = sampleProducts

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

export function ProductGrid() {
  return (
    <section className="w-full bg-white">
      <div className="container-site">
        {/* First Row - 4 Products */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12"
        >
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </motion.div>

        {/* Featured Product Showcase */}
        <FeaturedProductShowcase />

        {/* Second Row - 4 Products */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12"
        >
          {products.slice(4, 8).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </motion.div>

        {/* Third Row - 4 Products */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 pb-20"
        >
          {products.slice(8, 12).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
