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

// Uploads a file to the bucket and returns its storage path and public URL.
async function uploadFile(productId: string, file: File, prefix: string) {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${productId}/${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false })
  if (error) throw error

  const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path)
  return { path, publicUrl: data.publicUrl }
}

// Photo for one colour option; its URL is stored in products.colors, not product_images.
export async function uploadColorImage(productId: string, file: File) {
  return (await uploadFile(productId, file, 'color')).publicUrl
}

// Removes stored files by their public URLs (used for colour photos that were replaced or removed).
export async function removeStoredImages(imageUrls: string[]) {
  const paths = imageUrls.map(storagePath).filter((p): p is string => Boolean(p))
  if (paths.length > 0) await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove(paths)
}

export async function uploadProductImage(productId: string, file: File, type: ImageType) {
  const { path, publicUrl } = await uploadFile(productId, file, type)

  const { data: row, error: insertError } = await supabase
    .from('product_images')
    .insert({ product_id: productId, image_url: publicUrl, image_type: type })
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

  await removeStoredImages(images.map((image) => image.image_url))
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
