import { lazy, Suspense } from 'react';
import { createHashRouter } from 'react-router-dom';

const ModeSelectPage = lazy(() =>
  import('@/pages/mode-select/ui/mode-select-page').then((m) => ({ default: m.ModeSelectPage })),
);
const MasterHomePage = lazy(() =>
  import('@/pages/master-home/ui/master-home-page').then((m) => ({ default: m.MasterHomePage })),
);
const CompanyPage = lazy(() =>
  import('@/pages/company/ui/company-page').then((m) => ({ default: m.CompanyPage })),
);
const PlayerPage = lazy(() =>
  import('@/pages/player/ui/player-page').then((m) => ({ default: m.PlayerPage })),
);
const SpellsArchivePage = lazy(() =>
  import('@/pages/archive/ui/spells-archive-page').then((m) => ({ default: m.SpellsArchivePage })),
);
const ArchivePlaceholderPage = lazy(() =>
  import('@/pages/archive/ui/archive-placeholder-page').then((m) => ({
    default: m.ArchivePlaceholderPage,
  })),
);

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Загрузка...</p>
    </div>
  );
}

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

export const router = createHashRouter([
  { path: '/', element: withSuspense(<ModeSelectPage />) },
  { path: '/master', element: withSuspense(<MasterHomePage />) },
  { path: '/master/spells', element: withSuspense(<SpellsArchivePage />) },
  { path: '/master/npcs', element: withSuspense(<ArchivePlaceholderPage titleKey="archive.npcTitle" />) },
  { path: '/player', element: withSuspense(<PlayerPage />) },
  { path: '/company', element: withSuspense(<CompanyPage />) },
]);
