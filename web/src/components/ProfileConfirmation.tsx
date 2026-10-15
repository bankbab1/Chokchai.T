import { useEffect, useRef, useState } from 'react';
import { track } from '../hooks/shared';

export function ProfileConfirmation({ onClose }: { onClose: () => void }) {
    const dialog = useRef<HTMLDialogElement>(null);
    const [phase, setPhase] = useState('entering');
    const [offset, setOffset] = useState(0);
    const [dragging, setDragging] = useState(false);
    const gesture = useRef<{ y: number; time: number } | null>(null);
    const closing = useRef(false);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    function dismiss(after?: () => void) {
        if (closing.current) return;
        closing.current = true;
        setDragging(false);
        setPhase('closing');
        timer.current = setTimeout(() => {
            dialog.current?.close();
            after?.();
        }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300);
    }
    useEffect(() => {
        const node = dialog.current!;
        const previous = document.activeElement as HTMLElement | null;
        node.showModal();
        const frame = requestAnimationFrame(() => requestAnimationFrame(() => setPhase('open')));
        document.body.classList.add('landing-dialog-open');
        return () => { cancelAnimationFrame(frame); clearTimeout(timer.current); document.body.classList.remove('landing-dialog-open'); previous?.focus(); };
    }, []);
    function proceed() {
        dismiss(() => {
            track('View Profile Clicked', 'index.html');
            window.location.href = 'profile.html';
        });
    }
    return <dialog ref={dialog} className={`profile-sheet ${phase}`} aria-labelledby="profile-sheet-title" onClose={onClose} onCancel={event => { event.preventDefault(); dismiss(); }}
        onClick={event => { if (event.target === event.currentTarget) dismiss(); }}>
        <section className={`profile-sheet-panel${dragging ? ' dragging' : ''}`} style={{ '--sheet-drag': `${offset}px` } as React.CSSProperties}
            onPointerDown={event => {
                if (closing.current || event.button !== 0 || (event.target as HTMLElement).closest('button') || event.currentTarget.scrollTop > 0) return;
                gesture.current = { y: event.clientY, time: performance.now() };
                event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={event => {
                if (!gesture.current) return;
                const distance = Math.max(0, event.clientY - gesture.current.y);
                setDragging(true);
                setOffset(distance);
            }}
            onPointerUp={event => {
                if (!gesture.current) return;
                const distance = Math.max(0, event.clientY - gesture.current.y);
                const velocity = distance / Math.max(1, performance.now() - gesture.current.time);
                gesture.current = null;
                setDragging(false);
                if (distance > 100 || (distance > 35 && velocity > .5)) dismiss();
                else setOffset(0);
            }}
            onPointerCancel={() => { gesture.current = null; setDragging(false); setOffset(0); }}>
            <div className="sheet-handle" aria-hidden="true" />
            <button className="sheet-close" aria-label="Close confirmation" onClick={() => dismiss()}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
            <div className="sheet-person"><img src="chok.jpg" alt=""/><div><strong>Chokchai.T</strong><span>Senior Digital Solution</span></div></div>
            <h2 id="profile-sheet-title">A closer look at my work.</h2>
            <p>Explore my experience, skills and the projects I’ve built — from enterprise solutions to personal experiments.</p>
            <div className="sheet-topics"><span>Experience</span><span>Skills</span><span>Projects</span></div>
            <button className="sheet-continue" onClick={proceed} autoFocus>Continue to profile <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <button className="sheet-cancel" onClick={() => dismiss()}>Stay here</button>
        </section>
    </dialog>;
}
