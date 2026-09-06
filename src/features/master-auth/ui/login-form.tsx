import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Input, Label } from '@/shared/ui';
import { loginSchema, type LoginFormValues } from '../model/auth';
import styles from './auth-form.module.css';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      <div className={styles.field}>
        <Label htmlFor="email">{t('masterAuth.emailLabel')}</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={t('masterAuth.emailPlaceholder')}
          {...register('email')}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <Label htmlFor="password">{t('masterAuth.passwordLabel')}</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder={t('masterAuth.passwordPlaceholder')}
          {...register('password')}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className={styles.submit}>
        {t('masterAuth.submit')}
      </Button>
    </form>
  );
}
