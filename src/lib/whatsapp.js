/**
 * whatsapp.js — Helper murni untuk menyusun pesan dan tautan konfirmasi WhatsApp.
 */
import { formatDate, formatTimeWib } from './format'

/**
 * Menyusun pesan WhatsApp konfirmasi reservasi dan menghasilkan tautan `wa.me`.
 *
 * @param {object} params
 * @param {string} params.clinicWhatsapp - nomor telepon WhatsApp klinik (tanpa '+')
 * @param {string} params.code - kode reservasi, mis. CDC-261015-K79A
 * @param {object} params.patient - { name, whatsapp, email, notes, isNewPatient }
 * @param {string} params.serviceName - nama layanan
 * @param {string} params.doctorName - nama dokter
 * @param {string} params.date - "YYYY-MM-DD"
 * @param {string} params.time - "09:00"
 * @returns {{ text: string, url: string }}
 */
export function buildReservationWhatsApp({
  clinicWhatsapp,
  code,
  patient,
  serviceName,
  doctorName,
  date,
  time,
}) {
  const formattedDate = formatDate(date, true)
  const formattedTime = formatTimeWib(time)
  const statusPatient = patient.isNewPatient ? 'Pasien Baru' : 'Pasien Lama'

  const lines = [
    'Halo Candraloka Dental Care,',
    '',
    'Saya ingin mengonfirmasi jadwal reservasi online yang telah saya buat melalui website:',
    '',
    `*Kode Reservasi:* ${code}`,
    `*Nama Pasien:* ${patient.name}`,
    `*No. WhatsApp Pasien:* ${patient.whatsapp}`,
    `*Status Pasien:* ${statusPatient}`,
    `*Layanan:* ${serviceName}`,
    `*Dokter:* ${doctorName}`,
    `*Jadwal:* ${formattedDate}`,
    `*Jam Praktek:* ${formattedTime}`,
  ]

  if (patient.notes && patient.notes.trim()) {
    lines.push(`*Keluhan / Catatan:* ${patient.notes.trim()}`)
  }

  lines.push('')
  lines.push('Mohon informasinya mengenai langkah selanjutnya. Terima kasih.')

  const text = lines.join('\n')
  const encoded = encodeURIComponent(text)
  const url = `https://wa.me/${clinicWhatsapp}?text=${encoded}`

  return { text, url }
}
