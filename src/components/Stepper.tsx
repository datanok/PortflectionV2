import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

const VerticalStepper = ({
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
}) => {
  return (
    <Card className="md:sticky md:top-24 md:self-start w-full md:w-72 p-4">
      <div className="flex flex-col md:block overflow-x-auto pb-4 md:pb-0">
        <div className="flex md:flex-col gap-4 md:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-1 md:flex-none">
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                {/* Step indicator */}
                <div className="flex items-center justify-center relative">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                      currentStep > index + 1
                        ? "bg-green-500/10 border-green-500 text-green-500"
                        : currentStep === index + 1
                        ? "bg-blue-500/10 border-blue-500 text-blue-500"
                        : "bg-muted border-border text-muted-foreground"
                    )}
                  >
                    {currentStep > index + 1 ? (
                      <Check size={16} />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "absolute w-full h-0.5 left-10 md:h-8 md:w-0.5 md:top-8 md:left-1/2 md:-translate-x-1/2 transition-all duration-300",
                        currentStep > index + 1 ? "bg-green-500" : "bg-border"
                      )}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">
                    {step.title}
                  </p>
                  <p className="hidden md:block text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default VerticalStepper;
