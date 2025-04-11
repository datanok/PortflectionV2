import { AppSidebar } from "@/components/app-sidebar";
import DynamicBreadcrumb from "@/components/DynamicBreadCrumb";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SidebarProvider>
        <div className="flex h-screen">
          <AppSidebar />
          <SidebarInset className="flex flex-col">
            <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center h-16 px-4 md:px-6">
                <SidebarTrigger className="mr-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200" />
                <DynamicBreadcrumb />
              </div>
            </header>
            <main className="overflow-auto">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}