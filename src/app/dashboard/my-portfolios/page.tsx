"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PortfolioListCard } from "@/components/PortfolioListCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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

export default function MyPortfoliosPage() {
  const router = useRouter();
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>([]);
  const [portfolioListLoading, setPortfolioListLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // Fetch portfolios from API
    const fetchPortfolios = async () => {
      try {
        setPortfolioListLoading(true);
        const response = await fetch('/api/portfolio/list');
        if (response.ok) {
          const data = await response.json();
          setPortfolioList(data.portfolios || []);
          setTotalCount(data.totalCount || 0);
        }
      } catch (error) {
        console.error('Error fetching portfolios:', error);
        setPortfolioList([]);
        setTotalCount(0);
      } finally {
        setPortfolioListLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/portfolio-builder?portfolioId=${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio?')) {
      try {
        const response = await fetch(`/api/portfolio/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setPortfolioList(prev => prev.filter(p => p.id !== id));
          setTotalCount(prev => prev - 1);
        }
      } catch (error) {
        console.error('Error deleting portfolio:', error);
      }
    }
  };

  const handleView = (id: string) => {
    router.push(`/portfolio/preview/${id}`);
  };

  const handleCreate = () => {
    router.push('/dashboard/portfolio-builder');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Portfolios</h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize your portfolio websites
          </p>
        </div>
        <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Portfolio
        </Button>
      </div>

      <PortfolioListCard
        title="All Portfolios"
        description="Your complete portfolio collection"
        portfolioList={portfolioList}
        portfolioListLoading={portfolioListLoading}
        totalCount={totalCount}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onCreate={handleCreate}
        limit={50} // Show all portfolios on this page
      />
    </div>
  );
}