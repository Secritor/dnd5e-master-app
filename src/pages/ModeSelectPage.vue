<script setup lang="ts">
import { useRouter } from 'vue-router';
import { i18n } from '../i18n';
import { watch, ref } from 'vue';
const router = useRouter();
const language = ref<'ru' | 'en'>('ru');

function handlePath(path: string): void {
  router.push(path);
}

watch(language, (value) => {
  setLanguage(value);
});

function setLanguage(lang: 'ru' | 'en') {
  i18n.global.locale = lang;
}
</script>

<template>
  <main class="mode-select">
    <svg width="1000" height="320" viewBox="0 0 1000 420" class="mode-title-svg">
      <defs>
        <path id="curve" d="M 10 250 Q 480 140 1000 250" />
      </defs>

      <text>
        <textPath href="#curve" startOffset="50%" text-anchor="middle">
          Chose your path, true soul
        </textPath>
      </text>
    </svg>

    <div class="buttons">
      <button class="mode-button" @click="handlePath('/player')">
        {{ $t('modeSelect.playerRole') }}
      </button>

      <button class="mode-button primary" @click="handlePath('/master/auth')">
        {{ $t('modeSelect.masterRole') }}
      </button>

      <button class="mode-button" @click="handlePath('/company')">
        {{ $t('modeSelect.company') }}
      </button>
    </div>
    <select v-model="language">
      <option value="ru">Русский</option>
      <option value="en">English</option>
    </select>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Uncial+Antiqua&display=swap');

.mode-select {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-content: center;
}
.mode-title {
  pointer-events: none;
}

.mode-title-svg text {
  font-family: 'Cinzel Decorative', serif;
  font-size: 48px;
  font-weight: 700;
  fill: #e09b3d;
  letter-spacing: 0.12em;
  filter: drop-shadow(0 4px 2px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 12px rgba(224, 155, 61, 0.4));
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
  background-color: inherit;
  border-radius: 8px;
}
.mode-button:hover {
  border-color: #c75e2d;
}

button {
  border: 1p solid rgba(10, 9, 9, 0.63);
  border-radius: 4px;
  color: rgb(0, 0, 0);
  font-size: 14px;
  font-weight: 400;
}
</style>
