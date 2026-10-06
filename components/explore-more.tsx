'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

export function ExploreMore() {
  return (
    <section className="relative w-full py-32 bg-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <motion.h2
          variants={itemVariants}
          className="text-5xl lg:text-6xl font-black text-gray-900 font-[family-name:var(--font-poppins)] text-balance tracking-tight mb-6"
        >
          Ready to Create Something{' '}
          <span className="text-primary">Extraordinary</span>?
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 font-[family-name:var(--font-inter)] max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Whether you&apos;re looking for ready-made designs or have a custom vision, we&apos;re here to bring your ideas to life through precision 3D printing.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 py-6 text-base font-[family-name:var(--font-poppins)] shadow-lg hover:shadow-xl transition-all"
            >
              Start Exploring
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
            >
              Request a Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust line */}
        <motion.p
          variants={itemVariants}
          className="mt-16 text-sm text-gray-500 font-[family-name:var(--font-inter)]"
        >
          Trusted by 500+ creators and businesses across India
        </motion.p>
      </motion.div>
    </section>
  )
}
