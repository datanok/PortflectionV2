// import { DotPattern } from "@/components/magicui/dot-pattern";

import FAQ from "@/components/sections/FAQ";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

import Hero from "@/components/sections/hero/default";

import React from "react";

const page = () => {
  return (
<div className="relative w-full overflow-hidden">
  {/* Background Grid (optional, can be absolutely positioned) */}

  <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 max-w-[1440px] mx-auto">
    <Hero />
  </section>

  <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 max-w-[1440px] mx-auto mt-16">
    <FeaturesSection />
  </section>

  <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 max-w-[1440px] mx-auto mt-16 mb-24">
    <FAQ />
  </section>
</div>

  );
};

export default page;
