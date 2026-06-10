import { Navbar } from '@/components/navbar'
import { AdminSidebar } from '@/components/admin-sidebar'
import { Footer } from '@/components/footer'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
