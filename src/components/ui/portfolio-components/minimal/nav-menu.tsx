import { ColorScheme } from "@/app/types/portfolio";

interface NavMenuProps {
  activeSection: string;
  onNavClick: (section: string) => void;
  theme: ColorScheme;
  className?: string;
}

export const NavMenu = ({
  activeSection,
  onNavClick,
  theme,
  className,
}: NavMenuProps) => {
  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className={`flex items-center space-x-1 ${className || ""}`}>
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeSection === item.id ? "bg-opacity-10" : "hover:bg-opacity-5"
          }`}
          style={{
            color: activeSection === item.id ? theme.accent : theme.body,
            backgroundColor:
              activeSection === item.id ? `${theme.accent}20` : "transparent",
          }}
          onClick={(e) => {
            e.preventDefault();
            onNavClick(item.id);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};
