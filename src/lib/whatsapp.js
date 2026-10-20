/**
 * whatsapp.js — Helper murni untuk menyusun pesan dan tautan konfirmasi WhatsApp.
 */
import { formatDate, formatTimeWib } from './format'

/**
 * Menyusun pesan WhatsApp konfirmasi reservasi dan menghasilkan tautan `wa.me`.
 *
 * @param {object} params
 * @param {string} params.clinicWhatsapp - nomor telepon WhatsApp klinik (tanpa '+')
 * @param {string} [params.clinicName='Candraloka Dental Care']
 * @param {string} params.code - kode reservasi, mis. CDC-261015-K79A
 * @param {object} params.patient - { name, whatsapp, email, notes, isNewPatient }
 * @param {string} params.serviceName - nama layanan
 * @param {string} params.doctorName - nama dokter
 * @param {string} params.date - "YYYY-MM-DD"
 * @param {string} params.time - "09:00"
 * @param {'id' | 'en'} [params.locale='id']
 * @returns {{ text: string, url: string }}
 */
export function buildReservationWhatsApp({
  clinicWhatsapp,
  clinicName = 'Candraloka Dental Care',
  code,
  patient,
  serviceName,
  doctorName,
  date,
  time,
  locale = 'id',
}) {
  const formattedDate = formatDate(date, true, locale)
  const formattedTime = formatTimeWib(time)
  const statusPatient = locale === 'en'
    ? (patient.isNewPatient ? 'New Patient' : 'Returning Patient')
    : (patient.isNewPatient ? 'Pasien Baru' : 'Pasien Lama')

  const lines = locale === 'en'
    ? [
        `Hello ${clinicName},`,
        '',
        'I would like to confirm my online appointment booked via your website:',
        '',
        `*Booking Code:* ${code}`,
        `*Patient Name:* ${patient.name}`,
        `*Patient WhatsApp:* ${patient.whatsapp}`,
        `*Patient Status:* ${statusPatient}`,
        `*Service:* ${serviceName}`,
        `*Dentist:* ${doctorName}`,
        `*Date:* ${formattedDate}`,
        `*Practice Time:* ${formattedTime}`,
      ]
    : [
        `Halo ${clinicName},`,
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
    lines.push(locale === 'en' ? `*Complaints / Notes:* ${patient.notes.trim()}` : `*Keluhan / Catatan:* ${patient.notes.trim()}`)
  }

  lines.push('')
  lines.push(locale === 'en' ? 'Please kindly inform me of the next steps. Thank you.' : 'Mohon informasinya mengenai langkah selanjutnya. Terima kasih.')

  const text = lines.join('\n')
  const encoded = encodeURIComponent(text)
  const url = `https://wa.me/${clinicWhatsapp}?text=${encoded}`

  return { text, url }
}
