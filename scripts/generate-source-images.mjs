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

const facilities = [
  { name: 'ruang-perawatan', label: 'Ruang Perawatan Ergonomis', color: '#21cdc0' },
  { name: 'ruang-tunggu', label: 'Area Tunggu Tenang &amp; Nyaman', color: '#354f8e' },
  { name: 'sterilisasi', label: 'Sterilisasi Bertaraf Medis', color: '#17a89e' },
  { name: 'ruang-anak', label: 'Pojok Ramah Anak (Kids Corner)', color: '#4c73b3' },
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

  // Clinic hero, about, map
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

  const aboutSvg = `
  <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g_about" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#354f8e" />
        <stop offset="60%" stop-color="#17a89e" />
        <stop offset="100%" stop-color="#0e204d" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g_about)" />
    <circle cx="200" cy="200" r="220" fill="white" fill-opacity="0.08" />
    <circle cx="1000" cy="500" r="300" fill="white" fill-opacity="0.06" />
    <text x="120" y="320" font-family="sans-serif" font-size="44" font-weight="bold" fill="white">Profil Klinik Candraloka</text>
    <text x="120" y="380" font-family="sans-serif" font-size="24" fill="#e4ecf7">Standar Medis Higienis &amp; Pelayanan Penuh Empati</text>
  </svg>`
  await sharp(Buffer.from(aboutSvg)).png().toFile(path.join(clinicDir, 'about.png'))

  const mapSvg = `
  <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g_map" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0e204d" />
        <stop offset="100%" stop-color="#1b3164" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g_map)" />
    <path d="M 100,360 Q 640,100 1180,360" stroke="#21cdc0" stroke-width="4" fill="none" opacity="0.4" />
    <circle cx="640" cy="360" r="20" fill="#21cdc0" />
    <circle cx="640" cy="360" r="40" fill="#21cdc0" fill-opacity="0.2" />
    <text x="640" y="440" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="white">Candraloka Dental Care — Kebayoran Baru</text>
    <text x="640" y="480" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#dce1ee">Klik untuk membuka di Google Maps</text>
  </svg>`
  await sharp(Buffer.from(mapSvg)).png().toFile(path.join(clinicDir, 'map.png'))

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

  // Facilities
  const facDir = path.resolve('src-images/facilities')
  await fs.promises.mkdir(facDir, { recursive: true })
  for (const f of facilities) {
    const facSvg = `
    <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g_${f.name}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${f.color}" />
          <stop offset="100%" stop-color="#0e204d" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g_${f.name})" />
      <circle cx="1100" cy="200" r="260" fill="white" fill-opacity="0.08" />
      <circle cx="200" cy="500" r="280" fill="white" fill-opacity="0.05" />
      <text x="100" y="340" font-family="sans-serif" font-size="44" font-weight="bold" fill="white">${f.label}</text>
      <text x="100" y="400" font-family="sans-serif" font-size="24" fill="#e4ecf7">Fasilitas Higienis Candraloka Dental Care</text>
    </svg>`
    await sharp(Buffer.from(facSvg)).png().toFile(path.join(facDir, `${f.name}.png`))
  }

  // Generate og-image.png (1200x630) for social sharing & SEO
  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g_og" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0e204d" />
        <stop offset="60%" stop-color="#142f6e" />
        <stop offset="100%" stop-color="#21cdc0" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g_og)" />
    <circle cx="1050" cy="180" r="260" fill="white" fill-opacity="0.06" />
    <circle cx="150" cy="520" r="300" fill="white" fill-opacity="0.04" />
    <circle cx="1000" cy="480" r="140" fill="#21cdc0" fill-opacity="0.12" />

    <rect x="100" y="100" width="160" height="36" rx="18" fill="#21cdc0" fill-opacity="0.2" />
    <text x="180" y="123" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#21cdc0" letter-spacing="1">DENTAL CARE</text>

    <text x="100" y="220" font-family="sans-serif" font-size="52" font-weight="bold" fill="white">Candraloka Dental Care</text>
    <text x="100" y="275" font-family="sans-serif" font-size="24" fill="#a5f3ec">Klinik Gigi Modern, Nyaman, dan Ramah Keluarga</text>
    <text x="100" y="340" font-family="sans-serif" font-size="20" fill="#e2e8f0">Sistem Reservasi Online Jadwal Dokter Berbasis Ketersediaan Real-Time</text>

    <line x1="100" y1="400" x2="1100" y2="400" stroke="white" stroke-opacity="0.15" stroke-width="1" />

    <text x="100" y="470" font-family="sans-serif" font-size="16" font-weight="bold" fill="#21cdc0">LOKASI</text>
    <text x="100" y="500" font-family="sans-serif" font-size="16" fill="white">Kebayoran Baru, Jakarta Selatan</text>

    <text x="450" y="470" font-family="sans-serif" font-size="16" font-weight="bold" fill="#21cdc0">JAM PRAKTEK</text>
    <text x="450" y="500" font-family="sans-serif" font-size="16" fill="white">Senin – Sabtu: 09:00 – 21:00 WIB</text>

    <text x="800" y="470" font-family="sans-serif" font-size="16" font-weight="bold" fill="#21cdc0">WHATSAPP</text>
    <text x="800" y="500" font-family="sans-serif" font-size="16" fill="white">+62 812-3456-7890</text>
  </svg>`
  await fs.promises.mkdir(path.resolve('public'), { recursive: true })
  await sharp(Buffer.from(ogSvg)).png().toFile(path.resolve('public/og-image.png'))

  console.log('Successfully generated all source images.')
}

generate().catch(console.error)
