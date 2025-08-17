import { Button } from "@/components/ui/button";

import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { ColorScheme } from "@/app/types/portfolio";
import { GithubLogo, XLogo } from "./icons";
import { Logo } from "./logo";
interface NavbarProps {
  name: string;
  activeSection: string;
  onNavClick: (section: string) => void;
  theme: ColorScheme;
}

export const Navbar = ({
  name,
  activeSection,
  onNavClick,
  theme,
}: NavbarProps) => {
  return (
    <nav
      className="fixed z-10 top-6 inset-x-4 h-14 bg-background border max-w-screen-md mx-auto rounded-full"
      style={{
        backgroundColor: theme.glass || "hsl(var(--background))",
        borderColor: theme.border || "hsl(var(--border))",
      }}
    >
      <div className="h-full flex items-center justify-between mx-auto px-3">
        <Logo name={name} theme={theme} />

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <NavMenu
            activeSection={activeSection}
            onNavClick={onNavClick}
            theme={theme}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden sm:inline-flex rounded-full shadow-none"
            size="icon"
            style={{
              borderColor: theme.border,
              color: theme.body,
              backgroundColor: "transparent",
            }}
          >
            <XLogo className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full shadow-none"
            size="icon"
            style={{
              borderColor: theme.border,
              color: theme.body,
              backgroundColor: "transparent",
            }}
          >
            <GithubLogo className="h-5 w-5" />
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet
              activeSection={activeSection}
              onNavClick={onNavClick}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
