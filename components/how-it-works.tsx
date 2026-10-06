'use client'

import { motion, type Variants } from 'framer-motion'

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

const steps = [
  {
    id: 1,
    title: 'Design Your Vision',
    description: 'Start with your ideas. Upload a design or work with our team to bring your vision to life.',
    icon: '✎',
  },
  {
    id: 2,
    title: 'Prototype Review',
    description: 'We create a 3D model and send samples for your approval. Perfect it before production.',
    icon: '✓',
  },
  {
    id: 3,
    title: 'Precision Printing',
    description: 'Using state-of-the-art 3D printers, we manufacture your products layer by layer with precision.',
    icon: '⚙',
  },
  {
    id: 4,
    title: 'Quality & Finishing',
    description: 'Every piece is inspected, finished, and packaged with care for delivery to your doorstep.',
    icon: '★',
  },
]

export function HowItWorks() {
  return (
    <section className="relative w-full py-24 bg-gray-50">
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
            className="text-5xl lg:text-6xl font-black text-gray-900 font-[family-name:var(--font-poppins)] text-balance tracking-tight"
          >
            How It Works
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-gray-600 font-[family-name:var(--font-inter)] max-w-2xl"
          >
            From concept to reality in four simple steps
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="flex gap-8 items-start"
            >
              {/* Number and connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                  <span className="text-2xl font-black text-primary font-[family-name:var(--font-poppins)]">
                    {step.id}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <motion.div
                    className="w-0.5 h-20 bg-gradient-to-b from-primary/30 to-transparent mt-4"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="pt-2 flex-1">
                <h3 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-poppins)] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-[family-name:var(--font-inter)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
