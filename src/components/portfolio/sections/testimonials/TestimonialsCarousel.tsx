import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar: string;
  rating?: number; // 1-5
}

interface TestimonialsCarouselProps {
  heading: string;
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number; // in milliseconds
  showNavigation?: boolean;
  showDots?: boolean;
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

export default function TestimonialsCarousel({
  heading,
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  showNavigation = true,
  showDots = true,
  // Style props with defaults
  backgroundColor = "#eff6ff",
  textColor = "#111827",
  paddingY = "64",
  paddingX = "16",
  textAlign = "center",
  fontSize = "xl",
  fontWeight = "bold",
  borderRadius = "0",
  shadow = "none",
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, autoPlay, autoPlayInterval]);

  const currentTestimonial = testimonials[currentIndex];

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

  // Render star rating
  const renderStars = (rating: number = 5) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <div
      style={containerStyle}
      className="px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-4xl mx-auto">
        <h2 style={titleStyle} className="text-3xl text-center sm:text-4xl">
          {heading}
        </h2>

        <div className="mt-12 relative">
          <div className="bg-white rounded-lg shadow-lg p-8 relative">
            {/* Quote icon */}
            <div className="absolute top-0 left-8 -mt-4 text-blue-100">
              <svg
                className="h-12 w-12"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </div>

            {/* Testimonial content */}
            <div className="relative">
              <blockquote className="relative">
                <div className="text-lg font-medium text-gray-700">
                  <p>&ldquo;{currentTestimonial.quote}&rdquo;</p>
                </div>

                <footer className="mt-6">
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        className="h-full w-full object-cover"
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.author}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-gray-900">
                        {currentTestimonial.author}
                      </div>
                      <div className="text-base font-medium text-blue-600">
                        {currentTestimonial.role}
                        {currentTestimonial.company &&
                          `, ${currentTestimonial.company}`}
                      </div>
                      {currentTestimonial.rating && (
                        <div className="mt-1 flex">
                          {renderStars(currentTestimonial.rating)}
                        </div>
                      )}
                    </div>
                  </div>
                </footer>
              </blockquote>

              {/* Navigation arrows */}
              {showNavigation && testimonials.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-blue-600 focus:outline-none"
                    aria-label="Previous testimonial"
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-blue-600 focus:outline-none"
                    aria-label="Next testimonial"
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Dots indicator */}
          {showDots && testimonials.length > 1 && (
            <div className="mt-8 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
