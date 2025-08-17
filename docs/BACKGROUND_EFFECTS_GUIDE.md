# Background Effects Guide

This guide explains how to use the new background effects feature in the portfolio builder to add stunning visual effects to your portfolio sections.

## Overview

The background effects system allows you to add various visual enhancements to your portfolio sections, including:

- **Gradient Grids**: Subtle grid patterns with customizable colors and opacity
- **Dots Patterns**: Polka dot backgrounds with adjustable size and spacing
- **Lines Patterns**: Diagonal line patterns for a modern look
- **Waves**: Organic wave-like patterns
- **Mesh Gradients**: Complex gradient patterns with multiple color stops
- **Noise Textures**: Subtle noise patterns for texture
- **Custom Gradients**: Linear, radial, and conic gradients
- **Advanced Effects**: Backdrop blur, box shadows, and custom borders

## How to Use

### 1. Access the Bulk Style Modal

1. Open the portfolio builder
2. Click the "Bulk Style" button in the right sidebar
3. Navigate to the "Effects" tab

### 2. Choose Background Effects

#### Basic Effects

- **Background Effect**: Select from gradient-grid, dots, lines, waves, mesh, or noise
- **Effect Color**: Choose the color for your pattern
- **Effect Opacity**: Control the intensity (0.1 to 1.0)
- **Effect Size**: Adjust the scale of the pattern (e.g., "20px")

#### Gradient Options

- **Gradient Type**: Linear, radial, or conic gradients
- **Gradient Direction**: Choose from 8 different directions
- **Gradient Colors**: Array of colors for the gradient

#### Advanced Effects

- **Backdrop Blur**: Add blur effects (e.g., "8px")
- **Box Shadow**: Custom shadow effects
- **Border Style**: Solid, dashed, dotted, or double borders
- **Border Width**: Border thickness
- **Border Color**: Border color

### 3. Preview and Apply

- Use the live preview to see how your effects will look
- Click "Apply to All Components" to apply the effects
- Use the reset button to clear all effects

## Technical Implementation

### Background Effects Utility

The system uses a utility library (`src/lib/backgroundEffects.ts`) that generates CSS for various effects:

```typescript
import { generateCompleteStyleCSS } from "@/lib/backgroundEffects";

const effectSettings = {
  backgroundEffect: {
    type: "gradient-grid",
    color: "#3b82f6",
    opacity: "0.1",
    size: "20px",
    blend: "normal",
  },
  gradient: {
    type: "linear",
    direction: "to-r",
    colors: ["#3b82f6", "#8b5cf6"],
  },
};

const css = generateCompleteStyleCSS(effectSettings);
```

### BackgroundEffectRenderer Component

Use the `BackgroundEffectRenderer` component to apply effects to any section:

```tsx
import { BackgroundEffectRenderer } from "@/components/ui/BackgroundEffectRenderer";

function MyPortfolioSection({ styles }) {
  return (
    <BackgroundEffectRenderer styles={styles}>
      <div className="your-content">{/* Your portfolio content */}</div>
    </BackgroundEffectRenderer>
  );
}
```

### Integration with Existing Components

To integrate background effects with existing portfolio components:

```tsx
// Before
export const Hero = ({ theme, ...props }) => {
  return (
    <section style={{ backgroundColor: theme.background }}>
      {/* content */}
    </section>
  );
};

// After
export const Hero = ({ theme, styles, ...props }) => {
  return (
    <BackgroundEffectRenderer styles={styles}>
      <section style={{ backgroundColor: theme.background }}>
        {/* content */}
      </section>
    </BackgroundEffectRenderer>
  );
};
```

## Available Effects

### 1. Gradient Grid

Creates a subtle grid pattern using gradients:

```css
background-image: linear-gradient(color opacity), linear-gradient(
    90deg,
    transparent 50%,
    color opacity 50%
  ), linear-gradient(transparent 50%, color opacity 50%);
background-size: size size;
```

### 2. Dots Pattern

Creates a polka dot pattern:

```css
background-image: radial-gradient(circle, color opacity 1px, transparent 1px);
background-size: size size;
```

### 3. Lines Pattern

Creates diagonal lines:

```css
background-image: repeating-linear-gradient(
  45deg,
  transparent,
  transparent 2px,
  color opacity 2px,
  color opacity 4px
);
```

### 4. Waves

Creates organic wave patterns:

```css
background-image: radial-gradient(
    ellipse at 50% 50%,
    color opacity 0%,
    transparent 50%
  ), radial-gradient(ellipse at 80% 20%, color opacity 0%, transparent 50%),
  radial-gradient(ellipse at 20% 80%, color opacity 0%, transparent 50%);
```

### 5. Mesh Gradient

Creates complex gradient patterns:

```css
background-image: radial-gradient(
    at 40% 20%,
    color opacity 0px,
    transparent 50%
  ), radial-gradient(at 80% 0%, color opacity 0px, transparent 50%);
/* ... more radial gradients */
```

### 6. Noise Texture

Creates subtle noise patterns using SVG filters:

```css
background-image: url("data:image/svg+xml,...");
background-size: size size;
opacity: opacity;
```

## Best Practices

### 1. Subtle Effects

- Use low opacity values (0.1-0.3) for background effects
- Avoid overwhelming the content with too many effects
- Test on different screen sizes

### 2. Performance

- Background effects are CSS-based and performant
- Avoid using too many effects simultaneously
- Consider using `will-change` for animations

### 3. Accessibility

- Ensure sufficient contrast between text and background effects
- Test with screen readers
- Provide fallbacks for older browsers

### 4. Responsive Design

- Effects scale automatically with the container
- Test on mobile devices
- Consider different effect sizes for different screen sizes

## Examples

### Modern Tech Portfolio

```typescript
const techStyles = {
  backgroundEffect: "gradient-grid",
  backgroundEffectColor: "#3b82f6",
  backgroundEffectOpacity: "0.05",
  backgroundEffectSize: "30px",
  gradientType: "linear",
  gradientDirection: "to-br",
  gradientColors: ["#1e293b", "#334155"],
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  backdropBlur: "4px",
};
```

### Creative Designer Portfolio

```typescript
const creativeStyles = {
  backgroundEffect: "waves",
  backgroundEffectColor: "#f59e0b",
  backgroundEffectOpacity: "0.15",
  backgroundEffectSize: "40px",
  gradientType: "conic",
  gradientColors: ["#fbbf24", "#f59e0b", "#d97706"],
  borderStyle: "dashed",
  borderWidth: "2px",
  borderColor: "#f59e0b",
};
```

### Minimal Portfolio

```typescript
const minimalStyles = {
  backgroundEffect: "dots",
  backgroundEffectColor: "#6b7280",
  backgroundEffectOpacity: "0.1",
  backgroundEffectSize: "25px",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
  backdropBlur: "2px",
};
```

## Troubleshooting

### Effects Not Showing

1. Check that the effect type is not "none"
2. Verify that effect color and opacity are set
3. Ensure the component is wrapped with `BackgroundEffectRenderer`

### Performance Issues

1. Reduce the number of simultaneous effects
2. Lower the effect size for better performance
3. Use simpler effects on mobile devices

### Styling Conflicts

1. Check for conflicting CSS properties
2. Ensure proper CSS specificity
3. Use the `!important` flag if necessary

## Future Enhancements

Planned features for future releases:

- Animated background effects
- More pattern types (hexagons, triangles, etc.)
- Custom SVG pattern uploads
- Effect presets and templates
- Advanced blending modes
- Performance optimizations

## Support

For issues or questions about background effects:

1. Check the console logs for debugging information
2. Review the generated CSS in browser dev tools
3. Test with different effect combinations
4. Report bugs with specific reproduction steps
