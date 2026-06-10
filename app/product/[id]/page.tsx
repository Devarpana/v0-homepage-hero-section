import { ProductHero } from '@/components/product-hero'
import { WhyYoullLoveIt } from '@/components/why-youll-love-it'
import { ProductShowcaseSection } from '@/components/product-showcase-section'
import { PersonalizationSection } from '@/components/personalization-section'
import { Specifications } from '@/components/specifications'
import { FAQSection } from '@/components/faq-section'
import { RelatedProducts } from '@/components/related-products'

export const metadata = {
  title: 'Modular Desk Organizer | XYZ Layers',
  description: 'Premium 3D-printed modular desk organizer. Personalize with custom engravings and colors. Shop now.',
}

export default function ProductPage() {
  return (
    <main className="w-full">
      <ProductHero />
      <WhyYoullLoveIt />
      <ProductShowcaseSection />
      <PersonalizationSection />
      <Specifications />
      <FAQSection />
      <RelatedProducts />
    </main>
  )
}
