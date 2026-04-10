import { defineField, defineType } from 'sanity'
import { createElement } from 'react'

const DemoIcon = () =>
  createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, width: '1em', height: '1em' },
    createElement('rect', { x: '2', y: '3', width: '20', height: '14', rx: '2', ry: '2' }),
    createElement('line', { x1: '8', y1: '21', x2: '16', y2: '21' }),
    createElement('line', { x1: '12', y1: '17', x2: '12', y2: '21' })
  )

export const demoGallery = defineType({
  name: 'demoGallery',
  title: 'Halaman Demo (Galeri Purwarupa)',
  type: 'document',
  icon: DemoIcon,
  fieldsets: [
    { name: 'header', title: 'Header Halaman', options: { collapsible: true, collapsed: false } },
    { name: 'sectors', title: 'Daftar Sektor & Kartu Demo', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    // Hidden title for singleton
    defineField({
      name: 'title',
      title: 'Judul Dokumen',
      type: 'string',
      initialValue: 'Halaman Demo Epigrap',
      readOnly: true,
      hidden: true,
    }),

    // ═══════════════════════════════════════
    // HEADER
    // ═══════════════════════════════════════
    defineField({
      name: 'pageTitle',
      title: 'Judul Halaman',
      type: 'string',
      fieldset: 'header',
      description: 'Teks utama. Contoh: "Galeri"',
      initialValue: 'Galeri',
    }),
    defineField({
      name: 'pageTitleAccent',
      title: 'Judul Aksen (Warna Emas)',
      type: 'string',
      fieldset: 'header',
      description: 'Teks berwarna emas. Contoh: "Purwarupa"',
      initialValue: 'Purwarupa',
    }),
    defineField({
      name: 'pageDescription',
      title: 'Deskripsi Halaman',
      type: 'text',
      rows: 3,
      fieldset: 'header',
      initialValue: 'Jelajahi contoh portal digital interaktif dari berbagai sektor. Pindai, sentuh, dan rasakan pengalaman phygital sesungguhnya.',
    }),

    // ═══════════════════════════════════════
    // SECTORS
    // ═══════════════════════════════════════
    defineField({
      name: 'sectors',
      title: 'Sektor Demo',
      type: 'array',
      fieldset: 'sectors',
      of: [{
        type: 'object',
        name: 'demoSector',
        title: 'Sektor',
        fields: [
          defineField({
            name: 'sectorTitle',
            title: 'Nama Sektor',
            type: 'string',
            description: 'Contoh: "Pariwisata & Cagar Budaya"',
          }),
          defineField({
            name: 'sectorIcon',
            title: 'Ikon Sektor (Emoji)',
            type: 'string',
            description: 'Emoji ikon untuk sektor. Contoh: 🏛️',
          }),
          defineField({
            name: 'items',
            title: 'Kartu Demo',
            description: '⚡ Tips performa: Usahakan setiap sektor memiliki 2-3 kartu agar grid tampil seimbang.',
            type: 'array',
            of: [{
              type: 'object',
              name: 'demoItem',
              title: 'Item Demo',
              fields: [
                defineField({
                  name: 'itemTitle',
                  title: 'Judul Kartu',
                  type: 'string',
                }),
                defineField({
                  name: 'itemDescription',
                  title: 'Deskripsi Kartu',
                  type: 'text',
                  rows: 2,
                }),
                defineField({
                  name: 'itemImage',
                  title: 'Gambar Kartu',
                  type: 'image',
                  options: { hotspot: true },
                  description: '📐 Rasio 3:4 (portrait). Ukuran ideal: 600×800 px. Maks 200 KB (JPEG/WebP). Gambar akan otomatis di-resize ke lebar 400px untuk performa optimal.',
                }),
                defineField({
                  name: 'itemImageUrl',
                  title: 'URL Gambar Eksternal (Opsional)',
                  type: 'url',
                  description: 'Alternatif jika tidak upload. Gunakan URL dengan parameter ?w=600&q=75 untuk optimasi. Prioritas: upload gambar > URL eksternal.',
                }),
                defineField({
                  name: 'itemUrl',
                  title: 'Link Portal Demo',
                  type: 'string',
                  description: 'Path tujuan. Contoh: /demo/wisata atau /portal/bambu-aji',
                }),
              ],
              preview: {
                select: { title: 'itemTitle', media: 'itemImage' },
              },
            }],
          }),
        ],
        preview: {
          select: { title: 'sectorTitle' },
          prepare({ title }) {
            return {
              title: title || 'Sektor Baru',
              subtitle: 'Sektor Demo',
            }
          },
        },
      }],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Halaman Demo',
        subtitle: 'Galeri Purwarupa — Sektor & Kartu',
      }
    },
  },
})
