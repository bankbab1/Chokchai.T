import { t } from "../i18n";
import { TypingText } from "./TypingText";
import { PrintQr } from "./PrintQr";
export function HomeSection() {
    return (<header id="home" className="hero reveal">
    <div className="hero-grid">
    <div className="avatar"><img src="chok.jpg" alt="Chokchai Thawatcharaporn"/></div>
    <div>
    <span className="eyebrow"><i className="fa-solid fa-sparkles"></i> {t("Available · Bangkok")}</span>
    <h1><TypingText key={t("Chokchai\nThawatcharaporn")} text={t("Chokchai\nThawatcharaporn")} /></h1>
    <p className="role">{t("Senior Digital Solution — automation, integration & transformation")}</p>
    <div className="summary">
    <p>{t("Senior Digital Solution professional specializing in workflow automation, system integration, and enterprise digital transformation.")}</p>
    <p>{t("Designing end-to-end automation pipelines using n8n, API integrations, and data orchestration across HRM, Active Directory, ITSM and enterprise platforms.")}</p>
    <p>{t("A bridge between business and technology — translating operational challenges into scalable, measurable digital solutions.")}</p>
    </div>
    <div className="contact-row">
    <a className="chip" href="mailto:ct_chok@hotmail.com"><i className="fa-solid fa-envelope"></i> {t("ct_chok@hotmail.com")}</a>
    <a className="chip" href="tel:+66859941717"><i className="fa-solid fa-phone"></i> +66 85 994 1717</a>
    <a className="chip" href="https://linkedin.com/in/chokchait" target="_blank" rel="noopener"><i className="fa-brands fa-linkedin"></i> {t("linkedin.com/in/chokchait")}</a>
    <span className="chip"><i className="fa-solid fa-location-dot"></i> {t("Bangkok, Thailand")}</span>
    </div>
    <PrintQr />
    </div>
    </div>
    </header>);
}
