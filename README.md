# PortflectionV2

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-13+-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, full-stack portfolio builder that enables professionals to create and customize stunning portfolio websites with ease. Built with Next.js, React, and TypeScript, the platform offers a seamless user experience with its responsive design, dark/light mode support, and intuitive form-based content management.

## ✨ Features

- 🎨 Multiple portfolio templates (Developer, Designer, Consultant, etc.)
- 🌓 Dark/Light mode with system preference detection
- 📱 Fully responsive design for all devices
- ⚡ Fast page loads with Server-Side Rendering (SSR) and Static Site Generation (SSG)
- 🔒 Secure authentication with NextAuth (Email/Password + OAuth providers)
- 📝 Rich text editing with MDX support
- 📊 Built-in analytics integration
- 🔍 SEO optimized with sitemap and robots.txt
- 🎨 Customizable themes and styling
- 📱 Mobile-first, responsive design

## 🚀 Tech Stack

- **Frontend**: Next.js 13+, React 18+, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Framer Motion
- **Forms**: React Hook Form, Zod validation
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Prisma ORM
- **Email**: SendGrid
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

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
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 📦 Project Structure

```
/src
├── app/                    # App router
│   ├── api/                # API routes
│   ├── dashboard/          # Authenticated user dashboard
│   ├── (auth)/             # Authentication pages
│   └── ...
├── components/            # Reusable components
│   ├── ui/                 # Shadcn UI components
│   └── ...
├── lib/                   # Utility functions and configs
├── prisma/                 # Prisma schema and migrations
└── public/                 # Static files
```



## 🚀 Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to a GitHub repository
2. Import the repository on Vercel
3. Add your environment variables
4. Deploy!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)

## 📬 Contact

For any questions or feedback, please open an issue or contact the maintainers.
