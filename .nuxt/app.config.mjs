
import { updateAppConfig } from '#app/config'
import { defuFn } from 'defu'

const inlineConfig = {
  "nuxt": {
    "buildId": "99a34d0d-7f6a-4b66-bb1f-78433c6571ee"
  }
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}

import cfg0 from "/Users/sebastianwessel/projekte/voyage/app.config.ts"

export default /*@__PURE__*/ defuFn(cfg0, inlineConfig)
