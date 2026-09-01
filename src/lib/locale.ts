export type Locale = "da" | "en";

const KEY = "trustlog.locale";
const listeners = new Set<() => void>();

let locale: Locale = "en";
let hydrated = false;

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  const stored = window.localStorage.getItem(KEY);
  if (stored === "da" || stored === "en") locale = stored;
  hydrated = true;
}

export function subscribeLocale(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getLocaleSnapshot(): Locale {
  hydrate();
  return locale;
}

export function getServerLocaleSnapshot(): Locale {
  return "en";
}

export function setLocaleValue(next: Locale) {
  locale = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, next);
    document.documentElement.lang = next;
  }
  listeners.forEach((listener) => listener());
}

export function dateLocale(locale: Locale): string {
  return locale === "da" ? "da-DK" : "en-GB";
}
