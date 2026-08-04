export const nav = [
  { label: "Produk", href: "#produk" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Teknologi", href: "#teknologi" },
  { label: "Rekam Jejak", href: "#rekam-jejak" },
  { label: "Kontak", href: "#kontak" },
];

export const heroStats = [
  { value: 25, suffix: "+", label: "Tahun pengalaman praktik" },
  { value: 17, suffix: "+", label: "Klien korporasi aktif" },
  { value: 5, suffix: "", label: "Sistem inti yang dioperasikan" },
];

export const clientLogos = [
  "NTT",
  "NEC",
  "Karunia Multifinance",
  "RSM AAJ",
  "Moores Rowland",
  "Sumitomo Mitsui Trust",
  "Resona",
  "Ventura Investasi Utama",
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
    modules: ["Origination", "Penjadwalan Angsuran", "Penagihan", "Rekonsiliasi Kas"],
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
    modules: ["Verifikasi Faktur", "Pencairan Dana", "Manajemen Risiko", "Pelaporan Piutang"],
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
    modules: ["Manajemen Kebun", "Logistik TBS", "Produksi Pabrik", "Kendali Mutu"],
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
    modules: ["Ekstraksi Data", "Validasi Format", "Pengiriman Terjadwal", "Jejak Audit"],
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
  address: "Kompleks Taman Palem Lestari Blok H/61, Outer Ringroad, Jakarta 11730, Indonesia",
  email: "admin@intidatasolution.com",
  phones: ["+6221-55952979", "+6221-55958058"],
  whatsapp: "https://wa.me/622155958058",
};
