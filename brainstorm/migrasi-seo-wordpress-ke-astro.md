# Migrasi SEO: WordPress → Astro (analyset.com)

Status: **Rencana aksi — perlu dieksekusi Arseno di dashboard Cloudflare & Google Search Console.**
Dibuat: 2026-09-06

## Konteks
- Domain `analyset.com` sudah live (dipindah manual) dari WordPress lama ke situs Astro baru.
- Struktur URL berubah total antara WordPress lama dan Astro baru.
- Ditemukan: URL lama saat ini return HTTP 200 dengan konten homepage (soft-404), bukan redirect resmi — ini merusak SEO karena Google akan menganggap sebagai duplicate content / soft-404, dan kehilangan seluruh ranking + backlink yang sudah terbentuk di URL lama.

## 1. Mapping Redirect 301 (URL Lama → URL Baru)

Ditemukan dari 2 sumber independen: Google Index (`site:analyset.com`, berbagai variasi query) dan Wayback Machine CDX API (histori crawl domain). Total 14 URL unik ditemukan.

| URL Lama (WordPress) | Redirect ke (Astro) | Alasan |
|---|---|---|
| `/home/` | `/` | Duplikat homepage |
| `/about/` | `/about` | Padanan langsung sudah ada |
| `/contact` | `/contact` | Padanan langsung sudah ada |
| `/insight/` | `/blog` | Halaman listing artikel lama → blog baru |
| `/articles/` | `/blog` | Halaman listing artikel lama → blog baru |
| `/shop/` | `/services` | Tidak ada e-commerce lagi di situs baru; diarahkan ke halaman layanan terdekat |
| `/product-category/analyset-mab/` | `/services` | Kategori produk lama → layanan terdekat |
| `/product/accurate-analytics/` | `/services` | Halaman produk individual lama → layanan terdekat |
| `/author/krisanputih/` | `/blog` | Situs baru tidak pakai sistem author individual |
| `/under_construction-analyset/` | `/` | Halaman placeholder lama, tidak relevan lagi |
| `/study-case-analyset/` | `/case-study` | Padanan langsung ditemukan di situs baru |
| `/demo-analyset-tools/` | `/services` | Tidak ada demo tools lagi; arahkan ke layanan |
| `/2025/07/06/data-warehouse-vs-database-biasa-perbedaan-fungsi-dan-kapan-harus-menggunakannya/` | `/blog` | Artikel blog individual lama, tidak ada padanan konten spesifik di situs baru |

**Catatan penting:** Daftar di atas adalah hasil terbaik dari 2 sumber independen (Google index + Wayback Machine), BUKAN jaminan 100% lengkap. Wayback Machine sempat mengalami downtime saat pengecekan (2026-09-07), dan snapshot sitemap WordPress (`wp-sitemap-posts-post-1.xml`) yang berhasil diambil ternyata dari 2023 (berisi hanya "hello-world" default) — bukan snapshot terbaru sebelum migrasi. Kemungkinan masih ada artikel blog lain yang belum tertangkap oleh kedua sumber ini.

**REKOMENDASI:** Sebelum eksekusi final, cek sumber yang lebih lengkap:
- Google Search Console lama → **Coverage report** (menu "Pages" / halaman yang pernah diindex) — ini sumber PALING akurat untuk semua URL yang pernah dikenal Google, lebih lengkap dari sekadar `site:` search. **Dikonfirmasi Arseno properti GSC ini sudah ada dari era WordPress — cek laporan ini dulu sebelum eksekusi redirect final.**
- Kalau masih ada akses ke backup/database WordPress lama → export semua permalink post/page.
- Google Analytics lama (kalau ada) → laporan halaman dengan traffic historis tertinggi.

## 2. Implementasi Redirect via Cloudflare

Karena domain sudah di Cloudflare, pakai **Cloudflare Redirect Rules** (gratis, tidak butuh ubah kode Astro):

1. Buka dashboard Cloudflare → pilih zone `analyset.com`
2. Menu **Rules → Redirect Rules** → **Create rule**
3. Untuk tiap baris mapping di atas, buat rule:
   - **When incoming requests match**: URI Path — `equals` — `/home/` (contoh)
   - **Then**: Type = **Static**, Status code = **301**, Target URL = `https://analyset.com/`
4. Ulangi untuk setiap baris mapping (bisa juga pakai **Bulk Redirects** kalau jumlahnya banyak — lebih efisien untuk >10 rules, ada di menu Rules → Redirect Rules → Bulk Redirects, upload via CSV).
5. Setelah semua rule aktif, test tiap URL lama dengan `curl -I https://analyset.com/home/` — pastikan response `HTTP/2 301` dan header `location` mengarah ke URL baru yang benar (bukan 200).

## 3. Submit Sitemap Baru & Request Reindex (Google Search Console)

1. Buka Google Search Console, pilih properti `analyset.com` (sudah ada dari era WordPress).
2. Menu **Sitemaps** → hapus/biarkan sitemap WordPress lama (kalau statusnya sudah tidak valid, Google akan otomatis flag) → submit sitemap baru: `https://analyset.com/sitemap-index.xml`
3. Menu **URL Inspection** → cek & **Request Indexing** untuk tiap URL baru prioritas:
   - `https://analyset.com/`
   - `https://analyset.com/services`
   - `https://analyset.com/about`
   - `https://analyset.com/case-study`
   - `https://analyset.com/contact`
   - `https://analyset.com/blog`
   - 3 artikel blog individual
4. Menu **Coverage / Pages** → pantau dalam beberapa hari/minggu ke depan: URL lama seharusnya berubah status dari "Indexed" menjadi "Page with redirect" (bagus, redirect terdeteksi) — BUKAN "Not found (404)" atau tetap "Indexed" (berarti redirect belum ke-crawl ulang oleh Google, perlu waktu).

## 4. Cek Tambahan
- **Sitemap WordPress lama**: cek apakah `analyset.com/sitemap.xml` atau `wp-sitemap.xml` masih ada & submitted di GSC — kalau masih terdaftar, sebaiknya dibiarkan (Google akan otomatis mengenali sitemap lama sudah tidak update) atau dihapus manual dari daftar Sitemaps di GSC.
- **Google Analytics/Search Console property lama**: pastikan verifikasi properti (meta tag/DNS TXT record) tidak hilang saat migrasi DNS ke Cloudflare — kalau verifikasi berbasis DNS TXT record, perlu dipindahkan juga ke Cloudflare DNS.
- **Timeline realistis**: reindex penuh oleh Google biasanya perlu **beberapa hari sampai beberapa minggu**, tergantung frekuensi crawl Googlebot ke domain ini. Request Indexing manual mempercepat untuk halaman prioritas, tapi tidak instan.

## 6. Status Akses Google Search Console API (2026-09-07)
- ✅ **Jarvis sekarang punya akses langsung ke GSC API** untuk `sc-domain:analyset.com` (OAuth setup selesai, scope `webmasters`).
- Script: `/opt/data/scripts/gsc/gsc_api.py` (jalankan via `/opt/data/.venv_gws/bin/python3`). Command: `sites`, `sitemaps list/submit/get/delete`, `inspect --url <url>`, `search-analytics`.
- Token: `/opt/data/.hermes/gsc_token.json`. Setup ulang/re-auth via `/opt/data/scripts/gsc/setup_gsc.py`.

### Temuan URL Inspection (2026-09-07, sebelum propagasi DNS selesai)
| URL | Status |
|---|---|
| `/` | Submitted and indexed (last crawl 28 Agustus 2026 — kemungkinan versi WordPress lama, perlu re-index setelah propagasi) |
| `/services`, `/about`, `/contact`, `/case-study`, `/blog` | URL is unknown to Google — belum pernah di-crawl |

**Catatan:** Sitemap `sitemap-index.xml` dan `sitemap-0.xml` (Astro) SUDAH ter-submit ke GSC (07 Sep 2026, 0 error, 11 URL submitted, 0 indexed — masih baru). Sitemap WordPress lama (`page-sitemap.xml`, `post-sitemap.xml`, dll) masih tercatat tapi tidak perlu dihapus manual.

**Insight tambahan:** Homepage sudah dapat backlink dari beberapa sumber akademik (springer.com, proquest.com, rua.ua.es) — kemungkinan sitasi riset. Penting dijaga agar redirect tidak memutus otoritas domain ini.

### Langkah Selanjutnya (setelah propagasi DNS Cloudflare selesai — dipantau cron job `cb47db1a1334`)
1. Request Indexing via `gsc_api.py inspect` lalu request index untuk: `/`, `/services`, `/about`, `/contact`, `/case-study`, `/blog`, + 3 artikel blog individual.
2. ~~Setup Cloudflare Redirect Rules untuk 13 mapping URL~~ — **SELESAI 2026-09-07**, lihat Section 7.
3. Pantau ulang status index beberapa hari kemudian.

## 7. Deploy Redirect 301 — SELESAI (2026-09-07)
- File `public/_redirects` (format Cloudflare Pages) berisi 13 rule 301, dibuat & di-push ke `development` lalu merged ke `main`.
- Build `npm run build` dikonfirmasi meng-copy `_redirects` otomatis ke `dist/_redirects` (perilaku standar Astro untuk isi `public/`).
- Deploy manual dijalankan: `npx wrangler pages deploy dist --project-name analyset` — sukses.
  - Deployment URL: `https://7079974c.analyset.pages.dev`
  - Alias: `https://development.analyset.pages.dev`
- **Redirect tervalidasi langsung** dengan `curl -I`:
  - `/home/` → 301 → `/` ✅
  - `/shop/` → 301 → `/services` ✅
- Redirect ini otomatis berlaku juga di domain production `analyset.com` begitu propagasi DNS selesai — tidak perlu deploy ulang saat itu terjadi.
