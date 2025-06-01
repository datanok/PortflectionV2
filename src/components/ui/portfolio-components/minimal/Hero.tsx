import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

interface HeroProps {
  name: string;
  title: string;
  about: string;
  email?: string;
  githubLink?: string;
  linkedinLink?: string;
  personalWebsite?: string;
  location?: string;
  profileImage?: string;
  portfolioType?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  theme: {
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    light: string;
    dark: string;
    body: string;
    card: string;
    fontBody: string;
    fontHeading: string;
  };
}

export const Hero = ({
  name = "Alex Johnson",
  title = "Senior Product Designer",
  about = "I design digital products that combine user-centered thinking with business strategy. Currently leading design at a fintech startup, previously at Google and Airbnb.",
  email = "alex@example.com",
  location = "San Francisco, CA",
  profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  socials = {
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  theme
}: HeroProps) => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-12 sm:py-16"
      style={{
        backgroundColor: theme.background,
        fontFamily: theme.fontBody,
      }}
    >
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 w-full">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border"
              style={{
                backgroundColor: theme.light,
                borderColor: theme.primary,
                color: theme.dark
              }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Open to opportunities
            </div>

            <div className="space-y-4">
              <h1
                className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight"
                style={{
                  color: theme.body,
                  fontFamily: theme.fontHeading
                }}
              >
                Hi, I'm &nbsp; <span style={{ color: theme.primary }}>{name.split(" ")[0]}</span>
              </h1>
              <h2
                className="text-xl sm:text-2xl font-light"
                style={{ color: theme.dark }}
              >
                {title}
              </h2>
            </div>

            {location && (
              <div className="flex items-center gap-2 text-lg" style={{ color: theme.dark }}>
                <MapPin className="w-5 h-5" style={{ color: theme.primary }} />
                {location}
              </div>
            )}

            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: theme.body }}
            >
              {about}
            </p>

            {/* Socials */}
            <div className="flex gap-4 pt-2">
              {[
                { icon: Github, href: socials?.github, label: "GitHub" },
                { icon: Linkedin, href: socials?.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${email}`, label: "Email" },
              ]
                .filter(link => link.href)
                .map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                    style={{
                      backgroundColor: theme.light,
                      border: `2px solid ${theme.card}`
                    }}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" style={{ color: theme.body }} />
                  </a>
                ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-3xl opacity-20 blur-2xl"
                style={{ backgroundColor: theme.primary }}
              />
              <div className="relative w-full max-w-xs mx-auto lg:mx-0">
                <div 
                  className="aspect-square rounded-xl overflow-hidden shadow-lg"
                  style={{
                    border: `3px solid ${theme.card}`,
                    boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
                  }}
                >
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-30" />
              </div>

              {/* Floating elements */}
              <div
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full blur-sm animate-pulse"
                style={{ backgroundColor: theme.secondary }}
              />
              <div
                className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full blur-sm animate-pulse delay-1000"
                style={{ backgroundColor: theme.accent }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
