import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      signIn: () => set({ isAuthenticated: true }),
      signOut: () => set({ isAuthenticated: false }),
    }),
    { name: 'dnd-session' }
  )
);
