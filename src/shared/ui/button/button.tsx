import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';

import { cn } from '@/shared/lib';

import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<AriaButtonProps, 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Растянуть на всю ширину контейнера. */
  fullWidth?: boolean;
  /** Квадратная кнопка под иконку (нужен `aria-label`). */
  isIconOnly?: boolean;
  className?: string;
}

/** Кнопка на react-aria: клавиатура, press-события и состояния через data-атрибуты. */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isIconOnly = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        isIconOnly && styles.iconOnly,
        className
      )}
    />
  );
}
