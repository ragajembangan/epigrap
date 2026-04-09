import { defineField, defineType } from 'sanity'
import { createElement } from 'react'
import { WhatsAppInput } from '../components/WhatsAppInput'

const AgentIcon = () =>
  createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, width: '1em', height: '1em' },
    createElement('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
    createElement('circle', { cx: 9, cy: 7, r: 4 }),
    createElement('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87' }),
    createElement('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
  )

export const agen = defineType({
  name: 'agen',
  title: 'Agen (Mitra)',
  type: 'document',
  icon: AgentIcon,
  fields: [
    defineField({
      name: 'idAgen',
      title: 'ID Keagenan Resmi',
      type: 'string',
      description: 'Deretan angka unik identitas Agen. Bisa digenerate setelah mereka mendaftar.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'namaUsaha',
      title: 'Nama Usaha / Toko',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'namaPemilik',
      title: 'Nama Pemilik',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Agen (Login Akses)',
      type: 'string',
      description: 'Email yang digunakan agen untuk login ke Dashboard Agen via Clerk Auth.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'noWA',
      title: 'Nomor WhatsApp',
      type: 'string',
      components: {
        input: WhatsAppInput,
      },
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return 'Nomor WA wajib diisi.'
          if (!/^(62|08)[0-9]{7,14}$/.test(value)) {
            return 'Nomor harus berupa angka 9-16 digit, dan wajib diawali 62 atau 08.'
          }
          return true
        }),
    }),
    defineField({
      name: 'kota',
      title: 'Kota / Kabupaten',
      type: 'string',
    }),
    
    // ─── Berkas Keagenan (Diunduh dari Dashboard) ───
    defineField({
      name: 'berkasMitra',
      title: 'Berkas Kemitraan Eksekutif',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'kartuMember',
          title: 'Kartu Member (Desain)',
          type: 'image',
          description: 'File gambar desain Kartu Member khusus Agen ini. Akan tampil dan bisa diunduh di dashboard mereka.',
        }),
        defineField({
          name: 'sertifikat',
          title: 'Sertifikat Mitra Resmi',
          type: 'image',
          description: 'File Sertifikat Kemitraan bernomor seri yang sah.',
        }),
      ]
    }),

    defineField({
      name: 'misiReward',
      title: 'Misi & Reward Progress',
      type: 'string',
      description: 'Catatan internal dari Epigrap: progres misi agen (contoh: 2/10 Pendaftaran).',
    }),
  ],
  preview: {
    select: {
      title: 'namaUsaha',
      subtitle: 'idAgen',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `ID: ${subtitle}` : '',
      }
    },
  },
})
