import { t } from "../i18n";
export function SkillsSection() {
    return (<section id="skills" className="section reveal">
    <div className="section-head">
    <span className="section-num">/ 04</span>
    <h2 className="section-title">{t("Technical Skills")}</h2>
    <div className="section-rule"></div>
    </div>
    <div className="subhead">{t("Technical & Software")}</div>
    <div className="grid">
    <div className="card"><div className="card-icon"><i className="fa-solid fa-tools"></i></div><h3>{t("Centric PLM")}</h3><p>{t("Implementation and migration of Centric PLM with UX/UI optimization and complex data migrations.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-warehouse"></i></div><h3>{t("WMS")}</h3><p>{t("WH/Inventory systems aligned with physical operations for efficiency.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-cogs"></i></div><h3>{t("Zoho ITSM")}</h3><p>{t("Custom forms, workflows, scripting and integrations for IT service delivery.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-database"></i></div><h3>{t("SAP S/4 HANA")}</h3><p>{t("MM, SD, ITD, OTC modules and IDOC integration.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-database"></i></div><h3>{t("SAP MDG")}</h3><p>{t("Master Data Governance for consistency and compliance.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-store"></i></div><h3>{t("CEGID Retail")}</h3><p>{t("POS and CRM systems for retail operations and order management.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-project-diagram"></i></div><h3>{t("Bitnami Redmine")}</h3><p>{t("Ticket and project management with multi-level approval workflows.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-network-wired"></i></div><h3>{t("System Integration")}</h3><p>{t("API/EDI middleware and eCommerce platform connections.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-sitemap"></i></div><h3>{t("Flow Drafting")}</h3><p>{t("Clear process flows and diagrams aligning stakeholders.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-compass"></i></div><h3>{t("System Navigation")}</h3><p>{t("Quickly adapt to new systems and unfamiliar platforms.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-robot"></i></div><h3>{t("AI Prompt Engineering")}</h3><p>{t("Crafting and optimizing prompts for accuracy and objective alignment.")}</p></div>
    </div>
    <div className="subhead">{t("Programming Languages & Tools")}</div>
    <div className="grid">
    <div className="card"><div className="card-icon"><i className="fa-solid fa-diagram-project"></i></div><h3>{t("n8n Workflow Automation")}</h3><p>{t("Production-ready workflows with API orchestration, transformation, schedules and error handling.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-brands fa-react"></i></div><h3>{t("React.js")}</h3><p>{t("Responsive interfaces, reusable components, hooks and REST/GraphQL integrations.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-brands fa-react"></i></div><h3>{t("React Native")}</h3><p>{t("Cross-platform Android apps with responsive UI and API integration.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-laptop-code"></i></div><h3>{t("Web App Development")}</h3><p>{t("Full-stack web apps with React, Python (Flask/Django) and PostgreSQL, from responsive UI to REST APIs.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-cart-shopping"></i></div><h3>{t("Shopify")}</h3><p>{t("Theme customization, app integrations and API-based extensions.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-pen-ruler"></i></div><h3>{t("UX/UI Design")}</h3><p>{t("Hierarchy, accessibility, responsive design, wireframing and prototyping.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-code"></i></div><h3>{t("Python")}</h3><p>{t("Automation, Flask web apps, REST APIs, authentication and database integration.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-microchip"></i></div><h3>{t("Arduino & IoT")}</h3><p>{t("ESP32 IoT with wireless modules, TFT displays and real-time visualization.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-file-code"></i></div><h3>{t("Excel VBA")}</h3><p>{t("Advanced macros automating repetitive tasks for accuracy.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-comments"></i></div><h3>{t("Chatbot Development")}</h3><p>{t("Dialogflow + LINE chatbots with booking/payment and Flex Messages.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-database"></i></div><h3>{t("PostgreSQL & SQL")}</h3><p>{t("Schema modeling, queries, stored procedures with Flask/Django/React.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-exchange-alt"></i></div><h3>{t("API & File Transfers")}</h3><p>{t("REST APIs, EDI workflows and SFTP for secure system-to-system communication.")}</p></div>
    </div>
    <div className="subhead">{t("Engineering Software")}</div>
    <p className="skills-note"><i className="fa-solid fa-circle-info" aria-hidden="true"></i><span><strong>{t("Background skills.")}</strong> {t("CAD/CAM/CAE comes from my Application Engineer years (2017–2021), and 3D printing & sculpting are supporting skills. They are not part of my current day-to-day work in digital solutions, but I can pick them up again quickly.")}</span></p>
    <div className="sub-role">{t("CAD · CAM · CAE")}</div>
    <div className="grid">
    <div className="card"><div className="card-icon"><i className="fa-solid fa-cube"></i></div><h3>{t("Solid Edge")}</h3><p>{t("3D CAD, sheet metal, assembly, drafting, simulation, wiring harness.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-drafting-compass"></i></div><h3>{t("Siemens NX")}</h3><p>{t("Advanced product design, CAM machining, mold design.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-cogs"></i></div><h3>{t("Dassault CATIA")}</h3><p>{t("3D modeling, assembly and surface modeling.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-toolbox"></i></div><h3>{t("SolidWorks")}</h3><p>{t("Parametric modeling, assemblies and simulation.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-industry"></i></div><h3>{t("ZW3D CAD & CAM")}</h3><p>{t("CAD design and CAM manufacturing.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-chart-line"></i></div><h3>{t("Femap CAE")}</h3><p>{t("FEA for structural and thermal simulations.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-wind"></i></div><h3>{t("Simcenter 3D")}</h3><p>{t("Performance simulation and fluid dynamics.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-tools"></i></div><h3>{t("Forming Suite (FTI)")}</h3><p>{t("Sheet metal forming simulation.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-eye"></i></div><h3>{t("3DViewstation")}</h3><p>{t("3D visualization and analysis of CAD files.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-network-wired"></i></div><h3>{t("Cimco Edit")}</h3><p>{t("CNC programming and machine data communication.")}</p></div>
    </div>
    <div className="sub-role">{t("3D Printing & Sculpting")}</div>
    <div className="grid">
    <div className="card"><div className="card-icon"><i className="fa-solid fa-monument"></i></div><h3>{t("ZBrush")}</h3><p>{t("Digital sculpting, character design and detailing.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-blender"></i></div><h3>{t("Blender")}</h3><p>{t("Basic 3D modeling, rendering and animation.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-print"></i></div><h3>{t("Chitubox")}</h3><p>{t("Slicing and preparing 3D resin prints.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-cube"></i></div><h3>{t("Cura")}</h3><p>{t("FDM slicing optimization.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-paint-brush"></i></div><h3>{t("Keyshot")}</h3><p>{t("High-quality visualizations and renders.")}</p></div>
    <div className="card"><div className="card-icon"><i className="fa-solid fa-shapes"></i></div><h3>{t("Mold Design & Resin Casting")}</h3><p>{t("Designing molds and casting resin parts with precision.")}</p></div>
    </div>
    </section>);
}
