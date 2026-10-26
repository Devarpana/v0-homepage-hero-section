'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function PersonalizationSection() {
  const [selectedOptions, setSelectedOptions] = useState({
    addName: false,
    addText: false,
    uploadLogo: false,
    customColor: 'blue'
  })

  const options = [
    {
      id: 'addName',
      title: 'Add Name',
      description: 'Engrave your name on the organizer',
      icon: '👤'
    },
    {
      id: 'addText',
      title: 'Add Text',
      description: 'Custom text engraving up to 20 characters',
      icon: '✏️'
    },
    {
      id: 'uploadLogo',
      title: 'Upload Logo',
      description: 'Add your company or personal logo',
      icon: '🎨'
    },
    {
      id: 'customColor',
      title: 'Custom Color',
      description: 'Choose from 10+ premium colors',
      icon: '🎭'
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
    <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 font-[var(--font-poppins)] text-balance">
            Make It Yours
          </h2>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl font-[var(--font-inter)]">
            Personalize your desk organizer with custom options that reflect your style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Options Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {options.map((option) => (
              <motion.button
                key={option.id}
                variants={itemVariants}
                onClick={() => {
                  if (option.id === 'customColor') {
                    setSelectedOptions({
                      ...selectedOptions,
                      [option.id]: selectedOptions.customColor === 'blue' ? 'black' : 'blue'
                    })
                  } else {
                    setSelectedOptions({
                      ...selectedOptions,
                      [option.id]: !selectedOptions[option.id as keyof typeof selectedOptions]
                    })
                  }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <span className="text-3xl">{option.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 font-[var(--font-poppins)]">
                        {option.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1 font-[var(--font-inter)]">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedOptions[option.id as keyof typeof selectedOptions]
                      ? 'bg-primary border-primary'
                      : 'border-gray-300 group-hover:border-primary'
                  }`}>
                    {selectedOptions[option.id as keyof typeof selectedOptions] && (
                      <Plus className="w-4 h-4 text-white rotate-45" />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Right - Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="sticky top-32"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Preview Image */}
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-gray-500 font-[var(--font-inter)]">Personalization Preview</p>
                </div>
              </div>

              {/* Preview Details */}
              <div className="p-8 space-y-6">
                <div>
                  <p className="text-sm text-gray-600 uppercase tracking-wider font-[var(--font-inter)] mb-2">
                    Your Custom Organizer
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 font-[var(--font-poppins)]">
                    Modular Desk Organizer
                  </h3>
                </div>

                <div className="space-y-3 py-6 border-y border-gray-200">
                  {selectedOptions.addName && (
                    <p className="text-sm text-gray-700 font-[var(--font-inter)]">
                      ✓ Name Engraving: Your Name
                    </p>
                  )}
                  {selectedOptions.addText && (
                    <p className="text-sm text-gray-700 font-[var(--font-inter)]">
                      ✓ Custom Text: Your Message Here
                    </p>
                  )}
                  {selectedOptions.uploadLogo && (
                    <p className="text-sm text-gray-700 font-[var(--font-inter)]">
                      ✓ Logo Engraving: Included
                    </p>
                  )}
                  {Object.values(selectedOptions).some(v => v === true || (typeof v === 'string' && v !== 'blue')) && (
                    <div className="pt-3">
                      <p className="text-sm font-medium text-primary font-[var(--font-poppins)]">
                        {Object.values(selectedOptions).filter(v => v === true || (typeof v === 'string' && v !== 'blue')).length} options selected
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-2 font-[var(--font-inter)]">From</p>
                  <p className="text-3xl font-bold text-gray-900 font-[var(--font-poppins)]">
                    ₹1,499
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-full h-12 text-base font-[var(--font-poppins)]"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
