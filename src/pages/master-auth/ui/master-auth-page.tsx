import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm, RegisterForm } from '@/features/master-auth';
import { PageTitle } from '@/shared/ui';

export function MasterAuthPage() {
  const { t } = useTranslation();
  const [registered, setRegistered] = useState(false);

  return (
    <main className="mx-auto mt-[10vh] w-full max-w-xl rounded-3xl border border-border bg-card p-8 shadow-2xl">
      <section className="flex flex-col items-center gap-6">
        <PageTitle>{t('masterAuth.title')}</PageTitle>
        <LoginForm />
        <hr className="w-full border-border" />
        <h2 className="text-lg font-semibold">{t('masterAuth.registerTitle')}</h2>
        {registered ? (
          <p role="status" className="text-sm text-muted-foreground">
            {t('masterAuth.successDescription')}
          </p>
        ) : (
          <RegisterForm onSuccess={() => setRegistered(true)} />
        )}
      </section>
    </main>
  );
}
