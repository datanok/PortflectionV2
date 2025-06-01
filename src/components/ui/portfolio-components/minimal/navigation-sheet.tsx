import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavMenu } from "./nav-menu";
import { ColorScheme } from '@/components/portfolioForms/types/ColorSchemes';

interface NavigationSheetProps {
  activeSection: string;
  onNavClick: (section: string) => void;
  theme: ColorScheme;
}

export const NavigationSheet = ({
  activeSection,
  onNavClick,
  theme
}: NavigationSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          borderColor: theme.border,
          color: theme.body,
          backgroundColor: 'transparent'
        }}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 p-2 rounded-lg shadow-lg z-50"
          style={{
            backgroundColor: theme.card,
            border: `1px solid ${theme.border}`,
          }}
        >
          <NavMenu 
            activeSection={activeSection}
            onNavClick={(section) => {
              onNavClick(section);
              setIsOpen(false);
            }}
            theme={theme}
            className="flex flex-col space-y-1"
          />
        </div>
      )}
    </div>
  );
};
