import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
