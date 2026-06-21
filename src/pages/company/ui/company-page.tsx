import { useTranslation } from 'react-i18next';
import { CampaignFilters } from '@/features/campaign-filters/ui/campaign-filters';
import { CampaignBoard } from '@/widgets/campaign-board/ui/campaign-board';
import { PageTitle } from '@/shared/ui/page-title';

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
