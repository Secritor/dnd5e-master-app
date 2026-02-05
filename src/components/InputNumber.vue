<template>
  <NSpace>
    <NInputNumber
      v-model:value="innerValue"
      clearable
      :min="1"
      :max="20"
      :step="1"
      size="small"
      :precision="0"
      controls-position="right"
      class="input-number"
    />
  </NSpace>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { NSpace, NInputNumber } from 'naive-ui';

const props = defineProps<{
  modelValue: number | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void;
}>();


const innerValue = ref<number | null>(props.modelValue ?? null);

watch(innerValue, (val) => {
  emit('update:modelValue', val);
});

watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val;
  }
);
</script>

<style>
.input-number {
  width: 100px;
}
</style>
