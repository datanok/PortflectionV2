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
  Lock,
  Bell,
  Plug,
  CreditCard,
  Shield,
  Globe,
  Download,
  HelpCircle,
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "../../auth-client";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
];
const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Portfolios",
    url: "/dashboard/portfolios",
    icon: Folder,
    items: [
      { title: "My Portfolios", url: "/dashboard/my-portfolios" },
      { title: "Create New", url: "/dashboard/portfolios/new" },
    ],
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export const Logo = () => {
  return (
    <Link
    href="#"
    className="relative z-20 flex items-center gap-2 py-1 text-sm font-normal text-black dark:text-white"
  >
    <Image
      src="/assets/logo.png"
      alt="Portflection Logo"
      width={24}
      height={24}
      className="object-contain"
    />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-semibold leading-none"
    >
      Portflection
    </motion.span>
  </Link>
  
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image
      src="/assets/logo.png"
      alt="Portflection Logo"
      width={24}
      height={24}
      className="object-contain"
    />
   </Link>
  );
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isPending } = authClient.useSession();
  const { open } = useSidebar();

  // Default user fallback
  const user = data?.user || {
    name: "Guest User",
    email: "guest@example.com",
    image: "/avatars/default.png",
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader>{open ? <Logo /> : <LogoIcon />}</SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter className="flex flex-col gap-2 p-2">
        {/* Dark Mode Toggle */}
        <ThemeToggle />
        {isPending ? (
          <Skeleton className="h-10 w-full bg-gray-300 rounded" />
        ) : (
          <NavUser user={user} />
        )}
        {/* Logout Button */}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
