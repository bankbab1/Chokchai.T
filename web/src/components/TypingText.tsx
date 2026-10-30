import { useEffect, useState } from 'react';

/*
 * Types a line out one character at a time, with a caret that follows the typing and goes away when done.
 * - No layout shift: the whole line is laid out from the start; untyped characters are just transparent.
 * - Screen readers get the full text at once; reduced motion shows it straight away.
 * - A "\n" in the text becomes a line break.
 */
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function graphemes(text: string): string[] {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
        return [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text)].map(s => s.segment);
    }
    return Array.from(text);
}

export function TypingText({ text }: { text: string }) {
    const parts = graphemes(text);
    const still = typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION).matches;
    const [shown, setShown] = useState(still ? parts.length : 0);
    const typing = shown < parts.length;

    useEffect(() => {
        if (still) return;
        // About 1.4 s for the whole line, whatever its length; a short pause before the first letter.
        const step = Math.min(80, Math.max(40, 1400 / parts.length));
        let n = 0;
        let timer = window.setTimeout(function tick() {
            n += 1;
            setShown(n);
            if (n < parts.length) timer = window.setTimeout(tick, step);
        }, 400);
        return () => window.clearTimeout(timer);
    }, [still, parts.length]);

    return (<>
        <span className="sr-only">{text.replace('\n', ' ')}</span>
        <span aria-hidden="true">
            {shown === 0 && !still && <Caret />}
            {parts.map((p, i) => p === '\n'
                ? <br key={i} />
                : <span key={i} className={i < shown ? undefined : 'typing-wait'}>
                    {p}
                    {i === shown - 1 && typing && !still && <Caret />}
                </span>)}
        </span>
    </>);
}

/** A zero-width inline anchor, so the caret never moves or re-wraps the text around it. */
function Caret() {
    return <span className="typing-anchor"><span className="typing-caret" /></span>;
}
