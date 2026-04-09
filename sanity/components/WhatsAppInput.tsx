import React, { useCallback } from 'react'
import type { StringInputProps } from 'sanity'
import { set, unset } from 'sanity'
import { TextInput, Stack, Badge } from '@sanity/ui'

export function WhatsAppInput(props: StringInputProps) {
  const { elementProps, onChange, value = '' } = props

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let nextValue = event.currentTarget.value || ''
      
      // Hapus semua karakter yang bukan angka (seperti spasi, tanda +, strip -)
      nextValue = nextValue.replace(/\D/g, '')

      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange]
  )

  const isValidNumber = !value || value.startsWith('62') || value.startsWith('08')

  return (
    <Stack space={3}>
      <TextInput
        {...elementProps}
        onChange={handleChange}
        value={value}
        placeholder="Contoh: 62812... atau 0812..."
        type="tel"
      />
      {!isValidNumber && (
        <Badge tone="critical" padding={2}>
          Error: Nomor WA harus diawali dengan 62 atau 08.
        </Badge>
      )}
    </Stack>
  )
}
