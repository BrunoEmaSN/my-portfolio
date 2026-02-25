import { useEffect, useRef } from 'react';
import {
  getKeyboardController,
  type KeyBindings,
  type RegisterOptions,
} from '../core/KeyboardController';

/**
 * Registers key bindings with the global controller for the given context.
 * Handlers always read from the latest render (ref), so they can use current state.
 * On unmount the context is unregistered.
 */
export function useKeyboard(
  contextId: string,
  bindings: KeyBindings,
  options?: RegisterOptions
): void {
  const controller = getKeyboardController();
  const bindingsRef = useRef(bindings);
  bindingsRef.current = bindings;

  const keySet = Object.keys(bindings)
    .sort()
    .join(',');

  useEffect(() => {
    const wrapped: KeyBindings = {};
    for (const key of Object.keys(bindingsRef.current)) {
      wrapped[key] = (e) => bindingsRef.current[key]?.(e);
    }
    controller.register(contextId, wrapped, options ?? {});
    return () => controller.unregister(contextId);
  }, [contextId, keySet, options?.priority, options?.ignoreInInputs]);
}
