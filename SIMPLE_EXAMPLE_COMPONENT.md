# Simple Example Component for Testing

Here's a simple component you can use to test the submission form:

## 🎯 **Component: Simple Info Card**

### **Step 1: Basic Information**

**Component Name:** `Simple Info Card`

**Description:**

```
A clean and simple information card component with customizable colors and content. Perfect for displaying contact information, project details, or any key information in portfolios.
```

**Category:** `content`

**Tags:**

- `card`
- `info`
- `simple`
- `customizable`

**Author Information:**

- **Name:** `Test User`
- **Email:** `test@example.com`
- **GitHub:** `testuser`

---

### **Step 2: Component Code**

```tsx
import React from "react";

export default function SimpleInfoCard(props) {
  const {
    title = "Information",
    description = "This is a sample description",
    icon = "ℹ️",
    backgroundColor = "#f8fafc",
    textColor = "#1e293b",
    borderColor = "#e2e8f0",
    ...otherProps
  } = props;

  return (
    <div
      className="p-6 rounded-lg border transition-all duration-200 hover:shadow-md"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        borderColor: borderColor,
      }}
      {...otherProps}
    >
      <div className="flex items-start gap-4">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm opacity-80 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
```

---

### **Step 3: Media & Links**

**Thumbnail:** Upload any image (400x300px recommended) - Optional

**Demo URL:** `https://example.com/demo/simple-info-card`

**Documentation URL:** `https://docs.example.com/components/simple-info-card`

**GitHub Repository URL:** `https://github.com/testuser/simple-info-card`

**Version:** `1.0.0`

**Dependencies:** None

**Compatibility:**

- ✅ React 16+
- ✅ React 18+
- ✅ JavaScript
- ✅ Tailwind CSS

**Premium Component:** No (Free)

---

## 🎨 **Usage Examples**

### **Basic Usage:**

```tsx
<SimpleInfoCard
  title="Contact Info"
  description="Email: hello@example.com"
  icon="📧"
/>
```

### **Custom Colors:**

```tsx
<SimpleInfoCard
  title="Project Details"
  description="A React-based portfolio builder"
  icon="🚀"
  backgroundColor="#3b82f6"
  textColor="#ffffff"
  borderColor="#1d4ed8"
/>
```

### **Multiple Cards:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <SimpleInfoCard title="Email" description="hello@example.com" icon="📧" />
  <SimpleInfoCard title="Location" description="San Francisco, CA" icon="📍" />
</div>
```

---

## 🔧 **Props Interface**

```typescript
interface SimpleInfoCardProps {
  title?: string; // Card title
  description?: string; // Card description
  icon?: string; // Emoji or icon
  backgroundColor?: string; // Background color (hex)
  textColor?: string; // Text color (hex)
  borderColor?: string; // Border color (hex)
  className?: string; // Additional CSS classes
}
```

---

## ✨ **Features**

- **Simple & Clean:** Minimal design that fits anywhere
- **Customizable Colors:** Full color control
- **Responsive:** Works on all screen sizes
- **Lightweight:** No dependencies
- **Accessible:** Semantic HTML structure
- **Hover Effects:** Subtle shadow on hover

---

## 🚀 **Perfect for Testing**

This component is ideal for testing because:

- ✅ **No Dependencies** - Pure React component
- ✅ **Simple Code** - Easy to understand and modify
- ✅ **Safe Execution** - No dangerous APIs
- ✅ **Quick to Test** - Immediate visual feedback
- ✅ **Realistic Use Case** - Actually useful in portfolios

Use this to test the component submission and React Live integration!
