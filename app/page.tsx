import { Navbar } from '@/components/navbar'
import { ServicesHero } from '@/components/home/services-hero'
import { WhatIs3DPrinting } from '@/components/home/what-is-3d-printing'
import { ServicesShowcase } from '@/components/home/services-showcase'
import { ServiceFinder } from '@/components/home/service-finder'
import { MaterialsSection } from '@/components/home/materials-section'
import { HowItWorks } from '@/components/how-it-works'
import { BrandVideo } from '@/components/home/brand-video'
import { WhyXYZLayers } from '@/components/why-xyz-layers'
import { ExploreMore } from '@/components/explore-more'
import { CustomOrdersCTA } from '@/components/custom-orders-cta'
import { Footer } from '@/components/footer'
import { getProducts } from '@/lib/products'

// Always show what is currently saved in admin.
export const dynamic = 'force-dynamic'

// Services come first; the shop is one row of ready-made pieces further down.
export default async function Page() {
  const products = await getProducts()

  return (
    <main className="w-full">
      <Navbar />
      <ServicesHero />
      <WhatIs3DPrinting />
      <ServicesShowcase />
      <ServiceFinder />
      <MaterialsSection />
      <HowItWorks />
      <BrandVideo />
      <WhyXYZLayers />
      <ExploreMore
        products={products.slice(0, 8)}
        eyebrow="From our studio"
        title="Ready-made pieces"
        description="Gifts and everyday objects we design and print ourselves. Browse the full range in the shop."
      />
      <CustomOrdersCTA />
      <Footer />
    </main>
  )
}
