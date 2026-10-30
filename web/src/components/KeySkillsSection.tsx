import { t } from "../i18n";
import { useEffect, useRef, useState } from 'react';
const skills = [
  {
    "icon": "fa-search",
    "title": "Problem Analysis & Resolution",
    "description": "Strong analytical skills in identifying root causes and developing innovative solutions to complex challenges."
  },
  {
    "icon": "fa-lightbulb",
    "title": "Strategic & Critical Thinking",
    "description": "Logical reasoning to support informed decisions and long-term planning — analyzing, evaluating evidence, identifying risks."
  },
  {
    "icon": "fa-cogs",
    "title": "Process Improvement",
    "description": "Identifying inefficiencies and implementing enhancements to streamline workflows and increase productivity."
  },
  {
    "icon": "fa-arrows-rotate",
    "title": "Adaptability & Flexibility",
    "description": "Rapid learning curve, integrating new concepts and technologies seamlessly into existing workflows."
  },
  {
    "icon": "fa-check-circle",
    "title": "Decision-Making",
    "description": "Well-informed, timely decisions under pressure, balancing short-term needs and long-term goals."
  },
  {
    "icon": "fa-comments",
    "title": "Effective Communication",
    "description": "Articulating ideas with clarity and precision across all levels of an organization."
  },
  {
    "icon": "fa-ear-listen",
    "title": "Active Listening",
    "description": "Empathetic listening for thorough understanding, enabling informed responses that build trust."
  },
  {
    "icon": "fa-users",
    "title": "Stakeholder Collaboration",
    "description": "Bridging communication gaps — making complex concepts accessible for technical and non-technical audiences."
  },
  {
    "icon": "fa-handshake",
    "title": "Collaboration & Negotiation",
    "description": "Cross-functional partnership building and negotiating mutually beneficial solutions."
  },
  {
    "icon": "fa-clock",
    "title": "Time Management",
    "description": "Managing multiple priorities and deadlines without compromising quality."
  },
  {
    "icon": "fa-brain",
    "title": "Creative Problem-Solving",
    "description": "Quick to adapt and apply creative solutions while continuously learning and growing."
  },
  {
    "icon": "fa-people-group",
    "title": "Relationship Building",
    "description": "Building rapport across organizational levels, fostering strong working relationships."
  },
  {
    "icon": "fa-magnifying-glass-plus",
    "title": "Keen Attention to Detail",
    "description": "Precision and accuracy, identifying potential issues before they become problems."
  }
];
export function KeySkillsSection() {
 const [selected,setSelected]=useState(0);
 const options=useRef<HTMLDivElement>(null);
 const step=(d:number)=>setSelected(i=>(i+d+skills.length)%skills.length);
 // Keep the chosen badge centred in the row, so it follows the chevrons.
 useEffect(()=>{const row=options.current,btn=row?.children[selected] as HTMLElement|undefined;if(!row||!btn||row.scrollWidth<=row.clientWidth)return;row.scrollTo({left:btn.offsetLeft-(row.clientWidth-btn.offsetWidth)/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});},[selected]);
 return <section id="key-skills" className="section">
 <div className="section-head"><span className="section-num">/ 01</span><h2 className="section-title">{t("Key Skills")}</h2><div className="section-rule"></div></div>
 <div className="skill-picker"><div className="skill-options" ref={options} role="group" aria-label={t("Choose a key skill")}>
 {skills.map((skill,index)=><button key={skill.title} type="button" className={selected===index?'skill-option selected':'skill-option'} aria-pressed={selected===index} aria-controls="key-skill-detail" onClick={()=>setSelected(index)}><i className={`fa-solid ${skill.icon}`} aria-hidden="true"></i><span>{t(skill.title)}</span></button>)}
 </div><div id="key-skill-detail" className="skill-detail" aria-live="polite" aria-atomic="true"><div className="skill-detail-head"><h3>{t(skills[selected].title)}</h3><div className="skill-nav"><button type="button" className="skill-step" aria-label={t("Previous skill")} onClick={()=>step(-1)}><i className="fa-solid fa-chevron-left" aria-hidden="true"></i></button><button type="button" className="skill-step" aria-label={t("Next skill")} onClick={()=>step(1)}><i className="fa-solid fa-chevron-right" aria-hidden="true"></i></button></div></div><p>{t(skills[selected].description)}</p></div>
 <div className="skill-print-list">{skills.map(skill=><div key={skill.title}><h3>{t(skill.title)}</h3><p>{t(skill.description)}</p></div>)}</div></div></section>;
}
