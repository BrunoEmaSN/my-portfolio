/**
 * Centralized gamepad controller (Xbox/PlayStation).
 *
 * Uses the standard Gamepad API (W3C): Xbox and PlayStation map the same.
 * Same pattern as KeyboardController: singleton, priority, bindings per action.
 * Fires on "press" (transition to pressed), not while held.
 */

import { useAppStore, getInputDeviceFromGamepadId } from '../store';

export type GamepadActionHandler = () => void | boolean;

export interface GamepadBindings {
  /** Actions: a, b, x, y, lb, rb, lt, rt, back, start, l3, r3, dpad-up, dpad-down, dpad-left, dpad-right, stick-left-up, stick-left-down, stick-left-left, stick-left-right, stick-right-up, ... */
  [action: string]: GamepadActionHandler;
}

export interface GamepadRegisterOptions {
  /** Higher priority = evaluated first. Default 50. */
  priority?: number;
}

interface ContextEntry {
  bindings: Map<string, GamepadActionHandler>;
  priority: number;
}

/** Standard W3C indices: same for Xbox and PlayStation (Cross=A, Circle=B, etc.). */
const BUTTON_TO_ACTION: Record<number, string> = {
  0: 'a',        // A / Cross
  1: 'b',        // B / Circle
  2: 'x',        // X / Square
  3: 'y',        // Y / Triangle
  4: 'lb',       // L1 / LB
  5: 'rb',       // R1 / RB
  6: 'lt',       // L2 / LT
  7: 'rt',       // R2 / RT
  8: 'back',     // Share / View
  9: 'start',    // Options / Menu
  10: 'l3',      // Left stick click
  11: 'r3',      // Right stick click
  12: 'dpad-up',
  13: 'dpad-down',
  14: 'dpad-left',
  15: 'dpad-right',
};

/** Axis → actions: [negative, positive]. axes[1] has -1 = up. */
const AXIS_ACTIONS: Record<number, [string, string]> = {
  0: ['stick-left-left', 'stick-left-right'],   // Left X
  1: ['stick-left-up', 'stick-left-down'],      // Left Y (-1 = up)
  2: ['stick-right-left', 'stick-right-right'], // Right X
  3: ['stick-right-up', 'stick-right-down'],    // Right Y
};

const DEFAULT_PRIORITY = 50;
const AXIS_THRESHOLD = 0.5;
/** While stick is held tilted, repeat the action every N ms. */
const STICK_REPEAT_MS = 100;

export class GamepadController {
  private static instance: GamepadController | null = null;
  private contexts = new Map<string, ContextEntry>();
  private sortedContextIds: string[] = [];
  private rafId: number | null = null;
  private prevButtons: (boolean | number)[][] = [];
  private prevAxes: number[][] = [];
  /** Per gamepad: last dispatch time per axis and direction for continuous repeat. */
  private stickLastDispatch: Record<string, number> = {};

  private constructor() {}

  static getInstance(): GamepadController {
    if (!GamepadController.instance) {
      GamepadController.instance = new GamepadController();
    }
    return GamepadController.instance;
  }

  register(
    contextId: string,
    bindings: GamepadBindings,
    options: GamepadRegisterOptions = {}
  ): void {
    const priority = options.priority ?? DEFAULT_PRIORITY;
    const map = new Map<string, GamepadActionHandler>();
    for (const [action, handler] of Object.entries(bindings)) {
      map.set(action.toLowerCase(), handler);
    }
    this.contexts.set(contextId, { bindings: map, priority });
    this.updateSortedContextIds();
    this.startPollIfNeeded();
  }

  unregister(contextId: string): void {
    this.contexts.delete(contextId);
    this.updateSortedContextIds();
    this.stopPollIfNeeded();
  }

  updateBindings(contextId: string, bindings: GamepadBindings): void {
    const entry = this.contexts.get(contextId);
    if (!entry) return;
    const map = new Map<string, GamepadActionHandler>();
    for (const [action, handler] of Object.entries(bindings)) {
      map.set(action.toLowerCase(), handler);
    }
    entry.bindings = map;
  }

  private updateSortedContextIds(): void {
    this.sortedContextIds = Array.from(this.contexts.entries())
      .sort((a, b) => b[1].priority - a[1].priority)
      .map(([id]) => id);
  }

  private dispatch(action: string): boolean {
    for (const contextId of this.sortedContextIds) {
      const entry = this.contexts.get(contextId);
      if (!entry) continue;
      const handler = entry.bindings.get(action);
      if (!handler) continue;
      const handled = handler();
      if (handled === true) return true;
    }
    return false;
  }

  private isPressed(value: boolean | number): boolean {
    if (typeof value === 'boolean') return value;
    return value > AXIS_THRESHOLD;
  }

  private poll(): void {
    if (typeof navigator === 'undefined' || !navigator.getGamepads) return;

    const gamepads = navigator.getGamepads();
    const now = Date.now();

    for (let g = 0; g < gamepads.length; g++) {
      const pad = gamepads[g];
      if (!pad || !pad.connected) continue;

      const prevB = this.prevButtons[g] ?? [];
      const device = getInputDeviceFromGamepadId(pad.id);

      // Buttons
      for (let i = 0; i < pad.buttons.length; i++) {
        const action = BUTTON_TO_ACTION[i];
        if (!action) continue;
        const pressed = this.isPressed(pad.buttons[i].value);
        const wasPressed = i < prevB.length && this.isPressed(prevB[i]);
        if (pressed && !wasPressed) {
          useAppStore.getState().setInputDevice(device);
          if (this.dispatch(action)) break;
        }
      }

      // Axes (sticks): continuous repeat while held tilted
      for (let i = 0; i < pad.axes.length; i++) {
        const actions = AXIS_ACTIONS[i];
        if (!actions) continue;
        const [negAction, posAction] = actions;
        const v = pad.axes[i];

        const nowNeg = v <= -AXIS_THRESHOLD;
        const nowPos = v >= AXIS_THRESHOLD;

        const negKey = `${g}-${i}-neg`;
        const posKey = `${g}-${i}-pos`;
        const lastNeg = this.stickLastDispatch[negKey] ?? 0;
        const lastPos = this.stickLastDispatch[posKey] ?? 0;

        if (nowNeg) {
          if (now - lastNeg >= STICK_REPEAT_MS || lastNeg === 0) {
            useAppStore.getState().setInputDevice(device);
            if (this.dispatch(negAction)) break;
            this.stickLastDispatch[negKey] = now;
          }
        } else {
          this.stickLastDispatch[negKey] = 0;
        }

        if (nowPos) {
          if (now - lastPos >= STICK_REPEAT_MS || lastPos === 0) {
            useAppStore.getState().setInputDevice(device);
            if (this.dispatch(posAction)) break;
            this.stickLastDispatch[posKey] = now;
          }
        } else {
          this.stickLastDispatch[posKey] = 0;
        }
      }

      this.prevButtons[g] = pad.buttons.map((b) => b.value);
      this.prevAxes[g] = Array.from(pad.axes);
    }

    this.rafId = requestAnimationFrame(() => this.poll());
  }

  private startPollIfNeeded(): void {
    if (this.contexts.size > 0 && this.rafId === null && typeof requestAnimationFrame !== 'undefined') {
      this.rafId = requestAnimationFrame(() => this.poll());
    }
  }

  private stopPollIfNeeded(): void {
    if (this.contexts.size === 0 && this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

export const getGamepadController = () => GamepadController.getInstance();
