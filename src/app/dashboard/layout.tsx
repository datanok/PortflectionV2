"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      {/* Sidebar (Always Visible) */}
      <AppSidebar className="pt-18" />

      {/* Page Content */}
      <SidebarInset className="flex-1">{children}</SidebarInset>
    </SidebarProvider>
  );
}
