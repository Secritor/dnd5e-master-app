import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Modal } from '@/shared/ui';

import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

import styles from './master-auth-modal.module.css';

type AuthView = 'login' | 'register';

interface MasterAuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: AuthView;
}

const TITLES: Record<AuthView, { title: string; description: string }> = {
  login: { title: 'masterAuth.title', description: 'masterAuth.loginDescription' },
  register: { title: 'masterAuth.registerTitle', description: 'masterAuth.registerDescription' },
};

export function MasterAuthModal({
  open,
  onOpenChange,
  initialView = 'login',
}: MasterAuthModalProps) {
  const { t } = useTranslation();
  const [view, setView] = useState<AuthView>(initialView);

  useEffect(() => {
    if (open) setView(initialView);
  }, [open, initialView]);

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
  };

  const close = () => handleOpenChange(false);
  const meta = TITLES[view];

  return (
    <Modal isOpen={open} onOpenChange={handleOpenChange} size="sm">
      <Modal.CloseTrigger />
      <Modal.Header>
        <Modal.Heading>{t(meta.title)}</Modal.Heading>
        <p className={styles.description}>{t(meta.description)}</p>
      </Modal.Header>

      <Modal.Body className={styles.body}>
        {view === 'login' && (
          <>
            <LoginForm onSuccess={close} />
            <Button variant="outline" onPress={() => setView('register')}>
              {t('masterAuth.register')}
            </Button>
          </>
        )}

        {view === 'register' && (
          <>
            <RegisterForm onSuccess={close} />
            <Button variant="ghost" onPress={() => setView('login')}>
              {t('masterAuth.backToLogin')}
            </Button>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
