import { useTranslation } from 'react-i18next';

import type { CatalogSource } from '../lib/catalog-options';
import { useCampaignFiltersStore } from '../model/campaign-filters-store';

import styles from './catalog-tabs.module.css';

const TABS = [
  { id: 'all', labelKey: 'catalog.tabAll' },
  { id: 'official', labelKey: 'catalog.tabOfficial' },
  { id: 'community', labelKey: 'catalog.tabCommunity' },
] as const satisfies ReadonlyArray<{ id: CatalogSource; labelKey: string }>;

interface CatalogTabsProps {
  onSourceChange: () => void;
}

export function CatalogTabs({ onSourceChange }: CatalogTabsProps) {
  const { t } = useTranslation();
  const source = useCampaignFiltersStore((state) => state.source);
  const setSource = useCampaignFiltersStore((state) => state.setSource);

  return (
    <div className={styles.tablist} role="tablist" aria-label={t('catalog.tabs')}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          className={styles.tab}
          aria-selected={source === tab.id}
          onClick={() => {
            setSource(tab.id);
            onSourceChange();
          }}
        >
          {t(tab.labelKey)}
        </button>
      ))}
    </div>
  );
}
