// import { DotPattern } from "@/components/magicui/dot-pattern";
import FAQ from "@/components/sections/FAQ";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import Hero from "@/components/sections/hero/default";
import React from "react";

const Page = () => {
  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Background Grid (optional, can be absolutely positioned) */}
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        
        <FeaturesSection />
        
        <FAQ />
      </div>
    </div>
  );
};

export default Page;