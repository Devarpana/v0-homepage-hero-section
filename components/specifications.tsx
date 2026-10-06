'use client'

import { motion } from 'framer-motion'
import { STORE_WIDE_SPECS, type Product } from '@/lib/products'

export function Specifications({ product }: { product: Product }) {
  const specs = [...product.specs, ...STORE_WIDE_SPECS]

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
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 font-[family-name:var(--font-poppins)]">
            Specifications
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl font-[family-name:var(--font-inter)]">
            Detailed information about the {product.name}.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-gray-200"
        >
          <table className="w-full">
            <tbody>
              {specs.map((spec, i) => (
                <motion.tr
                  key={i}
                  variants={itemVariants}
                  className={`border-t border-gray-200 first:border-t-0 ${
                    i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="px-8 py-5 text-gray-600 font-medium font-[family-name:var(--font-poppins)]">
                    {spec.label}
                  </td>
                  <td className="px-8 py-5 text-gray-900 text-right font-[family-name:var(--font-inter)]">
                    {spec.value}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
