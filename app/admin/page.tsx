'use client'

import { useEffect, useState } from 'react'
import { AdminOverviewCards, type DashboardStats } from '@/components/admin-overview-cards'
import { AdminActivityFeed, type ActivityItem } from '@/components/admin-activity-feed'
import { requireSupabase } from '@/lib/supabase'
import { adminError } from '@/lib/admin'
import { formatPrice } from '@/lib/products'

async function loadDashboard(): Promise<{ stats: DashboardStats; activity: ActivityItem[] }> {
  const supabase = requireSupabase()
  const monthStart = new Date()
  monthStart.setDate(1)
  monthStart.setHours(0, 0, 0, 0)

  const [products, requests, newRequests, monthOrders, recentOrders, recentRequests, recentMessages] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('custom_requests').select('*', { count: 'exact', head: true }),
    supabase.from('custom_requests').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('orders').select('total, status').gte('created_at', monthStart.toISOString()),
    supabase.from('orders').select('id, order_number, customer_name, total, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('custom_requests').select('id, request_number, name, project_title, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('contact_messages').select('id, name, message, created_at').order('created_at', { ascending: false }).limit(5),
  ])

  const failed = [products, requests, newRequests, monthOrders, recentOrders, recentRequests, recentMessages].find((r) => r.error)
  if (failed?.error) throw failed.error

  const counted = (monthOrders.data ?? []).filter((o) => o.status !== 'cancelled')

  const activity: ActivityItem[] = [
    ...(recentOrders.data ?? []).map((o) => ({
      id: `order-${o.id}`,
      type: 'order' as const,
      label: `New order #${o.order_number}`,
      description: `${o.customer_name} · ${formatPrice(Number(o.total))}`,
      at: o.created_at as string,
    })),
    ...(recentRequests.data ?? []).map((r) => ({
      id: `request-${r.id}`,
      type: 'request' as const,
      label: `New custom request #${r.request_number}`,
      description: `${r.name} · ${r.project_title}`,
      at: r.created_at as string,
    })),
    ...(recentMessages.data ?? []).map((m) => ({
      id: `message-${m.id}`,
      type: 'message' as const,
      label: 'New message',
      description: `${m.name}: ${m.message}`,
      at: m.created_at as string,
    })),
  ]
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 8)

  return {
    stats: {
      products: products.count ?? 0,
      customRequests: requests.count ?? 0,
      newCustomRequests: newRequests.count ?? 0,
      ordersThisMonth: counted.length,
      revenueThisMonth: counted.reduce((sum, o) => sum + Number(o.total), 0),
    },
    activity,
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activity, setActivity] = useState<ActivityItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDashboard()
      .then((result) => {
        setStats(result.stats)
        setActivity(result.activity)
      })
      .catch((err) => setError(adminError(err)))
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-[family-name:var(--font-poppins)]">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to your XYZ Layers admin panel</p>
      </div>

      {error && (
        <p role="alert" className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          {error}
        </p>
      )}

      <AdminOverviewCards stats={stats} />

      <AdminActivityFeed activities={error ? [] : activity} />
    </div>
  )
}
