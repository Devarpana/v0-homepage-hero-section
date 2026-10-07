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
import { getProducts } from '@/lib/products'

// Always show what is currently saved in admin.
export const dynamic = 'force-dynamic'

export default async function Page() {
  const products = await getProducts()
  const featured = products.find((p) => p.isFeatured)

  return (
    <main className="w-full">
      <Navbar />
      <HeroSection featured={featured} />
      <FeaturedCollections />
      <TrendingProducts products={products.filter((p) => p.isTrending)} />
      <WhyXYZLayers />
      <SignatureCollection products={products.filter((p) => p.isSignature).slice(0, 6)} />
      <HowItWorks />
      <ExploreMore products={products.slice(0, 12)} />
      <CustomOrdersCTA />
      <CustomerShowcase />
      <Footer />
    </main>
  )
}
