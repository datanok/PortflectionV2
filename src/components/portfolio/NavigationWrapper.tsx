import React from "react";
import NavigationHelper from "./sections/navbar/NavigationHelper";

interface NavigationWrapperProps {
  children: React.ReactNode;
  sections?: string[];
  offset?: number;
  smooth?: boolean;
}

const NavigationWrapper: React.FC<NavigationWrapperProps> = ({
  children,
  sections = [
    "hero",
    "about",
    "skills",
    "portfolioItems",
    "experience",
    "contact",
  ],
  offset = 80,
  smooth = true,
}) => {
  return (
    <NavigationHelper sections={sections} offset={offset} smooth={smooth}>
      {children}
    </NavigationHelper>
  );
};

export default NavigationWrapper;
