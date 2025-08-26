import Image from "next/image"
import { PageIntro } from "./PageIntro"
import { Button } from "./Button"
import bockerImage from "@/images/mockup.webp"

export function BockerSection({t}: {t: any}) {
    return (
        <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 md:mt-0 md:grid-cols-2">
        <div className="h-80 w-full animate-float md:h-full">
          <Image
            className="h-full w-full object-contain"
            src={bockerImage}
            alt="Bocker"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1000px"
            width={1000}
            height={1000}
          />
        </div>
        <PageIntro eyebrow={t('intro.eyebrow')} title={t('intro.title')}>
          <p className="text-sm text-neutral-600 md:text-base">
            {t.rich('intro.description', {
              strong: (c: any) => (
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
    )
}