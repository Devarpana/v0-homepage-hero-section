'use client'

import { motion } from 'framer-motion'

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

const reasons = [
  {
    id: 1,
    title: 'Uncompromising Quality',
    description: 'Each product undergoes rigorous quality control to ensure durability and precision.',
  },
  {
    id: 2,
    title: 'Design-First Philosophy',
    description: 'We believe technology should serve design. Every layer is intentional.',
  },
  {
    id: 3,
    title: 'Local Craftsmanship',
    description: 'Designed and printed in India, supporting local innovation and creativity.',
  },
  {
    id: 4,
    title: 'Sustainable Practices',
    description: 'Using eco-conscious materials and minimal waste production methods.',
  },
  {
    id: 5,
    title: 'Custom at Scale',
    description: 'Personalization without compromise. Make it uniquely yours.',
  },
  {
    id: 6,
    title: 'Community-Driven',
    description: 'Built by creators, for creators. Your feedback shapes what we build next.',
  },
]

export function WhyXYZLayers() {
  return (
    <section className="relative w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl lg:text-6xl font-black text-gray-900 font-[var(--font-poppins)] text-balance tracking-tight"
          >
            Why XYZ Layers
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-gray-600 font-[var(--font-inter)] max-w-2xl"
          >
            We&apos;re reimagining what 3D printing can be
          </motion.p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              variants={itemVariants}
              className="flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-[var(--font-poppins)] mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-600 font-[var(--font-inter)] leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
