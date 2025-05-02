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
  portfolioType : z.enum(["developer", "designer", "content-creator"]),

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
    body: z.string().default("#1a202c"), // 👈 Add this line
  })
  .optional(),


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
const developerPortfolioSchema = basePortfolioSchema.extend({

  githubLink:  z
  .string()
  .url("Please provide a valid Github URL")
  .transform((val) => (val.trim() === "" ? undefined : val))
  .optional(),
  linkedin: z
  .string()
  .url("Please provide a valid LinkedIn URL")
  .transform((val) => (val.trim() === "" ? undefined : val))
  .optional(),
  personalWebsite: z.string().url("Invalid website URL").optional(),

  projects: z
    .array(
      z.object({
        title: z.string().min(1, "Project title is required"),
        description: z
          .string()
          .min(10, "Description must be at least 10 characters"),
        technologies: z
          .array(z.string().min(1, "Technology is required"))
          .min(1, "At least one technology is required"),
        // Optional project details
        githubLink: z
          .union([
            z.string().url("Invalid GitHub repository URL"),
            z.literal("").transform(() => undefined), // Convert empty string to undefined
            z.undefined(),
          ])
          .optional(),
        liveDemo: z
          .union([
            z.string().url("Invalid live demo URL"),
            z.literal("").transform(() => undefined),
            z.undefined(),
          ])
          .optional(),

        // Project specifics
        type: z.enum(PROJECT_TYPES).default("web-app"),

        // Optional additional context
        roles: z.array(z.string()).max(5, "Maximum 5 roles allowed").optional(),
        challenges: z.string().optional(),
        learnings: z.string().optional(),
      })
    )
    .min(1, "At least one project is required")
    .max(10, "Maximum 10 projects allowed"),
});

const designerPortfolioSchema = basePortfolioSchema.extend({
  tools: z
    .array(
      z.object({
        name: z.string().min(1, "Tool name is required"),
        level: z.number().min(1).max(5).optional(),
      })
    )
    .optional(),

  projects: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        client: z.string().optional(),
        description: z.string().min(1, "Description is required"),
        problem: z.string().optional(),
        solution: z.string().optional(),
        process: z.string().optional(),
        outcome: z.string().optional(),
        images: z
          .array(
            z.object({
              url: z.string().url("Must be a valid URL"),
              caption: z.string().optional(),
              type: z.enum(["before", "after", "process", "final"]).optional(),
            })
          )
          .optional(),
        testimonial: z
          .object({
            name: z.string().min(1, "Name is required"),
            position: z.string().optional(),
            company: z.string().optional(),
            content: z.string().min(1, "Content is required"),
          })
          .optional(),
      })
    )
    .min(1, "At least one project is required"),

  testimonials: z
    .array(
      z.object({
        client: z.string().min(1, "Client name is required"),
        position: z.string().optional(),
        company: z.string().optional(),
        feedback: z.string().min(1, "Feedback is required"),
        image: z.string().url().optional(),
        date: z.string().optional(),
      })
    )
    .optional(),

  awards: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        issuer: z.string().min(1, "Issuer is required"),
        date: z.string().min(1, "Date is required"),
        description: z.string().optional(),
        image: z.string().url().optional(),
        url: z.string().url().optional(),
      })
    )
    .optional(),
});

const contentCreatorPortfolioSchema = basePortfolioSchema.extend({
  specialties: z
    .array(z.string().min(1, "Specialty cannot be empty"))
    .min(1, "At least one specialty is required"),

  portfolioItems: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        type: z.enum(["Photography", "Video", "Writing", "Podcast"]),
        description: z.string().min(1, "Description is required"),
        url: z.string().url("Must be a valid URL").optional(),
        image: z.string().url("Must be a valid image URL").optional(),
        tags: z.array(z.string().min(1)).optional(),
        metadata: z
          .object({
            camera: z.string().optional(),
            lens: z.string().optional(),
            aperture: z.string().optional(),
            shutterSpeed: z.string().optional(),
            iso: z.string().optional(),
            duration: z.string().optional(),
            publisher: z.string().optional(),
          })
          .optional(),
      })
    )
    .min(1, "At least one portfolio item is required"),

  testimonials: z
    .array(
      z.object({
        client: z.string().min(1, "Client is required"),
        feedback: z.string().min(1, "Feedback is required"),
        image: z.string().url().optional(),
        date: z.string().optional(),
      })
    )
    .optional(),

  accolades: z
    .array(
      z.object({
        type: z.enum(["Award", "Publication", "Feature"]),
        title: z.string().min(1, "Title is required"),
        issuer: z.string().min(1, "Issuer is required"),
        date: z.string().min(1, "Date is required"),
        description: z.string().optional(),
        url: z.string().url().optional(),
        image: z.string().url().optional(),
      })
    )
    .optional(),

  pricingPackages: z
    .array(
      z.object({
        name: z.string().min(1, "Name is required"),
        price: z.string().min(1, "Price is required"),
        description: z.string().min(1, "Description is required"),
        features: z
          .array(z.string().min(1))
          .min(1, "At least one feature is required"),
        popular: z.boolean().default(false).optional(),
      })
    )
    .optional(),
});

const businessConsultingPortfolioSchema = basePortfolioSchema.extend({

  caseStudies: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        organization: z.string().min(1, "Organization is required"),
        role: z.string().min(1, "Role is required"),
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().optional(),
        ongoing: z.boolean().default(false).optional(),
        description: z.string().min(1, "Description is required"),
        challenges: z.string().optional(),
        solutions: z.string().optional(),
        outcomes: z.string().optional(),
        teamSize: z.number().optional(),
        keyMetrics: z
          .array(
            z.object({
              name: z.string().min(1, "Metric name is required"),
              value: z.string().min(1, "Metric value is required"),
            })
          )
          .optional(),
        images: z
          .array(
            z.object({
              url: z.string().url("Must be a valid URL"),
              caption: z.string().optional(),
            })
          )
          .optional(),
        testimonials: z
          .array(
            z.object({
              name: z.string().min(1, "Name is required"),
              position: z.string().min(1, "Position is required"),
              company: z.string().optional(),
              content: z.string().min(1, "Content is required"),
            })
          )
          .optional(),
        featured: z.boolean().default(false).optional(),
      })
    )
    .min(1, "At least one case study is required"),


  certifications: z
    .array(
      z.object({
        name: z.string().min(1, "Certification name is required"),
        issuingOrganization: z
          .string()
          .min(1, "Issuing organization is required"),
        issueDate: z.string().min(1, "Issue date is required"),
        expiryDate: z.string().optional(),
        credentialID: z.string().optional(),
        credentialURL: z.string().url().optional(),
      })
    )
    .optional(),
  keyAchievements: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        impact: z.string().optional(),
        date: z.string().optional(),
      })
    )
    .optional(),
});

export type PortfolioFormData =
  | z.infer<typeof developerPortfolioSchema>
  | z.infer<typeof designerPortfolioSchema>
  | z.infer<typeof businessConsultingPortfolioSchema>
  | z.infer<typeof contentCreatorPortfolioSchema>;
export type DeveloperPortfolioFormData = z.infer<
  typeof developerPortfolioSchema
>;
export type DesignerPortfolioFormData = z.infer<typeof designerPortfolioSchema>;
export type BusinessConsultingPortfolioFormData = z.infer<
  typeof businessConsultingPortfolioSchema
>;
export type ContentCreatorPortfolioFormData = z.infer<
  typeof contentCreatorPortfolioSchema
>;

export {
  basePortfolioSchema,
  developerPortfolioSchema,
  designerPortfolioSchema,
  businessConsultingPortfolioSchema,
  contentCreatorPortfolioSchema,
};

// Note: The previous developer, designer, photographer, and writer schemas are assumed to be defined here
// They are omitted for brevity but would be included in the full implementation
