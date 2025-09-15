import React, { useState, useEffect } from "react";
import {
  ArrowDown,
  ExternalLink,
  Download,
  Star,
} from "lucide-react";

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
  | "triangle"
  | "octagon"
  | "figure8"
  | "heart"
  | "lightning"
  | "pentagon"
  | "cross";

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

// -------------------- BUTTON -------------------- //
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
  borderRadius?: string;
  shadow?: string;
}

const BrutalistButton: React.FC<BrutalistButtonProps> = ({
  text,
  href = "#",
  icon,
  onClick,
  variant,
  borderColor,
  primaryColor,
  secondaryColor,
  accentColor,
  textColor,
  borderRadius,
  shadow,
}) => {
  const baseStyle =
    "font-black uppercase tracking-wider border-4 transition-all duration-200 hover:scale-105 hover:shadow-lg px-6 py-3";

  let dynamicStyle: React.CSSProperties = {};

  switch (variant) {
    case "primary":
      dynamicStyle = {
        backgroundColor: primaryColor,
        color: "white",
        boxShadow: shadow || `4px 4px 0px ${borderColor}`,
        borderColor,
        borderRadius,
      };
      break;
    case "secondary":
      dynamicStyle = {
        backgroundColor: secondaryColor,
        color: "white",
        boxShadow: shadow || `4px 4px 0px ${borderColor}`,
        borderColor,
        borderRadius,
      };
      break;
    case "outline":
      dynamicStyle = {
        backgroundColor: "transparent",
        color: textColor,
        boxShadow: shadow || `4px 4px 0px ${borderColor}`,
        borderColor,
        borderRadius,
      };
      break;
    default:
      dynamicStyle = {
        backgroundColor: primaryColor,
        color: "white",
        boxShadow: shadow || `4px 4px 0px ${borderColor}`,
        borderColor,
        borderRadius,
      };
      break;
  }

  return (
    <a href={href} onClick={onClick} className={baseStyle} style={dynamicStyle}>
      {text}
    </a>
  );
};

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
      borderRadius: "30px",
    },
    star: {
      clipPath:
        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    },
    triangle: { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
    octagon: {
      clipPath:
        "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
    },
    figure8: { clipPath: "ellipse(40% 25% at 50% 25%), ellipse(40% 25% at 50% 75%)" },
    heart: {
      clipPath:
        "polygon(50% 30%, 85% 20%, 100% 50%, 75% 90%, 50% 100%, 25% 90%, 0% 50%, 15% 20%)",
    },
    lightning: {
      clipPath:
        "polygon(20% 0%, 40% 20%, 30% 20%, 70% 100%, 50% 80%, 60% 80%, 30% 0%)",
    },
    pentagon: {
      clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
    },
    cross: {
      clipPath:
        "polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)",
    },
  };

  return { ...dimensions, ...shapes[shape] } as React.CSSProperties;
};

// -------------------- HERO -------------------- //
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
  shadow = "4px 4px 0px #000",

  height = "auto",
  paddingY = "2rem",
  paddingX = "1.5rem",
  textAlign = "center",

  titleSize = "3rem",
  subtitleSize = "2rem",
  descriptionSize = "1.125rem",
  badgeSize = "0.875rem",
  imageShape = "hexagon",
  imageSize = "large",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const shapeStyles = getShapeStyles(imageShape, imageSize);

  const heroStyle: React.CSSProperties = {
    minHeight: height,
    background: backgroundColor,
    color: textColor,
    padding: `${paddingY} ${paddingX}`,
    textAlign: textAlign as "left" | "center" | "right",
  };

  const badgeStyle: React.CSSProperties = {
    backgroundColor: accentColor,
    color: textColor,
    fontWeight: 800,
    fontSize: badgeSize,
    border: `3px solid ${borderColor}`,
    borderRadius: "50px",
    padding: "0.75rem 1.5rem",
    boxShadow: shadow,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "2rem",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: titleSize,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: "1rem",
    textTransform: "uppercase",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: subtitleSize,
    fontWeight: 800,
    color: primaryColor,
    marginBottom: "1.5rem",
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: descriptionSize,
    fontWeight: 600,
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
    backgroundColor: textColor,
    color: backgroundColor,
    border: `3px solid ${borderColor}`,
    borderRadius: "50px",
    padding: "1rem",
    cursor: "pointer",
    boxShadow: shadow,
    animation: "bounce 2s infinite",
  };

  const otherButtons = buttons.filter((btn) => btn.variant !== "get-started");

  return (
    <section className="overflow-hidden" style={heroStyle}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Left */}
        <div className="flex-1 lg:max-w-xl text-left mb-12 lg:mb-0 pr-0 lg:pr-12">
          {showBadge && (
            <div style={badgeStyle}>
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
                borderRadius={borderRadius}
                shadow={shadow}
              />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
          <div
            style={{
              ...shapeStyles,
              position: "relative",
              backgroundColor: borderColor,
              boxShadow: shadow,
            }}
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
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face";
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <button
          onClick={() => {
            const target = document.getElementById(
              scrollTarget?.replace("#", "") || ""
            );
            target?.scrollIntoView({ behavior: "smooth" });
          }}
          style={scrollIndicatorStyle}
        >
          <ArrowDown size={24} strokeWidth={3} />
        </button>
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