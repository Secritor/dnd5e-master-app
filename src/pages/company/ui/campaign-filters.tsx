import { useTranslation } from 'react-i18next';
import { Input, Label, ScrollArea } from '@/shared/ui';
import { cn } from '@/shared/lib';
import { CAMPAIGN_MOOD_TAGS, type CampaignMoodTag } from '../model/official-campaign';
import { useCampaignFiltersStore } from '../model/campaign-filters-store';
import styles from './campaign-filters.module.css';

const MIN_PLAYER_LEVEL = 1;
const MAX_PLAYER_LEVEL = 20;

export function CampaignFilters() {
  const { t } = useTranslation();
  const searchQuery = useCampaignFiltersStore((s) => s.searchQuery);
  const selectedMoods = useCampaignFiltersStore((s) => s.selectedMoods);
  const minLevel = useCampaignFiltersStore((s) => s.minLevel);
  const maxLevel = useCampaignFiltersStore((s) => s.maxLevel);
  const setSearchQuery = useCampaignFiltersStore((s) => s.setSearchQuery);
  const setSelectedMoods = useCampaignFiltersStore((s) => s.setSelectedMoods);
  const setMinLevel = useCampaignFiltersStore((s) => s.setMinLevel);
  const setMaxLevel = useCampaignFiltersStore((s) => s.setMaxLevel);

  const toggleMood = (mood: CampaignMoodTag) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m) => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const handleLevelChange =
    (setter: (level: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.valueAsNumber;
      if (Number.isFinite(next)) setter(next);
    };

  return (
    <div className={styles.filters}>
      <div className={styles.searchCol}>
        <Label htmlFor="campaign-search">{t('campaignFilters.search')}</Label>
        <Input
          id="campaign-search"
          type="text"
          placeholder={t('campaignFilters.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <fieldset>
          <legend className={styles.legend}>{t('campaignFilters.mood')}</legend>
          <ScrollArea className={styles.moodScroll}>
            <div className={styles.moodList}>
              {CAMPAIGN_MOOD_TAGS.map((tag) => {
                const active = selectedMoods.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleMood(tag)}
                    className={cn(styles.moodTag, active && styles.moodTagActive)}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </fieldset>
      </div>

      <fieldset className={styles.levelFields}>
        <legend className={styles.legend}>{t('campaignFilters.levels')}</legend>
        <div className={styles.field}>
          <Label htmlFor="min-level">{t('campaignFilters.minLevel')}</Label>
          <Input
            id="min-level"
            type="number"
            min={MIN_PLAYER_LEVEL}
            max={MAX_PLAYER_LEVEL}
            value={minLevel}
            onChange={handleLevelChange(setMinLevel)}
            className={styles.levelInput}
          />
        </div>
        <div className={styles.field}>
          <Label htmlFor="max-level">{t('campaignFilters.maxLevel')}</Label>
          <Input
            id="max-level"
            type="number"
            min={MIN_PLAYER_LEVEL}
            max={MAX_PLAYER_LEVEL}
            value={maxLevel}
            onChange={handleLevelChange(setMaxLevel)}
            className={styles.levelInput}
          />
        </div>
      </fieldset>
    </div>
  );
}
