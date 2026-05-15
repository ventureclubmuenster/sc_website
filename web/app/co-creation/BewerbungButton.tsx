'use client'

import { useState } from 'react'
import GlowButton from '@/components/GlowButton'
import CoCreationModal from '@/components/CoCreationModal'

export default function BewerbungButton({
  small,
  large,
}: {
  href?: string
  small?: boolean
  large?: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <GlowButton onClick={() => setOpen(true)} small={small} large={large} gradient>
        Jetzt bewerben
      </GlowButton>
      <CoCreationModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
