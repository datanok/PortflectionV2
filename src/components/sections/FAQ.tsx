import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ = () => {
  const FaqItems: FaqItem[] = [
    {
      question: "What is Portflection?",
      answer:
        "Portflection is an easy-to-use portfolio builder that helps professionals create and showcase their work using modern, customizable templates tailored for developers, designers, content creators, and business consultants.",
    },
    {
      question: "What types of portfolios can I create?",
      answer:
        "You can easily build portfolios for developers, designers, content creators, and business consultants — each with ready-to-use layouts and features designed specifically for your profession.",
    },
    {
      question: "How customizable is my portfolio?",
      answer:
        "Portflection makes customization simple. Choose your colors, fonts, and layout options with an intuitive editor and see your changes in real time—no coding needed.",
    },
    {
      question: "What features are included in my portfolio?",
      answer:
        "With just a few clicks, you can add projects, skills, education, certifications, testimonials, and more. Business portfolios support detailed case studies with impact metrics.",
    },
    {
      question: "Can I track my portfolio's performance?",
      answer:
        "Yes! Our user-friendly dashboard makes it easy to view analytics such as portfolio views, engagement metrics, and track your professional growth over time.",
    },
    {
      question: "Is my portfolio responsive?",
      answer:
        "Absolutely. Every template is fully responsive and automatically optimized for mobile, tablet, and desktop—no extra setup required.",
    },
    {
      question: "How secure is my data?",
      answer:
        "Your data is encrypted and stored securely. You have full control over privacy settings and can easily manage who sees your portfolio.",
    },
    {
      question: "Where can I get support?",
      answer:
        "You can reach us at support@portflection.com, explore our Help Center, or join our friendly community for quick help and inspiration.",
    },
  ];
  
  return (
    <section className="max-w-7xl mx-auto py-16 text-center">
      <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
        Frequently Asked Questions
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-2xl mx-auto mt-2">
        Find answers to common questions about Portflection.
      </p>

      <Accordion
        type="single"
        collapsible
        className="mt-8 hover:opacity-100 transition-opacity"
      >
        {FaqItems.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={index !== FaqItems.length - 1 ? "border-b" : ""}
            style={{
              borderBottomColor: "var(--border)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-4 hover:no-underline flex items-center"
              style={{
                color: "var(--foreground)",
              }}
            >
              <span className="text-left font-medium">{item.question}</span>
            </AccordionTrigger>
            <AccordionContent
              className="px-4 pb-4 pt-1"
              style={{
                color: "var(--muted-foreground)",
              }}
            >
              <div className="text-sm text-left">{item.answer}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
