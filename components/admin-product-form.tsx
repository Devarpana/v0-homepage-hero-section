'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUploader } from '@/components/image-uploader'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from "@/lib/supabase"

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

  const [mainImage, setMainImage] = useState<File | null>(null)
  const [galleryImages, setGalleryImages] = useState<File[]>([])
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  try {
    let error

    if (isEditing && initialData?.id) {
      const result = await supabase
        .from("products")
        .update({
          name: formData.name,
          category: formData.category,
          price: formData.price,
          stock: formData.stock,
          description: formData.description,
        })
        .eq("id", initialData.id)

      error = result.error
    } else {
      const result = await supabase
        .from("products")
        .insert([
          {
            name: formData.name,
            category: formData.category,
            price: formData.price,
            stock: formData.stock,
            description: formData.description,
            status: "active",
          },
        ])

      error = result.error
    }

    if (error) {
      console.error(error)
      alert(
        isEditing
          ? "Failed to update product"
          : "Failed to create product"
      )
      return
    }

    alert(
      isEditing
        ? "Product updated successfully!"
        : "Product created successfully!"
    )

  } catch (err) {
    console.error(err)
    alert("Something went wrong")
  } finally {
    setIsSubmitting(false)
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

      {/* Image Management */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6 font-[var(--font-poppins)]">Images</h2>

        <div className="space-y-6">
          <ImageUploader
            label="Main Product Image"
            description="This is the primary image shown on product listings"
            onImagesSelected={(files) => setMainImage(files[0] || null)}
            multiple={false}
          />

          <ImageUploader
            label="Gallery Images"
            description="Additional product images (up to 5 images)"
            onImagesSelected={setGalleryImages}
            multiple={true}
            maxFiles={5}
          />

          <ImageUploader
            label="Featured Image"
            description="Image used for homepage and featured sections"
            onImagesSelected={(files) => setFeaturedImage(files[0] || null)}
            multiple={false}
          />
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
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
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
