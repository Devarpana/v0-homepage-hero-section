'use client'

import { motion, type Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

export function ShopPageHeader() {
  return (
    <section className="w-full bg-white pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl lg:text-6xl font-black text-gray-900 font-[family-name:var(--font-poppins)] mb-4 tracking-tight"
          >
            Shop
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed"
          >
            Thoughtfully designed 3D printed products for your home, workspace, and creative projects. 
            Each piece is crafted with precision and care.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
