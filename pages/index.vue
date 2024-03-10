<script setup lang="ts">
definePageMeta({ auth: false })
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import jsonHightlight from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/atom-one-dark.css'

// Then register the languages you need
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('jsin', jsonHightlight)

onMounted(() => {
  hljs.highlightAll()
})

const { cookiesEnabledIds } = useCookieControl('google-analytics')

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
  <div style="padding: 40px">
    <intro-top-header />
    <intro-complexity />

    <div class="part" style="background: yellow">
      <div class="part-2">
        <div class="service-block"></div>
        <div class="service-block"></div>
        <div class="service-block"></div>
        <div class="service-block"></div>
      </div>
    </div>
    <div class="part">3</div>
  </div>
</template>

<style scoped>
.part {
  min-height: 100vh;
}

.part-2 {
  position: sticky;
  top: 200px;
  height: 300px;
}

.service-block {
  width: 100px;
  height: 100px;
  background: var(--el-text-color-disabled);
  position: absolute;
  border-radius: 5px;
  left: calc(50% - 25px);

  animation: service-block-anim ease-out forwards;
  animation-timeline: view();
}

@keyframes service-block-anim {
  0% {
    transform: translateX(-100vw);
  }
  50% {
    transform: translateX(0%);
  }
}
</style>
