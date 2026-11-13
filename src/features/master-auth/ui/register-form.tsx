import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, ControlledTextField } from '@/shared/ui';

import { type RegisterFormValues, registerSchema } from '../model/auth';
import { useSessionStore } from '../model/session';

import styles from './auth-form.module.css';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { t } = useTranslation();
  const signIn = useSessionStore((state) => state.signIn);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const submit = handleSubmit(() => {
    reset();
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
        label={t('masterAuth.registerEmailLabel')}
        placeholder={t('masterAuth.emailPlaceholder')}
      />

      <ControlledTextField
        control={control}
        name="password"
        type="password"
        autoComplete="new-password"
        label={t('masterAuth.passwordLabel')}
        placeholder={t('masterAuth.passwordPlaceholder')}
      />

      <ControlledTextField
        control={control}
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        label={t('masterAuth.registerConfirmLabel')}
        placeholder={t('masterAuth.passwordPlaceholder')}
      />

      <Button type="button" onPress={() => void submit()} isDisabled={isSubmitting}>
        {t('masterAuth.registerSubmit')}
      </Button>
    </form>
  );
}
