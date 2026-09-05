# Acceptance Criteria / Checklist QA — Website Analyset

Checklist yang dipakai Arseno untuk approve tiap halaman sebelum dianggap "selesai". Karena tim eksekusi (Hermes agent server lain + OpenCode) bekerja terpisah dari Jarvis, checklist ini WAJIB dicek sebelum melapor progress "done".

## Per-Halaman (ulangi untuk tiap halaman: Home, Services, Case Study, Blog, About, Contact)
- [ ] Konten teks sesuai `content-copy.md` — tidak ada teks karangan baru yang belum direview Arseno.
- [ ] Tidak ada placeholder (Lorem Ipsum, "Coming Soon", gambar dummy) tertinggal.
- [ ] Semua warna pakai token dari `brand-tokens.md` / `tailwind.config.js` — tidak ada hex code custom liar.
- [ ] Font Montserrat termuat dengan benar di semua elemen teks.
- [ ] Logo yang dipakai berasal dari `Design/Logo/` — bukan hasil generate ulang.
- [ ] Responsive: dicek tampilan mobile (< 640px), tablet (~768px), desktop (≥ 1024px) — tidak ada elemen overflow/terpotong.
- [ ] Semua link internal & eksternal berfungsi (tidak ada 404).
- [ ] Heading hierarchy benar (1 H1 per halaman, urutan H2/H3 tidak skip level).
- [ ] Semua gambar punya `alt` text.
- [ ] Meta title & description unik per halaman (sesuai `seo-spec.md`).

## Global / Cross-Page
- [ ] Navbar & Footer konsisten di semua halaman (link, style, logo).
- [ ] `sitemap.xml` & `robots.txt` ter-generate dan bisa diakses.
- [ ] Favicon tampil benar di tab browser.
- [ ] Loading speed wajar (cek via PageSpeed Insights atau Lighthouse — target skor Performance ≥ 80 untuk mobile).
- [ ] Tidak ada console error di browser DevTools.
- [ ] Build Astro sukses tanpa warning/error (`npm run build` clean).
- [ ] Deploy ke Cloudflare Pages berhasil, preview URL bisa diakses.

## Contact Form
- [ ] Form submit berfungsi (perlu keputusan teknis: kirim ke email mana / pakai layanan apa — lihat gap PRD §7 Constraints).
- [ ] Validasi input dasar (email format, field required).

## Sebelum Go-Live (Custom Domain)
- [ ] Preview di `*.pages.dev` sudah direview & di-approve Arseno.
- [ ] DNS record email (MX, SPF, DKIM, DMARC) sudah dibackup SEBELUM migrasi nameserver (lihat brainstorm §6c).
- [ ] Setelah migrasi nameserver ke Cloudflare, verifikasi manual semua record email ter-import benar.
- [ ] Test kirim/terima email @analyset SETELAH propagasi DNS selesai.
- [ ] SSL/HTTPS aktif di domain custom.

## Legal/Konten Sensitif
- [ ] Izin publikasi nama klien "Kopi Kenangan" & angka case study (100 jam/minggu) sudah dikonfirmasi Arseno — TIDAK publish sebelum ini clear.
