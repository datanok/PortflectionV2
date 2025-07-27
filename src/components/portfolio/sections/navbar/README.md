# Portfolio Navigation System

This directory contains the navigation components for the portfolio builder, including the `NavigationHelper` component that enables smooth scrolling navigation between sections.

## Components

### NavigationHelper

The `NavigationHelper` component provides smooth scrolling navigation functionality for portfolio sections. It automatically detects sections and provides navigation methods.

#### Features

- **Smooth Scrolling**: Smooth transitions between sections
- **Active Section Detection**: Automatically detects which section is currently visible
- **Intersection Observer**: Uses modern browser APIs for efficient section detection
- **Global Navigation API**: Exposes navigation functions globally for use by other components
- **Responsive**: Works on all screen sizes
- **Customizable**: Configurable offset, smooth scrolling, and section list

#### Usage

```tsx
import NavigationHelper from "@/components/portfolio/sections/navbar/NavigationHelper";

// Wrap your portfolio sections
<NavigationHelper
  sections={["home", "about", "skills", "projects", "contact"]}
  offset={80}
  smooth={true}
>
  <section id="home">Home Section</section>
  <section id="about">About Section</section>
  <section id="skills">Skills Section</section>
  <section id="projects">Projects Section</section>
  <section id="contact">Contact Section</section>
</NavigationHelper>;
```

#### Props

| Prop       | Type              | Default                                              | Description                                |
| ---------- | ----------------- | ---------------------------------------------------- | ------------------------------------------ |
| `children` | `React.ReactNode` | -                                                    | Portfolio sections to wrap                 |
| `sections` | `string[]`        | `["home", "about", "skills", "projects", "contact"]` | Array of section IDs                       |
| `offset`   | `number`          | `80`                                                 | Offset from top when scrolling to sections |
| `smooth`   | `boolean`         | `true`                                               | Enable smooth scrolling                    |
| `duration` | `number`          | `800`                                                | Animation duration in milliseconds         |

### usePortfolioNavigation Hook

A custom hook that provides navigation functionality to any component within the portfolio.

#### Usage

```tsx
import { usePortfolioNavigation } from "@/hooks/usePortfolioNavigation";

const MyComponent = () => {
  const { activeSection, scrollToSection, scrollToTop, isNavigationAvailable } =
    usePortfolioNavigation();

  return (
    <div>
      <p>Current section: {activeSection}</p>
      <button onClick={() => scrollToSection("about")}>Go to About</button>
      <button onClick={scrollToTop}>Go to Top</button>
    </div>
  );
};
```

#### Return Values

| Property                | Type                          | Description                     |
| ----------------------- | ----------------------------- | ------------------------------- |
| `activeSection`         | `string`                      | Currently active section ID     |
| `isNavigationAvailable` | `boolean`                     | Whether navigation is available |
| `scrollToSection`       | `(sectionId: string) => void` | Scroll to specific section      |
| `scrollToTop`           | `() => void`                  | Scroll to top of page           |
| `getCurrentSection`     | `() => string`                | Get current section ID          |
| `getSections`           | `() => string[]`              | Get list of all sections        |

### NavbarTypography

A typography-focused navbar component that integrates with the navigation system.

#### Features

- **Active Section Highlighting**: Automatically highlights the current section
- **Smooth Navigation**: Uses the NavigationHelper for smooth scrolling
- **Responsive Design**: Mobile-friendly with hamburger menu
- **Typography Focused**: Uses monospace fonts and developer aesthetics
- **Scroll Effects**: Background blur and shadow on scroll

#### Usage

```tsx
import { NavbarTypography } from "@/components/portfolio/sections/navbar";

<NavbarTypography
  logoText="DEV.PORTFOLIO"
  navItems={[
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONTACT", href: "#contact" },
  ]}
  showCTA={true}
  ctaText="HIRE_ME()"
  ctaHref="#contact"
/>;
```

## Global Navigation API

The NavigationHelper exposes a global API that can be accessed from anywhere:

```javascript
// Access navigation functions globally
const navigation = window.portfolioNavigation;

if (navigation) {
  navigation.scrollToSection("about");
  navigation.scrollToTop();
  const currentSection = navigation.getCurrentSection();
  const sections = navigation.getSections();
}
```

## Section Requirements

For sections to work with the navigation system, they must:

1. **Have an ID**: Each section must have a unique ID that matches the sections array
2. **Be in the DOM**: Sections must be rendered in the DOM for detection to work
3. **Follow the pattern**: Use the standard HTML section element with an ID

```tsx
<section id="home">
  {/* Home content */}
</section>

<section id="about">
  {/* About content */}
</section>
```

## Integration with Portfolio Builder

The navigation system integrates seamlessly with the portfolio builder:

1. **Automatic Detection**: Sections are automatically detected based on component IDs
2. **Dynamic Updates**: Navigation updates when sections are added/removed
3. **Theme Consistency**: Works with all typography themes
4. **Performance Optimized**: Uses efficient intersection observers

## Example Portfolio Layout

```tsx
import NavigationWrapper from "@/components/portfolio/NavigationWrapper";
import { NavbarTypography } from "@/components/portfolio/sections/navbar";
import { HeroTypography } from "@/components/portfolio/sections/hero";
import { AboutTypography } from "@/components/portfolio/sections/about";
import { SkillsTypography } from "@/components/portfolio/sections/skills";
import { ProjectsTypography } from "@/components/portfolio/sections/projects";
import { ContactTypography } from "@/components/portfolio/sections/contact";

const Portfolio = () => {
  return (
    <NavigationWrapper>
      <NavbarTypography />

      <section id="home">
        <HeroTypography />
      </section>

      <section id="about">
        <AboutTypography />
      </section>

      <section id="skills">
        <SkillsTypography />
      </section>

      <section id="projects">
        <ProjectsTypography />
      </section>

      <section id="contact">
        <ContactTypography />
      </section>
    </NavigationWrapper>
  );
};
```

This setup provides a complete navigation system for portfolios with smooth scrolling, active section detection, and a professional navbar component.
