'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  FileText, 
  Settings, 
  BarChart3,
  Component
} from 'lucide-react'

const adminLinks = [
  {
    title: 'User Management',
    description: 'Manage user roles and permissions',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Component Review',
    description: 'Review submitted components',
    href: '/admin/components/review',
    icon: FileText,
  },
  {
    title: 'Analytics',
    description: 'View system analytics and metrics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'System Settings',
    description: 'Configure system settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export function AdminNavigation() {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your application and review user contributions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {adminLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          
          return (
            <Link key={link.href} href={link.href}>
              <Card className={`hover:shadow-md transition-shadow cursor-pointer ${
                isActive ? 'ring-2 ring-primary' : ''
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Component className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Link href="/components/marketplace">
              <Button variant="outline" size="sm">
                Browse Marketplace
              </Button>
            </Link>
            <Link href="/components/submit">
              <Button variant="outline" size="sm">
                Submit Component
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 