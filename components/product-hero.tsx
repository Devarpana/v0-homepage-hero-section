'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Share2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProductImage } from '@/components/product-image'
import { categorySlug, formatPrice, type Product } from '@/lib/products'
import { contact } from '@/lib/site-content'

export function ProductHero({ product }: { product: Product }) {
  const colors = product.colors
  const [selectedColor, setSelectedColor] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const gallery = product.images.length > 0 ? product.images : [undefined]
  const [activeImage, setActiveImage] = useState(0)
  const [shared, setShared] = useState(false)

  // Checkout isn't built yet, so orders go to WhatsApp with the details already typed.
  const orderLink = () => {
    const color = colors[selectedColor]?.name
    const lines = [
      `Hi XYZ Layers, I'd like to order:`,
      `${product.name}${color ? ` (${color})` : ''} × ${quantity}`,
      `https://www.xyzlayers.in/product/${product.id}`,
    ]
    return `${contact.whatsappHref}?text=${encodeURIComponent(lines.filter(Boolean).join('\n'))}`
  }

  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: product.name, url }).catch(() => {})
      return
    }
    await navigator.clipboard?.writeText(url)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }
  // Photo of the colour the customer clicked; cleared when they pick a gallery thumbnail.
  const [colorImage, setColorImage] = useState<string | null>(null)

  const chooseColor = (index: number) => {
    setSelectedColor(index)
    if (colors[index].image) setColorImage(colors[index].image)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="w-full min-h-screen bg-white pt-32 pb-12">
      <div className="container-site">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <span className="text-gray-400">/</span>
            <Link href={`/shop?category=${categorySlug(product.category)}`} className="hover:text-primary transition-colors">
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
            {/* Main Image */}
            <motion.div
              variants={itemVariants}
              className="aspect-square overflow-hidden rounded-2xl border border-border"
            >
              <ProductImage
                src={colorImage ?? gallery[activeImage]}
                alt={colorImage ? `${product.name} in ${colors[selectedColor]?.name}` : product.name}
              />
            </motion.div>

            {/* Thumbnail Gallery */}
            {gallery.length > 1 && (
              <motion.div variants={itemVariants} className="flex gap-4">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => {
                      setActiveImage(i)
                      setColorImage(null)
                    }}
                    className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                      !colorImage && i === activeImage ? 'border-primary' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <ProductImage src={src} alt={`${product.name} view ${i + 1}`} />
                  </button>
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
            {/* Category and Title */}
            <div>
              <motion.p
                variants={itemVariants}
                className="text-sm font-medium text-primary uppercase tracking-wider font-[var(--font-inter)]"
              >
                {product.category}
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-4xl lg:text-5xl font-black text-gray-900 mt-2 leading-tight font-[var(--font-poppins)]"
              >
                {product.name}
              </motion.h1>
            </div>

            {/* Price */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900 font-[var(--font-poppins)]">
                {formatPrice(product.price)}
              </span>
              {product.stock === 0 && (
                <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
                  Out of stock
                </span>
              )}
            </motion.div>

            {product.description && (
              <motion.p
                variants={itemVariants}
                className="whitespace-pre-line border-b border-border pb-6 text-lg leading-relaxed text-gray-600"
              >
                {product.description}
              </motion.p>
            )}

            {/* Color Selection: only the colours set for this product in admin */}
            {colors.length > 0 && (
              <motion.div variants={itemVariants}>
                <p className="mb-4 text-sm font-semibold text-gray-900 font-[var(--font-poppins)]">
                  Colour: <span className="font-normal text-gray-600">{colors[selectedColor]?.name}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color, index) => (
                    <motion.button
                      key={`${color.name}-${index}`}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => chooseColor(index)}
                      className={`h-12 w-12 rounded-full border-2 transition-all ${
                        selectedColor === index ? 'border-primary ring-2 ring-primary/50 ring-offset-2' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={color.name}
                      aria-pressed={selectedColor === index}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quantity Selector */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-900 mb-4 font-[var(--font-poppins)]">
                Quantity
              </label>
              <div className="flex items-center gap-4 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center font-[var(--font-poppins)]"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold text-gray-900 font-[var(--font-poppins)]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center font-[var(--font-poppins)]"
                >
                  +
                </button>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                asChild
                size="lg"
                className="flex-1 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold rounded-full h-12 text-base font-heading"
              >
                <a href={orderLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Order on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="flex-1 border border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold rounded-full h-12 text-base font-heading"
              >
                <Link href="/custom-orders#custom-form">Ask for a custom version</Link>
              </Button>
            </motion.div>

            {/* Secondary Actions */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 pt-4 border-t border-gray-200"
            >
              <button onClick={share} className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-50 rounded-lg transition-colors font-[var(--font-inter)]">
                <Share2 className="w-5 h-5" />
                <span className="text-sm">{shared ? 'Link copied' : 'Share'}</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
