"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderIcon, FileTextIcon, BarChart3Icon, Trash2, ChevronRight, Pencil, Loader2, Info, Plus } from "lucide-react";
import { deletePortfolioAction } from "./portfolios/actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";



interface Portfolio {
  id: string;
  title: string;
  type: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>([]);

  const [portfolioListLoading, setPortfolioListLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);


  useEffect(() => {
    // Fetch the portfolio list from the API
    fetch("/api/getPortfolioList")
      .then((res) => res.json())
      .then((data) => {
        setPortfolioList(data.portfolios || []);
        setPortfolioListLoading(false);
      })
      .catch(() => setPortfolioListLoading(false));
  }, []);

  // Function to navigate to the portfolio detail page
  const handlePortfolioClick = (portfolioId) => {
    router.push(`/portfolio/${portfolioId}`);
  };
  const handleDeletePortfolio = useCallback(async (id: string) => {
    try {
      await deletePortfolioAction(id);
      toast.success("Portfolio deleted successfully!");
      
    } catch (error: any) {
      toast.error(error.message || "Failed to delete portfolio.");
    } 
  }, [router]);

  return (
    <div className="p-2">
      {/* Breadcrumb Navigation */}
      {/* <header className="flex h-14 items-center">
        <div className="flex items-center gap-2 px-2">
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Portfolios</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header> */}
      
      <div className="flex flex-col gap-6 mt-4">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Portfolios
              </CardTitle>
              <FolderIcon className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolioListLoading ? "..." : portfolioList.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Activity
              </CardTitle>
              <FileTextIcon className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolioListLoading ? "..." : "Active"}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Analytics
              </CardTitle>
              <BarChart3Icon className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">View</div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio List */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Your Portfolios</CardTitle>
          </CardHeader>
          <CardContent>
          {portfolioListLoading ? (
        <div className="flex flex-col items-center justify-center py-10   rounded-xl shadow-sm">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading your portfolios...</p>
        </div>
      ) : portfolioList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10  rounded-xl shadow-sm border border-dashed border-gray-300 dark:border-gray-700">
          <Info className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No portfolios yet</h3>
          <p className="text-muted-foreground mb-6">Create your first portfolio to start tracking investments</p>
          <button 
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-sm hover:bg-primary/90 transition-colors"
            onClick={() => window.location.href = '/dashboard/portfolios/new'}
          >
            <Plus size={18} />
            Create Portfolio
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {portfolioList.map((portfolio : Portfolio) => (
            <div 
              key={portfolio.id} 
              className="  rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-md transition-all duration-200"
            >
              <div 
                className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between cursor-pointer"
                onClick={() => handlePortfolioClick(portfolio.id)}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold mb-1 truncate">{portfolio.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Badge className="px-2 py-1  rounded-md">{portfolio.type}</Badge>
                    <span className="text-xs">
                      Updated {new Date(portfolio.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <button 
                    className="p-2 rounded-full text-gray-500 hover:text-primary hover: dark:hover:bg-gray-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/dashboard/portfolios/edit/${portfolio.id}`;
                    }}
                    aria-label="Edit portfolio"
                  >
                    <Pencil size={18} />
                  </button>
                  
                  <button 
                    className="p-2 rounded-full text-gray-500 hover:text-red-500 hover: dark:hover:bg-gray-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPortfolioId(portfolio.id);
                      setOpenDeleteDialog(true);
                    }}
                    aria-label="Delete portfolio"
                  >
                    <Trash2 size={18} />
                  </button>
                  
                  <div className="w-px h-6 bg-gray-200 mx-1"></div>
                  
                  <button 
                    className="p-2 rounded-full text-gray-500 hover:text-primary hover: dark:hover:bg-gray-700 transition-colors"
                    onClick={() => handlePortfolioClick(portfolio.id)}
                    aria-label="View portfolio details"
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
      </div>
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Deletion</DialogTitle>
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
          setPortfolioList(prev => prev.filter(p => p.id !== selectedPortfolioId));
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