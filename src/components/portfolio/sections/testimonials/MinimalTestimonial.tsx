import React, { useState, useRef } from "react";

interface Testimonial {
  id: number;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  image: string;
  featured?: boolean;
}

interface MinimalTestimonialProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  showRatings?: boolean;
  showQuotes?: boolean;
  backgroundColor?: string;
  cardBackgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  borderRadius?: string;
  borderWidth?: number;
  shadow?: string;
  columns?: 1 | 2 | 3;
}

const MinimalTestimonial: React.FC<MinimalTestimonialProps> = ({
  title = "Proof in Praise",
  subtitle = "TESTIMONIALS",
  testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content:
        "Working with this developer was an absolute pleasure. They delivered high-quality code on time and exceeded our expectations. Their attention to detail and problem-solving skills are exceptional.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      featured: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO",
      company: "StartupXYZ",
      content:
        "Incredible technical expertise and great communication skills. They helped us build a scalable solution that has been running smoothly for months. Highly recommended!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Design Lead",
      company: "Creative Agency",
      content:
        "Perfect collaboration between design and development. They understood our vision and brought it to life with pixel-perfect precision. A true professional!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ],
  showRatings = true,
  showQuotes = true,
  backgroundColor = "#f9fafb",
  cardBackgroundColor = "#ffffff",
  textColor = "#111827",
  primaryColor = "#2563eb",
  secondaryColor = "#6b7280",
  paddingY = "64",
  paddingX = "16",
  textAlign = "center",
  fontSize = "base",
  fontWeight = "normal",
  fontFamily = "Inter, system-ui, sans-serif",
  borderRadius = "24",
  borderWidth = 15,
  shadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  columns = 1,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setTranslateX(diff);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (translateX > 100 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (translateX < -100 && currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    setTranslateX(0);
  };

  const getCardStyle = (index: number) => {
    const position = index - currentIndex;
    const baseTranslate = position * 40;
    const activeTranslate = isDragging ? translateX * 0.3 : 0;

    if (position === 0) {
      return {
        transform: `translateX(calc(-50% + ${translateX}px)) rotate(0deg) scale(1)`,
        zIndex: 30,
        opacity: 1,
      };
    } else if (position === -1) {
      return {
        transform: `translateX(calc(-50% - 280px + ${activeTranslate}px)) rotate(-8deg) scale(0.9)`,
        zIndex: 20,
        opacity: 0.7,
      };
    } else if (position === 1) {
      return {
        transform: `translateX(calc(-50% + 280px + ${activeTranslate}px)) rotate(8deg) scale(0.9)`,
        zIndex: 20,
        opacity: 0.7,
      };
    } else if (position < -1) {
      return {
        transform: `translateX(calc(-50% - 320px)) rotate(-12deg) scale(0.8)`,
        zIndex: 10,
        opacity: 0,
      };
    } else {
      return {
        transform: `translateX(calc(-50% + 320px)) rotate(12deg) scale(0.8)`,
        zIndex: 10,
        opacity: 0,
      };
    }
  };

  const sectionStyle = {
    backgroundColor,
    color: textColor,
    paddingTop: `${paddingY}px`,
    paddingBottom: `${paddingY}px`,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    textAlign: textAlign as any,
    fontFamily,
    fontSize: fontSize === "base" ? "16px" : fontSize,
    fontWeight,
    minHeight: "100vh",
    overflow: "hidden",
  };

  // Use the borderWidth prop for consistency between border and stroke

  const cardStyle = {
    backgroundColor: cardBackgroundColor,
    borderRadius: `${borderRadius}px`,
    boxShadow: shadow,
    border: `${borderWidth}px solid ${primaryColor}`,
  };

  return (
    <section style={sectionStyle}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p
            className="text-sm font-medium tracking-wide uppercase mb-2"
            style={{ color: primaryColor }}
          >
            {subtitle}
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: textColor }}
          >
            {title}
          </h2>
        </div>

        {/* Cards Container */}
        <div
          ref={containerRef}
          className="relative h-[500px] mb-12 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="absolute left-1/2 top-0 w-full max-w-xl md:max-w-xs transition-all duration-500 ease-out"
              style={getCardStyle(index)}
            >
              {/* Profile Image */}
              {/* Profile Image */}
              <div className="flex justify-center mb-[-40px] relative z-20">
                <div
                  className="relative"
                  style={{ width: "80px", height: "80px" }}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full rounded-full object-cover"
                    style={{ backgroundColor: cardBackgroundColor }}
                  />
                  <svg
                    className="absolute top-0 left-0"
                    width="100"
                    height="100"
                    style={{
                      top: "-10px",
                      left: "-10px",
                      position: "absolute",
                    }}
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke={primaryColor}
                      strokeWidth={borderWidth * 0.8}
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 45}
                      strokeDashoffset={2 * Math.PI * 45 * 0.5}
                    />
                  </svg>
                </div>
              </div>
              {/* Card */}
              <div className="p-8 pt-14" style={cardStyle}>
                {/* Quote content with optional quote marks */}
                <div className="mb-6">
                  {showQuotes && (
                    <span
                      className="text-4xl leading-none font-serif"
                      style={{ color: primaryColor, opacity: 0.3 }}
                    >
                      &ldquo;
                    </span>
                  )}
                  <p
                    className={`text-base leading-relaxed text-left ${
                      showQuotes ? "inline" : ""
                    }`}
                    style={{ color: textColor }}
                  >
                    {testimonial.content}
                  </p>
                  {showQuotes && (
                    <span
                      className="text-4xl leading-none font-serif"
                      style={{ color: primaryColor, opacity: 0.3 }}
                    >
                      &rdquo;
                    </span>
                  )}
                </div>
                <p
                  className="text-right font-semibold"
                  style={{ color: textColor }}
                >
                  {testimonial.name}
                </p>
                {/* Show role and company if available */}
                {(testimonial.role || testimonial.company) && (
                  <p
                    className="text-right text-sm mt-1"
                    style={{ color: secondaryColor }}
                  >
                    {testimonial.role}
                    {testimonial.role && testimonial.company ? " at " : ""}
                    {testimonial.company}
                  </p>
                )}

                {/* Star rating */}
                {showRatings && testimonial.rating && (
                  <div className="flex justify-end items-center mt-3 gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4"
                        fill={
                          star <= testimonial.rating! ? primaryColor : "none"
                        }
                        stroke={
                          star <= testimonial.rating!
                            ? primaryColor
                            : secondaryColor
                        }
                        strokeWidth="1"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    ))}
                    <span
                      className="text-xs ml-2 font-medium"
                      style={{ color: secondaryColor }}
                    >
                      {testimonial.rating}/5
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: index === currentIndex ? "32px" : "8px",
                height: "8px",
                backgroundColor:
                  index === currentIndex ? primaryColor : `${secondaryColor}60`,
              }}
              onMouseEnter={(e) => {
                if (index !== currentIndex) {
                  e.currentTarget.style.backgroundColor = `${secondaryColor}80`;
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentIndex) {
                  e.currentTarget.style.backgroundColor = `${secondaryColor}60`;
                }
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Instructions */}
        <p
          className="text-center text-sm mt-8"
          style={{ color: secondaryColor }}
        >
          Drag or swipe to see more testimonials
        </p>
      </div>
    </section>
  );
};

export default MinimalTestimonial;
