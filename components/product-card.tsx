'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatPrice, gradientFor, type Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const soldOut = product.stock < 1

  return (
    <Link href={`/product/${product.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex flex-col group cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <>
              <div className={`absolute inset-0 ${gradientFor(product.id)} opacity-30`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white/50 rounded-xl flex items-center justify-center text-3xl font-bold text-gray-400">
                  3D
                </div>
              </div>
            </>
          )}

          {/* Hover Overlay (decorative: the whole card is the link) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center"
          >
            <span className="px-6 py-3 bg-primary text-white rounded-full font-semibold text-sm font-[family-name:var(--font-poppins)] shadow-lg">
              View Product
            </span>
          </motion.div>

          {soldOut ? (
            <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold font-[family-name:var(--font-poppins)]">
              Sold out
            </div>
          ) : (
            product.trending && (
              <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold font-[family-name:var(--font-poppins)]">
                Trending
              </div>
            )
          )}
        </div>

        {/* Product Info */}
        <motion.div animate={{ y: isHovered ? -4 : 0 }} transition={{ duration: 0.3 }}>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 font-[family-name:var(--font-inter)]">
            {product.category}
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-poppins)] line-clamp-2">
            {product.name}
          </h3>
          <p className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary font-[family-name:var(--font-poppins)]">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-500 line-through font-[family-name:var(--font-inter)]">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </p>
        </motion.div>
      </motion.div>
    </Link>
  )
}
