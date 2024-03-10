// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@sidebase/nuxt-auth',
    '@dargmuesli/nuxt-cookie-control',
    'nuxt-gtag',
  ],
  gtag: {
    enabled: false,
    id: 'G-22TMB6X048',
    initCommands: [
      // Setup up consent mode
      [
        'consent',
        'default',
        {
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          ad_storage: 'denied',
          analytics_storage: 'denied',
          wait_for_update: 500,
        },
      ],
    ],
  },
  cookieControl: {
    barPosition: 'bottom-right',
    closeModalOnClickOutside: false,
    isModalForced: true,
    cookies: {
      necessary: [
        {
          id: 'settings',
          description: {
            en: 'Remember your privacy settings',
          },
          name: 'Settings',
          targetCookieIds: ['ncc_c', 'ncc_e'],
        },
        {
          id: 'sign-in',
          description: {
            en: 'Needed for login',
          },
          name: 'Sign in',
          targetCookieIds: ['next-auth.csrf-token', 'next-auth.callback-url'],
        },
        {
          id: 'google-analytics',
          name: 'Google Analytics',
          links: {
            'https://policies.google.com/technologies/partner-sites': 'Privacy Policy',
            'https://marketingplatform.google.com/about/analytics/terms/us/': 'Terms of Service',
          },
          targetCookieIds: ['_ga'],
        },
      ],
    },
  },
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
