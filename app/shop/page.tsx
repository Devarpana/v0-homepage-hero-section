import { Navbar } from '@/components/navbar'
import { ShopPageHeader } from '@/components/shop-page-header'
import { ShopFilters } from '@/components/shop-filters'
import { ProductGrid } from '@/components/product-grid'
import { Footer } from '@/components/footer'

export default function ShopPage() {
  return (
    <main className="w-full">
      <Navbar />
      <ShopPageHeader />
      <ShopFilters />
      <ProductGrid />
      <Footer />
    </main>
  )
}
