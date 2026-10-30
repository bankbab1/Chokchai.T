import { t } from "../i18n";
import { useEffect, useState } from 'react';

export function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        let nearBottom = false;
        const update = () => {
            const remaining = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
            // Separate hide/show thresholds prevent flickering around the footer.
            nearBottom = nearBottom ? remaining < 200 : remaining < 120;
            setVisible(window.scrollY > 320 && !nearBottom);
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        const observer = new ResizeObserver(update);
        observer.observe(document.body);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
            observer.disconnect();
        };
    }, []);
    function goToTop() {
        // Clear a deep section anchor so a refresh also opens at the profile top.
        if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search);
        window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    return <button type="button" className={`scroll-to-top${visible ? ' is-visible' : ''}`}
        aria-label={t("Scroll to top")} title={t("Scroll to top")} tabIndex={visible ? 0 : -1}
        aria-hidden={!visible} onClick={goToTop}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 15 6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </button>;
}
