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

export function CustomOrdersFinalCTA() {
  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -ml-48" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl lg:text-6xl font-black text-gray-900 font-[family-name:var(--font-poppins)] text-balance tracking-tight"
          >
            Ready to Bring Your Idea to Life?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 font-[family-name:var(--font-inter)] max-w-2xl mx-auto"
          >
            Our team of designers and craftspeople are ready to transform your vision into reality. Let&apos;s create something extraordinary together.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8"
          >
            <div>
              <p className="text-4xl font-black text-primary font-[family-name:var(--font-poppins)]">500+</p>
              <p className="text-gray-600 text-sm font-[family-name:var(--font-inter)]">Projects Completed</p>
            </div>
            <div>
              <p className="text-4xl font-black text-primary font-[family-name:var(--font-poppins)]">4.9★</p>
              <p className="text-gray-600 text-sm font-[family-name:var(--font-inter)]">Customer Rating</p>
            </div>
            <div>
              <p className="text-4xl font-black text-primary font-[family-name:var(--font-poppins)]">24h</p>
              <p className="text-gray-600 text-sm font-[family-name:var(--font-inter)]">Response Time</p>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 py-6 text-base font-[family-name:var(--font-poppins)] shadow-lg hover:shadow-xl transition-all"
              >
                Start Your Custom Order
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border border-gray-400 text-gray-900 hover:bg-white font-semibold rounded-full px-8 py-6 text-base font-[family-name:var(--font-poppins)] transition-all"
              >
                Schedule Consultation
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust message */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-gray-500 font-[family-name:var(--font-inter)]"
          >
            No obligation. Our design consultants will review your request and get back to you within 24 hours.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
