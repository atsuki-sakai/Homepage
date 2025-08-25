import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getTranslations } from 'next-intl/server'
import { client, getNewsItem } from '@/lib/sanity'
import { Link } from '@/i18n/routing'
import { format } from 'date-fns'
import { Metadata } from 'next'

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

interface NewsPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const t = await getTranslations({ locale, namespace: 'NewsPage' })
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  return {
    title: t('og_title'),
    description: t('og_description'),
    openGraph: {
      title: t('og_title'),
      description: t('og_description'),
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}/news/${slug}`,
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

export default async function NewsPage({
  params,
}: NewsPageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'NewsPage' });
  
  // スラッグが存在しない場合のエラーハンドリング
  if (!slug) {
    return (
      <main className="min-h-screen bg-white text-gray-900">
        <div className="container mx-auto max-w-3xl p-8 flex flex-col gap-4">
          <Link href="/news" className="text-blue-600 hover:underline text-sm ">
            ← {t('backToNews')}
          </Link>
          <h1 className="text-4xl font-bold mb-8 text-gray-900">{t('invalidSlug')}</h1>
          <p className="text-gray-700">{t('invalidSlugDescription')}</p>
        </div>
      </main>
    );
  }
  
  const news = await getNewsItem(slug, locale);
  
  // 投稿が見つからない場合のエラーハンドリング
  if (!news) {
    return (
      <main className="min-h-screen bg-white text-gray-900">
        <div className="container mx-auto max-w-3xl p-8 flex flex-col gap-4">
          <Link href="/news" className="text-blue-600 hover:underline text-sm">
            ← {t('backToNews')}
          </Link>
          <h1 className="text-4xl font-bold mb-8 text-gray-900">{t('newsNotFound')}</h1>
          <p className="text-gray-700">{t('newsNotFoundDescription')}</p>
        </div>
      </main>
    );
  }

  // 投稿画像のURLを生成
  const newsImageUrl = news.image
    ? urlFor(news.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto max-w-3xl p-8 flex flex-col gap-4">
        <Link href="/news" className="text-blue-600 hover:underline text-sm">
          ← {t('backToNews')}
        </Link>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{news.title}</h1>
        <div className="prose prose-gray max-w-none">
          {news.publishedAt && (
            <p className="text-gray-600 mb-4 text-sm w-full text-right">
              <span className="font-bold">{t('published')}:</span> {format(new Date(news.publishedAt), 'yyyy年MM月dd日')}
            </p>
          )}
          {Array.isArray(news.body) && <PortableText value={news.body} />}
        </div>
      </div>
    </main>
  );
}