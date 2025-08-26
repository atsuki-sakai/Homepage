import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'

/* ---------- Culture（カルチャー） ---------- */
async function Culture({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'AboutPage' })
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow={t('culture.eyebrow')}
        title={t('culture.title')}
        invert
      >
        <p className='text-sm md:text-base  text-neutral-300'>
          {t('culture.description')}
        </p>
      </SectionIntro>

      <Container className="mt-16">
        <GridList>
          <GridListItem title={t('culture.items.item1.title')} invert>
            <span className='text-neutral-300'>{t('culture.items.item1.body')}</span>
          </GridListItem>
          <GridListItem title={t('culture.items.item2.title')} invert>
            <span className='text-neutral-300'>{t('culture.items.item2.body')}</span>
          </GridListItem>
          <GridListItem title={t('culture.items.item3.title')} invert>
            <span className='text-neutral-300'>{t('culture.items.item3.body')}</span>
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

/* ---------- Team（体制） ---------- */
const team = [
  {
    title: 'Members',
    people: [
      {
        name: 'ATSUKI SAKAI',
        role: 'team.person1.role',
        image: { src: '', alt: 'ATSUKI SAKAI' },
        message: 'team.person1.message',
      },
    ],
  },
  // 拡張時は下記のように増やしてください
  // {
  //   title: 'Team',
  //   people: [
  //     { name: '...', role: 'Senior Developer', image: { src: ... } },
  //   ],
  // },
]

async function Team({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'AboutPage' })
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          {person.image && person.image.src !== '' && (
                            <Image
                              {...person.image}
                              alt={person.name || ''}
                              className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                            />
                          )}
                          {person.image && person.image.src === '' ? (
                            <div className="flex h-96 w-full flex-col items-center justify-center bg-gradient-to-tr from-neutral-800 to-black object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105">
                              <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                                {person.name}
                              </p>
                              <p className="mt-2 text-sm text-white">
                                {t(person.role)}
                              </p>
                              <p className="p-4 text-xs leading-relaxed text-white">
                                {t(person.message)}
                              </p>
                            </div>
                          ) : (
                            <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black to-black/0 to-40% p-6">
                              <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                                {person.name}
                              </p>
                              <p className="mt-2 text-sm text-white">
                                {t('team.person1.role')}
                              </p>
                            </div>
                          )}
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

/* ---------- Metadata ---------- */
// OGPメタデータを動的に生成
export async function generateMetadata({ 
  params,
  }: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'AboutPage' })
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  return {
    title: t('og_title'),
    description: t('og_description'),
    openGraph: {
      title: t('og_title'),
      description: t('og_description'),
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}/about`,
      images: [
        {
          url: `${baseUrl}/apple-touch-icon.png`, // OGP画像への絶対パス
          width: 180,
          height: 180,
          alt: t('og_title'),
        },
      ],
    },
  }
}




/* ---------- Page ---------- */
export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'AboutPage' })
  return (
    <>
      {/* ページ導入 */}
      <PageIntro eyebrow="About us" title={t('intro.title')}>
        <p className='text-sm md:text-base  text-neutral-600'>
          {t('intro.p1')}
        </p>

        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p className='text-sm md:text-base  text-neutral-600'>
            {t('intro.p2')}
          </p>
          <p className='text-sm md:text-base  text-neutral-600'>
            {t('intro.p3')}
          </p>
        </div>
      </PageIntro>

      {/* 統計（訴求ポイントを4つに統一） */}
      <Container className="mt-16">
        <StatList>
          <StatListItem value={t('stats.stat1.value')} label={t('stats.stat1.label')} />
          <StatListItem value={t('stats.stat2.value')} label={t('stats.stat2.label')} />
          <StatListItem value={t('stats.stat3.value')} label={t('stats.stat3.label')} />
          <StatListItem value={t('stats.stat4.value')} label={t('stats.stat4.label')} />
        </StatList>
      </Container>

      {/* カルチャー */}
      <Culture locale={locale} />

      {/* 体制 */}
      <Team locale={locale} />

      {/* お問い合わせ */}
      <ContactSection />
    </>
  )
}
