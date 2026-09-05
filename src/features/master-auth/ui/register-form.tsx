import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Button, Input, Label } from '@/shared/ui';
import { registerSchema, type RegisterFormValues } from '../model/auth';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = handleSubmit(() => {
    reset();
    onSuccess?.();
  });

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-6">
      <div className="space-y-2">
        <Label htmlFor="reg-email">{t('masterAuth.registerEmailLabel')}</Label>
        <Input
          id="reg-email"
          type="email"
          autoComplete="email"
          placeholder={t('masterAuth.emailPlaceholder')}
          {...register('email')}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-password">{t('masterAuth.passwordLabel')}</Label>
        <Input
          id="reg-password"
          type="password"
          autoComplete="new-password"
          placeholder={t('masterAuth.passwordPlaceholder')}
          {...register('password')}
        />
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-confirm">{t('masterAuth.registerConfirmLabel')}</Label>
        <Input
          id="reg-confirm"
          type="password"
          autoComplete="new-password"
          placeholder={t('masterAuth.passwordPlaceholder')}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {t('masterAuth.registerSubmit')}
      </Button>
    </form>
  );
}
