'use client'

import { motion, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.3 },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3 },
  },
}

export function CustomOrdersHero() {
  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -ml-32" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-150px)]">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-200">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-medium text-gray-700 font-[family-name:var(--font-inter)] uppercase tracking-wider">
                  Made to Order
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight font-[family-name:var(--font-poppins)] text-balance tracking-tight"
            >
              Your Vision,{' '}
              <span className="text-primary">Perfectly Printed</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed max-w-lg font-[family-name:var(--font-inter)] font-light"
            >
              Share your ideas and let our team bring them to life. From personalized gifts to custom prototypes, we craft exactly what you imagine.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 py-6 text-base font-[family-name:var(--font-poppins)] shadow-lg hover:shadow-xl transition-all"
                  onClick={() => document.getElementById('custom-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Your Order
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold rounded-full px-8 py-6 text-base font-[family-name:var(--font-poppins)] transition-all"
                  onClick={() => document.getElementById('previous-projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See Examples
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-8 pt-8 border-t border-gray-200"
            >
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-primary font-[family-name:var(--font-poppins)]">500+</div>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-inter)]">Custom Orders Completed</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-primary font-[family-name:var(--font-poppins)]">4.9★</div>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-inter)]">Average Rating</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="relative h-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-3xl" />

              {/* Product showcase */}
              <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center p-8">
                <motion.div
                  animate={{ rotateX: [0, 5, 0], rotateY: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <div className="w-40 h-40 bg-gradient-to-br from-accent/80 to-accent/60 rounded-2xl shadow-2xl flex items-center justify-center text-white relative">
                    <div className="text-center">
                      <div className="text-5xl mb-2 opacity-30">✨</div>
                      <p className="text-xs font-medium tracking-widest opacity-60 font-[family-name:var(--font-inter)]">CUSTOM</p>
                    </div>
                    <div className="absolute top-0 left-1/4 w-20 h-20 bg-white/20 rounded-full blur-2xl" />
                  </div>
                </motion.div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-10 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-10 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
