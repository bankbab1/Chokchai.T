import { t } from '../i18n';
import { copyText } from './copyText';
import { useEffect, useRef, useState } from 'react';

/** A small icon button that copies `value` to the clipboard and briefly confirms with a check mark and a "Copied" bubble. */
export function CopyButton({ value, label }: { value: string; label: string }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<number>(0);
    useEffect(() => () => window.clearTimeout(timer.current), []);

    const copy = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        await copyText(value);
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 1600);
    };

    return (
        <span className="copy-wrap">
            <button type="button" className={`copy-btn${copied ? ' copied' : ''}`} onClick={copy} aria-label={t(`Copy ${label}`)} title={t(`Copy ${label}`)}>
                <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`} aria-hidden="true"></i>
            </button>
            <span className={`copy-toast${copied ? ' show' : ''}`} role="status">{copied ? t('Copied') : ''}</span>
        </span>
    );
}
