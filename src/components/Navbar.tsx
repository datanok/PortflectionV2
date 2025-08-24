"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "@/components/ui/navbar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "motion/react";
import Image from "next/image";
import { authClient } from "../../auth-client";

const AuthButtons = dynamic(() => import("./auth-buttons"), { ssr: false });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { data, isPending } = authClient.useSession();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const name = "Portflection";
  const homeUrl = "/";
  const navLinks = [
    // { text: "Templates", href: "/templates" },
    // { text: "Pricing", href: "/pricing" },
    { text: "Dashboard", href: "/dashboard", authRequired: true },
  ];

  const Logo = () => (
    <Link
      href={homeUrl}
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
        {name}
      </motion.span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-md px-4 pb-4 -mb-4">
      <div className="absolute inset-0 bg-background/15 backdrop-blur-lg z-[-1]" />

      <div className="relative mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <NavbarComponent className="py-3 flex items-center justify-between">
          {/* Left Side: Logo */}
          <NavbarLeft>
            <Logo />
          </NavbarLeft>

          {/* Right Side: Navigation */}
          <NavbarRight className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map(
                (link, index) =>
                  (!link.authRequired || (isHydrated && data)) && (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      {link.text}
                    </Link>
                  )
              )}
              {isHydrated && <AuthButtons />}
            </nav>

            {/* Theme Toggle - Hidden on mobile */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Mobile Navigation - Show on mobile */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {isOpen ? (
                      <X className="size-5" />
                    ) : (
                      <Menu className="size-5" />
                    )}
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-full max-w-xs sm:max-w-sm px-6 py-6 flex flex-col"
                >
                  {/* Logo */}
                  <div className="mb-6">
                    <Link
                      href={homeUrl}
                      className="flex items-center gap-2 text-sm font-normal text-black dark:text-white"
                      onClick={() => setIsOpen(false)}
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
                        {name}
                      </motion.span>
                    </Link>
                  </div>

                  <SheetTitle className="text-lg">Menu</SheetTitle>

                  <nav className="mt-6 flex flex-col gap-4 text-base font-medium">
                    {navLinks.map(
                      (link, index) =>
                        (!link.authRequired || (isHydrated && data)) && (
                          <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-foreground transition-colors py-2"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.text}
                          </Link>
                        )
                    )}

                    {isHydrated && (
                      <div className="pt-4 mt-2 border-t">
                        <AuthButtons />
                      </div>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
