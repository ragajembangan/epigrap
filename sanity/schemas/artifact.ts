import { defineField, defineType } from 'sanity'
import { createElement } from 'react'
import { AIArticleAction } from '../components/AIArticleAction'

const ArtifactIcon = () =>
  createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, width: '1em', height: '1em' },
    createElement('path', { d: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6' })
  )

export const artifact = defineType({
  name: 'artifact',
  title: 'Artefak Phygital',
  type: 'document',
  icon: ArtifactIcon,
  fields: [
    defineField({
      name: 'namaArtefak',
      title: 'Nama Artefak / Monumen',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'klien',
      title: 'Pemilik (Klien)',
      type: 'reference',
      to: [{ type: 'client' }],
      validation: (rule) => rule.required(),
    }),

    // ─── Multi-tenant: Identitas & Akses ───
    defineField({
      name: 'clientId',
      title: 'Client ID (Stabil / Kustom)',
      type: 'string',
      description: 'ID stabil kustom yang dikelola tim Epigrap (misal: "epigrap-keluarga-budi-2024"). Harus sama persis dengan publicMetadata.clientId di Clerk user. JANGAN gunakan Clerk User ID langsung.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'statusAkses',
      title: 'Status Akses Konten',
      type: 'string',
      description: 'Publik = terlihat semua orang di portal QR. Privat = hanya terlihat oleh klien yang login di dashboard.',
      initialValue: 'publik',
      options: {
        list: [
          { title: 'Publik (Terbuka untuk Semua Pengunjung)', value: 'publik' },
          { title: 'Privat (Hanya Klien yang Login)', value: 'privat' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slugQR',
      title: 'Slug Spesifik QR Code',
      type: 'slug',
      description: 'Ditentukan oleh agen. URL QR akan memakai domain pages.dev (https://[app-name].pages.dev/portal/slug-ini). URL QR difixkan SETELAH tagihan Midtrans lunas.',
      options: {
        source: 'namaArtefak',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'statusFisik',
      title: 'Status Registrasi & Fisik Pemasangan',
      type: 'string',
      initialValue: 'unpaid',
      options: {
        list: [
          { title: 'Menunggu Pembayaran Agen', value: 'unpaid' },
          { title: 'Draft / Proses Editing Tulisan', value: 'draft' },
          { title: 'Produksi Fisik (Plakat dibuat)', value: 'produksi' },
          { title: 'Deployed (Live & Terpasang)', value: 'deployed' },
        ],
        layout: 'radio',
      },
    }),

    // ─── Konfigurasi Visual & Tema ───
    defineField({
      name: 'temaVisual',
      title: 'Tema Visual Portal',
      type: 'string',
      description: 'Menentukan susunan palet warna saat halaman disinggahi publik.',
      initialValue: 'budaya',
      options: {
        list: [
          { title: 'Budaya / Wisata Pemda / Tugu', value: 'budaya' },
          { title: 'Formal / Pejabat / Monumen Negara', value: 'formal' },
          { title: 'Religius / Pesantren', value: 'religius' },
          { title: 'Memorial / Nisan', value: 'memorial' },
          { title: 'Klasik / Bongpay Tradisi', value: 'klasik' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),

    // ─── Konten CMS untuk Portal (Bisa diedit oleh Klien Premium) ───
    defineField({
      name: 'gambarUtama',
      title: 'Gambar Utama (Hero Background)',
      type: 'image',
      options: { hotspot: true },
      description: 'Foto resolusi tinggi yang jadi latar paling atas mendominasi layar.',
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan / Jargon Singkat',
      type: 'string',
      description: 'Satu kalimat pemikat (contoh: "Melestarikan Sejarah, Menyambung Peradaban").',
    }),
    defineField({
      name: 'deskripsiSingkat',
      title: 'Deskripsi Singkat (Teks Pengantar)',
      type: 'text',
      rows: 3,
      description: 'Teks perkenalan yang muncul paling atas di portal digital.',
    }),
    defineField({
      name: 'galeriFoto',
      title: 'Galeri Foto Lengkap',
      type: 'array',
      of: [
        { 
          type: 'image', 
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Keterangan Foto' }
          ]
        }
      ],
      description: 'Kumpulan foto-foto artefak atau kegiatan Klien. Maksimal 6 foto.',
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'Video YouTube (Opsional)',
      type: 'url',
      description: 'Tempel link YouTube untuk ditampilkan di portal. Contoh: https://www.youtube.com/watch?v=xxxx',
    }),
    defineField({
      name: 'aiGenerateHelper',
      title: 'AI Asisten Penulisan',
      type: 'string',
      components: {
        input: AIArticleAction,
      },
    }),
    defineField({
      name: 'artikelSejarah',
      title: 'Artikel Sejarah (PUBLIK)',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
      description: 'Tulisan panjang berisi sejarah, narasi mendalam yang TAMPIL DI PORTAL PUBLIK. Bisa di-generate otomatis dengan tombol AI di atas.',
      validation: (rule) => rule.max(50),
    }),
    defineField({
      name: 'arsipPrivat',
      title: 'Arsip Privat (RAHASIA — Hanya Dashboard)',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
      description: '⚠️ Konten RAHASIA. Catatan keluarga, dokumen warisan, atau data sensitif yang HANYA tampil di dashboard klien yang sudah login dan clientId-nya cocok. TIDAK PERNAH ditampilkan di portal publik.',
      validation: (rule) => rule.max(50),
    }),
    defineField({
      name: 'linkDonasiSaweran',
      title: 'Dukungan Pelestarian (Saweran / Link Publik)',
      type: 'array',
      description: 'Tombol untuk diarahkan ke Yapp.ink, Lynk.id, Tautyn, dsb. (Non-Escrow).',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Teks Tombol (misal: "Dukung Kami via Lynk.id")' },
            { 
              name: 'url', 
              type: 'url', 
              title: 'URL Link Pembayaran/Saweran',
              validation: (Rule) => Rule.uri({
                scheme: ['https'], // Wajib https, mencegah skema javascript: atau http:
              }).custom((url: string | undefined) => {
                if (!url) return true
                const allowedDomains = ['lynk.id', 'yapp.ink', 'saweria.co', 'tautyn.com']
                try {
                  const urlObj = new URL(url)
                  const isAllowed = allowedDomains.some(domain => urlObj.hostname.endsWith(domain))
                  if (!isAllowed) {
                    return `Hanya domain yang disetujui yang diperbolehkan: ${allowedDomains.join(', ')}`
                  }
                  return true
                } catch (_) {
                  return 'Format URL tidak valid'
                }
              })
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'etalaseProdukEksternal',
      title: 'Katalog Produk (Shopee / Tokopedia Eksternal)',
      type: 'array',
      description: 'Jika klien menjual merchandise atau buku. Langsung dilempar ke platform penjual luar.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'namaProduk', type: 'string', title: 'Nama Produk' },
            { name: 'harga', type: 'string', title: 'Harga (opsional, misal: "Rp 50.000")' },
            { name: 'gambar', type: 'image', title: 'Foto Produk' },
            { 
              name: 'url', 
              type: 'url', 
              title: 'URL Link Beli (Shopee/Tokped/Tiktok)',
              validation: (Rule) => Rule.uri({
                scheme: ['https'],
              }).custom((url: string | undefined) => {
                if (!url) return true
                const allowedDomains = ['shopee.co.id', 'tokopedia.com', 'tiktok.com', 'wa.me']
                try {
                  const urlObj = new URL(url)
                  const isAllowed = allowedDomains.some(domain => urlObj.hostname.endsWith(domain))
                  if (!isAllowed) {
                    return `Hanya domain e-commerce resmi: ${allowedDomains.join(', ')}`
                  }
                  return true
                } catch (_) {
                  return 'Format URL tidak valid'
                }
              })
            },
          ],
        },
      ],
    }),

    // ─── Media Sosial ───
    defineField({
      name: 'sosialMedia',
      title: 'Akun Media Sosial',
      type: 'object',
      description: 'Isi URL yang tersedia. Ikon hanya tampil di portal jika URL diisi.',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter / X', type: 'url' }),
      ],
    }),

    // ─── Web3 Data Group ───
    defineField({
      name: 'web3Data',
      title: 'Web3 Provenance Data',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'mintingStatus',
          title: 'Status Minting Smart Contract',
          type: 'string',
          initialValue: 'pending',
          options: {
            list: [
              { title: 'Pending', value: 'pending' },
              { title: 'Minted to Arweave', value: 'minted_arweave' },
              { title: 'Minted to Polygon', value: 'minted_polygon' },
              { title: 'Fully Minted', value: 'fully_minted' },
            ],
          },
        }),
        defineField({
          name: 'arweaveHash',
          title: 'Arweave Transaction Hash',
          type: 'string',
          readOnly: true,
        }),
        defineField({
          name: 'polygonTokenId',
          title: 'Polygon Token ID',
          type: 'string',
          readOnly: true,
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'namaArtefak',
      klienNama: 'klien.namaKlien',
      status: 'statusFisik',
    },
    prepare({ title, klienNama, status }) {
      return {
        title,
        subtitle: `${klienNama || 'Tanpa Klien'} · Status: ${status || '-'}`,
      }
    },
  },
})
