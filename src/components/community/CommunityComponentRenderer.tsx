"use client";

import React, { useState, useEffect } from "react";
import { ComponentMetadata } from "@/lib/componentRegistry";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

interface CommunityComponentRendererProps {
  componentId: string;
  props?: Record<string, any>;
  className?: string;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
  onLoad?: (metadata: ComponentMetadata) => void;
}

// Simple component loader without the complex dynamic system for now
async function loadComponentSimple(componentId: string) {
  // For now, just return a simple test component
  const TestComponent = dynamic(() => import("./TestComponent"), {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
      </div>
    ),
  });

  return {
    Component: TestComponent,
    metadata: {
      id: componentId,
      name: "TestComponent",
      description: "Test component",
      category: "test",
      tags: ["test"],
      version: "1.0.0",
      isPremium: false,
      compatibility: [],
      dependencies: [],
      authorName: "Test Author",
      authorEmail: "test@example.com",
      downloads: 0,
      rating: 0,
      reviewCount: 0,
      approvedAt: new Date(),
      filePath: "src/components/community/TestComponent.tsx",
    } as ComponentMetadata,
  };
}

export function CommunityComponentRenderer({
  componentId,
  props = {},
  className = "",
  fallback,
  onError,
  onLoad,
}: CommunityComponentRendererProps) {
  const [loadedComponent, setLoadedComponent] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadComponentAsync() {
      try {
        setIsLoading(true);
        setError(null);

        const component = await loadComponentSimple(componentId);

        if (isMounted) {
          setLoadedComponent(component);
          onLoad?.(component.metadata);
        }
      } catch (err) {
        if (isMounted) {
          const error =
            err instanceof Error ? err : new Error("Failed to load component");
          setError(error);
          onError?.(error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadComponentAsync();

    return () => {
      isMounted = false;
    };
  }, [componentId, onError, onLoad]);

  if (isLoading) {
    return (
      fallback || (
        <div className={`flex items-center justify-center p-8 ${className}`}>
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading component...</span>
        </div>
      )
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div>
            <strong>Failed to load component:</strong> {error.message}
          </div>
          <div className="text-sm mt-1">Component ID: {componentId}</div>
        </AlertDescription>
      </Alert>
    );
  }

  if (!loadedComponent) {
    return (
      <Alert variant="destructive" className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Component not found</AlertDescription>
      </Alert>
    );
  }

  const { Component } = loadedComponent;

  return (
    <div className={className}>
      <Component {...props} />
    </div>
  );
}

// Export a dynamic version for SSR compatibility
export const DynamicCommunityComponentRenderer = dynamic(
  () => Promise.resolve(CommunityComponentRenderer),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse bg-gray-200 h-32 w-full rounded"></div>
      </div>
    ),
  }
);
