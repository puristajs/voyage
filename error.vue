<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })

const errorTitle = computed(() => {
  return props.error?.statusCode === 404 ? 'Page not found' : props.error?.message
})
</script>


<template>
  <el-result icon="error" :title="errorTitle" sub-title="Please follow the instructions">
    <template #extra>
      <el-button type="primary" @click="handleError">Back</el-button>
    </template>
  </el-result>
</template>