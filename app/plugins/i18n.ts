import { createI18n } from 'vue-i18n'
import { makeZodI18nMap } from 'zod-vue-i18n/v4'
import { z } from 'zod'
import { watch } from 'vue'
import messages from '@intlify/unplugin-vue-i18n/messages'

export default defineNuxtPlugin(({ vueApp }) => {
  const defaultLocale = 'ar'
  const localeMessages = messages ?? {}
  const availableLocales = Object.keys(localeMessages)

  const localeCookie = useCookie<string>('locale', {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365
  })

  const initialLocale = localeCookie.value && availableLocales.includes(localeCookie.value)
    ? localeCookie.value
    : defaultLocale

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: initialLocale,
    fallbackLocale: defaultLocale,
    messages: localeMessages
  })

  if (!localeCookie.value) {
    localeCookie.value = initialLocale
  }

  watch(() => i18n.global.locale.value, (nextLocale) => {
    if (availableLocales.includes(nextLocale)) {
      localeCookie.value = nextLocale
    }
  })

  z.config({
    localeError: makeZodI18nMap(i18n)
  })
  vueApp.use(i18n)
})