import { RouterProvider } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { LanguageSwitcher } from '@/features/language-switcher';
import { ScrollArea } from '@/shared/ui';

import { AppProviders } from './providers/app-providers';
import { router } from './router';

import styles from './App.module.css';

export function App() {
  return (
    <AppProviders>
      <ScrollArea className={styles.root}>
        <LanguageSwitcher />
        <RouterProvider router={router} />
      </ScrollArea>
      <SpeedInsights />
    </AppProviders>
  );
}
