<script setup lang="ts">
const route = useRoute()
const { push } = useRouter()

const { data: project } = await useAsyncData(`project:${route.params.projectId}`, () =>
  $fetch(`/api/projects/${route.params.projectId}`)
)

const { data: services } = await useAsyncData(`services:${route.params.projectId}`, () =>
  $fetch(`/api/projects/${route.params.projectId}/services`)
)

const discoverService = (serviceId: string) => {
  push(`/app/projects/${route.params.projectId}/services/${serviceId}`)
}
</script>

<template>
  <el-main>
    <template v-if="project && services">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/app' }">
          <el-icon><el-icon-house /></el-icon>
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/app/projects' }">Projects</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/app/projects/${route.params.projectId}` }">{{
          project.name
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>Services</el-breadcrumb-item>
      </el-breadcrumb>

      <h1>{{ project.name }} services</h1>

      <el-space wrap>
        <div style="display: flex; gap: 10px">
          <el-card
            v-for="service in services"
            style="width: 250px; height: 100%; flex-grow: 1"
            shadow="never"
            :key="service.id"
          >
            <template #header>{{ service.name }}</template>
            <small>Select a version:</small>
            <div v-for="(version, index) in service.versions" :key="version.version">
              <el-button
                @click="discoverService(version.id)"
                style="width: 100%; margin-top: 10px"
                :type="
                  version.deprecated
                    ? ''
                    : index === service.versions.length - 1
                      ? 'primary'
                      : 'info'
                "
              >
                <strong
                  >{{ version.version }}
                  <template v-if="version.deprecated"><small>(deprecated)</small></template></strong
                >
              </el-button>
            </div>
          </el-card>
        </div>
      </el-space>
    </template>
  </el-main>
</template>