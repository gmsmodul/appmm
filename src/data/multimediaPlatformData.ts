import {
  CamMatrixItem,
  ChurchCategoryItem,
  CrewChiefTimelineItem,
  FdHandSignalItem,
  Gms2JabatanItem,
  Gms2PengantarRow,
  Gms2PrinsipRow,
  Gms2ServolutionRow,
  Gms2WiPrItem,
  LevelingGradeItem,
  MinistryRoleItem,
  NotificationItem,
  OrgChartNodeItem,
  PageAttachmentItem,
  PillarItem,
  RegionalItem,
  RuleItem,
  SopModuleItem,
  SopSectionMeta,
  SpaModulePageId,
} from '../types';

export const PAGE_LABELS_MAP: Record<SpaModulePageId | 'uikit', string> = {
  overview: 'Overview — 5 Bidang',
  orgchart: 'Struktur Organisasi',
  gms2: 'Platform GMS II (Base • 78 Hal.)',
  panduan: 'Panduan, SOP & Rules',
  perintisan: 'Workshop Perintisan',
  quickref: 'Referensi Cepat',
  uikit: 'UI Design System',
};

export const INITIAL_PAGE_ATTACHMENTS: Record<SpaModulePageId, PageAttachmentItem[]> = {
  overview: [],
  orgchart: [
    {
      id: 'att-org-1',
      name: 'PLATFORM GMS II Rev II – Multimedia A4.pdf',
      kind: 'link',
      url: 'https://drive.google.com/file/d/1D1p8-b1_t7dFB8Xro2wOmpiteg9TaQBh/view?usp=drive_link',
      meta: 'Google Drive • Struktur Resmi',
    },
  ],
  gms2: [
    {
      id: 'att-gms2-1',
      name: 'PLATFORM GMS II Rev II – Multimedia A4.pdf',
      kind: 'link',
      url: 'https://drive.google.com/file/d/1D1p8-b1_t7dFB8Xro2wOmpiteg9TaQBh/view?usp=drive_link',
      meta: 'Google Drive • 78 Hal.',
    },
  ],
  panduan: [
    {
      id: 'att-sop-1',
      name: 'Manual SOP & Deskripsi Kerja Multimedia GMS V5',
      kind: 'link',
      url: 'https://docs.google.com/document/d/1JEh88nUVcU505teA6xco2r3pt1htTXkJISJRxVHgL_0/edit?tab=t.0',
      meta: 'Google Docs • Manual SOP V5',
    },
    {
      id: 'att-bs-1',
      name: 'Buku Saku Multimedia Ministry.pdf',
      kind: 'link',
      url: 'https://drive.google.com/file/d/1C_MM0_55fGkcKJOm-wpm2i1nkwO0fk7y/view?usp=drive_link',
      meta: 'Google Drive • Buku Saku',
    },
  ],
  perintisan: [
    {
      id: 'att-pr-1',
      name: 'Workshop Dasar Gereja Perintisan.pdf',
      kind: 'link',
      url: 'https://drive.google.com/file/d/1StUU6vQuXqSlpuIP9u_N0-cfjNbSsxP_/view?usp=drive_link',
      meta: 'Google Drive • Asli',
    },
  ],
  quickref: [],
};

export const INITIAL_MULTIMEDIA_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'mm-notif-1',
    title: 'Standar Penampilan & Seragam Diperbarui',
    desc: 'Aturan Grooming, Kerapian Seragam, Celana, Alas Kaki & Konsekuensi tergabung di Panduan — Rules & Kedisiplinan.',
    time: 'Baru',
    unread: true,
    category: 'Rules & Kedisiplinan',
    targetPage: 'panduan',
    targetId: 'rule-2',
    theme: 'coral',
    reminderTag: 'Aturan Wajib',
    sourceType: 'panduan',
    isReminder: true,
  },
  {
    id: 'mm-notif-2',
    title: 'Deadline Pengumuman Mingguan',
    desc: 'Form Surat Ijin Pengumuman maks. Rabu 12.00 WIB & serah materi maks. Rabu 14.00 WIB.',
    time: 'Rabu 12:00',
    unread: true,
    category: 'Platform GMS II',
    targetPage: 'gms2',
    targetId: 'wi-01',
    theme: 'peach',
    reminderTag: 'Deadline Mingguan',
    sourceType: 'gms2',
    isReminder: true,
  },
  {
    id: 'mm-notif-3',
    title: 'Serah Terima Data Centre',
    desc: 'Final Bank diserahkan setiap tanggal 1 tiap bulan dengan format .mp4 H.264 1080p.',
    time: 'Tgl 1 / Bln',
    unread: true,
    category: 'Platform GMS II',
    targetPage: 'gms2',
    targetId: 'wi-02',
    theme: 'periwinkle',
    reminderTag: 'Arsip Bulanan',
    sourceType: 'gms2',
    isReminder: false,
  },
  {
    id: 'mm-notif-4',
    title: 'Call Time & SOP Crew Chief (H-60)',
    desc: 'Seluruh kru wajib hadir 60 menit sebelum ibadah untuk briefing internal, cek seragam & doa bersama.',
    time: 'H-60 Menit',
    unread: true,
    category: 'SOP Operasional',
    targetPage: 'panduan',
    targetId: 'timeline',
    theme: 'mint',
    reminderTag: 'SOP Ibadah',
    sourceType: 'panduan',
    isReminder: true,
  },
];

export const PILLARS_DATA: PillarItem[] = [
  {
    id: 'system',
    group: 'Operasional & Infrastruktur Teknis',
    name: 'System',
    role: 'Penjaga Standar & Aturan (Compliance)',
    iconKey: 'shield',
    tone: 'blue',
    responsibility:
      'Memastikan seluruh operasional dan penggunaan alat berjalan sesuai regulasi yang melindungi aset dan ketertiban ibadah.',
    jobdesk: [
      'Menyusun dan merevisi SOP dan Work Instructions (WI) untuk setiap peran (kamera, switcher, ProPresenter, dll).',
      'Membuat alur birokrasi peminjaman dan pengembalian alat.',
      'Menentukan hak akses (siapa yang boleh memegang alat tertentu berdasarkan tingkat skill).',
      'Melakukan audit kepatuhan (mengecek apakah SOP benar-benar dijalankan di lapangan).',
    ],
    baseSop:
      'Setiap alat yang dikeluarkan dari lemari penyimpanan harus dicatat di logbook oleh pengguna. Setelah ibadah selesai, alat harus dikembalikan ke posisi semula dengan kabel tergulung rapi.',
  },
  {
    id: 'tools',
    group: 'Operasional & Infrastruktur Teknis',
    name: 'Tools',
    role: 'Teknisi & Manajemen Aset (Technical Support & Inventory)',
    iconKey: 'wrench',
    tone: 'amber',
    responsibility:
      'Memastikan seluruh perangkat keras dan lunak selalu dalam kondisi prima dan siap pakai.',
    jobdesk: [
      'Melakukan maintenance rutin (pembersihan lensa kamera, update software stabil, pengecekan kabel SDI/NDI).',
      'Mencatat inventaris aset masuk, keluar, atau rusak secara berkala (Equipment History Card).',
      'Menerima keluhan kerusakan alat dan melakukan perbaikan atau klaim garansi.',
      'Meriset dan mengajukan proposal upgrade atau pembelian alat baru sesuai kebutuhan operasional bersama TPS.',
    ],
    baseSop:
      'Setiap kebutuhan alat baru diajukan melalui Form Pengajuan Alat dengan menyertakan Nama Alat, Spesifikasi, Alasan Kebutuhan, dan Perkiraan Harga untuk di-review setiap tanggal 15 sebelum diteruskan ke manajemen/TPS.',
  },
  {
    id: 'advancement',
    group: 'Pengembangan SDM, Penggembalaan & Onboarding',
    name: 'Advancement',
    role: 'Pengembang Keterampilan (Skill Development)',
    iconKey: 'graduation',
    tone: 'emerald',
    responsibility:
      'Merancang Learning and Development Program (LDP) agar volunteer terus bertumbuh secara teknis.',
    jobdesk: [
      'Memetakan level skill setiap volunteer saat ini (Trainee – Bintang 4).',
      'Menyelenggarakan workshop spesifik (Director Class, pergerakan kamera gimbal/tripod, transisi visual).',
      'Melakukan evaluasi teknis untuk menentukan kesiapan volunteer naik level atau memegang alat lebih kompleks.',
      'Mencari referensi tren visual dan teknologi broadcasting terbaru untuk diterapkan di gereja.',
    ],
    baseSop:
      'Volunteer diizinkan bertugas sebagai Switcher Operator setelah minimal 3 bulan sebagai Camera Operator, mengikuti kelas transisi dasar, dan lulus ujian simulasi live oleh Koordinator Advancement.',
  },
  {
    id: 'relations',
    group: 'Pengembangan SDM, Penggembalaan & Onboarding',
    name: 'Relations',
    role: 'Penggembala & Penjaga Hati (Pastoral Care & Community)',
    iconKey: 'heart',
    tone: 'brand',
    responsibility:
      'Memastikan volunteer melayani dengan motivasi hati yang benar, terhubung dalam komunitas, dan tidak burnout.',
    jobdesk: [
      'Memantau dan merekap kehadiran volunteer dalam Connect Group (CG) dan ibadah raya mingguan.',
      'Menjadi tempat curhat, mentoring 1-on-1, atau mediasi jika terjadi konflik antar anggota tim.',
      'Mengadakan acara kebersamaan atau Monthly Gathering khusus tim multimedia.',
      'Memberikan rekomendasi penonaktifan sementara (rest) bagi volunteer yang mengalami kelelahan mental atau pemulihan rohani.',
    ],
    baseSop:
      'Setiap volunteer multimedia wajib aktif menghadiri Connect Group (CG) minimal 3 kali dalam sebulan. Jika di bawah standar, jadwal pelayanan bulan berikutnya disesuaikan agar volunteer fokus pada pemulihan rohani.',
  },
  {
    id: 'servolution',
    group: 'Pengembangan SDM, Penggembalaan & Onboarding',
    name: 'Servolution',
    role: 'Pendidik Tahap Awal (Onboarding & Training Center)',
    iconKey: 'sprout',
    tone: 'purple',
    responsibility:
      'Menyaring, menyambut, dan membekali calon volunteer baru dengan dasar-dasar pelayanan multimedia.',
    jobdesk: [
      'Membuat silabus kurikulum dasar untuk pemula (visi gereja, dasar kabel & konektor, pengenalan alat).',
      'Mengajar kelas orientasi Servolution dan Workshop Dasar Lv.1 secara berkala.',
      'Mendampingi volunteer baru saat masa observasi (shadowing) di ruang ibadah & MCR.',
      'Meluluskan volunteer baru dan menyerahkannya ke tim utama untuk penjadwalan.',
    ],
    baseSop:
      'Calon volunteer wajib menyelesaikan seluruh sesi kelas orientasi Servolution tanpa absen, dilanjutkan masa observasi/shadowing lapangan minimal 2 minggu sebelum dijadwalkan memegang alat secara mandiri.',
  },
];

export const INITIAL_RULES_DATA: RuleItem[] = [
  {
    id: 'rule-1',
    title: 'Kedisiplinan & Kehadiran (Call Time H-60)',
    summary:
      'Panduan waktu kedatangan H-60 menit, prosedur izin H-1, dan pencarian pengganti (back-up).',
    category: 'Kedisiplinan & Penampilan',
    type: 'ATURAN',
    iconKey: 'clock',
    tone: 'blue',
    blocks: [
      {
        kind: 'list',
        items: [
          {
            lead: 'Call Time (H-60):',
            text: 'Setiap volunteer wajib hadir dan siap di posisi minimal 60 menit sebelum ibadah dimulai untuk briefing, doa bersama, dan technical check.',
          },
          {
            lead: 'Prosedur Izin / Batal Tugas:',
            text: 'Jika berhalangan hadir (sakit/urusan mendesak), wajib mengabari PIC jadwal maksimal H-1 (24 jam sebelum tugas). Dilarang membatalkan mendadak pada hari-H kecuali darurat (kecelakaan/duka).',
          },
          {
            lead: 'Mencari Pengganti (Back-up):',
            text: 'Volunteer yang berhalangan sangat disarankan proaktif membantu PIC mencari pengganti dari sesama rekan multimedia sebelum melapor.',
          },
        ],
      },
    ],
  },
  {
    id: 'rule-2',
    title: 'Standar Penampilan, Seragam & Grooming (5 Standar Kerapian)',
    summary:
      'Aturan lengkap penampilan pribadi, kerapian seragam, celana, alas kaki, serta konsekuensi ketidakpatuhan.',
    category: 'Kedisiplinan & Penampilan',
    type: 'ATURAN',
    iconKey: 'shirt',
    tone: 'amber',
    blocks: [
      {
        kind: 'callout',
        tone: 'neutral',
        title: '1. Penampilan Pribadi (Grooming)',
        items: [
          { text: 'Rambut harus disisir dengan rapi.' },
          {
            text: 'Warna rambut harus natural. Jika menggunakan pewarna rambut, wajib memilih warna yang tidak mencolok atau terang.',
          },
          { text: 'Wanita diperbolehkan menggunakan make-up, namun harus secukupnya dan tidak berlebihan.' },
          { text: 'Tato yang terlihat wajib ditutupi selama melayani.' },
          { text: 'Jika menggunakan masker, wajib berwarna gelap (hitam, navy, atau warna gelap lainnya).' },
          { text: 'Tidak diperbolehkan mengenakan aksesori secara berlebihan (kalung, gelang, atau anting mencolok yang menarik perhatian).' },
        ],
      },
      {
        kind: 'callout',
        tone: 'neutral',
        title: '2. Kerapian Seragam & ID Card',
        items: [
          {
            text: 'Seragam multimedia harus dalam keadaan bersih, rapi, dan tidak kusut (jika belum memiliki seragam resmi, kenakan atasan gelap/hitam polos yang rapi).',
          },
          { text: 'Seluruh kancing pada seragam wajib dikancingkan, kecuali pada bagian kerah.' },
          { text: 'Wajib mengenakan ID Card / Lanyard kru selama bertugas.' },
        ],
      },
      {
        kind: 'callout',
        tone: 'neutral',
        title: '3. Ketentuan Celana',
        items: [
          { text: 'Wajib menggunakan celana panjang berwarna hitam atau warna gelap.' },
          {
            lead: 'Tidak diperbolehkan:',
            text: 'Celana 7/8, Jogger, Legging, Kulot, Celana robek (ripped), celana pendek, maupun rok mini.',
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'neutral',
        title: '4. Ketentuan Alas Kaki',
        items: [
          { text: 'Wajib menggunakan sepatu tertutup dengan warna dominan hitam atau gelap.' },
          {
            lead: 'Tidak diperbolehkan:',
            text: 'High heels, Sandal (termasuk sandal jepit), Pantofel, dan Crocs.',
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'red',
        title: '5. Konsekuensi Ketidakpatuhan',
        items: [
          {
            lead: 'Tindakan Langsung (On-the-Spot oleh PIC / Crew Chief):',
            text: 'Kru diminta segera merapikan penampilan (kancing seragam, melepas aksesori, mengganti masker, menutupi tato) sebelum bertugas. Jika melanggar seragam/celana/alas kaki yang tidak dapat langsung diganti, PIC berhak memindahkan ke posisi backstage/non-kamera atau tidak mengizinkan bertugas pada sesi ibadah tersebut.',
          },
          {
            lead: 'Pelanggaran ke-1:',
            text: 'Teguran lisan personal oleh PIC/Crew Chief dan dicatat pada log evaluasi.',
          },
          {
            lead: 'Pelanggaran ke-2:',
            text: 'Sesi mentoring 1-on-1 bersama Divisi Relations dan catatan peringatan internal.',
          },
          {
            lead: 'Pelanggaran ke-3:',
            text: 'Rest pelayanan sementara selama 1 bulan untuk evaluasi komitmen dan pemulihan disiplin.',
          },
        ],
      },
    ],
  },
  {
    id: 'rule-3',
    title: 'Sikap Operasional & Kerohanian (On-Duty)',
    summary:
      'Fokus saat ibadah, etika komunikasi interkom (Clearcom), keamanan alat, dan ketaatan instruksi saat live.',
    category: 'Kedisiplinan & Penampilan',
    type: 'ATURAN',
    iconKey: 'headset',
    tone: 'indigo',
    blocks: [
      {
        kind: 'list',
        items: [
          {
            lead: 'Fokus & Profesional:',
            text: 'Dilarang bermain handphone, membuka media sosial, atau mengerjakan pekerjaan pribadi saat ibadah berlangsung.',
          },
          {
            lead: 'Komunikasi Interkom (Clearcom):',
            text: 'Hanya untuk instruksi teknis dan cueing. Dilarang bercanda berlebihan, bergosip, atau berkata kasar di interkom.',
          },
          {
            lead: 'Kebersihan & Keamanan Alat:',
            text: 'Dilarang membawa makanan/minuman terbuka di dekat PC, switcher, atau mixer. Kembalikan alat sesuai SOP Divisi System.',
          },
          {
            lead: 'Ketaatan & Kerohanian:',
            text: 'Ikuti instruksi Director/PIC tanpa berdebat saat live (diskusi dilakukan setelah ibadah). Tetap tertanam di gereja lokal, aktif di Connect Group (CG), dan memiliki hati yang teachable.',
          },
        ],
      },
    ],
  },
  {
    id: 'rule-mcr',
    title: 'Tata Tertib Ruang Master Control Multimedia (MCR)',
    summary:
      'Hak akses ketat khusus kru bertugas, higienitas larangan makanan/minuman, kerahasiaan materi internal, dan sanksi.',
    category: 'Tata Tertib Ruang & Aset',
    type: 'ATURAN',
    iconKey: 'clipboard',
    tone: 'emerald',
    blocks: [
      {
        kind: 'list',
        items: [
          {
            lead: 'Hak Akses:',
            text: 'MCR hanya boleh diakses oleh tim multimedia yang sedang bertugas. Pihak luar dilarang masuk tanpa izin resmi.',
          },
          {
            lead: 'Higienitas:',
            text: 'Dilarang keras membawa makanan dan minuman ke dalam MCR, kecuali air mineral yang diletakkan di area khusus jauh dari konsol dan perangkat elektronik.',
          },
          {
            lead: 'Kerahasiaan & Privasi:',
            text: 'Dilarang mengambil foto/video pribadi di dalam MCR dan dilarang menyebarkan materi internal gereja tanpa izin.',
          },
          {
            lead: 'Sanksi Pelanggaran:',
            text: 'Pelanggaran tata tertib MCR berakibat pada teguran lisan, teguran tertulis, hingga pencabutan hak akses fisik ke ruangan MCR.',
          },
        ],
      },
    ],
  },
  {
    id: 'rule-cam-ethics',
    title: 'Kode Etik & Larangan Mutlak Penggunaan Peralatan Kamera Volunteer',
    summary:
      'Birokrasi form peminjaman, perawatan preventif optik & strap wajib, serta 4 larangan mutlak penggunaan inventaris kamera.',
    category: 'Tata Tertib Ruang & Aset',
    type: 'ATURAN',
    iconKey: 'file',
    tone: 'teal',
    blocks: [
      {
        kind: 'callout',
        tone: 'neutral',
        title: '1. Birokrasi & Perawatan Preventif',
        items: [
          { text: 'Wajib mengisi formulir peminjaman resmi setiap kali mengeluarkan peralatan.' },
          { text: 'Lensa hanya boleh dibersihkan menggunakan kain microfiber / blower (dilarang keras menyentuh kaca optik secara langsung dengan jari).' },
          { text: 'Wajib menggunakan strap kamera sepanjang pengoperasian untuk mencegah risiko jatuh.' },
        ],
      },
      {
        kind: 'callout',
        tone: 'red',
        title: '2. Larangan Mutlak Volunteer',
        items: [
          { text: 'Dilarang mengambil gambar subjek privat tanpa izin.' },
          { text: 'Dilarang menghalangi pandangan/pergerakan performer maupun jemaat.' },
          { text: 'Dilarang menggunakan inventaris gereja untuk keperluan pribadi.' },
          { text: 'Dilarang membongkar atau memodifikasi bodi/setting permanen kamera tanpa izin Creative Director / PIC Wilayah.' },
        ],
      },
    ],
  },
  {
    id: 'rule-5',
    title: 'Kategori Pelanggaran (Minor, Moderate, Major)',
    summary:
      'Klasifikasi objektif tingkat pelanggaran agar tidak ada area abu-abu dalam penegakan disiplin.',
    category: 'Pelanggaran & Sanksi',
    type: 'SANKSI',
    iconKey: 'scale',
    tone: 'red',
    blocks: [
      {
        kind: 'callout',
        tone: 'amber',
        title: 'A. Pelanggaran Ringan (Minor)',
        items: [
          { text: 'Terlambat Call Time < 15 menit tanpa pemberitahuan.' },
          {
            text: 'Kelalaian minor grooming/seragam (kancing belum rapi, lupa ID Card, masker bukan warna gelap, lupa menutupi tato/aksesori).',
          },
          { text: 'Lupa mengisi absensi pelayanan atau logbook alat; meninggalkan area tugas berantakan.' },
        ],
      },
      {
        kind: 'callout',
        tone: 'orange',
        title: 'B. Pelanggaran Sedang (Moderate)',
        items: [
          { text: 'Terlambat > 30 menit atau membatalkan pelayanan hari-H tanpa alasan darurat/sakit.' },
          {
            text: 'Pelanggaran dress code berat (celana 7/8, jogger, legging, kulot, ripped; alas kaki high heels, sandal, pantofel, Crocs; warna rambut mencolok).',
          },
          {
            text: 'Bermain HP, mengobrol, atau bercanda di Clearcom saat ibadah; mengabaikan instruksi Director/PIC; mengulangi pelanggaran Minor > 3 kali.',
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'red',
        title: 'C. Pelanggaran Berat (Major / Fatal)',
        items: [
          { text: 'Merusak aset/peralatan secara sengaja atau kelalaian fatal terhadap SOP System.' },
          { text: 'Membawa pulang alat inventaris tanpa izin tertulis.' },
          { text: 'Masalah etika/moral kerohanian serius atau melawan secara agresif terhadap sesama volunteer/pemimpin.' },
        ],
      },
    ],
  },
  {
    id: 'rule-6',
    title: 'Alur Penanganan & Eskalasi Konsekuensi (4 Langkah)',
    summary:
      'Prinsip restorasi (bukan sekadar hukuman) dari Teguran Simpatik hingga Rest Pelayanan.',
    category: 'Pelanggaran & Sanksi',
    type: 'SANKSI',
    iconKey: 'stairs',
    tone: 'brand',
    blocks: [
      {
        kind: 'list',
        ordered: true,
        items: [
          {
            lead: 'Langkah 1 — Teguran Simpatik (On-the-Spot oleh PIC/Director):',
            text: 'Dilakukan personal 1-on-1 di luar area tugas utama (tidak mempermalukan di depan kru lain) untuk pelanggaran Minor perdana.',
          },
          {
            lead: 'Langkah 2 — Sesi Mentoring & Catatan Peringatan (Divisi Relations + PIC):',
            text: 'Untuk pelanggaran berulang atau batal hari-H tanpa alasan jelas. Menggali akar masalah (stres/pribadi) dan dicatat di profil volunteer.',
          },
          {
            lead: 'Langkah 3 — Rest Pelayanan 1–3 Bulan (Ketua Departemen + Relations):',
            text: 'Dinonaktifkan sementara dari jadwal pelayanan sambil tetap dipantau kehadirannya di Connect Group (CG) untuk pemulihan rohani.',
          },
          {
            lead: 'Langkah 4 — Restrukturisasi / Pemberhentian Permanen (Ketua Departemen + Gembala):',
            text: 'Untuk pelanggaran Berat (Major), kerusakan aset disengaja, atau masalah moral; atau pengalihan ke divisi pelayanan lain yang lebih sesuai.',
          },
        ],
      },
    ],
  },
  {
    id: 'rule-7',
    title: 'Pedoman Komunikasi Menegur — Sandwich Method',
    summary:
      'Panduan komunikasi 3 lapis (Apresiasi – Koreksi Objektif – Dukungan) untuk para PIC & Leader.',
    category: 'Komunikasi & Pembinaan',
    type: 'PANDUAN',
    iconKey: 'comments',
    tone: 'purple',
    blocks: [
      {
        kind: 'callout',
        tone: 'emerald',
        title: '1. Roti Atas (Apresiasi)',
        text: 'Mulai dengan hal positif yang nyata. "Thank you ya hari ini framing kamera kamu rapi banget pas lagu penyembahan."',
      },
      {
        kind: 'callout',
        tone: 'amber',
        title: '2. Daging (Koreksi Objektif)',
        text: 'Sampaikan pelanggaran spesifik tanpa menyerang karakter. "Tapi tadi saya perhatikan pas khotbah kamu lumayan lama main HP, sampai kehilangan momen pembicara turun panggung."',
      },
      {
        kind: 'callout',
        tone: 'info',
        title: '3. Roti Bawah (Harapan & Solusi)',
        text: 'Tutup dengan dukungan dan kepercayaan. "Minggu depan HP-nya disimpan dulu di tas ya selama ibadah. Saya percaya kamu bisa lebih fokus karena skill kamu bagus."',
      },
    ],
  },
  {
    id: 'rule-8',
    title: '8 Poin Komitmen & 7 Persyaratan Minimal Pelayan',
    summary:
      'Syarat rohani & administratif (Lahir Baru, NIJ, CG, MSJ) serta 8 komitmen pelayan Multimedia GMS.',
    category: 'Value & Komitmen',
    type: 'KOMITMEN',
    iconKey: 'heartHand',
    tone: 'teal',
    blocks: [
      {
        kind: 'list',
        title: '7 Persyaratan Minimal Pelayan',
        ordered: true,
        items: [
          { text: 'Sudah lahir baru dan dibaptis air.' },
          { text: 'Memiliki Nomor Induk Jemaat (NIJ) GMS.' },
          { text: 'Aktif dan digembalakan di Connect Group (CG).' },
          { text: 'Telah menyelesaikan kelas MSJ (minimal MSJ 1/2 sesuai jenjang).' },
          { text: 'Lulus kelas orientasi Servolution & Workshop Dasar sesuai bidang.' },
          { text: 'Bersedia mentaati seluruh SOP, aturan seragam, dan pimpinan rohani.' },
          { text: 'Memiliki kerinduan melayani Tuhan dengan hati yang murni.' },
        ],
      },
      {
        kind: 'list',
        title: '8 Poin Komitmen Pelayan Multimedia',
        ordered: true,
        items: [
          { text: 'Menjaga keintiman pribadi dengan Tuhan (saat teduh & doa).' },
          { text: 'Setia hadir dalam ibadah raya dan Connect Group (CG).' },
          { text: 'Hadir tepat waktu pada Call Time dan mengikuti briefing & doa kru.' },
          { text: 'Menjaga kekudusan hidup, tutur kata, dan pergaulan.' },
          { text: 'Menjaga kesatuan tim (Unity) dan menghindari gosip/konflik.' },
          { text: 'Merawat seluruh peralatan gereja seperti milik sendiri.' },
          { text: 'Siap diajar (teachable), rendah hati menerima koreksi & evaluasi.' },
          { text: 'Terus bertumbuh dalam karakter dan keterampilan (skill advancement).' },
        ],
      },
    ],
  },
];

export const SOP_SECTIONS_META: SopSectionMeta[] = [
  { id: 'all', label: 'Semua SOP' },
  { id: 'crewchief', label: 'SOP Crew Chief (H-60)' },
  { id: 'I', label: 'I. Struktur & Aset' },
  { id: 'II', label: 'II. Control Room & Siaran' },
  { id: 'III', label: 'III. Visual & Presentasi' },
  { id: 'IV', label: 'IV. Kameramen & Multicam' },
  { id: 'V', label: 'V. Perangkat Lapangan' },
  { id: 'VI', label: 'VI. Teknisi & Risiko Alat' },
];

export const CAM_MATRIX_DATA: CamMatrixItem[] = [
  {
    cam: 'CAM 1',
    rig: 'Gimbal',
    lens: '16-35mm',
    tone: 'brand',
    notes: 'Area musik kiri & jemaat depan. Gerakan smooth, slow panning, dynamic shot dari bawah ke atas saat upbeat.',
  },
  {
    cam: 'CAM 2',
    rig: 'Gimbal',
    lens: '24-70mm',
    tone: 'brand',
    notes: 'Area keyboard, perkusi, violin, singer kanan. Komposisi stabil, mainkan kedalaman ruang (DOF), gerakan melingkar (parallax).',
  },
  {
    cam: 'CAM 3',
    rig: 'Handheld',
    lens: '70-200mm',
    tone: 'indigo',
    notes: 'Medium close-up pemusik, singer, dan emosi/ekspresi jemaat (sisi kiri). Transisi halus, dilarang zoom mendadak. Wajib aktifkan Active SteadyShot.',
  },
  {
    cam: 'CAM 4',
    rig: 'Handheld',
    lens: '70-200mm',
    tone: 'indigo',
    notes: 'Medium close-up pemusik, singer, dan emosi/ekspresi jemaat (sisi kanan). Transisi halus, dilarang zoom mendadak. Wajib aktifkan Active SteadyShot.',
  },
  {
    cam: 'CAM 5',
    rig: 'Master MCU',
    lens: '200-600mm',
    tone: 'blue',
    notes: 'Kamera utama pembicara atau WL. Wajib sangat stabil, konsisten, framing aman (not too tight) menggunakan lensa super-tele.',
  },
  {
    cam: 'CAM 6',
    rig: 'Master Full',
    lens: '100-400mm',
    tone: 'blue',
    notes: 'Full shot panggung utuh. Kamera statis sebagai establishing shot aman jika terjadi kendala pada kamera lain.',
  },
  {
    cam: 'CAM 7',
    rig: 'Dolly Track',
    lens: '28-135mm',
    tone: 'purple',
    notes: 'Pergerakan maju-mundur (Dolly In/Out) mekanis, lambat dan natural di atas rel baja untuk menambah visual dinamis jemaat/panggung.',
  },
  {
    cam: 'CAM 8',
    rig: 'Jib / Crane',
    lens: '28-135mm',
    tone: 'amber',
    notes: 'Perspektif unik dari atas. Wide sweeping shot diagonal dari atas ke bawah saat momen klimaks khotbah/pujian intens.',
  },
  {
    cam: 'CAM 9',
    rig: 'Master Wide',
    lens: '28-135mm',
    tone: 'emerald',
    notes: 'Backup utama visual panggung & jemaat penuh. Wajib tajam (sharp), stabil, digunakan di awal/akhir ibadah.',
  },
];

export const FD_HAND_SIGNALS_DATA: FdHandSignalItem[] = [
  { code: 'Standby', gesture: 'Mengangkat satu tangan, telapak menghadap ke depan.', meaning: 'Talent atau kru bersiap di posisi.' },
  { code: 'Countdown', gesture: 'Menunjukkan jari tangan menghitung mundur (5 hingga 0).', meaning: 'Hitung mundur detik sebelum siaran dimulai.' },
  { code: 'Cue', gesture: 'Menunjuk langsung ke arah talent/kru dengan jari telunjuk.', meaning: 'Tanda untuk mulai berbicara atau beraksi.' },
  { code: 'Wrap Up', gesture: 'Menggerakkan tangan melingkar di atas kepala.', meaning: 'Segmen harus segera diakhiri atau dipersingkat.' },
  { code: 'Stretch', gesture: 'Menarik kedua tangan menjauh satu sama lain.', meaning: 'Segmen perlu diperpanjang durasinya.' },
  { code: 'Slow Down', gesture: 'Menurunkan tangan dengan telapak menghadap bawah secara perlahan.', meaning: 'Talent harus memperlambat tempo bicara/aksi.' },
  { code: 'Speak Louder', gesture: 'Menangkupkan tangan di belakang telinga.', meaning: 'Talent harus meningkatkan volume suara.' },
  { code: 'Closer to Mic', gesture: 'Menunjuk ke arah mikrofon, lalu ke arah mulut.', meaning: 'Talent harus mendekatkan diri ke mikrofon.' },
  { code: 'Cut', gesture: 'Menggerakkan tangan melintasi leher secara horizontal.', meaning: 'Hentikan aksi atau pembicaraan segera.' },
  { code: 'Applause', gesture: 'Mengangkat kedua tangan di atas kepala dan bertepuk tangan.', meaning: 'Isyarat penonton studio untuk mulai bertepuk tangan.' },
];

export const INITIAL_SOP_V5_DATA: SopModuleItem[] = [
  {
    id: 'sop-01',
    section: 'I',
    sectionTitle: 'Bagian I: Struktur Organisasi & Manajemen Tim',
    num: '01',
    title: 'PIC Wilayah (Multimedia)',
    type: 'JOBDESK',
    summary:
      'Koordinator utama & penentu kebijakan struktural operasional multimedia wilayah, supervisi PIC Tim, dan akuntabilitas akhir aset/siaran.',
    iconKey: 'userTie',
    tone: 'blue',
    blocks: [
      {
        kind: 'callout',
        tone: 'info',
        title: 'Peran Utama',
        text: 'Koordinator utama dan penentu kebijakan struktural yang memastikan seluruh operasional tim multimedia di wilayahnya berjalan selaras dengan visi, standar kualitas, dan kebutuhan liturgi organisasi. Membawahi PIC Tim Multimedia dan memastikan para kru bekerja terarah, disiplin, dan berkembang.',
      },
      {
        kind: 'list',
        title: 'Tanggung Jawab',
        items: [
          { text: 'Menjamin kepatuhan kru terhadap seluruh dokumen Standar Operasional Prosedur (SOP) yang berlaku.' },
          {
            text: 'Menjadi penanggung jawab akhir (ultimate accountability) atas keselamatan aset broadcast dan stabilitas siaran di wilayahnya jika terjadi kendala berskala besar (siaran terputus, alat rusak parah).',
          },
          {
            text: 'Mengembangkan kapasitas spiritual dan keahlian teknis (skill enhancement) volunteer melalui internal training, mentoring, dan sertifikasi internal.',
          },
          { text: 'Menjadi role model dalam sikap, komunikasi, dan pelayanan.' },
        ],
      },
      {
        kind: 'list',
        title: 'Deskripsi Kerja (Jobdesk) & Alur Operasional',
        items: [
          {
            lead: 'Perencanaan & Koordinasi:',
            text: 'Menyusun rencana pelayanan dan penugasan multimedia mingguan/bulanan sesuai jadwal ibadah/acara; mengkoordinasikan PIC Tim Multimedia di setiap pos pelayanan.',
          },
          {
            lead: 'Komunikasi:',
            text: 'Menjadi jembatan komunikasi resmi antara divisi multimedia dengan pimpinan Live Production serta divisi eksternal.',
          },
          {
            lead: 'Monitoring & Supervisi:',
            text: 'Memantau langsung performa tim di lapangan (Pra, Saat, dan Pasca-acara) serta menangani kendala teknis maupun non-teknis secara cepat.',
          },
          {
            lead: 'Administrasi & Laporan:',
            text: 'Menyusun, memverifikasi, dan mengajukan laporan berkala serta anggaran pemeliharaan/penggantian alat kepada manajemen pimpinan.',
          },
        ],
      },
      {
        kind: 'metaBox',
        lines: [
          {
            label: 'Relasi',
            value:
              'Atasan langsung: PIC Live Production • Bawahan langsung: PIC Tim Multimedia • Rekan kerja: Worship Leader, Usher, Host, Event Coordinator.',
          },
          {
            label: 'Kualifikasi',
            value:
              'Berpengalaman di multimedia gereja/produksi event, mampu memimpin tim besar, komunikasi tegas namun membangun, visioner, proaktif, dan sigap mengambil keputusan darurat.',
          },
        ],
      },
    ],
  },
  {
    id: 'sop-02',
    section: 'I',
    sectionTitle: 'Bagian I: Struktur Organisasi & Manajemen Tim',
    num: '02',
    title: 'Gear Manager',
    type: 'SOP',
    summary:
      'Pengelola siklus hidup hardware, pelabelan QR Code, charging baterai, distribusi lapangan, backup footage, dan penyimpanan dry box.',
    iconKey: 'boxes',
    tone: 'blue',
    blocks: [
      {
        kind: 'callout',
        tone: 'info',
        title: 'Peran Utama & Tanggung Jawab',
        text: 'Pengelola dan pengawas utama siklus hidup hardware yang bertanggung jawab atas logistik, keamanan, inventarisasi, akurasi jumlah & kelayakan fungsi alat, keamanan pengarsipan footage backup, serta meminimalkan risiko kehilangan/kerusakan akibat kelalaian operasional.',
      },
      {
        kind: 'callout',
        tone: 'neutral',
        title: '1. Persiapan Pra-Acara',
        items: [
          { text: 'Melakukan inventarisasi berkala dan pelabelan menggunakan QR Code / label fisik pada setiap kategori alat.' },
          { text: 'Mengisi formulir Checklist Peralatan dan membagikannya ke masing-masing tim.' },
          {
            text: 'Mengontrol pengisian daya (charging) baterai utama hingga penuh, menyiapkan unit cadangan (backup gear), serta mengecek konektivitas nirkabel (Holyland, WiFi, Bluetooth).',
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'neutral',
        title: '2. Saat Acara Berlangsung',
        items: [
          {
            text: 'Mendistribusikan peralatan kepada operator, mencatat setiap peminjaman, dan memantau kapasitas baterai serta media penyimpanan secara berkala.',
          },
          {
            text: 'Menyiapkan tool kit perbaikan minor (obeng, gaffer tape, lens cleaner) dan memastikan area penyimpanan steril dari pihak tidak berkepentingan.',
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'neutral',
        title: '3. Pasca-Acara',
        items: [
          { text: 'Membersihkan unit optik lensa dengan blower/kain microfiber dan mengosongkan kartu memori setelah backup aman.' },
          {
            text: 'Memindahkan seluruh footage/file ke hard drive utama serta backup cloud dan memperbarui Log Kerusakan Peralatan.',
          },
          { text: 'Menyimpan bodi kamera & lensa ke dalam dry box dengan baterai yang sudah dilepas untuk mencegah kebocoran daya.' },
        ],
      },
    ],
  },
  {
    id: 'sop-03',
    section: 'II',
    sectionTitle: 'Bagian II: Control Room & Koordinasi Siaran',
    num: '03',
    title: 'Program Director (PD)',
    type: 'SOP',
    summary:
      'Pemimpin eksekutif Control Room pengendali aspek kreatif, visual storytelling, rundown, komando shot list, dan debriefing pasca-siaran.',
    iconKey: 'clapperboard',
    tone: 'brand',
    blocks: [
      {
        kind: 'callout',
        tone: 'brand',
        title: 'Peran Utama & Tanggung Jawab',
        text: 'Pemimpin eksekutif ruang produksi (Control Room) yang memegang kendali penuh atas aspek kreatif, alur visual storytelling, presisi durasi rundown, dan kualitas estetika visual siaran langsung secara real-time.',
      },
      {
        kind: 'list',
        items: [
          {
            lead: 'Pra-Produksi:',
            text: 'Memimpin rapat pra-produksi bersama produser dan seluruh kru untuk membedah konsep acara serta menyusun rundown detail (segmen, durasi, elemen teknis).',
          },
          {
            lead: 'Koordinasi Ruang Produksi:',
            text: 'Memberikan komando instan terkait sudut pengambilan gambar (shot list) kepada kameramen, menginstruksikan Floor Director (FD) terkait pergerakan panggung talent/properti, serta menyelaraskan operator konten/slide.',
          },
          {
            lead: 'Saat Siaran:',
            text: 'Memantau siaran secara real-time, mengatur sinyal penayangan visual kepada operator konten, dan menjaga kejelasan instruksi interkom secara tepat waktu.',
          },
          {
            lead: 'Pasca-Siaran:',
            text: 'Memimpin rapat evaluasi (debriefing) pasca-siaran untuk meninjau kinerja kru dan mendokumentasikan evaluasi perbaikan.',
          },
        ],
      },
    ],
  },
  {
    id: 'sop-04',
    section: 'II',
    sectionTitle: 'Bagian II: Control Room & Koordinasi Siaran',
    num: '04',
    title: 'Floor Director (FD) & 10 Isyarat Tangan',
    type: 'SOP',
    summary:
      'Perpanjangan tangan PD di lantai panggung untuk mengarahkan talent/pengisi acara dengan 10 isyarat tangan non-verbal baku.',
    iconKey: 'hand',
    tone: 'brand',
    blocks: [
      {
        kind: 'callout',
        tone: 'brand',
        title: 'Peran Utama & Alur Kerja',
        text: 'Perpanjangan tangan resmi Program Director di lantai studio/panggung yang menjaga ketertiban, keamanan, dan kedisiplinan durasi panggung. Persiapan: cek fisik mikrofon, monitor lantai & teleprompter. Saat Siaran: menerima instruksi PD via interkom dan menerjemahkannya secara lisan/non-verbal. Pasca: menyusun laporan insiden panggung dan ikut debriefing.',
      },
      { kind: 'fdSignalsTable' },
    ],
  },
  {
    id: 'sop-05',
    section: 'II',
    sectionTitle: 'Bagian II: Control Room & Koordinasi Siaran',
    num: '05',
    title: 'Technical Director (TD) — Video Mixer',
    type: 'SOP',
    summary:
      'Eksekutif teknis operator video switcher/mixer: preview/program layout, switching transisi, lower third, sinkronisasi audio-video, dan rekaman.',
    iconKey: 'sliders',
    tone: 'brand',
    blocks: [
      {
        kind: 'callout',
        tone: 'brand',
        title: 'Peran Utama & Tanggung Jawab',
        text: 'Eksekutif teknis yang mengoperasikan perangkat keras video switcher/mixer untuk menerjemahkan visi Program Director menjadi perpindahan video yang halus tanpa interupsi, glitch, atau layar kosong (blank), serta memastikan sinkronisasi mutlak antara sinyal audio dan output video siaran.',
      },
      {
        kind: 'list',
        items: [
          { text: 'Melakukan penataan tata letak pratinjau (preview/program layout) pada monitor pemantau MCR.' },
          {
            text: 'Melakukan uji coba konektivitas seluruh sumber video (Kamera 1–9, ProPresenter, Zoom, dll.) sebelum acara dimulai dan kalibrasi white balance jika diperlukan.',
          },
          {
            text: 'Mengeksekusi perpindahan kamera menggunakan transisi yang sesuai (cut, dissolve, dip to black) atas komando PD dengan sudut angle presisi untuk tiap segmen ibadah.',
          },
          {
            text: 'Mengendalikan penayangan grafik lower third, teks pengumuman, dan lirik overlay pada encoder streaming YouTube dan layar LED tepat waktu.',
          },
          { text: 'Memastikan file rekaman tersimpan dengan aman pasca-ibadah, serta mematikan konsol secara berurutan.' },
        ],
      },
    ],
  },
  {
    id: 'sop-06',
    section: 'II',
    sectionTitle: 'Bagian II: Control Room & Koordinasi Siaran',
    num: '06',
    title: 'Technical Support (Infrastruktur & Sistem Cadangan)',
    type: 'SOP',
    summary:
      'Spesialis IT & jaringan live streaming: jalur SDI/HDMI/NDI, encoder, bandwidth, backup ISP/hotspot, UPS, dan kamera cadangan.',
    iconKey: 'broadcast',
    tone: 'brand',
    blocks: [
      {
        kind: 'callout',
        tone: 'brand',
        title: 'Peran Utama & Tanggung Jawab',
        text: 'Spesialis IT, sistem integrasi, dan jaringan siaran langsung yang menjamin kelancaran penyiaran ke platform digital (YouTube/Facebook) tanpa penurunan resolusi atau terputus, serta menyiapkan skenario kontinjensi darurat.',
      },
      {
        kind: 'list',
        items: [
          { text: 'Memeriksa integritas jalur kabel data (SDI / HDMI / NDI) dari bodi kamera lapangan menuju switcher Control Room.' },
          { text: 'Mengonfigurasi parameter encoder siaran langsung dan memantau kestabilan lebar pita (bandwidth) internet utama.' },
          { text: 'Menyiapkan modem internet alternatif (backup ISP/hotspot) yang siap dialihkan secara instan apabila jaringan utama terputus.' },
          {
            text: 'Memastikan seluruh perangkat kontrol room vital terhubung ke unit UPS (Uninterruptible Power Supply) guna mencegah kerusakan data saat listrik padam mendadak.',
          },
          { text: 'Menyiapkan kamera cadangan (backup source) yang langsung aktif jika kamera utama kehilangan sinyal.' },
        ],
      },
    ],
  },
  {
    id: 'sop-07',
    section: 'III',
    sectionTitle: 'Bagian III: Tim Operator Visual & Presentasi',
    num: '07',
    title: 'Director Visual Display',
    type: 'SOP',
    summary:
      'Sutradara visual latar belakang koordinator operator teks, slide, dan animasi; pemantau pancaran LED dan perancang data backup plan.',
    iconKey: 'display',
    tone: 'purple',
    blocks: [
      {
        kind: 'callout',
        tone: 'purple',
        title: 'Peran Utama & Tanggung Jawab',
        text: 'Sutradara visual latar belakang yang mengoordinasikan jajaran operator teks, slide pengumuman, dan animasi untuk menciptakan atmosfer ruangan yang khusyuk, menjamin konsistensi estetika desain, palet warna, dan keterbacaan teks di layar LED utama.',
      },
      {
        kind: 'list',
        items: [
          {
            text: 'Memimpin koordinasi internal kru visual display dan memeriksa kesiapan komputer serta integrasi software (ProPresenter & Resolume).',
          },
          { text: 'Memantau kualitas pancaran cahaya output LED screen secara langsung selama acara berlangsung.' },
          { text: 'Mengawasi ketepatan waktu (timing) kemunculan slide pengumuman dan penyesuaian animasi latar belakang khotbah.' },
          { text: 'Wajib merancang dan menguji fungsionalitas sistem cadangan (data backup plan) untuk situasi darurat.' },
        ],
      },
    ],
  },
  {
    id: 'sop-08',
    section: 'III',
    sectionTitle: 'Bagian III: Tim Operator Visual & Presentasi',
    num: '08',
    title: 'Operator ProPresenter (Teks Lagu & Ayat)',
    type: 'SOP',
    summary:
      'Panduan operasional teks lirik & ayat spontan, termasuk Aturan Emas Transisi Lirik (kata kedua terakhir) dan protokol slide kosong.',
    iconKey: 'type',
    tone: 'purple',
    blocks: [
      {
        kind: 'callout',
        tone: 'amber',
        title: 'Aturan Emas Transisi Lirik',
        text: 'Tampilkan slide berikutnya tepat saat penyanyi menyanyikan kata kedua terakhir di slide saat ini (menampilkan lirik sedikit sebelum bagian tersebut dinyanyikan) agar jemaat dapat menyanyi dengan lancar tanpa kebingungan.',
      },
      {
        kind: 'list',
        items: [
          { text: 'Mengimpor lirik lagu dari platform resmi, mengatur urutan slide, dan mengonfigurasi Themes agar format teks konsisten dan mudah dibaca.' },
          { text: 'Menggunakan fitur pencarian cepat Alkitab (Bibles menu) untuk melacak referensi ayat yang disebutkan pembicara secara spontan/mendadak.' },
          { text: 'Menjaga kepekaan reaktif tinggi terhadap pengulangan bait/reff spontan dari Worship Leader.' },
          {
            lead: 'Protokol Keraguan:',
            text: 'Seketika tampilkan slide kosong (blank) jika terjadi keraguan pada teks lirik demi menghindari kebingungan massal jemaat.',
          },
        ],
      },
    ],
  },
  {
    id: 'sop-09',
    section: 'III',
    sectionTitle: 'Bagian III: Tim Operator Visual & Presentasi',
    num: '09',
    title: 'Operator Konten (Slide Informasi & Khotbah)',
    type: 'SOP',
    summary:
      'Pengumpulan materi pembicara, konversi ke template resmi, proofreading typo, sinkronisasi slide khotbah, dan arsip cloud.',
    iconKey: 'fileSlides',
    tone: 'purple',
    blocks: [
      {
        kind: 'callout',
        tone: 'purple',
        title: 'Peran Utama',
        text: 'Pengelola materi presentasi yang bertanggung jawab atas penayangan materi edukasi khotbah serta slide informasi pengumuman berkala organisasi.',
      },
      {
        kind: 'list',
        items: [
          { text: 'Mengumpulkan dan memverifikasi berkas presentasi dari pembicara atau departemen terkait sebelum acara dimulai.' },
          { text: 'Menggubah materi ke dalam template resmi organisasi untuk menjaga keseragaman desain serta melakukan proofreading (cek typo).' },
          { text: 'Menjaga sinkronisasi pergerakan halaman slide khotbah dengan ucapan lisan pembicara secara presisi.' },
          { text: 'Menampilkan slide pengumuman secara terjadwal (Pra, Jeda, atau Pasca-acara) sesuai instruksi rundown.' },
          { text: 'Melakukan pengarsipan berkas presentasi ke cloud storage setelah acara selesai.' },
        ],
      },
    ],
  },
  {
    id: 'sop-10',
    section: 'III',
    sectionTitle: 'Bagian III: Tim Operator Visual & Presentasi',
    num: '10',
    title: 'Operator Animasi Latar Belakang (Resolume)',
    type: 'SOP',
    summary:
      'Pengelolaan background loops di Resolume, komposisi layer, pengaturan brightness & speed sesuai beat musik, serta arsip proyek.',
    iconKey: 'sparkles',
    tone: 'purple',
    blocks: [
      {
        kind: 'callout',
        tone: 'purple',
        title: 'Peran Utama & Prinsip Liturgi',
        text: 'Desainer visual dinamis yang mengoperasikan software Resolume untuk menyajikan klip animasi latar belakang panggung guna memperdalam atmosfer ruangan — harus mendukung liturgi dan tidak mendominasi/mengalihkan perhatian panggung.',
      },
      {
        kind: 'list',
        items: [
          { text: 'Mengumpulkan, menyortir, dan mengimpor klip video pendek (background loops) yang selaras dengan tema acara.' },
          { text: 'Menyusun komposisi aset video ke dalam layer terpisah untuk mempermudah transisi mulus antar-segmen acara.' },
          {
            text: 'Mengatur parameter intensitas kecerahan (brightness) agar ramah kamera dan menyesuaikan kecepatan klip (speed) mengikuti ritme/ketukan (beat) musik instrumen.',
          },
          { text: 'Melakukan penyimpanan berkas proyek (save project) serta memelihara database video secara teratur.' },
        ],
      },
    ],
  },
  {
    id: 'sop-11',
    section: 'IV',
    sectionTitle: 'Bagian IV: Jajaran Kameramen & Sutradara Multikamera',
    num: '11',
    title: 'Director Multicamera — Ibadah Gereja',
    type: 'SOP',
    summary:
      'Briefing shot list, call sign interkom baku, serta standar layout rundown shot (Opening, Pujian, Firman, Persembahan, Doa Penutup).',
    iconKey: 'video',
    tone: 'indigo',
    blocks: [
      {
        kind: 'callout',
        tone: 'indigo',
        title: 'Tugas Persiapan & Komunikasi Interkom',
        text: 'Mengadakan briefing shot list kepada operator kamera, menyelaraskan transisi bersama Technical Director (TD), dan memastikan aturan interkom dipatuhi dengan call sign standar (contoh: "Cam 1 siap?" -> "Siap").',
      },
      {
        kind: 'list',
        title: 'Standar Layout & Rundown Shot Ibadah',
        items: [
          { lead: 'Opening:', text: 'Jemaat saat awal pujian (worship), menggunakan wide shot.' },
          { lead: 'Pujian & Penyembahan:', text: 'Close-up Worship Leader (WL) dan medium shot untuk area band/musisi.' },
          { lead: 'Firman Tuhan:', text: 'Medium atau close-up pembicara, diselingi cutaway reaksi jemaat secara natural.' },
          { lead: 'Persembahan:', text: 'Jemaat berdoa, wide shot mengarah ke altar.' },
          { lead: 'Doa Penutup:', text: 'Fokus pada pembicara dan jemaat yang sedang berdoa dengan komposisi khidmat.' },
        ],
      },
    ],
  },
  {
    id: 'sop-12',
    section: 'IV',
    sectionTitle: 'Bagian IV: Jajaran Kameramen & Sutradara Multikamera',
    num: '12',
    title: 'Jajaran Kameramen & Matrix Kamera (CAM 1 – CAM 9)',
    type: 'SOP',
    summary:
      'Spesifikasi lensa, rig, target utama, dan karakter pergerakan untuk CAM 1 (Gimbal) hingga CAM 9 (Master Wide).',
    iconKey: 'cameraRotate',
    tone: 'indigo',
    blocks: [
      {
        kind: 'callout',
        tone: 'indigo',
        title: 'Peran Utama & Kode Etik Lapangan',
        text: 'Eksekutor penangkap visual di lapangan yang menyuplai sudut gambar berkualitas tinggi, tajam, dan stabil kepada video mixer. Wajib mematuhi kode etik: tidak menghalangi pandangan fisik jemaat dan menjaga privasi momen sakral.',
      },
      { kind: 'camMatrixTable' },
    ],
  },
  {
    id: 'sop-13',
    section: 'V',
    sectionTitle: 'Bagian V: Teknis Operasional Perangkat Lapangan & Elevasi',
    num: '13',
    title: 'SOP Kameramen Handheld (Sony FX3 & Holyland Wireless)',
    type: 'SOP',
    summary:
      'Standar setting 4K 25fps / 1080p 50fps, shutter 1/50s, S-Log3/Rec.709, Active SteadyShot, AF-C, dan teknik redam guncangan.',
    iconKey: 'camera',
    tone: 'amber',
    blocks: [
      {
        kind: 'callout',
        tone: 'neutral',
        title: '1. Pengaturan Kamera (Sony FX3)',
        items: [
          { lead: 'Resolusi & Frame Rate:', text: '4K 25fps (untuk Live) atau 1080p 50fps (untuk Slowmo).' },
          { lead: 'Shutter Speed:', text: 'Minimal 2x frame rate (1/50s untuk 25fps).' },
          { lead: 'Profil Warna:', text: 'S-Log3 (untuk pasca-produksi) atau Rec.709 (untuk Live broadcast).' },
          { lead: 'Stabilisasi:', text: 'Wajib mengaktifkan fitur Active SteadyShot.' },
        ],
      },
      {
        kind: 'callout',
        tone: 'neutral',
        title: '2. Teknik Pengoperasian Lapangan',
        items: [
          { text: 'Pegang bodi kamera dengan dua tangan secara mantap dan redam guncangan langkah lewat lutut/gerakan seluruh tubuh.' },
          { text: 'Wajib memasang strap pengaman setiap kali mengoperasikan kamera handheld.' },
          { text: 'Gunakan fokus otomatis AF-C (Flexible Spot / Tracking AF) agar subjek tetap tajam saat bergerak.' },
        ],
      },
    ],
  },
  {
    id: 'sop-14',
    section: 'V',
    sectionTitle: 'Bagian V: Teknis Operasional Perangkat Lapangan & Elevasi',
    num: '14',
    title: 'SOP Pengoperasian Gimbal (DJI RS3)',
    type: 'SOP',
    summary:
      'Prosedur perakitan dalam kondisi mati, kalibrasi 3 sumbu (Tilt, Roll, Pan), koneksi Bluetooth FX3, dan pemasangan Holyland TX.',
    iconKey: 'compass',
    tone: 'amber',
    blocks: [
      {
        kind: 'list',
        items: [
          {
            lead: 'Penyeimbangan (Balancing):',
            text: 'Rakit seluruh perangkat dalam kondisi gimbal mati/tidur. Lakukan kalibrasi mekanis pada sumbu Tilt, Roll, dan Pan hingga seimbang sempurna agar motor tidak terbebani berlebih.',
          },
          {
            lead: 'Koneksi Nirkabel & Transmisi:',
            text: 'Hubungkan kontrol Bluetooth Sony FX3 ke DJI RS3. Pasang unit Holyland TX di cold shoe kamera dan sambungkan kabel HDMI secara rapi agar tidak menghambat gerak sumbu gimbal.',
          },
          {
            lead: 'Auto-Tune Motor:',
            text: 'Jalankan auto-tune setelah balancing selesai dan pastikan tidak ada getaran (micro-vibration) sebelum bertugas.',
          },
        ],
      },
    ],
  },
  {
    id: 'sop-15',
    section: 'V',
    sectionTitle: 'Bagian V: Teknis Operasional Perangkat Lapangan & Elevasi',
    num: '15',
    title: 'SOP Dolly Track',
    type: 'SOP',
    summary:
      'Inspeksi rel baja & roda, penguncian sambungan, pergerakan konstan Dolly In/Out, dan sterilisasi jalur dari kabel liar.',
    iconKey: 'track',
    tone: 'amber',
    blocks: [
      {
        kind: 'list',
        items: [
          {
            lead: 'Inspeksi Rel & Roda:',
            text: 'Periksa lintasan besi rel dan roda dolly dari kotoran, debu, atau kerikil kecil yang dapat menyebabkan guncangan pada gambar. Pastikan seluruh sambungan rel terkunci rapat dan rata.',
          },
          {
            lead: 'Pergerakan Kerja:',
            text: 'Eksekusi gerakan Dolly In (mendekat konstan) dan Dolly Out (menjauh halus) dengan kecepatan stabil mengikuti tempo ibadah.',
          },
          {
            lead: 'Keselamatan Jalur:',
            text: 'Area sekitar lintasan rel wajib bebas dari kabel liar dan hambatan fisik agar operator dapat bergerak aman tanpa tersandung.',
          },
        ],
      },
    ],
  },
  {
    id: 'sop-16',
    section: 'V',
    sectionTitle: 'Bagian V: Teknis Operasional Perangkat Lapangan & Elevasi',
    num: '16',
    title: 'SOP Jimmy Jib Eagle 3 Axis',
    type: 'SOP',
    summary:
      'Penyeimbangan mekanis kepala remote, kalibrasi sensitivitas joystick, pergerakan halus lengan jib, dan tanda pembatas radius putar.',
    iconKey: 'move',
    tone: 'amber',
    blocks: [
      {
        kind: 'list',
        items: [
          {
            lead: 'Operasional & Kalibrasi:',
            text: 'Lakukan penyeimbangan mekanis kamera pada kepala remote (remote head) dan pastikan counterweight sesuai beban. Atur sensitivitas kecepatan joystick sebelum ibadah dimulai.',
          },
          {
            lead: 'Teknik Pergerakan:',
            text: 'Kendalikan pergerakan lengan jib secara halus dan presisi (terutama wide sweeping shot diagonal pada momen klimaks pujian atau khotbah).',
          },
          {
            lead: 'Standar Keselamatan Mutlak:',
            text: 'Jaga area radius putar lengan jib agar steril dari hambatan fisik (lampu gantung, kabel, jemaat) dan pasang tanda pembatas area di sekitar pondasi jib.',
          },
        ],
      },
    ],
  },
  {
    id: 'sop-17',
    section: 'V',
    sectionTitle: 'Bagian V: Teknis Operasional Perangkat Lapangan & Elevasi',
    num: '17',
    title: 'SOP Tripod Sachtler Flowtech® 100 GS',
    type: 'SOP',
    summary:
      'Prosedur quick release brakes, ground spreader, bubble level, counterbalance, pan/tilt drag, dan larangan menyeret kaki tripod.',
    iconKey: 'tripod',
    tone: 'amber',
    blocks: [
      {
        kind: 'list',
        items: [
          {
            lead: 'Leveling & Kalibrasi:',
            text: 'Aktifkan quick release brakes untuk membuka kaki tripod dan pasang ground spreader dengan benar. Pantau gelembung udara pada bubble level hingga berada tepat di titik tengah. Atur counterbalance dan pan/tilt drag sesuai bobot kamera.',
          },
          {
            lead: 'Aturan Mobilisasi Wajib:',
            text: 'Saat memindahkan posisi tripod ke titik lain, kamera wajib dilepaskan terlebih dahulu demi keselamatan sensor dan bodi kamera.',
          },
          { lead: 'Larangan:', text: 'Dilarang keras menyeret kaki tripod di atas lantai.' },
        ],
      },
    ],
  },
  {
    id: 'sop-18',
    section: 'V',
    sectionTitle: 'Bagian V: Teknis Operasional Perangkat Lapangan & Elevasi',
    num: '18',
    title: 'SOP Headset Interkom (Holyland Solidcom C1)',
    type: 'SOP',
    summary:
      'Standar durasi charging 2.5 jam (Remote 10 jam, Master 5 jam), gestur boom mic 80–110° untuk Mute/Unmute, dan jarak transmisi 350 m.',
    iconKey: 'headset',
    tone: 'amber',
    blocks: [
      {
        kind: 'list',
        items: [
          {
            lead: 'Daya & Pengoperasian:',
            text: 'Baterai diisi selama 2.5 jam hingga penuh (daya tahan unit Remote ±10 jam, unit Master ±5 jam). Tekan tombol daya hingga indikator menyala hijau stabil.',
          },
          {
            lead: 'Fungsi Mute / Unmute:',
            text: 'Gerakkan tangkai mikrofon (boom mic) ke atas pada sudut 80–110 derajat untuk Mute, dan turunkan kembali ke dekat mulut untuk Unmute.',
          },
          {
            lead: 'Jangkauan Transmisi:',
            text: 'Transmisi nirkabel bebas hambatan mencapai 350 meter. Pastikan tidak ada penghalang logam/dinding tebal berlebihan antara Master dan Remote.',
          },
        ],
      },
    ],
  },
  {
    id: 'sop-20',
    section: 'VI',
    sectionTitle: 'Bagian VI: Tim Teknisi & Penanganan Kerusakan Barang',
    num: '19',
    title: 'Deskripsi Kerja Tim Teknisi',
    type: 'JOBDESK',
    summary:
      'Perakitan setup, kelistrikan, distribusi sinyal, kalibrasi crane/gimbal, siaga perbaikan kilat saat ibadah, hingga pembongkaran rapi.',
    iconKey: 'plug',
    tone: 'emerald',
    blocks: [
      {
        kind: 'callout',
        tone: 'emerald',
        title: 'Peran Utama',
        text: 'Teknisi infrastruktur fisik yang bertanggung jawab atas perakitan (setup), pembongkaran, pengujian (check), kelistrikan daya, distribusi sinyal video, dan penanganan masalah (troubleshooting) perangkat keras.',
      },
      {
        kind: 'list',
        items: [
          {
            lead: 'Pra-Ibadah:',
            text: 'Menyalakan sakelar kelistrikan utama, sistem distribusi video, layar LED, dan TV. Melakukan kalibrasi mekanis bodi kamera (crane/gimbal) serta pengetesan interkom bersama Gear Manager.',
          },
          {
            lead: 'Saat Ibadah:',
            text: 'Siaga penuh untuk melakukan perbaikan kilat di lapangan (kabel putus, baterai habis, software crash) dan memastikan jalur kabel bersih dari interferensi.',
          },
          {
            lead: 'Pasca-Ibadah:',
            text: 'Membongkar dan menggulung kabel sesuai manajemen rapi, melaporkan setiap kendala teknis ke Gear Manager, serta menyusun laporan evaluasi teknis.',
          },
        ],
      },
    ],
  },
  {
    id: 'sop-22',
    section: 'VI',
    sectionTitle: 'Bagian VI: Tim Teknisi & Penanganan Kerusakan Barang',
    num: '20',
    title: 'Penanganan Kerusakan Barang Broadcast & Akuntabilitas',
    type: 'SOP',
    summary:
      'Prosedur tanggap darurat isolasi alat, dokumentasi foto/video kronologi, serta ketentuan akuntabilitas finansial perbaikan.',
    iconKey: 'alert',
    tone: 'red',
    blocks: [
      {
        kind: 'callout',
        tone: 'amber',
        title: '1. Tanggap Darurat',
        text: 'Segera hentikan penggunaan jika mendeteksi anomali fungsional atau kerusakan fisik. Dilarang keras memperbaiki sendiri tanpa kompetensi/izin. Amankan dan isolasi aset serta beri tanda rusak yang jelas.',
      },
      {
        kind: 'callout',
        tone: 'neutral',
        title: '2. Pelaporan & Dokumentasi',
        text: 'Ambil foto/video detail kondisi kerusakan, segera hubungi koordinator/Gear Manager, dan isi formulir laporan kronologi kejadian secara jujur dan lengkap.',
      },
      {
        kind: 'callout',
        tone: 'red',
        title: '3. Akuntabilitas Finansial',
        items: [
          {
            text: 'Jika kerusakan terbukti akibat pelanggaran SOP / kelalaian (misalnya: modifikasi tanpa izin, tidak memakai strap pengaman), volunteer wajib menanggung biaya perbaikan atau penggantian baru.',
          },
          {
            text: 'Jika kerusakan murni akibat keausan alami / kendala teknis wajar, volunteer dibebaskan sepenuhnya dari beban biaya.',
          },
        ],
      },
    ],
  },
];

export const GMS2_JABATAN_DATA: Gms2JabatanItem[] = [
  {
    num: '01',
    title: 'Ketua Departemen Multimedia (Kadept)',
    pages: 'Hal. 6–9',
    nature: 'Fulltimer • Pimpinan Departemen',
    desc: 'Memimpin keseluruhan strategi, operasional kantor (Office) dan pelayanan (Ministry) Departemen Multimedia Sinode GMS II.',
    deskripsiUmum: [
      'Bertanggung jawab langsung kepada Pimpinan Sinode / Manajemen Gereja atas pencapaian visi "Capturing and Spreading God\'s Presence".',
      'Mengawasi sinergi antara Staff Fulltimer (Sekretaris, Video Production, Technical Support) dan struktur Multimedia Ministry.',
    ],
    deskripsiDetail: [
      'Menetapkan rencana kerja tahunan, standar kualitas audio-visual, serta anggaran operasional & investasi departemen.',
      'Menyetujui pengajuan pengadaan peralatan baru sebelum diajukan ke Tim TPS.',
      'Melakukan pembinaan kepemimpinan bagi Ministry Leader, Team Leader, serta koordinasi lintas Regional GMS II.',
    ],
    tujuanProduk: [
      'Terpenuhinya standar operasional & mutu siaran/visual di seluruh ibadah Sinode dan Regional.',
      'Tersedianya rencana anggaran, laporan kinerja departemen, dan regenerasi pemimpin multimedia.',
    ],
    kualifikasi:
      'Minimal S1 (diutamakan Komunikasi/DKV/Broadcasting/Manajemen), pengalaman kepemimpinan & produksi multimedia minimal 3 tahun, dewasa rohani, lulus MSJ & aktif di Connect Group.',
  },
  {
    num: '02',
    title: 'Staff Technical Support (TS)',
    pages: 'Hal. 10–13',
    nature: 'Fulltimer • Hardware, Software, Maintenance & Purchasing',
    desc: 'Mengelola infrastruktur perangkat keras & lunak, perawatan berkala, inventaris aset, dan proses pengadaan teknis.',
    deskripsiUmum: [
      'Menjamin seluruh sistem video, kamera, jaringan streaming, display, dan peralatan MCR dalam kondisi prima.',
      'Menjadi penghubung teknis dengan vendor, kontraktor instalasi, dan Tim TPS.',
    ],
    deskripsiDetail: [
      'Melakukan preventive maintenance rutin dan pencatatan pada Equipment History Card.',
      'Menyusun spesifikasi teknis, survei 3 vendor pembanding, serta verifikasi QC fisik saat serah terima barang.',
      'Mendukung instalasi dan troubleshooting event khusus maupun gereja satelit/perintisan.',
    ],
    tujuanProduk: [
      'Database inventaris aset mutakhir & Equipment History Card yang tertib.',
      'Kesiapan peralatan 100% tanpa kendala teknis kritikal saat ibadah dan event.',
    ],
    kualifikasi:
      'Minimal D3/S1 Teknik Elektro/Informatika/Broadcasting, menguasai sistem video broadcast (SDI/NDI/Switcher/ProPresenter/Networking), teliti & responsif.',
  },
  {
    num: '03',
    title: 'Staff Sekretaris Multimedia',
    pages: 'Hal. 14–16',
    nature: 'Fulltimer • Administrasi, Surat & Koordinasi',
    desc: 'Mengelola administrasi departemen, persuratan, iRequest, arsip dokumen, dan koordinasi jadwal antar departemen.',
    deskripsiUmum: [
      'Mendukung Ketua Departemen dalam pengelolaan administrasi, tata kelola dokumen SOP/WI/PR, dan pelaporan rutin.',
      'Mengelola alur masuk pengajuan pengumuman mingguan dan permintaan layanan multimedia.',
    ],
    deskripsiDetail: [
      'Memverifikasi Surat Ijin Pengumuman (batas Rabu 12.00 WIB) dan serah terima materi (Rabu 14.00 WIB).',
      'Mengelola pengajuan iRequest, notulensi rapat departemen, serta rekap absensi & database relawan.',
      'Menjaga kerahasiaan dan kerapian arsip surat masuk/keluar.',
    ],
    tujuanProduk: [
      'Tertibnya administrasi pengumuman, iRequest, jadwal, dan arsip dokumen departemen.',
      'Laporan administrasi bulanan yang akurat dan tepat waktu.',
    ],
    kualifikasi:
      'Minimal D3/S1 Administrasi/Sekretaris/Manajemen, mahir aplikasi perkantoran, rapi, komunikatif, dan terorganisir.',
  },
  {
    num: '04',
    title: 'Staff Video Production (Video Editor & Animator)',
    pages: 'Hal. 17–20',
    nature: 'Fulltimer • Produksi Konten, Editing & Animasi',
    desc: 'Memproduksi konten video pengumuman, bumper ibadah, motion graphic/animasi, video kesaksian, dan arsip Final Bank.',
    deskripsiUmum: [
      'Menghasilkan karya audio-visual berkualitas tinggi yang selaras dengan visi dan standar estetika GMS II.',
      'Mengelola penyimpanan data mentah serta arsip Final Bank untuk Data Centre.',
    ],
    deskripsiDetail: [
      'Mengerjakan shooting, video editing, color grading, audio mixing, serta motion graphic/2D-3D animation.',
      'Menyerahkan Final Bank setiap tanggal 1 tiap bulan dengan format standar (.mp4 H.264 1080p).',
      'Berkolaborasi dengan relawan Video Editor & Clip Content Operator.',
    ],
    tujuanProduk: [
      'Tayangan video pengumuman, bumper, dan konten digital yang selesai tepat waktu sebelum ibadah.',
      'Arsip Final Bank yang lengkap, terstruktur, dan siap distribusi.',
    ],
    kualifikasi:
      'Minimal D3/S1 DKV/Film/Multimedia, mahir Adobe Premiere Pro, After Effects, DaVinci Resolve/setara, kreatif, dan mampu bekerja dalam tenggat waktu ketat.',
  },
  {
    num: '05',
    title: 'Multimedia Ministry (Relawan / Volunteer)',
    pages: 'Hal. 21–23',
    nature: 'Volunteer • Ministry Leader, Team Leader & Crew',
    desc: 'Pelayan Tuhan relawan yang menjalankan operasional ibadah mingguan, pengembangan skill, event khusus, dan misi apostolik.',
    deskripsiUmum: [
      'Melayani di bawah koordinasi Ministry Leader (Crew Chief & Team Leader) dalam berbagai posisi teknis ibadah.',
      'Bertumbuh melalui jenjang Trainee hingga Bintang 4 secara rohani dan teknis.',
    ],
    deskripsiDetail: [
      'Menjalankan tugas sesuai peran (Kamera, Director, Text Op, Streaming, QC, Photographer, dll) mengikuti SOP V5.',
      'Aktif dalam pelatihan (Servolution, Workshop Lv.1 & Lv.2) serta komunitas Multimedia Ministry.',
    ],
    tujuanProduk: [
      'Terselenggaranya pelayanan audio-visual ibadah yang excellent, tertib, dan membawa hadirat Tuhan.',
    ],
    kualifikasi:
      'Lahir baru, memiliki NIJ, aktif di Connect Group (CG), menyelesaikan MSJ sesuai jenjang, serta lulus tahapan Servolution.',
  },
];

export const INITIAL_GMS2_WIPR_DATA: Gms2WiPrItem[] = [
  {
    id: 'wi-01',
    code: 'WI-GMS-SIN-M2M-01',
    title: 'Pengajuan & Tayang Pengumuman Mingguan',
    type: 'WI',
    summary: 'Alur Surat Ijin Pengumuman (maks. Rabu 12.00 WIB) & serah materi final (maks. Rabu 14.00 WIB).',
    iconKey: 'megaphone',
    tone: 'brand',
    blocks: [
      {
        kind: 'list',
        items: [
          { text: 'Departemen pemohon wajib menyerahkan Surat Ijin Pengumuman yang sudah disetujui paling lambat Rabu pukul 12.00 WIB.' },
          { text: 'Materi visual/video final diserahkan paling lambat Rabu pukul 14.00 WIB dalam resolusi Full HD 16:9.' },
          { text: 'Materi yang melewati tenggat waktu akan dijadwalkan untuk minggu berikutnya kecuali instruksi khusus Gembala.' },
        ],
      },
    ],
  },
  {
    id: 'wi-02',
    code: 'WI-GMS-SIN-M2M-02',
    title: 'Serah Terima Final Bank ke Data Centre',
    type: 'WI',
    summary: 'Standar format arsip (.mp4 H.264 1080p) dan jadwal penyerahan rutin setiap tanggal 1 tiap bulan.',
    iconKey: 'database',
    tone: 'indigo',
    blocks: [
      {
        kind: 'list',
        items: [
          { text: 'Seluruh video final ibadah dan event dikompilasi ke folder Final Bank bulanan.' },
          { text: 'Format baku: .mp4 (H.264, 1920x1080p, audio stereo normalized).' },
          { text: 'Penyerahan ke Data Centre dilakukan rutin setiap tanggal 1 tiap bulan disertai berita acara serah terima.' },
        ],
      },
    ],
  },
  {
    id: 'wi-03',
    code: 'WI-GMS-SIN-M2M-03',
    title: 'Pengisian Equipment History Card & Maintenance',
    type: 'WI',
    summary: 'Pencatatan riwayat servis, penggantian sparepart, dan kalibrasi setiap unit peralatan.',
    iconKey: 'clipboardCheck',
    tone: 'amber',
    blocks: [
      {
        kind: 'list',
        items: [
          { text: 'Setiap aset bernilai utama wajib memiliki Equipment History Card (kode aset, tanggal beli, garansi, riwayat perawatan/kerusakan).' },
          { text: 'Staff TS memperbarui kartu setiap kali dilakukan maintenance rutin atau perbaikan vendor.' },
        ],
      },
    ],
  },
  {
    id: 'wi-04',
    code: 'WI-GMS-SIN-M2M-04',
    title: 'Peminjaman & Pengembalian Peralatan Multimedia',
    type: 'WI',
    summary: 'Tata cara peminjaman alat lintas departemen, cek fisik keluar-masuk, dan tanggung jawab peminjam.',
    iconKey: 'package',
    tone: 'teal',
    blocks: [
      {
        kind: 'list',
        items: [
          { text: 'Peminjaman wajib diajukan minimal H-3 melalui form resmi dan disetujui Staff TS / Kadept.' },
          { text: 'Dilakukan pengecekan kondisi fisik dan kelengkapan aksesori bersama saat serah terima keluar dan kembali.' },
        ],
      },
    ],
  },
  {
    id: 'pr-01',
    code: 'PR-GMS-SIN-M2M-01',
    title: 'Prosedur Permintaan Layanan via iRequest',
    type: 'PR',
    summary: 'Standar pengajuan pembuatan video, liputan event, dan dukungan teknis melalui sistem iRequest.',
    iconKey: 'laptop',
    tone: 'blue',
    blocks: [
      {
        kind: 'list',
        items: [
          { text: 'Seluruh permintaan produksi video atau dukungan event khusus diajukan melalui sistem iRequest minimal H-14.' },
          { text: 'Staff Sekretaris memverifikasi kelengkapan brief lalu meneruskan ke Kadept untuk penjadwalan tim produksi/event.' },
        ],
      },
    ],
  },
  {
    id: 'pr-02',
    code: 'PR-GMS-SIN-M2M-02',
    title: 'Prosedur Pengadaan Peralatan Bersama Tim TPS',
    type: 'PR',
    summary: 'Alur 14 langkah mulai dari identifikasi kategori gereja, 3 vendor pembanding, hingga BAST & pelabelan aset.',
    iconKey: 'cart',
    tone: 'emerald',
    blocks: [
      {
        kind: 'paragraph',
        text: 'Mengacu pada 14 Tahapan Baku pengadaan bersama Tim Pengembangan Satelit (TPS) dengan 3 Pilar Akuntabilitas (Kesiapan SDM & SOP, Sasaran Fisik/Keuangan/Manfaat, dan Kepatuhan Peraturan). Lihat rincian lengkap pada sub-tab 4. SOP & Proses Pengadaan TPS.',
      },
    ],
  },
  {
    id: 'pr-03',
    code: 'PR-GMS-SIN-M2M-03',
    title: 'Prosedur Rekrutmen & Kenaikan Jenjang Ministry',
    type: 'PR',
    summary: 'Alur penerimaan relawan baru melalui Servolution serta evaluasi tahunan kenaikan grade (Trainee – Bintang 4).',
    iconKey: 'graduation',
    tone: 'purple',
    blocks: [
      {
        kind: 'list',
        items: [
          { text: 'Calon pelayan mendaftar melalui Servolution, mengikuti audisi, dan wajib lulus Workshop Dasar Lv.1.' },
          {
            text: 'Evaluasi kenaikan jenjang dilakukan berdasarkan masa pelayanan (min. 1 tahun / by project), kehadiran min. 70%/tahun, kelulusan MSJ, dan rekomendasi pemimpin.',
          },
        ],
      },
    ],
  },
];

export const GMS2_PENGANTAR_ROWS: Gms2PengantarRow[] = [
  {
    id: 'peng-1',
    section: 'Pengantar & Mandat Departemen',
    pages: 'Hal. 2–3',
    tone: 'indigo',
    desc: 'Mendukung seluruh operasional GMS II dalam peliputan, dokumentasi, pengolahan, dan publikasi audio-visual (teks lirik, display pembicara, video pengumuman, animasi, live streaming & distribusi video) untuk memfasilitasi ibadah & penginjilan melalui 2 pijakan utama: Sistim Pengelolaan Kantor (Office) dan Sistim Pengelolaan Pelayanan (Ministry).',
  },
  {
    id: 'peng-2',
    section: 'Objektif & Pelayanan Saputangan Paulus',
    pages: 'Hal. 4',
    tone: 'brand',
    desc: 'Visi departemental "Capturing and Spreading God’s Presence" (Kisah Para Rasul 19:11–12). Disebut Pelayanan Saputangan Paulus: jemaat dijamah bukan karena kecanggihan peralatan broadcasting, melainkan karena urapan & hubungan intim pelayan Tuhan dengan hadirat Tuhan yang dibagikan melalui media.',
  },
  {
    id: 'peng-3',
    section: 'Visi & Misi Sinode GMS II',
    pages: 'Hal. 2–4 & 49–50',
    tone: 'emerald',
    desc: 'Menjadi "Gereja Sel yang Apostolik dan Profetik" dengan 3 fokus utama: (1) Gereja Penginjilan yang Membawa Terobosan, (2) Gereja Pengerahan yang Apostolik, dan (3) Gereja yang Menggembalakan dengan Profetik.',
  },
  {
    id: 'peng-4',
    section: 'Bagan Struktur Resmi Dept. Multimedia',
    pages: 'Hal. 5',
    tone: 'neutral',
    desc: 'Bagan resmi Departemen Multimedia GMS II (Ketua Departemen, Sekretaris, Tech. Support, Video Production, dan Divisi Ministry — Ministry Leader Strategis & Crew Chief dengan 13 posisi Crew) beserta pengembangan Struktur V2 Synodal.',
    linkPage: 'orgchart',
  },
];

export const GMS2_SERVOLUTION_ROWS: Gms2ServolutionRow[] = [
  {
    id: 'serv-1',
    component: 'Syarat Umum Pendaftaran',
    pages: 'Hal. 30',
    tone: 'brand',
    desc: '1) Belum melayani di bidang pelayanan apapun; 2) Digembalakan aktif di Connect Group (CG); 3) Telah menyelesaikan MSJ 2; 4) Mengikuti seluruh tahapan Servolution (pelatihan teknis awal).',
  },
  {
    id: 'serv-2',
    component: 'Alur Registrasi, Audisi & Kelulusan',
    pages: 'Hal. 30',
    tone: 'indigo',
    desc: 'Mengisi Form Registrasi Online → Mengikuti Audisi / Interview sesuai jadwal yang ditetapkan → Pengumuman kelulusan melalui Booth Pengumuman / email resmi Departemen Multimedia.',
  },
  {
    id: 'serv-3',
    component: 'Materi 1: Visi & Misi Multimedia GMS',
    pages: 'Hal. 31',
    tone: 'neutral',
    desc: 'Sejarah pelayanan Multimedia GMS (dimulai tahun 2000), visi "Capturing and Spreading God’s Presence", roh Pelayanan Saputangan Paulus, serta sikap hati dan etika pelayan.',
  },
  {
    id: 'serv-4',
    component: 'Materi 2: Technical Support Lv.1 & GMS Live Streaming',
    pages: 'Hal. 32',
    tone: 'neutral',
    desc: 'Pengenalan infrastruktur dasar ruang ibadah, jenis kabel & konektor (SDI/HDMI/XLR), tata cara ulur/gulung kabel rapi, serta dasar monitoring GMS Live Streaming.',
  },
  {
    id: 'serv-5',
    component: 'Materi 3: Teks Operator (Easy Worship / ProPresenter)',
    pages: 'Hal. 33–34',
    tone: 'neutral',
    desc: 'Pengenalan antarmuka perangkat lunak tampilan teks ibadah (Easy Worship / ProPresenter), penyiapan lirik lagu, pencarian cepat ayat Alkitab, dan ketepatan transisi slide.',
  },
  {
    id: 'serv-6',
    component: 'Materi 4: Video Live Production',
    pages: 'Hal. 35–36',
    tone: 'amber',
    desc: 'Dasar operasional kamera broadcast & tripod, prinsip framing, komposisi shot ibadah (wide, medium, close-up), serta komunikasi dasar dengan Video Director.',
  },
  {
    id: 'serv-7',
    component: 'Materi 5: Photography Ibadah',
    pages: 'Hal. 37',
    tone: 'emerald',
    desc: 'Pengenalan kamera foto, komposisi dan exposure dasar dokumentasi ibadah, etika memotret tanpa mengganggu jemaat (tanpa flash), serta alur penyerahan file ke Data Collector.',
  },
];

export const GMS2_PRINSIP_PENGADAAN_ROWS: Gms2PrinsipRow[] = [
  {
    id: 'prin-1',
    code: 'P-01',
    group: '6 Prinsip Pengadaan (Hal. 58)',
    title: 'Efisien',
    tone: 'brand',
    desc: 'Pengadaan diusahakan dengan menggunakan dana dan daya yang terbatas untuk mencapai sasaran spesifikasi teknis dan mutu yang ditetapkan dalam waktu singkat.',
  },
  {
    id: 'prin-2',
    code: 'P-02',
    group: '6 Prinsip Pengadaan (Hal. 58)',
    title: 'Efektif',
    tone: 'brand',
    desc: 'Pengadaan wajib sesuai dengan kebutuhan operasional riil berdasarkan Indikator Kategori Gereja (A–E) dan memberikan manfaat maksimal bagi pelayanan ibadah.',
  },
  {
    id: 'prin-3',
    code: 'P-03',
    group: '6 Prinsip Pengadaan (Hal. 58)',
    title: 'Terbuka & Maksimal',
    tone: 'indigo',
    desc: 'Terbuka bagi penyedia/vendor barang yang memenuhi kualifikasi spesifikasi teknis dengan membandingkan minimal 3 vendor guna memperoleh nilai terbaik.',
  },
  {
    id: 'prin-4',
    code: 'P-04',
    group: '6 Prinsip Pengadaan (Hal. 58)',
    title: 'Transparan',
    tone: 'indigo',
    desc: 'Seluruh ketentuan, spesifikasi, penawaran harga, hasil negosiasi Tim TPS, dan bukti transaksi bersifat jelas, terdokumentasi, dan dapat diaudit.',
  },
  {
    id: 'prin-5',
    code: 'P-05',
    group: '6 Prinsip Pengadaan (Hal. 58)',
    title: 'Adil / Tidak Diskriminatif',
    tone: 'blue',
    desc: 'Memberikan perlakuan yang objektif dan setara kepada seluruh vendor berdasarkan kualitas, garansi resmi, harga, dan layanan purna jual.',
  },
  {
    id: 'prin-6',
    code: 'P-06',
    group: '6 Prinsip Pengadaan (Hal. 58)',
    title: 'Akuntabel',
    tone: 'emerald',
    desc: 'Pengadaan harus dapat dipertanggungjawabkan baik secara fisik, keuangan, manfaat pelayanan, maupun kepatuhan terhadap peraturan Sinode GMS II.',
  },
  {
    id: 'akunt-1',
    code: 'A-01',
    group: '3 Aspek Akuntabilitas (Hal. 58–59)',
    title: 'Aspek 1: Kesiapan SDM, Maintenance & SOP',
    tone: 'emerald',
    desc: 'Pengadaan peralatan wajib diimbangi dengan kemampuan SDM lokal dalam mengoperasikan alat, kesiapan jadwal perawatan (maintenance), dan kelengkapan SOP operasional.',
  },
  {
    id: 'akunt-2',
    code: 'A-02',
    group: '3 Aspek Akuntabilitas (Hal. 58–59)',
    title: 'Aspek 2: Sasaran Fisik, Keuangan & Manfaat',
    tone: 'purple',
    desc: 'Mencapai sasaran fisik barang sesuai spesifikasi, ketepatan realisasi anggaran (Rencana Biaya), dan kebermanfaatan nyata bagi kelancaran ibadah & penginjilan.',
  },
  {
    id: 'akunt-3',
    code: 'A-03',
    group: '3 Aspek Akuntabilitas (Hal. 58–59)',
    title: 'Aspek 3: Kepatuhan Sumber Input, Proses & Hasil Akhir',
    tone: 'amber',
    desc: 'Seluruh sumber input usulan, tahapan verifikasi & negosiasi Tim TPS, penerbitan PO, hingga BAST dan pelabelan aset dilaksanakan sesuai peraturan baku GMS II.',
  },
];

export const INITIAL_GMS2_FORMS_DATA: Gms2WiPrItem[] = [
  {
    id: 'fm-01',
    code: 'FM-GMS-SIN-M2M-01',
    title: 'Formulir Surat Ijin Pengumuman Mingguan',
    type: 'FORM',
    summary: 'Form resmi pengajuan penayangan pengumuman ibadah (batas serah Rabu 12.00 WIB & materi Rabu 14.00 WIB).',
    iconKey: 'megaphone',
    tone: 'brand',
    blocks: [
      {
        kind: 'callout',
        tone: 'brand',
        title: 'Keterkaitan Dokumen — WI-GMS-SIN-M2M-01 (Hal. 72–73)',
        text: 'Digunakan oleh seluruh departemen/komisi pemohon untuk mengajukan penayangan video atau slide pengumuman pada ibadah umum maupun kategorial.',
      },
      {
        kind: 'list',
        title: 'Isian Wajib Formulir',
        items: [
          { lead: 'Identitas Pemohon:', text: 'Nama Departemen/Komisi, PIC penanggung jawab, nomor kontak, dan tanggal pengajuan.' },
          { lead: 'Detail Penayangan:', text: 'Judul pengumuman, durasi materi, jadwal tanggal/sesi ibadah, dan target gereja/regional.' },
          { lead: 'Verifikasi & Persetujuan:', text: 'Tanda tangan persetujuan pimpinan pemohon, verifikasi Sekretaris Multimedia (maks. Rabu 12.00 WIB), dan konfirmasi penerimaan file final Full HD 16:9 (maks. Rabu 14.00 WIB).' },
        ],
      },
    ],
  },
  {
    id: 'fm-02',
    code: 'FM-GMS-SIN-M2M-02',
    title: 'Berita Acara Serah Terima (BAST) Final Bank ke Data Centre',
    type: 'FORM',
    summary: 'Formulir berita acara penyerahan arsip video ibadah bulanan (.mp4 H.264 1080p) tiap tanggal 1.',
    iconKey: 'database',
    tone: 'indigo',
    blocks: [
      {
        kind: 'callout',
        tone: 'indigo',
        title: 'Keterkaitan Dokumen — WI-GMS-SIN-M2M-02 (Hal. 73–74)',
        text: 'Menjadi bukti resmi perpindahan arsip master bulanan dari Divisi Video Production ke Data Centre Sinode GMS II setiap tanggal 1 tiap bulan.',
      },
      {
        kind: 'list',
        title: 'Isian Wajib Formulir',
        items: [
          { lead: 'Periode Arsip:', text: 'Bulan/tahun ibadah, daftar judul khotbah/event, pembicara, dan tanggal perekaman.' },
          { lead: 'Spesifikasi Teknis:', text: 'Konfirmasi format .mp4 H.264 1920x1080p, audio stereo normalized, dan checksum/kelengkapan folder.' },
          { lead: 'Tanda Tangan:', text: 'Pihak menyerahkan (Staff Video Production), pihak menerima (Data Centre), dan diketahui Kadept Multimedia.' },
        ],
      },
    ],
  },
  {
    id: 'fm-03',
    code: 'FM-GMS-SIN-M2M-03',
    title: 'Equipment History Card (Kartu Riwayat Peralatan)',
    type: 'FORM',
    summary: 'Kartu log aset per unit untuk mencatat kode inventaris, masa garansi, kalibrasi, dan riwayat servis.',
    iconKey: 'clipboardCheck',
    tone: 'amber',
    blocks: [
      {
        kind: 'callout',
        tone: 'amber',
        title: 'Keterkaitan Dokumen — WI-GMS-SIN-M2M-03 & Langkah 14 TPS (Hal. 74–75)',
        text: 'Setiap perangkat utama (kamera, switcher, PC MCR, proyektor, LED processor, lensa) wajib memiliki Equipment History Card yang diperbarui oleh Staff Technical Support.',
      },
      {
        kind: 'list',
        title: 'Kolom Pencatatan Standar',
        items: [
          { lead: 'Identitas Aset:', text: 'Kode label inventaris gereja, merek/tipe, serial number, tanggal pembelian, vendor, dan masa berlaku garansi.' },
          { lead: 'Log Maintenance & Servis:', text: 'Tanggal inspeksi/kerusakan, deskripsi gejala/tindakan, penggantian sparepart, biaya perbaikan, dan paraf Staff TS.' },
        ],
      },
    ],
  },
  {
    id: 'fm-04',
    code: 'FM-GMS-SIN-M2M-04',
    title: 'Formulir Peminjaman & Pengembalian Peralatan Multimedia',
    type: 'FORM',
    summary: 'Form izin keluar-masuk inventaris lintas departemen (min. H-3) lengkap dengan ceklist kondisi fisik.',
    iconKey: 'package',
    tone: 'teal',
    blocks: [
      {
        kind: 'callout',
        tone: 'info',
        title: 'Keterkaitan Dokumen — WI-GMS-SIN-M2M-04 (Hal. 75–76)',
        text: 'Wajib diisi sebelum peralatan meninggalkan ruang penyimpanan/MCR untuk keperluan event luar ruangan maupun peminjaman lintas departemen.',
      },
      {
        kind: 'list',
        title: 'Isian Wajib Formulir',
        items: [
          { lead: 'Data Peminjam & Acara:', text: 'Nama peminjam, departemen, tujuan penggunaan, tanggal keluar, dan tenggat pengembalian.' },
          { lead: 'Ceklist Fisik Keluar & Kembali:', text: 'Daftar unit, serial number, kelengkapan aksesori (baterai, charger, kabel, tas), serta catatan kondisi sebelum & sesudah dipakai.' },
          { lead: 'Pernyataan Tanggung Jawab:', text: 'Persetujuan Staff TS / Kadept serta kesediaan peminjam menjaga keamanan dan mengganti kerusakan akibat kelalaian.' },
        ],
      },
    ],
  },
  {
    id: 'fm-05',
    code: 'FM-GMS-SIN-M2M-05',
    title: 'Formulir Rencana Biaya (RB) & Pengadaan Bersama Tim TPS',
    type: 'FORM',
    summary: 'Dokumen pengajuan anggaran & komparasi 3 vendor sesuai Kategori Gereja A–E untuk review Tim TPS.',
    iconKey: 'cart',
    tone: 'emerald',
    blocks: [
      {
        kind: 'callout',
        tone: 'emerald',
        title: 'Keterkaitan Dokumen — PR-GMS-SIN-M2M-02 (Hal. 76–77)',
        text: 'Menjadi paket berkas utama dalam alur 14 tahapan pengadaan peralatan bersama Tim Pengembangan Satelit (TPS).',
      },
      {
        kind: 'list',
        title: 'Lampiran Wajib Berkas RB',
        items: [
          { lead: 'Profil & Kategori Gereja:', text: 'Klasifikasi gereja (Kategori A–E), kapasitas jemaat, status gedung, dan daftar inventaris eksisting.' },
          { lead: 'Komparasi 3 Vendor:', text: 'Tabel perbandingan spesifikasi teknis, harga penawaran, garansi resmi, dan estimasi waktu kirim dari minimal 3 vendor.' },
          { lead: 'Kesiapan 3 Aspek Akuntabilitas:', text: 'Pernyataan kesiapan SDM operator/maintenance, ketersediaan SOP, serta tanda tangan Staff TS, Kadept Multimedia, dan Tim TPS.' },
        ],
      },
    ],
  },
  {
    id: 'fm-06',
    code: 'FM-GMS-SIN-M2M-06',
    title: 'Formulir Registrasi Servolution & Evaluasi Jenjang Ministry',
    type: 'FORM',
    summary: 'Form pendaftaran calon relawan baru, lembar ujian praktik Lv.1, dan penilaian kenaikan grade Trainee–Bintang 4.',
    iconKey: 'graduation',
    tone: 'purple',
    blocks: [
      {
        kind: 'callout',
        tone: 'purple',
        title: 'Keterkaitan Dokumen — PR-GMS-SIN-M2M-03 (Hal. 77–78)',
        text: 'Merekam perjalanan pelayan Tuhan sejak pendaftaran Servolution, hasil audisi, kelulusan Workshop Lv.1–2, hingga evaluasi kenaikan bintang tahunan.',
      },
      {
        kind: 'list',
        title: 'Komponen Evaluasi Resmi',
        items: [
          { lead: 'Data Rohani & Komunitas:', text: 'NIJ, data Connect Group (CG), rekomendasi Gembala CG, status MSJ 1–4, dan pernyataan belum merangkap bidang pelayanan lain.' },
          { lead: 'Rekam Ujian & Kehadiran:', text: 'Hasil 6 materi uji praktik Level 1 (Video/Photo/TS/Text), persentase kehadiran pelayanan (min. 70%/tahun), dan rekomendasi Ministry Leader.' },
        ],
      },
    ],
  },
];

export const INITIAL_MINISTRY_ROLES_17: MinistryRoleItem[] = [
  {
    num: '01',
    name: 'Crew Chief (PIC Ibadah)',
    group: 'Pimpinan & Director',
    req: 'Min. Bintang 3, MSJ 3, pengalaman multi-posisi.',
    duties: 'Memimpin briefing H-60, doa kru, koordinasi lintas departemen, pengawasan ibadah, dan debriefing.',
  },
  {
    num: '02',
    name: 'Video Director (VD)',
    group: 'Pimpinan & Director',
    req: 'Min. Bintang 2–3, lulus Director Workshop.',
    duties: 'Mengarahkan komposisi seluruh kamera dan ritme perpindahan gambar (cutting) selama ibadah.',
  },
  {
    num: '03',
    name: 'Technical Director (TD)',
    group: 'Pimpinan & Director',
    req: 'Min. Bintang 2–3, menguasai video switcher.',
    duties: 'Mengoperasikan video switcher, transisi, key/lower third, serta menjaga stabilitas sinyal PGM/IMAG.',
  },
  {
    num: '04',
    name: 'Broadcast Director (BD)',
    group: 'Pimpinan & Director',
    req: 'Min. Bintang 3, menguasai alur siaran online.',
    duties: 'Mengatur alur siaran broadcast, integrasi segmen VTR/bumper, dan ketepatan durasi live.',
  },
  {
    num: '05',
    name: 'Floor Director (FD)',
    group: 'Pimpinan & Director',
    req: 'Min. Bintang 2, komunikatif & menguasai 10 isyarat tangan.',
    duties: 'Menjadi perpanjangan tangan MCR di panggung, memberi cue kepada WL/pembicara dengan isyarat tangan baku.',
  },
  {
    num: '06',
    name: 'Technical Support Director',
    group: 'Pimpinan & Director',
    req: 'Min. Bintang 3, menguasai arsitektur sinyal & listrik.',
    duties: 'Mengawasi kesiapan seluruh sistem teknis ruang ibadah & MCR serta memimpin troubleshooting darurat.',
  },
  {
    num: '07',
    name: 'Cameramen (CAM 1–8)',
    group: 'Kamera & Lapangan',
    req: 'Lulus Servolution & Workshop Lv.1 Video.',
    duties: 'Mengoperasikan kamera tripod/pedestal/handheld sesuai Matrix CAM dan arahan Video Director.',
  },
  {
    num: '08',
    name: 'Jimmy Jib Operator',
    group: 'Kamera & Lapangan',
    req: 'Min. Bintang 2, lulus sertifikasi khusus Jimmy Jib.',
    duties: 'Mengoperasikan crane/jib untuk pergerakan kamera dinamis & sinematik dengan standar keselamatan tinggi.',
  },
  {
    num: '09',
    name: 'Photographer',
    group: 'Kamera & Lapangan',
    req: 'Lulus Workshop Lv.1 Photography.',
    duties: 'Mendokumentasikan momen ibadah secara estetis tanpa flash dan menyerahkan hasil ke Data Collector.',
  },
  {
    num: '10',
    name: 'Text Operator (EW / ProPresenter)',
    group: 'Visual & Layar',
    req: 'Lulus Workshop Lv.1 Text Operator.',
    duties: 'Menyiapkan dan menampilkan lirik lagu, ayat Alkitab, serta poin khotbah secara akurat di layar.',
  },
  {
    num: '11',
    name: 'Display / VTR Operator (vMix)',
    group: 'Visual & Layar',
    req: 'Min. Bintang 1–2, teliti & menguasai playback.',
    duties: 'Memutar video pengumuman, bumper, kesaksian, dan materi visual presentasi sesuai rundown.',
  },
  {
    num: '12',
    name: 'Visual / LED Operator (Resolume)',
    group: 'Visual & Layar',
    req: 'Min. Bintang 2, memahami mapping & estetika visual.',
    duties: 'Mengoperasikan motion background LED dan menyelaraskan mood warna dengan tim lighting.',
  },
  {
    num: '13',
    name: 'Time Keeper',
    group: 'Operasional & QC',
    req: 'Min. Bintang 1, disiplin waktu.',
    duties: 'Mengatur countdown timer panggung (Stage Display) dan mengingatkan sisa waktu segmen ibadah.',
  },
  {
    num: '14',
    name: 'Technical Support (Crew)',
    group: 'Operasional & QC',
    req: 'Lulus Workshop Lv.1 Technical Support.',
    duties: 'Membantu setup kabel, koneksi kamera/proyektor, baterai, serta perapian alat pasca ibadah.',
  },
  {
    num: '15',
    name: 'Streaming Operator',
    group: 'Operasional & QC',
    req: 'Min. Bintang 2, menguasai encoder & OBS/vMix/hardware.',
    duties: 'Mengelola siaran langsung (YouTube/GMS Live), bitrate, kesehatan jaringan, dan rekaman backup.',
  },
  {
    num: '16',
    name: 'QC Audio Video',
    group: 'Operasional & QC',
    req: 'Min. Bintang 2, peka terhadap audio & warna visual.',
    duties: 'Memantau kualitas audio-video output live dan menyusun catatan evaluasi teknis mingguan.',
  },
  {
    num: '17',
    name: 'Chief Video Editor, Weekly News & Clip Content',
    group: 'Produksi & Konten',
    req: 'Min. Bintang 1–3, menguasai video editing & jurnalistik gereja.',
    duties: 'Meliput berita mingguan gereja, memotong klip highlight khotbah/ibadah, dan mengedit konten publikasi.',
  },
];

export const CREW_CHIEF_TIMELINE_DATA: CrewChiefTimelineItem[] = [
  {
    time: 'H-60 Menit',
    phase: 'Pra-Ibadah: Call Time, Absensi & Cek Seragam',
    desc: 'Memastikan seluruh kru hadir tepat waktu pada Call Time H-60, mengisi absensi pelayanan, serta memeriksa kerapian seragam, ID card, dan grooming sesuai standar Rules.',
  },
  {
    time: 'H-50 Menit',
    phase: 'Pra-Ibadah: Briefing Internal & Rundown',
    desc: 'Menyampaikan alur ibadah, lagu, pengumuman, momen khusus (baptisan/perjamuan/tamu), serta pembagian posisi dan koordinasi teknis tiap station.',
  },
  {
    time: 'H-40 Menit',
    phase: 'Pra-Ibadah: Doa Bersama Kru',
    desc: 'Memimpin doa bersama seluruh tim multimedia agar melayani dengan motivasi hati yang murni, unity, dan membawa hadirat Tuhan.',
  },
  {
    time: 'H-30 Menit',
    phase: 'Pra-Ibadah: Technical Check & Uji Station',
    desc: 'Memastikan seluruh station (Kamera, Clearcom, ProPresenter, Switcher, vMix, LED, recording, dan live streaming) telah diuji 100% bersama tim Tools/Teknisi.',
  },
  {
    time: 'H-10 Menit',
    phase: 'Pra-Ibadah: Standby di Posisi',
    desc: 'Seluruh kru sudah berada di posisi masing-masing, timer countdown berjalan, dan koordinasi akhir dengan WL/FD.',
  },
  {
    time: 'Saat Ibadah',
    phase: 'Eksekusi: Monitoring, Teguran Halus & Keputusan',
    desc: 'Memantau fokus dan kedisiplinan setiap kru, memberi teguran langsung secara halus namun tegas bila ada pelanggaran, serta menjadi pengambil keputusan utama saat terjadi kendala teknis.',
  },
  {
    time: 'Pasca Ibadah',
    phase: 'Evaluasi: Debriefing 5–10 Menit & Clearance',
    desc: 'Memimpin debriefing singkat 5–10 menit (apresiasi hal baik & evaluasi objektif), lalu memastikan clearance ruangan, peralatan dimatikan sesuai prosedur, dan kabel tergulung rapi sebelum kru pulang.',
  },
];

export const LEVELING_FRAMEWORK_DATA: LevelingGradeItem[] = [
  {
    grade: 'Trainee',
    role: 'Calon Pelayan Baru',
    msj: 'MSJ 1 – 2',
    modul: 'Servolution + Workshop Dasar Lv.1',
    filosofis: 'Pengenalan & Pembentukan Dasar',
    objektif: 'Memahami visi pelayanan dan menguasai keterampilan teknis paling dasar.',
    scope: 'Observasi (shadowing), bantu setup/gulung kabel, dan praktik terbimbing pada 1 posisi dasar.',
    duration: '3 – 6 Bulan',
    attendance: 'Min. 70% / tahun',
    tone: 'gray',
    spesifikasi: [
      'Memiliki hati yang mau diajar (teachable) dan disiplin hadir tepat waktu.',
      'Aktif di Connect Group (CG) dan sedang/telah menyelesaikan MSJ 2.',
      'Lulus ujian praktik Workshop Dasar Level 1.',
    ],
  },
  {
    grade: 'Bintang 1',
    role: 'Operator Dasar (Junior Crew)',
    msj: 'MSJ 2',
    modul: 'Lulus Workshop Dasar Lv.1',
    filosofis: 'Setia dalam Perkara Kecil',
    objektif: 'Mampu melayani secara mandiri pada minimal 1 posisi operasional standar.',
    scope: 'Bertugas reguler sebagai Cameramen dasar, Text Operator, Time Keeper, Photographer, atau Technical Support.',
    duration: 'Min. 1 Tahun',
    attendance: 'Min. 70% / tahun',
    tone: 'blue',
    spesifikasi: [
      'Konsisten dalam jadwal pelayanan reguler dan menaati seluruh SOP.',
      'Mampu bekerja sama dalam tim tanpa menimbulkan konflik.',
      'Menjaga karakter dan kehidupan rohani yang baik di CG.',
    ],
  },
  {
    grade: 'Bintang 2',
    role: 'Operator Senior / Spesialis',
    msj: 'MSJ 2 – 3',
    modul: 'Workshop Dasar Lv.2 (Spesialisasi)',
    filosofis: 'Bertumbuh dalam Keunggulan',
    objektif: 'Menguasai lebih dari 1 bidang teknis dan mampu menangani posisi menengah-tinggi.',
    scope: 'Handheld/Jimmy Jib, Display/vMix, LED Resolume, Streaming, QC AV, Floor Director, atau Video Editor.',
    duration: 'Min. 1 Tahun',
    attendance: 'Min. 70% / tahun',
    tone: 'indigo',
    spesifikasi: [
      'Mampu menjadi mentor lapangan bagi Trainee dan Bintang 1.',
      'Tanggap melakukan troubleshooting dasar secara mandiri saat ibadah.',
      'Memiliki inisiatif dan kepedulian terhadap kualitas ibadah.',
    ],
  },
  {
    grade: 'Bintang 3',
    role: 'Director / Crew Chief / Team Leader',
    msj: 'MSJ 3',
    modul: 'Director Workshop & Leadership',
    filosofis: 'Memimpin & Melipatgandakan',
    objektif: 'Memimpin tim operasional ibadah, event khusus, pelatihan, atau pengutusan perintisan.',
    scope: 'Crew Chief, Video/Technical/Broadcast Director, Pengajar Workshop Perintisan, serta Team Leader (Skill & Dev, Program Event, Apostolic).',
    duration: 'Min. 1 Tahun / By Project',
    attendance: 'Min. 70% / tahun',
    tone: 'purple',
    spesifikasi: [
      'Dewasa secara rohani dan emosional dalam memimpin kru di bawah tekanan.',
      'Mampu mengevaluasi, mengajar, dan membimbing pelayan di bawahnya.',
      'Loyal pada visi Gembala dan standar Sinode GMS II.',
    ],
  },
  {
    grade: 'Bintang 4',
    role: 'Ministry Leader / Koordinator Utama',
    msj: 'MSJ 4',
    modul: 'Strategic & Pastoral Leadership',
    filosofis: 'Bapa / Ibu Rohani Pelayanan',
    objektif: 'Membangun visi, budaya pelayanan, dan melahirkan pemimpin-pemimpin baru di level lokal/regional.',
    scope: 'Memimpin keseluruhan struktur Ministry, menyusun arah strategis bersama Kadept, serta pembinaan lintas regional.',
    duration: 'By Appointment / Project',
    attendance: 'Min. 70% / tahun',
    tone: 'brand',
    spesifikasi: [
      'Menjadi teladan hidup, integritas, dan pengabdian bagi seluruh tim multimedia.',
      'Berpengalaman membangkitkan pemimpin baru (kaderisasi).',
      'Dipercaya penuh oleh Gembala Lokal/Regional dan Ketua Departemen.',
    ],
  },
];

export const CHURCH_CATEGORY_DATA: ChurchCategoryItem[] = [
  {
    cat: 'Kategori A',
    label: 'Gereja Perintisan',
    statusGereja: 'Perintisan',
    capacity: '< 250 Orang',
    building: 'Sewa Sementara (Hotel / Ruko)',
    otherRoomEquip: 'Belum Ada',
    staffMM: 'Belum Ada',
    relawan: 'Ada (Tim Dasar)',
    equip: 'Laptop/PC Text Operator (EW/ProP), 1 Proyektor/TV Display dasar, kabel HDMI/VGA, dan kamera dokumentasi foto/video sederhana.',
  },
  {
    cat: 'Kategori B',
    label: 'Gereja Satelit Awal',
    statusGereja: 'Satelit Berkembang',
    capacity: '250 – 500 Orang',
    building: 'Sewa Tetap / Ruko Permanen',
    otherRoomEquip: 'Belum Ada',
    staffMM: 'Belum Ada',
    relawan: 'Ada (Tim Reguler)',
    equip: 'PC Display utama + backup, proyektor/LED dasar, 1–2 kamera tripod, video switcher portable, dan perangkat rekaman/streaming dasar.',
  },
  {
    cat: 'Kategori C',
    label: 'Gereja Lokal Menengah',
    statusGereja: 'GMS Lokal',
    capacity: '500 – 750 Orang',
    building: 'Sewa Jangka Panjang / Milik',
    otherRoomEquip: 'Ada',
    staffMM: 'Belum Ada',
    relawan: 'Ada (Multi-Divisi)',
    equip: 'Sistem multicam (2–3 kamera + intercom), video switcher standar broadcast, LED/Proyektor utama + stage display, dan sistem live streaming stabil.',
  },
  {
    cat: 'Kategori D',
    label: 'Gereja Lokal Besar',
    statusGereja: 'GMS Lokal Besar',
    capacity: '750 – 1.000 Orang',
    building: 'Milik Sendiri / Mall Permanen',
    otherRoomEquip: 'Ada',
    staffMM: 'Opsional / Part-time',
    relawan: 'Ada (Lengkap + Director)',
    equip: 'Ruang MCR terpisah, 3–4+ kamera broadcast, switcher profesional, LED wall utama + resolume, PC ProPresenter + vMix, sistem recording dual-backup.',
  },
  {
    cat: 'Kategori E',
    label: 'Gereja Distrik / Regional',
    statusGereja: 'Distrik / Regional',
    capacity: '+/- 1.000+ Orang',
    building: 'Milik Sendiri / Gedung Permanen',
    otherRoomEquip: 'Ada',
    staffMM: 'Ada (Fulltimer)',
    relawan: 'Ada (Video Prod, TS, Ministry)',
    equip: 'Seluruh standar Kategori D ditambah dukungan penuh SDM Staff Multimedia Fulltimer (Video Production, Technical Support, Ministry) & fasilitas MCR lengkap.',
  },
];

export const REGIONAL_8_DATA: RegionalItem[] = [
  {
    no: '01',
    name: 'Regional Sumatera',
    center: 'Medan',
    desc: 'Koordinasi pelayanan multimedia, workshop perintisan, dan pembinaan gereja lokal wilayah Sumatera.',
  },
  {
    no: '02',
    name: 'Regional Jabodetabek',
    center: 'Jakarta',
    desc: 'Koordinasi operasional multimedia, pengadaan satelit, dan pengembangan SDM wilayah Jabodetabek.',
  },
  {
    no: '03',
    name: 'Regional Jawa Tengah',
    center: 'Semarang',
    desc: 'Pembinaan tim multimedia lokal, pelatihan berkala, dan pengutusan gereja perintisan Jawa Tengah.',
  },
  {
    no: '04',
    name: 'Regional Jatim & Kep. Indonesia Timur',
    center: 'Sidoarjo',
    desc: 'Mendukung pertumbuhan gereja satelit di Jawa Timur (di luar Surabaya) serta Kepulauan Indonesia Timur.',
  },
  {
    no: '05',
    name: 'Regional Jawa Barat',
    center: 'Bandung',
    desc: 'Pengelolaan standar audio-visual, workshop dasar, dan kaderisasi relawan wilayah Jawa Barat.',
  },
  {
    no: '06',
    name: 'Regional Sulampapua',
    center: 'Makassar',
    desc: 'Pembinaan multimedia wilayah Sulawesi, Maluku, dan Papua serta pendampingan gereja perintisan.',
  },
  {
    no: '07',
    name: 'Regional Kalimantan',
    center: 'Balikpapan',
    desc: 'Koordinasi pengadaan, maintenance, dan pengutusan tim multimedia untuk wilayah Kalimantan.',
  },
  {
    no: '08',
    name: 'Regional South East Asia',
    center: 'Singapore',
    desc: 'Sinergi standar siaran internasional, event regional, dan pelayanan multimedia GMS di Asia Tenggara.',
  },
];

export const ORG_CHART_V1_NODES: OrgChartNodeItem[] = [
  {
    id: 'pos-multimedia',
    section: 'Pimpinan Departemen & Sekretariat',
    title: 'MULTIMEDIA (Kepala Departemen)',
    unit: 'Pimpinan Departemen',
    badge: 'Fulltimer • Puncak Struktur',
    tone: 'blue',
    summary:
      'Memimpin keseluruhan Departemen Multimedia (Ministry, Video Production, Tech. Support, dan Sekretaris).',
    duties: [
      'Menetapkan visi, arah strategis, dan standar mutu pelayanan multimedia gereja.',
      'Mengawasi sinergi antara divisi Ministry, Video Production, dan Technical Support.',
      'Menyetujui rencana anggaran, pengadaan alat (TPS), serta kaderisasi pemimpin.',
    ],
  },
  {
    id: 'pos-sekretaris',
    section: 'Pimpinan Departemen & Sekretariat',
    title: 'SEKRETARIS',
    unit: 'Garis Koordinasi Pimpinan',
    badge: 'Fulltimer • Administrasi',
    tone: 'purple',
    summary:
      'Dukungan administrasi, persuratan, iRequest, pengumuman mingguan, dan dokumentasi departemen.',
    duties: [
      'Mengelola Surat Ijin Pengumuman (batas Rabu 12.00 WIB) & serah terima materi (Rabu 14.00 WIB).',
      'Mengelola pengajuan iRequest, notulensi rapat, dan arsip dokumen SOP/WI/PR.',
      'Membantu rekap data absensi dan jadwal pelayanan.',
    ],
  },
  {
    id: 'pos-tech-support',
    section: 'Divisi Teknis & Produksi (Office)',
    title: 'TECH. SUPPORT',
    unit: 'Divisi Teknis',
    badge: 'Fulltimer • Infrastruktur',
    tone: 'amber',
    summary: 'Membawahi Hardware, Software, Maintenance, dan Purchasing peralatan multimedia.',
    duties: [
      'Menjaga stabilitas seluruh perangkat keras & lunak ruang ibadah dan MCR.',
      'Melakukan preventive maintenance rutin dan mencatat di Equipment History Card.',
      'Menyusun spesifikasi teknis, survei vendor, dan proses Purchasing bersama Tim TPS.',
    ],
  },
  {
    id: 'pos-ts-scope',
    section: 'Divisi Teknis & Produksi (Office)',
    title: 'Hardware, Software, Maintenance, Purchasing',
    unit: 'Sub-Fungsi Tech. Support',
    badge: 'Operasional Teknis',
    tone: 'lime',
    summary: '4 fokus operasional utama di bawah koordinasi Divisi Tech. Support.',
    duties: [
      'Hardware: Kamera, switcher, LED, kabel SDI/NDI, PC broadcast.',
      'Software: ProPresenter, EasyWorship, vMix, Resolume, firmware.',
      'Maintenance: Kalibrasi rutin, pembersihan, perbaikan & garansi.',
      'Purchasing: Riset, pengajuan pengadaan, QC fisik & pelabelan aset.',
    ],
  },
  {
    id: 'pos-video-prod',
    section: 'Divisi Teknis & Produksi (Office)',
    title: 'VIDEO PRODUCTION',
    unit: 'Divisi Produksi',
    badge: 'Fulltimer • Konten Visual',
    tone: 'amber',
    summary: 'Memimpin produksi konten video ibadah, bumper, pengumuman, animasi, dan arsip Final Bank.',
    duties: [
      'Mengkoordinasikan jadwal produksi Video Editor dan Animator.',
      'Menjaga standar kualitas visual, audio, dan ketepatan deadline tayang.',
      'Memastikan serah terima Final Bank setiap tanggal 1 tiap bulan ke Data Centre.',
    ],
  },
  {
    id: 'pos-video-editor',
    section: 'Divisi Teknis & Produksi (Office)',
    title: 'VIDEO EDITOR',
    unit: 'Sub-Unit Video Production',
    badge: 'Produksi Video',
    tone: 'lime',
    summary: 'Mengerjakan penyuntingan video pengumuman, kesaksian, highlight ibadah, dan master rekaman.',
    duties: [
      'Melakukan editing, color grading, dan audio mixing sesuai standar broadcast GMS.',
      'Menyusun arsip mentah dan output Final Bank (.mp4 H.264 1080p).',
    ],
  },
  {
    id: 'pos-animator',
    section: 'Divisi Teknis & Produksi (Office)',
    title: 'ANIMATOR',
    unit: 'Sub-Unit Video Production',
    badge: 'Motion & Grafis',
    tone: 'lime',
    summary: 'Merancang bumper, motion background LED, lower third, dan animasi 2D/3D.',
    duties: [
      'Memproduksi paket grafis gerak untuk ibadah mingguan dan event khusus.',
      'Menyelaraskan desain visual dengan tema khotbah dan arahan kreatif gereja.',
    ],
  },
  {
    id: 'pos-ministry',
    section: 'Divisi Ministry (Pelayanan Relawan)',
    title: 'MINISTRY',
    unit: 'Divisi Pelayanan',
    badge: 'Pimpinan Ministry',
    tone: 'amber',
    summary:
      'Membawahi seluruh operasional pelayanan relawan (Ministry Leader Pengembangan & Ministry Leader Crew Chief).',
    duties: [
      'Membangun budaya pelayanan yang sehat, rohani, dan excellent bagi seluruh volunteer.',
      'Menyelaraskan kerja tim Program Events, Apostolic, Skill & Development, serta Crew operasional mingguan.',
    ],
  },
  {
    id: 'pos-ml-dev',
    section: 'Divisi Ministry (Pelayanan Relawan)',
    title: 'MINISTRY LEADER (Pengembangan & Strategis)',
    unit: 'Sayap Strategis Ministry',
    badge: 'Bintang 3 – 4',
    tone: 'lime',
    summary: 'Membawahi 3 bidang strategis: Program Events, Apostolic, dan Skill & Development.',
    duties: [
      'Mengkoordinasikan perencanaan event khusus, pengutusan regional/perintisan, serta kurikulum pelatihan relawan.',
      'Membina para koordinator bidang agar berjalan selaras dengan visi gereja.',
    ],
  },
  {
    id: 'pos-program-events',
    section: 'Divisi Ministry (Pelayanan Relawan)',
    title: 'PROGRAM EVENTS',
    unit: 'Di bawah Ministry Leader',
    badge: 'Event & KKR',
    tone: 'lime',
    summary: 'Perencanaan dan eksekusi multimedia untuk KKR, Konferensi, Natal, Paskah, dan acara khusus.',
    duties: [
      'Menyusun konsep visual, layout kamera, dan kebutuhan teknis event khusus.',
      'Berkoordinasi dengan panitia acara, lighting, sound, dan tim produksi.',
    ],
  },
  {
    id: 'pos-apostolic',
    section: 'Divisi Ministry (Pelayanan Relawan)',
    title: 'APOSTOLIC',
    unit: 'Di bawah Ministry Leader',
    badge: 'Pengutusan',
    tone: 'lime',
    summary: 'Pengutusan dan pembinaan tim multimedia gereja lokal, satelit, dan gereja perintisan.',
    duties: [
      'Menyelenggarakan Workshop Dasar Gereja Perintisan dan pendampingan lapangan 6–12 bulan.',
      'Membantu transfer standar SOP dan kaderisasi pemimpin lokal.',
    ],
  },
  {
    id: 'pos-skill-dev',
    section: 'Divisi Ministry (Pelayanan Relawan)',
    title: 'SKILL & DEVELOP.',
    unit: 'Di bawah Ministry Leader',
    badge: 'Pengembangan SDM',
    tone: 'lime',
    summary: 'Pengembangan kurikulum, kelas Servolution, Workshop Lv.1–2, QC ibadah, dan evaluasi jenjang.',
    duties: [
      'Menyusun modul pelatihan teknis dan menguji kenaikan level relawan.',
      'Menjaga kualitas operasional ibadah melalui audit QC serta pembinaan komunitas.',
    ],
  },
  {
    id: 'pos-ml-cc',
    section: 'Divisi Ministry (Pelayanan Relawan)',
    title: 'MINISTRY LEADER — CREW CHIEF',
    unit: 'Sayap Operasional Ibadah',
    badge: 'PIC Lapangan',
    tone: 'lime',
    summary: 'Memimpin langsung operasional ibadah mingguan dan membawahi 13 posisi CREW.',
    duties: [
      'Memimpin briefing H-60, doa kru, pengecekan alat, pengawasan saat ibadah, dan debriefing pasca ibadah.',
      'Memastikan seluruh 13 posisi kru bekerja teratur sesuai SOP V5.',
    ],
  },
  {
    id: 'pos-crew-13',
    section: 'Divisi Ministry (Pelayanan Relawan)',
    title: 'CREW (13 Posisi Operasional)',
    unit: 'Di bawah Crew Chief',
    badge: '13 Posisi Aktif',
    tone: 'brand',
    summary:
      'Cameramen, Jimmy Jib Operator, Text Operator, Time Keeper, Streaming Operator, Technical Support, Video Director, Technical Director, Broadcast Director, QC Audio Video, Photographer, Weekly News Crew, Clip Content Operator.',
    duties: [
      'Baris 1: Cameramen, Jimmy Jib Operator, Text Operator, Time Keeper, Streaming Operator, Technical Support.',
      'Baris 2: Video Director, Technical Director, Broadcast Director, QC Audio Video, Photographer, Weekly News Crew, Clip Content Operator.',
    ],
  },
];

const pSys = PILLARS_DATA.find((p) => p.id === 'system')!;
const pTools = PILLARS_DATA.find((p) => p.id === 'tools')!;
const pAdv = PILLARS_DATA.find((p) => p.id === 'advancement')!;
const pRel = PILLARS_DATA.find((p) => p.id === 'relations')!;
const pServ = PILLARS_DATA.find((p) => p.id === 'servolution')!;

export const ORG_CHART_V2_NODES: OrgChartNodeItem[] = [
  {
    id: 'v2-head-mm',
    section: 'Bagian 1: Pimpinan Sinodal & Sekretariat',
    title: 'HEAD OF MM',
    unit: 'Pimpinan Sinodal Multimedia',
    badge: 'Puncak Struktur V2',
    tone: 'sky',
    summary:
      'Memimpin keseluruhan Multimedia Synodal Structure yang membawahi Operational, Development (5 Pilar), Regional Support, dan Secretary.',
    duties: [
      'Menetapkan visi, arah strategis sinodal, kebijakan mutu, dan standar pelayanan "Capturing and Spreading God\'s Presence".',
      'Menyelaraskan kolaborasi lintas 3 pilar utama struktur V2: Operational, Development, dan Regional Support.',
      'Menyetujui rencana kerja tahunan, anggaran operasional/pengadaan aset (TPS), serta kaderisasi pemimpin multimedia.',
    ],
  },
  {
    id: 'v2-secretary',
    section: 'Bagian 1: Pimpinan Sinodal & Sekretariat',
    title: 'SECRETARY',
    unit: 'Sekretariat Sinodal',
    badge: 'Administrasi & Koordinasi',
    tone: 'slate',
    summary:
      'Mengelola administrasi sinodal, persuratan, iRequest, pengumuman mingguan, notulensi, dan tata kelola arsip dokumen departemen.',
    duties: [
      'Memverifikasi Surat Ijin Pengumuman (batas Rabu 12.00 WIB) dan serah terima materi final (batas Rabu 14.00 WIB).',
      'Mengelola alur masuk permintaan layanan via iRequest, notulensi rapat pimpinan, dan distribusi informasi antar unit.',
      'Merapikan arsip dokumen SOP/WI/PR, database relawan, serta laporan administrasi bulanan Departemen Multimedia.',
    ],
  },
  {
    id: 'v2-operational',
    section: 'Bagian 2: Divisi Operational',
    title: 'OPERATIONAL (Head of Operational)',
    unit: 'Divisi Operational',
    badge: 'Kepala Divisi',
    tone: 'slate',
    summary:
      'Memimpin dan menjamin kelancaran eksekusi operasional ibadah mingguan & event melalui 4 unit: Live Production, Vid Pro, Documentation, dan Tech Support.',
    duties: [
      'Mengkoordinasikan penjadwalan, kesiapan kru, dan kualitas eksekusi operasional harian maupun event besar (KKR, Konferensi, Natal, Paskah).',
      'Menjadi pengambil keputusan utama operasional saat terjadi kendala kritikal di lapangan.',
      'Melakukan evaluasi kinerja rutin bersama para koordinator unit di bawah Operational.',
    ],
  },
  {
    id: 'v2-live-prod',
    section: 'Bagian 2: Divisi Operational',
    title: 'LIVE PRODUCTION',
    unit: 'Sub-Unit Operational',
    badge: 'Siaran & Ibadah Live',
    tone: 'sky',
    summary:
      'Mengelola seluruh produksi langsung ruang ibadah & MCR (Director, Kameramen CAM 1–9, Visual Display, Streaming, dan QC AV).',
    duties: [
      'Mengoordinasikan Program Director, Floor Director, Technical Director, Broadcast Director, Crew Chief, dan jajaran Kameramen (CAM 1–9 & Jimmy Jib).',
      'Menjamin ketepatan visual panggung & layar melalui Operator ProPresenter, Display/vMix, Resolume LED, serta Time Keeper.',
      'Mengawal stabilitas siaran langsung (Streaming Operator) dan kualitas audio-video output (QC AV) sesuai Manual SOP V5.',
    ],
  },
  {
    id: 'v2-vid-pro',
    section: 'Bagian 2: Divisi Operational',
    title: 'VID PRO (Video Production)',
    unit: 'Sub-Unit Operational',
    badge: 'Produksi Konten Video',
    tone: 'sky',
    summary:
      'Memproduksi konten video pengumuman, bumper ibadah, motion graphic/animasi, kesaksian, highlight, dan arsip Final Bank.',
    duties: [
      'Mengerjakan pra-produksi, shooting, video editing, color grading, audio mixing, serta animasi 2D/3D (Video Editor & Animator).',
      'Menyelesaikan konten video pengumuman, Weekly News, dan Clip Content tepat waktu sebelum jadwal tayang.',
      'Menyerahkan kompilasi Final Bank (.mp4 H.264 1080p) ke Data Centre secara rutin setiap tanggal 1 tiap bulan.',
    ],
  },
  {
    id: 'v2-documentation',
    section: 'Bagian 2: Divisi Operational',
    title: 'DOCUMENTATION',
    unit: 'Sub-Unit Operational',
    badge: 'Foto & Dokumentasi',
    tone: 'sky',
    summary:
      'Mendokumentasikan momen ibadah, event khusus, dan kegiatan gereja melalui fotografi & videografi serta mengelola arsip dokumentasi.',
    duties: [
      'Mengkoordinasikan tim Photographer dan kru dokumentasi lapangan dengan etika kerja non-destruktif (tanpa flash dan tidak menghalangi jemaat).',
      'Melakukan kurasi, penyuntingan dasar warna/pencahayaan, dan pengiriman foto/video siap publikasi tepat waktu.',
      'Menyerahkan dan mengarsipkan seluruh file dokumentasi ke Data Collector / penyimpanan resmi gereja secara rapi.',
    ],
  },
  {
    id: 'v2-tech-support',
    section: 'Bagian 2: Divisi Operational',
    title: 'TECH SUPPORT',
    unit: 'Sub-Unit Operational',
    badge: 'Infrastruktur Lapangan',
    tone: 'sky',
    summary:
      'Menjamin kesiapan infrastruktur teknis lapangan & MCR (kelistrikan, jalur sinyal SDI/HDMI/NDI, UPS, backup internet, dan troubleshooting live).',
    duties: [
      'Melakukan setup fisik, pengecekan jalur kabel sinyal video/interkom, layar LED/proyektor, dan kesiapan daya UPS sebelum ibadah dimulai.',
      'Siaga penuh selama ibadah untuk troubleshooting kilat (kabel putus, kamera mati, gangguan jaringan/encoder, pengalihan backup ISP).',
      'Melakukan pembongkaran rapi pasca ibadah serta berkoordinasi dengan unit Tools terkait pelaporan kerusakan & perawatan berkala.',
    ],
  },
  {
    id: 'v2-development',
    section: 'Bagian 3: Divisi Development (5 Pilar)',
    title: 'DEVELOPMENT (Head of Development)',
    unit: 'Divisi Development',
    badge: 'Kepala Divisi • 5 Pilar',
    tone: 'slate',
    summary:
      'Memimpin pengembangan jangka panjang ekosistem multimedia melalui 5 Pilar: System, Tools, Advancement, Relation, dan Servolution.',
    duties: [
      'Memastikan keseimbangan antara aspek regulasi & aset (System & Tools) dengan aspek manusia & regenerasi (Advancement, Relation, Servolution).',
      'Menyelaraskan kurikulum pelatihan, standar SOP, manajemen aset, dan kesehatan rohani seluruh volunteer.',
      'Melakukan review berkala terhadap capaian 5 pilar bersama Head of MM.',
    ],
  },
  {
    id: 'v2-system',
    section: 'Bagian 3: Divisi Development (5 Pilar)',
    title: 'SYSTEM',
    unit: 'Pilar 1 • Development',
    badge: 'Compliance & SOP',
    tone: 'blue',
    summary: `${pSys.role} — ${pSys.responsibility}`,
    duties: pSys.jobdesk,
    baseSop: pSys.baseSop,
  },
  {
    id: 'v2-tools',
    section: 'Bagian 3: Divisi Development (5 Pilar)',
    title: 'TOOLS',
    unit: 'Pilar 2 • Development',
    badge: 'Asset & Maintenance',
    tone: 'amber',
    summary: `${pTools.role} — ${pTools.responsibility}`,
    duties: pTools.jobdesk,
    baseSop: pTools.baseSop,
  },
  {
    id: 'v2-advancement',
    section: 'Bagian 3: Divisi Development (5 Pilar)',
    title: 'ADVANCEMENT',
    unit: 'Pilar 3 • Development',
    badge: 'Skill Development',
    tone: 'emerald',
    summary: `${pAdv.role} — ${pAdv.responsibility}`,
    duties: pAdv.jobdesk,
    baseSop: pAdv.baseSop,
  },
  {
    id: 'v2-relation',
    section: 'Bagian 3: Divisi Development (5 Pilar)',
    title: 'RELATION',
    unit: 'Pilar 4 • Development',
    badge: 'Pastoral & Community',
    tone: 'brand',
    summary: `${pRel.role} — ${pRel.responsibility}`,
    duties: pRel.jobdesk,
    baseSop: pRel.baseSop,
  },
  {
    id: 'v2-servolution',
    section: 'Bagian 3: Divisi Development (5 Pilar)',
    title: 'SERVOLUTION',
    unit: 'Pilar 5 • Development',
    badge: 'Onboarding & School',
    tone: 'purple',
    summary: `${pServ.role} — ${pServ.responsibility}`,
    duties: pServ.jobdesk,
    baseSop: pServ.baseSop,
  },
  {
    id: 'v2-regional-support',
    section: 'Bagian 4: Divisi Regional Support (In & Out)',
    title: 'REGIONAL SUPPORT (Head of Regional Support)',
    unit: 'Divisi Regional Support',
    badge: 'Kepala Divisi',
    tone: 'slate',
    summary:
      'Mengkoordinasikan dukungan multimedia bagi pelayanan kategorial internal (Regional In) dan 12 wilayah gereja lokal/satelit/internasional (Regional Out).',
    duties: [
      'Memastikan standar kualitas audio-visual, SOP V5, dan Platform GMS II terimplementasi merata di unit Regional In maupun Regional Out.',
      'Mengoordinasikan pendampingan Workshop Perintisan, pengutusan tim apostolik, dan konsultasi pengadaan alat (Kategori A–E & TPS).',
      'Menjadi jembatan komunikasi antara Head of MM dengan seluruh PIC kategorial dan koordinator multimedia wilayah.',
    ],
  },
  {
    id: 'v2-regin-ek',
    section: 'Bagian 4: Divisi Regional Support (In & Out)',
    title: 'REGIONAL IN — EK (EagleKidz)',
    unit: 'Regional In • Kategorial',
    badge: 'Pelayanan Anak',
    tone: 'teal',
    summary:
      'Koordinasi dukungan multimedia, visual kreatif ramah anak, display, dan tim kru khusus ibadah/event pelayanan anak (EagleKidz).',
    duties: [
      'Menyelaraskan kebutuhan konten visual, video cerita/lagu, dan tata layar yang menarik serta aman bagi ibadah EagleKidz.',
      'Mengatur kesiapan alat dan penjadwalan kru multimedia di ruang-ruang ibadah anak.',
      'Berkoordinasi dengan divisi Operational & Development untuk pembinaan kru khusus EK.',
    ],
  },
  {
    id: 'v2-regin-aog',
    section: 'Bagian 4: Divisi Regional Support (In & Out)',
    title: 'REGIONAL IN — AOG (Army of God)',
    unit: 'Regional In • Kategorial',
    badge: 'Youth & Teens',
    tone: 'teal',
    summary:
      'Koordinasi produksi visual dinamis, LED/Resolume, multicam, dokumentasi, dan regenerasi kru muda untuk pelayanan Army of God (AOG).',
    duties: [
      'Mendukung kebutuhan produksi live, visual LED kreatif, dan dokumentasi ibadah mingguan maupun event/camp AOG.',
      'Menjadi wadah pembinaan dan kaderisasi relawan multimedia generasi muda bersama Servolution & Advancement.',
      'Menjaga standar SOP, kedisiplinan, dan perawatan alat di seluruh ibadah AOG.',
    ],
  },
  {
    id: 'v2-regin-senior',
    section: 'Bagian 4: Divisi Regional Support (In & Out)',
    title: 'REGIONAL IN — SENIOR',
    unit: 'Regional In • Kategorial',
    badge: 'Pelayanan Senior',
    tone: 'teal',
    summary:
      'Koordinasi dukungan multimedia ibadah pelayanan senior dengan prioritas keterbacaan teks layar dan kenyamanan audio-visual.',
    duties: [
      'Memastikan tampilan lirik lagu, ayat Alkitab, dan slide khotbah memiliki ukuran font besar, kontras jelas, dan mudah dibaca jemaat senior.',
      'Menyiapkan operasional display, kamera/dokumentasi, dan dukungan teknis ruangan ibadah senior.',
      'Berkoordinasi dengan PIC pelayanan senior untuk kebutuhan acara khusus.',
    ],
  },
  {
    id: 'v2-regin-msp',
    section: 'Bagian 4: Divisi Regional Support (In & Out)',
    title: 'REGIONAL IN — MSP',
    unit: 'Regional In • Kategorial',
    badge: 'Pelayanan MSP',
    tone: 'teal',
    summary:
      'Koordinasi dukungan dokumentasi, konten visual, dan operasional teknis multimedia untuk program dan kegiatan pelayanan MSP.',
    duties: [
      'Menyediakan dukungan peliputan foto/video, publikasi visual, dan perangkat display untuk kegiatan/event MSP.',
      'Berkoordinasi dengan Vid Pro dan Documentation untuk pengarsipan serta materi laporan pelayanan.',
      'Memastikan peralatan yang dibawa ke lapangan/kegiatan luar ruangan tercatat sesuai SOP peminjaman.',
    ],
  },
  {
    id: 'v2-regout-indo',
    section: 'Bagian 4: Divisi Regional Support (In & Out)',
    title: 'REGIONAL OUT — Indonesia (8 Wilayah)',
    unit: 'Regional Out • Nasional',
    badge: 'Sumatra, JJB, Jateng, Jatim 1–2, Kal, Sulampapua, Bali',
    tone: 'indigo',
    summary:
      'Koordinasi dan pendampingan multimedia untuk 8 wilayah nasional: Sumatra, JJB, Jateng, Jatim 1, Jatim 2, Kalimantan, Sulampapua, dan Bali.',
    duties: [
      'Menjadi PIC pendamping bagi gereja lokal, satelit, dan perintisan di masing-masing wilayah nasional.',
      'Menyelenggarakan Workshop Dasar Gereja Perintisan, evaluasi berkala 2 minggu sekali, serta refreshment tiap 6 bulan.',
      'Mendampingi pengajuan pengadaan peralatan sesuai Kategori Gereja (A–E) bersama Tools & Tim TPS serta membangun kaderisasi pemimpin lokal.',
    ],
  },
  {
    id: 'v2-regout-intl',
    section: 'Bagian 4: Divisi Regional Support (In & Out)',
    title: 'REGIONAL OUT — Internasional (4 Wilayah)',
    unit: 'Regional Out • Global',
    badge: 'Asia, Australia, Europe, USA & Canada',
    tone: 'purple',
    summary:
      'Koordinasi dan dukungan standar multimedia sinodal untuk 4 wilayah internasional: Asia, Australia, Europe, serta USA & Canada.',
    duties: [
      'Menyelaraskan standar visual, paket grafis ibadah, serta kualitas live streaming/broadcast dengan standar Sinode GMS.',
      'Memberikan konsultasi teknis jarak jauh (remote support), pelatihan online, dan pendampingan operasional lintas zona waktu.',
      'Menghubungkan kebutuhan materi konten (Vid Pro) dan pengembangan SDM (Development) untuk gereja-gereja internasional.',
    ],
  },
];

export const PILAR_MAPPING_5 = [
  {
    pilar: 'System',
    unit: 'V2: Divisi Development → Unit System (V1: Kadept, Sekretaris & QC)',
    focus: 'Penjaga SOP V5, WI/PR, kepatuhan aturan, hak akses, dan audit mutu ibadah.',
  },
  {
    pilar: 'Tools',
    unit: 'V2: Divisi Development → Unit Tools (V1: Tech. Support Office & TS Crew)',
    focus: 'Maintenance rutin, inventaris & Equipment History Card, klaim garansi, dan pengajuan alat (TPS).',
  },
  {
    pilar: 'Advancement',
    unit: 'V2: Divisi Development → Unit Advancement (V1: Skill & Develop.)',
    focus: 'Pemetaan level Trainee–Bintang 4, Kurikulum Workshop Lv.1 & Lv.2, Director Class, dan evaluasi naik level.',
  },
  {
    pilar: 'Relations',
    unit: 'V2: Divisi Development → Unit Relation (V1: Ministry Leader & Komunitas)',
    focus: 'Monitoring Connect Group (CG), Monthly Gathering, mentoring 1-on-1, dan rekomendasi rest pelayanan.',
  },
  {
    pilar: 'Servolution',
    unit: 'V2: Divisi Development → Unit Servolution (V1: Unit Servolution)',
    focus: 'Rekrutmen, audisi, kelas orientasi awal, pendampingan shadowing MCR/lapangan, dan kelulusan relawan baru.',
  },
];

export const GMS2_WS1_VIDEO = [
  ['Minggu 1', 'Visi Misi, Prinsip Pelayanan, Kabel & Konektor', 'Memahami visi misi Multimedia GMS, mampu mengulur/menggulung kabel, membedakan & memasang konektor.'],
  ['Minggu 2', 'Tripod dan Kamera', 'Mampu menggunakan tripod, mengoperasikan kamera, dan handling camera dengan benar.'],
  ['Minggu 3', 'Framing dan Komposisi', 'Mengenali dan mengaplikasikan framing & komposisi gambar ibadah.'],
  ['Minggu 4', 'Camera Movement & Basic Exposure', 'Menguasai pergerakan kamera dasar dan auto exposure.'],
  ['Minggu 5', 'Easy Worship & GMS Live Streaming', 'Mengoperasikan UI Easy Worship (lagu & ayat Alkitab) serta audio monitoring GMS Live Streaming.'],
  ['Minggu 6', 'Latihan Simulasi Ibadah', 'Praktik simulasi ibadah langsung (berlanjut sampai 7 minggu ke depan).'],
  ['Minggu 7', 'Ujian Level 1 (6 Materi Uji)', 'Uji praktik: gulung/ulur kabel, konektor, kamera dasar & persiapan syuting, framing, camera movement, dan membereskan alat.'],
] as const;

export const GMS2_WS1_PHOTO = [
  ['Minggu 1', 'Visi Misi, Prinsip Pelayanan, Kabel & Konektor', 'Dasar pelayanan gereja serta pengenalan kabel & konektor.'],
  ['Minggu 2', 'Data Reguler', 'Pengenalan alur data collector untuk penyimpanan dan pengarsipan foto ibadah.'],
  ['Minggu 3', 'Basic Skill Part 1', 'Pengenalan kamera DSLR/mirrorless, setting dasar, dan handling di lapangan.'],
  ['Minggu 4', 'Basic Skill Part 2', 'Komposisi (head room, nose room, long/full/medium/close-up shot) dan exposure.'],
  ['Minggu 5', 'Ujian Level 1 Photography', 'Latihan simulasi ibadah dan uji kemampuan menghasilkan foto sesuai standar komposisi & exposure.'],
] as const;

export const GMS2_WS2_MODULES = [
  ['a. Director Workshop (Hal. 44)', 'Pembekalan Video Director, Technical Director, Broadcast Director & Floor Director.'],
  ['b. Skill & Development (Hal. 45)', 'Pengembangan kurikulum, modul pelatihan, evaluasi kualitas teknis, dan peningkatan skill lanjutan.'],
  ['c. Apostolik (Hal. 45)', 'Pengutusan dan pembinaan tim multimedia gereja lokal, satelit, dan gereja perintisan.'],
  ['d. Program Event (Hal. 46)', 'Manajemen produksi dan perencanaan visual untuk KKR, Konferensi, Natal, Paskah & event khusus.'],
  ['e. Multimedia Ministry Community & Gathering (Hal. 46–48)', 'Penguatan komunitas, fellowship, dan gathering relawan multimedia untuk menjaga unity & kerohanian.'],
  ['f. Pelayanan Reguler & Visi Misi GMS II (Hal. 49–50)', 'Standar pelaksanaan ibadah mingguan reguler berlandaskan visi "Gereja Sel yang Apostolik dan Profetik".'],
] as const;

export const GMS2_SINODAL_DEFINITIONS = [
  {
    title: 'Gereja Mawar Sharon II (Sinode)',
    tone: 'neutral' as const,
    desc: 'Organisasi yang memimpin penuh seluruh aktivitas penggembalaan, pekerjaan, dan pelayanan Sinode GMS II (GMS Surabaya Barat).',
  },
  {
    title: '8 GMS Regional',
    tone: 'neutral' as const,
    desc: 'Unit tugas di bawah GMS Surabaya Barat (kecuali Regional Surabaya): Sumatera (Medan), Jabodetabek (Jakarta), Jateng (Semarang), Jatim & Kep. Indonesia Timur (Sidoarjo), Jabar (Bandung), Sulampapua (Makasar), Kalimantan (Balikpapan), South East Asia (Singapore).',
  },
  {
    title: 'GMS Lokal & Gembala Lokal',
    tone: 'neutral' as const,
    desc: 'Gereja yang mengurus penggembalaan, pekerjaan, dan pelayanan di wilayah tertentu dan secara struktur berada di bawah GMS Regional.',
  },
  {
    title: 'Ketua & Staff Departemen',
    tone: 'neutral' as const,
    desc: 'Petugas yang berwenang dan bertanggung jawab mengajukan pengadaan barang/jasa yang dibiayai anggaran operasi/investasi Sinode GMS II sesuai rekomendasi dan ketentuan.',
  },
  {
    title: 'Tim TPS (Tim Pengembangan Satelit)',
    tone: 'brand' as const,
    desc: 'Tim yang memberikan masukan & saran kepada departemen/regional/lokal untuk renovasi, kontrak, pengadaan/pembelian barang & aset (dari sisi harga, perjanjian, kelengkapan administrasi, dan negosiasi).',
  },
  {
    title: 'Prinsip & 3 Aspek Akuntabilitas (Hal. 58)',
    tone: 'emerald' as const,
    desc: 'Prinsip pengadaan: Efisien, Efektif, Terbuka & Maksimal, Transparan, Adil/Tidak Diskriminatif, Akuntabel. Akuntabel mencakup: (1) diimbangi kemampuan SDM dalam mengoperasikan, maintenance & kelengkapan SOP; (2) mencapai sasaran fisik, keuangan & manfaat; (3) sumber input, proses, dan hasil akhir sesuai peraturan.',
  },
];

export const GMS2_TPS_STEPS = [
  ['01', 'Identifikasi Kebutuhan', 'Menyesuaikan usulan alat dengan indikator Kategori Gereja (A–E) dan kebutuhan operasional.'],
  ['02', 'Riset Spesifikasi Teknis', 'Menentukan spesifikasi standar broadcast/operasional oleh Staff Technical Support.'],
  ['03', 'Survei 3 Vendor Pembanding', 'Mengumpulkan minimal 3 penawaran harga, spesifikasi, dan garansi resmi.'],
  ['04', 'Penyusunan Rencana Biaya (RB)', 'Menyusun dokumen Rencana Biaya lengkap beserta justifikasi kebutuhan dan kesiapan SDM.'],
  ['05', 'Verifikasi Staff TS', 'Validasi kompatibilitas teknis dengan sistem eksisting di ruang ibadah / MCR.'],
  ['06', 'Approval Ketua Departemen', 'Persetujuan resmi Ketua Departemen Multimedia sebelum diteruskan ke jalur pengadaan.'],
  ['07', 'Submit ke Tim TPS', 'Penyerahan berkas pengajuan ke Tim Pengembangan Satelit (TPS).'],
  ['08', 'Review & Negosiasi TPS', 'Evaluasi harga, perjanjian, kelengkapan administrasi, dan negosiasi vendor oleh Tim TPS.'],
  ['09', 'Penerbitan Purchase Order (PO)', 'PO resmi diterbitkan kepada vendor terpilih.'],
  ['10', 'Pengiriman Barang', 'Monitoring pengiriman hingga perangkat tiba di lokasi gereja tujuan.'],
  ['11', 'QC Fisik & Fungsi', 'Uji nyala, kelengkapan aksesori, dan performa oleh Staff TS.'],
  ['12', 'Berita Acara Serah Terima', 'Penandatanganan BAST resmi antara vendor, TPS, dan Departemen Multimedia.'],
  ['13', 'Pelabelan Kode Aset', 'Pemasangan stiker/barcode inventaris resmi gereja pada setiap unit barang.'],
  ['14', 'Inventaris & Equipment History Card', 'Input ke database aset dan pembuatan kartu riwayat peralatan (History Card).'],
] as const;

export const BUKUSAKU_VALUES_5 = [
  ['01', 'Excellence', 'Memberikan kualitas teknis dan pelayanan terbaik bagi Tuhan.'],
  ['02', 'Unity', 'Melayani sebagai satu tubuh yang saling mendukung tanpa ego pribadi.'],
  ['03', 'Integrity', 'Jujur, bertanggung jawab pada aset & jadwal, serta menjaga kekudusan.'],
  ['04', 'Servant Heart', 'Rendah hati, siap diajar (teachable), dan rela berkorban.'],
  ['05', 'Growth', 'Terus bertumbuh dalam kerohanian (CG) dan pengembangan skill.'],
] as const;

export const BUKUSAKU_LEADER_DIVISIONS = [
  {
    name: '1. Skill & Development',
    scope: 'Lokal, Servolution, QC, Modul, Relations',
    tone: 'purple' as const,
    desc: 'Menjaga pertumbuhan teknis, kurikulum pelatihan, audit QC ibadah, serta penggembalaan & komunitas pelayan.',
  },
  {
    name: '2. Program Event',
    scope: 'KKR, Konferensi, Natal & Paskah',
    tone: 'amber' as const,
    desc: 'Merancang arsitektur visual, LED, multicam, dan manajemen produksi untuk acara-acara khusus gereja.',
  },
  {
    name: '3. Apostolic',
    scope: 'Regional, Satelit & Perintisan',
    tone: 'emerald' as const,
    desc: 'Mengutus dan membina tim multimedia gereja lokal/satelit serta memimpin Workshop Dasar Gereja Perintisan.',
  },
];

export const PERINTISAN_PROFIL_ROWS = [
  {
    label: 'Gambaran Umum',
    tone: 'brand' as const,
    desc: 'Program pembekalan intensif gabungan kelas teori + field training (8x pertemuan) untuk mempersiapkan tim multimedia mandiri di gereja perintisan.',
  },
  {
    label: 'Target Peserta & Prasyarat',
    tone: 'indigo' as const,
    desc: 'Koordinator & calon pelayan yang dipersiapkan Gembala Perintisan. Wajib memiliki rekomendasi gembala dan komitmen tinggi.',
  },
  {
    label: 'Syarat Pengajar',
    tone: 'emerald' as const,
    desc: 'Ditunjuk resmi oleh Tim Pengembangan Regional dengan kualifikasi minimal Leader Grade Bintang 3.',
  },
];

export const PERINTISAN_MATERI_ROWS = [
  ['MATERI 1', 'Dasar Pelayanan Multimedia', "Visi Capturing & Spreading God's Presence, sikap hati pelayan, dan etika pelayanan ibadah."],
  ['MATERI 2', 'Text Operator (EW / ProPresenter)', 'Pengoperasian teks lagu, ayat Alkitab cepat, dan transisi slide yang akurat mengikuti pujian.'],
  ['MATERI 3', 'Instalasi PC – Proyektor & Connector', 'Pengenalan kabel, konektor HDMI/SDI, extended display, dan troubleshooting dasar instalasi.'],
  ['MATERI 4', 'Dokumentasi Video & Foto Satelit', 'Dasar pengambilan foto & video dokumentasi ibadah perintisan yang rapi untuk pelaporan & publikasi.'],
] as const;

export const PERINTISAN_METODE_ROWS = [
  ['Kondisi Regional', 'Jika regional belum punya tim perintisan.', 'Jika regional sudah punya tim perintisan.'],
  ['Waktu & Durasi', '1 bulan sebelum pembukaan gereja (frekuensi 1–2x/minggu).', 'Pengutusan tim regional ke lokal selama 6–12 bulan (maks. 1 tahun).'],
  ['Kurikulum / Materi', 'Minggu 1: Dasar Pelayanan; Minggu 2: Text Op; Minggu 3: Instalasi Display; Minggu 4: Dokumentasi.', 'Dasar Pelayanan, Text Operator, Instalasi, dan Video Editing.'],
  ['Fokus & Tindak Lanjut', 'Refreshment tiap 6 bulan sekali oleh Tim Pengembangan Regional.', 'Bertugas mingguan, memperlengkapi tim lokal (on-job training), dan melahirkan pemimpin lokal.'],
] as const;

export const PERINTISAN_TARGET_REGIONAL_ROWS = [
  {
    act: 'Review & Fellowship',
    freq: '2 Minggu Sekali',
    tone: 'brand' as const,
    desc: 'Evaluasi operasional berkala dan membangun relasi hangat tim.',
  },
  {
    act: 'Komunikasi Berkala',
    freq: 'Berkelanjutan',
    tone: 'indigo' as const,
    desc: 'Menjaga keselarasan info antara regional & tim perintisan.',
  },
  {
    act: 'Arahan & Motivasi',
    freq: 'Rutin',
    tone: 'emerald' as const,
    desc: 'Menguatkan mental, semangat, dan visi tim di lapangan.',
  },
  {
    act: 'Pemantauan Langsung',
    freq: '1 Bulan Sekali',
    tone: 'brand' as const,
    desc: 'Kunjungan/evaluasi langsung ke lokasi termasuk pasca perintisan.',
  },
];

export const PERINTISAN_MILESTONE_ROWS = [
  {
    aspect: 'SDM',
    tone: 'brand' as const,
    m1: 'Rekrutmen jemaat lokal, pelatihan dasar, shadowing bersama tim regional, dan pembentukan kebiasaan disiplin.',
    m2: 'Tim lokal bertugas mandiri secara penuh; calon koordinator/leader lokal telah teridentifikasi dan mulai memimpin.',
  },
  {
    aspect: 'Administrasi',
    tone: 'indigo' as const,
    m1: 'Pengenalan format jadwal pelayanan, absensi, inventaris alat dasar, dan alur pelaporan ke regional.',
    m2: 'Tim lokal mengelola penjadwalan, absensi, dan laporan inventaris secara mandiri dan tertib setiap bulan.',
  },
  {
    aspect: 'Teknikal',
    tone: 'emerald' as const,
    m1: 'Setup instalasi ruang ibadah, penguasaan Text Operator, proyektor/display, dan dokumentasi ibadah dasar.',
    m2: 'Tim lokal mampu menangani setup, operasional live, troubleshooting dasar, dan perawatan alat secara mandiri.',
  },
];
