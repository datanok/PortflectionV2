// import { DotPattern } from "@/components/magicui/dot-pattern";
import FAQ from "@/components/sections/FAQ";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import FeatureShowcase from "@/components/sections/FeatureShowcase";
import Hero from "@/components/sections/hero/default";
import React from "react";

const Page = () => {
  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <FeaturesSection />

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default Page;
