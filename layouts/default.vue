<script lang="ts" setup>
import { ref } from 'vue'
const { push } = useRouter()
const route = useRoute()

const { status } = useAuth()

const activeIndex = ref('/')

const handleSelect = (key: string) => {
  push(key)
}

const isLoggedId = computed(() => status.value === 'authenticated')

const selectedProject = ref(route.params.projectId)
const projects = ref<{ id: string; name: string }[]>([])
</script>

<template>
  <el-container>
    <el-header
      style="
        position: fixed;
        width: 100%;
        z-index: 2000;
        box-sizing: border-box;
        padding-left: 0px;
        padding-right: 0px;
      "
    >
      <client-only>
        <el-menu
          mode="horizontal"
          style="width: 100%; display: flex"
          :default-active="activeIndex"
          @select="handleSelect"
          :ellipsis="false"
        >
          <el-menu-item
            ><strong>PURISTA <span class="headline-primary">VOYAGE</span></strong></el-menu-item
          >
          <template v-if="!isLoggedId">
            <div class="flex-grow" />
            <el-menu-item index="/">This is</el-menu-item>
            <el-menu-item index="/features">Features</el-menu-item>
            <el-menu-item index="/documentation">Documentation</el-menu-item>
            <el-menu-item index="/pricing">Pricing</el-menu-item>
            <el-menu-item index="/login"
              ><el-icon><el-icon-Avatar /></el-icon><strong>Login</strong></el-menu-item
            >
          </template>
          <template v-else>
            <el-select
              v-i
              v-model="selectedProject"
              placeholder="Projects"
              size="large"
              style="width: 150px; margin-top: 10px"
            >
              <el-option
                v-for="item in projects"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <div class="flex-grow" />
            <el-menu-item index="/app/projects">Projects</el-menu-item>
            <el-menu-item index="/app/me"
              ><el-icon><el-icon-Avatar /></el-icon><strong>Profile</strong></el-menu-item
            >
          </template>
        </el-menu>
      </client-only>
    </el-header>
    <div style="margin-top: 60px; min-height: 90vh">
      <slot />
    </div>
    <el-footer class="footer-menu">
      <NuxtLink href="/imprint">Imprint</NuxtLink>
      <NuxtLink href="/tc">Terms & conditions</NuxtLink>
    </el-footer>
  </el-container>
</template>

<style>
.headline-primary {
  color: var(--el-color-primary) !important;
}

.flex-grow {
  flex-grow: 1;
}

.footer-menu {
  width: 100%;
  box-sizing: border-box;
  padding-left: 0px;
  padding-right: 0px;
  background-color: var(--el-fill-color);
  padding: 20px;
}
</style>