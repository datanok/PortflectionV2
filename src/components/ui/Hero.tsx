"use client";

import { Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroProps {
  icon?: React.ReactNode;
  heading: string;
  description: string;
  button: {
    text: string;
    icon?: React.ReactNode;
    url: string;
  };
  trustText?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export const Hero = ({
  icon = <Lightbulb className="w-10 h-10 text-yellow-500" />,
  heading = "Build Your Portfolio, Effortlessly.",
  description = "Portflection helps you craft professional portfolios with dynamic templates and real-time performance tracking.",
  button = {
    text: "Get Started",
    icon: <ArrowRight className="w-5 h-5 ml-2" />,
    url: "/signup",
  },
  trustText = "Trusted by developers worldwide",
  imageSrc = "../../assets/images/image.png",
  imageAlt = "Portflection dashboard preview",
}: HeroProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center px-6 py-20 md:py-32">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 opacity-30 blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-3xl"
      >
        {icon}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          {heading}
        </h1>
        <p className="mt-4 text-lg text-gray-200">{description}</p>
        <Button asChild className="mt-6 flex items-center px-6 py-3 text-lg">
          <a href={button.url}>
            {button.text} {button.icon}
          </a>
        </Button>
        {trustText && <p className="mt-4 text-sm text-gray-300">{trustText}</p>}
      </motion.div>

      {/* Hero Image */}
      {imageSrc && (
        <motion.img
          src={imageSrc}
          alt={imageAlt}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 mt-10 w-full max-w-3xl rounded-lg shadow-lg"
        />
      )}
    </div>
  );
};

export default Hero;
