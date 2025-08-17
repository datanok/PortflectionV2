# Component System Guide

## Overview

This guide explains the current component submission and review system.

## Component Submission

### Submit a new component:

```tsx
const response = await fetch("/api/components/submit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "My Component",
    description: "A custom component",
    category: "hero",
    componentCode:
      "export default function MyComponent() { return <div>Hello</div> }",
    authorName: "John Doe",
    authorEmail: "john@example.com",
  }),
});
```

## Admin Review

### Review submissions (admin only):

```tsx
// Approve a component
const response = await fetch("/api/admin/components/submissions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    submissionId: "submission-id",
    action: "approve",
    reviewerNotes: "Great component!",
  }),
});

// Reject a component
const response = await fetch("/api/admin/components/submissions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    submissionId: "submission-id",
    action: "reject",
    rejectionReason: "Doesn't meet quality standards",
  }),
});
```

## System Benefits

- ✅ **Simple Workflow**: Submit → Review → Approve/Reject
- ✅ **Quality Control**: Admin review ensures component quality
- ✅ **Security**: No dynamic code execution
- ✅ **Maintainability**: Clear approval process
- ✅ **Scalability**: Easy to manage submissions

## File Structure

```
src/
├── components/
│   ├── ComponentSubmission.tsx       # Submission form
│   └── AdminComponentReview.tsx      # Admin review interface
├── app/api/
│   ├── components/
│   │   └── submit/route.ts           # Handle submissions
│   └── admin/
│       └── components/
│           └── submissions/route.ts  # Admin submissions API
└── prisma/
    └── schema.prisma                 # Database schema
```
