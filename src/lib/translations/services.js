/**
 * Bilingual service data translations for Candraloka Dental Care.
 * Provides English translations for service names, summaries, descriptions,
 * indications (when needed), procedures, and preparations.
 */

export const serviceTranslations = {
  'pembersihan-karang-gigi': {
    name: {
      id: 'Pembersihan Karang Gigi (Scaling)',
      en: 'Scaling & Calculus Removal',
    },
    summary: {
      id: 'Pembersihan plak dan karang gigi ultrasonik untuk gusi sehat dan nafas segar.',
      en: 'Ultrasonic plaque and calculus removal for healthy gums and fresh breath.',
    },
    description: {
      id: 'Perawatan pembersihan kalkulus (karang gigi) dan plak bakteri yang mengeras di permukaan gigi dan bawah garis gusi menggunakan teknologi ultrasonik modern yang nyaman.',
      en: 'Calculus and hardened bacterial plaque removal on tooth surfaces and below the gumline using comfortable, modern ultrasonic technology.',
    },
    whenNeeded: {
      id: [
        'Karang gigi terlihat kekuningan atau kecokelatan di sela gigi',
        'Gusi sering berdarah saat menyikat gigi',
        'Bau mulut tak sedap yang menetap',
        'Pemeriksaan rutin setiap 6 bulan sekali',
      ],
      en: [
        'Yellowish or brownish tartar visible between teeth',
        'Gums frequently bleeding during brushing',
        'Persistent unpleasant breath odor (halitosis)',
        'Routine dental check-up every 6 months',
      ],
    },
    procedure: {
      id: [
        { title: 'Pemeriksaan Awal', description: 'Pengecekan kondisi gigi dan gusi oleh dokter.' },
        { title: 'Scaling Ultrasonik', description: 'Pembersihan karang gigi dengan getaran mikro dan aliran air halus.' },
        { title: 'Poles & Fluoridasi', description: 'Penghalusan permukaan gigi untuk mencegah plak cepat menempel kembali.' },
      ],
      en: [
        { title: 'Initial Examination', description: 'Detailed check-up of dental and gum condition by our dentist.' },
        { title: 'Ultrasonic Scaling', description: 'Calculus removal utilizing gentle micro-vibrations and fine water mist.' },
        { title: 'Polishing & Fluoride', description: 'Smoothing tooth surfaces to help prevent rapid plaque reaccumulation.' },
      ],
    },
    preparation: {
      id: [
        'Makan secukupnya sebelum datang ke klinik',
        'Menyikat gigi sebelum pemeriksaan',
      ],
      en: [
        'Have a light meal prior to visiting the clinic',
        'Brush your teeth before the appointment',
      ],
    },
  },

  'penambalan-gigi': {
    name: {
      id: 'Penambalan Gigi Komposit',
      en: 'Composite Tooth Filling',
    },
    summary: {
      id: 'Perbaikan gigi berlubang menggunakan bahan komposit sewarna gigi alami.',
      en: 'Cavity restoration using natural tooth-colored composite resin.',
    },
    description: {
      id: 'Restorasi gigi berlubang menggunakan resin komposit bermutu tinggi yang disesuaikan dengan warna alami gigi, mengembalikan fungsi kunyah dan estetika.',
      en: 'Restoration of tooth cavities using high-grade composite resin shade-matched to natural teeth, restoring masticatory function and aesthetics.',
    },
    whenNeeded: {
      id: [
        'Gigi berlubang atau ngilu saat makan manis/dingin',
        'Gigi patah atau retak ringan',
        'Tambalan lama yang sudah aus atau lepas',
      ],
      en: [
        'Cavities or sensitivity when consuming sweet or cold items',
        'Chipped or slightly cracked teeth',
        'Old fillings that have worn down or dislodged',
      ],
    },
    procedure: {
      id: [
        { title: 'Pembersihan Jaringan Rusak', description: 'Mengangkat bagian gigi yang mengalami pembusukan secara hati-hati.' },
        { title: 'Aplikasi Bonding', description: 'Pemberian cairan pengikat khusus pada kavitas gigi.' },
        { title: 'Pengisian & Polishing', description: 'Penambalan lapis demi lapis dan penyinaran UV hingga kuat sempurna.' },
      ],
      en: [
        { title: 'Decay Removal', description: 'Carefully removing decayed tooth structure while preserving healthy enamel.' },
        { title: 'Bonding Application', description: 'Applying special dental adhesive bonding agent to the prepared cavity.' },
        { title: 'Filling & Polishing', description: 'Layer-by-layer composite placement cured with UV light and polished smooth.' },
      ],
    },
    preparation: {
      id: [
        'Beritahu dokter jika memiliki riwayat sensitivitas tinggi',
        'Menyikat gigi sebelum tindakan',
      ],
      en: [
        'Inform the dentist of any prior high dental sensitivity',
        'Brush teeth thoroughly before the appointment',
      ],
    },
  },

  'pencabutan-gigi': {
    name: {
      id: 'Pencabutan Gigi & Odontektomi',
      en: 'Tooth Extraction & Odontectomy',
    },
    summary: {
      id: 'Ekstraksi gigi rusak parah atau gigi bungsu impaksi dengan anestesi lokal nyaman.',
      en: 'Extraction of severely decayed teeth or impacted wisdom teeth under gentle local anesthesia.',
    },
    description: {
      id: 'Tindakan pencabutan gigi yang sudah tidak dapat dipertahankan atau gigi geraham bungsu yang tumbuh miring (impaksi) dengan anestesi lokal dan prosedur antiseptik ketat.',
      en: 'Safe extraction of unrestorable teeth or impacted third molars (wisdom teeth) with precise local anesthesia and strict aseptic protocols.',
    },
    whenNeeded: {
      id: [
        'Gigi bungsu terasa nyeri, bengkak, atau mendorong gigi depan',
        'Gigi rusak berat dengan sisa akar yang infeksi',
        'Kebutuhan pencabutan untuk perawatan behel gigi',
      ],
      en: [
        'Wisdom tooth pain, swelling, or crowding neighboring teeth',
        'Severely decayed tooth with infected root remnant',
        'Extraction required for orthodontic space management',
      ],
    },
    procedure: {
      id: [
        { title: 'Pemeriksaan & Rontgen', description: 'Evaluasi posisi akar gigi dan jaringan saraf di sekitarnya.' },
        { title: 'Anestesi Lokal', description: 'Pemberian bius lokal agar area tindakan mati rasa dan bebas nyeri.' },
        { title: 'Pencabutan Halus', description: 'Pengangkatan gigi secara terukur dan pemasangan kassa hemostatik.' },
      ],
      en: [
        { title: 'Examination & X-Ray', description: 'Evaluation of tooth root anatomy and adjacent nerve structures.' },
        { title: 'Local Anesthesia', description: 'Targeted numbing ensuring the procedure area remains completely pain-free.' },
        { title: 'Gentle Extraction', description: 'Careful, controlled tooth removal followed by sterile hemostatic gauze placement.' },
      ],
    },
    preparation: {
      id: [
        'Wajib makan sebelum tindakan',
        'Istirahat cukup di malam sebelumnya',
        'Informasikan riwayat obat pengencer darah atau alergi obat',
      ],
      en: [
        'Ensure you have eaten adequately prior to the procedure',
        'Get sufficient rest the night before',
        'Disclose any history of blood thinners or medication allergies',
      ],
    },
  },

  'bleaching-gigi': {
    name: {
      id: 'Pemutihan Gigi (Teeth Whitening)',
      en: 'Teeth Whitening (Bleaching)',
    },
    summary: {
      id: 'Mencerahkan warna gigi beberapa tingkat lebih putih secara aman dalam 1 sesi.',
      en: 'Brighten tooth shade several tones whiter safely and comfortably in a single session.',
    },
    description: {
      id: 'Perawatan pemutihan gigi in-office menggunakan gel peroksida medis yang diaktivasi sinar khusus untuk menghilangkan noda kopi, teh, dan penuaan enamel gigi.',
      en: 'In-office professional dental whitening utilizing medical-grade peroxide gel activated by specialized light to lift deep coffee, tea, and aging stains.',
    },
    whenNeeded: {
      id: [
        'Warna gigi menguning akibat noda makanan atau minuman',
        'Persiapan momen spesial seperti pernikahan atau wisuda',
        'Ingin meningkatkan kecerahan senyum alami',
      ],
      en: [
        'Yellowish teeth caused by coffee, tea, or dietary stains',
        'Preparation for milestones such as weddings, graduations, or interviews',
        'Desire to boost confidence with a radiant natural smile',
      ],
    },
    procedure: {
      id: [
        { title: 'Pembersihan & Perlindungan Gusi', description: 'Pemasangan gingival barrier untuk melindungi gusi.' },
        { title: 'Aplikasi Gel Whitening', description: 'Pengolesan formula pemutih pada permukaan gigi.' },
        { title: 'Penyinaran Khusus', description: 'Aktivasi gel selama 3 siklus @ 15 menit.' },
      ],
      en: [
        { title: 'Cleaning & Gingival Barrier', description: 'Applying a protective resin barrier to shield the gums.' },
        { title: 'Whitening Gel Application', description: 'Evenly coating front enamel surfaces with medical whitening formula.' },
        { title: 'Light Activation', description: 'Activating the bleaching formula across 3 cycles of 15 minutes.' },
      ],
    },
    preparation: {
      id: [
        'Disarankan telah melakukan scaling terlebih dahulu',
        'Hindari makanan/minuman berpewarna pekat 48 jam setelah tindakan',
      ],
      en: [
        'Scaling is recommended prior to whitening for optimal results',
        'Avoid strongly pigmented foods or beverages for 48 hours post-treatment',
      ],
    },
  },

  'behel-kawat-gigi': {
    name: {
      id: 'Perawatan Behel (Ortodonti)',
      en: 'Orthodontic Braces',
    },
    summary: {
      id: 'Meratakan susunan gigi dan memperbaiki relasi gigitan untuk fungsi kunyah ideal.',
      en: 'Align crooked teeth and correct bite relationship for optimal chewing function and aesthetics.',
    },
    description: {
      id: 'Koreksi susunan gigi berjejal, renggang, atau maloklusi menggunakan braket logam atau keramik transparan dipandu dokter gigi spesialis ortodonti.',
      en: 'Correction of crowded teeth, gaps, or complex malocclusions with metal or aesthetic ceramic brackets guided by orthodontic specialists.',
    },
    whenNeeded: {
      id: [
        'Gigi bertumpuk atau berjejal sulit dibersihkan',
        'Terdapat celah renggang antar gigi',
        'Gigi depan maju (tonggos) atau gigitan terbalik (cameuh)',
      ],
      en: [
        'Crowded or overlapping teeth that are difficult to clean',
        'Noticeable gaps or spacing between teeth',
        'Overbite, underbite, or crossbite affecting chewing and speech',
      ],
    },
    procedure: {
      id: [
        { title: 'Cetakan & Analisis Sefalometri', description: 'Pembuatan model studi dan rencana pergerakan gigi.' },
        { title: 'Pemasangan Braket', description: 'Perekatan braket pada permukaan gigi secara presisi.' },
        { title: 'Aktivasi Kawat & Karet', description: 'Pemasangan kawat nikel-titanium untuk memulai pergerakan lembut.' },
      ],
      en: [
        { title: 'Impressions & Cephalometrics', description: 'Diagnostic study models and digital tooth movement simulation.' },
        { title: 'Bracket Bonding', description: 'High-precision bonding of orthodontic brackets onto tooth enamel.' },
        { title: 'Archwire Activation', description: 'Placing nickel-titanium archwires and ligature elastics to begin gentle movement.' },
      ],
    },
    preparation: {
      id: [
        'Menuntaskan penambalan lubang gigi dan scaling sebelum pasang',
        'Siap berkomitmen kontrol rutin setiap 3-4 minggu',
      ],
      en: [
        'Complete all cavity fillings and scaling before braces placement',
        'Commit to routine adjustment visits every 3-4 weeks',
      ],
    },
  },

  'perawatan-saluran-akar': {
    name: {
      id: 'Perawatan Saluran Akar (Endodonti)',
      en: 'Root Canal Treatment (Endodontics)',
    },
    summary: {
      id: 'Menyelamatkan gigi dengan infeksi saraf agar tidak perlu dicabut.',
      en: 'Save teeth with infected pulp tissue to prevent the need for extraction.',
    },
    description: {
      id: 'Terapi pembersihan jaringan pulpa yang terinfeksi bakteri di dalam saluran akar gigi, diikuti sterilisasi dan pengisian hermetis untuk mempertahankan gigi alami.',
      en: 'Deep micro-cleaning and disinfection of infected pulp tissue within root canals, sealed hermetically to preserve your natural tooth.',
    },
    whenNeeded: {
      id: [
        'Nyeri berdenyut hebat spontan terutama di malam hari',
        'Gigi berubah warna menjadi keabuan setelah benturan',
        'Muncul benjolan kecil berisi nanah di gusi dekat akar gigi',
      ],
      en: [
        'Severe spontaneous throbbing pain, especially at night',
        'Tooth turning grayish after physical trauma or impact',
        'Pus-filled gum blister (fistula) near the tooth root',
      ],
    },
    procedure: {
      id: [
        { title: 'Akses Kavitas & Pembersihan', description: 'Membuka jalan masuk dan membersihkan jaringan saraf yang mati.' },
        { title: 'Pengukuran & Sterilisasi', description: 'Pembersihan mikroba saluran akar dengan obat disinfektan.' },
        { title: 'Obturasi Saluran Akar', description: 'Pengisian saluran akar dengan bahan gutta-percha kedap bakteri.' },
      ],
      en: [
        { title: 'Access & Pulp Removal', description: 'Creating conservative access and gently removing non-vital nerve tissue.' },
        { title: 'Canal Disinfection', description: 'Ultrasonic microbial canal irrigation with specialized medication.' },
        { title: 'Root Canal Obturation', description: 'Hermetically sealing canals with biocompatible gutta-percha.' },
      ],
    },
    preparation: {
      id: [
        'Makan sebelum kunjungan',
        'Membawa hasil foto rontgen bila sudah memiliki sebelumnya',
      ],
      en: [
        'Eat a meal before your appointment',
        'Bring prior dental X-rays if available',
      ],
    },
  },

  'veneer-gigi': {
    name: {
      id: 'Veneer Gigi Estetik',
      en: 'Aesthetic Dental Veneers',
    },
    summary: {
      id: 'Lapisan tipis porselen atau komposit untuk senyum simetris dan rapi proporsional.',
      en: 'Thin custom porcelain or composite shells for symmetrical, beautifully proportioned smiles.',
    },
    description: {
      id: 'Pemasangan cangkang tipis berkualitas tinggi pada permukaan depan gigi untuk memperbaiki bentuk, ukuran, warna, atau menutup celah ringan antar gigi.',
      en: 'Custom wafer-thin shells bonded onto the front surface of teeth to enhance shape, size, color, or close small gaps between teeth.',
    },
    whenNeeded: {
      id: [
        'Bentuk gigi tidak beraturan atau patah di sudut',
        'Perubahan warna gigi intrinsik yang tidak mempan dengan bleaching',
        'Celah kecil di gigi depan yang ingin ditutup segera',
      ],
      en: [
        'Irregular tooth shape or chipped enamel edges',
        'Deep intrinsic tooth discoloration resistant to bleaching',
        'Small gaps between front teeth desired to be closed',
      ],
    },
    procedure: {
      id: [
        { title: 'Desain Senyum & Mockup', description: 'Simulasi bentuk senyum baru sesuai proporsi wajah pasien.' },
        { title: 'Preparasi Minimal', description: 'Pengurangan permukaan email gigi secara sangat tipis (0.3 - 0.5 mm).' },
        { title: 'Pemasangan & Polishing', description: 'Penyemenan veneer permanen dengan resin semen kuat.' },
      ],
      en: [
        { title: 'Smile Design & Mockup', description: 'Aesthetic simulation tailored to patient facial symmetry.' },
        { title: 'Micro Preparation', description: 'Ultra-conservative front enamel reduction (0.3 - 0.5 mm).' },
        { title: 'Bonding & Polishing', description: 'Permanent veneer bonding with high-strength resin cement and fine finishing.' },
      ],
    },
    preparation: {
      id: [
        'Konsultasikan ekspektasi bentuk senyum saat pemeriksaan',
        'Gigi dalam kondisi sehat dan bebas karang',
      ],
      en: [
        'Share your smile aesthetic goals during initial examination',
        'Ensure teeth and gums are clean and free of calculus',
      ],
    },
  },

  'perawatan-gigi-anak': {
    name: {
      id: 'Perawatan Gigi Anak (Pediatrik)',
      en: 'Pediatric Dental Care',
    },
    summary: {
      id: 'Pemeriksaan ramah dan bebas trauma untuk membangun kebiasaan gigi sehat sejak dini.',
      en: 'Gentle, trauma-free examinations to nurture healthy dental habits from an early age.',
    },
    description: {
      id: 'Layanan preventif dan kuratif untuk anak balita hingga remaja, meliputi aplikasi fluorida, penambalan gigi susu, dan edukasi menyikat gigi dengan pendekatan menyenangkan.',
      en: 'Preventive and restorative dental care for toddlers to teenagers, including fluoride applications, primary tooth fillings, and playful oral hygiene coaching.',
    },
    whenNeeded: {
      id: [
        'Pemeriksaan gigi pertama kali sejak usia 1 tahun',
        'Gigi susu berlubang atau gigis (karies botol)',
        'Pencegahan karies dengan aplikasi topical fluoride',
      ],
      en: [
        'First dental visit starting from age 1 or first tooth eruption',
        'Primary tooth cavities or early childhood nursing caries',
        'Caries prevention via professional topical fluoride application',
      ],
    },
    procedure: {
      id: [
        { title: 'Perkenalan Ramah', description: 'Membiasakan anak dengan kursi gigi dan instrumen secara santai.' },
        { title: 'Pemeriksaan Halus', description: 'Pengecekan pertumbuhan gigi dan kebersihan mulut.' },
        { title: 'Perawatan & Hadiah Apresiasi', description: 'Tindakan tanpa rasa sakit dan stiker apresiasi keberanian.' },
      ],
      en: [
        { title: 'Friendly Introduction', description: 'Familiarizing child with the dental chair and instruments in a playful manner.' },
        { title: 'Gentle Examination', description: 'Thorough, gentle check-up of tooth eruption and oral hygiene.' },
        { title: 'Care & Bravery Reward', description: 'Comfortable, pain-free treatment followed by courage stickers.' },
      ],
    },
    preparation: {
      id: [
        'Jelaskan pada anak tentang dokter gigi dengan nada menyenangkan',
        'Hindari menakut-nakuti anak dengan kata suntik atau sakit',
        'Pilih jam praktek saat anak sedang aktif dan tidak mengantuk',
      ],
      en: [
        'Describe the dentist visit in an exciting, positive manner',
        'Avoid scary words such as needles, injections, or pain',
        'Pick appointment times when the child is well-rested and cheerful',
      ],
    },
  },
}
