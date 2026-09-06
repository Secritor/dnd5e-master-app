import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Label } from '@/shared/ui';
import { useMasterCampaignStore } from '../model/master-campaign-store';
import styles from './create-campaign-form.module.css';

export function CreateCampaignForm() {
  const { t } = useTranslation();
  const addCampaign = useMasterCampaignStore((s) => s.addCampaign);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCampaign(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Label htmlFor="new-campaign-name" className={styles.srOnly}>
        {t('createCampaign.label')}
      </Label>
      <Input
        id="new-campaign-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t('createCampaign.placeholder')}
      />
      <Button type="submit">{t('createCampaign.button')}</Button>
    </form>
  );
}
