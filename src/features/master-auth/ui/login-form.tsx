import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, ControlledTextField } from '@/shared/ui';

import { type LoginFormValues, loginSchema } from '../model/auth';
import { useSessionStore } from '../model/session';

import styles from './auth-form.module.css';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { t } = useTranslation();
  const signIn = useSessionStore((state) => state.signIn);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const submit = handleSubmit(() => {
    signIn();
    onSuccess?.();
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void submit(event);
      }}
      className={styles.form}
    >
      <ControlledTextField
        control={control}
        name="email"
        type="email"
        autoComplete="email"
        label={t('masterAuth.emailLabel')}
        placeholder={t('masterAuth.emailPlaceholder')}
      />

      <ControlledTextField
        control={control}
        name="password"
        type="password"
        autoComplete="current-password"
        label={t('masterAuth.passwordLabel')}
        placeholder={t('masterAuth.passwordPlaceholder')}
      />

      <Button type="button" onPress={() => void submit()} isDisabled={isSubmitting} fullWidth>
        {t('masterAuth.submit')}
      </Button>
    </form>
  );
}
