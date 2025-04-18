// Edit Portfolio Page: Reuses PortfolioBuilder for editing functionality
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import PortfolioBuilder from "../../new/page";

export default function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [defaultValues, setDefaultValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch(`/api/getPortfolio?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch portfolio");
        const data = await res.json();
        // If the portfolio has extraData, merge it into the main object
        const mergedData = data && data.extraData ? { ...data, ...data.extraData } : data;
        setDefaultValues(mergedData);
      } catch (err) {
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!defaultValues) return <div>Portfolio not found.</div>;

  return (
    <PortfolioBuilder editMode={true} defaultValues={defaultValues} portfolioId={id} />
  );
}
