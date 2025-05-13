import { useState, useEffect } from 'react';

// DecorativeCircles component with customizable properties
export default function DecorativeCircles({
  primaryColor = "#6366f1", // Default indigo color
  secondaryColor = "#8b5cf6", // Default purple color
  primarySize = "w-72 h-72",
  secondarySize = "w-56 h-56",
  primaryPosition = "top-20 right-20",
  secondaryPosition = "bottom-16 left-20",
  opacity = 0.8,
  blur = "blur-xl", // Add blur effect for modern look
  animation = true, // Enable/disable animation
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0  pointer-events-none">
      {/* Primary circle with animation */}
      <div 
        className={`absolute ${primaryPosition} ${primarySize} rounded-full transition-all duration-1000 ${mounted && animation ? "animate-pulse" : ""}`}
        style={{ 
          background: primaryColor,
          opacity: opacity,
          filter: `${blur !== "none" ? blur : ""}`,
        }} 
      />
      
      {/* Secondary circle with animation */}
      <div 
        className={`absolute ${secondaryPosition} ${secondarySize} rounded-full transition-all duration-1500 ${mounted && animation ? "animate-pulse" : ""}`}
        style={{ 
          background: secondaryColor,
          opacity: opacity,
          filter: `${blur !== "none" ? blur : ""}`,
          animationDelay: "750ms",
        }} 
      />
    </div>
  );
}
