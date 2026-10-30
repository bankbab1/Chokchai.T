import { t } from "../i18n";
export function HobbiesSection() {
    return <section id="hobbies" className="section reveal">
        <div className="section-head">
            <span className="section-num">/ 07</span>
            <h2 className="section-title">{t("Outside Work")}</h2>
            <div className="section-rule" />
        </div>
        <div className="grid">
            <div className="card"><div className="card-icon"><i className="fa-solid fa-bicycle" aria-hidden="true" /></div><h3>{t("Cycling")}</h3><p>{t("Enjoying time on the bike, exploring routes and learning about bike setups.")}</p></div>
            <div className="card"><div className="card-icon"><i className="fa-solid fa-circle" aria-hidden="true" /></div><h3>{t("Snooker")}</h3><p>{t("A way to unwind while practising focus, patience and precision.")}</p></div>
            <div className="card"><div className="card-icon"><i className="fa-solid fa-lightbulb" aria-hidden="true" /></div><h3>{t("Exploring New Ideas")}</h3><p>{t("Exploring new tools and technologies, trying ideas and finding practical solutions to everyday problems.")}</p></div>
        </div>
    </section>;
}
