export const nav = [
  { label: "About Us", href: "/about" },
  { label: "Credit Simulation", href: "/credit-simulation" },
  { label: "Contact", href: "/contact" },
];

export type Testimonial = {
  id: string;
  category: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  videoId: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    category: "Multifinance",
    quote:
      "For approximately one year using Fiscus, validations compliant with OJK regulations have helped us maintain data quality, minimize human error, and were supported by the Intidata team, who is always responsive—even outside working hours.",
    name: "Berlianto",
    role: "IT",
    company: "PT Dana Kini Finance",
    initials: "B",
    videoId: "j0VmrBxTSAA",
  },
  {
    id: "t2",
    category: "Multifinance",
    quote:
      "Fiscus makes the bookkeeping and reconciliation process neater, accelerates the preparation of OJK reports through XBRL, and is supported by an ever-responsive Intidata team.",
    name: "Jeffy Eugene Aggrianto",
    role: "Finance Professional",
    company: "PT Dana Kini Finance",
    initials: "JEA",
    videoId: "kR93hit3vIQ",
  },
  {
    id: "t3",
    category: "Multifinance",
    quote:
      "With Fiscus, the data entry process becomes easier, reports are more complete and accurate, and any issues are handled quickly.",
    name: "Cornellia",
    role: "Credit Risk Management",
    company: "PT Karunia Multifinance",
    initials: "C",
    videoId: "UN8U34JTWo4",
  },
  {
    id: "t4",
    category: "Multifinance",
    quote:
      "Fiscus helps us reduce manual processes through automated validation and fast reporting, making data more accurate and efficient.",
    name: "Angel",
    role: "Accounting",
    company: "PT Karunia Multifinance",
    initials: "A",
    videoId: "JMNggkFX6dE",
  },
  {
    id: "t5",
    category: "Multifinance",
    quote:
      "With Fiscus, the report generation process has become much faster and more efficient. System validations help minimize errors, while accurate calculation results make it easier for us to meet reporting needs with greater confidence.",
    name: "Felicia",
    role: "Marketing",
    company: "PT Karunia Multifinance",
    initials: "F",
    videoId: "GbRUQ8Y2Jpo",
  },
  {
    id: "t6",
    category: "Multifinance",
    quote:
      "Fiscus helped us transition from numerous manual processes to a more integrated and efficient system. On top of that, the after-sales team is always responsive, making us feel supported in every operational need.",
    name: "Hendri Pradana",
    role: "IT",
    company: "PT Karunia Multifinance",
    initials: "HP",
    videoId: "kazrpKR7c2A",
  },
  {
    id: "t7",
    category: "Multifinance",
    quote:
      "Since using Fiscus, data management has become more structured and efficient. In addition to a reliable system, the support team is always quick to respond and helps us find the best solution for every need.",
    name: "Emil Zanovandi Furkon",
    role: "Alliance & Business Development Manager",
    company: "PT Karunia Multifinance",
    initials: "EZF",
    videoId: "z8r6QLKgccw",
  },
  {
    id: "t8",
    category: "Multifinance",
    quote:
      "Fiscus helps us automate journaling processes and speed up data reconciliation. When new requirements arise, the Intidata team is also extremely responsive, providing solutions tailored to our operations.",
    name: "Sherlin",
    role: "Finance Operation",
    company: "PT Dana Kini Finance",
    initials: "S",
    videoId: "auLTPsmgPdo",
  },
  {
    id: "t9",
    category: "Multifinance",
    quote:
      "Fiscus simplifies journaling through an integrated system, making work faster and more efficient. The Intidata team also consistently provides prompt responses whenever we need assistance.",
    name: "Cindy",
    role: "Finance Operation",
    company: "PT Dana Kini Finance",
    initials: "C",
    videoId: "xmcqBkYJhzg",
  },
  {
    id: "t10",
    category: "Multifinance",
    quote:
      "Fiscus makes it easy for us to access data and generate reports customizable to our needs. Besides being a user-friendly system, the service from the Intidata team is always responsive and satisfying.",
    name: "Agnes",
    role: "Supervisor",
    company: "PT Datindo Entrycom",
    initials: "A",
    videoId: "zZkk6b_8QKA",
  },
  {
    id: "t11",
    category: "Multifinance",
    quote:
      "Fiscus is capable of seamlessly handling the issuance volume of over a thousand invoices each month. The interface is intuitive, easy to learn, and reliable enough to support our daily operations without hindering productivity.",
    name: "H. Hasibuhan",
    role: "Finance & Accounting Manager",
    company: "PT NTT DATA Indonesia",
    initials: "HH",
    videoId: "XSwnruH9p04",
  },
  {
    id: "t12",
    category: "Multifinance",
    quote:
      "The ease of tracking outstanding invoices, supported by an intuitive interface and fast reporting processes, makes Fiscus a solution we rely on for daily operations.",
    name: "Imam Adiansyah",
    role: "Staff Accounting & Finance",
    company: "PT Datindo Entrycom",
    initials: "IA",
    videoId: "mbfatIU2RJg",
  },
];

export const heroStats = [
  { value: 25, suffix: "+", label: "Years of practical experience" },
  { value: 17, suffix: "+", label: "Active corporate clients" },
  { value: 5, suffix: "", label: "Core systems operated" },
];

export const clientLogos = [
  { name: "ntt", logo: "/nttnew.png" },
  { name: "NEC", logo: "/NEC.webp" },
  { name: "KMF", logo: "/kmf.webp" },
  { name: "RSMAAJ", logo: "/RSMAAJ.webp" },
  { name: "Moores Rowland", logo: "/Moores Rowland.webp" },
  { name: "Sumitomo", logo: "/Sumitomo.webp" },
  { name: "Resona", logo: "/resona.webp" },
  { name: "Ventura", logo: "/ventura.webp" },
];

export const clients = [
  "NTT",
  "Karunia Multifinance",
  "Maipark",
  "RSM AAJ",
  "NEC",
  "Moores Rowland",
  "Etana Biotech",
  "Equity Finance Indonesia",
  "Ventura Investasi Utama",
  "Sumitomo Mitsui Trust Group",
  "PT. Aditi Mitra Lestari",
  "Daytona",
  "Resona",
  "Securities Administration Bureau",
  "PT Putra Bangka Mandiri",
  "Danakini",
  "Sany Indonesia Finance",
];

export type Product = {
  id: string;
  link: string;
  code: string;
  name: string;
  summary: string;
  description: string;
  metrics: { label: string; value: string }[];
  modules: string[];
};

export const products: Product[] = [
  {
    id: "fiscus-multifinance",
    link: "multifinance",
    code: "FIS-MF",
    name: "FISCUS Multifinance",
    summary:
      "A Loan Origination System for the entire loan application process, from prospect to disbursement.",
    description:
      "FISCUS Multifinance System supports the credit application process for multifinance companies, banks, and other financial institutions, covering prospect management, initial credit scoring with SLIK integration, and the survey and appraisal process, through to disbursement and installment collection.",
    metrics: [
      { label: "Credit Scoring", value: "Fast & Accurate" },
      { label: "Monitoring", value: "Real-time Dashboard" },
    ],
    modules: [
      "Application & Scoring",
      "Approval & Contract",
      "Disbursement",
      "Collection",
    ],
  },
  {
    id: "fiscus-factoring",
    link: "factoring",
    code: "FIS-FC",
    name: "FISCUS Factoring",
    summary:
      "Sell your outstanding invoices for immediate cash, fully tracked in one system.",
    description:
      "FISCUS Factoring lets a company sell its receivables, such as unpaid customer invoices, to a factor for immediate cash. The system manages the full cycle: facility setup, contract, disbursement, payment, and refund.",
    metrics: [
      { label: "Factoring Types", value: "Recourse & Non-Recourse" },
      { label: "Monitoring", value: "Real-time Dashboard" },
    ],
    modules: [
      "Facility & Contract",
      "Fund Disbursement",
      "Payment Tracking",
      "Reporting & Analytics",
    ],
  },
  {
    id: "fiscus-accounting",
    link: "accounting",
    code: "FIS-AC",
    name: "FISCUS Accounting",
    summary:
      "Web-based recording, management, and reporting of financial transactions.",
    description:
      "FISCUS Accounting provides a digital general ledger, transaction journals, and online financial reporting, guiding transactions through the accounting cycle from journal entry and posting to balancing, reporting, and period-end closing.",
    metrics: [
      { label: "Data Updates", value: "Real-Time" },
      { label: "Backups", value: "Automatic" },
    ],
    modules: [
      "Journal & Posting",
      "Balancing",
      "Financial Reports",
      "Period-End Closing",
    ],
  },
  {
    id: "planta",
    link: "planta",
    code: "PLN",
    name: "Planta",
    summary:
      "An integrated system for oil palm plantation and mill operations.",
    description:
      "Planta covers plantation management, asset management, field maintenance, and cost and financial control for palm oil plantations and processing mills, developed together with plantation experts.",
    metrics: [
      { label: "Coverage", value: "Estate + Mill" },
      { label: "Access", value: "24/7 Web-Based" },
    ],
    modules: [
      "Field & Voucher Records",
      "Cost Allocation",
      "Estate & Mill Reports",
      "Consolidation",
    ],
  },
  {
    id: "slik-silaras",
    link: "slik-silaras",
    code: "SLK-SR",
    name: "SLIK / SILARAS Report",
    summary: "Data analysis and reporting built for OJK compliance.",
    description:
      "FISCUS SLIK/SILARAS Report processes and analyzes company data to produce informative, accurate reports, supporting risk assessment, compliance reporting, and strategic planning.",
    metrics: [
      { label: "Compliance", value: "OJK Regulations" },
      { label: "Export Formats", value: "PDF, Excel, CSV" },
    ],
    modules: [
      "Data Analysis",
      "Database Integration",
      "PSAK & CKPN Support",
      "Period Comparison",
    ],
  },
];

export const principles = [
  {
    label: "Cutting-Edge Innovation",
    body: "Selectively adopting the latest technology—only what truly enhances the relevance and effectiveness of your system.",
  },
  {
    label: "Sustainable Maintenance",
    body: "Protecting and managing your digital assets, resolving issues quickly, and keeping system performance optimal.",
  },
  {
    label: "Proven Scalability",
    body: "Systems designed to grow alongside your needs, without sacrificing performance as transaction volumes increase.",
  },
  {
    label: "Operational Reliability",
    body: "Stable system performance minimizes disruption, preserves process integrity, and maintains user trust.",
  },
  {
    label: "Expert Support",
    body: "Competent experts ready to resolve issues efficiently, keeping the user experience seamless.",
  },
  {
    label: "Proven Track Record",
    body: "A history of consistent performance builds trust through a commitment to quality and service excellence.",
  },
];

export const faqs = [
  {
    q: "What IT solutions do you offer?",
    a: "We provide integrated IT solutions covering cloud services, cybersecurity, application development, and system integration to support your overall business needs—from FISCUS for the multifinance sector to Planta for plantation operations.",
  },
  {
    q: "How can your IT solutions benefit my business?",
    a: "Every implementation begins by mapping your current operational processes, after which we design a system that eliminates repetitive manual tasks and gives decision-makers real-time data visibility.",
  },
  {
    q: "What industry sectors do you focus on?",
    a: "Our primary focus is financial services institutions—multifinance, factoring, and securities—as well as palm oil plantation companies. View our client list for an overview of the cross-industry sectors we have served.",
  },
  {
    q: "How flexible is your system in accommodating business growth?",
    a: "Our system architecture is designed modularly from the ground up, so adding branches, product lines, or transaction volumes does not require rebuilding the system from scratch.",
  },
  {
    q: "How does the integration process with OJK reporting systems work?",
    a: "Our SLIK/SILARAS Report module validates data formats prior to submission and maintains a full audit trail, enabling your compliance team to verify every reporting cycle with confidence.",
  },
];

export const contact = {
  address:
    "Taman Palem Lestari Complex Block H/61, Outer Ringroad, Jakarta 11730, Indonesia",
  email: "admin@intidatasolution.com",
  phones: ["+62 (21) 5595-2979", "+62 (21) 5595-8058"],
  whatsapp: "https://wa.me/+6282211581769",
};
