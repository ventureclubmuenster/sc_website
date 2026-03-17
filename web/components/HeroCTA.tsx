'use client'

import { useState } from 'react'
import GlowButton from './GlowButton'
import NewsletterModal from './NewsletterModal'

export default function HeroCTA() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <GlowButton onClick={() => setOpen(true)}>zur Warteliste</GlowButton>
      <NewsletterModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
