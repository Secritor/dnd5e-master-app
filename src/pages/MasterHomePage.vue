<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCampaignStore } from "../stores/campaign.store";
import { ref } from "vue";

const router = useRouter();
const campaignStore = useCampaignStore();

const newCampaignName = ref("");

function createCampaign() {
  if (!newCampaignName.value.trim()) return;
  campaignStore.addCampaign(newCampaignName.value);
  newCampaignName.value = "";
}

function openCampaign(id: string) {
  router.push(`/campaign/${id}`);
}
</script>

<template>
  <main class="master-home">
    <h1>Пространство мастера</h1>

    <!-- Кампании -->
    <section class="card">
      <h2>Кампании</h2>

      <ul class="campaign-list">
        <li
          v-for="campaign in campaignStore.campaigns"
          :key="campaign.id"
          @click="openCampaign(campaign.id)"
        >
          {{ campaign.name }}
        </li>
      </ul>

      <div class="new-campaign">
        <input
          v-model="newCampaignName"
          placeholder="Название новой кампании"
        />
        <button @click="createCampaign">Создать</button>
      </div>
    </section>

    <!-- Архивы -->
    <section class="card">
      <h2>Архивы</h2>

      <div class="archives">
        <button @click="router.push('/master/spells')">
          📜 Заклинания и умения
        </button>

        <button @click="router.push('/master/npcs')">👹 NPC</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.master-home {
  min-height: 100vh;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.card {
  border: 1px solid #444;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.campaign-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.campaign-list li {
  padding: 10px 14px;
  border: 1px solid #333;
  border-radius: 6px;
  cursor: pointer;
}

.campaign-list li:hover {
  background: #1e1e1e;
}

.new-campaign {
  display: flex;
  gap: 12px;
}

input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #444;
  border-radius: 6px;
}

.archives {
  display: flex;
  gap: 16px;
}

button {
  padding: 10px 16px;
  border: 1px solid #555;
  border-radius: 8px;
  cursor: pointer;
}
</style>
