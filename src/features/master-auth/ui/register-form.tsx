import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Button, FieldError, Input, Label, TextField } from '@/shared/ui';
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
            <Label>{t('masterAuth.registerEmailLabel')}</Label>
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
            autoComplete="new-password"
          >
            <Label>{t('masterAuth.passwordLabel')}</Label>
            <Input placeholder={t('masterAuth.passwordPlaceholder')} />
            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <TextField
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            isInvalid={fieldState.invalid}
            type="password"
            autoComplete="new-password"
          >
            <Label>{t('masterAuth.registerConfirmLabel')}</Label>
            <Input placeholder={t('masterAuth.passwordPlaceholder')} />
            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Button type="submit" isDisabled={isSubmitting}>
        {t('masterAuth.registerSubmit')}
      </Button>
    </form>
  );
}
