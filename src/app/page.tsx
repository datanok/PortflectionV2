// import { DotPattern } from "@/components/magicui/dot-pattern";

import FAQ from "@/components/sections/FAQ";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

import Hero from "@/components/sections/hero/default";

import React from "react";

const page = () => {
  return (
    <div className="relative">
      {/* Background Grid */}

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <FeaturesSection />
      <FAQ />
    </div>
  );
};

export default page;
