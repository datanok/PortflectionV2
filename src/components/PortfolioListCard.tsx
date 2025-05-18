'use client'

import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Info, Pencil, Trash2, Eye, ExternalLink, ChevronRight, FileTextIcon, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Portfolio {
  id: string;
  title: string;
  portfolioType?: string;
  updatedAt?: string;
  views?: number;
  isPublished?: boolean;
}

type PortfolioListCardProps = {
  title?: string
  description?: string
  portfolioList: Portfolio[]
  portfolioListLoading: boolean
  totalCount: number
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onView: (id: string) => void
  onCreate: () => void
  limit?: number
}

export function PortfolioListCard({
  title = 'Your Portfolios',
  description,
  portfolioList,
  portfolioListLoading,
  totalCount,
  onEdit,
  onDelete,
  onView,
  onCreate,
  limit = 3,
}: PortfolioListCardProps) {
  const router = useRouter()
  const showViewAll = totalCount > limit

  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {!portfolioListLoading && totalCount > 0 && (
            <CardDescription className="mt-1">
              {description || `Showing ${Math.min(portfolioList.length, limit)} of ${totalCount} portfolios`}
            </CardDescription>
          )}
        </div>
        {showViewAll && (
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => router.push('/dashboard/my-portfolios')}
          >
            View All
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {portfolioListLoading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
            <p className="text-muted-foreground">Loading your portfolios...</p>
          </div>
        ) : portfolioList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 border border-dashed rounded-lg text-center">
            <Info className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No portfolios yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first portfolio to get started
            </p>
            <Button onClick={onCreate}>
              <Plus className="mr-2" size={16} />
              Create Portfolio
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {portfolioList.map((portfolio) => (
              <div
                key={portfolio.id}
                className="border rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div
                  className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between cursor-pointer"
                  onClick={() => onView(portfolio.id)}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1 truncate">
                      {portfolio.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <Badge>{portfolio.portfolioType}</Badge>
                      {portfolio.isPublished !== undefined && (
                        <Badge
                          className={cn(
                            'px-2 py-1 rounded-md',
                            portfolio.isPublished
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                          )}
                        >
                          {portfolio.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      )}
                      <span className="text-xs">
                        Updated {new Date(portfolio.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <button
                      className="p-2 rounded-full hover:text-primary transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit(portfolio.id)
                      }}
                      aria-label="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="p-2 rounded-full hover:text-red-500 transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(portfolio.id)
                      }}
                      aria-label="Delete"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="w-px h-6 bg-gray-200 mx-1" />

                    {portfolio.isPublished ? (
                      <button
                        className="p-2 rounded-full hover:text-green-600 transition-colors cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/portfolio/${portfolio.id}`)
                        }}
                        aria-label="View Live"
                        title="View live portfolio"
                      >
                        <ExternalLink size={18} />
                      </button>
                    ) : (
                      <button
                        className="p-2 rounded-full hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/portfolio/preview/${portfolio.id}`)
                        }}
                        aria-label="Preview"
                        title="Preview unpublished portfolio"
                      >
                        <Eye size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
