import { createHashRouter } from 'react-router-dom';
import { ModeSelectPage } from '@/pages/mode-select/ui/mode-select-page';
import { MasterAuthPage } from '@/pages/master-auth/ui/master-auth-page';
import { MasterHomePage } from '@/pages/master-home/ui/master-home-page';
import { CompanyPage } from '@/pages/company/ui/company-page';
import { PlayerPage } from '@/pages/player/ui/player-page';
import { ArchivePlaceholderPage } from '@/pages/archive/ui/archive-placeholder-page';
import { SpellsArchivePage } from '@/pages/archive/ui/spells-archive-page';

export const router = createHashRouter([
  { path: '/', element: <ModeSelectPage /> },
  { path: '/master/auth', element: <MasterAuthPage /> },
  { path: '/master', element: <MasterHomePage /> },
  { path: '/master/spells', element: <SpellsArchivePage /> },
  { path: '/master/npcs', element: <ArchivePlaceholderPage title="NPC Archive" /> },
  { path: '/player', element: <PlayerPage /> },
  { path: '/company', element: <CompanyPage /> },
]);
