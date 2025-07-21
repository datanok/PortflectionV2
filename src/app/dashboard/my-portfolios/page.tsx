"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  Trash2,
  Pencil,
  ChevronRight,
  Info,
  Plus,
  ExternalLink,
  Eye,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deletePortfolioAction } from "@/app/dashboard/portfolios/actions";
import { PortfolioListCard } from "@/components/PortfolioListCard";
import { listPortfolios, deletePortfolio } from "@/actions/portfolio-actions";

interface Portfolio {
  id: string;
  title: string;
  type: string;
  updatedAt: string;
  isPublished: boolean;
  slug?: string;
  description?: string;
  views?: number;
  stats?: {
    components: number;
    totalViews: number;
  };
}

export default function MyPortfolioPage() {
  const router = useRouter();
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>([]);
  const [portfolioListLoading, setPortfolioListLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function loadPortfolios() {
      try {
        const result = await listPortfolios({
          page: 1,
          limit: 50,
          sortBy: "updatedAt",
          sortOrder: "desc",
          status: "all",
        });
        setPortfolioList(
          result.portfolios.map((p) => ({
            id: p.id,
            title: p.name,
            type: p.portfolioType,
            updatedAt: p.updatedAt.toString(),
            isPublished: p.isPublic,
            slug: p.slug,
            description: p.description,
            views: p.views,
            stats: p.stats,
          }))
        );
        setTotalCount(result.pagination.totalCount);
      } catch (error) {
        console.error("Failed to load portfolios:", error);
        toast.error("Failed to load portfolios");
      } finally {
        setPortfolioListLoading(false);
      }
    }
    loadPortfolios();
  }, []);

  const handlePortfolioClick = (portfolioId: string) => {
    router.push(`/portfolio/${portfolioId}`);
  };

  const handleDeletePortfolio = useCallback(async (id: string) => {
    try {
      await deletePortfolio(id);
      toast.success("Portfolio deleted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete portfolio.");
    }
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">My Portfolios</h1>
        </div>
        <p className="text-muted-foreground">
          Manage and showcase your professional portfolios
        </p>
      </div>

      <PortfolioListCard
        portfolioList={portfolioList}
        portfolioListLoading={portfolioListLoading}
        totalCount={totalCount}
        onEdit={(id) => router.push(`/dashboard/portfolios/edit/${id}`)}
        onDelete={(id) => {
          setSelectedPortfolioId(id);
          setOpenDeleteDialog(true);
        }}
        onView={(id) => {
          // Find the portfolio to get its slug
          const portfolio = portfolioList.find((p) => p.id === id);
          if (portfolio?.isPublished && portfolio?.slug) {
            router.push(`/portfolio/${portfolio.slug}`);
          } else {
            router.push(`/portfolio/preview/${id}`);
          }
        }}
        onCreate={() => router.push("/dashboard/portfolios/new")}
        limit={50} // Show all portfolios on this page
      />

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this portfolio? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (!selectedPortfolioId) return;
                await handleDeletePortfolio(selectedPortfolioId);
                setPortfolioList((prev) =>
                  prev.filter((p) => p.id !== selectedPortfolioId)
                );
                setTotalCount((prev) => prev - 1);
                setOpenDeleteDialog(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
