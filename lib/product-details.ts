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
      "A Loan Origination System for the entire loan application process, from prospect to disbursement.",
    accent: "#2f4bd0",
    icon: "Building2",
    backgroundImage: "/hoho.png",
    personImage: "/peeps-talking.png",
    personImageScale: 1.2,
    quickFacts: [
      "Web-Based",
      "SLIK Integration",
      "Multi-Device",
      "FISCUS Module",
    ],
    overview: [
      "FISCUS Multifinance System is a specialized system designed to support the credit application process for multifinance companies, banks, and other financial institutions. With more than 30 years of experience in financing software development, from DOS-based, Windows-based, and Web-based, to Multi-Device, FISCUS Multifinance System covers key stages from managing prospective customers, to initial scoring involving internal checks and external integrations such as SLIK verification, through to the survey and appraisal process that ensures complete customer data. With a focus on security and speed, we deliver a comprehensive solution that supports the growth and sustainability of your financing business.",
      "We offer a ready-to-use Loan Origination System (LOS), as well as custom LOS development tailored to client needs. Our Loan Origination System stands out in its ability to integrate with other systems within a company, such as Accounting Management, Funding Management, and reporting to OJK including SLIK, SILARAS, and more. FISCUS Multifinance System is one of the integrated modules of the FISCUS platform, built for a fast and easy implementation. With a focus on security and speed, we deliver a comprehensive solution to support the growth and sustainability of your financing business.",
    ],
    advantages: [
      "API Integration – Multi Platform",
      "Automated Credit Application Process – Reduced Workload",
      "Advanced Analytics – Supports Business Decisions",
      "Mobile Accessibility – Cross Platform",
      "Performance Monitoring – Management Assist",
      "Speed and Efficiency – Improved Customer Satisfaction",
    ].map(splitAdvantage),
    processIntro: {
      heading: "FISCUS Loan Origination System (LOS) Process",
      body: "Makes it easy for debtors to apply for credit through an intuitive online form, filling in key information such as personal data, business profile, and desired loan amount.",
    },
    processLottie: "/turutu.lottie",
    featuresIntro:
      "The system is integrated with automatic credit scoring that assesses debtor eligibility based on specific criteria, delivering fast and accurate results.",
    features: [
      {
        title: "Credit Scoring",
        body: "Assesses debtor credit eligibility and determines risk levels quickly and accurately.",
      },
      {
        title: "Monitoring Dashboard",
        body: "Monitors all credit data through an interactive, real-time dashboard.",
      },
      {
        title: "Web-Based System",
        body: "A system that can be accessed anywhere, on any device.",
      },
      {
        title: "Reporting & Analytics",
        body: "Comprehensive reporting features to monitor Key Performance Indicators (KPIs) and analyze financing portfolio performance.",
      },
      {
        title: "Collection",
        body: "Manages, monitors, and optimizes the installment collection process, from early-stage delinquency through to resolving problem loans.",
      },
    ],
  },

  factoring: {
    slug: "factoring",
    code: "FIS-FC",
    name: "FISCUS Factoring",
    tagline:
      "A financing solution where a business sells outstanding invoices for immediate cash, fully tracked in one platform.",
    accent: "#0e9488",
    icon: "TrendingUp",
    backgroundImage: "/didi.png",
    personImage: "/factoring.png",
    personImageScale: 1.6,
    personImageOffsetX: -10,
    personImageOffsetY: 14,
    quickFacts: ["Invoice Financing", "Real-time Dashboard", "FISCUS Module"],
    overview: [
      "FISCUS Factoring System is a financial transaction in which a company sells its business receivables, such as unpaid customer invoices, to a third party known as a factor. The factor, typically a financial institution or a specialized financing company, purchases the receivables at a discount and provides cash directly to the selling company. Once the transaction is complete, the factor is responsible for collecting payment from the customers who owe on those receivables.",
      "Factoring is one of the integrated modules offered by FISCUS, designed to help companies manage receivables effectively and optimize their financial operations. We provide a comprehensive Factoring solution combining efficiency and integration within a single, unified system. We offer ready-to-use Factoring services to help businesses access funds quickly, as well as Factoring development services tailored to each client's specific needs.",
    ],
    advantages: [
      "Improved Cash Flow – Funds Available Immediately",
      "Risk Mitigation – Transfer of Credit Risk",
      "Speed and Efficiency – Fast Access to Funds",
      "Increased Working Capital – Optimized Liquidity",
      "Flexibility – Financing That Can Grow With You",
      "Speed and Efficiency – Improved Customer Satisfaction",
      "A Platform Tailored to Your Business – Software Flexibility",
    ].map(splitAdvantage),
    processIntro: {
      heading: "Factoring Process",
      body: "Simplifies the collection process through automatic invoice creation and delivery to clients or customers.",
    },
    processLottie: "/mimi.lottie",
    featuresIntro:
      "Track and categorize expenses efficiently, enabling better cost control and analysis.",
    features: [
      {
        title: "Multiple Factoring Types",
        body: "Recourse or non-recourse factoring. Full factoring or invoice financing. Receivables factoring or debtor financing.",
      },
      {
        title: "Monitoring Dashboard",
        body: "Monitors all factoring data through an interactive, real-time dashboard.",
      },
      {
        title: "Web-Based System",
        body: "A system that can be accessed anywhere, on any device.",
      },
      {
        title: "Reporting & Analytics",
        body: "Comprehensive reporting features to monitor Key Performance Indicators (KPIs) and analyze financing portfolio performance.",
      },
    ],
  },

  accounting: {
    slug: "accounting",
    code: "FIS-AC",
    name: "FISCUS Accounting",
    tagline:
      "A digital platform for recording, managing, and reporting financial transactions, securely and efficiently.",
    accent: "#7c3aed",
    icon: "Calculator",
    backgroundImage: "/coco.png",
    personImage: "/accountant.png",
    personImageScale: 1.6,
    personImageOffsetX: -10,
    personImageOffsetY: 14,
    quickFacts: ["General Ledger", "Multi-User", "Real-time Sync"],
    overview: [
      "FISCUS Accounting System is a digital platform that simplifies the recording, management, and reporting of financial transactions, efficiently and securely, through a web-based interface. Designed to meet the accounting needs of companies operating online, the system provides a range of features, including a digital general ledger, transaction journals, online financial reporting, and integration with other financial services.",
      "FISCUS Accounting is an indispensable financial partner for businesses that prioritize precision, efficiency, and seamless integration in managing their financial operations. With FISCUS, businesses gain a comprehensive accounting solution that handles receivables effectively while ensuring optimal financial management. Our platform provides ready-to-use accounting services for direct access to your data, as well as accounting development services tailored to each client's unique needs.",
    ],
    advantages: [
      "Real-Time Updates – Data Available Instantly",
      "Scalability – Adapts to Business Growth",
      "Automatic Backups – Data Redundancy and Backup",
      "Cost Transparency – A Clear Fee Structure",
      "Collaboration – Multi-User Collaboration",
    ].map(splitAdvantage),
    processIntro: {
      heading: "FISCUS Accounting Workflow",
      body: "Guides transactions through a structured accounting cycle: journal entry and posting, balancing, financial reporting, and period-end closing.",
    },
    processLottie: "/tiriti.lottie",
    featuresIntro:
      "Track and categorize expenses efficiently, making cost control and analysis easier.",
    features: [
      {
        title: "User-Friendly Interface",
        body: "A clear, easy-to-navigate design accessible to users of any skill level.",
      },
      {
        title: "Precision and Efficiency",
        body: "Prioritizes precision and efficiency in financial processes, supporting accurate recording, reporting, and decision-making.",
      },
      {
        title: "Development Tailored to Your Needs",
        body: "Accounting development services tailored to each client's specific needs, while ensuring flexibility and scalability.",
      },
      {
        title: "Reporting & Analytics",
        body: "Comprehensive reporting features to monitor accounting data and analyze portfolio performance.",
      },
    ],
  },

  "slik-silaras": {
    slug: "slik-silaras",
    code: "SLK-SR",
    name: "SLIK / SILARAS Report",
    tagline:
      "An innovative data analysis system built to process, analyze, and report your data accurately.",
    accent: "#b45309",
    icon: "FileSpreadsheet",
    backgroundImage: "/ripot.png",
    personImage: "/report.png",
    personImageScale: 1.6,
    personImageOffsetX: -24,
    personImageOffsetY: 0,
    quickFacts: ["OJK Compliant", "Multi-Database", "Export PDF/Excel/CSV"],
    overview: [
      "FISCUS SLIK/SILARAS Report is an innovative data analysis system carefully designed to process and analyze data effectively, producing informative and accurate reports. Powered by the FISCUS platform, the system offers strong data analysis and reporting capabilities, helping companies gain valuable insights to support accurate, strategic decision-making.",
      "With FISCUS SLIK/SILARAS Report, companies can use a comprehensive data analysis tool to improve risk assessment, compliance reporting, and strategic planning. FISCUS SLIK/SILARAS Report is designed to meet the diverse reporting needs of modern companies.",
    ],
    advantages: [
      "Comprehensive Data Analysis",
      "Flexible Reporting – Tailored to Business Needs",
      "Compliance Reporting – Aligned with OJK Regulations",
      "Strategic Planning – Growth Opportunities",
      "Efficiency and Accuracy",
      "User-Friendly Interface – Engaging Visualization",
    ].map(splitAdvantage),
    featuresIntro:
      "Features in the SLIK and SILARAS reports are designed to provide comprehensive data analysis capabilities as well as informative reporting for companies.",
    features: [
      {
        title: "Export & Sharing Options",
        body: "Export reports to a variety of formats, such as PDF, Excel, or CSV, for further analysis.",
      },
      {
        title: "Flexible Database Integration",
        body: "Flexible integration with various types of databases, including MySQL, Oracle, PostgreSQL, and MongoDB.",
      },
      {
        title: "PSAK & CKPN Support",
        body: "Supports data import in accordance with PSAK and CKPN reporting standards.",
      },
      {
        title: "Automatic Period Comparison",
        body: "An automatic comparison feature between reporting periods to make it easier to analyze changes in data.",
      },
    ],
  },

  planta: {
    slug: "planta",
    code: "PLN",
    name: "Planta",
    tagline:
      "An integrated information system for optimizing oil palm plantation management.",
    accent: "#15803d",
    icon: "Sprout",
    backgroundImage: "/sawitwok.png",
    personImage: "/planta.png",
    personImageScale: 1,
    personImageOffsetX: -12,
    quickFacts: ["Estate + Mill", "VRA Tracking", "24/7 Access"],
    overview: [
      "Planta is an integrated information system solution designed to optimize the management of oil palm plantations, covering plantation management, asset management, field maintenance, cost control and maintenance, and financial and operational cost management. Planta was developed together with plantation experts to produce accurate information, reduce operational costs, improve efficiency, and drive overall plantation productivity.",
    ],
    advantages: [
      "API Integration – Multi Platform",
      "Automated Operational Processes – Reduced Workload",
      "Advanced Analytics – Supports Business Decisions",
      "Mobile Accessibility – Cross Platform",
      "Performance Monitoring – Management Assist",
      "Speed and Efficiency – Improved Operational Output",
    ].map(splitAdvantage),
    featuresIntro:
      "PLANTA is an integrated system built specifically for oil palm plantations and processing mills. It records all activities, from field operations to mill processing, producing the cost information and financial reports needed by the palm oil plantation industry.",
    features: [
      {
        title: "Cost Allocation",
        body: "Records all activities such as Vehicle Running Account (VRA), inventory, payroll, and routine labor, producing detailed cost reports.",
      },
      {
        title: "Monitoring Dashboard",
        body: "Monitors all operational data through an interactive, real-time dashboard.",
      },
      {
        title: "Web-Based System",
        body: "A simple, easy-to-maintain system, accessible across platforms and ready to use anytime, 24 hours a day, 7 days a week.",
      },
      {
        title: "Reporting and Analytics",
        body: "Comprehensive reporting features to monitor financial reporting results and analyze the performance of each division.",
      },
    ],
  },
};

export const productList = Object.values(productDetails);
