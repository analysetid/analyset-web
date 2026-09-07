# Migrasi SEO: WordPress → Astro (analyset.com)

Status: **Rencana aksi — perlu dieksekusi Arseno di dashboard Cloudflare & Google Search Console.**
Dibuat: 2026-09-06

## Konteks
- Domain `analyset.com` sudah live (dipindah manual) dari WordPress lama ke situs Astro baru.
- Struktur URL berubah total antara WordPress lama dan Astro baru.
- Ditemukan: URL lama saat ini return HTTP 200 dengan konten homepage (soft-404), bukan redirect resmi — ini merusak SEO karena Google akan menganggap sebagai duplicate content / soft-404, dan kehilangan seluruh ranking + backlink yang sudah terbentuk di URL lama.

## 1. Mapping Redirect 301 (URL Lama → URL Baru)

Ditemukan dari pencarian `site:analyset.com` (Google index saat ini):

| URL Lama (WordPress) | Redirect ke (Astro) | Alasan |
|---|---|---|
| `/home/` | `/` | Duplikat homepage |
| `/insight/` | `/blog` | Halaman listing artikel lama → blog baru |
| `/articles/` | `/blog` | Halaman listing artikel lama → blog baru |
| `/shop/` | `/services` | Tidak ada e-commerce lagi di situs baru; diarahkan ke halaman layanan terdekat |
| `/product-category/analyset-mab/` | `/services` | Kategori produk lama → layanan terdekat |
| `/author/krisanputih/` | `/blog` | Situs baru tidak pakai sistem author individual |
| `/under_construction-analyset/` | `/` | Halaman placeholder lama, tidak relevan lagi |
| `/study-case-analyset/` | `/case-study` | Padanan langsung ditemukan di situs baru |
| `/demo-analyset-tools/` | `/services` | Tidak ada demo tools lagi; arahkan ke layanan |

**Catatan penting:** Daftar di atas didasarkan pada 10 hasil teratas index Google saat ini (`site:analyset.com`), BUKAN daftar lengkap seluruh URL yang pernah ada di WordPress. Kemungkinan ada URL lain (kategori, tag, artikel individual lama) yang belum terdeteksi lewat pencarian ini.

**REKOMENDASI:** Sebelum eksekusi final, cek sumber yang lebih lengkap:
- Google Search Console lama → **Coverage report** (menu "Pages" / halaman yang pernah diindex) — ini sumber PALING akurat untuk semua URL yang pernah dikenal Google, lebih lengkap dari sekadar `site:` search.
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

## 5. Status Eksekusi
- [ ] Redirect Rules Cloudflare dibuat untuk semua mapping di atas
- [ ] Verifikasi tiap redirect dengan `curl -I` (301 + location benar)
- [ ] Sitemap baru disubmit ke GSC
- [ ] Request Indexing manual untuk halaman prioritas
- [ ] Cek ulang Coverage report GSC setelah 1-2 minggu untuk validasi
