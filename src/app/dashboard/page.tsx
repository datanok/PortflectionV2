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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FolderIcon, FileTextIcon, BarChart3Icon, Trash2, ChevronRight, Pencil, Loader2, Info, Plus, Globe, ArrowUpRight, User, Bot } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { PortfolioListCard } from "@/components/PortfolioListCard";

interface Portfolio {
  id: string;
  title: string;
  type?: string;
  updatedAt?: string;
  views?: number;
  isPublished?: boolean;
}

interface AnalyticsData {
  totalViews: number;
  viewsOverTime: { date: string; count: number }[];
  viewsByCountry: { country: string; count: number }[];
  viewsByReferrer: { referrer: string; count: number }[];
  botTraffic: { isBot: boolean; count: number }[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [portfolioListLoading, setPortfolioListLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);

  // Load portfolios
  useEffect(() => {
    fetch("/api/getPortfolioList?limit=3")
      .then((res) => res.json())
      .then((data) => {
        setPortfolioList(data.portfolios || []);
        setTotalCount(data.totalCount || 0);
        setPortfolioListLoading(false);
      })
      .catch(() => setPortfolioListLoading(false));
  }, []);

  // Load analytics data
  useEffect(() => {
    fetch("/api/analytics?period=30days")
      .then((res) => res.json())
      .then((data) => {
        if (data.aggregatedStats) {
          setAnalyticsData(data.aggregatedStats);
        }
        setAnalyticsLoading(false);
      })
      .catch(() => setAnalyticsLoading(false));
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

  // Calculate human vs bot traffic percentages
  const getTrafficPercentages = () => {
    if (!analyticsData?.botTraffic) return { human: 0, bot: 0 };
    
    const totalTraffic = analyticsData.botTraffic.reduce((sum, item) => sum + item.count, 0);
    if (totalTraffic === 0) return { human: 0, bot: 0 };
    
    const botTraffic = analyticsData.botTraffic.find(item => item.isBot)?.count || 0;
    const humanTraffic = analyticsData.botTraffic.find(item => !item.isBot)?.count || 0;
    
    return {
      human: (humanTraffic / totalTraffic) * 100,
      bot: (botTraffic / totalTraffic) * 100
    };
  };

  const trafficPercentages = getTrafficPercentages();

  // Get top country if available
  const getTopCountry = () => {
    if (!analyticsData?.viewsByCountry?.length) return "N/A";
    return analyticsData.viewsByCountry[0].country;
  };

  // Get top referrer if available
  const getTopReferrer = () => {
    if (!analyticsData?.viewsByReferrer?.length) return "N/A";
    const referrer = analyticsData.viewsByReferrer[0].referrer;
    return referrer === "direct" ? "Direct Traffic" : referrer;
  };

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10">
      <div className="flex flex-col gap-6 mt-4">
        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
          <Card className="shadow-sm w-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Portfolios
              </CardTitle>
              <FolderIcon className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolioListLoading ? "..." : totalCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {portfolioListLoading
                  ? ""
                  : `${totalCount} total portfolio${
                      totalCount !== 1 ? "s" : ""
                    }`}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm w-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <FileTextIcon className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsLoading ? "..." : analyticsData?.totalViews || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {analyticsLoading ? "" : "Last 30 days"}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm w-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Top Country</CardTitle>
              <Globe className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate">
                {analyticsLoading ? "..." : getTopCountry()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {analyticsLoading
                  ? ""
                  : analyticsData?.viewsByCountry?.length
                  ? `${analyticsData.viewsByCountry[0].count} views`
                  : "No country data"}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm w-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Top Referrer
              </CardTitle>
              <ArrowUpRight className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate">
                {analyticsLoading ? "..." : getTopReferrer()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {analyticsLoading
                  ? ""
                  : analyticsData?.viewsByReferrer?.length
                  ? `${analyticsData.viewsByReferrer[0].count} visits`
                  : "No referrer data"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio List */}
        <PortfolioListCard
          portfolioList={portfolioList}
          portfolioListLoading={portfolioListLoading}
          totalCount={totalCount}
          onEdit={(id) => router.push(`/dashboard/portfolios/edit/${id}`)}
          onDelete={(id) => {
            setSelectedPortfolioId(id);
            setOpenDeleteDialog(true);
          }}
          onView={(id) => router.push(`portfolio/${id}`)}
          onCreate={() => router.push("/dashboard/portfolios/new")}
        />
      </div>

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