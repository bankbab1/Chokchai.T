import { useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
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
        events.on(document.getElementById('viewProfileBtn')!, 'click', () => {
            const styles = getComputedStyle(root);
            void Swal.fire({ title: 'Proceed to Profile?', text: "Click below to view Chokchai.T's portfolio.", icon: 'info', confirmButtonText: 'Yes, View Profile', confirmButtonColor: styles.getPropertyValue('--accent').trim(), background: styles.getPropertyValue('--bg2').trim(), color: styles.getPropertyValue('--text').trim() }).then(result => { if (result.isConfirmed) {
                track('View Profile Clicked', 'index.html');
                window.location.href = 'profile.html';
            } });
        });
        return events.cleanup;
    }, []);
}
