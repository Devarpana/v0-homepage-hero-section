import { Navbar } from '@/components/navbar'
import { ShopPageHeader } from '@/components/shop-page-header'
import { ShopCatalog } from '@/components/shop-catalog'
import { Footer } from '@/components/footer'
import { getProducts } from '@/lib/products'

// Always show what is currently saved in admin.
export const dynamic = 'force-dynamic'

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const [{ category }, products] = await Promise.all([searchParams, getProducts()])

  return (
    <main className="w-full">
      <Navbar />
      <ShopPageHeader />
      <ShopCatalog products={products} initialCategory={category} />
      <Footer />
    </main>
  )
}
