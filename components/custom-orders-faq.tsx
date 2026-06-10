'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

const faqs = [
  {
    id: 1,
    question: 'How long does a custom order typically take?',
    answer: 'Most custom orders are completed within 2-4 weeks, depending on complexity. We\'ll provide you with a detailed timeline during the consultation phase.'
  },
  {
    id: 2,
    question: 'What file formats do you accept?',
    answer: 'We accept STL, OBJ, STEP, DWG, PDF, and image files. If you don\'t have a digital file, our design team can create one based on your sketches or descriptions.'
  },
  {
    id: 3,
    question: 'Can I make changes during production?',
    answer: 'Absolutely! We can accommodate changes before printing begins. Once printing has started, modifications may incur additional costs.'
  },
  {
    id: 4,
    question: 'What materials do you use?',
    answer: 'We work with premium materials including PLA, PETG, Resin, and Nylon. Each material has unique properties - we\'ll recommend the best option for your project.'
  },
  {
    id: 5,
    question: 'What\'s your refund policy for custom orders?',
    answer: 'Custom orders are non-refundable once printing has begun. However, we\'ll work with you to ensure complete satisfaction before we start production.'
  },
  {
    id: 6,
    question: 'Do you offer bulk discounts?',
    answer: 'Yes! For orders of 10+ units, we offer special pricing. Contact our team directly to discuss your bulk order needs.'
  },
]

export function CustomOrdersFAQ() {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <section className="relative w-full py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl lg:text-6xl font-black text-gray-900 font-[var(--font-poppins)] text-balance tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-gray-600 font-[var(--font-inter)] max-w-2xl mx-auto"
          >
            Everything you need to know about custom orders
          </motion.p>
        </motion.div>

        {/* FAQs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-4"
        >
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary/30 transition-colors"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 font-[var(--font-poppins)] text-left">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 flex-shrink-0"
                >
                  <span className="text-2xl text-primary">+</span>
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600 font-[var(--font-inter)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact note */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center"
        >
          <h3 className="text-xl font-bold text-gray-900 font-[var(--font-poppins)] mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 font-[var(--font-inter)] mb-4">
            Our team is here to help. Contact us for personalized support.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold font-[var(--font-poppins)] transition-all"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
