import { PortfolioData } from "@/components/PortfolioProvider";

export async function getUserPortfolioData(
  id: string
): Promise<PortfolioData & { portfolioType: string } | null> {
  let url: string;
  console.log("idahr")

  if (typeof window === "undefined") {
    // Server-side: use absolute URL from env or default to localhost
    const base =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    url = `${base}/api/getPortfolio?id=${encodeURIComponent(id)}`;
  } else {
    // Client-side: use window.location.origin
    url = `${window.location.origin}/api/getPortfolio?id=${encodeURIComponent(id)}`;
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Use cache: 'no-store' if you want fresh data every time
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user portfolio:", error);
    return null;
  }
}
