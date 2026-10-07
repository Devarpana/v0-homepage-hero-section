import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { FeaturedCollections } from '@/components/featured-collections'
import { TrendingProducts } from '@/components/trending-products'
import { WhyXYZLayers } from '@/components/why-xyz-layers'
import { SignatureCollection } from '@/components/signature-collection'
import { HowItWorks } from '@/components/how-it-works'
import { ExploreMore } from '@/components/explore-more'
import { CustomOrdersCTA } from '@/components/custom-orders-cta'
import { CustomerShowcase } from '@/components/customer-showcase'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className="w-full">
      <Navbar />
      <HeroSection />
      <FeaturedCollections />
      <TrendingProducts />
      <WhyXYZLayers />
      <SignatureCollection />
      <HowItWorks />
      <ExploreMore />
      <CustomOrdersCTA />
      <CustomerShowcase />
      <Footer />
    </main>
  )
}
