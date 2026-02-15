import { create } from 'zustand';

interface AppState {
  activeSection: string;
  showMenu: boolean;
  showSplash: boolean;
  setActiveSection: (sectionId: string) => void;
  selectSection: (sectionId: string) => void;
  backToMenu: () => void;
  toggleApp: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeSection: 'skills',
  showMenu: true,
  showSplash: true,
  setActiveSection: (sectionId: string) => set({ activeSection: sectionId }),
  selectSection: (sectionId: string) => set({ activeSection: sectionId, showMenu: false }),
  backToMenu: () => set({ showMenu: true }),
  toggleApp: () => set((prev) => ({ showSplash: !prev.showSplash, activeSection: 'skills' })),
}));
