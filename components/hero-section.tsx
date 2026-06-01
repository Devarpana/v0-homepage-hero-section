'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, rotateZ: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3 },
  },
}

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-primary/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-[var(--font-poppins)] text-balance"
            >
              Smart Products.{' '}
              <span className="text-primary">Printed Layer</span> by Layer.
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed max-w-lg font-[var(--font-inter)]"
            >
              Discover useful products, home decor, toys and personalized creations crafted
              through modern 3D printing.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl px-8 py-6 text-base font-[var(--font-poppins)] shadow-lg hover:shadow-xl transition-all"
                >
                  Shop Collection
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-200 text-gray-900 hover:bg-gray-50 font-semibold rounded-xl px-8 py-6 text-base font-[var(--font-poppins)] transition-all"
                >
                  Custom Order
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-4"
            >
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 font-[var(--font-inter)]">
                Trusted by 10K+ creators
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Product Showcase */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="relative h-full min-h-[500px] lg:min-h-[600px]"
          >
            {/* Product Card with Shadow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-sm">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
                
                {/* Card */}
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                  {/* Image container */}
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white text-4xl font-bold">
                          3D
                        </div>
                        <p className="text-gray-600 font-[var(--font-inter)] text-sm">Premium Product Showcase</p>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 font-[var(--font-poppins)] mb-2">
                      Premium 3D Printed Product
                    </h3>
                    <p className="text-sm text-gray-600 font-[var(--font-inter)] mb-4">
                      High-quality craftsmanship meets modern design
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary font-[var(--font-poppins)]">$89.99</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-accent text-sm">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements for depth */}
                <motion.div
                  className="absolute -top-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
                  animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
                  animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
