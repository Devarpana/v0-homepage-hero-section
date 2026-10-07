'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ProductImage } from '@/components/product-image'
import { formatPrice } from '@/lib/products'


interface ProductCardProps {
  id: string
  name: string
  category: string
  price: number
  image?: string
  imageGradient?: string
  isTrending?: boolean
}

export function ProductCard({
  id,
  name,
  category,
  price,
  image,
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
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl mb-4 shadow-soft transition-shadow duration-300 group-hover:shadow-soft-lg">
          <ProductImage src={image} alt={name} />

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center"
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
            {formatPrice(price)}
          </p>
        </motion.div>
      </motion.div>
    </Link>
  )
}
