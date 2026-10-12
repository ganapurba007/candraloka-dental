# Candraloka Dental Care

> Website Portofolio Klinik Gigi Modern dengan Sistem Reservasi Online Berbasis Ketersediaan Real-Time.

![Candraloka Dental Care Social Preview](/public/og-image.png)

## 📌 Tentang Proyek

**Candraloka Dental Care** adalah proyek portofolio website klinik gigi yang dirancang untuk memberikan pengalaman pengguna (UX) yang tenang, transparan, dan intuitif dalam layanan kesehatan.

Fitur unggulan proyek ini adalah **Sistem Reservasi Online Berbasis Ketersediaan Real-Time**:
- Menghitung slot waktu praktek dokter secara otomatis dari data operasional mingguan.
- Mendeteksi jadwal cuti dokter, slot yang sudah terisi (*booked slots*), dan reservasi yang tersimpan di perangkat.
- Mendukung penetapan dokter otomatis berbasis rotasi beban layanan ("Dokter Mana Saja yang Tersedia").
- Navigasi strip 14 hari dengan status visual & teks (Tersedia, Penuh, Libur).
- Pembuatan kode unik reservasi (`CDC-YYMMDD-XXXX`) dan ringkasan pesan WhatsApp otomatis (`wa.me`) untuk verifikasi janji temu.

> ℹ️ **Catatan Portofolio:** Seluruh entitas dokter, layanan, testimoni, alamat, dan nomor kontak pada situs ini bersifat rekaan untuk kebutuhan demonstrasi portofolio rekayasa antarmuka (frontend engineering). Tidak ada transaksi finansial atau backend medis nyata yang diproses.

---

## ✨ Fitur Utama

1. **Beranda (`/`):**
   - Hero banner dengan CTA ganda terarah (*Buat Reservasi* & *Lihat Jadwal*).
   - Indikator status operasional klinik hari ini (Buka/Tutup dengan jam WIB).
   - Ringkasan profil dengan animasi *counter* angka saat terlihat di layar.
   - Katalog layanan unggulan dan profil dokter spesialis pilihan.
   - Langkah alur reservasi terpadu dan testimoni pasien.

2. **Tentang Klinik (`/tentang`):**
   - Sejarah dan nilai inti klinik (Higienis Bertaraf Medis, Pendekatan Empatis, Transparansi Biaya, dll.).
   - Galeri fasilitas modern dengan gambar WebP responsif.
   - Alur kunjungan pasien 5 tahap.
   - Peta lokasi (gambar WebP statis hemat performa dengan opsi interaktif Google Maps).

3. **Katalog & Detail Layanan (`/layanan`, `/layanan/:slug`):**
   - Pencarian layanan instan dan filter kategori (Pencegahan, Estetik, Bedah & Khusus).
   - Halaman detail komprehensif: kapan perawatan dibutuhkan, langkah prosedur, persiapan sebelum perawatan, estimasi biaya, dokter pelaksana, dan rekomendasi layanan terkait.
   - Sticky CTA Bar pada perangkat mobile untuk akses cepat reservasi.

4. **Direktori & Profil Dokter (`/dokter`, `/dokter/:slug`):**
   - Pencarian dokter berdasarkan nama atau keahlian klinis.
   - Profil dokter detail: riwayat pendidikan, minat klinis, bahasa yang dikuasai, layanan yang ditangani, dan ringkasan jadwal praktek mingguan.
   - Penanda sesi praktek aktif hari ini dan pengumuman cuti.

5. **Jadwal Praktek Terpadu (`/jadwal`):**
   - Matriks mingguan dokter x hari (Senin – Minggu) pada tampilan desktop.
   - Tampilan tab hari bebas *scroll* horizontal pada perangkat mobile.
   - Penanda denyut dinamis *"Sedang Praktek"* untuk dokter yang sedang bertugas saat jam kunjungan dibuka.
   - Sinkronisasi filter ke query URL (`?dokter=...&hari=...`) untuk kemudahan berbagi tautan.

6. **Alur Reservasi Online 4 Langkah (`/reservasi`):**
   - **Langkah 1 (Layanan):** Kartu pilihan layanan gigi beserta estimasi durasi waktu.
   - **Langkah 2 (Dokter):** Opsi dokter spesifik atau penetapan otomatis (*smart doctor assignment*).
   - **Langkah 3 (Jadwal):** Strip navigator 14 hari dengan status teks & ikon, tombol lompat ke tanggal tersedia berikutnya, dan slot jam per sesi (Pagi, Siang, Sore).
   - **Langkah 4 (Data Pasien):** Formulir data minimalis tervalidasi Zod (nama, WhatsApp, email, status pasien baru/lama, batas catatan 300 karakter, persetujuan syarat, dan proteksi spam honeypot).
   - **Layar Konfirmasi:** Tampilan kode reservasi `CDC-YYMMDD-XXXX`, tombol kirim WhatsApp, salin ringkasan jadwal, dan opsi pengosongan data lokal untuk peninjauan *reviewer*.

---

## 🛠️ Tech Stack & Arsitektur

| Komponen | Teknologi | Keterangan |
|---|---|---|
| **Framework** | Vue 3 (Composition API `<script setup>`) | Single Page Application berbasis Vite |
| **Routing** | Vue Router 4 | Lazy-loaded routes & dynamic query handling |
| **Styling** | Tailwind CSS | Tema Medcity: Deep Navy `#0e204d`, Dental Sapphire Blue `#1e60d5` (tanpa warna tosca/teal) |
| **Validasi Form** | Zod | Skema validasi deklaratif dan pesan error ramah pengguna |
| **Metadata & SEO** | `@unhead/vue` | Meta tag judul, deskripsi, Open Graph, dan Twitter Card per halaman |
| **Pengolahan Gambar** | `sharp` | Pipeline konversi WebP otomatis (1280, 768, 480 px) |
| **Font** | Plus Jakarta Sans (self-hosted WOFF2) | Zero third-party CDN, `font-display: swap` |
| **Testing** | Vitest + Vue Test Utils + Happy DOM | 92 unit tests covering pure helpers, validation, and UI interaction |
| **Penyimpanan Data** | JSON Lokal + Browser Storage | Reservasi disimpan di `localStorage`, draft sesi di `sessionStorage` |

---

## ♿ Standar Kualitas UX & Aksesibilitas (PRD §11)

- **UX-1 s.d. UX-3:** Alur terpandu 4 langkah, tanggal/slot berstatus visual & teks (Tersedia, Penuh, Libur), tombol pintas ke tanggal tersedia berikutnya dan saluran bantuan WhatsApp.
- **UX-4 Mobile First:** Area sentuh minimal 44×44 px, ukuran font isian minimal 16 px (`text-base`) guna mencegah auto-zoom Safari di iOS, floating action bar terisolasi dari tumpang tindih.
- **UX-6 & UX-7 Resiliensi Data:** Draft reservasi otomatis tersimpan ke `sessionStorage` saat berpindah langkah atau me-refresh halaman.
- **UX-8 Aksesibilitas:** Kontras teks rasio WCAG AA, navigasi tombol panah keyboard (`ArrowLeft`/`ArrowRight`) pada strip tanggal, atribut `role="radiogroup"` & `role="radio"`, pesan error terhubung melalui `aria-describedby`, serta menghormati preferensi `prefers-reduced-motion`.
- **UX-10 & UX-11:** Seluruh waktu menggunakan format bahasa Indonesia dengan keterangan zona waktu WIB; gambar konten dimuat secara *lazy-load* dengan rasio aspek terkunci guna mencegah *Cumulative Layout Shift* (CLS).

---

## 🚀 Panduan Menjalankan Proyek

### Prasyarat
- Node.js versi 18 atau lebih tinggi
- npm versi 9 atau lebih tinggi

### Instalasi & Menjalankan Dev Server
```bash
# Clone repositori
git clone https://github.com/username/candraloka-dental.git
cd candraloka-dental

# Pasang dependensi
npm install

# Jalankan server pengembangan lokal (http://localhost:5173)
npm run dev
```

### Menjalankan Unit Test
```bash
# Eksekusi seluruh rangkaian test Vitest (92 tests)
npm test
```

### Optimasi Gambar & Build Produksi
```bash
# Validasi dan konversi gambar sumber WebP
npm run check:images

# Build bundel produksi
npm run build

# Pratinjau hasil build produksi
npm run preview
```

---

## 📁 Struktur Direktori

```text
candraloka-dental/
├── context/               # Dokumentasi proyek (PRD.md, rules.md, SCHEMA.md, CHANGELOG.md)
├── public/
│   ├── fonts/             # Self-hosted Plus Jakarta Sans (.woff2)
│   ├── images/            # File WebP teroptimasi (1280, 768, 480 px)
│   └── og-image.png       # Open Graph social preview (1200x630 px)
├── scripts/
│   ├── check-images.mjs   # Script validator kepatuhan format & anggaran gambar
│   ├── optimize-images.mjs# Pipeline konversi WebP sharp
│   └── generate-source-images.mjs
├── src/
│   ├── assets/            # CSS global & konfigurasi font
│   ├── components/
│   │   ├── layout/        # Navbar, Footer, TopBar, FloatingWhatsapp, ScrollToTop
│   │   ├── ui/            # Button, Card, Badge, Accordion, Toast, StepIndicator, ResponsiveImage
│   │   ├── sections/      # Bagian halaman Beranda & Tentang
│   │   ├── doctor/        # Komponen kartu & badge profil dokter
│   │   └── service/       # Komponen kartu & filter layanan
│   ├── data/              # Sumber data JSON (clinic, services, doctors, home, testimonials)
│   ├── lib/               # Fungsi murni (time, schedule, availability, format, reservation, schemas)
│   ├── pages/             # Home, About, Services, ServiceDetail, Doctors, DoctorDetail, Schedule, Booking, NotFound
│   ├── router/            # Konfigurasi Vue Router
│   └── main.js
├── vercel.json            # Konfigurasi SPA routing & header cache aset
└── package.json
```

---

## 📄 Lisensi
Proyek ini dibuat untuk keperluan portofolio frontend. Lisensi bebas digunakan untuk referensi pembelajaran.
