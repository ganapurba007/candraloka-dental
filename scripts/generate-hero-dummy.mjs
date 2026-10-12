import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const svg = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08183a" />
      <stop offset="35%" stop-color="#0e204d" />
      <stop offset="70%" stop-color="#133f94" />
      <stop offset="100%" stop-color="#1e60d5" />
    </linearGradient>

    <!-- Clinic Floor Ambient -->
    <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0e204d" stop-opacity="0" />
      <stop offset="100%" stop-color="#060f24" stop-opacity="0.9" />
    </linearGradient>

    <!-- Dental Light Cone Glow -->
    <linearGradient id="lightCone" x1="0%" y1="0%" x2="60%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35" />
      <stop offset="50%" stop-color="#93c5fd" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#1e60d5" stop-opacity="0" />
    </linearGradient>

    <!-- Chair Metallic Gradient -->
    <linearGradient id="chairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#cedef0" />
      <stop offset="50%" stop-color="#82abd6" />
      <stop offset="100%" stop-color="#354f8e" />
    </linearGradient>

    <!-- Dentist Uniform Gradient -->
    <linearGradient id="doctorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#0e204d" />
    </linearGradient>

    <!-- Patient Uniform Gradient -->
    <linearGradient id="patientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bfdbfe" />
      <stop offset="100%" stop-color="#628ec6" />
    </linearGradient>

    <!-- Smooth Vignette for Right Side Text Placement -->
    <linearGradient id="rightFade" x1="30%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0e204d" stop-opacity="0" />
      <stop offset="40%" stop-color="#0e204d" stop-opacity="0.4" />
      <stop offset="75%" stop-color="#0a1838" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#061129" stop-opacity="0.95" />
    </linearGradient>
  </defs>

  <!-- 1. Base Gradient Canvas -->
  <rect width="1920" height="1080" fill="url(#bgGradient)" />

  <!-- 2. Subtle Medical Geometric Patterns and Grid Lines -->
  <g opacity="0.05" stroke="#ffffff" stroke-width="1.5">
    <line x1="100" y1="0" x2="100" y2="1080" stroke-dasharray="4 8" />
    <line x1="300" y1="0" x2="300" y2="1080" stroke-dasharray="4 8" />
    <line x1="500" y1="0" x2="500" y2="1080" stroke-dasharray="4 8" />
    <line x1="700" y1="0" x2="700" y2="1080" stroke-dasharray="4 8" />
    <line x1="900" y1="0" x2="900" y2="1080" stroke-dasharray="4 8" />
    <line x1="0" y1="200" x2="1920" y2="200" stroke-dasharray="4 8" />
    <line x1="0" y1="400" x2="1920" y2="400" stroke-dasharray="4 8" />
    <line x1="0" y1="600" x2="1920" y2="600" stroke-dasharray="4 8" />
    <line x1="0" y1="800" x2="1920" y2="800" stroke-dasharray="4 8" />

    <!-- Medical Cross Motifs -->
    <path d="M240 180 h20 v-20 h20 v20 h20 v20 h-20 v20 h-20 v-20 h-20 z" fill="#ffffff" fill-opacity="0.1" />
    <path d="M640 120 h16 v-16 h16 v16 h16 v16 h-16 v16 h-16 v-16 h-16 z" fill="#ffffff" fill-opacity="0.08" />
    <path d="M120 720 h16 v-16 h16 v16 h16 v16 h-16 v16 h-16 v-16 h-16 z" fill="#ffffff" fill-opacity="0.08" />
  </g>

  <!-- 3. Ambient Healthcare Circles and Soft Bokeh Glows -->
  <circle cx="480" cy="460" r="320" fill="#1e60d5" fill-opacity="0.2" />
  <circle cx="680" cy="340" r="260" fill="#38bdf8" fill-opacity="0.12" />
  <circle cx="240" cy="300" r="200" fill="#60a5fa" fill-opacity="0.1" />

  <!-- 4. Background Clinic Elements (Cabinets and Monitor) -->
  <g opacity="0.25">
    <rect x="80" y="180" width="280" height="360" rx="16" fill="#cedef0" fill-opacity="0.15" stroke="#cedef0" stroke-width="2" />
    <line x1="220" y1="180" x2="220" y2="540" stroke="#cedef0" stroke-width="2" />
    <rect x="110" y="220" width="100" height="80" rx="8" fill="#ffffff" fill-opacity="0.1" />
    <rect x="230" y="220" width="100" height="80" rx="8" fill="#ffffff" fill-opacity="0.1" />

    <!-- Dental X-Ray Screen Silhouette -->
    <rect x="180" y="240" width="140" height="100" rx="10" fill="#0e204d" stroke="#60a5fa" stroke-width="2" />
    <path d="M220 280 C220 260, 240 260, 250 280 C260 260, 280 260, 280 280 C280 300, 270 320, 250 320 C230 320, 220 300, 220 280 Z" fill="none" stroke="#38bdf8" stroke-width="2.5" opacity="0.6" />
  </g>

  <!-- 5. Overhead Dental Examination Lamp -->
  <g>
    <!-- Lamp Arm Joint -->
    <path d="M480 40 Q540 120 590 190" stroke="#82abd6" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.85" />
    <circle cx="590" cy="190" r="12" fill="#cedef0" />
    <path d="M590 190 Q620 230 650 270" stroke="#82abd6" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.85" />

    <!-- Lamp Head Fixture -->
    <ellipse cx="660" cy="280" rx="36" ry="22" transform="rotate(-25 660 280)" fill="#cedef0" stroke="#ffffff" stroke-width="2" />
    <ellipse cx="660" cy="280" rx="24" ry="12" transform="rotate(-25 660 280)" fill="#fef08a" opacity="0.9" />
    <circle cx="660" cy="280" r="14" fill="#ffffff" opacity="0.95" />

    <!-- Emitted Light Cone Beam shining onto dental patient area -->
    <polygon points="660,280 440,780 860,780" fill="url(#lightCone)" />
  </g>

  <!-- 6. Modern Ergonomic Dental Chair Silhouette -->
  <g>
    <!-- Base Hydraulic Column -->
    <rect x="490" y="720" width="70" height="140" rx="10" fill="#1b3164" stroke="#4c73b3" stroke-width="3" />
    <ellipse cx="525" cy="860" rx="140" ry="30" fill="#0e204d" stroke="#354f8e" stroke-width="3" />

    <!-- Chair Seat and Legrest (Reclining) -->
    <path d="M380 680 Q480 700 620 670 Q690 650 740 680 Q730 730 670 730 L400 730 Z" fill="url(#chairGrad)" stroke="#ffffff" stroke-width="2" />

    <!-- Chair Backrest and Headrest -->
    <path d="M380 680 Q320 630 310 520 Q310 470 340 450 Q370 450 390 490 L420 630 Z" fill="url(#chairGrad)" stroke="#ffffff" stroke-width="2" />
    <rect x="295" y="420" width="65" height="35" rx="12" transform="rotate(-20 325 435)" fill="#acc8e5" stroke="#ffffff" stroke-width="1.5" />

    <!-- Chair Armrest -->
    <rect x="410" y="600" width="130" height="18" rx="9" fill="#cedef0" stroke="#82abd6" stroke-width="1.5" />
  </g>

  <!-- 7. Smiling Patient in Dental Chair -->
  <g>
    <!-- Patient Body / Torso reclining comfortably with Dental Bib -->
    <path d="M350 490 Q430 550 560 620 Q620 660 670 670 L650 710 L440 680 Q370 620 340 530 Z" fill="url(#patientGrad)" />

    <!-- Protective Dental Bib (Signature Dental Sapphire Blue) -->
    <path d="M370 480 Q440 520 500 580 L440 620 Q380 560 350 510 Z" fill="#1e60d5" stroke="#93c5fd" stroke-width="1.5" />
    <path d="M345 470 Q365 480 385 465" stroke="#ffffff" stroke-width="2" fill="none" />

    <!-- Patient Neck and Head -->
    <path d="M340 460 Q345 425 365 410 Q395 390 425 420 Q445 440 440 470 Q410 490 370 480 Z" fill="#fed7aa" />
    <path d="M330 460 C310 430, 320 380, 360 370 C410 360, 440 380, 450 420 C420 400, 380 395, 345 425 Z" fill="#ca8a04" />

    <!-- Smiling Mouth and Glistening Teeth -->
    <path d="M395 440 Q415 450 428 438" stroke="#b91c1c" stroke-width="2" fill="none" />
    <path d="M402 441 Q415 446 423 440" fill="#ffffff" />
    <circle cx="412" cy="441" r="3" fill="#ffffff" />
    <!-- Smile Sparkle -->
    <path d="M420 432 L422 436 L426 438 L422 440 L420 444 L418 440 L414 438 L418 436 Z" fill="#ffffff" />

    <!-- Eyes (Gentle smile curve) -->
    <path d="M385 415 Q395 410 405 416" stroke="#78350f" stroke-width="2" fill="none" />
  </g>

  <!-- 8. Dentist (Doctor) in Scrubs, Gloves and Mask Examining Carefully -->
  <g>
    <!-- Stool Base and Seat -->
    <ellipse cx="550" cy="800" rx="55" ry="16" fill="#1b3164" />
    <rect x="540" y="690" width="20" height="110" rx="6" fill="#4c73b3" />
    <ellipse cx="550" cy="690" rx="65" ry="18" fill="#354f8e" stroke="#82abd6" stroke-width="2" />

    <!-- Doctor Torso / Scrubs (Deep Navy and Sapphire Blue) -->
    <path d="M470 510 Q540 480 620 520 L610 710 Q540 730 480 700 Z" fill="url(#doctorGrad)" stroke="#354f8e" stroke-width="2" />
    <path d="M510 500 L535 560 L560 500" stroke="#93c5fd" stroke-width="2" fill="none" />

    <!-- Doctor Arms and Latex Gloves -->
    <path d="M470 520 Q440 570 435 620 Q435 650 460 635 L475 565 Z" fill="url(#doctorGrad)" />
    <path d="M435 620 Q425 610 415 580" stroke="#60a5fa" stroke-width="16" stroke-linecap="round" />
    <circle cx="415" cy="580" r="10" fill="#3b82f6" stroke="#bfdbfe" stroke-width="1.5" />
    <!-- Dental Mirror -->
    <line x1="415" y1="580" x2="405" y2="455" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
    <circle cx="405" cy="452" r="7" fill="none" stroke="#ffffff" stroke-width="2.5" />

    <!-- Right Arm holding dental probe -->
    <path d="M590 530 Q560 580 505 590 L520 550 Z" fill="url(#doctorGrad)" />
    <path d="M520 560 Q480 540 450 510" stroke="#60a5fa" stroke-width="16" stroke-linecap="round" />
    <circle cx="450" cy="510" r="10" fill="#3b82f6" stroke="#bfdbfe" stroke-width="1.5" />
    <line x1="450" y1="510" x2="418" y2="452" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
    <circle cx="418" cy="450" r="3" fill="#38bdf8" />

    <!-- Doctor Neck and Head -->
    <path d="M525 480 L545 440 L565 480 Z" fill="#fed7aa" />
    <ellipse cx="550" cy="400" rx="45" ry="52" fill="#fed7aa" />

    <!-- Mask -->
    <path d="M515 395 Q545 425 580 405 L575 445 Q545 455 515 440 Z" fill="#93c5fd" stroke="#ffffff" stroke-width="1.5" />
    <path d="M515 405 Q495 400 495 415" stroke="#ffffff" stroke-width="1.5" fill="none" />
    <path d="M580 405 Q595 405 595 420" stroke="#ffffff" stroke-width="1.5" fill="none" />

    <!-- Eyewear and Loupes -->
    <rect x="515" y="370" width="32" height="20" rx="6" fill="none" stroke="#ffffff" stroke-width="2.5" />
    <rect x="550" y="370" width="32" height="20" rx="6" fill="none" stroke="#ffffff" stroke-width="2.5" />
    <line x1="547" y1="378" x2="550" y2="378" stroke="#ffffff" stroke-width="2.5" />
    <line x1="515" y1="378" x2="495" y2="370" stroke="#ffffff" stroke-width="2" />
    <circle cx="531" cy="380" r="7" fill="#1e60d5" stroke="#ffffff" stroke-width="1.5" />
    <circle cx="566" cy="380" r="7" fill="#1e60d5" stroke="#ffffff" stroke-width="1.5" />

    <!-- Hair -->
    <path d="M505 390 C500 340, 560 330, 595 365 C580 350, 530 350, 510 380 Z" fill="#1e293b" />
  </g>

  <!-- 9. Dental Instrument Tray -->
  <g opacity="0.9">
    <path d="M780 720 Q740 600 700 520" stroke="#82abd6" stroke-width="6" fill="none" stroke-linecap="round" />
    <rect x="650" y="500" width="120" height="22" rx="6" fill="#cedef0" stroke="#ffffff" stroke-width="1.5" />
    <rect x="665" y="494" width="30" height="8" rx="3" fill="#93c5fd" />
    <rect x="705" y="494" width="40" height="8" rx="3" fill="#60a5fa" />
    <path d="M675 510 Q660 580 630 630" stroke="#acc8e5" stroke-width="3" fill="none" opacity="0.7" />
    <path d="M715 510 Q700 590 650 640" stroke="#acc8e5" stroke-width="3" fill="none" opacity="0.7" />
  </g>

  <!-- 10. Floor Base Shadow -->
  <rect x="0" y="800" width="1920" height="280" fill="url(#floorGrad)" />

  <!-- 11. Right Side Gradual Vignette: Perfectly blends into dark sapphire blue for foreground text -->
  <rect x="0" y="0" width="1920" height="1080" fill="url(#rightFade)" />

  <!-- 12. Floating Glistening Dental Sparkles -->
  <g fill="#ffffff" opacity="0.8">
    <path d="M680 230 L683 242 L695 245 L683 248 L680 260 L677 248 L665 245 L677 242 Z" />
    <path d="M370 330 L372 338 L380 340 L372 342 L370 350 L368 342 L360 340 L368 338 Z" opacity="0.6" />
    <path d="M760 480 L761 486 L767 487 L761 488 L760 494 L759 488 L753 487 L759 486 Z" opacity="0.7" />
  </g>
</svg>
`

async function run() {
  const targetDir = path.resolve('src-images/clinic')
  await fs.promises.mkdir(targetDir, { recursive: true })
  const targetFile = path.join(targetDir, 'hero.png')
  await sharp(Buffer.from(svg)).png().toFile(targetFile)
  console.log('Generated dental vector illustration at', targetFile)
}

run().catch(console.error)
