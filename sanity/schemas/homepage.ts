import { defineField, defineType } from 'sanity'
import { createElement } from 'react'

const HomeIcon = () =>
  createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, width: '1em', height: '1em' },
    createElement('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
    createElement('polyline', { points: '9 22 9 12 15 12 15 22' })
  )

export const homepage = defineType({
  name: 'homepage',
  title: 'Halaman Utama (Homepage)',
  type: 'document',
  icon: HomeIcon,
  fieldsets: [
    { name: 'hero', title: 'Hero Section', options: { collapsible: true, collapsed: false } },
    { name: 'problem', title: 'Problem / Filosofi Section', options: { collapsible: true, collapsed: true } },
    { name: 'solution', title: 'Solusi Section', options: { collapsible: true, collapsed: true } },
    { name: 'useCase', title: 'Use Case Section', options: { collapsible: true, collapsed: true } },
    { name: 'trust', title: 'Trust / Keamanan Section', options: { collapsible: true, collapsed: true } },
    { name: 'partners', title: 'Partners Section', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // Hidden title for singleton
    defineField({
      name: 'title',
      title: 'Judul Dokumen',
      type: 'string',
      initialValue: 'Halaman Utama Epigrap',
      readOnly: true,
      hidden: true,
    }),

    // ═══════════════════════════════════════
    // HERO SECTION
    // ═══════════════════════════════════════
    defineField({
      name: 'heroHeadline',
      title: 'Headline Utama',
      type: 'string',
      fieldset: 'hero',
      description: 'Baris pertama headline. Contoh: "Mengubah Monumen Bisu"',
      initialValue: 'Mengubah Monumen Bisu',
    }),
    defineField({
      name: 'heroHeadlineAccent',
      title: 'Headline Aksen (Warna Emas)',
      type: 'string',
      fieldset: 'hero',
      description: 'Baris kedua headline yang berwarna emas. Contoh: "Menjadi Portal Ruang & Waktu."',
      initialValue: 'Menjadi Portal Ruang & Waktu.',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Sub-teks Hero',
      type: 'text',
      rows: 3,
      fieldset: 'hero',
      initialValue: 'Platform Phygital premium yang menyulap tugu, prasasti fisik, dan karya seni menjadi arsip digital interaktif tanpa batas. Hadirkan pariwisata cerdas dan pelestarian budaya dalam satu pindaian.',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Foto Background Hero',
      type: 'image',
      fieldset: 'hero',
      options: { hotspot: true },
      description: 'Upload gambar landscape berkualitas tinggi. Jika kosong, akan pakai default.',
    }),
    defineField({
      name: 'heroCta1Text',
      title: 'Tombol CTA 1 — Teks',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Jelajahi Portal',
    }),
    defineField({
      name: 'heroCta1Link',
      title: 'Tombol CTA 1 — Link',
      type: 'string',
      fieldset: 'hero',
      initialValue: '/demo',
    }),
    defineField({
      name: 'heroCta2Text',
      title: 'Tombol CTA 2 — Teks',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Lihat Cara Kerja',
    }),
    defineField({
      name: 'heroCta2Link',
      title: 'Tombol CTA 2 — Link',
      type: 'string',
      fieldset: 'hero',
      initialValue: '#solusi',
    }),

    // ═══════════════════════════════════════
    // PROBLEM SECTION
    // ═══════════════════════════════════════
    defineField({
      name: 'problemTitle',
      title: 'Judul Section',
      type: 'string',
      fieldset: 'problem',
      initialValue: 'Fisik yang Kokoh Tidak Menjamin',
    }),
    defineField({
      name: 'problemTitleAccent',
      title: 'Judul Aksen (Warna Merah)',
      type: 'string',
      fieldset: 'problem',
      initialValue: 'Sejarah yang Utuh.',
    }),
    defineField({
      name: 'problemDesc1',
      title: 'Paragraf 1',
      type: 'text',
      rows: 3,
      fieldset: 'problem',
      initialValue: 'Ribuan situs bersejarah, monumen publik, dan plakat peresmian tergerus waktu. Informasi tentang siapa mereka, nilai sejarah, dan karya seni yang ditinggalkan—semuanya perlahan pudar menjadi batu bisu.',
    }),
    defineField({
      name: 'problemDesc2',
      title: 'Paragraf 2',
      type: 'text',
      rows: 3,
      fieldset: 'problem',
      initialValue: 'Kami percaya bahwa setiap nama memiliki cerita yang layak diabadikan lintas generasi, melampaui pelapukan material.',
    }),
    defineField({
      name: 'problemImageBefore',
      title: 'Gambar "Sebelum" (Prasasti Statis)',
      type: 'image',
      fieldset: 'problem',
      options: { hotspot: true },
    }),
    defineField({
      name: 'problemLabelBefore',
      title: 'Label Gambar Sebelum',
      type: 'string',
      fieldset: 'problem',
      initialValue: 'Prasasti Statis',
    }),
    defineField({
      name: 'problemImageAfter',
      title: 'Gambar "Sesudah" (Prasasti Digital)',
      type: 'image',
      fieldset: 'problem',
      options: { hotspot: true },
    }),
    defineField({
      name: 'problemLabelAfter',
      title: 'Label Gambar Sesudah',
      type: 'string',
      fieldset: 'problem',
      initialValue: 'Prasasti Digital Interaktif',
    }),

    // ═══════════════════════════════════════
    // SOLUTION SECTION
    // ═══════════════════════════════════════
    defineField({
      name: 'solutionTitle',
      title: 'Judul Section',
      type: 'string',
      fieldset: 'solution',
      initialValue: 'Solusi',
    }),
    defineField({
      name: 'solutionTitleAccent',
      title: 'Judul Aksen (Warna Emas)',
      type: 'string',
      fieldset: 'solution',
      initialValue: 'Phygital',
    }),
    defineField({
      name: 'solutionTitleSuffix',
      title: 'Judul Suffix',
      type: 'string',
      fieldset: 'solution',
      description: 'Teks setelah aksen. Contoh: "Kami"',
      initialValue: 'Kami',
    }),
    defineField({
      name: 'solutionDesc',
      title: 'Deskripsi Section',
      type: 'text',
      rows: 2,
      fieldset: 'solution',
      initialValue: 'Menggabungkan kekokohan monumen fisik dengan kedalaman arsip digital tanpa batas.',
    }),
    defineField({
      name: 'solutionCards',
      title: 'Kartu Solusi',
      type: 'array',
      fieldset: 'solution',
      of: [{
        type: 'object',
        name: 'solutionCard',
        title: 'Kartu',
        fields: [
          defineField({ name: 'cardTitle', title: 'Judul Kartu', type: 'string' }),
          defineField({ name: 'cardDesc', title: 'Deskripsi', type: 'text', rows: 3 }),
          defineField({
            name: 'cardFeatures',
            title: 'Fitur',
            type: 'array',
            of: [{ type: 'string' }],
          }),
        ],
        preview: {
          select: { title: 'cardTitle' },
        },
      }],
    }),

    // ═══════════════════════════════════════
    // USE CASE SECTION
    // ═══════════════════════════════════════
    defineField({
      name: 'useCaseCards',
      title: 'Kartu Use Case',
      type: 'array',
      fieldset: 'useCase',
      of: [{
        type: 'object',
        name: 'useCaseCard',
        title: 'Kartu Use Case',
        fields: [
          defineField({ name: 'cardTitle', title: 'Judul', type: 'string' }),
          defineField({ name: 'cardDesc', title: 'Deskripsi', type: 'text', rows: 3 }),
          defineField({
            name: 'cardImage',
            title: 'Gambar',
            type: 'image',
            options: { hotspot: true },
          }),
          defineField({
            name: 'cardFeatures',
            title: 'Fitur',
            type: 'array',
            of: [{ type: 'string' }],
          }),
        ],
        preview: {
          select: { title: 'cardTitle', media: 'cardImage' },
        },
      }],
    }),

    // ═══════════════════════════════════════
    // TRUST SECTION
    // ═══════════════════════════════════════
    defineField({
      name: 'trustTitle',
      title: 'Judul Section',
      type: 'string',
      fieldset: 'trust',
      initialValue: 'Kepercayaan Tanpa Kompromi',
    }),
    defineField({
      name: 'trustDesc',
      title: 'Deskripsi Section',
      type: 'text',
      rows: 2,
      fieldset: 'trust',
      initialValue: 'Keamanan digital tingkat institusi untuk menjaga eksklusivitas arsip publik dan privat Anda.',
    }),
    defineField({
      name: 'trustItems',
      title: 'Item Kepercayaan',
      type: 'array',
      fieldset: 'trust',
      of: [{
        type: 'object',
        name: 'trustItem',
        title: 'Item',
        fields: [
          defineField({ name: 'itemTitle', title: 'Judul', type: 'string' }),
          defineField({ name: 'itemDesc', title: 'Deskripsi', type: 'text', rows: 3 }),
        ],
        preview: {
          select: { title: 'itemTitle' },
        },
      }],
    }),
    defineField({
      name: 'blockchainTitle',
      title: 'Judul Banner Blockchain',
      type: 'string',
      fieldset: 'trust',
      initialValue: 'Penyimpanan Permanen Lintas Abad',
    }),
    defineField({
      name: 'blockchainDesc',
      title: 'Deskripsi Banner Blockchain',
      type: 'text',
      rows: 4,
      fieldset: 'trust',
      initialValue: 'Penambahan kredit memori opsional memberi Anda akses ke jaringan gerbang cerdas Irys. Monograf historis Anda akan digandakan secara permanen dan disematkan ke dalam arsitektur Immutable Blockchain (Arweave & Polygon) yang kebal terhadap sensor, peretasan, maupun kebangkrutan server tunggal.',
    }),

    // ═══════════════════════════════════════
    // PARTNERS SECTION
    // ═══════════════════════════════════════
    defineField({
      name: 'partnersDividerText',
      title: 'Teks Divider Partner',
      type: 'string',
      fieldset: 'partners',
      initialValue: 'Infrastruktur & Gateway Resmi',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Halaman Utama',
        subtitle: 'Hero, Filosofi, Solusi, Use Case, Trust, Partners',
      }
    },
  },
})
