import { t } from '../i18n';
import { Sheet } from './Sheet';

/** An iOS-style card sheet that asks before leaving the profile for the welcome screen. */
export function ExitConfirmation({ onClose }: { onClose: () => void }) {
    return (
        <Sheet onClose={onClose} labelledBy="exitTitle" describedBy="exitText">
            {close => (<>
                <span className="exit-icon" aria-hidden="true"><i className="fa-solid fa-right-from-bracket"></i></span>
                <h2 id="exitTitle">{t('Sign off and head back?')}</h2>
                <p id="exitText">{t('You will return to the welcome screen. You can open the profile again whenever you like.')}</p>
                <a className="exit-go" href="index.html">{t('Sign off')}</a>
                <button type="button" className="exit-stay" onClick={close}>{t('Stay here')}</button>
            </>)}
        </Sheet>
    );
}
