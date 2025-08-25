import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { getTranslations } from 'next-intl/server'
import bockerImage from '@/images/mockup.png'
import Image from 'next/image'

// このページで許可するロケールのホワイトリスト
const WHITELISTED_LOCALES = ['ja', 'en'] as const

// 非ホワイトリストのパラメータは404にする（SSG時に生成されたもののみ許可）
export const dynamicParams = false

export function generateStaticParams() {
  return WHITELISTED_LOCALES.map((locale) => ({ locale }))
}



interface FeaturesProps {
  t: (key: string) => any
}

function Features({ t }: FeaturesProps) {
  const features = [
    {
      title: t('mainFeatures.feature1.title'),
      description: t('mainFeatures.feature1.description'),
      details: [
        t('mainFeatures.feature1.detail1'),
        t('mainFeatures.feature1.detail2'),
        t('mainFeatures.feature1.detail3'),
        t('mainFeatures.feature1.detail4')
      ]
    },
    {
      title: t('mainFeatures.feature2.title'),
      description: t('mainFeatures.feature2.description'),
      details: [
        t('mainFeatures.feature2.detail1'),
        t('mainFeatures.feature2.detail2'),
        t('mainFeatures.feature2.detail3')
      ]
    },
    {
      title: t('mainFeatures.feature3.title'),
      description: t('mainFeatures.feature3.description'),
      details: [
        t('mainFeatures.feature3.detail1'),
        t('mainFeatures.feature3.detail2'),
        t('mainFeatures.feature3.detail3')
      ]
    },
    {
      title: t('mainFeatures.feature4.title'),
      description: t('mainFeatures.feature4.description'),
      details: [
        t('mainFeatures.feature4.detail1'),
        t('mainFeatures.feature4.detail2'),
        t('mainFeatures.feature4.detail3')
      ]
    }
  ]

  return (
    <Container className="mt-24 sm:mt-32">
      <FadeIn>
        <div className="flex items-center justify-between bg-white/50">
          <h2 className="font-display text-2xl font-semibold text-nowrap text-neutral-950">
            {t('mainFeatures.title')}
          </h2>
        </div>
      </FadeIn>
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {features.map((feature: any) => (
          <FadeIn key={feature.title}>
            <div className="rounded-3xl border border-neutral-200 p-6">
              <h3 className="font-display text-xl font-bold text-neutral-950">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm text-neutral-600">
                {feature.description}
              </p>
              <ul className="mt-6 space-y-2">
                {feature.details.map((detail: string) => (
                  <li
                    key={detail}
                    className="flex items-center text-sm text-neutral-700"
                  >
                    <div className="mr-3 max-h-1.5 min-h-1.5 max-w-1.5 min-w-1.5 rounded-full bg-green-600" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}


interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'BockerPage' })
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}/work/bocker`,
      images: [
        {
          url: `${baseUrl}/apple-touch-icon.png`, // OGP画像への絶対パス
          width: 180,
          height: 180,
          alt: t('title'),
        },
      ],
    },
  }
}   

export default async function Bocker({ params }: Props) {
  const { locale } = await params
  // ランタイムでも保険としてロケールをチェック
  if (!WHITELISTED_LOCALES.includes(locale as (typeof WHITELISTED_LOCALES)[number])) {
    notFound()
  }
  
  const t = await getTranslations({ locale, namespace: 'BockerPage' })
  
  return (
    <>
      <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 md:mt-0 md:grid-cols-2">
        <div className="h-56 w-full md:h-full">
          <Image
            className="h-full w-full object-cover"
            src={bockerImage}
            alt="Bocker"
          />
        </div>
        <PageIntro eyebrow={t('intro.eyebrow')} title={t('intro.title')}>
          <p className="text-sm text-neutral-600 md:text-base">
            {t.rich('intro.description', {
              strong: (c) => (
                <strong className="font-semibold text-neutral-950">{c}</strong>
              ),
            })}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href="https://bocker.jp/ja"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('intro.buttons.officialSite')}
            </Button>
            <Button href="/contact?topic=monitor">
              {t('intro.buttons.monitorRecruitment')}
            </Button>
          </div>
        </PageIntro>
      </div>
      {/* プロジェクト基本情報 */}
      <Container className="mt-24 sm:mt-32">
        <FadeIn>
          <div className="border-t border-neutral-200">
            <div className="mx-auto max-w-5xl">
              <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3">
                <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-t-0 sm:border-l">
                  <dt className="font-semibold">
                    {t('projectInfo.industry.title')}
                  </dt>
                  <dd>{t('projectInfo.industry.item1')}</dd>
                  <dd>{t('projectInfo.industry.item2')}</dd>
                  <dd>{t('projectInfo.industry.item3')}</dd>
                  <dd>{t('projectInfo.industry.item4')}</dd>
                </div>

                <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-t-0 sm:border-l">
                  <dt className="font-semibold">
                    {t('projectInfo.features.title')}
                  </dt>
                  <dd>{t('projectInfo.features.item1')}</dd>
                  <dd>{t('projectInfo.features.item2')}</dd>
                  <dd>{t('projectInfo.features.item3')}</dd>
                  <dd>{t('projectInfo.features.item4')}</dd>
                  <dd>{t('projectInfo.features.item5')}</dd>
                </div>
                <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-t-0 sm:border-l">
                  <dt className="font-semibold">
                    {t('projectInfo.development.title')}
                  </dt>
                  <dd>{t('projectInfo.development.period')}</dd>
                </div>
              </dl>
            </div>
          </div>
        </FadeIn>
      </Container>

      {/* 主要機能 */}
      <Features t={t} />

      {/* サロンオーナー様の声 */}
      <Container className="mt-24 sm:mt-32">
        <FadeIn>
          <div className="rounded-3xl bg-gradient-to-r from-green-100 to-emerald-200 p-10 sm:p-12">
            <h2 className="font-display text-2xl font-semibold text-green-900">
              {t('reasons.title')}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold text-green-900">
                  {t('reasons.item1.title')}
                </h3>
                <p className="text-sm text-green-700">
                  {t('reasons.item1.description')}
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-green-900">
                  {t('reasons.item2.title')}
                </h3>
                <p className="text-sm text-green-700">
                  {t('reasons.item2.description')}
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-green-900">
                  {t('reasons.item3.title')}
                </h3>
                <p className="text-sm text-green-700">
                  {t('reasons.item3.description')}
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-green-900">
                  {t('reasons.item4.title')}
                </h3>
                <p className="text-sm text-green-700">
                  {t('reasons.item4.description')}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
      <ContactSection />
    </>
  )
}
