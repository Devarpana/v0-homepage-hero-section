import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { ShopPageHeader } from '@/components/shop-page-header'
import { ShopCatalog } from '@/components/shop-catalog'
import { Footer } from '@/components/footer'
import { getCatalog } from '@/lib/products'

// Re-fetch the catalogue at most every 30s, so admin edits show up without a redeploy.
export const revalidate = 30

export default async function ShopPage() {
  const { products, failed } = await getCatalog()

  return (
    <main className="w-full">
      <Navbar />
      <ShopPageHeader />
      {/* ShopCatalog reads the URL (?category=, ?q=), which requires a Suspense boundary. */}
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <ShopCatalog products={products} failed={failed} />
      </Suspense>
      <Footer />
    </main>
  )
}
