"use client";

import { AppSidebar } from "@/components/app-sidebar";
import DynamicBreadcrumb from "@/components/DynamicBreadCrumb";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isEditPage = pathname?.includes("/portfolios/edit/");

  return (
    <div className="min-h-screen">
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <SidebarInset className="flex flex-col">
            {!isEditPage && <DashboardHeader />}
            <main className="overflow-auto px-2">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 ">
      <div className="flex items-center h-16 px-6">
        <SidebarTrigger className="mr-4" />
        {<DynamicBreadcrumb />}
      </div>
    </header>
  );
}
