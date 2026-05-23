import React from 'react'

/**
 * Rendert eine Headline und färbt alle Wörter/Phrasen, die in *Sternchen*
 * eingeschlossen sind, in Gradient-Farbe. Beispiel:
 *   "EIN *SPRINT* FÜR *ECHTE AUFGABEN* AUS DEM *MITTELSTAND*"
 *
 * Wenn die Headline keinen `*` enthält, wird das letzte Wort automatisch
 * in Gradient-Farbe gesetzt (Backwards-Compat-Verhalten).
 */
export function renderHeadline(headline: string): React.ReactNode {
  if (!headline) return null

  // `|` markiert einen harten Zeilenumbruch in der Headline.
  if (headline.includes('|')) {
    const lines = headline.split('|')
    return (
      <>
        {lines.map((line, i) => (
          <React.Fragment key={i}>
            {i > 0 && <br />}
            {renderHeadline(line.trim())}
          </React.Fragment>
        ))}
      </>
    )
  }

  if (headline.includes('*')) {
    const regex = /\*([^*]+)\*/g
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null
    let key = 0
    while ((match = regex.exec(headline)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <span key={`p-${key++}`} className="text-white">
            {headline.slice(lastIndex, match.index)}
          </span>
        )
      }
      parts.push(
        <span key={`g-${key++}`} className="gradient-text">
          {match[1]}
        </span>
      )
      lastIndex = match.index + match[0].length
    }
    if (lastIndex < headline.length) {
      parts.push(
        <span key={`p-${key++}`} className="text-white">
          {headline.slice(lastIndex)}
        </span>
      )
    }
    return <>{parts}</>
  }

  const words = headline.split(' ')
  if (words.length <= 1) {
    return <span className="gradient-text">{headline}</span>
  }
  const main = words.slice(0, -1).join(' ')
  const last = words[words.length - 1]
  return (
    <>
      <span className="text-white">{main} </span>
      <span className="gradient-text">{last}</span>
    </>
  )
}
