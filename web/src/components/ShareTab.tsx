import { useEffect, useMemo, useRef, useState } from 'react';
import qrcode from 'qrcode-generator';
import { t } from '../i18n';
import { copyText } from './copyText';
import { Sheet } from './Sheet';

/**
 * A folder-style tab on the left edge, vertically centred, with the portrait on it.
 * Tapping it slides a sheet in from the left with a QR code for this profile.
 */
export function ShareTab() {
    const [open, setOpen] = useState(false);
    return (<>
        <button type="button" className="share-tab" aria-haspopup="dialog" aria-expanded={open} aria-label={t('Share this profile')} title={t('Share this profile')} onClick={() => setOpen(true)}>
            <img className="share-tab-photo" src="chok.jpg" alt="" decoding="async" />
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
        const code = qrcode(0, 'M');
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
        ctx.fillText(t('Share this profile'), pad + photoSize + 32, cy - 6);
        ctx.fillStyle = muted;
        ctx.font = `500 34px ${family}`;
        ctx.fillText(t('Chokchai Thawatcharaporn'), pad + photoSize + 32, cy + 42);

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
    const canShare = typeof navigator.share === 'function';

    const copy = async () => {
        await copyText(url);
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 1800);
    };
    const share = () => { void navigator.share({ title: t('Chokchai Thawatcharaporn'), url }).catch(() => { /* cancelled */ }); };

    return (
        <Sheet onClose={onClose} from="left" labelledBy="shareTitle">
            {close => (<>
                <div className="share-head">
                    <img className="share-photo" src="chok.jpg" alt="" decoding="async" />
                    <div className="share-who">
                        <h2 id="shareTitle">{t('Share this profile')}</h2>
                        <p>{t('Chokchai Thawatcharaporn')}</p>
                    </div>
                    <button type="button" className={`share-save${saved ? ' done' : ''}`} onClick={save} aria-label={t('Save QR as image')} title={saved ? t('Saved') : t('Save QR as image')}>
                        <i className={`fa-solid ${saved ? 'fa-check' : 'fa-download'}`} aria-hidden="true"></i>
                    </button>
                </div>
                <div className="share-qr" role="img" aria-label={t('QR code for this profile')} dangerouslySetInnerHTML={{ __html: svg }} />
                <p className="share-hint">{t('Scan to open this profile')}</p>
                <p className="share-url">{url}</p>
                <button type="button" className="exit-go" onClick={copy}>
                    <i className={`fa-solid ${copied ? 'fa-check' : 'fa-link'}`} aria-hidden="true"></i>&nbsp;{copied ? t('Link copied') : t('Copy link')}
                </button>
                {canShare && <button type="button" className="share-native" onClick={share}><i className="fa-solid fa-arrow-up-from-bracket" aria-hidden="true"></i>&nbsp;{t('Share…')}</button>}
                <button type="button" className="exit-stay" onClick={close}>{t('Done')}</button>
            </>)}
        </Sheet>
    );
}
