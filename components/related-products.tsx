'use client'

import { ProductCard } from '@/components/product-card'
import { SectionHeading } from '@/components/section-heading'
import type { Product } from '@/lib/products'

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null

  return (
    <section className="w-full bg-white py-20">
      <div className="container-site">
        <SectionHeading title="You might also like" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              image={product.image}
              isTrending={product.isTrending}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
