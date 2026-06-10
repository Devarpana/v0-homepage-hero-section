'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function FeaturedProductShowcase() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left - Product Showcase */}
          <motion.div
            variants={itemVariants}
            className="relative aspect-square rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 overflow-hidden flex items-center justify-center"
          >
            {/* Decorative elements */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 text-center"
            >
              <div className="w-40 h-40 mx-auto bg-gradient-to-br from-primary/80 to-primary/60 rounded-3xl shadow-2xl flex items-center justify-center text-white mb-4">
                <div className="text-6xl font-black font-[var(--font-poppins)] opacity-20">◆</div>
              </div>
              <p className="text-sm text-gray-600 font-[var(--font-inter)] mt-6">Premium 3D Printed Piece</p>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute top-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>

          {/* Right - Product Story */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-primary font-bold uppercase tracking-widest mb-3 font-[var(--font-poppins)]">
                Featured
              </p>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 font-[var(--font-poppins)] leading-tight">
                Articulated Dragon Figurine
              </h2>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed font-[var(--font-inter)]">
              This mesmerizing articulated dragon combines mechanical precision with artistic design. 
              Each segment moves fluidly, created through advanced 3D printing techniques and finished with meticulous care.
            </p>

            <div className="grid grid-cols-3 gap-6 py-8 border-y border-gray-200">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 font-[var(--font-inter)]">
                  Material
                </p>
                <p className="font-bold text-gray-900 font-[var(--font-poppins)]">Premium PLA</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 font-[var(--font-inter)]">
                  Finish
                </p>
                <p className="font-bold text-gray-900 font-[var(--font-poppins)]">Hand-polished</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 font-[var(--font-inter)]">
                  Size
                </p>
                <p className="font-bold text-gray-900 font-[var(--font-poppins)]">25cm Length</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 font-[var(--font-inter)]">
                  Price
                </p>
                <p className="text-3xl font-black text-primary font-[var(--font-poppins)]">₹4,999</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 py-6 font-[var(--font-poppins)] shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  Add to Cart
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold rounded-full px-8 py-6 font-[var(--font-poppins)] transition-all w-full sm:w-auto"
                >
                  View Details
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
