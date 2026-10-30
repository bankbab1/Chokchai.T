import { useState } from 'react';
import { ageToday } from '../birth';
import { t } from '../i18n';
import { Sheet } from './Sheet';

/** An info button for the Age row. It opens an iOS-style sheet: age and full birth date first, then the birthday facts. */
export function AgeInfo() {
    const [open, setOpen] = useState(false);
    return (
        <span className="copy-wrap age-info">
            <button
                type="button"
                className={`copy-btn${open ? ' copied' : ''}`}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-label={t('Show birthday facts')}
                title={t('Show birthday facts')}
                onClick={() => setOpen(true)}
            >
                <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
            </button>
            {open && (
                <Sheet onClose={() => setOpen(false)} labelledBy="bdayTitle">
                    {close => (<>
                        <div className="bday-head">
                            <span className="bday-cake" aria-hidden="true"><i className="fa-solid fa-cake-candles"></i></span>
                            <h2 id="bdayTitle" className="bday-age">{ageToday()} <small>{t('yrs')}</small></h2>
                            <p className="bday-date">{t('17 April 1994')}</p>
                        </div>
                        <div className="ios-list">
                            <div className="ios-row"><i className="fa-solid fa-sun" aria-hidden="true"></i><span>{t('Born on')}</span><strong>{t('Sunday')}</strong></div>
                            <div className="ios-row"><i className="fa-solid fa-dog" aria-hidden="true"></i><span>{t('Chinese zodiac')}</span><strong>{t('Year of the Dog')}</strong></div>
                            <div className="ios-row"><svg className="ios-sign" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21V10" /><path d="M12 10c0-4-2.4-7-5.5-7a3.8 3.8 0 0 0 0 7.6" /><path d="M12 10c0-4 2.4-7 5.5-7a3.8 3.8 0 0 1 0 7.6" /></svg><span>{t('Western zodiac')}</span><strong>{t('Aries')}</strong></div>
                        </div>
                        <button type="button" className="exit-go" onClick={close}>{t('Done')}</button>
                    </>)}
                </Sheet>
            )}
        </span>
    );
}
