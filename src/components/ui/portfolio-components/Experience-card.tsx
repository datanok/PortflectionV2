import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ExperienceItem {
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements?: string[];
  logo?: string;
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  theme?: any;
}

interface ExperienceTimelineProps {
  experience: ExperienceItem[];
  theme?: any;
}

const SectionHeader = ({ title, subtitle, theme }: SectionHeaderProps) => (
  <div className="mb-10 text-center">
    <h2 
      className="text-3xl font-bold mb-2"
      style={{
        color: theme?.primary || '#38a169',
        fontFamily: theme?.fontHeading || 'Nunito'
      }}
    >
      {title}
    </h2>
    <p 
      className="text-lg"
      style={{
        color: theme?.dark || '#22543d',
        fontFamily: theme?.fontBody || 'Roboto'
      }}
    >
      {subtitle}
    </p>
    <div 
      className="w-24 h-1 mx-auto mt-4 rounded"
      style={{
        backgroundColor: theme?.accent || '#68d391'
      }}
    />
  </div>
);

export function ExperienceTimeline({ experience, theme }: ExperienceTimelineProps) {
  return (
    <section
      style={{
        backgroundColor: theme?.background || '#e6fffa',
        padding: '4rem 0',
      }}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <SectionHeader
          title="Experience"
          subtitle="My professional journey"
          theme={theme}
        />

        {experience.length > 0 ? (
          <div className="relative">
            {/* Timeline Line */}
            <div 
              className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-1 hidden sm:block"
              style={{ backgroundColor: theme?.accent || '#68d391' }}
            />

            {experience.map((job, idx) => (
              <div 
                key={idx} 
                className={`mb-12 relative flex flex-col sm:flex-row ${
                  idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div 
                  className="absolute left-0 sm:left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full z-10 hidden sm:block"
                  style={{ 
                    backgroundColor: theme?.primary || '#38a169',
                    border: `3px solid ${theme?.light || '#f0fff4'}`,
                    top: '24px'
                  }}
                />

                {/* Date Badge - Mobile (always visible) / Desktop (only visible at start of timeline) */}
                <div className="sm:w-1/2 mb-4 sm:mb-0 sm:px-8 flex sm:justify-end items-start">
                  <Badge
                    className="text-sm py-1 px-3 hidden sm:block"
                    style={{
                      backgroundColor: theme?.secondary || '#ecc94b',
                      color: theme?.dark || '#22543d'
                    }}
                  >
                    {job.startDate} - {job.endDate || "Present"}
                  </Badge>
                </div>

                {/* Job Card */}
                <div className="sm:w-1/2 sm:px-8">
                  <Card
                    className="overflow-hidden transition-all duration-300 hover:shadow-md"
                    style={{
                      backgroundColor: theme?.card || '#c6f6d5',
                      borderColor: theme?.accent || '#68d391',
                      borderWidth: '1px',
                    }}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <h3
                          className="text-xl font-bold"
                          style={{
                            color: theme?.primary || '#38a169',
                            fontFamily: theme?.fontHeading || 'Nunito',
                          }}
                        >
                          {job.position}
                        </h3>
                        {job.logo && (
                          <div className="w-10 h-10 flex-shrink-0">
                            <img 
                              src={job.logo} 
                              alt={`${job.company} logo`} 
                              className="w-full h-full object-contain" 
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span
                          className="text-lg font-medium"
                          style={{
                            color: theme?.dark || '#22543d',
                            fontFamily: theme?.fontBody || 'Roboto',
                          }}
                        >
                          {job.company}
                        </span>
                        
                        <Badge
                          variant="outline"
                          className="sm:hidden"
                          style={{
                            backgroundColor: theme?.muted || '#f0fff4',
                            color: theme?.dark || '#22543d',
                            borderColor: theme?.accent || '#68d391',
                          }}
                        >
                          {job.startDate} - {job.endDate || "Present"}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p
                        className="mb-4"
                        style={{
                          color: theme?.dark || '#22543d',
                          fontFamily: theme?.fontBody || 'Roboto',
                        }}
                      >
                        {job.description}
                      </p>

                      {job.achievements && job.achievements.length > 0 && (
                        <>
                          <Separator 
                            className="my-3" 
                            style={{ backgroundColor: theme?.accent || '#68d391', opacity: 0.4 }} 
                          />
                          
                          <div className="mt-2">
                            <h4
                              className="font-semibold mb-2"
                              style={{
                                color: theme?.dark || '#22543d',
                                fontFamily: theme?.fontHeading || 'Nunito',
                              }}
                            >
                              Key Achievements
                            </h4>
                            
                            <ul className="space-y-2">
                              {job.achievements.map((achievement, i) => (
                                <li 
                                  key={i}
                                  className="flex items-start"
                                >
                                  <span
                                    className="mr-2 mt-1 inline-block w-2 h-2 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: theme?.accent || '#68d391' }}
                                  />
                                  <span
                                    style={{
                                      color: theme?.dark || '#22543d',
                                      fontFamily: theme?.fontBody || 'Roboto',
                                    }}
                                  >
                                    {achievement}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            className="text-center p-8 rounded-lg"
            style={{
              backgroundColor: theme?.card || '#c6f6d5',
              color: theme?.dark || '#22543d',
              fontFamily: theme?.fontBody || 'Roboto',
            }}
          >
            No experience added yet.
          </div>
        )}
      </div>
    </section>
  );
}