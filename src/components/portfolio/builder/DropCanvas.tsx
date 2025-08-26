// components/builder/DropCanvas.tsx
import React from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { PortfolioComponent } from "@/lib/portfolio/types";
import ComponentRenderer from "../renderer/ComponentRenderer";
import DeviceFrame from "./DeviceFrame";

interface DropCanvasProps {
  components: PortfolioComponent[];
  onSelect: (component: PortfolioComponent) => void;
  selectedId?: string | null;
  deviceSize?: "mobile" | "tablet" | "desktop";
  onDrop?: (component: PortfolioComponent) => void;
}

export default function DropCanvas({
  components,
  onSelect,
  selectedId,
  deviceSize = "desktop",
  onDrop,
}: DropCanvasProps) {
  const [, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: { type: { id: string }; variant: any }) => {
      const newComponent: PortfolioComponent = {
        id: uuidv4(),
        type: item.type.id,
        variant: item.variant.id,
        props: item.variant.defaultProps || {},
        styles: item.variant.defaultStyles || {},
        order: components.length,
      };
      onDrop?.(newComponent);
    },
  }));

  return (
    <div ref={drop as any} className="flex justify-center py-6 overflow-auto">
      <DeviceFrame deviceSize={deviceSize}>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
          {components.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 border-2 border-dashed rounded-lg p-6 text-center">
              <div className="w-20 h-20 mb-4 bg-background rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium mb-2">Start Building Your Portfolio</p>
              <p className="text-sm text-gray-500 mb-4">
                Drag components from the palette to create your portfolio
              </p>
            </div>
          ) : (
            components.map((component, index) => (
              <div
                key={component.id}
                onClick={() => onSelect(component)}
                className={`relative transition-all duration-200 ${
                  selectedId === component.id
                    ? "ring-2 ring-blue-500 ring-inset"
                    : "hover:ring-1 hover:ring-blue-300 hover:ring-inset"
                }`}
              >
                {selectedId === component.id && (
                  <div className="absolute top-2 right-2 z-20 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                    Selected
                  </div>
                )}
                <ComponentRenderer
                  component={component}
                  preview={true}
                  deviceSize={deviceSize}
                />
                {index < components.length - 1 && (
                  <div className="h-px bg-background mx-4"></div>
                )}
              </div>
            ))
          )}
        </div>
      </DeviceFrame>
    </div>
  );
}
