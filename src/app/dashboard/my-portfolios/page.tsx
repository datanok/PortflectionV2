"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Loader2,
  Trash2,
  Pencil,
  ChevronRight,
  Info,
  Plus,
  ExternalLink,
  Eye,
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

interface Portfolio {
  id: string;
  title: string;
  type: string;
  updatedAt: string;
  isPublished: boolean;
}

export default function MyPortfolioPage() {
  const router = useRouter();
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>([]);
  const [portfolioListLoading, setPortfolioListLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/getPortfolioList")
      .then((res) => res.json())
      .then((data) => {
        setPortfolioList(data.portfolios || []);
        setPortfolioListLoading(false);
      })
      .catch(() => setPortfolioListLoading(false));
  }, []);

  const handlePortfolioClick = (portfolioId: string) => {
    router.push(`/portfolio/${portfolioId}`);
  };

  const handleDeletePortfolio = useCallback(async (id: string) => {
    try {
      await deletePortfolioAction(id);
      toast.success("Portfolio deleted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete portfolio.");
    }
  }, []);

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Portfolios</h1>
        <p className="text-muted-foreground text-sm">List of all your portfolios</p>
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
                onView={(id) => router.push(`/portfolio/${id}`)}
                onCreate={() => router.push("/dashboard/portfolios/new")}
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
