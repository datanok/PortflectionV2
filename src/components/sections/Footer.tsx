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
      className="w-full pt-4"
      style={{
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderTopColor: "var(--border)",
        backgroundColor: "var(--background)",
      }}
    >
      <div className="max-w-container mx-auto pt-6">
        <Footer>
          {/* Logo + Social Buttons on same line */}

          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
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
            <div className="flex gap-3">
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

          {/* Footer Bottom Section */}
          <FooterBottom className="flex flex-col items-center gap-2 text-center text-sm mt-6">
            <div style={{ color: "var(--muted-foreground)" }}>{copyright}</div>
            <div style={{ color: "var(--muted-foreground)" }}>
              Made with <span style={{ color: "var(--brand)" }}>❤️</span> by{" "}
              <a href="https://github.com/datanok" target="_blank" rel="noopener noreferrer" className="text-brand font-bold transition-colors hover:scale-105">
                Tanmay
              </a>
            </div>
            <div className="flex items-center gap-4">
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
              {showModeToggle && <ModeToggle />}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
