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

## Fase 0 — Perencanaan & dokumentasi awal (2026-10-12)
**Yang dikerjakan:**
- Menyusun `PRD.md` (FR, tech stack, aturan ketersediaan, milestone, non-goals, referensi tampilan, prinsip UX)
- Menyusun `SCHEMA.md` untuk struktur data JSON serta objek runtime `Reservation`, `ReservationDraft`, dan `SlotInfo`
- Menyiapkan `AGENTS.md`
- Menambahkan aturan optimasi sejak awal dan gambar WebP (PRD §12 dan entri Amandemen di §9)
- Setup project (Vite, Tailwind, Vue Router, ESLint/Prettier, Vitest): BELUM dikerjakan
**File yang berubah:** AGENTS.md, context/PRD.md, context/SCHEMA.md, context/CHANGELOG.md
**Test:** 0 passed / 0 total
**Docs updated:** PRD §9 dan §12, SCHEMA.md, AGENTS.md
