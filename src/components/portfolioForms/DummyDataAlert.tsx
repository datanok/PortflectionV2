"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

interface DummyDataAlertProps {
  onConfirm: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DummyDataAlert: React.FC<DummyDataAlertProps> = ({
  onConfirm,
  open,
  setOpen,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-md mx-auto w-11/12 p-4 sm:p-6">
        <AlertDialogHeader className="space-y-2">
          <AlertDialogTitle className="flex items-center gap-2 text-amber-400 text-lg sm:text-xl">
            <AlertTriangle size={18} />
            <span>Warning: Premium Lazy-Person Feature</span>
          </AlertDialogTitle>
          <AlertDialogDescription asChild className="pt-1">
  <div className="space-y-4 text-sm sm:text-base">
    <p>
      This feature will replace your current portfolio content with
      professionally designed templates and placeholder text.
    </p>

    <div className="rounded-md bg-amber-50 p-3 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 space-y-1">
      <p className="font-semibold">
        ⚠️ Your current data will be ruthlessly overwritten!
      </p>
      <p className="text-xs leading-relaxed">
        Any masterpieces you've typed will disappear faster than your motivation on a Monday morning.
      </p>
    </div>

    <p className="text-xs sm:text-sm italic text-muted-foreground">
      For the low price of “whatever I feel like charging today,” you can enjoy this premium feature.
      Feel free to GPay me whenever guilt kicks in.
    </p>
  </div>
</AlertDialogDescription>

        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 mt-4 sm:justify-between">
          <AlertDialogCancel
            onClick={() => setOpen(false)}
            className="mt-0 w-full sm:w-auto"
          >
            No thanks, I'll do actual work
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            className="bg-amber-500 hover:bg-amber-400 w-full sm:w-auto"
          >
            Yes, I'm feeling lazy!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DummyDataAlert;
