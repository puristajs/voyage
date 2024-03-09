// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt', '@nuxt/content', '@sidebase/nuxt-auth'],
  elementPlus: { icon: 'ElIcon' },
  css: ['~/assets/styles.css'],
  auth: {
    baseURL: '/api/auth',
    globalAppMiddleware: true,
    pages: {
      signIn: '/login',
    },
    provider: {
      type: 'authjs',
    },
  },
})
