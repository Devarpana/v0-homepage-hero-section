import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop | XYZ Layers',
  description: 'Discover premium 3D printed products for your home and workspace.',
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
