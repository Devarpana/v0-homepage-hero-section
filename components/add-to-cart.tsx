'use client'

import { toast } from 'sonner'
import { useCart } from '@/components/cart-provider'
import type { Product } from '@/lib/products'

/** One place that decides how "add to cart" behaves everywhere on the site. */
export function useAddToCart() {
  const { addItem, openCart } = useCart()

  return (product: Product, options: { color?: string | null; quantity?: number; silent?: boolean } = {}) => {
    if (product.stock < 1) {
      toast.error(`${product.name} is sold out`)
      return false
    }
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: options.color ?? null,
        stock: product.stock,
      },
      options.quantity ?? 1,
    )
    if (!options.silent) {
      toast.success(`${product.name} added to cart`, { action: { label: 'View cart', onClick: openCart } })
    }
    return true
  }
}
