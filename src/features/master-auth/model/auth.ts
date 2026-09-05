import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Введите почту или логин'),
  password: z.string().min(1, 'Введите пароль'),
});

export const registerSchema = z
  .object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(5, 'Минимум 5 символов'),
    confirmPassword: z.string().min(1, 'Подтвердите пароль'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
