import { Button, type ButtonProps } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { ArrowRightIcon, Sparkles } from "lucide-react";

import { Mockup, MockupFrame } from "../../ui/mockup";
import Glow from "../../ui/glow";
import { ReactNode } from "react";
import HeroImg from "../../../assets/images/image.png";
import Image from "next/image";

interface HeroButtonProps {
  href: string;
  text: string;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
}

interface HeroProps {
  title?: string;
  description?: string;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
}

export default function PortflectionHero({
  title = "Create a stunning portfolio that gets you noticed",
  description = "Build professional portfolios in minutes with Porflectin's intuitive builder, customizable templates, and powerful showcase tools.",
  mockup,
  badge = (
    <Badge variant="outline" className="animate-appear">
      <span className="text-muted-foreground">
        Porflectin Beta is now available!
      </span>
      <a href="/signup" className="flex items-center gap-1 text-red-400">
        Join waitlist
        <ArrowRightIcon className="size-3" />
      </a>
    </Badge>
  ),
  buttons = [
    {
      href: "/create",
      text: "Create Your Portfolio",
      variant: "default",
      iconRight: <ArrowRightIcon className="ml-2 size-4" />,
    },
    {
      href: "/templates",
      text: "Explore Templates",
      variant: "glow",
      icon: <Sparkles className="mr-2 size-4" />,
    },
  ],
}: HeroProps) {
  return (
    <section className="fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0">
      <div className="max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {badge !== false && badge}
          <h1 className="animate-appear from-red-500 to-pink-400 dark:from-red-500 dark:to-pink-400 relative z-10 inline-block bg-gradient-to-r bg-clip-text text-4xl leading-tight font-semibold text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-7xl md:leading-tight">
            {title}
          </h1>
          <p className="text-md animate-appear text-muted-foreground relative z-10 max-w-[600px] font-medium opacity-0 delay-100 sm:text-xl">
            {description}
          </p>
          {buttons !== false && buttons.length > 0 && (
            <div className="animate-appear relative z-10 flex justify-center gap-4 opacity-0 delay-300">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "default"}
                  size="lg"
                  className={
                    button.variant === "default"
                      ? "bg-gradient-to-r from-red-500 to-pink-400 border-none hover:from-red-600 hover:to-pink-500"
                      : ""
                  }
                  asChild
                >
                  <a href={button.href}>
                    {button.icon}
                    {button.text}
                    {button.iconRight}
                  </a>
                </Button>
              ))}
            </div>
          )}
          {mockup !== false && (
            <div className="relative w-full pt-12">
              <MockupFrame
                className="animate-appear opacity-0 delay-700"
                size="small"
              >
                <Mockup type="responsive" className="w-full">
                  {mockup || (
                    <Image
                      src={HeroImg}
                      alt="Portfolio preview"
                      className="w-full rounded-lg shadow-lg"
                    />
                  )}
                </Mockup>
              </MockupFrame>
              <Glow
                variant="top"
                className="animate-appear-zoom opacity-0 delay-1000 bg-gradient-to-r from-red-500/20 to-pink-400/20"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
