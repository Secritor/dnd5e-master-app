<script lang="ts" setup>
import Card from "../components/Card.vue";
import { dndCampaigns } from "../mock-data/official-dnd-compaign";
</script>

<template>
  <section class="company-container">
    <h1>DnD : Официальные компании</h1>
    <div class="company-card-group">
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

.company-container {
  margin: 0 auto;
  padding: 0 50px;
  text-align: left;
}
.company-card-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 20px;
}
</style>
