'use client'

import { Card } from '@/components/ui/card'
import { Plus, Edit2, CheckCircle, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

const activities = [
  { id: 1, type: 'new', label: 'New product added', description: 'Modular Desk Organizer', time: '2 hours ago', icon: Plus },
  { id: 2, type: 'update', label: 'Custom request updated', description: 'Personalized Gift Set - Quoted', time: '4 hours ago', icon: Edit2 },
  { id: 3, type: 'completed', label: 'Order completed', description: 'Order #1234 shipped', time: '1 day ago', icon: CheckCircle },
  { id: 4, type: 'message', label: 'New custom request', description: 'Corporate Logo Design Kit', time: '2 days ago', icon: MessageSquare },
]

export function AdminActivityFeed() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6 font-[var(--font-poppins)]">Recent Activity</h2>
      <div className="space-y-6">
        {activities.map((activity, index) => {
          const Icon = activity.icon

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex gap-4 pb-6 border-b border-border last:border-0"
            >
              <div className={`p-2 rounded-lg h-fit ${
                activity.type === 'new' ? 'bg-blue-500/10' :
                activity.type === 'update' ? 'bg-purple-500/10' :
                activity.type === 'completed' ? 'bg-green-500/10' :
                'bg-orange-500/10'
              }`}>
                <Icon className={`w-5 h-5 ${
                  activity.type === 'new' ? 'text-blue-600' :
                  activity.type === 'update' ? 'text-purple-600' :
                  activity.type === 'completed' ? 'text-green-600' :
                  'text-orange-600'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground font-[var(--font-poppins)]">{activity.label}</p>
                <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}
