import { createContext, type ReactNode, useContext } from 'react';

const OpenAuthContext = createContext<(() => void) | null>(null);

interface OpenAuthProviderProps {
  openAuth: () => void;
  children: ReactNode;
}

export function OpenAuthProvider({ openAuth, children }: OpenAuthProviderProps) {
  return <OpenAuthContext.Provider value={openAuth}>{children}</OpenAuthContext.Provider>;
}

export function useOpenMasterAuth(): () => void {
  const openAuth = useContext(OpenAuthContext);

  if (!openAuth) {
    throw new Error('useOpenMasterAuth must be used inside the public layout');
  }

  return openAuth;
}
