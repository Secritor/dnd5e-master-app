import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { loginSchema, type LoginFormValues } from '../model/schemas';

export function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'master@mail', password: '12345' },
  });

  const onSubmit = handleSubmit(() => {
    navigate('/master');
  });

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-6">
      <div className="space-y-2">
        <Label htmlFor="email">Введите почту / логин</Label>
        <Input id="email" type="text" placeholder="email" {...register('email')} />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Введите пароль</Label>
        <Input id="password" type="password" placeholder="password" {...register('password')} />
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        Войти
      </Button>
    </form>
  );
}
