import { z } from "zod";

export const PROJECT_TYPES = [
  "web-app",
  "mobile-app",
  "desktop-app",
  "api",
  "library",
  "game",
  "data-science",
  "machine-learning",
  "other",
] as const;

const getPasswordSchema = (type: "password" | "confirmPassword") =>
  z
    .string({ required_error: `${type} is required` })
    .min(8, `${type} must be atleast 8 characters`)
    .max(32, `${type} can not exceed 32 characters`);

const getEmailSchema = () =>
  z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email");

const getNameSchema = () =>
  z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters");

export const signUpSchema = z
  .object({
    name: getNameSchema(),
    email: getEmailSchema(),
    password: getPasswordSchema("password"),
    confirmPassword: getPasswordSchema("confirmPassword"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: getEmailSchema(),
  password: getPasswordSchema("password"),
});

export const forgotPasswordSchema = z.object({
  email: getEmailSchema(),
});

export const resetPasswordSchema = z
  .object({
    password: getPasswordSchema("password"),
    confirmPassword: getPasswordSchema("confirmPassword"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const basePortfolioSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .optional()
    .refine(
      (value) =>
        !value ||
        /^(\+?\d{1,3})?[-.\s]?(\(?\d{2,4}\)?)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/.test(
          value
        ),
      {
        message: "Please enter a valid phone number",
      }
    ),
  location: z.string().max(50).optional(),
  portfolioType: z.enum([
    "developer",
    "designer",
    "contentCreator",
    "businessConsulting",
  ]),
  layoutType: z.enum(["classic", "minimal"]).default("classic"),

  skills: z.array(z.string().min(1, "Please enter at least one skill")),

  // About section
  about: z
    .string()
    .min(50, "Please write at least 50 characters about yourself"),
  profileImage: z
    .string()
    .url("Please provide a valid URL for your profile image")
    .optional(),

  // Social media links
  socials: z
    .object({
      github: z.string().url("Please provide a valid GitHub URL").optional(),
      linkedin: z
        .string()
        .url("Please provide a valid LinkedIn URL")
        .transform((val) => (val.trim() === "" ? undefined : val))
        .optional(),

      twitter: z.string().url("Please provide a valid Twitter URL").optional(),
      instagram: z
        .string()
        .url("Please provide a valid Instagram URL")
        .optional(),
      dribbble: z
        .string()
        .url("Please provide a valid Dribbble URL")
        .optional(),
      behance: z.string().url("Please provide a valid Behance URL").optional(),
      youtube: z.string().url("Please provide a valid YouTube URL").optional(),
      medium: z.string().url("Please provide a valid Medium URL").optional(),
      website: z.string().url("Please provide a valid website URL").optional(),
    })
    .optional(),

  // Experience
  experience: z.array(
    z
      .object({
        company: z.string().min(1, "Company name is required"),
        position: z.string().min(1, "Position is required"),
        startDate: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
        endDate: z
          .union([
            z
              .string()
              .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
            z.literal("").transform(() => undefined), // Convert empty string to undefined
          ])
          .optional(),
        current: z.boolean().optional().default(false),
        description: z.string().optional(),
        achievements: z.array(z.string()).optional(),
      })
      .refine((data) => data.current || data.endDate, {
        message: "End date is required if not currently working",
        path: ["endDate"],
      })
  ),

  // Education
  education: z.array(
    z.object({
      institution: z.string().trim().min(1, "Institution name is required"),
      degree: z.string().trim().min(1, "Degree is required"),
      field: z.string().trim().optional(),
      startDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
      endDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
        .optional(),
      current: z.boolean().optional().default(false),
      description: z.string().trim().optional(),
    })
  ),

  // Services offered
  services: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(), // For icon name or URL
      })
    )
    .optional(),

  // Contact form preferences
  contactForm: z.boolean().default(true),

  // Theme and styling preferences
  theme: z
    .object({
      primary: z.string().default("#3490dc"),
      secondary: z.string().default("#ffed4a"),
      dark: z.string().default("#2d3748"),
      light: z.string().default("#f8fafc"),
      background: z.string().default("#ffffff"),
      card: z.string().default("#f4f4f4"),
      muted: z.string().default("#f1f5f9"),
      accent: z.string().default("#e0e7ff"),
      fontHeading: z.string().default("Montserrat"),
      fontBody: z.string().default("Open Sans"),
      body: z.string().default("#1a202c"), //
    })
    .required(),

  // Custom sections
  customSections: z
    .array(
      z.object({
        title: z.string(),
        content: z.string(),
        order: z.number().optional(),
      })
    )
    .optional(),
});
// Removed old portfolio schemas - now using component registry system

// Note: The previous developer, designer, photographer, and writer schemas are assumed to be defined here
// They are omitted for brevity but would be included in the full implementation
