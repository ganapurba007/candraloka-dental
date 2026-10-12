# AGENTS.md

> File ini adalah pintu masuk pertama untuk AI agent. Baca file ini SEBELUM membaca file lain.

## Proyek
**Nama:** Website Klinik Gigi — Candraloka Dental Care (portofolio)
**Tujuan:** Website klinik gigi dengan fitur tentang, layanan, profil dokter, jadwal praktek, dan reservasi online berbasis ketersediaan. Dibuat untuk portofolio dengan fokus UX yang jelas dan mudah dipakai.
**Stack:** Vue 3 (Vite, Composition API), Vue Router, Tailwind CSS, VeeValidate + Zod, `sharp` (gambar WebP), data JSON lokal (tanpa backend/database/pembayaran), reservasi di `localStorage`, Vitest + Vue Test Utils

## Status Saat Ini
- **Fase aktif:** Fase 3 — Beranda (selesai) / Fase 4 — Tentang (siap)
- **Test:** 61 passed / 61 total
- **Sedang dikerjakan:** Fase 3 selesai
- **Update terakhir:** 2026-10-12

> Update 3 baris di atas setiap kali fase/task berubah. Jangan biarkan basi.

## Urutan Baca Dokumentasi (WAJIB diikuti urutannya)

1. **`context/rules.md`** — WAJIB dibaca setiap sesi, sebelum coding apapun. Berisi cara kerja (bukan apa yang dibangun).
2. **`context/PRD.md`** — baca HANYA section yang relevan dengan task saat ini. Gunakan daftar isi di bagian atas PRD untuk lompat langsung ke section terkait. **Jangan baca seluruh file** kecuali diminta eksplisit.
3. **`context/SCHEMA.md`** — rujukan struktur data AKTUAL (file JSON di `src/data/` dan objek runtime reservasi, tanpa database). Gunakan ini untuk detail teknis data, bukan §4 PRD (PRD hanya rencana awal, bisa basi).
4. **`context/CHANGELOG.md`** — baca 3-5 entri PALING BARU saja untuk konteks kerja terbaru. Jangan baca lebih dari itu kecuali diminta eksplisit.
5. **`context/CHANGELOG-archive.md`** — JANGAN dibaca sama sekali kecuali diminta eksplisit oleh user. Ini riwayat lama, tidak relevan untuk kerja aktif.

## Aturan Wajib (Anti-Halu & Anti-Drift)

- **Jangan asumsikan kode yang tidak kamu baca sendiri.** Kalau butuh tahu apakah sebuah fungsi/komponen/file data sudah ada, baca kodenya langsung — jangan menebak dari nama file atau dari ingatan sesi sebelumnya.
- **Jangan percaya PRD 100% untuk "apa yang sudah ada."** PRD adalah rencana, bisa basi. Kode dan `SCHEMA.md` adalah kebenaran. Kalau PRD dan kode berbeda, kode yang benar — laporkan selisihnya ke user, jangan diam-diam mengikuti salah satu.
- **Kalau tidak yakin, berhenti dan tanya.** Jangan lanjut coding dengan asumsi yang belum dikonfirmasi.
- **Setiap task yang mengubah scope** (fitur baru, field data baru, halaman baru) **wajib update dokumentasi di sesi yang sama**: `context/PRD.md` (section Amandemen) dan/atau `context/SCHEMA.md`. Jangan ditunda.
- **Jangan reproduksi ulang seluruh file besar ke dalam context percakapan** kalau hanya butuh satu bagian kecil — baca section spesifik saja untuk menghemat token.
- **Konten selalu dari `src/data/*.json`**, jangan hardcode di komponen. Logika jadwal, slot, ketersediaan, kode reservasi, dan pesan WhatsApp wajib berupa fungsi murni di `src/lib/` (menerima `now` sebagai parameter) beserta test. Aturan ketersediaan ada di PRD §5.
- **Konten layanan kesehatan:** netral, tanpa klaim hasil, tanpa foto sebelum-sesudah, tanpa nomor STR/SIP, dan tanpa mengumpulkan data sensitif (NIK, tanggal lahir, riwayat penyakit). Semua nama, kontak, dan alamat bersifat rekaan; jangan memakai data nyata. Referensi tampilan (PRD §10) hanya untuk pola layout; jangan menyalin gambar, logo, atau teks dari situs referensi.
- **Optimasi berlaku sejak awal, bukan di akhir.** Semua gambar konten wajib `.webp` lewat `ResponsiveImage` dan `npm run images`; jangan menambahkan JPG/PNG ke `public/`. Patuhi anggaran di PRD §12 dan jalankan `npm run check:images` sebelum commit.
- **Cek PRD §11 (Prinsip UX) dan §12 (Optimasi)** sebelum menyatakan sebuah fase selesai.

## Referensi Cepat
| Butuh tahu... | Baca file/section |
|---|---|
| Cara kerja & gaya kode | `context/rules.md` |
| Requirement fitur X | `context/PRD.md` § terkait |
| Aturan ketersediaan slot reservasi | `context/PRD.md` §5 |
| Struktur data (file JSON, Reservation) | `context/SCHEMA.md` |
| Acuan tampilan / pola layout | `context/PRD.md` §10 |
| Standar UX yang harus dipenuhi | `context/PRD.md` §11 |
| Aturan gambar WebP & anggaran performa | `context/PRD.md` §12 |
| Apa yang baru dikerjakan | `context/CHANGELOG.md` (3-5 entri terakhir) |
| Riwayat lama proyek | `context/CHANGELOG-archive.md` (hanya jika diminta) |
