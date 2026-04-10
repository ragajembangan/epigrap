/**
 * Seed script: Mengisi dokumen "demoGallery" di Sanity
 * dengan data yang saat ini hardcoded di DemoGallery.astro
 * 
 * Jalankan: node seed-demo.mjs
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config()

const client = createClient({
  projectId: '5g1ky8nn',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const demoGalleryDoc = {
  _id: 'demoGallery',
  _type: 'demoGallery',
  title: 'Halaman Demo Epigrap',
  pageTitle: 'Galeri',
  pageTitleAccent: 'Purwarupa',
  pageDescription: 'Jelajahi contoh portal digital interaktif dari berbagai sektor. Pindai, sentuh, dan rasakan pengalaman phygital sesungguhnya.',
  sectors: [
    {
      _key: 'sector-1',
      _type: 'demoSector',
      sectorTitle: 'Pariwisata & Cagar Budaya',
      sectorIcon: '',
      items: [
        {
          _key: 'item-1a',
          _type: 'demoItem',
          itemTitle: 'Wisata Candi & Sejarah',
          itemDescription: 'Mockup portal digital Candi Dieng dengan audio multibahasa dan galeri interaktif.',
          itemImageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=800&auto=format&fit=crop',
          itemUrl: '/demo/wisata',
        },
        {
          _key: 'item-1b',
          _type: 'demoItem',
          itemTitle: 'Wisata Religi & Ziarah Wali',
          itemDescription: 'Digitalisasi makam tokoh agama untuk menampung peziarah dan jalur infaq digital.',
          itemImageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=800&auto=format&fit=crop',
          itemUrl: '/demo/religi',
        },
      ],
    },
    {
      _key: 'sector-2',
      _type: 'demoSector',
      sectorTitle: 'Pemerintahan & Institusi',
      sectorIcon: '',
      items: [
        {
          _key: 'item-2a',
          _type: 'demoItem',
          itemTitle: 'Prasasti Peresmian Pemerintah',
          itemDescription: 'Prasasti digital untuk gedung negara, tugu peringatan, dan monumen peresmian.',
          itemImageUrl: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=800&auto=format&fit=crop',
          itemUrl: '/demo/pemerintahan',
        },
        {
          _key: 'item-2b',
          _type: 'demoItem',
          itemTitle: 'Yayasan & Pondok Pesantren',
          itemDescription: 'Profil pesantren, arsip kitab kuning, dan jalur donasi atau wakaf digital.',
          itemImageUrl: 'https://images.unsplash.com/photo-1590076215667-875c2d76b707?q=80&w=800&auto=format&fit=crop',
          itemUrl: '/demo/institusi',
        },
        {
          _key: 'item-2c',
          _type: 'demoItem',
          itemTitle: 'Aset Perusahaan & Gedung',
          itemDescription: 'Tonggak sejarah (milestone) perusahaan untuk lobi gedung, pabrik, atau kantor pusat.',
          itemImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
          itemUrl: '/demo/korporasi',
        },
      ],
    },
    {
      _key: 'sector-3',
      _type: 'demoSector',
      sectorTitle: 'Kreatif & Monumen Publik',
      sectorIcon: '',
      items: [
        {
          _key: 'item-3a',
          _type: 'demoItem',
          itemTitle: 'Monumen Kesenian & Ruang Publik',
          itemDescription: 'Patung & instalasi seni yang terhubung langsung ke profil paguyuban kreator.',
          itemImageUrl: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=800&auto=format&fit=crop',
          itemUrl: '/demo/monumen',
        },
        {
          _key: 'item-3b',
          _type: 'demoItem',
          itemTitle: 'Kreator, Penemu & Penulis',
          itemDescription: 'Plakat QR untuk penghargaan karya, peluncuran buku, atau tautan penjualan langsung.',
          itemImageUrl: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=800&auto=format&fit=crop',
          itemUrl: '/demo/kreator',
        },
      ],
    },
    {
      _key: 'sector-4',
      _type: 'demoSector',
      sectorTitle: 'Privat & Keluarga',
      sectorIcon: '',
      items: [
        {
          _key: 'item-4a',
          _type: 'demoItem',
          itemTitle: 'Silsilah Trah / Bani',
          itemDescription: 'Portal memori keluarga besar, arsip foto leluhur, dan pesan suara lintas generasi.',
          itemImageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
          itemUrl: '/demo/keluarga',
        },
        {
          _key: 'item-4b',
          _type: 'demoItem',
          itemTitle: 'Makam Pusaka & Bongpay',
          itemDescription: 'Digitalisasi nisan dan bongpay Tionghoa untuk merawat sanad keluarga lintas abad.',
          itemImageUrl: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=800&auto=format&fit=crop',
          itemUrl: '/demo/pusaka',
        },
      ],
    },
  ],
}

async function seed() {
  console.log('🌱 Menyimpan data Demo Gallery ke Sanity...')
  
  try {
    const result = await client.createOrReplace(demoGalleryDoc)
    console.log(`✅ Berhasil! Dokumen "${result._id}" telah dibuat/diupdate.`)
    console.log('   Buka /studio lalu klik "Halaman Demo (Galeri Purwarupa)" untuk mengeditnya.')
  } catch (err) {
    console.error('❌ Gagal menyimpan:', err.message)
  }
}

seed()
