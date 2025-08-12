# Contributing to Portflection Component Registry

Thank you for your interest in contributing to our portfolio component registry! This guide will help you understand how to add new components and variants to our system.

## 🚀 Quick Start

1. **Fork** the repository
2. **Create** a new component following our guidelines
3. **Test** your component thoroughly
4. **Submit** a pull request with proper documentation

## 📁 Component Structure

### Directory Organization

```
src/components/portfolio/sections/
├── hero/           # Hero section variants
├── about/          # About section variants
├── projects/       # Projects section variants
├── skills/         # Skills section variants
├── contact/        # Contact section variants
├── navbar/         # Navigation variants
├── footer/         # Footer variants
├── experience/     # Experience section variants
├── education/      # Education section variants
├── testimonials/   # Testimonials section variants
└── custom/         # Custom/utility components
```

### File Naming Convention

- Component files: `ComponentName.tsx` (PascalCase)
- Index files: `index.ts` (for exports)
- Test files: `ComponentName.test.tsx`

## 🎨 Creating a New Component

### 1. Component Template

```tsx
// src/components/portfolio/sections/hero/MyNewHero.tsx
import React from "react";
import { ComponentProps } from "@/lib/portfolio/types";

interface MyNewHeroProps extends ComponentProps {
  title: string;
  subtitle?: string;
  description?: string;
  profileImage?: string;
  ctaText?: string;
  ctaLink?: string;
  showSocialLinks?: boolean;
  githubUrl?: string;
  linkedinUrl?: string;
  emailUrl?: string;
}

export default function MyNewHero({
  title,
  subtitle,
  description,
  profileImage,
  ctaText = "View My Work",
  ctaLink = "#projects",
  showSocialLinks = true,
  githubUrl,
  linkedinUrl,
  emailUrl,
  ...props
}: MyNewHeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 text-center">
        {profileImage && (
          <img
            src={profileImage}
            alt={title}
            className="w-32 h-32 rounded-full mx-auto mb-8 object-cover shadow-lg"
          />
        )}

        <h1 className="text-5xl font-bold text-gray-900 mb-4">{title}</h1>

        {subtitle && <p className="text-xl text-gray-600 mb-6">{subtitle}</p>}

        {description && (
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href={ctaLink}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {ctaText}
          </a>
        </div>

        {showSocialLinks && (githubUrl || linkedinUrl || emailUrl) && (
          <div className="flex justify-center space-x-6">
            {githubUrl && (
              <a
                href={githubUrl}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            {emailUrl && (
              <a
                href={emailUrl}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
```

### 2. Export from Index File

```tsx
// src/components/portfolio/sections/hero/index.ts
export { default as HeroSection } from "./HeroSection";
export { default as TypographyHero } from "./TypographyHero";
export { default as MyNewHero } from "./MyNewHero"; // Add your new component
```

### 3. Register in Registry

```typescript
// src/lib/portfolio/registry.ts
import * as HeroComponents from "@/components/portfolio/sections/hero";

export const componentRegistry: Record<SectionType, ComponentSection> = {
  hero: {
    id: "hero",
    name: "Hero Section",
    description: "Eye-catching introduction at the top of your portfolio",
    icon: "Zap",
    isRequired: true,
    allowMultiple: false,
    variants: [
      // ... existing variants
      {
        id: "my-new-hero",
        name: "My New Hero",
        description:
          "A beautiful gradient hero section with profile image and social links",
        component: HeroComponents.MyNewHero,
        thumbnail: "/thumbnails/my-new-hero.jpg", // You'll need to provide this
        category: "layout",
        tags: ["hero", "gradient", "profile", "social", "modern"],
        theme: "gradient",
        isPopular: false, // Set to true if it becomes popular
        defaultProps: {
          title: "John Doe",
          subtitle: "Full Stack Developer",
          description:
            "Passionate about creating beautiful and functional web experiences",
          profileImage:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
          ctaText: "View My Work",
          ctaLink: "#projects",
          showSocialLinks: true,
          githubUrl: "https://github.com",
          linkedinUrl: "https://linkedin.com",
          emailUrl: "mailto:john@example.com",
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#3b82f6",
          secondaryColor: "#6b7280",
          paddingY: "64",
          paddingX: "16",
          textAlign: "center",
          fontSize: "xl",
          fontWeight: "bold",
          borderRadius: "0",
          shadow: "none",
        },
      },
    ],
  },
  // ... other sections
};
```

## 🎯 Component Guidelines

### Design Principles

1. **Responsive**: Must work on mobile, tablet, and desktop
2. **Accessible**: Follow WCAG guidelines
3. **Customizable**: Use props for customization
4. **Performance**: Optimize for fast loading
5. **Consistent**: Follow existing design patterns

### Required Props

- All components should extend `ComponentProps`
- Use TypeScript interfaces for prop definitions
- Provide sensible defaults for optional props
- Include proper JSDoc comments

### Styling Guidelines

- Use Tailwind CSS classes
- Follow the existing color scheme
- Ensure proper contrast ratios
- Support dark/light mode when applicable

### Testing Requirements

```tsx
// src/components/portfolio/sections/hero/__tests__/MyNewHero.test.tsx
import { render, screen } from "@testing-library/react";
import MyNewHero from "../MyNewHero";

describe("MyNewHero", () => {
  it("renders title correctly", () => {
    render(<MyNewHero title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<MyNewHero title="Test" subtitle="Subtitle" />);
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    render(<MyNewHero title="Test" />);
    expect(screen.queryByText("Subtitle")).not.toBeInTheDocument();
  });
});
```

## 📸 Thumbnail Requirements

- **Size**: 400x300 pixels
- **Format**: JPG or PNG
- **Quality**: High quality, clear representation
- **Content**: Show the component in its default state
- **Background**: Use a neutral background

## 🔧 Development Setup

1. **Clone and install**:

   ```bash
   git clone https://github.com/your-username/portflection-v2.git
   cd portflection-v2
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Test your component**:
   ```bash
   npm run test
   npm run lint
   ```

## 📝 Pull Request Process

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/my-new-hero-component
   ```

2. **Make your changes** following the guidelines above

3. **Test thoroughly**:

   - Component renders correctly
   - All props work as expected
   - Responsive design works
   - Accessibility requirements met

4. **Update documentation**:

   - Add component to README if needed
   - Update any relevant guides

5. **Submit PR** with:
   - Clear description of changes
   - Screenshots of the component
   - Link to test portfolio (if applicable)
   - Any breaking changes noted

## 🏷️ Component Categories

- **layout**: Structural components (hero, navbar, footer)
- **content**: Content-focused components (about, projects, skills)
- **media**: Media-rich components (galleries, videos)
- **form**: Interactive components (contact forms, surveys)

## 🎨 Theme Support

Components should support the following themes:

- `typography`: Bold, text-focused designs
- `image`: Image-heavy layouts
- `gradient`: Gradient-based designs
- `minimal`: Clean, minimal designs

## 🚫 What Not to Include

- Components that don't follow accessibility guidelines
- Components with hardcoded content
- Components that don't support customization
- Components with poor performance
- Components that don't work on mobile

## 🤝 Community Guidelines

- Be respectful and constructive in feedback
- Help review other contributors' work
- Share knowledge and best practices
- Report bugs and suggest improvements

## 📞 Need Help?

- Open an issue for questions
- Join our Discord community
- Check existing PRs for examples
- Review the existing component code

Thank you for contributing to making Portflection better! 🎉
