# Brand Tokens — Analyset

Sumber: `Design/Brand Guideline.pdf` (diekstrak) + `Design/Logo/*.png`.
Dokumen ini adalah **nilai presisi wajib dipakai** di kode (Tailwind config), bukan tebakan visual.

## 1. Warna (Color Palette)

| Nama Token | CMYK | RGB | HEX | Peran |
|---|---|---|---|---|
| `primary` | 85 60 0 0 | 48, 105, 180 | `#3069B4` | Warna utama brand — logo, tombol primary, link, header aksen |
| `secondary` | 93 80 0 0 | 43, 78, 162 | `#2B4EA2` | Warna gradient akhir logo (lebih gelap/indigo) — hover state, gradient partner `primary` |
| `neutral-light` | 1 1 0 0 | 250, 250, 250 | `#FAFAFA` | Background terang, section alternatif |
| `neutral-dark` | 70 65 65 72 | 35, 35, 35 | `#232323` | Warna teks utama (bukan pure black), footer background gelap |

**Gradient brand** (dipakai di logo & bisa direplikasi di elemen hero/CTA):
`linear-gradient(135deg, #3069B4 0%, #2B4EA2 100%)`

Catatan: PDF hanya berisi 4 warna eksplisit. Untuk kebutuhan UI tambahan (success/error/warning state, gray scale untuk border/disabled), **gunakan Tailwind default gray/green/red scale** — jangan mengarang warna brand baru yang tidak ada di guideline.

## 2. Tipografi

- **Font utama: Montserrat** (Google Fonts — gratis, tersedia sebagai web font).
- Weight yang terlihat dipakai di guideline: Regular (400), Medium/SemiBold (500-600) untuk heading, Bold (700) untuk penekanan.
- Fallback stack: `'Montserrat', ui-sans-serif, system-ui, sans-serif`
- Import: `<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">` atau via `@fontsource/montserrat` kalau self-host diperlukan (lebih baik untuk performa/SEO — hindari render-blocking external font request kalau memungkinkan).

## 3. Logo

Folder `Design/Logo/` berisi 5 varian — gunakan sesuai konteks:

| File | Kapan dipakai |
|---|---|
| `Analyset - Logo & Brand.png` | Full logo (ikon + wordmark) — dipakai di Navbar/Header, Footer |
| `Analyset - Logo.png` / `Analyset - Logo 1.png` | Varian logo (cek duplikat/resolusi berbeda saat implementasi) |
| `Analyset - Brand.png` | Wordmark saja (tanpa ikon) — dipakai kalau butuh versi teks-only, mis. watermark dokumen |
| `Analyset-icon.png` | Ikon saja (bar-chart mark) — favicon, app icon, avatar sosial media, loading spinner |

**Deskripsi visual ikon:** bentuk 3 batang (bar chart) menaik dengan sudut membulat (rounded corners), gradient biru `primary → secondary`. Merepresentasikan tema data/analytics.

**Deskripsi visual wordmark:** teks "Analyset" font Montserrat, gradient warna sama dengan ikon, gaya geometris-modern dengan terminal huruf membulat.

**Aturan pemakaian logo:**
- WAJIB pakai file dari `Design/Logo/` — jangan generate ulang/redraw logo.
- Untuk favicon, export/resize `Analyset-icon.png` ke ukuran standar (16x16, 32x32, 180x180 untuk apple-touch-icon) — belum ada versi SVG/vector di source, jadi export dari PNG raster (idealnya minta versi vector ke Arseno kalau butuh scaling tanpa loss, tapi PNG resolusi tinggi cukup untuk web).
- Jaga area aman (safezone) di sekitar logo — PDF menyebutkan ada "Safezone Logo" tapi tidak memberi angka piksel presisi; gunakan padding minimal setara tinggi ikon di semua sisi sebagai aturan aman default.

## 4. Kesan Visual / Tone Brand
- **Modern, korporat-profesional, tech-forward** — sesuai posisi Analyset sebagai konsultan data analytics untuk korporat menengah.
- Gradient biru memberi kesan trustworthy, teknologi, data/analytics (asosiasi umum warna biru di industri tech/finance).
- Tone ini harus konsisten di seluruh UI: hindari warna-warna playful/pastel di luar palet, hindari font selain Montserrat untuk brand consistency.

## 5. Gap / Perlu Klarifikasi Arseno
- [ ] Tidak ada file vector (SVG/AI) untuk logo — hanya PNG raster. Kalau butuh scaling sempurna di berbagai ukuran (favicon kecil, print), sebaiknya minta source vector asli.
- [ ] PDF tidak menyebutkan spacing/grid rules eksplisit selain palet warna & font — spacing scale akan pakai default Tailwind (lihat `design-system.md`).
