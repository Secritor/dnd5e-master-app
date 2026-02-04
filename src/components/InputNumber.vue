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

// локальная копия для внутреннего v-model
const innerValue = ref<number | null>(props.modelValue ?? null);

// следим за локальной копией и пушим наружу
watch(innerValue, (val) => {
  emit('update:modelValue', val);
});

// если родитель изменит modelValue, обновляем локальное состояние
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
