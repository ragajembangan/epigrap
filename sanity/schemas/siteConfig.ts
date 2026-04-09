import { defineField, defineType } from 'sanity'
import { createElement } from 'react'

const ConfigIcon = () =>
  createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, width: '1em', height: '1em' },
    createElement('circle', { cx: 12, cy: 12, r: 3 }),
    createElement('path', { d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' })
  )

export const siteConfig = defineType({
  name: 'siteConfig',
  title: 'Konfigurasi Situs',
  type: 'document',
  icon: ConfigIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Konfigurasi',
      type: 'string',
      initialValue: 'Konfigurasi Global Epigrap',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'formReservasi',
      title: 'Form Reservasi',
      type: 'array',
      of: [{ type: 'formField' }],
      description:
        'Daftar kolom input yang ditampilkan di halaman /reservasi. Urutkan berdasarkan field "Urutan Tampil".',
    }),
    defineField({
      name: 'formPartner',
      title: 'Form Partner',
      type: 'array',
      of: [{ type: 'formField' }],
      description:
        'Daftar kolom input yang ditampilkan di halaman /partner. Urutkan berdasarkan field "Urutan Tampil".',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Konfigurasi Situs',
        subtitle: 'Form Reservasi & Partner',
      }
    },
  },
})
