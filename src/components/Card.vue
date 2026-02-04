<script lang="ts" setup>
import Scroll from './Scroll.vue';
const props = defineProps<{
  thumbnailImage: string;
  description: string;
  cardTitle: string;
  playerLevelCount: number[];
  compaignMood: string[];
}>();

const levelRange = `${props.playerLevelCount[0]} - ${props.playerLevelCount[1]}`;
const moodTags = props.compaignMood.join(', ');
</script>

<template>
  <div class="card-container">
    <img :src="props.thumbnailImage" alt="image thumbnail" class="card-image" />
    <div class="card-short-description">
      <h2 class="card-title">{{ props.cardTitle }}</h2>
      <p class="card-player-level"><strong>Уровни игроков:</strong> {{ levelRange }}</p>
      <p class="card-tags"><strong>Настроение:</strong> {{ moodTags }}</p>
      <Scroll children-style="  font-size: 16px; font-weight: 300;">
        {{ props.description }}
      </Scroll>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  height: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.card-short-description {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card-short-description p {
  text-align: left;
}

button {
  border: none;
  background-color: rgb(17, 15, 15);
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  color: white;
  width: 250px;
  height: 45px;
  border-radius: 10px;
}

.card-image {
  max-width: 270px;
  max-height: 400px;
  border-radius: 15px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
}

.card-description {
  font-size: 14px;
  font-weight: 300;
}
</style>
