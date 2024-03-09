<script setup lang="ts">
import github from 'assets/github-mark.svg'
import google from 'assets/google-mark.svg'

definePageMeta({
  layout: 'default',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/app/projects',
  },
})

const { signIn } = useAuth()
const { replace } = useRouter()

const credentials = ref({
  username: '',
  password: '',
})

async function login() {
  const { error } = await signIn('credentials', { ...credentials.value, redirect: false })
  if (error) {
    ElMessageBox.alert(error, 'Login error', {
      type: 'error',
      confirmButtonText: 'OK',
    })
  } else {
    replace('/app/projects')
  }
}
</script>

<template>
  <div class="page">
    <div class="left-side">
      <div style="text-align: center; width: 100%">
        <h1>Sign in</h1>
        <p>
          <small style="color: var(--el-text-color-secondary)"
            >Sign in with your username and password.</small
          >
        </p>
        <div
          style="
            width: 80%;
            min-width: 300px;
            max-width: 400px;
            margin: auto;
            height: 500px;
            text-align: left;
          "
        >
          <el-form :model="credentials" label-width="auto" size="large" name="login">
            <el-form-item label="Email">
              <el-input
                v-model="credentials.username"
                type="email"
                name="username"
                placeholder="you@mail.com"
              />
            </el-form-item>
            <el-form-item label="Password">
              <el-input
                v-model="credentials.password"
                type="password"
                placeholder="Your password"
                show-password
                name="password"
              />
            </el-form-item>
            <el-form-item label=" ">
              <el-button type="primary" @click="login" style="width: 100%"
                ><template #icon
                  ><el-icon><el-icon-Unlock /></el-icon></template
                >Login</el-button
              >
            </el-form-item>
            <div style="text-align: right">
              <el-button type="primary" @click="login" plain link size="small"
                >Forgot Password?</el-button
              >
            </div>
          </el-form>

          <el-divider>OR</el-divider>
          <div style="margin: auto; width: 250px">
            <el-space wrap>
              <el-button size="large" style="width: 250px" @click="signIn('github')"
                ><template #icon><img :src="github" class="el-icon" /></template>Sign in with GitHub
              </el-button>
              <el-button size="large" style="width: 250px" @click="signIn('google')"
                ><template #icon><img :src="google" class="el-icon" /></template>Sign in with Google
              </el-button>
            </el-space>
          </div>
        </div>
      </div>
    </div>
    <div class="right-side">
      <div style="text-align: center; width: 100%">
        <h1>
          PURISTA
          <span class="headline-primary">VOYAGE</span>
        </h1>
        <p>
          <strong>Start your visual journey now.</strong>
        </p>
        <el-carousel :interval="5000" arrow="always" height="auto">
          <el-carousel-item v-for="item in 4" :key="item" style="height: 500px">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <p>PURISTA VOYAGE allows you to document,</p>
      </div>
    </div>
  </div>
</template>

<style>
.page {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.page > * {
  flex-grow: 1;
  flex-basis: 400px;
}

.left-side {
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.right-side {
  background-color: var(--el-fill-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.headline-primary {
  color: var(--el-color-primary) !important;
}

.footer {
  text-align: right;
}

.el-card.is-always-shadow {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
