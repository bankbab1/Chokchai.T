import { getLang, t, useLang } from "./i18n";
import { HomeSection } from "./components/HomeSection";
import { KeySkillsSection } from "./components/KeySkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { EducationSection } from "./components/EducationSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { PersonalSection } from "./components/PersonalSection";
import { useEffect, useState } from "react";
import { useProfile } from "./hooks/useProfile";
import { ExitConfirmation } from "./components/ExitConfirmation";
import { LangToggle } from "./components/LangToggle";
import { ShareTab } from "./components/ShareTab";
import "./profile.css";
import { BtcTicker } from "./components/BtcTicker";
import { HobbiesSection } from "./components/HobbiesSection";
import { ScrollToTop } from "./components/ScrollToTop";
export default function Profile() {
    useProfile();
    const [leaving, setLeaving] = useState(false);
    // Re-render the whole profile when the language changes; keep <html lang> and the tab title in step.
    const lang = useLang();
    useEffect(() => { document.documentElement.lang = getLang(); document.title = t("Chokchai.T — Senior Digital Solution"); }, [lang]);
    const askToLeave = (e: React.MouseEvent) => { e.preventDefault(); setLeaving(true); };
    return (<>
    <ScrollToTop />

    <div className="mobile-bar">
    <div>
    <a className="logo-name brand-home" href="#home" aria-label="Chokchai.T — scroll to top">{t("Chokchai.T")}</a>
    </div>
    <div style={{ "display": "flex", "gap": "8px", "alignItems": "center" }}>
    <LangToggle />
    <button className="theme-toggle" id="themeToggleMobile" aria-label="Toggle theme">
    <i className="tt-ic tt-moon fa-solid fa-moon"></i><i className="tt-ic tt-sun fa-solid fa-sun"></i>
    </button>
    <button className="menu-btn" id="menuBtn" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
    </div>

    <aside className="sidebar" id="sidebar">
    <div className="sidebar-logo">
    <a className="logo-name brand-home" href="#home" aria-label="Chokchai.T — scroll to top">{t("Chokchai.T")}</a>
    <span className="logo-title">{t("Senior Digital Solution")}</span>
    </div>
    <nav className="nav-section">
    <span className="nav-label">{t("Portfolio")}</span>
    <a className="nav-link active" href="#home"><i className="fa-solid fa-house"></i> {t("Home")}</a>
    <a className="nav-link" href="#key-skills"><i className="fa-solid fa-bolt"></i> {t("Key Skills")}</a>
    <a className="nav-link" href="#experience"><i className="fa-solid fa-briefcase"></i> {t("Experience")}</a>
    <a className="nav-link" href="#education"><i className="fa-solid fa-graduation-cap"></i> {t("Education")}</a>
    <a className="nav-link" href="#skills"><i className="fa-solid fa-code"></i> {t("Technical")}</a>
    <a className="nav-link" href="#projects"><i className="fa-solid fa-rocket"></i> {t("Projects")}</a>
    <a className="nav-link" href="#personal"><i className="fa-solid fa-user"></i> {t("Personal")}</a>
    </nav>
    <nav className="nav-section">
    <span className="nav-label">{t("Connect")}</span>
    <a className="nav-link" href="#contact"><i className="fa-solid fa-paper-plane"></i> {t("Contact")}</a>
    <a className="nav-link nav-exit" href="index.html" onClick={askToLeave}><i className="fa-solid fa-right-from-bracket"></i> {t("Sign off")}</a>
    </nav>
    <div className="sidebar-footer">
    <span className="sidebar-foot-meta">© 2025</span>
    <LangToggle />
    <a className="exit-btn" href="index.html" onClick={askToLeave} aria-label={t("Sign off and return to the welcome screen")}><i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i><span>{t("Sign off")}</span></a>
    <button className="theme-toggle" id="themeToggle" aria-label="Toggle theme">
    <i className="tt-ic tt-moon fa-solid fa-moon"></i><i className="tt-ic tt-sun fa-solid fa-sun"></i>
    </button>
    </div>
    </aside>
    <div className="sidebar-backdrop" id="sidebarBackdrop"></div>

    <main className="main">
    <div className="wrap">

    <HomeSection />

    <KeySkillsSection />

    <ExperienceSection />

    <EducationSection />

    <SkillsSection />

    <ProjectsSection />

    <PersonalSection />
    <HobbiesSection />
    <footer>
    <BtcTicker />
    <div style={{ "marginTop": "18px" }}>{t("© 2025 Chokchai Thawatcharaporn. All rights reserved.")}</div>
    </footer>
    </div>
    </main>

    <ShareTab />
    {leaving && <ExitConfirmation onClose={() => setLeaving(false)} />}

    <div className="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
    <button className="lb-btn lb-close" id="lbClose" aria-label="Close">✕</button>
    <button className="lb-btn lb-prev" id="lbPrev" aria-label="Previous">‹</button>
    <img id="lbImg" alt=""/>
    <button className="lb-btn lb-next" id="lbNext" aria-label="Next">›</button>
    <div className="lb-counter" id="lbCounter"></div>
    </div>

    </>);
}
