import { setLang, t, useLang } from '../i18n';

/** One switch for the whole page: EN (default) or TH. */
export function LangToggle() {
    const lang = useLang();
    return (
        <div className="lang-toggle" role="group" aria-label={t("Language")}>
            <button type="button" lang="en" className={lang === 'en' ? 'on' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            <button type="button" lang="th" className={lang === 'th' ? 'on' : ''} aria-pressed={lang === 'th'} onClick={() => setLang('th')}>TH</button>
        </div>
    );
}
