// Zentrale Schedule-Daten für Startup Contacts 2026 (15. Juni 2026).
// Single Source of Truth für Main-Stage-, Podcast- und Programm-Übersichts-Seite.
// Daten fest im Code gepflegt (kein CMS) — bei Änderungen hier anpassen.

export type ScheduleFormat =
  | 'Keynote'
  | 'Panel'
  | 'Fireside'
  | 'Podcast'
  | 'Break'
  | 'Opening'
  | 'Closing'
  | 'CoCreation'

export interface ScheduleSlot {
  /** Startzeit als reiner 'HH:MM'-String (kein ISO → keine Zeitzonen-Bugs). */
  startTime: string
  endTime?: string
  title?: string
  /** Speaker / Gast-Name. */
  speaker?: string
  /** Firma oder Rolle. */
  company?: string
  format: ScheduleFormat
}

export interface Workshop {
  title: string
  speaker?: string
}

/* ── Main Stage (15. Juni 2026) ── */
export const mainStageSchedule: ScheduleSlot[] = [
  { startTime: '10:00', endTime: '10:10', title: 'Eröffnung', format: 'Opening' },
  { startTime: '10:10', endTime: '10:40', title: 'In welchen Bereichen liegt das meiste Gründungspotenzial?', speaker: 'Christian Arndt', company: 'HTGF', format: 'Keynote' },
  { startTime: '10:40', endTime: '11:20', title: 'Google Founders Story: Drei Startups über ihren Weg der Gründung & Skalierung', company: 'Google Cloud · VisioLab · Entryzero · remberg', format: 'Panel' },
  { startTime: '11:20', endTime: '12:00', title: '20 Millionen Nutzer später: Die Learnings hinter dem Wachstum von Knowunity', speaker: 'Benedict Kurz', company: 'Knowunity', format: 'Fireside' },
  {
    startTime: '12:00',
    endTime: '12:30',
    title: 'Was Gründer:innen über Organisationen verstehen müssen, um wirklich skalieren zu können',
    speaker: 'Susanne Ringen',
    company: 'Leadership Hub',
    format: 'Keynote',
  },
  { startTime: '12:30', endTime: '14:00', title: 'Mittagspause', format: 'Break' },
  { startTime: '14:00', endTime: '14:40', title: 'State of VC: KI, Wirtschaft und vieles mehr. So ist die aktuelle Lage beim Venture Capital', company: 'eCapital · Heimatboost · Gründerfonds Ruhr', format: 'Panel' },
  {
    startTime: '14:40',
    endTime: '15:00',
    title: 'AI-first für den Mittelstand: Wie clockin vom Tool zum Invisible COO wird',
    speaker: 'Frederik Neuhaus',
    company: 'Clockin',
    format: 'Keynote',
  },
  { startTime: '15:20', endTime: '15:50', title: 'Warum Splash viral ging: Die Story hinter dem Erfolg', speaker: 'Jeremy & Hannes', company: 'Splash', format: 'Panel' },
  { startTime: '15:50', endTime: '16:20', title: 'Co-Creation Challenge', format: 'CoCreation' },
  { startTime: '16:20', endTime: '17:00', title: 'Die OACE Story: Brand Building & Hype', speaker: 'Alexander Glörfeld & Jan Kraume', company: 'Oace', format: 'Panel' },
  { startTime: '17:00', title: 'Abschluss', format: 'Closing' },
]

/* ── Live Podcasts (15. Juni 2026) ── */
export const podcastSchedule: ScheduleSlot[] = [
  {
    startTime: '10:30',
    endTime: '11:05',
    title: 'Trainee oder Gründer? Warum nicht beides?',
    company: 'Ikea',
    format: 'Podcast',
  },
  {
    startTime: '11:15',
    endTime: '12:00',
    title: 'Wie innovativ kann eine Bürgermeister wirklich sein?',
    speaker: 'Tilmann Fuchs',
    company: 'Bürgermeister Münster',
    format: 'Podcast',
  },
  {
    startTime: '12:15',
    endTime: '13:15',
    title: 'Vom Partyspiel zum Startup',
    speaker: 'Jeremy & Hannes',
    company: 'Splash',
    format: 'Podcast',
  },
  {
    startTime: '13:30',
    endTime: '14:15',
    title: 'David gegen Goliath: Mit Community statt Kapital',
    speaker: 'Alexander Weiss',
    company: 'Flats for Friendz',
    format: 'Podcast',
  },
  {
    startTime: '14:30',
    endTime: '15:15',
    title: 'USA vs. Deutschland - Einblicke in die Startup-Welt',
    company: 'Founder Born & Kepler · CTO Atari',
    format: 'Podcast',
  },
  {
    startTime: '15:30',
    endTime: '16:15',
    title: 'Von 3,0 auf Einser-Schnitt: Productivity-Creator Luis Newton',
    speaker: 'Luis Newton',
    company: 'Youtuber',
    format: 'Podcast',
  },
  {
    startTime: '16:20',
    endTime: '17:00',
    title: 'Von der Idee zur Gründung: Hochschule, Team & KI',
    speaker: 'Geminos',
    format: 'Podcast',
  },
]

/** Deutsche Anzeige-Bezeichnung pro Format. */
export const formatLabels: Record<ScheduleFormat, string> = {
  Keynote: 'Keynote',
  Panel: 'Paneltalk',
  Fireside: 'Fireside Chat',
  Podcast: 'Live Podcast',
  Break: 'Pause',
  Opening: 'Eröffnung',
  Closing: 'Abschluss',
  CoCreation: 'Co-Creation',
}

export interface FormatStyle {
  /** Klassen für das Format-Badge (Pill). */
  badge: string
  /** Klasse für den farbigen Akzent-Balken links an der Karte. */
  accent: string
}

/**
 * Reduziertes Stil-System (an die App-UI angelehnt): der vertikale Akzent-Balken
 * bleibt immer grau, nur die Format-Badges erhalten Farbe — Keynote rot,
 * Paneltalk orange, alle übrigen Formate neutral.
 */
export function formatStyle(format: ScheduleFormat): FormatStyle {
  switch (format) {
    case 'Keynote':
      return { badge: 'bg-red-400/10 text-red-200 border-red-400/25', accent: 'bg-white/30' }
    case 'Panel':
      return { badge: 'bg-orange-400/10 text-orange-200 border-orange-400/25', accent: 'bg-white/30' }
    case 'Break':
      return { badge: 'bg-white/5 text-white/40 border-white/10', accent: 'bg-white/15' }
    default:
      return { badge: 'bg-white/10 text-white/70 border-white/15', accent: 'bg-white/30' }
  }
}
