export type ServiceIconName =
  | "Code2"
  | "Globe"
  | "Layers"
  | "Smartphone"
  | "Wrench"
  | "Palette"
  | "Rocket"
  | "Settings2"
  | "ShieldCheck"
  | "Building2"
  | "Workflow"
  | "BarChart3"
  | "LayoutDashboard"
  | "Link2"
  | "RefreshCw"
  | "Search"
  | "PenTool"
  | "CheckCircle2"
  | "Zap"
  | "Users2"
  | "Cloud"
  | "Monitor"
  | "Tablet"
  | "Gauge"
  | "Lock"
  | "Bug"
  | "Headset"
  | "Clock"
  | "ActivitySquare"
  | "ClipboardList"
  | "Eye"
  | "Wallet"
  | "TrendingUp"
  | "Map"
  | "Lightbulb";

export type ServiceItem = {
  icon: ServiceIconName;
  title: string;
  desc: string;
};

export type ServiceProcessStep = {
  icon: ServiceIconName;
  step: string;
  title: string;
  desc: string;
};
export type ServiceTechGroup = { label: string; items: string[] };

export type ServiceDetail = {
  slug: string;
  code: string;
  name: string;
  icon: ServiceIconName;
  accent: string;
  heroTitle: string;
  heroDesc: string;
  // Iconify icon identifiers (e.g. "logos:react") shown as floating badges
  // in the hero. Sourced from this service's own techStack where one is
  // defined; otherwise from technologies confirmed elsewhere in this file.
  heroFloatIcons?: string[];
  highlights?: ServiceItem[];
  gridSection?: {
    label: string;
    title: string;
    desc?: string;
    items: ServiceItem[];
  };
  techStack?: {
    label: string;
    title: string;
    desc?: string;
    groups: ServiceTechGroup[];
  };
  process?: ServiceProcessStep[];
  closingCtaTitle?: string;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "custom-software-development": {
    slug: "custom-software-development",
    code: "CSD",
    // No dedicated techStack defined for this service; reusing the
    // technologies confirmed in this company's other service stacks
    // (.NET, Node.js, SQL Server, React) rather than inventing a new stack.
    heroFloatIcons: [
      "logos:dotnet",
      "logos:nodejs-icon",
      "logos:microsoft-sql-server",
      "logos:react",
      "lucide:Settings2",
    ],
    name: "Custom Software Development",
    icon: "Code2",
    accent: "#2f4bd0",
    heroTitle: "Software Solutions Built Specifically for Your Business",
    heroDesc:
      "We design and develop software tailored to your business processes, operational needs, and company growth strategy.",
    highlights: [
      {
        icon: "Settings2",
        title: "Tailored Solution",
        desc: "Every system is built to match your business's unique requirements.",
      },
      {
        icon: "ShieldCheck",
        title: "Secure & Reliable",
        desc: "System security and stability are our top priorities.",
      },
      {
        icon: "Layers",
        title: "Scalable Architecture",
        desc: "Built to grow alongside your company.",
      },
    ],
    gridSection: {
      label: "Service Scope",
      title: "Types of Custom Software",
      desc: "Solutions specifically designed to improve efficiency, control, and business growth.",
      items: [
        {
          icon: "Building2",
          title: "Enterprise & Internal Systems",
          desc: "Internal systems for business operations, management, and control.",
        },
        {
          icon: "Workflow",
          title: "Business Process Automation",
          desc: "Automating manual processes to make them faster and reduce errors.",
        },
        {
          icon: "BarChart3",
          title: "Financial & Reporting Systems",
          desc: "Accurate, real-time financial reporting and analytics.",
        },
        {
          icon: "LayoutDashboard",
          title: "Customer Portal & Dashboard",
          desc: "Interactive portals for customers, partners, or management.",
        },
        {
          icon: "Link2",
          title: "System Integration & API",
          desc: "Seamlessly connecting legacy and new systems.",
        },
        {
          icon: "RefreshCw",
          title: "Legacy System Modernization",
          desc: "Upgrading legacy systems into modern, scalable, and secure platforms.",
        },
      ],
    },
    process: [
      {
        icon: "Search",
        step: "01",
        title: "Requirement Analysis",
        desc: "Understanding business processes and system requirements in depth.",
      },
      {
        icon: "PenTool",
        step: "02",
        title: "System Design",
        desc: "Structured architecture and UX design.",
      },
      {
        icon: "Code2",
        step: "03",
        title: "Development",
        desc: "System implementation to a high quality standard.",
      },
      {
        icon: "CheckCircle2",
        step: "04",
        title: "Testing & Deployment",
        desc: "Thorough testing before the system goes live.",
      },
    ],
  },

  "web-application-development": {
    slug: "web-application-development",
    code: "WEB",
    // Pulled directly from this service's own techStack below.
    heroFloatIcons: [
      "logos:react",
      "logos:dotnet",
      "logos:nodejs-icon",
      "logos:postgresql",
      "lucide:Zap",
    ],
    name: "Web Development",
    icon: "Globe",
    accent: "#0e9488",
    heroTitle: "Scalable, Secure & User-Focused Web Applications",
    heroDesc:
      "We develop modern web applications that support business operations, improve efficiency, and deliver the best user experience.",
    highlights: [
      {
        icon: "Zap",
        title: "High Performance",
        desc: "Speed and performance optimized for large-scale users.",
      },
      {
        icon: "ShieldCheck",
        title: "Secure by Design",
        desc: "Security built in from the architecture stage through to deployment.",
      },
      {
        icon: "Users2",
        title: "User-Centric Experience",
        desc: "Intuitive UX that makes the application easy and effective to use.",
      },
    ],
    gridSection: {
      label: "Service Scope",
      title: "Types of Web Applications",
      desc: "The web application solutions we build are designed to be flexible, scalable, and ready to support business growth.",
      items: [
        {
          icon: "Building2",
          title: "Enterprise Web Application",
          desc: "Enterprise-scale applications for business operations and management.",
        },
        {
          icon: "BarChart3",
          title: "Dashboard & Analytics System",
          desc: "Data visualization and real-time performance monitoring.",
        },
        {
          icon: "Users2",
          title: "Customer & Partner Portal",
          desc: "Interactive portals for customers, partners, and stakeholders.",
        },
        {
          icon: "Cloud",
          title: "SaaS Platform",
          desc: "Subscription-based platforms with scalable architecture.",
        },
        {
          icon: "Settings2",
          title: "Internal Management System",
          desc: "Internal systems for automating and streamlining business processes.",
        },
        {
          icon: "Link2",
          title: "API-Driven Web Application",
          desc: "Web applications integrated with other systems via API.",
        },
      ],
    },
    techStack: {
      label: "Technology Stack",
      title: "Technologies We Use",
      desc: "A modern stack proven to be stable, secure, and scale-ready.",
      groups: [
        {
          label: "Frontend",
          items: ["React", "Blazor", "HTML5", "Tailwind", "Bootstrap"],
        },
        {
          label: "Backend",
          items: [".NET", "Node.js", "REST API", "Microservices"],
        },
        {
          label: "Database",
          items: ["SQL Server", "PostgreSQL", "MySQL", "Redis"],
        },
        {
          label: "Deployment",
          items: ["Docker", "CI/CD", "Cloud Hosting", "On Premise"],
        },
      ],
    },
  },

  "full-stack-development": {
    slug: "full-stack-development",
    code: "FSD",
    // Pulled directly from this service's own techStack below.
    heroFloatIcons: [
      "logos:dotnet",
      "logos:react",
      "logos:nextjs-icon",
      "logos:nodejs-icon",
      "lucide:Layers",
    ],
    name: "Full Stack Development",
    icon: "Layers",
    accent: "#7c3aed",
    heroTitle: "Backend, Frontend & Full Stack Solutions",
    heroDesc:
      "We build end-to-end systems with modern architecture, high performance, and ready to scale to your business needs.",
    gridSection: {
      label: "Full Stack Services",
      title: "Tailored to Your System's Complexity and Team",
      items: [
        {
          icon: "Monitor",
          title: "Backend Development",
          desc: "APIs, databases, security, and scalable business logic.",
        },
        {
          icon: "Palette",
          title: "Frontend Development",
          desc: "Modern, responsive UI focused on user experience.",
        },
        {
          icon: "Layers",
          title: "Full Stack Development",
          desc: "End-to-end solutions from database to UI.",
        },
      ],
    },
    techStack: {
      label: "Technology Stack",
      title: "Technologies We Use",
      desc: "A modern stack proven to be stable, secure, and scale-ready.",
      groups: [
        {
          label: "Backend Stack",
          items: [
            ".NET Core",
            "ASP.NET",
            "Node.js",
            "REST API",
            "Microservices",
            "SQL Server",
          ],
        },
        {
          label: "Frontend Stack",
          items: ["React", "Next.js", "HTML5", "CSS3", "Bootstrap", "Tailwind"],
        },
        {
          label: "DevOps & Cloud",
          items: ["Docker", "CI/CD", "Git", "Cloud Deployment", "Monitoring"],
        },
      ],
    },
    closingCtaTitle: "Ready to Build a Full Stack System?",
  },

  "mobile-app-development": {
    slug: "mobile-app-development",
    code: "MOB",
    // Pulled directly from this service's own techStack below.
    heroFloatIcons: [
      "logos:flutter",
      "logos:firebase",
      "logos:dotnet",
      "logos:nodejs-icon",
      "lucide:Smartphone",
    ],
    name: "Mobile App Development",
    icon: "Smartphone",
    accent: "#059669",
    heroTitle: "Scalable Android & iOS Mobile Applications",
    heroDesc:
      "We design and build mobile applications with high performance, modern UI, and an architecture ready to grow with your business.",
    highlights: [
      {
        icon: "Smartphone",
        title: "Android App",
        desc: "Native and cross-platform Android applications with optimal performance.",
      },
      {
        icon: "Tablet",
        title: "iOS App",
        desc: "iOS applications built to Apple's Human Interface Guidelines.",
      },
      {
        icon: "Layers",
        title: "Cross Platform",
        desc: "A single codebase for Android and iOS — faster and more efficient.",
      },
    ],
    gridSection: {
      label: "Advantages",
      title: "Why Our Applications Stand Out",
      items: [
        {
          icon: "Gauge",
          title: "High Performance",
          desc: "Optimized speed and app responsiveness.",
        },
        {
          icon: "Lock",
          title: "Data Security",
          desc: "Encryption, authentication, and user data protection.",
        },
        {
          icon: "Palette",
          title: "Modern UI/UX",
          desc: "Intuitive, user-friendly design.",
        },
        {
          icon: "Link2",
          title: "Backend Integration",
          desc: "Connected directly to APIs and backend systems.",
        },
      ],
    },
    techStack: {
      label: "Technology",
      title: "Mobile Technology",
      desc: "The best stack for performance, stability, and ease of maintenance.",
      groups: [
        { label: "Mobile Framework", items: ["Flutter", "Capacitor JS"] },
        {
          label: "Backend & API",
          items: ["REST API", ".NET Core", "Node.js", "Firebase"],
        },
        {
          label: "Deployment & Tools",
          items: ["Google Play", "App Store", "CI/CD", "Analytics"],
        },
      ],
    },
  },

  "software-maintenance-support": {
    slug: "software-maintenance-support",
    code: "SUP",
    // Pulled directly from this service's own techStack below.
    heroFloatIcons: [
      "logos:dotnet",
      "logos:php",
      "logos:react",
      "logos:flutter",
      "lucide:Wrench",
    ],
    name: "Software Maintenance & Support",
    icon: "Wrench",
    accent: "#b45309",
    heroTitle: "Ongoing Software Maintenance & Support",
    heroDesc:
      "Keeping your systems stable, secure, and optimized through professional maintenance and support services.",
    gridSection: {
      label: "Maintenance Services",
      title: "Technical Support That Keeps Your System Running Smoothly",
      items: [
        {
          icon: "Bug",
          title: "Bug Fixing",
          desc: "Fast, precise identification and resolution of bugs.",
        },
        {
          icon: "RefreshCw",
          title: "System Update",
          desc: "Feature updates, dependency updates, and performance improvements.",
        },
        {
          icon: "ShieldCheck",
          title: "Security Patch",
          desc: "Protecting your system against the latest security vulnerabilities.",
        },
        {
          icon: "Headset",
          title: "Technical Support",
          desc: "Fast response for technical and operational issues.",
        },
        {
          icon: "Clock",
          title: "Measured SLA",
          desc: "Response and resolution times aligned with agreed terms.",
        },
        {
          icon: "ActivitySquare",
          title: "Performance Monitoring",
          desc: "Regular, proactive system monitoring.",
        },
        {
          icon: "ClipboardList",
          title: "Regular Reporting",
          desc: "Routine maintenance and system status reports.",
        },
      ],
    },
    techStack: {
      label: "Coverage",
      title: "Systems We Support",
      desc: "The range of platforms and technologies we handle.",
      groups: [
        {
          label: "Web Application",
          items: ["ASP.NET", "PHP", "Node.js", "React"],
        },
        {
          label: "Mobile Application",
          items: ["Android", "iOS", "Flutter", "React Native"],
        },
        {
          label: "Server & Database",
          items: ["SQL Server", "PostgreSQL", "Cloud Server", "Monitoring"],
        },
      ],
    },
  },

  "ui-ux-design-services": {
    slug: "ui-ux-design-services",
    code: "UIX",
    // This service's real tools are Figma and Adobe XD (confirmed by the
    // page's own "Tools yang Kami Gunakan" section). No fabricated tools
    // added — the badge loop simply cycles between these two.
    heroFloatIcons: [
      "logos:figma",
      "lucide:PenTool",
      "logos:adobe-xd",
      "lucide:Palette",
      "lucide:Eye",
    ],
    name: "UI/UX Design Services",
    icon: "Palette",
    accent: "#db2777",
    heroTitle: "Functional, User-Oriented UI/UX Design",
    heroDesc:
      "We design interfaces that are intuitive, consistent, and aligned with your business goals — from research through to implementation-ready designs.",
    highlights: [
      {
        icon: "Eye",
        title: "Data-Driven Research",
        desc: "Design decisions backed by real research and user understanding.",
      },
      {
        icon: "Palette",
        title: "Consistent Visuals",
        desc: "A unified design system across all of your products.",
      },
      {
        icon: "Users2",
        title: "User-Centered",
        desc: "Every flow designed to be easy and comfortable to use.",
      },
    ],
    gridSection: {
      label: "Service Scope",
      title: "UI/UX Service Scope",
      desc: "A comprehensive design process, from research through to development handoff.",
      items: [
        {
          icon: "Search",
          title: "User Research",
          desc: "Understanding the needs and behavior of your target users.",
        },
        {
          icon: "PenTool",
          title: "Wireframing",
          desc: "Basic flow and layout structure before moving into visual design.",
        },
        {
          icon: "Layers",
          title: "UI Design System",
          desc: "Consistent, reusable visual components and styles.",
        },
        {
          icon: "Smartphone",
          title: "Responsive Design",
          desc: "Optimal display across a range of devices and screen sizes.",
        },
        {
          icon: "Eye",
          title: "Usability Testing",
          desc: "Validating designs directly with real users.",
        },
        {
          icon: "Code2",
          title: "Design Handoff",
          desc: "Ready-to-use specifications for the development team.",
        },
      ],
    },
    process: [
      {
        icon: "Search",
        step: "01",
        title: "Discovery",
        desc: "Researching business goals and user needs.",
      },
      {
        icon: "PenTool",
        step: "02",
        title: "Wireframe",
        desc: "Structuring the user flow.",
      },
      {
        icon: "Palette",
        step: "03",
        title: "Visual Design",
        desc: "Applying visuals, color, and typography.",
      },
      {
        icon: "CheckCircle2",
        step: "04",
        title: "Testing & Handoff",
        desc: "Validating the design and handing it off to the development team.",
      },
    ],
  },

  "mvp-software-development": {
    slug: "mvp-software-development",
    code: "MVP",
    // No dedicated techStack defined for this service; reusing the
    // technologies confirmed in this company's other service stacks
    // (.NET, Node.js, React, SQL Server) rather than inventing a new stack.
    heroFloatIcons: [
      "logos:react",
      "logos:nodejs-icon",
      "logos:dotnet",
      "logos:microsoft-sql-server",
      "lucide:Rocket",
    ],
    name: "MVP Software Development",
    icon: "Rocket",
    accent: "#ea580c",
    heroTitle: "Build Products Faster With an MVP",
    heroDesc:
      "We help startups and companies validate business ideas through an MVP that's fast, efficient, and ready to be developed further.",
    highlights: [
      {
        icon: "Rocket",
        title: "Faster to Market",
        desc: "Validate ideas and launch products without waiting for a complex system.",
      },
      {
        icon: "Wallet",
        title: "Cost-Effective",
        desc: "Focus on the core features users actually need.",
      },
      {
        icon: "TrendingUp",
        title: "Ready to Scale",
        desc: "MVP architecture designed to scale smoothly into the full product.",
      },
    ],
    gridSection: {
      label: "Service Scope",
      title: "MVP Scope",
      desc: "Focused on core features to validate business value before moving into further development.",
      items: [
        {
          icon: "Search",
          title: "Business & Product Validation",
          desc: "Needs analysis and solution validation against the market.",
        },
        {
          icon: "PenTool",
          title: "UI/UX & Prototyping",
          desc: "Wireframes and basic design to validate the user experience.",
        },
        {
          icon: "Code2",
          title: "Core Feature Development",
          desc: "Building the core features that represent your product's value.",
        },
        {
          icon: "Lock",
          title: "Basic Security",
          desc: "Authentication and basic protection for the MVP application.",
        },
        {
          icon: "Cloud",
          title: "Cloud Deployment",
          desc: "Deploying the MVP to the cloud so it's ready for user testing.",
        },
        {
          icon: "Map",
          title: "Future Roadmap",
          desc: "Recommendations for further development toward the full product.",
        },
      ],
    },
    process: [
      {
        icon: "Lightbulb",
        step: "01",
        title: "Ideation",
        desc: "Discussing business goals and the product's core value.",
      },
      {
        icon: "PenTool",
        step: "02",
        title: "Design",
        desc: "Simple wireframes and UI for rapid validation.",
      },
      {
        icon: "Code2",
        step: "03",
        title: "Development",
        desc: "Building core features with modern technology.",
      },
      {
        icon: "Rocket",
        step: "04",
        title: "Launch",
        desc: "Deploying the MVP, ready for user testing.",
      },
    ],
  },
};

export const serviceList = Object.values(serviceDetails);
