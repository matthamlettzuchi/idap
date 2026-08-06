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
  quickFacts: string[];
  overview: string[];
  advantages: ProductAdvantage[];
  processIntro?: { heading: string; body: string };
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
      "Sistem Loan Origination yang menopang seluruh siklus pengajuan kredit — dari prospek hingga pencairan.",
    accent: "#2f4bd0",
    icon: "Building2",
    quickFacts: ["Web-Based", "Integrasi SLIK", "Multi Device", "Modul FISCUS"],
    overview: [
      "FISCUS Multifinance System adalah sistem khusus yang dirancang untuk mendukung kebutuhan proses pengajuan kredit pada perusahaan multifinance, bank, dan lembaga keuangan lainnya. Dengan pengalaman lebih dari 30 tahun di bidang pengembangan software pembiayaan — mulai dari DOS based, Windows based, Web based, hingga multi device — proses dalam FISCUS Multifinance System mencakup tahapan penting mulai dari pengelolaan calon konsumen atau prospek, initial scoring yang melibatkan pemeriksaan internal serta integrasi eksternal seperti pengecekan SLIK, hingga proses survei atau appraisal untuk memastikan kelengkapan data konsumen.",
      "Kami menawarkan layanan Loan Origination System (LOS) siap pakai, sekaligus pengembangan LOS yang dapat disesuaikan dengan kebutuhan klien. Sistem kami unggul dalam kemampuannya untuk terintegrasi dengan berbagai sistem lain di perusahaan, seperti Accounting Management, Funding Management, serta pelaporan kepada OJK seperti SLIK, SILARAS, dan lainnya. FISCUS Multifinance System merupakan salah satu modul terintegrasi dari platform FISCUS yang mudah dan cepat untuk proses implementasi.",
    ],
    advantages: [
      "Integrasi dengan Sistem API – Multi Platform",
      "Proses Pengajuan Kredit Otomatis – Mengurangi Beban Kerja",
      "Advanced Analytics – Mendukung Keputusan Bisnis",
      "Mobile Accessibility – Cross Platform",
      "Pemantauan Kinerja – Management Assist",
      "Kecepatan dan Efisiensi – Meningkatkan Kepuasan",
    ].map(splitAdvantage),
    processIntro: {
      heading: "Proses FISCUS Loan Origination System (LOS)",
      body: "Memudahkan debitur untuk mengajukan kredit melalui formulir online yang intuitif, dengan mengisi informasi penting seperti data pribadi, profil usaha, dan jumlah pinjaman yang diinginkan.",
    },
    featuresIntro:
      "Sistem terintegrasi dengan penilaian kredit otomatis yang menilai kelayakan debitur berdasarkan kriteria tertentu, serta memberikan hasil penilaian secara cepat dan akurat.",
    features: [
      { title: "Penilaian Kredit", body: "Menilai kelayakan kredit debitur dan menentukan tingkat risiko secara cepat dan akurat." },
      { title: "Dashboard Monitoring", body: "Memantau seluruh data kredit melalui tampilan dashboard interaktif dan real-time." },
      { title: "Sistem Berbasis Web", body: "Sistem yang dapat diakses dimana pun dengan semua perangkat." },
      { title: "Pelaporan dan Analitik", body: "Fitur pelaporan komprehensif untuk memantau Key Performance Indicator (KPI) serta menganalisis kinerja portofolio pembiayaan." },
      { title: "Collection", body: "Mengelola, memonitor, dan mengoptimalkan proses penagihan angsuran pembiayaan kepada debitur, mulai dari keterlambatan awal hingga penyelesaian kredit bermasalah." },
    ],
  },

  factoring: {
    slug: "factoring",
    code: "FIS-FC",
    name: "FISCUS Factoring",
    tagline:
      "Ubah piutang usaha menjadi arus kas — dikelola dalam satu sistem yang terpadu.",
    accent: "#0e9488",
    icon: "TrendingUp",
    quickFacts: ["Invoice Financing", "Dashboard Real-time", "Modul FISCUS"],
    overview: [
      "FISCUS Factoring System merupakan sistem transaksi keuangan di mana sebuah perusahaan menjual piutang usahanya (seperti faktur atau tagihan pelanggan yang belum dibayar) kepada pihak ketiga yang disebut factor. Pihak factor — yang umumnya merupakan lembaga keuangan atau perusahaan pembiayaan khusus — membeli piutang tersebut dengan harga diskon dan memberikan dana tunai secara langsung kepada perusahaan penjual. Setelah transaksi dilakukan, factor bertanggung jawab untuk menagih pembayaran dari pelanggan yang memiliki kewajiban atas piutang tersebut.",
      "Factoring merupakan salah satu modul terintegrasi yang ditawarkan oleh FISCUS, dirancang untuk membantu perusahaan mengelola piutang secara efektif dan mengoptimalkan operasional keuangan. Kami menawarkan layanan Factoring siap pakai untuk membantu bisnis memperoleh dana secara cepat, serta pengembangan layanan Factoring yang dapat disesuaikan dengan kebutuhan spesifik setiap klien.",
    ],
    advantages: [
      "Arus Kas Lebih Lancar – Dana Tersedia Segera",
      "Risk Mitigation – Alihkan Risiko Kredit",
      "Kecepatan dan Efisiensi – Akses Dana Cepat",
      "Modal Kerja Meningkat – Optimized Liquidity",
      "Fleksibilitas – Pembiayaan yang Dapat Berkembang",
      "Platform yang Dapat Disesuaikan dengan Bisnis Anda – Software Flexibility",
    ].map(splitAdvantage),
    processIntro: {
      heading: "Proses Factoring",
      body: "Permudah proses penagihan dengan pembuatan dan pengiriman faktur secara otomatis kepada klien atau pelanggan.",
    },
    featuresIntro:
      "Lacak dan kategorikan pengeluaran secara efisien, sehingga memungkinkan kontrol dan analisis biaya yang lebih baik.",
    features: [
      { title: "Berbagai Jenis Factoring", body: "Factoring dengan hak tuntut (recourse) atau tanpa hak tuntut (without recourse). Factoring penuh (full factoring) atau pembiayaan faktur (invoice financing). Factoring piutang atau pembiayaan debitur." },
      { title: "Dashboard Monitoring", body: "Memantau seluruh data factoring melalui tampilan dashboard interaktif dan real-time." },
      { title: "Sistem Berbasis Web", body: "Sistem yang dapat diakses dimana pun dengan semua perangkat." },
      { title: "Pelaporan dan Analitik", body: "Fitur pelaporan komprehensif untuk memantau Key Performance Indicator (KPI) serta menganalisis kinerja portofolio pembiayaan." },
    ],
  },

  accounting: {
    slug: "accounting",
    code: "FIS-AC",
    name: "FISCUS Accounting",
    tagline:
      "Mitra keuangan presisi tinggi untuk pencatatan, pelaporan, dan pengambilan keputusan yang akurat.",
    accent: "#7c3aed",
    icon: "Calculator",
    quickFacts: ["General Ledger", "Multi-User", "Real-time Sync"],
    overview: [
      "FISCUS Accounting System adalah platform digital yang memudahkan pencatatan, pengelolaan, dan pelaporan transaksi keuangan secara efisien dan aman melalui antarmuka berbasis web. Dirancang untuk memenuhi kebutuhan akuntansi perusahaan yang beroperasi di lingkungan daring, sistem ini menyediakan berbagai fitur, termasuk buku besar digital, jurnal transaksi, pelaporan keuangan online, serta integrasi dengan layanan keuangan lainnya.",
      "FISCUS Accounting adalah mitra keuangan yang tak tergantikan bagi bisnis yang mengutamakan presisi, efisiensi, dan integrasi mulus dalam mengelola operasi keuangan mereka. Platform kami menyediakan layanan akuntansi siap pakai untuk akses dana secara langsung, serta layanan pengembangan akuntansi yang dapat disesuaikan dengan kebutuhan unik setiap klien.",
    ],
    advantages: [
      "Pembaruan Real-Time – Data Tersedia Instan",
      "Skalabilitas – Menyesuaikan Diri dengan Pertumbuhan Bisnis",
      "Automatic Backups – Data Redundancy and Backup",
      "Transparansi Biaya – Struktur Biaya yang Jelas",
      "Collaboration – Multi-User Collaboration",
    ].map(splitAdvantage),
    processIntro: {
      heading: "Proses Accounting",
      body: "Menyediakan dashboard terpusat untuk melihat dan mengelola portofolio keuangan, termasuk status faktur, tingkat pencairan dana, dan estimasi pendapatan.",
    },
    featuresIntro:
      "Lacak dan kategorikan pengeluaran secara efisien, sehingga memudahkan pengendalian dan analisis biaya.",
    features: [
      { title: "Tampilan User-Friendly", body: "Menampilkan tampilan yang mempermudah navigasi dan penggunaan, sehingga dapat diakses dengan mudah dan efisien oleh pengguna dengan berbagai tingkat keahlian." },
      { title: "Presisi dan Efisiensi", body: "Mengutamakan presisi dan efisiensi dalam proses keuangan, mendukung pencatatan, pelaporan, dan pengambilan keputusan yang akurat bagi bisnis." },
      { title: "Layanan Pengembangan Sesuai Kebutuhan", body: "Menyediakan layanan pengembangan akuntansi yang dapat disesuaikan untuk memenuhi kebutuhan spesifik dan unik setiap klien, sekaligus memastikan fleksibilitas dan skalabilitas." },
      { title: "Pelaporan dan Analitik", body: "Fitur pelaporan komprehensif untuk memantau data accounting serta menganalisis kinerja portofolio pembiayaan." },
    ],
  },

  "slik-silaras": {
    slug: "slik-silaras",
    code: "SLK-SR",
    name: "SLIK / SILARAS Report",
    tagline:
      "Jembatan pelaporan otomatis ke regulator — akurat, patuh, dan siap analisis.",
    accent: "#b45309",
    icon: "FileSpreadsheet",
    quickFacts: ["OJK Compliant", "Multi Database", "Export PDF/Excel/CSV"],
    overview: [
      "FISCUS SLIK/SILARAS Report merupakan sistem analisis data inovatif yang dirancang secara cermat untuk memproses dan menganalisis data secara efektif, serta menghasilkan laporan yang informatif dan akurat. Didukung oleh platform FISCUS, sistem ini menawarkan kemampuan yang kuat dalam analisis data dan pembuatan laporan, membantu perusahaan memperoleh wawasan berharga untuk mendukung pengambilan keputusan yang tepat dan strategis.",
      "Dengan FISCUS SLIK/SILARAS Report, perusahaan dapat memanfaatkan alat analisis data yang komprehensif untuk meningkatkan penilaian risiko, pelaporan kepatuhan, serta perencanaan strategis — solusi analisis data terdepan yang dirancang untuk memenuhi beragam kebutuhan pelaporan perusahaan modern.",
    ],
    advantages: [
      "Analisis Data yang Komprehensif",
      "Pelaporan Fleksibel – Disesuaikan dengan Kebutuhan Bisnis",
      "Compliance Reporting – Sesuai Regulasi OJK",
      "Perencanaan Strategis – Growth Opportunities",
      "Efisiensi dan Akurasi",
      "User Friendly Interface – Engaging Visualization",
    ].map(splitAdvantage),
    featuresIntro:
      "Fitur-fitur dalam laporan SLIK dan SILARAS dirancang untuk memberikan kemampuan analisis data yang komprehensif serta pelaporan yang informatif bagi perusahaan.",
    features: [
      { title: "Export and Sharing Options", body: "Pengguna dapat mengekspor laporan ke berbagai format, seperti PDF, Excel, atau CSV, untuk analisis lebih lanjut." },
      { title: "Flexible Database Integration", body: "Integrasi fleksibel dengan berbagai jenis database (MySQL, Oracle, PostgreSQL, MongoDB, dll)." },
      { title: "PSAK & CKPN", body: "Mendukung impor data sesuai standar pelaporan PSAK & CKPN." },
      { title: "Automatic Compare", body: "Fitur pembanding otomatis antar periode laporan untuk memudahkan analisis perubahan data." },
    ],
  },

  planta: {
    slug: "planta",
    code: "PLN",
    name: "Planta",
    tagline:
      "Sistem informasi terintegrasi untuk perkebunan kelapa sawit — dari kebun hingga pabrik.",
    accent: "#15803d",
    icon: "Sprout",
    quickFacts: ["Estate + Mill", "VRA Tracking", "Akses 24/7"],
    overview: [
      "Planta merupakan solusi sistem informasi terintegrasi yang dirancang untuk mengoptimalkan pengelolaan perkebunan kelapa sawit, mencakup manajemen perkebunan, manajemen aset, pemeliharaan lapangan, pengendalian dan pemeliharaan biaya, serta pengelolaan keuangan dan biaya operasional. Planta dikembangkan bersama para ahli perkebunan untuk menghasilkan informasi yang akurat, menekan biaya operasional, meningkatkan efisiensi, serta mendorong produktivitas perkebunan secara keseluruhan.",
    ],
    advantages: [
      "Integrasi dengan Sistem API – Multi Platform",
      "Otomatisasi Proses Operasional – Mengurangi Beban Kerja",
      "Advanced Analytics – Mendukung Keputusan Bisnis",
      "Mobile Accessibility – Cross Platform",
      "Performance Monitoring – Management Assist",
      "Kecepatan dan Efisiensi – Meningkatkan Kepuasan",
    ].map(splitAdvantage),
    featuresIntro:
      "PLANTA merupakan sistem terintegrasi yang dikhususkan untuk perkebunan atau pabrik pengolahan kelapa sawit. Sistem ini mencatat seluruh kegiatan mulai dari kegiatan kebun hingga kegiatan di pabrik pengolahan, sehingga menghasilkan informasi biaya dan laporan keuangan yang dibutuhkan oleh industri perkebunan kelapa sawit.",
    features: [
      { title: "Alokasi Biaya", body: "Mencatat semua kegiatan seperti Vehicle Running Account (VRA), inventory, beban gaji, dan pekerja rutin, sehingga menghasilkan laporan biaya yang terinci." },
      { title: "Dashboard Monitoring", body: "Memantau seluruh data operasional melalui tampilan dashboard interaktif dan real-time." },
      { title: "Sistem Berbasis Web", body: "Sistem yang sederhana, mudah dirawat, dapat diakses lintas platform, dan siap digunakan kapan saja, 24 jam sehari, 7 hari seminggu." },
      { title: "Reporting and Analytics", body: "Fitur pelaporan komprehensif untuk memantau hasil laporan keuangan serta menganalisis kinerja setiap bagian." },
    ],
  },
};

export const productList = Object.values(productDetails);