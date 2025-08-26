import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Testimonial } from '@/components/Testimonial'
import logoBrightPath from '@/images/clients/bright-path/logo-dark.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-dark.svg'
import logoGreenLife from '@/images/clients/green-life/logo-dark.svg'
import logoHomeWork from '@/images/clients/home-work/logo-dark.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-dark.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-dark.svg'
import logoPhobia from '@/images/clients/phobia/logo-dark.svg'
import logoUnseal from '@/images/clients/unseal/logo-dark.svg'
import { formatDate } from '@/lib/formatDate'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'
import bockerImage from '@/images/mockup.png'

/* =========================
   CaseStudies（実績あり時）
========================= */
async function CaseStudies({
  caseStudies,
  locale,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
  locale: string
}) {
  const t = await getTranslations({ locale, namespace: 'WorkPage' })
  return (
    <Container className="mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Case Studies
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        {caseStudies.map((caseStudy) => (
          <FadeIn key={caseStudy.client}>
            <article>
              <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
                <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                  <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16 flex-none"
                      unoptimized
                    />
                    <h3 className="mt-6 text-sm font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                      {caseStudy.client}
                    </h3>
                  </div>
                  <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                    <p className="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                      {caseStudy.service}
                    </p>
                    <p className="text-sm text-neutral-950 lg:mt-2">
                      <time dateTime={caseStudy.date}>
                        {formatDate(caseStudy.date)}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                  <p className="font-display text-4xl font-medium text-neutral-950">
                    <Link href={caseStudy.href}>{caseStudy.title}</Link>
                  </p>
                  <div className="mt-6 space-y-6 text-base text-neutral-600">
                    {caseStudy.summary.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-8 flex">
                    <Button
                      href={caseStudy.href}
                      aria-label={`Read case study: ${caseStudy.client}`}
                    >
                      {t('case.button')}
                    </Button>
                  </div>
                  {caseStudy.testimonial && (
                    <Blockquote
                      author={caseStudy.testimonial.author}
                      className="mt-12"
                    >
                      {caseStudy.testimonial.content}
                    </Blockquote>
                  )}
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}

/* =========================
   CaseStudiesPlaceholder（準備中）
========================= */
async function CaseStudiesPlaceholder({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'WorkPage' })
  return (
    <Container className="mt-32">
      <FadeIn>
        <div className="rounded-3xl bg-neutral-950 p-10 text-white sm:p-12">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            {t('placeholder.heading')}
          </h2>
          <p className="mt-4 text-neutral-300">
            {t.rich('placeholder.subheading', {
              strong: (c) => <strong className="text-white">{c}</strong>,
            })}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[{ key: 'c1' }, { key: 'c2' }, { key: 'c3' }].map(({ key }) => (
              <div
                key={key}
                className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition-colors hover:bg-white/10"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-lg font-semibold text-white">
                    {t(`placeholder.${key}.title`)}
                  </p>
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                </div>
                <p className="mb-3 text-sm text-neutral-400">
                  {t(`placeholder.${key}.subtitle`)}
                </p>
                <p className="mb-4 text-sm text-neutral-300">
                  {t(`placeholder.${key}.body`)}
                </p>

                <div className="mb-4 space-y-2">
                  {[0, 1, 2].map((idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-xs text-neutral-400"
                    >
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-400" />
                      {t(`placeholder.${key}.results.${idx}`)}
                    </div>
                  ))}
                </div>

                <div className="font-mono text-xs text-neutral-500">
                  {t(`placeholder.${key}.tech`)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="flex flex-wrap gap-3">
              <Button
                href="/process"
                aria-label={t('placeholder.ctaProcess')}
                invert
              >
                {t('placeholder.ctaProcess')}
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

/* =========================
   Clients（ロゴ）— 実績公開後に表示
========================= */
const clients = [
  ['Phobia', logoPhobia],
  ['Family Fund', logoFamilyFund],
  ['Unseal', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
  ['Home Work', logoHomeWork],
  ['Green Life', logoGreenLife],
  ['Bright Path', logoBrightPath],
  ['North Adventures', logoNorthAdventures],
]

function Clients() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          You’re in good company
        </h2>
      </FadeIn>
      <FadeInStagger className="mt-10" faster>
        <Border as={FadeIn} />
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
        >
          {clients.map(([client, logo]) => (
            <li key={client} className="group">
              <FadeIn className="overflow-hidden">
                <Border className="pt-12 group-nth-[-n+2]:-mt-px sm:group-nth-3:-mt-px lg:group-nth-4:-mt-px">
                  <Image src={logo} alt={client} unoptimized />
                </Border>
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </Container>
  )
}

/* =========================
   Metadata
========================= */
interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'WorkPage' })
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  return {
    title: t('og_title'),
    description: t('og_description'),
    openGraph: {
      title: t('og_title'),
      description: t('og_description'),
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}/work`,
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

/* =========================
   Page
========================= */
export default async function Work({ params }: Props) {
  const { locale } = await params
  const caseStudies = await loadCaseStudies()
  const hasCases = Array.isArray(caseStudies) && caseStudies.length > 0
  const t = await getTranslations({ locale, namespace: 'WorkPage' })

  return (
    <>
      <PageIntro
        eyebrow="Our Work"
        title={hasCases ? t('intro.hasCases.title') : t('intro.noCases.title')}
      >
        <p className="text-sm text-neutral-600 md:text-base">
          {hasCases
            ? t('intro.hasCases.description')
            : t('intro.noCases.description')}
        </p>
        {!hasCases && (
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" aria-label={t('intro.noCases.ctaContact')}>
              {t('intro.noCases.ctaContact')}
            </Button>
          </div>
        )}
      </PageIntro>
      <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 md:mt-0 md:grid-cols-2">
        <div className="h-56 w-full md:h-full">
          <Image
            className="h-full w-full object-cover"
            src={bockerImage}
            alt="Bocker"
          />
        </div>
        <PageIntro eyebrow="Salon Management System" title="Bocker">
          <p className="text-sm text-neutral-600 md:text-base">
            {t.rich('bocker.description', {
              strong: (c) => <strong>{c}</strong>,
            })}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href="https://bocker.jp/ja"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('bocker.buttons.site')}
            </Button>
            <Button href="/contact?topic=monitor">
              {t('bocker.buttons.monitor')}
            </Button>
          </div>
        </PageIntro>
      </div>

      {hasCases ? (
        <CaseStudies caseStudies={caseStudies} locale={locale} />
      ) : (
        <CaseStudiesPlaceholder locale={locale} />
      )}

      {/* 実績があるときのみテスティモニアル＆ロゴを表示 */}
      {hasCases && (
        <>
          <Testimonial
            className="mt-24 sm:mt-32 lg:mt-40"
            client={{ name: 'Mail Smirk', logo: logoMailSmirk }}
          >
            {t('testimonial.text')}
          </Testimonial>

          <Clients />
        </>
      )}

      <ContactSection />
    </>
  )
}

/* =========================
   追記：ケース追加メモ（MDX例）
   /content/case-studies/acme-automation.mdx を作成
   ---
   client: "ACME Inc."
   service: "Automation / Workflow"
   date: "2025-07-10"
   title: "在庫同期90秒・手作業-70%を実現"
   logo: "/images/clients/acme/logo.svg"
   summary:
     - "課題：在庫更新に月20時間、反映遅延で機会損失。"
     - "解決：n8n×Inngestで在庫同期を自動化、例外は自動リトライ。"
     - "結果：90秒以内で反映、工数-70%、売上+12%。"
   testimonial:
     author:
       name: "山田 太郎"
       role: "COO"
     content: "最小構成で素早く立ち上がり、効果が出た領域のみ投資できました。"
   ---
========================= */
