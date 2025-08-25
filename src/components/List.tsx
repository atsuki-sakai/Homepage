import clsx from 'clsx'

import { Border } from '@/components/Border'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export function List({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <FadeInStagger>
      <ul role="list" className={clsx('text-base text-neutral-600', className)}>
        {children}
      </ul>
    </FadeInStagger>
  )
}

export function ListItem({
  children,
  titleCover,
  title,
}: {
  children: React.ReactNode
  titleCover?: string
  title?: string
}) {
  return (
    <li className="group mt-10 first:mt-0">
      <FadeIn>
        <Border className="pt-10 group-first:pt-0 text-sm group-first:before:hidden group-first:after:hidden">
          {title && (
            <div className='relative w-full h-full'>
              {titleCover && (
                <div className='absolute -top-6 z-0 -left-3 w-full h-full opacity-20 bg-transparent text-indigo-300 text-5xl font-bold duration-700'>
                  {titleCover}
                </div>
              )}
              <p className="font-bold z-50 text-neutral-950 text-2xl">{`${title}`}</p>
            </div>
          )}
          <br/>
          {children}
        </Border>
      </FadeIn>
    </li>
  )
}
