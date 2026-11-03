import type { ComponentProps } from 'react';

import { cn } from '@/shared/lib';

import styles from './chip.module.css';

export type ChipVariant = 'solid' | 'soft' | 'accent';
export type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps extends ComponentProps<'span'> {
  variant?: ChipVariant;
  size?: ChipSize;
}

/** Небольшая метка (тег, статус). */
export function Chip({ variant = 'solid', size = 'md', className, ...props }: ChipProps) {
  return <span {...props} className={cn(styles.chip, styles[variant], styles[size], className)} />;
}
