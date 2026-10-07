'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ProductImage } from '@/components/product-image'
import { formatPrice, type Product } from '@/lib/products'

export function TrendingProducts({ products: trending }: { products: Product[] }) {
  const scroller = useRef<HTMLDivElement>(null)

  const scrollBy = (direction: 1 | -1) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  if (trending.length === 0) return null

  return (
    <section className="w-full overflow-hidden bg-muted py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Trending this week"
          title="What everyone's printing"
          description="The pieces our customers can't stop ordering right now."
          action={
            <div className="hidden gap-2 md:flex">
              <button
                onClick={() => scrollBy(-1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/15 bg-white transition-colors hover:border-primary hover:text-primary"
                aria-label="Scroll left"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90"
                aria-label="Scroll right"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          }
        />

        <div
          ref={scroller}
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-4 lg:-mx-12 lg:scroll-px-12 lg:px-12"
        >
          {trending.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-[calc(25%-15px)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow duration-300 group-hover:shadow-soft-lg">
                <ProductImage src={product.image} alt={product.name} />
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                  Trending
                </span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4 px-1">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
                  <h3 className="mt-1 font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {product.name}
                  </h3>
                </div>
                <p className="font-heading text-lg font-bold text-primary">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
