"use client"

import { ProjectCard } from '@/components/ui/portfolio-components/project-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Github, Mail, MapPin } from 'lucide-react';
import { usePortfolioData } from '@/components/PortfolioProvider';
import { SectionHeader } from '@/components/ui/portfolio-components/section-header';
import { SocialIcons } from '@/components/ui/portfolio-components/social-icons';
import { ExperienceTimeline } from '@/components/ui/portfolio-components/Experience-card';

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
    theme,
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
    <div
      style={{
        backgroundColor: theme?.background || theme?.light || '#f8fafc',
        color: theme?.dark || '#2d3748',
        fontFamily: theme?.fontBody || 'Open Sans',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: theme?.card || theme?.light || '#f7fafc',
          padding: '2rem',
        }}
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:order-2 w-full md:w-1/3 flex justify-center">
              <Avatar className="w-48 h-48 border-4 border-primary/10">
                <AvatarImage src={profileImage} alt={name} />
                <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="md:order-1 w-full md:w-2/3">
              <SectionHeader
                title={name}
                subtitle={title}
                theme={theme}
              />
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
            <SocialIcons socials={modifiedSocials} theme={theme} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        style={{
          backgroundColor: theme?.background || theme?.light || '#f8fafc',
          padding: '2rem',
        }}
      >
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeader
            title="Projects"
            subtitle="Check out some of my recent work"
            theme={theme}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        style={{
          backgroundColor: theme?.muted || theme?.light || '#f7fafc',
          padding: '2rem',
        }}
      >
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeader
            title="Skills & Expertise"
            subtitle="Technologies and tools I specialize in"
            theme={theme}
          />
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <div key={i} className="px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: theme?.card || theme?.light || '#f7fafc',
                color: theme?.dark || '#2d3748',
                fontFamily: theme?.fontBody || 'Open Sans',
              }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {/* <section
        style={{
          backgroundColor: theme?.background || theme?.light || '#f8fafc',
          padding: '2rem',
        }}
      >
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeader
            title="Experience"
            subtitle="My work history and roles"
            theme={theme}
          />
          <div className="space-y-8">
            {experience.length > 0 ? experience.map((job, idx) => (
              <div key={idx} className="p-6 rounded-lg shadow"
              style={{
                backgroundColor: theme?.card || theme?.light || '#f7fafc',
                color: theme?.dark || '#2d3748',
              }}
              >
                <h3
                  style={{
                    color: theme?.primary || '#4fd1c5',
                    fontFamily: theme?.fontHeading || 'Montserrat',
                  }}
                  className="text-xl font-semibold"
                >
                  {job.position} @ {job.company}
                </h3>
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
      </section> */}
      <ExperienceTimeline theme={theme} experience={experience} />

      {/* Education Section */}
      <section
        style={{
          backgroundColor: theme?.muted || theme?.light || '#f7fafc',
          padding: '2rem',
        }}
      >
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeader
            title="Education"
            subtitle="My academic background"
            theme={theme}
          />
          <div className="space-y-6">
            {education.length > 0 ? education.map((edu, idx) => (
              <div key={idx} className="p-6 rounded-lg shadow"
              style={{backgroundColor: theme?.card || theme?.light || '#f7fafc',
                color: theme?.dark || '#2d3748',
              }}
              >
                <h3
                  style={{
                    color: theme?.primary || '#4fd1c5',
                    fontFamily: theme?.fontHeading || 'Montserrat',
                  }}
                  className="text-lg font-semibold"
                >
                  {edu.degree} @ {edu.institution}
                </h3>
                <div
                style={{
                  color: theme?.accent || '#4fd1c5',
                  fontFamily: theme?.fontBody || 'Open Sans',
                }}
                 className="text-sm mb-1">
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
