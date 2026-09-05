export interface Service {
  id: string;
  title: string;
  description: string;
  detail: string;
  bullets: string[];
}

export const services: Service[] = [
  {
    id: 'machine-learning',
    title: 'Pembuatan Model Machine Learning',
    description:
      'Membangun model prediktif dan analitik lanjutan yang disesuaikan dengan kebutuhan bisnis Anda.',
    detail:
      'Kami merancang dan membangun model machine learning yang disesuaikan dengan tantangan bisnis spesifik Anda — dari prediksi risiko keuangan hingga deteksi anomali transaksi.',
    bullets: [
      'Model prediktif untuk pengambilan keputusan bisnis',
      'Deteksi anomali & fraud pada data keuangan',
      'Model klasifikasi & scoring risiko',
      'Evaluasi dan tuning model berkelanjutan',
    ],
  },
  {
    id: 'data-analytics',
    title: 'Implementasi Data Analytics',
    description:
      'Mengubah data mentah menjadi insight yang dapat langsung ditindaklanjuti.',
    detail:
      'Kami membantu perusahaan membangun sistem analitik yang mengubah data operasional menjadi dashboard dan laporan yang actionable.',
    bullets: [
      'Dashboard bisnis real-time',
      'Analisis tren keuangan & operasional',
      'Konsolidasi data dari berbagai sumber',
      'Rekomendasi berbasis data untuk manajemen',
    ],
  },
  {
    id: 'automation',
    title: 'Automation',
    description:
      'Mengotomatisasi proses kerja repetitif agar tim Anda fokus pada hal yang lebih strategis.',
    detail:
      'Kami mengotomatisasi proses kerja repetitif yang memakan waktu tim Anda — seperti rekonsiliasi, pelaporan, dan input data manual.',
    bullets: [
      'Automasi rekonsiliasi keuangan',
      'Automasi pelaporan berkala',
      'Integrasi antar sistem/aplikasi',
      'Pengurangan human error pada proses manual',
    ],
  },
  {
    id: 'app-development',
    title: 'Pengembangan Aplikasi',
    description:
      'Membangun aplikasi custom yang mendukung operasional bisnis berbasis data.',
    detail:
      'Kami membangun aplikasi custom yang mendukung kebutuhan operasional dan analitik bisnis Anda.',
    bullets: [
      'Aplikasi internal untuk tim operasional/keuangan',
      'Integrasi aplikasi dengan sistem data yang sudah ada',
      'Aplikasi berbasis web, sesuai kebutuhan spesifik klien',
    ],
  },
];
