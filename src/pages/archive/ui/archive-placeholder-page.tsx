import { useTranslation } from 'react-i18next';
import { PageTitle } from '@/shared/ui/page-title';

interface ArchivePlaceholderPageProps {
  titleKey: string;
}

export function ArchivePlaceholderPage({ titleKey }: ArchivePlaceholderPageProps) {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <PageTitle>{t(titleKey)}</PageTitle>
      <p className="text-muted-foreground">{t('common.inDevelopment')}</p>
    </main>
  );
}
