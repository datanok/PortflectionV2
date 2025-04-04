import React, { useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Keep your flattenErrors and formatErrorPath functions...

interface ErrorAlertDialogProps {
  errors: FieldErrors;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ErrorAlertDialog: React.FC<ErrorAlertDialogProps> = ({ 
  errors, 
  open: externalOpen, 
  onOpenChange 
}) => {
  // Use internal state if no external control is provided
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Determine if we're using controlled or uncontrolled mode
  const isControlled = externalOpen !== undefined;
  const isOpen = isControlled ? externalOpen : internalOpen;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };
  
  // Helper function to flatten nested errors
const flattenErrors = (
    errors: FieldErrors,
    parentKey: string = ''
  ): { path: string; message: string }[] => {
    let result: { path: string; message: string }[] = [];
  
    Object.entries(errors).forEach(([key, value]) => {
      const currentPath = parentKey ? `${parentKey}.${key}` : key;
  
      if (value && typeof value === 'object') {
        // Handle array errors (like education array)
        if (Array.isArray(value)) {
          value.forEach((arrayItem, index) => {
            if (arrayItem && typeof arrayItem === 'object') {
              const arrayErrors = flattenErrors(arrayItem, `${currentPath}[${index}]`);
              result = [...result, ...arrayErrors];
            }
          });
        } 
        // Handle message property (leaf error node)
        else if ('message' in value && typeof value.message === 'string') {
          result.push({
            path: currentPath,
            message: value.message
          });
        } 
        // Handle nested object errors
        else {
          const nestedErrors = flattenErrors(value, currentPath);
          result = [...result, ...nestedErrors];
        }
      }
    });
 
  
    return result;
  };
  const flatErrors = flattenErrors(errors);
  const errorCount = flatErrors.length;
  const formatErrorPath = (path: string): string => {
    return path
      .replace(/\[\d+\]/g, '') // Remove array indices
      .split('.')
      .map(segment => 
        segment.charAt(0).toUpperCase() + segment.slice(1)
      )
      .join(' ');
  };
  if (errorCount === 0) {
    return null;
  }

  return (
    <>
      {/* Button to open AlertDialog */}
      <Button 
        variant="destructive" 
        size="sm" 
        className="fixed bottom-4 right-4 shadow-lg gap-2"
        onClick={() => handleOpenChange(true)}
      >
        <AlertCircle size={16} />
        {errorCount} {errorCount === 1 ? 'Error' : 'Errors'}
      </Button>
      
      {/* AlertDialog */}
      <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Form Errors</AlertDialogTitle>
            <Button
              variant="ghost"
              className="absolute top-2 right-2 p-1"
              onClick={() => handleOpenChange(false)}  // Close the dialog
            >
              <X size={16} /> {/* Close Icon */}
            </Button>
          </AlertDialogHeader>
          <ScrollArea className="max-h-[60vh]">
          <div className="p-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4">
              <h3 className="text-red-800 font-medium mb-2">Please fix the following errors:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {flatErrors.map((error, index) => (
                  <li key={index} className="text-red-700">
                    <span className="font-medium">{formatErrorPath(error.path)}:</span> {error.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </ScrollArea>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ErrorAlertDialog;