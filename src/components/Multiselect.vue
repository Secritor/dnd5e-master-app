<template>
  <NSpace vertical>
    <NSelect
      v-model:value="selectedMoods"
      multiple
      :options="options"
      placeholder="Выберите настроение кампании"
      class="mood-select"
      max-tag-count="responsive"
      @update:value="onUpdate"
    />
  </NSpace>
</template>

<script setup lang="ts">
import type { CampaignsMoodTags } from '../mock-data/official-dnd-compaign';
import { ref, watch } from 'vue';
import { NSpace, NSelect } from 'naive-ui';
const props = defineProps<{
  modelValue: string[];
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const tags: CampaignsMoodTags[] = [
  'Мрачное',
  'Готическое',
  'Тревожное',
  'Жуткая',
  'Сказочное',
  'Мистическое',
  'Загадочное',
  'Драматическое',
  'Хаотичное',
  'Героическое',
  'Эпическое',
  'Комедийное',
  'Абсурдное',
  'Немного экшена',
  'Для новичков',
  'Детективное',
  'Хоррор',
  'Политическое',
  'Планарное',
  'Напряженное',
  'Опасное',
];
const selectedMoods = ref<string[]>(props.modelValue ?? []);
const options = tags.map((tag) => ({
  label: tag,
  value: tag,
}));
watch(selectedMoods, (val) => {
  emit('update:modelValue', val);
});
const onUpdate = (val: string[]) => {
  selectedMoods.value = val;
};
</script>

<style scoped>
.mood-select {
  width: 400px;
}

/* контейнер выбранных тегов */
.mood-select :deep(.n-base-selection-tags) {
  max-height: 72px;
  overflow-y: auto;
}
</style>
