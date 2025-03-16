// components/ClientWrapper.tsx
"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      {/* <Navbar /> */}
      <Toaster />
      <div className="min-h-screen flex flex-col">{children}</div>
    </ThemeProvider>
  );
}
