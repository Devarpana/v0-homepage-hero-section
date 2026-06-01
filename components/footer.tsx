'use client'

import { motion } from 'framer-motion'

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="col-span-1">
            <div className="mb-4">
              <h3 className="text-2xl font-black font-[var(--font-poppins)] text-white mb-2">
                XYZ Layers
              </h3>
              <p className="text-sm text-gray-400 font-[var(--font-inter)]">
                Precision 3D printing for creators
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="text-sm">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="text-sm">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Products */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold font-[var(--font-poppins)] text-white mb-4">
              Products
            </h4>
            <ul className="space-y-2 text-sm text-gray-400 font-[var(--font-inter)]">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Custom Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Trending
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  New Releases
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold font-[var(--font-poppins)] text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-400 font-[var(--font-inter)]">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold font-[var(--font-poppins)] text-white mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-gray-400 font-[var(--font-inter)]">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Returns
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gray-800 mb-8" />

        {/* Bottom footer */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-[var(--font-inter)]"
        >
          <p>© {currentYear} XYZ Layers. All rights reserved.</p>
          <p>Designed & Printed in India with Precision</p>
        </motion.div>
      </div>
    </footer>
  )
}
