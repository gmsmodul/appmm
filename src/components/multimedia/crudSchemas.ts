import { CrudEntityType, DetailContentBlock } from '../../types';

export interface CrudFieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  rows?: number;
  halfWidth?: boolean;
  options?: Array<{ value: string; label: string }>;
}

export interface CrudEntitySchema {
  entity: CrudEntityType;
  sectionBadge: string;
  createTitle: string;
  editTitle: string;
  fields: CrudFieldDef[];
}

const TONE_OPTIONS_ALL = [
  { value: 'brand', label: 'Rose (Brand)' },
  { value: 'blue', label: 'Biru' },
  { value: 'indigo', label: 'Indigo' },
  { value: 'purple', label: 'Ungu' },
  { value: 'emerald', label: 'Hijau Emerald' },
  { value: 'teal', label: 'Teal' },
  { value: 'amber', label: 'Kuning / Amber' },
  { value: 'red', label: 'Merah' },
];

const TONE_OPTIONS_SOFT = [
  { value: 'brand', label: 'Rose (Brand)' },
  { value: 'indigo', label: 'Indigo' },
  { value: 'emerald', label: 'Hijau Emerald' },
  { value: 'amber', label: 'Kuning / Amber' },
];

const PILLAR_ICON_OPTIONS = [
  { value: 'shield', label: 'Perisai (System)' },
  { value: 'wrench', label: 'Kunci Pas (Tools)' },
  { value: 'graduation', label: 'Toga (Advancement)' },
  { value: 'heart', label: 'Hati (Relations)' },
  { value: 'sprout', label: 'Tunas (Servolution)' },
];

const RULE_ICON_OPTIONS = [
  { value: 'file', label: 'Dokumen' },
  { value: 'clock', label: 'Jam / Waktu' },
  { value: 'shirt', label: 'Seragam / Grooming' },
  { value: 'headset', label: 'Headset / Komunikasi' },
  { value: 'clipboard', label: 'Clipboard / Ceklist' },
  { value: 'scale', label: 'Timbangan / Aturan' },
  { value: 'stairs', label: 'Jenjang' },
  { value: 'comments', label: 'Evaluasi / Feedback' },
  { value: 'heartHand', label: 'Komitmen' },
];

const SOP_ICON_OPTIONS = [
  { value: 'fileCheck', label: 'Dokumen SOP' },
  { value: 'userTie', label: 'Director / Lead' },
  { value: 'boxes', label: 'Logistik / Box' },
  { value: 'clapperboard', label: 'Produksi / Video' },
  { value: 'hand', label: 'Floor Director' },
  { value: 'sliders', label: 'Technical / Switcher' },
  { value: 'broadcast', label: 'Broadcast / Stream' },
  { value: 'display', label: 'Display / LED' },
  { value: 'type', label: 'Text Operator' },
  { value: 'video', label: 'Kamera Video' },
  { value: 'camera', label: 'Fotografi' },
  { value: 'tripod', label: 'Tripod / Rigging' },
  { value: 'headset', label: 'Clearcom / Audio' },
  { value: 'shield', label: 'Keamanan / Etika' },
];

const WIPR_ICON_OPTIONS = [
  { value: 'clipboardCheck', label: 'Checklist / SOP' },
  { value: 'megaphone', label: 'Pengumuman' },
  { value: 'database', label: 'Database / Arsip' },
  { value: 'package', label: 'Peminjaman / Paket' },
  { value: 'laptop', label: 'Laptop / Editing' },
  { value: 'cart', label: 'Pengadaan / PO' },
  { value: 'graduation', label: 'Training / Workshop' },
  { value: 'shield', label: 'Standar / Kepatuhan' },
];

export const CRUD_ENTITY_SCHEMAS: Record<CrudEntityType, CrudEntitySchema> = {
  overviewTagline: {
    entity: 'overviewTagline',
    sectionBadge: 'Overview',
    createTitle: 'Atur Tagline Utama',
    editTitle: 'Edit Tagline GMS Multimedia',
    fields: [
      { key: 'badge', label: 'Label Badge', type: 'text', required: true },
      { key: 'quote', label: 'Tagline Utama', type: 'text', required: true },
      { key: 'desc', label: 'Keterangan di Bawah Tagline', type: 'textarea', rows: 4, required: true },
    ],
  },
  pillar: {
    entity: 'pillar',
    sectionBadge: 'Overview — Bidang Ekosistem',
    createTitle: 'Tambah Bidang Ekosistem',
    editTitle: 'Edit Bidang Ekosistem',
    fields: [
      { key: 'name', label: 'Nama Bidang', type: 'text', required: true, halfWidth: true, placeholder: 'System / Tools' },
      {
        key: 'group',
        label: 'Kelompok Bagian',
        type: 'text',
        required: true,
        halfWidth: true,
        placeholder: 'Operasional & Infrastruktur Teknis',
      },
      { key: 'role', label: 'Peran / Subjudul', type: 'text', required: true },
      { key: 'tone', label: 'Warna Badge', type: 'select', halfWidth: true, options: TONE_OPTIONS_ALL },
      { key: 'iconKey', label: 'Ikon', type: 'select', halfWidth: true, options: PILLAR_ICON_OPTIONS },
      { key: 'responsibility', label: 'Tanggung Jawab Utama', type: 'textarea', rows: 2, required: true },
      {
        key: 'jobdesk',
        label: 'Job Desk Utama (1 baris = 1 poin)',
        type: 'textarea',
        rows: 4,
      },
      { key: 'baseSop', label: 'Contoh SOP Dasar', type: 'textarea', rows: 3 },
    ],
  },
  orgNodeV2: {
    entity: 'orgNodeV2',
    sectionBadge: 'Struktur Organisasi V2',
    createTitle: 'Tambah Posisi Struktur V2',
    editTitle: 'Edit Posisi Struktur V2',
    fields: [
      { key: 'title', label: 'Nama Posisi / Unit', type: 'text', required: true },
      { key: 'section', label: 'Kelompok Bagian', type: 'text', required: true, halfWidth: true },
      { key: 'unit', label: 'Kode / Unit', type: 'text', required: true, halfWidth: true },
      { key: 'badge', label: 'Badge Peran', type: 'text', halfWidth: true },
      {
        key: 'tone',
        label: 'Warna',
        type: 'select',
        halfWidth: true,
        options: [
          ...TONE_OPTIONS_ALL,
          { value: 'sky', label: 'Sky Blue' },
          { value: 'slate', label: 'Slate' },
          { value: 'lime', label: 'Lime' },
        ],
      },
      { key: 'summary', label: 'Ringkasan Peran', type: 'textarea', rows: 2, required: true },
      { key: 'duties', label: 'Job Desk & Kewenangan (1 baris = 1 poin)', type: 'textarea', rows: 4 },
      { key: 'baseSop', label: 'Dasar SOP (Opsional)', type: 'textarea', rows: 2 },
    ],
  },
  orgNodeV1: {
    entity: 'orgNodeV1',
    sectionBadge: 'Struktur Organisasi V1',
    createTitle: 'Tambah Posisi Struktur V1',
    editTitle: 'Edit Posisi Struktur V1',
    fields: [
      { key: 'title', label: 'Nama Posisi / Unit', type: 'text', required: true },
      { key: 'section', label: 'Kelompok Bagian', type: 'text', required: true, halfWidth: true },
      { key: 'unit', label: 'Kode / Unit', type: 'text', required: true, halfWidth: true },
      { key: 'badge', label: 'Badge Peran', type: 'text', halfWidth: true },
      {
        key: 'tone',
        label: 'Warna',
        type: 'select',
        halfWidth: true,
        options: [
          ...TONE_OPTIONS_ALL,
          { value: 'sky', label: 'Sky Blue' },
          { value: 'slate', label: 'Slate' },
          { value: 'lime', label: 'Lime' },
        ],
      },
      { key: 'summary', label: 'Ringkasan Peran', type: 'textarea', rows: 2, required: true },
      { key: 'duties', label: 'Job Desk & Kewenangan (1 baris = 1 poin)', type: 'textarea', rows: 4 },
      { key: 'baseSop', label: 'Dasar SOP (Opsional)', type: 'textarea', rows: 2 },
    ],
  },
  regional: {
    entity: 'regional',
    sectionBadge: 'Hierarki Sinodal — Regional',
    createTitle: 'Tambah Regional GMS',
    editTitle: 'Edit Data Regional GMS',
    fields: [
      { key: 'no', label: 'Nomor', type: 'text', required: true, halfWidth: true, placeholder: '09' },
      { key: 'center', label: 'Kota Pusat', type: 'text', required: true, halfWidth: true, placeholder: 'Surabaya' },
      { key: 'name', label: 'Nama Regional', type: 'text', required: true, placeholder: 'GMS Regional ...' },
      { key: 'desc', label: 'Cakupan Wilayah & Mandat', type: 'textarea', rows: 3, required: true },
    ],
  },
  churchCat: {
    entity: 'churchCat',
    sectionBadge: 'Klasifikasi Gereja Lokal',
    createTitle: 'Tambah Kategori Gereja',
    editTitle: 'Edit Kategori Gereja',
    fields: [
      { key: 'cat', label: 'Kode Kategori', type: 'text', required: true, halfWidth: true, placeholder: 'F' },
      { key: 'label', label: 'Label Ukuran', type: 'text', required: true, halfWidth: true, placeholder: 'Mega' },
      { key: 'statusGereja', label: 'Status Gereja', type: 'text', required: true, halfWidth: true },
      { key: 'capacity', label: 'Kapasitas Jemaat', type: 'text', required: true, halfWidth: true },
      { key: 'staffMM', label: 'Standar Staff MM', type: 'text', required: true, halfWidth: true },
      { key: 'relawan', label: 'Standar Relawan', type: 'text', required: true, halfWidth: true },
      { key: 'building', label: 'Gedung & Ruang Ibadah', type: 'textarea', rows: 2 },
      { key: 'otherRoomEquip', label: 'Ruang Lain & Perangkat', type: 'textarea', rows: 2 },
      { key: 'equip', label: 'Perangkat Minimal', type: 'textarea', rows: 2, required: true },
    ],
  },
  pilarMap: {
    entity: 'pilarMap',
    sectionBadge: 'Pemetaan ke Struktur Resmi',
    createTitle: 'Tambah Item Pemetaan',
    editTitle: 'Edit Pemetaan Bidang',
    fields: [
      { key: 'pilar', label: 'Nama Bidang', type: 'text', required: true },
      { key: 'unit', label: 'Pengemban Tugas di Bagan Resmi', type: 'text', required: true },
      { key: 'focus', label: 'Fokus Mandat & Dokumen Terkait', type: 'textarea', rows: 3, required: true },
    ],
  },
  level: {
    entity: 'level',
    sectionBadge: 'Jenjang Karier & Leveling',
    createTitle: 'Tambah Jenjang Karier',
    editTitle: 'Edit Jenjang Karier',
    fields: [
      { key: 'grade', label: 'Grade', type: 'text', required: true, halfWidth: true, placeholder: 'Bintang 5' },
      { key: 'role', label: 'Status / Peran', type: 'text', required: true, halfWidth: true },
      { key: 'msj', label: 'Syarat MSJ', type: 'text', required: true, halfWidth: true },
      { key: 'duration', label: 'Masa Tugas', type: 'text', required: true, halfWidth: true },
      { key: 'attendance', label: 'Minimal Kehadiran', type: 'text', halfWidth: true },
      {
        key: 'tone',
        label: 'Warna Badge',
        type: 'select',
        halfWidth: true,
        options: [
          { value: 'gray', label: 'Abu-abu' },
          { value: 'blue', label: 'Biru' },
          { value: 'indigo', label: 'Indigo' },
          { value: 'purple', label: 'Ungu' },
          { value: 'brand', label: 'Rose (Brand)' },
        ],
      },
      { key: 'modul', label: 'Modul Wajib', type: 'text', required: true },
      { key: 'scope', label: 'Lingkup Wewenang', type: 'text', required: true },
      { key: 'filosofis', label: 'Landasan Filosofis', type: 'textarea', rows: 2 },
      { key: 'objektif', label: 'Objektif Jenjang', type: 'textarea', rows: 2 },
      { key: 'spesifikasi', label: 'Spesifikasi Tugas (1 baris = 1 poin)', type: 'textarea', rows: 4 },
    ],
  },
  rule: {
    entity: 'rule',
    sectionBadge: 'Panduan — Rules, Etika & Komitmen',
    createTitle: 'Tambah Aturan / Komitmen Baru',
    editTitle: 'Edit Dokumen Aturan / Komitmen',
    fields: [
      { key: 'title', label: 'Judul Aturan / Etika / Komitmen', type: 'text', required: true },
      {
        key: 'category',
        label: 'Kategori',
        type: 'text',
        required: true,
        halfWidth: true,
        placeholder: 'Kedisiplinan & Penampilan / Tata Tertib Ruang & Aset / Value & Komitmen',
      },
      { key: 'type', label: 'Tipe Badge', type: 'text', required: true, halfWidth: true, placeholder: 'ATURAN / KOMITMEN' },
      { key: 'tone', label: 'Warna Badge', type: 'select', halfWidth: true, options: TONE_OPTIONS_ALL },
      { key: 'iconKey', label: 'Ikon', type: 'select', halfWidth: true, options: RULE_ICON_OPTIONS },
      { key: 'summary', label: 'Ringkasan Standar', type: 'textarea', rows: 2, required: true },
      { key: 'bodyLines', label: 'Isi Lengkap / Poin Aturan (1 baris = 1 poin)', type: 'textarea', rows: 5 },
    ],
  },
  sop: {
    entity: 'sop',
    sectionBadge: 'Panduan — SOP Operasional (V5)',
    createTitle: 'Tambah Modul SOP Operasional',
    editTitle: 'Edit Modul SOP Operasional',
    fields: [
      { key: 'num', label: 'Nomor Modul', type: 'text', required: true, halfWidth: true, placeholder: '21' },
      { key: 'section', label: 'Kode Bagian', type: 'text', required: true, halfWidth: true, placeholder: 'I / II / VI / VII' },
      { key: 'sectionTitle', label: 'Judul Bagian', type: 'text', required: true, placeholder: 'Bagian I: Struktur Organisasi & Manajemen Aset' },
      { key: 'title', label: 'Nama Modul / Peran', type: 'text', required: true },
      { key: 'type', label: 'Tipe', type: 'text', required: true, halfWidth: true, placeholder: 'SOP / JOBDESK' },
      { key: 'tone', label: 'Warna Badge', type: 'select', halfWidth: true, options: TONE_OPTIONS_ALL },
      { key: 'iconKey', label: 'Ikon', type: 'select', options: SOP_ICON_OPTIONS },
      { key: 'summary', label: 'Ringkasan Standar', type: 'textarea', rows: 2, required: true },
      { key: 'bodyLines', label: 'Isi Standar & Prosedur (1 baris = 1 poin)', type: 'textarea', rows: 5 },
    ],
  },
  jabatan: {
    entity: 'jabatan',
    sectionBadge: 'Platform GMS II — Jabatan',
    createTitle: 'Tambah Deskripsi Jabatan',
    editTitle: 'Edit Deskripsi Jabatan',
    fields: [
      { key: 'num', label: 'Nomor', type: 'text', required: true, halfWidth: true, placeholder: '06' },
      { key: 'pages', label: 'Halaman PDF', type: 'text', halfWidth: true, placeholder: '31–32' },
      { key: 'title', label: 'Nama Jabatan', type: 'text', required: true },
      { key: 'nature', label: 'Sifat Jabatan', type: 'text', required: true, placeholder: 'Full Time' },
      { key: 'desc', label: 'Tanggung Jawab Inti', type: 'textarea', rows: 2, required: true },
      { key: 'deskripsiUmum', label: '1. Deskripsi Umum (1 baris = 1 poin)', type: 'textarea', rows: 3 },
      { key: 'deskripsiDetail', label: '2. Deskripsi Detail (1 baris = 1 poin)', type: 'textarea', rows: 4 },
      { key: 'tujuanProduk', label: '3. Tujuan / Produk Kerja (1 baris = 1 poin)', type: 'textarea', rows: 3 },
      { key: 'kualifikasi', label: '4. Kualifikasi', type: 'textarea', rows: 2 },
    ],
  },
  gms2Pengantar: {
    entity: 'gms2Pengantar',
    sectionBadge: 'Platform GMS II — Pengantar & Objektif',
    createTitle: 'Tambah Poin Pengantar / Dasar Platform',
    editTitle: 'Edit Poin Pengantar / Dasar Platform',
    fields: [
      { key: 'section', label: 'Nama Bagian', type: 'text', required: true, halfWidth: true, placeholder: 'Pengantar & Mandat' },
      { key: 'pages', label: 'Halaman PDF', type: 'text', required: true, halfWidth: true, placeholder: 'Hal. 2–3' },
      {
        key: 'tone',
        label: 'Warna Aksen',
        type: 'select',
        options: [
          { value: 'brand', label: 'Rose (Brand)' },
          { value: 'indigo', label: 'Indigo' },
          { value: 'emerald', label: 'Hijau Emerald' },
          { value: 'neutral', label: 'Netral' },
        ],
      },
      { key: 'desc', label: 'Isi Resmi Platform GMS II Rev II', type: 'textarea', rows: 4, required: true },
    ],
  },
  gms2Servolution: {
    entity: 'gms2Servolution',
    sectionBadge: 'Platform GMS II — Servolution (Hal. 30–37)',
    createTitle: 'Tambah Komponen / Materi Servolution',
    editTitle: 'Edit Komponen / Materi Servolution',
    fields: [
      { key: 'component', label: 'Komponen / Materi', type: 'text', required: true, halfWidth: true, placeholder: 'Materi 6: ...' },
      { key: 'pages', label: 'Halaman PDF', type: 'text', required: true, halfWidth: true, placeholder: 'Hal. 37' },
      {
        key: 'tone',
        label: 'Warna Badge',
        type: 'select',
        options: [
          { value: 'brand', label: 'Rose (Brand)' },
          { value: 'indigo', label: 'Indigo' },
          { value: 'amber', label: 'Amber' },
          { value: 'emerald', label: 'Hijau Emerald' },
          { value: 'neutral', label: 'Netral' },
        ],
      },
      { key: 'desc', label: 'Ketentuan / Materi Resmi', type: 'textarea', rows: 4, required: true },
    ],
  },
  gms2Prinsip: {
    entity: 'gms2Prinsip',
    sectionBadge: 'Platform GMS II — Prinsip & Akuntabilitas (Hal. 58–59)',
    createTitle: 'Tambah Prinsip / Aspek Akuntabilitas',
    editTitle: 'Edit Prinsip / Aspek Akuntabilitas',
    fields: [
      { key: 'code', label: 'Kode', type: 'text', required: true, halfWidth: true, placeholder: 'P-07 / A-04' },
      {
        key: 'group',
        label: 'Kelompok',
        type: 'select',
        halfWidth: true,
        options: [
          { value: '6 Prinsip Pengadaan (Hal. 58)', label: '6 Prinsip Pengadaan (Hal. 58)' },
          { value: '3 Aspek Akuntabilitas (Hal. 58–59)', label: '3 Aspek Akuntabilitas (Hal. 58–59)' },
        ],
      },
      { key: 'title', label: 'Judul Prinsip / Aspek', type: 'text', required: true, halfWidth: true },
      {
        key: 'tone',
        label: 'Warna Badge',
        type: 'select',
        halfWidth: true,
        options: [
          { value: 'brand', label: 'Rose (Brand)' },
          { value: 'indigo', label: 'Indigo' },
          { value: 'blue', label: 'Biru' },
          { value: 'emerald', label: 'Hijau Emerald' },
          { value: 'purple', label: 'Ungu' },
          { value: 'amber', label: 'Amber' },
        ],
      },
      { key: 'desc', label: 'Penjelasan Resmi', type: 'textarea', rows: 3, required: true },
    ],
  },
  gms2Form: {
    entity: 'gms2Form',
    sectionBadge: 'Platform GMS II — Formulir Lampiran (Hal. 72–78)',
    createTitle: 'Tambah Formulir Lampiran Resmi',
    editTitle: 'Edit Formulir Lampiran Resmi',
    fields: [
      { key: 'code', label: 'Kode Formulir', type: 'text', required: true, halfWidth: true, placeholder: 'FM-GMS-SIN-M2M-07' },
      { key: 'type', label: 'Jenis', type: 'text', required: true, halfWidth: true, placeholder: 'FORM' },
      { key: 'title', label: 'Nama Formulir Resmi', type: 'text', required: true },
      { key: 'tone', label: 'Warna Badge', type: 'select', halfWidth: true, options: TONE_OPTIONS_ALL },
      { key: 'iconKey', label: 'Ikon', type: 'select', halfWidth: true, options: WIPR_ICON_OPTIONS },
      { key: 'summary', label: 'Ringkasan Fungsi & Acuan WI/PR', type: 'textarea', rows: 2, required: true },
      { key: 'bodyLines', label: 'Isian Wajib & Ketentuan (1 baris = 1 poin)', type: 'textarea', rows: 5 },
    ],
  },
  ws1Video: {
    entity: 'ws1Video',
    sectionBadge: 'Platform GMS II — WS Lv.1 Video',
    createTitle: 'Tambah Pertemuan WS1 Video',
    editTitle: 'Edit Pertemuan WS1 Video',
    fields: [
      { key: 'week', label: 'Pertemuan', type: 'text', required: true, placeholder: 'Minggu 8' },
      { key: 'title', label: 'Topik Materi', type: 'text', required: true },
      { key: 'desc', label: 'Target Kompetensi & Ujian', type: 'textarea', rows: 3, required: true },
    ],
  },
  ws1Photo: {
    entity: 'ws1Photo',
    sectionBadge: 'Platform GMS II — WS Lv.1 Photo',
    createTitle: 'Tambah Pertemuan WS1 Photography',
    editTitle: 'Edit Pertemuan WS1 Photography',
    fields: [
      { key: 'week', label: 'Pertemuan', type: 'text', required: true, placeholder: 'Minggu 6' },
      { key: 'title', label: 'Topik Materi', type: 'text', required: true },
      { key: 'desc', label: 'Target Kompetensi', type: 'textarea', rows: 3, required: true },
    ],
  },
  ws2Module: {
    entity: 'ws2Module',
    sectionBadge: 'Platform GMS II — Workshop Lv.2 & Reguler',
    createTitle: 'Tambah Modul Workshop Lv.2',
    editTitle: 'Edit Modul Workshop Lv.2',
    fields: [
      { key: 'title', label: 'Nama Program / Modul', type: 'text', required: true },
      { key: 'desc', label: 'Deskripsi Pelaksanaan', type: 'textarea', rows: 3, required: true },
    ],
  },
  sinodalDef: {
    entity: 'sinodalDef',
    sectionBadge: 'Platform GMS II — Pengelolaan Kantor',
    createTitle: 'Tambah Definisi Organisasi / TPS',
    editTitle: 'Edit Definisi Organisasi / TPS',
    fields: [
      { key: 'title', label: 'Judul Definisi', type: 'text', required: true },
      {
        key: 'tone',
        label: 'Warna Kartu',
        type: 'select',
        options: [
          { value: 'neutral', label: 'Netral' },
          { value: 'brand', label: 'Rose (Brand)' },
          { value: 'emerald', label: 'Hijau Emerald' },
        ],
      },
      { key: 'desc', label: 'Isi Penjelasan', type: 'textarea', rows: 4, required: true },
    ],
  },
  tpsStep: {
    entity: 'tpsStep',
    sectionBadge: 'Platform GMS II — Pengadaan TPS',
    createTitle: 'Tambah Langkah Pengadaan TPS',
    editTitle: 'Edit Langkah Pengadaan TPS',
    fields: [
      { key: 'step', label: 'Nomor Tahap', type: 'text', required: true, halfWidth: true, placeholder: '15' },
      { key: 'title', label: 'Nama Proses', type: 'text', required: true, halfWidth: true },
      { key: 'desc', label: 'Penanggung Jawab & Prosedur', type: 'textarea', rows: 3, required: true },
    ],
  },
  wipr: {
    entity: 'wipr',
    sectionBadge: 'Platform GMS II — Lampiran WI / PR',
    createTitle: 'Tambah Lampiran WI / PR',
    editTitle: 'Edit Lampiran WI / PR',
    fields: [
      { key: 'code', label: 'Kode Dokumen', type: 'text', required: true, halfWidth: true, placeholder: 'WI-08' },
      {
        key: 'type',
        label: 'Jenis',
        type: 'select',
        halfWidth: true,
        options: [
          { value: 'WI', label: 'WI (Work Instruction)' },
          { value: 'PR', label: 'PR (Prosedur)' },
        ],
      },
      { key: 'title', label: 'Judul Prosedur / Instruksi Kerja', type: 'text', required: true },
      { key: 'tone', label: 'Warna Badge', type: 'select', halfWidth: true, options: TONE_OPTIONS_ALL },
      { key: 'iconKey', label: 'Ikon', type: 'select', halfWidth: true, options: WIPR_ICON_OPTIONS },
      { key: 'summary', label: 'Ringkasan Isi & Deadline', type: 'textarea', rows: 2, required: true },
      { key: 'bodyLines', label: 'Langkah / Ketentuan Lengkap (1 baris = 1 poin)', type: 'textarea', rows: 5 },
    ],
  },
  bsValue: {
    entity: 'bsValue',
    sectionBadge: 'Buku Saku — Nilai Dasar',
    createTitle: 'Tambah Nilai Dasar Pelayan',
    editTitle: 'Edit Nilai Dasar Pelayan',
    fields: [
      { key: 'num', label: 'Nomor', type: 'text', required: true, halfWidth: true, placeholder: '06' },
      { key: 'name', label: 'Nilai Dasar', type: 'text', required: true, halfWidth: true },
      { key: 'desc', label: 'Penjelasan Makna', type: 'textarea', rows: 3, required: true },
    ],
  },
  crewChief: {
    entity: 'crewChief',
    sectionBadge: 'Buku Saku — Timeline Crew Chief',
    createTitle: 'Tambah Fase Timeline Crew Chief',
    editTitle: 'Edit Fase Timeline Crew Chief',
    fields: [
      { key: 'time', label: 'Waktu / Momen', type: 'text', required: true, halfWidth: true, placeholder: 'H-45 Menit' },
      { key: 'phase', label: 'Fase Kerja', type: 'text', required: true, halfWidth: true },
      { key: 'desc', label: 'Tugas & Tanggung Jawab', type: 'textarea', rows: 3, required: true },
    ],
  },
  ministryRole: {
    entity: 'ministryRole',
    sectionBadge: 'Buku Saku — Bidang Team Ministry',
    createTitle: 'Tambah Bidang Team Ministry',
    editTitle: 'Edit Bidang Team Ministry',
    fields: [
      { key: 'num', label: 'Nomor', type: 'text', required: true, halfWidth: true, placeholder: '18' },
      { key: 'group', label: 'Kategori Tim', type: 'text', required: true, halfWidth: true, placeholder: 'Visual / Kamera / Audio' },
      { key: 'name', label: 'Nama Bidang', type: 'text', required: true },
      { key: 'req', label: 'Syarat & Kualifikasi', type: 'textarea', rows: 2, required: true },
      { key: 'duties', label: 'Tugas Utama di Lapangan', type: 'textarea', rows: 3, required: true },
    ],
  },
  leaderDiv: {
    entity: 'leaderDiv',
    sectionBadge: 'Buku Saku — Struktur Team Leader',
    createTitle: 'Tambah Divisi Team Leader',
    editTitle: 'Edit Divisi Team Leader',
    fields: [
      { key: 'name', label: 'Nama Divisi Leader', type: 'text', required: true },
      { key: 'scope', label: 'Cakupan Tim', type: 'text', required: true, halfWidth: true },
      {
        key: 'tone',
        label: 'Warna Badge',
        type: 'select',
        halfWidth: true,
        options: [
          { value: 'purple', label: 'Ungu' },
          { value: 'amber', label: 'Amber' },
          { value: 'emerald', label: 'Hijau Emerald' },
          { value: 'brand', label: 'Rose' },
          { value: 'blue', label: 'Biru' },
        ],
      },
      { key: 'desc', label: 'Tugas & Tanggung Jawab Utama', type: 'textarea', rows: 3, required: true },
    ],
  },
  perintisanProfil: {
    entity: 'perintisanProfil',
    sectionBadge: 'Workshop Perintisan — Profil & Prasyarat',
    createTitle: 'Tambah Poin Profil & Prasyarat',
    editTitle: 'Edit Profil & Prasyarat',
    fields: [
      { key: 'label', label: 'Label Poin', type: 'text', required: true, halfWidth: true },
      { key: 'tone', label: 'Warna Badge', type: 'select', halfWidth: true, options: TONE_OPTIONS_SOFT },
      { key: 'desc', label: 'Deskripsi Lengkap', type: 'textarea', rows: 3, required: true },
    ],
  },
  perintisanMateri: {
    entity: 'perintisanMateri',
    sectionBadge: 'Workshop Perintisan — Kurikulum Materi',
    createTitle: 'Tambah Materi Perintisan',
    editTitle: 'Edit Materi Perintisan',
    fields: [
      { key: 'code', label: 'Kode Materi', type: 'text', required: true, halfWidth: true, placeholder: 'MATERI 5' },
      { key: 'title', label: 'Judul Materi', type: 'text', required: true, halfWidth: true },
      { key: 'desc', label: 'Fokus Pembelajaran', type: 'textarea', rows: 3, required: true },
    ],
  },
  perintisanMetode: {
    entity: 'perintisanMetode',
    sectionBadge: 'Workshop Perintisan — Perbandingan Metode',
    createTitle: 'Tambah Aspek Perbandingan Metode',
    editTitle: 'Edit Aspek Perbandingan Metode',
    fields: [
      { key: 'aspect', label: 'Aspek Pembanding', type: 'text', required: true },
      { key: 'm1', label: 'Metode 1: Pembekalan Tim Lokal', type: 'textarea', rows: 3, required: true },
      { key: 'm2', label: 'Metode 2: Pengutusan Tim Regional', type: 'textarea', rows: 3, required: true },
    ],
  },
  perintisanTarget: {
    entity: 'perintisanTarget',
    sectionBadge: 'Workshop Perintisan — Target Regional',
    createTitle: 'Tambah Target Pendampingan Regional',
    editTitle: 'Edit Target Pendampingan Regional',
    fields: [
      { key: 'act', label: 'Aktivitas', type: 'text', required: true },
      { key: 'freq', label: 'Frekuensi', type: 'text', required: true, halfWidth: true },
      { key: 'tone', label: 'Warna Badge', type: 'select', halfWidth: true, options: TONE_OPTIONS_SOFT },
      { key: 'desc', label: 'Tujuan Pendampingan', type: 'textarea', rows: 3, required: true },
    ],
  },
  perintisanMilestone: {
    entity: 'perintisanMilestone',
    sectionBadge: 'Workshop Perintisan — Milestone 1–12 Bulan',
    createTitle: 'Tambah Aspek Milestone',
    editTitle: 'Edit Aspek Milestone',
    fields: [
      { key: 'aspect', label: 'Aspek', type: 'text', required: true, halfWidth: true },
      { key: 'tone', label: 'Warna Badge', type: 'select', halfWidth: true, options: TONE_OPTIONS_SOFT },
      { key: 'm1', label: 'Bulan 1 – 6 (Fondasi & Shadowing)', type: 'textarea', rows: 3, required: true },
      { key: 'm2', label: 'Bulan 6 – 12 (Kemandirian & Estafet)', type: 'textarea', rows: 3, required: true },
    ],
  },
  camMatrix: {
    entity: 'camMatrix',
    sectionBadge: 'Referensi Cepat — Matriks Kamera',
    createTitle: 'Tambah Posisi Kamera',
    editTitle: 'Edit Posisi Kamera',
    fields: [
      { key: 'cam', label: 'Kode Kamera', type: 'text', required: true, halfWidth: true, placeholder: 'CAM 10' },
      { key: 'rig', label: 'Rig / Mount', type: 'text', required: true, halfWidth: true },
      { key: 'lens', label: 'Lensa / Gear', type: 'text', required: true, halfWidth: true },
      {
        key: 'tone',
        label: 'Warna Badge',
        type: 'select',
        halfWidth: true,
        options: [
          { value: 'brand', label: 'Rose' },
          { value: 'indigo', label: 'Indigo' },
          { value: 'blue', label: 'Biru' },
          { value: 'purple', label: 'Ungu' },
          { value: 'amber', label: 'Amber' },
          { value: 'emerald', label: 'Emerald' },
        ],
      },
      { key: 'notes', label: 'Tugas Utama & Framing', type: 'textarea', rows: 3, required: true },
    ],
  },
  fdSignal: {
    entity: 'fdSignal',
    sectionBadge: 'Referensi Cepat — Isyarat Tangan FD',
    createTitle: 'Tambah Isyarat Tangan FD',
    editTitle: 'Edit Isyarat Tangan FD',
    fields: [
      { key: 'code', label: 'Kode Isyarat', type: 'text', required: true, placeholder: 'FD-11' },
      { key: 'gesture', label: 'Gerakan Tangan', type: 'text', required: true },
      { key: 'meaning', label: 'Arti / Tindakan', type: 'textarea', rows: 2, required: true },
    ],
  },
};

export function splitLines(raw: string): string[] {
  return raw
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function blocksToEditableText(blocks: DetailContentBlock[]): string {
  const lines: string[] = [];
  blocks.forEach((b) => {
    if (b.kind === 'paragraph') {
      lines.push(b.text);
    } else if (b.kind === 'callout') {
      if (b.text) lines.push(b.text);
      b.items?.forEach((item) => {
        lines.push(item.lead ? `${item.lead}: ${item.text}` : item.text);
      });
    } else if (b.kind === 'list') {
      b.items.forEach((item) => {
        lines.push(item.lead ? `${item.lead}: ${item.text}` : item.text);
      });
    }
  });
  return lines.join('\n');
}

export function editableTextToBlocks(
  rawText: string,
  fallbackSummary: string,
  existingBlocks?: DetailContentBlock[]
): DetailContentBlock[] {
  const parsedLines = splitLines(rawText);
  const preservedSpecials = (existingBlocks || []).filter(
    (b) => b.kind === 'fdSignalsTable' || b.kind === 'camMatrixTable' || b.kind === 'metaBox'
  );

  const mainBlocks: DetailContentBlock[] =
    parsedLines.length > 0
      ? [
          {
            kind: 'list',
            items: parsedLines.map((line) => {
              const colonIdx = line.indexOf(':');
              if (colonIdx > 1 && colonIdx < 36) {
                return {
                  lead: line.slice(0, colonIdx).trim(),
                  text: line.slice(colonIdx + 1).trim(),
                };
              }
              return { text: line };
            }),
          },
        ]
      : [{ kind: 'paragraph', text: fallbackSummary }];

  return [...mainBlocks, ...preservedSpecials];
}
