"use client";

import { useState } from "react";
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
const AuthButtons = dynamic(() => import("./auth-buttons"), { ssr: false });

interface NavbarLink {
  text: string;
  href: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const name = "Portflection";
  const homeUrl = "/";
  const mobileLinks = [
    { text: "Templates", href: "/templates" },
    { text: "Pricing", href: "/pricing" },
    { text: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          <NavbarLeft>
            <Link
              href={homeUrl}
              className="flex items-center gap-2 text-2xl font-bold"
            >
              {name}
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/templates"
                className="hover:text-red-500 dark:hover:text-pink-400"
              >
                Templates
              </Link>
              <Link
                href="/pricing"
                className="hover:text-red-500 dark:hover:text-pink-400"
              >
                Pricing
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-red-500 dark:hover:text-pink-400"
              >
                Dashboard
              </Link>
            </div>
          </NavbarLeft>
          <NavbarRight>
            <div className="hidden md:block">
              <AuthButtons />
            </div>
            <ThemeToggle />
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
              <SheetContent side="right">
                <SheetTitle>Hello</SheetTitle>
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href={homeUrl}
                    className="flex items-center gap-2 text-xl font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{name}</span>
                  </Link>
                  {mobileLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.text}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <AuthButtons />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
