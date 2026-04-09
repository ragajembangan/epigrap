import { defineField, defineType } from 'sanity'
import { createElement } from 'react'
import { WhatsAppInput } from '../components/WhatsAppInput'

const ClientIcon = () =>
  createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, width: '1em', height: '1em' },
    createElement('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
    createElement('circle', { cx: 12, cy: 7, r: 4 })
  )

export const client = defineType({
  name: 'client',
  title: 'Klien (End-User)',
  type: 'document',
  icon: ClientIcon,
  fields: [
    defineField({
      name: 'namaKlien',
      title: 'Nama Klien / Pesantren',
      type: 'string',
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: 'referensiAgen',
      title: 'Didaftarkan Oleh (Agen)',
      type: 'reference',
      to: [{ type: 'agen' }],
      description: 'Pilih agen jika pendaftaran melalui jalur mitra. Kosongkan jika Klien daftar langsung.',
    }),
    defineField({
      name: 'tier',
      title: 'Tier Berlangganan',
      type: 'string',
      options: {
        list: [
          { title: 'Basic (Tanpa Portal Dashboard)', value: 'basic' },
          { title: 'Premium (Akses Edit Dashboard)', value: 'premium' },
        ],
        layout: 'radio',
      },
      initialValue: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Klien (Untuk Akses Dashboard)',
      type: 'string',
      description: 'Akan digunakan untuk login ke /dasbor via Clerk Auth jika Klien berstatus Premium.',
    }),
    defineField({
      name: 'kontakWA',
      title: 'Kontak WhatsApp',
      type: 'string',
      components: {
        input: WhatsAppInput,
      },
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          if (!/^(62|08)[0-9]{7,14}$/.test(value)) {
            return 'Nomor harus berupa angka 9-16 digit, dan wajib diawali 62 atau 08.'
          }
          return true;
        }),
    }),
    
    // ─── Data Berlangganan & Akses CMS ───
    defineField({
      name: 'berlangganan',
      title: 'Status Perpanjangan & Akses CMS',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'statusAkses',
          title: 'Status Akses Dashboard Klien',
          type: 'string',
          initialValue: 'active',
          options: {
            list: [
              { title: 'Aktif (Berhak Edit & Tambah Foto)', value: 'active' },
              { title: 'Kadaluarsa / Belum Bayar (Read-only)', value: 'expired' },
            ],
            layout: 'radio',
          },
          description: 'Jika Kadaluarsa, fungsi POST/EDIT di dashboard Klien akan dikunci. Namun WEB PUBLIK artefak akan TETAP HIDUP selamanya.',
        }),
        defineField({
          name: 'jatuhTempo',
          title: 'Tanggal Jatuh Tempo Berikutnya',
          type: 'date',
        }),
      ]
    }),

    // ─── Midtrans Data Group ───
    defineField({
      name: 'midtrans',
      title: 'Data Tagihan Midtrans',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'statusPembayaran',
          title: 'Status Pembayaran',
          type: 'string',
          initialValue: 'unpaid',
          options: {
            list: [
              { title: 'Unpaid / Menunggu di Agen', value: 'unpaid' },
              { title: 'Lunas / Paid', value: 'paid' },
              { title: 'Expired / Batal', value: 'expired' },
            ],
          },
        }),
        defineField({
          name: 'nominalTagihan',
          title: 'Nominal Tagihan (Rp)',
          type: 'number',
          initialValue: 2000000,
          description: 'Tagihan untuk Registrasi. Jika dibayar via Agen, Agen mendapat Cashback/Komisi 5%.',
        }),
        defineField({
          name: 'urlTagihan',
          title: 'URL Payment Link (Midtrans)',
          type: 'url',
        }),
        defineField({
          name: 'expiryDate',
          title: 'Batas Waktu Pembayaran (1x24 Jam dari Registrasi)',
          type: 'datetime',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'namaKlien',
      tier: 'tier',
      status: 'midtrans.statusPembayaran',
    },
    prepare({ title, tier, status }) {
      return {
        title,
        subtitle: `Tier: ${tier || '-'} | Bayar: ${status || '-'}`,
      }
    },
  },
})
