import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from './page-title.module.css';

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
    <div className={styles.root}>
      <button
        type="button"
        onClick={handleBack}
        className={styles.back}
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

      <h1 className={styles.title}>{children}</h1>
    </div>
  );
}
