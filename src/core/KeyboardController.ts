/**
 * Centralized keyboard controller.
 *
 * Design patterns used:
 * - Singleton: single global instance.
 * - Observer/Registry: contexts register with bindings and receive events.
 * - Chain of responsibility: evaluated by priority; the first to handle the key consumes the event.
 */

import { useAppStore } from '../store';

export type KeyHandler = (event: KeyboardEvent) => void | boolean;

export interface KeyBindings {
  [key: string]: KeyHandler;
}

export interface RegisterOptions {
  /** Higher priority = evaluated first. Default 50. */
  priority?: number;
  /** If true, ignores when focus is in input/textarea/contentEditable. Default true. */
  ignoreInInputs?: boolean;
}

interface ContextEntry {
  bindings: Map<string, KeyHandler>;
  priority: number;
  ignoreInInputs: boolean;
}

const DEFAULT_PRIORITY = 50;
const INPUT_TAGS = new Set(['input', 'textarea']);
const DEFAULT_IGNORE_IN_INPUTS = true;

export class KeyboardController {
  private static instance: KeyboardController | null = null;
  private contexts = new Map<string, ContextEntry>();
  private sortedContextIds: string[] = [];
  private listening = false;
  private boundHandler: (e: KeyboardEvent) => void;

  private constructor() {
    this.boundHandler = this.handleKeyDown.bind(this);
  }

  static getInstance(): KeyboardController {
    if (!KeyboardController.instance) {
      KeyboardController.instance = new KeyboardController();
    }
    return KeyboardController.instance;
  }

  /**
   * Registers a context with its key bindings.
   * Keys are compared in lowercase (key.toLowerCase()).
   * If the handler returns `true`, preventDefault is called and the event is not propagated to other contexts.
   */
  register(
    contextId: string,
    bindings: KeyBindings,
    options: RegisterOptions = {}
  ): void {
    const priority = options.priority ?? DEFAULT_PRIORITY;
    const ignoreInInputs = options.ignoreInInputs ?? DEFAULT_IGNORE_IN_INPUTS;
    const map = new Map<string, KeyHandler>();
    for (const [key, handler] of Object.entries(bindings)) {
      map.set(key.toLowerCase(), handler);
    }
    this.contexts.set(contextId, {
      bindings: map,
      priority,
      ignoreInInputs,
    });
    this.updateSortedContextIds();
    this.attachIfNeeded();
  }

  /**
   * Unregisters a context.
   */
  unregister(contextId: string): void {
    this.contexts.delete(contextId);
    this.updateSortedContextIds();
    this.detachIfNeeded();
  }

  /**
   * Updates only the bindings of an already registered context (priority is preserved).
   */
  updateBindings(contextId: string, bindings: KeyBindings): void {
    const entry = this.contexts.get(contextId);
    if (!entry) return;
    const map = new Map<string, KeyHandler>();
    for (const [key, handler] of Object.entries(bindings)) {
      map.set(key.toLowerCase(), handler);
    }
    entry.bindings = map;
  }

  private updateSortedContextIds(): void {
    this.sortedContextIds = Array.from(this.contexts.entries())
      .sort((a, b) => b[1].priority - a[1].priority)
      .map(([id]) => id);
  }

  private isInputFocused(): boolean {
    if (typeof document === 'undefined') return false;
    const target = document.activeElement as HTMLElement | null;
    if (!target) return false;
    const tag = target.tagName?.toLowerCase();
    if (INPUT_TAGS.has(tag)) return true;
    if (target.isContentEditable) return true;
    return false;
  }

  private normalizeKey(key: string): string {
    return key.length === 1 ? key.toLowerCase() : key.toLowerCase();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    useAppStore.getState().setInputDevice('keyboard');
    const keyNormalized = this.normalizeKey(event.key);
    for (const contextId of this.sortedContextIds) {
      const entry = this.contexts.get(contextId);
      if (!entry) continue;
      if (entry.ignoreInInputs && this.isInputFocused()) continue;
      const handler =
        entry.bindings.get(keyNormalized) ?? entry.bindings.get(event.key);
      if (!handler) continue;
      const handled = handler(event);
      if (handled === true) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    }
  }

  private attachIfNeeded(): void {
    if (this.contexts.size > 0 && !this.listening && typeof window !== 'undefined') {
      this.listening = true;
      window.addEventListener('keydown', this.boundHandler, true);
    }
  }

  private detachIfNeeded(): void {
    if (this.contexts.size === 0 && this.listening && typeof window !== 'undefined') {
      this.listening = false;
      window.removeEventListener('keydown', this.boundHandler, true);
    }
  }
}

export const getKeyboardController = () => KeyboardController.getInstance();
