import { StaggerContainer, StaggerItem } from '@/components/FadeIn'

interface FAQ {
  question: string
  answer: string
}

const defaults: FAQ[] = [
  {
    question: 'Wer kann sich für die Co-Creation Challenge bewerben?',
    answer:
      'Studierende aller Fachrichtungen sowie Young Professionals mit relevantem Bezug zu den Themenfeldern. Wir suchen motivierte Köpfe, die Lust haben, an realen Problemen zu arbeiten. Vom ersten Semester bis kurz vor dem Abschluss sind alle willkommen.',
  },
  {
    question: 'Warum sollte ich teilnehmen?',
    answer:
      'Weil du in einem Tag das mitnimmst, wofür Praktika oft Monate brauchen: praktische Innovationserfahrung an einer echten Unternehmens-Challenge, einen Preis für das Gewinner-Team, die Chance, eventuell auf der Mainstage vor hunderten von Leuten zu pitchen, und enge Kontakte zu Unternehmen, Startup-Coaches und dem VCM-Netzwerk.',
  },
  {
    question: 'Was muss ich mit meiner Bewerbung einreichen?',
    answer:
      'Die Bewerbung ist komplett formlos. Erzähl uns kurz, warum du dabei sein willst und welches Problemfeld dich besonders reizt. Wir suchen motivierte Persönlichkeiten, keine perfekt formulierten Anschreiben.',
  },
  {
    question: 'Wie sind die Teams zusammengesetzt?',
    answer:
      'Insgesamt arbeiten 30 Teilnehmerinnen und Teilnehmer in interdisziplinären Teams an den Corporate Challenges. Studierende, Young Professionals, Unternehmensvertreter und Coaches sitzen gemeinsam am Tisch.',
  },
  {
    question: 'Brauche ich technisches Vorwissen oder Programmierkenntnisse?',
    answer:
      'Nein. Co-Creation ist kein Coding-Hackathon. Der Fokus liegt auf Problemlösung, nicht auf Technik. Wir suchen einen Mix aus Disziplinen: von BWL über Ingenieurwesen bis Design. Wer programmieren kann, ist willkommen, aber es ist kein Muss.',
  },
  {
    question: 'Wo und wann findet die Co-Creation Challenge statt?',
    answer:
      'Im Rahmen der Startup Contacts Messe in der MCC Halle Münsterland, in der Galerie OG, in einem eigenen Raum mit kreativem Setup für intensive Teamarbeit. Die Co-Creation Challenge läuft von 09:00 bis 16:30 Uhr, das Startup-Contacts-Programm endet um 18:00 Uhr.',
  },
  {
    question: 'Was wird gestellt und was muss ich selbst mitbringen?',
    answer:
      'Wir stellen Lizenzen für relevante Software und KI-Tools sowie ausreichend Kollaborations-Tools (Whiteboard, Miro etc.) für jedes Team. Mitbringen solltest du deinen eigenen Laptop inkl. Ladekabel.',
  },
  {
    question: 'Gibt es eine Vergütung oder ein Preisgeld?',
    answer:
      'Eine Vergütung gibt es nicht. Es wird Preise für das Gewinner-Team geben, die genauen Preise geben wir noch bekannt.',
  },
  {
    question: 'Was passiert mit den entwickelten Lösungen nach dem Tag?',
    answer:
      'Die entwickelten Solution Drafts gehören dem Team gemeinsam mit dem Unternehmen. Manche Konzepte werden direkt im Unternehmen weiterverfolgt, andere bilden die Basis für eine spätere Zusammenarbeit, ein Praktikum oder ein eigenes Startup. Wir vermitteln auch nach der Messe Kontakte und unterstützen, wo wir können.',
  },
]

interface FAQSectionProps {
  faqs?: FAQ[]
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const items = faqs?.length ? faqs : defaults

  return (
    <section className="relative z-10 px-6 py-20" id="faq">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-4">
          <span className="text-white">FRAGEN & </span>
          <span className="gradient-text">ANTWORTEN</span>
        </h2>
        <p className="text-white/50 text-center max-w-2xl mx-auto mb-12 text-base md:text-lg">
          Alles, was du wissen musst, auf einen Blick.
        </p>

        <StaggerContainer stagger={0.06} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {items.map((item, i) => (
            <StaggerItem key={i} direction="up" distance={20}>
              <div
                tabIndex={0}
                className="group liquid-glass rounded-2xl px-6 py-5 cursor-pointer transition-all duration-300 hover:border-sc-orange/40 hover:bg-black/40 focus-within:border-sc-orange/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base md:text-lg font-bold text-white leading-snug pr-2">
                    {item.question}
                  </h3>
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/60 transition-all duration-300 group-hover:rotate-45 group-hover:border-sc-orange/60 group-hover:text-sc-orange group-focus-within:rotate-45 group-focus-within:border-sc-orange/60 group-focus-within:text-sc-orange"
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M7 1v12M1 7h12" />
                    </svg>
                  </span>
                </div>

                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                  <div className="overflow-hidden">
                    <div className="pt-4 mt-4 border-t border-white/10">
                      <p className="text-white/70 text-sm md:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
