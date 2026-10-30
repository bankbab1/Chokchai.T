import { t } from "../i18n";
export function ExperienceSection() {
    return (<section id="experience" className="section reveal">
    <div className="section-head">
    <span className="section-num">/ 02</span>
    <h2 className="section-title">{t("Work Experience")}</h2>
    <div className="section-rule"></div>
    </div>
    <div className="timeline">

    <div className="tl-item">
    <div className="tl-dot current" aria-hidden="true"></div>
    <span className="tl-date">{t("Apr 2024 — Present")}</span>
    <h3 className="tl-title">{t("Senior Digital Solution")}</h3>
    <div className="tl-company">{t("JASPAL Public Company Limited")}</div>
    <div className="tl-industry">{t("Lifestyle & Fashion Retail")}</div>
    <div className="tl-role">{t("Digital Solution, Automation and Transformation")}</div>
    <p className="tl-intro">{t("Lead enterprise-wide digital initiatives in workflow automation, system integration, and digital transformation.")}</p>
    <div className="tl-content"><ul>
    <li>{t("Key Digital Initiatives:")}</li>
    <li className="dot">{t("Initiated and developed HR-driven employee lifecycle automation using React, n8n and PostgreSQL, connecting HRM data with Active Directory account creation, employee data updates and offboarding operations.")}</li>
    <li className="dot">{t("Automated IT onboarding task assignment, including software installation tasks, while supporting standardized hardware and software provisioning throughout the employee lifecycle.")}</li>
    <li className="dot">{t("Drive the rollout of a digital Delegation of Authority (DOA) platform, replacing fragmented Excel-based matrices with a single, reliable source of approval authority.")}</li>
    <li className="dot">{t("Enable business teams to replace paper-based approvals with digital workflows, leveraging DOA roles and authority rules to automate approval routing.")}</li>
    <li className="dot">{t("Initiated and built a single meeting-room availability portal as an alternative to a paid platform, integrating Microsoft Graph calendars with the company campus map to improve room visibility and wayfinding — without a database.")}</li>
    <li className="dot">{t("Improve IT support operations through Zoho ITSM customization, business rules and proactive monitoring, standardizing how staff handle requests and automating repeatable operational tasks.")}</li>
    <li className="dot">{t("Continuously explore practical digital solutions across business functions, translating operational needs into integrated tools and more efficient ways of working.")}</li>
    <li>{t("Enterprise Integration & Automation:")}</li>
    <li className="dot">{t("End-to-end integration workflows connecting enterprise systems with reliable data synchronization across platforms.")}</li>
    <li className="dot">{t("Automation workflows: file monitoring, data validation, transformation logic, scheduled execution.")}</li>
    <li className="dot">{t("Orchestration logic for retries, error handling, conditional routing and monitoring.")}</li>
    <li className="dot">{t("API-driven services for secure communication between internal platforms and external systems.")}</li>
    <li className="dot">{t("API integrations for enterprise tools — automation triggers, status updates, data sync.")}</li>
    <li className="dot">{t("PostgreSQL schema design, relational modeling, indexing and performance optimization.")}</li>
    <li className="dot">{t("Staging & transformation layers to normalize incoming data and ensure governance.")}</li>
    <li className="dot">{t("Internal React.js portals for monitoring automation execution and self-service workflows.")}</li>
    <li className="dot">{t("Frontend components simplifying complex technical operations.")}</li>
    <li className="dot">{t("Continuous optimization of pipelines, API performance and integration logic.")}</li>
    <li className="dot">{t("Ongoing monitoring, troubleshooting and enhancement of digital solutions.")}</li>
    </ul></div>
    <h3 className="tl-title" style={{ "marginTop": "24px" }}>{t("Senior Business Analyst")}</h3>
    <div className="tl-role">{t("Business Analyst · Project Manager · System Analyst")}</div>
    <p className="tl-intro">{t("Full ownership of Business Unit, DC, WMS, PLM and Digital Transformation projects.")}</p>
    <div className="tl-content"><ul>
    <li>{t("Requirement Management & Analysis:")}</li>
    <li className="dot">{t("Lead end-to-end gathering via interviews, workshops, document reviews.")}</li>
    <li className="dot">{t("Analyze current processes for inefficiencies; recommend technically aligned solutions.")}</li>
    <li className="dot">{t("Apply active listening and critical questioning to validate stakeholder needs.")}</li>
    <li>{t("Stakeholder Engagement:")}</li>
    <li className="dot">{t("Collaborate with sponsors, owners and SMEs to develop comprehensive BRDs.")}</li>
    <li className="dot">{t("Align business needs with technical capabilities; negotiate priorities for measurable value.")}</li>
    <li>{t("Process Understanding & Solution Design:")}</li>
    <li className="dot">{t("Translate complex requirements into user-centric solutions with UX/UI best practices.")}</li>
    <li className="dot">{t("Structured analysis to redesign processes for scalability and long-term goals.")}</li>
    <li className="dot">{t("Balance user needs, business objectives and technical constraints.")}</li>
    <li>{t("Documentation & Alignment:")}</li>
    <li className="dot">{t("Functional specs, workflow diagrams, user journey maps, AS-IS/TO-BE models.")}</li>
    <li className="dot">{t("Define scope, conduct impact analyses, support internal registration processes.")}</li>
    <li>{t("Vendor Management & Evaluation:")}</li>
    <li className="dot">{t("Work with vendors for off-the-shelf solutions aligned with project goals.")}</li>
    <li className="dot">{t("Compare off-the-shelf vs customization across cost, scalability, support.")}</li>
    <li className="dot">{t("Negotiate with vendors to integrate or customize products effectively.")}</li>
    <li className="dot">{t("Evaluate customization for flexibility and future growth.")}</li>
    <li>{t("Project Planning & Execution:")}</li>
    <li className="dot">{t("Lead planning and execution — timelines, scope, budgets, resources.")}</li>
    <li className="dot">{t("Coordinate cross-functional teams; resolve dependencies.")}</li>
    <li className="dot">{t("Run requirement sessions, document and secure formal sign-off.")}</li>
    <li className="dot">{t("Project kick-offs with milestones, success metrics, communication plans.")}</li>
    <li>{t("Testing & Validation:")}</li>
    <li className="dot">{t("Develop test cases, perform SIT and UAT for system integrity.")}</li>
    <li className="dot">{t("Monitor Go-live and post-implementation phases.")}</li>
    <li>{t("Communication & Reporting:")}</li>
    <li className="dot">{t("Regular stakeholder updates on status, challenges and milestones.")}</li>
    </ul></div>
    <div className="tl-role">{t("Cross-Functional Collaboration")}</div>
    <div className="tl-content"><ul>
    <li>{t("Solution Consultation & Support:")}</li>
    <li className="dot">{t("Expert consultation on solution architecture and integration design with UX/UI alignment.")}</li>
    <li className="dot">{t("Advised on system integration strategies, data mapping and field alignment.")}</li>
    <li>{t("Data Management:")}</li>
    <li className="dot">{t("Data cleansing, taxonomy, master data management, system migration.")}</li>
    <li>{t("Integration & Testing:")}</li>
    <li className="dot">{t("Validate integration data, refine system logic, support API testing.")}</li>
    <li className="dot">{t("Finalize integration flows and data mappings.")}</li>
    <li>{t("Coding & Development:")}</li>
    <li className="dot">{t("Apps/tools empowering IT and business users to manage PLM data via APIs.")}</li>
    <li className="dot">{t("Integration logic and scripts syncing PLM with ERP and other enterprise systems.")}</li>
    <li className="dot">{t("Automation: file monitoring, ticketing flows, API updates with rate-limit delays.")}</li>
    <li className="dot">{t("Internal apps, dashboards, utilities improving monitoring and support efficiency.")}</li>
    <li className="dot">{t("Zoho ITSM custom scripts with calculation logic and dynamic field behaviors.")}</li>
    <li className="dot">{t("Customized modules, forms and approval flows aligned with organizational processes.")}</li>
    <li className="dot">{t("Python + HTML web app assisting customs declaration documentation.")}</li>
    <li className="dot">{t("VPN auto-connect monitor reducing reliance on costly third-party software.")}</li>
    </ul></div>
    </div>

    <div className="tl-item">
    <div className="tl-dot" aria-hidden="true"></div>
    <span className="tl-date">{t("Aug 2021 — Mar 2024")}</span>
    <h3 className="tl-title">{t("IT & Software Solutions Expertise")}</h3>
    <div className="tl-company">{t("Prime Selection (Thailand) Co., Ltd.")}</div>
    <div className="tl-industry">{t("Consultant Service & Software Solution")}</div>
    <div className="tl-role">{t("Software Solution Consultant · SAP Consultant · CEGID Retail System Owner")}</div>
    <p className="tl-intro">{t("Full responsibility in System Design, Business Process and Technical Consultancy.")}</p>
    <div className="sub-role">{t("Role 1 — IT & Software Solutions Expertise")}</div>
    <div className="tl-content"><ul>
    <li>{t("Warehouse Management System (WMS):")}</li>
    <li className="dot">{t("In-depth WMS and inventory ops knowledge for analysis and troubleshooting.")}</li>
    <li className="dot">{t("Collaborated with WH teams to identify gaps and propose customized solutions.")}</li>
    <li className="dot">{t("Supported AS2, SFTP and API integrations.")}</li>
    <li>{t("Requirements & Solution Design:")}</li>
    <li className="dot">{t("Analyzed customer requirements; designed tailored solutions.")}</li>
    <li className="dot">{t("Created system and process flow diagrams.")}</li>
    <li>{t("Automation & Optimization:")}</li>
    <li className="dot">{t("Automated processes using Python, Excel VBA and macros.")}</li>
    <li className="dot">{t("Scripts simulating end-to-end transactional interfaces via raw XML.")}</li>
    <li className="dot">{t("Systematic solution design balancing user needs, feasibility, objectives.")}</li>
    <li>{t("Integration & Troubleshooting:")}</li>
    <li className="dot">{t("Root cause analysis for WMS-to-SAP and WMS-to-Ecommerce (Lazada, Shopee, COL).")}</li>
    <li className="dot">{t("Resolved data exchange issues across APIs, JSON, XML.")}</li>
    <li>{t("Collaboration:")}</li>
    <li className="dot">{t("Worked with GR/GI, Inventory, Transport and Ecommerce teams.")}</li>
    </ul></div>
    <div className="sub-role">{t("Role 2 — SAP Consultant & Support (L1) — Shiseido Thailand")}</div>
    <div className="tl-content"><ul>
    <li>{t("Master Data Governance:")}</li>
    <li className="dot">{t("Lead Material Master Data prep including standard costs, statuses, collaborative data.")}</li>
    <li className="dot">{t("SAP S/4 HANA, GUI and Fiori for material-related tasks.")}</li>
    <li className="dot">{t("Cross-functional communication with Demand, Logistics, Accounting, Finance.")}</li>
    <li>{t("Testing & Implementation:")}</li>
    <li className="dot">{t("Prepared and executed SIT, UAT, regression tests with global/regional/local teams.")}</li>
    <li>{t("Issue Resolution:")}</li>
    <li className="dot">{t("CPI solutions ensuring smooth SAP-to-surrounding-systems data flow.")}</li>
    <li className="dot">{t("Resolved PO/STO, SO, invoices, stock movements, IDOC issues.")}</li>
    <li>{t("Reporting:")}</li>
    <li className="dot">{t("Daily progress reports on master data activities.")}</li>
    <li className="dot">{t("Improved workflows for material data management.")}</li>
    </ul></div>
    <div className="sub-role">{t("Role 3 — CEGID Retail POS Owner & CRM — Shiseido Thailand")}</div>
    <div className="tl-content"><ul>
    <li>{t("System Administration:")}</li>
    <li className="dot">{t("Managed CEGID Retail POS and CRM (Beauty Connect).")}</li>
    <li className="dot">{t("Monitored interface file transfers between CEGID, SAP and CRM via SFTP.")}</li>
    <li>{t("Process Improvements:")}</li>
    <li className="dot">{t("Identified inefficiencies and designed solutions.")}</li>
    <li className="dot">{t("Collaborated on service/change requests with stakeholders.")}</li>
    <li>{t("Testing & Support:")}</li>
    <li className="dot">{t("Prepared SIT/UAT including data simulations.")}</li>
    <li className="dot">{t("Supported store/register creation, DN interfaces, data merges.")}</li>
    <li>{t("Event Support & Reconciliation:")}</li>
    <li className="dot">{t("Handled F&F sales and Roadshows ensuring system readiness.")}</li>
    <li className="dot">{t("Reconciled CEGID, CRM and other systems.")}</li>
    <li>{t("Documentation & Training:")}</li>
    <li className="dot">{t("User manuals and system documentation for onboarding.")}</li>
    <li className="dot">{t("End-user training on best practices for CEGID POS and CRM.")}</li>
    </ul></div>
    </div>

    <div className="tl-item">
    <div className="tl-dot" aria-hidden="true"></div>
    <span className="tl-date">{t("Aug 2017 — Feb 2021")}</span>
    <h3 className="tl-title">{t("Application Engineer")}</h3>
    <div className="tl-company">{t("Engineering Computer Services (Thailand) Co., Ltd.")}</div>
    <div className="tl-industry">{t("CAD/CAM/CAE Solution Provider")}</div>
    <div className="tl-content"><ul>
    <li>{t("Technical Support & Training:")}</li>
    <li className="dot">{t("Expert technical support resolving customers' software challenges.")}</li>
    <li className="dot">{t("Structured training programs tailored to customer needs.")}</li>
    <li className="dot">{t("Optimized CAD/CAM/CAE workflows with customers.")}</li>
    <li>{t("Pre-sales & Demonstration:")}</li>
    <li className="dot">{t("Live demos to prospective clients aligned with technical/business requirements.")}</li>
    <li className="dot">{t("Provided technical insights to the sales team to win new clients.")}</li>
    <li className="dot">{t("Comparative analyses positioning company solutions vs competitors.")}</li>
    <li>{t("Solution Design & Vendor Coordination:")}</li>
    <li className="dot">{t("Tailored solutions for customer engineering challenges.")}</li>
    <li className="dot">{t("Worked with FEA/CAE vendors for stress and fluid flow analyses.")}</li>
    <li>{t("Installation & Setup:")}</li>
    <li className="dot">{t("Installed and configured CAD/CAM/CAE solutions.")}</li>
    <li className="dot">{t("Designed DNC and MDC systems including database setup.")}</li>
    <li>{t("Presentation:")}</li>
    <li className="dot">{t("Delivered seminars and industry events.")}</li>
    <li className="dot">{t("Created marketing materials, training videos and promotional content.")}</li>
    <li>{t("Optimization & Engagement:")}</li>
    <li className="dot">{t("Improved customers' working files and best practices.")}</li>
    <li className="dot">{t("Site visits for post-sales support.")}</li>
    <li>{t("3D Modeling & Analysis:")}</li>
    <li className="dot">{t("3D animations and motion analysis of complex assemblies.")}</li>
    <li className="dot">{t("Reverse Engineering and Generative Design.")}</li>
    <li>{t("Postprocessing:")}</li>
    <li className="dot">{t("Customized postprocessors via NX Postbuilder for CNC machines.")}</li>
    <li>{t("Impact:")}</li>
    <li className="dot">{t("Improved engineering and manufacturing with customized solutions.")}</li>
    <li className="dot">{t("Enhanced cross-departmental collaboration.")}</li>
    <li className="dot">{t("Enabled clients to adopt cutting-edge CAD/CAM/CAE technologies.")}</li>
    </ul></div>
    </div>

    <div className="tl-item">
    <div className="tl-dot" aria-hidden="true"></div>
    <span className="tl-date">{t("May 2016 — Oct 2016")}</span>
    <h3 className="tl-title">{t("Service Engineer Trainee")}</h3>
    <div className="tl-company">{t("Automation Service Co., Ltd.")}</div>
    <div className="tl-industry">{t("Industrial & Office Automation · Internship")}</div>
    <div className="tl-content"><ul>
    <li>{t("Installation & Setup:")}</li>
    <li className="dot">{t("Assisted installing mechanical, electrical and automation systems.")}</li>
    <li className="dot">{t("Equipment setup and calibration.")}</li>
    <li>{t("Maintenance & Troubleshooting:")}</li>
    <li className="dot">{t("Routine maintenance and repairs hands-on support.")}</li>
    <li className="dot">{t("Diagnosed mechanical/electrical issues and corrective actions.")}</li>
    <li className="dot">{t("Performance testing and system diagnostics.")}</li>
    <li>{t("Customer Support & Training:")}</li>
    <li className="dot">{t("Basic technical support on operation and maintenance.")}</li>
    <li className="dot">{t("On-site training for minor maintenance.")}</li>
    <li className="dot">{t("Documented common issues and solutions.")}</li>
    <li>{t("Collaboration:")}</li>
    <li className="dot">{t("Worked with product development, design and QA.")}</li>
    <li className="dot">{t("Assisted in technical documentation and manuals.")}</li>
    </ul></div>
    </div>
    </div>
    </section>);
}
