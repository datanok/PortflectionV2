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
    <header className="max-w-[90%] lg:max-w-[85%] mx-auto fixed top-0 left-0 right-0 z-50">
      {/* Blueprint Container */}
      <div className="relative bg-background/60 backdrop-blur-lg shadow-lg">
        <NavbarComponent className="p-0">
          {/* Desktop Layout */}
          <div className="w-full hidden md:grid md:grid-cols-3 blueprint-navbar">
            {/* Left: Logo */}
            <div className="blueprint-card p-3 flex items-center">
              <div className="blueprint-corners"></div>
              <Logo />
            </div>

            <div className="blueprint-card p-3 flex items-center justify-center gap-6">
              <div className="blueprint-corners"></div>
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
            </div>

            <div className="blueprint-card p-3 flex items-center justify-end gap-4">
              <div className="blueprint-corners"></div>
              {isHydrated && <AuthButtons />}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden grid grid-cols-2 blueprint-navbar w-full">
            {/* Left: Logo */}
            <div className="blueprint-card p-3 flex items-center">
              <div className="blueprint-corners"></div>
              <Logo />
            </div>

            {/* Right: Mobile Menu */}
            <div className="blueprint-card p-3 flex items-center justify-end">
              <div className="blueprint-corners"></div>
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
                      <div className="pt-4 mt-2 border-t border-dashed">
                        <AuthButtons />
                      </div>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </NavbarComponent>
      </div>
      <style jsx>{`
        .blueprint-navbar {
          position: relative;
          width: 100%;
        }

        .blueprint-navbar :global(.blueprint-card) {
          position: relative;
          border: 2px dashed var(--blueprint-accent);
          border-right: none;
          transition: all 0.3s ease;
        }

        /* Add right border to last card */
        .blueprint-navbar :global(.blueprint-card:last-child) {
          border-right: 2px dashed var(--blueprint-accent);
        }

        /* Corner brackets - only on outer corners */

        /* Top Left corner - first card */
        .blueprint-navbar :global(.blueprint-card:first-child::before) {
          content: "";
          position: absolute;
          width: 25px;
          height: 25px;
          top: -2px;
          left: -2px;
          border-top: 2px solid var(--blueprint-accent);
          border-left: 2px solid var(--blueprint-accent);
          pointer-events: none;
        }

        /* Top Right corner - last card */
        .blueprint-navbar :global(.blueprint-card:last-child::after) {
          content: "";
          position: absolute;
          width: 25px;
          height: 25px;
          top: -2px;
          right: -2px;
          border-top: 2px solid var(--blueprint-accent);
          border-right: 2px solid var(--blueprint-accent);
          pointer-events: none;
        }

        /* Bottom corner brackets */
        .blueprint-navbar :global(.blueprint-corners) {
          position: absolute;
          bottom: -2px;
          left: -2px;
          right: -2px;
          height: 25px;
          pointer-events: none;
        }

        /* Bottom Left corner - first card */
        .blueprint-navbar
          :global(.blueprint-card:first-child .blueprint-corners::before) {
          content: "";
          position: absolute;
          width: 25px;
          height: 25px;
          bottom: 0;
          left: 0;
          border-bottom: 2px solid var(--blueprint-accent);
          border-left: 2px solid var(--blueprint-accent);
        }

        /* Bottom Right corner - last card */
        .blueprint-navbar
          :global(.blueprint-card:last-child .blueprint-corners::after) {
          content: "";
          position: absolute;
          width: 25px;
          height: 25px;
          bottom: 0;
          right: 0;
          border-bottom: 2px solid var(--blueprint-accent);
          border-right: 2px solid var(--blueprint-accent);
        }
      `}</style>
    </header>
  );
}
