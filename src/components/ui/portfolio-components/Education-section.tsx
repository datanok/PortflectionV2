"use Client"
import { useState, useEffect } from "react";
import { Calendar, MapPin, GraduationCap, ChevronRight } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  achievements?: string[];
  gpa?: string;
  logo?: string;
  fieldOfStudy?: string;
}

interface EducationSectionProps {
  education: EducationItem[];
  theme?: any;
}

export default function EducationSection({ education, theme }: EducationSectionProps) {
  const [animateItems, setAnimateItems] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimateItems(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="py-16 md:py-24 relative"
      style={{
        backgroundColor: theme?.background || "#ffffff",
      }}
    >
    
    <div className="absolute w-full h-full top-0 left-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full" style={{ background: theme.primary }} />
        <div className="absolute bottom-16 left-20 w-56 h-56 rounded-full" style={{ background: theme.secondary }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full" 
             style={{ background: theme.primary, opacity: 0.2 }} />
        
    
      </div>
      <div className="container max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span 
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{
              backgroundColor: theme?.primary ? `${theme.primary}10` : "#3490dc10",
              color: theme?.primary || "#3490dc",
            }}
          >
            <GraduationCap className="inline mr-2" size={16} />
            Academic Journey
          </span>
          
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: theme?.fontHeading || "Montserrat",
              color: theme?.dark || "#1a202c",
            }}
          >
            Education & Qualifications
          </h2>
          
          <p
            className="text-lg text-gray-500 max-w-2xl mx-auto"
            style={{
              fontFamily: theme?.fontBody || "Open Sans",
            }}
          >
            My formal education and specialized training that shaped my expertise
          </p>
        </div>

        {education.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, idx) => (
              <div 
                key={idx}
                className={`transform transition-all duration-500 ease-out ${
                  animateItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div 
                  className="h-full rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2"
                  style={{
                    backgroundColor: theme?.card || "#f8fafc",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
                    border: `1px solid ${theme?.accent || "#e0e7ff"}`,
                  }}
                >
                  <div className="p-6 md:p-8 flex flex-col h-full">
                    {/* Institution header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div 
                        className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${theme?.primary || "#3490dc"}10, ${theme?.secondary || "#4fd1c5"}10)`,
                        }}
                      >
                        {edu.logo ? (
                          <img 
                            src={edu.logo} 
                            alt={`${edu.institution} logo`} 
                            className="w-8 h-8 object-contain" 
                          />
                        ) : (
                          <GraduationCap 
                            size={20}
                            style={{ color: theme?.primary || "#3490dc" }}
                          />
                        )}
                      </div>
                      
                      <div>
                        <h3
                          className="text-xl font-bold"
                          style={{
                            color: theme?.dark || "#1a202c",
                            fontFamily: theme?.fontHeading || "Montserrat",
                          }}
                        >
                          {edu.institution}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {edu.startDate} — {edu.endDate || "Present"}
                          {edu.location && (
                            <>
                              <span className="mx-2">•</span>
                              <MapPin className="w-4 h-4 mr-1" />
                              {edu.location}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Degree details */}
                    <div className="flex-grow">
                      <h4
                        className="text-lg font-semibold mb-2"
                        style={{
                          color: theme?.primary || "#3490dc",
                        }}
                      >
                        {edu.degree}
                      </h4>
                      
                      {edu.fieldOfStudy && (
                        <p 
                          className="text-sm text-gray-600 mb-4"
                          style={{
                            fontFamily: theme?.fontBody || "Open Sans",
                          }}
                        >
                          {edu.fieldOfStudy}
                        </p>
                      )}
                      
                      {edu.description && (
                        <p
                          className="text-gray-600 mb-5"
                          style={{
                            fontFamily: theme?.fontBody || "Open Sans",
                          }}
                        >
                          {edu.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Footer with achievements and GPA */}
                    <div className="mt-auto">
                      {edu.gpa && (
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-gray-500">Performance</span>
                          <span 
                            className="px-3 py-1 rounded-full text-sm font-semibold"
                            style={{
                              backgroundColor: theme?.primary ? `${theme.primary}10` : "#3490dc10",
                              color: theme?.primary || "#3490dc",
                            }}
                          >
                            GPA: {edu.gpa}
                          </span>
                        </div>
                      )}
                      
                      {edu.achievements && edu.achievements.length > 0 && (
                        <div className="pt-4 border-t" style={{ borderColor: theme?.accent || "#e0e7ff" }}>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-500">Key Achievements</span>
                            <ChevronRight 
                              size={16} 
                              className="text-gray-400 group-hover:translate-x-1 transition-transform" 
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            {edu.achievements.slice(0, 2).map((achievement, i) => (
                              <div 
                                key={i}
                                className="text-xs px-3 py-1.5 rounded-lg truncate"
                                style={{
                                  backgroundColor: theme?.secondary ? `${theme.secondary}10` : "#4fd1c510",
                                  color: theme?.dark || "#1a202c",
                                }}
                              >
                                {achievement}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            className="text-center p-12 rounded-2xl max-w-2xl mx-auto"
            style={{
              backgroundColor: theme?.card || "#f8fafc",
              border: `1px dashed ${theme?.accent || "#e0e7ff"}`,
            }}
          >
            <GraduationCap 
              className="w-12 h-12 mx-auto mb-4 opacity-30"
              style={{ color: theme?.primary || "#3490dc" }}
            />
            <h3
              className="text-xl font-semibold mb-2"
              style={{
                color: theme?.dark || "#1a202c",
              }}
            >
              No education added yet
            </h3>
            <p 
              className="text-gray-500 max-w-md mx-auto"
              style={{
                fontFamily: theme?.fontBody || "Open Sans",
              }}
            >
              Add your educational background to showcase your academic qualifications and training.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}