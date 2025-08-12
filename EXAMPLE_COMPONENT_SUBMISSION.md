# Example Component Submission

Here's a complete example of how to submit a component through the form:

## 🎯 **Component: Animated Skill Card**

### **Step 1: Basic Information**

**Component Name:** `Animated Skill Card`

**Description:**

```
A beautiful animated skill card component that displays programming skills with hover effects, progress bars, and smooth animations. Perfect for showcasing technical expertise in portfolio projects or skills sections.
```

**Category:** `skills`

**Tags:**

- `animation`
- `skills`
- `progress`
- `hover-effects`
- `typescript`

**Author Information:**

- **Name:** `John Developer`
- **Email:** `john@example.com`
- **GitHub:** `johndeveloper`

---

### **Step 2: Component Code**

```tsx
import React, { useState } from "react";

export default function AnimatedSkillCard(props) {
  const [isHovered, setIsHovered] = useState(false);

  const {
    skillName = "React",
    skillLevel = 85,
    icon = "⚛️",
    description = "Frontend development with React",
    backgroundColor = "#3b82f6",
    textColor = "#ffffff",
    ...otherProps
  } = props;

  return (
    <div
      className="relative overflow-hidden rounded-lg p-6 transition-all duration-300 ease-in-out cursor-pointer"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        transform: isHovered
          ? "translateY(-4px) scale(1.02)"
          : "translateY(0) scale(1)",
        boxShadow: isHovered
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...otherProps}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, ${textColor} 0%, transparent 50%)`,
          transform: isHovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.3s ease-in-out",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="text-3xl transition-transform duration-300"
            style={{ transform: isHovered ? "rotate(360deg)" : "rotate(0deg)" }}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">{skillName}</h3>
            <p className="text-sm opacity-90">{description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Proficiency</span>
            <span className="text-sm font-bold">{skillLevel}%</span>
          </div>
          <div className="w-full bg-black bg-opacity-20 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${skillLevel}%`,
                backgroundColor: textColor,
                transform: isHovered ? "scaleX(1.05)" : "scaleX(1)",
                transformOrigin: "left",
              }}
            />
          </div>
        </div>

        {/* Skill Level Indicator */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index < Math.floor(skillLevel / 20)
                  ? "bg-current"
                  : "bg-current opacity-30"
              }`}
              style={{
                transform: isHovered ? "scale(1.2)" : "scale(1)",
                transitionDelay: `${index * 50}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 bg-white bg-opacity-10 transition-opacity duration-300"
          style={{ opacity: 0.1 }}
        />
      )}
    </div>
  );
}
```

---

### **Step 3: Media & Links**

**Thumbnail:** Upload a screenshot of the component (400x300px recommended)

**Demo URL:** `https://example.com/demo/animated-skill-card`

**Documentation URL:** `https://docs.example.com/components/animated-skill-card`

**GitHub Repository URL:** `https://github.com/johndeveloper/animated-skill-card`

**Version:** `1.0.0`

**Dependencies:**

- `react`
- `typescript`

**Compatibility:**

- ✅ React 16+
- ✅ React 18+
- ✅ TypeScript
- ✅ Tailwind CSS

**Premium Component:** No (Free)

---

## 🎨 **Usage Examples**

### **Basic Usage:**

```tsx
<AnimatedSkillCard
  skillName="React"
  skillLevel={85}
  icon="⚛️"
  description="Frontend development with React"
/>
```

### **Custom Styling:**

```tsx
<AnimatedSkillCard
  skillName="TypeScript"
  skillLevel={90}
  icon="📘"
  description="Type-safe JavaScript development"
  backgroundColor="#3178c6"
  textColor="#ffffff"
/>
```

### **Multiple Skills:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <AnimatedSkillCard skillName="React" skillLevel={85} icon="⚛️" />
  <AnimatedSkillCard skillName="TypeScript" skillLevel={90} icon="📘" />
  <AnimatedSkillCard skillName="Node.js" skillLevel={75} icon="🟢" />
</div>
```

---

## 🔧 **Props Interface**

```typescript
interface AnimatedSkillCardProps {
  skillName?: string; // Name of the skill
  skillLevel?: number; // Proficiency level (0-100)
  icon?: string; // Emoji or icon for the skill
  description?: string; // Brief description
  backgroundColor?: string; // Background color (hex)
  textColor?: string; // Text color (hex)
  className?: string; // Additional CSS classes
}
```

---

## ✨ **Features**

- **Smooth Animations:** Hover effects with scale and rotation
- **Progress Visualization:** Animated progress bar
- **Customizable Colors:** Full color customization
- **Responsive Design:** Works on all screen sizes
- **Accessibility:** Proper ARIA labels and keyboard navigation
- **TypeScript Support:** Full type safety
- **Performance Optimized:** Efficient re-renders

---

## 🚀 **Why This Component?**

This component demonstrates:

- ✅ **React Hooks** (useState)
- ✅ **Event Handling** (onMouseEnter/onMouseLeave)
- ✅ **Dynamic Styling** (inline styles and Tailwind)
- ✅ **Props Interface** (flexible configuration)
- ✅ **Animation Effects** (CSS transitions)
- ✅ **Responsive Design** (mobile-friendly)
- ✅ **Real-world Use Case** (portfolio skills section)

Perfect for testing the React Live integration and showing how marketplace components can enhance portfolio builders!
