import { useState, useRef, useEffect } from "react";
import { Github, ExternalLink, ChevronDown, ChevronUp, Sparkles, Code } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SectionHeader from "./SectionHeader";

// Pattern component for image fallback
const PatternFallback = ({ theme }) => {
  return (
    <div 
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: theme.muted,
        backgroundImage: `linear-gradient(45deg, ${theme.accent} 25%, transparent 25%, transparent 75%, ${theme.accent} 75%, ${theme.accent}),
                         linear-gradient(45deg, ${theme.accent} 25%, transparent 25%, transparent 75%, ${theme.accent} 75%, ${theme.accent})`,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px'
      }}
    >
      <Code size={32} style={{ color: theme.dark, opacity: 0.5 }} />
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ 
  title,
  description,
  image,
  githubLink,
  liveDemo,
  technologies = [],
  roles = [],
  challenges,
  learnings,
  type,
  theme
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const detailsRef = useRef(null);
  const [detailsHeight, setDetailsHeight] = useState(0);

  useEffect(() => {
    if (detailsRef.current && expanded) {
      setDetailsHeight(detailsRef.current.scrollHeight);
    } else {
      setDetailsHeight(0);
    }
  }, [expanded]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className="relative rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md border"
      style={{ 
        backgroundColor: theme.card,
        borderColor: theme.accent,
        fontFamily: theme.fontBody,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Accent Bar */}
      <div 
        className="absolute top-0 left-0 w-full h-1 transition-transform duration-300"
        style={{ 
          backgroundColor: theme.primary,
          transform: isHovered ? "scaleX(1)" : "scaleX(0.3)",
          transformOrigin: "left"
        }}
      />

      {/* Image Section */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden">
        {image && !imageError ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={handleImageError}
          />
        ) : (
          <PatternFallback theme={theme} />
        )}
        
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{ 
            background: `linear-gradient(to bottom, transparent 60%, ${theme.dark})`, 
            opacity: isHovered ? 0.8 : 0.5 
          }}
        />

        {type && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: theme.accent,
                color: theme.dark,
              }}
            >
              {type}
            </span>
          </div>
        )}

        <div 
          className="absolute bottom-3 right-3 flex space-x-2 z-10 transition-all duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(10px)",
          }}
        >
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:scale-110 transition-transform"
              style={{ 
                backgroundColor: theme.light, 
                color: theme.dark,
                boxShadow: `0 2px 4px ${theme.dark}20`
              }}
              aria-label="GitHub repository"
            >
              <Github size={18} />
            </a>
          )}
          {liveDemo && (
            <a
              href={liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:scale-110 transition-transform"
              style={{ 
                backgroundColor: theme.primary, 
                color: theme.light,
                boxShadow: `0 2px 4px ${theme.dark}20`
              }}
              aria-label="Live demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 
          className="text-lg font-bold mb-2 flex items-center"
          style={{ color: theme.dark, fontFamily: theme.fontHeading }}
        >
          {title}
          <Sparkles 
            size={16} 
            className="ml-2 transition-opacity duration-300" 
            style={{ 
              color: theme.secondary, 
              opacity: isHovered ? 1 : 0 
            }} 
          />
        </h3>

        <p 
          className="mb-3 text-sm line-clamp-3 leading-relaxed" 
          style={{ color: theme.dark }}
        >
          {description}
        </p>

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs rounded-md"
                style={{
                  backgroundColor: theme.muted,
                  color: theme.dark,
                  border: `1px solid ${theme.accent}`
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {(roles.length > 0 || challenges || learnings) && (
          <button
            className="w-full mt-1 py-1.5 rounded-md text-xs font-medium flex items-center justify-center hover:opacity-90 transition-opacity"
            onClick={() => setExpanded(!expanded)}
            style={{
              backgroundColor: expanded ? theme.primary : theme.muted,
              color: expanded ? theme.light : theme.dark,
              border: `1px solid ${expanded ? theme.primary : theme.accent}`,
              fontFamily: theme.fontBody,
            }}
            aria-expanded={expanded}
          >
            {expanded ? "Hide details" : "View details"}
            {expanded ? (
              <ChevronUp size={14} className="ml-1.5" />
            ) : (
              <ChevronDown size={14} className="ml-1.5" />
            )}
          </button>
        )}

        <div
          ref={detailsRef}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: `${detailsHeight}px`, opacity: expanded ? 1 : 0 }}
        >
          <Separator 
            className="my-3" 
            style={{ 
              backgroundColor: theme.accent, 
              opacity: 0.3 
            }} 
          />

          {roles.length > 0 && (
            <div className="mb-2">
              <h4 
                className="font-semibold mb-1 text-sm" 
                style={{ 
                  color: theme.primary, 
                  fontFamily: theme.fontHeading 
                }}
              >
                My Role
              </h4>
              <p 
                className="text-xs leading-relaxed" 
                style={{ color: theme.dark }}
              >
                {roles.join(", ")}
              </p>
            </div>
          )}

          {challenges && (
            <div className="mb-2">
              <h4 
                className="font-semibold mb-1 text-sm" 
                style={{ 
                  color: theme.primary, 
                  fontFamily: theme.fontHeading 
                }}
              >
                Challenges
              </h4>
              <p 
                className="text-xs leading-relaxed" 
                style={{ color: theme.dark }}
              >
                {challenges}
              </p>
            </div>
          )}

          {learnings && (
            <div className="mb-1">
              <h4 
                className="font-semibold mb-1 text-sm" 
                style={{ 
                  color: theme.primary, 
                  fontFamily: theme.fontHeading 
                }}
              >
                Key Learnings
              </h4>
              <p 
                className="text-xs leading-relaxed" 
                style={{ color: theme.dark }}
              >
                {learnings}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Project Section Component
const ProjectSection = ({ portfolioItems, theme }) => {
  return (
    <section
      style={{
        backgroundColor: `${theme.muted}F2`,
        padding: '2rem 1rem'
      }}
      id="projects"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Projects"
          subtitle="Check out some of my recent work"
          theme={theme}
          icon={<Code size={24} />}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioItems.map((project, index) => (
            <ProjectCard key={index} {...project} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;