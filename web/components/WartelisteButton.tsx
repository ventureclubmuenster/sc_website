import GlowButton from './GlowButton'

export default function WartelisteButton({ small }: { small?: boolean }) {
  return (
    <GlowButton href="/tickets" small={small} gradient>Tickets</GlowButton>
  )
}
