import { useTranslation } from 'react-i18next';
import type { FallbackProps } from 'react-error-boundary';
import { Button } from '@/shared/ui';
import styles from './route-error.module.css';

export function RouteError(_props: FallbackProps) {
  const { t } = useTranslation();

  return (
    <div role="alert" className={styles.container}>
      <p className={styles.message}>{t('common.routeError')}</p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        {t('common.retry')}
      </Button>
    </div>
  );
}
