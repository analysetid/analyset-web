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
- Domain placeholder: https://analyset.id (perlu konfirmasi domain asli)

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

## Memori Percakapan Terakhir
- [2026-09-05] Website dibangun via OpenCode (deepseek-v4-pro): 6 halaman (Home, Services, Case Study, Blog list + detail, About, Contact), 3 artikel blog, SEO (sitemap, robots, meta, schema.org, favicon). Build `npm run build` clean (9 halaman). Push ke GitHub (`cc97ae2`). Gap tersisa: email/telepon kontak & mekanisme submit form masih placeholder (perlu data/keputusan Arseno).
