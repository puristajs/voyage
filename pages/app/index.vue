<script setup>
import { ref } from 'vue'
import { useVueFlow, VueFlow } from '@vue-flow/core'
import { MiniMap } from '@vue-flow/minimap'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'

const { onInit, findNode, fitView, snapToGrid } = useVueFlow()

const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    label: 'Node 1',
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    label: 'Node 2',
  },
])

const edges = ref([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
])

// to enable snapping to grid
snapToGrid.value = true

// any event that is emitted from the `<VueFlow />` component can be listened to using the `onEventName` method
onInit((_instance) => {
  // `instance` is the same type as the return of `useVueFlow` (VueFlowStore)

  fitView({ nodes })

  const node = findNode('1')

  if (node) {
    node.position = { x: 100, y: 100 }
  }
})
</script>
<template>
  <div style="width: 100%; height: calc(100vh - 60px)">
    <VueFlow :nodes="nodes" :edges="edges">
      <MiniMap />

      <Controls />
      <Background />
    </VueFlow>
  </div>
</template>