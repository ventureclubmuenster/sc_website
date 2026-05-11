import GlowButton from '@/components/GlowButton'

export default function BewerbungButton({
  href,
  small,
  large,
}: {
  href?: string
  small?: boolean
  large?: boolean
}) {
  const url = href ?? 'https://tally.so/r/PLACEHOLDER'
  return (
    <GlowButton href={url} small={small} large={large} gradient>
      Jetzt bewerben
    </GlowButton>
  )
}
