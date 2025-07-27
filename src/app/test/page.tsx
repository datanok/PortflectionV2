"use client";

import React, { useState } from "react";
import { componentRegistry, getComponent } from "@/lib/portfolio/registry";
import { PortfolioComponent } from "@/lib/portfolio/types";
import ComponentRenderer from "@/components/portfolio/renderer/ComponentRenderer";

export default function TestPage() {
  const [selectedVariant, setSelectedVariant] = useState("hero-with-image");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  // Create a test component
  const testComponent: PortfolioComponent = {
    id: "test-hero",
    type: "hero",
    variant: selectedVariant,
    props: {
      title: "Test Hero Component",
      subtitle: "Testing background color changes",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      ctaText: "Test Button",
      ctaLink: "#",
    },
    styles: {
      backgroundColor: backgroundColor,
      textColor: "#111827",
      paddingY: "64",
      paddingX: "16",
      textAlign: "center",
    },
    order: 0,
  };

  const availableVariants = componentRegistry.hero?.variants || [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Hero Component Test</h1>

      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Variant:
          </label>
          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {availableVariants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Background Color:
          </label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="border rounded px-3 py-2 ml-2"
            placeholder="#ffffff"
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <ComponentRenderer component={testComponent} />
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <pre className="text-sm">
          {JSON.stringify(
            {
              selectedVariant,
              backgroundColor,
              component: testComponent,
              availableVariants: availableVariants.map((v) => v.id),
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
