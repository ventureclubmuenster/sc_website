import { client } from '@/lib/sanity/client'
import { mainStagePageQuery, programQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroSection from '@/components/HeroSection'
import HallOfFame from '@/components/HallOfFame'
import MainStageContent from './MainStageContent'

async function getMainStageData() {
  const [page, programs] = await Promise.all([
    client.fetch(mainStagePageQuery, {}, { next: { revalidate: 3600 } }),
    client.fetch(programQuery, {}, { next: { revalidate: 3600 } }),
  ])
  return { page, programs }
}

export default async function MainStagePage() {
  const { page, programs } = await getMainStageData()

  const heroImageUrl = page?.heroImage
    ? urlFor(page.heroImage).width(1920).height(1080).url()
    : undefined

  const keynotes = programs?.filter(
    (p: { type: string }) => p.type === 'Keynote'
  ) ?? []
  const panels = programs?.filter(
    (p: { type: string }) => p.type === 'Panel Discussion'
  ) ?? []

  return (
    <>
      <HeroSection
        imageUrl={heroImageUrl}
        headline="PERSPEKTIVEN DIE BEWEGEN"
        subtext="Erlebe den direkten Austausch zwischen Theorie und Praxis. Unsere Speaker teilen ihre Erfahrungen und diskutieren gemeinsam über die Lösungen von morgen."
      />

      <MainStageContent
        keynotes={keynotes}
        panels={panels}
        flashbackTitle={page?.flashbackTitle}
        flashbackTags={page?.flashbackTags}
      />

      {page?.hallOfFame && <HallOfFame speakers={page.hallOfFame} />}
    </>
  )
}
