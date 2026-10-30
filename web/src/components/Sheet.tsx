import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
    onClose: () => void;
    /** "bottom" is a card sheet that rises from the bottom edge; "left" slides in from the left edge. */
    from?: 'bottom' | 'left';
    labelledBy?: string;
    describedBy?: string;
    label?: string;
    /** Receives `close`, which plays the slide-out animation before calling onClose. */
    children: (close: () => void) => ReactNode;
};

/**
 * An iOS-style card sheet on a native <dialog>: focus is trapped, Escape and the backdrop dismiss it,
 * and the bottom variant can also be swiped down.
 */
export function Sheet({ onClose, from = 'bottom', labelledBy, describedBy, label, children }: Props) {
    const dialog = useRef<HTMLDialogElement>(null);
    const panel = useRef<HTMLDivElement>(null);
    const drag = useRef<{ y: number; moved: number } | null>(null);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const d = dialog.current;
        if (!d) return;
        if (!d.open) d.showModal();
        return () => { if (d.open) d.close(); };
    }, []);

    const close = () => {
        if (closing) return;
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) { onClose(); return; }
        setClosing(true);
        window.setTimeout(onClose, 260);
    };

    const start = (e: React.PointerEvent) => {
        drag.current = { y: e.clientY, moved: 0 };
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        panel.current?.classList.add('dragging');
    };
    const move = (e: React.PointerEvent) => {
        if (!drag.current) return;
        drag.current.moved = Math.max(0, e.clientY - drag.current.y);
        panel.current?.style.setProperty('--sheet-drag', `${drag.current.moved}px`);
    };
    const end = () => {
        if (!drag.current) return;
        const moved = drag.current.moved;
        drag.current = null;
        panel.current?.classList.remove('dragging');
        if (moved > 90) close();
        else panel.current?.style.setProperty('--sheet-drag', '0px');
    };

    return (
        <dialog
            ref={dialog}
            className={`sheet-dialog from-${from}${closing ? ' closing' : ''}`}
            aria-labelledby={labelledBy}
            aria-describedby={describedBy}
            aria-label={labelledBy ? undefined : label}
            onCancel={e => { e.preventDefault(); close(); }}
            onClick={e => { if (e.target === dialog.current) close(); }}
        >
            <div className="sheet-panel" ref={panel} tabIndex={-1} autoFocus>
                {from === 'bottom' && (
                    <div className="sheet-grab" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
                        <span className="sheet-handle" aria-hidden="true"></span>
                    </div>
                )}
                {children(close)}
            </div>
        </dialog>
    );
}
