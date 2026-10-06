'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export function CustomOrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectTitle: '',
    description: '',
    budget: '',
    deadline: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', projectTitle: '', description: '', budget: '', deadline: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section id="custom-form" className="relative w-full py-24 bg-white">
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
            className="text-5xl lg:text-6xl font-black text-gray-900 font-[family-name:var(--font-poppins)] text-balance tracking-tight"
          >
            Tell Us Your Vision
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-gray-600 font-[family-name:var(--font-inter)] max-w-2xl mx-auto"
          >
            Fill out the form below and our team will get back to you within 24 hours
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-900 font-[family-name:var(--font-poppins)] mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none transition-colors font-[family-name:var(--font-inter)]"
                placeholder="Your name"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-900 font-[family-name:var(--font-poppins)] mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none transition-colors font-[family-name:var(--font-inter)]"
                placeholder="your@email.com"
              />
            </motion.div>
          </div>

          {/* Row 2: Phone & Project Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-900 font-[family-name:var(--font-poppins)] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none transition-colors font-[family-name:var(--font-inter)]"
                placeholder="+91 9876543210"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-900 font-[family-name:var(--font-poppins)] mb-2">
                Project Title
              </label>
              <input
                type="text"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none transition-colors font-[family-name:var(--font-inter)]"
                placeholder="e.g., Custom Desk Organizer"
              />
            </motion.div>
          </div>

          {/* Description */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-900 font-[family-name:var(--font-poppins)] mb-2">
              Project Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none transition-colors font-[family-name:var(--font-inter)] resize-none"
              placeholder="Describe your project in detail. Share your ideas, inspirations, and any specific requirements..."
            />
          </motion.div>

          {/* Row 3: Budget & Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-900 font-[family-name:var(--font-poppins)] mb-2">
                Budget (Optional)
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none transition-colors font-[family-name:var(--font-inter)]"
              >
                <option value="">Select budget range</option>
                <option value="under-5000">Under ₹5,000</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-25000">₹10,000 - ₹25,000</option>
                <option value="25000-50000">₹25,000 - ₹50,000</option>
                <option value="above-50000">Above ₹50,000</option>
              </select>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-900 font-[family-name:var(--font-poppins)] mb-2">
                Deadline (Optional)
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none transition-colors font-[family-name:var(--font-inter)]"
              />
            </motion.div>
          </div>

          {/* File Upload */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-900 font-[family-name:var(--font-poppins)] mb-2">
              Upload Files (Optional)
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer group">
              <input
                type="file"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <div className="text-3xl mb-2">📎</div>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-inter)]">
                  Drag and drop your files here, or click to browse
                </p>
                <p className="text-xs text-gray-500 mt-1 font-[family-name:var(--font-inter)]">
                  Supported: Images, PDFs, sketches (Max 10MB)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-lg font-[family-name:var(--font-poppins)] shadow-lg hover:shadow-xl transition-all"
            >
              {submitted ? '✓ Request Submitted!' : 'Submit Custom Order Request'}
            </motion.button>
          </motion.div>

          {/* Legal note */}
          <motion.p
            variants={itemVariants}
            className="text-xs text-gray-500 text-center font-[family-name:var(--font-inter)]"
          >
            By submitting this form, you agree to our Terms of Service and Privacy Policy
          </motion.p>
        </motion.form>
      </div>
    </section>
  )
}
