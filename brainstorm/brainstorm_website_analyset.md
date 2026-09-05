# Brainstorm — Website Analyset

Status: **Brainstorming only — belum ada eksekusi/pembangunan.**
Dokumen ini akan terus diupdate selama sesi diskusi berlangsung agar konteks tidak hilang antar sesi.

---

## 1. Tujuan & Konteks
- Analyset: perusahaan konsultasi data analytics.
- Service utama:
  1. Implementasi data analytics
  2. Pembuatan model machine learning
  3. Automation
  4. Pengembangan aplikasi

## 2. Target Audience / User
- Korporat menengah (mid-market corporate), bukan UKM/startup kecil maupun enterprise raksasa.

## 3. Fitur / Konten yang Dipertimbangkan
- (belum dibahas)

## 4. Model Bisnis / Monetisasi
- (belum dibahas)

## 5. Positioning & Diferensiasi
- Spesialisasi domain: **akuntansi dan keuangan**.
- Layanan andalan/paling laku: **pembuatan model machine learning**.
- Case study unggulan: automation rekonsiliasi untuk **Kopi Kenangan** — memotong **100 jam kerja per minggu**. (bisa jadi flagship case study di website)

## 6. Teknologi (opsi, belum diputuskan)
- Diskusi development dimulai — lihat sub-poin di bawah.
- Preferensi umum Arseno untuk website static: HTML+Tailwind (CDN) sebagai default; upgrade ke Astro+Tailwind bila butuh blog/artikel berkala (SEO-first).
- Pertimbangan untuk Analyset: apakah butuh blog/insight artikel rutin (SEO) → kalau ya, condong ke Astro+Tailwind; kalau cukup company profile + portfolio, HTML+Tailwind CDN sudah cukup.

## 6b. Strategi Pengembangan (Development Strategy)
- **Pendekatan:** Full site sejak awal (bukan MVP landing page tunggal). Halaman: Homepage, Case Study, Blog, **Services, About, Contact** (dikonfirmasi perlu ada).
- **SEO/SEF:** Website harus dioptimasi SEO dan SEF (Search Engine Friendly) — perlu strategi teknis: semantic HTML, meta tags, sitemap.xml, struktur URL bersih, performa loading cepat, structured data (schema.org), dsb. Ini juga alasan blog dibutuhkan (konten berkala untuk SEO).
- **Eksekutor build:** BUKAN Jarvis (agent ini) — akan dieksekusi oleh **Hermes agent baru di server terpisah**, dengan delegasi pekerjaan development memakai **OpenCode** (bukan Claude Code CLI seperti preferensi delegasi coding Arseno biasanya).
  - Diskusi perbandingan tools (lihat 10. Log Diskusi): OpenCode dipilih karena open-source & model-agnostic (bisa pasang model apapun termasuk Claude), cocok dijalankan di server sendiri. Kualitas hasil setara Claude Code CLI ASALKAN model yang dipasang di dalam OpenCode juga Claude Sonnet/Opus — kunci utamanya di pilihan model, bukan tool wrapper-nya.
  - **Model yang direncanakan di OpenCode: DeepSeek** (kemungkinan DeepSeek-V3/R1 — perlu dikonfirmasi versi spesifik saat eksekusi).
    - Evaluasi: DeepSeek adalah model coding yang kuat & kompetitif (terutama DeepSeek-V3/R1), dengan biaya API jauh lebih murah dibanding Claude — cocok untuk task volume tinggi seperti generate banyak halaman/artikel blog.
    - Trade-off vs Claude Sonnet/Opus: DeepSeek umumnya sedikit di bawah Claude untuk reasoning kompleks & instruction-following yang sangat presisi (mis. mengikuti design system/brand guideline secara ketat, menjaga konsistensi tone copywriting), tapi selisihnya tidak besar untuk task coding standar (static site Astro+Tailwind tergolong tidak kompleks secara reasoning).
    - Rekomendasi: DeepSeek sudah memadai untuk project static site ini, terutama karena scope-nya jelas (sudah ada brief/dokumen pendukung) dan tidak butuh reasoning arsitektur rumit. Kalau nanti ada bagian yang hasilnya meleset (styling tidak presisi ikut brand guideline, copy kurang natural), opsi fallback: pakai model lebih kuat (Claude/GPT) khusus untuk bagian itu saja, sisanya tetap DeepSeek untuk efisiensi biaya.
- **Timeline:** 1 minggu, dengan alokasi ~1 jam per hari (bukan pengerjaan penuh/full-time).
- **Urutan kerja:** Fokus desain kerangka (struktur/wireframe/sitemap) dulu, baru konten mengikuti.
- **Stack rencana (diusulkan Arseno, dievaluasi cocok, tidak perlu diganti):**
  - HTML + Astro + Tailwind CSS
  - Static site (bukan dynamic/CMS backend)
  - Hosting/publish: **Cloudflare Pages**
  - Alasan: cocok untuk static site, SEO-friendly, performa tinggi, gratis/murah untuk hosting di Cloudflare Pages.
- **Konten blog:** Markdown file di repo (Astro content collections) — bukan headless CMS. Syarat: harus bisa diupdate oleh Hermes agent maupun Arseno sendiri (langsung edit file .md di repo, commit & push → auto-deploy Cloudflare Pages).
- **Domain:** Sudah ada domain untuk Analyset, terdaftar di **Domainesia** (bukan Cloudflare). Perlu langkah tambahan nanti: arahkan domain ke Cloudflare Pages (ganti nameserver ke Cloudflare, atau update DNS record/CNAME di Domainesia — didetailkan saat tahap eksekusi, bukan brainstorm).
- **Breakdown konten per halaman:** Diperlukan (dikonfirmasi) — nanti dibantu breakdown section per halaman (mis. Homepage: Hero, Services overview, Case study highlight, CTA, dst.) sebagai bagian dari brainstorm sitemap.
- **Strategi konten blog:** Belum ada rencana topik/kategori spesifik saat ini. Rencana ke depan: publikasi artikel blog akan dijalankan via **Hermes scheduler/cron job** (auto-generate & publish artikel berkala) — mekanisme dan topik detail akan dibahas terpisah nanti (bukan bagian brainstorm ini).

## 7. Struktur / Sitemap (draft)
- (belum dibahas)

## 7b. Flow Efisiensi (Development, Update Konten, Publikasi Blog)
- Topik dibuka: mendiskusikan flow paling efisien untuk 3 hal:
  1. **Flow development/eksekusi** — dari brainstorm ini → planning → build oleh Hermes agent terpisah + OpenCode → deploy ke Cloudflare Pages.
  2. **Flow update konten harian** — bagaimana Arseno & Hermes agent sama-sama bisa edit/update Markdown (termasuk blog) tanpa bentrok (git conflict, dsb).
  3. **Flow publikasi blog otomatis** — bagaimana Hermes scheduler/cron nantinya generate & publish artikel berkala ke repo secara otomatis.
- Status: draft usulan awal (belum final, untuk didiskusikan):

### 1. Flow Development/Eksekusi (usulan draft)
1. Brainstorm (dokumen ini) → dirapikan jadi brief/requirement singkat.
2. Requirement diserahkan ke Hermes agent baru (server terpisah) sebagai instruksi kerja.
3. Hermes agent tsb mendelegasikan coding ke **OpenCode** (planning + eksekusi build Astro+Tailwind).
4. Build diuji lokal (preview) sebelum push.
5. Push ke repo Git (GitHub/GitLab) → Cloudflare Pages auto-build & deploy dari branch tsb.
6. Arseno review hasil live preview/staging sebelum domain production diarahkan.
7. Setelah approve → arahkan DNS Domainesia ke Cloudflare Pages (custom domain).
- Pertanyaan terbuka: apakah perlu staging environment terpisah (branch preview) sebelum production, atau langsung ke production tiap perubahan?

### 2. Flow Update Konten (Arseno + Hermes agent, tanpa bentrok)
- Karena basis konten adalah file Markdown di repo Git, potensi konflik best-practice diatasi dengan:
  - Satu source of truth: repo Git (bukan edit manual di server produksi).
  - Hermes agent dan Arseno sama-sama commit ke repo via git (branch terpisah untuk perubahan besar, direct commit ke main untuk perubahan kecil/konten blog).
  - Cloudflare Pages auto-deploy tiap ada push ke branch production.
- Pertanyaan terbuka: siapa yang pegang akses git (siapa saja punya kredensial push), dan apakah perlu review/approval sebelum konten blog live, atau auto-publish langsung?

### 3. Flow Publikasi Blog Otomatis (via Hermes scheduler)
- Rencana kasar: cron job Hermes berjalan berkala (mis. mingguan) → generate draft artikel (topik seputar data analytics/ML/akuntansi-keuangan) → commit file Markdown baru ke repo → Cloudflare Pages auto-deploy.
- Pertanyaan terbuka:
  - Auto-publish langsung tanpa review Arseno, atau draft dulu menunggu approval (mis. dikirim ke Telegram untuk di-approve sebelum commit)?
  - Sumber topik/riset artikel dari mana (SEO keyword research, tren industri, atau bank topik yang disiapkan manual)?
  - Frekuensi publikasi (mingguan/2 mingguan)?

## 6c. Cara Setup Cloudflare (Pages + Domain Domainesia) — penjelasan konsep
Ini penjelasan alur untuk pemahaman brainstorm — belum dieksekusi, akan dijalankan Hermes agent eksekutor nanti.

**A. Setup Cloudflare Pages (hosting static site)**
1. Buat akun Cloudflare (gratis) di dashboard.cloudflare.com kalau belum punya.
2. Hubungkan repo Git (GitHub/GitLab) project Astro ke Cloudflare Pages — pilih menu "Workers & Pages" → "Create" → "Pages" → "Connect to Git" → pilih repo.
3. Set build command: `npm run build` (standar Astro), output directory: `dist` (default Astro).
4. Cloudflare otomatis build & deploy tiap ada push ke branch yang dipilih (biasanya `main`) → dapat URL sementara (mis. `analyset.pages.dev`).

**B. Menghubungkan domain existing (Domainesia) ke Cloudflare Pages**
Ada 2 opsi umum:
- **Opsi 1 — Pindahkan Nameserver ke Cloudflare (direkomendasikan, lebih mudah & dapat fitur Cloudflare penuh seperti CDN/SSL/security):**
  1. Tambahkan domain di Cloudflare (menu "Add a Site" → masukkan nama domain Analyset).
  2. Cloudflare akan memberi 2 nameserver baru (mis. `xxx.ns.cloudflare.com`).
  3. Login ke akun Domainesia → cari menu "Nameserver"/"DNS Management" pada domain tsb → ganti nameserver ke yang diberikan Cloudflare.
  4. Tunggu propagasi DNS (bisa beberapa jam hingga 24-48 jam).
  5. Setelah aktif di Cloudflare, tambahkan domain custom tsb ke project Cloudflare Pages (menu Pages → project → "Custom domains" → tambahkan domain).
- **Opsi 2 — Tetap di Domainesia, cukup ubah DNS record (CNAME) tanpa pindah nameserver:**
  1. Di Cloudflare Pages, dapatkan target CNAME yang diberikan (mis. `analyset.pages.dev`).
  2. Login Domainesia → DNS Management → tambahkan record CNAME (untuk subdomain seperti `www`) mengarah ke target tsb.
  3. Untuk root domain (apex, tanpa www), Domainesia perlu support "CNAME flattening" atau pakai record ALIAS/ANAME kalau tersedia — kalau tidak, biasanya root domain diarahkan pakai fitur "URL Forwarding" ke `www`, atau opsi 1 (pindah nameserver) lebih simpel untuk kasus ini.
  - Kelebihan: tidak perlu pindah nameserver, keep pengaturan DNS lain di Domainesia. Kekurangan: sedikit lebih rumit untuk root domain, tidak dapat fitur keamanan/CDN penuh dari Cloudflare.
- **Rekomendasi:** Opsi 1 (pindah nameserver) lebih simpel dan direkomendasikan mayoritas panduan, KECUALI ada layanan lain (email, subdomain lain) yang masih bergantung pada DNS Domainesia dan tidak mau diganggu — dalam kasus itu, opsi 2 lebih aman.

**C. Setelah domain aktif**
- Cloudflare otomatis provision SSL certificate gratis (HTTPS) untuk domain custom.
- Update DNS record lain (email MX record dsb, kalau Analyset pakai email @domain sendiri) — pastikan tidak terhapus saat migrasi ke Cloudflare (perlu dicek & disalin manual kalau pindah nameserver).

**Pertanyaan terbuka:** Apakah domain Analyset saat ini juga dipakai untuk email perusahaan (mis. via Domainesia atau Google Workspace)? Ini penting dicek SEBELUM pindah nameserver, supaya email tidak terganggu.

**JAWABAN (dikonfirmasi Arseno): YA, domain dipakai untuk email perusahaan (@analyset).**
- Implikasi: migrasi nameserver ke Cloudflare (Opsi 1) TIDAK BOLEH sembarangan — wajib catat/backup dulu semua DNS record terkait email SEBELUM pindah nameserver, terutama:
  - **MX record** (mail exchange — menentukan server penerima email)
  - **SPF record** (TXT record, mencegah email dianggap spam)
  - **DKIM record** (TXT record, autentikasi email)
  - **DMARC record** (TXT record, kebijakan anti-spoofing)
- Langkah aman yang direkomendasikan:
  1. Sebelum ganti nameserver, login Domainesia (atau provider email jika beda, mis. Google Workspace/Zoho) → catat SEMUA DNS record yang ada saat ini (screenshot/export).
  2. Setelah domain ditambahkan ke Cloudflare, sebelum mengaktifkan nameserver Cloudflare, Cloudflare biasanya otomatis men-scan & mengimpor DNS record yang ada — TETAP WAJIB diverifikasi manual bahwa semua record email (MX, SPF, DKIM, DMARC) sudah terbawa dengan benar.
  3. Baru aktifkan pindah nameserver setelah yakin semua record email sudah ada di Cloudflare.
  4. Test kirim/terima email setelah propagasi selesai, sebelum menganggap migrasi selesai.
- **Alternatif lebih aman kalau ragu:** pakai Opsi 2 (tetap nameserver di Domainesia, cuma tambah CNAME untuk subdomain website, mis. `www.analyset.xx` atau subdomain khusus) — supaya DNS email di Domainesia sama sekali tidak tersentuh. Trade-off: tidak dapat fitur CDN/security penuh dari Cloudflare untuk domain root, dan pengaturan agak lebih rumit untuk root domain (apex).

**KEPUTUSAN ARSENO: Tidak masalah kalau ada downtime email sementara.** → Pilih **Opsi 1 (pindah nameserver penuh ke Cloudflare)** — lebih simpel, dapat fitur CDN/SSL/security penuh. Tetap ikuti langkah aman (backup record dulu, verifikasi MX/SPF/DKIM/DMARC ter-import benar, test email setelah propagasi) untuk MEMINIMALKAN downtime, tapi risiko downtime sementara bisa diterima kalau memang terjadi.

## 8. Pertanyaan Terbuka
- ~~Apakah domain Analyset dipakai juga untuk email perusahaan?~~ **SUDAH DIJAWAB: Ya, pakai @analyset — lihat mitigasi di bagian 6c.**
- Apakah perlu staging environment terpisah sebelum production? (lihat 7b poin 1)
- Siapa saja yang pegang akses push git, dan apakah konten blog perlu approval sebelum live? (lihat 7b poin 2)
- Auto-publish blog langsung atau draft menunggu approval? Sumber topik dari mana? Frekuensi publikasi? (lihat 7b poin 3)

## 9. Keputusan Sementara
- (belum ada)

## 9b. Dokumen Pendukung Selain PRD (agar hasil desain sesuai keinginan)
Supaya Hermes agent + OpenCode menghasilkan desain yang sesuai ekspektasi (bukan cuma "asal jadi"), PRD saja biasanya kurang cukup — PRD fokus ke *apa* yang dibangun & requirement fungsional, tapi minim panduan visual/konten detail. Dokumen tambahan yang biasanya diperlukan:

1. **Brand Guideline / Design Brief ringkas**
   - Logo (kalau sudah ada), palet warna, tipografi, tone visual (mis. profesional-korporat vs modern-tech), referensi situs consultancy lain yang disukai (moodboard/inspirasi).
   - Tanpa ini, agent AI akan menebak warna & gaya sendiri → hasil sering meleset dari ekspektasi brand.
   - **STATUS: SUDAH ADA** — Analyset sudah punya Brand Guideline dalam format PDF. Ini tidak masalah/cukup, TAPI perlu langkah tambahan sebelum diserahkan ke Hermes agent/OpenCode:
     - PDF perlu diekstrak jadi referensi yang bisa diakses & dipakai konsisten oleh agent (mis. hex code warna, nama font, spacing rules) — bisa diringkas jadi file terpisah (mis. `brand-tokens.md` atau `tailwind.config` awal) supaya tidak perlu baca ulang PDF tiap kali, dan supaya nilai (warna/font) presisi dipakai di kode (bukan cuma "kira-kira mirip").
     - Pastikan PDF mencakup: logo (format vector/SVG kalau ada, bukan cuma raster di PDF), palet warna (hex code, bukan cuma visual), font family + fallback web-safe/Google Fonts, dan spacing/style rules dasar (kalau PDF hanya berisi logo & warna, poin font-web dan spacing tetap perlu dilengkapi terpisah).
   - Action item: taruh file PDF brand guideline ini di folder project (mis. `analyset_web/Design/`) agar bisa diakses Hermes agent lain saat eksekusi.

2. **Sitemap & Wireframe/Content Outline per halaman**
   - Sudah mulai dibahas di bagian 7 (belum diisi). Ini menentukan section apa saja di tiap halaman (Hero, Services, Case Study highlight, dst) SEBELUM styling — mencegah agent asal susun layout.

3. **Content/Copy Document (copywriting)**
   - Draft teks final tiap section: headline, sub-headline, deskripsi layanan, isi case study Kopi Kenangan (angka, before-after, testimoni kalau ada), CTA text.
   - Kalau agent yang mengarang sendiri kontennya, risiko: klaim tidak akurat/tidak sesuai data asli Analyset.
   - **PENJELASAN & CARA BUAT:**
     - **Apa itu:** Dokumen (bisa Word/Markdown/Google Docs) berisi SEMUA teks final yang akan tampil di website, disusun per halaman → per section. Bukan draft kasar, tapi teks yang sudah final/siap-pakai (headline, body text, button label, dll). Tujuannya: agent build tinggal "menempel" teks, bukan mengarang sendiri.
     - **Cara buat (langkah praktis):**
       1. Ambil sitemap/wireframe (section per halaman) yang sudah/akan dibuat di bagian 7.
       2. Untuk tiap section, isi slot teks yang dibutuhkan. Contoh Homepage - Hero: Headline (1 kalimat value proposition), Sub-headline (1-2 kalimat penjelasan), CTA button text (mis. "Konsultasi Gratis").
       3. Untuk Case Study Kopi Kenangan: ceritakan format Problem → Solution → Result dengan angka konkret (100 jam/minggu, before-after jika ada, testimoni jika ada izin pakai nama/logo Kopi Kenangan — perlu dicek izin publikasi nama klien).
       4. Untuk Services (4 layanan: data analytics, ML, automation, app dev): tiap layanan idealnya punya 1 paragraf deskripsi + 3-5 bullet manfaat/fitur.
       5. Review tone: pastikan konsisten "profesional-korporat, data-driven" (sesuai spesialisasi akuntansi-keuangan) di semua bagian.
     - **Siapa yang isi:** Idealnya Arseno (pemilik data/fakta perusahaan) menulis draft kasar poin-poin kunci per section, lalu Jarvis/Hermes agent membantu merapikan jadi kalimat final — supaya klaim & angka tetap akurat (bukan karangan AI).

4. **Design System / Component Spec (untuk Astro+Tailwind)**
   - Daftar komponen reusable & style-nya: button style, card style, spacing scale, breakpoint responsive, dark/light mode (kalau ada).
   - Bisa berupa Tailwind config file + style guide singkat, supaya konsisten di semua halaman & tidak "acak" antar halaman yang dibuat bertahap oleh agent berbeda-beda sesi.
   - **PENJELASAN & CARA BUAT:**
     - **Apa itu:** "Kamus" elemen visual berulang di website — supaya button di Homepage sama persis gayanya dengan button di halaman Blog, card Services sama gayanya dengan card Case Study, dst. Tanpa ini, tiap halaman yang dibuat di sesi terpisah (1 jam/hari selama seminggu) berisiko punya gaya sedikit beda-beda (efek "Frankenstein site").
     - **Isi minimal yang perlu didefinisikan:**
       - **Warna:** primary, secondary, accent, neutral/gray scale, warna teks, warna background — dalam hex code (diambil dari Brand Guideline PDF).
       - **Tipografi:** font untuk heading vs body, ukuran (h1/h2/h3/body/small), font-weight, line-height.
       - **Spacing scale:** jarak antar section, padding card/button (biasanya pakai skala Tailwind default: 4px/8px/16px/24px/32px, dst — tidak perlu didefinisikan ulang kalau pakai default Tailwind).
       - **Komponen reusable:** tombol (primary/secondary/outline), card (untuk service/case study/blog post), navbar, footer, form input (untuk contact form).
       - **Breakpoint responsive:** mobile/tablet/desktop (Tailwind sudah punya default: sm/md/lg/xl — biasanya cukup pakai ini).
     - **Cara buat (langkah praktis):**
       1. Ekstrak hex code warna & nama font dari Brand Guideline PDF (lihat poin 1) → jadi 1 file `brand-tokens.md` atau langsung isi ke `tailwind.config.js`.
       2. Definisikan skala heading (h1-h6) dan body text sekali di config Tailwind — otomatis konsisten di semua halaman karena pakai class Tailwind yang sama.
       3. Buat daftar pendek komponen yang akan dipakai berulang (button, card, navbar, footer) dengan 1-2 baris deskripsi style tiap komponen (mis. "Button primary: background warna primary, rounded-lg, padding px-6 py-3, hover sedikit lebih gelap").
       4. Simpan sebagai file `tailwind.config.js` (kode, langsung dipakai) + `design-system.md` (dokumentasi ringkas, untuk referensi manusia/agent).
     - **Siapa yang buat:** Bisa langsung dikerjakan Hermes agent eksekutor/OpenCode berdasarkan Brand Guideline PDF (poin 1) — cukup teknis, tidak perlu banyak input manual dari Arseno selain approve hasil ekstraksi warnanya sudah benar.

5. **SEO/Technical Spec**
   - Daftar target keyword utama per halaman, struktur meta title/description, struktur URL, requirement schema.org (Organization, Article untuk blog), sitemap.xml, robots.txt.
   - Ini teknis tapi krusial karena SEO jadi requirement eksplisit di brainstorm ini.

6. **Acceptance Criteria / Checklist QA**
   - Checklist yang dipakai Arseno untuk approve tiap halaman sebelum dianggap "selesai" (mis. responsive di mobile, loading speed, semua link berfungsi, konten sesuai copy doc, tidak ada placeholder lorem ipsum tertinggal).
   - Ini mencegah "keliatannya jadi" padahal ada yang kurang, terutama karena tim eksekusi (Hermes agent + OpenCode) bekerja terpisah dari Jarvis.

**Prioritas urutan pembuatan (usulan):** Brand Guideline → Sitemap/Wireframe → Content/Copy Doc → PRD (menggabungkan semua requirement teknis+fungsional) → Design System/Component Spec → SEO Spec → Acceptance Criteria.
- Status: usulan, belum diputuskan mana yang benar-benar akan dibuat.

## 10. Log Diskusi (ringkasan tanya-jawab)
- Q: Analyset perusahaan apa? → A: Konsultasi data analytics dengan 4 lini layanan: implementasi data analytics, pembuatan model machine learning, automation, pengembangan aplikasi.
- Q: Target audience, layanan andalan, portfolio? → A: Target = korporat menengah. Layanan paling laku = pembuatan model ML. Spesialis di bidang akuntansi & keuangan. Sudah ada case study nyata: automation rekonsiliasi Kopi Kenangan, memotong 100 jam kerja/minggu.
- Q: Strategi pengembangan (approach, eksekutor, timeline, urutan kerja, stack)? → A:
  1. Full site (Homepage, Case Study, Blog), harus SEO & SEF optimized.
  2. Eksekusi oleh Hermes agent baru di server terpisah, delegasi development memakai OpenCode (bukan Claude Code CLI).
  3. Timeline: 1 minggu, ~1 jam/hari.
  4. Urutan kerja: desain kerangka/struktur dulu, baru konten.
  5. Stack diusulkan: HTML + Astro + Tailwind, static site, publish via Cloudflare Pages — masih open untuk usulan alternatif.
- Q: Halaman lengkap, CMS blog, domain? → A:
  1. Ya, perlu tambahan halaman Services, About, Contact selain Homepage/Case Study/Blog.
  2. Blog pakai Markdown file saja (Astro content collections), bukan headless CMS — syarat penting: Hermes agent DAN Arseno harus bisa update konten.
  3. Domain sudah ada tapi terdaftar di provider lain (bukan Cloudflare) — perlu penyesuaian DNS/nameserver saat deploy ke Cloudflare Pages.
- Q: Provider domain, breakdown konten per halaman, strategi konten blog? → A:
  1. Domain terdaftar di **Domainesia**.
  2. Ya, perlu dibantu breakdown section per halaman (nanti di bagian sitemap detail).
  3. Belum ada rencana topik blog — akan menggunakan **Hermes scheduler/cron job** untuk publikasi artikel berkala ke depannya (detail dibahas terpisah nanti).
- Q: Flow paling efisien untuk development/update konten/publikasi blog? → A: Dibahas 3 flow draft (development-eksekusi, update konten tanpa bentrok, publikasi blog otomatis) — lihat bagian 7b. Masih ada pertanyaan terbuka di masing-masing flow yang belum dijawab.
- Q: Selain PRD, dokumen apa lagi yang dibutuhkan agar hasil desain sesuai keinginan? → A: Diusulkan 6 dokumen pendukung — Brand Guideline/Design Brief, Sitemap & Wireframe, Content/Copy Document, Design System/Component Spec (Tailwind), SEO/Technical Spec, Acceptance Criteria/Checklist QA. Urutan prioritas pembuatan diusulkan: Brand Guideline → Sitemap/Wireframe → Content/Copy Doc → PRD → Design System → SEO Spec → Acceptance Criteria. Lihat bagian 9b — belum diputuskan mana yang akan dibuat.
- Q: Brand guideline sudah ada dalam PDF, apakah masalah? → A: Tidak masalah, format PDF valid. Yang perlu dilakukan: ekstrak nilai presisi (hex color, font name) ke file ringkas terpisah agar konsisten dipakai lintas sesi agent; cek kelengkapan isi (logo vector/SVG, hex code, font web-safe/Google Fonts, spacing rules); taruh file PDF di folder project (`analyset_web/Design/`) agar bisa diakses Hermes agent eksekutor.
- Q: Apakah ada tools lebih baik dari OpenCode untuk eksekusi coding? → A: Dibandingkan dengan Claude Code CLI, Codex CLI, dan Aider. Kesimpulan: OpenCode dipilih tepat karena open-source & model-agnostic (bisa pasang model apapun, termasuk Claude), cocok dijalankan di server sendiri. Kualitas hasil praktis setara Claude Code CLI SELAMA model yang dipasang di dalam OpenCode adalah Claude Sonnet/Opus — perbedaan kualitas ditentukan model di baliknya, bukan tool wrapper. Belum dikonfirmasi model apa yang akan dipakai di OpenCode server terpisah tsb.
- Q: Model yang akan dipasang di OpenCode? → A: Rencana pakai **DeepSeek** (V3/R1). Evaluasi: cukup kuat & jauh lebih murah dari Claude, cocok untuk task volume tinggi (banyak halaman/artikel). Trade-off: sedikit di bawah Claude untuk reasoning kompleks/instruction-following ketat (brand guideline, tone copy), tapi untuk static site Astro+Tailwind dengan scope jelas ini sudah memadai. Fallback kalau ada hasil meleset: pakai Claude/GPT khusus bagian itu saja.
- Q: Apa itu Design System & Content/Copy Document, dan bagaimana cara membuatnya? → A: Dijelaskan detail di bagian 9b poin 3 (Copy Doc) & poin 4 (Design System).
  - **Copy Doc** = dokumen berisi SEMUA teks final tiap halaman/section (headline, body, CTA), bukan draft kasar — supaya agent build tinggal pasang teks, bukan mengarang. Cara buat: ambil sitemap section → isi tiap slot teks → khusus case study pakai format Problem→Solution→Result dengan angka riil → review tone konsisten. Idealnya Arseno isi poin kunci, Jarvis/agent merapikan kalimat.
  - **Design System** = "kamus" elemen visual berulang (warna, font, spacing, komponen button/card/navbar/footer) supaya konsisten di semua halaman meski dibuat bertahap di sesi berbeda. Cara buat: ekstrak hex/font dari Brand Guideline PDF → definisikan skala heading/body di Tailwind config → daftar style komponen reusable → simpan sebagai `tailwind.config.js` + `design-system.md`. Bisa dikerjakan teknis oleh Hermes agent/OpenCode berdasar Brand Guideline PDF, minim input manual Arseno.
- Q: Mana lebih murah, langganan Claude Max atau DeepSeek API? → A: (data harga per Sept 2026, via web search)
  - **Claude Max:** flat subscription, Max 5x = $100/bulan, Max 20x = $200/bulan (bukan per-token, ada usage cap/limit per sesi 5 jam, termasuk akses Claude Code).
  - **DeepSeek API:** pay-per-token, V3 ≈ $0.27/1M token input, $1.10/1M token output (cache hit lebih murah lagi, ≈$0.07/1M); model V4 Flash lebih murah lagi (~$0.14 input/$0.28 output per 1M token).
  - **Untuk scope project ini (build website 1 minggu, ~1 jam/hari = total ~7 jam kerja):** DeepSeek API HAMPIR PASTI JAUH LEBIH MURAH. Estimasi kasar: proyek sekelas static site (belasan file, iterasi wajar) kemungkinan hanya memakai beberapa juta token total → biaya realistis di kisaran puluhan ribu-ratusan ribu rupiah, jauh di bawah $100/bulan langganan Max.
  - **Kapan Claude Max lebih worth it:** kalau dipakai INTENSIF & TERUS-MENERUS lintas banyak project/bulan (bukan cuma 1 project seminggu) — karena itu flat fee, biaya per-penggunaan jadi makin murah kalau volume sangat tinggi & rutin. Untuk kebutuhan sesekali/1 project pendek seperti website Analyset ini, pay-per-use (DeepSeek API) jauh lebih efisien.
  - **Kesimpulan:** DeepSeek API adalah pilihan lebih murah untuk kebutuhan project ini — sejalan dengan keputusan sebelumnya (poin 6b) yang sudah memilih DeepSeek untuk OpenCode.
- Q: Bagaimana cara setup Cloudflare (Pages + domain Domainesia)? → A: Dijelaskan alur konsep di bagian 6c (belum dieksekusi, murni penjelasan untuk brainstorm).
- Q: Domain dipakai untuk email juga? → A: Ya, pakai email @analyset. Ini penting: migrasi nameserver ke Cloudflare wajib backup dulu record MX/SPF/DKIM/DMARC sebelum pindah, verifikasi manual semua record email terbawa benar, baru pindah nameserver, lalu test kirim/terima email. Kalau ragu, alternatif lebih aman: tetap di nameserver Domainesia, cukup tambah CNAME untuk subdomain website saja (DNS email sama sekali tidak disentuh).
- Q: Bagaimana kalau ada risiko downtime email saat migrasi? → A: **Arseno tidak masalah dengan downtime.** Keputusan final: pakai Opsi 1 (pindah nameserver penuh ke Cloudflare), bukan Opsi 2 (CNAME saja). Tetap disarankan ikuti langkah mitigasi (backup record, verifikasi, test) untuk minimalkan downtime, tapi ini bukan syarat mutlak.

## 11. Progress Eksekusi — Dokumen PRD & Pendukung (2026-09-05)

Brainstorm ini sudah dituangkan jadi dokumen kerja siap-eksekusi. Status: **brainstorming SELESAI untuk fase ini, sudah masuk fase dokumentasi/handoff ke agent eksekutor.**

**Apa yang sudah dikerjakan:**
1. Repo `analysetid/analyset-web` (akun GitHub `analysetid`, branch `main`) di-clone ke `Analyset/analyset-web/` lokal.
2. File brainstorm ini di-copy ke `analyset-web/brainstorm/` dan sudah di-push ke repo.
3. Repo remote sudah berisi kontribusi dari agent eksekusi server lain: `Memmory.md` (root, `Design/`, `brainstorm/`) — berisi aturan kerja utk agent eksekutor (baca parent Memmory dulu, hanya pakai Astro+HTML+Tailwind, wajib git pull sebelum kerja & git push sesudah kerja, model coding: `deepseek-v4-pro` via OpenCode), dan asset `Design/Brand Guideline.pdf` + `Design/Logo/*.png` (5 file logo) sudah tersedia di repo.
4. Brand Guideline PDF diekstrak jadi data presisi: warna primary `#3069B4` (RGB 48,105,180), secondary `#2B4EA2` (RGB 43,78,162), neutral light `#FAFAFA`, neutral dark `#232323`; font **Montserrat**; logo bertema bar-chart gradient biru.
5. Berdasarkan brainstorm ini + Brand Guideline + Logo, dibuat 7 dokumen kerja di `analyset-web/docs/` (sudah di-commit & push, commit `1b98585`):
   - `PRD.md` — dokumen utama, brief final untuk agent eksekutor (tujuan, scope, requirements, constraints, open questions).
   - `brand-tokens.md` — warna hex presisi, font, aturan pemakaian 5 file logo.
   - `sitemap.md` — 6 halaman (Home, Services, Case Study, Blog, About, Contact) + breakdown section per halaman + struktur URL.
   - `content-copy.md` — draft teks final tiap section (beberapa bagian ditandai `[DRAFT]`, perlu review Arseno).
   - `design-system.md` — Tailwind config siap pakai (colors, font, komponen button/card/navbar/footer).
   - `seo-spec.md` — target keyword awal, meta tags, schema.org, sitemap.xml/robots.txt, performa.
   - `acceptance-criteria.md` — checklist QA per-halaman & global, termasuk checklist migrasi domain/email.

**Gap yang masih butuh keputusan/data dari Arseno (belum di-input, jangan dikarang):**
- Nomor telepon/WhatsApp & email kontak resmi Analyset (untuk halaman Contact).
- **Izin publikasi nama klien "Kopi Kenangan" + angka 100 jam/minggu di halaman publik** — cek kontrak/NDA dulu, ini prioritas tinggi sebelum go-live.
- Mekanisme teknis contact form (Cloudflare Pages Functions + email API vs Formspree/pihak ketiga lain).
- Tool analytics: GA4 / Cloudflare Web Analytics / tanpa analytics dulu.
- Apakah perlu staging/branch preview terpisah sebelum production.
- Review isi `content-copy.md` yang ditandai `[DRAFT]` (terutama Hero headline & Why Analyset — dikarang berdasar brainstorm, belum kalimat resmi Arseno).
- Apakah ada kantor fisik untuk ditampilkan, dan apakah section Tim/Founder ditampilkan di About.

**Next step:** dokumen `docs/` sudah siap dipakai sebagai brief oleh Hermes agent eksekutor di server terpisah (delegasi ke OpenCode + DeepSeek). Fase berikutnya: agent eksekutor mulai build kerangka/struktur situs (Astro + Tailwind) mengikuti `sitemap.md`, lalu isi konten & styling sesuai `content-copy.md` + `design-system.md`.

---
*Terakhir diupdate: 2026-09-05 — PRD & dokumen pendukung selesai dibuat dan di-push ke repo `analysetid/analyset-web`.*
