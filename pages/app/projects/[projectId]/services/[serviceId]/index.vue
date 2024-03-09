<script setup lang="ts">
const route = useRoute()

const projectId = computed(() => route.params.projectId)
const serviceIdId = computed(() => route.params.serviceId)

const { data: project } = await useAsyncData(`project:${projectId.value}`, () =>
  $fetch(`/api/projects/${projectId.value}`)
)

const { data: service } = await useAsyncData(
  `serviceVersion:${projectId.value}:${route.params.serviceId}`,
  () => $fetch(`/api/projects/${projectId.value}/services/${serviceIdId.value}/`)
)
</script>

<template>
  <el-main>
    <template v-if="project && service">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/app' }">
          <el-icon><el-icon-house /></el-icon>
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/app/projects' }">Projects</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/app/projects/${projectId}` }">{{
          project.name
        }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/app/projects/${projectId}/services` }"
          >Services</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ service.name }}</el-breadcrumb-item>
      </el-breadcrumb>

      <h1>{{ service.name }}</h1>
    </template>
  </el-main>
</template>