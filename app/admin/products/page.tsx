'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AdminProductsTable } from '@/components/admin-products-table'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from "@/lib/supabase"
import { useEffect } from "react"



export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  )

  if (!confirmed) return

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)

  if (error) {
    console.error(error)
    alert("Failed to delete product")
    return
  }

  setProducts((prev) =>
    prev.filter((p) => p.id !== id)
  )

  alert("Product deleted successfully!")
}

  useEffect(() => {
      const loadProducts = async () => {
        console.log(
      "SUPABASE URL:",
      process.env.NEXT_PUBLIC_SUPABASE_URL
    )

    console.log("Loading products...")
    
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setProducts(
    (data || []).map((product) => ({
      ...product,
      featured: Boolean(product.is_featured),
      trending: Boolean(product.is_trending),
      signature: Boolean(product.is_signature),
      visibility: product.status === "hidden" ? "hidden" : "public",
    }))
  )
    }

  loadProducts()
}, [])

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
