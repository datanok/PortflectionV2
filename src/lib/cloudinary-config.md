# Cloudinary Configuration Guide

## Environment Variables Setup

To enable dynamic memoji loading from Cloudinary, add these environment variables to your `.env.local` file:

```bash
# Cloudinary Configuration
# Get these from your Cloudinary Dashboard: https://cloudinary.com/console
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

## How It Works

The memoji system now supports both static JSON and dynamic Cloudinary loading:

### 1. **Static Loading (Default)**
- Uses the existing `scripts/memojis.json` file
- Works without any configuration
- Fast and reliable for development

### 2. **Dynamic Cloudinary Loading**
- Fetches memojis directly from your Cloudinary account
- Automatically detects new uploads
- Requires API credentials

### 3. **Fallback Strategy**
- Tries Cloudinary first (server-side)
- Falls back to static JSON if Cloudinary fails
- Ensures the app always works

## API Endpoints

### GET `/api/memojis`

Query parameters:
- `source=fallback` (default) - Try Cloudinary, fallback to static
- `source=cloudinary` - Only Cloudinary
- `source=static` - Only static JSON

### POST `/api/memojis`

Body:
```json
{
  "action": "refresh-cache"
}
```

## URL Structure

The system now handles Cloudinary URLs with version numbers:

**Input:** `https://res.cloudinary.com/portflection/image/upload/v1759482913/Portflection%20Assets/memojis/activity_6_qqwwrx.png`

**Optimized:** `https://res.cloudinary.com/portflection/image/upload/w_100,h_100,c_fill,q_auto,f_auto/v1759482913/Portflection%20Assets/memojis/activity_6_qqwwrx.png`

## Benefits

1. **Automatic Optimization**: All images are automatically optimized for different sizes
2. **Version Handling**: Properly handles Cloudinary version numbers
3. **Fallback Support**: Always works even without Cloudinary credentials
4. **Performance**: Cached results for better performance
5. **Flexibility**: Easy to switch between static and dynamic loading

## Usage in Components

The memoji picker automatically uses the best available source:

```tsx
import SimpleMemojiPicker from '@/components/ui/SimpleMemojiPicker';

<SimpleMemojiPicker
  onSelect={handleMemojiSelect}
  selectedMemoji={selectedMemoji}
/>
```

No changes needed in your existing code!
