import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from '@/shared/ui';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import styles from './master-auth-modal.module.css';

type AuthView = 'login' | 'register' | 'success';

interface MasterAuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TITLES: Record<AuthView, { title: string; description: string }> = {
  login: { title: 'masterAuth.title', description: 'masterAuth.loginDescription' },
  register: { title: 'masterAuth.registerTitle', description: 'masterAuth.registerDescription' },
  success: { title: 'masterAuth.successTitle', description: 'masterAuth.successDescription' },
};

export function MasterAuthModal({ open, onOpenChange }: MasterAuthModalProps) {
  const { t } = useTranslation();
  const [view, setView] = useState<AuthView>('login');

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) setView('login');
  };

  const close = () => handleOpenChange(false);
  const meta = TITLES[view];

  return (
    <Modal.Backdrop isOpen={open} onOpenChange={handleOpenChange}>
      <Modal.Container size="sm">
        <Modal.Dialog>
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
                <RegisterForm onSuccess={() => setView('success')} />
                <Button variant="ghost" onPress={() => setView('login')}>
                  {t('masterAuth.backToLogin')}
                </Button>
              </>
            )}

            {view === 'success' && <Button onPress={close}>{t('common.ok')}</Button>}
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
