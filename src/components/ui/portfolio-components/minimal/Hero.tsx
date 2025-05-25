import { Button } from '@/components/ui/button';
import { Download, Mail, Github, Linkedin } from 'lucide-react';
import { ColorScheme } from '@/components/portfolioForms/types/ColorSchemes';

interface HeroProps {
  name: string;
  title: string;
  about: string;
  theme: ColorScheme;
  onContactClick: () => void;
}

export const Hero = ({
  name,
  title,
  about,
  theme,
  onContactClick
}: HeroProps) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center space-y-12">
          <div className="space-y-8">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm"
              style={{
                backgroundColor: theme.muted,
                borderColor: theme.border,
                color: theme.bodySecondary
              }}
            >
              <div 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ backgroundColor: theme.accent }} 
              />
              Available for new projects
            </div>
            
            <h1 
              className="text-6xl md:text-8xl font-bold tracking-tight"
              style={{ color: theme.body }}
            >
              {name}
              <span 
                className="block text-4xl md:text-6xl font-light mt-4" 
                style={{ color: theme.accent }}
              >
                {title}
              </span>
            </h1>
          </div>
          
          <p 
            className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-light"
            style={{ color: theme.bodySecondary }}
          >
            {about}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <Button 
              size="lg"
              className="px-8 py-4 text-base font-medium rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
              style={{ 
                backgroundColor: theme.secondary, 
                color: theme.primary 
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onContactClick}
              className="px-8 py-4 text-base font-medium rounded-full hover:scale-105 transition-transform duration-200"
              style={{ 
                borderColor: theme.border, 
                backgroundColor: theme.muted,
                color: theme.body
              }}
            >
              <Mail className="w-5 h-5 mr-2" />
              Get in Touch
            </Button>
          </div>

          <div className="flex justify-center gap-6 pt-8">
            {[
              { icon: Github, label: 'GitHub', href: '#' },
              { icon: Linkedin, label: 'LinkedIn', href: '#' },
              { icon: Mail, label: 'Email', href: '#' }
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="p-3 rounded-full hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: theme.muted }}
                aria-label={label}
              >
                <Icon className="w-6 h-6" style={{ color: theme.body }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};