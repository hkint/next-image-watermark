import React, { ReactNode } from 'react'
import { getI18nInstance } from '@/i18n'
import { setI18n } from '@lingui/react/server'

import { use } from 'react'

export type PageLangParam = {
  params: { lang: string }
}

type PageProps = PageLangParam & {
  searchParams?: any // in query
}

type LayoutProps = PageLangParam & {
  children: React.ReactNode
}

type PageExposedToNextJS<Props extends PageProps> = (props: Props) => ReactNode
export const withLinguiPage = <Props extends PageProps>(
  AppRouterPage: React.ComponentType<PageLangParam & Props>
): PageExposedToNextJS<Props> => {
  return function WithLingui(props) {
    // @ts-ignore
    const params = use(props.params)
    // @ts-ignore
    const lang = params.lang
    const i18n = getI18nInstance(lang)
    setI18n(i18n)

    return <AppRouterPage {...props} params={params} lang={lang} />
  }
}

type LayoutExposedToNextJS<Props extends LayoutProps> = (
  props: Props
) => ReactNode

export const withLinguiLayout = <Props extends LayoutProps>(
  AppRouterPage: React.ComponentType<PageLangParam & Props>
): LayoutExposedToNextJS<Props> => {
  return function WithLingui(props) {
    // @ts-ignore
    const params = use(props.params)
    // @ts-ignore
    const lang = params.lang
    const i18n = getI18nInstance(lang)
    setI18n(i18n)

    return <AppRouterPage {...props} params={params} lang={lang} />
  }
}
