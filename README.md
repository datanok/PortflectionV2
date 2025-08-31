# PortflectionV2

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-13+-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, full-stack portfolio builder that enables professionals to create and customize stunning portfolio websites with ease. Built with Next.js, React, and TypeScript, the platform offers a seamless user experience with its responsive design, dark/light mode support, and intuitive drag-and-drop portfolio builder.

## ✨ Features

### 🎨 Portfolio Creation & Management

- 🏗️ **Drag-and-Drop Portfolio Builder** - Visual editor with component-based architecture
- 🎭 **Live Preview** - Real-time preview of changes before publishing
- 🎛️ **Component Customization** - Extensive styling and property controls
- 🌓 **Dark/Light Mode** with system preference detection
- 📱 **Fully Responsive Design** for all devices
- ⚡ **Fast Page Loads** with Server-Side Rendering (SSR) and Static Site Generation (SSG)

### 🔒 Authentication & Security

- 🔐 **Secure Authentication** with NextAuth (Email/Password + OAuth providers)
- 🛡️ **Role-Based Access Control** - User and Admin roles
- 🔒 **Protected Routes** - Secure portfolio and admin access
- 📧 **Email Verification** with SendGrid integration

### 📊 Analytics & Insights

- 📈 **Comprehensive Analytics Dashboard** - Track portfolio performance
- 🌍 **Geographic Analytics** - View traffic by country
- 🔗 **Referrer Tracking** - Monitor traffic sources
- 🤖 **Bot Detection** - Distinguish between human and bot traffic
- 📅 **Time-based Analytics** - 24h, 7d, 30d, 90d, and all-time views
- 📊 **Portfolio-specific Metrics** - Individual portfolio performance tracking

### 🏪 Community Component System

- 📝 **Component Submission System** - Submit custom components for review
- 👥 **Community Contributions** - Share and discover portfolio components
- ✅ **Admin Review Process** - Quality control for submitted components
- 🏷️ **Component Categorization** - Organized by type and functionality
- 📸 **Component Previews** - Visual previews with thumbnails

### 👨‍💼 Admin Dashboard

- 👥 **User Management** - Manage user roles, permissions, and status
- 📋 **Component Review System** - Approve/reject community submissions
- 📊 **System Analytics** - Platform-wide metrics and insights
- ⚙️ **System Settings** - Configure platform-wide settings
- 🛡️ **Security Controls** - User banning and moderation tools

### 📝 Content Management

- 📝 **Rich Text Editing** with MDX support
- 🖼️ **Media Management** - Upload and organize images and files
- 🔍 **SEO Optimization** with sitemap and robots.txt
- 🎨 **Customizable Themes** and styling options
- 📱 **Mobile-first, responsive design**

## 🚀 Tech Stack

- **Frontend**: Next.js 13+, React 18+, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Framer Motion
- **Forms**: React Hook Form, Zod validation
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Prisma ORM
- **Email**: SendGrid
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics
- **Drag & Drop**: React DnD
- **Charts**: Recharts for analytics visualization

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
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

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
