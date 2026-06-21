import { useTranslation } from 'react-i18next';
import { CAMPAIGN_MOOD_TAGS } from '@/entities/campaign';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { useCampaignFiltersStore } from '../model/use-campaign-filters';

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

  const toggleMood = (mood: string) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m) => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="min-w-55 flex-1 space-y-2">
        <Label htmlFor="search">{t('campaignFilters.search')}</Label>
        <Input
          id="search"
          type="text"
          placeholder={t('campaignFilters.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Label>{t('campaignFilters.mood')}</Label>
        <ScrollArea className="h-18 rounded-md border border-border">
          <div className="flex flex-wrap gap-2 p-2">
            {CAMPAIGN_MOOD_TAGS.map((tag: string) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleMood(tag)}
                className={`h-fit rounded-md border px-2 py-1 text-xs transition-colors ${
                  selectedMoods.includes(tag)
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex items-end gap-2">
        <div className="space-y-2">
          <Label>{t('campaignFilters.levels')}</Label>
          <p className="text-xs text-muted-foreground">{t('campaignFilters.levelsRange')}</p>
        </div>
        <Input
          type="number"
          min={1}
          max={20}
          value={minLevel}
          onChange={(e) => setMinLevel(Number(e.target.value))}
          className="w-20"
        />
        <Input
          type="number"
          min={1}
          max={20}
          value={maxLevel}
          onChange={(e) => setMaxLevel(Number(e.target.value))}
          className="w-20"
        />
      </div>
    </div>
  );
}
