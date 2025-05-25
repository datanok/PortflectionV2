import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { ColorScheme } from '@/components/portfolioForms/types/ColorSchemes';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  tech?: string[]; // For backward compatibility
  github?: string;  // For backward compatibility
  demo?: string;    // For backward compatibility
}

interface ProjectsProps {
  projects: Project[];
  theme: ColorScheme;
  onViewAll?: () => void;
  className?: string;
}

export const Projects = ({ 
  projects, 
  theme, 
  onViewAll, 
  className = '' 
}: ProjectsProps) => {
  // Handle backward compatibility
  const formattedProjects = projects.map(project => ({
    ...project,
    tags: project.tags || project.tech || [],
    githubUrl: project.githubUrl || project.github,
    liveUrl: project.liveUrl || project.demo
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
      className={`py-24 relative ${className}`}
      style={{ backgroundColor: theme.background }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" 
            style={{ color: theme.body }}
          >
            Featured Work
          </h2>
          <p 
            className="text-lg sm:text-xl max-w-3xl mx-auto" 
            style={{ color: theme.bodySecondary }}
          >
            A selection of my favorite projects I&apos;ve worked on
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProjects.map((project) => (
            <Card 
              key={project.id}
              className="group border-0 overflow-hidden transition-all duration-300 hover:shadow-2xl"
              style={{ 
                backgroundColor: theme.card,
                borderColor: theme.border
              }}
            >
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ 
                    backgroundImage: project.image ? `url(${project.image})` : `linear-gradient(135deg, ${theme.accent}20, ${theme.primary}20)`
                  }}
                >
                  {!project.image && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span 
                        className="text-4xl font-bold opacity-10" 
                        style={{ color: theme.primary }}
                      >
                        {project.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:scale-110 transition-all duration-200"
                        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                        aria-label="View on GitHub"
                      >
                        <Github className="w-4 h-4 text-white" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:scale-110 transition-all duration-200"
                        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                        aria-label="View live demo"
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-3 px-6 pt-6">
                <CardTitle 
                  className="text-xl font-semibold line-clamp-2" 
                  style={{ color: theme.body }}
                >
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="px-6 pb-6 pt-0">
                <p 
                  className="mb-4 text-sm line-clamp-3" 
                  style={{ color: theme.bodySecondary }}
                >
                  {project.description}
                </p>
                
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs font-medium px-2 py-1 rounded-md"
                        style={{ 
                          backgroundColor: theme.muted,
                          color: theme.bodySecondary,
                          borderColor: theme.border
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge 
                        variant="outline"
                        className="text-xs font-medium px-2 py-1 rounded-md"
                        style={{ 
                          color: theme.bodySecondary,
                          borderColor: theme.border
                        }}
                      >
                        +{project.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: `1px solid ${theme.border}20` }}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="group-hover:underline p-0 h-auto font-medium"
                    style={{ 
                      color: theme.accent,
                      backgroundColor: 'transparent',
                      padding: 0
                    }}
                  >
                    View Project
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {(onViewAll || projects.length > featuredProjects.length) && (
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
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
