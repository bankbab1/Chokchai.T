import { useEffect, useRef } from 'react';
import { t } from '../i18n';
import './transition.css';

/** Keep the farewell above the profile and trap focus until the welcome page takes over. */
export function ExitingScreen() {
    const dialog = useRef<HTMLDialogElement>(null);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    useEffect(() => {
        const node = dialog.current!;
        node.showModal();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = 'index.html';
        document.head.appendChild(prefetch);
        const timer = window.setTimeout(() => window.location.assign('index.html'), reduced ? 200 : 1200);
        return () => {
            clearTimeout(timer);
            prefetch.remove();
            document.body.style.overflow = previousOverflow;
            node.close();
        };
    }, [reduced]);
    return <dialog ref={dialog} className="splash splash-exit" aria-labelledby="farewell-title" aria-describedby="farewell-detail" onCancel={event => event.preventDefault()}>
        <div className="splash-orb o1" aria-hidden="true" />
        <div className="splash-orb o2" aria-hidden="true" />
        <div className="splash-core">
            <div className="splash-mark" aria-hidden="true">
                <span className="splash-wave w1" /><span className="splash-wave w2" />
                <span className="splash-logo">CT</span>
            </div>
            <strong className="splash-name" id="farewell-title">{t('See you again')}</strong>
            <span className="farewell-note" id="farewell-detail">{t('Thanks for stopping by')}</span>
            <span className="splash-step" role="status">{t('Returning to welcome')}<i className="splash-dots" aria-hidden="true" /></span>
            <div className="splash-bar" aria-hidden="true"><span /></div>
        </div>
    </dialog>;
}
