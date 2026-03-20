'use client'

import { useState } from 'react'
import GlowButton from './GlowButton'
import NewsletterModal from './NewsletterModal'

export default function WartelisteButton({ small }: { small?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <GlowButton onClick={() => setOpen(true)} small={small}>erhalte alle News</GlowButton>
      <NewsletterModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
