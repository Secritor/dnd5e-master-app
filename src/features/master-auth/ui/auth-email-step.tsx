import { Heading } from 'react-aria-components';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui';

import styles from './master-auth-modal.module.css';

const PROVIDERS = [
  { key: 'auth.yandex', mark: 'Я', size: 'yandex' },
  { key: 'auth.vk', mark: 'VK', size: 'vk' },
  { key: 'auth.mail', mark: '@', size: 'mail' },
] as const;

interface AuthEmailStepProps {
  email: string;
  onEmailChange: (email: string) => void;
  onGetCode: () => void;
}

export function AuthEmailStep({ email, onEmailChange, onGetCode }: AuthEmailStepProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.step}>
      <div className={styles.intro}>
        <Heading slot="title" level={2} className={styles.title}>
          {t('auth.loginTitle')}
        </Heading>
        <p className={styles.lead}>{t('auth.loginLead')}</p>
      </div>

      <div className={styles.providers}>
        {PROVIDERS.map((provider) => (
          <button key={provider.key} type="button" className={styles.provider}>
            <span className={styles.mark} data-size={provider.size} aria-hidden="true">
              {provider.mark}
            </span>
            {t(provider.key)}
          </button>
        ))}
      </div>

      <div className={styles.divider} aria-hidden="true">
        <span className={styles.dividerLine} />
        {t('auth.or')}
        <span className={styles.dividerLine} />
      </div>

      <div className={styles.emailBlock}>
        <label className={styles.emailLabel}>
          {t('auth.email')}
          <input
            className={styles.emailInput}
            type="email"
            placeholder={t('auth.emailPlaceholder')}
            autoComplete="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
          />
        </label>
        <Button variant="accent" fullWidth onPress={onGetCode}>
          {t('auth.getCode')}
        </Button>
      </div>

      <p className={styles.legal}>
        {t('auth.legalBefore')}{' '}
        <button type="button" className={styles.legalLink}>
          {t('auth.terms')}
        </button>{' '}
        {t('auth.legalAnd')}{' '}
        <button type="button" className={styles.legalLink}>
          {t('auth.privacy')}
        </button>
      </p>
    </div>
  );
}
