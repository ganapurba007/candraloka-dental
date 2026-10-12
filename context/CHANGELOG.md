# CHANGELOG.md

> Riwayat aktif proyek — hanya simpan ~10-15 fase terbaru di sini. Fase lama dipindahkan ke `CHANGELOG-archive.md` (ringkas, jangan copy-paste detail penuh). Entri terbaru selalu di PALING ATAS.

<!--
Format tiap entri:

## Fase [N] — [judul singkat] ([tanggal])
**FR terkait:** [nomor FR dari PRD.md §3, kalau ada]
**Yang dikerjakan:**
- [poin singkat]
**File yang berubah:** [daftar file utama, tidak perlu semua kalau banyak]
**Test:** [X passed / Y total]
**Docs updated:** [PRD §9 / SCHEMA.md / tidak ada perubahan scope]
-->

## Fase 3 — Beranda (2026-10-12)
**FR terkait:** FR-2.1, FR-2.2, FR-2.3, FR-2.4, FR-2.5, FR-2.6, FR-2.7, FR-2.8
**Yang dikerjakan:**
- Menambahkan aturan larangan penggunaan warna `#12A193` ke dalam `context/rules.md`
- Membuat modul composable: `useInView.js` (deteksi viewport) dan `useCountUp.js` (animasi hitung yang menghormati `prefers-reduced-motion`)
- Menambahkan helper `getClinicOpenStatus()` di `src/lib/schedule.js` untuk menghitung status buka/tutup klinik hari ini secara dinamis
- Membangun seluruh 8 komponen section Beranda di `src/components/sections/`:
  - `HomeHero.vue` (FR-2.1): Headline, subheadline, dual CTA ("Buat Reservasi" & "Lihat Jadwal Praktek"), gambar LCP eager loading
  - `QuickInfoStrip.vue` (FR-2.2): Kartu floating status buka hari ini, kontak cepat telepon/WhatsApp, dan lokasi
  - `HomeAboutBrief.vue` (FR-2.3): Ringkasan profil klinik dengan 3 metrik animasi hitung
  - `FeaturedServices.vue` (FR-2.4): 6 kartu layanan unggulan menuju rute detail layanan
  - `ReservationSteps.vue` (FR-2.5): Alur reservasi 4 langkah bernomor dari data JSON
  - `FeaturedDoctors.vue` (FR-2.6): 3 kartu profil dokter gigi unggulan
  - `TestimonialsSection.vue` (FR-2.7): 3 ulasan pasien dengan bintang dan avatar WebP
  - `HomeCtaBanner.vue` (FR-2.8): Banner ajakan reservasi online dan konsultasi WhatsApp
- Merakit `src/pages/Home.vue` dengan meta SEO dan penataan layout responsif
- Menulis unit test untuk `Home.vue` dan `getClinicOpenStatus`: 61 passed / 61 total
**File yang berubah:** AGENTS.md, context/CHANGELOG.md, context/PRD.md, context/rules.md, src/main.js, src/lib/schedule.js, src/composables/*, src/components/sections/*, src/pages/Home.vue, src/pages/__tests__/Home.spec.js, src/lib/__tests__/schedule.spec.js
**Test:** 61 passed / 61 total
**Docs updated:** AGENTS.md, context/CHANGELOG.md, context/PRD.md, context/rules.md

## Fase 2 — Data JSON & helper murni (2026-10-12)
**Yang dikerjakan:**
- Menyusun data JSON lengkap: `doctors.json` (5 profil dokter, jam praktek, cuti, bookedSlots, serviceIds), `home.json` (hero, statistik, langkah reservasi), dan `testimonials.json` (4 ulasan pasien)
- Menghasilkan dan mengoptimasi 18 aset gambar WebP multi-resolusi (1280, 768, 480 px) untuk seluruh dokter, layanan, klinik, dan testimoni
- Membuat modul fungsi murni di `src/lib/`:
  - `time.js`: manipulasi waktu, zona WIB (UTC+7), perbandingan menit/hari
  - `format.js`: format tanggal Indonesia, format jam WIB, format durasi
  - `schedule.js`: pembuatan slot per interval dan pengelompokan periode (Pagi, Siang, Sore)
  - `availability.js`: evaluasi slot dokter, bentrok bookedSlots dan reservasi lokal, batas waktu hari ini (lead time min 60 menit), durasi multi-slot, serta penetapan otomatis "dokter mana saja" (beban kerja paling sedikit -> id terkecil)
  - `reservation.js`: generator kode reservasi `CDC-YYMMDD-XXXX` tanpa karakter ambigu
  - `whatsapp.js`: generator template pesan dan link URL konfirmasi WhatsApp
  - `schemas.js`: skema Zod validasi input form pasien dan objek runtime reservasi
- Menulis unit test komprehensif (waktu, jadwal, ketersediaan, reservasi, WhatsApp, skema Zod, dan tes integritas data PRD §8.3): 59 passed / 59 total
**File yang berubah:** AGENTS.md, context/CHANGELOG.md, context/PRD.md, context/SCHEMA.md, src/data/*, src/lib/*, scripts/generate-source-images.mjs, public/images/*
**Test:** 59 passed / 59 total
**Docs updated:** AGENTS.md, context/CHANGELOG.md, context/PRD.md, context/SCHEMA.md

## Fase 1 — Layout global & komponen UI dasar (2026-10-12)
**FR terkait:** FR-1.1, FR-1.2, FR-1.3, FR-1.4, FR-1.5, FR-1.6, FR-1.7, FR-1.8
**Yang dikerjakan:**
- Membuat komponen UI dasar: `Button.vue` (varian warna, ukuran, area sentuh min 44px, status loading), `Card.vue` (padding, slot, hoverable), `Badge.vue` (status dot & warna netral/tersedia/penuh/tutup), `Accordion.vue` (aksesibel keyboard, aria-expanded), `Toast.vue` + `useToast.js` (notifikasi otomatis), `StepIndicator.vue` (alur reservasi 4 langkah), dan `Breadcrumb.vue`
- Membuat komponen layout global: `TopBar.vue` (telepon, WhatsApp, lokasi, jam kerja; sembunyi di mobile), `Navbar.vue` (sticky, logo Candraloka, indikator rute aktif, menu mobile responsif dengan penutup Esc/klik luar/tombol), `Footer.vue` (ringkasan, link cepat, daftar layanan, kontak, petunjuk arah, dan catatan portofolio), `FloatingWhatsapp.vue` (tombol chat mengambang dengan pesan sapaan otomatis), dan `ScrollToTop.vue` (scroll halus ke atas)
- Membuat halaman 404 `NotFound.vue` dengan navigasi cepat ke Beranda, Layanan, dan Reservasi
- Mengonfigurasi data awal `clinic.json` dan `services.json` dengan gambar multi-resolusi WebP
- Menyiapkan stub halaman ber-breadcrumb untuk seluruh rute (`/tentang`, `/layanan`, `/dokter`, `/jadwal`, `/reservasi`)
- Menulis unit test Vitest untuk komponen UI dasar: 15 passed / 15 total
**File yang berubah:** AGENTS.md, src/App.vue, src/router/index.js, src/data/clinic.json, src/data/services.json, src/components/ui/*, src/components/layout/*, src/pages/*, context/CHANGELOG.md, context/PRD.md
**Test:** 15 passed / 15 total
**Docs updated:** AGENTS.md, context/CHANGELOG.md, context/PRD.md

## Fase 0 — Perencanaan, setup tooling & image pipeline (2026-10-12)
**Yang dikerjakan:**
- Mengubah nama klinik menjadi "Candraloka Dental Care" di seluruh dokumentasi dan konfigurasi
- Menyiapkan `context/rules.md` untuk standar alur kerja, penamaan, dan konvensi git commit
- Setup tooling: Tailwind CSS (tema & token warna tenang), PostCSS, Vue Router, Unhead, VeeValidate + Zod, Vitest + Vue Test Utils + Happy-DOM
- Menyiapkan pipeline optimasi gambar WebP (`scripts/optimize-images.mjs`) & validasi anggaran ukuran gambar (`scripts/check-images.mjs`) yang otomatis dijalankan di `prebuild`
- Menyiapkan font self-hosted Latin woff2 (Plus Jakarta Sans) di `public/fonts/` tanpa CDN pihak ketiga
- Membuat komponen `ResponsiveImage.vue` untuk multi-resolusi WebP & pencegahan CLS beserta unit test
- Menata struktur folder lengkap (`components/`, `pages/`, `composables/`, `lib/`, `data/`, `src-images/`)
**File yang berubah:** AGENTS.md, package.json, vite.config.js, tailwind.config.js, postcss.config.js, index.html, src/main.js, src/App.vue, src/router/index.js, src/assets/main.css, src/pages/Home.vue, src/components/ui/ResponsiveImage.vue, scripts/optimize-images.mjs, scripts/check-images.mjs, context/rules.md, context/CHANGELOG.md
**Test:** 5 passed / 5 total
**Docs updated:** AGENTS.md, context/CHANGELOG.md, context/rules.md, context/PRD.md, context/SCHEMA.md
