import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { ContactForm } from '@/components/ContactForm'

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ContactPage' })
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical: 'https://kondax.com/' + locale + '/contact',
    },
    openGraph: {
      title: t('pageTitle'),
      description: t('pageDescription'),
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}/contact`,
      images: [
        {
          url: `${baseUrl}/apple-touch-icon.png`,
          width: 180,
          height: 180,
          alt: t('pageTitle'),
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}


export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ContactPage' })
  
  return (
    <>
      <PageIntro eyebrow="Contact Us" title={t('pageTitle')}>
        <p className="text-sm text-neutral-600 md:text-base">
          {t('pageDescription')}
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <div>
            <div className="mt-6 text-sm text-neutral-600 md:text-base">
              <h2 className="mb-6 font-display text-lg font-bold text-neutral-950">
                {t('partner.heading')}
              </h2>
              <p className="mb-6 text-xs md:text-sm">
                {t.rich('partner.description', { br: () => <br /> })}
              </p>

              <Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

              <Border className="mt-16 pt-16">
                <h2 className="font-display text-base font-semibold text-neutral-950">
                  Follow us
                </h2>
                <SocialMedia className="mt-6" />
              </Border>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
