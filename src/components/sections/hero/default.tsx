"use client";
import { Button, type ButtonProps } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { ArrowRightIcon, Sparkles, PlayIcon, Star } from "lucide-react";
import { Mockup, MockupFrame } from "../../ui/mockup";
import Glow from "../../ui/glow";
import { ReactNode, useState, useEffect } from "react";
import HeroImg from "../../../assets/images/image.png";
import Image from "next/image";

interface HeroButtonProps {
  href: string;
  text: string;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface HeroProps {
  title?: string | ReactNode;
  description?: string;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  videoUrl?: string;
  onVideoPlay?: () => void;
  testimonial?: {
    text: string;
    author: string;
    role: string;
    avatar?: string;
  };
}

// Hook: Typewriter effect
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
};

export default function PortflectionHero({
  title = "Launch a portfolio that truly reflects you",
  description = "Design beautiful, professional portfolios in minutes with Portflection's smart builder, sleek templates, and real-time editing — no design skills needed.",
  badge = (
    <Badge
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border"
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-primary-foreground)",
        borderColor: "var(--color-border)",
      }}
    >
      <Star className="w-4 h-4" />
      Try Portflection Beta — it&apos;s free!
    </Badge>
  ),
  buttons = [
    {
      href: "/dashboard/portfolios/new",
      text: "Create Your Portfolio",
      variant: "default",
      iconRight: <ArrowRightIcon className="ml-2 size-4" />,
    },
    {
      href: "/dashboard",
      text: "Explore Templates",
      variant: "outline",
      icon: <Sparkles className="mr-2 size-4" />,
    },
  ],
  mockup,
  videoUrl,
  onVideoPlay,
  testimonial,
}: HeroProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { displayText, isComplete } = useTypewriter(
    typeof title === "string" ? title : "",
    50
  );

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    onVideoPlay?.();
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-20 md:py-28 grid-pattern">
      {/* Modern gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 80%, var(--color-primary) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--color-accent) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Badge */}
          {badge !== false && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {badge}
            </div>
          )}

          {/* Title + Subtitle */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight"
              style={{ color: "var(--color-foreground)" }}
            >
              {typeof title === "string" ? (
                <>
                  {displayText}
                  {!isComplete && (
                    <span
                      className="animate-pulse"
                      style={{ color: "var(--color-primary)" }}
                    >
                      |
                    </span>
                  )}
                </>
              ) : (
                title
              )}
            </h1>
            <p
              className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed px-4 sm:px-0"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              {description}
            </p>
          </div>

          {/* Buttons */}
          {buttons && buttons.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 px-4 sm:px-0">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "default"}
                  size="lg"
                  disabled={button.disabled}
                  className="transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={button.onClick}
                  asChild={!button.onClick}
                >
                  {button.onClick ? (
                    <button>
                      {button.icon}
                      {button.text}
                      {button.iconRight}
                    </button>
                  ) : (
                    <a href={button.href} className="flex items-center">
                      {button.icon}
                      {button.text}
                      {button.iconRight}
                    </a>
                  )}
                </Button>
              ))}
              {videoUrl && (
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleVideoPlay}
                  className="border-2 transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-foreground)",
                  }}
                >
                  <PlayIcon className="mr-2 size-4" />
                  Watch Demo
                </Button>
              )}
            </div>
          )}

          {/* Testimonial */}
          {testimonial && (
            <div
              className="max-w-md mx-auto p-6 rounded-2xl border mx-4 sm:mx-auto"
              style={{
                backgroundColor: "var(--color-card)",
                borderColor: "var(--color-border)",
                color: "var(--color-card-foreground)",
              }}
            >
              <p className="text-sm italic mb-3">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mockup */}
          {/* {mockup !== false && (
            <div className="w-full pt-12 sm:pt-16 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 px-4 sm:px-0">
              <MockupFrame
                className="hover:scale-[1.02] transition-transform duration-700"
                size="small"
              >
                <Mockup type="responsive" className="w-full">
                  {mockup || (
                    <div className="relative group">
                      <Image
                        src={HeroImg}
                        alt="Portfolio preview"
                        className="w-full rounded-lg shadow-2xl"
                      />
                      {videoUrl && !isVideoPlaying && (
                        <button
                          onClick={handleVideoPlay}
                          className="absolute inset-0 flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-black/20"
                        >
                          <div
                            className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            style={{
                              backgroundColor: "var(--color-primary)",
                              color: "var(--color-primary-foreground)",
                            }}
                          >
                            <PlayIcon className="w-6 h-6 ml-1" />
                          </div>
                        </button>
                      )}
                    </div>
                  )}
                </Mockup>
              </MockupFrame>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
}
