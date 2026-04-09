import React from 'react'
import { PortableText } from '@portabletext/react'

const customComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null
      return (
        <div style={{
          margin: '2rem 0',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
          backgroundColor: 'var(--color-obsidian)',
          textAlign: 'center' as const,
          padding: '1rem',
        }}>
          <span style={{
            fontSize: '0.85rem',
            color: 'var(--color-parchment)',
            opacity: 0.4,
            fontStyle: 'italic',
          }}>
            [Gambar dari Editor]
          </span>
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '2.5rem',
        fontWeight: 700,
        marginTop: '3rem',
        marginBottom: '1.5rem',
        color: 'var(--color-brass)',
        lineHeight: 1.2,
      }}>{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '2rem',
        fontWeight: 600,
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: 'var(--color-parchment)',
        lineHeight: 1.25,
      }}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.5rem',
        fontWeight: 500,
        marginTop: '2rem',
        marginBottom: '0.75rem',
        color: 'var(--color-parchment)',
        opacity: 0.9,
        lineHeight: 1.3,
      }}>{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p style={{
        marginBottom: '1.5rem',
        lineHeight: 1.8,
        fontSize: '1.05rem',
        color: 'var(--color-parchment)',
        opacity: 0.8,
        textAlign: 'justify' as const,
      }}>{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{
        borderLeft: '3px solid var(--color-brass)',
        paddingLeft: '1.5rem',
        fontStyle: 'italic',
        margin: '2rem 0',
        fontSize: '1.25rem',
        fontFamily: 'var(--font-heading)',
        color: 'var(--color-parchment)',
        opacity: 0.6,
      }}>{children}</blockquote>
    ),
  },
  marks: {
    em: ({ children }: any) => (
      <em style={{ color: 'var(--color-brass)' }}>{children}</em>
    ),
    strong: ({ children }: any) => (
      <strong style={{ fontWeight: 600, color: 'var(--color-parchment)' }}>{children}</strong>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noreferrer"
        style={{
          color: 'var(--color-brass)',
          borderBottom: '1px solid var(--color-brass)',
          textDecoration: 'none',
        }}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul style={{
        paddingLeft: '1.5rem',
        marginBottom: '2rem',
        lineHeight: 1.8,
        fontSize: '1.05rem',
        color: 'var(--color-parchment)',
        opacity: 0.8,
      }}>{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol style={{
        paddingLeft: '1.5rem',
        marginBottom: '2rem',
        lineHeight: 1.8,
        fontSize: '1.05rem',
        color: 'var(--color-parchment)',
        opacity: 0.8,
      }}>{children}</ol>
    ),
  },
}

export default function PortableTextRenderer({ content }: { content: any }) {
  if (!content) return null
  return (
    <div>
      <PortableText value={content} components={customComponents} />
    </div>
  )
}
