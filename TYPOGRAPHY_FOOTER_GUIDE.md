# Typography Footer Component Guide

## Overview

The **Typography Footer** component is a modern, developer-focused footer that follows the typography theme used throughout your portfolio builder. It features a clean design with customizable sections for social links, navigation, contact information, and branding.

## Features

### 🎨 **Typography Theme Consistency**

- Follows the same design patterns as other typography components
- Uses developer-focused terminology and styling
- Consistent color scheme and typography hierarchy

### 📱 **Responsive Design**

- Mobile-first approach with responsive grid layout
- Adapts to different screen sizes seamlessly
- Optimized for both desktop and mobile viewing

### ⚙️ **Highly Customizable**

- Toggle visibility for different sections
- Customizable content for all text elements
- Flexible social links and contact information
- Configurable styling properties

## Component Structure

### **Main Sections**

1. **Brand Section** - Title, subtitle, and description
2. **Quick Links** - Navigation links with numbered styling
3. **Contact Info** - Email, location, and website
4. **Social Links** - Social media links with icons
5. **Copyright** - Copyright notice and "Made with" section

### **Visual Elements**

- **Background Pattern** - Subtle grid pattern overlay
- **Typography Hierarchy** - Clear visual hierarchy with different font weights and sizes
- **Interactive Elements** - Hover effects on links and buttons
- **Developer Touches** - Code-like styling and terminology

## Props Configuration

### **Content Props**

| Prop            | Type   | Default                       | Description                 |
| --------------- | ------ | ----------------------------- | --------------------------- |
| `title`         | string | "LET'S_CONNECT()"             | Main footer title           |
| `subtitle`      | string | "GET_IN_TOUCH"                | Footer subtitle             |
| `description`   | string | "Ready to collaborate..."     | Description text            |
| `copyrightText` | string | "© 2024 All rights reserved." | Copyright notice            |
| `socialLinks`   | array  | Default social links          | Array of social media links |
| `quickLinks`    | array  | Default navigation links      | Array of navigation links   |
| `contactInfo`   | object | Default contact info          | Contact information object  |

### **Visibility Props**

| Prop              | Type    | Default | Description                  |
| ----------------- | ------- | ------- | ---------------------------- |
| `showSocialLinks` | boolean | true    | Show social media section    |
| `showQuickLinks`  | boolean | true    | Show navigation links        |
| `showContactInfo` | boolean | true    | Show contact information     |
| `showCopyright`   | boolean | true    | Show copyright section       |
| `showMadeWith`    | boolean | true    | Show "Made with love & code" |

### **Style Props**

| Prop              | Type   | Default   | Description          |
| ----------------- | ------ | --------- | -------------------- |
| `backgroundColor` | string | "#0f172a" | Background color     |
| `textColor`       | string | "#f8fafc" | Main text color      |
| `primaryColor`    | string | "#3b82f6" | Primary accent color |
| `secondaryColor`  | string | "#64748b" | Secondary text color |
| `accentColor`     | string | "#8b5cf6" | Accent color         |
| `paddingY`        | string | "80"      | Vertical padding     |
| `paddingX`        | string | "32"      | Horizontal padding   |

## Usage Examples

### **Basic Usage**

```tsx
<TypographyFooter />
```

### **Custom Content**

```tsx
<TypographyFooter
  title="CONNECT_WITH_ME()"
  subtitle="LET'S_BUILD_TOGETHER"
  description="Ready to collaborate on innovative projects and create amazing digital experiences."
  socialLinks={[
    {
      platform: "GitHub",
      url: "https://github.com/myusername",
      username: "@myusername",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/myusername",
      username: "/in/myusername",
    },
  ]}
/>
```

### **Minimal Footer**

```tsx
<TypographyFooter
  showQuickLinks={false}
  showContactInfo={false}
  showMadeWith={false}
/>
```

## Integration with Portfolio Builder

The TypographyFooter component is fully integrated with your portfolio builder:

1. **Component Registry** - Added to the footer section with ID `typography-footer`
2. **Props Schema** - Complete propsSchema for ContentEditor integration
3. **Default Props** - Sensible defaults for immediate use
4. **Theme Support** - Compatible with global theme system

## Design Philosophy

### **Developer-Focused**

- Uses programming terminology (e.g., "LET'S_CONNECT()")
- Code-like styling and structure
- Technical color scheme

### **Modern & Clean**

- Minimalist design approach
- Clear visual hierarchy
- Subtle animations and interactions

### **Accessible**

- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader friendly

## Customization Tips

1. **Color Scheme** - Adjust colors to match your portfolio theme
2. **Content** - Personalize all text content for your brand
3. **Social Links** - Add or remove social platforms as needed
4. **Sections** - Toggle sections on/off based on your needs
5. **Styling** - Modify padding, fonts, and other style properties

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

---

The TypographyFooter component provides a professional, modern footer that perfectly complements your typography-themed portfolio while maintaining full customization capabilities.
