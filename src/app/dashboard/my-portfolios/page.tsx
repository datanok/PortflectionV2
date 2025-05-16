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

interface Portfolio {
  id: string;
  title: string;
  type: string;
  updatedAt: string;
}

export default function MyPortfolioPage() {
  const router = useRouter();
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>([]);
  const [portfolioListLoading, setPortfolioListLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
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

      <Card>
        <CardHeader>
          <CardTitle>Portfolios</CardTitle>
        </CardHeader>
        <CardContent>
          {portfolioListLoading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
              <p className="text-muted-foreground">Loading your portfolios...</p>
            </div>
          ) : portfolioList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 border border-dashed rounded-lg">
              <Info className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No portfolios yet</h3>
              <p className="text-muted-foreground mb-4">Create your first portfolio to get started</p>
              <Button onClick={() => router.push("/dashboard/portfolios/new")}>
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
                    onClick={() => handlePortfolioClick(portfolio.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1 truncate">
                        {portfolio.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Badge>{portfolio.type}</Badge>
                        <span className="text-xs">
                          Updated {new Date(portfolio.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                      <button
                        className="p-2 rounded-full hover:text-primary transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/dashboard/portfolios/edit/${portfolio.id}`);
                        }}
                        aria-label="Edit"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        className="p-2 rounded-full hover:text-red-500 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPortfolioId(portfolio.id);
                          setOpenDeleteDialog(true);
                        }}
                        aria-label="Delete"
                      >
                        <Trash2 size={18} />
                      </button>

                      <div className="w-px h-6 bg-gray-200 mx-1" />

                      <button
                        className="p-2 rounded-full hover:text-primary transition-colors"
                        onClick={() => handlePortfolioClick(portfolio.id)}
                        aria-label="View"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Portfolio</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this portfolio? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
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
