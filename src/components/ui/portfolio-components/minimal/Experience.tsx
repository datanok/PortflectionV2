import { Building2, Calendar, MapPin, ArrowUpRight } from "lucide-react";

interface Theme {
  primary: string;
  secondary: string;
  dark: string;
  light: string;
  background: string;
  card: string;
  muted: string;
  accent: string;
  fontHeading: string;
  fontBody: string;
  body: string;
}

interface ExperienceItemProps {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  location?: string;
  companyUrl?: string;
  theme: Theme;
}

const ExperienceItem = ({
  company,
  position,
  startDate,
  endDate,
  current,
  description,
  achievements,
  location,
  companyUrl,
  theme
}: ExperienceItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const period = `${formatDate(startDate)} - ${current ? 'Present' : (endDate ? formatDate(endDate) : 'Present')}`;

  return (
    <div className="relative   pl-8 not-last:pb-12">
      {/* Timeline dot */}
      <div 
        className="absolute left-0 top-1 w-3 h-3 rounded-full border-2" 
        style={{
          backgroundColor: theme.primary,
          borderColor: theme.background || '#ffffff'
        }} 
      />
      
      {/* Timeline line */}
      <div 
        className="absolute left-[5px] top-4 bottom-0 w-px group-last:hidden" 
        style={{ backgroundColor: theme.accent || '#e0e7ff' }}
      />

      {/* Content */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold" style={{ color: theme.body || '#1a202c' }}>{company}</h3>
          {companyUrl && (
            <a 
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
          style={{ color: theme.primary }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {current && (
            <span 
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${theme.accent}33`,
                color: theme.dark
              }}
            >
              Current
            </span>
          )}
        </div>
        
        <h4 className="text-base font-medium" style={{ color: theme.primary }}>{position}</h4>
        
        <div className="flex items-center gap-4 text-sm" style={{ color: theme.dark }}>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{period}</span>
          </div>
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{location}</span>
            </div>
          )}
        </div>

        <p className="pt-1" style={{ color: theme.body }}>
          {description}
        </p>

        {achievements && achievements.length > 0 && (
          <ul className="space-y-1.5 pt-1">
            {achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span style={{ color: theme.primary }}>•</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

interface ExperienceProps {
  experiences?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    achievements: string[];
    location?: string;
    companyUrl?: string;
  }>;
  theme: Theme;
}

const Experience = ({ 
  experiences = [],
  theme 
}: ExperienceProps) => {
  if (!experiences.length) return null;
  
  return (
    <section id="experience" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: theme.body }}
            >
              Experience
            </h2>
            <p 
              className="max-w-2xl mx-auto"
              style={{ color: theme.dark }}
            >
              My professional journey and key contributions
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <ExperienceItem 
                key={index} 
                {...experience} 
                theme={theme}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;