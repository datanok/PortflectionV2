import { AppSidebar } from "@/components/app-sidebar";
import DynamicBreadcrumb from "@/components/DynamicBreadCrumb";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen ">
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-20 ">
            <div className="flex items-center h-16 px-6">
              <SidebarTrigger className="mr-4" />
              <DynamicBreadcrumb />
            </div>
          </header>
          <main className="overflow-auto px-2">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  </div>
  );
}