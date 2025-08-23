import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { RootLayout } from '@/components/RootLayout'

export default async function BlogArticleWrapper({
  children,
}: {
  children: React.ReactNode
}) {

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
