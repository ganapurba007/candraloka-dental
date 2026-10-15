# SCHEMA.md

> Sumber kebenaran struktur data SAAT INI. Proyek ini TIDAK memakai database: "tabel" di bawah adalah struktur file JSON di `src/data/`, ditambah objek runtime yang hidup di browser. Berbeda dari §4 PRD.md yang cuma rencana awal — file ini WAJIB selalu sinkron dengan file JSON dan skema Zod aktual di kode. Update file ini di sesi yang sama setiap kali struktur data berubah.

**Terakhir disinkronkan:** 2026-10-14 — Amandemen Mockup Klien Dinamis & Whitelabel Branding

**Konvensi umum:** tanggal memakai format ISO `YYYY-MM-DD`; jam memakai `HH:mm` (24 jam); semua waktu diartikan dalam WIB (UTC+7). Nomor hari memakai ISO: 1 = Senin … 7 = Minggu. Path gambar relatif terhadap `/public`, berekstensi `.webp` atau `.svg` (vektor logo). Rasio gambar ditentukan komponen pemakai, bukan JSON.

---

## clinics.json (koleksi multi-tenant mockup)
Single source of truth untuk konfigurasi preset mockup klinik client.
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| default | string | wajib | Slug klinik default (mis. `"candraloka"`) |
| clinics | object | wajib | Peta key-value `slug: ClinicProfile` |

**ClinicProfile**
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| slug | string | wajib | Slug rute unik (mis. `"surya-dental"`) |
| name | string | wajib | Nama lengkap klinik (mis. `"Surya Dental Care"`) |
| shortName | string | wajib | Nama ringkas brand (mis. `"Surya"`) |
| subName | string | wajib | Sub-judul brand (mis. `"Dental Care"`) |
| tagline | string | opsional | Slogan klinik (fallback ke `clinic.json`) |
| logo | string | wajib | Path gambar logo (`.svg` atau `.webp`) |
| colors | object | wajib | `{ primary: "#hex", navy: "#hex" }` palet warna brand |
| contact | object | opsional | Override `{ phone, whatsapp, email, address, mapUrl, mapEmbedUrl }` |

---

## clinic.json (objek tunggal)
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| name | string | wajib | "Candraloka Dental Care" |
| tagline | string | wajib | |
| establishedYear | number | wajib | Dasar angka "tahun melayani" |
| contact | object | wajib | `{ phone, whatsapp, email, address, mapUrl, mapEmbedUrl, mapImage }`; `whatsapp` format internasional tanpa `+` (rekaan), dipakai untuk `wa.me` |
| operatingHours | object[] | wajib | `{ day, open, close }` per hari buka; hari yang tidak tercantum = tutup |
| timezoneLabel | string | wajib | "WIB" |
| reservation | object | wajib | `{ slotMinutes, bookingWindowDays, minLeadMinutes }`; nilai awal 30, 30, 60 |
| social | object[] | opsional | `{ name, url, icon }` |
| about | object | wajib | Lihat di bawah |

**clinic.about**
| Field | Tipe | Keterangan |
|---|---|---|
| story | string | Cerita klinik (FR-3.2) |
| image | string | Gambar profil klinik |
| vision | string | |
| mission | string[] | |
| values | object[] | `{ icon, title, description }`, 6 item (FR-3.3) |
| facilities | object[] | `{ title, image, caption }`, 4–6 item (FR-3.4) |
| visitSteps | object[] | `{ number, title, description }`, 5 item (FR-3.5) |

## home.json (objek tunggal)
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| hero | object | wajib | `{ headline, subheadline, image }` |
| stats | object[] | wajib, 3 item | `{ label, value, suffix }`; mis. pasien terlayani |
| reservationSteps | object[] | wajib, 4 item | `{ number, title, description }` (FR-2.5) |

## services.json (array)
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| id | number | PK | |
| slug | string | unik | Rute `/layanan/:slug` |
| name | string | wajib | |
| category | string | wajib | `Umum`, `Estetika`, `Ortodonti`, `Bedah`, atau `Anak` |
| summary | string | wajib | Dipakai di kartu |
| description | string | wajib | Netral, tanpa klaim hasil |
| whenNeeded | string[] | wajib | Kapan layanan dibutuhkan |
| procedure | object[] | wajib | `{ title, description }`, tahapan perawatan berurutan |
| preparation | string[] | wajib | Persiapan sebelum datang |
| durationMinutes | number | wajib | Kelipatan `reservation.slotMinutes`; menentukan jumlah slot berurutan |
| icon | string | wajib | |
| image | string | wajib | |
| featured | boolean | wajib | `true` → tampil di Beranda (FR-2.4) |
| order | number | wajib | Urutan tampil default |

## doctors.json (array)
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| id | number | PK | |
| slug | string | unik | Rute `/dokter/:slug` |
| name | string | wajib | Nama rekaan lengkap dengan gelar, mis. `drg. …`; tanpa nomor STR/SIP |
| specialty | string | wajib | Mis. Dokter Gigi Umum, Ortodonti, Dokter Gigi Anak |
| experienceYears | number | wajib | |
| languages | string[] | wajib | |
| bio | string | wajib | |
| education | object[] | wajib | `{ degree, institution, year }` |
| interests | string[] | wajib | Bidang minat |
| serviceIds | number[] | FK → services.id | Layanan yang ditangani; menentukan pilihan dokter di reservasi |
| photo | string | wajib | |
| featured | boolean | wajib | `true` → tampil di Beranda (FR-2.6) |
| practiceHours | object[] | wajib | `{ day, start, end }`; satu dokter boleh punya beberapa sesi di hari yang sama, tidak boleh tumpang tindih |
| leaveDates | string[] | wajib (boleh kosong) | Tanggal cuti, ISO |
| bookedSlots | object[] | wajib (boleh kosong) | `{ date, time, durationMinutes }`; jam yang sudah terisi sebagai data awal |

## testimonials.json (array)
| Field | Tipe | Constraint | Keterangan |
|---|---|---|---|
| id | number | PK | |
| name | string | wajib | |
| service | string | wajib | Nama layanan yang dijalani |
| quote | string | wajib | |
| avatar | string | wajib | |

---

## Objek Runtime (bukan file JSON)

### Reservation
Disimpan sebagai array di `localStorage` (kunci tetap, mis. `reservations`), divalidasi dengan skema Zod di `src/lib/schemas.js`.

| Field | Tipe | Keterangan |
|---|---|---|
| code | string | Format `CDC-YYMMDD-XXXX` (`XXXX` huruf besar/angka acak tanpa karakter ambigu) |
| serviceId | number | FK → services.id |
| doctorId | number | FK → doctors.id; selalu terisi (hasil penetapan otomatis jika pasien memilih "dokter mana saja") |
| date | string | ISO |
| time | string | `HH:mm`, jam mulai |
| durationMinutes | number | Salinan dari layanan saat dibuat |
| patient | object | `{ name, whatsapp, email, notes, isNewPatient }` |
| status | string | `menunggu-konfirmasi` |
| createdAt | string | ISO datetime |

### ReservationDraft
Disimpan di `sessionStorage` (kunci tetap, mis. `reservationDraft`).

| Field | Tipe | Keterangan |
|---|---|---|
| step | number | 1–4 |
| serviceId | number \| null | |
| doctorId | number \| `"any"` \| null | `"any"` = dokter mana saja |
| date | string \| null | ISO |
| time | string \| null | `HH:mm` |
| patient | object | Isian parsial langkah 4 |

### SlotInfo (hasil `availability.js`)
`{ time, endTime, status, doctorIds[] }` dengan `status` salah satu: `tersedia`, `penuh`, `lewat`, `libur`. Untuk "dokter mana saja", `doctorIds` berisi semua dokter yang kosong dan dokter terpilih ditetapkan sesuai aturan di PRD §5.

## Relasi (ringkas)
```
doctors.serviceIds → services.id          (dokter hanya bisa dipilih untuk layanan ini)
Reservation.serviceId → services.id
Reservation.doctorId  → doctors.id
doctors.bookedSlots + Reservation[] → availability.js (menentukan slot penuh)
doctors.leaveDates → availability.js (menentukan tanggal libur)
services.featured / doctors.featured → item yang tampil di Beranda
```
Tidak ada foreign key sungguhan; konsistensi dijaga lewat test integritas data (lihat PRD §8.3).

## Catatan Migrasi Penting
- Belum ada kode, jadi belum ada catatan. Tambahkan di sini keputusan struktur yang tidak obvious (mis. kenapa `doctorId` pada Reservation selalu terisi meski pasien memilih "dokter mana saja") supaya AI tidak "membetulkannya".
- Aturan ketersediaan lengkap ada di PRD §5; jangan menduplikasinya di sini, cukup rujuk ke sana.
- Semua field gambar (`image`, `photo`, `avatar`, `images`) wajib `.webp`. Satu-satunya file non-WebP adalah aset di luar JSON: logo/ikon SVG, favicon, dan `og-image.png` (PRD §12.1). Perlu satu varian `-768` dan `-480` per gambar di `public/images/`; `check:images` memeriksanya.
