import GlowButton from './GlowButton'

export default function AppButton({ small, wide }: { small?: boolean; wide?: boolean }) {
  return (
    <GlowButton href="https://app.startup-contacts.de" small={small} wide={wide} gradient noArrow>App</GlowButton>
  )
}
