'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { AdminProductForm } from '@/components/admin-product-form'
import { Button } from '@/components/ui/button'
import { requireSupabase } from '@/lib/supabase'
import type { AdminProduct } from '@/lib/admin'
import { useAdminQuery } from '@/hooks/use-admin-query'

// Client-side on purpose: hidden and inactive products are only readable with the admin's own
// login, which lives in the browser, so the server cannot fetch them.
export default function EditProductPage() {
  const { id } = useParams<{ id: string }>()
  const { data: product, loading, error } = useAdminQuery<AdminProduct | null>(() =>
    requireSupabase().from('products').select('*').eq('id', id).maybeSingle(),
  )

  if (loading) {
    return (
      <div className="flex justify-center py-12" role="status" aria-label="Loading product">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-poppins)]">Product not found</h1>
        <p className="text-muted-foreground">{error ?? 'It may have been deleted.'}</p>
        <Button asChild variant="outline">
          <Link href="/admin/products">Back to products</Link>
        </Button>
      </div>
    )
  }

  return <AdminProductForm initialData={product} isEditing />
}
