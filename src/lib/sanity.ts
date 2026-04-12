import { sanityClient } from 'sanity:client'
import type { PortableTextBlock } from '@portabletext/types'

// ─── TYPESCRIPT INTERFACES ───

export interface Agen {
  _id: string;
  idAgen: string;
  namaUsaha: string;
  namaPemilik: string;
  email: string;
  noWA: string;
  kota?: string;
  berkasMitra?: {
    kartuMember?: Record<string, any>;
    sertifikat?: Record<string, any>;
  }
  misiReward?: string;
}

export interface Client {
  _id: string;
  namaKlien: string;
  referensiAgen?: Agen;
  tier: 'basic' | 'premium';
  email?: string;
  kontakWA?: string;
  berlangganan?: {
    statusAkses: 'active' | 'expired';
    jatuhTempo?: string;
  };
  midtrans?: {
    statusPembayaran: 'unpaid' | 'paid' | 'expired';
    nominalTagihan: number;
    urlTagihan?: string;
    expiryDate?: string;
  };
}

export interface Artifact {
  _id: string;
  namaArtefak: string;
  slugQR: { current: string };
  klien: Client;
  clientId: string;
  statusAkses: 'publik' | 'privat';
  statusFisik: 'unpaid' | 'draft' | 'produksi' | 'deployed';
  temaVisual: 'budaya' | 'formal' | 'religius' | 'memorial' | 'klasik';
  gambarUtama?: any;
  slogan?: string;
  deskripsiSingkat?: string;
  galeriFoto?: any[];
  youtubeUrl?: string;
  artikelSejarah?: PortableTextBlock[];
  arsipPrivat?: PortableTextBlock[];
  linkDonasiSaweran?: { title: string; url: string }[];
  etalaseProdukEksternal?: {
    namaProduk: string;
    harga?: string;
    gambar: any;
    url: string;
  }[];
  sosialMedia?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
  };
  web3Data: {
    mintingStatus: 'pending' | 'minted_arweave' | 'minted_polygon' | 'fully_minted';
    arweaveHash?: string;
    polygonTokenId?: string;
  };
}

export interface FormField {
  _key: string;
  label: string;
  fieldName: string;
  inputType: 'text' | 'email' | 'number' | 'select' | 'textarea';
  required: boolean;
  options?: string[];
  sortOrder: number;
}

export interface SiteConfig {
  _id: string;
  title: string;
  formReservasi?: FormField[];
  formPartner?: FormField[];
}

export interface HomepageSolutionCard {
  _key: string;
  cardTitle: string;
  cardDesc: string;
  cardFeatures?: string[];
}

export interface HomepageUseCaseCard {
  _key: string;
  cardTitle: string;
  cardDesc: string;
  cardImage?: any;
  cardFeatures?: string[];
}

export interface HomepageTrustItem {
  _key: string;
  itemTitle: string;
  itemDesc: string;
}

export interface Homepage {
  _id: string;
  // Hero
  heroHeadline?: string;
  heroHeadlineAccent?: string;
  heroSubtext?: string;
  heroBackgroundImage?: any;
  heroCta1Text?: string;
  heroCta1Link?: string;
  heroCta2Text?: string;
  heroCta2Link?: string;
  // Problem
  problemTitle?: string;
  problemTitleAccent?: string;
  problemDesc1?: string;
  problemDesc2?: string;
  problemImageBefore?: any;
  problemLabelBefore?: string;
  problemImageAfter?: any;
  problemLabelAfter?: string;
  // Solution
  solutionTitle?: string;
  solutionTitleAccent?: string;
  solutionTitleSuffix?: string;
  solutionDesc?: string;
  solutionCards?: HomepageSolutionCard[];
  // Use Case
  useCaseCards?: HomepageUseCaseCard[];
  // Trust
  trustTitle?: string;
  trustDesc?: string;
  trustItems?: HomepageTrustItem[];
  blockchainTitle?: string;
  blockchainDesc?: string;
  // Partners
  partnersDividerText?: string;
}

export interface DemoGalleryItem {
  _key: string;
  itemTitle: string;
  itemDescription: string;
  itemImage?: any;
  itemImageUrl?: string;
  itemUrl: string;
}

export interface DemoGallerySector {
  _key: string;
  sectorTitle: string;
  sectorIcon?: string;
  items: DemoGalleryItem[];
}

export interface DemoGallery {
  _id: string;
  pageTitle?: string;
  pageTitleAccent?: string;
  pageDescription?: string;
  sectors?: DemoGallerySector[];
}

// ─── GROQ QUERIES ───

export const queries = {
  // Pengaturan UI Form (Global)
  siteConfig: `*[_type == "siteConfig"][0]`,

  // Homepage (Singleton)
  homepage: `*[_type == "homepage" && _id == "homepage"][0]`,

  // Demo Gallery (Singleton)
  demoGallery: `*[_type == "demoGallery" && _id == "demoGallery"][0]`,

  // Master Data
  allAgens: `*[_type == "agen"] | order(namaUsaha asc)`,
  allClients: `*[_type == "client"] {
    ...,
    referensiAgen->{_id, namaUsaha, namaPemilik}
  } | order(namaKlien asc)`,
  
  // Tagihan Midtrans
  unpaidInvoices: `*[_type == "client" && midtrans.statusPembayaran == "unpaid"] {
    _id,
    namaKlien,
    midtrans,
    referensiAgen->{namaUsaha, noWA}
  }`,

  // Artefak Digital
  allArtifacts: `*[_type == "artifact"] {
    ...,
    klien->{
      _id, 
      namaKlien, 
      tier,
      referensiAgen->{namaUsaha}
    }
  }`,
  
  // Portal Dinamis (Dipakai di src/pages/portal/[slug].astro)
  // KRITIS: Projection eksplisit — arsipPrivat SENGAJA TIDAK disertakan agar tidak bocor ke publik
  artifactBySlug: `*[_type == "artifact" && slugQR.current == $slug][0] {
    _id, namaArtefak, slugQR, temaVisual, gambarUtama, slogan,
    deskripsiSingkat, galeriFoto, youtubeUrl, artikelSejarah,
    linkDonasiSaweran, etalaseProdukEksternal, sosialMedia, web3Data,
    statusFisik, statusAkses, clientId,
    klien->{
      _id,
      namaKlien,
      tier
    }
  }`,

  // Dashboard Data — Isolasi per tenant (Dipakai di src/pages/dasbor/index.astro saat Klien login Clerk)
  // Query ini mengembalikan SEMUA field termasuk arsipPrivat, karena dashboard sudah dilindungi Clerk auth
  artifactsByClientId: `*[_type == "artifact" && clientId == $clientId] {
    ...,
    klien->{
      _id,
      namaKlien,
      tier
    }
  } | order(_createdAt desc)`,
}

// ─── HELPER FUNCTIONS ───

// Call ini di kompenen Astro untuk fetch Form
export async function getSiteConfig(): Promise<SiteConfig | null> {
  return await sanityClient.fetch(queries.siteConfig)
}

// Call ini di [slug].astro untuk fetch data Monumen Portal
export async function getPortalBySlug(slug: string): Promise<Artifact | null> {
  return await sanityClient.fetch(queries.artifactBySlug, { slug })
}

// Call ini di getStaticPaths() untuk daftarkan semua slug portal
export async function getAllPortalSlugs(): Promise<{ slug: string }[]> {
  return await sanityClient.fetch(`*[_type == "artifact" && defined(slugQR.current)]{ "slug": slugQR.current }`)
}

// Call ini di index.astro untuk fetch konten Homepage dari CMS
export async function getHomepage(): Promise<Homepage | null> {
  return await sanityClient.fetch(queries.homepage)
}

// Call ini di demo.astro untuk fetch konten Galeri Demo dari CMS
export async function getDemoGallery(): Promise<DemoGallery | null> {
  return await sanityClient.fetch(queries.demoGallery)
}

// Call ini di dasbor/index.astro untuk fetch artefak milik klien yang sedang login
export async function getArtifactsByClientId(clientId: string): Promise<Artifact[]> {
  return await sanityClient.fetch(queries.artifactsByClientId, { clientId })
}

