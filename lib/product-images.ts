import { supabase } from '@/lib/supabase'

// Product photos live in the public "products" Storage bucket; each one has a row in product_images.
export const PRODUCT_IMAGES_BUCKET = 'products'

export type ImageType = 'main' | 'gallery' | 'featured'

export type ProductImageRow = {
  id: string
  product_id: string
  image_url: string
  image_type: ImageType
  created_at?: string | null
}

// Path of the stored file inside the bucket, taken from its public URL.
function storagePath(imageUrl: string) {
  const marker = `/object/public/${PRODUCT_IMAGES_BUCKET}/`
  const index = imageUrl.indexOf(marker)
  return index === -1 ? null : decodeURIComponent(imageUrl.slice(index + marker.length))
}

export async function uploadProductImage(productId: string, file: File, type: ImageType) {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${productId}/${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false })
  if (uploadError) throw uploadError

  const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path)

  const { data: row, error: insertError } = await supabase
    .from('product_images')
    .insert({ product_id: productId, image_url: data.publicUrl, image_type: type })
    .select()
    .single()
  if (insertError) {
    // Don't leave an orphaned file behind if the row couldn't be saved.
    await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([path])
    throw insertError
  }
  return row as ProductImageRow
}

export async function deleteProductImages(images: ProductImageRow[]) {
  if (images.length === 0) return
  const { error } = await supabase
    .from('product_images')
    .delete()
    .in('id', images.map((image) => image.id))
  if (error) throw error

  const paths = images.map((image) => storagePath(image.image_url)).filter((p): p is string => Boolean(p))
  if (paths.length > 0) await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove(paths)
}

export async function getProductImages(productId: string) {
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return (data ?? []) as ProductImageRow[]
}
