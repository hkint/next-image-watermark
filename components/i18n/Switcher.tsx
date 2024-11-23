'use client'

import { useState } from 'react'
import { msg } from '@lingui/macro'
import { usePathname, useRouter } from 'next/navigation'

type LOCALES = 'en' | 'zh-cn'

const languages = {
  en: {
    label: msg`English`,
    nativeName: '🇬🇧 English',
  },
  'zh-cn': {
    label: msg`简体中文`,
    nativeName: '🇨🇳 简体中文',
  }
} as const

export function Switcher() {
  const router = useRouter()
  const pathname = usePathname()

  const [locale, setLocale] = useState<LOCALES>(
    pathname?.split('/')[1] as LOCALES
  )

  function handleChange(newLocale: LOCALES) {
    const pathNameWithoutLocale = pathname?.split('/')?.slice(2) ?? []
    const newPath = `/${newLocale}/${pathNameWithoutLocale.join('/')}`

    setLocale(newLocale)
    router.push(newPath)
  }

  return (
    <div className="flex w-full items-center justify-center space-x-2">
      {Object.entries(languages).map(([key, value]) => (
        <button
          key={key}
          onClick={() => handleChange(key as LOCALES)}
          className={`flex items-center px-4 py-2 rounded-full shadow-sm  ${
            locale === key ? 'bg-indigo-50' : 'text-muted-foreground'
          }`}
        >
          <span className="text-xl">
            {value.nativeName}
          </span>
        </button>
      ))}
    </div>
  )
}
