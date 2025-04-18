"use client"

import { ProjectCard } from '@/components/ui/portfolio-components/project-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Github, Mail, MapPin } from 'lucide-react';
import { usePortfolioData } from '@/components/PortfolioProvider';
import { SectionHeader } from '@/components/ui/portfolio-components/section-header';
import { SocialIcons } from '@/components/ui/portfolio-components/social-icons';

export default function Developer() {
  const portfolio = usePortfolioData();

  const {
    name,
    title,
    about,
    profileImage,
    location,
    email,
    githubLink,
    socials,
    extraData = {}
  } = portfolio;

  const {
    experience = [],
    education = [],
    skills = [],
    projects = []
  } = extraData;
  const modifiedSocials = Object.entries(socials).map(([type, url]) => ({
    type,
    url,
    username: url.split('/').pop() ?? '',
  }));
  

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/5 py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:order-2 w-full md:w-1/3 flex justify-center">
              <Avatar className="w-48 h-48 border-4 border-primary/10">
                <AvatarImage src={profileImage} alt={name} />
                <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="md:order-1 w-full md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{name}</h1>
              <h2 className="text-2xl text-primary font-medium mb-4">{title}</h2>
              <p className="text-lg mb-6">{about}</p>
              <div className="flex flex-wrap items-center gap-4">
                {email && (
                  <Button className="flex gap-2 items-center" asChild>
                    <a href={`mailto:${email}`}>
                      <Mail className="h-4 w-4" />
                      Contact Me
                    </a>
                  </Button>
                )}
                {githubLink && (
                  <Button variant="outline" className="flex gap-2 items-center" asChild>
                    <a href={githubLink} target="_blank">
                      <Github className="h-4 w-4" />
                      View GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center md:justify-start items-center gap-6">
            {location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {location}
              </div>
            )}
            <SocialIcons socials={modifiedSocials} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeader title="Projects" subtitle="Check out some of my recent work" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                url={project.liveDemo}
                tags={project.technologies}
                githubLink={project.githubLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeader title="Skills & Expertise" subtitle="Technologies and tools I specialize in" />
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <div key={i} className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeader title="Experience" subtitle="My work history and roles" />
          <div className="space-y-8">
            {experience.length > 0 ? experience.map((job, idx) => (
              <div key={idx} className="p-6 bg-card rounded-lg shadow">
                <h3 className="text-xl font-semibold">{job.position} @ {job.company}</h3>
                <div className="text-muted-foreground text-sm mb-1">
                  {job.startDate} - {job.endDate || "Present"}
                </div>
                <p className="mb-2">{job.description}</p>
                {job.achievements && job.achievements.length > 0 && (
                  <ul className="list-disc pl-5">
                    {job.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            )) : <div className="text-muted-foreground">No experience added yet.</div>}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeader title="Education" subtitle="My academic background" />
          <div className="space-y-6">
            {education.length > 0 ? education.map((edu, idx) => (
              <div key={idx} className="p-6 bg-card rounded-lg shadow">
                <h3 className="text-lg font-semibold">{edu.degree} @ {edu.institution}</h3>
                <div className="text-muted-foreground text-sm mb-1">
                  {edu.startDate} - {edu.endDate || "Present"}
                </div>
                <p>{edu.description}</p>
              </div>
            )) : <div className="text-muted-foreground">No education added yet.</div>}
          </div>
        </div>
      </section>
    </div>
  );
}
