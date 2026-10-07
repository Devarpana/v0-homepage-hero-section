'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUploader } from '@/components/image-uploader'
import { Switch } from '@/components/ui/switch'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from "@/lib/supabase"
import {
  deleteProductImages,
  getProductImages,
  uploadProductImage,
  type ImageType,
  type ProductImageRow,
} from "@/lib/product-images"

interface ProductFormProps {
  initialData?: {
    id: string
    name: string
    category: string
    price: number
    stock: number
    description: string
    mainImage?: File
    galleryImages?: File[]
    featuredImage?: File
    status?: string | null
    is_featured?: boolean | null
    is_trending?: boolean | null
    is_signature?: boolean | null
    is_customizable?: boolean | null
  }
  isEditing?: boolean
}

export function AdminProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || 'Daily Essentials',
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    description: initialData?.description || '',
  })

  // Controls where the product appears on the website.
  const [placement, setPlacement] = useState({
    visible: initialData?.status !== 'hidden',
    is_featured: Boolean(initialData?.is_featured),
    is_trending: Boolean(initialData?.is_trending),
    is_signature: Boolean(initialData?.is_signature),
    is_customizable: Boolean(initialData?.is_customizable),
  })

  const placementFields = {
    status: placement.visible ? 'active' : 'hidden',
    is_featured: placement.is_featured,
    is_trending: placement.is_trending,
    is_signature: placement.is_signature,
    is_customizable: placement.is_customizable,
  }

  const [mainImage, setMainImage] = useState<File | null>(null)
  const [galleryImages, setGalleryImages] = useState<File[]>([])
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savingStep, setSavingStep] = useState('')
  const router = useRouter()

  // Images already saved for this product (edit mode), and the ones marked for removal.
  const [existingImages, setExistingImages] = useState<ProductImageRow[]>([])
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([])

  useEffect(() => {
    if (!isEditing || !initialData?.id) return
    getProductImages(initialData.id)
      .then(setExistingImages)
      .catch((err) => console.error('Failed to load product images', err))
  }, [isEditing, initialData?.id])

  const keptImages = (type: ImageType) =>
    existingImages.filter((image) => image.image_type === type && !removedImageIds.includes(image.id))
  const galleryLimit = Math.max(0, 5 - keptImages('gallery').length)

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target

  setFormData((prev) => ({
    ...prev,
    [name]:
      name === 'price' || name === 'stock'
        ? (value === '' ? 0 : parseFloat(value))
        : value,
  }))
}


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  const productFields = {
    name: formData.name,
    category: formData.category,
    price: formData.price,
    stock: formData.stock,
    description: formData.description,
    ...placementFields,
  }

  try {
    setSavingStep('Saving product...')
    let productId = initialData?.id

    if (isEditing && productId) {
      const { error } = await supabase.from("products").update(productFields).eq("id", productId)
      if (error) throw error
    } else {
      const { data, error } = await supabase.from("products").insert([productFields]).select("id").single()
      if (error) throw error
      productId = data.id
    }
    if (!productId) throw new Error("Product was saved without an id")

    // A new main or featured image replaces the old one.
    const toDelete = existingImages.filter(
      (image) =>
        removedImageIds.includes(image.id) ||
        (mainImage && image.image_type === "main") ||
        (featuredImage && image.image_type === "featured")
    )
    if (toDelete.length > 0) {
      setSavingStep("Removing old images...")
      await deleteProductImages(toDelete)
    }

    const uploads: [File, ImageType][] = [
      ...(mainImage ? [[mainImage, "main"] as [File, ImageType]] : []),
      ...galleryImages.slice(0, galleryLimit).map((file) => [file, "gallery"] as [File, ImageType]),
      ...(featuredImage ? [[featuredImage, "featured"] as [File, ImageType]] : []),
    ]
    for (const [index, [file, type]] of uploads.entries()) {
      setSavingStep(`Uploading image ${index + 1} of ${uploads.length}...`)
      await uploadProductImage(productId, file, type)
    }

    alert(isEditing ? "Product updated successfully!" : "Product created successfully!")
    router.push("/admin/products")
    router.refresh()
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : (err as { message?: string })?.message
    alert(`${isEditing ? "Failed to update product" : "Failed to create product"}${message ? `: ${message}` : ""}`)
  } finally {
    setIsSubmitting(false)
    setSavingStep('')
  }
}

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="text-primary hover:text-primary/80 transition-colors font-[var(--font-inter)]"
        >
          ← Back to Products
        </Link>
      </div>

      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6 font-[var(--font-poppins)]">Basic Information</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 font-[var(--font-poppins)]">
              Product Name *
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Modular Desk Organizer"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-[var(--font-poppins)]">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option>Daily Essentials</option>
                <option>Home Decor</option>
                <option>Toys</option>
                <option>Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-[var(--font-poppins)]">
                Stock *
              </label>
              <Input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 font-[var(--font-poppins)]">
              Price (₹) *
            </label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 font-[var(--font-poppins)]">
              Description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Product description and details"
              rows={4}
            />
          </div>
        </div>
      </Card>

      {/* Website Placement */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-2 font-[var(--font-poppins)]">Show on Website</h2>
        <p className="text-sm text-muted-foreground mb-6">Choose where this product appears on the website.</p>

        <div className="divide-y divide-border">
          {([
            ['visible', 'Visible on website', 'Turn off to hide this product from customers'],
            ['is_featured', 'Featured', 'Shown as the large product at the top of the homepage'],
            ['is_trending', 'Trending', 'Shown in the "Trending this week" row on the homepage'],
            ['is_signature', 'Signature Collection', 'Shown in the premium Signature Collection on the homepage'],
            ['is_customizable', 'Customizable', 'Customers can personalise this product'],
          ] as const).map(([key, label, help]) => (
            <label key={key} className="flex items-center justify-between gap-6 py-4 cursor-pointer">
              <span>
                <span className="block text-sm font-medium text-foreground font-[var(--font-poppins)]">{label}</span>
                <span className="block text-xs text-muted-foreground mt-1">{help}</span>
              </span>
              <Switch
                checked={placement[key]}
                onCheckedChange={(checked) => setPlacement((prev) => ({ ...prev, [key]: checked }))}
              />
            </label>
          ))}
        </div>
      </Card>

      {/* Image Management */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6 font-[var(--font-poppins)]">Images</h2>

        <div className="space-y-6">
          <div>
            <ImageUploader
              label="Main Product Image"
              description="This is the primary image shown on product listings"
              onImagesSelected={(files) => setMainImage(files[0] || null)}
              multiple={false}
            />
            <ExistingImages
              images={keptImages('main')}
              onRemove={(id) => setRemovedImageIds((prev) => [...prev, id])}
            />
          </div>

          <div>
            <ImageUploader
              label="Gallery Images"
              description={`Additional product images (up to 5 images${galleryLimit < 5 ? `, ${galleryLimit} more allowed` : ''})`}
              onImagesSelected={setGalleryImages}
              multiple={true}
              maxFiles={galleryLimit}
            />
            <ExistingImages
              images={keptImages('gallery')}
              onRemove={(id) => setRemovedImageIds((prev) => [...prev, id])}
            />
          </div>

          <div>
            <ImageUploader
              label="Featured Image"
              description="Image used for homepage and featured sections"
              onImagesSelected={(files) => setFeaturedImage(files[0] || null)}
              multiple={false}
            />
            <ExistingImages
              images={keptImages('featured')}
              onRemove={(id) => setRemovedImageIds((prev) => [...prev, id])}
            />
          </div>
        </div>
      </Card>

      {/* Form Actions */}
      <div className="flex gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-[var(--font-poppins)]"
          >
            {isSubmitting ? savingStep || 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
          </Button>
        </motion.div>

        <Link href="/admin/products">
          <Button variant="outline" type="button" className="font-[var(--font-poppins)]">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  )
}

function ExistingImages({
  images,
  onRemove,
}: {
  images: ProductImageRow[]
  onRemove: (id: string) => void
}) {
  if (images.length === 0) return null
  return (
    <div className="mt-4">
      <p className="text-xs font-medium text-muted-foreground mb-2">Saved images</p>
      <div className="flex flex-wrap gap-3">
        {images.map((image) => (
          <div key={image.id} className="relative">
            <img src={image.image_url} alt="" className="h-24 w-24 rounded-lg border border-border object-cover" />
            <button
              type="button"
              onClick={() => onRemove(image.id)}
              className="absolute -top-2 -right-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
