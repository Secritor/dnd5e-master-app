import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface PageTitleProps {
  children: string;
  /** Куда вести, если истории для «назад» нет (открыт deep-link). Дефолт: '/'. */
  backTo?: string;
}

export function PageTitle({ children, backTo = '/' }: PageTitleProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (idx > 0) {
      navigate(-1);
    } else {
      navigate(backTo);
    }
  };

  return (
    <div className="flex items-center gap-3 pb-6.25">
      <button
        type="button"
        onClick={handleBack}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label={t('common.back')}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 14L6 9l5-5" />
        </svg>
      </button>

      <h1 className="text-3xl font-bold tracking-wide text-dnd-gold drop-shadow">{children}</h1>
    </div>
  );
}
