/**
 * schemas.js — Skema validasi Zod untuk data pasien dan runtime reservasi.
 */
import { z } from 'zod'

/**
 * Regex nomor telepon WhatsApp Indonesia:
 * Mendukung format: 08123456789 atau 628123456789 atau +628123456789 (panjang 10-15 digit)
 */
const INDONESIAN_PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{6,11}$/

export const patientFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Nama lengkap minimal 3 karakter')
    .max(60, 'Nama lengkap maksimal 60 karakter')
    .regex(/^[a-zA-Z\s.,'-]+$/, 'Nama hanya boleh mengandung huruf, spasi, dan tanda baca umum'),

  whatsapp: z
    .string()
    .trim()
    .transform((val) => val.replace(/[\s-]/g, ''))
    .refine((val) => INDONESIAN_PHONE_REGEX.test(val), {
      message: 'Nomor WhatsApp tidak valid (contoh: 081234567890)',
    }),

  email: z
    .string()
    .trim()
    .email('Format alamat email tidak valid')
    .optional()
    .or(z.literal('')),

  notes: z
    .string()
    .trim()
    .max(300, 'Catatan keluhan maksimal 300 karakter')
    .optional()
    .or(z.literal('')),

  isNewPatient: z.boolean({
    required_error: 'Status pasien harus dipilih',
  }),
})

export const reservationRecordSchema = z.object({
  code: z.string().regex(/^CDC-\d{6}-[2-9A-HJ-NP-Z]{4}$/, 'Format kode reservasi tidak valid'),
  serviceId: z.number().int().positive(),
  doctorId: z.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal ISO tidak valid'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Format jam tidak valid'),
  durationMinutes: z.number().int().positive(),
  patient: patientFormSchema,
  status: z.literal('menunggu-konfirmasi'),
  createdAt: z.string().datetime(),
})
