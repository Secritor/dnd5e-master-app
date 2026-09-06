import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, TextField } from '@/shared/ui';
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
      <TextField
        className={styles.grow}
        aria-label={t('createCampaign.label')}
        value={name}
        onChange={setName}
      >
        <Input placeholder={t('createCampaign.placeholder')} />
      </TextField>
      <Button type="submit">{t('createCampaign.button')}</Button>
    </form>
  );
}
