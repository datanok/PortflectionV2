import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Maximize2, Minimize2, RotateCcw } from "lucide-react";
import ComponentRenderer from "../renderer/ComponentRenderer";
import { PortfolioComponent } from "@/lib/portfolio/types";

interface PreviewDialogProps {
  component: PortfolioComponent | null;
  isOpen: boolean;
  onClose: () => void;
  globalTheme?: any;
}

export default function PreviewDialog({
  component,
  isOpen,
  onClose,
  globalTheme,
}: PreviewDialogProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [previewMode, setPreviewMode] = React.useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  if (!component) return null;

  const getPreviewWidth = () => {
    switch (previewMode) {
      case "mobile":
        return "max-w-sm";
      case "tablet":
        return "max-w-2xl";
      case "desktop":
      default:
        return "max-w-4xl";
    }
  };

  const getPreviewHeight = () => {
    if (isFullscreen) return "h-screen";
    switch (previewMode) {
      case "mobile":
        return "h-[600px]";
      case "tablet":
        return "h-[700px]";
      case "desktop":
      default:
        return "h-[800px]";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`p-0 ${
          isFullscreen ? "w-screen h-screen max-w-none" : "max-w-6xl"
        }`}
        style={isFullscreen ? { margin: 0, borderRadius: 0 } : {}}
      >
        <DialogHeader className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DialogTitle className="text-lg font-semibold">
                Preview:{" "}
                {component.type.charAt(0).toUpperCase() +
                  component.type.slice(1)}{" "}
                - {component.variant}
              </DialogTitle>

              {/* Device Preview Controls */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={previewMode === "desktop" ? "default" : "outline"}
                  onClick={() => setPreviewMode("desktop")}
                  className="text-xs"
                >
                  Desktop
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === "tablet" ? "default" : "outline"}
                  onClick={() => setPreviewMode("tablet")}
                  className="text-xs"
                >
                  Tablet
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === "mobile" ? "default" : "outline"}
                  onClick={() => setPreviewMode("mobile")}
                  className="text-xs"
                >
                  Mobile
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
          <div className="flex justify-center items-start p-4 min-h-full">
            <div
              className={`${getPreviewWidth()} w-full bg-white shadow-lg rounded-lg overflow-hidden`}
            >
              {/* Preview Header */}
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-500">
                  {previewMode === "mobile" && "📱 Mobile Preview"}
                  {previewMode === "tablet" && "📱 Tablet Preview"}
                  {previewMode === "desktop" && "🖥️ Desktop Preview"}
                </div>
              </div>

              {/* Component Preview */}
              <div className="relative">
                <ComponentRenderer
                  component={component}
                  preview={false} // Show full component, not preview mode
                  globalTheme={globalTheme}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview Footer */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <span className="font-medium">Component ID:</span> {component.id}
            </div>
            <div className="flex items-center gap-4">
              <span>
                <span className="font-medium">Type:</span> {component.type}
              </span>
              <span>
                <span className="font-medium">Variant:</span>{" "}
                {component.variant}
              </span>
              <span>
                <span className="font-medium">Order:</span> {component.order}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
