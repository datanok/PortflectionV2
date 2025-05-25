import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { ColorScheme } from '@/components/portfolioForms/types/ColorSchemes';

interface NavbarProps {
  name: string;
  activeSection: string;
  onNavClick: (section: string) => void;
  theme: ColorScheme;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export const Navbar = ({ 
  name,
  activeSection, 
  onNavClick, 
  theme, 
  onThemeToggle, 
  isDarkMode 
}: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-opacity-80' : ''
      }`}
      style={{
        backgroundColor: scrolled ? theme.glass : 'transparent',
        borderBottom: `1px solid ${scrolled ? theme.border : 'transparent'}`,
      }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a 
            href="#" 
            className="text-2xl font-bold tracking-tight"
            style={{ color: theme.body }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {name?.split(' ').map((n, i) => (
              <span key={i} className={i === 1 ? 'text-accent' : ''}>
                {n}
              </span>
            ))}
          </a>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === item.id ? 'bg-opacity-10' : 'hover:bg-opacity-5'
                }`}
                style={{
                  color: activeSection === item.id ? theme.accent : theme.body,
                  backgroundColor: activeSection === item.id ? `${theme.accent}20` : 'transparent',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
            
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors ml-2"
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              style={{ color: theme.body }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <a
              href="#contact"
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                backgroundColor: theme.accent,
                color: theme.primary,
              }}
              onClick={(e) => {
                e.preventDefault();
                onNavClick('contact');
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-full mr-2"
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              style={{ color: theme.body }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md focus:outline-none"
              aria-label="Toggle menu"
              style={{ color: theme.body }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div 
          className="md:hidden absolute top-20 left-0 right-0 py-4 px-6 transition-all duration-300"
          style={{
            backgroundColor: theme.card,
            borderTop: `1px solid ${theme.border}`,
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  activeSection === item.id ? 'bg-opacity-10' : 'hover:bg-opacity-5'
                }`}
                style={{
                  color: activeSection === item.id ? theme.accent : theme.body,
                  backgroundColor: activeSection === item.id ? `${theme.accent}20` : 'transparent',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(item.id);
                  setIsMenuOpen(false);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-4 px-4 py-3 rounded-md text-base font-medium text-center transition-colors"
              style={{
                backgroundColor: theme.accent,
                color: theme.primary,
              }}
              onClick={(e) => {
                e.preventDefault();
                onNavClick('contact');
                setIsMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
