import { Button } from "@/components/ui/button";
import { ArrowUp, Heart } from "lucide-react";
import { ColorScheme } from "@/app/types/portfolio";

interface FooterProps {
  name: string;
  theme: ColorScheme;
  showScrollTop: boolean;
  onScrollTop: () => void;
}

export const Footer = ({
  name,
  theme,
  showScrollTop,
  onScrollTop,
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative py-12 px-6"
      style={{
        backgroundColor: theme.muted,
        borderTop: `1px solid ${theme.border}`,
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 md:mb-0">
            <p
              className="text-sm md:text-base"
              style={{ color: theme.bodySecondary }}
            >
              &copy; {currentYear} {name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-sm hover:underline transition-colors"
              style={{ color: theme.bodySecondary }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm hover:underline transition-colors"
              style={{ color: theme.bodySecondary }}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm hover:underline transition-colors"
              style={{ color: theme.bodySecondary }}
            >
              Contact
            </a>
          </div>
        </div>

        <div
          className="mt-8 pt-8 border-t text-center"
          style={{ borderColor: theme.border }}
        >
          <p className="text-sm" style={{ color: theme.bodySecondary }}>
            Made with <Heart className="inline w-4 h-4 text-red-500" /> using
            Next.js and Tailwind CSS
          </p>
        </div>
      </div>

      {showScrollTop && (
        <Button
          onClick={onScrollTop}
          className="fixed bottom-8 right-8 rounded-full w-12 h-12 shadow-lg transition-all hover:scale-110"
          size="sm"
          aria-label="Scroll to top"
          style={{
            backgroundColor: theme.accent,
            color: theme.primary,
          }}
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </footer>
  );
};
