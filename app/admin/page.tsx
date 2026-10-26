'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, FileText, Inbox, Package } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { formatDate, getQuoteRequests, type QuoteRequest } from '@/lib/admin-requests'

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState<number | null>(null)
  const [requests, setRequests] = useState<QuoteRequest[] | null>(null)

  useEffect(() => {
    supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .then(({ count }) => setProductCount(count ?? 0))
    getQuoteRequests()
      .then(setRequests)
      .catch(() => setRequests([]))
  }, [])

  const newCount = requests?.filter((r) => r.status === 'new').length
  const stats = [
    { label: 'New quote requests', value: newCount, icon: Inbox, href: '/admin/custom-requests', highlight: Boolean(newCount) },
    { label: 'All quote requests', value: requests?.length, icon: FileText, href: '/admin/custom-requests' },
    { label: 'Products', value: productCount, icon: Package, href: '/admin/products' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Welcome to your XYZ Layers admin panel</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, href, highlight }) => (
          <Link key={label} href={href}>
            <Card className="p-6 transition-shadow hover:shadow-lg">
              <div className={highlight ? 'mb-4 inline-flex rounded-lg bg-orange-100 p-3 text-orange-700' : 'mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-primary'}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-1 font-heading text-3xl font-bold">{value ?? '…'}</p>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">Latest quote requests</h2>
          <Link href="/admin/custom-requests" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {requests && requests.length === 0 && <p className="text-sm text-muted-foreground">No quote requests yet.</p>}
        <ul className="divide-y divide-border">
          {requests?.slice(0, 5).map((r) => (
            <li key={r.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3 text-sm">
              <span className="font-semibold">{r.customer_name}</span>
              <span className="text-muted-foreground">{r.service || r.project_title}</span>
              <span className="capitalize text-muted-foreground">· {r.status}</span>
              <span className="ml-auto text-muted-foreground">{formatDate(r.created_at)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
