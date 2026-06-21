import { useNavigate } from 'react-router-dom';

interface PageTitleProps {
  children: string;
}

export function PageTitle({ children }: PageTitleProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 pb-6.25">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label="Назад"
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

      <h1 className="font-display text-3xl font-bold tracking-wide text-gold-300 drop-shadow">
        {children}
      </h1>
    </div>
  );
}
