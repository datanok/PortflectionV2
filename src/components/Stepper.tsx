import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

interface Step {
  title: string;
  description: string;
}

interface VerticalStepperProps {
  currentStep: number;
  steps?: Step[];
  tabList?: string[];
  currentTab?: string;
}

const VerticalStepper: React.FC<VerticalStepperProps> = ({
  currentStep = 1,
  steps = [
    {
      title: "Choose Portfolio Type",
      description: "Select the type of portfolio you want to create",
    },
    {
      title: "Enter Your Details",
      description: "Fill in your personal and professional information",
    },
    {
      title: "Choose Theme Colors",
      description: "Select colors that represent your brand",
    },
    {
      title: "Review & Submit",
      description: "Verify your information before submission",
    },
  ],
  tabList = [],
  currentTab = "",
}) => {
  return (
    <Card className="w-full border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
      {/* Header with progress stats */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {currentStep}/{steps.length}
        </span>

        <div className="flex-1 mx-4 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 dark:bg-blue-500 transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>

        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {Math.round((currentStep / steps.length) * 100)}%
        </span>
      </div>

      {/* Steps list */}
      <div className="overflow-y-auto max-h-[calc(80vh-64px)] scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="p-4 space-y-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start p-3 rounded-lg transition-all",
                currentStep === index + 1 && "bg-blue-50 dark:bg-blue-900/20",
                currentStep > index + 1 && "opacity-80"
              )}
            >
              {/* Step number or check */}
              <div
                className={cn(
                  "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors",
                  currentStep > index + 1
                    ? "bg-green-50 border-green-500 text-green-500 dark:bg-green-900/30"
                    : currentStep === index + 1
                    ? "bg-blue-50 border-blue-500 text-blue-500 dark:bg-blue-900/30"
                    : "bg-gray-50 border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700"
                )}
              >
                {currentStep > index + 1 ? (
                  <Check size={14} strokeWidth={2.5} />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>

              {/* Step text and optional tab view */}
              <div className="ml-3 flex-1">
                <p
                  className={cn(
                    "font-medium text-sm",
                    currentStep === index + 1
                      ? "text-blue-600 dark:text-blue-400"
                      : currentStep > index + 1
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {step.description}
                </p>

                {/* Render tab names if on step 2 */}
                {currentStep === 2 && index === 1 && tabList.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tabList.map((tab) => (
                      <span
                        key={tab}
                        className={cn(
                          "text-xs px-2 py-1 rounded-full border transition-all",
                          tab === currentTab
                            ? "bg-blue-100 text-blue-600 border-blue-400 dark:bg-blue-800/30 dark:text-blue-300"
                            : "text-gray-500 border-gray-300 dark:text-gray-400 dark:border-gray-600"
                        )}
                      >
                        {tab}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default VerticalStepper;
