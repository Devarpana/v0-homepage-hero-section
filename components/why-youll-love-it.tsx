'use client'

import { motion } from 'framer-motion'
import { Package, Zap, Palette, Award } from 'lucide-react'

export function WhyYoullLoveIt() {
  const features = [
    {
      icon: Package,
      title: 'Designed for Everyday Use',
      description: 'Thoughtfully designed to fit naturally into your home, desk, or workspace and hold up to daily use.'
    },
    {
      icon: Zap,
      title: 'Durable and Lightweight',
      description: 'Built with premium PLA+ material. Incredibly strong yet lightweight.'
    },
    {
      icon: Award,
      title: 'Precision 3D Printed',
      description: 'Each piece is printed with meticulous attention to detail. Layer-by-layer perfection.'
    },
    {
      icon: Palette,
      title: 'Personalization Available',
      description: 'Choose from 4 color options or add custom engraving to make it truly yours.'
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 font-[family-name:var(--font-poppins)] text-balance">
            Why You&apos;ll Love It
          </h2>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl font-[family-name:var(--font-inter)]">
            Designed for those who appreciate quality and attention to detail.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 font-[family-name:var(--font-poppins)]">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
