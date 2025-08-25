'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import clsx from 'clsx'

const locales = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' }
] as const

export function LanguageSwitcher({ invert = false }: { invert?: boolean }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger className={clsx(
        "w-[120px] bg-transparent border rounded-full",
        invert 
          ? "border-white/20 text-white hover:bg-white/10" 
          : "border-neutral-300 text-neutral-950 hover:bg-neutral-50"
      )}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className={clsx(
        "z-[60]",
        invert 
          ? "bg-neutral-950 border-white/20" 
          : "bg-white border-neutral-200"
      )} sideOffset={5}>
        {locales.map((loc) => (
          <SelectItem 
            key={loc.code} 
            value={loc.code}
            className={clsx(
              invert 
                ? "text-white hover:bg-neutral-800 focus:bg-neutral-800" 
                : "text-neutral-950 hover:bg-neutral-100 focus:bg-neutral-100"
            )}
          >
            {loc.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}