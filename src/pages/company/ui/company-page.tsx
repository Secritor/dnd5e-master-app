import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CampaignFilters } from '@/features/campaign-filters/ui/campaign-filters';
import { CampaignBoard } from '@/widgets/campaign-board/ui/campaign-board';

export function CompanyPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="dnd-arch">
      <header className="dnd-arch__head">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-gold-600 hover:text-gold-400"
          aria-label="Назад"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <p className="dnd-arch__eyebrow">{t('company.eyebrow')}</p>
          <h1 className="dnd-arch__title">{t('company.title')}</h1>
        </div>
      </header>

      <CampaignFilters />

      <div className="mt-6">
        <CampaignBoard />
      </div>
    </section>
  );
}
