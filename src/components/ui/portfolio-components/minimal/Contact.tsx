import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Twitter, Instagram, Send } from "lucide-react";
import { ColorScheme } from "@/app/types/portfolio";

interface ContactProps {
  email: string;
  theme: ColorScheme;
  onContactClick: () => void;
}

export const Contact = ({ email, theme, onContactClick }: ContactProps) => {
  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      url: "https://github.com/yourusername",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
      url: "https://twitter.com/yourusername",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      url: "https://instagram.com/yourusername",
    },
  ];

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: theme.body }}
          >
            Get In Touch
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: theme.bodySecondary }}
          >
            Have a project in mind or want to discuss potential opportunities?
            I&apos;d love to hear from you!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <Button
              onClick={onContactClick}
              size="lg"
              className="px-8 py-6 text-base font-medium rounded-full group flex items-center gap-2"
              style={{
                backgroundColor: theme.accent,
                color: theme.primary,
              }}
            >
              <Send className="w-5 h-5" />
              Send Me a Message
            </Button>

            <div
              className="h-px w-16 bg-gray-300 md:h-16 md:w-px"
              style={{ backgroundColor: theme.border }}
            />

            <div className="text-center md:text-left">
              <h3
                className="text-lg font-medium mb-2"
                style={{ color: theme.body }}
              >
                Email Me At
              </h3>
              <a
                href={`mailto:${email}`}
                className="text-lg hover:underline transition-colors"
                style={{ color: theme.accent }}
              >
                {email}
              </a>
            </div>
          </div>

          <div
            className="mt-16 pt-12 border-t"
            style={{ borderColor: theme.border }}
          >
            <h3
              className="text-center text-lg font-medium mb-6"
              style={{ color: theme.body }}
            >
              Find Me On
            </h3>
            <div className="flex justify-center gap-6">
              {socialLinks.map(({ icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full hover:scale-110 transition-transform duration-200"
                  style={{ backgroundColor: theme.muted }}
                  aria-label={label}
                >
                  <span style={{ color: theme.body }}>{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
