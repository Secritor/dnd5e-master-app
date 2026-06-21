import { CampaignFilters } from '@/features/campaign-filters/ui/campaign-filters';
import { CampaignBoard } from '@/widgets/campaign-board/ui/campaign-board';

export function CompanyPage() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-6">
      <h1 className="mb-4 text-2xl font-bold">DnD: Официальные компании</h1>
      <CampaignFilters />
      <div className="mt-6">
        <CampaignBoard />
      </div>
    </section>
  );
}
