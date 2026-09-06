import { useTranslation } from 'react-i18next';
import { Input, Label, ScrollArea, TextField } from '@/shared/ui';
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

  const handleLevelChange = (setter: (level: number) => void) => (value: string) => {
    const next = Number(value);
    if (value !== '' && Number.isFinite(next)) setter(next);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.searchCol}>
        <TextField value={searchQuery} onChange={setSearchQuery}>
          <Label>{t('campaignFilters.search')}</Label>
          <Input placeholder={t('campaignFilters.searchPlaceholder')} />
        </TextField>

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
        <TextField
          className={styles.field}
          type="number"
          value={String(minLevel)}
          onChange={handleLevelChange(setMinLevel)}
        >
          <Label>{t('campaignFilters.minLevel')}</Label>
          <Input min={MIN_PLAYER_LEVEL} max={MAX_PLAYER_LEVEL} className={styles.levelInput} />
        </TextField>
        <TextField
          className={styles.field}
          type="number"
          value={String(maxLevel)}
          onChange={handleLevelChange(setMaxLevel)}
        >
          <Label>{t('campaignFilters.maxLevel')}</Label>
          <Input min={MIN_PLAYER_LEVEL} max={MAX_PLAYER_LEVEL} className={styles.levelInput} />
        </TextField>
      </fieldset>
    </div>
  );
}
