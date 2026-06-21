import { CAMPAIGN_MOOD_TAGS } from '@/entities/campaign';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { useCampaignFiltersStore } from '../model/use-campaign-filters';

export function CampaignFilters() {
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
      <div className="min-w-[220px] flex-1 space-y-2">
        <Label htmlFor="search">Поиск</Label>
        <Input
          id="search"
          type="text"
          placeholder="Найти компанию..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Настроение кампании</Label>
        <div className="flex max-h-24 max-w-md flex-wrap gap-2 overflow-y-auto rounded-md border border-border p-2">
          {CAMPAIGN_MOOD_TAGS.map((tag: string) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleMood(tag)}
              className={`rounded-md border px-2 py-1 text-xs transition-colors ${
                selectedMoods.includes(tag)
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-end gap-2">
        <div className="space-y-2">
          <Label>Уровни персонажей</Label>
          <p className="text-xs text-muted-foreground">с / по</p>
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
