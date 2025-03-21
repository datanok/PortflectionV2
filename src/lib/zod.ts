
import { z } from 'zod';

const getPasswordSchema = (type: "password" | "confirmPassword") =>
  z.string({ required_error: `${type} is required` })
    .min(8, `${type} must be atleast 8 characters`)
    .max(32, `${type} can not exceed 32 characters`);

const getEmailSchema = () =>
  z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email");

const getNameSchema = () =>
  z.string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters");

export const signUpSchema = z.object({
  name: getNameSchema(),
  email: getEmailSchema(),
  password: getPasswordSchema("password"),
  confirmPassword: getPasswordSchema("confirmPassword"),
}).refine((data) => data.password === data.confirmPassword, {
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

export const resetPasswordSchema = z.object({
  password: getPasswordSchema("password"),
  confirmPassword: getPasswordSchema("confirmPassword"),
}).refine((data) => data.password === data.confirmPassword, {
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
    .refine((value) => !value || /^(\+?\d{1,3})?[-.\s]?(\(?\d{2,4}\)?)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/.test(value), {
      message: "Please enter a valid phone number",
    }),
  location: z.string().max(50).optional(),

  // About section
  about: z.string().min(50, "Please write at least 50 characters about yourself"),
  profileImage: z.string().url("Please provide a valid URL for your profile image").optional(),

  // Social media links
  socials: z.object({
    github: z.string().url("Please provide a valid GitHub URL").optional(),
    linkedin: z.string().url("Please provide a valid LinkedIn URL").optional(),
    twitter: z.string().url("Please provide a valid Twitter URL").optional(),
    instagram: z.string().url("Please provide a valid Instagram URL").optional(),
    dribbble: z.string().url("Please provide a valid Dribbble URL").optional(),
    behance: z.string().url("Please provide a valid Behance URL").optional(),
    youtube: z.string().url("Please provide a valid YouTube URL").optional(),
    medium: z.string().url("Please provide a valid Medium URL").optional(),
    website: z.string().url("Please provide a valid website URL").optional(),
  }).optional(),

  // Experience
  experience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      current: z.boolean().optional().default(false),
      description: z.string().optional(),
      achievements: z.array(z.string()).optional(),
    })
  ).optional(),

  // Education
  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      field: z.string().optional(),
      startDate: z.string(),
      endDate: z.string().optional(),
      current: z.boolean().optional().default(false),
      description: z.string().optional(),
    })
  ).optional(),

  // Services offered
  services: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(), // For icon name or URL
    })
  ).optional(),

  // Contact form preferences
  contactForm: z.boolean().default(true),

  // Theme and styling preferences
  theme: z.object({
    primary: z.string().default('#3490dc'),
    secondary: z.string().default('#ffed4a'),
    dark: z.string().default('#2d3748'),
    light: z.string().default('#f8fafc'),
    fontHeading: z.string().default('Montserrat'),
    fontBody: z.string().default('Open Sans'),
  }).optional(),

  // Custom sections
  customSections: z.array(
    z.object({
      title: z.string(),
      content: z.string(),
      order: z.number().optional(),
    })
  ).optional(),
});
const developerPortfolioSchema = basePortfolioSchema.extend({
  // Developer-specific skills
  skills: z.array(
    z.object({
      name: z.string(),
      level: z.number().min(1).max(5).optional(),
      category: z.string().optional(), // e.g., "Frontend", "Backend", "DevOps"
    })
  ),

  // Code repositories and projects
  projects: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      longDescription: z.string().optional(),
      repoLink: z.string().url("Please provide a valid repository URL"),
      liveDemo: z.string().url("Please provide a valid demo URL").optional(),
      image: z.string().url("Please provide a valid image URL").optional(),
      technologies: z.array(z.string()).optional(),
      featuredProject: z.boolean().default(false).optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      company: z.string().optional(), // If it was a professional project
      role: z.string().optional(),
    })
  ),

  // GitHub activity and contributions
  githubUsername: z.string().optional(),
  showGithubStats: z.boolean().default(true).optional(),

  // Coding-related certifications
  certifications: z.array(
    z.object({
      name: z.string(),
      issuer: z.string(),
      date: z.string(),
      url: z.string().url("Please provide a valid certificate URL").optional(),
      image: z.string().url("Please provide a valid image URL").optional(),
    })
  ).optional(),
});

// Designer-specific schema
const designerPortfolioSchema = basePortfolioSchema.extend({
  // Design-specific skills
  designSkills: z.array(
    z.object({
      name: z.string(),
      level: z.number().min(1).max(5).optional(),
      category: z.string().optional(), // e.g., "UI", "UX", "Graphic Design"
    })
  ),

  // Design software proficiency
  designTools: z.array(
    z.object({
      name: z.string(),
      level: z.number().min(1).max(5).optional(),
    })
  ).optional(),

  // Case studies
  caseStudies: z.array(
    z.object({
      title: z.string(),
      client: z.string().optional(),
      description: z.string(),
      problem: z.string().optional(),
      solution: z.string().optional(),
      process: z.string().optional(),
      outcome: z.string().optional(),
      images: z.array(
        z.object({
          url: z.string().url("Please provide a valid image URL"),
          caption: z.string().optional(),
          type: z.enum(["before", "after", "process", "final"]).optional(),
        })
      ).optional(),
      testimonial: z.object({
        name: z.string(),
        position: z.string().optional(),
        company: z.string().optional(),
        content: z.string(),
      }).optional(),
    })
  ),

  // Design specialties
  specialties: z.array(z.string()).optional(),

  // Testimonials from clients
  testimonials: z.array(
    z.object({
      client: z.string(),
      position: z.string().optional(),
      company: z.string().optional(),
      feedback: z.string(),
      image: z.string().url("Please provide a valid image URL").optional(),
      date: z.string().optional(),
    })
  ).optional(),

  // Design awards
  awards: z.array(
    z.object({
      title: z.string(),
      issuer: z.string(),
      date: z.string(),
      description: z.string().optional(),
      image: z.string().url("Please provide a valid image URL").optional(),
      url: z.string().url("Please provide a valid URL").optional(),
    })
  ).optional(),
});

// Photographer-specific schema
const photographerPortfolioSchema = basePortfolioSchema.extend({
  // Photography specialties
  specialties: z.array(z.string()),

  // Equipment
  equipment: z.array(
    z.object({
      type: z.string(), // e.g., "Camera", "Lens", "Lighting"
      name: z.string(),
      details: z.string().optional(),
    })
  ).optional(),

  // Photo gallery organized by categories
  galleries: z.array(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      coverImage: z.string().url("Please provide a valid image URL").optional(),
      photos: z.array(
        z.object({
          image: z.string().url("Please provide a valid image URL"),
          caption: z.string().optional(),
          location: z.string().optional(),
          date: z.string().optional(),
          featured: z.boolean().default(false).optional(),
          tags: z.array(z.string()).optional(),
          metadata: z.object({
            camera: z.string().optional(),
            lens: z.string().optional(),
            aperture: z.string().optional(),
            shutterSpeed: z.string().optional(),
            iso: z.string().optional(),
            dimensions: z.string().optional(),
          }).optional(),
        })
      ),
    })
  ),

  // Client list
  clients: z.array(
    z.object({
      name: z.string(),
      logo: z.string().url("Please provide a valid logo URL").optional(),
      website: z.string().url("Please provide a valid website URL").optional(),
    })
  ).optional(),

  // Photography awards and publications
  accolades: z.array(
    z.object({
      type: z.enum(["award", "publication", "feature"]),
      title: z.string(),
      issuer: z.string(),
      date: z.string(),
      description: z.string().optional(),
      url: z.string().url("Please provide a valid URL").optional(),
      image: z.string().url("Please provide a valid image URL").optional(),
    })
  ).optional(),

  // Pricing and packages
  pricingPackages: z.array(
    z.object({
      name: z.string(),
      price: z.string(), // Using string to allow for currency symbols and formatting
      description: z.string(),
      features: z.array(z.string()),
      popular: z.boolean().default(false).optional(),
    })
  ).optional(),
});

// Writer-specific schema
const writerPortfolioSchema = basePortfolioSchema.extend({
  // Writing samples
  writings: z.array(
    z.object({
      title: z.string(),
      type: z.string(), // e.g., "Blog Post", "Article", "Fiction", "Technical Writing"
      excerpt: z.string().optional(),
      content: z.string().optional(),
      publishedUrl: z.string().url("Please provide a valid URL").optional(),
      publishedDate: z.string().optional(),
      publisher: z.string().optional(),
      image: z.string().url("Please provide a valid image URL").optional(),
      featured: z.boolean().default(false).optional(),
    })
  ),

  // Publications
  publications: z.array(
    z.object({
      name: z.string(),
      role: z.string().optional(), // e.g., "Contributor", "Editor"
      url: z.string().url("Please provide a valid URL").optional(),
      logo: z.string().url("Please provide a valid logo URL").optional(),
    })
  ).optional(),

  genres: z.array(z.string()).optional(),

  writingServices: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      priceRange: z.string().optional(),
    })
  ).optional(),
});

// Project/Product Manager specific schema
const managerPortfolioSchema = basePortfolioSchema.extend({
  // Management methodology expertise
  methodologies: z.array(
    z.object({
      name: z.string(), // e.g., "Agile", "Scrum", "Kanban", "Waterfall", "Lean", "SAFe"
      level: z.number().min(1).max(5).optional(),
      yearsOfExperience: z.number().optional(),
      certifications: z.array(z.string()).optional(),
    })
  ),

  // Project/Product showcase
  managedProjects: z.array(
    z.object({
      title: z.string(),
      organization: z.string(),
      role: z.string(), // "Product Manager", "Project Manager", "Program Manager", etc.
      startDate: z.string(),
      endDate: z.string().optional(),
      ongoing: z.boolean().default(false).optional(),
      description: z.string(),
      challenges: z.string().optional(),
      solutions: z.string().optional(),
      outcomes: z.string().optional(),
      teamSize: z.number().optional(),
      technologies: z.array(z.string()).optional(),
      metrics: z.array(
        z.object({
          name: z.string(), // e.g., "ROI", "Time to Market", "Customer Satisfaction"
          value: z.string(), // Using string to allow for formatted values
          description: z.string().optional(),
        })
      ).optional(),
      images: z.array(
        z.object({
          url: z.string().url("Please provide a valid image URL"),
          caption: z.string().optional(),
        })
      ).optional(),
      testimonials: z.array(
        z.object({
          name: z.string(),
          position: z.string(),
          company: z.string().optional(),
          content: z.string(),
        })
      ).optional(),
      featured: z.boolean().default(false).optional(),
    })
  ),

  // Management skills
  managementSkills: z.array(
    z.object({
      category: z.string(), // e.g., "Leadership", "Communication", "Technical", "Strategic"
      skills: z.array(
        z.object({
          name: z.string(),
          level: z.number().min(1).max(5).optional(),
        })
      ),
    })
  ),

  // Tools expertise
  toolsExpertise: z.array(
    z.object({
      category: z.string(), // e.g., "Project Management", "Product Management", "Collaboration"
      tools: z.array(
        z.object({
          name: z.string(), // e.g., "JIRA", "Asana", "Trello", "Figma", "Slack"
          level: z.number().min(1).max(5).optional(),
        })
      ),
    })
  ).optional(),

  // Certifications specific to management
  managerCertifications: z.array(
    z.object({
      name: z.string(), // e.g., "PMP", "CSM", "CSPO", "PMI-ACP"
      issuingOrganization: z.string(), // e.g., "PMI", "Scrum Alliance"
      issueDate: z.string(),
      expiryDate: z.string().optional(),
      credentialID: z.string().optional(),
      credentialURL: z.string().url("Please provide a valid credential URL").optional(),
    })
  ).optional(),

  // Key achievements
  keyAchievements: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      impact: z.string().optional(), // Quantifiable outcomes
      date: z.string().optional(),
    })
  ).optional(),

  // Professional philosophy/approach
  managementPhilosophy: z.string().optional(),

  // Leadership style
  leadershipStyle: z.string().optional(),

  // Industries expertise
  industries: z.array(z.string()).optional(),
});

// Export all schemas
export type PortfolioFormData = z.infer<typeof basePortfolioSchema>;
export type DeveloperPortfolioFormData = z.infer<typeof developerPortfolioSchema>;
export type DesignerPortfolioFormData = z.infer<typeof designerPortfolioSchema>;
export type PhotographerPortfolioFormData = z.infer<typeof photographerPortfolioSchema>;
export type WriterPortfolioFormData = z.infer<typeof writerPortfolioSchema>;
export type ManagerPortfolioFormData = z.infer<typeof managerPortfolioSchema>;

export {
  basePortfolioSchema,
  developerPortfolioSchema,
  designerPortfolioSchema,
  photographerPortfolioSchema,
  writerPortfolioSchema,
  managerPortfolioSchema
};

// Note: The previous developer, designer, photographer, and writer schemas are assumed to be defined here
// They are omitted for brevity but would be included in the full implementation