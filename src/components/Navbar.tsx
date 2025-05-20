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
    <header className="sticky top-0 z-50 w-full px-4 pb-4 -mb-4">
      <div className="absolute left-0 w-full h-24 bg-background/15 backdrop-blur-lg"></div>
      <div className="relative mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <NavbarComponent className="py-2">
          <NavbarLeft>
            <Logo />
          </NavbarLeft>
          <NavbarRight className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link, index) => (
                (!link.authRequired || (isHydrated && data)) && (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {link.text}
                  </Link>
                )
              ))}
              {isHydrated && <AuthButtons />}
            </div>

            <ThemeToggle />

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
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

              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm px-6 py-6 flex flex-col">
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

                {/* Sheet Title (Optional) */}
                <SheetTitle className="text-lg">Menu</SheetTitle>

                {/* Navigation */}
                <nav className="mt-6 flex flex-col gap-4 text-base font-medium">
                  {navLinks.map((link, index) => (
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
                  ))}

                  {isHydrated && (
                    <div className="pt-4 mt-2 border-t">
                      <AuthButtons />
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>

          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}