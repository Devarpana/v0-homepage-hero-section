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

const categories = [
  {
    id: 1,
    title: 'Personalized Nameplates',
    description: 'Custom nameplates with intricate designs and personalization',
    gradient: 'from-blue-400 to-blue-200',
    icon: '📛'
  },
  {
    id: 2,
    title: 'Custom Gifts',
    description: 'Unique, thoughtful gifts tailored to your loved ones',
    gradient: 'from-pink-400 to-pink-200',
    icon: '🎁'
  },
  {
    id: 3,
    title: 'Desk Accessories',
    description: 'Functional and stylish organizers for your workspace',
    gradient: 'from-purple-400 to-purple-200',
    icon: '🖇️'
  },
  {
    id: 4,
    title: 'Home Decor',
    description: 'Statement pieces that elevate your living space',
    gradient: 'from-green-400 to-green-200',
    icon: '🏠'
  },
  {
    id: 5,
    title: 'Company Logos',
    description: 'Branded merchandise and promotional items',
    gradient: 'from-orange-400 to-orange-200',
    icon: '🏢'
  },
  {
    id: 6,
    title: 'Prototypes',
    description: 'Rapid prototyping for your product ideas',
    gradient: 'from-cyan-400 to-cyan-200',
    icon: '⚙️'
  },
]

export function WhatWeCanCreate() {
  return (
    <section className="relative w-full py-24 bg-white">
      <div className="container-site">
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
            What We Can Create
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-gray-600 font-[var(--font-inter)] max-w-2xl"
          >
            From personalized gifts to complex prototypes, we bring your ideas to life
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative h-72 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-xl">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20`} />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 font-[var(--font-poppins)] mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 font-[var(--font-inter)] text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-primary/5 backdrop-blur-sm flex items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-primary text-white rounded-full font-semibold text-sm font-[var(--font-poppins)] shadow-lg"
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
