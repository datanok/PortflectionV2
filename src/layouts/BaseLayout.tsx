import { LayoutProps } from "@/types/layout";
import { ReactNode } from "react";

interface BaseLayoutProps extends LayoutProps {
  children: ReactNode;
  className?: string;
}

export function BaseLayout({ children, className = "" }: BaseLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {children}
    </div>
  );
}
