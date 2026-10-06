import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductHero } from '@/components/product-hero'
import { WhyYoullLoveIt } from '@/components/why-youll-love-it'
import { ProductShowcaseSection } from '@/components/product-showcase-section'
import { PersonalizationSection } from '@/components/personalization-section'
import { Specifications } from '@/components/specifications'
import { FAQSection } from '@/components/faq-section'
import { RelatedProducts } from '@/components/related-products'
import { getCatalog, getProduct, pickRelated } from '@/lib/products'

// Re-fetch at most every 30s so price and stock changes in the admin show up quickly.
export const revalidate = 30

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) return { title: 'Product not found | XYZ Layers' }

  return {
    title: `${product.name} | XYZ Layers`,
    description:
      product.description.slice(0, 160) ||
      `${product.name}: premium 3D-printed ${product.category.toLowerCase()} from XYZ Layers.`,
    openGraph: product.image ? { images: [product.image] } : undefined,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) notFound()

  const { products } = await getCatalog()
  const related = pickRelated(product, products)

  return (
    <main className="w-full">
      <ProductHero product={product} />
      <WhyYoullLoveIt />
      <ProductShowcaseSection product={product} />
      <PersonalizationSection product={product} />
      <Specifications product={product} />
      <FAQSection product={product} />
      <RelatedProducts products={related} />
    </main>
  )
}
