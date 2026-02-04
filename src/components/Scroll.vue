<template>
  <NSpace>
    <NScrollbar :style="[defaultStyle, childrenStyle]">
      <slot />
    </NScrollbar>
  </NSpace>
</template>

<script setup lang="ts">
import { NSpace, NScrollbar } from 'naive-ui';
const props = defineProps<{
  childrenStyle: string;
}>();
const defaultStyle = {
  maxHeight: '220px',
  overflow: 'auto',
};
</script>
