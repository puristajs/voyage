

<script setup lang="ts">
const config = useAppConfig()
const route = useRoute()

useHead({
  meta: [{ property: 'og:title', content: `PURISTA Voyage - ${route.meta.title}` }],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - PURISTA Voyage` : config.title
  },
})
</script>

<template>
  <CookieControl locale="en" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
