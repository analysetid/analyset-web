# PRD: Website Analyset

Status: **Ready for execution** — dokumen ini adalah brief utama untuk agent eksekutor (Hermes agent server terpisah + OpenCode). Dokumen pendukung lain (brand tokens, sitemap, copy, design system, SEO spec, acceptance criteria) berada di folder `docs/` yang sama — WAJIB dibaca semua sebelum mulai build.

## 1. Ringkasan & Tujuan
Analyset adalah perusahaan konsultan data analytics yang menawarkan 4 layanan: implementasi data analytics, pembuatan model machine learning, automation, dan pengembangan aplikasi — dengan spesialisasi di bidang akuntansi & keuangan, menyasar korporat menengah. Saat ini Analyset belum punya website resmi. Tujuan project ini adalah membangun company website full-scope (bukan sekadar landing page tunggal) yang: (1) mengomunikasikan positioning & layanan Analyset secara profesional, (2) menampilkan flagship case study (Kopi Kenangan) sebagai bukti kredibilitas, (3) SEO-friendly untuk menarik traffic organik jangka panjang via blog, dan (4) mudah di-maintain bersama antara Arseno dan Hermes agent.

## 2. Target User / Persona
**Korporat menengah** (mid-market corporate) — bukan UKM/startup kecil, bukan pula enterprise raksasa. Persona ini biasanya sudah punya data internal tapi kesulitan mengolahnya menjadi insight actionable, dan mencari partner yang paham konteks akuntansi & keuangan (bukan konsultan data generik).

## 3. Scope

### In-scope (harus ada)
- 6 halaman: Homepage, Services, Case Study, Blog (list + detail), About, Contact.
- Struktur & konten sesuai `docs/sitemap.md` dan `docs/content-copy.md`.
- Desain mengikuti brand guideline (`docs/brand-tokens.md`, `docs/design-system.md`) — warna, font, logo dari Brand Guideline resmi.
- Blog berbasis Markdown file di repo (Astro content collections) — bukan headless CMS.
- Contact form fungsional (mekanisme submit — lihat §7 Constraints, perlu keputusan teknis).
- SEO teknis dasar: sitemap.xml, robots.txt, meta tags, schema.org, semantic HTML (detail di `docs/seo-spec.md`).
- Responsive design (mobile, tablet, desktop).
- Deploy ke Cloudflare Pages dengan custom domain (migrasi dari Domainesia).

### Out-of-scope (sengaja tidak dikerjakan dulu)
- Headless CMS / dashboard admin untuk konten (blog cukup via edit file Markdown).
- Multi-bahasa (website hanya Bahasa Indonesia untuk versi awal).
- Fitur akun user/login/member area.
- Integrasi analytics tool spesifik (belum diputuskan — lihat gap).
- Artikel blog dalam jumlah besar di awal launch (strategi & topik blog dibahas terpisah, akan berjalan via cron job Hermes scheduler nanti — lihat brainstorm §7b poin 3).
- Case study tambahan selain Kopi Kenangan (struktur dibuat reusable untuk masa depan, tapi konten awal hanya 1 case study).

## 4. User Flow / Requirements

### Functional Requirements
1. Pengunjung bisa navigasi ke semua 6 halaman via Navbar & Footer, tanpa broken link.
2. Homepage menampilkan ringkasan value proposition, 4 services, 1 case study highlight, dan CTA jelas ke Contact.
3. Halaman Services menjelaskan detail 4 layanan, dengan Model ML ditonjolkan sebagai layanan andalan.
4. Halaman Case Study menampilkan studi kasus Kopi Kenangan format Problem→Solution→Result dengan angka konkret.
5. Halaman Blog menampilkan list artikel (bisa kosong/starter di awal) dan halaman detail per artikel dari file Markdown.
6. Halaman Contact punya form yang bisa dikirim pengunjung dan diterima Analyset (mekanisme: lihat Constraints).
7. Semua konten menggunakan copy final dari `docs/content-copy.md` (bukan karangan bebas agent).

### Development Flow (mengikuti brainstorm §7b poin 1)
1. Requirement (dokumen ini + `docs/`) diserahkan ke Hermes agent eksekutor (server terpisah).
2. Hermes agent tsb mendelegasikan coding ke **OpenCode** dengan model **DeepSeek**.
3. Urutan kerja: bangun kerangka/struktur (wireframe → routing → layout kosong) dulu, baru isi konten & styling detail.
4. Build & preview lokal sebelum push.
5. Push ke repo `analysetid/analyset-web` (branch `main` atau branch preview — lihat open question di §8) → Cloudflare Pages auto-build & deploy.
6. Arseno review hasil di preview URL (`*.pages.dev`) sebelum domain production diarahkan.
7. Setelah approve → migrasi DNS Domainesia ke Cloudflare Pages (custom domain) — ikuti prosedur aman di brainstorm §6c (backup MX/SPF/DKIM/DMARC dulu).

## 5. Success Metrics
⚠️ Belum ada metrik kuantitatif spesifik yang ditentukan Arseno untuk fase awal ini — **[perlu ditentukan user]**. Sebagai baseline minimal yang bisa dipakai untuk fase launch:
- Website live & dapat diakses via custom domain tanpa downtime signifikan di luar migrasi terencana.
- Lighthouse Performance score ≥ 80 (mobile) — lihat `docs/acceptance-criteria.md`.
- Semua acceptance criteria di `docs/acceptance-criteria.md` terpenuhi sebelum dianggap "selesai".
- (Metrik jangka panjang seperti traffic organik/leads dari kontak form bisa ditentukan setelah GA/Search Console terpasang — lihat gap SEO spec.)

## 6. Constraints

### Tech Stack (ditetapkan, sesuai preferensi & keputusan brainstorm)
- **HTML + Astro + Tailwind CSS** — static site, tanpa framework JS client-side besar tambahan.
- Blog: Astro Content Collections dari file Markdown di repo (bukan headless CMS).
- Hosting: **Cloudflare Pages** (build command `npm run build`, output `dist`).
- Font: Montserrat (Google Fonts / self-host via `@fontsource/montserrat` — lihat `docs/seo-spec.md` §6 untuk pertimbangan performa).

### Image Hosting
- **Default (scope kecil, sesuai project ini):** gambar/asset dibundel langsung di repo (`Design/Logo/`, plus asset lain yang akan dibuat), deploy via Cloudflare Pages — gratis, tanpa layanan terpisah.
- Alternatif kalau volume gambar membesar (mis. blog dengan banyak gambar artikel): **Cloudflare R2** (free tier 10GB, zero egress).
- Tidak direkomendasikan Cloudflare Images (paid) untuk scope project ini — belum perlu resize/variant otomatis.

### Tim Eksekusi & Model
- Eksekutor: **Hermes agent di server terpisah** (bukan Jarvis), delegasi coding via **OpenCode** dengan model **DeepSeek** (V3/R1 — versi spesifik dikonfirmasi saat eksekusi).
- Alasan: OpenCode open-source & model-agnostic; DeepSeek jauh lebih murah dari Claude API untuk volume kerja project ini, trade-off reasoning kompleks minim untuk scope static site yang sudah jelas.
- Fallback kalau ada bagian hasil DeepSeek meleset (styling tidak presisi ikut brand guideline, copy kurang natural): gunakan model lebih kuat (Claude/GPT) khusus untuk bagian itu saja.

### Timeline
- **1 minggu**, alokasi ~1 jam/hari (bukan pengerjaan penuh/full-time).

### Repo & Git Workflow
- Repo: `https://github.com/analysetid/analyset-web` (akun `analysetid`, branch `main`).
- **WAJIB `git pull` sebelum mulai kerja, `git push` setelah selesai** (aturan sudah tercatat di `Memmory.md` repo).
- Konten blog Markdown harus bisa diedit baik oleh Hermes agent maupun Arseno langsung via commit ke repo.

### Domain & Email
- Domain sudah ada, terdaftar di **Domainesia**, dan dipakai juga untuk **email perusahaan (@analyset)**.
- Migrasi ke Cloudflare Pages: **Opsi 1 (pindah nameserver penuh ke Cloudflare)** — keputusan final Arseno, menerima risiko downtime email sementara demi kemudahan setup & fitur CDN/security penuh.
- WAJIB ikuti langkah mitigasi sebelum migrasi (backup MX/SPF/DKIM/DMARC record) — detail di brainstorm §6c dan checklist di `docs/acceptance-criteria.md`.

### Design Constraint
- WAJIB ikuti `docs/brand-tokens.md` (warna, font, logo resmi) dan `docs/design-system.md` (komponen, spacing) — tidak boleh improvisasi visual di luar brand guideline.

## 7. Open Questions / Assumptions

**Open questions (perlu jawaban Arseno sebelum/selama eksekusi):**
- [ ] Apakah perlu staging environment/branch preview terpisah sebelum production, atau langsung ke branch `main`/production tiap perubahan?
- [ ] Siapa saja yang pegang akses push git selain Arseno & Hermes agent eksekutor? Apakah konten blog perlu approval sebelum live, atau auto-publish langsung?
- [ ] Mekanisme contact form: kirim ke email langsung (mis. via Cloudflare Pages Functions + email API seperti Resend/SendGrid), atau pakai form service pihak ketiga (mis. Formspree)? **Perlu keputusan teknis sebelum implementasi form.**
- [ ] Nomor telepon/WhatsApp & email kontak resmi untuk halaman Contact.
- [ ] Izin publikasi nama klien "Kopi Kenangan" & angka case study secara terbuka — WAJIB clear sebelum go-live (lihat isu legal/NDA).
- [ ] Tool analytics: GA4, Cloudflare Web Analytics, atau tanpa analytics dulu?
- [ ] Apakah ada kantor fisik Analyset untuk ditampilkan di halaman Contact (peta/alamat)?
- [ ] Apakah section Tim/Founder ditampilkan di halaman About?
- [ ] Frekuensi & mekanisme publikasi blog otomatis via cron (auto-publish vs draft-approval) — dibahas terpisah, belum final.

**Assumptions yang diambil (karena belum dikonfirmasi eksplisit):**
- Website hanya Bahasa Indonesia untuk versi awal (tidak ada toggle multi-bahasa).
- Tidak ada file logo vector (SVG) — export favicon/asset dari PNG raster yang tersedia.
- Copy di `docs/content-copy.md` adalah draft awal berdasarkan brainstorm — beberapa kalimat (terutama Hero headline, Why Analyset) dikarang mengikuti positioning yang sudah dikonfirmasi, TAPI belum direview kata-per-kata oleh Arseno. Agent eksekutor boleh pakai sebagai starting point, namun idealnya Arseno review sebelum publish final.

## 8. Referensi Dokumen Pendukung
Semua di folder `docs/` (repo ini):
1. `docs/brand-tokens.md` — warna, font, logo (ekstrak presisi dari Brand Guideline PDF)
2. `docs/sitemap.md` — struktur halaman & section per halaman
3. `docs/content-copy.md` — teks final siap-pakai per section
4. `docs/design-system.md` — komponen Tailwind reusable (button, card, navbar, footer)
5. `docs/seo-spec.md` — keyword, meta tags, schema.org, technical SEO
6. `docs/acceptance-criteria.md` — checklist QA sebelum halaman/project dianggap selesai

Sumber asli: `brainstorm/brainstorm_website_analyset.md` (histori diskusi lengkap), `Design/Brand Guideline.pdf`, `Design/Logo/*.png`.
