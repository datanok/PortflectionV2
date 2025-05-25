import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ColorScheme } from '@/components/portfolioForms/types/ColorSchemes';

interface AboutProps {
  about: string;
  theme: ColorScheme;
}

export const About = ({ about, theme }: AboutProps) => {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: theme.body }}>
                About Me
              </h2>
              <p className="text-xl leading-relaxed" style={{ color: theme.bodySecondary }}>
                {about}
              </p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-2xl font-bold" style={{ color: theme.accent }}>50+</div>
                  <div className="text-sm opacity-80" style={{ color: theme.bodySecondary }}>Projects Delivered</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold" style={{ color: theme.accent }}>$100M+</div>
                  <div className="text-sm opacity-80" style={{ color: theme.bodySecondary }}>Revenue Generated</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold" style={{ color: theme.accent }}>10M+</div>
                  <div className="text-sm opacity-80" style={{ color: theme.bodySecondary }}>Users Impacted</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold" style={{ color: theme.accent }}>99.9%</div>
                  <div className="text-sm opacity-80" style={{ color: theme.bodySecondary }}>Uptime Average</div>
                </div>
              </div>
            </div>
          </div>

          <Card 
            className="border-0 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500"
            style={{ backgroundColor: theme.card }}
          >
            <CardContent className="p-8 space-y-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4 text-lg" style={{ color: theme.accent }}>Core Technologies</h3>
                  <div className="grid gap-4">
                    {[
                      { category: "Frontend", skills: ["React/Next.js", "TypeScript", "Vue.js", "Tailwind CSS"] },
                      { category: "Backend", skills: ["Node.js", "Python", "PostgreSQL", "Redis"] },
                      { category: "Cloud", skills: ["AWS", "Docker", "Kubernetes", "Terraform"] },
                      { category: "Tools", skills: ["Git", "CI/CD", "Monitoring", "Testing"] }
                    ].map(({ category, skills }) => (
                      <div key={category} className="space-y-2">
                        <div className="text-sm font-medium opacity-80" style={{ color: theme.body }}>{category}</div>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <Badge 
                              key={skill} 
                              variant="secondary"
                              className="text-xs border-0 hover:scale-105 transition-transform duration-200"
                              style={{ 
                                backgroundColor: theme.muted,
                                color: theme.body
                              }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
