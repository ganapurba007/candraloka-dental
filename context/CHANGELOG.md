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

## Desain Multi-Slide Hero Section & Pembersihan Footer (2026-10-12)
**FR terkait:** FR-2.1, FR-1.4, PRD §12
**Yang dikerjakan:**
- **Hero Section Dinamis & Multi-Layout ([HomeHero.vue](file:///d:/Projects/candraloka-dental/src/components/sections/HomeHero.vue), [src/data/home.json](file:///d:/Projects/candraloka-dental/src/data/home.json)):**
  - Mengimplementasikan 3 slide dengan foto klinik berbeda dan variasi layout teks yang unik:
    - *Slide 1 (Left / Brand Anchor):* Foto operatory interior klinik (`hero.webp`), headline brand Candraloka Dental Care, dual CTA, dan deretan trust badges.
    - *Slide 2 (Split / Family & Doctor):* Foto dokter merawat pasien dengan hangat (`hero-2.webp`), badge empati, headline fokus kenyamanan keluarga, dan tumpukan kartu fitur bertingkat (*Pojok Ramah Anak*, *Konsultasi Terbuka*, *Rencana Tindakan Jelas*).
    - *Slide 3 (Centered / Modern Tech):* Foto studio klinik modern (`hero-3.webp`), tata letak tengah dengan badge teknologi, dan 3 pilar standar klinik (*Radiografi Digital*, *Autoclave Sterilisasi*, *Dental Unit Ergonomis*).
  - Menambahkan animasi transisi halus saat perpindahan slide: crossfade & subtle scale untuk gambar latar belakang, slide-fade dinamis (`slide-content-left` / `slide-content-right`) untuk konten teks, serta auto-slide otomatis setiap 6.5 detik dengan pause on hover.
  - Memproses aset gambar WebP responsif (`hero-2.webp`, `hero-3.webp` beserta varian 768w dan 480w) dan lolos audit `npm run check:images`.
- **Pembersihan Footer ([Footer.vue](file:///d:/Projects/candraloka-dental/src/components/layout/Footer.vue)):**
  - Menghapus blok kartu pemberitahuan proyek portofolio simulasi/rekaan.
  - Menghapus teks "Dibangun dengan Vue 3, Tailwind CSS & Vitest." pada baris bawah footer.
- **Verifikasi:**
  - 92/92 unit tests lulus (100% pass)
  - `npm run check:images` (26 gambar tervalidasi)
  - `npm run build` sukses
**File yang berubah:** src/components/sections/HomeHero.vue, src/data/home.json, src/components/layout/Footer.vue, public/images/clinic/*, src-images/clinic/*, context/CHANGELOG.md
**Test:** 92 passed / 92 total
**Docs updated:** context/CHANGELOG.md

## Penghapusan Banner CTA Beranda — Tampilan Home Lebih Rapi (2026-10-12)
**FR terkait:** FR-2.8
**Yang dikerjakan:**
- Menghapus card/banner CTA penutup (*"Siap Mendapatkan Senyum Sehat dan Percaya Diri?"*) dari halaman utama ([Home.vue](file:///d:/Projects/candraloka-dental/src/pages/Home.vue)) sesuai permintaan pengguna, sehingga halaman beranda berakhir rapi setelah carousel Ulasan Pasien.
- Memperbarui pengujian di [Home.spec.js](file:///d:/Projects/candraloka-dental/src/pages/__tests__/Home.spec.js).
- Verifikasi: 92/92 unit tests lulus dan build produksi berhasil.
**File yang berubah:** src/pages/Home.vue, src/pages/__tests__/Home.spec.js, context/CHANGELOG.md
**Test:** 92 passed / 92 total
**Docs updated:** context/CHANGELOG.md

## Redesign Interaktif — Carousel Ulasan Pasien Otomatis & Foto Profil Nyata (2026-10-12)
**FR terkait:** FR-2.7, PRD §10, PRD §11 (Prinsip UX), PRD §12 (Optimasi & Gambar)
**Yang dikerjakan:**
- Mengubah tampilan Ulasan Pasien ([TestimonialsSection.vue](file:///d:/Projects/candraloka-dental/src/components/sections/TestimonialsSection.vue)) dari grid 3-kolom statis menjadi carousel interaktif modern yang menampilkan ulasan satu per satu:
  - Transisi slide otomatis setiap 5 detik dengan animasi halus (`slide-left` / `slide-right`) serta dukungan `prefers-reduced-motion`.
  - Pause otomatis saat kursor mouse masuk (`mouseenter`) atau fokus keyboard (`focusin`), dan kembali berjalan saat kursor keluar (`mouseleave`).
  - Kontrol navigasi manual lengkap: tombol panah chevron kiri & kanan dengan efek hover/active dan `cursor-pointer`, serta indikator navigasi titik (dots) dengan bentuk pil dinamis untuk ulasan aktif.
- Mengganti seluruh placeholder inisial avatar pasien dengan foto profil potret nyata berkualitas tinggi, ramah, dan representatif:
  - `Ratna Sari` (Scaling): Potret wanita Indonesia tersenyum ceria dengan gigi putih sehat dan baju batik.
  - `Budi Santoso` (Ortodonti): Pria ramah tersenyum lebar memperlihatkan susunan gigi rapi dan bersih.
  - `Dina Mariana` (Tambal Komposit): Wanita tersenyum natural memperlihatkan gigi depan sehat.
  - `Hendra Wijaya` (Perawatan Anak): Sosok ayah muda berkacamata ramah.
- Seluruh avatar diproses ke WebP responsif (`400x400`, `300x300`, `200x200`) dan lolos validasi ukuran `npm run check:images`.
- Verifikasi:
  - 92 unit tests lulus (100% pass)
  - `npm run check:images` (24 images verified)
  - `npm run build` sukses
**File yang berubah:** src/components/sections/TestimonialsSection.vue, src-images/testimonials/*, public/images/testimonials/*, context/CHANGELOG.md
**Test:** 92 passed / 92 total
**Docs updated:** context/CHANGELOG.md

## Integrasi Media — Foto Potret Profesional Tim Dokter Gigi (2026-10-12)
**FR terkait:** FR-2.6, FR-3.6, PRD §12 (Optimasi & Gambar)
**Yang dikerjakan:**
- Mengganti seluruh placeholder siluet avatar dokter dengan foto potret medis profesional berkualitas tinggi yang ramah dan representatif:
  - `drg. Andi Pratama, Sp.KG`: Dokter gigi spesialis konservasi gigi di ruang operatory modern dengan latar dental chair dan radiografi.
  - `drg. Nadia Safira, Sp.KGA`: Dokter gigi spesialis kedokteran gigi anak yang hangat dan ceria di klinik ramah anak (*pediatric corner*).
  - `drg. Farhan Maulana, Sp.Ort`: Spesialis ortodonti berkacamata dengan jas lab dokter rapi di depan layar model ortodonti 3D.
  - `drg. Citra Lestari`: Dokter gigi umum di ruang dental studio estetika.
  - `drg. Bambang Wicaksono, Sp.BM`: Spesialis bedah mulut dengan loupes bedah dan masker di ruang bedah minor.
- Seluruh foto diproses dalam format WebP responsif (`800x1000`, `768x960`, `480x600`) dengan rasio 4:5 dan lulus batas anggaran ukuran PRD §12.
- Verifikasi:
  - 92 unit tests lulus (100% pass)
  - `npm run check:images` & `npm run build` berhasil tanpa error.
**File yang berubah:** src-images/doctors/*, public/images/doctors/*, context/CHANGELOG.md
**Test:** 92 passed / 92 total
**Docs updated:** context/CHANGELOG.md

## Redesign & Animasi — Alur Reservasi Medcity Style dengan Efek Hover (2026-10-12)
**FR terkait:** FR-2.5, PRD §10 (Referensi Medcity), PRD §11 (Prinsip UX)
**Yang dikerjakan:**
- Mengadopsi tata letak kartu langkah reservasi Medcity 4-kolom ([ReservationSteps.vue](file:///d:/Projects/candraloka-dental/src/components/sections/ReservationSteps.vue)):
  - Baris atas kartu memuat ikon medis klinis bertema di sisi kiri (`ClipboardList`, `UserCheck`, `CalendarClock`, `ShieldCheck`) dan nomor tahapan besar translusen `01`–`04` di sisi kanan (`text-5xl sm:text-6xl font-black text-slate-200`).
  - Kartu pertama dilengkapi garis aksen vertikal kiri `border-l-4 border-l-primary-500` sesuai referensi desain Medcity.
  - Menambahkan aksi interaktif di bagian bawah setiap kartu dengan panah animasi yang mengarah ke rute halaman terkait (`/layanan`, `/dokter`, `/jadwal`, `/reservasi`).
  - Menambahkan animasi hover kartu: pengangkatan kartu (`-translate-y-2.5`), bayangan dinamis (`hover:shadow-2xl`), pembesaran ikon berotasi halus (`group-hover:scale-110 group-hover:rotate-3`), angka bercahaya biru, dan pergeseran panah (`group-hover:translate-x-1.5`).
- Verifikasi:
  - 92 unit tests lulus (100% pass)
  - `npm run check:images` & `npm run build` berhasil tanpa error.
**File yang berubah:** src/components/sections/ReservationSteps.vue, context/CHANGELOG.md
**Test:** 92 passed / 92 total
**Docs updated:** context/CHANGELOG.md

## Integrasi Media — Dummy Image Realistis Layanan Unggulan (2026-10-12)
**FR terkait:** FR-2.4, FR-4.1, PRD §12 (Optimasi & Gambar)
**Yang dikerjakan:**
- Mengganti aset gambar grafis SVG abstrak pada seluruh kartu layanan klinik dengan foto dummy klinis kedokteran gigi profesional dan realistis:
  - `scaling`: Prosedur pembersihan karang gigi ultrasonik dengan dental hygienist.
  - `tambal`: Restorasi penambalan komposit dengan lampu polimerisasi UV & model gigi.
  - `bleaching`: Penggunaan lampu LED pemutihan gigi klinis pada ruang perawatan modern.
  - `behel`: Konsultasi ortodonti estetika dengan model studi behel transparan.
  - `psa`: Perawatan endodonti saluran akar berteknologi tinggi dengan mikroskop dental.
  - `anak`: Dokter gigi anak ramah anak dengan boneka edukasi perawatan gigi.
  - `cabut` & `veneer`: Prosedur bedah mulut radiografi dan konsultasi veneer keramik estetik dengan panduan shade warna gigi.
- Seluruh 8 gambar diproses secara responsif (`1280px`, `768px`, `480px`) dalam format WebP terkompresi dengan anggaran performa PRD §12 terpenuhi (<40 KB untuk mobile).
- Verifikasi:
  - 92 unit tests lulus (100% pass)
  - `npm run check:images` & `npm run build` berhasil tanpa error.
**File yang berubah:** src-images/services/*, public/images/services/*, context/CHANGELOG.md
**Test:** 92 passed / 92 total
**Docs updated:** context/CHANGELOG.md

## Optimasi Tampilan — Perapian Kartu Statistik & Kursor Pointer Tombol (2026-10-12)
**FR terkait:** FR-2.3, PRD §10, PRD §11 (Prinsip UX)
**Yang dikerjakan:**
- Merapikan tata letak bagian Tentang & Statistik Beranda ([HomeAboutBrief.vue](file:///d:/Projects/candraloka-dental/src/components/sections/HomeAboutBrief.vue)):
  - Menghilangkan pembatasan kotak sempit yang membuat angka besar (`12.500+`) meluber keluar batas.
  - Mengubah desain kartu statistik dengan ikon medis profesional (`Award`, `Users`, `Stethoscope`) di sisi kiri, serta tipografi angka tebal besar (`text-2xl sm:text-3xl font-black text-navy-900`) di sisi kanan dengan judul dan keterangan yang sejajar rapi.
  - Menambahkan efek hover lembut (`hover:shadow-lg hover:border-primary-200/70`) pada tiap kartu statistik.
- Memperbaiki interaktivitas kursor tombol secara menyeluruh:
  - Menambahkan aturan global `cursor: pointer` pada elemen `button`, `[role="button"]`, dan `a` di `src/assets/main.css`.
  - Menambahkan kelas utilitas `cursor-pointer` pada komponen [Button.vue](file:///d:/Projects/candraloka-dental/src/components/ui/Button.vue) saat dihover, dan `!cursor-not-allowed` ketika disabled.
- Verifikasi:
  - 92 unit tests lulus (100% pass)
  - `npm run check:images` & `npm run build` berhasil tanpa error.
**File yang berubah:** src/assets/main.css, src/components/ui/Button.vue, src/components/sections/HomeAboutBrief.vue, context/CHANGELOG.md
**Test:** 92 passed / 92 total
**Docs updated:** context/CHANGELOG.md

## Update Identitas Brand & Hero Header — Logo Baru & Minimalis (2026-10-12)
**FR terkait:** FR-1.1, FR-2.1, PRD §10, PRD §11 (Prinsip UX)
**Yang dikerjakan:**
- Menghapus komponen *pill badge* di atas judul Hero section ([HomeHero.vue](file:///d:/Projects/candraloka-dental/src/components/sections/HomeHero.vue)) untuk menghasilkan tampilan hero yang lebih bersih, fokus, dan minimalis tanpa distraksi visual.
- Memperbarui ikon identitas klinik pada Header ([Navbar.vue](file:///d:/Projects/candraloka-dental/src/components/layout/Navbar.vue)), Footer ([Footer.vue](file:///d:/Projects/candraloka-dental/src/components/layout/Footer.vue)), dan favicon tab browser ([index.html](file:///d:/Projects/candraloka-dental/index.html)) menggunakan lambang resmi bulan sabit & mahkota gigi dari `public/icon.jpg`.
- Mengoptimalkan framing lambang ikon menjadi bentuk persegi proporsional untuk ketajaman tampilan tab browser (`favicon.ico` dan `favicon.png`).
- Verifikasi:
  - 92 unit tests lulus (100% pass)
  - `npm run check:images` & `npm run build` berhasil tanpa error.
**File yang berubah:** index.html, public/icon.jpg, public/favicon.ico, public/favicon.png, src/components/layout/Navbar.vue, src/components/layout/Footer.vue, src/components/sections/HomeHero.vue, context/CHANGELOG.md
**Test:** 92 passed / 92 total
**Docs updated:** context/CHANGELOG.md

## Optimasi Tampilan — Hero Section Bersih, Kontras & Mudah Dibaca (2026-10-12)
**FR terkait:** FR-2.1, PRD §10, PRD §11 (Prinsip UX)
**Yang dikerjakan:**
- Menyempurnakan tata letak hero section agar lebih bersih (*clean*), minim distraksi visual, dan nyaman dibaca:
  - Mengubah overlay gradien menjadi lapisan *silky sapphire blue* (`rgba(8, 20, 50, 0.40)` ke `rgba(8, 19, 48, 1)`) yang meredam garis jendela/pohon di latar belakang tanpa menghilangkan visibilitas dental chair di sisi kiri.
  - Memindahkan watermark siluet gigi dekoratif ke sisi kanan luar dengan opasitas sangat halus (`opacity-[0.07]`) sehingga tidak lagi menabrak atau menumpuk teks judul dan paragraf.
  - Merapikan hierarki tipografi: memadukan judul utama yang tegas, subjudul biru muda yang elegan, dan deskripsi bernarasi utuh tanpa tumpukan heading bertingkat.
  - Memperlebar jarak vertikal bawah hero (`pb-36 sm:pb-44 lg:pb-48`) dan menaikkan posisi dot slider sehingga tidak lagi bertabrakan dengan kartu mengambang `QuickInfoStrip`.
- Verifikasi:
  - 92 unit tests lulus (100% pass)
  - `npm run check:images` & `npm run build` berhasil tanpa error.
**File yang berubah:** src/components/sections/HomeHero.vue, context/CHANGELOG.md
**Test:** 92 passed / 92 total
**Docs updated:** context/CHANGELOG.md

## Redesign — Adaptasi Medcity Layout & Transisi Dental Blue (2026-10-12)
**FR terkait:** FR-3.1, FR-3.2, FR-3.3, FR-3.5, FR-2.8, PRD §10 (Referensi Medcity)
**Yang dikerjakan:**
- Mengadopsi tata letak & estetika resmi tema kesehatan Medcity (https://7oroof.com/demos/medcity/about-us.html):
  - `AboutHeader.vue`: Mengadaptasi Medcity `page-title-layout1` dengan latar Navy, tipografi kuat, dan tombol pil ganda ("Lihat Dokter" & "Layanan Kami")
  - `AboutStory.vue`: Mengadaptasi Medcity `about-layout1` dengan judul 2 baris, cerita filosofi perawatan, Visi & Misi terstruktur, baris aksi pil "Kenali Dokter Kami" dengan segel sertifikasi klinis, dan kartu foto klinik berbayang lembut
  - `AboutValues.vue`: Mengadaptasi Medcity `features-layout1` dengan tajuk 2 kolom, kartu nilai berikon Dental Blue berlingkar dengan sudut panah tautan, dan catatan komitmen klinis di bagian bawah
  - `AboutVisitFlow.vue`: Mengadaptasi Medcity `work-process` berlatar Deep Navy dengan nomor langkah besar `01`-`05`, daftar sorotan centang, dan banner CTA terintegrasi berlatar Dental Blue
  - `HomeCtaBanner.vue`: Mengadaptasi Medcity horizontal CTA banner dengan ikon sparkle, judul kontras, dan tombol pil Deep Navy
  - `Button.vue`: Standardisasi gaya pil membulat (`rounded-full`) untuk seluruh tombol aksi utama (`btn__rounded` khas Medcity) dan penambahan varian `white` serta `navy`
  - `TestimonialsSection.vue`: Menambahkan badge rekap rating kepuasan pasien (`4.9` skor kepuasan) ala Medcity
- Menghapus seluruh warna tosca/teal dan menggantinya dengan **Dental Sapphire Blue** (`#1e60d5` / `#2563eb`):
  - Memperbarui token `primary` pada `tailwind.config.js` dari tosca menjadi Dental Blue
  - Memperbarui skrip `scripts/generate-source-images.mjs` dan meregenerasi seluruh 24 varian gambar WebP konten serta `public/og-image.png` dengan nuansa Dental Blue & Deep Navy
  - Memperbarui aturan styling di `context/rules.md` dan `README.md`
- Verifikasi pengujian & build:
  - 92 unit tests lolos (100% pass)
  - 24 gambar WebP lolos validasi ukuran (`npm run check:images`)
  - Build produksi lolos dengan ukuran awal JavaScript ~52.2 KB gzip
**File yang berubah:** tailwind.config.js, scripts/generate-source-images.mjs, public/og-image.png, public/images/*, src/components/ui/Button.vue, src/components/sections/AboutHeader.vue, src/components/sections/AboutStory.vue, src/components/sections/AboutValues.vue, src/components/sections/AboutVisitFlow.vue, src/components/sections/AboutFacilities.vue, src/components/sections/AboutLocation.vue, src/components/sections/HomeCtaBanner.vue, src/components/sections/HomeHero.vue, src/components/sections/TestimonialsSection.vue, README.md, context/rules.md, context/CHANGELOG.md
**Test:** 92 passed / 92 total
**Docs updated:** README.md, context/rules.md, context/CHANGELOG.md

## Fase 10 — Rilis & Publikasi (2026-10-12)
**FR terkait:** PRD §6 (Milestone 10)
**Yang dikerjakan:**
- Menambahkan dokumentasi komprehensif `README.md` mencakup:
  - Ringkasan portofolio dan branding resmi Candraloka Dental Care
  - Daftar fitur interaktif lengkap (Beranda, Tentang, Layanan, Profil Dokter, Jadwal Praktek matriks, Alur Reservasi 4 langkah berbasis ketersediaan)
  - Arsitektur teknologi (Vue 3, Vite, Tailwind CSS, Zod, `@unhead/vue`, `sharp`, Vitest)
  - Kepatuhan standar UX dan aksesibilitas (UX-1 s.d. UX-11)
  - Panduan instalasi lokal, eksekusi test suite, validasi pipeline gambar WebP, dan build produksi
  - Struktur direktori dan disclaimer portofolio
- Menambahkan konfigurasi `vercel.json` untuk SPA client-side routing rewrites dan header cache jangka panjang aset gambar/font
- Seluruh 92 unit tests lolos verifikasi dan build produksi berhasil tanpa peringatan
**File yang berubah:** README.md, vercel.json, AGENTS.md, context/PRD.md, context/CHANGELOG.md
**Test:** 92 passed / 92 total
**Docs updated:** README.md, AGENTS.md, context/PRD.md, context/CHANGELOG.md

## Fase 9 — Audit Akhir, UX Polish, Aksesibilitas & SEO (2026-10-12)
**FR terkait:** UX-1 s.d. UX-11, FR-1.5, FR-1.6, FR-1.7, PRD §11, PRD §12
**Yang dikerjakan:**
- Audit & Polishing UX & Aksesibilitas (§11 UX-1 s.d. UX-11):
  - Dukungan navigasi keyboard tombol panah (ArrowLeft/ArrowRight) pada navigator strip tanggal reservasi (UX-8)
  - Penambahan ARIA roles (`role="radiogroup"`, `role="radio"`, `aria-checked`, `aria-disabled`) pada pemilih tanggal dan pemilih slot jam
  - Standarisasi ukuran font input minimal 16px (`text-base`) pada form reservasi, filter dokter, dan pencarian katalog untuk mencegah auto-zoom di browser mobile iOS Safari (UX-4)
  - Penambahan asosiasi error form yang jelas via `aria-invalid` dan `aria-describedby` (UX-8)
  - Stack posisi tombol `ScrollToTop.vue` di atas `FloatingWhatsapp.vue` pada layar mobile dan desktop untuk mencegah bentrok/tumpang tindih tombol aksi (UX-4)
  - Pengaturan elevasi `FloatingWhatsapp.vue` (`bottom-20 lg:bottom-6`) agar tidak menutupi mobile sticky CTA bar pada halaman detail (UX-4)
  - Dukungan `@media (prefers-reduced-motion: reduce)` pada `src/assets/main.css` untuk kenyamanan aksesibilitas pengguna (UX-8, §12.2)
- SEO & Social Meta (§12):
  - Pembuatan aset `public/og-image.png` (1200×630 px) otomatis via `scripts/generate-source-images.mjs` dengan palet tema Medcity
  - Penambahan tag meta Open Graph (`og:type`, `og:site_name`, `og:title`, `og:description`, `og:image`) dan Twitter Card (`summary_large_image`) pada `index.html`
- Validasi Performa & Kualitas:
  - Verifikasi seluruh 24 gambar konten berformat WebP dengan ukuran di bawah batas anggaran (`npm run check:images` lolos)
  - Verifikasi bundle JavaScript awal Beranda sebesar ~52.2 KB gzip (jauh di bawah batas anggaran 170 KB gzip)
  - Penambahan unit test aksesibilitas keyboard dan role ARIA di `src/pages/__tests__/Booking.spec.js`: 92 passed / 92 total
**File yang berubah:** AGENTS.md, context/PRD.md, context/CHANGELOG.md, index.html, public/og-image.png, scripts/generate-source-images.mjs, src/assets/main.css, src/components/layout/FloatingWhatsapp.vue, src/components/layout/ScrollToTop.vue, src/pages/Booking.vue, src/pages/Doctors.vue, src/pages/Schedule.vue, src/pages/Services.vue, src/pages/__tests__/Booking.spec.js
**Test:** 92 passed / 92 total
**Docs updated:** AGENTS.md, context/PRD.md, context/CHANGELOG.md

## Fase 8 — Reservasi Online & Konfirmasi (2026-10-12)
**FR terkait:** FR-7.1, FR-7.2, FR-7.3, FR-7.4, FR-7.5, FR-7.6, FR-7.7, FR-7.8, FR-7.9, FR-7.10, FR-7.11
**Yang dikerjakan:**
- Menambahkan fungsi helper `localStorage` dan `sessionStorage` di `src/lib/reservation.js`:
  - `getStoredReservations`, `saveReservationToStorage`, `clearStoredReservations` (FR-7.9, FR-7.10)
  - `getBookingDraft`, `saveBookingDraft`, `clearBookingDraft` (FR-7.11)
- Memperbarui skema validasi Zod `patientFormSchema` di `src/lib/schemas.js` agar pesan error sesuai tabel FR-7.6 PRD
- Membangun alur 4 langkah interaktif reservasi online di `src/pages/Booking.vue`:
  - `StepIndicator.vue` indikator progres 4 langkah (FR-7.1)
  - Pengisian otomatis awal dari URL query (`?layanan=:slug` & `?dokter=:slug`)
  - Langkah 1 (FR-7.2): Pilihan kartu layanan dengan estimasi durasi
  - Langkah 2 (FR-7.3): Pilihan dokter (opsi default "Dokter mana saja yang tersedia" atau dokter spesifik yang menangani layanan)
  - Langkah 3 (FR-7.4, FR-7.5): Strip 14 hari navigator dengan status ketersediaan (Tersedia, Penuh, Libur), tombol lompat ke tanggal tersedia berikutnya, slot jam per periode (Pagi/Siang/Sore), serta penetapan dokter otomatis saat memilih jam
  - Langkah 4 (FR-7.6, FR-7.7): Form data pasien (nama, WhatsApp, email, status pasien, keluhan dengan penghitung 300 karakter, persetujuan, honeypot) dengan proteksi anti-collision double booking
  - Layar konfirmasi sukses (FR-7.8): Kode reservasi `CDC-YYMMDD-XXXX`, ringkasan jadwal, status "Menunggu konfirmasi klinik", tombol WhatsApp `wa.me`, salin ringkasan, buat reservasi lain, dan disclaimer portofolio
  - Penyimpanan persistensi `localStorage` dan draft `sessionStorage` (FR-7.9, FR-7.11)
  - Fitur pengosongan data reservasi di perangkat untuk peninjauan reviewer (FR-7.10)
- Menambahkan unit test suite di `src/pages/__tests__/Booking.spec.js` dan `src/lib/__tests__/reservation.spec.js`: 91 passed / 91 total
**File yang berubah:** AGENTS.md, context/CHANGELOG.md, src/lib/reservation.js, src/lib/schemas.js, src/lib/__tests__/reservation.spec.js, src/pages/Booking.vue, src/pages/__tests__/Booking.spec.js
**Test:** 91 passed / 91 total
**Docs updated:** AGENTS.md, context/CHANGELOG.md

## Fase 7 — Jadwal Praktek (2026-10-12)
**FR terkait:** FR-6.1, FR-6.2, FR-6.3, FR-6.4, FR-6.5, FR-6.6
**Yang dikerjakan:**
- Menambahkan fungsi murni `isDoctorSessionActiveNow(doctor, session, now)` di `src/lib/schedule.js` untuk mengecek sesi praktek aktif saat ini secara deterministik
- Membangun halaman jadwal praktek dokter di `src/pages/Schedule.vue`:
  - Keterangan jam operasional klinik, status buka/tutup klinik hari ini, dan zona waktu WIB (FR-6.6)
  - Filter dokter dan filter hari yang reaktif dan tersimpan otomatis ke query URL `?dokter=...&hari=...` tanpa reload halaman (FR-6.2)
  - Tampilan desktop (FR-6.1): tabel mingguan matriks dokter x hari (Senin–Minggu), penanda kolom "Hari Ini", penanda badge denyut "Sedang Praktek" untuk sesi aktif (FR-6.3), catatan cuti dokter (FR-6.4), dan tombol reservasi (FR-6.5)
  - Tampilan mobile (FR-6.1): tab hari geser/tap bebas scroll horizontal berlebih dengan penanda "Hari Ini", daftar kartu dokter yang praktek pada hari tersebut beserta jam sesi dan status cuti
- Menambahkan test suite di `src/pages/__tests__/Schedule.spec.js` dan unit test helper di `schedule.spec.js`: 84 passed / 84 total
**File yang berubah:** AGENTS.md, context/CHANGELOG.md, src/lib/schedule.js, src/lib/__tests__/schedule.spec.js, src/pages/Schedule.vue, src/pages/__tests__/Schedule.spec.js
**Test:** 84 passed / 84 total
**Docs updated:** AGENTS.md, context/CHANGELOG.md

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
