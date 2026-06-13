'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AdminProductsTable } from '@/components/admin-products-table'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import Link from 'next/link'

const mockProducts = [
  { id: '1', name: 'Modular Desk Organizer', category: 'Daily Essentials', price: 1299, stock: 15, status: 'active' as const, featured: true, visibility: 'public' as const },
  { id: '2', name: 'Phone Stand Pro', category: 'Daily Essentials', price: 799, stock: 8, status: 'active' as const, featured: false, visibility: 'public' as const },
  { id: '3', name: 'Geometric Planter', category: 'Home Decor', price: 1599, stock: 5, status: 'active' as const, featured: true, visibility: 'public' as const },
  { id: '4', name: 'Articulated Dragon', category: 'Toys', price: 4999, stock: 0, status: 'inactive' as const, featured: false, visibility: 'hidden' as const },
  { id: '5', name: 'Headphone Holder', category: 'Daily Essentials', price: 549, stock: 24, status: 'active' as const, featured: false, visibility: 'public' as const },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-[var(--font-poppins)]">Products</h1>
          <p className="text-muted-foreground mt-2">Manage your product catalog</p>
        </div>

        <Link href="/admin/products/new">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-[var(--font-poppins)]">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </motion.div>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <AdminProductsTable products={filteredProducts} onDelete={handleDelete} />

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground mb-4">No products found</p>
          <Link href="/admin/products/new">
            <Button variant="outline" className="gap-2 font-[var(--font-poppins)]">
              <Plus className="w-4 h-4" />
              Create First Product
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  )
}
