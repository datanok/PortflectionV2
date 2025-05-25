import { memo } from "react";
import SocialIcon from "@/components/ui/portfolio-components/classic/SocialIcons";

interface FooterProps {
  name: string;
  socials: Record<string, string>;
  theme: {
    dark?: string;
    light?: string;
    fontBody?: string;
    accent?: string;
    primary?: string;
    background?: string;
    body?: string;
    muted?: string;
  };
}

const MemoizedSocialIcon = memo(SocialIcon);

const Footer = memo(({ name, socials, theme }: FooterProps) => (
  <footer
    className="py-10 px-6 border-t"
    style={{
      backgroundColor: theme?.dark || "#111827",
      color: theme?.light || "#f9fafb",
      fontFamily: theme?.fontBody || "Lato",
      borderColor: theme?.accent || "#374151"
    }}
  >
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Branding */}
      <div className="space-y-2 text-center md:text-left">
        <h2 className="text-xl font-semibold tracking-tight">Portflection</h2>
        <p className="text-sm opacity-70">
          Crafted with purpose. Built to showcase you.
        </p>
        <p className="text-xs opacity-50 mt-1">
          © {new Date().getFullYear()} by {name || 'Portfolio Owner'}
        </p>
      </div>

      {/* Center: Socials */}
      {socials && Object.keys(socials).length > 0 && (
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-sm font-medium mb-2">Connect</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(socials).map(([platform, url]) => (
              <MemoizedSocialIcon 
                key={platform} 
                type={platform} 
                url={url} 
                theme={{
                  primary: theme.primary,
                  background: theme.background,
                  accent: theme.accent,
                  body: theme.body,
                  fontBody: theme.fontBody
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Right: CTA or Credit */}
      <div className="text-center md:text-right space-y-2">
        <p className="text-sm opacity-70">
          Built with <span style={{ color: theme?.primary || "#4F46E5" }}>Portflection</span>
        </p>
        <a
          href="https://portflection.com"
          className="inline-block text-xs underline hover:opacity-80 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Portflection →
        </a>
      </div>
    </div>
  </footer>
));
Footer.displayName = 'Footer';

export default Footer;
