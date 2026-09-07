# Analyset Web — Memmory

## Keterangan Isi Folder
Web application untuk **Analyset** (perusahaan konsultan data science, spesialisasi akuntansi & keuangan). Status: **website sudah dibangun** (Astro + Tailwind, 6 halaman + blog + SEO).

## Tech Stack
- Astro (v5, static output)
- Tailwind CSS (v3)
- HTML
- Blog: Astro Content Collections (Markdown)
- Hosting (rencana): Cloudflare Pages

## Repo
- Remote: https://github.com/analysetid/analyset-web.git
- Akun GitHub: analysetid
- Branch: main
- Domain: https://analyset.com (dikonfirmasi)
- Email kontak: central@analyset.com
- WhatsApp: +62 813-6363-754 → https://wa.me/6281363663754

## Deploy (Cloudflare Pages)
- URL produksi: https://analyset.pages.dev
- Project: `analyset` (direct upload, bukan git integration)
- Deploy command: `wrangler pages deploy dist --project-name analyset`
- Cloudflare Account ID: 25855b63b9daf7c14203a15c76d65844
- Token: CLOUDFLARE_API_TOKEN di /opt/data/.env
- Domain custom `analyset.com` SUDAH LIVE (dipasang manual oleh Arseno, dikonfirmasi 2026-09-06) — mengarah ke situs Astro baru, menggantikan WordPress lama.
- ⚠️ Ditemukan 2026-09-06: URL lama WordPress (`/home/`, `/shop/`, `/insight/`, `/articles/`, `/author/...`, dll) saat ini return HTTP 200 dengan konten HOMEPAGE (soft-404 / SPA fallback) alih-alih 404 asli atau redirect 301 — berisiko SEO (duplicate content / soft-404 di Google). Perlu 301 redirect resmi via Cloudflare, lihat brainstorm/migrasi-seo-wordpress-ke-astro.md.

## Isi Folder
- `src/` — source code (pages, layouts, components, content, data, styles)
- `public/` — asset statis (logo, favicon, og-image, robots.txt)
- `docs/` — instruksi lengkap pembuatan website (lihat `docs/Memmory.md`)
- `Design/` — brand guideline & logo (lihat `Design/Memmory.md`)
- `brainstorm/` — arsip historis diskusi (lihat `brainstorm/Memmory.md`)

## Aturan / Instruksi yang Harus Diikuti
1. Baca `Memmory.md` di folder root (`../Memmory.md`) sebelum mulai kerja.
2. Hanya pakai **Astro + HTML + Tailwind CSS** (tanpa framework JS lain) kecuali disetujui user.
3. Konflik aturan parent vs child → konfirmasi ke user aturan mana yang dipakai.
4. Sebelum melakukan operasi apa pun, lakukan `git pull` terlebih dahulu.
5. Setelah melakukan operasi, selalu lakukan `git push` ke branch `development` (bukan `main`).
6. Untuk tugas coding, gunakan **OpenCode** dengan model terbaik yang tersedia saat ini (sekarang: `deepseek-v4-pro`).
7. **WAJIB kerja di branch `development`, JANGAN push langsung ke `main`.** Alur: commit & push ke `development` → Arseno/Jarvis review dulu → kalau OK, merge `development` ke `main`.
8. **KOREKSI PENTING (2026-09-06): Cloudflare Pages project `analyset` TIDAK terhubung ke GitHub** (bukan Git-integrated, `source: null`). Push/merge ke branch mana pun TIDAK memicu auto-deploy. Deploy ke production harus dilakukan MANUAL via `npx wrangler deploy` (atau `wrangler pages deploy`) dari branch yang sudah di-checkout & di-review. **JANGAN jalankan `wrangler deploy` ke production sendiri kecuali diminta eksplisit oleh Arseno/Jarvis.** Integrasi GitHub native ke Cloudflare Pages ditunda dulu (butuh setup OAuth manual di dashboard, belum dilakukan).
9. Untuk perubahan besar (ganti tema, struktur halaman, dsb.), pakai **commit message yang jelas & deskriptif** agar mudah di-review sebelum approve merge ke `main`.
10. **Setiap penambahan page atau perubahan page**, pastikan sitemap & statusnya ter-update di Google Search Console: (a) sitemap Astro auto-regenerate saat build, (b) submit ulang sitemap via GSC API (token `/opt/data/google_search_console_token.json`), (c) inspect URL baru/berubah via URL Inspection API; bila perlu Request Indexing manual di UI.

## Memori Percakapan Terakhir
- [2026-09-05] Website dibangun via OpenCode (deepseek-v4-pro): 6 halaman, 3 artikel blog, SEO lengkap. Desain di-upgrade 2x: (1) nuansa biru elegan, (2) futuristik space-navy + container bubble + glow cyan. Tombol WhatsApp floating + di Contact/Footer (wa.me/6281363663754). Kontak dikonfirmasi: domain analyset.com, email central@analyset.com, WA +62 813-6363-754. Gap tersisa: mekanisme submit form (backend) & izin publikasi "Kopi Kenangan".
