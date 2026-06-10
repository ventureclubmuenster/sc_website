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
  { startTime: '10:10', endTime: '10:40', title: 'Was Gründer über Kapital wissen müssen', speaker: 'Christian Arndt', company: 'HTGF', format: 'Keynote' },
  { startTime: '10:40', endTime: '11:20', title: 'Google Founders Story', company: 'Google Cloud', format: 'Panel' },
  { startTime: '11:20', endTime: '12:00', title: 'Vom Abitur zur EdTech-Erfolgsstory', speaker: 'Benedict Kurz', company: 'Knowunity', format: 'Fireside' },
  {
    startTime: '12:00',
    endTime: '12:30',
    title: 'Was Gründer:innen über Organisationen verstehen müssen, um wirklich skalieren zu können',
    speaker: 'Susanne Ringen',
    company: 'Leadership Hub',
    format: 'Keynote',
  },
  { startTime: '12:30', endTime: '14:00', title: 'Mittagspause', format: 'Break' },
  { startTime: '14:00', endTime: '14:40', title: 'State of VC', company: 'eCapital · Heimatboost · Gründerfonds Ruhr', format: 'Panel' },
  {
    startTime: '14:40',
    endTime: '15:00',
    title: 'AI-first für den Mittelstand: Wie clockin vom Tool zum Invisible COO wird',
    speaker: 'Frederik Neuhaus',
    company: 'Clockin',
    format: 'Keynote',
  },
  { startTime: '15:20', endTime: '15:50', title: 'Vom Partyspiel zum Startup', speaker: 'Jeremy & Hannes', company: 'Splash', format: 'Panel' },
  { startTime: '15:50', endTime: '16:20', title: 'Co-Creation Challenge', format: 'CoCreation' },
  { startTime: '16:20', endTime: '17:00', title: 'Alexander Glörfeld, Jan Kraume', company: 'Oace', format: 'Panel' },
  { startTime: '17:00', title: 'Abschluss', format: 'Closing' },
]

/* ── Live Podcasts (15. Juni 2026) ── */
export const podcastSchedule: ScheduleSlot[] = [
  {
    startTime: '10:30',
    endTime: '11:05',
    title: 'David Kittel-Hellriegel & Younes Sakali',
    company: 'Ikea',
    format: 'Podcast',
  },
  {
    startTime: '11:15',
    endTime: '12:00',
    title: 'Was hält einen Gründer in Münster?',
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
    title: 'Andreas Deptolla',
    company: 'Founder Born & Kepler · CTO Atari',
    format: 'Podcast',
  },
  {
    startTime: '15:30',
    endTime: '16:15',
    title: 'Produktivität, KI-Tools & Lernen',
    speaker: 'Luis Newton',
    company: 'YouTuber',
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

/** Farbcodiertes, dezentes Stil-System pro Format (heller, mehrfarbig, wenig Orange). */
export function formatStyle(format: ScheduleFormat): FormatStyle {
  switch (format) {
    case 'Keynote':
      return { badge: 'bg-sky-400/10 text-sky-200 border-sky-400/25', accent: 'bg-sky-400/70' }
    case 'Panel':
      return { badge: 'bg-violet-400/10 text-violet-200 border-violet-400/25', accent: 'bg-violet-400/70' }
    case 'Fireside':
      return { badge: 'bg-amber-400/10 text-amber-200 border-amber-400/25', accent: 'bg-amber-400/70' }
    case 'Podcast':
      return { badge: 'bg-rose-400/10 text-rose-200 border-rose-400/25', accent: 'bg-rose-400/70' }
    case 'CoCreation':
      return { badge: 'bg-emerald-400/10 text-emerald-200 border-emerald-400/25', accent: 'bg-emerald-400/70' }
    case 'Opening':
    case 'Closing':
      return { badge: 'bg-white/10 text-white/80 border-white/20', accent: 'bg-white/40' }
    case 'Break':
      return { badge: 'bg-white/5 text-white/40 border-white/10', accent: 'bg-white/15' }
  }
}
