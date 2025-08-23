import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { type SanityDocument } from "next-sanity";
import { createClient } from "next-sanity";

// Sanityクライアントの設定
// プロジェクトID、データセット、APIバージョンを直接設定
const client = createClient({
  projectId: 't62e3xha', // SanityプロジェクトID
  dataset: 'production', // データセット名
  apiVersion: '2024-01-01', // APIバージョン（YYYY-MM-DD形式）
  useCdn: true, // CDNの使用
});

const POSTS_QUERY = `*[
  _type == "news"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

    export const metadata: Metadata = {
    title: 'Blog',
  description:
    'Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.',
}

export default async function Blog() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  console.log(posts[0])
  return (
    <RootLayout>
      <PageIntro eyebrow="Blog" title="The latest articles and news">
        <p>
          Stay up-to-date with the latest industry news as our marketing teams
          finds new ways to re-purpose old CSS tricks articles.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          { posts && posts.length > 0 ? posts.map((post) => (
            <FadeIn key={post._id}>
              <article>
                <Border className="pt-16">
                  <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                    <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                      <h2 className="font-display text-2xl font-semibold text-neutral-950">
                        <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                      </h2>
                      <dl className="lg:absolute lg:top-0 lg:left-0 lg:w-1/3 lg:px-4">
                        <dt className="sr-only">Published</dt>
                        <dd className="absolute top-0 left-0 text-sm text-neutral-950 lg:static">
                          <time dateTime={post.publishedAt?.toString()}>
                            {format(new Date(post.publishedAt ?? 0), 'yyyy/MM/dd')}
                          </time>
                        </dd>
                        <dt className="sr-only">Author</dt>
                        <dd className="mt-6 flex gap-x-4">
                         
                          <div className="text-sm text-neutral-950">
                            <div className="font-semibold">
                              {post.author?.name}
                            </div>
                            <div>{post.author?.role}</div>
                          </div>
                        </dd>
                      </dl>
                      <p className="mt-6 max-w-2xl text-base text-neutral-600">
                        {post.description}
                      </p>
                      <Button
                        href={`/blog/${post.slug.current}`}
                        aria-label={`Read more: ${post.title}`}
                        className="mt-8"
                      >
                        Read more
                      </Button>
                    </div>
                  </div>
                </Border>
              </article>
            </FadeIn>
          )) : <p>No posts found</p>}
        </div>
      </Container>

      <ContactSection />
    </RootLayout>
  )
}
