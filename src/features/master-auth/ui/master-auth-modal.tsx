import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { LoginForm } from './login-form';
import { RegisterDialog } from './register-dialog';

interface MasterAuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MasterAuthModal({ open, onOpenChange }: MasterAuthModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Вход мастера</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-2">
          <LoginForm onSuccess={() => onOpenChange(false)} />
          <RegisterDialog />
        </div>
      </DialogContent>
    </Dialog>
  );
}
