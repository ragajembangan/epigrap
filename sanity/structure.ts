import type { StructureResolver, DefaultDocumentNodeResolver } from 'sanity/structure'
import { IframePreview } from './components/IframePreview'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  if (schemaType === 'homepage' || schemaType === 'artifact') {
    return S.document().views([
      S.view.form(),
      S.view.component(IframePreview).title('Preview')
    ])
  }
  return S.document().views([S.view.form()])
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Tabel Kontrol Epigrap')
    .items([
      // 0. Halaman Utama (Singleton — edit konten landing page)
      S.listItem()
        .title('Halaman Utama (Homepage)')
        .child(
          S.editor()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Edit Halaman Utama')
        ),
      S.divider(),

      // 1. Data Utama (Langsung tampil di luar agar tidak perlu klik folder)
      S.documentTypeListItem('client').title('Daftar Klien (Pesantren/Instansi)'),
      S.documentTypeListItem('artifact').title('Artefak / Monumen Digital'),
      S.documentTypeListItem('agen').title('Agen Pendaftar (Mitra)'),
      S.divider(),

      // 2. Monitoring Pekerjaan & Keuangan (Views Custom)
      S.listItem()
        .title('Peringatan Tagihan & Logistik')
        .child(
          S.list()
            .title('Fokus Pengecekan Harian')
            .items([
              S.listItem()
                .title('1. Registrasi Agen (BELUM LUNAS)')
                .child(
                  S.documentList()
                    .title('Tagihan Registrasi Unpaid / Menunggu Agen')
                    .filter('_type == "client" && midtrans.statusPembayaran == "unpaid"')
                ),
              S.listItem()
                .title('2. Mendekati Jatuh Tempo (Renewal)')
                .child(
                  S.documentList()
                    .title('Klien Aktif (Urut dari Waktu Kritis Terdekat)')
                    .filter('_type == "client" && berlangganan.statusAkses == "active"')
                    .defaultOrdering([{ field: 'berlangganan.jatuhTempo', direction: 'asc' }])
                ),
              S.listItem()
                .title('3. Menunggu Produksi Fisik')
                .child(
                  S.documentList()
                    .title('Artefak yang Masih Dalam Produksi')
                    .filter('_type == "artifact" && statusFisik == "produksi"')
                ),
            ])
        ),
      S.divider(),

      // 3. Konfigurasi Singleton
      S.listItem()
        .title('Pengaturan Global')
        .child(
          S.editor()
            .schemaType('siteConfig')
            .documentId('siteConfig') // Ini membuatnya jadi 1 dokumen permanen (Singleton)
            .title('Konfigurasi Situs')
        ),
    ])
