<script setup lang="ts">
const route = useRoute()
const { push } = useRouter()

const projectId = computed(() => route.params.projectId)
const _serviceId = computed(() => route.params.serviceId)

const { data: project } = await useAsyncData(`project:${projectId.value}`, () =>
  $fetch(`/api/projects/${projectId.value}`)
)

const discoverServices = () => {
  push(`/app/projects/${projectId.value}/services`)
}
</script>

<template>
  <el-main>
    <template v-if="project">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/app' }">
          <el-icon><el-icon-house /></el-icon>
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/app/projects' }">Projects</el-breadcrumb-item>
        <el-breadcrumb-item>{{ project.name }}</el-breadcrumb-item>
      </el-breadcrumb>

      <h1>{{ project.name }}</h1>

      <el-space wrap>
        <el-card style="width: 250px" shadow="hover" @click="discoverServices()">
          <template #header>Discover Services</template>
        </el-card>
        <el-card style="width: 250px" shadow="hover">
          <template #header>Discover Events</template>
        </el-card>
        <el-card style="width: 250px" shadow="hover">
          <template #header>OpenAPI</template>
        </el-card>
      </el-space>
    </template>
  </el-main>
</template>