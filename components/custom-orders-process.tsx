'use client'

import { motion, type Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
    number: 1,
    title: 'Share Your Idea',
    description: 'Tell us what you\'re imagining. Upload sketches, references, or just describe your vision.',
  },
  {
    number: 2,
    title: 'Design Consultation',
    description: 'Our design team refines your concept and creates a digital prototype for your approval.',
  },
  {
    number: 3,
    title: 'Precision Printing',
    description: 'We print your design with meticulous attention to detail and material quality.',
  },
  {
    number: 4,
    title: 'Delivery',
    description: 'Your custom creation arrives carefully packaged and ready to impress.',
  },
]

export function CustomOrdersProcess() {
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
            A simple four-step process from idea to delivery
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative flex flex-col"
            >
              {/* Step circle */}
              <div className="flex items-start gap-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl font-[family-name:var(--font-poppins)] shadow-lg"
                >
                  {step.number}
                </motion.div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-32 top-8 w-8 h-px bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>

              {/* Content */}
              <div className="mt-6 pl-6 lg:pl-0">
                <h3 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-poppins)] mb-2">
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
