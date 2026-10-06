'use client'

import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'

export function ProductShowcaseSection({ product }: { product: Product }) {
  // A second photo if there is one, otherwise the featured/main image; placeholder if none.
  const image = product.featuredImage ?? product.gallery[0] ?? product.image

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
          >
            {image ? (
              <img src={image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 text-center">
                <div className="text-6xl mb-4">📦</div>
                <p className="font-[family-name:var(--font-inter)]">Lifestyle Image</p>
              </div>
            )}
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 font-[family-name:var(--font-poppins)] text-balance">
                Design That Inspires Every Day
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed font-[family-name:var(--font-inter)]">
                Our design philosophy is simple: create products that don&apos;t just function, but elevate your everyday experience. 
                Each piece is thoughtfully designed to bring both beauty and practicality to your workspace.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-[family-name:var(--font-poppins)]">
                  Precision Engineering
                </h3>
                <p className="text-gray-600 font-[family-name:var(--font-inter)]">
                  Every layer matters. Our 3D printing process ensures consistent quality with a 0.2mm layer height for smooth, professional results.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-[family-name:var(--font-poppins)]">
                  Practical Benefits
                </h3>
                <p className="text-gray-600 font-[family-name:var(--font-inter)]">
                  Designed for real life. Thoughtful details make it easy to use every day, while the premium material ensures durability for years to come.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-[family-name:var(--font-poppins)]">
                  Everyday Use Cases
                </h3>
                <p className="text-gray-600 font-[family-name:var(--font-inter)]">
                  Perfect for homes, offices, classrooms, studios, and workspaces. Made to be used every day.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
