import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ChevronDown, HelpCircle, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

type FaqItem = {
  question: string;
  answer: string;
  category?: string;
};

const FAQ = () => {
  const FaqItems: FaqItem[] = [
    {
      question: "What is Portflection?",
      answer:
        "Portflection is an easy-to-use portfolio builder that helps professionals create and showcase their work using modern, customizable templates.",
      category: "General",
    },
    {
      question: "What types of portfolios can I create?",
      answer:
        "You can easily build portfolios for developers, designers, content creators, and business consultants — each with ready-to-use layouts and features designed specifically for your profession.",
      category: "Features",
    },
    {
      question: "How customizable is my portfolio?",
      answer:
        "Portflection makes customization simple. Choose your colors, fonts, and layout options with an intuitive editor and see your changes in real time—no coding needed.",
      category: "Customization",
    },
    {
      question: "What features are included in my portfolio?",
      answer:
        "With just a few clicks, you can add projects, skills, education, certifications, testimonials, and more. Business portfolios support detailed case studies with impact metrics.",
      category: "Features",
    },
    {
      question: "Can I track my portfolio's performance?",
      answer:
        "Yes! Our user-friendly dashboard makes it easy to view analytics such as portfolio views, engagement metrics, and track your professional growth over time.",
      category: "Analytics",
    },
    {
      question: "Is my portfolio responsive?",
      answer:
        "Absolutely. Every template is fully responsive and automatically optimized for mobile, tablet, and desktop—no extra setup required.",
      category: "Technical",
    },
    {
      question: "How secure is my data?",
      answer:
        "Your data is encrypted and stored securely. You have full control over privacy settings and can easily manage who sees your portfolio.",
      category: "Security",
    },
    {
      question: "Where can I get support?",
      answer:
        "You can reach us at support@portflection.com, explore our Help Center, or join our friendly community for quick help and inspiration.",
      category: "Support",
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 grid-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl mb-4 sm:mb-6 bg-primary/10 text-primary border border-primary/20 shadow-lg">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-foreground leading-tight">
            Frequently Asked Questions
          </h2>

        </div>

        {/* FAQ Accordion */}
        <Card className="border border-border bg-card/50 backdrop-blur-sm">
          <Accordion
            type="single"
            collapsible
            className="divide-y divide-border/50"
          >
            {FaqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-none"
              >
                <AccordionTrigger className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 hover:no-underline group transition-all duration-300 hover:bg-accent/50 [&[data-state=open]]:bg-accent/30  cursor-pointer">
                  <div className="flex items-start gap-3 sm:gap-4 text-left w-full">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base md:text-lg text-foreground group-hover:text-primary transition-colors duration-300 text-left leading-snug">
                        {item.question}
                      </h3>
                      {/* {item.category && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-secondary/60 text-secondary-foreground">
                          {item.category}
                        </span>
                      )} */}
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-5 md:pb-6 pt-0 animate-in slide-in-from-top-2 duration-300">
                  <div className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Contact CTA */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <p className="text-sm sm:text-base text-muted-foreground mb-2">
                Still have questions?
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground/80">
                Connect with me on{" "}
                <a
                  href="https://github.com/datanok"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  Github
                </a>{" "}
                or{" "}
                <a
                  href="https://linkedin.com/in/yourprofile"
                  className="text-primary hover:underline"
                >
                  LinkedIn
                </a>
                .
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto min-w-[160px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <a
                  href="mailto:support@portflection.com"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Contact Me
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto min-w-[140px] transition-all duration-300 hover:scale-105"
                asChild
              >
                <a
                  href="/help"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <HelpCircle className="w-4 h-4" />
                  Help Center
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl opacity-60 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </section>
  );
};

export default FAQ;
