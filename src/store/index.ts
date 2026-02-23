import { create } from 'zustand';

export type InputDevice = 'keyboard' | 'playstation' | 'xbox';

/** Detects whether the gamepad id is PlayStation or Xbox. */
export function getInputDeviceFromGamepadId(id: string): 'playstation' | 'xbox' {
  const lower = id.toLowerCase();
  if (
    lower.includes('playstation') ||
    lower.includes('dualshock') ||
    lower.includes('dualsense') ||
    lower.includes('ps3') ||
    lower.includes('ps4') ||
    lower.includes('ps5') ||
    lower.includes('sony')
  ) {
    return 'playstation';
  }
  return 'xbox'; // Xbox, XINPUT, Microsoft or generic
}

interface AppState {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  /** Last input device used: keyboard, PlayStation or Xbox controller. */
  inputDevice: InputDevice;
  setInputDevice: (device: InputDevice) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedIndex: 0,
  setSelectedIndex: (index: number) => set({ selectedIndex: index }),
  inputDevice: 'keyboard',
  setInputDevice: (device: InputDevice) => set({ inputDevice: device }),
}));
