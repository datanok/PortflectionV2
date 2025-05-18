import { Quote, ArrowRight, ArrowDown } from "lucide-react";
import { useState } from "react";

const SectionHeader = ({ title, subtitle, theme }) => (
  <div className="mb-10">
    <h2 className="text-3xl font-bold tracking-tight mb-2" style={{ 
      fontFamily: theme.fontHeading, 
      color: theme.dark 
    }}>
      {title}
    </h2>
    <p className="text-lg text-gray-600" style={{ fontFamily: theme.fontBody }}>
      {subtitle}
    </p>
    <div className="mt-4 w-20 h-1" style={{ backgroundColor: theme.primary }}></div>
  </div>
);

const DesignerProjectCard = ({
  title,
  client,
  description,
  problem,
  solution,
  process,
  outcome,
  images,
  testimonial,
  theme,
  index,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const cardSize = index % 3 === 0 ? "lg" : index % 5 === 0 ? "lg" : "md";
  
  return (
    <div 
      className={`mb-8 overflow-hidden rounded-xl shadow-md hover:shadow-lg hover:scale-102  transition-all duration-300 ${
        cardSize === "lg" ? "col-span-2" : "col-span-1"
      }`}
      style={{ 
        backgroundColor: theme.light, 
        borderColor: theme.muted 
      }}
    >
      {images && images.length > 0 && (
        <div className="relative w-full overflow-hidden" style={{ 
          height: cardSize === "lg" ? "320px" : "240px" 
        }}>
          <div 
            className="w-full h-full transition-all duration-500 ease-in-out bg-cover bg-center" 
            style={{ 
              backgroundImage: `url(${images})`,
            }}
          />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold" style={{ 
            fontFamily: theme.fontHeading, 
            color: theme.dark 
          }}>
            {title}
          </h3>
          <span className="px-3 py-1 text-xs rounded-full" style={{ 
            backgroundColor: theme.muted,
            color: theme.dark,
            fontFamily: theme.fontBody 
          }}>
            {client}
          </span>
        </div>

        <p className="text-gray-600 mb-4" style={{ fontFamily: theme.fontBody }}>
          {description}
        </p>

        {/* Details Toggle Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
          style={{
            backgroundColor: showDetails ? theme.primary : theme.light,
            color: showDetails ? theme.light : theme.primary,
            borderWidth: "1px",
            borderColor: theme.primary,
            fontFamily: theme.fontBody,
          }}
        >
          {showDetails ? "Hide Process" : "View Design Process"}
          {showDetails ? <ArrowDown size={16} /> : <ArrowRight size={16} />}
        </button>

        {/* Expandable Details Section */}
        {showDetails && (
          <div className="mt-6 pt-4 border-t animate-fadeIn" style={{ borderColor: theme.muted }}>
            <div className="mb-4">
              <h4 className="text-sm font-bold mb-2" style={{ 
                color: theme.dark,
                fontFamily: theme.fontHeading 
              }}>
                Problem
              </h4>
              <p className="text-gray-600 text-sm" style={{ fontFamily: theme.fontBody }}>
                {problem}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-bold mb-2" style={{ 
                color: theme.dark,
                fontFamily: theme.fontHeading 
              }}>
                Solution
              </h4>
              <p className="text-gray-600 text-sm" style={{ fontFamily: theme.fontBody }}>
                {solution}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-bold mb-2" style={{ 
                color: theme.dark,
                fontFamily: theme.fontHeading 
              }}>
                Design Process
              </h4>
              <p className="text-gray-600 text-sm" style={{ fontFamily: theme.fontBody }}>
                {process}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-bold mb-2" style={{ 
                color: theme.dark,
                fontFamily: theme.fontHeading 
              }}>
                Outcome
              </h4>
              <p className="text-gray-600 text-sm" style={{ fontFamily: theme.fontBody }}>
                {outcome}
              </p>
            </div>
          </div>
        )}

        {/* Testimonial Section */}
        {testimonial && (
          <div 
            className="mt-6 p-4 rounded-lg flex items-start gap-3"
            style={{ 
              backgroundColor: theme.muted + "30", 
              borderLeft: `3px solid ${theme.accent}` 
            }}
          >
            <Quote size={18} style={{ color: theme.accent, flexShrink: 0, marginTop: "2px" }} />
            <div>
              <p 
                className="text-sm italic mb-2" 
                style={{ 
                  fontFamily: theme.fontBody,
                  color: theme.dark 
                }}
              >
                &quot;{testimonial.content}&quot;
              </p>
              <p 
                className="text-xs font-semibold"
                style={{ 
                  fontFamily: theme.fontBody,
                  color: theme.dark 
                }}
              >
                — {testimonial.name}, {testimonial.position}, {testimonial.company}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DesignerProjectSection = ({ portfolioItems, theme }) => {
  return (
    <section className="py-16" style={{
      backgroundColor: theme?.muted,
    }}>
      <div className="container mx-auto px-8">
        <SectionHeader 
        title="Projects"
          subtitle="Crafting meaningful digital experiences through thoughtful design" 
          theme={theme}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((project, index) => (
            <DesignerProjectCard
              key={index}
              {...project}
              theme={theme}
              index={index}
            />
          ))}
        </div>


      </div>
    </section>
  );
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(styleSheet);

export default DesignerProjectSection;