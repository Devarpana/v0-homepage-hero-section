import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

// Online checkout isn't switched on yet, so there are no orders to show. Shop enquiries arrive
// on WhatsApp, and quote requests are on the Quote requests page.
export default function OrdersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Orders</h1>
        <p className="mt-2 text-muted-foreground">Online orders will appear here once checkout is switched on.</p>
      </div>
      <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-muted-foreground">
        <ShoppingCart className="mx-auto mb-3 h-8 w-8" />
        <p>No online orders yet. Customers currently order through WhatsApp or the quote form.</p>
        <Link href="/admin/custom-requests" className="mt-4 inline-block font-semibold text-primary hover:text-accent">
          See quote requests →
        </Link>
      </div>
    </div>
  )
}
