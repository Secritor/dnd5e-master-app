<script setup lang="ts">
import { useRouter } from "vue-router";
import { i18n } from "../i18n";
import { watch, ref } from "vue";
const router = useRouter();
const language = ref<"ru" | "en">("ru");

function handlePath(path: string): void {
  router.push(path);
}

watch(language, (value) => {
  setLanguage(value);
});

function setLanguage(lang: "ru" | "en") {
  i18n.global.locale = lang;
}
</script>

<template>
  <main class="mode-select">
    <h1>{{ $t("modeSelect.title") }}</h1>

    <div class="buttons">
      <button class="mode-button" @click="handlePath('/player')">
        {{ $t("modeSelect.playerRole") }}
      </button>

      <button class="mode-button primary" @click="handlePath('/master/auth')">
        {{ $t("modeSelect.masterRole") }}
      </button>

      <button class="mode-button" @click="handlePath('/company')">
        {{ $t("modeSelect.company") }}
      </button>
    </div>
    <select v-model="language">
      <option value="ru">Русский</option>
      <option value="en">English</option>
    </select>
  </main>
</template>

<style scoped>
.mode-select {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-content: center;
}

.buttons {
  display: flex;
  gap: 24px;
}

.mode-button {
  padding: 16px 32px;
  font-size: 18px;
  cursor: pointer;
  border: 1px solid #444;
  border-radius: 8px;
}

.mode-button.primary {
  border-color: #7a5cff;
  font-weight: 600;
}
</style>
