<script setup lang="ts">
definePageMeta({ auth: false })

const handleError = () => clearError({ redirect: '/' })

const title = computed(() => {
  return 'Page not found'
})

const subTitle = computed(() => {
  return 'The page You are looking for, was not found.'
})
</script>

<template>
  <el-main>
    <ContentDoc>
      <template #not-found>
        <el-result icon="error" :title="title" :sub-title="subTitle">
          <template #extra>
            <el-button type="primary" @click="handleError">Back</el-button>
          </template>
        </el-result>
      </template>
    </ContentDoc>
  </el-main>
</template>