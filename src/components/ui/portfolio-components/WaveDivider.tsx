import { useState, useEffect } from 'react';

const EnhancedWaveDivider = ({
  color = "#3b82f6",
  inverted = false,
  height = "100px",
  wavePattern = "smooth", // smooth, sharp, rounded, layered, double, triple
  animated = false,
  gradient = false,
  gradientColors = ["#3b82f6", "#8b5cf6"],
  gradientDirection = "horizontal", // horizontal, vertical, diagonal
  opacity = 1,
  className = "",
  style = {},
  parallax = false,
  shadow = false,
  connectWithSection = false,
  flipX = false
}) => {
  const [uniqueId, setUniqueId] = useState("");
  
  // Generate a unique ID for gradient definitions
  useEffect(() => {
    setUniqueId(`wave-gradient-${Math.random().toString(36).substring(2, 9)}`);
  }, []);
  
  // Different wave path patterns
  const wavePaths = {
    smooth: "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
    sharp: "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
    rounded: "M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z",
    layered: "M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z",
    double: "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8c-67.81,23.1-144.29,15.49-214.34-3Z",
    triple: "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z M0,65V90.42c144.91,17.22,192.23-2.92,272.95-22.31,106.2-25.44,111.79-3.17,191.84,8.36,107.67,15.54,181.92-28.36,288.51-32.36C838.39,41.83,951,65,1200,69.42V65Z M0,110v10H1200V79.9c-86.68,13.69-186,21.2-297.59,18.16-112.37-3.08-224.27-32.49-332.41-18.26C405.33,97.65,347.33,130,209.61,130,130.08,130,69.45,119.45,0,110Z"
  };
  
  // Gradient directions
  const gradientDirections = {
    horizontal: { x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
    vertical: { x1: "0%", y1: "0%", x2: "0%", y2: "100%" },
    diagonal: { x1: "0%", y1: "0%", x2: "100%", y2: "100%" }
  };
  
  const selectedGradientDirection = gradientDirections[gradientDirection] || gradientDirections.horizontal;
  
  // Base styles with shadow if enabled
  const shadowFilter = shadow ? "filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));" : "";
  
  // Style to connect with section below/above
  const connectStyle = connectWithSection ? {
    marginBottom: inverted ? "-1px" : "0",
    marginTop: !inverted ? "-1px" : "0",
  } : {};
  
  // Combine styles
  const combinedStyle = {
    ...style,
    ...connectStyle,
    height,
  };
  
  return (
    <div 
      className={`w-full overflow-hidden relative ${className}`} 
      style={combinedStyle}
    >
      <svg 
        className={`absolute w-full h-full ${parallax ? "parallax-wave" : ""}`} 
        preserveAspectRatio="none" 
        viewBox="0 0 1200 120" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          transform: `${inverted ? 'rotate(180deg)' : 'none'} ${flipX ? 'scaleX(-1)' : ''}`,
          ...(shadowFilter ? { filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" } : {})
        }}
      >
        {gradient && (
          <defs>
            <linearGradient 
              id={uniqueId} 
              x1={selectedGradientDirection.x1}
              y1={selectedGradientDirection.y1}
              x2={selectedGradientDirection.x2}
              y2={selectedGradientDirection.y2}
            >
              <stop offset="0%" stopColor={gradientColors[0]} />
              {gradientColors.length > 2 && (
                <stop offset="50%" stopColor={gradientColors[1]} />
              )}
              <stop offset="100%" stopColor={gradientColors[gradientColors.length > 2 ? 2 : 1]} />
            </linearGradient>
          </defs>
        )}
        
        {/* First wave */}
        <path 
          d={wavePaths[wavePattern]}
          fill={gradient ? `url(#${uniqueId})` : color}
          opacity={opacity}
          className={animated ? "animate-wave" : ""}
        />
        
        {/* If animated, add a duplicate path for seamless animation */}
        {animated && (
          <path 
            d={wavePaths[wavePattern]} 
            fill={gradient ? `url(#${uniqueId})` : color}
            opacity={opacity}
            transform="translate(1200, 0)"
            className="animate-wave-delayed"
          />
        )}
      </svg>
      
      {/* Add necessary styles for animations and parallax */}
      <style jsx>{`
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-1200px); }
        }
        .animate-wave {
          animation: wave 25s linear infinite;
        }
        .animate-wave-delayed {
          animation: wave 25s linear infinite;
        }
        .parallax-wave {
          transition: transform 0.2s ease-out;
        }
      `}</style>
      
      {parallax && (
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('scroll', function() {
              const parallaxWaves = document.querySelectorAll('.parallax-wave');
              const scrolled = window.scrollY;
              
              parallaxWaves.forEach(wave => {
                const parent = wave.parentElement;
                const rect = parent.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                  const speed = 0.15;
                  const yPos = -(scrolled * speed);
                  wave.style.transform = 'translateY(' + yPos + 'px)';
                }
              });
            });
          `
        }} />
      )}
    </div>
  );
};

export default EnhancedWaveDivider;
