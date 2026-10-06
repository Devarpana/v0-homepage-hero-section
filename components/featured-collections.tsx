'use client'

import Link from 'next/link'
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

const collections = [
  {
    id: 1,
    name: 'Home Essentials',
    description: 'Functional, beautiful pieces for every room',
    color: 'from-blue-400 to-blue-600',
    href: '/shop?category=Daily%20Essentials',
  },
  {
    id: 2,
    name: 'Design Objects',
    description: 'Art meets engineering in our signature collection',
    color: 'from-orange-400 to-orange-600',
    href: '/shop?category=Home%20Decor',
  },
  {
    id: 3,
    name: 'Personalized',
    description: 'Custom designs tailored to your vision',
    color: 'from-slate-400 to-slate-600',
    href: '/custom-orders',
  },
]

export function FeaturedCollections() {
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
            className="text-5xl lg:text-6xl font-black text-gray-900 font-[family-name:var(--font-poppins)] text-balance tracking-tight"
          >
            Featured Collections
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-gray-600 font-[family-name:var(--font-inter)] max-w-2xl"
          >
            Curated selections of our finest 3D-printed creations
          </motion.p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link href={collection.href} className="block relative overflow-hidden rounded-2xl bg-white border border-gray-200 h-64">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} opacity-10 group-hover:opacity-15 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-poppins)] mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-inter)]">
                    {collection.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-primary font-semibold font-[family-name:var(--font-poppins)] text-sm">
                    Explore
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
