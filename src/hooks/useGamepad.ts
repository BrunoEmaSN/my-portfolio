import { useEffect, useRef } from 'react';
import {
  getGamepadController,
  type GamepadBindings,
  type GamepadRegisterOptions,
} from '../core/GamepadController';

/**
 * Registra bindings de gamepad con el controlador global para el contexto dado.
 * Los handlers leen del ref actual, así que pueden usar el estado más reciente.
 * Al desmontar se desregistra el contexto.
 *
 * Acciones disponibles (Xbox / PlayStation):
 * - a, b, x, y (A/Cross, B/Circle, X/Square, Y/Triangle)
 * - lb, rb, lt, rt (bumpers y triggers)
 * - back, start (View/Share, Menu/Options)
 * - l3, r3 (clic de sticks)
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
