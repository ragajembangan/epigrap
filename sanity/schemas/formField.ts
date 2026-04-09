import { defineField, defineType } from 'sanity'

/**
 * formField — Schema objek (bukan dokumen).
 * Digunakan di dalam array pada siteConfig untuk mendefinisikan
 * kolom input secara dinamis dari dashboard Sanity.
 *
 * Contoh penggunaan:
 * - Form Reservasi (/reservasi)
 * - Form Partner (/partner)
 */
export const formField = defineType({
  name: 'formField',
  title: 'Kolom Form',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label Input',
      type: 'string',
      description: 'Label yang ditampilkan ke pengunjung, contoh: "Nama Lengkap".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fieldName',
      title: 'Nama Field / ID',
      type: 'string',
      description:
        'ID teknis untuk form submission, contoh: "full_name", "wa_number". Gunakan snake_case tanpa spasi.',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z][a-z0-9_]*$/, {
            name: 'snake_case',
            invert: false,
          })
          .error('Gunakan format snake_case (contoh: nama_lengkap, no_wa).'),
    }),
    defineField({
      name: 'inputType',
      title: 'Tipe Input',
      type: 'string',
      options: {
        list: [
          { title: 'Teks (text)', value: 'text' },
          { title: 'Email', value: 'email' },
          { title: 'Angka (number)', value: 'number' },
          { title: 'Pilihan (select)', value: 'select' },
          { title: 'Teks Panjang (textarea)', value: 'textarea' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'required',
      title: 'Wajib Diisi?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'options',
      title: 'Opsi Pilihan',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Daftar opsi yang tersedia. Hanya berlaku jika Tipe Input = "Pilihan (select)".',
      hidden: ({ parent }) => parent?.inputType !== 'select',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Urutan Tampil',
      type: 'number',
      description: 'Angka kecil tampil lebih dulu (1, 2, 3, ...).',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      inputType: 'inputType',
      required: 'required',
      sortOrder: 'sortOrder',
    },
    prepare({ title, inputType, required, sortOrder }) {
      return {
        title: `${sortOrder ?? 0}. ${title}`,
        subtitle: `${inputType} ${required ? '· wajib' : ''}`,
      }
    },
  },
})
