import GlowButton from './GlowButton'

export default function HeroCTA({ small, large }: { small?: boolean; large?: boolean }) {
  return (
    <GlowButton href="/newsletter" small={small} large={large} gradient>
      Waitlist
    </GlowButton>
  )
}
