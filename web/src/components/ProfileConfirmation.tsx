import { useEffect, useRef } from 'react';
import { track } from '../hooks/shared';

export function ProfileConfirmation({ onClose }: { onClose: () => void }) {
    const dialog = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const node = dialog.current!;
        const previous = document.activeElement as HTMLElement | null;
        node.showModal();
        document.body.classList.add('landing-dialog-open');
        return () => { document.body.classList.remove('landing-dialog-open'); previous?.focus(); };
    }, []);
    function proceed() {
        track('View Profile Clicked', 'index.html');
        window.location.href = 'profile.html';
    }
    return <dialog ref={dialog} className="profile-sheet" aria-labelledby="profile-sheet-title" onClose={onClose}
        onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <section className="profile-sheet-panel">
            <div className="sheet-handle" aria-hidden="true" />
            <button className="sheet-close" aria-label="Close confirmation" onClick={() => dialog.current?.close()}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
            <div className="sheet-person"><img src="chok.jpg" alt=""/><div><strong>Chokchai.T</strong><span>Senior Digital Solution</span></div></div>
            <h2 id="profile-sheet-title">A closer look at my work.</h2>
            <p>Explore my experience, skills and the projects I’ve built — from enterprise solutions to personal experiments.</p>
            <div className="sheet-topics"><span>Experience</span><span>Skills</span><span>Projects</span></div>
            <button className="sheet-continue" onClick={proceed} autoFocus>Continue to profile <span aria-hidden="true">↗</span></button>
            <button className="sheet-cancel" onClick={() => dialog.current?.close()}>Stay here</button>
        </section>
    </dialog>;
}
