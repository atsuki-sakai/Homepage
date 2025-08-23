import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { MDXComponents } from '@/components/MDXComponents'
import { PageLinks } from '@/components/PageLinks'
import { RootLayout } from '@/components/RootLayout'
import { formatDate } from '@/lib/formatDate'

export default async function NewsArticleWrapper(
    children: React.ReactNode
) {
  return (
    <RootLayout>
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        
        <FadeIn>
         {children}
        </FadeIn>
      </Container>
      <ContactSection />
    </RootLayout>
  )
}
