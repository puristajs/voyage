<script lang="ts" setup>
const { push } = useRouter()

const { data: projects } = await useAsyncData('projects', () => $fetch('/api/projects'))

//const projects = ref<{id:string,name:string}[]>([])
const openProject = (projectId: string) => push(`/app/projects/${projectId}`)
</script>

<template>
  <el-main>
    <h1>Project</h1>
    <p>Please select a project or create a new one.</p>
    <div>
      <el-space direction="vertical">
        <div><el-button type="primary" :icon="ElIconPlus">Add Project</el-button></div>
        <div>
          <el-space wrap>
            <el-card
              v-for="project in projects"
              :key="project.id"
              style="width: 250px"
              shadow="hover"
              @click="openProject(project.id)"
            >
              <template #header>
                <div class="card-header">
                  <span>{{ project.name }}</span>
                </div>
              </template>
            </el-card>
          </el-space>
        </div>
      </el-space>
    </div>
  </el-main>
</template>