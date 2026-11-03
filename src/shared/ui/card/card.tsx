import type { ComponentProps } from 'react';

import { cn } from '@/shared/lib';

import styles from './card.module.css';

function CardRoot({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn(styles.card, className)} />;
}

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn(styles.header, className)} />;
}

function CardTitle({ className, children, ...props }: ComponentProps<'h3'>) {
  return (
    <h3 {...props} className={cn(styles.title, className)}>
      {children}
    </h3>
  );
}

function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn(styles.content, className)} />;
}

/** Поверхность-контейнер. Части: `Card.Header`, `Card.Title`, `Card.Content`. */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
});
