import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { FeaturedCollections } from '@/components/featured-collections'
import { TrendingProducts } from '@/components/trending-products'
import { WhyXYZLayers } from '@/components/why-xyz-layers'
import { HowItWorks } from '@/components/how-it-works'
import { ExploreMore } from '@/components/explore-more'
import { Footer } from '@/components/footer'
import { getCatalog } from '@/lib/products'

// Re-fetch at most every 30s so product changes in the admin show up without a redeploy.
export const revalidate = 30

export default async function Page() {
  const { products } = await getCatalog()

  return (
    <main className="w-full">
      <Navbar />
      <HeroSection />
      <FeaturedCollections />
      <TrendingProducts products={products} />
      <WhyXYZLayers />
      <HowItWorks />
      <ExploreMore />
      <Footer />
    </main>
  )
}
