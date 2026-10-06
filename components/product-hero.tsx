'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, type Variants } from 'framer-motion'
import { Check, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useAddToCart } from '@/components/add-to-cart'
import { PRODUCT_COLORS, STORE_WIDE_SPECS, formatPrice, gradientFor, type Product } from '@/lib/products'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const LOW_STOCK_THRESHOLD = 5

export function ProductHero({ product }: { product: Product }) {
  const router = useRouter()
  const addToCart = useAddToCart()

  const [selectedColor, setSelectedColor] = useState<string>(PRODUCT_COLORS[0].value)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  const images = [product.image, ...product.gallery].filter((src): src is string => Boolean(src))
  const soldOut = product.stock < 1
  const maxQuantity = Math.max(1, product.stock)
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  // Facts we actually know: the material (store-wide), the first per-product specs, and colour count.
  const highlights = [
    `Material: ${STORE_WIDE_SPECS[0].value}`,
    ...product.specs.slice(0, 2).map((s) => `${s.label}: ${s.value}`),
    `Color Options: ${PRODUCT_COLORS.length} available`,
  ]

  const handleAdd = () => addToCart(product, { color: selectedColor, quantity })

  const handleBuyNow = () => {
    if (addToCart(product, { color: selectedColor, quantity, silent: true })) router.push('/checkout')
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url })
      } else {
        await navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard')
      }
    } catch (error) {
      // Dismissing the native share sheet rejects with AbortError; that is not a failure.
      if (!(error instanceof DOMException && error.name === 'AbortError')) toast.error('Could not share this product')
    }
  }

  return (
    <section className="w-full min-h-screen bg-white pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="hover:text-primary transition-colors"
            >
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Image Gallery */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div
              variants={itemVariants}
              className={`relative aspect-square rounded-2xl overflow-hidden flex items-center justify-center border border-gray-200 ${
                images.length === 0 ? gradientFor(product.id) : 'bg-gray-50'
              }`}
            >
              {images.length > 0 ? (
                <img
                  src={images[activeImage] ?? images[0]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="w-28 h-28 bg-white/60 rounded-2xl flex items-center justify-center text-4xl font-bold text-gray-400">
                  3D
                </div>
              )}
            </motion.div>

            {images.length > 1 && (
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                {images.map((src, i) => (
                  <motion.button
                    key={src + i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-pressed={i === activeImage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                      i === activeImage ? 'border-primary' : 'border-gray-200 hover:border-primary'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right - Product Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            <div>
              <motion.p
                variants={itemVariants}
                className="text-sm font-medium text-primary uppercase tracking-wider font-[family-name:var(--font-inter)]"
              >
                {product.category}
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-4xl lg:text-5xl font-black text-gray-900 mt-2 leading-tight font-[family-name:var(--font-poppins)]"
              >
                {product.name}
              </motion.h1>
            </div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <span className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-sm text-gray-600 line-through font-[family-name:var(--font-inter)]">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  {discount > 0 && (
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium font-[family-name:var(--font-inter)]">
                      {discount}% Off
                    </span>
                  )}
                </>
              )}
            </motion.div>

            {product.description && (
              <motion.p variants={itemVariants} className="text-lg text-gray-600 leading-relaxed font-[family-name:var(--font-inter)]">
                {product.description}
              </motion.p>
            )}

            <motion.div variants={itemVariants} className="space-y-3 py-6 border-t border-b border-gray-200">
              {highlights.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-700 font-[family-name:var(--font-inter)]">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* Color Selection */}
            <motion.div variants={itemVariants}>
              <p className="block text-sm font-semibold text-gray-900 mb-4 font-[family-name:var(--font-poppins)]">
                Choose Color: <span className="font-normal capitalize text-gray-600">{selectedColor}</span>
              </p>
              <div className="flex gap-3" role="radiogroup" aria-label="Color">
                {PRODUCT_COLORS.map((color) => (
                  <motion.button
                    key={color.value}
                    type="button"
                    role="radio"
                    aria-checked={selectedColor === color.value}
                    aria-label={color.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.value ? 'border-primary ring-2 ring-primary/50' : 'border-gray-300'
                    } ${color.swatch}`}
                    title={color.name}
                  />
                ))}
              </div>
            </motion.div>

            {/* Quantity Selector */}
            {!soldOut && (
              <motion.div variants={itemVariants}>
                <p className="block text-sm font-semibold text-gray-900 mb-4 font-[family-name:var(--font-poppins)]">Quantity</p>
                <div className="flex items-center gap-4 w-fit">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-12 h-12 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center font-[family-name:var(--font-poppins)] disabled:opacity-40"
                  >
                    −
                  </button>
                  <span aria-live="polite" className="w-12 text-center font-semibold text-gray-900 font-[family-name:var(--font-poppins)]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
                    disabled={quantity >= maxQuantity}
                    className="w-12 h-12 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center font-[family-name:var(--font-poppins)] disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
                {product.stock <= LOW_STOCK_THRESHOLD && (
                  <p className="mt-3 text-sm text-orange-600 font-[family-name:var(--font-inter)]">Only {product.stock} left in stock</p>
                )}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                disabled={soldOut}
                onClick={handleAdd}
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full h-12 text-base font-[family-name:var(--font-poppins)]"
              >
                {soldOut ? 'Sold out' : 'Add To Cart'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                disabled={soldOut}
                onClick={handleBuyNow}
                className="flex-1 border border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold rounded-full h-12 text-base font-[family-name:var(--font-poppins)]"
              >
                Buy Now
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-50 rounded-lg transition-colors font-[family-name:var(--font-inter)]"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-sm">Share</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
