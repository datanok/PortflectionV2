
import { z } from 'zod';

export const PROJECT_TYPES = [
  "Web Application", 
  "Mobile App", 
  "Desktop Application", 
  "CLI Tool", 
  "Full Stack", 
  "Frontend", 
  "Backend", 
  "Other"
] as const;

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
  experience: z
    .array(
      z.object({
        company: z.string().min(1, "Company name is required"),
        position: z.string().min(1, "Position is required"),
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)").optional(),
        current: z.boolean().optional().default(false),
        description: z.string().optional(),
        achievements: z.array(z.string()).optional(),
      })
    )
    .optional()
    .refine(
      (experiences) =>
        !experiences || experiences.length === 0 || experiences.some((exp) => exp.company && exp.position && exp.startDate),
      {
        message: "Experience cannot be completely empty",
        path: ["experience"],
      }
    )
,
  // Education
  education: z
  .array(
    z.object({
      institution: z.string().trim().min(1, "Institution name is required"),
      degree: z.string().trim().min(1, "Degree is required"),
      field: z.string().trim().optional(),
      startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
      endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
        .optional(),
      current: z.boolean().optional().default(false),
      description: z.string().trim().optional(),
    })
  ).optional().refine((educations)=>!educations || educations.length===0||educations.some(edu=>edu.institution.length>0&&edu.degree.length>0&&edu.startDate.length>0),
  {
    message: "Education cannot be completely empty",
    path: ["education"],
  }),
  
  
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

  // Social Links
  githubLink: z.string().url("Invalid GitHub URL"),
  linkedinLink: z.string().url("Invalid LinkedIn URL").optional(),
  personalWebsite: z.string().url("Invalid website URL").optional(),

  skills: z.object({
    languages: z.array(z.string()).min(1, "At least one programming language is required"),
    frameworks: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
  }),

  // Projects Section
  projects: z.array(
    z.object({
      title: z.string().min(1, "Project title is required"),
      description: z.string().min(10, "Description must be at least 10 characters"),
      technologies: z.string()
  .min(1, "At least one technology is required")
  .transform(val => val.split(',').map(tech => tech.trim()).filter(tech => tech !== "")),
      // Optional project details
      githubLink: z.string().url("Invalid GitHub repository URL").optional(),
      liveDemo: z.string().url("Invalid live demo URL").optional(),
      
      // Project specifics
      type: z.enum(PROJECT_TYPES),
      
      // Optional additional context
      roles: z.array(z.string()).optional(),
      challenges: z.string().optional(),
      learnings: z.string().optional(),
    })
  ).min(1, "At least one project is required").max(10, "Maximum 10 projects allowed"),

});

const designerPortfolioSchema = basePortfolioSchema.extend({
  // Skills section with robust validation
  skills: z.array(
    z.object({
      name: z.string(), // Requires a skill name
      level: z.number().min(1).max(5).optional(), // Optional skill proficiency from 1-5
      category: z.string().optional(), // Optional skill category
    })
  ),

  // Optional tools section
  tools: z.array(
    z.object({
      name: z.string(), 
      level: z.number().min(1).max(5).optional(),
    })
  ).optional(),

  // Projects section with detailed project information
  projects: z.array(
    z.object({
      title: z.string(), // Required project title
      client: z.string().optional(), // Optional client name
      description: z.string(), // Required project description
      
      // Optional detailed project sections
      problem: z.string().optional(),
      solution: z.string().optional(),
      process: z.string().optional(),
      outcome: z.string().optional(),

      // Optional images with additional metadata
      images: z.array(
        z.object({
          url: z.string().url(), // Validated URL
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

  // Optional global testimonials section
  testimonials: z.array(
    z.object({
      client: z.string(),
      position: z.string().optional(),
      company: z.string().optional(),
      feedback: z.string(),
      image: z.string().url().optional(),
      date: z.string().optional(),
    })
  ).optional(),

  // Optional awards section
  awards: z.array(
    z.object({
      title: z.string(),
      issuer: z.string(),
      date: z.string(),
      description: z.string().optional(),
      image: z.string().url().optional(),
      url: z.string().url().optional(),
    })
  ).optional(),
});

const contentCreatorPortfolioSchema = basePortfolioSchema.extend({
  // Specialties allows flexible tagging of content creator's focus areas
  specialties: z.array(z.string()),

  // Comprehensive portfolio items across multiple content types
  portfolioItems: z.array(
    z.object({
      title: z.string(), // Required title for the content piece
      type: z.enum(["Photography", "Video", "Writing", "Podcast"]), // Strict content type
      description: z.string(), // Required description of the content

      // Optional links and preview image
      url: z.string().url().optional(),
      image: z.string().url().optional(),
      tags: z.array(z.string()).optional(), // Flexible tagging system

      // Flexible metadata for different content types
      metadata: z.object({
        // Photography-specific metadata
        camera: z.string().optional(),
        lens: z.string().optional(),
        aperture: z.string().optional(),
        shutterSpeed: z.string().optional(),
        iso: z.string().optional(),

        // Video/Podcast-specific metadata
        duration: z.string().optional(),

        // Writing-specific metadata
        publisher: z.string().optional(),
      }).optional(),
    })
  ),

  // Optional testimonials section
  testimonials: z.array(
    z.object({
      client: z.string(),
      feedback: z.string(),
      image: z.string().url().optional(),
      date: z.string().optional(),
    })
  ).optional(),

  // Optional accolades section with broader recognition types
  accolades: z.array(
    z.object({
      type: z.enum(["Award", "Publication", "Feature"]),
      title: z.string(),
      issuer: z.string(),
      date: z.string(),
      description: z.string().optional(),
      url: z.string().url().optional(),
      image: z.string().url().optional(),
    })
  ).optional(),

  // Optional pricing packages for services
  pricingPackages: z.array(
    z.object({
      name: z.string(),
      price: z.string(), // Flexible for different currency formats
      description: z.string(),
      features: z.array(z.string()),
      popular: z.boolean().default(false).optional(),
    })
  ).optional(),
});
const businessConsultingPortfolioSchema = basePortfolioSchema.extend({
  expertiseAreas: z.array(z.string()),

  // Comprehensive Case Studies Section
  caseStudies: z.array(
    z.object({
      title: z.string(),
      organization: z.string(),
      role: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      ongoing: z.boolean().default(false).optional(),
      description: z.string(),
      
      // Optional detailed project breakdown
      challenges: z.string().optional(),
      solutions: z.string().optional(),
      outcomes: z.string().optional(),
      
      // Additional project context
      teamSize: z.number().optional(),
      
      // Quantifiable Impact
      keyMetrics: z.array(
        z.object({
          name: z.string(), // Metric name
          value: z.string(), // Metric value
        })
      ).optional(),
      
      // Visual Documentation
      images: z.array(
        z.object({
          url: z.string().url(),
          caption: z.string().optional(),
        })
      ).optional(),
      
      // Project-Specific Testimonials
      testimonials: z.array(
        z.object({
          name: z.string(),
          position: z.string(),
          company: z.string().optional(),
          content: z.string(),
        })
      ).optional(),
      
      // Highlighting Significance
      featured: z.boolean().default(false).optional(),
    })
  ),

  // Skills Categorization
  skills: z.array(
    z.object({
      category: z.string(), // Skill category
      skills: z.array(
        z.object({
          name: z.string(),
          level: z.number().min(1).max(5).optional(), // Proficiency rating
        })
      ),
    })
  ),

  // Optional Tools Categorization
  tools: z.array(
    z.object({
      category: z.string(),
      tools: z.array(
        z.object({
          name: z.string(),
          level: z.number().min(1).max(5).optional(), // Proficiency rating
        })
      ),
    })
  ).optional(),

  // Optional Certifications
  certifications: z.array(
    z.object({
      name: z.string(),
      issuingOrganization: z.string(),
      issueDate: z.string(),
      expiryDate: z.string().optional(),
      credentialID: z.string().optional(),
      credentialURL: z.string().url().optional(),
    })
  ).optional(),

  // Optional Key Achievements
  keyAchievements: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      impact: z.string().optional(),
      date: z.string().optional(),
    })
  ).optional(),

  industries: z.array(z.string()).optional(),
});

export type PortfolioFormData = z.infer<typeof basePortfolioSchema>;
export type DeveloperPortfolioFormData = z.infer<typeof developerPortfolioSchema>;
export type DesignerPortfolioFormData = z.infer<typeof designerPortfolioSchema>;
export type BusinessConsultingPortfolioFormData = z.infer<typeof businessConsultingPortfolioSchema>;
export type ContentCreatorPortfolioFormData = z.infer<typeof contentCreatorPortfolioSchema>;


export {
  basePortfolioSchema,
  developerPortfolioSchema,
  designerPortfolioSchema,
  businessConsultingPortfolioSchema,
  contentCreatorPortfolioSchema,
};

// Note: The previous developer, designer, photographer, and writer schemas are assumed to be defined here
// They are omitted for brevity but would be included in the full implementation