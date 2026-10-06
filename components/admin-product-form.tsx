'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUploader, type ImageSelection } from '@/components/image-uploader'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { requireSupabase } from '@/lib/supabase'
import { adminError, removeProductImages, uploadProductImage, type AdminProduct } from '@/lib/admin'
import { CATEGORIES } from '@/lib/products'

interface ProductFormProps {
  initialData?: AdminProduct
  isEditing?: boolean
}

const labelClass = 'block text-sm font-medium text-foreground mb-2 font-[family-name:var(--font-poppins)]'
const selectClass = 'w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground'

export function AdminProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter()

  // Numbers are kept as text while typing, so "0." or an empty box never turns into NaN.
  const [formData, setFormData] = useState({
    name: initialData?.name ?? '',
    category: initialData?.category ?? CATEGORIES[0],
    price: initialData?.price != null ? String(initialData.price) : '',
    compareAtPrice: initialData?.compare_at_price != null ? String(initialData.compare_at_price) : '',
    stock: initialData?.stock != null ? String(initialData.stock) : '0',
    description: initialData?.description ?? '',
    specs: initialData?.specs ?? '',
    status: initialData?.status ?? 'active',
    visibility: initialData?.visibility ?? 'public',
    featured: Boolean(initialData?.featured),
    trending: Boolean(initialData?.trending),
  })

  const savedMain = initialData?.image_url ? [initialData.image_url] : []
  const savedGallery = initialData?.gallery_urls ?? []
  const savedFeatured = initialData?.featured_image_url ? [initialData.featured_image_url] : []

  const [main, setMain] = useState<ImageSelection>({ existing: savedMain, files: [] })
  const [gallery, setGallery] = useState<ImageSelection>({ existing: savedGallery, files: [] })
  const [featuredImage, setFeaturedImage] = useState<ImageSelection>({ existing: savedFeatured, files: [] })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories: string[] = [...CATEGORIES]
  if (formData.category && !categories.includes(formData.category)) categories.push(formData.category)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    const price = parseFloat(formData.price)
    const stock = parseInt(formData.stock, 10)
    const compareAt = formData.compareAtPrice.trim() === '' ? null : parseFloat(formData.compareAtPrice)

    if (!Number.isFinite(price) || price < 0) return void toast.error('Enter a valid price')
    if (!Number.isInteger(stock) || stock < 0) return void toast.error('Stock must be a whole number, 0 or more')
    if (compareAt !== null && (!Number.isFinite(compareAt) || compareAt <= price)) {
      return void toast.error('The original price must be higher than the selling price')
    }

    setIsSubmitting(true)
    const uploaded: string[] = []

    try {
      const supabase = requireSupabase()
      const upload = async (file: File) => {
        const url = await uploadProductImage(file)
        uploaded.push(url)
        return url
      }

      const imageUrl = main.files[0] ? await upload(main.files[0]) : (main.existing[0] ?? null)
      const featuredUrl = featuredImage.files[0] ? await upload(featuredImage.files[0]) : (featuredImage.existing[0] ?? null)
      const galleryUrls = [...gallery.existing]
      for (const file of gallery.files) galleryUrls.push(await upload(file))

      const row = {
        name: formData.name.trim(),
        category: formData.category,
        price,
        compare_at_price: compareAt,
        stock,
        description: formData.description.trim() || null,
        specs: formData.specs.trim() || null,
        status: formData.status,
        visibility: formData.visibility,
        featured: formData.featured,
        trending: formData.trending,
        image_url: imageUrl,
        gallery_urls: galleryUrls,
        featured_image_url: featuredUrl,
      }

      const { error } =
        isEditing && initialData
          ? await supabase.from('products').update(row).eq('id', initialData.id)
          : await supabase.from('products').insert(row)
      if (error) throw error

      // Saved. Drop photos that were replaced or removed (best effort).
      const keep = new Set([imageUrl, featuredUrl, ...galleryUrls])
      await removeProductImages([...savedMain, ...savedGallery, ...savedFeatured].filter((url) => !keep.has(url)))

      toast.success(isEditing ? 'Product updated' : 'Product created')
      router.push('/admin/products')
    } catch (err) {
      // Don't leave orphaned uploads behind when the save itself failed.
      await removeProductImages(uploaded)
      toast.error(isEditing ? 'Failed to update product' : 'Failed to create product', { description: adminError(err) })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="text-primary hover:text-primary/80 transition-colors font-[family-name:var(--font-inter)]">
          ← Back to Products
        </Link>
      </div>

      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6 font-[family-name:var(--font-poppins)]">Basic Information</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className={labelClass}>Product Name *</label>
            <Input id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Modular Desk Organizer" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className={labelClass}>Category *</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} className={selectClass}>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="stock" className={labelClass}>Stock *</label>
              <Input id="stock" type="number" name="stock" min={0} step={1} value={formData.stock} onChange={handleChange} placeholder="0" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className={labelClass}>Price (₹) *</label>
              <Input id="price" type="number" name="price" min={0} step="0.01" value={formData.price} onChange={handleChange} placeholder="0" required />
            </div>
            <div>
              <label htmlFor="compareAtPrice" className={labelClass}>Original price (₹)</label>
              <Input id="compareAtPrice" type="number" name="compareAtPrice" min={0} step="0.01" value={formData.compareAtPrice} onChange={handleChange} placeholder="Optional: shows a strikethrough and discount" />
            </div>
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>Description</label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Product description and details" rows={4} />
          </div>

          <div>
            <label htmlFor="specs" className={labelClass}>Specifications</label>
            <Textarea
              id="specs"
              name="specs"
              value={formData.specs}
              onChange={handleChange}
              placeholder={'One per line, as "Label: value"\nDimensions: 15 × 8 × 4 cm\nWeight: 220g'}
              rows={4}
            />
          </div>
        </div>
      </Card>

      {/* Visibility */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6 font-[family-name:var(--font-poppins)]">Visibility</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="status" className={labelClass}>Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className={selectClass}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label htmlFor="visibility" className={labelClass}>Visibility</label>
            <select id="visibility" name="visibility" value={formData.visibility} onChange={handleChange} className={selectClass}>
              <option value="public">Public: shown in the store</option>
              <option value="hidden">Hidden: not shown in the store</option>
            </select>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Only active, public products appear in the store and can be ordered.</p>

        <div className="mt-4 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="h-4 w-4" />
            Featured (highlighted on the shop page)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="trending" checked={formData.trending} onChange={handleChange} className="h-4 w-4" />
            Trending (shown in &ldquo;Trending Now&rdquo; on the homepage)
          </label>
        </div>
      </Card>

      {/* Image Management */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6 font-[family-name:var(--font-poppins)]">Images</h2>

        <div className="space-y-6">
          <ImageUploader
            label="Main Product Image"
            description="This is the primary image shown on product listings"
            existing={savedMain}
            onChange={setMain}
          />
          <ImageUploader
            label="Gallery Images"
            description="Additional product images (up to 5 images)"
            existing={savedGallery}
            onChange={setGallery}
            multiple
            maxFiles={5}
          />
          <ImageUploader
            label="Featured Image"
            description="Image used for the featured section on the shop page"
            existing={savedFeatured}
            onChange={setFeaturedImage}
          />
        </div>
      </Card>

      {/* Form Actions */}
      <div className="flex gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-primary-foreground font-[family-name:var(--font-poppins)]">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving…
              </>
            ) : isEditing ? (
              'Update Product'
            ) : (
              'Create Product'
            )}
          </Button>
        </motion.div>

        <Link href="/admin/products">
          <Button variant="outline" type="button" className="font-[family-name:var(--font-poppins)]">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  )
}
