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
        "Portflection is an easy-to-use portfolio builder that helps you create and showcase your work online effortlessly.",
    },
    {
      question: "Do I need coding skills to use Portflection?",
      answer:
        "No! Portflection is designed for everyone. You can create a stunning portfolio without any coding knowledge.",
    },
    {
      question: "How do I create my portfolio?",
      answer:
        "Simply sign up, fill out a form, select a template, and generate your portfolio in one click.",
    },
    {
      question: "Is Portflection free to use?",
      answer:
        "Yes! We offer a free plan with core features. Premium templates and advanced customization may require an upgrade.",
    },
    {
      question: "Can I track analytics for my portfolio?",
      answer:
        "Yes! Your dashboard provides insights into portfolio views, engagement, and other key metrics.",
    },
    {
      question: "Is my portfolio mobile-friendly?",
      answer:
        "Absolutely! All templates are responsive and optimized for both desktop and mobile devices.",
    },
    {
      question: "How secure is my data?",
      answer:
        "We take security seriously. Your data is encrypted, and you have full control over privacy settings.",
    },
    {
      question: "Where can I get support?",
      answer:
        "You can reach out via support@portflection.com, join our Discord community, or check our help center.",
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
