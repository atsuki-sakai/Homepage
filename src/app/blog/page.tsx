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
import { formatDate } from '@/lib/formatDate'
import { loadArticles } from '@/lib/mdx'
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
  _type == "blog"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.',
}

export default async function Blog() {
  const blogs = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  console.log(blogs[0])
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
          { blogs && blogs.length > 0 ? blogs.map((blog) => (
            <FadeIn key={blog._id}>
              <article>
                <Border className="pt-16">
                  <div className="lg:-mx-4 lg:flex ">
                    <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                    <dl className="lg:w-1/3">
                        <dt className="sr-only">Published</dt>
                        <dd className="text-sm text-neutral-950 ">
                          <time dateTime={blog.publishedAt?.toString()}>
                            {format(new Date(blog.publishedAt ?? 0), 'yyyy/MM/dd')}
                          </time>
                        </dd>
                        <dt className="sr-only">Author</dt>
                        <dd className="mt-6 flex gap-x-4">
                          <div className="text-sm text-neutral-950">
                            <div className="font-semibold">
                              {blog.author?.name}
                            </div>
                            <div>{blog.author?.role}</div>
                          </div>
                        </dd>
                      </dl>
                      <h2 className="font-display text-2xl font-semibold text-neutral-950">
                        <Link href={`/blog/${blog.slug.current}`}>{blog.title}</Link>
                      </h2>
                      <p className="mt-6 max-w-2xl text-base text-neutral-600">
                        {blog.description}
                      </p>
                      <Button
                        href={`/blog/${blog.slug.current}`}
                        aria-label={`Read more: ${blog.title}`}
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
