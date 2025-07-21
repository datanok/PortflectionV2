# Portfolio API Documentation

This document describes the comprehensive API for managing portfolio layouts in the Portflection application.

## Overview

The Portfolio API provides a complete solution for saving, retrieving, updating, and managing portfolio layouts with the following features:

- **Authentication**: All routes require user authentication via session
- **Validation**: Comprehensive input validation using Zod schemas
- **Error Handling**: Graceful error handling with detailed error messages
- **Analytics**: Built-in view tracking and analytics capabilities
- **Flexibility**: Support for both component-based layouts and legacy portfolio types

## API Routes

### 1. Save Portfolio

**Endpoint**: `POST /api/portfolio/save`  
**Purpose**: Create a new portfolio or update an existing one

#### Request Body

```typescript
{
  // Basic info
  name: string;                    // Required: Portfolio name (1-100 chars)
  slug: string;                    // Required: URL slug (a-z, 0-9, hyphens only)
  description?: string;            // Optional: Portfolio description (max 500 chars)

  // Layout and theme
  layout: PortfolioComponent[];    // Required: Array of portfolio components
  theme?: GlobalTheme;             // Optional: Global theme settings

  // Metadata
  isPublic: boolean;               // Required: Whether portfolio is publicly accessible
  tags?: string[];                 // Optional: Array of tags (max 10)
  thumbnail?: string;              // Optional: Thumbnail image URL

  // Legacy fields (for backward compatibility)
  portfolioType?: 'developer' | 'designer' | 'contentCreator' | 'businessConsulting';
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  about?: string;
  profileImage?: string;
  contactForm?: boolean;
  linkedinLink?: string;
  personalWebsite?: string;
  socials?: Array<{
    type: string;
    url: string;
    username: string;
  }>;
  layoutType?: string;
  extraData?: Record<string, any>;
}
```

#### Portfolio Component Structure

```typescript
{
  id?: string;                     // Optional: Component ID (for updates)
  type: string;                    // Required: Component type (e.g., 'hero', 'about')
  variant: string;                 // Required: Component variant (e.g., 'minimal', 'centered')
  props: Record<string, any>;      // Required: Component-specific properties
  styles?: Record<string, any>;    // Optional: Custom styling
  order: number;                   // Required: Display order (0-based)
  isActive: boolean;               // Required: Whether component is active
}
```

#### Global Theme Structure

```typescript
{
  // Colors
  primary: string; // Primary color (hex format)
  secondary: string; // Secondary color (hex format)
  accent: string; // Accent color (hex format)
  background: string; // Background color (hex format)
  card: string; // Card background color (hex format)
  muted: string; // Muted color (hex format)

  // Typography
  fontHeading: string; // Heading font family
  fontBody: string; // Body font family

  // Spacing
  spacingBase: number; // Base spacing (0.5-3)
  spacingSection: number; // Section spacing (1-5)
  spacingComponent: number; // Component spacing (0.5-3)

  // Mode
  mode: "light" | "dark" | "auto"; // Theme mode

  // Additional options
  borderRadius: number; // Border radius (0-2)
  shadowIntensity: number; // Shadow intensity (0-1)
  animationSpeed: number; // Animation speed (0.1-2)
}
```

#### Response

```typescript
{
  success: true;
  data: {
    id: string;
    slug: string;
    name: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  message: string;
}
```

#### Error Responses

- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Authentication required
- `409 Conflict`: Slug already taken
- `500 Internal Server Error`: Server error

### 2. Update Portfolio

**Endpoint**: `PUT /api/portfolio/save`  
**Purpose**: Update an existing portfolio

#### Request Body

Same as POST, but with additional `id` field:

```typescript
{
  id: string; // Required: Portfolio ID
  // ... all other fields same as POST
}
```

### 3. Get Portfolio

**Endpoint**: `GET /api/portfolio/[id]`  
**Purpose**: Retrieve a portfolio by ID or slug

#### Parameters

- `id`: Portfolio ID or slug

#### Response

```typescript
{
  success: true;
  data: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    layout: any;
    theme?: GlobalTheme;
    isPublic: boolean;
    tags: string[];
    thumbnail?: string;
    views: number;
    lastViewedAt?: Date;
    createdAt: Date;
    updatedAt: Date;

    // Legacy fields
    portfolioType: string;
    title?: string;
    email?: string;
    phone?: string;
    location?: string;
    about?: string;
    profileImage?: string;
    contactForm: boolean;
    linkedinLink?: string;
    personalWebsite?: string;
    socials?: any;
    layoutType: string;
    extraData?: any;

    // Components
    components: PortfolioComponent[];

    // User info
    user: {
      id: string;
      name?: string;
      image?: string;
    };

    // Analytics (only for owners)
    analytics?: {
      totalViews: number;
      recentViews: Array<{
        timestamp: Date;
        ip?: string;
        country?: string;
        referrer?: string;
        userAgent?: string;
      }>;
    };
  };
}
```

#### Access Control

- **Public portfolios**: Can be accessed by anyone
- **Private portfolios**: Only accessible by the owner
- **View tracking**: Automatically tracks views for public portfolios

### 4. Delete Portfolio

**Endpoint**: `DELETE /api/portfolio/[id]`  
**Purpose**: Delete a portfolio

#### Parameters

- `id`: Portfolio ID

#### Response

```typescript
{
  success: true;
  message: string;
}
```

### 5. List Portfolios

**Endpoint**: `GET /api/portfolio/list`  
**Purpose**: List user's portfolios with filtering and pagination

#### Query Parameters

```typescript
{
  page?: number;                   // Page number (default: 1)
  limit?: number;                  // Items per page (default: 10, max: 50)
  sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'views'; // Sort field
  sortOrder?: 'asc' | 'desc';      // Sort order (default: desc)
  status?: 'all' | 'published' | 'draft'; // Filter by status
  search?: string;                 // Search in name, description, slug, tags
  portfolioType?: 'all' | 'developer' | 'designer' | 'contentCreator' | 'businessConsulting';
}
```

#### Response

```typescript
{
  success: true;
  data: {
    portfolios: Array<{
      id: string;
      name: string;
      slug: string;
      description?: string;
      thumbnail?: string;
      isPublic: boolean;
      portfolioType: string;
      tags: string[];
      views: number;
      lastViewedAt?: Date;
      createdAt: Date;
      updatedAt: Date;
      stats: {
        components: number;
        totalViews: number;
      };
      previewUrl: string;
      editUrl: string;
    }>;
    pagination: {
      page: number;
      limit: number;
      totalCount: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    }
    filters: PortfolioListParams;
  }
}
```

### 6. Portfolio Statistics

**Endpoint**: `POST /api/portfolio/list`  
**Purpose**: Get comprehensive statistics for user's portfolios

#### Response

```typescript
{
  success: true;
  data: {
    overview: {
      totalPortfolios: number;
      publishedPortfolios: number;
      draftPortfolios: number;
      totalViews: number;
      recentViews: number;
      viewGrowth: number;
    }
    portfolioTypes: Array<{
      type: string;
      count: number;
    }>;
    recentActivity: Array<{
      id: string;
      name: string;
      slug: string;
      updatedAt: Date;
      isPublished: boolean;
    }>;
    topPortfolios: Array<{
      id: string;
      name: string;
      slug: string;
      views: number;
      isPublished: boolean;
    }>;
  }
}
```

### 7. Generate Unique Slug

**Endpoint**: `POST /api/portfolio/generate-slug`  
**Purpose**: Generate a unique slug for a portfolio

#### Request Body

```typescript
{
  baseSlug: string; // Base slug to make unique
}
```

#### Response

```typescript
{
  success: true;
  data: {
    slug: string; // Generated unique slug
  }
}
```

## Frontend Actions

The application provides server actions for easy integration with React components:

### Import Actions

```typescript
import {
  savePortfolio,
  updatePortfolio,
  getPortfolio,
  deletePortfolio,
  listPortfolios,
  getPortfolioStatistics,
  generateUniqueSlug,
  duplicatePortfolio,
  togglePortfolioVisibility,
} from "@/actions/portfolio-actions";
```

### Usage Examples

#### Save a New Portfolio

```typescript
const handleSave = async () => {
  try {
    const result = await savePortfolio({
      name: "My Developer Portfolio",
      slug: "my-dev-portfolio",
      description: "A showcase of my development work",
      layout: [
        {
          type: "hero",
          variant: "minimal",
          props: { title: "Hello World", subtitle: "Developer" },
          order: 0,
          isActive: true,
        },
        // ... more components
      ],
      theme: {
        primary: "#3b82f6",
        secondary: "#64748b",
        // ... other theme properties
      },
      isPublic: true,
      tags: ["developer", "react", "nextjs"],
    });

    console.log("Portfolio saved:", result.data);
  } catch (error) {
    console.error("Save failed:", error);
  }
};
```

#### List User's Portfolios

```typescript
const loadPortfolios = async () => {
  try {
    const result = await listPortfolios({
      page: 1,
      limit: 10,
      sortBy: "updatedAt",
      sortOrder: "desc",
      status: "all",
    });

    console.log("Portfolios:", result.portfolios);
  } catch (error) {
    console.error("Load failed:", error);
  }
};
```

#### Get Portfolio Statistics

```typescript
const loadStats = async () => {
  try {
    const stats = await getPortfolioStatistics();

    console.log("Total portfolios:", stats.overview.totalPortfolios);
    console.log("Total views:", stats.overview.totalViews);
    console.log("View growth:", stats.overview.viewGrowth + "%");
  } catch (error) {
    console.error("Stats failed:", error);
  }
};
```

## Error Handling

All API routes return consistent error responses:

```typescript
{
  error: string;                   // Error message
  details?: Array<{               // Validation errors (if applicable)
    field: string;
    message: string;
  }>;
}
```

Common error scenarios:

- **401 Unauthorized**: User not authenticated
- **403 Forbidden**: User doesn't have permission
- **404 Not Found**: Portfolio doesn't exist
- **409 Conflict**: Slug already taken
- **422 Validation Error**: Invalid input data
- **500 Internal Server Error**: Server error

## Analytics Features

The API includes built-in analytics capabilities:

### View Tracking

- Automatically tracks views for public portfolios
- Records IP address, user agent, referrer
- Excludes owner views from analytics
- Provides view growth calculations

### Analytics Data

- Total views across all portfolios
- Recent activity (last 30 days)
- Portfolio type distribution
- Top performing portfolios
- View growth trends

## Security Features

### Authentication

- All routes require valid session authentication
- Uses NextAuth-compatible session validation
- Automatic session expiration handling

### Authorization

- Users can only access their own portfolios
- Portfolio ownership verification on all operations
- Public/private portfolio access control

### Input Validation

- Comprehensive Zod schema validation
- SQL injection prevention via Prisma ORM
- XSS protection through proper data sanitization

### Rate Limiting

- Built-in rate limiting for view tracking
- Prevents abuse of analytics endpoints
- Configurable limits per user

## Database Schema

The API uses the following Prisma models:

### Portfolio

```prisma
model Portfolio {
  id               String   @id @default(cuid()) @map("_id")
  userId           String
  name             String
  slug             String   @unique
  description      String?
  layout           Json
  theme            Json?
  isPublished      Boolean  @default(false)
  tags             String[] @default([])
  thumbnail        String?
  views            Int      @default(0)
  lastViewedAt     DateTime?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  // Legacy fields
  portfolioType    String   @default("developer")
  title            String?
  email            String?
  // ... other legacy fields

  // Relations
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  viewsLog         PortfolioView[]
  components       PortfolioComponent[]
}
```

### PortfolioComponent

```prisma
model PortfolioComponent {
  id          String   @id @default(cuid()) @map("_id")
  portfolioId String
  type        String
  variant     String
  props       Json
  styles      Json?
  order       Int
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  portfolio   Portfolio @relation(fields: [portfolioId], references: [id], onDelete: Cascade)

  @@index([portfolioId, order])
}
```

### PortfolioView

```prisma
model PortfolioView {
  id          String   @id @default(cuid()) @map("_id")
  portfolioId String
  timestamp   DateTime @default(now())
  ip          String?
  country     String?
  referrer    String?
  userAgent   String?
  isBot       Boolean  @default(false)

  portfolio   Portfolio @relation(fields: [portfolioId], references: [id], onDelete: Cascade)
}
```

## Best Practices

### Performance

- Use pagination for large datasets
- Implement proper indexing on frequently queried fields
- Cache frequently accessed data
- Use database transactions for data consistency

### Security

- Always validate user input
- Implement proper authentication and authorization
- Use HTTPS in production
- Sanitize user-generated content

### Error Handling

- Provide meaningful error messages
- Log errors for debugging
- Handle edge cases gracefully
- Return appropriate HTTP status codes

### Data Consistency

- Use database transactions for multi-step operations
- Implement proper foreign key constraints
- Handle concurrent access scenarios
- Maintain data integrity across related tables

## Future Enhancements

The API is designed to be extensible for future features:

### Planned Features

- **Advanced Analytics**: Geographic data, device analytics, conversion tracking
- **Portfolio Templates**: Pre-built portfolio templates
- **Collaboration**: Multi-user portfolio editing
- **Version Control**: Portfolio version history
- **Export/Import**: Portfolio data export and import
- **API Rate Limiting**: Configurable rate limits
- **Webhooks**: Real-time notifications for portfolio changes
- **CDN Integration**: Optimized asset delivery
- **SEO Optimization**: Automatic meta tag generation
- **Social Sharing**: Enhanced social media integration
