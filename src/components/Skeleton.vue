<template>
  <NSpace vertical>
    <NSkeleton :height="props.height" :width="props.width" :animated="true" />
  </NSpace>
</template>

<script setup lang="ts">
import { NSpace, NSkeleton } from 'naive-ui';
const props = defineProps<{
  height: string;
  width: string;
}>();
</script>

<style scoped></style>
