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

const projects = [
  {
    id: 1,
    title: 'Custom Desk Organizer Set',
    category: 'Business',
    gradient: 'from-blue-300 to-blue-100',
    client: 'TechStartup Inc.'
  },
  {
    id: 2,
    title: 'Personalized Wedding Favors',
    category: 'Personal',
    gradient: 'from-pink-300 to-pink-100',
    client: 'Sarah & Mike'
  },
  {
    id: 3,
    title: 'Company Logo Sculpture',
    category: 'Corporate',
    gradient: 'from-purple-300 to-purple-100',
    client: 'Design Agency Co.'
  },
  {
    id: 4,
    title: 'Architectural Scale Model',
    category: 'Professional',
    gradient: 'from-orange-300 to-orange-100',
    client: 'Architecture Firm'
  },
  {
    id: 5,
    title: 'Custom Gaming Setup Organizer',
    category: 'Personal',
    gradient: 'from-green-300 to-green-100',
    client: 'Gaming Community'
  },
  {
    id: 6,
    title: 'Product Prototype Series',
    category: 'Innovation',
    gradient: 'from-yellow-300 to-yellow-100',
    client: 'Startup Studio'
  },
]

export function PreviousCustomProjects() {
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
            className="text-5xl lg:text-6xl font-black text-gray-900 font-[var(--font-poppins)] text-balance tracking-tight"
          >
            Previous Custom Projects
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-gray-600 font-[var(--font-inter)] max-w-2xl"
          >
            See what we&apos;ve created for clients like you
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 h-64 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />

                {/* Content overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full mb-3 font-[var(--font-poppins)]">
                      {project.category}
                    </span>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white font-[var(--font-poppins)] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-300 font-[var(--font-inter)]">
                    by {project.client}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Browse all button */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold font-[var(--font-poppins)] shadow-lg hover:shadow-xl transition-all"
          >
            Browse All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
