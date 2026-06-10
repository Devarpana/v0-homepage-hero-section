'use client'

import { motion } from 'framer-motion'
import { ProductCard } from '@/components/product-card'
import { FeaturedProductShowcase } from '@/components/featured-product-showcase'

const products = [
  { id: '1', name: 'Modular Desk Organizer', category: 'Daily Essentials', price: 1299, imageGradient: 'bg-gradient-to-br from-blue-300 to-blue-100', isTrending: true },
  { id: '2', name: 'Phone Stand Pro', category: 'Daily Essentials', price: 799, imageGradient: 'bg-gradient-to-br from-purple-300 to-purple-100', isTrending: false },
  { id: '3', name: 'Geometric Planter', category: 'Home Decor', price: 1599, imageGradient: 'bg-gradient-to-br from-green-300 to-green-100', isTrending: false },
  { id: '4', name: 'Articulated Dragon', category: 'Toys', price: 4999, imageGradient: 'bg-gradient-to-br from-orange-300 to-orange-100', isTrending: true },
  { id: '5', name: 'Headphone Holder', category: 'Daily Essentials', price: 549, imageGradient: 'bg-gradient-to-br from-pink-300 to-pink-100', isTrending: false },
  { id: '6', name: 'Custom Nameplate', category: 'Custom', price: 2299, imageGradient: 'bg-gradient-to-br from-indigo-300 to-indigo-100', isTrending: false },
  { id: '7', name: 'Cable Organizer Pro', category: 'Daily Essentials', price: 899, imageGradient: 'bg-gradient-to-br from-teal-300 to-teal-100', isTrending: true },
  { id: '8', name: 'Decorative Lamp Base', category: 'Home Decor', price: 2899, imageGradient: 'bg-gradient-to-br from-yellow-300 to-yellow-100', isTrending: false },
  { id: '9', name: 'Wall Shelf Bracket', category: 'Home Decor', price: 1199, imageGradient: 'bg-gradient-to-br from-red-300 to-red-100', isTrending: false },
  { id: '10', name: 'Fidget Toy Spinner', category: 'Toys', price: 499, imageGradient: 'bg-gradient-to-br from-cyan-300 to-cyan-100', isTrending: true },
  { id: '11', name: 'Articulated Keychain', category: 'Toys', price: 399, imageGradient: 'bg-gradient-to-br from-lime-300 to-lime-100', isTrending: false },
  { id: '12', name: 'Designer Pen Holder', category: 'Daily Essentials', price: 1099, imageGradient: 'bg-gradient-to-br from-rose-300 to-rose-100', isTrending: false },
]

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
      <div className="max-w-7xl mx-auto px-6">
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
