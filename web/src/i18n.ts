import { useSyncExternalStore } from 'react';
import { TH } from './i18n-th';

/*
 * Two languages for the profile: English (default) and Thai.
 * Text is written in English in the components and wrapped in t(); Thai comes from the TH dictionary,
 * keyed by the exact English string, and falls back to English when a string has no Thai yet.
 */
export type Lang = 'en' | 'th';

const KEY = 'lang';
const listeners = new Set<() => void>();

function read(): Lang {
    try {
        const saved = localStorage.getItem(KEY);
        if (saved === 'th' || saved === 'en') return saved;
    } catch { /* storage can be blocked; English is the default */ }
    return 'en';
}

let current: Lang = read();

export const getLang = () => current;

export function setLang(next: Lang) {
    if (next === current) return;
    current = next;
    try { localStorage.setItem(KEY, next); } catch { /* ignore */ }
    document.documentElement.lang = next;
    listeners.forEach(fn => fn());
}

/** Subscribe a component to language changes. Components below it re-render with it. */
export function useLang(): Lang {
    return useSyncExternalStore(
        fn => { listeners.add(fn); return () => { listeners.delete(fn); }; },
        getLang,
        () => 'en' as Lang,
    );
}

/** Translate an English string for the current language. */
export function t(text: string): string {
    return current === 'th' ? (TH[text] ?? text) : text;
}
