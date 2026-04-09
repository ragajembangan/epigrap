import React from 'react'
import type { SanityDocument } from 'sanity'

interface IframePreviewProps {
  document: {
    displayed: SanityDocument
  }
}

export function IframePreview({ document }: IframePreviewProps) {
  const { displayed } = document
  
  if (!displayed) {
    return <div>No document to preview</div>
  }

  // Menentukan URL Preview (menggunakan relative URL agar menyesuaikan localhost atau production)
  let url = '/'

  // Jika preview untuk Portal (Artefak Digital)
  if (displayed._type === 'artifact' && displayed.slugQR) {
    const slug = (displayed.slugQR as any)?.current
    url = `/portal/${slug}`
  }
  // Jika preview untuk Homepage, biarkan '/'

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        src={url}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Preview"
      />
    </div>
  )
}
