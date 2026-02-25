import { useEffect, useRef } from 'react';
import {
  getGamepadController,
  type GamepadBindings,
  type GamepadRegisterOptions,
} from '../core/GamepadController';

/**
 * Registers gamepad bindings with the global controller for the given context.
 * Handlers read from the current ref, so they can use the latest state.
 * On unmount the context is unregistered.
 *
 * Available actions (Xbox / PlayStation):
 * - a, b, x, y (A/Cross, B/Circle, X/Square, Y/Triangle)
 * - lb, rb, lt, rt (bumpers and triggers)
 * - back, start (View/Share, Menu/Options)
 * - l3, r3 (stick click)
 * - dpad-up, dpad-down, dpad-left, dpad-right
 * - stick-left-up, stick-left-down, stick-left-left, stick-left-right
 * - stick-right-up, stick-right-down, stick-right-left, stick-right-right
 */
export function useGamepad(
  contextId: string,
  bindings: GamepadBindings,
  options?: GamepadRegisterOptions
): void {
  const controller = getGamepadController();
  const bindingsRef = useRef(bindings);
  bindingsRef.current = bindings;

  const keySet = Object.keys(bindings)
    .sort()
    .join(',');

  useEffect(() => {
    const wrapped: GamepadBindings = {};
    for (const key of Object.keys(bindingsRef.current)) {
      wrapped[key] = () => bindingsRef.current[key]?.();
    }
    controller.register(contextId, wrapped, options ?? {});
    return () => controller.unregister(contextId);
  }, [contextId, keySet, options?.priority]);
}
