import { create } from 'zustand';
import { SECTIONS } from '../../constants';

interface AppState {
  activeSection: string;
  showMenu: boolean;
  showSplash: boolean;
  setActiveSection: (sectionId: string) => void;
  selectSection: (sectionId: string) => void;
  backToMenu: () => void;
  toggleApp: () => void;
  closeSplash: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeSection: SECTIONS.ABOUT_ME,
  showMenu: true,
  showSplash: true,
  setActiveSection: (sectionId: string) => set({ activeSection: sectionId }),
  selectSection: (sectionId: string) => set({ activeSection: sectionId, showMenu: false }),
  backToMenu: () => set({ showMenu: true }),
  toggleApp: () => set((prev) => ({ showSplash: !prev.showSplash, activeSection: SECTIONS.ABOUT_ME })),
  closeSplash: () => set({ showSplash: false }),
}));
