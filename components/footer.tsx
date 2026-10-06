'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { SITE } from '@/lib/site'

const itemVariants: Variants = {
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
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="col-span-1">
            <div className="mb-4">
              <h3 className="text-2xl font-black font-[family-name:var(--font-poppins)] text-white mb-2">
                XYZ Layers
              </h3>
              <p className="text-sm text-gray-400 font-[family-name:var(--font-inter)]">
                Precision 3D printing for creators
              </p>
            </div>
            {SITE.socials.length > 0 && (
              <div className="flex gap-4 mt-6">
                {SITE.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <span className="text-sm">{social.label}</span>
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Products */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold font-[family-name:var(--font-poppins)] text-white mb-4">
              Products
            </h4>
            <ul className="space-y-2 text-sm text-gray-400 font-[family-name:var(--font-inter)]">
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/custom-orders" className="hover:text-primary transition-colors">
                  Custom Orders
                </Link>
              </li>
              <li>
                <Link href="/#trending" className="hover:text-primary transition-colors">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors">
                  New Releases
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold font-[family-name:var(--font-poppins)] text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-400 font-[family-name:var(--font-inter)]">
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              {SITE.email && (
                <li>
                  <a href={`mailto:${SITE.email}`} className="hover:text-primary transition-colors">
                    {SITE.email}
                  </a>
                </li>
              )}
              {SITE.phone && (
                <li>
                  <a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`} className="hover:text-primary transition-colors">
                    {SITE.phone}
                  </a>
                </li>
              )}
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
          className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-[family-name:var(--font-inter)]"
        >
          <p>© {currentYear} XYZ Layers. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>Designed &amp; Printed in India with Precision</span>
            <Link href="/admin" className="text-gray-600 hover:text-gray-300 transition-colors">
              Admin
            </Link>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
