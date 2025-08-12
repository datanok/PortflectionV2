# Migration Guide: From react-live to Community Components

## Overview
This guide helps you migrate from the old `react-live` based system to the new file-based community component system.

## Step 1: Remove react-live dependency

```bash
npm uninstall react-live
```

## Step 2: Update component usage

### Old way (using react-live):
```tsx
<LiveMarketplaceComponent
  componentCode={`
    function MyComponent() {
      return <div>Hello World</div>
    }
  `}
  componentProps={{ title: "Hello" }}
/>
```

### New way (using community system):
```tsx
<LiveMarketplaceComponent
  componentId="my-component-id"
  componentProps={{ title: "Hello" }}
/>
```

## Step 3: Convert existing components

1. Run the conversion script:
```bash
npm run convert-components
```

2. This will:
   - Convert approved components from the database to `.tsx` files
   - Place them in `src/components/community/`
   - Update the component registry

## Step 4: Update your portfolio builder

Replace instances of the old system with the new one:

```tsx
// Old
import { LiveMarketplaceComponent } from '@/components/live/LiveMarketplaceComponent';

// New
import { CommunityComponentRenderer } from '@/components/community/CommunityComponentRenderer';
```

## Step 5: Test the migration

1. Visit `/test-community-components` to test the new system
2. Verify that existing portfolios still work
3. Check that new components can be added

## Benefits of the new system:

- ✅ **Security**: No more `eval()` or dangerous code execution
- ✅ **Performance**: Only used components are bundled
- ✅ **Maintainability**: Standard React patterns and TypeScript
- ✅ **Scalability**: Components are actual files that can be version controlled
- ✅ **Developer Experience**: Better error handling and debugging

## Backward Compatibility

The old `LiveMarketplaceComponent` still works but will show a warning for legacy `componentCode` usage. It's recommended to migrate to `componentId` for new components. 