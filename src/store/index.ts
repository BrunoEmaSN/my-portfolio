import { create } from 'zustand';

interface AppState {
  // Estado mínimo por si se necesita en el futuro (ej. tema, preferencias).
}

export const useAppStore = create<AppState>(() => ({}));
