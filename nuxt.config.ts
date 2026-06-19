import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt',
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },
    
  colorMode: {
    preference: 'light',
    fallback: 'light', 
    storageKey: 'web-mode'
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  imports: {
    presets: [
      {
        from: 'vue-i18n',
        imports: ['useI18n']
      }
    ]
  },

  vite: {
    plugins: [
      VueI18nPlugin({
        include: [path.resolve(__dirname, './app/locales/**')],
        ssr: true
      })
    ]
  },

  build: {
    transpile: ['zod-vue-i18n']
  },
})
