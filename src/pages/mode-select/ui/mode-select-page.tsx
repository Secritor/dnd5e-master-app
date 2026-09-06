import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MasterAuthModal } from '@/features/master-auth';
import { Button } from '@/shared/ui';
import styles from './mode-select-page.module.css';

export function ModeSelectPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <main className={styles.page}>
      <div className={styles.actions}>
        <Button variant="outline" size="lg" onClick={() => navigate('/player')}>
          {t('modeSelect.playerRole')}
        </Button>
        <Button size="lg" onClick={() => setAuthOpen(true)}>
          {t('modeSelect.masterRole')}
        </Button>
        <Button variant="outline" size="lg" onClick={() => navigate('/company')}>
          {t('modeSelect.company')}
        </Button>
      </div>

      <MasterAuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </main>
  );
}
