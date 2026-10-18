import { JSDOM } from "jsdom";

export const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/fr" });
for (const [key, value] of Object.entries({
  window: dom.window, self: dom.window, document: dom.window.document, navigator: dom.window.navigator,
  Element: dom.window.Element, HTMLElement: dom.window.HTMLElement, Node: dom.window.Node, Event: dom.window.Event,
  MouseEvent: dom.window.MouseEvent, KeyboardEvent: dom.window.KeyboardEvent,
  IS_REACT_ACT_ENVIRONMENT: true,
})) Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });

const mediaListeners = new Set<(event: MediaQueryListEvent) => void>();
Object.defineProperty(dom.window, "matchMedia", {
  configurable: true,
  value: (media: string) => ({
    media, matches: false,
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => mediaListeners.add(listener),
    removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => mediaListeners.delete(listener),
  }),
});

export function enterDesktopViewport() {
  const event = new dom.window.Event("change");
  Object.defineProperty(event, "matches", { value: true });
  mediaListeners.forEach((listener) => listener(event as unknown as MediaQueryListEvent));
}
