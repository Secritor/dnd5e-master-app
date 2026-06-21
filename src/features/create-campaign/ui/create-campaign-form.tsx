import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCampaignStore } from '@/entities/campaign/model/campaign-store';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export function CreateCampaignForm() {
  const { t } = useTranslation();
  const addCampaign = useCampaignStore((s) => s.addCampaign);
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (!name.trim()) return;
    addCampaign(name);
    setName('');
  };

  return (
    <div className="flex gap-3">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t('createCampaign.placeholder')}
        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
      />
      <Button type="button" onClick={handleCreate}>
        {t('createCampaign.button')}
      </Button>
    </div>
  );
}
