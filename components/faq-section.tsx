'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: 'Can I customize this product?',
      answer: 'Absolutely! You can personalize your desk organizer with name engraving, custom text, logo uploads, and choose from our premium color options. We also offer bespoke designs for bulk orders.'
    },
    {
      question: 'What material is used?',
      answer: 'We use premium PLA+, a high-quality biodegradable plastic that&apos;s durable, eco-friendly, and perfect for everyday use. It&apos;s stronger than standard PLA and has excellent finish quality.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days within India. Express shipping (2-3 days) is available for an additional fee. Custom personalized orders may take an extra 2-3 days.'
    },
    {
      question: 'Is the product durable?',
      answer: 'Yes, our products are built to last. With proper care, your desk organizer will serve you for years. It&apos;s designed to withstand daily use in offices, studios, and home workspaces. We offer a 1-year warranty.'
    },
    {
      question: 'What if my product arrives damaged?',
      answer: 'We stand behind our products with a damage replacement guarantee. If your organizer arrives damaged, simply contact our support team with photos and we&apos;ll replace it immediately, free of charge.'
    },
    {
      question: 'Can I use this outdoors?',
      answer: 'While our organizers are durable, they&apos;re designed for indoor use. Prolonged exposure to direct sunlight or extreme weather may cause discoloration over time.'
    }
  ]

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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 font-[family-name:var(--font-poppins)]">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 mt-4 font-[family-name:var(--font-inter)]">
            Everything you need to know about our products.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900 font-[family-name:var(--font-poppins)] pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-gray-200"
                  >
                    <p className="px-6 py-5 text-gray-600 leading-relaxed font-[family-name:var(--font-inter)]">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
