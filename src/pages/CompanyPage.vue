<script lang="ts" setup>
import Card from '../components/Card.vue';
import { dndCampaigns } from '../mock-data/official-dnd-compaign';
import Multiselect from 'vue-multiselect';
import { ref, computed } from 'vue';
import type { CampaignsMoodTags } from '../mock-data/official-dnd-compaign';
const allMoods: CampaignsMoodTags[] = [
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

const searchQuery = ref('');
const moodQuery = ref('');
const minLevel = ref(1);
const maxLevel = ref(20);
const selectedMoods = ref<string[]>([]);

const filteredCampaigns = computed(() => {
  return dndCampaigns.filter((campaign) => {
    const [campaignMin, campaignMax] = campaign.playerLevelCount;

    const matchesLevel = campaignMin >= minLevel.value && campaignMax <= maxLevel.value;

    const matchesTitle = campaign.cardTitle.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesMood = !moodQuery.value || campaign.compaignMood.includes(moodQuery.value);

    return matchesLevel && matchesTitle;
  });
});
</script>

<template>
  <section class="compaigh-container">
    <h1 class="compaigh-title">DnD : Официальные компании</h1>
    <!-- ФИЛЬТРЫ -->
    <div class="filters">
      <input v-model="searchQuery" type="text" placeholder="Поиск по названию..." />

      <!-- <div class="level-filter">
        <label>
          Уровень от:
          <input type="number" v-model.number="minLevel" min="1" max="20" />
        </label>

        <label>
          до:
          <input type="number" v-model.number="maxLevel" min="1" max="20" />
        </label>
      </div> -->
    </div>
    <div class="compaigh-card-group">
      <Card
        v-for="(campaign, index) in filteredCampaigns"
        :key="index"
        :thumbnailImage="campaign.thumbnailImage"
        :description="campaign.description"
        :cardTitle="campaign.cardTitle"
        :playerLevelCount="campaign.playerLevelCount"
        :compaignMood="campaign.compaignMood"
      />
    </div>
  </section>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

.compaigh-container {
  margin: 0 auto;
  padding: 0 50px;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
}
.compaigh-card-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(550px, 1fr));
  gap: 20px;
}
.compaigh-title {
  font-size: 24px;
  font-weight: 700;
  margin: 15px;
}

.filters {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.filters input {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-family: inherit;
}

.level-filter {
  display: flex;
  gap: 10px;
}
</style>
