"use client";
import { Button, type ButtonProps } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { ArrowRightIcon, Sparkles, PlayIcon } from "lucide-react";
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
    className="text-white shadow-md px-3 py-1.5 text-sm font-medium"
    style={{
      backgroundImage: "linear-gradient(to right, var(--color-brand), var(--color-brand-foreground))",
    }}
  >
    🚀 Try Portflection Beta — it’s free!
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
    <section className="relative overflow-hidden pb-0 sm:pb-8 md:pb-16">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 via-transparent to-pink-400/3 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 flex flex-col items-center text-center gap-8">
        {/* Badge */}
        {badge !== false && <div>{badge}</div>}

        {/* Title + Subtitle */}
        <div className="space-y-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-red-500 to-pink-400 bg-clip-text text-transparent">
            {typeof title === "string" ? (
              <>
                {displayText}
                {!isComplete && <span className="animate-pulse">|</span>}
              </>
            ) : (
              title
            )}
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Buttons */}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant || "default"}
                size="lg"
                disabled={button.disabled}
                className={`transition-all duration-200 hover:scale-105 ${
                  button.variant === "default"
                    ? "bg-gradient-to-r from-red-500 to-pink-400 text-white hover:shadow-lg"
                    : "border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5"
                }`}
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
                className="border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5"
              >
                <PlayIcon className="mr-2 size-4" />
                Watch Demo
              </Button>
            )}
          </div>
        )}

        {/* Mockup */}
        {mockup !== false && (
          <div className="w-full pt-16 max-w-4xl">
            <MockupFrame
              className="hover:scale-[1.02] transition-transform duration-500"
              size="small"
            >
              <Mockup type="responsive" className="w-full">
                {mockup || (
                  <div className="relative group">
                    <Image
                      src={HeroImg}
                      alt="Portfolio preview"
                      className="w-full rounded-lg shadow-xl"
                    />
                    {videoUrl && !isVideoPlaying && (
                      <button
                        onClick={handleVideoPlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 rounded-lg transition-all duration-200"
                      >
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110">
                          <PlayIcon className="w-6 h-6 text-gray-800 ml-1" />
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </Mockup>
            </MockupFrame>
            {/* Subtle glow effect */}
            {/* <Glow
              variant="top"
              className="bg-gradient-to-r from-red-500/5 to-pink-400/5 opacity-60"
            /> */}
          </div>
        )}
      </div>
    </section>
  );
}