"use client";

import React from "react";
import { componentRegistry, getComponent } from "@/lib/portfolio/registry";

export default function DebugPage() {
  // Test the component registry
  const heroSection = componentRegistry.hero;
  const heroVariants = heroSection?.variants || [];

  // Test getting specific components
  const heroWithImage = getComponent("hero", "hero-with-image");
  const heroMinimal = getComponent("hero", "hero-minimal");
  const heroCentered = getComponent("hero", "hero-centered");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Component Registry Debug</h1>

      <div className="space-y-6">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-2">Hero Section Info:</h2>
          <pre className="text-sm">
            {JSON.stringify(
              {
                id: heroSection?.id,
                name: heroSection?.name,
                description: heroSection?.description,
                variantsCount: heroVariants.length,
                variantIds: heroVariants.map((v) => v.id),
              },
              null,
              2
            )}
          </pre>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-2">Hero Variants:</h2>
          <div className="space-y-2">
            {heroVariants.map((variant) => (
              <div key={variant.id} className="p-2 bg-white rounded border">
                <strong>{variant.name}</strong> ({variant.id})
                <br />
                <small>
                  Component: {variant.component ? "✓ Loaded" : "✗ Missing"}
                </small>
                <br />
                <small>
                  Default Props:{" "}
                  {Object.keys(variant.defaultProps || {}).length} props
                </small>
                <br />
                <small>
                  Default Styles:{" "}
                  {Object.keys(variant.defaultStyles || {}).length} styles
                </small>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-2">Component Tests:</h2>
          <div className="space-y-2">
            <div>
              hero-with-image: {heroWithImage ? "✓ Found" : "✗ Not Found"}
            </div>
            <div>hero-minimal: {heroMinimal ? "✓ Found" : "✗ Not Found"}</div>
            <div>hero-centered: {heroCentered ? "✓ Found" : "✗ Not Found"}</div>
          </div>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-2">Registry Keys:</h2>
          <pre className="text-sm">
            {JSON.stringify(Object.keys(componentRegistry), null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
