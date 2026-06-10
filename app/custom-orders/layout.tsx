import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function CustomOrdersLayout({
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
