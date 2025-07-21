# Portfolio Builder

A modular, component-based portfolio builder that allows users to create custom portfolio layouts using drag-and-drop functionality.

## Features

- 🏗️ Drag-and-drop interface for building portfolios
- 🎨 Multiple variants for each section type
- 🎭 Live preview of changes
- 🎛️ Customizable properties for each component
- 🎨 Theme support with global styling
- 📱 Responsive design
- 🗄️ Database integration with Prisma

## Component Structure

```
components/portfolio/
├── builder/                  # Builder interface components
│   ├── PortfolioEditor.tsx   # Main editor component
│   ├── ComponentPalette.tsx  # Drag source components
│   ├── DropCanvas.tsx        # Drop target canvas
│   └── PropertyPanel.tsx     # Component editing panel
├── sections/                # Portfolio section components
│   ├── hero/                # Hero section variants
│   │   ├── HeroMinimal.tsx
│   │   └── HeroCentered.tsx
│   └── ...
└── shared/                  # Shared components
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install react-dnd react-dnd-html5-backend
   ```

2. Import and use the `PortfolioEditor` component:
   ```tsx
   import PortfolioEditor from '@/components/portfolio/builder/PortfolioEditor';
   
   function PortfolioBuilderPage() {
     return (
       <div className="h-screen">
         <PortfolioEditor />
       </div>
     );
   }
   ```

## Adding New Components

1. Create a new component in the appropriate section folder:
   ```tsx
   // src/components/portfolio/sections/hero/NewHeroVariant.tsx
   import React from 'react';
   
   interface NewHeroVariantProps {
     title: string;
     subtitle?: string;
   }
   
   export default function NewHeroVariant({ title, subtitle }: NewHeroVariantProps) {
     return (
       <div className="hero-variant">
         <h1>{title}</h1>
         {subtitle && <p>{subtitle}</p>}
       </div>
     );
   }
   ```

2. Register the component in the registry:
   ```typescript
   // src/lib/portfolio/registry.ts
   import NewHeroVariant from '@/components/portfolio/sections/hero/NewHeroVariant';
   
   const componentRegistry = {
     hero: {
       // ... existing hero variants
       newVariant: {
         id: 'newVariant',
         name: 'New Hero Variant',
         thumbnail: '/thumbnails/hero-new-variant.png',
         component: NewHeroVariant,
         defaultProps: {
           title: 'Welcome to My Portfolio',
           subtitle: 'Custom hero section',
         },
         styleOptions: {
           // Define style options here
         },
         requiredFields: ['title'],
       },
     },
     // ... other component types
   };
   ```

## Database Schema

The portfolio data is stored in MongoDB using Prisma. The main models are:

- `Portfolio`: Contains the main portfolio information and layout
- `PortfolioComponent`: Stores individual components with their properties and styles
- `PortfolioView`: Tracks portfolio views and analytics

## Styling

Components use Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`.

## License

MIT
