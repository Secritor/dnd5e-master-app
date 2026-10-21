import { useTranslation } from 'react-i18next';

import { PageTitle } from '@/shared/ui';

import { CampaignBoard } from './campaign-board';
import { CampaignFilters } from './campaign-filters';

import styles from './company-page.module.css';

export function CompanyPage() {
  const { t } = useTranslation();

  return (
    <section className={styles.page}>
      <PageTitle>{t('company.title')}</PageTitle>
      <CampaignFilters />
      <div className={styles.board}>
        <CampaignBoard />
      </div>
    </section>
  );
}
