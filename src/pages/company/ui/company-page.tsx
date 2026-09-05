import { useTranslation } from 'react-i18next';
import { PageTitle } from '@/shared/ui';
import { CampaignFilters } from './campaign-filters';
import { CampaignBoard } from './campaign-board';

export function CompanyPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-6">
      <PageTitle>{t('company.title')}</PageTitle>
      <CampaignFilters />
      <div className="mt-6">
        <CampaignBoard />
      </div>
    </section>
  );
}
