import { HomeSection } from "./components/HomeSection";
import { KeySkillsSection } from "./components/KeySkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { EducationSection } from "./components/EducationSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { PersonalSection } from "./components/PersonalSection";
import { useProfile } from "./hooks/useProfile";
import "./profile.css";
import { ScrollToTop } from "./components/ScrollToTop";
export default function Profile() {
    useProfile();
    return (<>
    <ScrollToTop />

    <div className="mobile-bar">
    <div>
    <span className="logo-name">Chokchai.T</span>
    </div>
    <div style={{ "display": "flex", "gap": "8px" }}>
    <button className="theme-toggle" id="themeToggleMobile" aria-label="Toggle theme">
    <i className="tt-ic tt-moon fa-solid fa-moon"></i><i className="tt-ic tt-sun fa-solid fa-sun"></i>
    </button>
    <button className="menu-btn" id="menuBtn" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
    </div>

    <aside className="sidebar" id="sidebar">
    <div className="sidebar-logo">
    <span className="logo-name">Chokchai.T</span>
    <span className="logo-title">Senior Digital Solution</span>
    </div>
    <nav className="nav-section">
    <span className="nav-label">Portfolio</span>
    <a className="nav-link active" href="#home"><i className="fa-solid fa-house"></i> Home</a>
    <a className="nav-link" href="#key-skills"><i className="fa-solid fa-bolt"></i> Key Skills</a>
    <a className="nav-link" href="#experience"><i className="fa-solid fa-briefcase"></i> Experience</a>
    <a className="nav-link" href="#education"><i className="fa-solid fa-graduation-cap"></i> Education</a>
    <a className="nav-link" href="#skills"><i className="fa-solid fa-code"></i> Technical</a>
    <a className="nav-link" href="#projects"><i className="fa-solid fa-rocket"></i> Projects</a>
    <a className="nav-link" href="#personal"><i className="fa-solid fa-user"></i> Personal</a>
    </nav>
    <nav className="nav-section">
    <span className="nav-label">Connect</span>
    <a className="nav-link" href="#contact"><i className="fa-solid fa-paper-plane"></i> Contact</a>
    </nav>
    <div className="sidebar-footer">
    <span className="sidebar-foot-meta">© 2025</span>
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
    <footer>
    <div id="crypto-prices" className="btc-card"></div>
    <div style={{ "marginTop": "18px" }}>© 2025 Chokchai Thawatcharaporn. All rights reserved.</div>
    </footer>
    </div>
    </main>

    <div className="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
    <button className="lb-btn lb-close" id="lbClose" aria-label="Close">✕</button>
    <button className="lb-btn lb-prev" id="lbPrev" aria-label="Previous">‹</button>
    <img id="lbImg" alt=""/>
    <button className="lb-btn lb-next" id="lbNext" aria-label="Next">›</button>
    <div className="lb-counter" id="lbCounter"></div>
    </div>

    </>);
}
