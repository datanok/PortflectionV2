# PortflectionV2

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🎯 Introduction & Purpose

**PortflectionV2** is a modern, full-stack portfolio builder application designed to solve a common problem: **building professional portfolios without design skills or coding experience**.

### Who is this for?

This app is perfect for people who:

- **Can't design** - No artistic or design skills required
- **Don't want to spend time designing** - Focus on content, not aesthetics
- **Want to build a portfolio with zero coding experience** - Visual editor handles everything

### How it solves these problems

PortflectionV2 provides a **simple and professional solution** through:

- **Pre-built themed components** that look great out of the box
- **Drag-and-drop visual editor** - no code writing needed
- **Multiple design themes** with customizable fonts & colors
- **Real-time preview** to see changes instantly
- **Professional results** that rival custom-coded portfolios

## 🚀 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library

### Backend & Database

- **Prisma ORM** - Type-safe database client
- **MongoDB** - NoSQL database
- **BetterAuth.js** - Authentication system

### UI & Experience

- **Recharts** - Data visualization for analytics
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Development & Deployment

- **Vercel** - Hosting and deployment
- **SendGrid** - Email services
- **React DnD** - Drag-and-drop functionality

## ✨ Features

### 🎨 Portfolio Creation & Management

- **Prebuilt Themed Components** - Navbar, hero, about, skills, projects, contact, footer
- **Multiple Design Themes** - Minimal, Neobrutalism, and more with customizable fonts & colors
- **Drag-and-Drop Editor** - Visual editor for non-coders
- **Real-Time Preview** - See changes instantly as you build
- **Export/Publish Options** - Deploy your portfolio with one click
- **Component Customization** - Extensive styling and property controls
- **Dark/Light Mode** with system preference detection
- **Fully Responsive Design** for all devices

### 🔒 Authentication & Security

- **Secure Authentication** with BetterAuth (Email/Password + OAuth providers)
- **Role-Based Access Control** - User and Admin roles
- **Protected Routes** - Secure portfolio and admin access
- **Email Verification** with SendGrid integration

### 📊 Analytics & Insights

- **Comprehensive Analytics Dashboard** - Track portfolio performance
- **Geographic Analytics** - View traffic by country
- **Referrer Tracking** - Monitor traffic sources
- **Bot Detection** - Distinguish between human and bot traffic
- **Time-based Analytics** - 24h, 7d, 30d, 90d, and all-time views
- **Portfolio-specific Metrics** - Individual portfolio performance tracking

### 🏪 Community Component System

- **Component Submission System** - Submit custom components for review
- **Community Contributions** - Share and discover portfolio components
- **Admin Review Process** - Quality control for submitted components
- **Component Categorization** - Organized by type and functionality
- **Component Previews** - Visual previews with thumbnails

### 👨‍💼 Admin Dashboard

- **User Management** - Manage user roles, permissions, and status
- **Component Review System** - Approve/reject community submissions
- **System Analytics** - Platform-wide metrics and insights
- **System Settings** - Configure platform-wide settings
- **Security Controls** - User banning and moderation tools

## 🏗️ System Design

```mermaid
graph TB
    subgraph "Client Layer"
        A[React/Next.js Frontend]
        B[Portfolio Builder]
        C[Dashboard]
        D[Admin Panel]
    end

    subgraph "API Layer"
        E[Next.js API Routes]
        F[Portfolio API]
        G[Analytics API]
        H[Admin API]
        I[Auth API]
    end

    subgraph "Data Layer"
        J[Prisma ORM]
        K[MongoDB Database]
        L[File Storage]
    end

    subgraph "External Services"
        M[BetterAuth.js]
        N[SendGrid]
        O[Vercel Analytics]
    end

    A --> E
    B --> E
    C --> E
    D --> E
    E --> J
    J --> K
    E --> M
    E --> N
    E --> O
    J --> L
```

## 🔧 Low-Level Design (LLD)

### Core Components Architecture

```mermaid
graph TB
    subgraph "Portfolio Builder Core"
        PB[Portfolio Builder]
        CB[Component Builder]
        RP[Renderer Pipeline]
        PM[Portfolio Manager]
    end

    subgraph "Component System"
        BC[Built-in Components]
        CC[Community Components]
        CR[Component Registry]
        CL[Component Loader]
    end

    subgraph "Data Management"
        PD[Portfolio Data]
        CD[Component Data]
        UD[User Data]
        AD[Analytics Data]
    end

    subgraph "State Management"
        PS[Portfolio State]
        CS[Component State]
        US[User State]
        TS[Theme State]
    end

    PB --> CB
    CB --> RP
    RP --> PM
    CB --> BC
    CB --> CC
    CC --> CR
    CR --> CL
    PM --> PD
    CB --> CD
    PB --> UD
    PM --> AD
    PB --> PS
    CB --> CS
    PB --> US
    PB --> TS
```

### Portfolio Builder Flow

```mermaid
sequenceDiagram
    participant U as User
    participant PB as Portfolio Builder
    participant CR as Component Registry
    participant RP as Renderer Pipeline
    participant DB as Database

    U->>PB: Create New Portfolio
    PB->>CR: Load Available Components
    CR->>PB: Return Component List
    U->>PB: Select Components
    PB->>PB: Update Portfolio State
    PB->>RP: Render Preview
    RP->>PB: Return Rendered HTML
    PB->>U: Show Live Preview
    U->>PB: Customize Properties
    PB->>PB: Update Component State
    PB->>RP: Re-render
    U->>PB: Save Portfolio
    PB->>DB: Store Portfolio Data
    DB->>PB: Confirm Save
    PB->>U: Portfolio Saved
```

### Component System Architecture

```mermaid
graph LR
    subgraph "Component Types"
        A[Section Components]
        B[Layout Components]
        C[Interactive Components]
        D[Utility Components]
    end

    subgraph "Component Structure"
        E[Component Metadata]
        F[Component Props]
        G[Component Styles]
        H[Component Logic]
    end

    subgraph "Rendering System"
        I[Component Renderer]
        J[Style Injector]
        K[Event Handler]
        L[State Manager]
    end

    A --> E
    B --> E
    C --> E
    D --> E
    E --> F
    E --> G
    E --> H
    F --> I
    G --> J
    H --> K
    H --> L
```

### Data Flow Architecture

```mermaid
graph TB
    subgraph "User Input Layer"
        UI[User Interface]
        FB[Form Builder]
        DR[Drag & Drop]
        TP[Theme Picker]
    end

    subgraph "Processing Layer"
        VP[Validation Pipeline]
        TP2[Transform Pipeline]
        SP[State Processor]
        CP[Change Processor]
    end

    subgraph "Storage Layer"
        PS2[Portfolio Store]
        CS2[Component Store]
        US2[User Store]
        TS2[Theme Store]
    end

    subgraph "Output Layer"
        PR[Portfolio Renderer]
        EX[Export Engine]
        AP[Analytics Processor]
        SY[Sync Manager]
    end

    UI --> VP
    FB --> VP
    DR --> VP
    TP --> VP
    VP --> TP2
    TP2 --> SP
    SP --> CP
    CP --> PS2
    CP --> CS2
    CP --> US2
    CP --> TS2
    PS2 --> PR
    CS2 --> PR
    US2 --> PR
    TS2 --> PR
    PR --> EX
    PR --> AP
    PR --> SY
```

### Authentication & Authorization Flow

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as API Routes
    participant NA as BetterAuth
    participant DB as Database
    participant MW as Middleware

    U->>FE: Login Request
    FE->>API: Auth Request
    API->>NA: Validate Credentials
    NA->>DB: Check User
    DB->>NA: User Data
    NA->>API: Auth Token
    API->>FE: JWT Token
    FE->>U: Logged In

    U->>FE: Access Protected Route
    FE->>API: Request with Token
    API->>MW: Validate Token
    MW->>DB: Check Permissions
    DB->>MW: User Role
    MW->>API: Authorized
    API->>FE: Protected Data
    FE->>U: Display Content
```

### Analytics & Monitoring System

```mermaid
graph TB
    subgraph "Data Collection"
        DC[Data Collector]
        VT[View Tracker]
        GT[Geo Tracker]
        RT[Referrer Tracker]
        BT[Bot Detector]
    end

    subgraph "Data Processing"
        DP[Data Processor]
        AF[Aggregation Functions]
        FF[Filter Functions]
        TF[Transform Functions]
    end

    subgraph "Data Storage"
        DS[Analytics Store]
        CS3[Cache Store]
        AS[Aggregated Store]
    end

    subgraph "Data Presentation"
        CH[Chart Components]
        TB[Table Components]
        KP[KPI Components]
        EX2[Export Functions]
    end

    DC --> DP
    VT --> DP
    GT --> DP
    RT --> DP
    BT --> DP
    DP --> AF
    DP --> FF
    DP --> TF
    AF --> AS
    FF --> DS
    TF --> CS3
    AS --> CH
    DS --> TB
    CS3 --> KP
    AS --> EX2
```

## 🛠️ Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- MongoDB Atlas account or local MongoDB instance
- SendGrid account (for email verification)
- GitHub OAuth app (optional, for GitHub login)
- Google Cloud Project (optional, for Google login)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/PortflectionV2.git
   cd PortflectionV2
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/portflection?retryWrites=true&w=majority"
   BetterAuth_SECRET=your_BetterAuth_secret
   BetterAuth_URL=http://localhost:3000

   # Email Provider (SendGrid)
   EMAIL_SERVER=smtp://username:password@smtp.sendgrid.net:587
   EMAIL_FROM=your-email@example.com

   # OAuth Providers (optional)
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Component submission settings (optional)
   COMPONENT_SUBMISSION_ENABLED=true
   MAX_COMPONENT_SIZE=50000
   REVIEW_NOTIFICATION_EMAIL=admin@yourdomain.com
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Set up admin user (optional)**

   ```bash
   node scripts/add-admin.js your-email@example.com
   ```

6. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 📦 Project Structure

```
/src
├── app/                    # App router
│   ├── api/                # API routes
│   │   ├── admin/          # Admin API endpoints
│   │   ├── analytics/      # Analytics API
│   │   ├── components/     # Component submission API
│   │   └── portfolio/      # Portfolio management API
│   ├── dashboard/          # User dashboard
│   ├── admin/              # Admin dashboard pages
│   ├── (auth)/             # Authentication pages
│   └── portfolio/          # Portfolio builder and viewer
├── components/            # Reusable components
│   ├── ui/                 # Shadcn UI components
│   ├── portfolio/          # Portfolio builder components
│   │   ├── builder/        # Drag-and-drop builder
│   │   ├── sections/       # Portfolio section components
│   │   └── renderer/       # Component rendering system
│   ├── community/          # Community component system
│   └── forms/              # Form components
├── lib/                   # Utility functions and configs
│   ├── portfolio/          # Portfolio-related utilities
│   └── analytics/          # Analytics utilities
├── actions/               # Server actions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── prisma/                # Prisma schema and migrations
└── public/                # Static files
```

## 🎨 Component System

### Built-in Components

The platform includes a comprehensive set of portfolio components:

- **Hero Sections** - Multiple variants for impactful introductions
- **About Sections** - Professional bio and information displays
- **Project Showcases** - Portfolio project galleries
- **Contact Forms** - Interactive contact sections
- **Skills & Technologies** - Technical skill displays
- **Testimonials** - Client and colleague recommendations
- **Custom Components** - Create your own components using the builder

### Community Components

- **Component Submission** - Submit custom components via `/components/submit`
- **Component Review** - Admin review system at `/admin/components/review`

## 📊 Analytics Features

### Portfolio Analytics

- **View Tracking** - Automatic view counting and analytics
- **Geographic Data** - Traffic analysis by country
- **Referrer Analysis** - Track traffic sources
- **Bot Detection** - Distinguish between human and bot traffic
- **Time-based Metrics** - Multiple time period analysis

### Admin Analytics

- **System-wide Metrics** - Platform usage statistics
- **User Analytics** - User engagement and growth
- **Component Usage** - Popular component tracking

## 👨‍💼 Admin Features

### User Management

- **Role Management** - Assign admin/user roles
- **User Status** - Premium user management
- **Moderation Tools** - User banning and restrictions

### Component Management

- **Submission Review** - Approve/reject community components
- **Quality Control** - Ensure component standards
- **Component Curation** - Featured and trending components

## 🚀 Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to a GitHub repository
2. Import the repository on Vercel
3. Add your environment variables
4. Deploy!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to submit components, report bugs, or contribute to the codebase.

### Component Contributions

- Submit components via the web interface at `/components/submit`
- Follow our [Component Guidelines](COMPONENT_CONTRIBUTION_SYSTEM.md)
- All submissions are reviewed by our admin team

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [Recharts](https://recharts.org/) for analytics visualization
- [React DnD](https://react-dnd.github.io/react-dnd/) for drag-and-drop functionality

## 📬 Contact

For any questions or feedback, please open an issue or contact the maintainers.
