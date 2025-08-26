import { type Metadata } from 'next'
import Image from "next/image";
import { getTranslations } from 'next-intl/server'
import { PageIntro } from "@/components/PageIntro";
import { Container } from "@/components/Container";
import { ContactSection } from '@/components/ContactSection'
import { Border } from '@/components/Border'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Link } from '@/i18n/routing'
import { Badge } from "@/components/ui/badge"
import { CalendarDays, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/Button"


export interface Collection {
  title: string;
  description: string;
  category: string;
  link: string;
  image?: {
    width?: number;
    height?: number;
    src?: string;
    alt?: string;
  };
  points: Array<{
    title: string;
    description: string;
  }>;
  publishedAt: string;
}

function Collection({ collection, t }: { collection: Collection; t: any }) {
  const { title, description, category, image, points, publishedAt, link } = collection;
  return (
    <FadeIn>
      <article>
        <Border className="mt-16 pt-16">
          <div className="relative mb-6">
            {image?.src ? (
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src={image.src}
                  alt={image.alt ?? 'collection cover'}
                  width={image.width ?? 1600}
                  height={image.height ?? 900}
                  className="h-64 w-full object-cover"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            ) : null}
          </div>
          <div className="flex justify-start">
            <Badge variant="outline" className="font-bold text-emerald-600">
              {category}
            </Badge>
          </div>

          <h3 className="mb-4 font-display text-2xl font-semibold text-neutral-950">
            {title}
          </h3>

          <p className="mb-8 text-base leading-relaxed text-neutral-600">
            {description}
          </p>

          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            {points.map((point, index) => (
              <div key={index} className="flex flex-col">
                <h4 className="mb-2 text-sm font-semibold text-neutral-950">
                  {point.title}
                </h4>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t('demoButton')}: ${title}`}
            >
              {t('demoButton')}
            </Button>
            <Button href="/contact" aria-label={t('consultButton')}>
              {t('consultButton')}
            </Button>
          </div>
        </Border>
      </article>
    </FadeIn>
  )
}


/* ---------- Metadata ---------- */
interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'GalleryPage' })
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  return {
    title: t('og_title'),
    description: t('og_description'),
    openGraph: {
      title: t('og_title'),
      description: t('og_description'),
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}/work/gallery`,
      images: [
        {
          url: `${baseUrl}/apple-touch-icon.png`,
          width: 180,
          height: 180,
          alt: t('og_title'),
        },
      ],
    },
  }
}

export default async function Gallery({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'GalleryPage' })
  const collections = t.raw('collections') as Collection[]

  return (
    <>
      <PageIntro eyebrow={t('eyebrow')} title={t('pageTitle')}>
        <p className="text-sm text-neutral-600 md:text-base">
          {t('pageDescription')}
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-20 sm:space-y-24 lg:space-y-32">
          <FadeInStagger>
            {collections.map((collection, index) => (
              <Collection key={index} collection={collection} t={t} />
            ))}
          </FadeInStagger>
        </div>
      </Container>

      <ContactSection />
    </>
  );
}