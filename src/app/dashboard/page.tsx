"use client";

import { useState, useEffect } from "react";
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
import { FolderIcon, FileTextIcon, BarChart3Icon } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [portfolioList, setPortfolioList] = useState([]);
  const [portfolioListLoading, setPortfolioListLoading] = useState(true);

  useEffect(() => {
    // Fetch the portfolio list from the API
    fetch("/api/getPortfolioList")
      .then((res) => res.json())
      .then((data) => {
        setPortfolioList(data.portfolio || []);
        setPortfolioListLoading(false);
      })
      .catch(() => setPortfolioListLoading(false));
  }, []);

  // Function to navigate to the portfolio detail page
  const handlePortfolioClick = (portfolioId) => {
    router.push(`/portfolio/${portfolioId}`);
  };

  return (
    <div className="p-6">
      {/* Breadcrumb Navigation */}
      <header className="flex h-14 items-center">
        <div className="flex items-center gap-2 px-4">
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
      </header>
      
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
              <div className="flex items-center justify-center py-6">Loading portfolios...</div>
            ) : portfolioList.length === 0 ? (
              <div className="flex items-center justify-center py-6">No portfolios found.</div>
            ) : (
              <ul className="space-y-2">
                {portfolioList.map((portfolio) => (
                  <li 
                    key={portfolio.id} 
                    className="rounded border p-4 flex flex-col md:flex-row md:items-center md:justify-between hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => handlePortfolioClick(portfolio.id)}
                  >
                    <div>
                      <div className="font-bold">{portfolio.title}</div>
                      <div className="text-xs text-muted-foreground">Type: {portfolio.type}</div>
                    </div>
                    <div className="mt-2 md:mt-0 flex flex-row items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Last updated: {portfolio.updatedAt ? new Date(portfolio.updatedAt).toLocaleString() : 'N/A'}
                      </span>
                      <button
                        type="button"
                        className="ml-4 px-3 py-1 rounded bg-primary text-white text-xs hover:bg-primary/80 transition-colors"
                        onClick={e => {
                          e.stopPropagation();
                          router.push(`/dashboard/portfolios/edit/${portfolio.id}`);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}