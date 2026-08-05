export const nav = [
  { label: "Produk", href: "#produk" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Teknologi", href: "#teknologi" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Kontak", href: "#kontak" },
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
      "Selama kurang lebih satu tahun menggunakan Fiscus, validasi yang sudah sesuai ketentuan OJK membantu kami menjaga kualitas data, meminimalkan human error, dan didukung oleh tim Intidata yang selalu responsif, bahkan di luar jam kerja.",
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
      "Fiscus membuat proses pembukuan dan rekonsiliasi menjadi lebih rapi, mempercepat penyusunan laporan OJK melalui XBRL, serta didukung tim Intidata yang selalu responsif.",
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
      "Dengan Fiscus, proses penginputan data menjadi lebih mudah, laporan lebih lengkap dan akurat, serta setiap kendala dapat ditangani dengan cepat.",
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
      "Fiscus membantu kami mengurangi proses manual melalui validasi otomatis dan pelaporan yang cepat, sehingga data menjadi lebih akurat dan efisien.",
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
      "Dengan Fiscus, proses penyusunan laporan menjadi jauh lebih cepat dan efisien. Validasi sistem membantu meminimalkan kesalahan, sementara hasil perhitungannya yang akurat memudahkan kami memenuhi kebutuhan pelaporan dengan lebih percaya diri.",
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
      "Fiscus membantu kami beralih dari banyak proses manual ke sistem yang lebih terintegrasi dan efisien. Ditambah lagi, tim after-sales selalu responsif sehingga kami merasa didukung dalam setiap kebutuhan operasional.",
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
      "Sejak menggunakan Fiscus, pengelolaan data menjadi lebih terstruktur dan efisien. Selain sistem yang andal, tim support juga selalu cepat merespons dan membantu kami menemukan solusi terbaik untuk setiap kebutuhan.",
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
      "Fiscus membantu kami mengotomatiskan proses jurnal dan mempercepat rekonsiliasi data. Ketika ada kebutuhan baru, tim Intidata juga sangat responsif dengan memberikan solusi yang benar-benar sesuai dengan operasional kami.",
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
      "Fiscus mempermudah proses jurnal melalui sistem yang terintegrasi, sehingga pekerjaan menjadi lebih cepat dan efisien. Tim Inti Data juga selalu memberikan respons yang cepat ketika kami membutuhkan bantuan.",
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
      "Fiscus memudahkan kami mengakses data dan menghasilkan laporan yang dapat disesuaikan dengan kebutuhan. Selain sistem yang user-friendly, layanan dari tim Inti Data juga selalu responsif dan memuaskan.",
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
      "Fiscus mampu menangani volume penerbitan lebih dari seribu invoice setiap bulan dengan lancar. Antarmukanya intuitif, mudah dipelajari, dan cukup andal untuk mendukung operasional harian kami tanpa menghambat produktivitas.",
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
      "Kemudahan dalam menelusuri outstanding tagihan, didukung antarmuka yang intuitif dan proses pelaporan yang cepat, menjadikan Fiscus solusi yang kami andalkan untuk mendukung operasional harian.",
    name: "Imam Adiansyah",
    role: "Staff Accounting & Finance",
    company: "PT Datindo Entrycom",
    initials: "IA",
    videoId: "mbfatIU2RJg",
  },
];

export const heroStats = [
  { value: 25, suffix: "+", label: "Tahun pengalaman praktik" },
  { value: 17, suffix: "+", label: "Klien korporasi aktif" },
  { value: 5, suffix: "", label: "Sistem inti yang dioperasikan" },
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
  "Biro Administrasi Efek",
  "PT Putra Bangka Mandiri",
  "Danakini",
  "Sany Indonesia Finance",
];

export type Product = {
  id: string;
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
    code: "FIS-MF",
    name: "FISCUS Multifinance",
    summary: "Pembiayaan dan pembayaran pelanggan dalam satu sistem inti.",
    description:
      "Solusi terintegrasi untuk seluruh siklus pembiayaan konsumen — dari akuisisi kontrak, penjadwalan angsuran, hingga penagihan. FISCUS Multifinance mengambil alih beban operasional harian sehingga tim Anda dapat fokus pada pertumbuhan portofolio.",
    metrics: [
      { label: "Siklus kontrak", value: "Real-time" },
      { label: "Rekonsiliasi", value: "Otomatis" },
    ],
    modules: [
      "Origination",
      "Penjadwalan Angsuran",
      "Penagihan",
      "Rekonsiliasi Kas",
    ],
  },
  {
    id: "fiscus-factoring",
    code: "FIS-FC",
    name: "FISCUS Factoring",
    summary: "Anjak piutang dengan jaminan faktur, terlacak penuh.",
    description:
      "Sistem yang menyediakan solusi pembiayaan dengan jaminan piutang atau faktur — melacak setiap dokumen dari verifikasi hingga pencairan, dengan visibilitas penuh atas risiko konsentrasi debitur.",
    metrics: [
      { label: "Verifikasi faktur", value: "Berlapis" },
      { label: "Pelacakan risiko", value: "Per debitur" },
    ],
    modules: [
      "Verifikasi Faktur",
      "Pencairan Dana",
      "Manajemen Risiko",
      "Pelaporan Piutang",
    ],
  },
  {
    id: "fiscus-accounting",
    code: "FIS-AC",
    name: "FISCUS Accounting",
    summary: "Pembukuan korporasi tanpa celah antar buku besar.",
    description:
      "Sistem informasi akuntansi yang mengoptimalkan pengelolaan pembukuan menyeluruh: piutang usaha, utang usaha, buku besar, aset tetap, hingga buku besar khusus — seluruhnya terhubung dalam satu sumber kebenaran.",
    metrics: [
      { label: "Buku besar", value: "Terpadu" },
      { label: "Penutupan periode", value: "Terjadwal" },
    ],
    modules: ["Piutang Usaha", "Utang Usaha", "Buku Besar", "Aset Tetap"],
  },
  {
    id: "planta",
    code: "PLN",
    name: "Planta",
    summary: "Operasional perkebunan sawit, dari kebun ke pabrik.",
    description:
      "Sistem terpadu untuk mengelola perkebunan kelapa sawit — mencakup Estates (produksi dan logistik kebun) maupun Mills (pengolahan pabrik) dalam satu rantai data operasional.",
    metrics: [
      { label: "Cakupan", value: "Estates + Mills" },
      { label: "Data produksi", value: "Harian" },
    ],
    modules: [
      "Manajemen Kebun",
      "Logistik TBS",
      "Produksi Pabrik",
      "Kendali Mutu",
    ],
  },
  {
    id: "slik-silaras",
    code: "SLK-SR",
    name: "SLIK / SILARAS Report",
    summary: "Jembatan pelaporan langsung ke sistem regulator.",
    description:
      "Menghubungkan sistem keuangan perusahaan Anda langsung dengan sistem pelaporan OJK — SLIK dan SILARAS — memastikan format, tenggat, dan validasi data terpenuhi setiap siklus pelaporan.",
    metrics: [
      { label: "Validasi format", value: "Sebelum kirim" },
      { label: "Tenggat OJK", value: "Terjaga" },
    ],
    modules: [
      "Ekstraksi Data",
      "Validasi Format",
      "Pengiriman Terjadwal",
      "Jejak Audit",
    ],
  },
];

export const principles = [
  {
    label: "Inovasi Terdepan",
    body: "Mengadopsi teknologi terbaru secara selektif — hanya yang benar-benar meningkatkan relevansi dan efektivitas sistem Anda.",
  },
  {
    label: "Maintenance Berkelanjutan",
    body: "Melindungi dan mengelola aset digital Anda, menyelesaikan kendala dengan cepat, serta menjaga kinerja sistem tetap optimal.",
  },
  {
    label: "Skalabilitas Teruji",
    body: "Sistem dirancang untuk tumbuh bersama kebutuhan Anda, tanpa mengorbankan kinerja saat volume transaksi meningkat.",
  },
  {
    label: "Reliability Operasional",
    body: "Kinerja sistem yang stabil meminimalkan gangguan, menjaga integritas proses, dan mempertahankan kepercayaan pengguna.",
  },
  {
    label: "Dukungan Ahli",
    body: "Tenaga ahli berkompeten siap menyelesaikan kendala secara efisien, menjaga pengalaman pengguna tetap tanpa hambatan.",
  },
  {
    label: "Rekam Jejak Terbukti",
    body: "Sejarah kinerja yang konsisten membangun kepercayaan melalui komitmen pada kualitas dan keunggulan layanan.",
  },
];

export const faqs = [
  {
    q: "Solusi IT apa yang Anda tawarkan?",
    a: "Kami menghadirkan solusi IT terintegrasi yang meliputi layanan cloud, keamanan siber, pengembangan aplikasi, dan integrasi sistem untuk mendukung kebutuhan bisnis Anda secara menyeluruh — dari FISCUS untuk sektor multifinance hingga Planta untuk operasional perkebunan.",
  },
  {
    q: "Bagaimana solusi IT Anda dapat menguntungkan bisnis saya?",
    a: "Setiap implementasi dimulai dengan memetakan proses operasional Anda saat ini, lalu kami rancang sistem yang menghilangkan pekerjaan manual berulang dan memberi visibilitas data secara real-time kepada pengambil keputusan.",
  },
  {
    q: "Apa bidang industri yang menjadi fokus Anda?",
    a: "Fokus utama kami adalah lembaga jasa keuangan — multifinance, factoring, dan sekuritas — serta perusahaan perkebunan kelapa sawit. Lihat daftar klien kami untuk gambaran lintas industri yang telah kami layani.",
  },
  {
    q: "Seberapa fleksibel sistem Anda menghadapi pertumbuhan bisnis?",
    a: "Arsitektur sistem kami dirancang modular sejak awal, sehingga penambahan cabang, lini produk, atau volume transaksi tidak memerlukan perombakan sistem dari nol.",
  },
  {
    q: "Bagaimana proses integrasi dengan sistem pelaporan OJK?",
    a: "Modul SLIK/SILARAS Report kami memvalidasi format data sebelum pengiriman dan menjaga jejak audit penuh, sehingga tim kepatuhan Anda dapat memverifikasi setiap siklus pelaporan dengan percaya diri.",
  },
];

export const contact = {
  address:
    "Kompleks Taman Palem Lestari Blok H/61, Outer Ringroad, Jakarta 11730, Indonesia",
  email: "admin@intidatasolution.com",
  phones: ["+6221-55952979", "+6221-55958058"],
  whatsapp: "https://wa.me/622155958058",
};
