import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { BusinessConsultingPortfolioFormData, ContentCreatorPortfolioFormData, DesignerPortfolioFormData, DeveloperPortfolioFormData, PortfolioFormData } from "@/components/portfolioForms/types/portfolio";

type PortfolioType =
  | "developer"
  | "designer"
  | "contentCreator"
  | "businessConsulting";

  type ExtendedPortfolioFormData =
  | PortfolioFormData
  | DeveloperPortfolioFormData
  | DesignerPortfolioFormData
  | BusinessConsultingPortfolioFormData
  | ContentCreatorPortfolioFormData;

export const generateDummyPortfolioData = (type: PortfolioType): ExtendedPortfolioFormData=> {
  const baseData: Partial<PortfolioFormData> = {
    name: "Alex Johnson",
    title: "",
    email: "alex.johnson@example.com",
    phone: "+15551234567",
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
    skills: ["JavaScript", "React", "Node.js", "Cloud", "TypeScript", "GraphQL"],
    portfolioItems: [
      {
        title: "E-commerce Platform",
        description:
          "Built a full-stack e-commerce solution with React frontend and Node.js backend",
        technologies: ["React", "Node.js", "MongoDB", "Stripe API", "AWS"],
        githubLink: "https://github.com/alexjohnson/ecommerce-platform",
        liveDemo: "https://ecommerce.alexjohnson.dev",
        type: "web-app",
        roles: ["Frontend Developer", "Backend Developer"],
        challenges: "Implementing secure payment processing and scalability",
        learnings: "Gained experience with payment gateway integration and AWS deployment",
      },
      {
        title: "Task Management App",
        description:
          "Developed a productivity app with real-time collaboration features using Firebase",
        technologies: ["TypeScript", "React", "Firebase", "Redux"],
        githubLink: "https://github.com/alexjohnson/task-manager",
        liveDemo: "https://tasks.alexjohnson.dev",
        type: "web-app",
        roles: ["Lead Developer"],
        challenges: "Real-time synchronization and offline support",
        learnings: "Deepened Firebase real-time database and offline caching knowledge",
      },
      {
        title: "Open Source CLI Tool",
        description:
          "Created a command-line interface tool to automate deployment workflows",
        technologies: ["Node.js", "TypeScript", "GitHub Actions"],
        githubLink: "https://github.com/alexjohnson/cli-tool",
        liveDemo: "",
        roles: ["Developer", "Maintainer"],
        challenges: "Cross-platform compatibility",
        learnings: "Learned packaging and publishing npm packages",
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
    skills: ["UI Design", "UX Research", "Prototyping", "Interaction Design", "Visual Design"],
    tools: [
      { name: "Figma", level: 5 },
      { name: "Adobe XD", level: 4 },
      { name: "Sketch", level: 4 },
      { name: "InVision", level: 3 },
    ],
    portfolioItems: [
      {
        title: "Mobile Banking App Redesign",
        client: "FinTech Solutions",
        description: "Complete redesign of mobile banking experience focusing on usability.",
        problem: "Poor user retention and low satisfaction scores",
        solution: "Streamlined navigation and improved visual hierarchy",
        process:
          "Conducted user interviews, wireframing, prototyping, usability testing, and iterations",
        outcome: "Increased user retention by 40%, improved task success rate by 25%",
        images: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        testimonial: {
          name: "Jamie Smith",
          position: "Product Manager",
          company: "FinTech Solutions",
          content:
            "The redesign exceeded our expectations and significantly improved our metrics.",
        },
      },
      {
        title: "E-learning Platform UX",
        client: "EduTech Corp",
        description:
          "Designed intuitive user flows and interactive elements for online courses.",
        problem: "Complex navigation and low engagement",
        solution: "Simplified user journeys and added progress tracking",
        process: "User research, persona creation, prototyping, A/B testing",
        outcome: "Boosted course completion rate by 35%",
        images: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        testimonial: {
          name: "Laura Green",
          position: "CEO",
          company: "EduTech Corp",
          content: "Outstanding design that improved user engagement dramatically.",
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
      {
        title: "Red Dot Design Award 2022",
        issuer: "Red Dot",
        date: "2022-10-01",
        description: "Recognized for outstanding product design",
      },
    ],
  };


  case "contentCreator":
    return {
      ...baseData,
      title: "Digital Content Creator",
      about:
        "Creative professional producing engaging content across multiple platforms with a focus on technology and design.",
      specialties: ["Video Production", "Technical Writing", "Photography", "Podcasting"],
      portfolioItems: [
        {
          title: "React Tutorial Series",
          type: "Video",
          description: "Comprehensive tutorial series on React fundamentals for beginners",
          url: "https://youtube.com/playlist?list=123",
          image:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
          tags: ["React", "JavaScript", "Web Development"],
          metadata: {
            camera: "Sony A7III",
            lens: "24-70mm f/2.8",
            duration: "45 minutes",
            views: 120000,
            likes: 15000,
          },
        },
        {
          title: "Modern CSS Techniques",
          type: "Writing",
          description: "In-depth article exploring advanced CSS features like Grid, Flexbox, and variables",
          url: "https://medium.com/@alexjohnson/modern-css",
          image: "https://images.unsplash.com/photo-1547658719-da2b51169166",
          tags: ["CSS", "Web Design", "Frontend"],
          metadata: {
            readingTime: "8 min",
            claps: 300,
            comments: 12,
          },
        },
        {
          title: "Photography Tips for Tech Creators",
          type: "Podcast",
          description: "A podcast episode discussing essential photography tips for content creators",
          url: "https://podcasts.com/episode/456",
          image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
          tags: ["Photography", "Podcast"],
          metadata: {
            duration: "30 minutes",
            downloads: 5000,
          },
        },
      ],
      testimonials: [
        {
          client: "Tech Publications Inc.",
          feedback: "High-quality content that engages our audience",
          date: "2023-03-10",
        },
        {
          client: "Creative Media Group",
          feedback: "Consistently delivers top-notch content on time",
          date: "2023-07-20",
        },
      ],
      accolades: [
        {
          type: "Publication",
          title: "Featured in Web Design Weekly",
          issuer: "Web Design Magazine",
          date: "2023-01-15",
        },
        {
          type: "Award",
          title: "Best Tech Video Creator 2024",
          issuer: "Content Creators Guild",
          date: "2024-02-10",
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
        {
          name: "Advanced Video Package",
          price: "$1200",
          description: "Includes up to 10 minutes of video with advanced editing and motion graphics",
          features: [
            "Scriptwriting",
            "Advanced editing",
            "Two rounds of revisions",
            "Motion graphics",
          ],
        },
      ],
    };
  
    case "businessConsulting":
      return {
        ...baseData,
        title: "Business Strategy Consultant",
        about:
          "Helping businesses optimize operations and develop growth strategies through data-driven insights.",
        portfolioItems: [
          {
            title: "Retail Chain Digital Transformation",
            organization: "National Retail Co.",
            role: "Lead Consultant",
            startDate: "2022-01-01",
            endDate: "2022-12-01",
            description:
              "Led digital transformation initiative for national retail chain, improving operational workflows and customer experience.",
            challenges: "Legacy systems and resistant company culture",
            solutions: "Phased rollout with extensive staff training and support",
            outcomes: "30% increase in operational efficiency and 15% sales growth",
            teamSize: 8,
            keyMetrics: [
              { name: "Process Efficiency", value: "+30%" },
              { name: "Cost Reduction", value: "22%" },
              { name: "Sales Growth", value: "+15%" },
            ],
          },
          {
            title: "Market Entry Strategy for Tech Startup",
            organization: "Innovatech Ltd.",
            role: "Consultant",
            startDate: "2023-03-01",
            endDate: "2023-08-01",
            description:
              "Developed go-to-market strategy for launching new SaaS product in North America",
            challenges: "Highly competitive market and regulatory hurdles",
            solutions: "Comprehensive competitor analysis and regulatory compliance plan",
            outcomes: "Achieved 10k+ users within first 6 months post-launch",
            teamSize: 5,
            keyMetrics: [
              { name: "User Acquisition", value: "10,000+" },
              { name: "Time to Market", value: "6 months" },
            ],
          },
        ],
        skills: ["Business Strategy", "Market Analysis", "Competitive Research", "Data Analytics", "Change Management"],
        certifications: [
          {
            name: "Certified Management Consultant",
            issuingOrganization: "Institute of Management Consultants",
            issueDate: "2020-06-01",
          },
          {
            name: "Project Management Professional (PMP)",
            issuingOrganization: "PMI",
            issueDate: "2018-09-15",
          },
        ],
        keyAchievements: [
          {
            title: "$10M Cost Savings",
            description: "Identified and implemented cost-saving measures across multiple clients",
            impact: "Improved clients' bottom line by an average of 15%",
          },
          {
            title: "Market Expansion Success",
            description: "Led strategies that enabled clients to enter 3 new international markets",
            impact: "Increased revenues by 25%",
          },
        ],
      };
    

    default:
      return baseData;
  }
};
export const populateFormWithDummyData = (
  form: UseFormReturn<
    | DeveloperPortfolioFormData
    | DesignerPortfolioFormData
    | BusinessConsultingPortfolioFormData
    | ContentCreatorPortfolioFormData
  >,
  portfolioType: PortfolioType
) => {
  const dummyData = generateDummyPortfolioData(portfolioType);

  form.reset(); // Clear existing form state

  // Set non-array fields
  Object.entries(dummyData).forEach(([key, value]) => {
    if (Array.isArray(value)) return;
    form.setValue(key as any, value);
  });

  // Helper to safely set array fields
  const setArrayField = (key: string, items?: any[]) => {
    if (!items) return;
    form.setValue(key as any, items);
  };

  // Common array fields
  setArrayField("experience", dummyData.experience);
  setArrayField("education", dummyData.education);
  setArrayField("skills", (dummyData as any).skills);

  // Type-specific fields
  switch (portfolioType) {
    case "developer":
      setArrayField("portfolioItems", (dummyData as any).portfolioItems);
      break;

    case "designer":
      setArrayField("portfolioItems", (dummyData as any).portfolioItems);
      setArrayField("testimonials", (dummyData as any).testimonials);
      setArrayField("awards", (dummyData as any).awards);
      break;

    case "contentCreator":
      setArrayField("portfolioItems", (dummyData as any).portfolioItems);
      setArrayField("pricingPackages", (dummyData as any).pricingPackages);
      break;

    case "businessConsulting":
      setArrayField("portfolioItems", (dummyData as any).portfolioItems);
      setArrayField("certifications", (dummyData as any).certifications);
      break;
  }

  toast.success(`Sample ${portfolioType} portfolio loaded!`, {
    description: "You can now edit this data or add your own information",
  });
};