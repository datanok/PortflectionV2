# Dropdown Props Guide for Portflection Registry

This guide explains how to add dropdown/select fields to your component props in the Portflection registry system.

## Overview

The registry system now supports dropdown fields through the `propsSchema` property in component variants. This allows you to provide users with predefined options instead of free-form text input.

## How to Add Dropdown Props

### 1. Define the Props Schema

Add a `propsSchema` object to your component variant in `src/lib/portfolio/registry.ts`:

```typescript
{
  id: "my-component",
  name: "My Component",
  component: MyComponent,
  defaultProps: {
    title: "Default Title",
    layout: "grid",
    theme: "light",
  },
  propsSchema: {
    title: {
      type: "text",
      label: "Component Title",
      description: "The main title for this component",
      placeholder: "Enter title...",
    },
    layout: {
      type: "select",
      label: "Layout Style",
      description: "Choose the layout style for this component",
      options: [
        { value: "grid", label: "Grid Layout" },
        { value: "list", label: "List Layout" },
        { value: "cards", label: "Card Layout" },
      ],
    },
    theme: {
      type: "select",
      label: "Theme",
      description: "Select the visual theme",
      options: [
        { value: "light", label: "Light Theme" },
        { value: "dark", label: "Dark Theme" },
        { value: "auto", label: "Auto (System)" },
      ],
    },
  },
}
```

### 2. Field Types Available

The `propsSchema` supports the following field types:

- **`text`**: Single-line text input
- **`textarea`**: Multi-line text input
- **`boolean`**: Toggle switch
- **`select`**: Dropdown with predefined options
- **`array`**: Array of items (auto-detected)
- **`object`**: Object with nested properties (auto-detected)

### 3. Field Metadata Properties

Each field can have the following metadata:

- **`type`**: The field type (required)
- **`label`**: Human-readable label (optional, defaults to key name)
- **`description`**: Help text shown below the label (optional)
- **`placeholder`**: Placeholder text for input fields (optional)
- **`options`**: Array of options for select fields (required for select type)

### 4. Select Field Options

For `select` type fields, provide an array of options:

```typescript
options: [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];
```

- **`value`**: The actual value stored in the component props
- **`label`**: The text displayed in the dropdown

## Examples

### Example 1: Layout Selection

```typescript
layout: {
  type: "select",
  label: "Layout Mode",
  description: "Choose how to display the content",
  options: [
    { value: "grid", label: "Grid Layout" },
    { value: "list", label: "List Layout" },
    { value: "masonry", label: "Masonry Layout" },
  ],
}
```

### Example 2: Boolean with Select

```typescript
showFeature: {
  type: "boolean",
  label: "Show Feature",
  description: "Enable or disable this feature",
},
featureStyle: {
  type: "select",
  label: "Feature Style",
  description: "Choose the visual style when feature is enabled",
  options: [
    { value: "default", label: "Default Style" },
    { value: "highlighted", label: "Highlighted Style" },
    { value: "minimal", label: "Minimal Style" },
  ],
}
```

### Example 3: Text with Enhanced Metadata

```typescript
title: {
  type: "text",
  label: "Section Title",
  description: "The main heading for this section",
  placeholder: "Enter a compelling title...",
},
description: {
  type: "textarea",
  label: "Section Description",
  description: "Provide a brief overview of this section",
  placeholder: "Describe what this section contains...",
},
```

## Benefits

1. **Better UX**: Users get clear options instead of guessing what values to enter
2. **Consistency**: Ensures consistent data across portfolios
3. **Validation**: Prevents invalid values from being entered
4. **Documentation**: Built-in help text and descriptions
5. **Accessibility**: Proper labels and descriptions for screen readers

## Migration from Auto-Detection

If you have existing components that rely on auto-detection, you can gradually add `propsSchema` to improve the user experience. The system will:

1. Use `propsSchema` if available
2. Fall back to auto-detection if no schema is provided
3. Maintain backward compatibility

## Best Practices

1. **Use descriptive labels**: Make field purposes clear
2. **Provide helpful descriptions**: Explain what each field does
3. **Use meaningful option values**: Values should be semantic and consistent
4. **Group related fields**: Use consistent naming patterns
5. **Test your options**: Ensure all option values work with your component

## Troubleshooting

- **Dropdown not showing**: Ensure `type: "select"` and `options` array are provided
- **Options not appearing**: Check that `options` array is properly formatted
- **Values not saving**: Verify that option `value` properties match expected values in your component
