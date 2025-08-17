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

interface StatItem {
  number: string;
  label: string;
  icon?: string;
}

interface AboutTypographyProps {
  // Content Props
  title?: string;
  subtitle?: string;
  bio?: string;
  locationLabel?: string;
  location?: string;
  experienceLabel?: string;
  yearsExperience?: string;
  roleLabel?: string;
  currentRole?: string;
  timelineHeading?: string;
  timelineItems?: TimelineItem[];
  showStats?: boolean;
  stats?: StatItem[];
  showTimeline?: boolean;
  compactMode?: boolean;

  // Style Props
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  paddingY?: string | number;
  paddingX?: string | number;
  textAlign?: "left" | "center" | "right";
  titleFontSize?: string;
  titleFontWeight?: string;
  subtitleFontSize?: string;
  subtitleFontWeight?: string;
  bioFontSize?: string;
  borderRadius?: string | number;
  shadow?: string;

  // Global Theme
  globalTheme?: any;
}

const AboutTypography: React.FC<AboutTypographyProps> = ({
  // Defaults
  title = "ABOUT",
  subtitle = "WHO I AM",
  bio = "I'm a passionate full-stack developer with a love for clean, efficient code.",
  locationLabel = "Location",
  location = "Mumbai, India",
  experienceLabel = "Experience",
  yearsExperience = "8+",
  roleLabel = "Role",
  currentRole = "Senior Developer",
  timelineHeading = "Timeline",
  timelineItems = [
    {
      year: "2023",
      title: "Senior Full Stack Developer",
      company: "Tech Corp",
      description: "Leading scalable web applications",
      type: "work",
    },
    {
      year: "2021",
      title: "Frontend Developer",
      company: "StartupXYZ",
      description: "Built responsive user interfaces",
      type: "work",
    },
    {
      year: "2019",
      title: "Computer Science Degree",
      company: "University",
      description: "Graduated with honors",
      type: "education",
    },
  ],
  showStats = true,
  stats = [
    { number: "50+", label: "Projects", icon: "code" },
    { number: "8+", label: "Years", icon: "calendar" },
    { number: "25+", label: "Clients", icon: "users" },
    { number: "15+", label: "Awards", icon: "award" },
  ],
  showTimeline = true,
  compactMode = false,
  backgroundColor = "#ffffff",
  textColor = "#111827",
  primaryColor = "#000000",
  secondaryColor = "#6b7280",
  paddingY = "40",
  paddingX = "24",
  textAlign = "left",
  titleFontSize = "clamp(2rem, 4vw, 3rem)",
  titleFontWeight = "700",
  subtitleFontSize = "0.75rem",
  subtitleFontWeight = "500",
  bioFontSize = "1rem",
  borderRadius = "0",
  shadow = "none",
  globalTheme,
}) => {
  const containerStyles = {
    backgroundColor,
    color: textColor,
    padding: `${paddingY}px ${paddingX}px`,
    textAlign: textAlign,
    height: "auto",
    display: "flex",
    alignItems: "center",
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
      case "personal":
        return Palette;
      default:
        return Code;
    }
  };

  {
    console.log(compactMode);
  }
  return (
    <section className="relative" style={containerStyles}>
      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`grid ${
            compactMode
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2"
          } gap-12 lg:gap-16 h-full`}
        >
          {/* Main Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Header */}
            <div>
              {subtitle && (
                <div
                  className="text-xs uppercase tracking-[0.2em] mb-4 opacity-70"
                  style={{
                    color: secondaryColor,
                    fontSize: subtitleFontSize,
                    fontWeight: subtitleFontWeight,
                  }}
                >
                  {subtitle}
                </div>
              )}
              {title && (
                <h1
                  className="leading-tight mb-6"
                  style={{
                    color: primaryColor,
                    fontSize: titleFontSize,
                    fontWeight: titleFontWeight,
                    lineHeight: "1",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {title}
                </h1>
              )}
            </div>

            {/* Bio */}
            {bio && (
              <p
                className="leading-relaxed max-w-lg"
                style={{
                  color: textColor,
                  fontSize: bioFontSize,
                  lineHeight: "1.6",
                  opacity: 0.9,
                }}
              >
                {bio}
              </p>
            )}

            {/* Quick Info */}
            <div className="flex flex-wrap gap-8">
              {location && (
                <div className="flex items-center gap-2 group cursor-pointer">
                  <MapPin size={16} style={{ color: primaryColor }} />
                  <div>
                    <div
                      className="text-xs uppercase tracking-wide opacity-60"
                      style={{ color: secondaryColor }}
                    >
                      {locationLabel}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: textColor }}
                    >
                      {location}
                    </div>
                  </div>
                </div>
              )}
              {yearsExperience && (
                <div className="flex items-center gap-2 group cursor-pointer">
                  <Calendar size={16} style={{ color: primaryColor }} />
                  <div>
                    <div
                      className="text-xs uppercase tracking-wide opacity-60"
                      style={{ color: secondaryColor }}
                    >
                      {experienceLabel}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: textColor }}
                    >
                      {yearsExperience}
                    </div>
                  </div>
                </div>
              )}
              {currentRole && (
                <div className="flex items-center gap-2 group cursor-pointer">
                  <Code size={16} style={{ color: primaryColor }} />
                  <div>
                    <div
                      className="text-xs uppercase tracking-wide opacity-60"
                      style={{ color: secondaryColor }}
                    >
                      {roleLabel}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: textColor }}
                    >
                      {currentRole}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            {showStats && stats.length > 0 && (
              <div className="flex flex-wrap gap-6 pt-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon
                    ? getIconComponent(stat.icon)
                    : Code;
                  return (
                    <div key={index} className="flex items-center gap-3 group">
                      <IconComponent
                        size={20}
                        style={{ color: primaryColor }}
                        className="transition-transform group-hover:scale-110"
                      />
                      <div>
                        <div
                          className="text-xl font-bold leading-none"
                          style={{ color: primaryColor }}
                        >
                          {stat.number}
                        </div>
                        <div
                          className="text-xs uppercase tracking-wide opacity-70"
                          style={{ color: secondaryColor }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Timeline */}
          {showTimeline && timelineItems.length > 0 && !compactMode && (
            <div className="flex flex-col justify-center">
              {timelineHeading && (
                <div
                  className="text-xs uppercase tracking-[0.2em] mb-8 opacity-70"
                  style={{ color: secondaryColor }}
                >
                  {timelineHeading}
                </div>
              )}
              <div className="relative space-y-6">
                <div
                  className="absolute left-0 top-0 bottom-0 w-px opacity-20"
                  style={{ backgroundColor: primaryColor }}
                />

                {timelineItems.map((item, index) => {
                  const IconComponent = getTypeIcon(item.type);
                  return (
                    <div
                      key={index}
                      className="relative group hover:translate-x-1 transition-transform duration-200"
                    >
                      <div
                        className="absolute left-0 w-1.5 h-1.5 rounded-full transform -translate-x-1/2 mt-1.5"
                        style={{ backgroundColor: primaryColor }}
                      />

                      <div className="pl-6">
                        <div className="flex items-center gap-2 mb-1">
                          <IconComponent
                            size={14}
                            style={{ color: primaryColor }}
                          />
                          <span
                            className="text-xs font-mono font-semibold"
                            style={{ color: primaryColor }}
                          >
                            {item.year}
                          </span>
                        </div>

                        <h3
                          className="text-base font-semibold mb-1 leading-tight"
                          style={{ color: textColor }}
                        >
                          {item.title}
                        </h3>

                        {item.company && (
                          <div
                            className="text-xs mb-2 opacity-70"
                            style={{ color: secondaryColor }}
                          >
                            {item.company}
                          </div>
                        )}

                        <p
                          className="text-xs leading-relaxed opacity-80"
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

          {/* Compact Timeline */}
          {showTimeline && timelineItems.length > 0 && compactMode && (
            <div
              className="pt-8 border-t md:border-t-0 border-opacity-20"
              style={{ borderColor: primaryColor }}
            >
              {timelineHeading && (
                <div
                  className="text-xs uppercase tracking-[0.2em] mb-6 opacity-70"
                  style={{ color: secondaryColor }}
                >
                  {timelineHeading}
                </div>
              )}
              <div className="relative space-y-4">
                <div
                  className="absolute left-0 top-0 bottom-0 w-px opacity-20"
                  style={{ backgroundColor: primaryColor }}
                />

                {timelineItems.map((item, index) => {
                  const IconComponent = getTypeIcon(item.type);
                  return (
                    <div
                      key={index}
                      className="relative group hover:translate-x-1 transition-transform duration-200"
                    >
                      <div
                        className="absolute left-0 w-1.5 h-1.5 rounded-full transform -translate-x-1/2 mt-1"
                        style={{ backgroundColor: primaryColor }}
                      />

                      <div className="pl-6">
                        <div className="flex items-center gap-2 mb-1">
                          <IconComponent
                            size={12}
                            style={{ color: primaryColor }}
                          />
                          <span
                            className="text-xs font-mono font-semibold"
                            style={{ color: primaryColor }}
                          >
                            {item.year}
                          </span>
                        </div>

                        <h3
                          className="text-sm font-semibold mb-1"
                          style={{ color: textColor }}
                        >
                          {item.title}
                        </h3>

                        {item.company && (
                          <div
                            className="text-xs mb-1 opacity-70"
                            style={{ color: secondaryColor }}
                          >
                            {item.company}
                          </div>
                        )}

                        <p
                          className="text-xs leading-relaxed opacity-80"
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
      </div>
    </section>
  );
};

export default AboutTypography;
