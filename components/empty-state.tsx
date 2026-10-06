'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-24 px-6"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mb-8"
      >
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-4xl">
          🔍
        </div>
      </motion.div>

      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-poppins)] text-center">
        No products found
      </h3>

      <p className="text-gray-600 mb-8 max-w-md text-center font-[family-name:var(--font-inter)]">
        We couldn&apos;t find any products matching your search. Try adjusting your filters or 
        exploring our full collection.
      </p>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 py-6 font-[family-name:var(--font-poppins)] shadow-lg hover:shadow-xl transition-all"
        >
          View All Products
        </Button>
      </motion.div>
    </motion.div>
  )
}
