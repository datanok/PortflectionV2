import { Briefcase, BarChart, Users, ChevronUp, ChevronDown } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Separator } from "@/components/ui/separator";
import { useState, useRef, useEffect } from "react";

const BusinessProjectCard = ({ 
  title,
  organization,
  startDate,
  endDate,
  role,
  image,
  challenges,
  solutions,
  keyMetrics = [],
  teamSize,
  theme
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const detailsRef = useRef(null);
  const [detailsHeight, setDetailsHeight] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (detailsRef.current && expanded) {
      setDetailsHeight(detailsRef.current.scrollHeight);
    } else {
      setDetailsHeight(0);
    }
  }, [expanded]);

  const handleImageError = () => setImageError(true);

  return (
    <div 
      className="relative rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md border"
      style={{ 
        backgroundColor: theme.card,
        borderColor: theme.accent,
        fontFamily: theme.fontBody
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

      {/* Image */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden">
        {image && !imageError ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: theme.muted }}
          >
            <Briefcase size={32} style={{ color: theme.dark, opacity: 0.5 }} />
          </div>
        )}
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to bottom, transparent 60%, ${theme.dark})`,
            opacity: isHovered ? 0.8 : 0.5
          }}
        />
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-bold mb-1" style={{ color: theme.dark }}>
          {title}
        </h3>
        <p className="text-sm mb-1" style={{ color: theme.dark }}>
          {organization} • {role}
        </p>
        <p className="text-xs mb-3" style={{ color: theme.dark }}>
          {startDate} — {endDate}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-1 py-1.5 rounded-md text-xs font-medium flex items-center justify-center hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: expanded ? theme.primary : theme.muted,
            color: expanded ? theme.light : theme.dark,
            border: `1px solid ${expanded ? theme.primary : theme.accent}`,
            fontFamily: theme.fontBody,
          }}
          aria-expanded={expanded}
        >
          {expanded ? "Hide details" : "View case study"}
          {expanded ? (
            <ChevronUp size={14} className="ml-1.5" />
          ) : (
            <ChevronDown size={14} className="ml-1.5" />
          )}
        </button>

        <div
          ref={detailsRef}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: `${detailsHeight}px`, opacity: expanded ? 1 : 0 }}
        >
          <Separator className="my-3" style={{ backgroundColor: theme.accent, opacity: 0.3 }} />

          {challenges && (
            <div className="mb-2">
              <h4 className="font-semibold text-sm" style={{ color: theme.primary }}>Challenges</h4>
              <p className="text-xs" style={{ color: theme.dark }}>{challenges}</p>
            </div>
          )}

          {solutions && (
            <div className="mb-2">
              <h4 className="font-semibold text-sm" style={{ color: theme.primary }}>Solutions</h4>
              <p className="text-xs" style={{ color: theme.dark }}>{solutions}</p>
            </div>
          )}

          {keyMetrics.length > 0 && (
            <div className="mb-2">
              <h4 className="font-semibold text-sm" style={{ color: theme.primary }}>Key Metrics</h4>
              <ul className="text-xs list-disc list-inside" style={{ color: theme.dark }}>
                {keyMetrics.map((metric, i) => (
                  <li key={i}>{metric.name}: {metric.value}</li>
                ))}
              </ul>
            </div>
          )}

          {teamSize && (
            <div className="mb-1 flex items-center text-xs" style={{ color: theme.dark }}>
              <Users size={14} className="mr-1" />
              Team Size: {teamSize}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BusinessProjectSection = ({ portfolioItems, theme }) => {
  return (
    <section
      id="projects"
      style={{
        backgroundColor: `${theme.muted}F2`,
        padding: '2rem 1rem'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Consulting Projects"
          subtitle="Strategic solutions and business impact"
          icon={<Briefcase size={24} />}
          theme={theme}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioItems.map((project, index) => (
            <BusinessProjectCard key={index} {...project} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessProjectSection;
