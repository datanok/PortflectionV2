import { AppSidebar } from "@/components/app-sidebar";
import DynamicBreadcrumb from "@/components/DynamicBreadCrumb";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar className="" />
        <SidebarInset className="flex-1 p-3 sm:p-4 md:p-6 mx-2 sm:mx-3 md:mx-4 my-2 sm:my-3">
          <div className="sticky top-2 z-10 w-full">
            <DynamicBreadcrumb />
          </div>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
