import type { ComponentProps } from 'react';

import { cn } from '@/shared/lib';

import styles from './skeleton.module.css';

/** Плейсхолдер загрузки. Размеры задаются через `className`. */
export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return <div aria-hidden="true" {...props} className={cn(styles.skeleton, className)} />;
}
