"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import PortfolioBuilder from "../../new/page";
import { PortfolioData } from "@/components/PortfolioProvider";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";


export default function EditPortfolioPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params); // correct usage of use()
  const router = useRouter();
  const [defaultValues, setDefaultValues] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPortfolio() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/getPortfolio/edit?id=${id}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch portfolio");
        }
        const data = await res.json();
        const mergedData = data && data.extraData ? { ...data, ...data.extraData } : data;
        setDefaultValues(mergedData);
      } catch (err: any) {
        if (err.message === "Forbidden") {
          setError("You do not have permission to edit this portfolio.");
        } else {
          setError(err.message || "An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, [id]);

  if (loading)
    return (
      <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="flex-1 overflow-auto p-2 space-y-6 mt-4">
        {/* Simulate multiple form fields */}
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-full" />
        {/* Simulate a rich text or textarea */}
        <Skeleton className="h-24 w-full" />
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button disabled variant="outline" size="sm">
          Previous
        </Button>
        <Button disabled size="sm">
          Loading...
        </Button>
      </CardFooter>
    </Card>
    );

  if (error)
    return (
      <div className="max-w-xl mx-auto p-6 mt-20 bg-red-50 border border-red-300 rounded-lg text-red-700">
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p>{error}</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Go Back
        </button>
      </div>
    );

  if (!defaultValues)
    return (
      <div className="max-w-xl mx-auto p-6 mt-20 bg-yellow-50 border border-yellow-300 rounded-lg text-yellow-700">
        <h2 className="text-xl font-semibold mb-2">Portfolio Not Found</h2>
        <p>Sorry, we couldn’t find the portfolio you are trying to edit.</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 inline-block px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    );

  // If all good, render PortfolioBuilder with default values
  return (
      <PortfolioBuilder editMode={true} defaultValues={defaultValues} portfolioId={id} />

  );
}
