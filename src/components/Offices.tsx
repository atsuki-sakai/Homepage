import clsx from 'clsx'
import { useTranslations } from 'next-intl'

function Office({
  name,
  children,
  invert = false,
}: {
  name: string
  children: React.ReactNode
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  const t = useTranslations('Offices')
  return (
    <ul role="list" {...props}>
      <li>
        <Office name={t('name')} invert={invert}>
          <span className="text-xs">{t('zipcode')}</span>
          <br />
          {t('address')}
          {t('address2')}
        </Office>
      </li>
      <li>
        <Office name="Contact" invert={invert}>
          <a href="mailto:kondax.sakai@gmail.com" className="text-xs hover:underline">kondax.sakai@gmail.com</a>
          <br />
          <a href="tel:08060988812" className="text-xs hover:underline">080-6098-8812</a>
        </Office>
      </li>
    </ul>
  )
}
