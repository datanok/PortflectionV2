import React from "react";
import Image from "next/image";

interface Feature {
  text: string;
  icon?: string;
}

interface HeroSplitProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  features?: Feature[];
  ctaText?: string;
  ctaLink?: string;
  // Style props
  backgroundColor?: string;
  textColor?: string;
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
  shadow?: string;
}

export default function HeroSplit({
  title,
  subtitle,
  imageUrl,
  features = [],
  ctaText,
  ctaLink = "#",
  // Style props with defaults
  backgroundColor = "#ffffff",
  textColor = "#111827",
  paddingY = "64",
  paddingX = "16",
  textAlign = "left",
  fontSize = "xl",
  fontWeight = "bold",
  borderRadius = "0",
  shadow = "none",
}: HeroSplitProps) {
  // Convert style props to CSS
  const containerStyle: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    paddingTop: `${paddingY}px`,
    paddingBottom: `${paddingY}px`,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    textAlign: textAlign as any,
    borderRadius: `${borderRadius}px`,
    boxShadow: shadow !== "none" ? shadow : undefined,
  };

  const titleStyle: React.CSSProperties = {
    color: textColor,
    fontSize:
      fontSize === "xl"
        ? "2.25rem"
        : fontSize === "2xl"
        ? "1.875rem"
        : "1.5rem",
    fontWeight:
      fontWeight === "bold"
        ? "bold"
        : fontWeight === "semibold"
        ? "600"
        : "normal",
  };

  const subtitleStyle: React.CSSProperties = {
    color: textColor,
    fontSize:
      fontSize === "sm" ? "0.875rem" : fontSize === "lg" ? "1.125rem" : "1rem",
  };

  return (
    <div style={containerStyle} className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 bg-white lg:max-w-2xl lg:w-full">
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="sm:text-center lg:text-left py-12">
              <h1
                style={titleStyle}
                className="text-4xl tracking-tight sm:text-5xl md:text-6xl"
              >
                <span className="block">{title}</span>
                <span className="block text-blue-600">{subtitle}</span>
              </h1>
              <p
                style={subtitleStyle}
                className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              >
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo.
              </p>

              {features.length > 0 && (
                <div className="mt-8">
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        {feature.icon && (
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-500 text-white">
                              {feature.icon}
                            </div>
                          </div>
                        )}
                        <p className="ml-3 text-base text-gray-500">
                          {feature.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {ctaText && (
                <div className="mt-8 sm:mt-12">
                  <div className="rounded-md shadow">
                    <a
                      href={ctaLink}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      {ctaText}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        {imageUrl &&
        imageUrl !== "[Your Hero Image URL]" &&
        imageUrl.startsWith("http") ? (
          <Image
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={imageUrl}
            alt={title}
            width={1200}
            height={800}
          />
        ) : (
          <div className="h-56 w-full bg-gray-200 flex items-center justify-center sm:h-72 md:h-96 lg:w-full lg:h-full">
            <div className="text-center text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm">Add an image URL</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
