"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Dynamically import the PortfolioEditor with SSR disabled
const PortfolioEditor = dynamic(
  () => import("@/components/portfolio/builder/PortfolioEditor"),
  { ssr: false }
);

export default function PortfolioBuilderPage() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // This ensures we only render the editor on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        {isClient && (
          <PortfolioEditor portfolioId={undefined} initialData={undefined} />
        )}
      </div>
    </div>
  );
}
