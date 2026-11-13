import type { ComponentProps, ReactNode } from 'react';
import {
  Button as AriaButton,
  Dialog,
  Heading,
  Modal as AriaModal,
  ModalOverlay,
} from 'react-aria-components';
import { useTranslation } from 'react-i18next';

import { cn } from '@/shared/lib';

import styles from './modal.module.css';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  size?: ModalSize;
  /** Закрывать по клику на фон (Esc закрывает всегда). Дефолт: true. */
  isDismissable?: boolean;
  className?: string;
  overlayClassName?: string;
  panelClassName?: string;
  children: ReactNode;
}

/**
 * Модальный диалог (react-aria): портал, focus-trap, блокировка скролла, Esc.
 * Части: `Modal.Header`, `Modal.Heading`, `Modal.Body`, `Modal.CloseTrigger`.
 */
function ModalRoot({
  isOpen,
  onOpenChange,
  size = 'md',
  isDismissable = true,
  className,
  overlayClassName,
  panelClassName,
  children,
}: ModalProps) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      className={cn(styles.overlay, overlayClassName)}
    >
      <AriaModal className={cn(styles.modal, styles[size], panelClassName)}>
        <Dialog className={cn(styles.dialog, className)}>{children}</Dialog>
      </AriaModal>
    </ModalOverlay>
  );
}

function ModalHeader({ className, ...props }: ComponentProps<'header'>) {
  return <header {...props} className={cn(styles.header, className)} />;
}

function ModalHeading({ className, ...props }: ComponentProps<'h2'>) {
  return <Heading {...props} slot="title" className={cn(styles.heading, className)} />;
}

function ModalBody({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn(styles.body, className)} />;
}

function ModalCloseTrigger() {
  const { t } = useTranslation();

  return (
    <AriaButton slot="close" aria-label={t('common.close')} className={styles.close}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M4 4l8 8M12 4l-8 8" />
      </svg>
    </AriaButton>
  );
}

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Heading: ModalHeading,
  Body: ModalBody,
  CloseTrigger: ModalCloseTrigger,
});
