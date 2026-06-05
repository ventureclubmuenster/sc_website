import GlowButton from './GlowButton'

export default function SubtleTicketCTA({ text = 'Jetzt Ticket sichern' }: { text?: string }) {
  return (
    <div className="relative z-10 flex justify-center pb-16">
      {/* Gleicher Look & Effekt wie der "Tickets"-Button in der Navigation
          (GlowButton, gradient) – nur größer für mehr Aufmerksamkeit. */}
      <GlowButton href="/tickets" gradient small glowStrength={0}>
        {text}
      </GlowButton>
    </div>
  )
}
