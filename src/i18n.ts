import { createI18n } from "vue-i18n";

const messages = {
  en: {
    masterHome: {
      title: "Master Dashboard",
      createCampaign: "Create Campaign",
      campaigns: "Campaigns",
      archives: "Archives",
      spells: "Spells & Skills",
      npcs: "NPCs",
    },
    modeSelect: {
      title: "Choose your path, true soul",
      playerRole: "Player",
      masterRole: "Master",
      company: "Company",
    },
  },
  ru: {
    masterHome: {
      title: "Пространство мастера",
      createCampaign: "Создать кампанию",
      campaigns: "Кампании",
      archives: "Архивы",
      spells: "Заклинания и умения",
      npcs: "NPC",
    },
    modeSelect: {
      title: "Выбери свой путь, истинная душа",
      playerRole: "Игрок",
      masterRole: "Мастер",
      company: "Компании",
    },
  },
};

export const i18n = createI18n({
  locale: "ru",
  fallbackLocale: "en",
  messages,
});
