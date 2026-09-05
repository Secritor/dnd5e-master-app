import { useTranslation } from 'react-i18next';
import type { FallbackProps } from 'react-error-boundary';
import { Button } from '@/shared/ui';

export function RouteError(_props: FallbackProps) {
  const { t } = useTranslation();

  return (
    <div
      role="alert"
      className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center"
    >
      <p className="text-lg text-destructive">{t('common.routeError')}</p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        {t('common.retry')}
      </Button>
    </div>
  );
}
