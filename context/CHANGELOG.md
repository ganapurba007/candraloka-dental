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

## Fase 6 — Profil Dokter (2026-10-12)
**FR terkait:** FR-5.1, FR-5.2, FR-5.3, FR-5.4
**Yang dikerjakan:**
- Menambahkan helper fungsi murni:
  - `formatPracticeDaysSummary(practiceHours)` di `src/lib/format.js` untuk merangkum hari praktek dokter
  - `isDoctorPracticingOn(doctor, now)` di `src/lib/schedule.js` untuk mengecek status praktek hari ini dengan mempertimbangkan tanggal cuti
- Membangun halaman direktori dokter di `src/pages/Doctors.vue` (FR-5.1):
  - Filter pencarian nama atau keahlian real-time
  - Filter spesialisasi berbasis chip dinamis
  - Kartu dokter lengkap dengan foto WebP, penanda "Praktek Hari Ini", lama pengalaman, ringkasan hari praktek, tombol "Lihat Profil", dan "Reservasi"
  - *Empty state* ramah saat pencarian dokter tidak ditemukan
- Membangun halaman detail dokter di `src/pages/DoctorDetail.vue` (FR-5.2, FR-5.3, FR-5.4):
  - Foto dokter, bio, bahasa, spesialisasi, dan pengalaman
  - Riwayat pendidikan dan gelar terstruktur
  - Tag fokus & minat klinis dokter
  - Daftar layanan yang ditangani yang menaut ke detail layanan
  - Tabel jadwal praktek mingguan (Senin–Minggu) dengan penyorot hari ini dan pemberitahuan tanggal cuti bila ada
  - Tombol CTA "Reservasi dengan Dokter Ini" menuju `/reservasi?dokter=:slug` dan tanya via WhatsApp
  - Bar CTA tetap di bawah layar untuk mobile viewport (FR-5.3)
  - Integrasi komponen `NotFound.vue` bila slug dokter tidak valid (FR-5.4)
- Menambahkan unit test di `Doctors.spec.js`, `DoctorDetail.spec.js`, serta unit test helper di `format.spec.js` dan `schedule.spec.js`: 78 passed / 78 total
**File yang berubah:** AGENTS.md, context/CHANGELOG.md, src/lib/format.js, src/lib/schedule.js, src/lib/__tests__/*, src/pages/Doctors.vue, src/pages/DoctorDetail.vue, src/pages/__tests__/Doctors.spec.js, src/pages/__tests__/DoctorDetail.spec.js
**Test:** 78 passed / 78 total
**Docs updated:** AGENTS.md, context/CHANGELOG.md

## Fase 5 — Layanan & Detail Layanan (2026-10-12)
**FR terkait:** FR-4.1, FR-4.2, FR-4.3, FR-4.4, FR-4.5
**Yang dikerjakan:**
- Menambahkan varian warna `primary` pada komponen `Badge.vue`
- Membangun halaman katalog layanan di `src/pages/Services.vue` (FR-4.1):
  - Kolom pencarian layanan real-time dengan tombol hapus pencarian
  - Filter kategori berbasis chip (`Semua`, `Umum`, `Estetika`, `Ortodonti`, `Bedah`, `Anak`) dengan jumlah badge layanan
  - Grid kartu layanan dengan foto WebP responsif, estimasi durasi, dan dual CTA ("Detail" & "Reservasi")
  - Tampilan *empty state* ramah saat pencarian tidak ditemukan dengan tombol reset
  - Kotak informasi transparansi biaya (FR-4.4)
- Membangun halaman detail layanan di `src/pages/ServiceDetail.vue` (FR-4.2, FR-4.3, FR-4.4, FR-4.5):
  - Integrasi SEO meta title & description dinamis
  - Gambar utama, deskripsi perawatan, daftar kapan dibutuhkan (`whenNeeded`), tahapan perawatan (`procedure`), dan persiapan sebelum kunjungan (`preparation`)
  - Kartu daftar dokter yang menangani layanan terkait (`serviceIds`) yang menaut ke `/dokter/:slug`
  - Rekomendasi layanan terkait dalam kategori serupa
  - Tombol CTA "Reservasi Layanan Ini" menuju `/reservasi?layanan=:slug` serta tautan konsultasi WhatsApp
  - Bar CTA tetap di bawah layar untuk perangkat mobile (FR-4.3)
  - Notifikasi transparansi biaya (FR-4.4)
  - Integrasi komponen `NotFound.vue` bila slug layanan tidak ditemukan (FR-4.5)
- Menambahkan unit test di `Services.spec.js` dan `ServiceDetail.spec.js`: 69 passed / 69 total
**File yang berubah:** AGENTS.md, context/CHANGELOG.md, src/components/ui/Badge.vue, src/pages/Services.vue, src/pages/ServiceDetail.vue, src/pages/__tests__/Services.spec.js, src/pages/__tests__/ServiceDetail.spec.js
**Test:** 69 passed / 69 total
**Docs updated:** AGENTS.md, context/CHANGELOG.md

## Fase 4 — Tentang (2026-10-12)
**FR terkait:** FR-3.1, FR-3.2, FR-3.3, FR-3.4, FR-3.5, FR-3.6, FR-3.7, FR-3.8
**Yang dikerjakan:**
- Menambahkan data fasilitas klinik (`facilities`) dan gambar peta/profil di `src/data/clinic.json`
- Menghasilkan dan mengoptimasi aset gambar WebP multi-resolusi untuk fasilitas klinik (`ruang-perawatan`, `ruang-tunggu`, `sterilisasi`, `ruang-anak`) serta gambar peta dan profil tentang klinik
- Membangun komponen modular halaman Tentang di `src/components/sections/`:
  - `AboutHeader.vue` (FR-3.1): Breadcrumb, judul, tagline, dual CTA ("Lihat Dokter" & "Layanan Kami")
  - `AboutStory.vue` (FR-3.2): Cerita klinik, tahun berdiri, visi dan poin misi
  - `AboutValues.vue` (FR-3.3): Grid 6 kartu nilai layanan dengan ikon dinamis
  - `AboutFacilities.vue` (FR-3.4): Grid foto fasilitas modern dengan keterangan dan hover effect
  - `AboutVisitFlow.vue` (FR-3.5): 5 langkah alur kunjungan pasien bernomor
  - `FeaturedDoctors.vue` (FR-3.6): Ditambahkan props judul dan deskripsi kustom untuk menampilkan dokter unggulan
  - `AboutLocation.vue` (FR-3.7): Status buka/tutup klinik hari ini, alamat, kontak telepon/WA, jadwal jam buka harian, peta statis WebP dengan tautan ke Google Maps dan opsi peta interaktif
  - `HomeCtaBanner.vue` (FR-3.8): Banner penutup dengan ajakan reservasi online dan konsultasi WhatsApp
- Merakit `src/pages/About.vue` dengan meta SEO dan penataan layout
- Menambahkan unit test di `src/pages/__tests__/About.spec.js`: 62 passed / 62 total
**File yang berubah:** AGENTS.md, context/CHANGELOG.md, src/data/clinic.json, scripts/generate-source-images.mjs, src/components/sections/About*, src/components/sections/FeaturedDoctors.vue, src/pages/About.vue, src/pages/__tests__/About.spec.js
**Test:** 62 passed / 62 total
**Docs updated:** AGENTS.md, context/CHANGELOG.md

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
