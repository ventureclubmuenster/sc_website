'use client'

import { useState } from 'react'
import GlowButton from './GlowButton'
import NewsletterModal from './NewsletterModal'

export default function WartelisteButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <GlowButton onClick={() => setOpen(true)}>erhalte alle News</GlowButton>
      <NewsletterModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
