'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Share2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ProductHero() {
  const [selectedColor, setSelectedColor] = useState('blue')
  const [quantity, setQuantity] = useState(1)

  const colors = [
    { name: 'Blue', value: 'blue', bg: 'bg-blue-500' },
    { name: 'Black', value: 'black', bg: 'bg-gray-900' },
    { name: 'White', value: 'white', bg: 'bg-gray-100 border border-gray-300' },
    { name: 'Orange', value: 'orange', bg: 'bg-orange-400' },
  ]

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
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span className="text-gray-400">/</span>
            <a href="/shop" className="hover:text-primary transition-colors">Shop</a>
            <span className="text-gray-400">/</span>
            <a href="/shop" className="hover:text-primary transition-colors">Daily Essentials</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Modular Desk Organizer</span>
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
              className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-200"
            >
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-[var(--font-inter)]">
                Product Image
              </div>
            </motion.div>

            {/* Thumbnail Gallery */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4"
            >
              {[1, 2, 3, 4].map((i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-20 h-20 rounded-lg border-2 transition-all flex items-center justify-center text-gray-400 text-xs font-[var(--font-inter)] ${
                    i === 1
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary'
                  }`}
                >
                  View {i}
                </motion.button>
              ))}
            </motion.div>
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
                Daily Essentials
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-4xl lg:text-5xl font-black text-gray-900 mt-2 leading-tight font-[var(--font-poppins)]"
              >
                Modular Desk Organizer
              </motion.h1>
            </div>

            {/* Price and Rating */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900 font-[var(--font-poppins)]">
                ₹1,499
              </span>
              <span className="text-sm text-gray-600 line-through font-[var(--font-inter)]">
                ₹1,999
              </span>
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium font-[var(--font-inter)]">
                25% Off
              </span>
            </motion.div>

            {/* Short Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed font-[var(--font-inter)]"
            >
              Keep your workspace organized and stylish with our precision 3D-printed modular organizer. 
              Perfect for desk organization, customizable to your needs, and built to last.
            </motion.p>

            {/* Key Features */}
            <motion.div
              variants={itemVariants}
              className="space-y-3 py-6 border-t border-b border-gray-200"
            >
              {[
                'Material: Premium PLA+',
                'Dimensions: 15 × 8 × 4 cm',
                'Weight: 220g',
                'Color Options: 4 available'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-700 font-[var(--font-inter)]">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* Color Selection */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-900 mb-4 font-[var(--font-poppins)]">
                Choose Color
              </label>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <motion.button
                    key={color.value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.value
                        ? 'border-primary ring-2 ring-primary/50'
                        : 'border-gray-300'
                    } ${color.bg}`}
                    title={color.name}
                  />
                ))}
              </div>
            </motion.div>

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
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full h-12 text-base font-[var(--font-poppins)]"
              >
                Add To Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold rounded-full h-12 text-base font-[var(--font-poppins)]"
              >
                Buy Now
              </Button>
            </motion.div>

            {/* Secondary Actions */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 pt-4 border-t border-gray-200"
            >
              <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-50 rounded-lg transition-colors font-[var(--font-inter)]">
                <Heart className="w-5 h-5" />
                <span className="text-sm">Save</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-50 rounded-lg transition-colors font-[var(--font-inter)]">
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
