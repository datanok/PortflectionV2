import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Portflection",
  description: "Build and manage your portfolios with ease.",
};
type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="-z-10 absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            {/* <Navbar /> */}
          <main>{children}</main>
            {/* <Footer /> */}
            <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
