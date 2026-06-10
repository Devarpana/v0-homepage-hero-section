import { AdminProductForm } from '@/components/admin-product-form'

// Mock product data for demo
const mockProductData = {
  id: '1',
  name: 'Modular Desk Organizer',
  category: 'Daily Essentials',
  price: 1299,
  stock: 15,
  description: 'A premium 3D-printed modular desk organizer designed for maximum productivity.',
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <AdminProductForm initialData={mockProductData} isEditing={true} />
  )
}
