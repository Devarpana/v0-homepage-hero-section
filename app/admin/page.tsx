import { AdminOverviewCards } from '@/components/admin-overview-cards'
import { AdminActivityFeed } from '@/components/admin-activity-feed'

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-[family-name:var(--font-poppins)]">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to your XYZ Layers admin panel</p>
      </div>

      <AdminOverviewCards />

      <AdminActivityFeed />
    </div>
  )
}
