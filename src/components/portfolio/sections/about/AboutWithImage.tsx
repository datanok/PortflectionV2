import React from 'react';
import Image from 'next/image';

interface AboutWithImageProps {
  heading: string;
  bio: string;
  imageUrl: string;
  skills?: string[];
  ctaText?: string;
  ctaLink?: string;
}

export default function AboutWithImage({
  heading,
  bio,
  imageUrl,
  skills = [],
  ctaText,
  ctaLink = '#',
}: AboutWithImageProps) {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="relative h-64 w-full rounded-lg overflow-hidden sm:h-80 lg:h-full">
              <Image
                className="absolute inset-0 w-full h-full object-cover"
                src={imageUrl}
                alt="About me"
                width={500}
                height={600}
              />
            </div>
          </div>
          
          <div className="mt-10 lg:mt-0 lg:col-span-7">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {heading}
            </h2>
            
            <div className="mt-6 text-gray-600 space-y-6">
              {bio.split('\n').map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {skills.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Skills & Expertise</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {ctaText && (
              <div className="mt-8">
                <a
                  href={ctaLink}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  {ctaText}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
