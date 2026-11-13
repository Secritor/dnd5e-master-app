import { useState } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { Modal } from '@/shared/ui';

import { emptyCode } from '../model/auth-code';
import { useSessionStore } from '../model/session';
import { AuthCodeStep } from './auth-code-step';
import { AuthEmailStep } from './auth-email-step';

import styles from './master-auth-modal.module.css';

type AuthStep = 'email' | 'code';

interface MasterAuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MasterAuthModal({ open, onOpenChange }: MasterAuthModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const signIn = useSessionStore((state) => state.signIn);
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [digits, setDigits] = useState(emptyCode);
  const [wasOpen, setWasOpen] = useState(open);

  if (open !== wasOpen) {
    setWasOpen(open);

    if (open) {
      setStep('email');
      setEmail('');
      setDigits(emptyCode());
    }
  }

  const submit = () => {
    signIn();
    onOpenChange(false);

    if (pathname !== '/master') navigate('/master');
  };

  return (
    <Modal
      isOpen={open}
      onOpenChange={onOpenChange}
      overlayClassName={styles.overlay}
      panelClassName={styles.panel}
      className={styles.dialog}
    >
      <AriaButton slot="close" aria-label={t('auth.close')} className={styles.close}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="#A89C8A"
          strokeWidth="1.75"
          aria-hidden="true"
        >
          <path d="m4 4 10 10M14 4 4 14" />
        </svg>
      </AriaButton>

      {step === 'email' ? (
        <AuthEmailStep email={email} onEmailChange={setEmail} onGetCode={() => setStep('code')} />
      ) : (
        <AuthCodeStep
          email={email}
          digits={digits}
          onDigitsChange={setDigits}
          onChangeEmail={() => setStep('email')}
          onSubmit={submit}
        />
      )}
    </Modal>
  );
}
