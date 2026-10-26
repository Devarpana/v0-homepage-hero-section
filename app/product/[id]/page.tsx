import { ProductHero } from '@/components/product-hero'
import { RelatedProducts } from '@/components/related-products'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProduct, getProducts } from '@/lib/products'

// Always show what is currently saved in admin.
export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).id)
  if (!product) return { title: 'Product not found | XYZ Layers' }
  return {
    title: `${product.name} | XYZ Layers`,
    description: product.description ?? `${product.name}, 3D printed by XYZ Layers.`,
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const [product, products] = await Promise.all([getProduct(id), getProducts()])
  if (!product) notFound()

  const related = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 4)

  return (
    <main className="w-full">
      <ProductHero product={product} />
      <RelatedProducts products={related} />
    </main>
  )
}
