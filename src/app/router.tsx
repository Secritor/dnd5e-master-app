import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { createHashRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { RouteError } from './route-error';
import styles from './router.module.css';

const ModeSelectPage = lazy(() =>
  import('@/pages/mode-select').then((m) => ({ default: m.ModeSelectPage }))
);
const MasterHomePage = lazy(() =>
  import('@/pages/master-home').then((m) => ({ default: m.MasterHomePage }))
);
const CompanyPage = lazy(() => import('@/pages/company').then((m) => ({ default: m.CompanyPage })));
const PlayerPage = lazy(() => import('@/pages/player').then((m) => ({ default: m.PlayerPage })));
const SpellsArchivePage = lazy(() =>
  import('@/pages/archive').then((m) => ({ default: m.SpellsArchivePage }))
);
const ArchivePlaceholderPage = lazy(() =>
  import('@/pages/archive').then((m) => ({ default: m.ArchivePlaceholderPage }))
);

function PageLoader() {
  const { t } = useTranslation();
  return (
    <div className={styles.loader}>
      <p className={styles.loaderText}>{t('common.loading')}</p>
    </div>
  );
}

function withSuspense(element: React.ReactNode) {
  return (
    <ErrorBoundary FallbackComponent={RouteError}>
      <Suspense fallback={<PageLoader />}>{element}</Suspense>
    </ErrorBoundary>
  );
}

export const router = createHashRouter([
  { path: '/', element: withSuspense(<ModeSelectPage />) },
  { path: '/master', element: withSuspense(<MasterHomePage />) },
  { path: '/master/spells', element: withSuspense(<SpellsArchivePage />) },
  {
    path: '/master/npcs',
    element: withSuspense(<ArchivePlaceholderPage titleKey="archive.npcTitle" />),
  },
  { path: '/player', element: withSuspense(<PlayerPage />) },
  { path: '/company', element: withSuspense(<CompanyPage />) },
]);
