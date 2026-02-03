<script lang="ts" setup>
import Card from '../components/Card.vue';
import { dndCampaigns } from '../mock-data/official-dnd-compaign';
</script>

<template>
  <section class="compaigh-container">
    <h1 class="compaigh-title">DnD : Официальные компании</h1>
    <div class="compaigh-card-group">
      <Card
        v-for="(campaign, index) in dndCampaigns"
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
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 20px;
}
.compaigh-title {
  font-size: 24px;
  font-weight: 700;
  margin: 15px;
}
</style>
