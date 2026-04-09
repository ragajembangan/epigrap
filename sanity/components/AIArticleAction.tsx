import React, { useCallback, useState } from 'react'
import { useFormValue } from 'sanity'
import { Button, Stack, Card, Text, Spinner, Flex } from '@sanity/ui'

/**
 * Tombol "Generate Artikel dengan AI" yang muncul di Sanity Studio.
 * Memanggil Azure AI (via GitHub Models) untuk membuat artikel otomatis.
 */
export function AIArticleAction() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Baca nilai field lain dari dokumen yang sedang dibuka
  const namaArtefak = useFormValue(['namaArtefak']) as string | undefined
  const slogan = useFormValue(['slogan']) as string | undefined
  const deskripsi = useFormValue(['deskripsiSingkat']) as string | undefined
  const tema = useFormValue(['temaVisual']) as string | undefined

  const handleGenerate = useCallback(async () => {
    if (!namaArtefak) {
      setError('Isi dulu "Nama Artefak / Monumen" di atas sebelum generate.')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          namaArtefak,
          slogan: slogan || '',
          deskripsi: deskripsi || '',
          tema: tema || 'budaya',
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || `HTTP ${res.status}`)
      }

      const data = await res.json()

      // Copy hasil ke clipboard agar admin bisa paste ke editor
      const rawText = data.raw || ''
      await navigator.clipboard.writeText(rawText)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Gagal menghubungi AI.')
    } finally {
      setLoading(false)
    }
  }, [namaArtefak, slogan, deskripsi, tema])

  return (
    <Card padding={4} radius={3} shadow={1} tone="primary" style={{ marginBottom: '1.5rem' }}>
      <Stack space={3}>
        <Flex align="center" gap={2}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a4 4 0 0 1 4 4v1a1 1 0 0 1-1 1h-1v2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1h-1v3a5 5 0 0 1-10 0v-3H5a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2V8H7a1 1 0 0 1-1-1V6a4 4 0 0 1 4-4h2z" />
          </svg>
          <Text weight="bold" size={2}>Azure AI — Generate Artikel</Text>
        </Flex>
        <Text size={1} muted>
          Klik tombol di bawah untuk membuat artikel otomatis berdasarkan Nama Artefak, Slogan, dan Tema. Hasilnya akan disalin ke clipboard — tinggal Paste (Ctrl+V) ke editor Artikel di bawah.
        </Text>

        <Button
          text={loading ? 'Sedang menghubungi AI...' : 'Generate Artikel dengan AI'}
          tone="primary"
          onClick={handleGenerate}
          disabled={loading}
          icon={loading ? Spinner : undefined}
          style={{ width: '100%' }}
        />

        {error && (
          <Card padding={3} radius={2} tone="critical">
            <Text size={1}>{error}</Text>
          </Card>
        )}

        {success && (
          <Card padding={3} radius={2} tone="positive">
            <Text size={1} weight="bold">
              Artikel berhasil di-generate! Teks sudah disalin ke clipboard Anda. Klik di kolom "Artikel Utama" di bawah, lalu tekan Ctrl+V untuk paste.
            </Text>
          </Card>
        )}
      </Stack>
    </Card>
  )
}
