import { useEffect, useState } from 'react';

export function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const update = () => setVisible(window.scrollY > 320);
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);
    function goToTop() {
        // Clear a deep section anchor so a refresh also opens at the profile top.
        if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search);
        window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    return <button type="button" className={`scroll-to-top${visible ? ' is-visible' : ''}`}
        aria-label="Scroll to top" title="Scroll to top" tabIndex={visible ? 0 : -1}
        aria-hidden={!visible} onClick={goToTop}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 15 6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </button>;
}
