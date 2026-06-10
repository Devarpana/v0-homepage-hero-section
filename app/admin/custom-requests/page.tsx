'use client'

import { useState } from 'react'
import { AdminCustomRequestsTable } from '@/components/admin-custom-requests-table'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const mockRequests = [
  {
    id: '1001',
    customer: 'Ravi Kumar',
    project: 'Personalized Gift Set for Corporate Event',
    priority: 'urgent' as const,
    status: 'quoted' as const,
    quotationAmount: 15000,
    internalNotes: 'High-value client, custom packaging requested',
    date: '2024-01-10',
  },
  {
    id: '1002',
    customer: 'Priya Singh',
    project: 'Custom Logo 3D Sculpture',
    priority: 'high' as const,
    status: 'approved' as const,
    quotationAmount: 8500,
    internalNotes: 'Materials: Resin Composite, Delivery: 2 weeks',
    date: '2024-01-08',
  },
  {
    id: '1003',
    customer: 'Amit Patel',
    project: 'Desk Organizer with Custom Nameplate',
    priority: 'medium' as const,
    status: 'printing' as const,
    quotationAmount: 5200,
    internalNotes: 'Printing in progress, expected completion in 5 days',
    date: '2024-01-06',
  },
  {
    id: '1004',
    customer: 'Neha Verma',
    project: 'Customized Toy Set for Birthday',
    priority: 'medium' as const,
    status: 'reviewing' as const,
    internalNotes: 'Awaiting detailed design specifications from client',
    date: '2024-01-05',
  },
  {
    id: '1005',
    customer: 'Vikram Reddy',
    project: 'Industrial Prototype Components',
    priority: 'low' as const,
    status: 'new' as const,
    internalNotes: 'Initial consultation scheduled for next week',
    date: '2024-01-04',
  },
]

export default function CustomRequestsPage() {
  const [requests, setRequests] = useState(mockRequests)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRequests = requests.filter((r) =>
    r.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.id.includes(searchQuery)
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-[var(--font-poppins)]">Custom Requests</h1>
        <p className="text-muted-foreground mt-2">Manage and track custom order inquiries</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by customer, project, or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <AdminCustomRequestsTable requests={filteredRequests} />
    </div>
  )
}
