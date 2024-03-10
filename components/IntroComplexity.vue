<script setup lang="ts">
const eachLineOfCode = ref<HTMLElement>(null)
const complexityGrows = ref<HTMLElement>(null)

const typewrite = (element: Ref<HTMLElement>, startPercent: number, endPercent: number) => {
  const { top: elementTop, height: elementHeight } = useElementBounding(element)

  watch(elementTop, (top) => {
    const diff = window.innerHeight - top

    if (top <= window.innerHeight && top + elementHeight.value >= 0) {
      const percent = (diff * 100) / window.innerHeight

      if (percent >= startPercent) {
        if (percent >= endPercent) {
          element.value.style.width = '100%'
          element.value.style.borderColor = 'transparent'
        } else {
          const p = ((percent - startPercent) * 100) / (endPercent - startPercent)

          element.value.style.width = p + '%'
          element.value.style.borderColor = 'orange'
        }
      } else {
        element.value.style.width = '0px;'
        element.value.style.borderColor = 'transparent'
      }
    } else {
      element.value.style.width = '0px;'
      element.value.style.borderColor = 'transparent'
    }
  })
}

typewrite(eachLineOfCode, 25, 50)
typewrite(complexityGrows, 25, 50)

/*
const arrowOne = ref<svg>(null)
const eachLineOfCode = ref<DivHTMLElement>(null)
const complexityGrows = ref<DivHTMLElement>(null)

const path = computed(() => {
  const divA = eachLineOfCode.value
  const divB = complexityGrows.value

  const connector = arrowOne.value

  if (!divA || !divB || !connector) {
    return
  }
  const posnA = divA.getBoundingClientRect()
  const posnB = divB.getBoundingClientRect()

  const connectorPos = connector.getBoundingClientRect()

  posnA.y = posnA.y - connectorPos.y + posnA.height / 2
  posnB.y = posnB.y - connectorPos.y + posnB.height / 2

  posnA.x = connectorPos.x + posnA.x - 80
  posnB.x = connectorPos.x + posnB.x - 90

  const dStr =
    'M' +
    posnA.x +
    ',' +
    posnA.y +
    ' ' +
    'C' +
    (posnA.x - 100) +
    ',' +
    (posnA.y + 200) +
    ' ' +
    (posnB.x - 300) +
    ',' +
    posnB.y +
    ' ' +
    posnB.x +
    ',' +
    posnB.y

  return dStr
})
*/
</script>

<template>
  <div v-bind="$attrs" class="wrapper">
    <div style="display: flex">
      <div style="flex-grow: 1; text-align: center">
        <div class="typewriter-container">
          <div class="typewriter-line-one" ref="eachLineOfCode">With each line of code</div>
        </div>
      </div>
      <div>
        <intro-complexity-code-box />
      </div>
    </div>
    <div style="margin-top: 200px; text-align: center">
      <div class="typewriter-container-two">
        <div class="typewriter-line-one" ref="complexityGrows">Complexity grows</div>
      </div>
    </div>
    <div class="arrow-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" ref="arrowOne">
        <path
          fill="none"
          stroke="orange"
          stroke-width="5"
          stroke-linecap="round"
          stroke-dasharray="10,10"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  position: relative;
}

.typewriter-container {
  height: 25vh;
  position: sticky;
  top: 50vh;
  display: inline-block;
  font-size: 24px;
}

.typewriter-container-two {
  display: inline-block;
  font-size: 24px;
}

.typewriter-line-one {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.5em solid transparent; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  /* animation:
    typing 3.5s steps(40, end),
    blink-caret 0.75s step-end infinite;
  animation-timeline: view();*/
  text-align: left;
  width: 0px;
}

/* The typing effect */
@keyframes typing {
  0% {
    width: 0;
    border-color: transparent;
  }
  25% {
    width: 0;
    border-color: transparent;
  }
  25.1% {
    border-color: orange;
  }
  49.9% {
    border-color: orange;
  }
  50% {
    width: 100%;
    border-color: transparent;
  }
  100% {
    width: 100%;
    border-color: transparent;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}

.arrow-container {
  position: absolute;
  z-index: 10;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  animation: fade-in ease-out forwards;
  animation-timeline: view(50%);
  opacity: 0;
}

/* fade element from right into the screen */
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>