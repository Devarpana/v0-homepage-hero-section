import { AdminProductForm } from '@/components/admin-product-form'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !product) {
    notFound()
  }

  return (
    <AdminProductForm
      initialData={product}
      isEditing={true}
    />
  )
}
