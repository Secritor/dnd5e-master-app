<template>
  <NSpace vertical>
    <NInput
      v-model:value="value"
      :type="props.type"
      :placeholder="props.placeholder"
      class="custom-input"
      @input="onInput"
    />
  </NSpace>
</template>

<script setup lang="ts">
const props = defineProps<{
  placeholder: string;
  type: 'textarea' | 'text' | 'password' | undefined;
}>();
import { ref } from 'vue';
import { NSpace, NInput } from 'naive-ui';
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const value = ref<string | null>(null);
const onInput = (val: string) => {
  emit('update:modelValue', val);
};
</script>

<style scoped>
.custom-input {
  width: 300px;
}
</style>
