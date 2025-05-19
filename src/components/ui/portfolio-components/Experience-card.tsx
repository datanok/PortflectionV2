import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "./SectionHeader";
import { ChevronRight, Briefcase, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Image from 'next/image'
interface ExperienceItem {
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements?: string[];
  logo?: string;
}

interface ExperienceTimelineProps {
  experience: ExperienceItem[];
  theme?: any;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export function ExperienceTimeline({ experience, theme }: ExperienceTimelineProps) {
  return (
    <section
      className="py-20"
      style={{
        backgroundColor: theme?.muted,
      }}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <SectionHeader
          title="Experience"
          subtitle="A timeline of my professional career and key accomplishments"
          theme={theme}
        />

        {experience.length > 0 ? (
          <motion.div 
            className="relative space-y-14"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Timeline Line */}
            <div 
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 hidden md:block"
              style={{ backgroundColor: theme?.accent ? `${theme.accent}50` : '#68d39150' }}
            />

            {experience.map((job, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants} 
                className="relative group"
              >
                {/* Timeline Node */}
                <div 
                  className="absolute hidden md:flex items-center justify-center left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full z-20"
                  style={{ 
                    backgroundColor: theme?.background || '#e6fffa',
                    border: `2px solid ${theme?.accent || '#68d391'}`,
                    top: '32px',
                    boxShadow: `0 0 0 6px ${theme?.background || '#e6fffa'}`
                  }}
                >
                  {job.logo ? (
                    <img
                      src={job.logo} 
                      alt={`${job.company} logo`} 
                      className="w-6 h-6 object-contain rounded-sm" 
                    />
                  ) : (
                    <Briefcase 
                      className="w-5 h-5" 
                      style={{ color: theme?.primary || '#38a169' }}
                    />
                  )}
                </div>

                <div className={`flex flex-col md:flex-row md:items-stretch ${
                  idx % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}>
                  {/* Date Column */}
                  <div className="md:w-1/2 pl-20 md:pl-0 md:pr-16 md:text-right mb-4 md:mb-0 relative">
                    <div 
                      className="absolute top-0 left-0 w-12 h-12 rounded-full flex items-center justify-center md:hidden"
                      style={{ 
                        backgroundColor: theme?.accent ? `${theme.accent}15` : '#68d39115',
                      }}
                    >
                      {job.logo ? (
                        <img
                          src={job.logo} 
                          alt={`${job.company} logo`} 
                          className="w-6 h-6 object-contain rounded-sm" 
                        />
                      ) : (
                        <Briefcase 
                          className="w-5 h-5" 
                          style={{ color: theme?.primary || '#38a169' }}
                        />
                      )}
                    </div>

                    <h3
                      className="text-xl md:text-2xl font-bold mb-2"
                      style={{
                        color: theme?.primary || '#38a169',
                        fontFamily: theme?.fontHeading || 'Nunito',
                      }}
                    >
                      {job.position}
                    </h3>
                    
                    <h4
                      className="text-lg mb-3"
                      style={{
                        color: theme?.dark || '#22543d',
                        fontFamily: theme?.fontBody || 'Roboto',
                      }}
                    >
                      {job.company}
                    </h4>

                    <div className="flex items-center md:justify-end mb-4">
                      <Badge
                        className="py-1.5 px-3 rounded-full text-sm font-medium flex items-center"
                        style={{
                          backgroundColor: theme?.secondary ? `${theme.secondary}20` : '#ecc94b20',
                          color: theme?.secondary || '#ecc94b',
                          borderColor: theme?.secondary ? `${theme.secondary}30` : '#ecc94b30',
                        }}
                      >
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        {job.startDate} - {job.endDate || "Present"}
                      </Badge>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                    <Card
                      className="overflow-hidden transition-all duration-300 group-hover:shadow-lg border-0"
                      style={{
                        backgroundColor: theme?.card || '#c6f6d5',
                        borderRadius: '12px',
                        boxShadow: `0 4px 20px ${theme?.accent ? `${theme.accent}15` : 'rgba(104, 211, 145, 0.15)'}`,
                      }}
                    >
                      <CardContent className="p-6 md:p-8">
                        <p
                          className="mb-6 leading-relaxed"
                          style={{
                            color: theme?.dark || '#22543d',
                            fontFamily: theme?.fontBody || 'Roboto',
                          }}
                        >
                          {job.description}
                        </p>

                        {job.achievements && job.achievements.length > 0 && (
                          <div className="mt-4">
                            <h4
                              className="font-bold mb-4 flex items-center"
                              style={{
                                color: theme?.primary || '#38a169',
                                fontFamily: theme?.fontHeading || 'Nunito',
                              }}
                            >
                              Key Achievements
                            </h4>
                            
                            <ul className="space-y-3">
                              {job.achievements.map((achievement, i) => (
                                <li 
                                  key={i}
                                  className="flex items-start"
                                >
                                  <ChevronRight 
                                    className="mr-2 mt-1 w-4 h-4 flex-shrink-0"
                                    style={{ color: theme?.accent || '#68d391' }}
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
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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