import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from 'sanity:client'

const builder = imageUrlBuilder(sanityClient)

/**
 * Sanity Image URL Builder.
 * Otomatis mengkonversi ke format WebP dan kualitas 80%.
 * Admin bisa upload foto 10MB, pengunjung hanya menerima ~100-300KB.
 */
export function urlFor(source: any) {
  return builder.image(source).auto('format').quality(80)
}
