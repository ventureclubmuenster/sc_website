import GlowButton from './GlowButton'

export default function WartelisteButton({ small, large }: { small?: boolean; large?: boolean }) {
  return (
    <GlowButton href="/tickets" small={small} large={large} gradient>Tickets</GlowButton>
  )
}
