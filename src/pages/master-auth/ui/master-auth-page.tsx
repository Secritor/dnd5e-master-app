import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/features/master-auth/ui/login-form';
import { RegisterDialog } from '@/features/master-auth/ui/register-dialog';
import { PageTitle } from '@/shared/ui/page-title';

export function MasterAuthPage() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto mt-[10vh] w-full max-w-xl rounded-3xl border border-border bg-card p-8 shadow-2xl">
      <section className="flex flex-col items-center gap-6">
        <PageTitle>{t('masterAuth.title')}</PageTitle>
        <LoginForm />
        <RegisterDialog />
      </section>
    </main>
  );
}
