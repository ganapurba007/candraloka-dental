# PRD.md — Website Klinik Gigi Dantaloka Dental Care (Portofolio)

> Dokumen ini adalah RENCANA. Untuk kebenaran struktur data saat ini, selalu rujuk `SCHEMA.md`, bukan §4 di bawah. Kalau ada perbedaan antara section manapun di sini dengan kode aktual, catat di §9 Amandemen — jangan biarkan diam-diam berbeda.

## Daftar Isi
- §1 Overview
- §2 Tech Stack
- §3 Functional Requirements
- §4 Data Model (rencana awal — lihat SCHEMA.md untuk aktual)
- §5 Security & Constraints
- §6 Milestone
- §7 Non-Goals (di luar scope)
- §8 Development Guidelines
- §9 Amandemen (log perubahan scope dari rencana awal)
- §10 Referensi Tampilan
- §11 Prinsip UX (User Friendly)
- §12 Optimasi Sejak Awal (Performa & Gambar WebP)

---

## 1. Overview
**Apa yang dibangun:** Website klinik gigi untuk **Dantaloka Dental Care**, klinik rekaan untuk keperluan portofolio, memakai Vue 3 dan Tailwind CSS. Fitur utama: tentang klinik, layanan, profil dokter, jadwal praktek, dan reservasi online dengan pemilihan dokter, tanggal, dan jam berdasarkan ketersediaan. Semua konten berasal dari file JSON lokal; tidak ada backend dan tidak ada pembayaran.
**Untuk siapa:** (1) calon pasien yang ingin tahu layanan dan dokter, lalu membuat janji dengan cepat dari ponsel; (2) reviewer portofolio (HRD/engineer) yang menilai kualitas UI, UX, dan kode.
**Masalah yang diselesaikan:** Menunjukkan kemampuan membangun alur reservasi berbasis jadwal (perhitungan slot, validasi, status ketersediaan) yang jelas dan mudah dipakai, dalam tampilan yang tenang dan terpercaya untuk layanan kesehatan.

## 2. Tech Stack
| Layer | Pilihan | Alasan singkat |
|---|---|---|
| Backend | — (tidak ada) | Scope frontend saja; reservasi berakhir di halaman konfirmasi dan tautan WhatsApp |
| Frontend | Vue 3 (Vite, Composition API `<script setup>`), Vue Router, Tailwind CSS | Sesuai target portofolio |
| Form & validasi | VeeValidate + Zod (`@vee-validate/zod`) | Validasi deklaratif, mudah dites |
| Database | — (tidak ada) | Data di `src/data/*.json`; reservasi yang dibuat pengguna disimpan di `localStorage` perangkat |
| Auth | — (tidak ada) | Tidak ada akun/login |
| Hosting/Deploy | Vercel atau Netlify | Gratis, deploy dari GitHub |

Pendukung: `lucide-vue-next` (ikon), `@unhead/vue` (meta per halaman), `Intl` (format tanggal dan jam Indonesia, zona WIB), `sharp` (devDependency; konversi dan pengecilan gambar ke WebP), ESLint + Prettier, Vitest + Vue Test Utils. Tanpa library kalender/date picker: pemilih tanggal berupa strip hari buatan sendiri.

## 3. Functional Requirements

> Format: FR-[nomor modul].[nomor urut] — [judul]. Jangan ubah nomor FR yang sudah ada meskipun requirement-nya diubah — tambahkan FR baru dengan nomor lanjutan dan catat di §9.

### 3.1 Layout Global
- **FR-1.1** — Top bar kecil: telepon/WhatsApp (klik untuk menghubungi), lokasi singkat, dan jam praktek klinik; disembunyikan di mobile.
- **FR-1.2** — Navbar sticky: logo; menu Beranda, Tentang, Layanan, Dokter, Jadwal Praktek; tombol CTA "Buat Reservasi" menuju `/reservasi`. Di mobile menjadi hamburger menu yang bisa ditutup via tombol, klik link, dan Esc.
- **FR-1.3** — Menu aktif diberi penanda visual; halaman dalam menampilkan breadcrumb.
- **FR-1.4** — Footer: ringkasan klinik, tautan cepat, daftar layanan, kontak (alamat, telepon, jam praktek), tombol "Petunjuk Arah", dan catatan "Situs ini adalah proyek portofolio; reservasi tidak diproses oleh klinik sungguhan."
- **FR-1.5** — Tombol WhatsApp melayang di semua halaman (membuka `wa.me` dengan pesan sapaan awal), tidak menutupi tombol aksi utama di mobile.
- **FR-1.6** — Scroll kembali ke atas saat pindah halaman, plus tombol *scroll to top*.
- **FR-1.7** — Setiap halaman punya `<title>` dan meta description sendiri.
- **FR-1.8** — Halaman 404 dengan tautan ke Beranda, Layanan, dan Reservasi.

### 3.2 Beranda
- **FR-2.1** — Hero: headline, subheadline, gambar, dua CTA ("Buat Reservasi" dan "Lihat Jadwal Praktek").
- **FR-2.2** — Strip info cepat yang menumpuk di bawah hero: status praktek hari ini (Buka/Tutup beserta jamnya, dihitung dari data dan waktu WIB), telepon/WhatsApp, dan lokasi.
- **FR-2.3** — Section tentang singkat dengan 3 angka beranimasi hitung saat terlihat di layar (mis. tahun melayani, pasien terlayani, jumlah dokter) dan tombol ke `/tentang`.
- **FR-2.4** — Layanan unggulan: 6 kartu (data `featured: true`) menuju `/layanan/:slug`, dan tombol "Semua Layanan".
- **FR-2.5** — Alur reservasi 4 langkah bernomor (Pilih Layanan, Pilih Dokter, Pilih Jadwal, Isi Data) dengan CTA ke `/reservasi`.
- **FR-2.6** — Section dokter: 3 kartu (data `featured: true`) menuju `/dokter/:slug`, dan tombol "Lihat Semua Dokter".
- **FR-2.7** — Testimoni pasien (3 item; foto, nama, layanan yang dijalani, kutipan).
- **FR-2.8** — Banner CTA penutup menuju `/reservasi`.

### 3.3 Tentang
- **FR-3.1** — Header halaman: breadcrumb, judul, deskripsi singkat, dan dua tombol ("Lihat Dokter", "Layanan Kami").
- **FR-3.2** — Profil klinik: cerita singkat, gambar, visi, dan misi.
- **FR-3.3** — Nilai layanan: 6 poin berikon (mis. Pemeriksaan Teliti, Peralatan Steril, Penjelasan yang Jelas).
- **FR-3.4** — Fasilitas klinik: grid 4–6 foto dengan keterangan.
- **FR-3.5** — Alur kunjungan pasien 5 langkah bernomor (Reservasi, Registrasi, Pemeriksaan, Perawatan, Kontrol).
- **FR-3.6** — Tim dokter ringkas (kartu menuju profil).
- **FR-3.7** — Lokasi dan kontak: alamat, telepon/WhatsApp, jam praktek klinik, peta (gambar WebP statis yang menaut ke peta, atau embed iframe yang dimuat hanya saat diklik), dan tombol "Petunjuk Arah".
- **FR-3.8** — Banner CTA menuju `/reservasi`.

### 3.4 Layanan
- **FR-4.1** — `/layanan`: grid kartu layanan (ikon/gambar, nama, ringkasan, perkiraan durasi), filter kategori (Umum, Estetika, Ortodonti, Bedah, Anak) berupa chip, dan kolom pencarian nama layanan.
- **FR-4.2** — `/layanan/:slug`: deskripsi, kapan layanan dibutuhkan, tahapan perawatan, persiapan sebelum datang, perkiraan durasi, daftar dokter yang menangani (menaut ke profil), dan layanan terkait.
- **FR-4.3** — Tombol "Reservasi Layanan Ini" menuju `/reservasi?layanan=:slug`; di mobile tersedia bar CTA tetap di bawah layar.
- **FR-4.4** — Tidak ada daftar harga; tampilkan keterangan "Rincian biaya disampaikan dokter setelah pemeriksaan."
- **FR-4.5** — Slug tidak ditemukan menampilkan halaman 404.

### 3.5 Profil Dokter
- **FR-5.1** — `/dokter`: grid kartu (foto, nama dengan gelar, spesialisasi, lama pengalaman, hari praktek ringkas), filter spesialisasi, tombol "Lihat Profil" dan "Reservasi".
- **FR-5.2** — `/dokter/:slug`: foto, nama, spesialisasi, pengalaman, bahasa, bio, riwayat pendidikan, minat/layanan yang ditangani (menaut ke layanan), jadwal praktek mingguan, dan penanda "Praktek hari ini" bila berlaku.
- **FR-5.3** — Tombol "Reservasi dengan Dokter Ini" menuju `/reservasi?dokter=:slug`; di mobile tersedia bar CTA tetap.
- **FR-5.4** — Slug tidak ditemukan menampilkan halaman 404.

### 3.6 Jadwal Praktek
- **FR-6.1** — `/jadwal`: tabel mingguan (baris dokter, kolom Senin–Minggu) berisi jam sesi. Di mobile berubah menjadi tampilan per hari (tab hari berisi daftar dokter dan jamnya) tanpa scroll horizontal.
- **FR-6.2** — Filter: pilih dokter dan pilih hari; hasil diperbarui tanpa reload dan tersimpan di query URL.
- **FR-6.3** — Penanda "Hari ini" pada kolom/tab hari berjalan dan "Sedang praktek" pada sesi yang berlangsung (berdasarkan waktu WIB saat ini).
- **FR-6.4** — Catatan cuti: tanggal cuti dokter dalam jendela pemesanan ditampilkan sebagai "Tidak praktek pada [tanggal]" di dokter terkait.
- **FR-6.5** — Tombol "Reservasi" pada tiap dokter menuju `/reservasi?dokter=:slug`.
- **FR-6.6** — Keterangan jam operasional klinik dan label zona waktu WIB.

### 3.7 Reservasi Online
- **FR-7.1** — `/reservasi` berupa alur 4 langkah dengan indikator progres: (1) Layanan, (2) Dokter, (3) Tanggal dan jam, (4) Data pasien dan konfirmasi. Parameter `layanan` dan `dokter` di URL mengisi langkah terkait terlebih dahulu; pengguna tetap bisa mengubahnya.
- **FR-7.2** — Langkah 1: pilih layanan (kartu pilihan dengan perkiraan durasi).
- **FR-7.3** — Langkah 2: pilih dokter dari yang menangani layanan tersebut, atau "Dokter mana saja yang tersedia" (default). Tiap pilihan menampilkan foto, nama, dan spesialisasi.
- **FR-7.4** — Langkah 3: strip 14 hari ke depan sebagai pemilih tanggal, dengan status per tanggal (Tersedia, Penuh, Libur) yang dinyatakan dengan teks dan ikon, bukan warna saja; tombol "Ke tanggal tersedia berikutnya". Setelah tanggal dipilih, slot jam dikelompokkan Pagi/Siang/Sore; slot yang tidak tersedia dinonaktifkan beserta alasannya (Penuh, Sudah lewat). Untuk "dokter mana saja", dokter ditetapkan otomatis saat jam dipilih dan namanya ditampilkan.
- **FR-7.5** — Ketersediaan dihitung sesuai aturan di §5 (jadwal praktek, cuti, jam terisi, reservasi tersimpan di perangkat, durasi layanan, jeda minimal, dan jendela pemesanan).
- **FR-7.6** — Langkah 4: form data pasien (tabel di bawah) dan ringkasan reservasi (layanan, dokter, tanggal dengan nama hari, jam WIB), serta keterangan singkat penggunaan data di dekat tombol kirim.
- **FR-7.7** — Submit: tombol loading/nonaktif, simulasi 1–2 detik, lalu ketersediaan slot dicek ulang. Jika slot baru saja terisi, tampilkan pesan "Jam ini baru saja terisi, silakan pilih jam lain" dan kembali ke langkah 3 tanpa menghapus data lain.
- **FR-7.8** — Halaman konfirmasi: kode reservasi, ringkasan, status "Menunggu konfirmasi klinik", tombol "Kirim Konfirmasi via WhatsApp" (membuka `wa.me` dengan pesan terisi), "Salin Ringkasan", dan "Buat Reservasi Lain"; disertai catatan bahwa situs ini proyek portofolio.
- **FR-7.9** — Reservasi yang berhasil disimpan di `localStorage` perangkat sehingga slot yang sama langsung tidak tersedia di browser ini.
- **FR-7.10** — Tautan kecil "Hapus data reservasi di perangkat ini" untuk mengosongkan reservasi tersimpan (berguna saat peninjauan).
- **FR-7.11** — Draft isian disimpan di `sessionStorage` agar tidak hilang saat refresh atau tombol Kembali; tombol Kembali/Lanjut antar langkah mempertahankan isian.

**Field langkah 4 (FR-7.6):**

| Field | Tipe | Aturan | Pesan error |
|---|---|---|---|
| Nama lengkap | text | Wajib, 3–60 karakter | "Nama wajib diisi (minimal 3 karakter)" |
| WhatsApp | tel | Wajib, `08xx` atau `+62xx`, 10–14 digit | "Nomor WhatsApp tidak valid" |
| Email | email | Opsional; jika diisi harus valid | "Format email tidak valid" |
| Status pasien | radio | Wajib: Pasien baru / Pasien lama | "Pilih status pasien" |
| Keluhan/keperluan | textarea | Opsional, maks. 300 karakter, ada penghitung | "Maksimal 300 karakter" |
| Persetujuan | checkbox | Wajib dicentang | "Centang persetujuan untuk melanjutkan" |
| Honeypot | hidden | Harus kosong (anti-spam sederhana) | — |

## 4. Data Model (Rencana Awal)

> ⚠️ Section ini rencana awal saat proyek dimulai. Untuk struktur AKTUAL saat ini, selalu cek `SCHEMA.md`. Proyek ini tidak memakai database; "data model" berarti struktur file JSON di `src/data/` ditambah objek runtime di browser.

```
src/data/
├── clinic.json        (identitas, kontak, jam operasional, aturan reservasi, konten Tentang)
├── home.json          (hero, statistik, langkah reservasi)
├── services.json      (layanan)
├── doctors.json       (profil dokter, jadwal praktek, cuti, jam terisi)
└── testimonials.json
```

Volume data minimal: 8 layanan, 5 dokter (3 unggulan), 4 testimoni, 6 foto fasilitas. Beberapa dokter diberi `leaveDates` dan `bookedSlots` agar status Penuh/Libur bisa diperagakan.

## 5. Security & Constraints
- Tidak ada backend, auth, atau pembayaran. Data pasien hanya ada di browser (reservasi di `localStorage`, draft di `sessionStorage`) dan tidak dikirim ke server mana pun. Pengiriman via WhatsApp dilakukan sendiri oleh pengguna lewat tautan `wa.me`.
- Data minimal: hanya nama, WhatsApp, email opsional, status pasien, dan keluhan opsional. Tidak meminta NIK, tanggal lahir, riwayat penyakit, atau dokumen.
- Seluruh nama klinik, dokter, nomor telepon/WhatsApp, email, dan alamat adalah rekaan; jangan memakai data nyata siapa pun. Profil dokter tidak memuat nomor STR/SIP.
- Konten medis bersifat umum dan netral: tanpa klaim hasil ("pasti", "paling", "tanpa sakit"), tanpa foto sebelum-sesudah, dan tanpa rating agregat dari platform luar.
- Situs menyatakan dirinya proyek portofolio (FR-1.4, FR-7.8) agar tidak disangka klinik sungguhan.
- Semua input divalidasi di sisi klien dengan skema Zod; teks pengguna di pesan WhatsApp di-*encode* (`encodeURIComponent`); tidak memakai `v-html` untuk data pengguna.
- Gambar wajib bebas lisensi (Unsplash/Pexels); foto orang harus dari sumber yang mengizinkan penggunaan komersial; atribusi dicatat di README. Semua gambar konten berformat `.webp` dan mengikuti aturan optimasi di §12.
- Target Lighthouse (Performance, Accessibility, Best Practices, SEO) minimal 90 pada layar mobile, dijaga sejak fase pertama (lihat §12).

**Aturan ketersediaan (dipakai FR-6.x dan FR-7.x):**
- Semua jam dan tanggal diartikan dalam WIB (UTC+7); fungsi perhitungan menerima `now` sebagai parameter agar mudah dites.
- Slot dimulai dari awal sesi `practiceHours` dengan langkah `slotMinutes` (30 menit). Reservasi memakai slot berurutan sepanjang `durationMinutes` layanan dan harus muat penuh di dalam satu sesi.
- Slot tidak tersedia bila bentrok dengan `bookedSlots` dokter atau reservasi tersimpan di perangkat, atau bila tanggalnya ada di `leaveDates`.
- Untuk hari ini, hanya slot yang dimulai paling cepat `minLeadMinutes` (60 menit) dari sekarang. Tanggal yang bisa dipilih: hari ini sampai `bookingWindowDays` (30) hari ke depan; strip tanggal menampilkan 14 hari dan bisa digeser.
- Dokter hanya bisa dipilih untuk layanan yang ada di `serviceIds`-nya.
- Pilihan "dokter mana saja": slot tersedia jika minimal satu dokter yang menangani layanan itu kosong; dokter yang ditetapkan adalah yang paling sedikit terisi pada hari itu (seri → `id` terkecil).

## 6. Milestone
| Fase | Fitur | Status |
|---|---|---|
| 0 | Setup: Vite, Tailwind (token tema), Vue Router, ESLint/Prettier, Vitest, struktur folder, pipeline gambar WebP (`sharp`), `ResponsiveImage`, font self-host, dan `check:images` (§12) | ⬜ |
| 1 | Layout global (FR-1.x) + komponen UI dasar (Button, Card, Badge, Accordion, Toast, StepIndicator) | ⬜ |
| 2 | Data JSON + helper murni (format tanggal/jam WIB, slot, ketersediaan, kode reservasi, pesan WhatsApp) beserta test | ⬜ |
| 3 | Beranda (FR-2.x) | ⬜ |
| 4 | Tentang (FR-3.x) | ⬜ |
| 5 | Layanan: daftar dan detail (FR-4.x) | ⬜ |
| 6 | Profil dokter: daftar dan detail (FR-5.x) | ⬜ |
| 7 | Jadwal praktek (FR-6.x) | ⬜ |
| 8 | Reservasi online + konfirmasi (FR-7.x) | ⬜ |
| 9 | Audit akhir: polishing UX, responsif, aksesibilitas, SEO, dan audit performa menyeluruh (§11, §12) | ⬜ |
| 10 | Rilis: deploy, README, screenshot, tautan demo | ⬜ |

## 7. Non-Goals
Hal-hal yang SENGAJA tidak dibangun di scope ini, supaya AI tidak menambahkannya secara tidak diminta:
- Backend, database, panel admin, akun pasien/login, dan pembayaran atau deposit online.
- Pengiriman WhatsApp/email otomatis, pengingat, dan notifikasi (hanya tautan `wa.me` yang dibuka pengguna).
- Ubah jadwal (reschedule) atau pembatalan reservasi.
- Rekam medis, unggah dokumen, serta pengumpulan NIK, tanggal lahir, atau riwayat penyakit.
- Blog/artikel edukasi, halaman FAQ, halaman galeri terpisah, daftar harga/paket, toko, dan keranjang.
- Foto sebelum-sesudah, klaim hasil medis, rating agregat dari platform luar, video, live chat, dan telemedicine.
- Banyak cabang, banyak klinik/departemen medis di luar dental, dark mode, dan multi bahasa.
- Library kalender/date picker, state management (Pinia), dan library animasi tambahan, kecuali diminta.
- Format gambar konten selain WebP (JPG/PNG/GIF/AVIF), CDN atau layanan transformasi gambar berbayar, dan library gambar tambahan di luar `sharp`.

## 8. Development Guidelines

### 8.1 Alur Kerja Per Fase
1. Baca FR terkait di §3
2. Tulis rencana singkat (langkah + cara verifikasi)
3. Implementasi
4. Jalankan test, pastikan lolos
5. Update dokumentasi (lihat 8.4)
6. Commit

### 8.2 Standar Kode
Rujuk `rules.md`. Catatan spesifik proyek:
- Single File Component `.vue` dengan nama PascalCase dan `<script setup>`; satu komponen per file di `src/components/` (`layout/`, `ui/`, `sections/`, `doctor/`, `service/`, `booking/`).
- Halaman di `src/pages/`; composable di `src/composables/` (mis. `useCountUp`, `useInView`, `useReservationDraft`, `useReservations`); helper murni di `src/lib/` (`format.js`, `time.js`, `schedule.js`, `availability.js`, `reservation.js`, `whatsapp.js`, `schemas.js`).
- Logika jadwal, slot, ketersediaan, kode reservasi, dan pesan WhatsApp harus berupa fungsi murni di `src/lib/` (menerima `now` sebagai parameter), tanpa akses langsung ke `Date.now()` atau storage; komponen dan composable yang memanggilnya.
- Konten selalu dibaca dari `src/data/*.json`, tidak ditulis keras di komponen.
- Warna, font, dan spasi utama didefinisikan sebagai token di `tailwind.config`.
- Rute halaman lazy-loaded: `component: () => import('./pages/Home.vue')`.
- Teks antarmuka berbahasa Indonesia; semua format tanggal dan jam lewat `src/lib/format.js` dengan label WIB.
- Semua gambar konten lewat `src/components/ui/ResponsiveImage.vue`; file asli di `src-images/`, hasil WebP di `public/images/`, skrip di `scripts/` (`optimize-images.mjs`, `check-images.mjs`). Aturan lengkap di §12.

### 8.3 Testing
- Minimum test per fitur baru: pembuatan slot dari `practiceHours`, durasi layanan yang memakai slot berurutan, bentrok dengan `bookedSlots` dan reservasi tersimpan, cuti, jeda minimal untuk hari ini, batas jendela pemesanan, pemilihan dokter otomatis, format kode reservasi, pembuat pesan WhatsApp, skema Zod form reservasi (valid dan tiap aturan invalid), dan perilaku komponen `ReservationFlow` (navigasi langkah, slot nonaktif, pesan slot baru terisi) dengan Vue Test Utils.
- Satu test integritas data: semua `serviceIds` valid, sesi `practiceHours` tidak tumpang tindih, `durationMinutes` kelipatan `slotMinutes`, slug unik, semua path gambar berekstensi `.webp` dan file-nya ada.
- Pemeriksaan manual per fase: tampilan di 360, 768, 1024, 1280 px; navigasi keyboard pada strip tanggal dan slot; Lighthouse mobile untuk halaman yang dikerjakan di akhir tiap fase (audit menyeluruh di fase 9).
- Cara menjalankan test: `npm run test`

### 8.4 Definition of Done Per Fase
Fase dianggap selesai jika:
- [ ] Fitur berjalan sesuai FR terkait
- [ ] Test lolos (sebutkan jumlah di CHANGELOG)
- [ ] Tidak ada regresi di fitur lama
- [ ] Checklist UX di §11 yang relevan dengan fase ini terpenuhi
- [ ] Anggaran performa §12 terpenuhi untuk halaman yang dikerjakan (Lighthouse mobile ≥ 90, `npm run check:images` lolos)
- [ ] Docs updated: [Ya/Tidak — sebutkan file mana yang diupdate: PRD §9 / SCHEMA.md / keduanya / tidak ada perubahan scope]
- [ ] Entri baru ditambahkan di CHANGELOG.md

## 9. Amandemen

> Log semua perubahan/penambahan yang menyimpang dari rencana awal di §3/§4. Setiap entri baru ditambah di ATAS (paling baru di paling atas).

### 2026-10-12 — Fase 0: Optimasi sejak awal dan gambar WebP
**Berubah dari:** Format WebP dan target Lighthouse hanya disebut di §5, dan audit performa baru dilakukan di Fase 9 (§6, §8.3)
**Jadi:** Optimasi menjadi syarat tiap fase. Pipeline gambar WebP (`sharp`), komponen `ResponsiveImage`, font self-host, dan pemeriksa `check:images` disiapkan di Fase 0; anggaran dan aturannya ada di §12. Peta di FR-3.7 menjadi gambar WebP statis atau iframe yang dimuat saat diklik.
**Alasan:** Mencegah perbaikan performa menumpuk di akhir dan menjaga halaman tetap cepat sejak awal.
**FR baru (jika ada):** tidak ada (aturan non-fungsional di §12)

## 10. Referensi Tampilan

Acuan visual: https://7oroof.com/demos/medcity/about-us.html (tema HTML kesehatan "Medcity"). Yang DIADOPSI adalah pola layout dan urutan section; konten, nama, dan aset visual dibuat sendiri dan sesuai tema dental. Jangan menyalin gambar, logo, atau teks dari situs referensi. Catatan: yang ditinjau baru halaman About Us. Halaman lain (appointment, doctors timetable, single doctor, dan varian "Home Dentist") hanya terlihat sebagai item menu dan belum dibuka.

| Pola di referensi | Dipakai sebagai |
|---|---|
| Top bar (nomor kontak, lokasi, jam) + tombol "Make Appointment" di header | FR-1.1, FR-1.2 |
| Banner judul halaman dengan dua tombol ("Find A Doctor", "Our Services") | FR-3.1 |
| Blok intro dengan paragraf misi dan tombol "Meet Our Doctors" | FR-3.2 |
| Daftar nilai bernomor/berikon (8 poin) | FR-3.3 (disederhanakan jadi 6) |
| Langkah bernomor 5 tahap dengan tautan aksi | FR-2.5, FR-3.5 |
| Banner ajakan bertindak ("True Healthcare For Your Family") | FR-2.8, FR-3.8 |
| Grid "Meet Our Doctors" (foto, nama, spesialisasi, ringkasan, Read More) | FR-2.6, FR-3.6, FR-5.1 |
| Testimoni pasien (foto kecil, nama, kutipan) | FR-2.7 |
| Footer: tautan cepat, kontak cepat, "Get Directions" | FR-1.4 |
| Menu "Doctors Timetable", "Single Doctor", "Appointments" | FR-6.x, FR-5.2, FR-7.x (hanya dari nama menu; rancangannya sendiri) |

Tidak diadopsi: blog "Resource Library", toko/keranjang, halaman harga, FAQ, galeri terpisah, "Departments" multi-klinik, klaim darurat 24/7, ikon sosial per dokter, video intro, dan rating agregat dari platform luar (lihat §7).
Tambahan di luar referensi: alur reservasi berbasis ketersediaan (FR-7.x) dan status praktek hari ini (FR-2.2, FR-6.3).

Palet warna dan tipografi final diputuskan di Fase 0 setelah mengamati referensi secara langsung (halaman yang dibaca berupa teks, jadi warna dan font belum diverifikasi). Arah umum: bersih, terang, tenang, dengan satu warna aksen yang menenangkan. Semua dijadikan token di `tailwind.config`.

## 11. Prinsip UX (User Friendly)

Setiap fase harus memenuhi poin yang relevan. Poin ini menjadi acuan reviewer.

- **UX-1 Reservasi cepat.** Maksimal 4 langkah, satu keputusan per langkah, progres selalu terlihat, dan bisa dimulai dari halaman layanan, dokter, atau jadwal lewat parameter URL.
- **UX-2 Ketersediaan jelas.** Tanggal dan slot menampilkan status Tersedia/Penuh/Libur dengan teks dan ikon, bukan warna saja; slot nonaktif disertai alasan.
- **UX-3 Tidak ada jalan buntu.** Bila tanggal penuh atau hasil kosong, tampilkan tombol ke tanggal tersedia berikutnya dan opsi bertanya lewat WhatsApp.
- **UX-4 Mobile-first.** Area ketuk minimal 44×44 px, font isian minimal 16 px, jenis input yang tepat (`tel`, `email`), bar CTA tetap di halaman detail, dan jadwal tanpa scroll horizontal.
- **UX-5 Bahasa tenang dan jelas.** Istilah dental disertai penjelasan awam singkat; nada menenangkan, tidak menakut-nakuti, dan tanpa klaim berlebihan.
- **UX-6 Umpan balik jelas.** Tombol menampilkan status loading/nonaktif; pesan error spesifik, singkat, dan tidak menyalahkan; konfirmasi menampilkan kode yang mudah disalin dan langkah berikutnya.
- **UX-7 Data tidak hilang.** Draft reservasi bertahan saat refresh dan tombol Kembali; berpindah langkah tidak menghapus isian.
- **UX-8 Aksesibel.** Kontras AA, fokus terlihat, strip tanggal dan slot dapat dioperasikan dengan keyboard (grup radio dengan tombol panah), label dan `alt` lengkap, error terhubung via `aria-describedby`, animasi menghormati `prefers-reduced-motion`.
- **UX-9 Privasi jelas.** Hanya data minimal yang diminta; penjelasan singkat penggunaan data tampil di dekat tombol kirim.
- **UX-10 Waktu tidak ambigu.** Semua jam berlabel WIB; tanggal ditulis lengkap dengan nama hari dalam format Indonesia.
- **UX-11 Terasa cepat dan stabil.** Gambar lazy-load kecuali yang pertama, rasio gambar tetap agar tidak bergeser, target LCP di bawah 2,5 detik pada koneksi 4G. Rincian anggaran ada di §12.

## 12. Optimasi Sejak Awal (Performa & Gambar WebP)

Berlaku sejak Fase 0 dan di setiap fase; ini bukan pekerjaan polishing di akhir. Fase tidak dianggap selesai jika anggaran di bawah terlewati (lihat §8.4).

### 12.1 Aturan gambar
- Semua gambar konten (hero, foto dokter, fasilitas, layanan, avatar testimoni, peta statis) berformat **`.webp`**. Tidak ada JPG/PNG/GIF untuk konten.
- Pengecualian (bukan gambar konten): logo dan ikon berformat SVG, favicon (`.svg` atau `.ico`), dan `og-image.png` (1200×630) karena sebagian crawler dan pratinjau chat belum konsisten membaca WebP. Tidak ada pengecualian lain.
- Alur: file asli (JPG/PNG dari sumber berlisensi) disimpan di `src-images/` (tidak ikut build). `npm run images` (`scripts/optimize-images.mjs`, memakai `sharp`) menghasilkan WebP ke `public/images/` dalam tiga lebar: 1280, 768, dan 480 px (tidak diperbesar melebihi ukuran asli), kualitas awal sekitar 78, metadata EXIF dihapus. Penamaan: `nama.webp` (1280) + `nama-768.webp` + `nama-480.webp`.
- JSON hanya menyimpan path varian terbesar (mis. `/images/doctors/nama-dokter.webp`); varian lain diturunkan oleh komponen lewat konvensi nama.
- Komponen `src/components/ui/ResponsiveImage.vue` wajib untuk semua gambar konten: `srcset` dan `sizes`, rasio tetap lewat kelas rasio atau `width`/`height` (mencegah layout shift), `decoding="async"`, dan `loading="lazy"` secara default. Gambar LCP (hero Beranda dan header halaman dalam) memakai `loading="eager"` dan `fetchpriority="high"`, serta di-*preload*.
- Anggaran ukuran per file: hero ≤ 150 KB; kartu/thumbnail (480 px) ≤ 40 KB; gambar detail/galeri (1280 px) ≤ 150 KB. Total gambar yang dimuat di atas lipatan pada satu halaman ≤ 300 KB.
- `npm run check:images` (`scripts/check-images.mjs`) berjalan otomatis di `prebuild` dan memasukkan hasilnya ke test integritas data. Gagal jika: ada path gambar di JSON yang bukan `.webp`, file tidak ada, varian 768/480 hilang, atau ukuran melebihi anggaran.

### 12.2 Aturan performa lain
- **Font:** maksimal 2 keluarga dan 3 bobot, di-*self-host* sebagai `.woff2` (subset Latin), `font-display: swap`, font utama di-*preload*; tanpa font dari CDN pihak ketiga.
- **JavaScript:** semua rute lazy-loaded; total JS awal Beranda ≤ 170 KB gzip; ikon diimpor per-ikon (`lucide-vue-next`); tidak menambah library di luar §2 tanpa alasan tertulis di §9; ukuran bundle dicek dari keluaran `vite build` di akhir tiap fase.
- **CSS:** hanya Tailwind dengan purge bawaan; tanpa CSS tambahan yang tidak dipakai.
- **Data:** halaman hanya mengimpor file JSON yang dipakainya; tidak memuat data yang tidak ditampilkan.
- **Animasi:** hanya properti `transform` dan `opacity`; menghormati `prefers-reduced-motion`.
- **Cache dan kompresi:** aset build ber-hash (bawaan Vite); kompresi Brotli/gzip dari host (bawaan Vercel/Netlify); gambar di `public/images/` diberi header cache panjang lewat konfigurasi host (`vercel.json` atau `_headers`).
- **Skrip pihak ketiga:** tidak ada (analytics, tag manager, widget chat) di v1.0.
- **Peta:** gambar WebP statis yang menaut ke peta; bila memakai iframe, dimuat hanya saat diklik.

### 12.3 Target dan cara verifikasi
| Metrik | Target (mobile, throttling Lighthouse bawaan) | Cara cek |
|---|---|---|
| Lighthouse Performance | ≥ 90 | Lighthouse untuk halaman yang dikerjakan, di akhir tiap fase |
| LCP | < 2,5 detik | Lighthouse |
| CLS | < 0,1 | Lighthouse |
| TBT | < 200 ms | Lighthouse |
| Gambar | Semua `.webp` dan sesuai anggaran | `npm run check:images` |
| JS awal Beranda | ≤ 170 KB gzip | Keluaran `vite build` |
