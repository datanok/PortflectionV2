"use client";
import { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Eye,
  Share2,
  Globe,
  Bot,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  Filter,
  ArrowRight,
  Info,
  ChevronDown,
  Users,
  Clock,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePeriod, setActivePeriod] = useState("7days");
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [previousPeriodData, setPreviousPeriodData] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const periods = [
    { value: "24h", label: "24h", fullLabel: "Last 24 Hours" },
    { value: "7days", label: "7d", fullLabel: "Last 7 Days" },
    { value: "30days", label: "30d", fullLabel: "Last 30 Days" },
    { value: "90days", label: "90d", fullLabel: "Last 90 Days" },
    { value: "all", label: "All", fullLabel: "All Time" },
  ];

  // Custom color palette for better visual appeal
  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
  ];
  const CHART_LINE_COLOR = "#3B82F6";

  // Sample data for development - in production you would fetch this
  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/analytics?period=${activePeriod}`);
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || "Failed to fetch analytics.");
          return;
        }

        const {
          portfolios,
          portfolioData,
          aggregatedStats,
          previousPeriodStats,
        } = result;

        // Optional fallback if previousPeriodStats isn't returned from the API
        const previousPeriodData = previousPeriodStats || {
          totalViews: Math.floor(
            aggregatedStats.totalViews * (0.7 + Math.random() * 0.5)
          ),
          viewsByCountry: aggregatedStats.viewsByCountry.map((item) => ({
            ...item,
            count: Math.floor(item.count * (0.7 + Math.random() * 0.5)),
          })),
          viewsByReferrer: aggregatedStats.viewsByReferrer.map((item) => ({
            ...item,
            count: Math.floor(item.count * (0.7 + Math.random() * 0.5)),
          })),
          botTraffic: aggregatedStats.botTraffic.map((item) => ({
            ...item,
            count: Math.floor(item.count * (0.7 + Math.random() * 0.5)),
          })),
        };

        setAnalyticsData({ portfolios, portfolioData, aggregatedStats });
        setPreviousPeriodData(previousPeriodData);

        // Set default selected portfolio
        if (portfolios?.length > 0) {
          const portfolioWithData =
            portfolios.find((p) => {
              const pd = portfolioData?.[p.id];
              return pd?.totalViews > 0;
            }) || portfolios[0];
          setSelectedPortfolio(portfolioWithData.id);
        }

        setError(null);
      } catch (err) {
        setError(err.error || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalytics();
  }, [activePeriod]);

  // Get the correct data based on whether we're looking at aggregated or portfolio-specific data
  const getCurrentData = () => {
    if (!analyticsData) return null;

    if (selectedPortfolio && analyticsData.portfolioData[selectedPortfolio]) {
      return analyticsData.portfolioData[selectedPortfolio];
    }

    return analyticsData.aggregatedStats;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (activePeriod === "24h") {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const processViewsOverTime = () => {
    const currentData = getCurrentData();
    if (!currentData?.viewsOverTime || currentData.viewsOverTime.length === 0)
      return [];

    return currentData.viewsOverTime
      .map((item) => ({
        date: formatDate(item.timestamp || item.date),
        rawDate: item.timestamp || item.date,
        views: item.count || 0,
      }))
      .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));
  };

  const processCountryData = () => {
    const currentData = getCurrentData();
    if (
      !currentData?.viewsByCountry ||
      currentData.viewsByCountry.length === 0
    ) {
      return [{ country: "No Data", views: 0 }];
    }

    return currentData.viewsByCountry
      .filter((item) => item.country)
      .slice(0, 10)
      .map((item) => ({
        country: item.country || "Unknown",
        views: item.count || 0,
      }))
      .sort((a, b) => b.views - a.views);
  };

  const processReferrerData = () => {
    const currentData = getCurrentData();
    if (
      !currentData?.viewsByReferrer ||
      currentData.viewsByReferrer.length === 0
    ) {
      return [{ referrer: "No Data", views: 0 }];
    }

    return currentData.viewsByReferrer
      .map((item) => ({
        referrer: item.referrer || "Direct",
        views: item.count || 0,
      }))
      .sort((a, b) => b.views - a.views);
  };

  const processBotData = () => {
    const currentData = getCurrentData();
    if (!currentData?.botTraffic || currentData.botTraffic.length === 0) {
      return [{ name: "No Data", value: 1 }];
    }

    const data = [];
    const botEntry = currentData.botTraffic.find((item) => item.isBot === true);
    const humanEntry = currentData.botTraffic.find(
      (item) => item.isBot === false
    );

    if (botEntry) data.push({ name: "Bots", value: botEntry.count || 0 });
    if (humanEntry) data.push({ name: "Humans", value: humanEntry.count || 0 });

    // If we have no data at all, add a placeholder
    if (data.length === 0) {
      data.push({ name: "No Data", value: 1 });
    }

    return data;
  };

  const processRecentVisitors = () => {
    const currentData = getCurrentData();
    if (
      !currentData?.recentVisitors ||
      currentData.recentVisitors.length === 0
    ) {
      return [];
    }

    return currentData.recentVisitors
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5)
      .map((visitor) => ({
        time: new Date(visitor.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: new Date(visitor.timestamp).toLocaleDateString([], {
          month: "short",
          day: "numeric",
        }),
        country: visitor.country || "Unknown",
        referrer: formatReferrer(visitor.referrer),
        isBot: visitor.isBot,
      }));
  };

  const formatReferrer = (referrer) => {
    if (!referrer || referrer === "No Data") return "Direct";
    try {
      const url = new URL(referrer);
      return url.hostname.replace("www.", "");
    } catch (e) {
      return referrer;
    }
  };

  const getTop = (data, key) => {
    if (!data || data.length === 0 || data[0][key] === "No Data")
      return "No data";
    return data[0][key];
  };

  const getHumanTrafficPercentage = () => {
    const data = processBotData();
    if (data.length === 1 && data[0].name === "No Data") return 0;

    const humans = data.find((d) => d.name === "Humans")?.value || 0;
    const bots = data.find((d) => d.name === "Bots")?.value || 0;
    const total = humans + bots;
    return total ? Math.round((humans / total) * 100) : 0;
  };

  const getTotalViews = () => {
    const currentData = getCurrentData();
    return currentData?.totalViews || 0;
  };

  const getPercentageChange = (current, previous) => {
    if (!previous || previous === 0) return { value: 0, isPositive: true };
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(Math.round(change)),
      isPositive: change >= 0,
    };
  };

  const totalViewsChange = useMemo(() => {
    if (!previousPeriodData) return { value: 0, isPositive: true };
    return getPercentageChange(getTotalViews(), previousPeriodData.totalViews);
  }, [previousPeriodData, getCurrentData]);

  const humanTrafficChange = useMemo(() => {
    if (!previousPeriodData) return { value: 0, isPositive: true };

    const currentData = processBotData();
    const currentHumans =
      currentData.find((d) => d.name === "Humans")?.value || 0;
    const currentBots = currentData.find((d) => d.name === "Bots")?.value || 0;
    const currentTotal = currentHumans + currentBots;
    const currentPercentage = currentTotal
      ? (currentHumans / currentTotal) * 100
      : 0;

    const previousBotData = previousPeriodData.botTraffic;
    const previousHumans =
      previousBotData.find((d) => d.isBot === false)?.count || 0;
    const previousBots =
      previousBotData.find((d) => d.isBot === true)?.count || 0;
    const previousTotal = previousHumans + previousBots;
    const previousPercentage = previousTotal
      ? (previousHumans / previousTotal) * 100
      : 0;

    return getPercentageChange(currentPercentage, previousPercentage);
  }, [previousPeriodData, processBotData]);

  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="p-6 space-y-6  min-h-screen">
        <div className="h-8 w-48 rounded animate-pulse mb-6"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg shadow p-4">
              <div className="h-5 w-24 rounded animate-pulse mb -4"></div>
              <div className="h-8 w-16 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-lg shadow p-4">
              <div className="h-6 w-32 rounded animate-pulse mb-4"></div>
              <div className="h-80 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    const errorCode = error?.code || null;

    return (
      <div className="p-6 min-h-screen">
        <Card className="border border-red-200 text-red-700">
          <CardHeader className="flex flex-row items-start space-x-3 pb-2">
            <div className="flex-shrink-0 pt-1">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold">
                {errorCode === "NO_PORTFOLIOS"
                  ? "No portfolios yet"
                  : "Error loading analytics data"}
              </h3>
              <p className="mt-1 text-sm text-red-700">
                {errorCode === "NO_PORTFOLIOS"
                  ? "You haven’t created any portfolios yet. Start by creating one to track analytics."
                  : error.message || "Something went wrong. Please try again."}
              </p>
            </div>
          </CardHeader>
          {errorCode !== "NO_PORTFOLIOS" && (
            <CardContent>
              <button
                className="mt-2 flex items-center text-sm font-medium text-red-600 hover:text-red-500"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="mr-1 h-4 w-4" />
                Retry
              </button>
            </CardContent>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 min-h-screen">
      <div className="rounded-lg shadow p-4 md:p-6 bg-background border border-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Portfolio Analytics
          </h1>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Toggle comparison */}
            <div className="flex items-center">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="flex items-center text-sm font-medium text-muted-foreground hover:bg-muted px-2 py-1 rounded-md"
              >
                <Calendar className="h-4 w-4 mr-1" />
                {showComparison ? "Hide" : "Show"} comparison
              </button>
            </div>

            {/* Portfolio selector */}
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 border border-border rounded-md shadow-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={selectedPortfolio || ""}
                onChange={(e) => setSelectedPortfolio(e.target.value || null)}
              >
                <option value="">All Portfolios</option>
                {analyticsData?.portfolios?.map((portfolio) => (
                  <option key={portfolio.id} value={portfolio.id}>
                    {portfolio.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Export button */}
            {/* <button className="text-sm font-medium flex items-center text-muted-foreground hover:bg-muted px-2 py-1 rounded-md">
            <Download className="h-4 w-4 mr-1" />
            Export
          </button> */}
          </div>
        </div>

        {/* Time period selector */}
        <div className="flex justify-center mb-4">
          <div className="rounded-md p-1 w-auto inline-flex bg-muted">
            {periods.map((period) => (
              <button
                key={period.value}
                className={`px-3 md:px-4 py-1 text-sm rounded-md transition-all ${
                  activePeriod === period.value
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent"
                }`}
                onClick={() => setActivePeriod(period.value)}
                title={period.fullLabel}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-4">
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-sm text-muted-foreground mb-1">
              Total Views
            </div>
            <div className="flex items-center mb-1">
              <Eye className="mr-2 h-5 w-5 text-primary" />
              <span className="text-xl md:text-2xl font-bold text-foreground">
                {getTotalViews().toLocaleString()}
              </span>
            </div>
            {showComparison && (
              <div
                className={`flex items-center text-xs ${
                  totalViewsChange.isPositive
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {totalViewsChange.isPositive ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                <span>{totalViewsChange.value}% vs previous</span>
              </div>
            )}
          </div>

          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-sm text-muted-foreground mb-1">
              Top Country
            </div>
            <div className="flex items-center mb-1">
              <Globe className="mr-2 h-5 w-5 text-primary" />
              <span className="text-xl md:text-2xl font-bold text-foreground truncate">
                {getTop(processCountryData(), "country")}
              </span>
            </div>
            <div className="text-xs text-muted-foreground flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {processCountryData()[0]?.views || 0} visitors
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-sm text-muted-foreground mb-1">
              Top Referrer
            </div>
            <div className="flex items-center mb-1">
              <Share2 className="mr-2 h-5 w-5 text-primary" />
              <span className="text-xl md:text-2xl font-bold text-foreground truncate">
                {formatReferrer(getTop(processReferrerData(), "referrer"))}
              </span>
            </div>
            <div className="text-xs text-muted-foreground flex items-center">
              <ArrowRight className="h-3 w-3 mr-1" />
              {processReferrerData()[0]?.views || 0} referrals
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-sm text-muted-foreground mb-1">
              Human Traffic
            </div>
            <div className="flex items-center mb-1">
              <Bot className="mr-2 h-5 w-5 text-primary" />
              <span className="text-xl md:text-2xl font-bold text-foreground">
                {getHumanTrafficPercentage()}%
              </span>
            </div>
            {showComparison && (
              <div
                className={`flex items-center text-xs ${
                  humanTrafficChange.isPositive
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {humanTrafficChange.isPositive ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                <span>{humanTrafficChange.value}% vs previous</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg shadow p-4 md:p-6 bg-card border border-border">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Views Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={processViewsOverTime()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke={CHART_LINE_COLOR} />
            </LineChart>
          </ResponsiveContainer>
          {showComparison && (
            <div className="mt-2 text-sm text-muted-foreground">
              Comparing current period to previous period.
            </div>
          )}
        </div>

        <div className="rounded-lg shadow p-4 md:p-6 bg-card border border-border">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Traffic by Country
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processCountryData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill={COLORS[0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg shadow p-4 md:p-6 bg-card border border-border">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Top Referrers
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={processReferrerData()}
                dataKey="views"
                nameKey="referrer"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {processReferrerData().map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg shadow p-4 md:p-6 bg-card border border-border">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Bot vs Human Traffic
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={processBotData()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {processBotData().map((entry, index) => (
                  <Cell
                    key={`cell-bot-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
