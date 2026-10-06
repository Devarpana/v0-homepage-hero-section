'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AdminProductsTable } from '@/components/admin-products-table'
import { Loader2, Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { toast } from 'sonner'
import { requireSupabase } from '@/lib/supabase'
import { adminError, removeProductImages, type AdminProduct } from '@/lib/admin'
import { useAdminQuery } from '@/hooks/use-admin-query'

export default function ProductsPage() {
  const { data, setData, loading, error, reload } = useAdminQuery<AdminProduct[]>(() =>
    requireSupabase().from('products').select('*').order('created_at', { ascending: false }),
  )
  const [searchQuery, setSearchQuery] = useState('')

  const products = (data ?? []).map((p) => ({
    id: String(p.id),
    name: p.name,
    category: p.category ?? '',
    price: Number(p.price ?? 0),
    stock: p.stock ?? 0,
    image: p.image_url,
    featured: Boolean(p.featured),
    live: (p.visibility ?? 'public') === 'public' && (p.status ?? 'active') === 'active',
  }))

  const q = searchQuery.toLowerCase()
  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))

  const handleDelete = async (id: string) => {
    const product = (data ?? []).find((p) => String(p.id) === id)
    if (!window.confirm(`Delete "${product?.name ?? 'this product'}"? This cannot be undone.`)) return

    const { error: deleteError } = await requireSupabase().from('products').delete().eq('id', id)
    if (deleteError) {
      toast.error('Failed to delete product', { description: adminError(deleteError) })
      return
    }

    setData((current) => (current ?? []).filter((p) => String(p.id) !== id))
    if (product) {
      await removeProductImages([product.image_url, product.featured_image_url, ...(product.gallery_urls ?? [])])
    }
    toast.success('Product deleted')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-[family-name:var(--font-poppins)]">Products</h1>
          <p className="text-muted-foreground mt-2">Manage your product catalog</p>
        </div>

        <Link href="/admin/products/new">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-[family-name:var(--font-poppins)]">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </motion.div>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
      </div>

      {error ? (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          <p>{error}</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={reload}>
            Try again
          </Button>
        </div>
      ) : loading && !data ? (
        <div className="flex justify-center py-12" role="status" aria-label="Loading products">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <AdminProductsTable products={filteredProducts} onDelete={handleDelete} />

          {filteredProducts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-muted-foreground mb-4">{products.length === 0 ? 'No products yet' : 'No products match your search'}</p>
              {products.length === 0 && (
                <Link href="/admin/products/new">
                  <Button variant="outline" className="gap-2 font-[family-name:var(--font-poppins)]">
                    <Plus className="w-4 h-4" />
                    Create First Product
                  </Button>
                </Link>
              )}
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}
