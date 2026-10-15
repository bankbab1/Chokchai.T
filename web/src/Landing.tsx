import { useLanding } from "./hooks/useLanding";
import "./index.css";
export default function Landing() {
    useLanding();
    return (<>
    <button className="theme-toggle" id="themeToggle" aria-label="Toggle theme"><i className="fa-solid fa-moon"></i></button>
    <main className="landing-card w-full">
    <span className="eyebrow">Portfolio · 2026</span>
    <div className="avatar"><img src="chok.jpg" alt="Chokchai Thawatcharaporn"/></div>
    <h1>Chokchai <span className="accent">Thawatcharaporn</span></h1>
    <p className="role">Senior Digital Solution</p>
    <p className="summary">Welcome. Explore my CV, skills, and selected projects on the full profile.</p>
    <button className="landing-btn" id="viewProfileBtn">
      View Profile <i className="fa-solid fa-arrow-right"></i>
    </button>
    <div className="foot">Bangkok · Available for opportunities</div>
    </main>


    </>);
}
