

<script setup lang="ts">
const config = useAppConfig()
const route = useRoute()

useHead({
  meta: [{ property: 'og:title', content: `PURISTA Voyage - ${route.meta.title}` }],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - PURISTA Voyage` : config.title
  },
})

const { cookiesEnabledIds, isConsentGiven } = useCookieControl('google-analytics')

onMounted(() => {
  if (isConsentGiven.value && cookiesEnabledIds.value?.includes('google-analytics')) {
    const { gtag, initialize } = useGtag()
    initialize()
    gtag('consent', 'update', {
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      ad_storage: 'granted',
      analytics_storage: 'granted',
    })
  }
})

// example: react to a cookie being accepted
watch(
  () => cookiesEnabledIds.value,
  (current, previous) => {
    if (!previous?.includes('google-analytics') && current?.includes('google-analytics')) {
      const { gtag, initialize } = useGtag()
      initialize()
      gtag('consent', 'update', {
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        ad_storage: 'granted',
        analytics_storage: 'granted',
      })
    }
  },
  { deep: true }
)
</script>

<template>
  <CookieControl locale="en" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
