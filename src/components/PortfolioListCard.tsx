"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Info,
  Pencil,
  Trash2,
  Eye,
  ExternalLink,
  Plus,
  Calendar,
  Eye as ViewsIcon,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Portfolio {
  id: string;
  title: string;
  portfolioType?: string;
  updatedAt?: string;
  views?: number;
  isPublished?: boolean;
  slug?: string;
  description?: string;
  stats?: {
    components: number;
    totalViews: number;
  };
}

type PortfolioListCardProps = {
  title?: string;
  description?: string;
  portfolioList: Portfolio[];
  portfolioListLoading: boolean;
  totalCount: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onCreate: () => void;
  limit?: number;
};

export function PortfolioListCard({
  title = "Your Portfolios",
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
  const router = useRouter();
  const showViewAll = totalCount > limit;

  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown";
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return "Today";
      if (diffDays === 2) return "Yesterday";
      if (diffDays < 7) return `${diffDays - 1} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Unknown";
    }
  };

  const handleViewPortfolio = (portfolio: Portfolio) => {
    if (portfolio.isPublished) {
      const viewUrl = portfolio.slug
        ? `/portfolio/${portfolio.slug}`
        : `/portfolio/${portfolio.id}`;
      router.push(viewUrl);
    } else {
      router.push(`/portfolio/preview/${portfolio.id}`);
    }
  };

  return (
    <Card className="flex-1 bg-background overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex-1 min-w-0">
          <CardTitle className="text-foreground text-xl font-semibold">
            {title}
          </CardTitle>
          {!portfolioListLoading && totalCount > 0 && (
            <CardDescription className="text-muted-foreground text-sm mt-1">
              {description ||
                `Showing ${Math.min(portfolioList.length, limit)} of ${totalCount} portfolios`}
            </CardDescription>
          )}
        </div>
        {showViewAll && (
          <Button
            variant="outline"
            size="sm"
            className="border-border hover:bg-muted text-foreground flex-shrink-0"
            onClick={() => router.push("/dashboard/my-portfolios")}
          >
            View All
            <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {portfolioListLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div className="absolute inset-0 rounded-full border-2 border-muted"></div>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">Loading your portfolios...</p>
          </div>
        ) : portfolioList?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-border rounded-xl bg-muted/20">
            <div className="relative">
              <Info className="h-12 w-12 text-muted-foreground" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                <Plus className="h-2.5 w-2.5 text-primary-foreground" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">No portfolios yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
              Create your first portfolio to showcase your work and start building your online presence
            </p>
            <Button
              onClick={onCreate}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Portfolio
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {portfolioList.map((portfolio) => (
              <div
                key={portfolio.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => handleViewPortfolio(portfolio)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleViewPortfolio(portfolio);
                  }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                            {portfolio.title}
                          </h3>
                          {portfolio.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {portfolio.description}
                            </p>
                          )}
                        </div>

                        {portfolio.isPublished !== undefined && (
                          <Badge
                            className={cn(
                              "flex-shrink-0 px-3 py-1 text-xs font-medium rounded-full border",
                              portfolio.isPublished
                                ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                                : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                            )}
                          >
                            {portfolio.isPublished ? "Published" : "Draft"}
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        {portfolio.portfolioType && (
                          <div className="flex items-center gap-1">
                            <Badge variant="secondary" className="text-xs">
                              {portfolio.portfolioType}
                            </Badge>
                          </div>
                        )}

                        {portfolio.updatedAt && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 flex-shrink-0" />
                            <span className="text-xs">
                              {formatDate(portfolio.updatedAt)}
                            </span>
                          </div>
                        )}

                        {portfolio.views !== undefined && (
                          <div className="flex items-center gap-1">
                            <ViewsIcon className="h-3 w-3 flex-shrink-0" />
                            <span className="text-xs">{portfolio.views} views</span>
                          </div>
                        )}

                        {portfolio.stats && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 flex-shrink-0" />
                            <span className="text-xs">
                              {portfolio.stats.components} components
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-muted text-muted-foreground hover:text-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(portfolio.id);
                        }}
                        title="Edit portfolio"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "h-8 w-8 p-0",
                          portfolio.isPublished
                            ? "hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                            : "hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewPortfolio(portfolio);
                        }}
                        title={portfolio.isPublished ? "View live portfolio" : "Preview portfolio"}
                      >
                        {portfolio.isPublished ? (
                          <ExternalLink className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(portfolio.id);
                        }}
                        title="Delete portfolio"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}