import { useState, useEffect } from 'react';
import SocialIcon from './SocialIcons';
import { FiMail, FiMapPin } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa6';

interface HeroSectionProps {
    name: string;
    title: string;
    about: string;
    email: string;
    githubLink: string;
    location: string;
    profileImage: string;
    socials: {
      linkedin?: string;
      twitter?: string;
      instagram?: string;
      website?: string;
    };
    theme: {
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
    };
  }
  const HeroSection = ({
    name,
    title,
    about,
    email,
    githubLink,
    location,
    profileImage,
    socials,
    theme,
  }: HeroSectionProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Animation on mount
    setTimeout(() => setAnimateIn(true), 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <section
      className={`relative py-16 md:py-24 overflow-hidden ${scrolled ? 'shadow-sm' : ''}`}
      style={{
        backgroundColor: theme.background,
        fontFamily: theme.fontBody
      }}
    >
      {/* Background gradient effect */}
      <div className="absolute top-0 left-0 right-0 h-2" style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})` }} />
      
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full" style={{ background: theme.primary }} />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full" style={{ background: theme.secondary }} />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-12 items-center transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Profile Image with animations */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              {/* Orbital accent circle */}
              <div 
                className="absolute inset-0 rounded-full animate-pulse"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.primary}50, ${theme.secondary}50)`,
                  transform: 'scale(1.1)'
                }}
              />
              
              {/* Image container */}
              <div className="relative group">
                <div 
                  className="absolute inset-0 rounded-full transition-all duration-300 group-hover:scale-105 group-hover:blur-sm" 
                  style={{ 
                    background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
                  }}
                />
                
                <div 
                  className="relative rounded-full overflow-hidden border-4 p-1 bg-white transform transition-transform duration-500 hover:rotate-6"
                  style={{ borderColor: theme.accent, width: '250px', height: '250px' }}
                >
                  <img 
                    src={profileImage} 
                    alt={name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              {/* Achievement badges/floating elements */}
              <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="rounded-full p-1" style={{ background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})` }}>
                  <span className="flex items-center justify-center bg-white rounded-full w-8 h-8">
                    <span className="text-lg" style={{ color: theme.primary }}>⭐</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="lg:col-span-3 order-2 lg:order-1 text-center lg:text-left">
            <div className="space-y-6">
              <div>
                <h3 
                  className="text-sm uppercase tracking-wider mb-2 font-semibold"
                  style={{ color: theme.primary }}
                >
                  Welcome to my portfolio
                </h3>
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight"
                  style={{ fontFamily: theme.fontHeading, color: theme.dark }}
                >
                  I'm <span style={{ color: theme.primary }}>{name}</span>
                </h1>
                <h2 
                  className="text-xl md:text-2xl lg:text-3xl font-medium mb-4 inline-block relative"
                  style={{ color: theme.secondary }}
                >
                  {title}
                  <div 
                    className="absolute bottom-0 left-0 h-1 w-full transform origin-left transition-all duration-500 scale-x-0 group-hover:scale-x-100" 
                    style={{ background: theme.secondary }}
                  />
                </h2>
              </div>
              
              <p 
                className="text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0"
                style={{ color: theme.body }}
              >
                {about}
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
                {email && (
                  <a 
                    href={`mailto:${email}`}
                    className="px-6 py-3 rounded-lg shadow-md font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}DD)`,
                      color: 'white',
                    }}
                  >
                    <div className="flex items-center gap-2">
                    <FiMail className="h-5 w-5" />
                      <span>Contact Me</span>
                    </div>
                  </a>
                )}
                
                {githubLink && (
                  <a 
                    href={githubLink}
                    target="_blank"
                    className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2"
                    style={{ 
                      borderColor: theme.primary,
                      color: theme.primary
                    }}
                  >
                    <div className="flex items-center gap-2">
                    <FaGithub className="h-5 w-5" />

                      <span>View GitHub</span>
                    </div>
                  </a>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mt-8">
                {location && (
                  <div 
                    className="flex items-center gap-1 text-sm py-1 px-3 rounded-full"
                    style={{ 
                      backgroundColor: theme.muted,
                      color: theme.dark
                    }}
                  >
                    <FiMapPin className="h-4 w-4" />
                    <span>{location}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  {Object.entries(socials).map(([platform, url]) => (
                    <SocialIcon key={platform} type={platform} url={url} theme={theme} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10 overflow-hidden pointer-events-none">

          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              style={{ fill: theme.primary }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;