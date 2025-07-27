import React from "react";
import {
  MapPin,
  Calendar,
  Award,
  Coffee,
  Code,
  Palette,
  Users,
  BookOpen,
} from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  company?: string;
  description: string;
  type: "education" | "work" | "achievement" | "personal";
}

interface AboutTypographyProps {
  // Content Props
  title?: string;
  subtitle?: string;
  bio?: string;
  location?: string;
  yearsExperience?: string;
  currentRole?: string;
  timelineItems?: TimelineItem[];
  showStats?: boolean;
  stats?: Array<{ number: string; label: string; icon?: string }>;
  showTimeline?: boolean;
  compactMode?: boolean;

  // Style Props
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
  shadow?: string;

  // Global Theme
  globalTheme?: any;
}

const AboutTypography: React.FC<AboutTypographyProps> = ({
  title = "ABOUT",
  subtitle = "WHO I AM",
  bio = "I'm a passionate full-stack developer with a keen eye for design and a love for clean, efficient code. My journey in tech began over 8 years ago, and I've been fortunate to work with amazing teams building products that impact thousands of users daily.",
  location = "Mumbai, India",
  yearsExperience = "8+",
  currentRole = "Senior Developer",
  timelineItems = [
    {
      year: "2024",
      title: "Senior Full Stack Developer",
      company: "Tech Corp",
      description:
        "Leading development of scalable web applications using React, Node.js, and cloud technologies.",
      type: "work",
    },
    {
      year: "2022",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      description:
        "Built entire product from ground up, implemented CI/CD pipelines and mentored junior developers.",
      type: "work",
    },
    {
      year: "2020",
      title: "Frontend Developer",
      company: "Digital Agency",
      description:
        "Created responsive web applications and collaborated with design teams on user experience.",
      type: "work",
    },
    {
      year: "2016",
      title: "Computer Science Degree",
      company: "University of Mumbai",
      description:
        "Graduated with honors, focused on software engineering and web technologies.",
      type: "education",
    },
  ],
  showStats = true,
  stats = [
    { number: "50+", label: "Projects", icon: "code" },
    { number: "8+", label: "Years", icon: "calendar" },
    { number: "15+", label: "Clients", icon: "users" },
    { number: "∞", label: "Coffee", icon: "coffee" },
  ],
  showTimeline = true,
  compactMode = false,
  backgroundColor = "#ffffff",
  textColor = "#111827",
  primaryColor = "#000000",
  secondaryColor = "#6b7280",
  paddingY = "120",
  paddingX = "32",
  textAlign = "left",
  fontSize = "4xl",
  fontWeight = "black",
  borderRadius = "0",
  shadow = "none",
  globalTheme,
}) => {
  const containerStyles = {
    backgroundColor,
    color: textColor,
    borderRadius: borderRadius !== "0" ? `${borderRadius}px` : "0px",
    boxShadow: shadow !== "none" ? shadow : "none",
  };

  const titleStyles = {
    color: primaryColor,
    fontSize: fontSize === "4xl" ? "clamp(3rem, 8vw, 8rem)" : fontSize,
    fontWeight: fontWeight === "black" ? "900" : fontWeight,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    lineHeight: "0.85",
    letterSpacing: "-0.02em",
  };

  const subtitleStyles = {
    color: secondaryColor,
    fontSize: "1.5rem",
    fontWeight: "400",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
  };

  const bioStyles = {
    color: textColor,
    fontSize: "1.25rem",
    lineHeight: "1.8",
    fontWeight: "400",
  };

  const getIconComponent = (iconName: string) => {
    const iconMap = {
      code: Code,
      calendar: Calendar,
      users: Users,
      coffee: Coffee,
      award: Award,
      book: BookOpen,
      palette: Palette,
      mappin: MapPin,
    };
    return iconMap[iconName as keyof typeof iconMap] || Code;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "education":
        return BookOpen;
      case "work":
        return Code;
      case "achievement":
        return Award;
      default:
        return Code;
    }
  };

  return (
    <section
      className={`py-${paddingY} px-${paddingX} relative`}
      style={containerStyles}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid ${
            compactMode ? "grid-cols-1" : "lg:grid-cols-12"
          } gap-16`}
        >
          {/* Left Column - Main Content */}
          <div className={compactMode ? "col-span-1" : "lg:col-span-7"}>
            {/* Header */}
            <div className={`mb-16 text-${textAlign}`}>
              <h2 className="mb-4 tracking-tighter" style={titleStyles}>
                {title}
              </h2>
              <p className="mb-8" style={subtitleStyles}>
                {subtitle}
              </p>
            </div>

            {/* Bio */}
            <div className="mb-16">
              <p className="max-w-4xl" style={bioStyles}>
                {bio}
              </p>
            </div>

            {/* Stats */}
            {showStats && (
              <div className="mb-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon
                      ? getIconComponent(stat.icon)
                      : Code;
                    return (
                      <div key={index} className="text-center group">
                        <div className="mb-4 flex justify-center">
                          <IconComponent
                            size={24}
                            style={{ color: primaryColor }}
                            className="group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div
                          className="text-4xl font-black mb-2"
                          style={{
                            color: primaryColor,
                            fontFamily:
                              "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                          }}
                        >
                          {stat.number}
                        </div>
                        <div
                          className="text-sm uppercase tracking-widest"
                          style={{ color: secondaryColor }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Info */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="flex items-center gap-3">
                <MapPin size={20} style={{ color: primaryColor }} />
                <div>
                  <div
                    className="text-sm uppercase tracking-widest mb-1"
                    style={{ color: secondaryColor }}
                  >
                    Location
                  </div>
                  <div style={{ color: textColor }}>{location}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar size={20} style={{ color: primaryColor }} />
                <div>
                  <div
                    className="text-sm uppercase tracking-widest mb-1"
                    style={{ color: secondaryColor }}
                  >
                    Experience
                  </div>
                  <div style={{ color: textColor }}>
                    {yearsExperience} Years
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Code size={20} style={{ color: primaryColor }} />
                <div>
                  <div
                    className="text-sm uppercase tracking-widest mb-1"
                    style={{ color: secondaryColor }}
                  >
                    Role
                  </div>
                  <div style={{ color: textColor }}>{currentRole}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Timeline */}
          {showTimeline && !compactMode && (
            <div className="lg:col-span-5">
              <div
                className="text-2xl font-black mb-8 uppercase tracking-wider"
                style={{
                  color: primaryColor,
                  fontFamily:
                    "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                }}
              >
                Journey
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div
                  className="absolute left-6 top-0 bottom-0 w-px"
                  style={{ backgroundColor: `${primaryColor}20` }}
                />

                {timelineItems.map((item, index) => {
                  const IconComponent = getTypeIcon(item.type);
                  return (
                    <div
                      key={index}
                      className="relative flex gap-6 pb-12 last:pb-0"
                    >
                      {/* Icon */}
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center z-10"
                        style={{
                          backgroundColor: backgroundColor,
                          borderColor: primaryColor,
                        }}
                      >
                        <IconComponent
                          size={16}
                          style={{ color: primaryColor }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <div
                          className="text-sm font-bold mb-1 tracking-widest"
                          style={{
                            color: primaryColor,
                            fontFamily:
                              "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                          }}
                        >
                          {item.year}
                        </div>
                        <h3
                          className="text-lg font-bold mb-1"
                          style={{ color: textColor }}
                        >
                          {item.title}
                        </h3>
                        {item.company && (
                          <div
                            className="text-sm mb-3 uppercase tracking-wider"
                            style={{ color: secondaryColor }}
                          >
                            {item.company}
                          </div>
                        )}
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: secondaryColor }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Full-width Timeline for compact mode */}
        {showTimeline && compactMode && (
          <div className="mt-16">
            <div
              className="text-3xl font-black mb-12 text-center uppercase tracking-wider"
              style={{
                color: primaryColor,
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
              }}
            >
              Journey
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div
                  className="absolute left-6 top-0 bottom-0 w-px md:left-1/2 md:transform md:-translate-x-px"
                  style={{ backgroundColor: `${primaryColor}20` }}
                />

                {timelineItems.map((item, index) => {
                  const IconComponent = getTypeIcon(item.type);
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={index}
                      className={`relative flex gap-6 pb-12 last:pb-0 md:justify-${
                        isEven ? "start" : "end"
                      }`}
                    >
                      <div
                        className={`md:w-1/2 ${
                          isEven ? "md:pr-8" : "md:pl-8 md:order-2"
                        }`}
                      >
                        <div className="flex gap-6 md:flex-row-reverse md:text-right">
                          {/* Icon */}
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 md:absolute md:left-1/2 md:transform md:-translate-x-1/2"
                            style={{
                              backgroundColor: backgroundColor,
                              borderColor: primaryColor,
                            }}
                          >
                            <IconComponent
                              size={16}
                              style={{ color: primaryColor }}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 pt-2">
                            <div
                              className="text-sm font-bold mb-1 tracking-widest"
                              style={{
                                color: primaryColor,
                                fontFamily:
                                  "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                              }}
                            >
                              {item.year}
                            </div>
                            <h3
                              className="text-lg font-bold mb-1"
                              style={{ color: textColor }}
                            >
                              {item.title}
                            </h3>
                            {item.company && (
                              <div
                                className="text-sm mb-3 uppercase tracking-wider"
                                style={{ color: secondaryColor }}
                              >
                                {item.company}
                              </div>
                            )}
                            <p
                              className="text-sm leading-relaxed"
                              style={{ color: secondaryColor }}
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Bottom accent line */}
        <div className="mt-24 flex justify-center">
          <div className="w-24 h-1" style={{ backgroundColor: primaryColor }} />
        </div>
      </div>
    </section>
  );
};

export default AboutTypography;
