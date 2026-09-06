import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm, RegisterForm } from '@/features/master-auth';
import { PageTitle } from '@/shared/ui';
import styles from './master-auth-page.module.css';

export function MasterAuthPage() {
  const { t } = useTranslation();
  const [registered, setRegistered] = useState(false);

  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <PageTitle>{t('masterAuth.title')}</PageTitle>
        <LoginForm />
        <hr className={styles.divider} />
        <h2 className={styles.subtitle}>{t('masterAuth.registerTitle')}</h2>
        {registered ? (
          <p role="status" className={styles.status}>
            {t('masterAuth.successDescription')}
          </p>
        ) : (
          <RegisterForm onSuccess={() => setRegistered(true)} />
        )}
      </section>
    </main>
  );
}
