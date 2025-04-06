import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { PortfolioFormData } from "@/components/portfolioForms/types/portfolio";

type PortfolioType =
  | "developer"
  | "designer"
  | "content-creator"
  | "business-consulting";

export const generateDummyPortfolioData = (type: PortfolioType) => {
  const baseData = {
    name: "Alex Johnson",
    title: "",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    about:
      "Experienced professional with a passion for creating impactful work. Specializing in delivering high-quality solutions to complex problems.",
    profileImage:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    socials: {
      github: "https://github.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
      website: "https://alexjohnson.dev",
      instagram: "https://instagram.com/alexjohnson",
      dribbble: "https://dribbble.com/alexjohnson",
      behance: "https://behance.net/alexjohnson",
      youtube: "https://youtube.com/@alexjohnson",
      medium: "https://medium.com/@alexjohnson",
    },
    contactForm: true,
    experience: [
      {
        company: "Tech Innovations Inc.",
        position: "Senior Professional",
        startDate: "2020-01-01",
        endDate: "",
        current: true,
        description: "Leading projects and delivering innovative solutions",
        achievements: [
          "Increased team productivity by 30%",
          "Implemented new processes that reduced costs",
        ],
      },
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2015-09-01",
        endDate: "2019-06-01",
        current: false,
        description: "Graduated with honors",
      },
    ],
  };

  switch (type) {
    case "developer":
      return {
        ...baseData,
        title: "Senior Full Stack Developer",
        about:
          "Full stack developer with 5+ years of experience building scalable web applications. Specialized in JavaScript, React, Node.js, and cloud technologies.",
        projects: [
          {
            title: "E-commerce Platform",
            description:
              "Built a full-stack e-commerce solution with React frontend and Node.js backend",
            technologies: "React, Node.js, MongoDB, Stripe API",
            githubLink: "https://github.com/alexjohnson/ecommerce-platform",
            liveDemo: "https://ecommerce.alexjohnson.dev",
            type: "web-app",
            roles: ["Frontend Developer", "Backend Developer"],
            challenges: "Implementing secure payment processing",
            learnings: "Gained experience with payment gateway integration",
          },
          {
            title: "Task Management App",
            description:
              "Developed a productivity application with real-time collaboration features",
            technologies: "TypeScript, React, Firebase",
            githubLink: "https://github.com/alexjohnson/task-manager",
            liveDemo: "https://tasks.alexjohnson.dev",
            type: "web-app",
            roles: ["Lead Developer"],
            challenges: "Real-time synchronization across clients",
            learnings: "Firebase real-time database implementation",
          },
        ],
        githubLink: "https://github.com/alexjohnson",
        linkedinLink: "https://linkedin.com/in/alexjohnson",
        personalWebsite: "https://alexjohnson.dev",
      };

    case "designer":
      return {
        ...baseData,
        title: "UX/UI Designer",
        about:
          "Creative designer with expertise in user-centered design principles and creating intuitive digital experiences.",
        skills: [
          { name: "UI Design", level: 5, category: "Design" },
          { name: "UX Research", level: 4, category: "Research" },
          { name: "Prototyping", level: 5, category: "Design" },
        ],
        tools: [
          { name: "Figma", level: 5 },
          { name: "Adobe XD", level: 4 },
        ],
        projects: [
          {
            title: "Mobile Banking App Redesign",
            client: "FinTech Solutions",
            description: "Complete redesign of mobile banking experience",
            problem: "Poor user retention and low satisfaction scores",
            solution: "Streamlined navigation and improved visual hierarchy",
            process:
              "Conducted user research, created prototypes, and tested iterations",
            outcome: "Increased user retention by 40%",
            images: [
              {
                url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
                type: "final",
                caption: "Final dashboard design",
              },
            ],
            testimonial: {
              name: "Jamie Smith",
              position: "Product Manager",
              company: "FinTech Solutions",
              content:
                "The redesign exceeded our expectations and significantly improved our metrics.",
            },
          },
        ],
        testimonials: [
          {
            client: "Sarah Williams",
            position: "Marketing Director",
            company: "Creative Agency",
            feedback: "Exceptional design work that transformed our product",
            image:
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
          },
        ],
        awards: [
          {
            title: "Best UX Design 2023",
            issuer: "Design Awards International",
            date: "2023-05-15",
            description: "Awarded for innovative banking app design",
          },
        ],
      };

    case "content-creator":
      return {
        ...baseData,
        title: "Digital Content Creator",
        about:
          "Creative professional producing engaging content across multiple platforms with a focus on technology and design.",
        specialties: ["Video Production", "Technical Writing", "Photography"],
        portfolioItems: [
          {
            title: "React Tutorial Series",
            type: "Video",
            description: "Comprehensive tutorial series on React fundamentals",
            url: "https://youtube.com/playlist?list=123",
            image:
              "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
            tags: ["React", "JavaScript", "Web Development"],
            metadata: {
              camera: "Sony A7III",
              lens: "24-70mm f/2.8",
              duration: "45 minutes",
            },
          },
          {
            title: "Modern CSS Techniques",
            type: "Writing",
            description: "Article exploring advanced CSS features",
            url: "https://medium.com/@alexjohnson/modern-css",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166",
          },
        ],
        testimonials: [
          {
            client: "Tech Publications Inc.",
            feedback: "High-quality content that engages our audience",
            date: "2023-03-10",
          },
        ],
        accolades: [
          {
            type: "Publication",
            title: "Featured in Web Design Weekly",
            issuer: "Web Design Magazine",
            date: "2023-01-15",
          },
        ],
        pricingPackages: [
          {
            name: "Basic Video Package",
            price: "$500",
            description: "Includes 2 minutes of edited video content",
            features: [
              "Script consultation",
              "Basic editing",
              "One round of revisions",
            ],
          },
        ],
      };

    case "business-consulting":
      return {
        ...baseData,
        title: "Business Strategy Consultant",
        about:
          "Helping businesses optimize operations and develop growth strategies through data-driven insights.",
        expertiseAreas: [
          "Digital Transformation",
          "Process Optimization",
          "Market Expansion",
        ],
        caseStudies: [
          {
            title: "Retail Chain Digital Transformation",
            organization: "National Retail Co.",
            role: "Lead Consultant",
            startDate: "2022-01-01",
            endDate: "2022-12-01",
            description:
              "Led digital transformation initiative for national retail chain",
            challenges: "Legacy systems and resistant culture",
            solutions: "Phased rollout with extensive training",
            outcomes: "30% increase in operational efficiency",
            teamSize: 8,
            keyMetrics: [
              { name: "Process Efficiency", value: "+30%" },
              { name: "Cost Reduction", value: "22%" },
            ],
          },
        ],
        skills: [
          {
            category: "Business Strategy",
            skills: [
              { name: "Market Analysis", level: 5 },
              { name: "Competitive Research", level: 4 },
            ],
          },
        ],
        certifications: [
          {
            name: "Certified Management Consultant",
            issuingOrganization: "Institute of Management Consultants",
            issueDate: "2020-06-01",
          },
        ],
        keyAchievements: [
          {
            title: "$10M Cost Savings",
            description: "Identified and implemented cost-saving measures",
            impact: "Improved client's bottom line by 15%",
          },
        ],
        industries: ["Retail", "Technology", "Healthcare"],
      };

    default:
      return baseData;
  }
};

export const populateFormWithDummyData = (
  form: UseFormReturn<PortfolioFormData>,
  portfolioType: PortfolioType
) => {
  const dummyData = generateDummyPortfolioData(portfolioType);

  // Reset form first to clear existing data
  form.reset();

  // Set all base values
  Object.entries(dummyData).forEach(([key, value]) => {
    if (
      key === "projects" ||
      key === "skills" ||
      key === "experience" ||
      key === "education"
    ) {
      return; // Handle arrays separately
    }
    form.setValue(key as keyof PortfolioFormData, value as any);
  });

  // Handle array fields with proper type checking
  if (dummyData.projects) {
    form.setValue("projects", []);
    dummyData.projects.forEach((project: any) => {
      form.setValue("projects", [...form.getValues().projects, project]);
    });
  }

  if (dummyData.skills) {
    form.setValue("skills", []);
    dummyData.skills.forEach((skill: any) => {
      form.setValue("skills", [...form.getValues().skills, skill]);
    });
  }

  if (dummyData.experience) {
    form.setValue("experience", []);
    dummyData.experience.forEach((exp: any) => {
      form.setValue("experience", [...form.getValues().experience, exp]);
    });
  }

  if (dummyData.education) {
    form.setValue("education", []);
    dummyData.education.forEach((edu: any) => {
      form.setValue("education", [...form.getValues().education, edu]);
    });
  }

  // Portfolio-specific fields
  if (portfolioType === "designer") {
    if (dummyData.testimonials) {
      form.setValue("testimonials", []);
      dummyData.testimonials.forEach((testimonial: any) => {
        form.setValue("testimonials", [
          ...form.getValues().testimonials,
          testimonial,
        ]);
      });
    }
    if (dummyData.awards) {
      form.setValue("awards", []);
      dummyData.awards.forEach((award: any) => {
        form.setValue("awards", [...form.getValues().awards, award]);
      });
    }
  }

  if (portfolioType === "content-creator") {
    if (dummyData.portfolioItems) {
      form.setValue("portfolioItems", []);
      dummyData.portfolioItems.forEach((item: any) => {
        form.setValue("portfolioItems", [
          ...form.getValues().portfolioItems,
          item,
        ]);
      });
    }
    if (dummyData.pricingPackages) {
      form.setValue("pricingPackages", []);
      dummyData.pricingPackages.forEach((pkg: any) => {
        form.setValue("pricingPackages", [
          ...form.getValues().pricingPackages,
          pkg,
        ]);
      });
    }
  }

  if (portfolioType === "business-consulting") {
    if (dummyData.caseStudies) {
      form.setValue("caseStudies", []);
      dummyData.caseStudies.forEach((study: any) => {
        form.setValue("caseStudies", [...form.getValues().caseStudies, study]);
      });
    }
    if (dummyData.certifications) {
      form.setValue("certifications", []);
      dummyData.certifications.forEach((cert: any) => {
        form.setValue("certifications", [
          ...form.getValues().certifications,
          cert,
        ]);
      });
    }
  }

  toast.success(`Sample ${portfolioType} portfolio loaded!`, {
    description: "You can now edit this data or add your own information",
  });
};
