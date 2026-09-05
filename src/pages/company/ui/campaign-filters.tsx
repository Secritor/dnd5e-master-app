import { useTranslation } from 'react-i18next';
import { Input, Label, ScrollArea } from '@/shared/ui';
import { CAMPAIGN_MOOD_TAGS, type CampaignMoodTag } from '../model/official-campaign';
import { useCampaignFiltersStore } from '../model/campaign-filters-store';

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
    <div className="flex flex-wrap items-end gap-4">
      <div className="min-w-55 flex-1 space-y-2">
        <Label htmlFor="campaign-search">{t('campaignFilters.search')}</Label>
        <Input
          id="campaign-search"
          type="text"
          placeholder={t('campaignFilters.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <fieldset>
          <legend className="mb-2 text-sm font-medium">{t('campaignFilters.mood')}</legend>
          <ScrollArea className="h-18 rounded-md border border-border">
            <div className="flex flex-wrap gap-2 p-2">
              {CAMPAIGN_MOOD_TAGS.map((tag) => {
                const active = selectedMoods.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleMood(tag)}
                    className={`h-fit rounded-md border px-2 py-1 text-xs transition-colors ${
                      active
                        ? 'border-primary bg-primary/20 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </fieldset>
      </div>

      <fieldset className="flex items-end gap-2">
        <legend className="mb-2 text-sm font-medium">{t('campaignFilters.levels')}</legend>
        <div className="space-y-2">
          <Label htmlFor="min-level">{t('campaignFilters.minLevel')}</Label>
          <Input
            id="min-level"
            type="number"
            min={MIN_PLAYER_LEVEL}
            max={MAX_PLAYER_LEVEL}
            value={minLevel}
            onChange={handleLevelChange(setMinLevel)}
            className="w-20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="max-level">{t('campaignFilters.maxLevel')}</Label>
          <Input
            id="max-level"
            type="number"
            min={MIN_PLAYER_LEVEL}
            max={MAX_PLAYER_LEVEL}
            value={maxLevel}
            onChange={handleLevelChange(setMaxLevel)}
            className="w-20"
          />
        </div>
      </fieldset>
    </div>
  );
}
