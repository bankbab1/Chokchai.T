import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import qrcode from 'qrcode-generator';
import { t } from '../i18n';
import { copyText } from './copyText';
import { exportPdf } from './exportPdf';
import { Sheet } from './Sheet';

/** Odd number of QR modules cleared for the centre logo (about a quarter of the width, well inside what level-H error correction recovers). */
const logoModules = (count: number) => { const n = Math.floor(count * 0.24); return n % 2 ? n : n + 1; };

const POS_KEY = 'shareTabY';
const MARGIN = 12;

const readPos = () => {
    try { const v = parseFloat(localStorage.getItem(POS_KEY) ?? ''); return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.5; } catch { return 0.5; }
};

/**
 * A folder-style tab on the left edge with the portrait on it. It stays glued to the left edge and can be dragged up and down
 * (or moved with the arrow keys); the position is remembered. A tap, not a drag, slides a sheet in from the left with a QR code.
 */
export function ShareTab() {
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState(readPos); // vertical centre, 0..1 of the free range
    const [dragging, setDragging] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    const drag = useRef({ id: -1, startY: 0, startPos: 0, moved: false });

    /** Maps the 0..1 position onto a pixel centre that keeps the whole tab on screen. */
    const centreFor = (p: number) => {
        const half = (ref.current?.offsetHeight ?? 120) / 2;
        const lo = half + MARGIN, hi = window.innerHeight - half - MARGIN;
        return lo + (hi - lo) * p;
    };
    const free = () => {
        const half = (ref.current?.offsetHeight ?? 120) / 2;
        return Math.max(1, window.innerHeight - 2 * (half + MARGIN));
    };
    const save = (p: number) => { try { localStorage.setItem(POS_KEY, String(p)); } catch { /* ignore */ } };
    const clamp = (p: number) => Math.min(1, Math.max(0, p));

    // Re-apply on resize so the tab never ends up off screen
    const [, force] = useState(0);
    useEffect(() => {
        const onResize = () => force(n => n + 1);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const onDown = (e: PointerEvent<HTMLButtonElement>) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        drag.current = { id: e.pointerId, startY: e.clientY, startPos: pos, moved: false };
        e.currentTarget.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent<HTMLButtonElement>) => {
        const d = drag.current;
        if (d.id !== e.pointerId) return;
        const dy = e.clientY - d.startY;
        if (!d.moved && Math.abs(dy) < 6) return;
        if (!d.moved) { d.moved = true; setDragging(true); }
        setPos(clamp(d.startPos + dy / free()));
    };
    const onUp = (e: PointerEvent<HTMLButtonElement>) => {
        const d = drag.current;
        if (d.id !== e.pointerId) return;
        d.id = -1;
        setDragging(false);
        if (d.moved) save(pos);
    };
    const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
        const step = e.key === 'ArrowUp' ? -48 : e.key === 'ArrowDown' ? 48 : 0;
        if (!step) return;
        e.preventDefault();
        const next = clamp(pos + step / free());
        setPos(next);
        save(next);
    };
    const onClick = () => {
        if (drag.current.moved) { drag.current.moved = false; return; } // the release of a drag is not a tap
        setOpen(true);
    };

    return (<>
        <button
            ref={ref}
            type="button"
            className={`share-tab${dragging ? ' dragging' : ''}`}
            style={{ top: centreFor(pos) }}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label={t('Share this profile')}
            title={t('Share this profile')}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={onKey}
            onClick={onClick}
        >
            <img className="share-tab-photo" src="chok.jpg" alt="" decoding="async" draggable={false} />
            <i className="fa-solid fa-qrcode" aria-hidden="true"></i>
            <span className="share-tab-label" aria-hidden="true">{t('Share')}</span>
        </button>
        {open && <ShareSheet onClose={() => setOpen(false)} />}
    </>);
}

function ShareSheet({ onClose }: { onClose: () => void }) {
    // The QR points at the site's first screen, so anyone who scans it arrives the same way you intended.
    const url = useMemo(() => new URL('./', window.location.href).href, []);
    const qr = useMemo(() => {
        const code = qrcode(0, 'H');
        code.addData(url);
        code.make();
        return { code, svg: code.createSvgTag({ cellSize: 4, margin: 0, scalable: true }) };
    }, [url]);
    const svg = qr.svg;
    const [saved, setSaved] = useState(false);
    const savedTimer = useRef<number>(0);
    useEffect(() => () => window.clearTimeout(savedTimer.current), []);

    /** Draws the whole share card (portrait, title, name, framed QR, scan text and link) and downloads it as a PNG. */
    const save = async () => {
        const code = qr.code, count = code.getModuleCount();
        const W = 1000, pad = 64, accent = '#2563eb', ink = '#15161c', muted = '#5b6072', faint = '#8a8f9e', line = '#e2e8f0';
        const family = '"IBM Plex Sans Thai", "DM Sans", system-ui, sans-serif';
        try { await Promise.all([document.fonts.load(`700 46px ${family}`), document.fonts.load(`500 32px ${family}`)]); } catch { /* use fallback fonts */ }
        const photo = new Image();
        photo.src = 'chok.jpg';
        try { await photo.decode(); } catch { /* draw without the portrait */ }

        const photoSize = 128, qrCard = 640, qrPad = 64;
        const headY = pad, qrY = headY + photoSize + 56, hintY = qrY + qrCard + 78, urlY = hintY + 56, H = urlY + pad;
        const canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rounded = (x: number, y: number, w: number, h: number, r: number) => {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
        };

        // Card
        ctx.fillStyle = '#fff';
        rounded(0, 0, W, H, 56);
        ctx.fill();

        // Portrait, cropped square from the top, with an accent ring
        const cx = pad + photoSize / 2, cy = headY + photoSize / 2;
        if (photo.naturalWidth) {
            const side = Math.min(photo.naturalWidth, photo.naturalHeight);
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, photoSize / 2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(photo, (photo.naturalWidth - side) / 2, 0, side, side, pad, headY, photoSize, photoSize);
            ctx.restore();
        }
        ctx.lineWidth = 6;
        ctx.strokeStyle = accent;
        ctx.beginPath();
        ctx.arc(cx, cy, photoSize / 2 - 3, 0, Math.PI * 2);
        ctx.stroke();

        // Title and name
        ctx.textBaseline = 'alphabetic';
        ctx.textAlign = 'left';
        ctx.fillStyle = ink;
        ctx.font = `700 48px ${family}`;
        ctx.fillText(t('Chokchai Thawatcharaporn'), pad + photoSize + 32, cy - 6);
        ctx.fillStyle = muted;
        ctx.font = `500 34px ${family}`;
        ctx.fillText(t('Senior Digital Solution'), pad + photoSize + 32, cy + 42);

        // Framed QR
        const qx = (W - qrCard) / 2;
        ctx.fillStyle = '#fff';
        rounded(qx, qrY, qrCard, qrCard, 48);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = line;
        ctx.stroke();
        const area = qrCard - qrPad * 2, cell = Math.floor(area / count), used = cell * count;
        const ox = qx + (qrCard - used) / 2, oy = qrY + (qrCard - used) / 2;
        ctx.fillStyle = '#000';
        for (let row = 0; row < count; row++)
            for (let col = 0; col < count; col++)
                if (code.isDark(row, col)) ctx.fillRect(ox + col * cell, oy + row * cell, cell, cell);

        // "CT" badge: clears a module-aligned square in the middle (odd count, so it sits exactly on the grid) and fills it with the badge, no frame
        const clear = logoModules(count) * cell, cx0 = ox + (used - clear) / 2, cy0 = oy + (used - clear) / 2, inset = 0;
        ctx.fillStyle = '#fff';
        ctx.fillRect(cx0, cy0, clear, clear);
        ctx.fillStyle = accent;
        rounded(cx0 + inset, cy0 + inset, clear - inset * 2, clear - inset * 2, Math.round(clear * 0.14));
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `700 ${Math.round(clear * 0.34)}px ${family}`;
        ctx.fillText('CT', cx0 + clear / 2, cy0 + clear / 2 + Math.round(clear * 0.02));
        ctx.textBaseline = 'alphabetic';

        // Scan text and link
        ctx.textAlign = 'center';
        ctx.fillStyle = ink;
        ctx.font = `700 40px ${family}`;
        ctx.fillText(t('Scan to open this profile'), W / 2, hintY);
        let size = 32;
        ctx.fillStyle = faint;
        ctx.font = `500 ${size}px ${family}`;
        while (ctx.measureText(url).width > W - pad * 2 && size > 18) { size -= 2; ctx.font = `500 ${size}px ${family}`; }
        ctx.fillText(url, W / 2, urlY);

        canvas.toBlob(blob => {
            if (!blob) return;
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'ChokchaiT_profile.png';
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
            setSaved(true);
            window.clearTimeout(savedTimer.current);
            savedTimer.current = window.setTimeout(() => setSaved(false), 1800);
        }, 'image/png');
    };
    const [copied, setCopied] = useState(false);
    const timer = useRef<number>(0);
    useEffect(() => () => window.clearTimeout(timer.current), []);

    const copy = async () => {
        await copyText(url);
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 1800);
    };
    // The device's own share sheet where the browser has one (phones, Windows/macOS Chrome and Edge on https or localhost);
    // otherwise show direct links to LINE, WhatsApp and Email instead.
    const [targetsOpen, setTargetsOpen] = useState(false);
    const share = () => {
        if (typeof navigator.share === 'function') void navigator.share({ title: t('Chokchai Thawatcharaporn'), url }).catch(() => { /* cancelled */ });
        else setTargetsOpen(true);
    };
    const text = encodeURIComponent(t('Chokchai Thawatcharaporn') + ' — ' + t('Senior Digital Solution'));
    const u = encodeURIComponent(url);
    const targets = [
        { name: 'LINE', icon: 'fa-brands fa-line', href: `https://social-plugins.line.me/lineit/share?url=${u}` },
        { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', href: `https://wa.me/?text=${text}%20${u}` },
        { name: 'Email', icon: 'fa-solid fa-envelope', href: `mailto:?subject=${text}&body=${u}` },
    ];

    return (
        <Sheet onClose={onClose} from="left" labelledBy="shareTitle">
            {close => (<>
                <div className="share-head">
                    <img className="share-photo" src="chok.jpg" alt="" decoding="async" />
                    <div className="share-who">
                        <h2 id="shareTitle">{t('Chokchai Thawatcharaporn')}</h2>
                        <p>{t('Senior Digital Solution')}</p>
                    </div>
                    <button type="button" className="share-x" onClick={close} aria-label={t('Close')} title={t('Close')}>
                        <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="share-qr" role="img" aria-label={t('QR code for this profile')}>
                    <div className="share-qr-art">
                        <div dangerouslySetInnerHTML={{ __html: svg }} />
                        <span className="share-qr-badge" aria-hidden="true" style={{ width: `${(logoModules(qr.code.getModuleCount()) / qr.code.getModuleCount()) * 100}%` }}><b>CT</b></span>
                    </div>
                </div>
                <p className="share-hint">{t('Scan to open this profile')}</p>
                <div className="share-link">
                    <span className="share-url" title={url}>{url}</span>
                    <button type="button" className={`share-copy${copied ? ' done' : ''}`} onClick={copy} aria-label={copied ? t('Link copied') : t('Copy link')} title={copied ? t('Link copied') : t('Copy link')}>
                        <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`} aria-hidden="true"></i>
                    </button>
                </div>
                {targetsOpen ? (
                    <div className="share-tiles">
                        {targets.map(x => (
                            <a key={x.name} className="share-tile" href={x.href} target="_blank" rel="noopener noreferrer">
                                <i className={x.icon} aria-hidden="true"></i><span>{x.name}</span>
                            </a>
                        ))}
                        <button type="button" className="share-tile share-back" onClick={() => setTargetsOpen(false)} aria-label={t('Back')} title={t('Back')}>
                            <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
                        </button>
                    </div>
                ) : (
                    <div className="share-tiles">
                        <button type="button" className="share-tile" onClick={share}><i className="fa-solid fa-arrow-up-from-bracket" aria-hidden="true"></i><span>{t('Share…')}</span></button>
                        <button type="button" className="share-tile" onClick={() => { close(); window.setTimeout(exportPdf, 320); }}>
                            <i className="fa-solid fa-file-pdf" aria-hidden="true"></i><span>{t('Export as PDF')}</span>
                        </button>
                        <button type="button" className={`share-tile${saved ? ' done' : ''}`} onClick={save}>
                            <i className={`fa-solid ${saved ? 'fa-check' : 'fa-download'}`} aria-hidden="true"></i><span>{saved ? t('Saved') : t('Save image')}</span>
                        </button>
                    </div>
                )}
                <button type="button" className="exit-stay share-done" onClick={close}>{t('Done')}</button>
            </>)}
        </Sheet>
    );
}
