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
  statusFisik: 'unpaid' | 'draft' | 'produksi' | 'deployed';
  temaVisual: 'budaya' | 'formal' | 'religius' | 'memorial' | 'klasik';
  gambarUtama?: any;
  slogan?: string;
  deskripsiSingkat?: string;
  galeriFoto?: any[];
  youtubeUrl?: string;
  artikelSejarah?: PortableTextBlock[];
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

// ─── GROQ QUERIES ───

export const queries = {
  // Pengaturan UI Form (Global)
  siteConfig: `*[_type == "siteConfig"][0]`,

  // Homepage (Singleton)
  homepage: `*[_type == "homepage" && _id == "homepage"][0]`,

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
  artifactBySlug: `*[_type == "artifact" && slugQR.current == $slug][0] {
    ...,
    klien->{
      _id,
      namaKlien,
      tier
    }
  }`,

  // Dashboard Data (Dipakai di src/pages/dasbor/index.astro saat Klien login Clerk)
  artifactByClientEmail: `*[_type == "artifact" && klien->email == $email][0]`,
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

// Call ini di index.astro untuk fetch konten Homepage dari CMS
export async function getHomepage(): Promise<Homepage | null> {
  return await sanityClient.fetch(queries.homepage)
}

