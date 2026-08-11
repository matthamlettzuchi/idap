import {
  Building2,
  TrendingUp,
  Calculator,
  FileSpreadsheet,
  Sprout,
  type LucideIcon,
} from "lucide-react";

export type ProductAdvantage = { title: string; subtitle?: string };
export type ProductFeature = { title: string; body: string };

export type ProductIconName =
  | "Building2"
  | "TrendingUp"
  | "Calculator"
  | "FileSpreadsheet"
  | "Sprout";

export type ProductDetail = {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  accent: string;
  icon: ProductIconName;
  backgroundImage: string;
  personImage: string;
  personImageScale?: number;
  personImageOffsetX?: number;
  personImageOffsetY?: number;
  quickFacts: string[];
  overview: string[];
  advantages: ProductAdvantage[];
  processIntro?: { heading: string; body: string };
  processLottie?: string;
  featuresIntro?: string;
  features: ProductFeature[];
};

function splitAdvantage(line: string): ProductAdvantage {
  const [title, subtitle] = line.split(/\s+–\s+/);
  return { title: title.trim(), subtitle: subtitle?.trim() };
}

export const productDetails: Record<string, ProductDetail> = {
  multifinance: {
    slug: "multifinance",
    code: "FIS-MF",
    name: "FISCUS Multifinance",
    tagline:
      "A Loan Origination System powering the entire loan application lifecycle — from prospect to disbursement.",
    accent: "#2f4bd0",
    icon: "Building2",
    backgroundImage: "/hoho.png",
    personImage: "/peeps-talking.png",
    personImageScale: 1.2,
    quickFacts: ["Web-Based", "SLIK Integration", "Multi-Device", "FISCUS Module"],
    overview: [
      "FISCUS Multifinance System is a specialized core platform designed to support loan application workflows for multifinance companies, banks, and other financial institutions. Backed by over 30 years of experience in financing software development — ranging from DOS-based, Windows-based, Web-based, to multi-device architectures — the FISCUS Multifinance System spans critical stages from lead management and initial credit scoring (incorporating internal checks and external integrations like SLIK) to survey and appraisal processes ensuring comprehensive customer data.",
      "We provide ready-to-deploy Loan Origination Systems (LOS) alongside custom LOS development tailored to your specific operational workflows. Our platform seamlessly integrates with enterprise ecosystem components like Accounting Management, Funding Management, and regulatory reporting pipelines to OJK (including SLIK, SILARAS, and more). As an integrated module of the broader FISCUS platform, FISCUS Multifinance guarantees a rapid and effortless implementation.",
    ],
    advantages: [
      "API Integration – Multi Platform",
      "Automated Credit Application Process – Reduces Operational Workload",
      "Advanced Analytics – Data-Driven Decision Support",
      "Mobile Accessibility – Cross Platform",
      "Performance Monitoring – Management Assist",
      "Speed and Efficiency – Elevates Customer Satisfaction",
    ].map(splitAdvantage),
    processIntro: {
      heading: "FISCUS Loan Origination System (LOS) Process",
      body: "Empowers debtors to submit credit applications through an intuitive online form, gathering vital details such as personal information, business profiles, and desired loan amounts.",
    },
    processLottie: "/turutu.lottie",
    featuresIntro:
      "An integrated system featuring automated credit scoring that evaluates debtor eligibility based on custom criteria to deliver rapid and precise results.",
    features: [
      {
        title: "Credit Scoring",
        body: "Evaluates debtor creditworthiness and calculates risk profiles quickly and accurately.",
      },
      {
        title: "Monitoring Dashboard",
        body: "Monitors all credit pipeline data in real-time through an interactive dashboard.",
      },
      {
        title: "Web-Based System",
        body: "Fully accessible from any device, anywhere, at any time.",
      },
      {
        title: "Reporting & Analytics",
        body: "Comprehensive reporting tools to track Key Performance Indicators (KPIs) and evaluate financing portfolio performance.",
      },
      {
        title: "Collection Management",
        body: "Manages, monitors, and optimizes installment collection workflows—from early-stage delinquency to non-performing asset resolution.",
      },
    ],
  },

  factoring: {
    slug: "factoring",
    code: "FIS-FC",
    name: "FISCUS Factoring",
    tagline:
      "Convert business receivables into immediate cash flow — managed in a unified platform.",
    accent: "#0e9488",
    icon: "TrendingUp",
    backgroundImage: "/didi.png",
    personImage: "/factoring.png",
    personImageScale: 1.6,
    personImageOffsetX: -10,
    personImageOffsetY: 14,
    quickFacts: ["Invoice Financing", "Real-time Dashboard", "FISCUS Module"],
    overview: [
      "FISCUS Factoring System is a financial transaction platform enabling enterprises to sell outstanding accounts receivable (such as unpaid customer invoices) to a third party factor. The factor — typically a financial institution or dedicated financing firm — purchases these receivables at a discount, providing immediate liquid cash to the business while assuming collection responsibilities from the underlying debtors.",
      "As a core module of the FISCUS ecosystem, FISCUS Factoring enables enterprises to manage receivables effectively and optimize liquidity. We offer off-the-shelf Factoring solutions for instant liquidity access alongside bespoke developments tailored to unique business models.",
    ],
    advantages: [
      "Improved Cash Flow – Immediate Capital Access",
      "Risk Mitigation – Transfer Credit Risk",
      "Speed and Efficiency – Fast Capital Deployment",
      "Increased Working Capital – Optimized Liquidity",
      "Flexibility – Scalable Financing Solutions",
      "Customizable Platform – High Software Flexibility",
    ].map(splitAdvantage),
    processIntro: {
      heading: "Factoring Workflow",
      body: "Streamlines collection management through automated invoice generation and dispatch directly to clients or customers.",
    },
    processLottie: "/mimi.lottie",
    featuresIntro:
      "Track and categorize expenses efficiently to enable tighter cost controls and granular expense analysis.",
    features: [
      {
        title: "Multiple Factoring Types",
        body: "Supports recourse and non-recourse factoring, full factoring, invoice financing, receivables factoring, and debtor financing.",
      },
      {
        title: "Monitoring Dashboard",
        body: "Monitors all factoring operations and portfolio metrics through an interactive, real-time dashboard.",
      },
      {
        title: "Web-Based System",
        body: "Accessible across all major operating systems and modern web browsers.",
      },
      {
        title: "Reporting & Analytics",
        body: "Robust reporting capabilities designed to monitor KPIs and analyze financing portfolio health.",
      },
    ],
  },

  accounting: {
    slug: "accounting",
    code: "FIS-AC",
    name: "FISCUS Accounting",
    tagline:
      "High-precision financial partner for recording, reporting, and strategic decision-making.",
    accent: "#7c3aed",
    icon: "Calculator",
    backgroundImage: "/coco.png",
    personImage: "/accountant.png",
    personImageScale: 1.6,
    personImageOffsetX: -10,
    personImageOffsetY: 14,
    quickFacts: ["General Ledger", "Multi-User", "Real-time Sync"],
    overview: [
      "FISCUS Accounting System is a web-based digital platform designed to streamline financial recording, management, and reporting with high security and precision. Built for modern online business environments, it features digital general ledgers, transaction journals, automated financial statements, and seamless integration with external financial systems.",
      "FISCUS Accounting serves as an essential financial companion for enterprises demanding precision, speed, and seamless integration. We deliver ready-to-use accounting modules alongside custom software engineering services configured for specialized corporate accounting structures.",
    ],
    advantages: [
      "Real-Time Updates – Instant Data Availability",
      "Scalability – Adapts to Enterprise Growth",
      "Automatic Backups – Data Redundancy and Backup",
      "Cost Transparency – Clear Fee Structures",
      "Collaboration – Multi-User Collaboration",
    ].map(splitAdvantage),
    processIntro: {
      heading: "Accounting Workflow",
      body: "Provides a centralized dashboard to track and manage financial portfolios, invoice statuses, disbursement rates, and revenue projections.",
    },
    processLottie: "/tiriti.lottie",
    featuresIntro:
      "Track and categorize corporate expenditures with precision, empowering teams with clear cost management and control.",
    features: [
      {
        title: "User-Friendly Interface",
        body: "Intuitive navigation designed for seamless onboarding and efficient operation across user skill levels.",
      },
      {
        title: "Precision and Efficiency",
        body: "Prioritizes accuracy in accounting cycles to produce dependable financial reports for executive decision-making.",
      },
      {
        title: "Tailored Development Services",
        body: "Offers tailored software adaptations to address specialized corporate financial workflows, guaranteeing flexibility and enterprise scalability.",
      },
      {
        title: "Reporting & Analytics",
        body: "In-depth reporting features for monitoring general ledger activities, revenue streams, and portfolio performance.",
      },
    ],
  },

  "slik-silaras": {
    slug: "slik-silaras",
    code: "SLK-SR",
    name: "SLIK / SILARAS Report",
    tagline:
      "Automated regulatory reporting bridge — accurate, compliant, and analysis-ready.",
    accent: "#b45309",
    icon: "FileSpreadsheet",
    backgroundImage: "/ripot.png",
    personImage: "/report.png",
    personImageScale: 1.6,
    personImageOffsetX: -24,
    personImageOffsetY: 0,
    quickFacts: ["OJK Compliant", "Multi-Database", "Export PDF/Excel/CSV"],
    overview: [
      "FISCUS SLIK/SILARAS Report is an innovative data engine meticulously built to extract, validate, and convert complex financial data into compliant regulatory reports and actionable analytical insights. Powered by the FISCUS platform, it provides robust automation that eliminates manual compliance bottlenecks and mitigates reporting errors.",
      "With FISCUS SLIK/SILARAS Report, institutions leverage comprehensive data verification tools to elevate credit risk assessments, streamline mandatory OJK reporting schedules, and inform executive planning.",
    ],
    advantages: [
      "Comprehensive Data Analytics",
      "Flexible Reporting – Custom Tailored to Business Needs",
      "Compliance Reporting – Aligned with OJK Regulations",
      "Strategic Planning – Uncovers Growth Opportunities",
      "Speed and Precision",
      "User-Friendly Interface – Engaging Data Visualization",
    ].map(splitAdvantage),
    featuresIntro:
      "Designed specifically to deliver complete data parsing, automated validation, and compliant formatting required by regulatory bodies.",
    features: [
      {
        title: "Export & Sharing Options",
        body: "Export financial and regulatory reports directly to PDF, Excel, or CSV formats for further downstream auditing.",
      },
      {
        title: "Flexible Database Integration",
        body: "Connects seamlessly to diverse database structures including MySQL, Oracle, PostgreSQL, MongoDB, and SQL Server.",
      },
      {
        title: "PSAK & CKPN Support",
        body: "Includes built-in support for data importing and provisioning aligned with PSAK & CKPN financial standards.",
      },
      {
        title: "Automatic Period Comparison",
        body: "Includes automated variance analysis across distinct reporting periods to easily identify shifts in credit quality and exposure.",
      },
    ],
  },

  planta: {
    slug: "planta",
    code: "PLN",
    name: "Planta",
    tagline:
      "Integrated information system for oil palm plantations — from field operations to mill processing.",
    accent: "#15803d",
    icon: "Sprout",
    backgroundImage: "/sawitwok.png",
    personImage: "/planta.png",
    personImageScale: 1,
    personImageOffsetX: -12,
    quickFacts: ["Estate + Mill", "VRA Tracking", "24/7 Access"],
    overview: [
      "Planta is an integrated enterprise information system engineered to optimize oil palm plantation management. It covers estate management, asset control, field maintenance, cost accounting, and operational finance. Co-developed alongside agricultural industry experts, Planta delivers accurate operational intelligence, reduces overhead costs, and maximizes yield productivity.",
    ],
    advantages: [
      "API Integration – Multi Platform",
      "Operational Process Automation – Reduces Manual Workload",
      "Advanced Analytics – Supports Agricultural Decisions",
      "Mobile Accessibility – Cross Platform",
      "Performance Monitoring – Management Assist",
      "Speed and Efficiency – Elevates Operational Output",
    ].map(splitAdvantage),
    featuresIntro:
      "PLANTA is a domain-specific system designed for palm oil estates and processing mills. It records all activities from harvesting in the field to processing at the mill, delivering granular cost control and agricultural financial statements.",
    features: [
      {
        title: "Cost Allocation Engine",
        body: "Tracks field activities including Vehicle Running Accounts (VRA), inventory usage, payroll, and routine labor to deliver granular cost allocation reporting.",
      },
      {
        title: "Monitoring Dashboard",
        body: "Displays real-time operational and mill processing metrics through centralized interactive dashboards.",
      },
      {
        title: "Web-Based Architecture",
        body: "Lightweight, easy to maintain, cross-platform ready, and accessible 24/7 from remote estate offices or corporate headquarters.",
      },
      {
        title: "Reporting & Analytics",
        body: "Comprehensive reporting tools to evaluate operational yield, mill extraction rates, and division-by-division financial performance.",
      },
    ],
  },
};

export const productList = Object.values(productDetails);