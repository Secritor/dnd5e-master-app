<script lang="ts" setup>
import Card from '../components/Card.vue';
import { dndCampaigns } from '../mock-data/official-dnd-compaign';
import { ref, computed, watch } from 'vue';
import Multiselect from '../components/Multiselect.vue';
import Input from '../components/Input.vue';
import InputNumber from '../components/InputNumber.vue';
// import Skeleton from '../components/Skeleton.vue';

const searchQuery = ref('');
const selectedMoods = ref<string[]>([]);
const selectedMinLevel = ref(1);
const selectedMaxLevel = ref(20);

watch([selectedMinLevel, selectedMaxLevel], ([min, max]) => {
  if (min > max) selectedMaxLevel.value = min;
});
const filteredCampaigns = computed(() =>
  dndCampaigns.filter((campaign) => {
    const matchesTitle = campaign.cardTitle
      .toLocaleLowerCase()
      .includes(searchQuery.value.toLocaleLowerCase());
    const matchesMood =
      selectedMoods.value.length === 0 ||
      selectedMoods.value.some((mood) => campaign.compaignMood.includes(mood));

    const [campaignMin, campaignMax] = campaign.playerLevelCount ?? [undefined, undefined];
    const matchesLevel =
      campaignMin !== undefined &&
      campaignMax !== undefined &&
      campaignMin >= selectedMinLevel.value &&
      campaignMax <= selectedMaxLevel.value;

    return matchesTitle && matchesMood && matchesLevel;
  })
);
</script>

<template>
  <section class="compaigh-container">
    <h1 class="compaigh-title">DnD : Официальные компании</h1>

    <div class="filters">
      <Input type="text" placeholder="Найти компанию..." v-model="searchQuery" />
      <Multiselect v-model="selectedMoods" />
      <div class="compaign-level-filter">
        <p>Укажите уровни персонажей</p>
        <span>с :</span>
        <InputNumber v-model="selectedMinLevel" />
        <span>по :</span>
        <InputNumber v-model="selectedMaxLevel" />
      </div>
    </div>
    <div class="compaigh-card-group">
      <Card
        v-for="campaign in filteredCampaigns"
        :key="campaign.cardTitle"
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

.compaign-level-filter {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
}
</style>
