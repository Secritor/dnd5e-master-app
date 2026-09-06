import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, ControlledTextField } from '@/shared/ui';
import { loginSchema, type LoginFormValues } from '../model/auth';
import styles from './auth-form.module.css';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(() => {
    onSuccess?.();
    navigate('/master');
  });

  return (
    <form onSubmit={onSubmit} className={styles.form}>
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

      <Button type="submit" isDisabled={isSubmitting} fullWidth>
        {t('masterAuth.submit')}
      </Button>
    </form>
  );
}
