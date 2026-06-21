import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { registerSchema, type RegisterFormValues } from '../model/schemas';

export function RegisterDialog() {
  const [successOpen, setSuccessOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: 'master@mail', password: '12345', confirmPassword: '' },
  });

  const onSubmit = handleSubmit(() => {
    setOpen(false);
    reset();
    setSuccessOpen(true);
  });

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Регистрация</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Создание учётной записи</DialogTitle>
            <DialogDescription>Заполните поля для регистрации мастера</DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="flex flex-col gap-6 py-2">
            <div className="space-y-2">
              <Label htmlFor="reg-email">Введите почту</Label>
              <Input id="reg-email" type="email" placeholder="email" {...register('email')} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-password">Введите пароль</Label>
              <Input id="reg-password" type="password" placeholder="password" {...register('password')} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-confirm">Подтвердите пароль</Label>
              <Input id="reg-confirm" type="password" placeholder="password" {...register('confirmPassword')} />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                Зарегистрироваться
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Успешно</DialogTitle>
            <DialogDescription>Учётная запись создана (mock)</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setSuccessOpen(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
