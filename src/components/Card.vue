<script lang="ts" setup>
const props = defineProps<{
  thumbnailImage: string;
  description: string;
  cardTitle: string;
  playerLevelCount: number[];
  compaignMood: string[];
}>();

const clipPaths = [generateTornEdgePoints(0)];

const levelRange = `${props.playerLevelCount[0]} - ${props.playerLevelCount[1]}`;
const moodTags = props.compaignMood.join(", ");
// Важно: добавить polygon()
const randomIndex = Math.floor(Math.random() * clipPaths.length);
const clipPath = `polygon(${clipPaths[randomIndex]})`;

function generateTornEdgePoints(numPoints = 30) {
  let points = [];
  for (let i = 0; i <= numPoints; i++) {
    const x = (i * (100 / numPoints)).toFixed(2) + "%";
    const y = (Math.random() * 5).toFixed(2) + "%"; // небольшое хаотичное смещение
    points.push(`${x} ${y}`);
  }
  return points.join(", ");
}
</script>

<template>
  <div class="card-container" :style="{ clipPath }">
    <img :src="props.thumbnailImage" alt="image thumbnail" class="card-image" />
    <div class="card-short-description">
      <h2>{{ props.cardTitle }}</h2>
      <p><strong>Уровни игроков:</strong> {{ levelRange }}</p>
      <p><strong>Настроение:</strong> {{ moodTags }}</p>
      <p>{{ props.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  position: relative; /* важно для clip-path */
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 25px;
  height: 400px;

  /* убрать border-radius или перенести в clip-path */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  /* состаренная бумага */
  background-image: url("../assets/old-paper-texture.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
</style>
