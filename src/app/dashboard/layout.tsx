import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Keep it Client) */}
      <SidebarProvider>
        <AppSidebar className="" />
        <SidebarInset className="flex-1">{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
}
