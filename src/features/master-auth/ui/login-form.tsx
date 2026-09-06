import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, FieldError, Input, Label, TextField } from '@/shared/ui';
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
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <TextField
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            isInvalid={fieldState.invalid}
            type="email"
            autoComplete="email"
          >
            <Label>{t('masterAuth.emailLabel')}</Label>
            <Input placeholder={t('masterAuth.emailPlaceholder')} />
            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <TextField
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            isInvalid={fieldState.invalid}
            type="password"
            autoComplete="current-password"
          >
            <Label>{t('masterAuth.passwordLabel')}</Label>
            <Input placeholder={t('masterAuth.passwordPlaceholder')} />
            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Button type="submit" isDisabled={isSubmitting} fullWidth>
        {t('masterAuth.submit')}
      </Button>
    </form>
  );
}
