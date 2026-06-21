import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './providers/app-providers';
import { router } from './router';
import { LanguageSwitcher } from '@/features/language-switcher';
import { ScrollArea } from '@/shared/ui/scroll-area';

export function App() {
  return (
    <AppProviders>
      <ScrollArea className="h-full">
        <LanguageSwitcher />
        <RouterProvider router={router} />
      </ScrollArea>
    </AppProviders>
  );
}
