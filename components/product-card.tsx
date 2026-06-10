'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'


interface ProductCardProps {
  id: string
  name: string
  category: string
  price: number
  image?: string
  imageGradient: string
  isTrending?: boolean
}

export function ProductCard({
  id,
  name,
  category,
  price,
  image,
  imageGradient,
  isTrending = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const productUrl = `/product/${id}`

  return (
    <Link href={productUrl}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex flex-col group cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4 cursor-pointer">
          {/* Gradient Background */}
          <div className={`absolute inset-0 ${imageGradient} opacity-30`} />

          {/* Image Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 bg-white/50 rounded-xl flex items-center justify-center text-3xl font-bold text-gray-400">
                3D
              </div>
            </div>
          </div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold text-sm font-[var(--font-poppins)] shadow-lg hover:shadow-xl transition-shadow"
            >
              View Product
            </motion.button>
          </motion.div>

          {/* Trending Badge */}
          {isTrending && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold font-[var(--font-poppins)]"
            >
              Trending
            </motion.div>
          )}
        </div>

        {/* Product Info */}
        <motion.div
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 font-[var(--font-inter)] cursor-pointer">
            {category}
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 font-[var(--font-poppins)] line-clamp-2 cursor-pointer">
            {name}
          </h3>
          <p className="text-xl font-bold text-primary font-[var(--font-poppins)]">
            ₹{price.toLocaleString()}
          </p>
        </motion.div>
      </motion.div>
    </Link>
  )
}
