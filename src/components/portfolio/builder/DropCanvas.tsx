import React from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { PortfolioComponent } from "@/lib/portfolio/types";
import ComponentRenderer from "../renderer/ComponentRenderer";
import { GlobalTheme } from "./GlobalThemeControls";

interface DropCanvasProps {
  components: PortfolioComponent[];
  onSelect: (component: PortfolioComponent) => void;
  selectedId?: string | null;
  onDrop?: (component: PortfolioComponent) => void;
  globalTheme?: GlobalTheme;
}

export default function DropCanvas({
  components,
  onSelect,
  selectedId,
  onDrop,
  globalTheme,
}: DropCanvasProps) {
  const [, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: { type: { id: string }; variant: any }) => {
      console.log("Drop detected:", item);
      const newComponent: PortfolioComponent = {
        id: uuidv4(),
        type: item.type.id,
        variant: item.variant.id,
        props: item.variant.defaultProps || {},
        styles: item.variant.defaultStyles || {},
        order: components.length,
      };
      console.log("Created component:", newComponent);
      onDrop?.(newComponent);
    },
  }));

  return (
    <div
      ref={drop as any}
      className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-100 min-h-0"
    >
      <div className="max-w-4xl mx-auto">
        {components.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 sm:h-80 lg:h-96 text-gray-400 border-2 border-dashed rounded-lg p-6 text-center">
            <div className="w-20 h-20 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
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
            <p className="text-lg sm:text-xl font-medium mb-2">
              Start Building Your Portfolio
            </p>
            <p className="text-sm sm:text-base text-gray-500 mb-4">
              Drag components from the palette to create your portfolio
            </p>
            <div className="flex flex-col sm:flex-row gap-2 text-xs text-gray-400">
              <span>• Hero sections for introductions</span>
              <span>• About sections for your story</span>
              <span>• Project showcases</span>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {components.map((component, index) => (
              <div
                key={component.id}
                onClick={() => onSelect(component)}
                className={`relative transition-all duration-200 ${
                  selectedId === component.id
                    ? "ring-2 ring-blue-500 ring-inset"
                    : "hover:ring-1 hover:ring-blue-300 hover:ring-inset"
                }`}
              >
                {/* Component selection indicator */}
                {selectedId === component.id && (
                  <div className="absolute top-2 right-2 z-20 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                    Selected
                  </div>
                )}

                <ComponentRenderer
                  component={component}
                  preview={true}
                  globalTheme={globalTheme}
                />

                {/* Subtle separator between components (except last one) */}
                {index < components.length - 1 && (
                  <div className="h-px bg-gray-100 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
