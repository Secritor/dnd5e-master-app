import type { ComponentProps } from 'react';
import { Button as HeroButton } from '@heroui/react';

type HeroButtonProps = ComponentProps<typeof HeroButton>;

/** Названия вариантов из прежнего shadcn-кита → варианты HeroUI v3. */
const VARIANT_MAP = {
  default: 'primary',
  destructive: 'danger',
  outline: 'outline',
  secondary: 'secondary',
  ghost: 'ghost',
  link: 'ghost',
} as const;

const SIZE_MAP = {
  default: 'md',
  sm: 'sm',
  lg: 'lg',
  icon: 'md',
} as const;

export interface ButtonProps extends Omit<HeroButtonProps, 'variant' | 'size'> {
  variant?: keyof typeof VARIANT_MAP | HeroButtonProps['variant'];
  size?: keyof typeof SIZE_MAP | HeroButtonProps['size'];
  /** Совместимость со старым API — прокидывается в onPress. */
  onClick?: () => void;
}

export function Button({
  variant = 'default',
  size = 'default',
  onClick,
  onPress,
  ...props
}: ButtonProps) {
  const heroVariant = (VARIANT_MAP as Record<string, HeroButtonProps['variant']>)[variant] ?? variant;
  const heroSize = (SIZE_MAP as Record<string, HeroButtonProps['size']>)[size] ?? size;
  const isIconOnly = size === 'icon' || props.isIconOnly;

  return (
    <HeroButton
      variant={heroVariant as HeroButtonProps['variant']}
      size={heroSize as HeroButtonProps['size']}
      isIconOnly={isIconOnly}
      onPress={onPress ?? (onClick ? () => onClick() : undefined)}
      {...props}
    />
  );
}
