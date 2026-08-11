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

export type ServiceItem = { icon: ServiceIconName; title: string; desc: string };
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
  heroFloatIcons?: ServiceIconName[];
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
    heroFloatIcons: ["Settings2", "ShieldCheck", "Layers", "Code2", "CheckCircle2"],
    name: "Custom Software Development",
    icon: "Code2",
    accent: "#2f4bd0",
    heroTitle: "Solusi Software yang Dibangun Khusus untuk Bisnis Anda",
    heroDesc:
      "Kami merancang dan mengembangkan software yang disesuaikan dengan proses bisnis, kebutuhan operasional, dan strategi pertumbuhan perusahaan Anda.",
    highlights: [
      {
        icon: "Settings2",
        title: "Tailored Solution",
        desc: "Setiap sistem dibangun sesuai kebutuhan unik bisnis Anda.",
      },
      {
        icon: "ShieldCheck",
        title: "Secure & Reliable",
        desc: "Keamanan dan stabilitas sistem menjadi prioritas utama.",
      },
      {
        icon: "Layers",
        title: "Scalable Architecture",
        desc: "Siap berkembang seiring pertumbuhan perusahaan.",
      },
    ],
    gridSection: {
      label: "Cakupan Layanan",
      title: "Jenis Custom Software",
      desc: "Solusi yang dirancang khusus untuk meningkatkan efisiensi, kontrol, dan pertumbuhan bisnis Anda.",
      items: [
        {
          icon: "Building2",
          title: "Enterprise & Internal Systems",
          desc: "Sistem internal untuk operasional, manajemen, dan kontrol bisnis.",
        },
        {
          icon: "Workflow",
          title: "Business Process Automation",
          desc: "Otomatisasi proses manual agar lebih cepat dan minim error.",
        },
        {
          icon: "BarChart3",
          title: "Financial & Reporting Systems",
          desc: "Pelaporan keuangan dan analitik yang akurat dan real-time.",
        },
        {
          icon: "LayoutDashboard",
          title: "Customer Portal & Dashboard",
          desc: "Portal interaktif untuk pelanggan, partner, atau manajemen.",
        },
        {
          icon: "Link2",
          title: "System Integration & API",
          desc: "Menghubungkan sistem lama dan baru secara seamless.",
        },
        {
          icon: "RefreshCw",
          title: "Legacy System Modernization",
          desc: "Upgrade sistem lama menjadi modern, scalable, dan aman.",
        },
      ],
    },
    process: [
      {
        icon: "Search",
        step: "01",
        title: "Requirement Analysis",
        desc: "Memahami proses bisnis dan kebutuhan sistem secara mendalam.",
      },
      {
        icon: "PenTool",
        step: "02",
        title: "System Design",
        desc: "Perancangan arsitektur dan UX yang terstruktur.",
      },
      {
        icon: "Code2",
        step: "03",
        title: "Development",
        desc: "Implementasi sistem dengan standar kualitas tinggi.",
      },
      {
        icon: "CheckCircle2",
        step: "04",
        title: "Testing & Deployment",
        desc: "Pengujian menyeluruh sebelum sistem digunakan.",
      },
    ],
  },

  "web-application-development": {
    slug: "web-application-development",
    code: "WEB",
    heroFloatIcons: ["Zap", "ShieldCheck", "Users2", "Globe", "BarChart3"],
    name: "Web Development",
    icon: "Globe",
    accent: "#0e9488",
    heroTitle: "Web Application yang Scalable, Secure & User-Focused",
    heroDesc:
      "Kami mengembangkan web application modern yang mendukung operasional bisnis, meningkatkan efisiensi, dan memberikan pengalaman pengguna terbaik.",
    highlights: [
      {
        icon: "Zap",
        title: "High Performance",
        desc: "Optimasi kecepatan dan performa untuk pengguna skala besar.",
      },
      {
        icon: "ShieldCheck",
        title: "Secure by Design",
        desc: "Keamanan sistem sejak tahap arsitektur hingga deployment.",
      },
      {
        icon: "Users2",
        title: "User-Centric Experience",
        desc: "UX yang intuitif agar aplikasi mudah digunakan dan efektif.",
      },
    ],
    gridSection: {
      label: "Cakupan Layanan",
      title: "Jenis Web Application",
      desc: "Solusi web application yang kami bangun dirancang fleksibel, scalable, dan siap mendukung pertumbuhan bisnis.",
      items: [
        {
          icon: "Building2",
          title: "Enterprise Web Application",
          desc: "Aplikasi skala perusahaan untuk operasional dan manajemen bisnis.",
        },
        {
          icon: "BarChart3",
          title: "Dashboard & Analytics System",
          desc: "Visualisasi data dan monitoring performa secara real-time.",
        },
        {
          icon: "Users2",
          title: "Customer & Partner Portal",
          desc: "Portal interaktif untuk pelanggan, mitra, dan stakeholder.",
        },
        {
          icon: "Cloud",
          title: "SaaS Platform",
          desc: "Platform berbasis subscription dengan arsitektur scalable.",
        },
        {
          icon: "Settings2",
          title: "Internal Management System",
          desc: "Sistem internal untuk otomasi dan efisiensi proses bisnis.",
        },
        {
          icon: "Link2",
          title: "API-Driven Web Application",
          desc: "Web app terintegrasi dengan sistem lain melalui API.",
        },
      ],
    },
    techStack: {
      label: "Technology Stack",
      title: "Teknologi yang Kami Gunakan",
      desc: "Stack modern yang terbukti stabil, aman, dan siap scale.",
      groups: [
        { label: "Frontend", items: ["React", "Blazor", "HTML5", "Tailwind", "Bootstrap"] },
        { label: "Backend", items: [".NET", "Node.js", "REST API", "Microservices"] },
        { label: "Database", items: ["SQL Server", "PostgreSQL", "MySQL", "Redis"] },
        { label: "Deployment", items: ["Docker", "CI/CD", "Cloud Hosting", "On Premise"] },
      ],
    },
  },

  "full-stack-development": {
    slug: "full-stack-development",
    code: "FSD",
    heroFloatIcons: ["Monitor", "Palette", "Layers", "Code2", "Workflow"],
    name: "Full Stack Development",
    icon: "Layers",
    accent: "#7c3aed",
    heroTitle: "Backend, Frontend & Full Stack Solutions",
    heroDesc:
      "Kami membangun sistem end-to-end dengan arsitektur modern, performa tinggi, dan siap scale sesuai kebutuhan bisnis.",
    gridSection: {
      label: "Layanan Full Stack",
      title: "Disesuaikan dengan Kompleksitas Sistem dan Tim Anda",
      items: [
        {
          icon: "Monitor",
          title: "Backend Development",
          desc: "API, database, security, dan business logic yang scalable.",
        },
        {
          icon: "Palette",
          title: "Frontend Development",
          desc: "UI modern, responsif, dan fokus pada user experience.",
        },
        {
          icon: "Layers",
          title: "Full Stack Development",
          desc: "Solusi end-to-end dari database hingga UI.",
        },
      ],
    },
    techStack: {
      label: "Technology Stack",
      title: "Teknologi yang Kami Gunakan",
      desc: "Stack modern yang terbukti stabil, aman, dan siap scale.",
      groups: [
        {
          label: "Backend Stack",
          items: [".NET Core", "ASP.NET", "Node.js", "REST API", "Microservices", "SQL Server"],
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
    closingCtaTitle: "Siap Bangun Sistem Full Stack?",
  },

  "mobile-app-development": {
    slug: "mobile-app-development",
    code: "MOB",
    heroFloatIcons: ["Smartphone", "Tablet", "Layers", "Gauge", "Lock"],
    name: "Mobile App Development",
    icon: "Smartphone",
    accent: "#059669",
    heroTitle: "Aplikasi Mobile Android & iOS yang Scalable",
    heroDesc:
      "Kami merancang dan membangun aplikasi mobile dengan performa tinggi, UI modern, dan arsitektur yang siap tumbuh bersama bisnis Anda.",
    highlights: [
      {
        icon: "Smartphone",
        title: "Android App",
        desc: "Aplikasi Android native dan cross-platform dengan performa optimal.",
      },
      {
        icon: "Tablet",
        title: "iOS App",
        desc: "Aplikasi iOS dengan standar Apple Human Interface Guidelines.",
      },
      {
        icon: "Layers",
        title: "Cross Platform",
        desc: "Satu codebase untuk Android dan iOS, lebih cepat dan efisien.",
      },
    ],
    gridSection: {
      label: "Keunggulan",
      title: "Kenapa Aplikasi Kami Berbeda",
      items: [
        {
          icon: "Gauge",
          title: "Performa Tinggi",
          desc: "Optimasi kecepatan dan responsivitas aplikasi.",
        },
        {
          icon: "Lock",
          title: "Keamanan Data",
          desc: "Enkripsi, autentikasi, dan proteksi data pengguna.",
        },
        {
          icon: "Palette",
          title: "UI/UX Modern",
          desc: "Desain intuitif dan ramah pengguna.",
        },
        {
          icon: "Link2",
          title: "Integrasi Backend",
          desc: "Terhubung langsung dengan API dan sistem backend.",
        },
      ],
    },
    techStack: {
      label: "Technology",
      title: "Teknologi Mobile",
      desc: "Stack terbaik untuk performa, stabilitas, dan kemudahan maintenance.",
      groups: [
        { label: "Mobile Framework", items: ["Flutter", "Capacitor JS"] },
        { label: "Backend & API", items: ["REST API", ".NET Core", "Node.js", "Firebase"] },
        { label: "Deployment & Tools", items: ["Google Play", "App Store", "CI/CD", "Analytics"] },
      ],
    },
  },

  "software-maintenance-support": {
    slug: "software-maintenance-support",
    code: "SUP",
    heroFloatIcons: ["Bug", "RefreshCw", "ShieldCheck", "Headset", "Clock"],
    name: "Software Maintenance & Support",
    icon: "Wrench",
    accent: "#b45309",
    heroTitle: "Software Maintenance & Support Berkelanjutan",
    heroDesc:
      "Menjaga sistem Anda tetap stabil, aman, dan optimal melalui layanan maintenance dan support profesional.",
    gridSection: {
      label: "Layanan Maintenance",
      title: "Dukungan Teknis yang Memastikan Sistem Berjalan Tanpa Hambatan",
      items: [
        {
          icon: "Bug",
          title: "Bug Fixing",
          desc: "Identifikasi dan perbaikan bug secara cepat dan tepat.",
        },
        {
          icon: "RefreshCw",
          title: "System Update",
          desc: "Update fitur, dependency, dan peningkatan performa.",
        },
        {
          icon: "ShieldCheck",
          title: "Security Patch",
          desc: "Proteksi sistem dari celah keamanan terbaru.",
        },
        {
          icon: "Headset",
          title: "Technical Support",
          desc: "Respon cepat untuk kendala teknis dan operasional.",
        },
        {
          icon: "Clock",
          title: "SLA Terukur",
          desc: "Waktu respon dan penyelesaian sesuai kesepakatan.",
        },
        {
          icon: "ActivitySquare",
          title: "Performance Monitoring",
          desc: "Pemantauan sistem secara berkala dan proaktif.",
        },
        {
          icon: "ClipboardList",
          title: "Report Berkala",
          desc: "Laporan maintenance dan status sistem secara rutin.",
        },
      ],
    },
    techStack: {
      label: "Coverage",
      title: "Lingkup Sistem yang Kami Support",
      desc: "Berbagai platform dan teknologi yang kami tangani.",
      groups: [
        { label: "Web Application", items: ["ASP.NET", "PHP", "Node.js", "React"] },
        { label: "Mobile Application", items: ["Android", "iOS", "Flutter", "React Native"] },
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
    heroFloatIcons: ["Eye", "Palette", "Users2", "PenTool", "Layers"],
    name: "UI/UX Design Services",
    icon: "Palette",
    accent: "#db2777",
    heroTitle: "Desain UI/UX yang Fungsional dan Berorientasi Pengguna",
    heroDesc:
      "Kami merancang pengalaman antarmuka yang intuitif, konsisten, dan selaras dengan tujuan bisnis Anda — dari riset hingga desain siap implementasi.",
    highlights: [
      {
        icon: "Eye",
        title: "Riset Berbasis Data",
        desc: "Keputusan desain didukung riset dan pemahaman pengguna nyata.",
      },
      {
        icon: "Palette",
        title: "Visual Konsisten",
        desc: "Design system yang seragam di seluruh produk Anda.",
      },
      {
        icon: "Users2",
        title: "User-Centered",
        desc: "Setiap alur dirancang agar mudah dan nyaman digunakan.",
      },
    ],
    gridSection: {
      label: "Cakupan Layanan",
      title: "Cakupan Layanan UI/UX",
      desc: "Proses desain menyeluruh dari riset hingga siap diserahkan ke tim development.",
      items: [
        {
          icon: "Search",
          title: "User Research",
          desc: "Memahami kebutuhan dan perilaku pengguna target.",
        },
        {
          icon: "PenTool",
          title: "Wireframing",
          desc: "Struktur alur dan layout dasar sebelum masuk visual.",
        },
        {
          icon: "Layers",
          title: "UI Design System",
          desc: "Komponen dan gaya visual yang konsisten dan reusable.",
        },
        {
          icon: "Smartphone",
          title: "Responsive Design",
          desc: "Tampilan optimal di berbagai perangkat dan ukuran layar.",
        },
        {
          icon: "Eye",
          title: "Usability Testing",
          desc: "Validasi desain langsung bersama pengguna nyata.",
        },
        {
          icon: "Code2",
          title: "Design Handoff",
          desc: "Spesifikasi siap pakai untuk tim development.",
        },
      ],
    },
    process: [
      {
        icon: "Search",
        step: "01",
        title: "Discovery",
        desc: "Riset kebutuhan bisnis dan pengguna.",
      },
      {
        icon: "PenTool",
        step: "02",
        title: "Wireframe",
        desc: "Menyusun struktur dan alur pengguna.",
      },
      {
        icon: "Palette",
        step: "03",
        title: "Visual Design",
        desc: "Menerapkan visual, warna, dan tipografi.",
      },
      {
        icon: "CheckCircle2",
        step: "04",
        title: "Testing & Handoff",
        desc: "Validasi desain dan serah terima ke tim development.",
      },
    ],
  },

  "mvp-software-development": {
    slug: "mvp-software-development",
    code: "MVP",
    heroFloatIcons: ["Rocket", "Wallet", "TrendingUp", "Code2", "Map"],
    name: "MVP Software Development",
    icon: "Rocket",
    accent: "#ea580c",
    heroTitle: "Bangun Produk Lebih Cepat dengan MVP",
    heroDesc:
      "Kami membantu startup dan perusahaan memvalidasi ide bisnis melalui MVP yang cepat, efisien, dan siap dikembangkan.",
    highlights: [
      {
        icon: "Rocket",
        title: "Lebih Cepat ke Market",
        desc: "Validasi ide dan rilis produk tanpa menunggu sistem kompleks.",
      },
      {
        icon: "Wallet",
        title: "Hemat Biaya",
        desc: "Fokus ke fitur inti yang benar-benar dibutuhkan pengguna.",
      },
      {
        icon: "TrendingUp",
        title: "Siap Dikembangkan",
        desc: "Arsitektur MVP dirancang agar mudah scale ke full product.",
      },
    ],
    gridSection: {
      label: "Cakupan Layanan",
      title: "Cakupan MVP",
      desc: "Fokus pada fitur inti untuk memvalidasi value bisnis sebelum masuk ke tahap pengembangan lanjutan.",
      items: [
        {
          icon: "Search",
          title: "Business & Product Validation",
          desc: "Analisis kebutuhan dan validasi solusi terhadap market.",
        },
        {
          icon: "PenTool",
          title: "UI/UX & Prototyping",
          desc: "Wireframe dan desain dasar untuk validasi user experience.",
        },
        {
          icon: "Code2",
          title: "Core Feature Development",
          desc: "Pengembangan fitur inti yang merepresentasikan value produk.",
        },
        {
          icon: "Lock",
          title: "Basic Security",
          desc: "Authentication dan proteksi dasar untuk aplikasi MVP.",
        },
        {
          icon: "Cloud",
          title: "Cloud Deployment",
          desc: "Deploy MVP ke cloud agar siap diuji oleh pengguna.",
        },
        {
          icon: "Map",
          title: "Future Roadmap",
          desc: "Rekomendasi pengembangan lanjutan menuju full product.",
        },
      ],
    },
    process: [
      {
        icon: "Lightbulb",
        step: "01",
        title: "Ideation",
        desc: "Diskusi tujuan bisnis dan value utama produk.",
      },
      {
        icon: "PenTool",
        step: "02",
        title: "Design",
        desc: "Wireframe & UI sederhana untuk validasi cepat.",
      },
      {
        icon: "Code2",
        step: "03",
        title: "Development",
        desc: "Build fitur inti dengan teknologi modern.",
      },
      {
        icon: "Rocket",
        step: "04",
        title: "Launch",
        desc: "Deploy MVP dan siap diuji oleh pengguna.",
      },
    ],
  },
};

export const serviceList = Object.values(serviceDetails);