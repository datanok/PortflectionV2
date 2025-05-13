import React, { useEffect, useMemo } from 'react';
import { Code2, Terminal, Palette, PenTool, Camera, Video, BarChart, Briefcase } from 'lucide-react';

// Constants moved outside component to avoid recreation on each render
const PARTICLE_COUNT = 5;
const MIN_SIZE = 12;
const MAX_SIZE = 22;
const MIN_DURATION = 15;
const MAX_DURATION = 25;

const iconMap = {
  developer: [Code2, Terminal],
  designer: [Palette, PenTool],
  contentCreator: [Camera, Video],
  businessConsulting: [BarChart, Briefcase]
} as const;

type PortfolioType = keyof typeof iconMap;

interface FloatingParticlesProps {
  portfolioType?: PortfolioType;
  theme: {
    primary: string;
    secondary: string;
  };
  particleCount?: number;
  opacity?: number;
}

// Define keyframes once in a separate component
const FloatingParticlesStyles = () => {
  return (
    <style jsx global>{`
      @keyframes float-animation {
        0% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(var(--move-x, 10px), var(--move-y, 15px)) rotate(5deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
    `}</style>
  );
};

const FloatingParticles = ({ 
  portfolioType = 'developer', 
  theme,
  particleCount = PARTICLE_COUNT, // Now correctly using 5
  opacity = 0.6
}: FloatingParticlesProps) => {
  const icons = useMemo(() => iconMap[portfolioType] || [], [portfolioType]);
  const iconCount = icons.length;

  const particles = useMemo(() => {
    if (iconCount === 0) return [];
    
    return Array.from({ length: particleCount }, (_, i) => { // Now strictly using particleCount
      const Icon = icons[i % iconCount]; // Just cycles through available icons
      const size = Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE)) + MIN_SIZE;
      const isPrimaryColor = Math.random() > 0.5;
      const moveX = Math.floor(Math.random() * 30) - 15;
      const moveY = Math.floor(Math.random() * 30) - 15;
      
      return {
        Icon,
        id: i, // Unique ID based on particle count
        size,
        top: Math.floor(Math.random() * 100),
        left: Math.floor(Math.random() * 100),
        duration: Math.floor(Math.random() * (MAX_DURATION - MIN_DURATION)) + MIN_DURATION,
        delay: Math.floor(Math.random() * 5),
        color: isPrimaryColor ? theme.primary : theme.secondary,
        opacity: Math.max(0.3, opacity - (Math.random() * 0.2)),
        moveX,
        moveY
      };
    });
  }, [particleCount, theme, opacity, icons]); // Removed iconCount from dependencies

  if (iconCount === 0) return null;
  return (
    <>
      <FloatingParticlesStyles />
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={`particle-${particle.id}`} // More unique key
            className="absolute will-change-transform"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float-animation ${particle.duration}s ease-in-out infinite alternate`,
              animationDelay: `${particle.delay}s`,
              transform: 'translateZ(0)',
              color: particle.color,
              '--move-x': `${particle.moveX}px`,
              '--move-y': `${particle.moveY}px`,
            } as React.CSSProperties}
          >
            <particle.Icon className="w-full h-full" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </>
  );
}; 
export default React.memo(FloatingParticles);