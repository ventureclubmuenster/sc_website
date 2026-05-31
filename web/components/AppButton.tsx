import GlowButton from './GlowButton'

export default function AppButton({ small }: { small?: boolean }) {
  return (
    <GlowButton href="https://app.startup-contacts.de" small={small} gradient noArrow>App</GlowButton>
  )
}
