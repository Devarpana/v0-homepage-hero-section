'use client'

import { Card } from '@/components/ui/card'
import { Edit2, Trash2, Package } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Product {
  id: string
  image?: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'inactive'
  featured?: boolean
  trending?: boolean
  signature?: boolean
  visibility?: 'public' | 'hidden'
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
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[var(--font-poppins)]">Product</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[var(--font-poppins)]">Category</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[var(--font-poppins)]">Price</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[var(--font-poppins)]">Stock</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[var(--font-poppins)]">Homepage</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-foreground font-[var(--font-poppins)]">Visibility</th>
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
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full rounded-lg object-cover" />
                      ) : (
                        <Package className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <p className="font-medium text-foreground font-[var(--font-poppins)]">{product.name}</p>
                  </div>
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
                  <div className="flex flex-wrap gap-1.5">
                    {product.featured && <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Featured</span>}
                    {product.trending && <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">Trending</span>}
                    {product.signature && <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-900/10 text-gray-900">Signature</span>}
                    {!product.featured && !product.trending && !product.signature && <span className="text-xs text-muted-foreground">None</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    product.visibility === 'public'
                      ? 'bg-blue-500/10 text-blue-700'
                      : 'bg-gray-500/10 text-gray-700'
                  }`}>
                    {product.visibility === 'public' ? 'Public' : 'Hidden'}
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
