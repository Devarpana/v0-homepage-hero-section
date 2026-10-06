'use client'

import { Card } from '@/components/ui/card'
import { Plus, FileText, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'

export interface ActivityItem {
  id: string
  type: 'order' | 'request' | 'message'
  label: string
  description: string
  at: string
}

const styles = {
  order: { icon: Plus, bg: 'bg-green-500/10', fg: 'text-green-600' },
  request: { icon: FileText, bg: 'bg-purple-500/10', fg: 'text-purple-600' },
  message: { icon: MessageSquare, bg: 'bg-orange-500/10', fg: 'text-orange-600' },
}

export function AdminActivityFeed({ activities }: { activities: ActivityItem[] | null }) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6 font-[family-name:var(--font-poppins)]">Recent Activity</h2>

      {activities === null ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : activities.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing yet. New orders, custom requests and messages will show up here.</p>
      ) : (
        <div className="space-y-6">
          {activities.map((activity, index) => {
            const { icon: Icon, bg, fg } = styles[activity.type]

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex gap-4 pb-6 border-b border-border last:border-0 last:pb-0"
              >
                <div className={`p-2 rounded-lg h-fit ${bg}`}>
                  <Icon className={`w-5 h-5 ${fg}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground font-[family-name:var(--font-poppins)]">{activity.label}</p>
                  <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDistanceToNow(new Date(activity.at), { addSuffix: true })}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </Card>
  )
}
