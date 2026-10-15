export function PersonalSection() {
    return (<section id="personal" className="section reveal">
    <div className="section-head">
    <span className="section-num">/ 06</span>
    <h2 className="section-title">Personal</h2>
    <div className="section-rule"></div>
    </div>
    <div className="info-grid">
    <div className="info-card">
    <div className="tl-role"><i className="fa-solid fa-brain"></i> Personality</div>
    <img src="16personalities_img.jpg" alt="" style={{ "width": "100%", "maxHeight": "200px", "objectFit": "cover", "borderRadius": "12px", "marginBottom": "14px" }}/>
    <div style={{ "display": "flex", "gap": "14px", "alignItems": "flex-start" }}>
    <img src="infp_img.jpg" alt="INFP-T" style={{ "width": "110px", "borderRadius": "10px", "border": "1px solid var(--border)" }}/>
    <div>
    <p style={{ "marginBottom": "8px" }}><strong>Type:</strong> Mediator (INFP-T)</p>
    <p className="personality-updated">Updated: 2026</p>
    <a href="https://www.16personalities.com/infp-personality" target="_blank" rel="noopener" style={{ "color": "var(--accent)", "fontWeight": "500" }}>Learn more →</a>
    </div>
    </div>
    </div>
    <div className="info-card" id="contact" style={{ "scrollMarginTop": "80px" }}>
    <div className="tl-role"><i className="fa-solid fa-id-card"></i> Contact</div>
    <div className="info-row"><i className="fa-solid fa-user"></i><span><strong>Name:</strong> Chokchai Thawatcharaporn</span></div>
    <div className="info-row"><i className="fa-solid fa-cake-candles"></i><span><strong>Age:</strong> <span id="ageVal">—</span> · 17 Apr 1994</span></div>
    <div className="info-row"><i className="fa-solid fa-envelope"></i><span><strong>Email:</strong> <a href="mailto:ct_chok@hotmail.com" style={{ "color": "var(--accent)" }}>ct_chok@hotmail.com</a></span></div>
    <div className="info-row"><i className="fa-solid fa-phone"></i><span><strong>Phone:</strong> <a href="tel:+66859941717" style={{ "color": "var(--accent)" }}>+66 85 994 1717</a></span></div>
    <div className="info-row"><i className="fa-brands fa-linkedin"></i><span><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/chokchait" target="_blank" rel="noopener" style={{ "color": "var(--accent)" }}>linkedin.com/in/chokchait</a></span></div>
    <div className="info-row"><i className="fa-solid fa-location-dot"></i><span><strong>Address:</strong> Bangkok, Thailand</span></div>
    </div>
    </div>
    </section>);
}
