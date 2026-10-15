import { useEffect } from 'react';
import { initializeTheme, toggleTheme, track, listeners } from './shared';
export function useLanding() {
    useEffect(() => {
        initializeTheme(true);
        const events = listeners();
        const root = document.documentElement;
        const theme = document.getElementById('themeToggle')!;
        const icon = () => { theme.innerHTML = root.dataset.theme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>'; };
        icon();
        events.on(theme, 'click', () => { toggleTheme(); icon(); });
        track('Landing Page Viewed', 'index.html');
        return events.cleanup;
    }, []);
}
