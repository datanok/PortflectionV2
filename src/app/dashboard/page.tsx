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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FolderIcon,
  FileTextIcon,
  BarChart3Icon,
  Trash2,
  ChevronRight,
  Pencil,
  Loader2,
  Info,
  Plus,
  Globe,
  ArrowUpRight,
  User,
  Bot,
  Shield,
  Users,
  Store,
  FileText,
} from "lucide-react";
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
import { listPortfolios } from "@/actions/portfolio-actions";
import { authClient } from "../../../auth-client";

interface Portfolio {
  id: string;
  title: string;
  type?: string;
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

interface AnalyticsData {
  totalViews: number;
  viewsOverTime: { date: string; count: number }[];
  viewsByCountry: { country: string; count: number }[];
  viewsByReferrer: { referrer: string; count: number }[];
  botTraffic: { isBot: boolean; count: number }[];
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [portfolioListLoading, setPortfolioListLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(
    null
  );

  // Check if user is admin
  const isAdmin = session?.user?.role === "admin";

  // Load portfolios
  useEffect(() => {
    async function loadPortfolios() {
      try {
        const result = await listPortfolios({
          page: 1,
          limit: 3,
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

    const totalTraffic = analyticsData.botTraffic.reduce(
      (sum, item) => sum + item.count,
      0
    );
    if (totalTraffic === 0) return { human: 0, bot: 0 };

    const botTraffic =
      analyticsData.botTraffic.find((item) => item.isBot)?.count || 0;
    const humanTraffic =
      analyticsData.botTraffic.find((item) => !item.isBot)?.count || 0;

    return {
      human: (humanTraffic / totalTraffic) * 100,
      bot: (botTraffic / totalTraffic) * 100,
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

          {/* <Card className="shadow-sm w-full">
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
          </Card> */}

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

        {/* Admin Access Section */}
        {isAdmin && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Admin Access
              </CardTitle>
              <CardDescription>
                Quick access to admin functions and component management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => router.push("/admin")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => router.push("/admin/users")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  User Management
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => router.push("/admin/components/review")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Component Review
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => router.push("/components/marketplace")}
                >
                  <Store className="h-4 w-4 mr-2" />
                  Component Marketplace
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

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
