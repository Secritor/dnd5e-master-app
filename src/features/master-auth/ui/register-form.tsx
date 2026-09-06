import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Button, ControlledTextField } from '@/shared/ui';
import { registerSchema, type RegisterFormValues } from '../model/auth';
import styles from './auth-form.module.css';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = handleSubmit(() => {
    reset();
    onSuccess?.();
  });

  return (
    <form onSubmit={onSubmit} className={styles.form}>
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

      <Button type="submit" isDisabled={isSubmitting}>
        {t('masterAuth.registerSubmit')}
      </Button>
    </form>
  );
}
