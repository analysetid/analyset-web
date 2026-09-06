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
- Domain custom `analyset.com` BELUM dipasang (butuh tambah zone + ganti nameserver di Domainesia)

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
5. Setelah melakukan operasi, selalu lakukan `git push` ke server GitHub.
6. Untuk tugas coding, gunakan **OpenCode** dengan model terbaik yang tersedia saat ini (sekarang: `deepseek-v4-pro`).
7. **WAJIB kerja di branch `development`, JANGAN push langsung ke `main`.** Alur: commit & push ke `development` → Arseno/Jarvis review dulu → kalau OK, merge `development` ke `main`.
8. **KOREKSI PENTING (2026-09-06): Cloudflare Pages project `analyset` TIDAK terhubung ke GitHub** (bukan Git-integrated, `source: null`). Push/merge ke branch mana pun TIDAK memicu auto-deploy. Deploy ke production harus dilakukan MANUAL via `npx wrangler deploy` (atau `wrangler pages deploy`) dari branch yang sudah di-checkout & di-review. Integrasi GitHub native ke Cloudflare Pages ditunda dulu (butuh setup OAuth manual di dashboard, belum dilakukan).

## Memori Percakapan Terakhir
- [2026-09-05] Website dibangun via OpenCode (deepseek-v4-pro): 6 halaman, 3 artikel blog, SEO lengkap. Desain di-upgrade 2x: (1) nuansa biru elegan, (2) futuristik space-navy + container bubble + glow cyan. Tombol WhatsApp floating + di Contact/Footer (wa.me/6281363663754). Kontak dikonfirmasi: domain analyset.com, email central@analyset.com, WA +62 813-6363-754. Gap tersisa: mekanisme submit form (backend) & izin publikasi "Kopi Kenangan".
