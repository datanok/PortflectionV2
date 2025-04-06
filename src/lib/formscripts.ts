import { PortfolioFormData } from "@/components/portfolioForms/types/portfolio";
import { UseFormReturn } from "react-hook-form";

export const addDummyDeveloperPortfolioData = <T extends FieldValues>(
  appendProject: (data: any) => void,
  setValue: (name: Path<T>, value: any) => void
) => {
  // Set social links
  setValue("githubLink", "https://github.com/johndoe");
  setValue("linkedinLink", "https://linkedin.com/in/johndoe");
  setValue("personalWebsite", "https://johndoe.dev");

  // Add projects
  const dummyProjects = [
    {
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce platform with product listings, cart functionality, and payment processing.",
      technologies: "React, Node.js, MongoDB, Stripe API",
      githubLink: "https://github.com/johndoe/ecommerce-platform",
      liveDemo: "https://ecommerce.johndoe.dev",
      type: "web-app",
      roles: ["Frontend Developer", "Backend Developer"],
      challenges:
        "Implementing secure payment processing and optimizing database queries for product listings.",
      learnings:
        "Gained experience with Stripe API integration and performance optimization techniques.",
    },
    {
      title: "Task Management App",
      description:
        "A productivity application for managing tasks with drag-and-drop functionality and team collaboration features.",
      technologies: "TypeScript, React, Firebase, Tailwind CSS",
      githubLink: "https://github.com/johndoe/task-manager",
      liveDemo: "https://tasks.johndoe.dev",
      type: "web-app",
      roles: ["Lead Developer"],
      challenges:
        "Implementing real-time updates across multiple clients and handling offline functionality.",
      learnings:
        "Learned about Firebase real-time database and offline-first development patterns.",
    },
    {
      title: "Weather Dashboard",
      description:
        "A weather application that displays current conditions and forecasts using data from a weather API.",
      technologies: "JavaScript, React, OpenWeather API, Chart.js",
      githubLink: "https://github.com/johndoe/weather-app",
      liveDemo: "https://weather.johndoe.dev",
      type: "web-app",
      roles: ["Sole Developer"],
      challenges:
        "Handling API rate limits and displaying data in an intuitive way.",
      learnings: "Improved skills in data visualization and API consumption.",
    },
  ];

  // Clear existing projects first
  // (In a real implementation, you might want to confirm with the user before clearing)

  // Add dummy projects
  dummyProjects.forEach((project) => appendProject(project));
};

export const addDummyContactData = (form: UseFormReturn<PortfolioFormData>) => {
  const { setValue } = form;

  // Basic contact info
  setValue("phone", "+1 (555) 123-4567");
  setValue("location", "San Francisco, CA");

  // Social links
  setValue("socials.github", "https://github.com/johndoe");
  setValue("socials.linkedin", "https://linkedin.com/in/johndoe");
  setValue("socials.twitter", "https://twitter.com/johndoe");
  setValue("socials.website", "https://johndoe.dev");

  // Additional socials
  setValue("socials.instagram", "https://instagram.com/johndoe");
  setValue("socials.dribbble", "https://dribbble.com/johndoe");
  setValue("socials.behance", "https://behance.net/johndoe");
  setValue("socials.youtube", "https://youtube.com/@johndoe");
  setValue("socials.medium", "https://medium.com/@johndoe");

  // Enable contact form
  setValue("contactForm", true);
};

export const addCompleteDummyPortfolio = (
  form: UseFormReturn<PortfolioFormData>
) => {
  const { setValue } = form;

  // 1. Basic Information
  setValue("name", "John Doe");
  setValue("title", "Senior Full Stack Developer");
  setValue(
    "bio",
    "Passionate developer with 5+ years of experience building web applications. Specialized in React, Node.js, and cloud technologies."
  );
  setValue("email", "john.doe@example.com");

  // 2. Contact Information (from ContactInfoTab)
  setValue("phone", "+1 (555) 123-4567");
  setValue("location", "San Francisco, CA");
  setValue("contactForm", true);

  // Social Links
  setValue("socials.github", "https://github.com/johndoe");
  setValue("socials.linkedin", "https://linkedin.com/in/johndoe");
  setValue("socials.twitter", "https://twitter.com/johndoe");
  setValue("socials.website", "https://johndoe.dev");
  setValue("socials.instagram", "https://instagram.com/johndoe");
  setValue("socials.dribbble", "https://dribbble.com/johndoe");
  setValue("socials.behance", "https://behance.net/johndoe");
  setValue("socials.youtube", "https://youtube.com/@johndoe");
  setValue("socials.medium", "https://medium.com/@johndoe");

  // 3. Projects (from DeveloperPortfolio)
  const dummyProjects = [
    {
      title: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution with React frontend and Node.js backend",
      technologies: "React, Node.js, MongoDB, Stripe API",
      githubLink: "https://github.com/johndoe/ecommerce-platform",
      liveDemo: "https://ecommerce.johndoe.dev",
      type: "web-app",
      roles: ["Frontend Developer", "Backend Developer"],
      challenges: "Implementing secure checkout flow and inventory management",
      learnings:
        "Gained experience with payment processing and performance optimization",
    },
    {
      title: "Task Management App",
      description: "Productivity app with real-time collaboration features",
      technologies: "TypeScript, React, Firebase",
      githubLink: "https://github.com/johndoe/task-manager",
      liveDemo: "https://tasks.johndoe.dev",
      type: "web-app",
      roles: ["Lead Developer"],
      challenges: "Real-time sync across multiple clients",
      learnings: "Firebase real-time database implementation",
    },
  ];

  // Clear existing projects first
  setValue("projects", []);
  dummyProjects.forEach((project) => {
    form.setValue("projects", [...form.getValues().projects, project]);
  });

  // 4. Skills/Technologies
  setValue("skills", [
    { name: "JavaScript", level: 5, category: "Development" },
    { name: "React", level: 5, category: "Frontend" },
    { name: "Node.js", level: 4, category: "Backend" },
    { name: "TypeScript", level: 4, category: "Development" },
  ]);

  // 5. Experience
  setValue("experience", [
    {
      company: "Tech Corp Inc.",
      position: "Senior Developer",
      startDate: "2020-01",
      endDate: "Present",
      description: "Lead development team building enterprise applications",
    },
    {
      company: "Startup Labs",
      position: "Full Stack Developer",
      startDate: "2018-06",
      endDate: "2019-12",
      description: "Built MVP for multiple startup projects",
    },
  ]);

  // 6. Education
  setValue("education", [
    {
      institution: "University of Technology",
      degree: "B.S. Computer Science",
      year: "2018",
    },
  ]);
};
