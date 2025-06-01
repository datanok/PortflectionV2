import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { ColorScheme } from '@/components/portfolioForms/types/ColorSchemes';

interface Project {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  type?: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  github?: string;
  demo?: string;
  tags?: string[]; // For backward compatibility
  tech?: string[];  // For backward compatibility
}

interface ProjectsProps {
  projects: Project[];
  theme: ColorScheme;
  onViewAll?: () => void;
  className?: string;
}

const ProjectCard = ({
  project,
  theme
}: {
  project: Project;
  theme: ColorScheme;
}) => {
  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-xl border transition-all hover:shadow-lg"
      style={{ 
        backgroundColor: theme.card,
        borderColor: theme.border,
        color: theme.body,
        height: '100%'
      }}
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: theme.accent }}
          >
            <span className="text-4xl font-bold opacity-20" style={{ color: theme.body }}>
              {project.title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold" style={{ color: theme.body }}>{project.title}</h3>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110"
                style={{ color: theme.primary }}
                aria-label="View on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110"
                style={{ color: theme.primary }}
                aria-label="View live demo"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        
        <p 
          className="mb-4 text-sm text-muted-foreground" 
          style={{ color: theme.bodySecondary }}
        >
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary"
              className="rounded-full text-xs font-medium px-2.5 py-1"
              style={{ 
                backgroundColor: `${theme.accent}15`,
                color: theme.body,
                borderColor: theme.border,
                fontSize: '0.7rem',
                textTransform: 'none'
              }}
            >
              {tech}
            </Badge>
          ))}
          {project.type && (
            <Badge 
              variant="outline"
              className="rounded-full text-xs font-medium px-2.5 py-1"
              style={{ 
                color: theme.bodySecondary,
                borderColor: theme.border,
                fontSize: '0.7rem',
                textTransform: 'none'
              }}
            >
              {project.type}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export const Projects = ({ 
  projects, 
  theme, 
  onViewAll,
  className = '' 
}: ProjectsProps) => {
  // Format projects to match our component's expected structure
  const formattedProjects = projects.map((project, index) => ({
    ...project,
    id: project.id || `project-${index}`,
    // Use technologies first, fall back to tags or tech for backward compatibility
    technologies: project.technologies || project.tags || project.tech || [],
    githubUrl: project.githubUrl || project.github,
    liveUrl: project.liveUrl || project.demo,
    // If no image is provided, we'll use a placeholder
    image: project.image || undefined
  }));

  // Filter featured projects if needed
  const featuredProjects = formattedProjects.filter(project => 
    project.featured !== false
  ).slice(0, 6);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section 
      id="projects" 
      className={`py-20 relative ${className}`}
      style={{ backgroundColor: theme.background }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <Badge 
            variant="secondary"
            className="mb-4 px-3 py-1 text-sm font-medium"
            style={{
              backgroundColor: `${theme.accent}15`,
              color: theme.body,
              borderColor: theme.border
            }}
          >
            Projects
          </Badge>
          <h2 
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-3"
            style={{ color: theme.body }}
          >
            Featured Work
          </h2>
          <p 
            className="text-muted-foreground max-w-2xl mx-auto text-base"
            style={{ color: theme.bodySecondary }}
          >
            Showcasing some of my best projects and technical achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              theme={theme}
            />
          ))}
        </div>

        {onViewAll && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={onViewAll}
              className="px-8 py-4 rounded-full group font-medium"
              style={{
                borderColor: theme.border,
                color: theme.body,
                backgroundColor: theme.muted,
                borderWidth: '1px',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              View All Projects
            </Button>
            {projects.length > featuredProjects.length && (
              <p className="text-sm mt-3" style={{ color: theme.bodySecondary }}>
                Showing {featuredProjects.length} of {projects.length} projects
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
