# Sitemap & Wireframe — Website Analyset

Struktur halaman dan section per halaman. Dibuat SEBELUM styling — agent build wajib ikuti urutan section ini, tidak menyusun layout sendiri.

## 1. Struktur Navigasi (Navbar)
`Logo | Home | Services | Case Study | Blog | About | Contact | [CTA: Konsultasi Gratis]`

Footer (semua halaman): Logo, tagline singkat, link 4 services, link social media (kalau ada), email kontak (@analyset), copyright.

## 2. Halaman & Section

### 2.1 Homepage (`/`)
1. **Hero** — Headline value proposition + sub-headline + CTA button ("Konsultasi Gratis") + visual (ilustrasi data/dashboard atau logo mark).
2. **Trust bar** (opsional) — logo klien kalau ada izin publikasi (mis. Kopi Kenangan, kalau diizinkan).
3. **Services Overview** — grid 4 kartu (Data Analytics, ML Model, Automation, App Development), tiap kartu: ikon + judul + 1 kalimat + link "Pelajari lebih lanjut" → `/services#slug`.
4. **Case Study Highlight** — 1 kartu besar menonjolkan Kopi Kenangan: angka "100 jam kerja/minggu dihemat" sebagai headline statistik, ringkasan problem→solution, link "Baca selengkapnya" → `/case-study`.
5. **Why Analyset / Diferensiasi** — spesialisasi akuntansi & keuangan, target korporat menengah, pendekatan data-driven.
6. **Blog Preview** — 3 artikel terbaru (card kecil), link "Lihat semua artikel" → `/blog`.
7. **CTA Section (penutup)** — ajakan konsultasi/kontak, button ke `/contact`.

### 2.2 Services (`/services`)
1. **Header halaman** — judul "Layanan Kami" + intro singkat.
2. **4 Service Blocks** (masing-masing 1 section, urutan sesuai prioritas bisnis):
   1. Pembuatan Model Machine Learning (layanan andalan — tampilkan lebih menonjol/pertama)
   2. Implementasi Data Analytics
   3. Automation
   4. Pengembangan Aplikasi
   - Tiap block: judul, deskripsi 1 paragraf, 3-5 bullet manfaat/fitur, ikon/visual pendukung.
3. **CTA penutup** — ajak konsultasi terkait kebutuhan spesifik.

### 2.3 Case Study (`/case-study`)
1. **Header halaman** — judul "Studi Kasus" + intro.
2. **Kopi Kenangan — Case Study Detail** (flagship, format Problem → Solution → Result):
   - Problem: proses rekonsiliasi manual yang memakan waktu.
   - Solution: automation rekonsiliasi dibangun Analyset.
   - Result: hemat 100 jam kerja/minggu (angka konkret, highlight besar).
   - (Placeholder untuk case study tambahan lain di masa depan — struktur harus reusable/scalable untuk >1 case study).
3. **CTA** — "Ingin hasil serupa? Konsultasi gratis."

### 2.4 Blog (`/blog`)
1. **Header** — judul "Insight & Artikel" + intro singkat (SEO-focused: data analytics, ML, akuntansi-keuangan).
2. **List artikel** — grid/list card (thumbnail, judul, tanggal, excerpt, kategori/tag).
3. **Pagination** (kalau artikel sudah banyak).
4. Halaman detail artikel (`/blog/[slug]`): judul, tanggal, konten markdown, related articles, CTA konsultasi di akhir artikel.

### 2.5 About (`/about`)
1. **Header** — judul "Tentang Analyset".
2. **Overview perusahaan** — dari Brand Guideline: "Analyset diciptakan untuk menyediakan solusi Big Data... one-stop data solution..." (adaptasi bahasa Indonesia, lihat `content-copy.md`).
3. **Visi/Misi** (dari overview PDF).
4. **Spesialisasi** — akuntansi & keuangan, target korporat menengah.
5. (Opsional, kalau data tersedia) — Tim/founder section. **[perlu konfirmasi Arseno apakah mau ditampilkan]**
6. **CTA** — ke Contact.

### 2.6 Contact (`/contact`)
1. **Header** — judul "Hubungi Kami".
2. **Contact form** — Nama, Email, Perusahaan, Pesan, Submit. (Perlu backend/handler — lihat catatan teknis di PRD).
3. **Info kontak langsung** — email @analyset, (nomor telepon/WhatsApp kalau ada — **perlu data dari Arseno**).
4. **Peta/lokasi** (opsional, kalau relevan — **perlu konfirmasi apakah Analyset punya kantor fisik untuk ditampilkan**).

## 3. URL Structure (SEO-friendly, flat & deskriptif)
```
/                     → Homepage
/services             → Services
/case-study           → Case Study (list, bisa dikembangkan ke /case-study/[slug] kalau >1 case study nanti)
/blog                 → Blog list
/blog/[slug]          → Blog detail
/about                → About
/contact              → Contact
```

## 4. Gap / Perlu Konfirmasi Arseno
- [ ] Nomor telepon/WhatsApp untuk halaman Contact?
- [ ] Apakah ada kantor fisik untuk ditampilkan di peta?
- [ ] Apakah section Tim/Founder di About ditampilkan?
- [ ] Izin publikasi nama & logo klien "Kopi Kenangan" di case study — perlu dikonfirmasi sebelum publish (isu legal/kontrak kerahasiaan klien).
