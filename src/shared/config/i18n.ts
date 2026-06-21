import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      masterHome: {
        title: 'Master Dashboard',
        createCampaign: 'Create Campaign',
        campaigns: 'Campaigns',
        archives: 'Archives',
        spells: 'Spells & Skills',
        npcs: 'NPCs',
      },
      modeSelect: {
        title: 'Choose your path, true soul',
        playerRole: 'Player',
        masterRole: 'Master',
        company: 'Company',
      },
    },
  },
  ru: {
    translation: {
      masterHome: {
        title: 'Пространство мастера',
        createCampaign: 'Создать кампанию',
        campaigns: 'Кампании',
        archives: 'Архивы',
        spells: 'Заклинания и умения',
        npcs: 'NPC',
      },
      modeSelect: {
        title: 'Выбери свой путь, истинная душа',
        playerRole: 'Игрок',
        masterRole: 'Мастер',
        company: 'Компании',
      },
    },
  },
};

void i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export { i18n };
