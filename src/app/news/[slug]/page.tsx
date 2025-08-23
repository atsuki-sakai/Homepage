import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: 't62e3xha', // SanityプロジェクトID
  dataset: 'production', // データセット名
  apiVersion: '2024-01-01', // APIバージョン（YYYY-MM-DD形式）
  useCdn: true, // CDNの使用
});

// GROQクエリ: 投稿タイプでスラッグが一致する投稿を取得
const POST_QUERY = `*[_type == "news" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

// Next.js 15 App Routerのパラメータ型定義
interface PostPageProps {
  params: { slug: string };
}

export default async function NewsPage({
  params,
}: PostPageProps) {
  // パラメータからスラッグを取得（Promiseではない）
  const { slug } = params;
  console.log('slug', slug);
  
  // スラッグが存在しない場合のエラーハンドリング
  if (!slug) {
    return (
      <main className="min-h-screen bg-white text-gray-900">
        <div className="container mx-auto max-w-3xl p-8 flex flex-col gap-4">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to blog
          </Link>
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Invalid slug</h1>
          <p className="text-gray-700">The requested post slug is invalid.</p>
        </div>
      </main>
    );
  }
  
  // Sanityクライアントにクエリとパラメータを正しく渡す
  const news = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options);
  
  // 投稿が見つからない場合のエラーハンドリング
  if (!news) {
    return (
      <main className="min-h-screen bg-white text-gray-900">
        <div className="container mx-auto max-w-3xl p-8 flex flex-col gap-4">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to blog
          </Link>
          <h1 className="text-4xl font-bold mb-8 text-gray-900">News not found</h1>
          <p className="text-gray-700">The requested news could not be found.</p>
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
        <Link href="/blog" className="text-blue-600 hover:underline">
          ← Back to blog
        </Link>
        {newsImageUrl && (
          <img
            src={newsImageUrl}
            alt={news.title || 'News image'}
            className="aspect-video rounded-xl"
            width="550"
            height="310"
          />
        )}
        <h1 className="text-4xl font-bold mb-8 text-gray-900">{news.title}</h1>
        <div className="prose prose-gray max-w-none">
          {news.publishedAt && (
            <p className="text-gray-600 mb-4">
              Published: {new Date(news.publishedAt).toLocaleDateString()}
            </p>
          )}
          {Array.isArray(news.body) && <PortableText value={news.body} />}
        </div>
      </div>
    </main>
  );
}