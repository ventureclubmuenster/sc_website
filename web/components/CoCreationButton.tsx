import GlowButton from './GlowButton'

export default function CoCreationButton({ small, large }: { small?: boolean; large?: boolean }) {
  return (
    <GlowButton href="/co-creation" small={small} large={large} gradient silver>Co-Creation</GlowButton>
  )
}
