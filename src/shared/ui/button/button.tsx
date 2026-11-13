import type { ReactNode } from 'react';
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';
import { Link } from 'react-router-dom';

import { cn } from '@/shared/lib';

import styles from './button.module.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'accent'
  | 'quiet';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<AriaButtonProps, 'className' | 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Растянуть на всю ширину контейнера. */
  fullWidth?: boolean;
  /** Квадратная кнопка под иконку (нужен `aria-label`). */
  isIconOnly?: boolean;
  className?: string;
  /** Если задан, кнопка рисуется ссылкой маршрутизатора. */
  to?: string;
  children?: ReactNode;
}

/** Кнопка на react-aria: клавиатура, press-события и состояния через data-атрибуты. */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isIconOnly = false,
  className,
  to,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    isIconOnly && styles.iconOnly,
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <AriaButton {...props} className={classes}>
      {children}
    </AriaButton>
  );
}
