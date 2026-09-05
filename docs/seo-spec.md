# SEO / Technical Spec — Website Analyset

## 1. Target Keyword per Halaman (draft awal — perlu riset keyword lebih lanjut)
| Halaman | Target Keyword (ID) | Catatan |
|---|---|---|
| Homepage | "konsultan data analytics indonesia", "jasa data analytics korporat" | Brand + kategori utama |
| Services | "jasa machine learning perusahaan", "automation proses keuangan" | Per-service bisa dipecah keyword long-tail nanti |
| Case Study | "studi kasus automation rekonsiliasi keuangan" | Long-tail, dukung layanan andalan |
| Blog | bervariasi per artikel — riset keyword terpisah nanti | Lihat brainstorm §7b poin 3 (strategi konten belum final) |
| About | "tentang analyset", "konsultan data akuntansi keuangan" | Brand-focused |
| Contact | "kontak konsultan data" | Low volume, tetap perlu untuk local/brand search |

⚠️ **Perlu riset keyword lebih dalam sebelum final** (mis. via Google Keyword Planner/Ahrefs/Ubersuggest) — daftar di atas baru estimasi kasar berdasarkan brainstorm, bukan hasil riset volume pencarian riil.

## 2. Meta Tags (struktur wajib tiap halaman)
```html
<title>[Judul Halaman] | Analyset</title>
<meta name="description" content="[150-160 karakter, unik per halaman]">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="/og-image.png"> <!-- pakai Analyset - Logo & Brand.png atau varian khusus OG -->
<meta property="og:type" content="website">
<link rel="canonical" href="https://[domain]/[path]">
```

## 3. Structured Data (schema.org)
- **Organization** schema di semua halaman (footer/head): nama, logo, url, deskripsi singkat.
- **Article** schema untuk tiap halaman blog post (headline, datePublished, author, image).
- **BreadcrumbList** untuk halaman non-home (Services, Case Study, Blog detail).

## 4. Struktur URL
Sudah didefinisikan di `sitemap.md` §3 — flat, deskriptif, lowercase, hyphen-separated (`/case-study`, bukan `/caseStudy` atau `/case_study`).

## 5. File Teknis Wajib
- `sitemap.xml` — auto-generate via Astro integration (`@astrojs/sitemap`), submit ke Google Search Console setelah live.
- `robots.txt` — allow all, reference sitemap.xml.
- `favicon` — set lengkap (16x16, 32x32, apple-touch-icon 180x180) dari `Design/Logo/Analyset-icon.png`.

## 6. Performa (Core Web Vitals)
- Static site (Astro) + Cloudflare Pages CDN → dasar sudah kuat untuk performa.
- Optimasi gambar: compress semua PNG logo/asset sebelum deploy (mis. via `astro:assets` built-in image optimization, format WebP kalau memungkinkan).
- Hindari JS berat/framework client-side besar — sesuai keputusan stack (Astro output statis, minim JS).
- Self-host font Montserrat (via `@fontsource/montserrat`) untuk hindari render-blocking request ke Google Fonts CDN, ATAU pakai `font-display: swap` kalau tetap load dari Google Fonts CDN.

## 7. Semantic HTML
- Gunakan heading hierarchy benar (1 `<h1>` per halaman, `<h2>` untuk section, dst — jangan skip level).
- `<nav>`, `<main>`, `<footer>`, `<article>` (blog post), `<section>` per block konten.
- Semua `<img>` wajib punya `alt` text deskriptif (termasuk logo & ikon).

## 8. Analytics & Monitoring (belum diputuskan — flag untuk Arseno)
- [ ] Perlu Google Analytics / Cloudflare Web Analytics? **[perlu keputusan Arseno]**
- [ ] Perlu Google Search Console setup setelah domain live? (direkomendasikan — gratis, penting untuk submit sitemap & monitor index status)

## Gap / Perlu Ditindaklanjuti
- [ ] Riset keyword volume riil sebelum finalisasi target keyword per halaman.
- [ ] Keputusan tool analytics (GA4 vs Cloudflare Web Analytics vs tanpa analytics).
