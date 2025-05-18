import { PortfolioData } from "@/components/PortfolioProvider";

export async function getUserPortfolioData(
  id: string
): Promise<PortfolioData & { portfolioType: string; portfolioItems: any } | null> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${base}/api/getPortfolio?id=${encodeURIComponent(id)}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for freshness
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user portfolio:", error);
    return null;
  }
}
