"use client";

interface AnimatedHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
  animationType?: 'fade' | 'slide' | 'bounce';
}

export default function AnimatedHero({
  title = "Welcome to My Portfolio",
  subtitle = "I'm a passionate developer creating amazing digital experiences",
  ctaText = "Get In Touch",
  ctaLink = "#contact",
  backgroundColor = "bg-gradient-to-r from-blue-600 to-purple-600",
  animationType = "fade"
}: AnimatedHeroProps) {
  const animationClasses = {
    fade: "animate-fade-in",
    slide: "animate-slide-in",
    bounce: "animate-bounce-in"
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${backgroundColor}`}>
      <div className="text-center text-white max-w-4xl mx-auto px-6">
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${animationClasses[animationType]}`}>
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <a 
          href={ctaLink}
          className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-300"
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}