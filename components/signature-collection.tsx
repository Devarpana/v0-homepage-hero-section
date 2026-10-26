'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ProductImage } from '@/components/product-image'
import { formatPrice, type Product } from '@/lib/products'

export function SignatureCollection({ products: signature }: { products: Product[] }) {
  if (signature.length === 0) return null

  return (
    <section className="relative w-full overflow-hidden bg-[#141a2b] py-24 text-white">
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[480px] w-[480px] rounded-full bg-primary/40 blur-[120px]" />

      <div className="container-site relative">
        <SectionHeading
          tone="dark"
          eyebrow="Signature Collection"
          title="Our most loved, most crafted pieces"
          description="Premium designs with extra detail, finish and time on the printer."
          action={
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 font-heading text-sm font-semibold text-white/80 hover:text-white"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {signature.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/product/${product.id}`} className="group block">
                <div className="aspect-square overflow-hidden rounded-2xl border border-white/10">
                  <ProductImage src={product.image} alt={product.name} tone="dark" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50">{product.category}</p>
                    <h3 className="mt-1 font-heading text-xl font-semibold">{product.name}</h3>
                  </div>
                  <p className="font-heading text-lg font-bold text-accent">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
