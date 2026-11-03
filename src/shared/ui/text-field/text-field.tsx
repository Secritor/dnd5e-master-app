import {
  FieldError as AriaFieldError,
  type FieldErrorProps as AriaFieldErrorProps,
  Input as AriaInput,
  type InputProps as AriaInputProps,
  Label as AriaLabel,
  type LabelProps,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components';

import { cn } from '@/shared/lib';

import styles from './text-field.module.css';

export interface TextFieldProps extends Omit<AriaTextFieldProps, 'className'> {
  className?: string;
}

/**
 * Обёртка поля (react-aria): связывает `Label`, `Input` и `FieldError`
 * по id и пробрасывает состояние (invalid / disabled) в data-атрибуты.
 */
export function TextField({ className, ...props }: TextFieldProps) {
  return <AriaTextField {...props} className={cn(styles.field, className)} />;
}

export function Label({ className, ...props }: LabelProps) {
  return <AriaLabel {...props} className={cn(styles.label, className)} />;
}

export interface InputProps extends Omit<AriaInputProps, 'className'> {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return <AriaInput {...props} className={cn(styles.input, className)} />;
}

export interface FieldErrorProps extends Omit<AriaFieldErrorProps, 'className'> {
  className?: string;
}

/** Показывается только когда поле в состоянии invalid. */
export function FieldError({ className, ...props }: FieldErrorProps) {
  return <AriaFieldError {...props} className={cn(styles.error, className)} />;
}
