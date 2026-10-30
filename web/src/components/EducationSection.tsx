import { t } from "../i18n";
export function EducationSection() {
    return (<section id="education" className="section reveal">
    <div className="section-head">
    <span className="section-num">/ 03</span>
    <h2 className="section-title">{t("Education")}</h2>
    <div className="section-rule"></div>
    </div>
    <div className="timeline">
    <div className="tl-item">
    <div className="tl-dot" aria-hidden="true"></div>
    <span className="tl-date">2019 — 2020</span>
    <h3 className="tl-title">{t("M.Eng. · Computer Engineering & Financial Technology")}</h3>
    <div className="tl-company">{t("University of the Thai Chamber of Commerce")}</div>
    <div className="tl-industry">{t("GPA 3.85")}</div>
    </div>
    <div className="tl-item">
    <div className="tl-dot" aria-hidden="true"></div>
    <span className="tl-date">2012 — 2017</span>
    <h3 className="tl-title">{t("B.Eng. · Automotive Engineering")}</h3>
    <div className="tl-company">{t("Thai – Nichi Institute of Technology")}</div>
    <div className="tl-industry">{t("GPA 2.53")}</div>
    </div>
    <div className="tl-item">
    <div className="tl-dot" aria-hidden="true"></div>
    <span className="tl-date">2006 — 2012</span>
    <h3 className="tl-title">{t("High School · Science & Mathematics")}</h3>
    <div className="tl-company">{t("Lasalle College Bangkok")}</div>
    <div className="tl-industry">{t("GPA 3.19")}</div>
    </div>
    <div className="tl-item">
    <div className="tl-dot" aria-hidden="true"></div>
    <span className="tl-date">2000 — 2006</span>
    <h3 className="tl-title">{t("Primary School")}</h3>
    <div className="tl-company">{t("Prasartwuti Chinese School")}</div>
    <div className="tl-industry">{t("GPA 3.74")}</div>
    </div>
    </div>
    </section>);
}
