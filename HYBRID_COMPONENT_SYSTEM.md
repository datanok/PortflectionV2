# Hybrid Component System

## 🎯 **Overview**

The Hybrid Component System bridges the gap between **static registry components** (built-in) and **dynamic marketplace components** (community-contributed) using React Live for safe code execution.

## 🏗️ **Architecture**

### **Two Component Sources:**

1. **Static Registry** (`src/lib/portfolio/registry.ts`)

   - Built-in components imported directly
   - Always available to all users
   - No installation required

2. **Marketplace Components** (Database)
   - Community-contributed components
   - Stored as code strings in database
   - Requires installation
   - Rendered using React Live

### **Integration Layer:**

- **Hybrid Registry** (`src/lib/portfolio/hybrid-registry.ts`)
- **React Live Wrapper** (`src/components/LiveMarketplaceComponent.tsx`)
- **Updated Component Palette** with both sources
- **Enhanced Portfolio Builder** supporting both types

## 🔧 **Key Components**

### **1. LiveMarketplaceComponent.tsx**

```typescript
// Safely renders marketplace components from code strings
<LiveMarketplaceComponent
  componentCode={componentCode}
  componentProps={props}
  scope={safeScope}
/>
```

**Features:**

- ✅ **Safe Execution**: Controlled scope with only allowed APIs
- ✅ **Error Handling**: Graceful fallbacks for malformed code
- ✅ **Loading States**: Better UX during component compilation
- ✅ **Props Support**: Passes portfolio data and styling

### **2. Hybrid Registry**

```typescript
// Combines static and marketplace components
const hybridComponents = getHybridComponentsForSection(
  "hero",
  marketplaceComponents
);
```

**Helper Functions:**

- `isMarketplaceComponent()` - Type guard for marketplace components
- `getComponentDisplayName()` - Shows "(Community)" for marketplace components
- `getComponentThumbnail()` - Handles fallback images
- `getComponentTags()` - Adds source tags (built-in/community)

### **3. Updated Component Palette**

- **Shows both** built-in and installed marketplace components
- **Visual indicators** for component source (Community badge)
- **Same drag-and-drop** interface for both types
- **Search and filtering** across both sources

## 🛡️ **Security Features**

### **Safe Scope Configuration:**

```typescript
const createSafeScope = (customScope = {}) => ({
  // Allowed React hooks
  useState: React.useState,
  useEffect: React.useEffect,
  useCallback: React.useCallback,
  useMemo: React.useMemo,
  useRef: React.useRef,
  useContext: React.useContext,

  // Allowed UI components
  Card,
  CardContent,
  Alert,
  AlertDescription,

  // Blocked dangerous APIs
  fetch: undefined,
  localStorage: undefined,
  window: undefined,
  document: undefined,
  eval: undefined,
  Function: undefined,

  // Custom scope
  ...customScope,
});
```

### **Security Measures:**

- ✅ **No DOM access** - Components can't manipulate document/window
- ✅ **No network requests** - fetch, XMLHttpRequest blocked
- ✅ **No storage access** - localStorage, sessionStorage blocked
- ✅ **No code evaluation** - eval, Function constructors blocked
- ✅ **Controlled scope** - Only whitelisted APIs available

## 🔄 **Data Flow**

### **Installation Process:**

1. **User installs** component from marketplace
2. **Database record** created (`ComponentInstallation`)
3. **Component appears** in portfolio builder palette
4. **Drag and drop** works same as built-in components

### **Rendering Process:**

1. **Portfolio loads** with marketplace components
2. **ComponentRenderer** detects `isMarketplace: true`
3. **LiveMarketplaceComponent** renders from code string
4. **React Live** compiles and executes safely
5. **Component displays** with portfolio data and styling

## 📊 **Database Schema**

### **ComponentInstallation:**

```prisma
model ComponentInstallation {
  id          String   @id @default(cuid()) @map("_id")
  userId      String
  componentId String
  installedAt DateTime @default(now())

  user      User              @relation(fields: [userId], references: [id])
  component ApprovedComponent @relation(fields: [componentId], references: [id])
}
```

### **ApprovedComponent:**

```prisma
model ApprovedComponent {
  id            String   @id @default(cuid()) @map("_id")
  name          String
  description   String
  componentCode String   // The actual React component code
  category      String
  tags          String[]
  downloads     Int      @default(0)
  rating        Float    @default(0)
  // ... other fields
}
```

## 🎨 **UI/UX Features**

### **Visual Indicators:**

- **Community Badge**: Green badge for marketplace components
- **Source Tags**: "community", "marketplace" vs "built-in"
- **Author Attribution**: Shows component author in descriptions
- **Installation Status**: Tracks which components user has installed

### **Component Palette:**

- **Unified Interface**: Both types appear in same sections
- **Smart Filtering**: Search across both sources
- **Popular Components**: Combines popular from both sources
- **Category Mapping**: Maps marketplace categories to sections

## 🚀 **Usage Examples**

### **Adding a Marketplace Component:**

```typescript
// 1. Install from marketplace
await fetch("/api/components/marketplace", {
  method: "POST",
  body: JSON.stringify({
    componentId: "animated-hero",
    action: "install",
  }),
});

// 2. Component appears in portfolio builder
// 3. Drag and drop works normally
// 4. Renders using React Live
```

### **Creating a Marketplace Component:**

```typescript
// Component code string (stored in database)
const componentCode = `
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function MyComponent(props) {
  return (
    <Card style={{ backgroundColor: props.backgroundColor }}>
      <CardContent>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </CardContent>
    </Card>
  );
}
`;
```

## 🔧 **Configuration**

### **Adding New UI Components to Safe Scope:**

```typescript
// In LiveMarketplaceComponent.tsx
const createSafeScope = (customScope = {}) => ({
  // ... existing scope
  Button, // Add new components here
  Input,
  Textarea,
  // ... custom scope
});
```

### **Extending Component Categories:**

```typescript
// In hybrid-registry.ts
const sectionCategoryMap: Record<SectionType, string[]> = {
  hero: ["layout", "content"],
  about: ["content"],
  // Add new mappings here
};
```

## 🧪 **Testing**

### **Test Component:**

```typescript
// src/components/TestMarketplaceComponent.tsx
// Contains both regular component and code string version
// Use for testing the React Live integration
```

### **Testing Scenarios:**

1. **Installation**: Install component from marketplace
2. **Palette Display**: Verify appears in portfolio builder
3. **Drag and Drop**: Test adding to portfolio
4. **Rendering**: Verify React Live execution
5. **Props**: Test passing portfolio data
6. **Styling**: Test theme integration
7. **Error Handling**: Test malformed code

## 🎯 **Benefits**

### **For Users:**

- ✅ **More Components**: Access to community contributions
- ✅ **Same Experience**: No difference between built-in and marketplace
- ✅ **Safe Execution**: Protected from malicious code
- ✅ **Easy Discovery**: Browse and install from marketplace

### **For Developers:**

- ✅ **Extensible**: Easy to add new component sources
- ✅ **Maintainable**: Clear separation of concerns
- ✅ **Secure**: Controlled execution environment
- ✅ **Performant**: Lazy loading of marketplace components

### **For Community:**

- ✅ **Contribution Path**: Submit components for review
- ✅ **Recognition**: Author attribution and ratings
- ✅ **Distribution**: Reach users through marketplace
- ✅ **Feedback**: Reviews and download metrics

## 🔮 **Future Enhancements**

1. **Component Versioning**: Support for component updates
2. **Dependency Management**: Handle component dependencies
3. **Advanced Styling**: More sophisticated theme integration
4. **Performance Optimization**: Code splitting and caching
5. **Analytics**: Usage tracking and insights
6. **Monetization**: Premium component marketplace

---

**The Hybrid Component System successfully bridges static and dynamic components while maintaining security, performance, and user experience! 🎉**
