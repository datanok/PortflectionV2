"use client";

import * as React from "react";
import {
  BarChart3,
  FileText,
  Folder,
  LayoutDashboard,
  Layers,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "../../auth-client";
import { ThemeToggle } from "./theme-toggle";

// Sample navigation items
const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Portfolios",
    url: "/portfolios",
    icon: Folder,
    items: [
      { title: "My Portfolios", url: "/portfolios/my" },
      { title: "Shared Portfolios", url: "/portfolios/shared" },
      { title: "Create New", url: "/portfolios/new" },
    ],
  },
  {
    title: "Templates",
    url: "/templates",
    icon: FileText,
    items: [
      { title: "Browse Templates", url: "/templates" },
      { title: "Create Template", url: "/templates/new" },
    ],
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    items: [
      { title: "Performance", url: "/analytics/performance" },
      { title: "Trends", url: "/analytics/trends" },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    items: [
      { title: "Account", url: "/settings/account" },
      { title: "Billing", url: "/settings/billing" },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isPending } = authClient.useSession();

  // Default user fallback
  const user = data?.user || {
    name: "Guest User",
    email: "guest@example.com",
    image: "/avatars/default.png",
  };

  // Logout function
  const handleLogout = async () => {
    await authClient.logout();
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {isPending ? (
          <Skeleton className="h-10 w-full bg-gray-300 rounded" />
        ) : (
          <NavUser user={user} />
        )}
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter className="flex flex-col gap-2 p-2">
        {/* Dark Mode Toggle */}
        <ThemeToggle />

        {/* Logout Button */}
        <Button
          variant="destructive"
          className="flex items-center justify-between w-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
