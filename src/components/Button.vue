<template>
  <NSpace>
    <NButton
      :type="props.type"
      :size="props.size"
      :focusable="props.focusable"
      :style="props.style"
    >
      <slot />
    </NButton>
  </NSpace>
</template>

<script setup lang="ts">
import { NSpace, NButton } from 'naive-ui';
const props = defineProps<{
  type: 'default' | 'tertiary' | 'primary' | 'success' | 'info' | 'warning' | 'error';
  size?: 'tiny' | 'small' | 'medium' | 'large';
  focusable: boolean;
  style?: string;
}>();
</script>
