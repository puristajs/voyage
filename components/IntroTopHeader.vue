<script setup lang="ts">
const element = ref<HtmlDivElement>(null)

const { top: elementTop, height: elementHeight } = useElementBounding(element)

watch(elementTop, (top) => {
  const diff = window.innerHeight - elementHeight.value - top - 20

  if (diff < 300) {
    const p = (diff * 100) / 300
    element.value.style.opacity = 1 - Math.round(p) / 100
  } else {
    element.value.style.opacity = '0'
  }
})
</script>

<template>
  <div class="wrapper">
    <div class="headline">
      <div>
        <div>This is ...</div>
        <div class="name">PURISTA <span class="colorize">Voyage</span></div>
        <div><img src="/purista_logo.png" alt="PURISTA" style="height: 20vh" /></div>
      </div>
    </div>
    <div class="scroll-hint" ref="element">
      <div><strong>SCROLL DOWN</strong></div>
      <div style="margin-left: calc(50% - 30px)">
        <div class="scroll"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
  font-size: 48px;
  line-height: 64px;
  font-weight: 900;
  min-height: 100vh;
}

.headline {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.headline .name {
  line-height: 100px;
  font-size: 72px;
  font-weight: 900;
  text-transform: uppercase;
}

.headline .name > .colorize {
  color: var(--el-color-primary);
}

.scroll-hint {
  font-size: 18px;
  font-weight: 200;
  line-height: 32px;
  margin-bottom: 120px;
}

.scroll {
  width: 60px;
  height: 60px;
  border: 2px solid #333;
  border-radius: 50%;
  position: relative;
  animation: down 1.5s infinite;
  -webkit-animation: down 1.5s infinite;
  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 18px;
    width: 18px;
    height: 18px;
    border-left: 2px solid #333;
    border-bottom: 2px solid #333;
    transform: rotate(-45deg);
  }
}

@keyframes down {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translateY(15px);
  }
  40% {
    transform: translate(0);
  }
}
</style>