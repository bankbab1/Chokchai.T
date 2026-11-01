import './transition.css';
import { useEffect, useState } from 'react';

const STEPS = ['Loading experience', 'Loading skills', 'Loading projects', 'Almost there'];
const DURATION = 1500;

/** Full-screen "entering" moment between confirming on the welcome screen and opening the profile. */
export function EnteringScreen({ onDone }: { onDone: () => void }) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const [step, setStep] = useState(0);
    useEffect(() => {
        // Warm the profile page while the animation plays, so it appears fast after the hand-off.
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = 'profile.html';
        document.head.appendChild(link);
        const done = window.setTimeout(onDone, reduced ? 350 : DURATION);
        const tick = window.setInterval(() => setStep(s => Math.min(s + 1, STEPS.length - 1)), DURATION / STEPS.length);
        return () => { clearTimeout(done); clearInterval(tick); link.remove(); };
    }, [onDone, reduced]);
    return (
        <div className="splash" role="status" aria-live="polite" aria-label="Opening profile">
            <div className="splash-orb o1" aria-hidden="true" />
            <div className="splash-orb o2" aria-hidden="true" />
            <div className="splash-core">
                <div className="splash-mark" aria-hidden="true">
                    <span className="splash-wave w1" />
                    <span className="splash-wave w2" />
                    <span className="splash-logo">CT</span>
                </div>
                <strong className="splash-name">Chokchai.T</strong>
                <span className="splash-step" key={step}>{STEPS[step]}<i className="splash-dots" aria-hidden="true" /></span>
                <div className="splash-bar" aria-hidden="true"><span style={{ animationDuration: `${reduced ? 350 : DURATION}ms` }} /></div>
            </div>
        </div>
    );
}
