import { create } from 'zustand';

interface AppState {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedIndex: 0,
  setSelectedIndex: (index: number) => set({ selectedIndex: index }),
}));
