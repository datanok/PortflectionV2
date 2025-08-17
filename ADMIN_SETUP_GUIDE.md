# Admin Setup Guide

This guide will help you set up the admin system and access all the new pages we've created.

## 🚀 Quick Start

### 1. Database Setup

The Prisma client has been generated with the new schema. Since you're using MongoDB, the new tables will be created automatically when you first use them.

### 2. Add Your First Admin User

You have two options to make yourself an admin:

#### Option A: Using the Script (Recommended)

```bash
node scripts/add-admin.js your-email@example.com
```

#### Option B: Using the Admin Interface

1. First, manually update your user role in the database to "admin"
2. Then access the admin interface at `/admin/users` to manage other users

### 3. Access the Admin Pages

Once you're an admin, you can access these pages:

- **Main Admin Dashboard**: `/admin`
- **User Management**: `/admin/users`
- **Component Review**: `/admin/components/review`
- **Component Submission**: `/components/submit`

## 📋 Page Descriptions

### Admin Dashboard (`/admin`)

- Central hub with navigation to all admin functions
- Quick access to common actions
- Overview of system status

### User Management (`/admin/users`)

- View all users in the system
- Search and filter users by name, email, or role
- Change user roles (user ↔ admin)
- View user status (premium, banned, etc.)

### Component Review (`/admin/components/review`)

- Review submitted components
- Approve or reject submissions
- Add review notes
- View component code and metadata

### Component Submission (`/components/submit`)

- Submit new components for review
- Multi-step form with validation
- Upload component thumbnails
- Add tags and descriptions

## 🔐 Authentication & Security

All admin pages are protected with:

- **Authentication check**: Must be logged in
- **Role check**: Must have `role: "admin"`
- **Automatic redirects**: Non-admins are redirected to dashboard

## 🛠️ API Endpoints

### Admin APIs

- `GET /api/admin/users` - Fetch all users
- `PUT /api/admin/users/role` - Update user role
- `GET /api/admin/components/submissions` - Get component submissions
- `PUT /api/admin/components/review` - Review a component

## 📊 Database Models

The system uses these new models:

- `ComponentSubmission` - Pending component submissions
- `ComponentSubmission` - Component submissions for review

## 🎯 Next Steps

1. **Add yourself as admin** using the script
2. **Test the admin interface** by visiting `/admin`
3. **Create some test components** via `/components/submit`
4. **Review and approve components** via `/admin/components/review`

## 🔧 Troubleshooting

### If you can't access admin pages:

1. Check that your user has `role: "admin"` in the database
2. Ensure you're logged in
3. Clear browser cache and cookies

### If the script doesn't work:

1. Make sure the email exists in your database
2. Check that Prisma is properly configured
3. Verify your database connection

### If components aren't showing:

1. Check that the database models are created
2. Verify API routes are working
3. Check browser console for errors

## 📞 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify database connectivity
3. Ensure all dependencies are installed
4. Check that the Prisma client is generated

---

**Happy Admining! 🎉**
