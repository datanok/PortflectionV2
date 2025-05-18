import { Briefcase, Users, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import SectionHeader from "./SectionHeader";

const BusinessProjectCard = ({
  title,
  organization,
  startDate,
  endDate,
  role,
  challenges,
  solutions,
  keyMetrics = [],
  teamSize,
  theme,
}) => {
  const [expanded, setExpanded] = useState(false);
  const detailsRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (detailsRef.current) {
      setHeight(expanded ? detailsRef.current.scrollHeight : 0);
    }
  }, [expanded]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden border transition-all duration-300 group shadow-sm hover:shadow-lg"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.accent,
        fontFamily: theme.fontBody,
      }}
    >
      {/* Top Accent Bar */}
      <div
        className="absolute top-0 left-0 w-full h-1 transition-transform duration-300"
        style={{
          backgroundColor: theme.primary,
          transform: "scaleX(1)",
          transformOrigin: "left",
        }}
      />

      {/* Header */}
      <div className="flex gap-3 p-5 border-b items-start" style={{ borderColor: theme.accent }}>
        <Briefcase size={24} style={{ color: theme.primary }} />
        <div className="space-y-1">
          <h3 className="text-lg font-semibold leading-tight" style={{ color: theme.dark }}>
            {title}
          </h3>
          <p className="text-sm text-muted" style={{ color: theme.dark }}>
            {organization} • {role}
          </p>
          <p className="text-xs text-muted" style={{ color: theme.dark }}>
            {startDate} — {endDate}
          </p>
        </div>
      </div>

      <div className="p-5">
        {/* Toggle Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 py-2 px-3 text-sm rounded-md font-medium transition-all"
          style={{
            backgroundColor: expanded ? theme.primary : theme.muted,
            color: expanded ? theme.light : theme.dark,
            border: `1px solid ${expanded ? theme.primary : theme.accent}`,
            fontFamily: theme.fontBody,
          }}
        >
          {expanded ? "Hide details" : "View case study"}
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {/* Collapsible Content */}
        <div
          ref={detailsRef}
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: `${height}px`,
            opacity: expanded ? 1 : 0,
            marginTop: expanded ? "1rem" : "0",
          }}
        >
          <Separator className="my-3" style={{ backgroundColor: theme.accent, opacity: 0.3 }} />

          {challenges && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-1" style={{ color: theme.primary }}>
                Challenges
              </h4>
              <p className="text-sm" style={{ color: theme.dark }}>{challenges}</p>
            </div>
          )}

          {solutions && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-1" style={{ color: theme.primary }}>
                Solutions
              </h4>
              <p className="text-sm" style={{ color: theme.dark }}>{solutions}</p>
            </div>
          )}

          {keyMetrics.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-1" style={{ color: theme.primary }}>
                Key Metrics
              </h4>
              <ul className="flex flex-wrap gap-2">
                {keyMetrics.map((metric, i) => (
                  <li
                    key={i}
                    className="text-xs px-2 py-1 rounded-full border"
                    style={{
                      backgroundColor: theme.muted,
                      borderColor: theme.accent,
                      color: theme.dark,
                    }}
                  >
                    {metric.name}: <span className="font-semibold">{metric.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {teamSize && (
            <div className="flex items-center text-sm mt-1" style={{ color: theme.dark }}>
              <Users size={14} className="mr-2" />
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
        backgroundColor: theme?.muted || '#e6fffa',
        padding: "3rem 1.25rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Consulting Projects"
          subtitle="Strategic solutions and business impact"
          icon={<Briefcase size={24} />}
          theme={theme}
        />
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((project, index:number) => (
            <BusinessProjectCard key={index} {...project} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessProjectSection;