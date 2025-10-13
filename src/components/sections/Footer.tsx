"use client";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Footer, FooterBottom } from "@/components/ui/footer";
import { FaXTwitter } from "react-icons/fa6";

import Image from "next/image";
import PortflectionLogo from "../../../public/assets/logo.png";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterProps {
  name?: string;
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
}

export default function FooterSection({
  name = "Portflection",
  copyright = `© ${new Date().getFullYear()} Portflection. All rights reserved.`,
  policies = [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Service", href: "/terms" },
  ],
  showModeToggle = true,
}: FooterProps) {
  return (
    <footer
      className="w-full blueprint-section p-0"
      style={{
        borderTopWidth: "0px",
        borderTopStyle: "solid",
        borderTopColor: "var(--blueprint-accent)",
        backgroundColor: "var(--background)",
        padding: "0",
      }}
    >
      <Footer className="p-0 border-0">
        {/* Top Row: Logo and Social Media */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Logo Section */}
          <div className=" flex items-center border-t-0">
            <div className="blueprint-corners"></div>
            <Image
              src={PortflectionLogo}
              alt="Portflection Logo"
              width={40}
              height={40}
            />
            <h3
              className="text-xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              {name}
            </h3>
          </div>

          {/* Social Media Icons */}
          <div className=" p-4 flex items-center justify-center md:justify-end gap-4">
            <div className="blueprint-corners"></div>
            <a
              href="https://x.com/tanmay_P_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaXTwitter
                className="w-5 h-5"
                style={{
                  color: "var(--muted-foreground)",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--brand)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              />
            </a>
            <a
              href="https://github.com/datanok"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <GitHubLogoIcon
                className="w-5 h-5"
                style={{
                  color: "var(--muted-foreground)",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--brand)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <DiscordLogoIcon
                className="w-5 h-5"
                style={{
                  color: "var(--muted-foreground)",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--brand)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              />
            </a>
          </div>
        </div>

        <FooterBottom className="grid grid-cols-1 md:grid-cols-3 gap-0 p-0 m-0 border-0">
          {/* Copyright */}
          <div className="blueprint-card p-3 text-center md:text-left">
            <div className="blueprint-corners"></div>
            <div
              className="text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              {copyright}
            </div>
          </div>

          {/* Made with Love */}
          <div className="blueprint-card p-3 text-center">
            <div className="blueprint-corners"></div>
            <div
              className="text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              Made with <span style={{ color: "var(--brand)" }}>❤️</span> by{" "}
              <a
                href="https://github.com/datanok"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold transition-colors hover:underline"
                style={{ color: "var(--brand)" }}
              >
                Tanmay
              </a>
            </div>
          </div>

          {/* Policy Links & Mode Toggle */}
          <div className="blueprint-card p-3 flex items-center justify-center md:justify-end gap-4 mode-toggle-container">
            <div className="blueprint-corners"></div>
            {policies.map((policy, index) => (
              <a
                key={index}
                href={policy.href}
                className="text-sm transition-colors hover:underline"
                style={{
                  color: "var(--muted-foreground)",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--brand)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              >
                {policy.text}
              </a>
            ))}
          </div>
        </FooterBottom>
      </Footer>

      <style jsx>{`
        .blueprint-card {
          position: relative;
          border: 2px dashed var(--blueprint-accent);
          border-right: none;
          border-bottom: none;
          transition: all 0.3s ease;
        }

        /* Add right border to last card in row */
        .grid > .blueprint-card:last-child {
          border-right: 2px dashed var(--blueprint-accent);
        }
        .grid > .blueprint-card:last-child {
          border-right: 2px dashed var(--blueprint-accent);
        }

        /* Add bottom border to last row */
        .grid:last-child > .blueprint-card {
          border-bottom: 2px dashed var(--blueprint-accent);
        }

        @media (min-width: 768px) {
          /* For 2-column grid (top row) - add right border to 2nd item */
          .grid.md\\:grid-cols-2 > .blueprint-card:nth-child(2) {
            border-right: 2px dashed var(--blueprint-accent);
          }

          /* For 3-column grid (bottom row) - add right border to 3rd item */
          .grid.md\\:grid-cols-3 > .blueprint-card:nth-child(3) {
            border-right: 2px dashed var(--blueprint-accent);
          }
        }

        .mode-toggle-container :global(.mode-toggle-wrapper button) {
          height: auto !important;
          min-height: auto !important;
          padding: 0.25rem 0.5rem !important;
          font-size: 0.75rem !important;
        }

        /* Corner brackets - Show only on outer corners */

        /* Top Left corner - only on first card in first row */
        .grid:first-child > .blueprint-card:first-child::before {
          content: "";
          position: absolute;
          width: 30px;
          height: 30px;
          top: -2px;
          left: -2px;
          border-top: 2px solid var(--blueprint-accent);
          border-left: 2px solid var(--blueprint-accent);
          pointer-events: none;
          transition: all 0.3s ease;
        }

        /* Top Right corner - only on last card in first row */
        .grid:first-child > .blueprint-card:last-child::after {
          content: "";
          position: absolute;
          width: 30px;
          height: 30px;
          top: -2px;
          right: -2px;
          border-top: 2px solid var(--blueprint-accent);
          border-right: 2px solid var(--blueprint-accent);
          pointer-events: none;
          transition: all 0.3s ease;
        }

        /* Bottom corner brackets container */
        .blueprint-corners {
          position: absolute;
          bottom: -2px;
          left: -2px;
          right: -2px;
          height: 30px;
          pointer-events: none;
          display: none;
        }

        /* Show corners only on last row */
        .grid:last-child .blueprint-corners {
          display: block;
        }

        /* Bottom Left corner - only on first card in last row */
        .grid:last-child
          > .blueprint-card:first-child
          .blueprint-corners::before {
          content: "";
          position: absolute;
          width: 30px;
          height: 30px;
          bottom: 0;
          left: 0;
          border-bottom: 2px solid var(--blueprint-accent);
          border-left: 2px solid var(--blueprint-accent);
          transition: all 0.3s ease;
        }

        /* Bottom Right corner - only on last card in last row */
        .grid:last-child
          > .blueprint-card:last-child
          .blueprint-corners::after {
          content: "";
          position: absolute;
          width: 30px;
          height: 30px;
          bottom: 0;
          right: 0;
          border-bottom: 2px solid var(--blueprint-accent);
          border-right: 2px solid var(--blueprint-accent);
          transition: all 0.3s ease;
        }

        /* Hover effects on outer corners only */

        .grid:last-child
          > .blueprint-card:first-child:hover
          .blueprint-corners::before,
        .grid:last-child
          > .blueprint-card:last-child:hover
          .blueprint-corners::after {
          width: 35px;
          height: 35px;
          border-color: rgba(50, 130, 200, 0.7);
        }
      `}</style>
    </footer>
  );
}
