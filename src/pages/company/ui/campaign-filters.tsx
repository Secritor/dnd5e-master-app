import { useTranslation } from 'react-i18next';

import type { CampaignDifficulty } from '@/entities/campaign';
import { cn } from '@/shared/lib';

import { LEVEL_VALUES, PLAYER_VALUES, TIME_OPTIONS, type TimeFilter } from '../lib/catalog-options';
import { useCampaignFiltersStore } from '../model/campaign-filters-store';
import { SearchIcon, StarIcon } from './catalog-icons';
import { CatalogSelect } from './catalog-select';

import styles from './campaign-filters.module.css';

interface CatalogFilterBarProps {
  onReset: () => void;
}

export function CatalogFilterBar({ onReset }: CatalogFilterBarProps) {
  const { t } = useTranslation();
  const resetFilters = useCampaignFiltersStore((state) => state.resetFilters);

  return (
    <div className={styles.block}>
      <SearchField />
      <div className={styles.row}>
        <div className={styles.group}>
          <PopularButton />
          <span className={styles.divider} aria-hidden="true" />
          <PlayerSelect />
          <LevelSelect />
          <TimeSelect />
          <span className={styles.divider} aria-hidden="true" />
          <DifficultyButtons />
        </div>
        <button
          type="button"
          className={styles.reset}
          onClick={() => {
            resetFilters();
            onReset();
          }}
        >
          {t('catalog.reset')}
        </button>
      </div>
    </div>
  );
}

function SearchField() {
  const { t } = useTranslation();
  const searchQuery = useCampaignFiltersStore((state) => state.searchQuery);
  const setSearchQuery = useCampaignFiltersStore((state) => state.setSearchQuery);

  return (
    <label className={styles.search}>
      <span className={styles.srOnly}>{t('catalog.searchLabel')}</span>
      <span className={styles.searchIcon}>
        <SearchIcon />
      </span>
      <input
        className={styles.searchInput}
        type="search"
        value={searchQuery}
        placeholder={t('catalog.searchPlaceholder')}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </label>
  );
}

function PopularButton() {
  const { t } = useTranslation();
  const popular = useCampaignFiltersStore((state) => state.popular);
  const togglePopular = useCampaignFiltersStore((state) => state.togglePopular);

  return (
    <button
      type="button"
      className={cn(styles.pill, popular && styles.pillOn)}
      aria-pressed={popular}
      onClick={togglePopular}
    >
      <StarIcon filled={popular} />
      {t('catalog.popular')}
    </button>
  );
}

function PlayerSelect() {
  const { t } = useTranslation();
  const players = useCampaignFiltersStore((state) => state.players);
  const openList = useCampaignFiltersStore((state) => state.openList);
  const selectPlayers = useCampaignFiltersStore((state) => state.selectPlayers);
  const toggleList = useCampaignFiltersStore((state) => state.toggleList);
  const options = [
    ...PLAYER_VALUES.map((id) => ({ id, label: String(id) })),
    { id: 'more' as const, label: t('catalog.moreThan6') },
  ];
  const selectedText =
    players === null
      ? null
      : `${t('catalog.players')}: ${players === 'more' ? t('catalog.moreThan6') : players}`;

  return (
    <CatalogSelect
      listId="catalog-players"
      label={t('catalog.players')}
      selectedText={selectedText}
      open={openList === 'players'}
      options={options}
      value={players}
      onToggle={() => toggleList('players')}
      onSelect={selectPlayers}
    />
  );
}

function LevelSelect() {
  const { t } = useTranslation();
  const level = useCampaignFiltersStore((state) => state.level);
  const openList = useCampaignFiltersStore((state) => state.openList);
  const selectLevel = useCampaignFiltersStore((state) => state.selectLevel);
  const toggleList = useCampaignFiltersStore((state) => state.toggleList);
  const options = [
    ...LEVEL_VALUES.map((id) => ({ id, label: String(id) })),
    { id: 'more' as const, label: t('catalog.moreThan12') },
  ];
  const selectedText =
    level === null
      ? null
      : `${t('catalog.levelFilter')}: ${level === 'more' ? t('catalog.moreThan12') : level}`;

  return (
    <CatalogSelect
      listId="catalog-level"
      label={t('catalog.levelFilter')}
      selectedText={selectedText}
      open={openList === 'level'}
      options={options}
      value={level}
      onToggle={() => toggleList('level')}
      onSelect={selectLevel}
    />
  );
}

function TimeSelect() {
  const { t } = useTranslation();
  const time = useCampaignFiltersStore((state) => state.time);
  const openList = useCampaignFiltersStore((state) => state.openList);
  const selectTime = useCampaignFiltersStore((state) => state.selectTime);
  const toggleList = useCampaignFiltersStore((state) => state.toggleList);

  return (
    <CatalogSelect
      listId="catalog-time"
      label={t('catalog.timeFilter')}
      selectedText={time === null ? null : timeLabel(time, t)}
      open={openList === 'time'}
      options={TIME_OPTIONS.map((option) => ({ id: option.id, label: t(option.labelKey) }))}
      value={time}
      onToggle={() => toggleList('time')}
      onSelect={selectTime}
    />
  );
}

function timeLabel(
  time: TimeFilter,
  t: (key: string, options?: { value: string }) => string
): string {
  const name = t('catalog.timeFilter');

  if (time === 'over') return `${name}: ${t('catalog.timeOver80')}`;

  const option = TIME_OPTIONS.find((item) => item.id === time);
  const value = option ? t(option.labelKey) : '';

  return `${name}: ${t('catalog.timePrefix', { value })}`;
}

function DifficultyButtons() {
  const { t } = useTranslation();
  const difficulty = useCampaignFiltersStore((state) => state.difficulty);
  const toggleDifficulty = useCampaignFiltersStore((state) => state.toggleDifficulty);
  const items: CampaignDifficulty[] = ['easy', 'normal', 'hard'];

  return items.map((item) => {
    const pressed = difficulty === item;

    return (
      <button
        key={item}
        type="button"
        className={cn(styles.pill, styles.difficulty, pressed && styles.pillOn)}
        aria-pressed={pressed}
        onClick={() => toggleDifficulty(item)}
      >
        {t(`catalog.${item}`)}
      </button>
    );
  });
}
