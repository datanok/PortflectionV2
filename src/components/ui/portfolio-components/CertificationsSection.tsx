import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "./SectionHeader";
import { CalendarCheck2, Award } from "lucide-react";
import { motion } from "framer-motion";

interface Certification {
  name: string;
  issuingOrganization: string;
  issueDate: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
  theme?: any;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export function CertificationsSection({ certifications, theme }: CertificationsSectionProps) {
  return (
    <section
      className="py-20"
      style={{
        backgroundColor: theme?.muted || "#f0fdf4"
      }}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <SectionHeader
          title="Certifications"
          subtitle="Recognitions and professional credentials I've earned"
          theme={theme}
        />

        {certifications.length > 0 ? (
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {certifications.map((cert, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card
                  className="h-full border-0 transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: theme?.card || "#d1fae5",
                    borderRadius: "12px",
                    boxShadow: `0 4px 20px ${theme?.accent ? `${theme.accent}15` : "rgba(104, 211, 145, 0.15)"}`
                  }}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Award
                        className="w-6 h-6"
                        style={{ color: theme?.primary || "#38a169" }}
                      />
                      <h3
                        className="text-lg font-semibold"
                        style={{
                          color: theme?.primary || "#38a169",
                          fontFamily: theme?.fontHeading || "Nunito"
                        }}
                      >
                        {cert.name}
                      </h3>
                    </div>

                    <div className="text-sm opacity-80">
                      <p style={{ fontFamily: theme?.fontBody || "Roboto" }}>
                        Issued by <strong>{cert.issuingOrganization}</strong>
                      </p>
                    </div>

                    <div className="flex items-center text-sm opacity-70">
                      <CalendarCheck2 className="w-4 h-4 mr-2" />
                      {new Date(cert.issueDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short"
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div
            className="text-center p-8 rounded-lg"
            style={{
              backgroundColor: theme?.card || "#d1fae5",
              color: theme?.dark || "#22543d",
              fontFamily: theme?.fontBody || "Roboto"
            }}
          >
            No certifications added yet.
          </div>
        )}
      </div>
    </section>
  );
}
