'use client'

import { Card } from '@/components/ui/card'
import { Edit2, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'inactive'
}

interface AdminProductsTableProps {
  products: Product[]
  onDelete?: (id: string) => void
}

export function AdminProductsTable({ products, onDelete }: AdminProductsTableProps) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[var(--font-poppins)]">Name</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[var(--font-poppins)]">Category</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[var(--font-poppins)]">Price</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[var(--font-poppins)]">Stock</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[var(--font-poppins)]">Status</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[var(--font-poppins)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground font-[var(--font-poppins)]">{product.name}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground font-[var(--font-poppins)]">₹{product.price.toLocaleString()}</p>
                </td>
                <td className="px-6 py-4">
                  <p className={`text-sm font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                    {product.stock} units
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    product.status === 'active'
                      ? 'bg-green-500/10 text-green-700'
                      : 'bg-gray-500/10 text-gray-700'
                  }`}>
                    {product.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete?.(product.id)}
                      className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
