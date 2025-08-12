"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import the LiveMarketplaceComponent with no SSR
const LiveMarketplaceComponent = dynamic(
  () => import("./LiveMarketplaceComponent").then(mod => ({ default: mod.LiveMarketplaceComponent })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading component...</span>
      </div>
    ),
  }
);

export { LiveMarketplaceComponent };
