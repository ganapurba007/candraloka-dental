# rules.md — Cara Kerja & Standar Proyek

> File ini WAJIB dibaca di awal setiap sesi sebelum memulai pengerjaan task/kode.

## 1. Prinsip Utama Kerja (Anti-Halu & Anti-Drift)

1. **Verifikasi langsung sebelum berasumsi:**
   - Selalu baca kode aktual sebelum menyimpulkan ketersediaan fungsi, komponen, atau struktur file.
   - Jangan berasumsi bahwa suatu hal sudah selesai jika belum membaca implementasinya.
2. **Kebenaran data:**
   - Rujukan struktur data aktual adalah `context/SCHEMA.md` dan file JSON di `src/data/`, bukan ingatan atau rencana awal di PRD.
   - Jika terdapat perbedaan antara dokumentasi dan kode nyata, laporkan dan sinkronkan dokumentasi.
3. **Dokumentasi selalu terbarui:**
   - Setiap selesai mengerjakan fase atau task yang mengubah scope/struktur data, segera perbarui `AGENTS.md`, `context/CHANGELOG.md`, `context/SCHEMA.md`, dan `context/PRD.md` di sesi yang sama.

## 2. Git & Commit Guidelines

- **Format Commit:** Selalu gunakan format Conventional Commits dalam **bahasa Inggris singkat**:
  - `feat: <short description>` — fitur baru
  - `fix: <short description>` — perbaikan bug/error
  - `style: <short description>` — perbaikan styling/formatting UI tanpa mengubah logika
  - `refactor: <short description>` — refactoring kode tanpa mengubah fitur
  - `test: <short description>` — penambahan atau perbaikan unit test
  - `docs: <short description>` — pembaruan dokumentasi
  - `chore: <short description>` — konfigurasi build, dependencies, atau tooling
- Commit secara teratur untuk setiap unit kerja yang selesai dan terverifikasi.

## 3. Standar Kode & Arsitektur

- **Framework & Paradigma:** Vue 3 menggunakan Composition API dengan `<script setup>` dalam Single File Component (`.vue`).
- **Penamaan Komponen:** PascalCase untuk komponen (misal `ResponsiveImage.vue`, `Navbar.vue`).
- **Struktur Komponen:**
  - `src/components/layout/` — komponen struktural global (Navbar, Footer, TopBar, dll.)
  - `src/components/ui/` — komponen UI reusable (Button, Card, Badge, Accordion, Toast, dll.)
  - `src/components/sections/` — section tampilan halaman (Hero, ServiceList, dll.)
  - `src/components/booking/` — komponen alur reservasi
  - `src/components/doctor/` — komponen profil & kartu dokter
  - `src/components/service/` — komponen layanan
- **Fungsi Murni (`src/lib/`):**
  - Logika jadwal, ketersediaan slot, kode reservasi, dan pembuat pesan WhatsApp wajib berupa fungsi murni yang menerima parameter `now` (waktu referensi WIB).
  - Tidak boleh mengakses `Date.now()`, `localStorage`, atau `window` secara langsung di dalam fungsi murni `src/lib/`.
- **Composables (`src/composables/`):**
  - Mengelola state reaktif runtime dan interaksi storage/browser (misal `useReservationDraft`, `useReservations`).
- **Styling:**
  - Gunakan Tailwind CSS dengan token tema yang konsisten.
  - Hindari CSS kustom ad-hoc jika bisa dicapai dengan token Tailwind.
  - Palet warna mengacu pada tema Medcity dengan Dental Sapphire Blue (`#1e60d5` / `#2563eb`) dan Deep Navy (`#0e204d`). Dilarang menggunakan warna tosca/teal (termasuk `#21cdc0`) dan warna `#12A193`.
- **Data Dinamis:**
  - Konten klinik, layanan, dokter, dan jadwal selalu dibaca dari `src/data/*.json`, jangan pernah di-hardcode ke dalam template komponen.

## 4. Standar Performa & Gambar (PRD §12)

- **Format Gambar:** Semua gambar konten wajib berformat `.webp`.
- **Komponen Gambar:** Wajib memakai `ResponsiveImage.vue` untuk semua gambar konten dengan varian ukuran (1280, 768, 480 px).
- **Pipeline Gambar:**
  - File mentah di `src-images/`.
  - Dikonversi via `npm run images` menggunakan `sharp` ke `public/images/`.
  - Verifikasi integritas ukuran & format via `npm run check:images`.
- **Font:** Self-hosted `.woff2` dengan `font-display: swap`. Tidak menggunakan font external CDN.

## 5. Testing & Kualitas

- Tulis unit test untuk helper kalkulasi slot, jadwal, validasi skema Zod, dan pembuatan pesan WhatsApp menggunakan Vitest.
- Pastikan semua test hijau (`npm test`) sebelum menyatakan fase/task selesai.
