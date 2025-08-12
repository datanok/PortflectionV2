"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExampleHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function ExampleHero({
  title = "Welcome to My Portfolio",
  subtitle = "I'm a passionate developer creating amazing digital experiences",
  ctaText = "Get In Touch",
  ctaLink = "#contact",
  backgroundColor = "bg-gradient-to-r from-blue-600 to-purple-600",
  textColor = "text-white"
}: ExampleHeroProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${backgroundColor}`}>
      <Card className="max-w-4xl mx-auto p-8 bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="text-center space-y-6">
          <h1 className={`text-5xl font-bold ${textColor} mb-4`}>
            {title}
          </h1>
          <p className={`text-xl ${textColor} opacity-90 max-w-2xl mx-auto`}>
            {subtitle}
          </p>
          <Button 
            asChild
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
          >
            <a href={ctaLink}>
              {ctaText}
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 