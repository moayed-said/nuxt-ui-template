<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

type LocalesKey = keyof typeof locales

const { locale } = useI18n()

const lang = computed(() => locales[locale.value as LocalesKey]?.code || 'en')
const dir = computed(() => locales[locale.value as LocalesKey]?.dir || 'ltr')

useHead({
  htmlAttrs: {
    lang,
    dir
  },
})
</script>

<template>
  <UApp :locale="locales[locale as LocalesKey] || locales.en" >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>