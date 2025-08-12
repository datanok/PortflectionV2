"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { CommunityComponentRenderer } from "../community/CommunityComponentRenderer";

// Enhanced code sanitization utility (kept for backward compatibility)
export function sanitizeComponentCode(rawCode: string): string {
  if (!rawCode || typeof rawCode !== "string") {
    return "";
  }

  return (
    rawCode
      // Handle escaped newlines
      .replace(/\\n/g, "\n")
      // Handle escaped quotes
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      // Handle escaped backslashes
      .replace(/\\\\/g, "\\")
      // Handle escaped tabs
      .replace(/\\t/g, "\t")
      // Handle escaped carriage returns
      .replace(/\\r/g, "\r")
      // Remove any extra whitespace at the beginning/end
      .trim()
      // Normalize line endings to \n
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      // Remove Next.js specific directives that might cause issues
      .replace(/^["']use client["'];?\s*$/gm, "")
      .replace(/^["']use server["'];?\s*$/gm, "")
  );
}

interface LiveMarketplaceComponentProps {
  componentCode?: string; // Kept for backward compatibility
  componentId?: string; // New: ID for community components
  componentProps?: Record<string, any>;
  scope?: Record<string, any>;
  onError?: (error: Error) => void;
  className?: string;
  fallback?: React.ReactNode;
}

// Main component that now uses the community system
function LiveMarketplaceComponentInner({
  componentCode,
  componentId,
  componentProps = {},
  scope = {},
  onError,
  className = "",
  fallback,
}: LiveMarketplaceComponentProps) {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Enhanced error handling
  const handleError = useCallback(
    (error: Error) => {
      console.error("Component error:", error);
      setError(error);
      onError?.(error);
    },
    [onError]
  );

  useEffect(() => {
    if (!mounted) return;

    setIsLoading(true);
    setError(null);

    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [componentId, componentCode, mounted]);

  // Don't render on server side
  if (!mounted) {
    return (
      fallback || (
        <div className={`flex items-center justify-center p-8 ${className}`}>
          <div className="animate-pulse bg-gray-200 h-32 w-full rounded"></div>
        </div>
      )
    );
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading component...</span>
      </div>
    );
  }

  // If we have a componentId, use the new community system
  if (componentId) {
    return (
      <CommunityComponentRenderer
        componentId={componentId}
        props={componentProps}
        className={className}
        fallback={fallback}
        onError={handleError}
      />
    );
  }

  // Fallback for legacy componentCode (shows error message)
  if (componentCode) {
    return (
      <Alert variant="destructive" className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div>
            <strong>Legacy component code detected:</strong>
          </div>
          <div className="text-sm mt-1">
            This component needs to be converted to the new community system.
            Please use componentId instead of componentCode.
          </div>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm hover:text-red-600">
              Show legacy code
            </summary>
            <pre className="text-xs mt-1 p-2 bg-gray-100 rounded overflow-auto max-h-32 whitespace-pre-wrap">
              {sanitizeComponentCode(componentCode)}
            </pre>
          </details>
        </AlertDescription>
      </Alert>
    );
  }

  // No component provided
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        No component provided. Please specify either componentId or
        componentCode.
      </AlertDescription>
    </Alert>
  );
}

// Export with dynamic import to avoid SSR issues
export const LiveMarketplaceComponent = dynamic(
  () => Promise.resolve(LiveMarketplaceComponentInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse bg-gray-200 h-32 w-full rounded"></div>
      </div>
    ),
  }
);

// New wrapper for community components
export function CommunityComponentWrapper({
  componentId,
  props = {},
  ...rest
}: {
  componentId: string;
  props?: Record<string, any>;
  [key: string]: any;
}) {
  return (
    <CommunityComponentRenderer
      componentId={componentId}
      props={props}
      {...rest}
    />
  );
}

// Database storage utilities (kept for backward compatibility)
export function prepareCodeForDatabase(code: string): string {
  return code.trim().replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

export function retrieveCodeFromDatabase(storedCode: string): string {
  return sanitizeComponentCode(storedCode);
}

// Enhanced hooks with better error handling for Next.js
export function useInstalledComponents() {
  const [installedComponents, setInstalledComponents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInstalledComponents() {
      try {
        // Use Next.js API routes
        const response = await fetch(
          "/api/components/marketplace?installed=true",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const sanitizedComponents = (data.installedComponentsData || []).map(
            (component: any) => ({
              ...component,
              code: component.code ? sanitizeComponentCode(component.code) : "",
            })
          );
          setInstalledComponents(sanitizedComponents);
        } else {
          const errorText = await response.text();
          setError(
            `Failed to fetch installed components: ${response.status} ${errorText}`
          );
        }
      } catch (err) {
        setError("Error loading installed components");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchInstalledComponents();
  }, []);

  return {
    installedComponents,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      setError(null);
      // Re-run the effect
      window.location.reload();
    },
  };
}

export function useMarketplaceComponents() {
  const [marketplaceComponents, setMarketplaceComponents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMarketplaceComponents() {
      try {
        // Use Next.js API routes
        const response = await fetch("/api/components/marketplace", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const sanitizedComponents = (data.components || []).map(
            (component: any) => ({
              ...component,
              code: component.code ? sanitizeComponentCode(component.code) : "",
            })
          );
          setMarketplaceComponents(sanitizedComponents);
        } else {
          const errorText = await response.text();
          setError(
            `Failed to fetch marketplace components: ${response.status} ${errorText}`
          );
        }
      } catch (err) {
        setError("Error loading marketplace components");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMarketplaceComponents();
  }, []);

  return {
    marketplaceComponents,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      setError(null);
      // Re-run the effect
      window.location.reload();
    },
  };
}

// Utility function for Next.js API routes
export async function handleComponentAPI(req: any, res: any) {
  if (req.method === "GET") {
    try {
      // Your component fetching logic here
      const components = []; // Replace with actual data fetching
      res.status(200).json({ components });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to fetch components" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
