import { useMemo } from 'react';
import qrcode from 'qrcode-generator';
import { t } from '../i18n';

/** A QR code to the online profile, shown only on paper so a printed or PDF copy links back to the live page. */
export function PrintQr() {
    const svg = useMemo(() => {
        const code = qrcode(0, 'M');
        code.addData(new URL('./', window.location.href).href);
        code.make();
        return code.createSvgTag({ cellSize: 3, margin: 0, scalable: true });
    }, []);
    return (
        <div className="print-qr" aria-hidden="true">
            <div dangerouslySetInnerHTML={{ __html: svg }} />
            <span>{t('Scan to view online')}</span>
        </div>
    );
}
