import React from 'react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface AboutTimelineProps {
  title: string;
  subtitle?: string;
  description?: string;
  timeline: TimelineItem[];
  ctaText?: string;
  ctaLink?: string;
}

export default function AboutTimeline({
  title,
  subtitle,
  description,
  timeline = [],
  ctaText,
  ctaLink = '#',
}: AboutTimelineProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          {subtitle && (
            <p className="text-base font-semibold tracking-wide text-blue-600 uppercase">
              {subtitle}
            </p>
          )}
          <h2 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-500">
              {description}
            </p>
          )}
        </div>

        <div className="mt-16">
          <div className="relative">
            <div className="absolute h-full border border-gray-200 border-opacity-20 left-1/2"></div>
            
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative mb-12 flex ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-500 rounded-full text-white z-10">
                  {item.year}
                </div>
                <div
                  className={`w-5/12 px-4 ${
                    index % 2 === 0 ? 'text-right' : 'text-left'
                  }`}
                >
                  <h4 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {ctaText && (
          <div className="mt-12 text-center">
            <a
              href={ctaLink}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
