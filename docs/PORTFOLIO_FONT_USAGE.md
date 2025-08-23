# Portfolio Font Usage Guide

## Overview

The portfolio font system provides a centralized way to load and apply fonts in portfolio section components based on the `globalTheme` prop.

## How It Works

1. **Font Loading**: Each portfolio section receives a `globalTheme` prop containing font selections
2. **Dynamic Font Application**: The `PortfolioFontLoader` utility loads the selected fonts dynamically
3. **CSS Variables**: Fonts are applied using CSS variables for consistent rendering

## Usage in Portfolio Sections

### 1. Import the Font Loader

```typescript
import { PortfolioFontLoader } from "@/lib/portfolioFontLoader";
```

### 2. Use in Component Props

```typescript
interface ComponentProps {
  // ... other props
  globalTheme?: any; // Contains fontHeading, fontBody, fontMono
}
```

### 3. Apply Fonts in Styles

```typescript
const TypographyHero: React.FC<ComponentProps> = ({
  // ... other props
  globalTheme,
}) => {
  const sectionStyle: React.CSSProperties = useMemo(
    () => ({
      // ... other styles
      fontFamily: PortfolioFontLoader.getThemeFontStyle(globalTheme, "body")
        .fontFamily,
    }),
    [globalTheme]
  );

  const titleStyle: React.CSSProperties = useMemo(
    () => ({
      // ... other styles
      ...PortfolioFontLoader.createTypographyStyle(
        globalTheme,
        "heading",
        "2rem",
        "700",
        "1.2",
        "-0.02em"
      ),
    }),
    [globalTheme]
  );

  return (
    <section style={sectionStyle}>
      <h1 style={titleStyle}>Title</h1>
    </section>
  );
};
```

## Available Font Types

### 1. Heading Fonts

- Used for titles, headings, and prominent text
- Access via: `PortfolioFontLoader.getThemeFontStyle(globalTheme, 'heading')`

### 2. Body Fonts

- Used for body text, descriptions, and general content
- Access via: `PortfolioFontLoader.getThemeFontStyle(globalTheme, 'body')`

### 3. Mono Fonts

- Used for code snippets, technical content
- Access via: `PortfolioFontLoader.getThemeFontStyle(globalTheme, 'mono')`

## Font Loading Methods

### Method 1: Direct Font Style

```typescript
const fontStyle = PortfolioFontLoader.getThemeFontStyle(globalTheme, "heading");
// Returns: { fontFamily: "var(--font-montserrat, \"Montserrat\", sans-serif)" }
```

### Method 2: Complete Typography Style

```typescript
const typographyStyle = PortfolioFontLoader.createTypographyStyle(
  globalTheme,
  "heading",
  "2rem", // size
  "700", // weight
  "1.2", // lineHeight
  "-0.02em" // letterSpacing
);
```

### Method 3: CSS Variables

```typescript
const cssVariables = PortfolioFontLoader.getFontCSSVariables(globalTheme);
// Returns: { '--font-heading': '...', '--font-body': '...', '--font-mono': '...' }
```

## Example: Updated Hero Section

```typescript
const TypographyHero: React.FC<ComponentProps> = ({
  // ... props
  globalTheme,
}) => {
  const sectionStyle: React.CSSProperties = useMemo(
    () => ({
      backgroundColor,
      color: textColor,
      padding: `${paddingY}px ${paddingX}px`,
      borderRadius: `${borderRadius}px`,
      boxShadow: shadow !== "none" ? shadow : undefined,
      fontFamily: PortfolioFontLoader.getThemeFontStyle(globalTheme, "body")
        .fontFamily,
      // ... other styles
    }),
    [currentTheme, paddingY, paddingX, borderRadius, shadow, globalTheme]
  );

  const titleStyle: React.CSSProperties = useMemo(
    () => ({
      color: primaryColor,
      ...PortfolioFontLoader.createTypographyStyle(
        globalTheme,
        "heading",
        "clamp(2rem, 4vw, 3rem)",
        "700",
        "1.1",
        "-0.02em"
      ),
    }),
    [primaryColor, globalTheme]
  );

  const codeStyle: React.CSSProperties = useMemo(
    () => ({
      color: secondaryColor,
      ...PortfolioFontLoader.createTypographyStyle(
        globalTheme,
        "mono",
        "1rem",
        "400",
        "1.5",
        "0.05em"
      ),
    }),
    [secondaryColor, globalTheme]
  );

  return (
    <section style={sectionStyle}>
      <h1 style={titleStyle}>{title}</h1>
      <code style={codeStyle}>{greeting}</code>
    </section>
  );
};
```

## Benefits

1. **Consistent Font Loading**: All sections use the same font loading mechanism
2. **Dynamic Font Changes**: Fonts update automatically when `globalTheme` changes
3. **Fallback Support**: Proper fallback fonts ensure text always renders
4. **Performance**: Fonts are loaded efficiently using CSS variables
5. **Maintainability**: Centralized font management makes updates easier

## Migration Guide

To update existing portfolio sections:

1. **Add import**: `import { PortfolioFontLoader } from "@/lib/portfolioFontLoader";`
2. **Add globalTheme prop**: Ensure `globalTheme` is in component props
3. **Replace hardcoded fonts**: Replace `fontFamily: "'Inter', sans-serif"` with `PortfolioFontLoader.getThemeFontStyle(globalTheme, 'body').fontFamily`
4. **Update dependencies**: Add `globalTheme` to `useMemo` dependency arrays

This system ensures that all portfolio sections use the fonts selected in the property editor consistently and efficiently.
