import { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const defaultTheme = {
  primary: "#38a169",
  secondary: "#ecc94b",
  dark: "#22543d",
  light: "#f0fff4",
  background: "#e6fffa",
  card: "#c6f6d5",
  muted: "#f0fff4",
  accent: "#68d391",
  fontHeading: "Nunito",
  fontBody: "Roboto"
};

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  githubLink?: string;
  liveDemo?: string;
  technologies?: string[];
  roles?: string[];
  challenges?: string;
  learnings?: string;
  type?: string;
  className?: string;
  theme?: typeof defaultTheme;
}

export function ProjectCard({
  title,
  description,
  image,
  githubLink,
  liveDemo,
  technologies = [],
  roles = [],
  challenges,
  learnings,
  type,
  className,
  theme = defaultTheme
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-md ${className}`}
      style={{ 
        backgroundColor: theme.card,
        borderColor: theme.accent,
        fontFamily: theme.fontBody
      }}
    >
      {/* Image Section */}
      {image && (
        <div className="relative h-56 w-full overflow-hidden">
          <div style={{ backgroundColor: theme.muted }} className="absolute inset-0">
            <Image
              src={image || "/api/placeholder/400/320"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          {type && (
            <div className="absolute top-4 left-4">
              <Badge 
                style={{
                  backgroundColor: theme.accent,
                  color: theme.light
                }}
              >
                {type}
              </Badge>
            </div>
          )}
        </div>
      )}

      {/* Header with Title and Links */}
      <CardHeader className="flex flex-row items-start justify-between p-6 pb-2">
        <h3 
          className="text-xl font-bold"
          style={{ 
            color: theme.dark,
            fontFamily: theme.fontHeading
          }}
        >
          {title}
        </h3>
        
        <div className="flex space-x-2">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: theme.primary }}
              className="transition-opacity hover:opacity-80"
              aria-label="GitHub Repository"
            >
              <Github size={20} />
            </a>
          )}
          
          {liveDemo && (
            <a
              href={liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: theme.primary }}
              className="transition-opacity hover:opacity-80"
              aria-label="Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </CardHeader>

      {/* Main Content */}
      <CardContent className="p-6 pt-0">
        {/* Description */}
        <p 
          className="mb-4 line-clamp-3"
          style={{ 
            color: theme.dark,
            fontFamily: theme.fontBody
          }}
        >
          {description}
        </p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, idx) => (
              <Badge
                key={idx}
                variant="outline"
                style={{
                  backgroundColor: theme.muted,
                  color: theme.dark,
                  borderColor: theme.accent
                }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {/* Expandable Details */}
        {(roles.length > 0 || challenges || learnings) && (
          <>
            <Button
              size="sm"
              className="p-0 h-auto"
              onClick={() => setExpanded(!expanded)}
              style={{
                color: theme.primary,
                backgroundColor: theme.muted,
                fontFamily: theme.fontBody
              }}
            >
              <span>
                {expanded ? "Hide details" : "View details"}
              </span>
              {expanded ? (
                <ChevronUp size={16} className="ml-1" />
              ) : (
                <ChevronDown size={16} className="ml-1" />
              )}
            </Button>

            {expanded && (
          <div
          className={`mt-4 overflow-hidden transition-all duration-300 ${
            expanded ? "max-h-96 overflow-y-auto" : "max-h-0"
          }`}
        >
                <Separator style={{ backgroundColor: theme.accent, opacity: 0.3 }} />
                
                {roles.length > 0 && (
                  <div className="pt-2">
                    <h4 
                      className="font-semibold mb-1"
                      style={{ 
                        color: theme.dark, 
                        fontFamily: theme.fontHeading
                      }}
                    >
                      My Role
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ 
                        color: theme.dark,
                        fontFamily: theme.fontBody
                      }}
                    >
                      {roles.join(", ")}
                    </p>
                  </div>
                )}

                {challenges && (
                  <div>
                    <h4 
                      className="font-semibold mb-1"
                      style={{ 
                        color: theme.dark, 
                        fontFamily: theme.fontHeading
                      }}
                    >
                      Challenges
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ 
                        color: theme.dark,
                        fontFamily: theme.fontBody
                      }}
                    >
                      {challenges}
                    </p>
                  </div>
                )}

                {learnings && (
                  <div>
                    <h4 
                      className="font-semibold mb-1"
                      style={{ 
                        color: theme.dark, 
                        fontFamily: theme.fontHeading
                      }}
                    >
                      Key Learnings
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ 
                        color: theme.dark,
                        fontFamily: theme.fontBody
                      }}
                    >
                      {learnings}
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}