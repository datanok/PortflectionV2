// import { DotPattern } from "@/components/magicui/dot-pattern";
"use client";
import FAQ from "@/components/sections/FAQ";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import FeatureShowcase from "@/components/sections/FeatureShowcase";
import Hero from "@/components/sections/hero/default";
import React from "react";

const Page = () => {
  return (
    <div className="relative w-full">
      {/* Main Content */}
      <main className="relative z-10 mt-14">
        {/* Hero Section */}
        <div className="blueprint-section">
          <div className="blueprint-corners"></div>
          <Hero />
        </div>

        {/* Features Section */}
        <div className="blueprint-section">
          <div className="blueprint-corners"></div>
          <FeaturesSection />
        </div>

        {/* Feature Showcase */}
        <div className="blueprint-section">
          <div className="blueprint-corners"></div>
          <FeatureShowcase />
        </div>

        {/* FAQ Section */}
        <div className="blueprint-section">
          <div className="blueprint-corners"></div>
          <FAQ />
        </div>
      </main>

      <style jsx>{`
        .blueprint-section {
          position: relative;
          border: 2px dashed var(--blueprint-accent);
          margin: 0 auto;
          padding: 4rem 2rem;
          max-width: 90%;
        }

        .blueprint-section:first-child {
          margin-top: 0;
        }

        .blueprint-section:last-child {
          margin-bottom: 0;
        }

        /* Corner brackets - Top Left */
        .blueprint-section::before {
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          top: -2px;
          left: -2px;
          border-top: 3px solid var(--blueprint-accent);
          border-left: 3px solid var(--blueprint-accent);
          pointer-events: none;
        }

        /* Corner brackets - Top Right */
        .blueprint-section::after {
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          top: -2px;
          right: -2px;
          border-top: 3px solid var(--blueprint-accent);
          border-right: 3px solid var(--blueprint-accent);
          pointer-events: none;
        }

        /* Bottom corner brackets container */
        .blueprint-corners {
          position: absolute;
          bottom: -2px;
          left: -2px;
          right: -2px;
          height: 50px;
          pointer-events: none;
        }

        /* Bottom Left corner */
        .blueprint-corners::before {
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          bottom: 0;
          left: 0;
          border-bottom: 3px solid var(--blueprint-accent);
          border-left: 3px solid var(--blueprint-accent);
        }

        /* Bottom Right corner */
        .blueprint-corners::after {
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          bottom: 0;
          right: 0;
          border-bottom: 3px solid var(--blueprint-accent);
          border-right: 3px solid var(--blueprint-accent);
        }

        @media (min-width: 1024px) {
          .blueprint-section {
            max-width: 85%;
          }
        }
      `}</style>
    </div>
  );
};

export default Page;
