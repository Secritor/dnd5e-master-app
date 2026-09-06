import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';
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

  const close = () => {
    onOpenChange(false);
    setView('login');
  };

  const meta = TITLES[view];

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          close();
        } else {
          onOpenChange(true);
        }
      }}
    >
      <DialogContent className={styles.content}>
        <DialogHeader>
          <DialogTitle>{t(meta.title)}</DialogTitle>
          <DialogDescription>{t(meta.description)}</DialogDescription>
        </DialogHeader>

        <div className={styles.body}>
          {view === 'login' && (
            <>
              <LoginForm onSuccess={close} />
              <Button variant="outline" onClick={() => setView('register')}>
                {t('masterAuth.register')}
              </Button>
            </>
          )}

          {view === 'register' && (
            <>
              <RegisterForm onSuccess={() => setView('success')} />
              <Button variant="ghost" onClick={() => setView('login')}>
                {t('masterAuth.backToLogin')}
              </Button>
            </>
          )}

          {view === 'success' && <Button onClick={close}>{t('common.ok')}</Button>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
