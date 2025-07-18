import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Portflection | Build Your Portfolio Effortlessly",
    template: "%s | Portflection",
  },
  description: "Portflection helps developers, designers, and creators build professional portfolios in minutes.",
  keywords: [
    "portfolio builder",
    "online portfolio",
    "developer portfolio",
    "freelancer portfolio",
    "Portflection",
    "build portfolio website",
  ],
  metadataBase: new URL("https://www.portflection.com"),
  openGraph: {
    title: "Portflection | Build Stunning Portfolios",
    description: "Create and manage portfolios with customizable templates and analytics.",
    url: "https://www.portflection.com",
    siteName: "Portflection",
    images: [
      {
        url: "/og-image.png", // put this image in public folder
        width: 1200,
        height: 630,
        alt: "Portflection - Build Your Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portflection | Build Your Portfolio Easily",
    description: "Easily create and manage your portfolio online.",
    images: ["/og-image.png"],
    creator: "@yourTwitterHandle", // optional
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-16x16.png',
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* Fuchsia blurred glow */}
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
       
          {/* <Navbar /> */}
          <main>{children}</main>
          {/* <Footer /> */}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
