# Design System — Website Analyset (Tailwind)

"Kamus" elemen visual reusable agar semua halaman konsisten, meski dibangun bertahap (~1 jam/hari selama 1 minggu) lintas sesi agent berbeda.

## 1. Warna (Tailwind config)
Gunakan nilai presisi dari `brand-tokens.md` — jangan improvisasi warna baru.

```js
// tailwind.config.js (potongan relevan)
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#3069B4',
        dark: '#2B4EA2',   // dipakai untuk hover/gradient akhir
      },
      neutral: {
        light: '#FAFAFA',
        dark: '#232323',
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    backgroundImage: {
      'brand-gradient': 'linear-gradient(135deg, #3069B4 0%, #2B4EA2 100%)',
    },
  },
}
```

## 2. Tipografi Scale
| Elemen | Ukuran (Tailwind) | Weight |
|---|---|---|
| H1 (hero headline) | `text-4xl md:text-5xl lg:text-6xl` | `font-bold` (700) |
| H2 (section title) | `text-3xl md:text-4xl` | `font-semibold` (600) |
| H3 (card title) | `text-xl md:text-2xl` | `font-semibold` (600) |
| Body | `text-base md:text-lg` | `font-normal` (400) |
| Small/caption | `text-sm` | `font-normal` (400) |

Line-height: gunakan default Tailwind (`leading-normal` untuk body, `leading-tight` untuk heading besar).

## 3. Spacing Scale
Pakai skala default Tailwind (4px increment) — tidak perlu didefinisikan ulang.
- Section padding vertikal: `py-16 md:py-24`
- Container max-width: `max-w-7xl mx-auto px-4 md:px-8`
- Gap antar card dalam grid: `gap-6 md:gap-8`

## 4. Komponen Reusable

### Button
- **Primary:** `bg-primary text-white rounded-lg px-6 py-3 font-medium hover:bg-primary-dark transition-colors`
- **Outline/Secondary:** `border-2 border-primary text-primary rounded-lg px-6 py-3 font-medium hover:bg-primary hover:text-white transition-colors`
- **Gradient (CTA hero, opsional lebih menonjol):** `bg-brand-gradient text-white rounded-lg px-6 py-3 font-medium hover:opacity-90 transition-opacity`

### Card
- Base: `bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow`
- Border tipis opsional: `border border-gray-100`
- Dipakai untuk: Service card, Case Study card, Blog post card

### Navbar
- Sticky top, background putih/transparan-blur saat scroll: `sticky top-0 bg-white/90 backdrop-blur z-50`
- Logo kiri (`Analyset - Logo & Brand.png`), menu tengah/kanan, CTA button primary di ujung kanan.
- Mobile: hamburger menu (breakpoint `md`).

### Footer
- Background: `bg-neutral-dark text-white` (atau `bg-gray-900` kalau ingin sedikit beda dari neutral-dark brand)
- 3-4 kolom (Logo+tagline, Layanan, Perusahaan, Kontak) → `grid grid-cols-1 md:grid-cols-4 gap-8`

### Form Input (Contact)
- `border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none w-full`

## 5. Breakpoint Responsive
Gunakan default Tailwind:
- `sm`: 640px, `md`: 768px, `lg`: 1024px, `xl`: 1280px
- Mobile-first: semua komponen didesain mobile dulu, baru ditambah class `md:`/`lg:` untuk desktop.

## 6. Aturan Konsistensi Lintas Sesi
Karena development dilakukan ~1 jam/hari selama 1 minggu (berpotensi sesi berbeda), agent WAJIB:
1. Selalu baca file ini sebelum membuat halaman baru — jangan improvisasi style baru di luar yang terdefinisi di sini.
2. Kalau butuh komponen baru yang belum ada di sini (mis. accordion FAQ), tambahkan definisinya ke file ini dulu sebelum dipakai, agar halaman berikutnya konsisten.
3. Semua warna WAJIB pakai token dari `tailwind.config.js` (`primary`, `primary-dark`, `neutral-light`, `neutral-dark`) — jangan pakai hex code custom langsung di class (`bg-[#1234ab]`) kecuali extreme edge case yang dicatat di sini.
