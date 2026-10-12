import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const services = [
  { name: 'scaling', label: 'Pembersihan Karang Gigi', color: '#17a89e' },
  { name: 'tambal', label: 'Penambalan Gigi Komposit', color: '#21cdc0' },
  { name: 'cabut', label: 'Pencabutan Gigi', color: '#354f8e' },
  { name: 'bleaching', label: 'Pemutihan Gigi', color: '#0284c7' },
  { name: 'behel', label: 'Perawatan Behel', color: '#16867f' },
  { name: 'psa', label: 'Perawatan Saluran Akar', color: '#0e204d' },
  { name: 'veneer', label: 'Veneer Gigi Estetik', color: '#4c73b3' },
  { name: 'anak', label: 'Perawatan Gigi Anak', color: '#21cdc0' },
]

const doctors = [
  { name: 'dr-andi', label: 'drg. Andi Pratama, Sp.KG', spec: 'Konservasi Gigi', color: '#17a89e' },
  { name: 'dr-nadia', label: 'drg. Nadia Safira, Sp.KGA', spec: 'Kedokteran Gigi Anak', color: '#21cdc0' },
  { name: 'dr-farhan', label: 'drg. Farhan Maulana, Sp.Ort', spec: 'Ortodonti', color: '#354f8e' },
  { name: 'dr-citra', label: 'drg. Citra Lestari', spec: 'Dokter Gigi Umum', color: '#0ea5e9' },
  { name: 'dr-bambang', label: 'drg. Bambang Wicaksono, Sp.BM', spec: 'Bedah Mulut', color: '#0e204d' },
]

const testimonials = [
  { name: 'avatar-1', label: 'Ratna Sari', color: '#17a89e' },
  { name: 'avatar-2', label: 'Budi Santoso', color: '#354f8e' },
  { name: 'avatar-3', label: 'Dina Mariana', color: '#21cdc0' },
  { name: 'avatar-4', label: 'Hendra Wijaya', color: '#0e204d' },
]

async function generate() {
  // Services
  const srvDir = path.resolve('src-images/services')
  await fs.promises.mkdir(srvDir, { recursive: true })
  for (const s of services) {
    const svg = `
    <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g_${s.name}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${s.color}" />
          <stop offset="100%" stop-color="#0e204d" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g_${s.name})" />
      <circle cx="1100" cy="150" r="280" fill="white" fill-opacity="0.06" />
      <circle cx="200" cy="600" r="350" fill="white" fill-opacity="0.04" />
      <text x="100" y="320" font-family="sans-serif" font-size="44" font-weight="bold" fill="white">${s.label}</text>
      <text x="100" y="380" font-family="sans-serif" font-size="24" fill="#dce1ee">Candraloka Dental Care — Layanan Profesional</text>
    </svg>`
    await sharp(Buffer.from(svg)).png().toFile(path.join(srvDir, `${s.name}.png`))
  }

  // Clinic hero
  const clinicDir = path.resolve('src-images/clinic')
  await fs.promises.mkdir(clinicDir, { recursive: true })
  const heroSvg = `
  <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g_hero" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#21cdc0" />
        <stop offset="60%" stop-color="#16867f" />
        <stop offset="100%" stop-color="#0e204d" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g_hero)" />
    <circle cx="950" cy="300" r="320" fill="white" fill-opacity="0.08" />
    <circle cx="300" cy="500" r="250" fill="white" fill-opacity="0.05" />
    <text x="120" y="320" font-family="sans-serif" font-size="48" font-weight="bold" fill="white">Candraloka Dental Care</text>
    <text x="120" y="380" font-family="sans-serif" font-size="26" fill="#e4ecf7">Klinik Gigi Modern, Ramah, dan Nyaman untuk Keluarga Anda</text>
  </svg>`
  await sharp(Buffer.from(heroSvg)).png().toFile(path.join(clinicDir, 'hero.png'))

  // Doctors
  const docDir = path.resolve('src-images/doctors')
  await fs.promises.mkdir(docDir, { recursive: true })
  for (const d of doctors) {
    const docSvg = `
    <svg width="600" height="800" viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g_${d.name}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${d.color}" />
          <stop offset="100%" stop-color="#0e204d" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g_${d.name})" />
      <circle cx="300" cy="300" r="140" fill="white" fill-opacity="0.12" />
      <circle cx="300" cy="700" r="280" fill="white" fill-opacity="0.08" />
      <text x="300" y="580" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="bold" fill="white">${d.label}</text>
      <text x="300" y="620" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#ccfbf7">${d.spec}</text>
    </svg>`
    await sharp(Buffer.from(docSvg)).png().toFile(path.join(docDir, `${d.name}.png`))
  }

  // Testimonials
  const testDir = path.resolve('src-images/testimonials')
  await fs.promises.mkdir(testDir, { recursive: true })
  for (const t of testimonials) {
    const testSvg = `
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${t.color}" />
      <circle cx="200" cy="160" r="70" fill="white" fill-opacity="0.25" />
      <circle cx="200" cy="360" r="140" fill="white" fill-opacity="0.2" />
      <text x="200" y="270" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="bold" fill="white">${t.label}</text>
    </svg>`
    await sharp(Buffer.from(testSvg)).png().toFile(path.join(testDir, `${t.name}.png`))
  }

  console.log('Successfully generated all source images.')
}

generate().catch(console.error)
