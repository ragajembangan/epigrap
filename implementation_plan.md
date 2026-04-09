# Epigrap.com — Fase 1: Landing Page & Halaman Legal

Platform SaaS Premium "Phygital" yang menghubungkan monumen fisik dengan arsip sejarah digital abadi. Fase 1 berfokus pada landing page pitching-ready dengan 7 seksi utama + halaman legal.

## User Review Required

> [!WARNING]
> **Node.js perlu di-upgrade ke v22+.** Versi Node.js saat ini adalah **v20.9.0** yang sudah tidak didukung oleh Astro terbaru. Anda perlu meng-upgrade Node.js ke versi 22 atau lebih tinggi sebelum kita mulai scaffolding. Jika Anda menggunakan `nvm`, jalankan: `nvm install 22` lalu `nvm use 22`.

> [!IMPORTANT]
> **Clerk & Sanity belum dikonfigurasi di fase ini.** Karena scope fase 1 hanya landing page dan halaman legal, saya **tidak** akan menginstal SDK Clerk atau Sanity. Tombol "Masuk / Dasbor Pribadi" akan mengarah ke `/dasbor` dengan halaman placeholder. Integrasi Clerk & Sanity akan dilakukan di fase berikutnya. Apakah setuju?

## Keputusan Teknis yang Sudah Final

| Keputusan | Pilihan |
|---|---|
| Framework | Astro (SSR-ready) |
| Deployment | Cloudflare Pages |
| Autentikasi | Clerk (fase 2) |
| CMS | Sanity (fase 2) |
| Bahasa | Bahasa Indonesia saja |
| Aset Foto | Unsplash (URL placeholder) |
| Tekstur/BG | CSS Gradients & SVG Patterns |
| Registrasi | White-Glove / Eksklusif (form reservasi) |

## Proposed Changes

### 1. Scaffolding & Konfigurasi Proyek

#### [NEW] Folder `epigrap/`
- Inisialisasi proyek Astro baru di `c:\Users\lohji\.gemini\antigravity\scratch\epigrap`
- Menggunakan `create-astro` dengan template minimal, TypeScript strict
- Inisialisasi Git repository

#### [NEW] [package.json](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/package.json)
- Dependencies: `astro`, `@astrojs/cloudflare`
- Dev dependencies: (minimal, sesuai kebutuhan Astro)

#### [NEW] [astro.config.mjs](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/astro.config.mjs)
- Output: `server` (SSR via Cloudflare)
- Adapter: `@astrojs/cloudflare`

#### [NEW] [tsconfig.json](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/tsconfig.json)
- TypeScript strict mode

---

### 2. Design System (CSS)

#### [NEW] [global.css](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/styles/global.css)
Fondasi visual seluruh situs:
- **CSS Custom Properties**: Semua token warna, tipografi, spacing
  - `--color-obsidian: #0A0A0A`, `--color-granite: #121212`, `--color-parchment: #F5F5F0`
  - `--color-brass: #C5A059`, `--color-velvet: #7A101A`
- **Google Fonts**: Import `Cinzel` (heading) + `Inter` (body)
- **Reset & Base Styles**: Box-sizing, smooth scrolling, body defaults
- **Utility Classes**: Kontainer, grid, spacing helpers
- **CSS Textures**: Dark marble gradients, subtle geometric SVG patterns (inline CSS, bukan file gambar)

---

### 3. Layout & Komponen Global

#### [NEW] [BaseLayout.astro](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/layouts/BaseLayout.astro)
- HTML shell dengan SEO meta tags (title, description, OG tags)
- Slot untuk konten halaman
- Import global.css

#### [NEW] [Navbar.astro](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/components/Navbar.astro)
- Sticky navbar, transparan → Dark Granite saat scroll (JS minimal)
- Logo "EPIGRAP" dengan font Cinzel berwarna Brass
- Menu: Filosofi, Solusi Keluarga, Solusi Institusi, Masuk/Dasbor (link ke `/dasbor`)
- Responsive hamburger menu untuk mobile

#### [NEW] [Footer.astro](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/components/Footer.astro)
- Desain formal dan bersih
- Tautan: Kebijakan Privasi (`/privasi`), Syarat & Ketentuan (`/syarat-ketentuan`), Pelepasan Tanggung Jawab (`/pelepasan-tanggung-jawab`), Kontak
- © 2026 Epigrap. Seluruh hak dilindungi.

---

### 4. Seksi-seksi Landing Page

#### [NEW] [HeroSection.astro](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/components/sections/HeroSection.astro)
- Headline: "Merawat Sanad, Mengabadikan Martabat."
- Sub-text sesuai spesifikasi
- 2 tombol CTA: "Mulai Warisan Anda" (Red Velvet, link ke `/reservasi`) + "Lihat Cara Kerja" (Outline Gold, scroll ke seksi Solusi)
- Background: Foto Unsplash yang diredupkan + overlay gelap

#### [NEW] [ProblemSection.astro](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/components/sections/ProblemSection.astro)
- Headline: "Fisik yang Kokoh Tidak Menjamin Sejarah yang Utuh."
- Layout split-screen (2 kolom): Fisik vs Digital
- Tekstur marmer gelap sebagai latar

#### [NEW] [SolutionSection.astro](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/components/sections/SolutionSection.astro)
- Pendekatan Phygital: Fisik (prasasti + QR) ↔ Digital (portal web)
- Foto Unsplash plakat/monumen yang disandingkan dengan mockup layar ponsel
- Penjelasan minimalis dan elegan

#### [NEW] [UseCaseSection.astro](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/components/sections/UseCaseSection.astro)
- Kartu horizontal:
  - **Trah & Keluarga**: silsilah, makam, bongpay, wasiat leluhur
  - **Pemerintah & Institusi**: tugu peresmian, arsip paguyuban, penghargaan
- Hover effects dan micro-animations

#### [NEW] [TrustSection.astro](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/components/sections/TrustSection.astro)
- 3 pilar keamanan:
  1. Arsitektur Terdesentralisasi
  2. Sistem Log Forensik
  3. Kendali Penuh Klien
- Ikon/badge minimalis untuk tiap pilar, animasi subtle

---

### 5. Halaman Utama

#### [NEW] [index.astro](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/pages/index.astro)
- Merakit semua seksi secara berurutan: Hero → Masalah → Solusi → Segmentasi → Kepercayaan
- Menggunakan BaseLayout dengan Navbar + Footer

---

### 6. Halaman Reservasi (White-Glove)

#### [NEW] [reservasi.astro](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/pages/reservasi.astro)
- Form elegan (HTML native, bukan signin):
  - Nama Klien, Kategori (dropdown: Pemerintah/Keluarga), Nama Trah/Desa, Nomor WhatsApp
- Desain sesuai identitas visual (gelap, emas, formal)
- Submit action: Placeholder (form action ke mailto atau endpoint kosong — detail backend di fase 2)

---

### 7. Halaman Legal (Statis)

#### [NEW] [privasi.astro](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/pages/privasi.astro)
- Halaman Kebijakan Privasi dengan konten placeholder formal

#### [NEW] [syarat-ketentuan.astro](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/pages/syarat-ketentuan.astro)
- Halaman Syarat & Ketentuan Layanan

#### [NEW] [pelepasan-tanggung-jawab.astro](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/pages/pelepasan-tanggung-jawab.astro)
- Halaman Pelepasan Tanggung Jawab Hukum (Liability Waiver)

---

### 8. Halaman Placeholder Dasbor

#### [NEW] [dasbor/index.astro](file:///c:/Users/lohji/.gemini/antigravity/scratch/epigrap/src/pages/dasbor/index.astro)
- Halaman "Restricted Access / Under Construction"
- Desain konsisten dengan identitas visual
- Pesan bahwa akses akan diberikan melalui undangan eksklusif

---

## Struktur Folder Akhir

```
epigrap/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   └── sections/
│   │       ├── HeroSection.astro
│   │       ├── ProblemSection.astro
│   │       ├── SolutionSection.astro
│   │       ├── UseCaseSection.astro
│   │       └── TrustSection.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── reservasi.astro
│   │   ├── privasi.astro
│   │   ├── syarat-ketentuan.astro
│   │   ├── pelepasan-tanggung-jawab.astro
│   │   └── dasbor/
│   │       └── index.astro
│   └── styles/
│       └── global.css
```

## Verification Plan

### Automated / Browser Tests
1. **Build test**: Jalankan `npm run build` dan pastikan tidak ada error.
2. **Dev server test**: Jalankan `npm run dev`, buka di browser, dan verifikasi:
   - Landing page tampil lengkap (7 seksi)
   - Navigasi ke semua halaman berfungsi (`/reservasi`, `/privasi`, `/syarat-ketentuan`, `/pelepasan-tanggung-jawab`, `/dasbor`)
   - Responsivitas di viewport mobile (375px) dan desktop (1440px)

### Visual Verification (Browser Subagent)
- Screenshot landing page penuh untuk memvalidasi estetika: warna, tipografi, layout
- Screenshot setiap seksi individual
- Screenshot halaman reservasi dan halaman legal

### Manual Verification (User)
- Review hasil akhir di browser lokal untuk memastikan kesan "Premium, Historis, Elegan" tercapai
- Validasi bahwa bahasa dan tone sudah sesuai (formal, berwibawa, tanpa jargon teknis)
