import React, { useState, useEffect } from "react";
import {
  ArrowDown,
  ExternalLink,
  Download,
  Star,
  Quote,
} from "lucide-react";

// --- INTERFACES ---

interface HeroButton {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "get-started";
  icon?: React.ReactNode;
}

type ShapeType =
  | "circle"
  | "hexagon"
  | "diamond"
  | "blob"
  | "star"
  | "octagon"
  | "heart"
  | "pentagon"

interface ComponentProps {
  // Content Props
  title?: string;
  subtitle?: string;
  description?: string;
  buttons?: HeroButton[];
  showScrollIndicator?: boolean;
  scrollTarget?: string;
  backgroundImage?: string;
  profileImage?: string;
  heroImage?: string;
  showFloatingElements?: boolean;
  showVisualElement?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  imageShape?: ShapeType;
  imageSize?: "small" | "medium" | "large";

  // Style Props
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  borderColor?: string;
  borderRadius?: string;
  shadow?: string;
  height?: string;
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";

  // Typography Props
  titleSize?: string;
  subtitleSize?: string;
  descriptionSize?: string;
  badgeSize?: string;

  globalTheme?: any;
}

// --- HELPER COMPONENTS ---

interface BrutalistButtonProps {
  text: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "get-started";
  borderColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  textColor?: string;
  shadow?: string;
}

/**
 * Custom Brutalist Button with "Pressed" effect on hover/click.
 * It translates down and right by the shadow offset and removes the shadow.
 */
const BrutalistButton: React.FC<BrutalistButtonProps> = ({
  text,
  href = "#",
  icon,
  onClick,
  variant,
  borderColor = "#000",
  primaryColor = "#000",
  secondaryColor = "#333",
  accentColor = "#ffcc00",
  textColor = "#fff",
  shadow = "4px 4px 0px #000",
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Parse shadow offset from the shadow string
  const shadowOffsetMatch = shadow.match(/^(\d+)px/);
  const shadowOffset = shadowOffsetMatch ? parseInt(shadowOffsetMatch[1]) : 4;

  // Define default shadow
  const neoBrutalShadow = shadow;

  const getVariantStyles = () => {
    let bgColor = primaryColor;
    let color = textColor;
    let currentShadow = isPressed ? "none" : neoBrutalShadow;
    let currentTransform = isPressed ? `translate(${shadowOffset}px, ${shadowOffset}px)` : 'translate(0, 0)';

    switch (variant) {
      case "primary":
        bgColor = primaryColor;
        color = textColor;
        break;
      case "secondary":
        bgColor = secondaryColor;
        color = textColor;
        break;
      case "outline":
        bgColor = "transparent";
        color = primaryColor;
        break;
      case "get-started":
        bgColor = accentColor;
        color = primaryColor;
        break;
      default:
        bgColor = primaryColor;
        color = textColor;
        break;
    }

    return {
      backgroundColor: bgColor,
      color: color,
      borderColor: borderColor,
      borderWidth: '4px',
      boxShadow: currentShadow,
      transform: currentTransform,
      borderRadius: '0', // Enforce sharp corners
      transition: "box-shadow 0.1s ease-out, transform 0.1s ease-out",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "0.75rem 1.5rem",
      textTransform: "uppercase",
      fontWeight: 900,
      letterSpacing: "0.05em",
    };
  };

  const handleAction = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only handle navigation on mouse up/click after a potential press
    if (onClick) onClick();
    if (href && href !== "#") window.location.href = href;
  };

  return (
    <a
      href={href}
      // Use mouse/touch events to manage the pressed state cleanly
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => { setIsPressed(false); handleAction(); }}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => { setIsPressed(false); handleAction(); }}
      style={getVariantStyles()}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {text}
    </a>
  );
};


// Helper function for complex clip-path shapes
const getShapeStyles = (
  shape: ShapeType = "hexagon",
  size: "small" | "medium" | "large" = "large"
) => {
  const sizeMap = {
    small: { width: "280px", height: "280px" },
    medium: { width: "400px", height: "400px" },
    large: { width: "500px", height: "500px" },
  } as const;

  const dimensions = sizeMap[size];

  const shapes: Record<ShapeType, React.CSSProperties> = {
    circle: { clipPath: "circle(50%)", borderRadius: "50%" },
    hexagon: {
      clipPath:
        "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
    },
    diamond: { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
    blob: {
      clipPath:
        "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
      borderRadius: "0px", // Enforce brutalist square corners where possible
    },
    octagon: {
      clipPath:
        "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
    }, heart: {
      clipPath:
        "polygon(50% 30%, 85% 20%, 100% 50%, 75% 90%, 50% 100%, 25% 90%, 0% 50%, 15% 20%)",
    },

    pentagon: {
      clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
    },

  };

  return { ...dimensions, ...shapes[shape] } as React.CSSProperties;
};

// -------------------- HERO COMPONENT -------------------- //
const NeoBrutalistHero: React.FC<ComponentProps> = ({
  title = "CREATIVE DEVELOPER & DESIGNER",
  subtitle = "BUILDING THE FUTURE",
  description =
  "I create bold, innovative digital experiences that push boundaries and challenge conventions. Let's build something extraordinary together.",
  buttons = [
    {
      text: "VIEW MY WORK",
      href: "#work",
      variant: "primary",
      icon: <ExternalLink size={20} strokeWidth={3} />,
    },
    {
      text: "DOWNLOAD CV",
      href: "#",
      variant: "secondary",
      icon: <Download size={20} strokeWidth={3} />,
    },
  ],
  showScrollIndicator = true,
  scrollTarget = "#about",

  // Media
  profileImage = "https://placehold.co/100x100/fecaca/000000?text=PFP",
  heroImage = "https://placehold.co/1000x800/d9f991/000000?text=Hero+Image",

  // Badge
  showBadge = true,
  badgeText = "AVAILABLE FOR HIRE",

  // Styles
  backgroundColor = "#fef08a",
  textColor = "#111111",
  primaryColor = "#ef4444",
  secondaryColor = "#8b5cf6",
  accentColor = "#fef08a",
  borderColor = "#000000",
  borderRadius = "0",
  shadow = "8px 8px 0px #000",

  height = "auto",
  paddingY = "8rem",
  paddingX = "2rem",
  textAlign = "left",

  titleSize = "3.5rem",
  subtitleSize = "1.75rem",
  descriptionSize = "1.125rem",
  badgeSize = "0.875rem",
  imageShape = "octagon", // Changed default shape for variety
  imageSize = "large",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const shapeStyles = getShapeStyles(imageShape, imageSize);

  const heroStyle: React.CSSProperties = {
    minHeight: height === "auto" ? "80vh" : height,
    background: backgroundColor,
    color: textColor,
    padding: `${paddingY} ${paddingX}`,
    textAlign: textAlign as "left" | "center" | "right",
    // Enforce sharp corners
    border: `0px solid ${borderColor}`,
  };

  const badgeStyle: React.CSSProperties = {
    backgroundColor: primaryColor, // Using Primary for high visibility
    color: accentColor,
    fontWeight: 900,
    fontSize: badgeSize,
    border: `3px solid ${borderColor}`,
    borderRadius: "0", // Force sharp badge
    padding: "0.5rem 1rem",
    boxShadow: shadow,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "2rem",
    textTransform: "uppercase",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: titleSize,
    fontWeight: 900,
    lineHeight: 1,
    marginBottom: "1rem",
    textTransform: "uppercase",
    letterSpacing: "-0.05em",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: subtitleSize,
    fontWeight: 700,
    color: secondaryColor,
    marginBottom: "1.5rem",
    textTransform: "uppercase",
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: descriptionSize,
    fontWeight: 500,
    lineHeight: 1.6,
    marginBottom: "3rem",
    maxWidth: "600px",
    margin: textAlign === "center" ? "0 auto 3rem auto" : "0 0 3rem 0",
  };

  const scrollIndicatorStyle: React.CSSProperties = {
    position: "absolute" as const,
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: primaryColor,
    color: accentColor,
    border: `4px solid ${borderColor}`,
    borderRadius: "0", // Force sharp corners
    padding: "0.5rem",
    cursor: "pointer",
    boxShadow: shadow,
    animation: "bounce 2s infinite",
  };

  const otherButtons = buttons.filter((btn) => btn.variant !== "get-started");

  // Hero Image Container Styles (for the drop shadow layer)
  const imageContainerStyle: React.CSSProperties = {
    ...shapeStyles,
    position: "relative",
    backgroundColor: borderColor,
    boxShadow: shadow,
    border: `${parseInt(shapeStyles.width) > 400 ? 6 : 4}px solid ${borderColor}`, // Thicker border for large shapes
    transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
  }

  return (
    <section className="overflow-hidden" style={heroStyle}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Left (Content) */}
        <div className="flex-1 lg:max-w-xl text-left mb-12 lg:mb-0 pr-0 lg:pr-12">
          {showBadge && (
            <div style={badgeStyle}>
              <Star size={16} strokeWidth={3} />
              {badgeText}
            </div>
          )}
          <h1 style={titleStyle}>{title}</h1>
          <h2 style={subtitleStyle}>{subtitle}</h2>
          <p style={descriptionStyle}>{description}</p>
          <div className="flex flex-wrap items-center gap-4">
            {otherButtons.map((button, idx) => (
              <BrutalistButton
                key={idx}
                {...button}
                borderColor={borderColor}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                accentColor={accentColor}
                textColor={textColor}
                shadow={shadow}
              />
            ))}
          </div>
        </div>

        {/* Right (Visual Element) */}
        <div className="flex-1 relative h-[400px] md:h-[500px] lg:h-[600px] w-full max-w-lg flex items-center justify-center">
          <div
            // Use key events to enforce hover/active state on the image container for visual feedback
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `${parseInt(shadow.split('px')[0]) + 4}px ${parseInt(shadow.split('px')[0]) + 4}px 0px ${borderColor}`;
              e.currentTarget.style.transform = "translate(-4px, -4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = shadow;
              e.currentTarget.style.transform = "translate(0, 0)";
            }}
            style={imageContainerStyle}
            className="cursor-pointer"
          >
            <img
              src={heroImage}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                ...shapeStyles,
                position: "relative",
                zIndex: 2,
                // Offset the image slightly to show the border of the container underneath
                transform: "translate(-5px, -5px)",
                border: `4px solid ${borderColor}`,
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/1000x800/d9f991/000000?text=ERROR";
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <a
          href={scrollTarget}
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById(
              scrollTarget?.replace("#", "") || ""
            );
            target?.scrollIntoView({ behavior: "smooth" });
          }}
          style={scrollIndicatorStyle}
        >
          <ArrowDown size={24} strokeWidth={3} />
        </a>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
      `}</style>
    </section>
  );
};

export default NeoBrutalistHero;
