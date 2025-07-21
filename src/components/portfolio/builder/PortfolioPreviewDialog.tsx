import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  Smartphone,
  Tablet,
  Monitor,
} from "lucide-react";
import ComponentRenderer from "../renderer/ComponentRenderer";
import { PortfolioComponent } from "@/lib/portfolio/types";

import { GlobalTheme } from "./GlobalThemeControls";

interface PortfolioPreviewDialogProps {
  components: PortfolioComponent[];
  isOpen: boolean;
  onClose: () => void;
  globalTheme?: GlobalTheme;
}

export default function PortfolioPreviewDialog({
  components,
  isOpen,
  onClose,
  globalTheme,
}: PortfolioPreviewDialogProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [previewMode, setPreviewMode] = React.useState<
    "desktop" | "tablet" | "mobile" | "large-desktop" | "small-mobile"
  >("desktop");

  const getPreviewWidth = () => {
    switch (previewMode) {
      case "small-mobile":
        return "max-w-xs w-full";
      case "mobile":
        return "max-w-sm w-full";
      case "tablet":
        return "max-w-2xl w-full";
      case "desktop":
        return "max-w-4xl w-full";
      case "large-desktop":
        return "max-w-7xl w-full";
      default:
        return "w-full";
    }
  };

  const getPreviewHeight = () => {
    return "h-screen";
  };

  const sortedComponents = React.useMemo(() => {
    return [...components].sort((a, b) => a.order - b.order);
  }, [components]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`p-0 w-screen min-w-full h-screen`}
        style={{ margin: 0, borderRadius: 0 }}
      >
        <DialogHeader className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DialogTitle className="text-lg font-semibold">
                Portfolio Preview ({components.length} components)
              </DialogTitle>

              {/* Device Preview Controls */}
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant={
                    previewMode === "small-mobile" ? "default" : "outline"
                  }
                  onClick={() => setPreviewMode("small-mobile")}
                  className="text-xs px-2"
                  title="Small Mobile (320px)"
                >
                  <Smartphone className="w-3 h-3 mr-1" />S
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === "mobile" ? "default" : "outline"}
                  onClick={() => setPreviewMode("mobile")}
                  className="text-xs px-2"
                  title="Mobile (480px)"
                >
                  <Smartphone className="w-3 h-3 mr-1" />M
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === "tablet" ? "default" : "outline"}
                  onClick={() => setPreviewMode("tablet")}
                  className="text-xs px-2"
                  title="Tablet (768px)"
                >
                  <Tablet className="w-3 h-3 mr-1" />T
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === "desktop" ? "default" : "outline"}
                  onClick={() => setPreviewMode("desktop")}
                  className="text-xs px-2"
                  title="Desktop (1024px)"
                >
                  <Monitor className="w-3 h-3 mr-1" />D
                </Button>
                <Button
                  size="sm"
                  variant={
                    previewMode === "large-desktop" ? "default" : "outline"
                  }
                  onClick={() => setPreviewMode("large-desktop")}
                  className="text-xs px-2"
                  title="Large Desktop (1280px)"
                >
                  <Monitor className="w-3 h-3 mr-1" />L
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Component Count */}
              <div className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {components.length} component
                {components.length !== 1 ? "s" : ""}
              </div>

              {/* Fullscreen Toggle */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-xs"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </Button>

              {/* Reset Preview */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setPreviewMode("desktop");
                  setIsFullscreen(false);
                }}
                className="text-xs"
                title="Reset to Desktop"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>

              {/* Close Button */}
              <Button
                size="sm"
                variant="outline"
                onClick={onClose}
                className="text-xs"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Preview Content */}
        <div
          className={`flex-1 overflow-auto bg-gray-100 ${getPreviewHeight()}`}
        >
          <div className="flex justify-center items-start min-h-full">
            <div className={`${getPreviewWidth()} bg-white overflow-hidden`}>
              {/* Preview Header */}
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-500">
                  {previewMode === "small-mobile" && "📱 Small Mobile (320px)"}
                  {previewMode === "mobile" && "📱 Mobile (480px)"}
                  {previewMode === "tablet" && "📱 Tablet (768px)"}
                  {previewMode === "desktop" && "🖥️ Desktop (1024px)"}
                  {previewMode === "large-desktop" &&
                    "🖥️ Large Desktop (1280px)"}
                </div>
              </div>

              {/* Portfolio Content */}
              <div className="relative">
                {sortedComponents.length === 0 ? (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <X className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-lg font-medium">No components yet</p>
                      <p className="text-sm">
                        Add components from the palette to see your portfolio
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="portfolio-preview">
                    {sortedComponents.map((component, index) => (
                      <div key={component.id} className="component-wrapper">
                        <ComponentRenderer
                          component={component}
                          preview={false} // Show full component, not preview mode
                          globalTheme={globalTheme}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Footer */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <span className="font-medium">Total Components:</span>{" "}
              {components.length}
            </div>
            <div className="flex items-center gap-4">
              <span>
                <span className="font-medium">Preview Mode:</span> {previewMode}
              </span>
              <span>
                <span className="font-medium">Screen:</span>{" "}
                {isFullscreen ? "Fullscreen" : "Dialog"}
              </span>
            </div>
          </div>
        </div>

        <style jsx>{`
          .portfolio-preview {
            min-height: 100vh;
          }
          .component-wrapper {
            width: 100%;
          }
          .component-wrapper:not(:last-child) {
            border-bottom: 1px solid #f3f4f6;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
