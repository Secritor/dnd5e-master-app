interface dndCampaignsItem {
  cardTitle: string;
  thumbnailImage: string;
  description: string;
  playerLevelCount: number[];
  compaignMood: string[];
}

export const dndCampaigns: dndCampaignsItem[] = [
  {
    cardTitle: "Lost Mine of Phandelver",
    thumbnailImage: "compaign-images/lost mine of phandelver.webp",
    description:
      "Вступительное приключение для новых игроков. Исследование шахт и небольших поселений.",
    playerLevelCount: [1, 5],
    compaignMood: ["Приключение", "Исследование", "Лёгкий экшен"],
  },
  {
    cardTitle: "Hoard of the Dragon Queen",
    thumbnailImage: "compaign-images/hoard of the dragon queen.PNG",
    description: "Борьба с культом Дракона, сбор золота для Тиамат.",
    playerLevelCount: [1, 7],
    compaignMood: ["Эпический", "Героический", "Тревожный"],
  },
  {
    cardTitle: "The Rise of Tiamat",
    thumbnailImage: "",
    description: "Кульминация с культом и самой Тиамат.",
    playerLevelCount: [8, 15],
    compaignMood: ["Эпическая", "Опасная", "Напряжённая"],
  },
  {
    cardTitle: "Princes of the Apocalypse",
    thumbnailImage: "",
    description: "Борьба с четырьмя элементальными культами.",
    playerLevelCount: [1, 15],
    compaignMood: ["Загадочная", "Угрожающая", "Апокалиптическая"],
  },
  {
    cardTitle: "Out of the Abyss",
    thumbnailImage: "",
    description: "Плен в Подземье, демоны, борьба за выживание.",
    playerLevelCount: [1, 15],
    compaignMood: ["Тёмная", "Хаотичная", "Психологическая"],
  },
  {
    cardTitle: "Curse of Strahd",
    thumbnailImage: "",
    description: "Готический хоррор против вампира Страда.",
    playerLevelCount: [1, 10],
    compaignMood: ["Ужасы", "Мрачная готика", "Напряжение"],
  },
  {
    cardTitle: "Storm King’s Thunder",
    thumbnailImage: "",
    description: "Гиганты угрожают миру, герои вступают в бой.",
    playerLevelCount: [1, 11],
    compaignMood: ["Эпический", "Героический", "Эпическая борьба"],
  },
  {
    cardTitle: "Tomb of Annihilation",
    thumbnailImage: "",
    description: "Проклятие смерти, джунгли, ловушки.",
    playerLevelCount: [1, 11],
    compaignMood: ["Пугающая", "Напряжённая", "Survival horror"],
  },
  {
    cardTitle: "Waterdeep: Dragon Heist",
    thumbnailImage: "",
    description: "Городская кампания, расследование и интриги.",
    playerLevelCount: [1, 5],
    compaignMood: ["Урбанистика", "Детектив", "Социальная интрига"],
  },
  {
    cardTitle: "Waterdeep: Dungeon of the Mad Mage",
    thumbnailImage: "",
    description: "Огромное подземелье Ундермаунтена.",
    playerLevelCount: [5, 20],
    compaignMood: ["Мегаданж", "Исследование", "Приключение"],
  },
  {
    cardTitle: "Baldur’s Gate: Descent into Avernus",
    thumbnailImage: "",
    description: "Путешествие в первый уровень ада Авернус.",
    playerLevelCount: [1, 13],
    compaignMood: ["Адский", "Драматический", "Эпический"],
  },
  {
    cardTitle: "Icewind Dale: Rime of the Frostmaiden",
    thumbnailImage: "",
    description: "Погружение в вечную зиму и тайны Icewind Dale.",
    playerLevelCount: [1, 12],
    compaignMood: ["Мрачный", "Survival", "Холодная изоляция"],
  },
  {
    cardTitle: "Tales from the Yawning Portal",
    thumbnailImage: "",
    description: "Сборник классических подземелий.",
    playerLevelCount: [1, 15],
    compaignMood: ["Разнообразная", "Приключения", "Классические данжи"],
  },
  {
    cardTitle: "Dragon of Icespire Peak",
    thumbnailImage: "",
    description: "Лёгкая кампания для новичков.",
    playerLevelCount: [1, 6],
    compaignMood: ["Приключение", "Лёгкая", "Дружелюбная"],
  },
  {
    cardTitle: "Ghosts of Saltmarsh",
    thumbnailImage: "",
    description: "Морские приключения и прибрежные тайны.",
    playerLevelCount: [1, 12],
    compaignMood: ["Морская", "Исследовательская", "Таинственная"],
  },
  {
    cardTitle: "Critical Role: Call of the Netherdeep",
    thumbnailImage: "",
    description: "Официальная кампания, вдохновлённая Critical Role.",
    playerLevelCount: [3, 12],
    compaignMood: ["Эпическая", "Мистическая", "Драматическая"],
  },
  {
    cardTitle: "Candlekeep Mysteries",
    thumbnailImage: "",
    description: "Сборник коротких историй с библиотекой Candlekeep.",
    playerLevelCount: [1, 16],
    compaignMood: ["Детектив", "Мистический", "Короткие сценарии"],
  },
  {
    cardTitle: "Journeys through the Radiant Citadel",
    thumbnailImage: "",
    description: "Путешествия через великолепный Цитадель с разными сюжетами.",
    playerLevelCount: [3, 10],
    compaignMood: ["Приключения", "Сказочный", "Разнообразный"],
  },
  {
    cardTitle: "Keys from the Golden Vault",
    thumbnailImage: "",
    description: "Серия ограблений и головоломок.",
    playerLevelCount: [5, 12],
    compaignMood: ["Интеллектуальная", "Heist", "Приключение"],
  },
  {
    cardTitle: "Phandelver and Below: The Shattered Obelisk",
    thumbnailImage: "",
    description: "Продолжение Lost Mine of Phandelver с новыми подземельями.",
    playerLevelCount: [4, 10],
    compaignMood: ["Исследование", "Приключение", "Данж"],
  },
];
