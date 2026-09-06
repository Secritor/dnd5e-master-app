import type { ComponentProps } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { FieldError, Input, Label, TextField } from '@heroui/react';

type TextFieldProps = ComponentProps<typeof TextField>;

interface ControlledTextFieldProps<TFieldValues extends FieldValues>
  extends Omit<
    TextFieldProps,
    'name' | 'value' | 'onChange' | 'onBlur' | 'isInvalid' | 'children'
  > {
  /** `control` из `useForm`. */
  control: Control<TFieldValues>;
  /** Имя поля формы (типизировано по значениям формы). */
  name: FieldPath<TFieldValues>;
  /** Текст `<Label>`. */
  label: string;
  /** Плейсхолдер `<Input>`. */
  placeholder?: string;
}

/**
 * `react-hook-form` Controller + HeroUI `TextField` (`Label` / `Input` / `FieldError`).
 * Снимает дублирование обвязки Controller в формах — см. `features/master-auth`.
 */
export function ControlledTextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  ...textFieldProps
}: ControlledTextFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...textFieldProps}
          name={field.name}
          value={typeof field.value === 'string' ? field.value : ''}
          onBlur={field.onBlur}
          onChange={field.onChange}
          isInvalid={fieldState.invalid}
        >
          <Label>{label}</Label>
          <Input placeholder={placeholder} />
          <FieldError>{fieldState.error?.message}</FieldError>
        </TextField>
      )}
    />
  );
}
